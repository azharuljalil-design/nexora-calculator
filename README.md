# NexoraCalculator

NexoraCalculator is a modern, SEO-friendly calculator hub built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Tech stack

- Next.js (App Router, TypeScript)
- React
- Tailwind CSS

## High-level folder architecture

- `app/` – App Router entry points and route groups
  - `layout.tsx` – root layout with header, footer, and metadata
  - `page.tsx` – homepage
  - `about/page.tsx` – about page
  - `search/page.tsx` – search page
  - `category/[slug]/page.tsx` – category template
  - `calculator/[slug]/page.tsx` – calculator template
  - `globals.css` – global styles and Tailwind layers
- `components/`
  - `layout/` – shared layout primitives (header, footer, site layout)
  - `ui/` – low-level UI components (search input, section heading, etc.)
  - `calculators/` – calculator-related display components (category grid, lists)
- `data/`
  - `categories.ts` – static definitions of calculator categories
  - `calculators.ts` – placeholder calculator metadata (slug, name, category, etc.)
- `lib/`
  - `seo.ts` – site-wide SEO configuration and metadata helpers
  - `routes.ts` – centralised route helpers for app URLs

This structure is designed to scale to 100+ calculators by:

- Keeping calculator metadata in `data/`, decoupled from page implementations.
- Routing each calculator via `app/calculator/[slug]/page.tsx`.
- Allowing categories and calculators to share layout and UI components.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Lint the project:

```bash
npm run lint
```

## Windows PowerShell: `npm` not found / script errors

If `npm` is not recognized or you see **scripts cannot be loaded** because running scripts is disabled:

- Prefer **`npm.cmd`** (same as `npm`):  
  `npm.cmd install` and `npm.cmd run dev -- --port 3000`
- Or set execution policy for your user:  
  `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

If the app shows missing chunks or broken styles after a crash, stop the dev server, delete the **`.next`** folder, then run `npm.cmd run dev` again.

