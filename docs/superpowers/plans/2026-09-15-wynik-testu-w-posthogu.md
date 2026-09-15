# Wynik testu poziomującego w PostHogu – plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wysyłać do PostHoga liczbę punktów i poziom przy ukończeniu testu – także dla osób, które nie zostawiły danych kontaktowych i przez to nie trafiają do CSV.

**Architecture:** Stałe zdarzeń w `events.js` zyskują opcjonalne pole `posthogProperties`, które `sendEvent` rozsypuje do właściwości zdarzenia; ścieżka GA4 tego pola nie widzi. Dwie fabryki zdarzeń testu przyjmują wynik i poziom jako argumenty. Trasa API dostaje dwa nowe, opcjonalne pola w body, służące wyłącznie analityce – format CSV i treść maili zostają bez zmian.

**Tech Stack:** Next.js 15 (Pages Router), React 19, `posthog-js`, `posthog-node`, ESLint (`--max-warnings=0`), Prettier.

Spec: [docs/superpowers/specs/2026-09-15-wynik-testu-w-posthogu-design.md](../specs/2026-09-15-wynik-testu-w-posthogu-design.md)

---

## Uwaga o weryfikacji: w tym projekcie nie ma testów

`npm test` to `echo 'No tests'`, a CLAUDE.md mówi wprost: **nie wolno raportować
„testy przechodzą” jako dowodu.** Standardowy cykl TDD nie ma tu zastosowania.
Każde zadanie kończy się zamiast tego:

1. `npm run lint` (`--max-warnings=0`),
2. `npm run prettier`,
3. ręcznym sprawdzeniem w `npm run dev`.

W `NODE_ENV=development` **nic nie wychodzi z przeglądarki ani z serwera** –
oba `sendEvent` tylko `console.log`-ują. To jedyny sposób weryfikacji trackingu
lokalnie i dlatego logi są dowodem, którego szukamy.

## Dwie zmiany względem spec-a, ustalone na etapie planowania

1. **`testScoreProperties` przyjmuje poziom jako argument**, zamiast wołać
   `getLevel` wewnątrz `events.js`. Spec (sekcja 6) pokazywał wariant z
   `getLevel` w helperze. Byłby to regres rozmiaru bundle'a: `getLevel`
   odwołuje się do `testData`, więc import wciągnąłby **cały bank pytań**
   (~470 linii) do `events.js`, a ten jest przez `services/tracking/index.js`
   ładowany na **każdej stronie**, która śledzi kliknięcie. Poziom wyliczają
   wywołujący – oba i tak mają `testData` w swoim bundlu.
2. **Nowe pole `testLevelCode` w body trasy API.** Spec (sekcja 5) zakłada, że
   `test_level` ma wszędzie postać `'B1'`. Klient wysyła dziś w `testLevel`
   łańcuch złożony `'B1 - Intermediate'`, który trafia do CSV i do maili i
   dlatego nie może się zmienić. Bez osobnego pola właściwość `test_level`
   miałaby inną wartość na zdarzeniu klienckim niż na serwerowym.

## Struktura plików

| Plik                                     | Rola po zmianie                                                             |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| `src/services/tracking/posthog.js`       | `sendEvent` rozsypuje `posthogProperties` obok pól `source_*`               |
| `src/services/tracking/events.js`        | helper `testScoreProperties` + dwie fabryki z nowymi argumentami            |
| `src/pages/test-poziomujacy.js`          | wywołanie `TEST_COMPLETED` z wynikiem, liczbą pytań i poziomem              |
| `src/components/test/TestResultsView.js` | wywołanie `TEST_CONTACT_DETAILS_SENT` + dwa nowe pola w body żądania        |
| `src/pages/api/send-test-results.js`     | odczyt dwóch nowych pól, właściwości `score` / `score_percent` na zdarzeniu |
| `docs/tracking.md`, `CLAUDE.md`          | dokumentacja                                                                |

Kolejność zadań jest tak dobrana, że **każdy commit zostawia repo w spójnym
stanie**. Zadanie 1 niczego nie zmienia w zachowaniu; zadanie 2 zmienia
sygnatury i **oba** ich wywołania w jednym commicie.

---

## Task 1: `posthogProperties` w warstwie trackingu

