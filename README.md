# AI-ApexTrace · AI Research Landscape Index

> **An open, explainable map of the AI academic landscape** — macro-level statistics of CCF A/B/C venues, research-direction heat-mining, and multi-dimensional visualization, with maintained submission / notification / conference timeline metadata to help researchers track where the field is heading.

[🇨🇳 中文](README.zh-CN.md) · [🇺🇸 English](README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)
[![Data Update](https://img.shields.io/badge/data-weekly%20auto-brightgreen)](.github/workflows/update-data.yml)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://github.com/SaltGardenia/AI-ApexTrace/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SaltGardenia/AI-ApexTrace/blob/main/CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/SaltGardenia/AI-ApexTrace?style=social)](https://github.com/SaltGardenia/AI-ApexTrace)

AI-ApexTrace turns the firehose of AI publications into a **calm, comparative dashboard**. It aggregates CCF A/B/C venues (plus widely-recognized industry conferences) into an **AI Research Heat Index** — so you can see *which directions are heating up, which venues matter, and when to submit*.

> **Live site:** https://saltgardenia.github.io/AI-ApexTrace
> **Data refresh:** auto-updated weekly (see [`.github/workflows/update-data.yml`](.github/workflows/update-data.yml)).

![AI-ApexTrace dashboard](https://github.com/SaltGardenia/AI-ApexTrace/raw/main/public/preview-hero.png)
> _Tip: drop a `public/preview-hero.png` screenshot here to show the live dashboard._

---

## 1. ✨ Features

Capabilities are split into **researcher-facing** and **developer-facing**.

**For researchers**
- **Full CCF A/B/C AI venue list** — conferences & journals, each with a tag system (CCF rank, domain tag, venue type, publisher).
- **Venue metadata database** — submission-open window, abstract / full-paper **deadline**, notification date, conference dates, location, official site link.
- **Macro statistics (no single-paper detail)** — annual paper volume per direction, heat trends, domain share, and cross-domain migration over time.
- **Multi-dimensional dashboards** — time-series trends, domain heatmaps, venue comparisons, and direction-evolution graphs.
- **Data export** — CSV / JSON of the venue list and aggregated statistics for secondary research.

**For developers**
- **Filtering** — by CCF rank, sub-domain (CV / NLP / ML / RL / Robotics / AI Safety …), year, and venue type.
- **Automated data pipeline** — weekly refresh of venue timelines and aggregated paper statistics, with a self-healing retry layer for rate limits.
- **Community correction** — submit fixes to venue metadata via pull request.

> **Project boundary:** AI-ApexTrace is a **macro aggregation** view. It does **not** parse, store, or display full text of individual papers. It counts and scores at the venue / direction / year level only.

---

## 2. 🎯 Motivation

- The number of AI top-tier venues is huge; researchers struggle to grasp the **overall flow** of the field at a glance.
- Most existing tools focus on **single-paper retrieval**, leaving a gap for a **global, macro perspective** of direction-level heat.
- Conference deadlines are scattered across the web with no single, continuously-maintained AI venue timeline.
- We want to provide an **open dataset + visualization web platform** that serves the entire AI research community — benchmarked loosely against [artificialanalysis.ai](https://artificialanalysis.ai) in spirit (comparable, explainable views rather than paper feeds).

---

## 3. 📊 Platform Modules

Five core surfaces, each a route in the app:

1. **📅 Conference Calendar** (`/venues`) — full venue metadata, deadline countdowns, filterable by CCF rank and sub-domain. Conference vs. Journal panorama (`/journals`) included.
2. **📈 Trend Dashboard** (home `/`) — global multi-year AI statistics with multi-dimensional charts (heat hero, direction ranking, top directions).
3. **🔍 Conference / Direction Explorer** (`/directions`) — treemap of directions, quadrant evolution graph, and per-direction drill-down profiles.
4. **🗓 Year-by-Year Overview** — per-year panorama of output distribution across directions (within the Trend Dashboard & direction detail views).
5. **📁 Datasets** — publicly exported venue metadata and aggregated statistics (see Data Overview below).

---

## 4. 📋 Data Overview

> Accurate, transparent data boundaries matter. This section explains sources, schema, and limitations.

**Data sources**
- [OpenAlex](https://openalex.org) — publication counts, citation metrics, venue metadata (polite-pool via `OA_MAILTO`).
- [Crossref](https://www.crossref.org) — publication & DOI cross-validation.
- [arXiv](https://arxiv.org) — pre-print volume as an early-signal supplement.
- Conference official sites & the **CCF recommended international conference/journal list** — venue tiers and submission timelines.

**Two dataset classes**

1. **Venue metadata** — name, abbreviation, CCF rank, sub-domain tags, submission-open / deadline / notification / conference dates, location, official site, publisher.
2. **Aggregated statistics (no single papers)** — per year, per venue, per research direction: paper counts, heat scores, growth rates, and cross-domain fusion indicators.

**Tag system**
- `CCF Rank`: A / B / C
- `Research domain`: CV / NLP / ML / RL / Robotics / Theory / AI Safety / Multimodal / Embodied / Generative …
- `Venue type`: Conference / Journal

**Freshness & limitations**
- Auto-refreshed **weekly** via the data-update workflow.
- Some niche CCF-C venues have incomplete official info → missing dates are shown as `—`, never fabricated.
- Direction tags are algorithmically assigned and may contain classification errors — corrections welcome.

**Dataset paths (in-repo)**
- Generated / aggregated data: `src/lib/data/generated/` (`field-metrics.json`, `field-stats.json`, `FieldMetrics.ts`, `FieldStats.ts`).
- Pipeline sources & cache: `scripts/pipeline/` (extract, collect, synthesize, metrics, merge).

---

## 5. 🛠 Tech Stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js 16 (App Router, RSC, static export) |
| UI | React 19 + TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Charts | Recharts 3 |
| Motion | Framer Motion |
| i18n | Lightweight in-house context provider (EN / 中文) |
| Data pipeline | Node.js (ESM) scripts: extract → collect → synthesize → metrics → merge |
| Data sources | OpenAlex / Crossref / arXiv APIs |
| Deploy | GitHub Pages (static export) via GitHub Actions |

> The repo contains the **data pipeline scripts**, the **front-end web code**, and the **generated datasets**. No separate backend / database is required — data is pre-aggregated at build/pipeline time and shipped as static JSON/TS.

---

## 6. 🚀 Quick Start

Two paths: **(A) run the full web app locally**, or **(B) use the datasets only**.

### A. Run the web app

```bash
# 1. Install dependencies
npm install

# 2. (optional) refresh the dataset from upstream sources
npm run pipeline

# 3. Run the dev server
npm run dev

# 4. Open http://localhost:3000
```

Production build & static export:

```bash
npm run build     # emits ./out (static)
npm run start     # serve the production build (or host ./out on any static host)
```

### B. Use the datasets only

Read the generated JSON directly for secondary analysis:

```bash
# aggregated direction metrics (heat, growth, output per year/direction)
cat src/lib/data/generated/field-metrics.json

# per-direction statistics
cat src/lib/data/generated/field-stats.json
```

No web server required — the JSON is plain and self-describing.

---

## 7. 📐 Project Architecture

```
AI-ApexTrace/
├── src/
│   ├── app/                 # Next.js App Router pages (home, /venues, /journals, /directions, /about)
│   ├── components/          # UI components (dashboard, directions, venues, layout, ui primitives)
│   └── lib/
│       ├── data/            # Static data: directions.ts, venues.ts, field-tree.ts, generated/
│       └── i18n/            # Bilingual strings & provider
├── scripts/
│   └── pipeline/            # Data pipeline: extract → collect → synthesize → metrics → merge
├── .github/
│   └── workflows/           # update-data.yml (weekly refresh + deploy), deploy.yml
├── public/                  # Static assets (add preview-hero.png here)
└── README.md / README.zh-CN.md
```

---

## 8. 🤝 Contributing

We welcome all kinds of contributions:

1. **Fix venue metadata** — correct a deadline, add a venue, or fix a CCF tag.
2. **Improve the tag system / fix pipeline bugs** — better domain classification or data-script fixes.
3. **Front-end visualization** — new dashboard views, charts, or UX polish.
4. **Bug reports** — open an issue with reproducible steps.

**Process**
1. Fork the repo and create a branch (`git checkout -b fix/venue-cvpr-deadline`).
2. Keep the bilingual `Bilingual` data shape for any user-facing strings.
3. Run `npm run lint` and `npm run build` before pushing.
4. Open a PR (use the issue template for bugs).

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for details. Conference timeline info is **community-maintained** — your corrections keep the dataset honest.

---

## 9. ⚠️ Limitations

- Statistics are **aggregated only**; the project does **not** store single-paper full text.
- Research-direction tags are **algorithmically assigned** and may misclassify — community correction is encouraged.
- Some niche CCF-C venues have incomplete official info → dates may be missing (`—`).
- No paper citation-retrieval feature; positioned differently from Semantic Scholar / DBLP.

---

## 10. 🗺 Roadmap

- Richer per-year panorama & downloadable CSV/JSON export UI.
- More fine-grained cross-domain fusion metrics.
- Community-Submitted corrections queue with review flow.
- Additional language locales.

---

## 13. 📬 Contact & Links

- **Live site:** https://saltgardenia.github.io/AI-ApexTrace
- **Issues / discussions:** https://github.com/SaltGardenia/AI-ApexTrace/issues
- **CCF list reference:** CCF Recommended International Academic Conferences and Journals Catalog
- **Data pipeline:** `.github/workflows/update-data.yml`

---

### FAQ

- **Q: Why no single papers?** A: The project is intentionally a macro aggregation view — direction/venue/year level, not a paper feed.
- **Q: How often is data updated?** A: Weekly, automatically, via the GitHub Actions data-update workflow (also manually triggerable).
- **Q: How do I fix a wrong conference date?** A: Open a PR against the venue data, or file an issue — conference timelines are community-maintained.
