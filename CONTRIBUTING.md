# Contributing to AI-ApexTrace

Thanks for your interest in improving AI-ApexTrace! This guide covers the basics.

## Development setup

```bash
npm install
npm run dev      # http://localhost:3000
```

## Project conventions

- **Stack:** Next.js (App Router) + React + TypeScript + Tailwind + shadcn/ui.
- Keep Server Components for data; mark interactive pieces `'use client'`.
- Honor `prefers-reduced-motion` in all animation work.
- Bilingual content uses the `Bilingual = { zh: string; en: string }` shape defined in `src/lib/i18n/types.ts`. Add new UI strings to `src/lib/i18n/translations.ts`.

## Before opening a PR

```bash
npm run lint
npm run build
```

Ensure both pass and that the dev server renders without console errors.

## Ideas

- Add venues to `src/lib/data/venues.ts` (keep `Bilingual` fields).
- Improve the heat-index weights in `src/lib/heat-index.ts`.
- Propose new visualizations under `src/components/*`.

Open an issue or PR — all contributions are welcome.
