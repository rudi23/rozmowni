# Rozmowni.pl – analityka i tracking

Dokument opisuje, jak na stronie działa śledzenie ruchu i konwersji: jakie
narzędzia są podpięte, gdzie w kodzie siedzi warstwa trackingu, jakie zdarzenia
są wysyłane i w którym momencie. Uzupełnia [start.md](start.md) (sekcje 2 i 5.3).

Ten dokument opisuje stan **taki, jaki jest**. Znane błędy i to, co trzeba
poprawić, są w osobnym pliku: **[todo.md](todo.md)**.

---

## 1. Podsumowanie

| Narzędzie                 | Biblioteka                   | ID                                          | Co wysyła                                                        |
| ------------------------- | ---------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| **Google Analytics 4**    | `react-ga4`                  | `G-2XD6SZL2GR`                              | page view + eventy kliknięć                                      |
| **Facebook (Meta) Pixel** | `react-facebook-pixel`       | `1757361357785350`                          | PageView + konwersje z testu                                     |
| **PostHog**               | `posthog-js`, `posthog-node` | z `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`       | page view, kliknięcia, eventy serwerowe, wyjątki, session replay |
| Google Search Console     | –                            | meta `google-site-verification` w `_app.js` | tylko weryfikacja własności                                      |

Nie ma Google Tag Managera, Hotjara, Clarity ani żadnego innego skryptu
analitycznego. Cały tracking przechodzi przez własną warstwę w
`src/services/tracking/`.

**Podział odpowiedzialności:**

- **GA4** – cały ruch i wszystkie kliknięcia w CTA/nawigację/kontakt
  (54 zdefiniowanych eventów typu category/action/label).
- **FB Pixel** – wyłącznie page view + **dwie konwersje z testu poziomującego**
  (`CompleteRegistration`, `Lead`). Kliknięcia nie idą na Pixel.
- **PostHog** – to samo pokrycie co GA4 (page view + wszystkie kliknięcia),
  plus trzy rzeczy, których nie ma nigdzie indziej: **session replay**,
  **wyjątki** z przeglądarki i z tras API oraz **eventy serwerowe** wysyłane
  po faktycznej wysyłce maila. Jako jedyny jest sterowany zmiennymi
  środowiskowymi – bez nich nie działa wcale (sekcja 2.4).

Żadne dane osobowe nie trafiają do PostHoga; imię, e-mail i telefon leada idą
mailem, do CSV-ki oraz – **zahashowane SHA-256, nigdy otwartym tekstem** – do
Conversions API Mety (sekcje 5.6 i 6.1).

---

## 2. Architektura

```
src/services/tracking/
├── index.js             # re-eksport stałych: events + facebookEvents
├── googleAnalytics.js   # ID GA4, initializeAsync, sendEvent, sendPageView
├── facebookPixel.js     # ID Pixela, initializeAsync, sendEvent, sendPageView
├── posthog.js           # konfiguracja z env, initializeAsync, sendEvent,
│                        # sendExceptionAsync, getRequestHeadersAsync
├── events.js            # 54 stałych eventów GA4 (category/action/label
│                        # + opcjonalne posthogEvent, sekcja 5.1)
├── facebookEvents.js    # 2 fabryki eventów FB (CompleteRegistration, Lead)
└── facebookServerEvents.js # POST /api/track-test-completed (serwerowe CAPI)

src/utils/
├── posthogServer.js     # posthog-node: captureEvent, captureException
│                        # (wołane z tras /api/*)
├── metaCapi.js          # Conversions API: hashowanie SHA-256, sendEvent
│                        # (fire-and-forget, wołane z tras /api/*)
└── rateLimit.js         # createRateLimiter (limit per IP w pamięci procesu)

src/hooks/
├── usePageViewTracking.js     # GA4 page view      (wołany w _app.js)
├── useFacebookTracking.js     # FB PageView        (wołany w _app.js)
├── usePostHogTracking.js      # init PostHoga      (wołany w _app.js)
├── useClickTracking.js        # GA4 + PostHog      (wołany w komponentach)
└── useFacebookEventTracking.js# FB event           (tylko w testie)
```

Zasada: **komponenty nigdy nie wołają GA/Pixela/PostHoga bezpośrednio**.
Importują hook i stałą eventu:

```js
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';

const trackClick = useClickTracking();
// ...
<Link onClick={() => trackClick(events.HOME_BANNER_CLICK_TEST)}>
```

Jedno wywołanie `trackClick` wysyła event **i do GA4, i do PostHoga** – dwoma
niezależnymi łańcuchami, każdy z własnym `.catch(() => {})`. Komponent nie wie
o żadnym z dostawców i nie zmienia się, gdy dochodzi kolejny.

### 2.1 Lazy loading

Wszystkie trzy biblioteki są ładowane dynamicznie (`import()`), dopiero gdy
tracking ma faktycznie coś wysłać:

```js
export function initializeAsync() {
  return import('react-ga4').then((x) => x.default);
}
```

Dzięki temu nie powiększają głównego bundla i nie blokują pierwszego renderu.
`_document.js` robi `preconnect` do `connect.facebook.net`, `www.facebook.com`,
`www.google.com` i `www.gstatic.com`, żeby zmniejszyć koszt późniejszego strzału.
Hosta PostHoga na tej liście **nie ma**.

Przy PostHogu waży to najwięcej: `posthog-js` to ~90 kB gzipped, o rząd
wielkości więcej niż `react-ga4` czy `react-facebook-pixel`. Statyczny import
wrzuciłby to do wspólnego bundla wszystkich stron – dlatego inicjalizacja siedzi
w `usePostHogTracking`, a nie w imporcie na górze `_app.js`.

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

