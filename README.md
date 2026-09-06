# Mosobalaje Vehicle Imports

A vehicle sourcing and sales app for Nigerian buyers, with a public showroom and an internal inventory workspace. Customers can explore vehicles, review import progress, contact the team, and request a custom import. Staff can manage vehicles, leads, inquiries, requests, and website settings.

## What is in the app?

- **Showroom:** a featured vehicle spotlight, curated homepage inventory, searchable listings, make and availability filters, sorting, vehicle galleries, and WhatsApp inquiries.
- **Custom sourcing:** a vehicle request form, a nine-step import guide, company information, and a contact form.
- **Admin workspace:** inventory creation and editing with formatted vehicle descriptions, detailed inquiry and vehicle-request views, working/done workflow actions, editable welcome-email templates, lead tracking, dashboard summaries, and site content settings.
- **User feedback:** route skeletons, retry and not-found pages, form submission feedback, active navigation, and keyboard focus indicators.
- **Motion:** GSAP introduces homepage content; Anime.js reveals inventory and journey sections as they enter the viewport. Both load on demand, clean up on unmount, and respect reduced-motion preferences. Content stays visible if animation code fails to load.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, MongoDB, Zod, Tiptap, sanitize-html, Lucide icons, GSAP 3, and Anime.js 4. npm and `package-lock.json` are the documented installation path.

## Run locally

Use Node.js 22 LTS or newer supported LTS and a local MongoDB instance or MongoDB Atlas database.

```bash
npm ci
```

Copy `.env.example` to `.env.local` and configure:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Required MongoDB connection string. |
| `MONGODB_DB` | Database name; defaults to `mosobalaje_imports`. |
| `APP_URL` | Absolute site URL used in metadata; use `http://localhost:3000` locally. |

Phone, WhatsApp, business hours, and homepage copy are stored in the MongoDB `settings` collection and managed through the settings page. Keep credentials in your local environment; do not commit them.

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). Inventory pages need a reachable database. Without one, the app displays its retry screen.

### Optional demo data

**The seed script drops every existing collection in the configured database. Only run it against a disposable development database.** It creates sample vehicles, leads, inquiries, vehicle requests, site settings, and a placeholder admin record, along with query indexes.

The seed script uses dotenv; explicitly select the Next.js environment file:

```bash
npx tsx --env-file=.env.local src/lib/seed.ts
```

The seed script is not a migration tool and should not be used to initialize an existing production database.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and curated inventory |
| `/vehicles` | Search, filter, and sort inventory |
| `/vehicles/[slug]` | Vehicle specifications, gallery, and inquiries |
| `/request-vehicle` | Custom sourcing request |
| `/import-process` | Import process guide |
| `/about`, `/contact` | Business information and contact |
| `/admin` | Staff dashboard |
| `/admin/vehicles` | Inventory management |
| `/admin/leads`, `/admin/inquiries`, `/admin/requests` | Customer follow-up |
| `/admin/settings` | Website content |
| `/api/vehicles` | Vehicle inventory JSON used by the admin inventory page |

## Project structure

```text
src/
  app/
    (public)/          Public pages, navigation, and footer
    admin/             Staff dashboard and management pages
    api/vehicles/      Inventory route handler
    loading.tsx        Root loading fallback
    error.tsx          Recoverable page error screen
    not-found.tsx      Missing page screen
    globals.css        Shared styling and reduced-motion rules
  components/
    admin/             Responsive staff navigation
    forms/             Contact, inquiry, and sourcing forms
    layout/            Public navigation and footer
    ui/                Shared feedback, modal, and motion components
    vehicles/          Cards, gallery, search, and filters
  lib/
    data.ts            MongoDB reads and server actions
    mongodb.ts         Shared connection promise and collection names
    types.ts           Domain types
    validations.ts     Zod input schemas
    formatting.ts      Shared display and WhatsApp helpers
    seed.ts            Destructive demo database reset
```

## Performance approach

- The homepage fetches at most six featured and six other vehicles, in parallel with settings.
- Concurrent database reads share a pending connection and one pool; failed connections can retry. Socket and pool waits are bounded. Public settings are read at request time, keeping editable content fresh and avoiding database reads during production builds.
- Vehicle cards and the homepage spotlight use responsive Next.js images. The spotlight image is preloaded; card images are lazy loaded. Failed vehicle photos show a readable fallback. Unsplash is configured for optimization; other inventory hosts retain direct loading until explicitly allowed in `next.config.ts`.
- GSAP and Anime.js use dynamic imports so their code does not block the initial page render. Anime.js loads when a reveal section approaches visibility.
- Search uses a deferred value to keep typing responsive; all filters recompute from current state.
- Route loading boundaries provide immediate visual feedback while server data is pending.

Inventory listing still loads all vehicles for client-side filtering. Large catalogs should move to server pagination and indexed filtering. These are implementation improvements, not measured speed guarantees. Compare production Lighthouse results and field Core Web Vitals against the same database, device, and network to assess real gains.

## Checks and production build

```bash
npm run typecheck
npm run lint
npm run test:e2e
npm run build
npm start
```

The build uses Google fonts through `next/font`, so its environment needs access to the font service. MongoDB must be reachable from the deployed server. Deploy with the same environment variables as local development, using the actual public URL for `APP_URL`.

Browser tests use Playwright with installed Microsoft Edge, in desktop and 390px mobile viewports. They reuse a running dev server at `http://localhost:3000`, or start one automatically. A configured development database with at least one vehicle is needed for the public inventory and image fallback checks; admin retry tests intercept the inventory API and do not write to the database. Test artifacts are ignored by Git.

Manual checks: browse a vehicle from the homepage, type and clear a search, change every filter and sort, reset an empty result, navigate on a narrow screen, enable reduced motion, and test retry feedback with an unavailable database. Exercise create/update/delete only in a test database.

## Current admin limitation

The existing admin login is a **demo-only client-side passcode gate** stored in localStorage. It accepts `admin`, `admin123`, and `mosobalaje2026`. It does not provide server-side authorization, and the seeded admin record is a placeholder. Before exposing staff functionality publicly, implement server-verified sessions and authorization for each private read and mutation. Setting an environment password alone does not secure the current implementation.

## Animation references

- [GSAP responsive motion and cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- [Anime.js with React scopes](https://animejs.com/documentation/getting-started/using-with-react/)
