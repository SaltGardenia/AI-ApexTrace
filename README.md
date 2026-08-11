# AI-ApexTrace · AI Research Landscape Index

> An open, explainable map of the AI academic landscape — research-direction heat, venue profiles, and submission timelines across CCF A/B/C venues, indexed and comparable at a glance.

[🇨🇳 中文](README.zh-CN.md) · [🇺🇸 English](README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SaltGardenia/AI-ApexTrace/blob/main/CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/SaltGardenia/AI-ApexTrace?style=social)](https://github.com/SaltGardenia/AI-ApexTrace)

AI-ApexTrace turns the firehose of AI publications into a **calm, comparative dashboard**. Instead of listing individual papers, it aggregates CCF A/B/C venues (plus widely-recognized industry conferences) into an **AI Research Heat Index** — so you can see *which directions are heating up, which venues matter, and when to submit*.

---

## ✨ Features

- **📊 Research Direction Map** — a bubble quadrant (growth × impact × output) and category filters across 12 AI directions.
- **🔥 Composite Heat Index** — a transparent, reproducible score per direction (output · impact · growth · ecosystem · cross-fusion).
- **🏛 Venue Profiles** — CCF tier, acceptance rate, citations, H5-index, and direction distribution for every covered venue.
- **📅 Submission Calendar** — abstract / full-paper deadlines and conference dates, year-round.
- **⚖️ Compare** — overlay 2–5 directions' heat curves, growth, and multi-dimensional profiles side by side.
- **🌗 Light / Dark** — respects your system, toggles instantly.
- **🌐 Bilingual** — full English / 中文 interface.

---

## 🖼 Preview

![AI-ApexTrace hero](https://github.com/SaltGardenia/AI-ApexTrace/raw/main/public/preview-hero.png)
> _Tip: drop a `public/preview-hero.png` screenshot here to show the live dashboard._

---

## 🧱 Tech Stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16 (App Router, RSC)            |
| UI           | React 19 + TypeScript 5                 |
| Styling      | Tailwind CSS 4 + shadcn/ui              |
| Charts       | Recharts 3                              |
| 3D           | React Three Fiber / Three.js            |
| Motion       | Framer Motion                           |
| i18n         | Lightweight in-house context provider   |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

---

## 📐 Methodology

The **Composite Heat Index** blends four normalized signals per direction:

| Weight signal | Meaning                                  |
| ------------- | ---------------------------------------- |
| Output        | Normalized count of top-venue papers     |
| Impact        | Avg citations & top-10% cited ratio      |
| Growth        | 2-year compound growth rate              |
| Ecosystem      | Open-source (GitHub-link) rate           |

Methodology, data sources, and limitations are documented in the in-app **About** page.

---

## 🤝 Contributing

Contributions are very welcome — new venues, better weights, translations, or visualizations.

1. Fork the repo and create a branch (`git checkout -b feat/my-idea`).
2. Make your change, keeping the bilingual `Bilingual` data shape.
3. Run `npm run lint` and `npm run build` before pushing.
4. Open a pull request.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

---

## 🚀 Deploy

AI-ApexTrace is a static-friendly Next.js (App Router) app. Pick one:

### Option A — Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import `SaltGardenia/AI-ApexTrace`.
3. Framework preset is auto-detected as **Next.js**. Build command `npm run build`, output is handled automatically.
4. Click **Deploy**. Every push to `main` re-deploys via preview/production.

### Option B — GitHub Pages (static export)

1. Enable static export by adding to `next.config.ts`:
   ```ts
   export default defineConfig({
     output: "export",
     images: { unoptimized: true },
   });
   ```
2. Build the static site:
   ```bash
   npm run build   # emits ./out
   ```
3. In **Settings → Pages**, set Source to **GitHub Actions** and add a workflow (`.github/workflows/deploy.yml`) that checks out, runs `npm ci && npm run build`, and publishes `./out` to `gh-pages`.
4. After the workflow runs, the site is live at `https://SaltGardenia.github.io/AI-ApexTrace`.

> Note: `output: "export"` disables server features (none are used here), so the full app works as a static site.

---

## 📄 License

[MIT](LICENSE) © AI-ApexTrace contributors.
