# Rozmowni.pl – analityka i tracking

Dokument opisuje, jak na stronie działa śledzenie ruchu i konwersji: jakie
narzędzia są podpięte, gdzie w kodzie siedzi warstwa trackingu, jakie zdarzenia
są wysyłane i w którym momencie. Uzupełnia [start.md](start.md) (sekcje 2 i 5.3).

Ten dokument opisuje stan **taki, jaki jest**. Znane błędy i to, co trzeba
poprawić, są w osobnym pliku: **[todo.md](todo.md)**.

---

## 1. Podsumowanie

| Narzędzie                 | Biblioteka             | ID                                          | Co wysyła                    |
| ------------------------- | ---------------------- | ------------------------------------------- | ---------------------------- |
| **Google Analytics 4**    | `react-ga4`            | `G-2XD6SZL2GR`                              | page view + eventy kliknięć  |
| **Facebook (Meta) Pixel** | `react-facebook-pixel` | `1757361357785350`                          | PageView + konwersje z testu |
| Google Search Console     | –                      | meta `google-site-verification` w `_app.js` | tylko weryfikacja własności  |

Nie ma Google Tag Managera, Hotjara, Clarity ani żadnego innego skryptu
analitycznego. Cały tracking przechodzi przez własną warstwę w
`src/services/tracking/`.

**Podział odpowiedzialności:**

- **GA4** – cały ruch i wszystkie kliknięcia w CTA/nawigację/kontakt
  (42 zdefiniowane eventy typu category/action/label).
- **FB Pixel** – wyłącznie page view + **dwie konwersje z testu poziomującego**
  (`Lead`, `CompleteRegistration`). Kliknięcia nie idą na Pixel.

---

## 2. Architektura

```
src/services/tracking/
├── index.js             # fasada: default export (GA) + named exports eventów
├── googleAnalytics.js   # ID GA4, initializeAsync, sendEvent, sendPageView
├── facebookPixel.js     # ID Pixela, initializeAsync, sendEvent, sendPageView
├── events.js            # 42 stałe eventy GA4 (category/action/label)
└── facebookEvents.js    # 2 fabryki eventów FB (Lead, CompleteRegistration)

src/hooks/
├── usePageViewTracking.js     # GA4 page view      (wołany w _app.js)
├── useFacebookTracking.js     # FB PageView        (wołany w _app.js)
├── useClickTracking.js        # GA4 event          (wołany w komponentach)
└── useFacebookEventTracking.js# FB event           (tylko w testie)
```

Zasada: **komponenty nigdy nie wołają GA/Pixela bezpośrednio**. Importują hook
i stałą eventu:

```js
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';

const trackClick = useClickTracking();
// ...
<Link onClick={() => trackClick(events.HOME_BANNER_CLICK_TEST)}>
```

### 2.1 Lazy loading

Obie biblioteki są ładowane dynamicznie (`import()`), dopiero gdy tracking ma
faktycznie coś wysłać:

```js
export function initializeAsync() {
  return import("react-ga4").then((x) => x.default);
}
```

Dzięki temu nie powiększają głównego bundla i nie blokują pierwszego renderu.
`_document.js` robi `preconnect` do `connect.facebook.net`, `www.facebook.com`,
`www.google.com` i `www.gstatic.com`, żeby zmniejszyć koszt późniejszego strzału.

### 2.2 Inicjalizacja przy każdym wysłaniu

Zarówno GA, jak i Pixel są inicjalizowane **przed każdym** eventem i page view:

```js
ReactGA.initialize(TRACKING_ID, { gtagOptions: { send_page_view: false } });
ReactGA.event(eventData);
```

To celowe. Każde wywołanie `initializeAsync()` może zwrócić inną instancję
modułu, a `ReactPixel.track()` / `ReactGA.event()` są **po cichu ignorowane**,
jeśli dana instancja nie została zainicjalizowana (komentarz w
`facebookPixel.js:21`). Ponowna inicjalizacja tego samego ID jest dla GA i Meta
operacją pustą – nie generuje dodatkowego PageView.