Zmiana bez wpływu na zachowanie: dokłada punkt rozszerzenia, z którego jeszcze
nikt nie korzysta. Żadne z ~30 istniejących zdarzeń nie wymaga dotknięcia, bo
brak pola daje dokładnie dotychczasowe właściwości.

**Files:**

- Modify: `src/services/tracking/posthog.js:53-70`

- [ ] **Step 1: Rozszerzyć `sendEvent`**

Zastąpić całą funkcję `sendEvent`:

```js
function sendEvent(
  posthog,
  { category, action, label, posthogEvent, posthogProperties },
) {
  const properties = {
    source_category: category,
    source_action: action,
    source_label: label,
    // Domain properties from the event constant. The `source_` prefix is
    // reserved for the fields mapped over from the GA4 model, so a constant can
    // never collide with them.
    ...posthogProperties,
  };

  if (isDev) {
    console.log(
      `PostHog: send event: ${posthogEvent || DEFAULT_EVENT_NAME}`,
      properties,
    );

    return;
  }

  posthog?.capture(posthogEvent || DEFAULT_EVENT_NAME, properties);
}
```

- [ ] **Step 2: Sprawdzić, że ścieżka GA4 nic o tym nie wie**

Run: `grep -n "posthogProperties\|posthogEvent" src/services/tracking/googleAnalytics.js`
Expected: brak wyników. `googleAnalytics.js` czyta wyłącznie `category`,
`action` i `label`, więc `useClickTracking` może dalej karmić oba destynacje
tym samym obiektem.

- [ ] **Step 3: Lint i format**

Run: `npm run lint && npm run prettier`
Expected: oba przechodzą bez błędów.

- [ ] **Step 4: Commit**

```bash
git add src/services/tracking/posthog.js
git commit -m "feat: let event constants carry PostHog properties"
```

---

## Task 2: Punkty i poziom na zdarzeniach klienckich

Sedno zmiany. `test_completed` leci **zaraz po ostatnim pytaniu**, na długo
przed formularzem – i to jest jedyny sygnał, jaki zostawia po sobie osoba,
która zrezygnowała. Dlatego właśnie to zdarzenie musi nieść wynik.

Sygnatury i oba wywołania zmieniają się w jednym commicie: gdyby rozbić je na
dwa, pośredni stan wysyłałby `score: undefined` i `score_percent: NaN`.

**Files:**

- Modify: `src/services/tracking/events.js:1-4` (helper obok `paddedQuestion`)
- Modify: `src/services/tracking/events.js:140-151` (dwie fabryki)
- Modify: `src/pages/test-poziomujacy.js:1-8` (import), `:50-56` (`handleTestComplete`)
- Modify: `src/components/test/TestResultsView.js:119`

- [ ] **Step 1: Dodać helper w `events.js`**

Wstawić **bezpośrednio pod** istniejącym `paddedQuestion`, czyli przed
pierwszym `export`. ESLint ma włączone `import/exports-last` – pomocnik
umieszczony niżej, między eksportami, wywali build.

```js
// Shared by every event that reports a finished test, so the two factories
// cannot drift apart. The level arrives as a plain code ('B1'), never as the
// object getLevel returns: importing getLevel here would pull the whole
// question bank into events.js, and events.js is loaded by every page that
// tracks a click.
const testScoreProperties = (testType, score, totalQuestions, level) => ({
  test_type: testType,
  test_level: level,
  score,
  total_questions: totalQuestions,
  score_percent: Math.round((score / totalQuestions) * 100),
});
```

- [ ] **Step 2: Zmienić dwie fabryki w `events.js`**

Zastąpić istniejące `TEST_COMPLETED` i `TEST_CONTACT_DETAILS_SENT`.
`category`, `action` i `label` **zostają bez zmian** – na nich stoją raporty
GA4 zbudowane w poprzednim kroku.

```js
export const TEST_COMPLETED = (testType, score, totalQuestions, level) => ({
  category: 'Test',
  action: 'Complete',
  label: testType,
  posthogEvent: 'test_completed',
  posthogProperties: testScoreProperties(
    testType,
    score,
    totalQuestions,
    level,
  ),
});
export const TEST_CONTACT_DETAILS_SENT = (
  testType,
  score,
  totalQuestions,
  level,
) => ({
  category: 'Test',
  action: 'Send',
  label: testType,
  posthogEvent: 'test_lead_submitted',
  posthogProperties: testScoreProperties(
    testType,
    score,
    totalQuestions,
    level,
  ),
});
```

