# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`rozmowni.pl` — marketing site for an online English school (Kraków), Next.js 15 **Pages Router** + React 19. Two jobs: present the course offer, and run the lead funnel around the free placement test (`/test-poziomujacy`), which is the main source of leads. All user-facing copy is Polish; code and comments are English.

`docs/start.md` is a detailed onboarding guide (Polish) covering every page, the full test flow, env vars and deploy. `docs/tracking.md` covers analytics in depth, `docs/todo.md` lists known tracking bugs. Read them before larger changes instead of re-deriving the flow from source.

## Commands

```bash
npm ci
cp .env.example .env.local     # fill in values, see docs/start.md §9
npm run dev                    # http://localhost:3000

npm run build                  # production build
npm start                      # production server (after build)
npm run lint                   # eslint, --max-warnings=0
npm run lint:fix
npm run prettier               # check formatting
npm run prettier:fix
```

**There are no automated tests** — `npm test` just echoes `No tests`, and CI runs it as-is. Do not report "tests pass" as evidence; verify changes by running the app.

Node in CI is 22.18.0.

## Architecture

### Single sources of truth

- **`src/routes/index.js`** — every URL lives in `routeMap`. Components must link via `routeMap[routeNames.X]`, never hardcoded strings. Commenting out a `routeMap` entry disables the page: the page's `getServerSideProps` redirects (temporary 307) to the group course and conditional links disappear (see `pages/kursy/intensywne-kursy-wakacyjne.js`). Adding a page means touching `routeMap`, `getMetadata`, the page file, `Header`, `Footer` and the route→file map in `scripts/generate-sitemap.mjs`. `public/sitemap.xml` is gitignored and generated from `routeMap` by that script on `prebuild`/`predev`; `lastmod` comes from `git log`, which is why the deploy workflows check out the full history.
- **`src/services/metadata/getMetadata.js`** — per-route title/description/OpenGraph/JSON-LD, rendered by `components/Metadata.js` from `_app.js`. Social preview images are `public/images/og-*.jpg` (1200×630), rendered by `scripts/generate-og-images.mjs` – run it by hand after changing the copy and commit the JPEGs.
- **`src/data/testData.js`** — placement-test questions, answers (`correct` is a 0-based index into `options`) and score thresholds. Root-level `test.md` is an outdated draft, **not** a data source.

### Tracking layer (`src/services/tracking/`)

Components never touch `react-ga4` or `react-facebook-pixel` directly. They import a hook plus an event constant:

```js
const trackClick = useClickTracking();
<Link onClick={() => trackClick(events.HOME_BANNER_CLICK_TEST)}>
```

GA4 carries page views and all click events (`{ category, action, label }` constants in `events.js`); the FB Pixel carries `PageView` plus the only two real conversion signals — `CompleteRegistration` on test completion and `Lead` on contact-details submit. That mapping is deliberate and must not be flipped back: Meta's `Lead` means "handed over contact details", and its campaign UI offers that event as the default optimization target, so it has to sit on the form or the campaign buys abandoned quizzes. Both libraries are lazy-`import()`ed and **re-initialized before every send** — that is deliberate, not redundant (see `facebookPixel.js`). Both conversions are also reported server-side through the Conversions API (`utils/metaCapi.js`), because a blocked pixel loses exactly the conversion the ad campaign optimizes against; the browser and server copies share an `event_id` from `createEventId()` so Meta deduplicates them into one. `ReactPixel.track()` has no parameter for that id, hence the drop down to `ReactPixel.fbq('track', …, { eventID })`. `CompleteRegistration` fires before the form exists, so it gets its own endpoint carrying nothing the lead typed — only `_fbp`/`_fbc`, the request IP and the User-Agent, which are still personal data under GDPR; `Lead` rides along with the email route, matched on a hashed email. See `docs/tracking.md` §6.1. Analytics IDs are hardcoded, so staging and production report into the same GA4 property and Pixel. In `NODE_ENV=development` nothing leaves the browser; the calls only `console.log`, which is the only way to verify tracking locally.

