<p align="right">
  <a href="README.md">中文</a>
</p>

# AI-ApexTrace

> Turn "what is being researched in AI, where it's hottest, who's leading, and where to invest" into an interactive dashboard.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[Live Demo](https://saltgardenia.github.io/AI-ApexTrace/) ·
[Source Code](https://github.com/saltgardenia/ApexTrace)

## What This Product Can Do for You

- **See the big picture at a glance**: Condense research directions scattered across countless papers into a zoomable "research map".
- **Find directions and gauge momentum**: Which subfields are surging, which are saturated, and where the cross-disciplinary blue oceans lie.
- **Plan with evidence**: Topic selection, team building, finding partner institutions, and planning your annual submission calendar can all be backed by data rather than hearsay.
- **Avoid detours**: Replace gut feeling with real paper data to quickly align your research direction with the field's macro trends.

## Core Features

### 1. Research Direction Map ([AI-ApexTrace/directions](https://saltgardenia.github.io/AI-ApexTrace/directions))

- **Field distribution overview (treemap)**: Each block is a minimal subfield; its area represents paper output scale, making the power distribution visible at a glance.
- **Direction bubble quadrant chart**: X-axis = growth, Y-axis = influence, bubble size = output — quickly locate "high-potential directions".
- **Subfield detail page**: Composite heat index, annual output curve, influence metrics, Top institutions, core hosting venues, milestones / bottlenecks / baselines / datasets / cross-cutting directions — understand one direction on a single page.
- **Field classification tree**: Drill down from the AI overview to specific subfields layer by layer.

### 2. Venue Panorama ([AI-ApexTrace/venues](https://saltgardenia.github.io/AI-ApexTrace/venues))

Filter by CCF tier, JCR/CAS partition, and research field across multiple dimensions; acceptance rates, influence, and direction distribution are clear at a glance, with search support.

### 3. Journal Panorama ([AI-ApexTrace/journals](https://saltgardenia.github.io/AI-ApexTrace/journals))

The same filtering and comparison experience — choose journals without blind submissions.

### 4. Conference Calendar

A timeline of deadlines and meeting dates, fitting your annual submission rhythm into one chart.

### 5. Home Heat Overview

An overall trend dashboard you see the moment you open the app.

## How to Use

- Open the [Live Demo](https://saltgardenia.github.io/AI-ApexTrace/) — no installation required.
- Switch between **中文 / English** and **light / dark theme** at the top.
- Freely explore using filters, search, and by clicking blocks / bubbles.

## Who It's For

- **Graduate / PhD students**: Topic selection, finding directions, seeing where target institutions are stronger.
- **Researchers and teams**: Track trends, discover cross-cutting opportunities, plan output.
- **Labs / managers**: Grasp direction layout and ecosystem positioning.

## About the Data

- Data comes from open academic sources such as [OpenAlex](https://openalex.org/), updated automatically every week.
- Trends are presented via **macro aggregation**; individual papers are not shown.
- A public, explainable "research heat index" is used (a weighted composite of output scale, academic influence, growth trend, and ecosystem activity); see the [About page](https://saltgardenia.github.io/AI-ApexTrace/about) for calculation details.
- **Known limitations**: New directions are underestimated during a cold-start period; topic classification and open-access rate recognition have errors; CCF tier annual caliber may change.

## FAQ

**How often is the data updated?** Automatically every week.

**Does it include individual papers?** No — the platform performs macro aggregation and trend analysis and does not list specific papers.

**Are the numbers definitely accurate?** We strive for accuracy, but the limitations above exist; we recommend combining them with professional judgment.

---

Open-source license: **Apache 2.0**, see [LICENSE](LICENSE).