**PostHog działa dokładnie odwrotnie i to też jest celowe.** `posthog.init()`
**nie** jest idempotentne – powtórzenie go zdublowałoby klienta i nasłuchy.
Dlatego `posthog.js` trzyma `clientPromise` w module i inicjalizuje dokładnie
raz na załadowanie strony, a każdy kolejny `initializeAsync()` dostaje tę samą
obietnicę. Kopiowanie wzorca „inicjalizuj przed każdym wysłaniem" z GA/Pixela na
PostHoga jest więc błędem.

### 2.3 Tryb deweloperski

W obu modułach:

```js
const isDev = process.env.NODE_ENV === 'development';
```

Przy `npm run dev` **nic nie leci na zewnątrz** – zamiast tego logi w konsoli:

```
GA: initialize (click)
GA: send event {category: 'Home', action: 'Click', label: 'Banner - test'}
FB: send event: Lead {content_name: 'Test poziomujący', content_category: 'adults'}
PostHog: send event: test_cta_clicked {source_category: 'Home', source_action: 'Click', source_label: 'Banner - test'}
PostHog (server): send event: test_results_processed {test_type: 'adults', ...}
```

To jedyny sposób weryfikacji trackingu lokalnie – nie ma testów automatycznych
ani trybu debug flagowanego zmienną środowiskową.

**Przy PostHogu ma to lukę.** W dev `initializeAsync()` zwraca `null` jeszcze
przed `import('posthog-js')`, więc biblioteka w ogóle nie startuje. Eventy
zobaczysz (logują się same), ale odsłon, `$pageleave`, session replay i
autocapture wyjątków **nie da się sprawdzić lokalnie w żaden sposób** – robi je
biblioteka, której nie ma. Zostaje podgląd na stagingu, który raportuje do tego
samego projektu co produkcja.

### 2.4 Konfiguracja

ID GA4 i Pixela są **zahardkodowane w kodzie** (`googleAnalytics.js:1`,
`facebookPixel.js:1`). Nie ma ich w `.env.example` ani w `.env.local` – zmiana
konta analitycznego wymaga edycji kodu i deployu. Środowisko staging i produkcja
raportują więc do tej samej właściwości GA4 i tego samego Pixela.

**PostHog jest tu wyjątkiem** – czyta dwie zmienne, tę samą parę po stronie
klienta (`posthog.js:1`) i serwera (`posthogServer.js:3`):

```
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
NEXT_PUBLIC_POSTHOG_HOST
```

Jeśli brakuje choćby jednej, `isConfigured` jest `false` i PostHog jest
wyłączony **w całości**, po obu stronach – zamiast rzucać błędem. Brak
konfiguracji degraduje się więc do „brak analityki", a nie do zepsutej strony
czy wywalonej trasy API. Obie zmienne są `NEXT_PUBLIC_*`, także ta używana
serwerowo: token projektu PostHoga jest z założenia publicznym kluczem zapisu.

Na serwer trafiają przez `.env.local` budowane w workflowach deployu, tak samo
jak reszta zmiennych z `.env.example`: token z `secrets.*`, host z `vars.*`.
Oba workflowy podstawiają **te same** nazwy i żaden nie używa `environment:`,
więc staging i produkcja raportują do jednego projektu PostHog – dokładnie tak
samo, jak dzielą właściwość GA4 i Pixela. Rozdzielenie środowisk wymagałoby
osobnych sekretów per environment.

**Conversions API czyta jedną zmienną**, wyłącznie serwerową – bez
`NEXT_PUBLIC_`, bo to token dostępu, a nie klucz publiczny:

```
META_CAPI_ACCESS_TOKEN
```

Generuje się go w Events Manager → wybrany piksel → Ustawienia → Conversions API
→ „Generuj token dostępu". Bez niego CAPI jest wyłączone w całości i zostaje sam
Pixel – znowu degradacja do „mniej analityki", nie do błędu. ID piksela jest
zahardkodowane tak samo jak po stronie przeglądarki (`metaCapi.js:1`).

Jest jeszcze opcjonalne `META_CAPI_TEST_EVENT_CODE`, **celowo nieobecne
w `.env.example`**. Służy do podglądu zdarzeń w zakładce „Testuj zdarzenia",
a payload z tym kodem jest wyłączony z optymalizacji – gdyby placeholder trafił
do `.env.example`, a workflow go nie podstawił, produkcja wysyłałaby konwersje,
których Meta nie policzy.

Dlatego nie jest podstawiane jak reszta, tylko **dopisywane do `.env.local`
i wyłącznie w workflow stagingowym** (`deploy-staging.yml`), z sekretu
`META_CAPI_TEST_EVENT_CODE`. Produkcyjny workflow nie zna tej zmiennej w ogóle.
Nieustawiony sekret daje pustą wartość, czyli falsy – więc staging bez sekretu
zachowuje się jak produkcja. Lokalnie ustawia się je ręcznie w `.env.local`.

---

## 3. Page view

### 3.1 GA4 – `usePageViewTracking`

Wołany raz, w `_app.js`, więc obejmuje wszystkie strony.

```js
useEffect(() => {
  initializeGaAsync().then((ReactGA) =>
    sendGaPageView(ReactGA, router.pathname),
  );
}, [router.pathname]);
```

Wysyła `{ hitType: 'pageview', page: router.pathname }`.

### 3.2 FB Pixel – `useFacebookTracking`

Analogicznie w `_app.js`, wysyła `ReactPixel.pageView()` bez parametrów
(Pixel sam odczytuje URL z przeglądarki).

### 3.3 PostHog – `usePostHogTracking`

Jedyny z trzech hooków, który **nie wysyła page view'a**. `useEffect` z pustą
tablicą zależności podnosi klienta raz na pełne załadowanie strony i na tym
kończy rolę:

```js
useEffect(() => {
  initializeAsync();
}, []);
```

Odsłony liczy sam `posthog-js`, bo `posthog.init()` dostaje
`defaults: '2026-01-30'` (`posthog.js:33`), a w `posthog-core.js:187` jest:

```js
capture_pageview: defaults && defaults >= '2025-05-24' ? 'history_change' : true,
```

Czyli tryb `history_change`: `$pageview` przy inicjalizacji i ponownie przy
każdej zmianie pathname, łącznie z nawigacją SPA po History API. Domyślne
`capture_pageleave: 'if_capture_pageview'` dokłada `$pageleave` – jedyne
zdarzenie „wyjścia" w całym trackingu, GA ani Pixel go nie mają.

W repo nie ma żadnego `capture('$pageview')` i nie powinno się pojawić: ręczna
odsłona obok automatycznej **podwoiłaby** statystyki.

Jedna różnica względem GA: init siedzi w `useEffect` po zamontowaniu, a
`posthog-js` jest importowany leniwie, więc pierwszy `$pageview` leci z URL-em
aktualnym w chwili rozwiązania importu. Kto zdąży kliknąć dalej wcześniej,
tego strona wejścia przepadnie. `usePageViewTracking` ma ten sam mechanizm, ale
o rząd wielkości mniejszy chunk.

### 3.4 Konsekwencje użycia `router.pathname`

Oba hooki page view'owe zależą od `router.pathname`, a nie `router.asPath`:

- **Nie ma query stringów ani hashy** – GA4 dostaje czystą ścieżkę trasy.
- **Nawigacja zmieniająca tylko query nie wysyła page view.** Ma to znaczenie
  na `/test-poziomujacy`, gdzie przejścia intro → pytania → wyniki to zmiany
  stanu Reacta, a nie zmiany trasy. **Cały test jest w GA4 jednym page view'em.**
  Postępu nie mierzy się więc page view'ami, tylko osobnymi eventami
  `Test / Progress` (sekcja 4.6).

**PostHog wychodzi na tym samym, choć inną drogą.** `history_change` też reaguje
na zmianę pathname, więc test jest jednym `$pageview` również tam. Różnica jest
na korzyść PostHoga w dwóch miejscach: `$current_url` niesie **pełny** URL,
z query i parametrami utm, których GA4 w ogóle nie dostaje, a przebieg testu
widać dodatkowo w nagraniu sesji.

---

## 4. Eventy GA4 (kliknięcia)

### 4.1 Format

Każdy event to obiekt `{ category, action, label }` w `events.js`. Etykiety są
po angielsku, mimo że strona jest po polsku. Siedem eventów to **fabryki** –
przyjmują parametr i budują label dynamicznie:

```js
export const NAVIGATION_CLICK_MENU_ITEM = (path) => ({
  category: 'Navigation',
  action: 'Click',
  label: `Navigate to '${path}'`,
});
export const FOOTER_CLICK_MENU_ITEM = (path) => ({/* jw. */});
export const OPINIONS_CLICK_GOOGLE_REVIEWS = (path) => ({
  category: 'Opinions',
  action: 'Click',
  label: `Google reviews from '${path}'`,
});
```

Pozostałe mają `action: 'Click'`, z wyjątkiem `CONTACT_SEND_FORM`
i `TEST_CONTACT_DETAILS_SENT` (`action: 'Send'`) oraz eventów testu
(`Start`, `Progress`, `Complete` – patrz 4.6).

**`action` staje się nazwą zdarzenia w GA4.** `react-ga4` robi
`gtag('event', action, { event_category, event_label })`
(`node_modules/react-ga4/dist/ga4.js:280`), więc w GA4 nie ma jednego zdarzenia
z wymiarem „akcja" – są osobne zdarzenia `Click`, `Send`, `Start`, `Progress`
i `Complete`. Raport zawężony do `Click` **nie pokaże lejka testu**.

**Wszystkie trzy pola przechodzą przez `toTitleCase`** (`react-ga4/src/format.js`),
zanim trafią do GA4:

```
'adults - question 01/25'       ->  'Adults - Question 01/25'
"Zoom from '/kursy/grupowe'"    ->  "Zoom From '/Kursy/grupowe'"
"Google reviews from '/o-nas'"  ->  "Google Reviews From '/O-Nas'"
```

Konsekwencje: etykiet nie da się dopasowywać w GA4 dosłownie tak, jak wyglądają
w `events.js`, a ścieżki w etykietach wychodzą niespójnie okapitalizowane.
Dopełnienie zerami przeżywa formatowanie, więc sortowanie lejka (4.6) jest
bezpieczne. `format` dodatkowo redaguje wszystko, co zawiera `@`, jako
potencjalny adres e-mail – nie wstawiaj do etykiet danych użytkownika.

### 4.2 Kategorie

