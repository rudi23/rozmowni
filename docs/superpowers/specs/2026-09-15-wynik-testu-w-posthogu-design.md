# Wynik testu poziomującego w PostHogu – projekt

**Data:** 2026-09-15
**Cel biznesowy:** widzieć w PostHogu **z jakim wynikiem** ludzie kończą test –
także ci, którzy nie zostawili danych kontaktowych i przez to nie istnieją
w CSV.

Stan wyjściowy opisuje [tracking.md](../../tracking.md). Poprzedni krok
w tym samym obszarze:
[2026-09-15-tracking-lejka-testu-design.md](2026-09-15-tracking-lejka-testu-design.md).

---

## 1. Problem

Dziś wynik testu trafia w dwa miejsca i oba wymagają, żeby użytkownik wysłał
formularz: mail do leada/admina i wiersz w CSV (`saveToCSV`
w `src/pages/api/send-test-results.js`). Jedno i drugie dzieje się w tym samym
requeście.

Osoba, która przeszła 25 pytań i zrezygnowała na ekranie z formularzem,
**nie istnieje w CSV w ogóle**. W PostHogu istnieje – jako `test_completed` –
ale to zdarzenie nie niesie ani punktów, ani poziomu. Pytanie „jaki poziom mają
ludzie, którzy rezygnują przed zostawieniem maila” jest dziś bez odpowiedzi,
a to najciekawszy segment w całym lejku: jeśli odpadają głównie początkujący,
problem jest w ofercie, jeśli zaawansowani – w formularzu.

Drugi, mniejszy brak: serwerowe `test_results_processed` wysyła `test_level`,
ale nie liczbę punktów. Poziom to 6 koszyków, punkty to rozkład.

## 2. Zakres

1. Rozszerzenie warstwy trackingu o właściwości PostHoga na zdarzeniu kliknięcia.
2. Punkty + poziom na `test_completed` (klient).
3. Punkty + poziom na `test_lead_submitted` (klient).
4. Punkty na `test_results_processed` (serwer).

**Poza zakresem:**

- Jakiekolwiek dane osobowe w PostHogu – patrz sekcja 3.
- GA4 i Facebook Pixel. GA4 przechodzi w tryb archiwum, a jego model
  `category/action/label` nie ma miejsca na właściwości bez upychania ich
  w etykietę, co zepsułoby raporty zbudowane w poprzednim kroku.
- Format CSV i treść maili – patrz sekcja 7.
- Migracja danych historycznych z GA4. Zbadane i odrzucone: GA4 nie oddaje
  surowych zdarzeń bez eksportu do BigQuery, ten nie działa wstecz, a nawet
  z nim `user_pseudo_id` nie sklei się z `distinct_id` PostHoga.

## 3. Decyzja: zero danych osobowych

Do PostHoga **nie trafia** imię, e-mail ani telefon. Bez `identify()`, bez
person properties z formularza.

Zasada jest już zapisana w CLAUDE.md i wyegzekwowana w kodzie –
`session_recording.maskAllInputs` w `src/services/tracking/posthog.js` maskuje
wszystkie inputy właśnie dlatego, że każdy formularz na tej stronie zbiera dane
leada. Ta zmiana tej zasady **nie narusza**.

Konsekwencja praktyczna: PostHog zostaje narzędziem analitycznym, a nie
procesorem danych osobowych. Nie wymaga to wpisu w polityce prywatności,
bramkowania przez `CookieConsent` ani weryfikacji, gdzie fizycznie stoi
instancja. Gdyby kiedyś padła decyzja odwrotna, wszystkie trzy rzeczy stają się
warunkiem wstępnym.

Wszystko, co dokładamy, to liczby i etykieta poziomu – dane o teście, nie o
człowieku.

## 4. Rozszerzenie warstwy trackingu

`sendEvent` w `src/services/tracking/posthog.js` wysyła dziś wyłącznie trzy pola
przepisane z modelu GA4:

```js
const properties = {
  source_category: category,
  source_action: action,
  source_label: label,
};
```

Nie ma sposobu, żeby dokleić do kliknięcia własną właściwość. Rozważone trzy
warianty:

| Wariant                                      | Ocena                                                                                                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Pole `posthogProperties` na stałej**    | **Wybrany.** Dokładnie ten sam wzorzec, co istniejące opcjonalne `posthogEvent`. `events.js` zostaje jedynym miejscem definiującym kształt zdarzenia. |
| B. Drugi argument `trackClick(event, props)` | Rozbija definicję zdarzenia na dwa miejsca – nazwa w `events.js`, właściwości rozsiane po komponentach.                                               |
| C. Osobny hook dla testu                     | YAGNI. Jedna domena nie uzasadnia równoległej warstwy.                                                                                                |

