# Mosobalaje Vehicle Imports

Premium automotive sourcing and importation platform for Nigeria. A modern full-stack web application for browsing imported vehicles, requesting custom vehicle sourcing, and managing inventory — built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Animation | GSAP, Anime.js |
| Database | MongoDB Atlas |
| Validation | Zod |
| Auth | Passcode-based (admin) |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- MongoDB Atlas account (or local MongoDB)

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB` | Database name (default: `mosobalaje_imports`) |
| `APP_URL` | Application deployment URL |
| `WHATSAPP_NUMBER` | Business WhatsApp number (Nigerian format) |
| `ADMIN_DEFAULT_PASSWORD` | Admin dashboard default password |

3. **Seed the database**

```bash
npm run seed
```

This populates the database with 8 sample vehicles, demo leads, inquiries, and requests.

4. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (fonts, metadata)
│   ├── globals.css           # Global styles
│   ├── (public)/             # Public-facing routes (layout with Navbar + Footer)
│   │   ├── page.tsx          # Home page
│   │   ├── vehicles/         # Vehicle inventory
│   │   │   ├── page.tsx      # Vehicle listing (server component)
│   │   │   └── [slug]/       # Dynamic vehicle detail
│   │   ├── request-vehicle/  # Custom vehicle sourcing request
│   │   ├── import-process/   # 9-step import process guide
│   │   ├── about/            # About page
│   │   └── contact/          # Contact page
│   └── (admin)/              # Admin dashboard routes (protected layout)
│       ├── page.tsx          # Dashboard with metrics
│       ├── vehicles/         # Vehicle CRUD management
│       ├── leads/            # Lead management
│       ├── inquiries/        # Inquiry management
│       ├── requests/         # Vehicle request management
│       └── settings/         # Website content settings
├── components/               # Reusable UI components
│   ├── admin/                # Admin dashboard components
│   ├── forms/                # Form components (Contact, Inquiry, Vehicle Request)
│   ├── layout/               # Navbar, Footer
│   ├── ui/                   # Shared UI (Toast, Modal, StatusBadge, etc.)
│   └── vehicles/             # Vehicle Card, Gallery, Filters, Search
└── lib/                      # Server-side code
    ├── mongodb.ts            # MongoDB connection singleton
    ├── types.ts              # TypeScript type definitions
    ├── validations.ts        # Zod validation schemas
    ├── data.ts               # Server Actions (CRUD operations)
    └── seed.ts               # Database seed script
```

## MongoDB Collections

| Collection | Purpose |
|------------|---------|
| `vehicles` | Vehicle inventory with indexes on slug, status, make, model, year, featured |
| `leads` | Sales leads with status tracking |
| `inquiries` | Customer inquiries |
| `vehicleRequests` | Custom vehicle sourcing requests |
| `adminUsers` | Admin authentication |
| `settings` | Website content settings |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |

## Admin Access

Navigate to `/admin` and log in with one of the following passcodes:
- `admin`
- `admin123`
- `mosobalaje2026`

## Architecture

The application follows Next.js App Router conventions:

- **Server Components** (default) for data fetching
- **Client Components** (`'use client'`) for interactive UI
- **Server Actions** (`'use server'`) for all mutations
- **Route Groups** `(public)` and `(admin)` for layout separation
- **Dynamic Routes** `[slug]` for vehicle detail pages

All data mutations go through server actions with Zod validation. MongoDB is the single source of truth. No client-side data mutation bypasses the server.

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform. Ensure `MONGODB_URI` is set as an environment variable.