PostHog is the third destination and follows the same rule: components import from `services/tracking/posthog.js`, never `posthog-js`. It is lazy-`import()`ed and initialized **once** (`posthog.init` is not idempotent, unlike the GA and Pixel initializers) from `usePostHogTracking` in `_app.js` - a static import would put ~90 kB gzipped into the shared bundle. Page views, SPA history changes and unhandled exceptions are captured by PostHog itself. Click events are named by the optional `posthogEvent` field on the event constants in `events.js`; anything without one is still sent, as `link_clicked` with the GA category/action/label as properties, so no click is silently dropped. An event constant may also carry an optional `posthogProperties` object, spread alongside the `source_*` fields and invisible to the GA4 path; the test events use it to report `score`, `test_level` and `score_percent`. `events.js` deliberately does not import `getLevel` to derive the level itself — that would pull the whole question bank from `testData.js` into every page that tracks a click, so the callers pass the level code in. `getRequestHeadersAsync()` adds the distinct/session id headers that let the API routes attach their server-side events to the browser session. PostHog is off entirely unless `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` are both set. No personal data is sent to PostHog: the lead's name, email and phone go out by email, to the CSV, and — SHA-256 hashed, never in the clear — to Meta's Conversions API; session replay masks all inputs.

Server-side, `utils/posthogServer.js` is deliberately fire-and-forget. By the time an API route reports an event the lead's email has already been sent, so PostHog must never delay the response or turn a delivered lead into a 500 - do not `await` a flush in the request path.

### Email

API routes → `utils/emailService.js` (singleton, nodemailer + SMTP) → React Email templates in `src/emails/*.jsx`, rendered to HTML plus a plain-text alternative. Templates are imported dynamically inside the service to avoid circular deps. Preview and test-send all three templates at `/email-preview`, which is behind HTTP Basic Auth in `src/middleware.js`.

### API routes

`POST /api/send-test-results` and `POST /api/send-contact-form-notification` share a shape: POST-only → `x-api-key` check against `API_KEY` → per-IP rate limit held **in process memory** (resets on restart, not shared across instances) → field validation → side effects. The test endpoint also appends a row to `CSV_FILE_PATH`; a CSV write failure is logged but does not fail the request. Every one of those early exits reports itself to PostHog as `lead_submission_rejected` (carrying `reason`, `route` and `status_code`) before it answers, because a lead stopped by the rate limiter or by validation is a lost lead and nothing else counts them; the 405 is deliberately left out, since a non-POST is a scanner rather than a person with a filled-in form.

`POST /api/track-test-completed` follows the same shape but is deliberately light: no CSV, no SMTP, and nothing the lead typed — it sends `_fbp`/`_fbc`, the request IP and the User-Agent, and exists only so the test's `CompleteRegistration` survives a blocked pixel. Those identifiers are personal data under GDPR even though no form field is among them; do not describe the route as PII-free. Its rate limiter comes from the shared `utils/rateLimit.js`; the two email routes still carry their own inline copies.

The client sends `x-api-key` from `NEXT_PUBLIC_API_KEY`; the server compares against `API_KEY`. Set both to the same value locally or every submit returns 401. `createAuthHeaders()` falls back to the literal placeholder `<NEXT_PUBLIC_API_KEY>`, which the deploy workflow rewrites with `sed` — keep that placeholder string intact.

### Placement test flow

`pages/test-poziomujacy.js` is a small in-memory state machine (`selectedTest` / `showResults` / `score`) driving `TestIntroView` → `TestRunner` → `TestResultsView`. A refresh restarts the test. The level and the score are shown on the results screen, in the column next to the contact form. What the form buys is the e-book and the free trial lesson, promised in exchange for an email address — that is what makes the test a lead magnet, not withholding the result.

## Conventions

