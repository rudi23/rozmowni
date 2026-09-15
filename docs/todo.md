# Rozmowni.pl – błędy do poprawy

Lista powstała przy analizie warstwy analityki (patrz [tracking.md](tracking.md))
i kodu, przez który ta warstwa przechodzi: strona główna, formularz kontaktowy
i flow testu poziomującego. **To nie jest pełny audyt projektu** – nie
przeglądane były m.in. style, SEO, maile ani API poza ścieżką testu.

Każdy punkt był sprawdzony w kodzie. `npm run lint` przechodzi czysto, więc
żadnego z tych błędów nie wyłapie CI. `npm run prettier` **nie** przechodzi na
`master` (74 pliki) – ale z innego powodu: w repo nie ma żadnej konfiguracji
Prettiera, więc domyślnie oczekuje podwójnych cudzysłowów, a cały kod używa
pojedynczych. To osobna sprawa, niezwiązana z listą poniżej.

Priorytety: **P1** – dane osobowe / zgodność, **P2** – zafałszowane dane
analityczne, **P3** – martwy kod i czystość.

---

## Naprawione (15.09.2026)

- **4** – `CONTACT_CLICK_LINKEDIN` ma label `LinkedIn` zamiast `TikTok`. Od tej
  daty dane LinkedIna i TikToka w GA4 się rozdzielają; wcześniejsze kliknięcia
  w LinkedIn zostają w historycznym `TikTok`.
- **5** – CTA w `NewSemesterSignUp` wysyła nową stałą
  `INDIVIDUAL_COURSE_CLICK_TEST` (`category: 'Individual course'`,
  `label: 'New semester - test'`). `HOME_WHY_US_CLICK_CONTACT` została usunięta,
  bo po tej zmianie nikt jej już nie używał.
- **8** – link do opinii w Google ma `onClick` z nowym
  `OPINIONS_CLICK_GOOGLE_REVIEWS`. Kategoria to `Opinions`, a nie `Home`:
  `Opinions` renderuje się na `/` **i** `/o-nas`, więc `Home` powtórzyłoby
  dokładnie ten błąd, który naprawia punkt 5. Event jest fabryką przyjmującą
  `router.pathname` (jak `FOOTER_CLICK_MENU_ITEM`), więc w GA4 widać osobno
  `Google reviews from '/'` i `Google reviews from '/o-nas'`.
- **10 i 11** – usunięte sześć nigdy niewysyłanych stałych, w tym
  `NOTIFCATION_CLICK` z literówką. `events.js` ma teraz 47 stałych i **wszystkie
  są używane**.
- **7** – pełny lejek testu w GA4: `TEST_START` (wybór typu),
  `TEST_PROGRESS` (każde z 25 pytań, przy wyświetleniu) i `TEST_COMPLETED`
  (ekran wyników). Widać teraz, **na którym pytaniu ludzie porzucają test**.
  Szczegóły i pułapki w [tracking.md](tracking.md), sekcja 4.6.
- **Dodatkowo** (spoza numeracji, z audytu klikalnych elementów): otrackowane
  wychodzące linki do Zoom / Google Meet / Teams w `CourseRequirements`
  oraz link do polityki prywatności w banerze cookies. **Nie ma już
  nieotrackowanych linków ani CTA** – pozostałe klikalne elementy to czyste UI
  (rozwijanie sekcji, hamburger, zwijanie paska). Wysyłka danych kontaktowych
  z testu, wcześniej raportowana wyłącznie na Pixela, ma teraz także event GA
  (`TEST_CONTACT_DETAILS_SENT`), więc lejek domyka się w samym GA4.

Zaktualizowany opis stanu: [tracking.md](tracking.md). Numeracja pozostałych
punktów jest celowo bez zmian.

---

## P1 – dane osobowe i zgodność

### 1. Dane osobowe trafiają do konsoli przeglądarki na produkcji

**Gdzie:** `src/components/test/TestResultsView.js:98`

```js
// Here you would normally send to your backend for contact form
console.log('Form data:', formDataWithScore);
```

`formDataWithScore` zawiera **imię i nazwisko, e-mail, numer telefonu**,
preferowaną formę kontaktu oraz wynik testu. Log nie jest niczym owarunkowany –
leci też w buildzie produkcyjnym, do konsoli każdego użytkownika, który zrobi
test i zostawi dane. Widoczne dla każdego rozszerzenia przeglądarki mającego
dostęp do konsoli.

**Fix:** usunąć linię razem z nieaktualnym komentarzem nad nią (backend jest
wołany wyżej, w `fetch('/api/send-test-results')`).

### 2. Zgoda na cookies nie blokuje analityki

**Gdzie:** `src/components/CookieConsent.js`, `src/pages/_app.js:27-28`