Zmiana w `sendEvent`:

```js
function sendEvent(
  posthog,
  { category, action, label, posthogEvent, posthogProperties },
) {
  const properties = {
    source_category: category,
    source_action: action,
    source_label: label,
    ...posthogProperties,
  };
  // ...
}
```

Brak pola oznacza zachowanie bez zmian, więc **żadne z istniejących zdarzeń nie
wymaga dotknięcia**. Ścieżka GA4 (`googleAnalytics.js`) czyta wyłącznie
`category`, `action` i `label`, więc nowe pole jest dla niej niewidoczne –
`useClickTracking` nadal karmi oba destynacje tym samym obiektem.

Kolizji nazw nie ma: `posthogProperties` używa nazw domenowych, a prefiks
`source_` jest zarezerwowany dla pól przepisanych z GA4.

## 5. Właściwości i ich nazwy

Na wszystkich trzech zdarzeniach ten sam zestaw:

| Właściwość        | Typ    | Uwagi                        |
| ----------------- | ------ | ---------------------------- |
| `test_type`       | string | `'adults'` \| `'teens'`      |
| `test_level`      | string | `'A1'` … `'C2'`              |
| `score`           | number | liczba poprawnych odpowiedzi |
| `total_questions` | number | różna dla `adults` i `teens` |
| `score_percent`   | number | zaokrąglona liczba całkowita |

Nazwy są wspólne dla klienta i serwera celowo – `test_results_processed` już
dziś wysyła `test_type` i `test_level` pod tymi nazwami, więc wystarczy je
powtórzyć zamiast wymyślać drugi słownik. Bez tego przejście od
`test_completed` do `test_results_processed` w jednym insighcie wymagałoby
dwóch różnych breakdownów na to samo pojęcie.

Naming jest wciąż wolny: `posthog.js` i `posthogServer.js` są w gicie jako
**dodane, ale niezacommitowane** (`git status` → `A`), więc żadne dane pod
starymi nazwami jeszcze nie spłynęły.

`test_type` powiela `source_label` na zdarzeniach klienckich. Redundancja jest
świadoma: właściwości mają być samoopisowe i identyczne po obu stronach,
a `source_label` to artefakt mapowania z GA4, który zniknie, gdy GA4 zostanie
wyłączone.

`score_percent` jest wyliczalne z `score` i `total_questions`, ale
przechowujemy je wprost, bo PostHog nie robi breakdownu po wyrażeniu – a to
jedyna właściwość porównywalna **między** testami `adults` i `teens`, które
mają różną liczbę pytań.

## 6. Zmiany w `events.js`

Wspólny helper trzyma zestaw z sekcji 5 w jednym miejscu, żeby obie fabryki nie
rozjechały się przy kolejnej zmianie:

```js
const testScoreProperties = (testType, score, totalQuestions, level) => ({
  test_type: testType,
  test_level: level,
  score,
  total_questions: totalQuestions,
  score_percent: Math.round((score / totalQuestions) * 100),
});
```

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

`category`, `action` i `label` zostają **bez zmian** –
raporty GA4 z poprzedniego kroku muszą dalej działać.

**Poziom wyliczają wywołujący, nie helper.** `events.js` nie może importować
`getLevel`: funkcja odwołuje się do `testData`, więc import wciągnąłby cały bank
pytań (~470 linii) do modułu ładowanego przez **każdą** stronę, która śledzi
kliknięcie. Oba wywołania mają `testData` w swoim bundlu tak czy inaczej.

**Guard na `getLevel` po stronie wywołujących.** `getLevel` w `src/data/testData.js` to `levels.find(...)`,
które zwraca `undefined`, jeśli wynik wypadnie poza wszystkimi przedziałami.
Dziś progi pokrywają pełny zakres, ale helper nie może wywrócić trackingu przy
literówce w `testData.js` – odczyt poziomu musi być opcjonalny (`?.level`).
To samo dotyczy `testData[testType]`, gdyby fabryka dostała nieznany typ.

## 7. Serwerowe `test_results_processed`

Do właściwości dochodzą `score` i `score_percent`. `test_type`, `test_level`
i `total_questions` już tam są.

