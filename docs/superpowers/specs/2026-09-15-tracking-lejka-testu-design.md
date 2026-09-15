# Tracking lejka testu poziomującego – projekt

**Data:** 2026-09-15
**Cel biznesowy:** dowiedzieć się, **czy i gdzie** ludzie porzucają test poziomujący.

Stan wyjściowy opisuje [tracking.md](../../tracking.md); braki, które ta zmiana
domyka, to punkty **7** i część **8** z [todo.md](../../todo.md).

---

## 1. Problem

Cały test to dziś **jeden page view w GA4**. Przejścia intro → pytania → wyniki
są zmianami stanu Reacta, a `usePageViewTracking` reaguje na `router.pathname`.
GA4 nie widzi ani startu testu, ani postępu, ani ukończenia. Jedyne sygnały to
dwie konwersje Facebook Pixela (`Lead` przy ekranie wyników,
`CompleteRegistration` po wysłaniu danych kontaktowych), z których nie da się
odczytać, na którym z 25 pytań ludzie odpadają.

## 2. Zakres

1. Eventy GA4 na start, postęp i ukończenie testu.
2. Domknięcie dwóch pozostałych nieotrackowanych linków: platformy w
   `CourseRequirements` (Zoom / Google Meet / Teams) i link do polityki
   prywatności w banerze cookies.

**Poza zakresem:** tracking błędów (punkt 6 z todo) – osobna zmiana.

## 3. Nowe stałe eventów

```js
export const TEST_START = (testType) => ({
  category: 'Test',
  action: 'Start',
  label: testType, // 'adults' | 'teens'
});

export const TEST_PROGRESS = (testType, question, total) => ({
  category: 'Test',
  action: 'Progress',
  label: `${testType} - question ${String(question).padStart(2, '0')}/${total}`,
});

export const TEST_COMPLETED = (testType) => ({
  category: 'Test',
  action: 'Complete',
  label: testType,
});

export const COURSE_REQUIREMENTS_CLICK_PLATFORM = (platform, path) => ({
  category: 'Course requirements',
  action: 'Click',
  label: `${platform} from '${path}'`,
});

export const COOKIE_CONSENT_CLICK_PRIVACY_POLICY = {
  category: 'Cookie consent',
  action: 'Click',
  label: 'Privacy policy',
};
```

**Zero-padding numeru pytania jest wymagane.** GA4 sortuje etykiety
leksykalnie, więc bez niego `question 10/25` trafia przed `question 2/25`
i krzywa porzuceń wychodzi w losowej kolejności.

`COURSE_REQUIREMENTS_CLICK_PLATFORM` przyjmuje ścieżkę, bo `CourseRequirements`
siedzi w `CourseSidebar`, który renderuje się na **czterech** stronach kursów –
ten sam problem współdzielenia komponentu co w `Opinions`, rozwiązany tym samym
wzorcem fabryki.

## 4. Miejsca wysyłki

| Event            | Plik                                | Funkcja                               |
| ---------------- | ----------------------------------- | ------------------------------------- |
| `TEST_START`     | `src/pages/test-poziomujacy.js`     | `handleTestSelection`                 |
| `TEST_PROGRESS`  | `src/components/test/TestRunner.js` | efekt na `currentQuestion`            |
| `TEST_COMPLETED` | `src/pages/test-poziomujacy.js`     | `handleTestComplete` (obok FB `Lead`) |

Pełny lejek w GA4:

```
page view /test-poziomujacy
  -> Test / Start    / adults
  -> Test / Progress / adults - question 01/25
  -> ...
  -> Test / Progress / adults - question 25/25
  -> Test / Complete / adults
  -> (FB) CompleteRegistration
```

## 5. Semantyka: „dotarł do pytania”, nie „odpowiedział”

`TEST_PROGRESS` leci **przy wyświetleniu** pytania, zanim użytkownik cokolwiek
kliknie.