Baner „Akceptuję" jest wyłącznie informacyjny. `usePageViewTracking` (GA4)
i `useFacebookTracking` (FB Pixel) odpalają się w `_app.js` przy pierwszym
renderze i wysyłają page view **zanim** użytkownik cokolwiek kliknie. Żaden
fragment kodu nie sprawdza `cookieConsent` przed wysłaniem zdarzenia.

W praktyce oznacza to, że GA4 i Meta Pixel zapisują identyfikatory bez zgody –
przy RODO/ePrivacy to realne ryzyko, a treść banera („Używamy plików cookies…")
sugeruje użytkownikowi, że ma wybór.

**Fix (do decyzji biznesowej):** albo warunkować inicjalizację trackerów zgodą
(`Cookies.get('cookieConsent') === 'true'`) i wysyłać zaległy page view po
akceptacji, albo świadomie zostawić i dostosować treść banera oraz politykę
prywatności. Wymaga decyzji, nie tylko zmiany w kodzie.

### 3. Brak reguły `no-console` w ESLint

**Gdzie:** `eslint.config.js`

Nic nie pilnuje logów – dlatego punkt 1 przeszedł do `master`. W `src/` jest
obecnie 12 wywołań `console.*`; większość w API i `utils/` jest uzasadniona
(logi serwerowe), ale w kodzie komponentów nie powinno ich być.

**Fix:** dodać `no-console` (np. `warn` z dozwolonym `console.error`) przynajmniej
dla `src/components/**` i `src/pages/**` z wyłączeniem `src/pages/api/**`.

---

## P2 – zafałszowane dane analityczne

### 6. Brak jakiegokolwiek trackingu błędów

**Gdzie:** `src/components/ContactForm.js:44-52`,
`src/components/test/TestResultsView.js:55-120` (`onSubmitContactForm`)

Zdarzenia lecą wyłącznie po sukcesie:

- `CONTACT_SEND_FORM` – tylko przy `res.ok`;
- `TEST_CONTACT_DETAILS_SUBMITTED` – tylko przy `emailResponse.ok`.

Nieudane wysyłki, błędy 401/429/500 z `/api/send-test-results` oraz odrzucenia
przez reCAPTCHA **nie generują żadnego eventu**. Jeśli lejek zacznie się sypać
(np. wygaśnie `API_KEY` albo padnie SMTP), w analityce zobaczymy tylko spadek
konwersji, bez sygnału, że to awaria, a nie gorszy ruch.

**Fix:** dodać eventy błędów z kodem odpowiedzi, np.
`{ category: 'Test', action: 'Error', label: 'send-test-results 500' }`.

---

## P3 – martwy kod i czystość

### 12. Sztuczne opóźnienie i nieaktualny komentarz po wysłaniu formularza testu

**Gdzie:** `src/components/test/TestResultsView.js:97-101`

```js
// Here you would normally send to your backend for contact form
console.log('Form data:', formDataWithScore);

// Simulate API call for contact form
await new Promise((resolve) => setTimeout(resolve, 1000));
```

Backend jest już wywołany wyżej (`fetch('/api/send-test-results')`), więc
komentarze są nieaktualne, a `setTimeout` **opóźnia komunikat sukcesu o sekundę
bez żadnego powodu** – doklejając się do kolejnych 3 s przed przejściem na ekran
sukcesu. Pozostałość po prototypie.

**Fix:** usunąć oba komentarze, `console.log` (punkt 1) i sztuczne `await`.

---

## Konfiguracja

### 13. ID GA4 i Pixela zahardkodowane w kodzie

**Gdzie:** `src/services/tracking/googleAnalytics.js:1`,
`src/services/tracking/facebookPixel.js:1`

```js
const TRACKING_ID = 'G-2XD6SZL2GR';
const PIXEL_ID = '1757361357785350';
```

Nie ma ich w `.env.example` ani `.env.local`. Skutki:

- **staging raportuje do tej samej właściwości GA4 i tego samego Pixela co
  produkcja** – testy zaśmiecają dane biznesowe (deploy staging/production jest
  konfigurowany w `.github/workflows/`);
- zmiana konta analitycznego wymaga edycji kodu, review i deployu.

**Fix:** przenieść do `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_FB_PIXEL_ID`, dopisać
do `.env.example`, a przy braku zmiennej nie inicjalizować trackera (wtedy
staging bez zmiennych jest automatycznie „cichy").

---

## Kolejność prac (propozycja)

1. **Punkty 1 i 12** – jedna zmiana w jednym pliku, usuwa wyciek danych
   osobowych i sztuczne opóźnienie. Zero ryzyka.
2. **Punkt 3** – reguła ESLint, żeby punkt 1 się nie powtórzył.
3. **Punkt 6** – tracking błędów; bez niego spadku konwersji nie odróżnisz
   od awarii.
4. **Punkt 13** – wymaga zmian w CI i sekretach.
5. **Punkty 2 i 9** – zgoda na cookies; punkt 2 wymaga decyzji biznesowej,
   punkt 9 najlepiej zrobić razem z nim.