`send_page_view: false` w GA jest ważne: automatyczny page view jest wyłączony,
bo page view'y wysyła ręcznie `usePageViewTracking` (patrz 3.1).

### 2.3 Tryb deweloperski

W obu modułach:

```js
const isDev = process.env.NODE_ENV === "development";
```

Przy `npm run dev` **nic nie leci na zewnątrz** – zamiast tego logi w konsoli:

```
GA: initialize (click)
GA: send event {category: 'Home', action: 'Click', label: 'Banner - test'}
FB: send event: Lead {content_name: 'Test poziomujący', content_category: 'adults'}
```

To jedyny sposób weryfikacji trackingu lokalnie – nie ma testów automatycznych
ani trybu debug flagowanego zmienną środowiskową.

### 2.4 Konfiguracja

ID GA4 i Pixela są **zahardkodowane w kodzie** (`googleAnalytics.js:1`,
`facebookPixel.js:1`). Nie ma ich w `.env.example` ani w `.env.local` – zmiana
konta analitycznego wymaga edycji kodu i deployu. Środowisko staging i produkcja
raportują więc do tej samej właściwości GA4 i tego samego Pixela.

---

## 3. Page view

### 3.1 GA4 – `usePageViewTracking`

Wołany raz, w `_app.js`, więc obejmuje wszystkie strony.

```js
useEffect(() => {
  tracking
    .initializeAsync()
    .then((tracker) => tracking.sendPageView(tracker, router.pathname));
}, [router.pathname]);
```

Wysyła `{ hitType: 'pageview', page: router.pathname }`.

### 3.2 FB Pixel – `useFacebookTracking`

Analogicznie w `_app.js`, wysyła `ReactPixel.pageView()` bez parametrów
(Pixel sam odczytuje URL z przeglądarki).

### 3.3 Konsekwencje użycia `router.pathname`

Oba hooki zależą od `router.pathname`, a nie `router.asPath`:

- **Nie ma query stringów ani hashy** – GA4 dostaje czystą ścieżkę trasy.
- **Nawigacja zmieniająca tylko query nie wysyła page view.** Ma to znaczenie
  na `/test-poziomujacy`, gdzie przejścia intro → pytania → wyniki to zmiany
  stanu Reacta, a nie zmiany trasy. **Cały test jest w GA4 jednym page view'em** –
  postęp w teście widać wyłącznie przez eventy FB Pixela (sekcja 5).

---

## 4. Eventy GA4 (kliknięcia)

### 4.1 Format

Każdy event to obiekt `{ category, action, label }` w `events.js`. Etykiety są
po angielsku, mimo że strona jest po polsku. Trzy eventy są **fabrykami** –
przyjmują ścieżkę i budują label dynamicznie:

```js
export const NAVIGATION_CLICK_MENU_ITEM = (path) => ({
  category: "Navigation",
  action: "Click",
  label: `Navigate to '${path}'`,
});
export const FOOTER_CLICK_MENU_ITEM = (path) => ({
  /* jw. */
});
export const OPINIONS_CLICK_GOOGLE_REVIEWS = (path) => ({
  category: "Opinions",
  action: "Click",
  label: `Google reviews from '${path}'`,
});
```

Wszystkie pozostałe mają `action: 'Click'`, z jednym wyjątkiem:
`CONTACT_SEND_FORM` ma `action: 'Send'`.

### 4.2 Kategorie

| Kategoria           | Ile | Gdzie                                                                                              |
| ------------------- | --- | -------------------------------------------------------------------------------------------------- |
| `Contact`           | 10  | `/kontakt` – formularz, social media, telefon, e-mail                                              |
| `Home`              | 9   | sekcje strony głównej (Banner, SocialProof, TestBenefits, FAQ, FinalCTA, StickyCTA, WhyUsExpanded) |
| `Footer`            | 7   | stopka – social media, kontakt, menu                                                               |
| `Navigation`        | 6   | header – logo, social media, telefon, menu                                                         |
| `Holiday course`    | 4   | `/kursy/intensywne-kursy-wakacyjne`                                                                |
| `Individual course` | 2   | `/kursy/indywidualne` – „Zapisz się" i CTA testu w `NewSemesterSignUp`                             |
| `* course` (3 kat.) | 3   | przycisk „Zapisz się" w `CourseSidebar` na pozostałych stronach kursów                             |
| `Opinions`          | 1   | link do opinii Google w `Opinions` (sekcja jest na `/` **i** `/o-nas`)                             |