- [ ] **Step 3: Dodać import w `src/pages/test-poziomujacy.js`**

Wstawić po imporcie `TestResultsView`. `import/order` jest ustawione na
`'newlines-between': 'never'` i bez `alphabetize`, więc miejsce w obrębie grupy
importów względnych jest dowolne, ale **pustej linii między nimi być nie może**.

```js
import { testData, getLevel } from '../data/testData';
```

Strona nie płaci za to rozmiarem bundle'a: renderuje `TestResultsView`, który
importuje `testData` już dziś.

- [ ] **Step 4: Zmienić `handleTestComplete`**

```js
const handleTestComplete = (finalScore) => {
  setScore(finalScore);
  setShowResults(true);
  // Both fire once per completed test, at the transition to the results screen
  trackClick(
    events.TEST_COMPLETED(
      selectedTest,
      finalScore,
      testData[selectedTest].questions.length,
      getLevel(finalScore, selectedTest)?.level,
    ),
  );
  trackFacebookEvent(facebookEvents.TEST_COMPLETED_LEAD(selectedTest));
};
```

**Musi to być `finalScore`, nie stan `score`.** `setScore` jest asynchroniczne –
w tym samym przebiegu `score` trzyma jeszcze poprzednią wartość, więc każde
zdarzenie raportowałoby wynik poprzedniego podejścia (a pierwsze: zero).

**`?.level` jest wymagane.** `getLevel` to `levels.find(...)`, które zwraca
`undefined`, gdy wynik wypadnie poza wszystkimi przedziałami. Dziś progi
pokrywają pełny zakres, ale literówka w `testData.js` nie może wywracać
ukończenia testu.

- [ ] **Step 5: Zmienić wywołanie w `src/components/test/TestResultsView.js:119`**

`score`, `selectedTest` i `level` są już w scope (`level` to obiekt z
`getLevel`, stąd `level?.level`).

```js
trackClick(
  events.TEST_CONTACT_DETAILS_SENT(
    selectedTest,
    score,
    testData[selectedTest].questions.length,
    level?.level,
  ),
);
```

- [ ] **Step 6: Sprawdzić, że nie został żaden stary sposób wywołania**

Run: `grep -rn "TEST_COMPLETED(\|TEST_CONTACT_DETAILS_SENT(" src/ | grep -v facebookEvents`
Expected: cztery wyniki – dwie definicje w `events.js` i dwa wywołania,
każde czteroargumentowe. `facebookEvents.TEST_COMPLETED_LEAD` to osobna stała
i **nie** podlega tej zmianie.

- [ ] **Step 7: Lint i build**

Run: `npm run lint && npm run prettier && npm run build`
Expected: wszystkie trzy przechodzą; `/test-poziomujacy` buduje się.

- [ ] **Step 8: Weryfikacja ręczna w dev**

Run: `npm run dev`, wejść na `http://localhost:3000/test-poziomujacy`,
przejść **cały** test dla wariantu `adults`.

Expected w konsoli przeglądarki, zaraz po ostatnim pytaniu:

```
PostHog: send event: test_completed {
  source_category: 'Test', source_action: 'Complete', source_label: 'adults',
  test_type: 'adults', test_level: 'B1', score: 14,
  total_questions: 25, score_percent: 56
}
```

`score` i `score_percent` muszą być **liczbami**, a `test_level` samym kodem
(`'B1'`), bez tytułu poziomu.

- [ ] **Step 9: Powtórzyć dla wariantu `teens`**

Ten sam przebieg z drugim testem. `total_questions` musi odpowiadać liczbie
pytań wariantu `teens`, a nie być na sztywno 25 – to jedyny sposób sprawdzenia,
że `score_percent` normalizuje różnicę między wariantami.

- [ ] **Step 10: Commit**

```bash
git add src/services/tracking/events.js src/pages/test-poziomujacy.js src/components/test/TestResultsView.js
git commit -m "feat: report test score and level to PostHog"
```

---

## Task 3: Punkty na zdarzeniu serwerowym