- Styling is a mix: Bootstrap 5 SCSS, global CSS in `src/styles/`, and CSS Modules (`*.module.scss`) for newer components. New components use CSS Modules.
- **Design tokens live once, in `:root` in `src/styles/globals.css`** — three radii (`--radius-control` 8px, `--radius-card` 16px, `--radius-pill`), two shadows (`--shadow-rest`, `--shadow-raised`), the section rhythm (`--section-gap` 88px / `--section-gap-mobile` 56px) and the brand colours. `src/styles/_tokens.scss` only re-exports them as SCSS names (`$radius-card`, `$teal`, …) and is pulled in by `_mixins.scss`, which every `*.module.scss` imports. Never write a raw radius, shadow or brand hex in a component.
- **Three buttons, no more**: `ctaPrimary($size, $inverse)` (orange, the one main action), `ctaSecondary($size)` (navy outline) and `ctaLink()`, all in `_mixins.scss`; sizes are `'sm' | 'md' | 'lg'`. The global `.btn` / `.btn-main` / `.btn-outline` / `.btn-link` classes in `style.css` are the same three for non-module markup. Button copy is sentence case — the mixin sets no `text-transform`. Hover only darkens; nothing lifts, scales or grows a shadow, and `--shadow-raised` is reserved for genuinely floating things (the nav dropdown, the cookie card).
- **Icons are FontAwesome only.** The legacy `bicon` icon font is no longer loaded (`public/libs/bicon` is dead weight and can be deleted). Emoji are never icons — `CourseDetails` maps semantic keys (`time`, `lessons`, `semesters`, `people`, `price`, `payment`, `level`, `place`) to icons, and `TrustPoints` renders the "✓ bez spamu" style reassurance lines.
- Email templates share `src/emails/theme.js`, which mirrors these tokens as literal values (email clients do not support custom properties). Buttons there are orange primary / navy secondary.
- ESLint enforces some less common rules that are easy to trip: `import/exports-last` (all exports at the bottom of the file), `import/order` with no blank lines between import groups, and a blank line required before every `return` and `export`. Run `npm run lint:fix` rather than hand-fixing.
- Husky pre-commit runs lint-staged (ESLint `--fix` on JS/JSX, Prettier on everything); commit-msg runs commitlint. Conventional Commits with a restricted type list — `build, chore, ci, config, docs, feat, fix, perf, refactor, revert, test`.
- Prettier uses single quotes; `public/libs` is excluded from both Prettier and ESLint.
- `public/mail.php` is a leftover from the old PHP hosting and is unused. `public/.htaccess` is **not** — its `mod_rewrite` block is what redirects `www` to the bare domain (verified against production: the redirect carries Apache's `charset=iso-8859-1` body, while the `http`→`https` one carries Cloudflare's). Rewrite rules run before Passenger hands the request to Node, so they work; the `ErrorDocument` line in the same file does not, because Next serves the 404s. Treat that file as live config.

## Deploy

There is **no release process** — no version bumps, no tags, no `CHANGELOG.md`. Git history is the record of what shipped.

Both deploys are manual `workflow_dispatch` runs from the Actions tab, and nothing runs on the maintainer's machine. `deploy-production.yml` refuses any ref other than `master` (a guard step fails the job); `deploy-staging.yml` accepts any branch. Both build, write `.env.local` from `.env.example` with GitHub secrets, write the commit SHA to a `REVISION` file (it ships in the tarball, so a release directory can be traced back to a commit) and to the job summary, rsync a tarball to the server, swap a symlink and `touch tmp/restart.txt` (Passenger). `rollback.yml` repoints the symlink at a previous release — production only, because staging deliberately keeps a single release: its deploy wipes `rozmowni_staging_releases` before unpacking the new one, so there is never an older directory to go back to.

Release directories on the server are named by timestamp (`YYYYMMDDHHMM`), not by version — `REVISION` inside them is what maps one to a commit.