| Kategoria             | Ile | Gdzie                                                                                                                                                             |
| --------------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Contact`             | 10  | `/kontakt` – formularz, social media, telefon, e-mail                                                                                                             |
| `Home`                | 9   | sekcje strony głównej (Banner, SocialProof, TestBenefits, FAQ, FinalCTA…)                                                                                         |
| `Footer`              | 7   | stopka – social media, kontakt, menu                                                                                                                              |
| `Navigation`          | 6   | header – logo, social media, telefon, menu                                                                                                                        |
| `Holiday course`      | 4   | `/kursy/intensywne-kursy-wakacyjne`                                                                                                                               |
| `Test`                | 5   | lejek testu – `Start`, `Progress`, `Complete`, `Send` (4.6) + linki do kursów w opisie testu (`TEST_INTRO_CLICK_COURSE`)                                          |
| `Individual course`   | 1   | `/kursy/indywidualne` – przycisk „Zapisz się"                                                                                                                     |
| `* course` (3 kat.)   | 3   | przycisk „Zapisz się" w `CourseSidebar` na pozostałych stronach kursów                                                                                            |
| `Pricing`             | 1   | przycisk „Zapisz się" na każdej karcie cennika (label niesie nazwę kursu)                                                                                         |
| `About us`            | 1   | CTA na lekcję próbną przed opiniami na `/o-nas`                                                                                                                   |
| `Opinions`            | 1   | link do opinii Google (sekcja jest na `/` **i** `/o-nas`)                                                                                                         |
| `Course requirements` | 1   | linki do Zoom / Google Meet / Teams (4 strony kursów)                                                                                                             |
| `Course content`      | 2   | linki w treści stron kursów przez `CourseLink`: cennik, kontakt, o nas, inne kursy (`COURSE_CLICK_LINK`) i test (`COURSE_CLICK_TEST`); label niesie cel i ścieżkę |
| `Cookie consent`      | 1   | link do polityki prywatności w banerze cookies                                                                                                                    |
| `Not found`           | 2   | strona 404 – CTA do testu i powrót na stronę główną                                                                                                               |

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
| `Banner.js:35`           | `HOME_BANNER_CLICK_TEST`                 | `Banner - test`                 |
| `Banner.js:43`           | `HOME_BANNER_CLICK_LEARN_MORE`           | `Banner - learn more`           |
| `SocialProofStats.js:69` | `HOME_SOCIAL_PROOF_CLICK_TEST`           | `Social proof - test`           |
| `WhyUsExpanded.js:298`   | `HOME_WHY_US_EXPANDED_BOTTOM_CLICK_TEST` | `Why us expanded - test bottom` |
| `TestBenefits.js:76`     | `HOME_TEST_BENEFITS_CLICK_TEST`          | `Test benefits - test`          |
| `TestFAQ.js:114`         | `HOME_FAQ_CLICK_TEST`                    | `FAQ - test`                    |
| `TestFAQ.js:122`         | `HOME_FAQ_CLICK_CONTACT`                 | `FAQ - contact`                 |
| `FinalCTA.js:25`         | `HOME_FINAL_CTA_CLICK_TEST`              | `Final CTA - test`              |

Poza lejkiem testu strona główna ma jedno wyjście na zewnątrz: link do opinii
w Google (`Opinions.js:217`, `OPINIONS_CLICK_GOOGLE_REVIEWS`). Ta sama sekcja
renderuje się również na `/o-nas`, dlatego event ma kategorię `Opinions`,
a nie `Home`, a label niesie ścieżkę: `Google reviews from '/'` kontra
`Google reviews from '/o-nas'`.

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

`/o-nas` ma CTA przed opiniami (`ABOUT_CLICK_TEST`) – to jedyne otrackowane
wejście do lejka testu spoza strony głównej poza menu i paskiem `footer-cta`.
Pasek ogłoszenia nad menu (`AnnouncementBar`) jest samym tekstem, bez linku,
więc nic nie wysyła; stała `INDIVIDUAL_COURSE_CLICK_TEST` została usunięta.

`/cennik` wysyła `PRICING_CLICK_ENROLL(nazwa kursu)` z każdej karty. To fabryka,
więc w GA4 jedna stała daje po jednym labelu na kurs
(`Enroll - Kurs konwersacji` itd.) bez konfigurowania czegokolwiek w GA4.

### 4.6 Lejek testu poziomującego

Najważniejszy lejek w serwisie i jedyny, w którym mierzone są **porzucenia**.

| Event                       | Gdzie                                         | Kiedy                               |
| --------------------------- | --------------------------------------------- | ----------------------------------- |
| `TEST_START`                | `test-poziomujacy.js` → `handleTestSelection` | użytkownik wybrał typ testu         |
| `TEST_PROGRESS`             | `TestRunner.js` → efekt na `currentQuestion`  | pytanie **pojawiło się na ekranie** |
| `TEST_COMPLETED`            | `test-poziomujacy.js` → `handleTestComplete`  | przejście na ekran wyników          |
| `TEST_CONTACT_DETAILS_SENT` | `TestResultsView.js` → `onSubmitContactForm`  | **po** `emailResponse.ok`           |

W GA4 daje to ciągły lejek:

```
page view /test-poziomujacy
  -> Test / Start    / adults
  -> Test / Progress / adults - question 01/25
  -> ...
  -> Test / Progress / adults - question 25/25
  -> Test / Complete / adults      (+ FB CompleteRegistration)
  -> Test / Send     / adults      (+ FB Lead)