Serwer nie ma dziś liczby punktów: klient wysyła `testScore` jako string
`"12/20"` (`TestResultsView.js`), a ten string trafia **wprost do CSV i do
maili**. Dwie drogi:

- **Parsowanie `"12/20"` po stronie serwera** – odrzucone. Parsowanie łańcucha
  prezentacyjnego znaczy, że zmiana formatu wyświetlania po cichu zamienia
  analitykę w `NaN`.
- **Nowe, jawnie liczbowe pole w body** – wybrane. Klient dokłada
  `correctAnswers` (number) obok istniejącego `testScore`.

Drugim nowym polem jest `testLevelCode` (string). Klient wysyła dziś w
`testLevel` łańcuch złożony `"B1 - Intermediate"`, bo w takiej postaci czyta się
go w mailu i w CSV-ce. Bez osobnego pola właściwość `test_level` miałaby na
zdarzeniu serwerowym inną wartość niż na klienckich. Serwer woli `testLevelCode`,
a `testLevel` zostaje fallbackiem dla zacache'owanego starego bundle'a.

Oba pola są **opcjonalne** i nie wchodzą do walidacji wymaganych pól. Dzięki temu
przeglądarka z zacache'owanym starym bundle'em nadal dostarcza leada – traci
tylko jedną właściwość w analityce. Przy braku pola właściwości `score`
i `score_percent` nie są wysyłane wcale; nie podstawiamy zera, bo zero jest
poprawnym wynikiem i zafałszowałoby rozkład.

`saveToCSV`, szablony maili i kontrakt `testScore` **pozostają nietknięte** –
zmiana formatu CSV zerwałaby ciągłość historii leadów, która jest dziś
jedynym pełnym zapisem konwersji sprzed PostHoga.

## 8. Miejsca wysyłki

| Zdarzenie                | Plik                                     | Uwagi                                                                                                       |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `test_completed`         | `src/pages/test-poziomujacy.js`          | `handleTestComplete` ma `finalScore` i `selectedTest`; poziom i liczbę pytań dokłada import z `testData.js` |
| `test_lead_submitted`    | `src/components/test/TestResultsView.js` | `score` i `level` są już w scope                                                                            |
| `test_results_processed` | `src/pages/api/send-test-results.js`     | z nowego `correctAnswers` w body                                                                            |

W `handleTestComplete` trzeba użyć `finalScore`, **nie** stanu `score` –
`setScore` jest asynchroniczne i w tym samym przebiegu `score` trzyma jeszcze
poprzednią wartość. Ten sam argument jest już źródłem prawdy dla `setScore`.

## 9. Weryfikacja

Projekt nie ma testów automatycznych (`npm test` to `echo 'No tests'`), więc:

1. `npm run lint` – `--max-warnings=0`, w szczególności `import/exports-last`
   i `react-hooks/exhaustive-deps`.
2. `npm run prettier`.
3. `npm run build` – `/test-poziomujacy` musi się zbudować.
4. `npm run dev` i ręczne przejście obu testów (`adults`, `teens`). W dev nic
   nie wychodzi z przeglądarki, oba `sendEvent` tylko logują, więc w konsoli
   musi się pojawić:
   - `PostHog: send event: test_completed` z kompletem pięciu właściwości,
   - `PostHog: send event: test_lead_submitted` z tym samym kompletem,
   - `PostHog (server): send event: test_results_processed` ze `score`
     i `score_percent` (log serwerowy, w terminalu `next dev`).
5. Sprawdzić, że wiersz CSV i mail z wynikiem wyglądają **identycznie** jak
   przed zmianą – `testScore` nadal w formacie `"12/20"`.
6. Skrajne wyniki: 0 poprawnych i komplet poprawnych. `score: 0` musi zostać
   wysłane jako liczba, a nie zniknąć jako wartość falsy.

## 10. Wpływ na dokumentację

- `docs/tracking.md` – właściwości zdarzeń testu, opis `posthogProperties`.
- `CLAUDE.md` – dwie poprawki:
  1. opis warstwy PostHoga uzupełnić o `posthogProperties`;
  2. **zdanie „The score and level are deliberately never shown in the browser”
     jest nieaktualne.** `TestResultsView.js` wyświetla poziom, tytuł, opis
     i liczbę punktów w kolumnie obok formularza. Zapis trzeba sprostować, żeby
     opisywał stan faktyczny – lead magnetem jest dziś e-book i lekcja próbna,
     nie ukrycie wyniku.