Gdyby event leciał po wybraniu odpowiedzi, osoba, która zobaczyła pytanie 7
i zrezygnowała, zapisałaby się jako „doszła do pytania 6” – porzucenie zostałoby
przypisane pytaniu 6, podczas gdy odstraszyło pytanie 7. Ostatni event danego
użytkownika ma być dosłownie ostatnim pytaniem, jakie zobaczył.

Konsekwencja: przycisk „Następne” jest zablokowany do czasu wybrania odpowiedzi
(`disabled={selectedAnswer === null}`), więc dotarcie do pytania N+1 oznacza, że
pytanie N zostało odpowiedziane i zatwierdzone. Spadek między `question 07/25`
a `question 08/25` nie rozróżnia „zobaczył i nie odpowiedział” od „odpowiedział
i nie kliknął dalej”. Dla pytania „gdzie porzucają test” odpowiedź jest w obu
przypadkach ta sama, więc świadomie tego nie rozdzielamy.

## 6. Deduplikacja przy cofaniu

`TestRunner` pozwala wrócić do poprzedniego pytania (`handlePreviousQuestion`).
Naiwny event przy każdym wyświetleniu sprawiłby, że użytkownik krążący
Q5 → Q4 → Q5 nabiłby wczesne pytania i **krzywa porzuceń przestałaby być
monotoniczna** – dokładnie ten rodzaj zafałszowanych danych, który opisuje P2
w todo.

Rozwiązanie: `useRef` z najdalej osiągniętym numerem pytania. Event leci tylko
przy pobiciu rekordu, więc w obrębie jednego podejścia `question NN` leci co
najwyżej raz, a raport czyta się wprost jako lejek. Ref żyje per podejście, nie
per użytkownik: odświeżenie strony restartuje test i wczesne pytania polecą
ponownie.

```js
const furthestQuestionRef = useRef(0);

useEffect(() => {
  const questionNumber = currentQuestion + 1;

  if (questionNumber <= furthestQuestionRef.current) {
    return;
  }

  furthestQuestionRef.current = questionNumber;
  trackClick(
    events.TEST_PROGRESS(selectedTest, questionNumber, totalQuestions),
  );
}, [currentQuestion, selectedTest, totalQuestions, trackClick]);
```

## 7. Stabilizacja `useClickTracking`

`trackClick` jest dziś tworzony na nowo przy każdym renderze. W `onClick` to bez
znaczenia, ale w tablicy zależności `useEffect` oznaczałoby restart efektu co
render. ESLint ma włączone `react-hooks` (`recommended-latest`), a `npm run lint`
biegnie z `--max-warnings=0`, więc `exhaustive-deps` nie da się zignorować.

`trackClick` zostanie opakowany w `useCallback` z pustą tablicą zależności –
funkcja domyka się wyłącznie nad importem modułu, więc zmiana jest bezpieczna
dla wszystkich istniejących wywołań.

## 8. Redundancja `Start` vs `question 01/25`

Oba eventy lecą praktycznie jednocześnie (wybór typu → render pierwszego
pytania). Zostawiamy oba świadomie:

- `Start` oznacza „wybrał typ testu” i oddziela to od samego wejścia na stronę;
- `question 01/25` jest punktem odniesienia, dzięki któremu całą krzywą
  Q01 → Q25 czyta się z jednego posortowanego raportu.

## 9. Weryfikacja

Projekt nie ma testów automatycznych (`npm test` to `echo 'No tests'`), więc:

1. `npm run lint` (`--max-warnings=0`) – musi przejść, w szczególności
   `react-hooks/exhaustive-deps`.
2. `npm run build` – `/test-poziomujacy` i strony kursów muszą się zbudować.
3. `npm run dev` + przejście testu ręcznie: w konsoli musi pojawić się
   `GA: send event` ze `Start`, kolejnymi `question NN/25` i `Complete`.
   Cofnięcie się i ponowne przejście w przód **nie może** wygenerować duplikatu.

## 10. Wpływ na dokumentację

- `docs/tracking.md` – nowa sekcja o lejku testu, aktualizacja liczników
  i tabeli kategorii.
- `docs/todo.md` – punkt 7 do „Naprawione”, uzupełnienie punktu 8.