```

Ostatni krok leci dopiero po `emailResponse.ok`, razem z pixelowym
`Lead` – oba oznaczają to samo zdarzenie i przy zmianach trzeba
ruszać je naraz. Dzięki temu **cały lejek, od wejścia po leada, da się policzyć
w samym GA4**, bez zestawiania go z Menedżerem zdarzeń Meta.

Trzy rzeczy, które łatwo zepsuć przy zmianach:

- **Numer pytania jest dopełniony zerem** (`question 02/25`, nie `question 2/25`).
  GA4 sortuje etykiety leksykalnie, więc bez tego `question 10` ląduje przed
  `question 2` i krzywa porzuceń wychodzi w losowej kolejności.
- **Event leci przy wyświetleniu pytania, nie po odpowiedzi.** Gdyby leciał po
  odpowiedzi, osoba, która zobaczyła pytanie 7 i zrezygnowała, zapisałaby się
  jako „doszła do pytania 6" – porzucenie przypisano by pytaniu 6, choć
  odstraszyło 7. Ostatni event użytkownika ma być ostatnim pytaniem, jakie
  zobaczył.
- **`TestRunner` pozwala się cofać**, więc trzyma `furthestQuestionRef`
  z najdalej osiągniętym pytaniem i wysyła event tylko przy pobiciu rekordu.
  Bez tego krążenie Q5 → Q4 → Q5 nabijałoby wczesne pytania i krzywa przestałaby
  być monotoniczna. **Ref żyje per podejście, nie per użytkownik** – odświeżenie
  strony restartuje test, więc ktoś, kto dotarł do Q10, odświeżył i zaczął od
  nowa, wyśle `question 01`–`question 10` drugi raz. Liczba użytkowników w GA4
  to dedupuje, liczba zdarzeń **nie**.

`TEST_START` i `question 01/25` lecą praktycznie jednocześnie – to świadoma
redundancja. `Start` oddziela „wybrał typ testu" od samego wejścia na stronę,
a `question 01/25` jest punktem odniesienia, dzięki któremu całą krzywą
Q01 → Q25 czyta się z jednego posortowanego raportu.

---

## 5. Eventy PostHog

### 5.1 Kliknięcia – ten sam hook, inny model danych

GA4 modeluje event jako category/action/label, PostHog jako nazwę + properties.
Tłumaczy to `sendEvent` w `posthog.js:53`:

```js
posthog?.capture(posthogEvent || 'link_clicked', {
  source_category: category,
  source_action: action,
  source_label: label,
});
```

Skąd bierze się nazwa:

- Stała w `events.js` z polem **`posthogEvent`** dostaje własną, czytelną nazwę.
  Ma je 20 z 54 stałych – te, które są częścią lejka.
- Wszystko pozostałe leci jako **`link_clicked`** z tymi samymi properties.
  Żadne kliknięcie nie ginie po cichu; 34 eventy siedzą pod tą nazwą
  i rozróżnia się je po `source_label`.

| `posthogEvent`              | Stałych | Co obejmuje                                                                                                                                                 |
| --------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_cta_clicked`          | 10      | każde CTA do testu: banner, social proof, benefity, FAQ, final CTA, why us, stopka, `/o-nas`, strona 404, linki w treści stron kursów (`COURSE_CLICK_TEST`) |
| `course_enrollment_clicked` | 5       | „Zapisz się" – cztery strony kursów + karty cennika                                                                                                         |
| `test_started`              | 1       | `TEST_START`                                                                                                                                                |
| `test_progressed`           | 1       | `TEST_PROGRESS`                                                                                                                                             |
| `test_completed`            | 1       | `TEST_COMPLETED`                                                                                                                                            |
| `test_lead_submitted`       | 1       | `TEST_CONTACT_DETAILS_SENT`                                                                                                                                 |
| `contact_form_submitted`    | 1       | `CONTACT_SEND_FORM`                                                                                                                                         |
| `link_clicked`              | 34      | reszta: nawigacja, stopka, social media, telefon, e-mail, baner cookies, powrót ze strony 404, linki w treści kursów i w opisie testu                       |

Nazwy są w `snake_case`, celowo inne niż `Click`/`Send`/`Start` z GA4 (4.1):
w GA4 nazwą zdarzenia jest `action`, więc CTA do testu i klik w social media to
to samo zdarzenie `Click`. W PostHogu lejek nazywa się sam.

**`toTitleCase` nie dotyczy PostHoga.** To formatowanie robi `react-ga4`
(4.1), więc `source_label` ma wartość dokładnie taką, jak w `events.js` –
`adults - question 01/25`, nie `Adults - Question 01/25`. Filtry po surowym
tekście działają tam, gdzie w GA4 trzeba zgadywać kapitalizację, a redakcja
wszystkiego z `@` też jest wyłącznie zachowaniem `react-ga4`.

### 5.2 Eventy serwerowe

`src/utils/posthogServer.js` (`posthog-node`) wysyła dwa eventy sukcesu z tras
API, **po** tym, jak mail faktycznie wyszedł:

| Event                    | Trasa                                 | Properties                                                                      |
| ------------------------ | ------------------------------------- | ------------------------------------------------------------------------------- |
| `test_results_processed` | `/api/send-test-results`              | `test_type`, `test_level`, `contact_method`, `delivery_type`, `total_questions` |
| `contact_form_processed` | `/api/send-contact-form-notification` | –                                                                               |

Oba dostają dodatkowo `source: 'api'`, co odróżnia je od eventów z przeglądarki.

Dublują się z eventami klienckimi (`test_lead_submitted`,
`contact_form_submitted`) tylko pozornie – mówią co innego. Kliencki znaczy
„przeglądarka doczekała `res.ok`", serwerowy „handler doszedł do końca". Serwer
zawsze policzy tyle samo albo więcej; różnica to zamknięte karty i zerwane
połączenia.

**`test_level` jest w PostHogu i nigdzie indziej poza CSV-ką.** Wynik testu
celowo nie pojawia się w przeglądarce – dostaje go wyłącznie mail – więc ten
event jest jedynym miejscem, gdzie rozkład poziomów da się przeglądać
raportem, bez schodzenia do pliku na serwerze.

### 5.3 Odrzucone zgłoszenia

Każde wczesne wyjście z obu tras formularzowych wysyła
**`lead_submission_rejected`**, zanim odpowie klientowi. Bez tego zgłoszenie
zatrzymane przez limiter albo walidację znikało bez śladu: lead wypełnił
formularz, zobaczył komunikat o błędzie, a w lejku między `test_completed`
a `test_lead_submitted` została po nim dziura nie do policzenia.

| `reason`           | Status | Kiedy                                                |
| ------------------ | ------ | ---------------------------------------------------- |
| `auth_failed`      | 401    | brak albo zły `x-api-key`                            |
| `rate_limited`     | 429    | limit na IP (5/min dla testu, 3/min dla kontaktu)    |
| `missing_fields`   | 400    | brak wymaganego pola                                 |
| `invalid_email`    | 400    | e-mail nie przechodzi walidacji                      |
| `message_too_long` | 400    | wiadomość > 2000 znaków (tylko formularz kontaktowy) |

Do tego `route` (`send-test-results` albo `send-contact-form-notification`)
i `status_code`. Odpowiedź dla klienta jest bajt w bajt taka jak wcześniej –
zmieniło się tylko to, że wyjście po drodze raportuje samo siebie.