`test_results_processed` wysyła dziś poziom, ale nie punkty. Poziom to sześć
koszyków, punkty to rozkład.

Serwer nie ma liczby punktów, bo klient wysyła `testScore` jako łańcuch
`'14/25'`. Ten łańcuch trafia **wprost do CSV i do maili** i dlatego nie może
się zmienić. Parsowanie go po stronie serwera jest odrzucone: zmiana formatu
wyświetlania po cichu zamieniłaby analitykę w `NaN`.

**Files:**

- Modify: `src/components/test/TestResultsView.js:95-104` (body żądania)
- Modify: `src/pages/api/send-test-results.js:159-168` (destrukturyzacja), `:249-260` (`captureEvent`)

- [ ] **Step 1: Dodać dwa pola do body w `TestResultsView.js`**

W obiekcie `JSON.stringify({ ... })` przekazywanym do `/api/send-test-results`,
**po** istniejącym `totalQuestions`:

```js
          totalQuestions: testData[selectedTest].questions.length,
          // Analytics only: `testScore` is the display string that goes to the
          // CSV and the emails, and `testLevel` carries the level title with it.
          // Neither can change shape, so PostHog gets its own plain values.
          correctAnswers: score,
          testLevelCode: level?.level,
```

Pozostałe pola (`fullName`, `email`, `phone`, `contactMethod`, `testScore`,
`testLevel`, `testType`) **zostają nietknięte**.

- [ ] **Step 2: Odczytać nowe pola w trasie API**

W `handler`, rozszerzyć destrukturyzację `req.body`:

```js
const {
  fullName,
  email,
  phone,
  contactMethod,
  testScore,
  testLevel,
  testType,
  totalQuestions,
  correctAnswers,
  testLevelCode,
} = req.body;
```

**Nie dodawać ich do walidacji wymaganych pól.** Przeglądarka z zacache'owanym
starym bundle'em nadal musi dostarczyć leada – ma stracić właściwość w
analityce, a nie dostać 400.

- [ ] **Step 3: Nie ruszać `saveToCSV`**

Run: `grep -n "correctAnswers\|testLevelCode" src/pages/api/send-test-results.js`
Expected: dokładnie dwa wyniki, oba w destrukturyzacji z kroku 2. Jeżeli
którekolwiek pole pojawia się w `saveToCSV` albo w wywołaniach
`sendTestResultsEmail*`, zmiana poszła za daleko – format CSV to jedyny pełny
zapis konwersji sprzed PostHoga i musi zostać bajt w bajt taki sam.

- [ ] **Step 4: Rozszerzyć `captureEvent`**

```js
captureEvent({
  distinctId,
  sessionId,
  event: 'test_results_processed',
  properties: {
    test_type: testType,
    // Prefer the plain code, so this property matches the client-side test
    // events. `testLevel` ('B1 - Intermediate') is the fallback for a stale
    // cached bundle that does not send the code yet.
    test_level: testLevelCode || testLevel,
    contact_method: contactMethod,
    delivery_type: deliveryType,
    total_questions: totalQuestions,
    // Omitted rather than zeroed when the client did not send them: zero is
    // a valid score and a default would skew the distribution.
    ...(typeof correctAnswers === 'number' && {
      score: correctAnswers,
      score_percent: Math.round((correctAnswers / totalQuestions) * 100),
    }),
  },
});
```

- [ ] **Step 5: Lint i build**

Run: `npm run lint && npm run prettier && npm run build`
Expected: wszystkie trzy przechodzą.

- [ ] **Step 6: Weryfikacja ręczna – pełne przejście lejka**

Run: `npm run dev`, przejść test i **wysłać formularz** prawdziwym adresem.

Expected w konsoli przeglądarki:

```
PostHog: send event: test_lead_submitted { ... test_level: 'B1', score: 14, total_questions: 25, score_percent: 56 }
```

Expected w terminalu `next dev`:

```
PostHog (server): send event: test_results_processed {
  test_type: 'adults', test_level: 'B1', contact_method: '...',
  delivery_type: 'both', total_questions: 25, score: 14, score_percent: 56
}
```

`test_level` musi być identyczne po obu stronach (`'B1'`, nie
`'B1 - Intermediate'`) – to jest cały powód istnienia pola `testLevelCode`.

