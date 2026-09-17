# Rozmowni.pl – audyt SEO

Audyt wykonany 17.09.2026 na gałęzi `feat/meta-conversions-api` (commit
`a13d7eb`) oraz na produkcji `https://rozmowni.pl` (ten sam build – nagłówki
`<head>` strony głównej i testu są identyczne z lokalnym). Dokument opisuje
stan, wskazuje problemy i rekomenduje poprawki z priorytetami. Nic nie zostało
zmienione w kodzie – to sam audyt.

Powiązane: [start.md](start.md) (mapa stron, §5), [tracking.md](tracking.md)
(analityka), [todo.md](todo.md) (błędy trackingu).

---

## 1. Podsumowanie

Fundament techniczny jest dobry: wszystkie strony publiczne są prerenderowane
statycznie (treść jest w HTML bez JavaScriptu), każda ma jeden `<h1>`,
`canonical`, `og:url`, poprawny JSON-LD, obrazy idą przez `next/image` z `alt`,
nieistniejące adresy zwracają prawdziwy status 404, HTTPS i przekierowania
domen działają, TTFB przez Cloudflare to ok. 70–100 ms.

Największe problemy są w warstwie metadanych i treści, nie w infrastrukturze:

| #   | Problem                                                                                                                                                   | Gdzie                                                | Skutek                                                                                                            | Priorytet |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | **`/test-poziomujacy` nie ma żadnych metadanych** – pusty `<title>`, brak `description`, `canonical`, OG i JSON-LD. Potwierdzone na produkcji.            | `src/services/metadata/getMetadata.js` (brak `TEST`) | Najważniejsza strona lejka wyświetla się w Google z tytułem zgadywanym przez wyszukiwarkę; Lighthouse SEO 83/100  | **P0**    |
| 2   | Strona 404 ma pusty `<title>`, brak `<h1>` i tekstu, `alt` po angielsku                                                                                   | `src/pages/404.js`, `Metadata.js`                    | Zła karta w przeglądarce i zero pomocy dla użytkownika, który trafił na zły adres                                 | P0        |
| 3   | Hero na stronie głównej ma `loading="lazy"` – to element LCP                                                                                              | `src/components/Banner.js`                           | LCP mobile 9,4 s, Performance 62/100 (Lighthouse). Pozostałe strony: LCP 2,3 s, Performance 96                    | **P0**    |
| 4   | `/cennik` i `/polityka-prywatnosci` mają pusty `description` → wchodzi ogólny fallback o „rozwoju osobistym i coachingu”                                  | `getMetadata.js` (`getPricing`, `getPrivacyPolicy`)  | Snippet cennika w Google nie mówi nic o cenach                                                                    | P0        |
| 5   | Literówki i błędy w `description`: „calująco” ×2, „jest dla gwarancją”                                                                                    | `getMetadata.js`                                     | Widoczne w wynikach wyszukiwania, podważają wiarygodność szkoły językowej                                         | P0        |
| 6   | Telefon w JSON-LD `EducationalOrganization` to `+48605262227`, a wszędzie indziej (stopka, kontakt, `contactPoint`) `+48506262227`                        | `getMetadata.js`                                     | Niespójne NAP (nazwa/adres/telefon) – szkodzi lokalnemu SEO i wizytówce Google                                    | P0        |
| 7   | ~~Cloudflare „Email Address Obfuscation” zaciemniała adres i doklejała blokujący render skrypt~~ **Wyłączone 17.09.2026**                                 | panel Cloudflare (Scrape Shield)                     | Zdjęte ok. 150 ms blokowania renderu; adres jest teraz publiczny spójnie wszędzie, patrz §4.5                     | zrobione  |
| 8   | `og:image` to logo 512×512 na każdej stronie                                                                                                              | `getMetadata.js`                                     | Słabe podglądy w Messengerze, FB, LinkedIn (zalecane 1200×630)                                                    | P1        |
| 9   | Tytuły stron nie zawierają słów, których ludzie szukają („angielski online”, „kurs”), część bez marki; strona główna reklamuje „Google Meet, Zoom”        | `getMetadata.js`                                     | Mniejszy CTR i słabsze dopasowanie do zapytań                                                                     | P1        |
| 10  | `sitemap.xml` jest statyczny, `lastmod` wszędzie `2025-08-28` mimo dziesiątek zmian treści w 2026, `priority` jest ignorowane przez Google                | `public/sitemap.xml`                                 | Google nie dostaje sygnału o świeżości; łatwo zapomnieć o aktualizacji                                            | P1        |
| 11  | Strony kursów są cienkie (300–380 słów własnej treści), brak linków kontekstowych między kursami, cennikiem i testem                                      | `src/pages/kursy/*`                                  | Trudno rankować na „kurs angielskiego online” bez treści odpowiadającej na pytania użytkownika                    | P1        |
| 12  | FAQ o teście (8 pytań) jest na stronie głównej, a nie na `/test-poziomujacy`                                                                              | `src/components/TestFAQ.js`, `src/pages/index.js`    | Strona testu ma ~50 słów własnej treści; FAQ wzmocniłoby ją i zapytania typu „darmowy test poziomujący angielski” | P1        |
| 13  | Przekierowanie `www → bez www` to 307 (tymczasowe), z `http://www` są dwa skoki                                                                           | `public/.htaccess` (reguła `R=307`)                  | 301 jest jednoznacznym sygnałem trwałej kanonizacji                                                               | P2        |
| 14  | Fonty Google (Montserrat 8 wariantów + Mulish 3) ładowane z `fonts.gstatic.com`, ~109 kB; waga 500 i kursywy prawie nieużywane                            | `public/fonts/*.css`, `_document.js`                 | Dodatkowe połączenie do third-party, opóźniony tekst; `next/font` załatwia to bez zmian w wyglądzie               | P2        |
| 15  | Skrypty firm trzecich: Facebook 199 kB, gtag 165 kB, PostHog 142 kB (w tym 67 kB session recorder), fonty Google 109 kB – razem ~600 kB na każdej stronie | `src/services/tracking/*`                            | TBT 170–330 ms, TTI ~8 s; to koszt świadomy (lejek reklamowy), ale warto go znać                                  | P2        |