**Metody 405 celowo nie ma na tej liście.** Żądanie inne niż POST to skaner,
nigdy człowiek z wypełnionym formularzem; liczenie go zaśmieciłoby jedyną
metrykę, po którą się do tego zdarzenia chodzi. Z tego samego powodu odrzuceń
nie raportuje `/api/track-test-completed` – ta trasa strzela sama z siebie,
bez udziału użytkownika, więc jej 429 to utracony sygnał konwersji, a nie
utracony lead.

`auth_failed` warto mieć na oku osobno: pojawia się nie tylko przy botach, ale
też wtedy, gdy deploy nie podstawi `<NEXT_PUBLIC_API_KEY>` i **każdy** formularz
na produkcji zaczyna zwracać 401.

Po stronie przeglądarki odpowiednikiem jest wyjątek, nie event. Oba formularze
dokładają teraz status odpowiedzi do treści błędu
(`Failed to send email: 429`, `Contact form submit failed: 502`), więc
w PostHogu widać, czy porażkę widział też serwer. Awaria bez pary po stronie
serwera oznacza, że żądanie w ogóle do niego nie dotarło.

### 5.4 Sklejanie sesji klient ↔ serwer

Event serwerowy sam z siebie nie wie, kto go wywołał.
`getRequestHeadersAsync()` (`posthog.js:96`) dokłada do fetchy obu formularzy
dwa nagłówki:

```
X-PostHog-Distinct-ID
X-PostHog-Session-ID
```

Trasy czytają je (`send-test-results.js:141`,
`send-contact-form-notification.js:89`) i podają dalej do `captureEvent`, więc
event serwerowy ląduje na tej samej osobie i tej samej sesji co kliknięcia
i nagranie. Gdy nagłówka nie ma – PostHog wyłączony, zablokowany chunk, ktoś
woła API bezpośrednio – trasa generuje `randomUUID()`: event istnieje, ale jest
osierocony.

Obie strony są odporne na brak PostHoga i **żadna nie może opóźnić odpowiedzi**:

- `getRequestHeadersAsync()` zwraca `{}`, więc wynik rozsypuje się spreadem
  bezwarunkowo, a nagłówki o wartości `undefined` są odfiltrowane (poszłyby
  jako dosłowny string `"undefined"`).
- `captureEvent` jest **fire-and-forget**. `posthog-node` dostaje `flushAt: 1`
  i `flushInterval: 0`, bo Passenger trzyma proces między żądaniami, więc
  biblioteka sama dowozi event w tle. **Nigdy nie `await`-uj flusha w handlerze**
  – w tym miejscu mail leada już wyszedł i problem z analityką nie ma prawa
  zamienić dostarczonego leada w 500.

### 5.5 Wyjątki

Trzy źródła, wszystkie do PostHoga:

- **Nieobsłużone w przeglądarce** – łapie je sama biblioteka
  (`capture_exceptions: true`).
- **Obsłużone w przeglądarce** – `sendExceptionAsync(error)` w blokach `catch`
  obu formularzy (`ContactForm.js:56`, `TestResultsView.js:141`). Funkcja sama
  inicjalizuje klienta, więc komponent nie musi trzymać instancji.
- **Serwerowe** – `captureException` w `catch` obu tras API, razem
  z `distinctId` i `sessionId`, więc błąd 500 widać na tej samej sesji co próbę,
  która go wywołała.

To jedyny kanał raportowania błędów w serwisie – nie ma Sentry ani innego
monitoringu.

### 5.6 Session replay i dane osobowe

`session_recording.maskAllInputs: true` (`posthog.js:39`). Każdy input na tej
stronie zbiera dane leada – imię, e-mail, telefon – a replay nagrywa ekran,
więc maskowanie jest tu warunkiem działania, nie ustawieniem do podkręcenia.

Poza tym **do PostHoga nie idą żadne dane osobowe**. Eventy niosą typ testu,
poziom, sposób kontaktu i etykiety kliknięć; imię, e-mail i telefon trafiają
wyłącznie do maila i do CSV-ki (`CSV_FILE_PATH`). Przy dokładaniu properties
trzymaj tę granicę – raz wysłanego property nie da się cofnąć z projektu.

### 5.7 Właściwości zdarzeń testu

Trzy zdarzenia raportujące ukończony test – `test_completed`,
`test_lead_submitted` (przeglądarka) i `test_results_processed` (serwer) –
niosą ten sam zestaw właściwości:

| Właściwość        | Typ    | Przykład   | Uwagi                                    |
| ----------------- | ------ | ---------- | ---------------------------------------- |
| `test_type`       | string | `'adults'` | `'adults'` albo `'teens'`                |
| `test_level`      | string | `'B1'`     | sam kod, bez tytułu poziomu              |
| `score`           | number | `14`       | liczba poprawnych odpowiedzi             |
| `total_questions` | number | `25`       | różna dla `adults` i `teens`             |
| `score_percent`   | number | `56`       | jedyna miara porównywalna między testami |

`test_completed` leci **zaraz po ostatnim pytaniu**, zanim pojawi się
formularz. To jedyne źródło wiedzy o osobach, które porzuciły lejek na
formularzu kontaktowym: do CSV-ki one nie trafiają, bo wiersz powstaje dopiero
przy wysłaniu danych. Niesie dodatkowo `duration_seconds` – czas od wyboru typu
testu do ekranu wyników. Cały test jest jednym page view'em (3.4), więc PostHog
nie ma dla niego żadnej innej miary czasu.

Dwa zdarzenia z wnętrza lejka niosą własny, mniejszy zestaw:

| Zdarzenie         | Właściwości                                                                          |
| ----------------- | ------------------------------------------------------------------------------------ |
| `test_started`    | `test_type`                                                                          |
| `test_progressed` | `test_type`, `question_number`, `total_questions`, `seconds_since_previous_question` |