`Opinions` liczy się jako jedna stała, ale w GA4 daje dwa labele – fabryka
dokleja `router.pathname`, więc kliknięcia z `/` i z `/o-nas` są rozróżnialne
bez konfigurowania czegokolwiek po stronie GA4.

Kategoria jest zwykle stroną (`Home`, `Contact`), ale komponenty współdzielone
przez kilka stron mają własną kategorię sekcyjną (`Footer`, `Navigation`,
`Opinions`) – inaczej ich kliknięcia zlewałyby się z ruchem strony, na której
akurat się renderują.

### 4.3 Lejek na stronie głównej

Najważniejsza część trackingu: **każde CTA prowadzące do testu ma osobny label**,
więc w GA4 widać, która sekcja realnie konwertuje.

| Sekcja (komponent)       | Event                                    | Label                           |
| ------------------------ | ---------------------------------------- | ------------------------------- |
| `Banner.js:105`          | `HOME_BANNER_CLICK_TEST`                 | `Banner - test`                 |
| `Banner.js:114`          | `HOME_BANNER_CLICK_LEARN_MORE`           | `Banner - learn more`           |
| `SocialProofStats.js:68` | `HOME_SOCIAL_PROOF_CLICK_TEST`           | `Social proof - test`           |
| `WhyUsExpanded.js:290`   | `HOME_WHY_US_EXPANDED_BOTTOM_CLICK_TEST` | `Why us expanded - test bottom` |
| `TestBenefits.js:116`    | `HOME_TEST_BENEFITS_CLICK_TEST`          | `Test benefits - test`          |
| `TestFAQ.js:104`         | `HOME_FAQ_CLICK_TEST`                    | `FAQ - test`                    |
| `TestFAQ.js:112`         | `HOME_FAQ_CLICK_CONTACT`                 | `FAQ - contact`                 |
| `FinalCTA.js:126`        | `HOME_FINAL_CTA_CLICK_TEST`              | `Final CTA - test`              |
| `StickyCTA.js:110`       | `HOME_STICKY_CTA_CLICK_TEST`             | `Sticky CTA - test`             |

Poza lejkiem testu strona główna ma jedno wyjście na zewnątrz: link do opinii
w Google (`Opinions.js:213`, `OPINIONS_CLICK_GOOGLE_REVIEWS`). Ta sama sekcja
renderuje się również na `/o-nas`, dlatego event ma kategorię `Opinions`,
a nie `Home`, a label niesie ścieżkę: `Google reviews from '/'` kontra
`Google reviews from '/o-nas'`.

`StickyCTA` ma dodatkową zależność: nie renderuje się, dopóki widoczny jest
baner cookie (`cookieConsentVisible`), więc jego eventy nie mogą polecieć
przed akceptacją cookies – w odróżnieniu od pozostałych.

### 4.4 Formularz kontaktowy

`CONTACT_SEND_FORM` (`ContactForm.js:46`) leci **dopiero po udanej wysyłce**
(`res.ok`), a więc już po przejściu reCAPTCHA v3 i po odpowiedzi API. Nieudane
wysyłki i odrzucenia przez reCAPTCHA **nie są nigdzie raportowane** – nie ma
eventu błędu.

### 4.5 Strony kursów

Przycisk „Zapisz się" jest w współdzielonym `CourseSidebar`, który dostaje event
przez prop `enrollEvent`:

```js
<CourseSidebar enrollEvent={events.GROUP_COURSE_CLICK_ENROLL} ... />
```

Cztery strony przekazują: `INDIVIDUAL_COURSE_CLICK_ENROLL`,
`GROUP_COURSE_CLICK_ENROLL`, `EXAM_8_COURSE_CLICK_ENROLL`,
`MATURA_EXAM_COURSE_CLICK_ENROLL`. `useClickTracking` ignoruje `undefined`
(`if (!eventData) return;`), więc brak propa nie wywala strony – po cichu
nic nie wyśle.

