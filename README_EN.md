<p align="right">
  <a href="README.md">中文</a>
</p>

<p align="center">
  <picture>
    <img alt="AI-ApexTrace" src="https://img.shields.io/badge/AI--ApexTrace-Research%20Map%20Dashboard-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0zIDNoMTh2MThIM3pNNSA1djE0aDE0VjV6bTItMmg0djRoLTR6bTAgNmg0djRoLTR6bTYtMmg0djRoLTR6bTYtMmg0djZoLTR6bS02IDZoNHYyaC00eiIvPjwvc3ZnPg==">
  </picture>
</p>

<div align="center">

# 🚀 AI-ApexTrace

### Turn "what is being researched in AI, where it's hottest, who's leading, and where to invest" into an interactive dashboard

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Data Source](https://img.shields.io/badge/Data-OpenAlex-0ABF53?logo=openaccess&logoColor=white)](https://openalex.org/)
[![Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Try%20it-6366f1)](https://saltgardenia.github.io/AI-ApexTrace/)
[![Stars](https://img.shields.io/github/stars/SaltGardenia/AI-ApexTrace?style=social)](https://github.com/SaltGardenia/AI-ApexTrace/stargazers)

[🌐 Live Demo](https://saltgardenia.github.io/AI-ApexTrace/) · [📖 About](https://saltgardenia.github.io/AI-ApexTrace/about) · [🐛 Report an Issue](https://github.com/SaltGardenia/AI-ApexTrace/issues)

</div>

---

## ✨ Features

- 🗺️ **See the big picture at a glance** —— condense research directions scattered across countless papers into a zoomable "research map".
- 🔥 **Find directions and gauge momentum** —— which subfields are surging, which are saturated, and where the cross-disciplinary blue oceans lie.
- 📈 **Plan with evidence** —— topic selection, team building, partner discovery, and your annual submission calendar, all backed by data rather than hearsay.
- 🧭 **Avoid detours** —— replace gut feeling with real paper data to align your research with macro trends.

## 🧩 Core Modules

| Module | Description |
| --- | --- |
| 🗺️ [Research Direction Map](https://saltgardenia.github.io/AI-ApexTrace/directions) | Treemap overview + bubble quadrant chart + subfield detail page + classification tree |
| 🏛️ [Venue Panorama](https://saltgardenia.github.io/AI-ApexTrace/venues) | Filter by CCF tier, JCR/CAS partition, and field; acceptance rates and direction distribution |
| 📚 [Journal Panorama](https://saltgardenia.github.io/AI-ApexTrace/journals) | The same filtering and comparison experience — choose journals without blind submissions |
| 📅 Conference Calendar | A timeline of deadlines and meeting dates for your annual submission rhythm |
| 🏠 Home Heat Overview | An overall trend dashboard the moment you open the app |

### Research Direction Map highlights

- **Field distribution overview (treemap)**: each block is a minimal subfield; its area represents paper output scale.
- **Direction bubble quadrant chart**: X-axis = growth, Y-axis = influence, bubble size = output — quickly locate "high-potential directions".
- **Subfield detail page**: composite heat index, annual output curve, influence metrics, Top institutions, core hosting venues, milestones / bottlenecks / baselines / datasets / cross-cutting directions — understand one direction on a single page.
- **Field classification tree**: drill down from the AI overview to specific subfields layer by layer.

## 🖥️ Screenshots

> Just open the [🌐 Live Demo](https://saltgardenia.github.io/AI-ApexTrace/) to explore all interactive views — no installation required.

- Switch between **中文 / English** and **light / dark theme** at the top 🌗
- Freely explore using filters, search, and by clicking blocks / bubbles 🔍

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Charts / Visualization**: [Recharts](https://recharts.org/) · [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) (3D)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) · Icons: [lucide-react](https://lucide.dev/)

## 🚀 Local Development

> Requires [Node.js](https://nodejs.org/) (recommend ≥ 20 LTS).

```bash
# 1. Clone the repository
git clone https://github.com/SaltGardenia/AI-ApexTrace.git
cd AI-ApexTrace

# 2. Install dependencies
npm install

# 3. Fetch and build local data (from OpenAlex and other open academic sources)
npm run pipeline

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000 to preview locally.

## 📊 About the Data

- Data comes from open academic sources such as [OpenAlex](https://openalex.org/), updated automatically every week.
- Trends are presented via **macro aggregation**; individual papers are not shown.
- A public, explainable "research heat index" is used (a weighted composite of output scale, academic influence, growth trend, and ecosystem activity); see the [About page](https://saltgardenia.github.io/AI-ApexTrace/about) for calculation details.
- **Known limitations**: new directions are underestimated during a cold-start period; topic classification and open-access rate recognition have errors; CCF tier annual caliber may change.

## 🗺️ Roadmap

- [ ] More data sources with cross-validation
- [ ] Personalized watchlist and subscription alerts
- [ ] Deeper institution / researcher comparisons
- [ ] Export and sharing (reports, charts)

## 🤝 Contributing

Issues, PRs, and suggestions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

[Apache 2.0](LICENSE) © AI-ApexTrace