`question_number` jest tu najważniejszy: krzywa porzuceń to powód, dla którego
to zdarzenie istnieje, a breakdown po liczbie bije wyciąganie `question 07/25`
z `source_label` regexpem. Etykieta GA4 nie zmieniła się ani o znak – lejek
`Test / Progress` w GA4 działa dokładnie tak jak wcześniej (4.6).

`seconds_since_previous_question` mierzy czas **między raportami**, nie między
renderami: cofnięcie się do wcześniejszego pytania i powrót wlicza się w czas
dojścia do kolejnego. Na pierwszym pytaniu właściwości nie ma w ogóle – nie ma
poprzedniego pytania, a zero czytałoby się jako „odpowiedział natychmiast"
i zaniżało średnią. Jawne zero (ktoś przeskoczył pytanie w mniej niż sekundę)
jest wysyłane normalnie.

Właściwości pochodzą z opcjonalnego pola `posthogProperties` na stałej
zdarzenia w `events.js`. `sendEvent` rozsypuje je obok pól `source_*`; ścieżka
GA4 czyta wyłącznie `category`, `action` i `label`, więc pola nie widzi.

Na zdarzeniu serwerowym `test_level` i `score` pochodzą z dwóch pól dodanych do
body żądania wyłącznie na potrzeby analityki: `testLevelCode` i
`correctAnswers`. Istniejące `testLevel` (`'B1 - Intermediate'`) i `testScore`
(`'14/25'`) zostają w postaci, w jakiej trafiają do CSV-ki i do maili.

---

## 6. Eventy Facebook Pixel (konwersje z testu)

To jedyne miejsce, gdzie mierzone są realne konwersje. Definicje w
`facebookEvents.js`, obie parametryzowane typem testu (`adults` / `teens`):

| Moment                                                            | Event FB               | Gdzie                    | Payload                                                             |
| ----------------------------------------------------------------- | ---------------------- | ------------------------ | ------------------------------------------------------------------- |
| Użytkownik skończył pytania, pokazuje się ekran wyniku            | `CompleteRegistration` | `test-poziomujacy.js:65` | `content_name: 'Test poziomujący'`, `content_category: <typ testu>` |
| Użytkownik zostawił dane kontaktowe i **mail faktycznie wyszedł** | `Lead`                 | `TestResultsView.js:146` | jw.                                                                 |

**Dlaczego akurat tak, a nie odwrotnie.** W słowniku Mety `Lead` znaczy
„zostawił kontakt" – i to ten event Menedżer reklam podpowiada jako domyślny cel
kampanii Kontakty. Gdyby wisiał na ukończeniu testu, kampania optymalizowałaby
się pod ludzi kończących quiz i znikających: kupowałbyś porzucone testy w
przekonaniu, że kupujesz kontakty. Ukończony test jest krokiem, który do
formularza dopiero prowadzi, stąd `CompleteRegistration`.

Szczegóły, które łatwo przeoczyć:

- `CompleteRegistration` leci w `handleTestComplete`, czyli **raz na ukończony
  test**, dokładnie przy przejściu na ekran wyników.
