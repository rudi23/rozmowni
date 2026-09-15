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

- **`src/routes/index.js`** — every URL lives in `routeMap`. Components must link via `routeMap[routeNames.X]`, never hardcoded strings. Commenting out a `routeMap` entry disables the page: the page's `getServerSideProps` returns `notFound` and conditional links disappear (see `pages/kursy/intensywne-kursy-wakacyjne.js`). Adding a page means touching `routeMap`, `getMetadata`, the page file, `Header`, `Footer` and `public/sitemap.xml`.
- **`src/services/metadata/getMetadata.js`** — per-route title/description/OpenGraph/JSON-LD, rendered by `components/Metadata.js` from `_app.js`.
- **`src/data/testData.js`** — placement-test questions, answers (`correct` is a 0-based index into `options`) and score thresholds. Root-level `test.md` is an outdated draft, **not** a data source.

### Tracking layer (`src/services/tracking/`)

Components never touch `react-ga4` or `react-facebook-pixel` directly. They import a hook plus an event constant:

```js
const trackClick = useClickTracking();
<Link onClick={() => trackClick(events.HOME_BANNER_CLICK_TEST)}>
```

GA4 carries page views and all click events (`{ category, action, label }` constants in `events.js`); the FB Pixel carries `PageView` plus the only two real conversion signals — `Lead` on test completion and `CompleteRegistration` on contact-details submit. Both libraries are lazy-`import()`ed and **re-initialized before every send** — that is deliberate, not redundant (see `facebookPixel.js`). Analytics IDs are hardcoded, so staging and production report into the same GA4 property and Pixel. In `NODE_ENV=development` nothing leaves the browser; the calls only `console.log`, which is the only way to verify tracking locally.

### Email

API routes → `utils/emailService.js` (singleton, nodemailer + SMTP) → React Email templates in `src/emails/*.jsx`, rendered to HTML plus a plain-text alternative. Templates are imported dynamically inside the service to avoid circular deps. Preview and test-send all three templates at `/email-preview`, which is behind HTTP Basic Auth in `src/middleware.js`.

### API routes

`POST /api/send-test-results` and `POST /api/send-contact-form-notification` share a shape: POST-only → `x-api-key` check against `API_KEY` → per-IP rate limit held **in process memory** (resets on restart, not shared across instances) → field validation → side effects. The test endpoint also appends a row to `CSV_FILE_PATH`; a CSV write failure is logged but does not fail the request.

The client sends `x-api-key` from `NEXT_PUBLIC_API_KEY`; the server compares against `API_KEY`. Set both to the same value locally or every submit returns 401. `createAuthHeaders()` falls back to the literal placeholder `<NEXT_PUBLIC_API_KEY>`, which the deploy workflow rewrites with `sed` — keep that placeholder string intact.

### Placement test flow

`pages/test-poziomujacy.js` is a small in-memory state machine (`selectedTest` / `showResults` / `score`) driving `TestIntroView` → `TestRunner` → `TestResultsView`. A refresh restarts the test. The score and level are deliberately **never shown in the browser** — they only arrive by email, which is what makes the test a lead magnet. Don't "fix" that by rendering the result.

## Conventions

- Styling is a mix: Bootstrap 5 SCSS, global CSS in `src/styles/`, and CSS Modules (`*.module.scss`) for newer components. New components use CSS Modules.
- **Design tokens live once, in `:root` in `src/styles/globals.css`** — three radii (`--radius-control` 8px, `--radius-card` 16px, `--radius-pill`), two shadows (`--shadow-rest`, `--shadow-raised`), the section rhythm (`--section-gap` 88px / `--section-gap-mobile` 56px) and the brand colours. `src/styles/_tokens.scss` only re-exports them as SCSS names (`$radius-card`, `$teal`, …) and is pulled in by `_mixins.scss`, which every `*.module.scss` imports. Never write a raw radius, shadow or brand hex in a component.
- **Three buttons, no more**: `ctaPrimary($size, $inverse)` (orange, the one main action), `ctaSecondary($size)` (navy outline) and `ctaLink()`, all in `_mixins.scss`; sizes are `'sm' | 'md' | 'lg'`. The global `.btn` / `.btn-main` / `.btn-outline` / `.btn-link` classes in `style.css` are the same three for non-module markup. Button copy is sentence case — the mixin sets no `text-transform`. Hover only darkens; nothing lifts, scales or grows a shadow, and `--shadow-raised` is reserved for genuinely floating things (the nav dropdown, the sticky CTA).
- **Icons are FontAwesome only.** The legacy `bicon` icon font is no longer loaded (`public/libs/bicon` is dead weight and can be deleted). Emoji are never icons — `CourseDetails` maps semantic keys (`time`, `lessons`, `semesters`, `people`, `price`, `payment`, `level`, `place`) to icons, and `TrustPoints` renders the "✓ bez spamu" style reassurance lines.
- Email templates share `src/emails/theme.js`, which mirrors these tokens as literal values (email clients do not support custom properties). Buttons there are orange primary / navy secondary.
- ESLint enforces some less common rules that are easy to trip: `import/exports-last` (all exports at the bottom of the file), `import/order` with no blank lines between import groups, and a blank line required before every `return` and `export`. Run `npm run lint:fix` rather than hand-fixing.
- Husky pre-commit runs lint-staged (ESLint `--fix` on JS/JSX, Prettier on everything); commit-msg runs commitlint. Conventional Commits with a restricted type list — `build, chore, ci, config, docs, feat, fix, perf, refactor, revert, test`.
- Prettier uses single quotes; `public/libs` is excluded from both Prettier and ESLint.
- `public/mail.php` and `public/.htaccess` are leftovers from the old PHP hosting and are unused by the Next app.

## Deploy

There is **no release process** — no version bumps, no tags, no `CHANGELOG.md`. Git history is the record of what shipped.

Both deploys are manual `workflow_dispatch` runs from the Actions tab, and nothing runs on the maintainer's machine. `deploy-production.yml` refuses any ref other than `master` (a guard step fails the job); `deploy-staging.yml` accepts any branch. Both build, write `.env.local` from `.env.example` with GitHub secrets, write the commit SHA to a `REVISION` file (it ships in the tarball, so a release directory can be traced back to a commit) and to the job summary, rsync a tarball to the server, swap a symlink and `touch tmp/restart.txt` (Passenger). `rollback.yml` repoints the symlink at a previous release.

Release directories on the server are named by timestamp (`YYYYMMDDHHMM`), not by version — `REVISION` inside them is what maps one to a commit.