- [ ] **Step 7: Sprawdzić, że CSV i mail się nie zmieniły**

Run: `tail -2 "${CSV_FILE_PATH:-test-results.csv}"`
Expected: nowy wiersz ma dziewięć kolumn w dotychczasowej kolejności, a
`testScore` nadal jest w formacie `"14/25"`. Żadnej kolumny nie przybyło.
Mail z wynikiem obejrzeć na `/email-preview` – treść bez zmian.

- [ ] **Step 8: Przypadek brzegowy – zero punktów**

Przejść test, odpowiadając **wyłącznie błędnie**, i wysłać formularz.
Expected: `score: 0` jest obecne w obu logach jako liczba. Jeżeli właściwość
zniknęła, gdzieś po drodze wynik jest sprawdzany jako wartość falsy zamiast
`typeof === 'number'`.

- [ ] **Step 9: Commit**

```bash
git add src/components/test/TestResultsView.js src/pages/api/send-test-results.js
git commit -m "feat: report test score on the server-side PostHog event"
```

---

## Task 4: Dokumentacja

**Files:**

- Modify: `docs/tracking.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Opisać właściwości w `docs/tracking.md`**

**Uwaga:** `docs/tracking.md` ma już niezacommitowane zmiany opisujące
PostHoga. Dopisać się do nich, **nie nadpisywać** pliku.

W sekcji o PostHogu dodać podsekcję:

```markdown
### Właściwości zdarzeń testu

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
przy wysłaniu danych.

Właściwości pochodzą z opcjonalnego pola `posthogProperties` na stałej
zdarzenia w `events.js`. `sendEvent` rozsypuje je obok pól `source_*`; ścieżka
GA4 czyta wyłącznie `category`, `action` i `label`, więc pola nie widzi.
```

- [ ] **Step 2: Uzupełnić opis warstwy PostHoga w `CLAUDE.md`**

W akapicie o PostHogu, **bezpośrednio po** zdaniu kończącym się słowami
„so no click is silently dropped.", dopisać:

```markdown
An event constant may also carry an optional `posthogProperties` object, spread
alongside the `source_*` fields and invisible to the GA4 path; the test events
use it to report `score`, `test_level` and `score_percent`. `events.js`
deliberately does not import `getLevel` to derive the level itself — that would
pull the whole question bank from `testData.js` into every page that tracks a
click, so the callers pass the level code in.
```

- [ ] **Step 3: Sprostować nieprawdziwe zdanie w `CLAUDE.md`**

W sekcji „Placement test flow" zdanie:

> The score and level are deliberately **never shown in the browser** — they
> only arrive by email, which is what makes the test a lead magnet. Don't "fix"
> that by rendering the result.

**jest nieprawdziwe** – `src/components/test/TestResultsView.js:166-172`
wyświetla poziom, tytuł, opis i liczbę poprawnych odpowiedzi w kolumnie obok
formularza. Zastąpić je:

```markdown
The level and the score are shown on the results screen, in the column next to
the contact form. What the form buys is the e-book and the free trial lesson,
promised in exchange for an email address — that is what makes the test a lead
magnet, not withholding the result.
```

- [ ] **Step 4: Sprawdzić, że nieaktualne zdanie nigdzie nie zostało**

Run: `grep -rn "never shown in the browser" CLAUDE.md docs/`
Expected: brak wyników.

- [ ] **Step 5: Format i commit**

```bash
npm run prettier
git add docs/tracking.md CLAUDE.md
git commit -m "docs: describe test score properties in PostHog"
```

---

## Definition of done

- [ ] `npm run lint` przechodzi z `--max-warnings=0`
- [ ] `npm run prettier` przechodzi
- [ ] `npm run build` przechodzi
- [ ] `test_completed` niesie pięć właściwości w obu wariantach testu
- [ ] `test_lead_submitted` i `test_results_processed` niosą ten sam zestaw
- [ ] `test_level` ma identyczną wartość na zdarzeniach klienckich i serwerowym
- [ ] wynik `0` jest wysyłany jako liczba, nie pomijany
- [ ] wiersz CSV i treść maili są identyczne jak przed zmianą
- [ ] do PostHoga nie trafia żadne imię, e-mail ani telefon