- `Lead` leci **po** sprawdzeniu `emailResponse.ok`, a nie przy kliknięciu „wyślij". Jeśli `/api/send-test-results` zwróci błąd, konwersja
  nie jest raportowana – zgodnie z komentarzem w kodzie
  („track only once the email actually went out").
- **Porzucenia testu mierzy GA, nie Pixel** – Pixel zna wyłącznie dwa punkty
  końcowe lejka (`CompleteRegistration`, `Lead`). Na którym z 25 pytań ludzie
  odpadają, widać w eventach `Test / Progress` (sekcja 4.6).
- `CompleteRegistration` (FB) i `TEST_COMPLETED` (GA) lecą w tym samym miejscu
  i oznaczają to samo zdarzenie – ukończenie testu. Przy zmianach trzeba ruszać oba naraz.

### 6.1 Conversions API – ta sama konwersja drugim kanałem

Obie konwersje z tabeli wyżej lecą **dwa razy**: raz z przeglądarki (Pixel) i raz
z serwera (Conversions API, `utils/metaCapi.js`). Powód jest taki, że `fbq()`
wykonuje się u użytkownika, więc adblock, ITP w Safari, odrzucona zgoda cookie
albo zamknięta karta potrafią zgubić konwersję – a to jedyne zdarzenie, pod które
optymalizuje się kampanię reklamową.

**Deduplikacja jest obowiązkowa.** Meta skleja parę po `event_name` + `event_id`;
bez wspólnego id ta sama konwersja policzyłaby się dwukrotnie. `createEventId()`
(`facebookPixel.js`) generuje UUID, a obie strony wysyłają dokładnie ten sam.
`ReactPixel.track()` przyjmuje tylko dwa argumenty i nie ma gdzie przyjąć id,
dlatego `sendEvent` schodzi do `ReactPixel.fbq('track', name, data, { eventID })`
– to własna furtka biblioteki do globalnego `fbq`.

Oba zdarzenia idą inną drogą, bo serwer wie o użytkowniku co innego w każdym
z tych dwóch momentów:

| Event                  | Endpoint serwerowy                                | Dane dopasowania                                        |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| `CompleteRegistration` | `POST /api/track-test-completed`                  | `_fbp` / `_fbc`, IP i User-Agent – **nic z formularza** |
| `Lead`                 | `POST /api/send-test-results` (przy okazji maila) | jw. + haszowany e-mail, telefon, imię i nazwisko        |

`CompleteRegistration` leci przed formularzem, więc w tym momencie nie ma
jeszcze żadnego maila – stąd osobny, lekki endpoint, który nie dotyka ani CSV, ani SMTP.

Szczegóły, które łatwo przeoczyć:

- **Wszystko, co użytkownik wpisał, jest hashowane SHA-256** w `metaCapi.js`
  i nigdy nie opuszcza serwera otwartym tekstem.
- **Ale „bez danych osobowych" to nadużycie** i nie należy tak o tym pisać.
  Jawnie lecą `_fbp`, `_fbc`, adres IP i User-Agent. To trwałe identyfikatory,
  które pozwalają wyodrębnić konkretną przeglądarkę i powiązać ją z profilem
  reklamowym – pod RODO są danymi osobowymi, a hashowanie pól formularza tego
  nie zmienia. Endpoint ukończenia testu jest więc „bez pól z formularza",
  a nie „bez danych osobowych".
- **Normalizacja musi się zgadzać, inaczej hash nie pasuje do niczego.** Mail
  jest trimowany i lowercase'owany, a telefon sprowadzany do cyfr E.164 – numer
  z formularza (`123 456 789`) dostaje prefiks `48`.
- **`_fbc` bywa odtwarzane z URL-a.** Normalnie zapisuje je Pixel przy wejściu
  z `fbclid`, ale zablokowany Pixel nigdy tego nie zrobi – a to dokładnie ta
  wizyta, którą CAPI ma uratować. `buildClickIdFromUrl()` składa je ręcznie
  w udokumentowanym formacie `fb.1.<timestamp>.<fbclid>`.
- **Żądanie z przeglądarki idzie z `keepalive: true`** – ekran wyników to miejsce,
  z którego ludzie wychodzą, a bez tego przeglądarka może anulować request przy
  zamknięciu karty.
- **Serwerowa strona jest fire-and-forget**, z tego samego powodu co
  `posthogServer.js`: mail do leada już wyszedł, więc niedostępny Graph API nie
  może ani opóźnić odpowiedzi, ani zamienić dostarczonego leada w 500.
- **Bez `META_CAPI_ACCESS_TOKEN` CAPI jest wyłączone w całości** i zostaje sam
  Pixel. W `NODE_ENV=development` nic nie wychodzi – jest tylko `console.log`,
  i to z hashami, nie z wartościami.
- `/api/track-test-completed` wymaga `x-api-key` i ma limit 10 żądań/min na IP
  (`utils/rateLimit.js`). Fałszywe konwersje wstrzykiwane z zewnątrz psułyby
  optymalizację kampanii, nie tylko statystyki.

---

## 7. Zgoda na cookies

`src/components/CookieConsent.js` (`react-cookie-consent`) renderuje baner
w `_app.js` z przyciskiem „Akceptuję", ciasteczkiem `cookieConsent` i wygaśnięciem
po 90 dniach.

**Baner jest wyłącznie informacyjny – nie bramkuje trackingu.** GA4, FB Pixel
i PostHog inicjalizują się i wysyłają page view przy pierwszym renderze,
niezależnie od tego, czy użytkownik kliknął „Akceptuję", czy w ogóle zauważył
baner. Nie ma kodu, który czytałby ciasteczko `cookieConsent` przed wysłaniem
czegokolwiek.

Dotyczy to teraz trzech dostawców zamiast dwóch, a PostHog dokłada do tego
**nagranie sesji**, które startuje razem z klientem – też przed jakąkolwiek
decyzją użytkownika. Maskowanie inputów (5.6) ogranicza, co jest w nagraniu,
ale nie zmienia tego, kiedy się zaczyna.

Treść banera odsyła do [polityki prywatności](../src/pages/polityka-prywatnosci/index.js),
a kliknięcie w ten link wysyła `COOKIE_CONSENT_CLICK_PRIVACY_POLICY`. Nie tworzy
to nowych ciasteczek – GA jest zainicjalizowane page view'em z `_app.js`, zanim
baner się pokaże – ale jeśli tracking zostanie kiedyś zabramkowany zgodą
(punkt 2 w [todo.md](todo.md)), **ten event trzeba wyłączyć jako pierwszy**:
z definicji leci od kogoś, kto jeszcze nie zdecydował.

---

## 8. Jak dodać nowy event

1. Dodaj stałą w `src/services/tracking/events.js` (GA4 + PostHog) lub
   `facebookEvents.js` (Pixel). Trzymaj się konwencji
   `<OBSZAR>_<AKCJA>_<CEL>` i istniejących kategorii.
2. Jeśli event jest częścią lejka (CTA do testu, zapis na kurs, krok testu,
   wysyłka formularza), dodaj w tej samej stałej pole `posthogEvent` z nazwą
   w `snake_case` – najlepiej istniejącą, żeby nie mnożyć wariantów tego samego
   kroku. Bez tego pola event i tak trafi do PostHoga, jako `link_clicked`
   (5.1); pomijaj je świadomie, a nie przez zapomnienie.
3. W komponencie: `const trackClick = useClickTracking();` i
   `onClick={() => trackClick(events.TWOJ_EVENT)}` – to jedno wywołanie obsłuży
   GA4 i PostHoga. Dla konwersji FB: `useFacebookEventTracking()`.
4. Jeśli event ma oznaczać sukces operacji (wysyłka maila, zapis), wywołaj go
   **po** potwierdzeniu sukcesu, nie w handlerze kliknięcia – tak jak
   `CONTACT_SEND_FORM` i `TEST_CONTACT_DETAILS_SUBMITTED`.
5. Event serwerowy (coś, co da się stwierdzić dopiero w trasie API) dodaj przez
   `captureEvent` z `utils/posthogServer.js`, z `distinctId` i `sessionId`
   odczytanymi z nagłówków (5.4). **Bez `await`** i zawsze po wysyłce maila.
6. Sprawdź lokalnie (`npm run dev`) – event musi pojawić się w konsoli jako
   `GA: send event` / `FB: send event` / `PostHog: send event`. Na produkcji
   zweryfikuj w GA4 DebugView, Meta Events Manager i w widoku Activity
   w PostHogu. Pamiętaj, że page view'ów i replay PostHoga lokalnie nie
   zobaczysz w ogóle (2.3).