Pełny plan wdrożenia z szacunkami jest w [§14](#14-plan-wdrożenia).

---

## 2. Zakres i metoda

Sprawdzono:

1. **Kod**: warstwa metadanych (`src/services/metadata/`, `src/components/Metadata.js`,
   `src/pages/_document.js`, `_app.js`), routing (`src/routes/index.js`), wszystkie
   strony i komponenty treści, `public/` (sitemap, robots, obrazy, fonty, manifest),
   `next.config.js`, workflow deploy.
2. **Wyrenderowany HTML** produkcyjnego buildu (`next build` + `next start` lokalnie)
   dla wszystkich 12 tras: `<title>`, `description`, `robots`, `canonical`, OG,
   JSON-LD, hierarchia nagłówków, atrybuty obrazów (`alt`, `loading`, `sizes`),
   linki wewnętrzne i zewnętrzne, liczba słów.
3. **Produkcja** (`curl`): kody odpowiedzi, przekierowania (`http`, `www`, ukośnik
   końcowy, wielkie litery), nagłówki cache, `robots.txt`, `sitemap.xml`, działanie
   optymalizatora obrazów, modyfikacje HTML wprowadzane przez Cloudflare.
4. **Lighthouse 12.8.2, tryb mobile**, na produkcji: `/`, `/test-poziomujacy`,
   `/kursy/grupowe`. Dane laboratoryjne z jednego przebiegu – traktować jako rząd
   wielkości, nie pomiar (rozrzut LCP między przebiegami może sięgać ±1 s).
5. Jedno zapytanie w Google („rozmowni.pl szkoła angielskiego online Kraków”) –
   zaindeksowane i widoczne są `/`, `/kontakt`, `/kursy/indywidualne`.

**Poza zakresem** (brak dostępu): dane z Google Search Console (zapytania, pozycje,
błędy indeksowania), GA4/PostHog, profil linków zwrotnych, wolumeny fraz.
Rekomendacje słów kluczowych w §8.5 to hipotezy do weryfikacji w GSC / Planerze
słów kluczowych.

---

## 3. Co działa dobrze

- Wszystkie strony publiczne są **statyczne** (`○` w `next build`): pełna treść w
  HTML, robot nie musi wykonywać JS. Wyjątek to wyłączona strona kursów wakacyjnych
  (`ƒ`, zwraca 404).
- **Jeden `<h1>` na stronę**, zawsze na górze (`PageHeader` lub `Banner`).
- **`canonical` + `og:url`** na każdej indeksowanej stronie, spójne z `routeMap`;
  brak `canonical` na `noindex` (`/polityka-prywatnosci`) – poprawnie.
- **JSON-LD parsuje się** na każdej stronie (`WebPage`, `BreadcrumbList`, na `/`
  także `EducationalOrganization`).
- **Obrazy**: zero `<img>` w kodzie (reguła ESLint `@next/next/no-img-element`),
  wszystko przez `next/image` z `alt`, `width`/`height` (CLS 0–0,003), serwowane
  jako WebP (hero 1080 px = 43 kB).
- **Statusy HTTP**: nieistniejące adresy → 404 (nie „soft 404”); `/o-nas/` → 308 na
  `/o-nas`; `http://` → 301 na `https://`; `/O-NAS` → 404 (brak duplikatów przez
  wielkość liter).
- `robots.txt` poprawny, wskazuje sitemapę. Weryfikacja Google Search Console jest
  w `<head>`.
- `<html lang="pl-PL">`, `viewport`, `theme-color`, favicon, `apple-touch-icon`,
  `manifest.json` – komplet.
- **TTFB 40–100 ms** (Cloudflare przed Passengerem), HTML strony głównej 18 kB po
  kompresji, `/_next/static` z `immutable` cache.
- Linki zewnętrzne z `target="_blank"` mają `rel="noreferrer"`; linki do
  Zoom/Meet/Teams dodatkowo `nofollow`.

---

## 4. Indeksowanie i crawl

### 4.1 Kody odpowiedzi i przekierowania (produkcja)

| Adres                                                  | Odpowiedź                                                | Ocena                                                                                     |
| ------------------------------------------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `https://rozmowni.pl/`                                 | 200                                                      | OK                                                                                        |
| `http://rozmowni.pl/`                                  | 301 → `https://rozmowni.pl/`                             | OK (Cloudflare)                                                                           |
| `https://www.rozmowni.pl/`                             | **307** → `https://rozmowni.pl/`                         | Powinno być 301. 307 to „tymczasowe”, nie cache’uje się i słabiej sygnalizuje kanonizację |
| `http://www.rozmowni.pl/o-nas`                         | 301 → `https://www…` → 307 → `https://rozmowni.pl/o-nas` | Dwa skoki; jeden 301 prosto na docelowy adres                                             |
| `https://rozmowni.pl/o-nas/`                           | 308 → `/o-nas`                                           | OK (Next)                                                                                 |
| `https://rozmowni.pl/nie-ma-takiej-strony`             | 404                                                      | OK, ale strona 404 pusta (§5.3)                                                           |
| `https://rozmowni.pl/kursy/intensywne-kursy-wakacyjne` | 404                                                      | Do decyzji (§4.4)                                                                         |
| `https://rozmowni.pl/404.html`, `/index`, `/O-NAS`     | 404                                                      | OK                                                                                        |
| `https://rozmowni.pl/email-preview`                    | 401                                                      | OK (Basic Auth); nie trafi do indeksu                                                     |
| `https://rozmowni.pl/api/send-test-results`            | 405 na GET                                               | OK                                                                                        |
| `https://rozmowni.pl/mail.php`                         | 403                                                      | Martwy plik z PHP; do usunięcia (§13)                                                     |

Te dwa przekierowania pochodzą z **różnych miejsc**, co widać po treści
odpowiedzi:

| Przekierowanie          | `Content-Type`       | Ciało                                    | Kto je generuje                         |
| ----------------------- | -------------------- | ---------------------------------------- | --------------------------------------- |
| `http://` → `https://`  | `charset=UTF-8`      | 167 B, `<hr><center>cloudflare</center>` | Cloudflare („Always Use HTTPS”)         |
| `www` → bez `www` (307) | `charset=iso-8859-1` | 235 B, standardowa strona Apache         | **Apache, reguła w `public/.htaccess`** |

Czyli `public/.htaccess` **nie jest martwy** – wbrew temu, co mówi `CLAUDE.md`
i wbrew pierwszej wersji tego audytu. Reguła `RewriteRule ^(.*)$ … [R=307,L]`
w tym pliku jest dokładnie tym, co odpowiada na żądania z `www`.

Mylący był test z `ErrorDocument`: brakujący plik statyczny zwraca zwykłe 404,
a nie przekierowanie na `/404.html`. To jednak **nie dowodzi**, że plik jest
nieaktywny – `ErrorDocument` obsługuje tylko błędy generowane przez samego
Apache, a 404 dla nieistniejącej ścieżki zwraca aplikacja Node przez Passengera,
więc Apache nie ma tam czego obsługiwać. `mod_rewrite` działa wcześniej, w fazie
mapowania URL, zanim request trafi do Passengera – i dlatego reguła `www` działa,
a `ErrorDocument` nie.

**Rekomendacja:** zmienić `R=307` na `R=301` w `public/.htaccess` (zrobione).
Cloudflare „Always Use HTTPS” zostaje; `http://www` nadal będzie miało dwa skoki
(najpierw Cloudflare na HTTPS, potem Apache na domenę bez `www`), co jest do
przyjęcia – liczy się, żeby oba były trwałe.

**Do zweryfikowania po deployu:** nie mam dostępu SSH, więc nie potwierdziłem, że
Apache czyta akurat ten plik z katalogu release’u, a nie kopię `.htaccess` leżącą
gdzieś wyżej na serwerze. Zbieżność jest mocna (`R=307` to nietypowy wybór, a
obserwujemy dokładnie 307), ale rozstrzygnie dopiero
`curl -sI https://www.rozmowni.pl/` po wdrożeniu: jeśli nadal zwróci 307, plik
jest gdzie indziej i trzeba go szukać przez panel hostingu lub SSH.

### 4.2 `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://rozmowni.pl/sitemap.xml
```

Poprawny. Opcjonalnie dodać `Disallow: /api/` i `Disallow: /email-preview`
(oba i tak nie są indeksowalne, ale to oszczędza budżet crawlu i jest
czytelniejsze). Nie blokować `/_next/` – Google potrzebuje CSS/JS do renderu.

### 4.3 `sitemap.xml`

Stan: 9 adresów, wszystkie z `lastmod` `2025-08-28T00:00:00+00:00` i `priority`.

Problemy:

- **`lastmod` jest nieprawdziwy.** Od tej daty przebudowano stronę główną, cennik,
  „O nas”, strony kursów (historia gita: dziesiątki commitów `feat`/`refactor`
  w 2026). Google używa `lastmod` do priorytetyzacji recrawlu, ale tylko jeśli
  jest wiarygodny – identyczna, stara data na wszystkich URL-ach uczy Google, że
  ma go ignorować.
- `priority` – Google oficjalnie ignoruje; szum.
- `<loc>https://rozmowni.pl</loc>` bez ukośnika, a `canonical` strony głównej to
  `https://rozmowni.pl/`. Google to normalizuje, ale sitemapa powinna zawierać
  dokładnie adresy kanoniczne.
- Plik jest ręcznie utrzymywany obok `routeMap` – trzecie miejsce do pamiętania
  przy dodawaniu strony (`CLAUDE.md` wymienia je wprost).

**Rekomendacja:** generować sitemapę z `routeMap` przy buildzie, np. skrypt
`scripts/generate-sitemap.js` w `"prebuild"` (`package.json`), który:

- bierze wszystkie wpisy `routeMap` poza `PRIVACY_POLICY` (noindex),
- `lastmod` ustawia z daty ostatniego commita dotykającego pliku strony
  (`git log -1 --format=%cI -- src/pages/<plik>`); w CI `.git` jest dostępne
  w czasie buildu (tarball wyklucza je dopiero przy pakowaniu), ale `checkout`
  musi mieć `fetch-depth: 0` – przy płytkim klonie każdy plik dostałby datę
  ostatniego commita,
- pomija `priority` i `changefreq`,
- zapisuje `public/sitemap.xml`.

Dzięki temu zakomentowanie wpisu w `routeMap` automatycznie usuwa stronę też
z sitemapy. Alternatywa bez skryptu: `src/pages/sitemap.xml.js` z
`getServerSideProps` ustawiającym `Content-Type: application/xml` – ale wtedy
plik statyczny w `public/` trzeba usunąć, bo ma pierwszeństwo.

### 4.4 Wyłączona strona `/kursy/intensywne-kursy-wakacyjne`

Zwraca 404 (poprawnie przez `notFound: true`). Jeśli adres był kiedyś
zaindeksowany lub ma linki z zewnątrz (sprawdzić w GSC → „Strony” oraz
„Linki”), lepszym rozwiązaniem na okres wyłączenia jest **301 na
`/kursy/grupowe`** (`redirect: { destination, permanent: true }` w tym samym
`getServerSideProps`). Zachowuje to moc linków i nie pokazuje użytkownikom
pustej strony 404; po ponownym włączeniu strona znów zwraca 200 pod tym samym
adresem. Jeśli kursy wakacyjne nie wrócą – 410 zamiast 404 przyspiesza
wyindeksowanie.

### 4.5 Modyfikacje HTML przez Cloudflare

**Stan na 17.09.2026: opcja wyłączona przez właściciela** (Scrape Shield →
Email Address Obfuscation → Off). Zweryfikowane na produkcji: na `/`, `/kontakt`
i `/o-nas` nie ma już ani jednego `__cf_email__`, adres jest w HTML zwykłym
tekstem, a skrypt `cdn-cgi/scripts/…/email-decode.min.js` zniknął z `<head>`.
Tym samym znika **jedyny zasób blokujący render**, który Lighthouse wskazywał
na stronie głównej (ok. 150 ms).

Wcześniej opcja zamieniała każde wystąpienie `kontakt@rozmowni.pl` w tekście na
`<span class="__cf_email__" …>[email&#160;protected]</span>` i doklejała ten
skrypt do `<head>`. JSON-LD (`"email":"kontakt@rozmowni.pl"`) nigdy nie był
modyfikowany – Cloudflare pomija `<script>`.

**Kontekst decyzji.** Szkoła miała w przeszłości dużo spamu, więc warto
zapisać, czego ta opcja nie dawała i co ją zastępuje. Sama korzyść SEO
z wyłączenia jest mniejsza, niż zakładała pierwsza wersja tego audytu: e-mail
nie jest częścią NAP (to nazwa, adres i telefon – wszystkie trzy były w HTML
otwartym tekstem), a w formie, którą Google faktycznie czyta (JSON-LD), adres
i tak był podany wprost. Realny zysk to zdjęcie ok. 150 ms blokowania renderu
i czytelny adres dla klientów bez JavaScriptu.

**Przed czym ta opcja i tak nie chroniła:**

1. **Adres i tak jest w HTML otwartym tekstem** – w JSON-LD na stronie głównej
   (`"email":"kontakt@rozmowni.pl"`), bo Cloudflare nie rusza `<script>`.
   Sprawdzone na produkcji. To jest realna dziura, nie teoria.
2. **Kodowanie Cloudflare jest trywialnie odwracalne** – XOR z kluczem
   w pierwszym bajcie `data-cfemail`; dekoder to kilka linijek i scrapery mają
   go od lat. Zatrzymuje tylko najprostsze `grep`-i po `@`.
3. **`kontakt@` jest zgadywalny słownikowo.** Spamer nie musi niczego scrapować
   – wysyła na `kontakt@`, `biuro@`, `info@` każdej domeny z listy. To dziś
   dominujący wektor i obfuskacja nie dotyka go w ogóle.

Po wyłączeniu stan jest **spójny**: adres jest publiczny wszędzie tak samo –
w treści stron, w linkach `mailto:` i w JSON-LD. Pole `email`
w `getOrganizationJsonLd` zostaje; usuwanie go miałoby sens tylko przy
odwrotnej decyzji (ukrywać adres), a wtedy trzeba by zacząć właśnie od niego,
nie od ustawienia w Cloudflare.

Ponieważ obfuskacja nigdy nie była realną ochroną, **antyspam trzeba oprzeć na
czymś innym**: filtrowaniu po stronie dostawcy SMTP (skrzynka
`kontakt@rozmowni.pl`), formularzu kontaktowym z reCAPTCHA v3, który już działa
na `/kontakt`, i – jeśli spam wróci – rozważeniu osobnego, rotowalnego aliasu
w materiałach reklamowych zamiast adresu głównego.

Zmiana `href="#"` + `decryptEmail` na zwykły `mailto:` (wdrożona w P1) jest
teraz w pełni skuteczna: bez obfuskacji Cloudflare nie przepisuje już linków
`mailto:` na `/cdn-cgi/l/email-protection#…`, więc adres działa także bez
JavaScriptu. Na produkcji stoi jeszcze stary build (`<a href="#">` z tekstem
adresu), co widać też po starym numerze telefonu w JSON-LD – zmiany z P0 i P1
czekają na deploy.

---

## 5. Metadane (`title`, `description`, `robots`, `canonical`)

### 5.1 Stan na stronę

| Strona                      | `<title>` (znaki)                                                            | `description` (znaki) | Uwagi                                            |
| --------------------------- | ---------------------------------------------------------------------------- | --------------------- | ------------------------------------------------ |
| `/`                         | Rozmowni.pl \| Nauka języka angielskiego online przez Google Meet, Zoom (70) | 207                   | Tytuł zaczyna się marką, kończy nazwami narzędzi |
| `/test-poziomujacy`         | **pusty (0)**                                                                | **brak**              | Brak też `canonical`, OG, JSON-LD, `robots`      |
| `/o-nas`                    | O nas \| Angielski online w szkole językowej Rozmowni.pl (55)                | 284                   | „jest dla gwarancją” (brak słowa)                |
| `/cennik`                   | Cennik \| Szkoła języka angielskiego Rozmowni.pl (47)                        | 296 (**fallback**)    | Opis nie dotyczy cennika                         |
| `/kursy/indywidualne`       | Indywidualne kursy angielskiego dla dorosłych online \| Rozmowni.pl (67)     | 254                   | Podwójna spacja przed `\|`                       |
| `/kursy/grupowe`            | Kursy grupowe \| Konwersacje, General English, Business English (62)         | 167                   | Brak „angielski online” i marki                  |
| `/kursy/egzamin-8-klasisty` | Egzamin ósmoklasisty \| Kursy przygotowujące do egzaminu 8-klasisty (66)     | 179                   | „calująco”; brak „angielski”, „online”, marki    |
| `/kursy/egzamin-maturalny`  | Egzamin maturalny \| Kursy przygotowujące do matury (50)                     | 205                   | „calująco”; brak „angielski”, „online”, marki    |
| `/kontakt`                  | Kontakt \| Jak dołączyć na lekcje angielskiego online (52)                   | 309                   | Opis ogólny, za długi                            |
| `/polityka-prywatnosci`     | Polityka prywatności \| Rozmowni.pl (34)                                     | 296 (fallback)        | `noindex, follow` – OK; opis bez znaczenia       |
| 404                         | **pusty (0)**                                                                | **brak**              | Brak `<h1>`                                      |

Google wyświetla zwykle ok. 50–60 znaków tytułu i 150–160 znaków opisu (na
telefonie mniej). Opisy o długości 250–310 znaków są ucinane w połowie zdania.

### 5.2 `/test-poziomujacy` bez metadanych (P0)

Przyczyna: `getPropertiesMap` w `src/services/metadata/getMetadata.js` nie ma
wpisu `[routeNames.TEST]`. `getMetadata('TEST')` zwraca `{}`, więc
`Metadata.js` renderuje `<title></title>` i nic więcej. To jedyna strona
w `routeMap`, której brakuje w mapie metadanych (`HOLIDAY_COURSE` ma wpis mimo
wyłączenia).

Konsekwencje: Lighthouse SEO 83/100 (`document-title`, `meta-description`),
Google generuje tytuł z `<h1>` („Test poziomujący”) i opis z losowego fragmentu,
brak `canonical` (ryzyko indeksowania wariantów z parametrami, np. z UTM
kampanii Meta), brak OG – udostępnienie linku do testu na Facebooku/Messengerze
pokazuje pustą kartę. **To strona, na którą kierowane są kampanie.**

Poprawka (jedna funkcja + jeden wpis w mapie):

```js
function getTest(canonicalUrl) {
  const title = `Bezpłatny test poziomujący z angielskiego online${postfix}`;
  const description =
    'Sprawdź swój poziom angielskiego (A1–C2) w 10 minut: 25 pytań, wynik od razu. W pakiecie bezpłatna lekcja próbna i e-book „Czas na angielski”. Wersja dla młodzieży i dorosłych.';

  return {
    title,
    description,
    robots: 'index, follow',
    jsonLd: [
      getWebPageJsonLd(canonicalUrl),
      getBreadcrumbsJsonLd('Test poziomujący', canonicalUrl),
    ],
  };
}

export const getPropertiesMap = {
  // ...
  [routeNames.TEST]: getTest,
};
```

Dodatkowo warto zabezpieczyć się przed powtórką: `getMetadata` powinno dla
nieznanej trasy zwracać sensowny fallback (tytuł + `noindex`), a nie `{}`
(patrz §5.3), oraz – prościej – dopisać komentarz przy `routeMap`, że każdy wpis
wymaga odpowiednika w `getPropertiesMap`. Jeśli kiedyś pojawi się test, dobre
miejsce na asercję „każda trasa ma metadane”.

### 5.3 Strona 404

Wyrenderowana strona 404 (`src/pages/404.js`) to sam obrazek z `alt="Not found
error"`, bez nagłówka, tekstu i linków poza nawigacją; `<title>` jest pusty, bo
`resolveRouteName('/404')` nie znajduje trasy.

**Rekomendacja:**

- w `getMetadata` dla braku trasy zwracać
  `{ title: 'Strona nie została znaleziona | Rozmowni.pl', meta: [{ name: 'robots', content: 'noindex' }] }`;
- w `404.js` dodać `<h1>Nie znaleźliśmy tej strony</h1>`, jedno zdanie i dwa
  CTA (`routeMap[routeNames.HOME]`, `routeMap[routeNames.TEST]`), `alt` po polsku
  (np. „Ilustracja: strona nie istnieje”).

### 5.4 Fallback `description`

`getPricing` i `getPrivacyPolicy` mają `description: ''`, więc `getMetadata`
wstawia `fallback.description` – tekst o „rozwoju osobistym, psychologii,
coachingu”. Dla cennika to realna strata (zapytania „cennik angielski online”,
„ile kosztuje lekcja angielskiego online” dostają snippet bez cen).

Propozycja dla `/cennik` (156 znaków):

> Cennik lekcji angielskiego online: zajęcia indywidualne 120 zł / 45 min,
> lekcje w parach 65 zł, kursy semestralne w grupach 3–4 os. od 1430 zł.
> Bez ukrytych opłat.

Dla polityki prywatności (noindex) wystarczy krótkie „Polityka prywatności
szkoły Rozmowni.pl – jakie dane zbieramy i po co.” – i tak nie trafia do
wyników, ale lepiej, żeby fallback w ogóle nie był potrzebny.

### 5.5 Tytuły – propozycje

Zasady: fraza, na którą strona ma rankować, na początku; „online” i „angielski”
tam, gdzie ich brakuje; marka na końcu przez wspólny `postfix`; ≤ 60–65 znaków
(marka może zostać ucięta, to akceptowalne).

| Strona                      | Obecnie                                                                 | Propozycja                                                                             |
| --------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `/`                         | Rozmowni.pl \| Nauka języka angielskiego online przez Google Meet, Zoom | Angielski online: konwersacje, kursy 1:1 i grupowe \| Rozmowni.pl                      |
| `/test-poziomujacy`         | –                                                                       | Bezpłatny test poziomujący z angielskiego online \| Rozmowni.pl                        |
| `/kursy/indywidualne`       | Indywidualne kursy angielskiego dla dorosłych online \| Rozmowni.pl     | Indywidualne lekcje angielskiego online (1:1) \| Rozmowni.pl                           |
| `/kursy/grupowe`            | Kursy grupowe \| Konwersacje, General English, Business English         | Kurs angielskiego online w małej grupie – konwersacje, Business English \| Rozmowni.pl |
| `/kursy/egzamin-8-klasisty` | Egzamin ósmoklasisty \| Kursy przygotowujące do egzaminu 8-klasisty     | Kurs angielskiego do egzaminu ósmoklasisty online \| Rozmowni.pl                       |
| `/kursy/egzamin-maturalny`  | Egzamin maturalny \| Kursy przygotowujące do matury                     | Kurs do matury z angielskiego online (podstawa i rozszerzenie) \| Rozmowni.pl          |
| `/cennik`                   | Cennik \| Szkoła języka angielskiego Rozmowni.pl                        | Cennik kursów angielskiego online – lekcje 1:1 i grupowe \| Rozmowni.pl                |
| `/kontakt`                  | Kontakt \| Jak dołączyć na lekcje angielskiego online                   | Kontakt – szkoła angielskiego online Rozmowni.pl, Kraków                               |
| `/o-nas`                    | O nas \| Angielski online w szkole językowej Rozmowni.pl                | bez zmian (ew. „O nas – lektorzy szkoły angielskiego online \| Rozmowni.pl”)           |

Uwaga do strony głównej: obecny tytuł podkreśla „Google Meet, Zoom” – to
narzędzia, nie potrzeba użytkownika. Nikt nie szuka „angielski przez Google
Meet”; szuka „angielski online”, „konwersacje po angielsku”, „kurs angielskiego
dla dorosłych”.

Techniczne: `getIndividualCourse` składa tytuł jako
`` `… online ${postfix}` `` a `postfix` już zaczyna się spacją → podwójna
spacja w `<title>` (widoczna w karcie przeglądarki i w Google). Poprawka:
usunąć spację przed `${postfix}`. Warto ujednolicić – wszystkie tytuły przez
`postfix`, dziś używa go tylko `INDIVIDUAL_COURSE` i `PRIVACY_POLICY`.

### 5.6 Opisy – długość i błędy

- **Literówki:** `getExam8Course` i `getMaturaExamCourse` – „calująco” → „celująco”;
  `getAboutUs` – „jest dla gwarancją” → „jest dla Ciebie gwarancją”.
- **Długość:** `/kontakt` 309, `/cennik` 296, `/o-nas` 284, `/kursy/indywidualne`
  254 – skrócić do 140–160 znaków, z konkretem i wezwaniem (jak na `/`, która
  jest wzorem: test, lekcja próbna, e-book).
- Opis `/kontakt` jest opisem szkoły, nie strony kontaktu. Propozycja: „Skontaktuj
  się ze szkołą angielskiego online Rozmowni.pl: telefon +48 506 262 227, e-mail
  kontakt@rozmowni.pl, formularz. Odpowiadamy w ciągu 24 h. Kraków / cała Polska
  online.”
- Opisy stron egzaminacyjnych obiecują „zda … celująco” – to obietnica wyniku,
  której szkoła nie kontroluje; bezpieczniej: „przygotowanie do egzaminu … w
  grupie 3–4 osób, 26 lekcji w semestrze, online”.

### 5.7 Drobne techniczne

- `<meta property="author">` – powinno być `name="author"` (`property` jest dla
  RDFa/OG). Nie ma wpływu na ranking, ale walidatory to zgłaszają.
- `robots: 'index, follow'` jawnie na każdej stronie – to wartość domyślna; można
  zostawić, nie szkodzi.
- `_app.js` renderuje `<title />` obok `Metadata` – `next/head` deduplikuje, w HTML
  jest jeden tytuł. Martwy element; do usunięcia dla czytelności.
- `resolveRouteName` (`src/routes/index.js`) dopasowuje przez
  `value.startsWith(path)`. Dla istniejących tras działa, ale np. `/kursy`
  (nieistniejące) dopasowałoby się do `/kursy/indywidualne`. Bezpieczniej porównywać
  dokładnie (`value === path`) i mieć fallback z §5.3.
- `getMetadata` ma martwy blok `if (description) { metadata.meta.push(); }`.

---

## 6. Open Graph i karty social

Stan: komplet tagów `og:*` i `twitter:*`, `og:locale` `pl_PL`, `og:type`
`website`, `twitter:card` `summary`. Obraz na wszystkich stronach to
`https://rozmowni.pl/logo512.png` (512×512).

Problemy i rekomendacje:

1. **Obraz OG.** Facebook, Messenger, LinkedIn i WhatsApp renderują najlepiej
   1200×630 (proporcja 1,91:1); kwadratowe logo daje mały, przycięty podgląd.
   Dodać `public/images/og-default.jpg` (1200×630: zdjęcie + hasło „Mów swobodnie
   po angielsku” + logo) i osobny `og-test.jpg` dla `/test-poziomujacy`
   („Bezpłatny test poziomujący – 10 minut”), bo ten link jest najczęściej
   udostępniany. Po zmianie `twitter:card` → `summary_large_image`.
   `getMetadata` powinno przyjmować `image` z funkcji strony, z fallbackiem na
   domyślny.
2. **`twitter:*` używają atrybutu `property`.** Specyfikacja X/Twitter wymaga
   `name`; parser X korzysta z fallbacku na tagi OG, więc karta działa, ale
   `twitter:card` i `twitter:image:alt` mogą być pomijane. Zmiana w `getMetadata`:
   `{ name: 'twitter:card', … }`.
3. `og:image:width`/`height` są liczbami – po zmianie obrazu zaktualizować.
4. Po wdrożeniu przetestować w Meta Sharing Debugger
   (`developers.facebook.com/tools/debug/`) i wymusić odświeżenie cache’u dla `/`
   i `/test-poziomujacy`.

---

## 7. Dane strukturalne (JSON-LD)

Obecnie: `WebPage` (tylko `@id`), `BreadcrumbList` na podstronach, na `/`
dodatkowo `EducationalOrganization` i jednoelementowy `BreadcrumbList`.
Wszystko parsuje się poprawnie.

### 7.1 Błędy do poprawy

| Co                                                | Gdzie (`getMetadata.js`) | Poprawka                                                                                                   |
| ------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `telephone: '+48605262227'` (605 vs 506)          | `getOrganizationJsonLd`  | `+48506262227` – jak w `contactPoint`, stopce i na `/kontakt`                                              |
| `addressLocality: 'Kraków, Polska'`               | `getOrganizationJsonLd`  | `addressLocality: 'Kraków'`, `addressRegion: 'małopolskie'`, `addressCountry: 'PL'`                        |
| Breadcrumb z jednym elementem na `/`              | `getHomeMetadata`        | Usunąć – nie niesie informacji                                                                             |
| `WebPage` bez `name`, `description`, `inLanguage` | `getWebPageJsonLd`       | Dodać `name: title`, `description`, `inLanguage: 'pl'`, `isPartOf: { '@type': 'WebSite', '@id': baseUrl }` |
| `@context` raz `https://schema.org`, raz `…org/`  | breadcrumbs              | Ujednolicić (kosmetyka)                                                                                    |
| `brand` powielający organizację                   | `getOrganizationJsonLd`  | Usunąć – `Brand` dla szkoły to szum                                                                        |

Warto też dodać do `sameAs` link do wizytówki Google (place ID jest już
w `Opinions.js`: `ChIJRfTrnfxbFkcRCtSKA73F6g0` → `https://www.google.com/maps?cid=…`
lub adres z „Udostępnij” w Mapach) i `hasMap`.

### 7.2 Co warto dodać

- **`Course` + `Offer` na czterech stronach kursów.** Dane są już w kodzie
  (`courseDetails`, `price`): `name`, `description`, `provider` (odwołanie do
  organizacji przez `@id`), `hasCourseInstance` z `courseMode: 'Online'`,
  `courseSchedule` (np. „1× w tygodniu, 90 min”), `offers` z `price`,
  `priceCurrency: 'PLN'`, `category: 'Semestr'`. Google pokazuje dla kursów
  rozszerzone wyniki („Course info”), ale wymaga kompletu pól – traktować jako
  bonus, głównym zyskiem jest jednoznaczny opis oferty dla wyszukiwarek i modeli
  językowych.
- **`WebSite`** na `/` z `name: 'Rozmowni.pl'` i `url` – pomaga Google poprawnie
  wyświetlać nazwę witryny w wynikach (site name).
- **`Person`** dla założycielki na `/o-nas` (`name`, `jobTitle`, `sameAs`
  LinkedIn, `worksFor`) – wspiera E-E-A-T.
- **`FAQPage`** dla FAQ o teście – od sierpnia 2023 Google pokazuje rozszerzone
  FAQ tylko dla stron rządowych i medycznych, więc **nie da to rozszerzonego
  wyniku**; markup jest poprawny i tani, ale to niski priorytet.

### 7.3 Czego nie dodawać

`AggregateRating`/`Review` dla własnych opinii na `Organization` – wytyczne
Google traktują to jako „self-serving reviews” i nie wyświetlają gwiazdek; ryzyko
ręcznej kary za nadużycie danych strukturalnych. Opinie zostawić jako treść
(są w HTML, indeksują się), z linkiem do wizytówki Google – tak jak teraz.

---

## 8. Treść i nagłówki

### 8.1 Hierarchia nagłówków

Każda strona ma jeden `<h1>`. Problemy z poziomami (Lighthouse `heading-order`
na `/`: 0/1):

- **Strona główna:** `h1` → `h3` (kafelki `Features`, przed pierwszym `h2`);
  w `WhyUsExpanded` `h2` → `h3` → `h4` → **`h6`** (tytuły kart); FAQ `h2` → `h4`
  (`Accordion` renderuje tytuł w `<h4>`).
- **`/kontakt`:** `h2` → `h4`, przy czym `<h4>` opakowuje e-mail, telefon i adres –
  to dane, nie nagłówki (po obfuskacji Cloudflare jeden z nich to
  `<h4>[email protected]</h4>`).
- **`/polityka-prywatnosci`:** `h1` → `h5`.
- **Strony kursów:** `h1` → `h2` → `h3` → `h4` – poprawnie.

Google radzi sobie z nierówną hierarchią, ale poprawna ułatwia zrozumienie
struktury i jest wymogiem dostępności. Rekomendacja: `Features` i `TestBenefits`
kafelki jako `h3` pod jawnym `h2` sekcji (lub `p` z klasą, jeśli sekcja ma nie
mieć nagłówka); `Accordion` – `h3` zamiast `h4` (lub parametr poziomu);
`WhyUsExpanded` – `h6` → `h4`/`h5`; kontakt – dane w `<p>`/`<address>`;
polityka – `h5` → `h2`.

Treści `<h1>` na podstronach są krótkie i ogólne („Cennik”, „O nas”, „Kursy
grupowe”). To akceptowalne (tytuł strony niesie frazę), ale dla stron kursów
warto rozważyć `h1` z frazą: „Kursy grupowe angielskiego online”, „Kurs do
egzaminu ósmoklasisty z angielskiego”.

### 8.2 Ilość i głębokość treści

Liczba słów w `<body>` wyrenderowanego HTML (nawigacja + stopka to ok. 150
słów na każdej stronie):

| Strona                      | Słów | Własnej treści (ok.) | Ocena                                                         |
| --------------------------- | ---- | -------------------- | ------------------------------------------------------------- |
| `/`                         | 1196 | ~1050                | Dobrze                                                        |
| `/polityka-prywatnosci`     | 2569 | ~2400                | (noindex)                                                     |
| `/o-nas`                    | 658  | ~500                 | OK; bio lektorów poza pierwszym akapitem nie są w HTML (§8.4) |
| `/kursy/indywidualne`       | 528  | ~380                 | Cienko                                                        |
| `/kursy/egzamin-maturalny`  | 482  | ~330                 | Cienko                                                        |
| `/kursy/grupowe`            | 470  | ~320                 | Cienko                                                        |
| `/kursy/egzamin-8-klasisty` | 461  | ~310                 | Cienko                                                        |
| `/cennik`                   | 418  | ~270                 | OK dla cennika                                                |
| `/test-poziomujacy`         | 193  | ~50                  | **Bardzo cienko** dla strony, która ma rankować               |
| `/kontakt`                  | 177  | ~30                  | OK dla kontaktu                                               |

Strony kursów odpowiadają na „co i za ile”, ale nie na pytania, które ludzie
wpisują w Google przed zapisaniem się: dla kogo, jak wygląda lekcja, jakie
materiały, kto uczy, jak sprawdzić poziom, co jeśli grupa się nie zbierze, jak
wygląda płatność, czy jest lekcja próbna. Rekomendowana struktura każdej strony
kursu (te same klocki, inna treść):

1. `h1` z frazą + lede (jest).
2. „Dla kogo” – 2–3 zdania z poziomem/wiekiem.
3. „Jak wyglądają zajęcia” – konkret: 90 min, Zoom/Meet, materiały, praca domowa.
4. „Program / rodzaje zajęć” (jest, akordeon – treść jest w HTML, więc indeksuje się).
5. „Lektorzy” – 1–2 zdania + link do `/o-nas`.
6. „Cena i zapisy” – cena (jest w panelu) + link do `/cennik` i `/kontakt`.
7. FAQ 4–6 pytań specyficznych dla kursu (egzamin: terminy, arkusze, poziom).
8. Linki do pokrewnych kursów (egzamin ósmoklasisty ↔ maturalny ↔ grupowe).

Docelowo 700–900 słów własnej treści na stronę kursu. To największa dźwignia
organiczna po poprawie metadanych.

### 8.3 FAQ o teście jest w złym miejscu

`TestFAQ` (8 pytań: czas, cena, wynik, spam, poziomy, zobowiązania, powtórka,
niski poziom) renderuje się tylko na `/`. Wszystkie pytania dotyczą testu,
a strona testu ma ~50 słów własnej treści. Rekomendacja: renderować `TestFAQ`
także w `TestIntroView` (pod „Co otrzymasz”), a na stronie głównej zostawić
skróconą wersję (3–4 pytania) lub przenieść w całości. Dodatkowo krótki akapit
na `/test-poziomujacy`: czym jest test (CEFR A1–C2, 25 pytań, dwie wersje
wiekowe), jak liczony jest wynik, co dalej. To celuje w zapytania „test
poziomujący angielski online”, „darmowy test z angielskiego”, „sprawdź poziom
angielskiego”.

### 8.4 Treść ukryta przed robotem

- `TeamCard` renderuje tylko pierwszy akapit bio (`bio.slice(0, 1)`), reszta
  pojawia się po kliknięciu – **nie ma jej w HTML**, więc nie indeksuje się.
  Rozwiązanie: renderować całość i ukrywać CSS-em (`hidden`/klasa), jak robi
  `Accordion` i `Opinions` (tam treść jest w DOM, tylko `display: none` – to jest
  w porządku dla Google).
- `WhyUsExpanded`, `Accordion`, `Opinions` „przeczytaj więcej” – treść w HTML, OK.

### 8.5 Frazy – hipotezy do weryfikacji w GSC

| Strona                      | Fraza główna                               | Frazy wspierające                                                                                        |
| --------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `/`                         | angielski online                           | szkoła angielskiego online, konwersacje po angielsku online, nauka angielskiego online dla dorosłych     |
| `/test-poziomujacy`         | test poziomujący angielski                 | darmowy test z angielskiego online, sprawdź poziom angielskiego, test poziomu angielskiego A1–C2         |
| `/kursy/indywidualne`       | lekcje angielskiego online indywidualnie   | angielski 1:1 online, korepetycje angielski online dorośli, lektor angielskiego online                   |
| `/kursy/grupowe`            | kurs angielskiego online grupowy           | konwersacje angielski grupa online, business english online kurs, kurs angielskiego dla dorosłych online |
| `/kursy/egzamin-8-klasisty` | kurs angielski egzamin ósmoklasisty online | przygotowanie do egzaminu ósmoklasisty angielski, korepetycje angielski 8 klasa online                   |
| `/kursy/egzamin-maturalny`  | kurs maturalny angielski online            | przygotowanie do matury z angielskiego online, matura rozszerzona angielski kurs                         |
| `/cennik`                   | cennik lekcji angielskiego online          | ile kosztuje angielski online, cena lekcji angielskiego 45 min                                           |
| `/o-nas`                    | (marka) rozmowni.pl                        | Małgorzata Rudowska angielski, lektorzy angielskiego online                                              |

Wolumeny i realne zapytania sprawdzić w GSC („Skuteczność” → Zapytania, filtr
per strona) po 4–6 tygodniach od wdrożenia metadanych.

### 8.6 Kraków i intencja lokalna

W wynikach dla zapytania z „Kraków” konkurenci (Callan, MAK, Three Lions,
Speaking House, English Wolf) mają „Kraków” w tytule i pozycjonują „Kraków
i online”. Rozmowni.pl ma adres w Krakowie, wizytówkę Google i zero
wystąpień „Kraków” w tytułach ani w treści poza stopką. Jeśli lokalne zapytania
są pożądane (część klientów wybiera „swoją” szkołę mimo zajęć online), dodać
„Kraków” do tytułu `/kontakt` i `/o-nas`, zdanie w sekcji „Poznajmy się” („Szkoła
z Krakowa, zajęcia online dla całej Polski”) i zadbać o spójność NAP (§7.1).

---

## 9. Linkowanie wewnętrzne

Stan: każda strona linkuje do 10 adresów przez nagłówek i stopkę; strony
kursów mają 2 linki „Zapisz się” → `/kontakt`, strona główna 8 CTA →
`/test-poziomujacy`. Brak linków **w treści** między stronami: kursy nie
linkują do siebie, do cennika ani do testu (poza paskiem `footer-cta`), cennik
linkuje tylko do kontaktu, „O nas” tylko do testu.

Rekomendacje:

- W treści stron kursów: link do `/cennik` przy cenie, do `/test-poziomujacy`
  w akapicie o poziomach („nie znasz poziomu? zrób test”), do pokrewnych kursów
  (egzaminacyjne między sobą, grupowe → indywidualne). Kotwice opisowe („kurs
  maturalny z angielskiego”), nie „tutaj”.
- Na `/cennik` przy każdej karcie link do strony danego kursu (dziś tylko
  „Zapisz się” → kontakt).
- Na `/test-poziomujacy` (ekran wyników) link do kursu dopasowanego do poziomu –
  to też korzyść konwersyjna.
- Widoczny breadcrumb (`PageHeader breadcrumb`) jest tylko na stronach kursów;
  JSON-LD `BreadcrumbList` jest na wszystkich podstronach. Ujednolicić – włączyć
  `breadcrumb` na `/cennik`, `/o-nas`, `/kontakt`, `/test-poziomujacy`.
- Linki `href="#"`: e-mail w stopce i na `/kontakt` (→ `mailto:`), „przeczytaj
  więcej” w `Opinions` (→ `<button>`; to akcja, nie nawigacja). Kotwica
  `#dlaczego-my` w `Banner` ma poprawny cel (`Section id="dlaczego-my"`).
- Atrybuty `title` na linkach social na `/kontakt` są po angielsku
  („Facebook profile page”) – zmienić na polskie lub usunąć (są `aria-label`).

---

## 10. Obrazy

### 10.1 Stan

Wszystkie obrazy przez `next/image` z importem statycznym (automatyczne
`width`/`height`, `placeholder="blur"`), `alt` obecny wszędzie, serwowane jako
WebP przez `/_next/image` (hero 1080 px: 43 kB). AVIF nie jest włączony – na
współdzielonym hostingu z Passengerem to rozsądne (koszt CPU).

### 10.2 Problemy

1. **LCP lazy** – `Banner` nie przekazuje `priority`, więc hero (`main.jpg`)
   ma `loading="lazy"` i brak `fetchpriority="high"`/preloadu. Lighthouse
   (mobile) na `/`: LCP 9,4 s, z czego ~1,4 s opóźnienia startu pobierania
   i 6,4 s opóźnienia renderu; na podstronach (bez lazy obrazu w LCP) LCP to
   2,3 s. Poprawka: `<ResponsiveImage … priority />` w `Banner.js`
   (`ResponsiveImage` przekazuje `...props`). Logo w `Header` również jest
   `lazy` – nad fold na każdej stronie, dać `priority` (kilka kB).
2. **`sizes="… undefinedpx"` na `/kontakt`** – `ResponsiveImage` bez `sizes`
   i bez `width` generuje `(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
undefinedpx`. Niepoprawna wartość → przeglądarka bierze największy wariant
   (`w=2048`) dla obrazka o szerokości ~450 px. Poprawka: domyślne `sizes` bez
   zależności od `width` (np. `(max-width: 768px) 100vw, 50vw`) i jawne `sizes`
   w `kontakt/index.js`.
3. **`alt`:** zdjęcia lektorów mają samo imię („Denis”) → „Denis – lektor
   angielskiego w Rozmowni.pl”; 404 „Not found error” → po polsku; ten sam
   `alt` „Małgorzata Rudowska przy biurku” dla dwóch różnych zdjęć (`Banner`
   i `Idea`) – w `Idea` opisać, co jest na zdjęciu.
4. **Źródła w repo:** `lifelong-learning.jpg` 3456×4449 (2,1 MB),
   `contact.png` 1215×1333 (2,4 MB, fotografia w PNG), `why-us.jpg` 1,2 MB,
   `about-us.jpg` 1 MB, `main.jpg` 864 kB. W runtime są przeskalowane, ale
   spowalniają build (sharp), puchną w repo i w tarballu deployu. Zmniejszyć do
   ≤ 1600 px dłuższego boku, `contact.png` → JPG/WebP. `welcome.jpg`
   i `course-holiday-2022.jpg` są nieużywane – usunąć.
5. `quality="100"` na logo w `Header` – 75–85 wystarczy (PNG z przezroczystością
   i tak jest bezstratnie przekodowany do PNG/WebP).

---

## 11. Wydajność i Core Web Vitals

### 11.1 Lighthouse 12.8.2 (mobile, produkcja, 17.09.2026)

| Strona              | Performance | LCP   | FCP   | TBT    | CLS   | SEO | Accessibility |
| ------------------- | ----------- | ----- | ----- | ------ | ----- | --- | ------------- |
| `/`                 | **62**      | 9,4 s | 2,6 s | 330 ms | 0     | 100 | 82            |
| `/test-poziomujacy` | 96          | 2,3 s | 1,1 s | 170 ms | 0,003 | 83  | 92            |
| `/kursy/grupowe`    | 96          | 2,3 s | 1,1 s | 170 ms | 0,002 | 100 | –             |

Wnioski: różnica między `/` a resztą to niemal wyłącznie **lazy hero** (§10.2).
Po dodaniu `priority` strona główna powinna zejść do ~2,5 s LCP i 90+ punktów.
CLS jest wzorowy. TTFB serwera 40–100 ms.

Element LCP na podstronach to… **karta cookies** (`CookieConsent`) – jest
największym blokiem tekstu w viewporcie mobilnym. To sygnał, że karta zasłania
sporo ekranu na telefonie; nie jest to problem wydajności, ale UX.

### 11.2 Skrypty firm trzecich

| Dostawca                | Transfer | Blokowanie wątku | Uwagi                                              |
| ----------------------- | -------- | ---------------- | -------------------------------------------------- |
| Facebook (Pixel)        | 199 kB   | 117–130 ms       | `fbevents.js` + `signals/config`                   |
| Google (gtag/GA4)       | 165 kB   | 5–10 ms          | 72 kB z tego nieużywane                            |
| PostHog                 | 142 kB   | 11–15 ms         | w tym `posthog-recorder.js` 67 kB (session replay) |
| Google Fonts            | 109 kB   | 0                | §11.3                                              |
| Cloudflare email-decode | 1 kB     | render-blocking  | **Już nie występuje** – obfuskacja wyłączona, §4.5 |

Razem ~600 kB na każdej stronie, wszystko ładowane leniwie po hydratacji
(dobrze – nie blokuje LCP), ale odpowiada za większość TBT i TTI ~8 s.
To świadomy koszt lejka reklamowego; do rozważenia: ładowanie PostHog
(a przynajmniej session replay) dopiero po pierwszej interakcji lub po
`requestIdleCallback`, i niepobieranie recordera na stronach bez formularzy.
`todo.md` (pkt 2) opisuje osobno kwestię zgody na cookies – to decyzja prawna,
nie SEO, ale wpływa na to, ile z tych skryptów w ogóle powinno się ładować przed
kliknięciem „Akceptuję”.

### 11.3 Fonty

`public/fonts/fonts.css` i `fonts2.css` to skopiowane arkusze Google Fonts:
Montserrat 400/500/600/700 normal **i italic** × 5 podzbiorów (cyrylica,
wietnamski…) + Mulish 400/600/700, wszystkie z `fonts.gstatic.com`. W stylach
używane są wagi 400/600/700 (raz 900, którego nie ma – przeglądarka
syntetyzuje), kursywa w 5 miejscach, waga 500 nigdzie. Skutek: dodatkowe
połączenie do third-party na każdej stronie (`preconnect` łagodzi to
częściowo), 109 kB transferu, FCP 2,6 s na `/`.

**Rekomendacja:** `next/font/google` w `_app.js`:

```js
import { Montserrat, Mulish } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
});
const mulish = Mulish({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
});
```

Fonty są pobierane przy buildzie i serwowane z własnej domeny (`/_next/static`,
`immutable`), bez zapytań do Google, z automatycznym `size-adjust` dla fontu
zastępczego (zero CLS przy `swap`). Wtedy `fonts.css`/`fonts2.css` i `preconnect`
do `fonts.*` znikają, a `font-family` w SCSS wskazuje na zmienną CSS z `next/font`.
Alternatywa minimalna: zostawić Google Fonts, ale usunąć wagę 500, kursywy
i podzbiory poza `latin`/`latin-ext`.

### 11.4 CSS i JavaScript

- **CSS:** współdzielony bundle 31 kB (gzip) – Bootstrap (reboot, type, grid,
  forms, buttons, dropdown, nav, navbar, alert, carousel, utilities) + `style.css`,
  `responsive.css`, `Footer.css`, `Header.scss`, fonty. Lighthouse: **28 z 31 kB
  nieużywane** na każdej stronie. Nie blokuje wyniku, ale to sygnał, że
  `bootstrap.scss` importuje moduły bez użycia (`alert`, `carousel` – karuzela
  używa `react-multi-carousel`, nie Bootstrapa; `forms` – formularze są stylowane
  w modułach). Przejrzeć i wyciąć.
- **JS:** 310 kB (gzip) na `/` bez third-parties: framework 130 kB (React 19 +
  Next), `_app` 52 kB, `main` 37 kB, strona 13 kB, `polyfills` 40 kB
  (`noModule` – nowoczesne przeglądarki go pomijają). `posthog-js` (300 kB raw)
  jest w osobnym, leniwym chunku – zgodnie z `CLAUDE.md`. Lighthouse zgłasza
  62 kB „legacy JavaScript” – transpilacja pod stare przeglądarki; dodanie
  `browserslist` w `package.json` (np. `"defaults and fully supports es6-module"`)
  zmniejsza to bez ryzyka.
- **`preconnect` w `_document.js`:** 6 domen na każdej stronie. `google.com`
  i `gstatic.com` są potrzebne tylko dla reCAPTCHA na `/kontakt`; `facebook.com`
  i `connect.facebook.net` ładują się leniwie po hydratacji, więc preconnect
  wygasa (Chrome zamyka nieużyte połączenia po ~10 s). Zostawić tylko fonty (do
  czasu `next/font`), reCAPTCHA przenieść do `<Head>` na stronie kontaktu.

### 11.5 Cache

- `/_next/static/*` – `max-age=31536000, immutable` (OK).
- `/images/*`, `/logo512.png`, `/favicon.ico` – Next wysyła `max-age=0`,
  Cloudflare nadpisuje na `max-age=14400` (4 h). Dla plików, które zmieniają się
  raz na rok, można dodać w `next.config.js`:

  ```js
  async headers() {
    return [{ source: '/(images|fonts)/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }];
  }
  ```

  Uwaga: obrazy importowane w komponentach i tak trafiają do `/_next/static/media`
  z hashem – powyższe dotyczy tylko `og-image`, `logo*.png`, `favicon`.

- 5 zasobów „bez efektywnej polityki cache” w Lighthouse to skrypty firm trzecich
  (gtag, fbevents, PostHog) – poza kontrolą.

---

## 12. Dostępność (wpływ pośredni na SEO)

Lighthouse Accessibility 82 (`/`) i 92 (`/test-poziomujacy`). Nie wpływa
bezpośrednio na ranking, ale kilka pozycji dotyka tego samego kodu co SEO:

- **Kontrast**: biały tekst na `--color-orange` (`#ff6b35`) – ok. 2,9:1, poniżej
  4,5:1 (AA) – dotyczy `btn-main` (główne CTA) i `optionCta` na stronie testu.
  Do rozważenia ciemniejszy odcień dla tekstu/tła przycisku lub tekst navy.
- **Hierarchia nagłówków** – §8.1.
- **Rozmiar celów dotykowych** (`target-size`) na `/` – małe linki/ikony blisko
  siebie.
- `aria-hidden="true"` z fokusowalnymi potomkami (karuzela `react-multi-carousel`
  – slajdy poza ekranem).
- `label-content-name-mismatch` – `aria-label` inny niż widoczny tekst
  (np. „Przeczytaj pełną opinię” vs „przeczytaj więcej >>”).
- Linki w tekście odróżnialne tylko kolorem (`link-in-text-block`).

---

## 13. Porządki

- `public/.htaccess` – **aktywny** (patrz §4.1), więc nie kasować. Warto za to
  usunąć z niego martwą linię `ErrorDocument 404 https://rozmowni.pl/404.html`:
  wskazuje na adres, który sam zwraca 404, a dla ścieżek aplikacji i tak nigdy
  nie zadziała.
- `public/mail.php` – pozostałość po hostingu PHP, zwraca 403. Reguła
  `RewriteRule ^mail.php$` w `.htaccess` dotyczy tylko jego. Usunąć plik razem
  z regułą.
- `public/libs/bicon` (908 kB) – martwa ikonografia, `CLAUDE.md` już to
  odnotowuje. Usunąć.
- `test.md` w katalogu głównym – nieaktualny draft, mylący (nie jest źródłem
  danych testu). Usunąć lub przenieść do `docs/archive/`.
- `public/images/welcome.jpg`, `course-holiday-2022.jpg` – nieużywane.
- `manifest.json` i `<meta name="theme-color">` mają `#000000`; marka to
  `--color-navy` `#07294d` (kosmetyka, pasek adresu na Androidzie).
- `routeTitles` nie ma `HOLIDAY_COURSE` – dotyczy tylko etykiet eventów, ale po
  włączeniu strony `NAVIGATION_CLICK_MENU_ITEM(undefined)`.
- W `deploy-*.yml` linia `ln -s …/shared …/rozmowni/public` tworzy dowiązanie
  `public/shared` **wewnątrz** istniejącego `public/` (bo `public/` już jest w
  tarballu), a nie podmienia katalogu. Nie ma to skutków SEO (na produkcji
  `/shared/sitemap.xml` zwraca 404, więc zawartość dowiązania nie jest serwowana),
  ale wygląda na pozostałość po innej intencji – warto sprawdzić, co miało tam
  być i czy w `shared/` nie leży nic, co nie powinno być pod `public/`.

---

## 14. Plan wdrożenia

Szacunki dla jednej osoby znającej repo. „Plik” wskazuje, gdzie zmiana się
zaczyna.

### P0 – w tym tygodniu (razem ok. pół dnia)

> **Status:** wdrożone 17.09.2026 (punkty 1–8, working tree, bez commitu).
> Zweryfikowane lokalnie na buildzie produkcyjnym: `/test-poziomujacy` ma
> tytuł, opis, `canonical` i OG; strona 404 ma tytuł, `<h1>`, dwa CTA
> (otrackowane, kategoria `Not found`) i `noindex`; hero i logo nie są już
> `lazy` (preload w `<head>`); telefon i adres w JSON-LD poprawione;
> `npm run lint` i `npm run build` przechodzą. Do sprawdzenia po deployu:
> Lighthouse na `/` (LCP) – patrz §15.

| #   | Zadanie                                                                                                  | Plik(i)                                  | Czas   |
| --- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------ |
| 1   | Metadane dla `/test-poziomujacy` (`getTest` + wpis w `getPropertiesMap`)                                 | `src/services/metadata/getMetadata.js`   | 20 min |
| 2   | Fallback metadanych dla nieznanej trasy (tytuł + `noindex`), `resolveRouteName` z dokładnym dopasowaniem | `getMetadata.js`, `src/routes/index.js`  | 30 min |
| 3   | Strona 404: `<h1>`, tekst, CTA, polski `alt`                                                             | `src/pages/404.js`                       | 30 min |
| 4   | `priority` na hero i logo                                                                                | `src/components/Banner.js`, `Header.js`  | 5 min  |
| 5   | `description` dla `/cennik` i `/polityka-prywatnosci`; literówki („celująco”, „jest dla Ciebie”)         | `getMetadata.js`                         | 20 min |
| 6   | Telefon `+48506262227` i adres w JSON-LD; usunąć breadcrumb z `/`                                        | `getMetadata.js`                         | 10 min |
| 7   | Podwójna spacja w tytule kursów indywidualnych; `author` → `name`; usunąć `<title />` z `_app.js`        | `getMetadata.js`, `_app.js`              | 10 min |
| 8   | Naprawić `sizes` w `ResponsiveImage` (bez `undefinedpx`) i na `/kontakt`                                 | `ResponsiveImage.js`, `kontakt/index.js` | 15 min |

Weryfikacja: `npm run build && npm start`, `curl -s localhost:3000/test-poziomujacy | grep -o '<title>[^<]*'`,
Lighthouse na `/` (LCP powinien spaść poniżej 3 s), Rich Results Test dla `/`.

### P1 – w ciągu miesiąca

> **Status:** wdrożone 17.09.2026 (working tree, bez commitu): punkty 10–18
> oraz kodowa część punktu 9 (`mailto:` w stopce, na `/kontakt` i na stronie
> kursu wakacyjnego; `decryptEmail` usunięty). **Sprostowanie:** punkt 10 okazał
> się zmianą w repozytorium, nie w Cloudflare – przekierowanie `www` robi
> `public/.htaccess`, który wbrew `CLAUDE.md` jest aktywny (§4.1); jest już
> `R=301`. Punkt 9 domknięty 17.09.2026: właściciel wyłączył Email Address
> Obfuscation w Cloudflare (zweryfikowane na produkcji), więc **całe P1 jest
> zrobione**. Punkt 18 wdrożony jako
> przekierowanie **tymczasowe** (307), nie 301: strona jest sezonowa i ma
> wrócić pod tym samym adresem. Treść stron kursów (pkt 15) jest napisana
> wyłącznie z faktów obecnych w repo (strony kursów, cennik, FAQ, „O nas”) –
> do przeczytania przez szkołę; przy pisaniu wyszła niespójność: `/kursy/grupowe`
> podaje grupy 2–3 os., a `/cennik` 3–4 os. dla tych samych kursów. Zweryfikowane
> lokalnie na buildzie produkcyjnym; Lighthouse (lokalnie) SEO 100 i bez
> `heading-order` na `/`, `/kursy/grupowe`, `/test-poziomujacy`, `/kontakt`.
> Sitemapa generuje się w `prebuild`, obrazy OG są w `public/images/og-*.jpg`.

| #   | Zadanie                                                                                                             | Gdzie                                         | Czas           |
| --- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------- |
| 9   | E-mail jako `mailto:` w kodzie **oraz** wyłączenie Email Address Obfuscation w Cloudflare – oba zrobione 17.09.2026 | `Footer.js`, `kontakt/index.js`, Cloudflare   | 30 min         |
| 10  | `R=307` → `R=301` dla `www` **w `public/.htaccess`**, nie w Cloudflare                                              | `public/.htaccess`                            | 5 min          |
| 11  | Nowe tytuły i skrócone opisy wg §5.5–5.6                                                                            | `getMetadata.js`                              | 1 h            |
| 12  | Obraz OG 1200×630 (domyślny + test), `summary_large_image`, `twitter:*` z `name`                                    | `public/images/`, `getMetadata.js`            | 2 h + grafika  |
| 13  | Generowanie `sitemap.xml` z `routeMap` w `prebuild`, `lastmod` z gita, bez `priority`                               | `scripts/generate-sitemap.js`, `package.json` | 1,5 h          |
| 14  | FAQ o teście na `/test-poziomujacy` + akapit wprowadzający                                                          | `TestIntroView.js`, `TestFAQ.js`              | 1 h            |
| 15  | Rozbudowa treści stron kursów wg §8.2 (copy + linki kontekstowe + FAQ per kurs)                                     | `src/pages/kursy/*`                           | 1–2 dni z copy |
| 16  | Hierarchia nagłówków (`Features`, `Accordion`, `WhyUsExpanded`, kontakt, polityka)                                  | komponenty                                    | 1,5 h          |
| 17  | `TeamCard`: renderować całe bio w HTML, zwijać CSS-em                                                               | `TeamCard.js`                                 | 30 min         |
| 18  | Decyzja dla `/kursy/intensywne-kursy-wakacyjne`: 301 na `/kursy/grupowe` na czas wyłączenia                         | `intensywne-kursy-wakacyjne.js`               | 15 min         |

### P2 – gdy będzie czas

| #   | Zadanie                                                                                                | Czas   |
| --- | ------------------------------------------------------------------------------------------------------ | ------ |
| 19  | `next/font/google` zamiast `fonts.css`/`fonts2.css`; usunąć zbędne `preconnect`                        | 2 h    |
| 20  | JSON-LD `Course`+`Offer` na stronach kursów, `WebSite` na `/`, `Person` na `/o-nas`, `sameAs` z Mapami | 2 h    |
| 21  | Widoczny breadcrumb na wszystkich podstronach                                                          | 20 min |
| 22  | `alt` lektorów i `Idea`; polskie `title` na linkach social                                             | 20 min |
| 23  | Zmniejszyć źródła obrazów, `contact.png` → JPG, usunąć nieużywane                                      | 30 min |
| 24  | Przejrzeć importy Bootstrapa (`alert`, `carousel`, `forms`), `browserslist`                            | 1 h    |
| 25  | `robots.txt`: `Disallow: /api/`, `/email-preview`                                                      | 5 min  |
| 26  | Porządki z §13                                                                                         | 30 min |
| 27  | Kontrast przycisków pomarańczowych, `target-size`, `aria-label` vs tekst                               | 1–2 h  |

### P3 – strategicznie

- **Blog / poradniki** – to jedyna droga do ruchu na frazy informacyjne, które
  poprzedzają decyzję o kursie: „poziomy angielskiego A1–C2 – co oznaczają”, „jak
  sprawdzić swój poziom angielskiego”, „czasy angielskie – ściąga” (temat
  e-booka), „egzamin ósmoklasisty z angielskiego – jak się przygotować”, „matura
  rozszerzona z angielskiego – co się zmienia”. Każdy artykuł kończy się CTA do
  testu. Technicznie: `src/pages/blog/[slug].js` + MDX lub proste pliki JSON;
  wpisy w `routeMap`/sitemapie generowane automatycznie (§4.3).
- **Search Console jako rutyna**: raz w miesiącu „Skuteczność” (zapytania per
  strona), „Strony” (co jest nieindeksowane i dlaczego), „Podstawowe wskaźniki
  internetowe” (realne CWV z Chrome UX Report – dziś ruch może być za mały na
  dane).
- **Wizytówka Google**: spójne NAP z §7.1, link do `/test-poziomujacy` jako
  „Umów wizytę”/link niestandardowy, regularne opinie (link „Zobacz opinie na
  Google” już jest – dodać w mailu po lekcji próbnej prośbę o opinię).

---

## 15. Jak weryfikować po wdrożeniu

```bash
# lokalnie: build produkcyjny i szybki przegląd <head>
npm run build && npm start &
for p in / /test-poziomujacy /cennik /nie-istnieje; do
  echo "== $p"; curl -s "http://localhost:3000$p" | tr '\n' ' ' \
    | grep -o '<title[^>]*>[^<]*</title>\|<meta name="description"[^>]*>\|<link href="[^"]*" rel="canonical"' ;
done
```

- **Lighthouse** (mobile) na produkcji:
  `npx lighthouse https://rozmowni.pl/ --preset=perf --form-factor=mobile --view`
  – cel: LCP < 2,5 s, Performance ≥ 90 na `/`, SEO 100 na każdej stronie.
- **Rich Results Test** (`search.google.com/test/rich-results`) dla `/`,
  `/kursy/grupowe` (po dodaniu `Course`), `/o-nas`.
- **Schema Markup Validator** (`validator.schema.org`) – ogólna poprawność JSON-LD.
- **Meta Sharing Debugger** – podgląd OG dla `/` i `/test-poziomujacy`, „Scrape
  Again” po zmianie obrazu.
- **GSC**: po deployu „Sprawdzenie URL” → „Poproś o zindeksowanie” dla
  `/test-poziomujacy` i stron z nowymi tytułami; po 2–4 tygodniach porównać CTR
  w „Skuteczności”.
- **`curl -sI https://www.rozmowni.pl/`** → oczekiwane `HTTP/2 301`.
- **`curl -s https://rozmowni.pl/kontakt | grep -c __cf_email__`** → `0`.
  Sprawdzone 17.09.2026: obfuskacja wyłączona, adres jest zwykłym tekstem.