`/kursy/indywidualne` ma dodatkowo CTA prowadzące do testu poziomującego
(`NewSemesterSignUp.js:59`, `INDIVIDUAL_COURSE_CLICK_TEST`) – to jedyne wejście
do lejka testu spoza strony głównej, które jest otrackowane.

---

## 5. Eventy Facebook Pixel (konwersje z testu)

To jedyne miejsce, gdzie mierzone są realne konwersje. Definicje w
`facebookEvents.js`, obie parametryzowane typem testu (`adults` / `teens`):

| Moment                                                            | Event FB               | Gdzie                    | Payload                                                             |
| ----------------------------------------------------------------- | ---------------------- | ------------------------ | ------------------------------------------------------------------- |
| Użytkownik skończył pytania, pokazuje się ekran wyniku            | `Lead`                 | `test-poziomujacy.js:48` | `content_name: 'Test poziomujący'`, `content_category: <typ testu>` |
| Użytkownik zostawił dane kontaktowe i **mail faktycznie wyszedł** | `CompleteRegistration` | `TestResultsView.js:93`  | jw. + `status: true`                                                |

Szczegóły, które łatwo przeoczyć:

- `Lead` leci w `handleTestComplete`, czyli **raz na ukończony test**, dokładnie
  przy przejściu na ekran wyników.
- `CompleteRegistration` leci **po** sprawdzeniu `emailResponse.ok`, a nie przy
  kliknięciu „wyślij". Jeśli `/api/send-test-results` zwróci błąd, konwersja
  nie jest raportowana – zgodnie z komentarzem w kodzie
  („track only once the email actually went out").
- **Porzucenia testu nie są mierzone.** Nie ma eventu na start testu ani na
  poszczególne pytania, więc z danych nie wyliczy się, na którym pytaniu ludzie
  odpadają. Da się policzyć tylko: page view `/test-poziomujacy` → `Lead` →
  `CompleteRegistration`.
- GA4 **nie widzi ukończenia testu w ogóle** – żaden event testu nie idzie na GA.

---

## 6. Zgoda na cookies

`src/components/CookieConsent.js` (`react-cookie-consent`) renderuje baner
w `_app.js` z przyciskiem „Akceptuję", ciasteczkiem `cookieConsent` i wygaśnięciem
po 90 dniach.

**Baner jest wyłącznie informacyjny – nie bramkuje trackingu.** GA4 i FB Pixel
inicjalizują się i wysyłają page view przy pierwszym renderze, niezależnie od
tego, czy użytkownik kliknął „Akceptuję", czy w ogóle zauważył baner. Nie ma
kodu, który czytałby ciasteczko `cookieConsent` przed wysłaniem czegokolwiek –
jedyny komponent, który je sprawdza, to `StickyCTA`, i robi to tylko po to, żeby
nie nachodzić na baner wizualnie.

Treść banera odsyła do [polityki prywatności](../src/pages/polityka-prywatnosci/index.js).

---

## 7. Jak dodać nowy event

1. Dodaj stałą w `src/services/tracking/events.js` (GA4) lub
   `facebookEvents.js` (Pixel). Trzymaj się konwencji
   `<OBSZAR>_<AKCJA>_<CEL>` i istniejących kategorii.
2. W komponencie: `const trackClick = useClickTracking();` i
   `onClick={() => trackClick(events.TWOJ_EVENT)}`.
   Dla konwersji FB: `useFacebookEventTracking()`.
3. Jeśli event ma oznaczać sukces operacji (wysyłka maila, zapis), wywołaj go
   **po** potwierdzeniu sukcesu, nie w handlerze kliknięcia – tak jak
   `CONTACT_SEND_FORM` i `TEST_CONTACT_DETAILS_SUBMITTED`.
4. Sprawdź lokalnie (`npm run dev`) – event musi pojawić się w konsoli jako
   `GA: send event` / `FB: send event`. Na produkcji zweryfikuj w GA4 DebugView
   i Meta Events Manager.
