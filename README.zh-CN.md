# AI-ApexTrace · AI 研究版图指数

> **一个开放、可解释的 AI 学术版图工具** —— 对 CCF A/B/C 类顶会顶刊做宏观统计、研究方向热度挖掘、多维可视化，并维护投稿 / 录用通知 / 举办时间等会议元数据，帮助科研人员把握领域发展趋势。

[🇨🇳 中文](README.zh-CN.md) · [🇺🇸 English](README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)
[![Data Update](https://img.shields.io/badge/data-每周自动-brightgreen)](.github/workflows/update-data.yml)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://github.com/SaltGardenia/AI-ApexTrace/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SaltGardenia/AI-ApexTrace/blob/main/CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/SaltGardenia/AI-ApexTrace?style=social)](https://github.com/SaltGardenia/AI-ApexTrace)

AI-ApexTrace 把海量 AI 论文整理成一个**冷静、可对比的仪表盘**。它不堆砌单篇论文，而是把 CCF A/B/C 类（及业界公认顶会）聚合为 **AI 研究热度指数**——让你一眼看清*哪些方向在升温、哪些会议值得投、何时截稿*。

> **在线站点：** https://saltgardenia.github.io/AI-ApexTrace
> **数据刷新：** 每周自动更新（见 [`.github/workflows/update-data.yml`](.github/workflows/update-data.yml)）。

![AI-ApexTrace 仪表盘](https://github.com/SaltGardenia/AI-ApexTrace/raw/main/public/preview-hero.png)
> _提示：在此处放入 `public/preview-hero.png` 截图即可展示实时仪表盘。_

---

## 1. ✨ 核心特性

能力分为**面向科研用户**与**面向开发者**两类。

**面向科研用户**
- **完整 CCF A/B/C AI 会议与期刊清单** —— 附带标签体系（CCF 等级、领域标签、会议类型、出版社）。
- **会议元数据库** —— 投稿开放时间、摘要/全文**截稿 Deadline**、录用通知时间、会议举办时间、地点、官网链接。
- **宏观统计（不做单篇论文详情）** —— 各研究方向年度论文数量、热度趋势、领域占比、跨领域迁移变化。
- **多维度可视化仪表盘** —— 时序趋势、领域热力图、会议横向对比、方向演化图谱。
- **数据导出** —— 会议清单与聚合统计数据的 CSV / JSON 导出，便于科研二次分析。

**面向开发者**
- **筛选过滤** —— 按 CCF 等级、子领域（CV / NLP / ML / RL / Robotics / AI Safety …）、年份、会议类型筛选。
- **自动化数据管线** —— 每周刷新会议时间与论文统计，带针对限流的自愈重试层。
- **社区修正** —— 通过 Pull Request 提交会议信息的修正。

> **项目边界：** AI-ApexTrace 是**宏观聚合**视图，不解析、不存储、不展示单篇论文全文，仅在会议 / 方向 / 年份层级做计数与评分。

---

## 2. 🎯 项目背景与动机

- AI 顶会数量庞大，科研人员很难快速把握整个领域的发展流向。
- 现有工具大多聚焦单篇论文检索，缺少**全局宏观视角**的领域热度可视化。
- 会议截止时间分散，缺少统一维护、持续更新的 AI 顶会时间线。
- 希望提供**开放数据集 + 可视化 Web 平台**，服务全体 AI 科研人员（精神上限对标 [artificialanalysis.ai](https://artificialanalysis.ai)——提供可对比、可解释视图，而非论文流）。

---

## 3. 📊 平台功能模块

五大核心页面，均为应用内路由：

1. **📅 会议日历**（`/venues`）—— 全部会议元数据、Deadline 倒计时，可按 CCF 等级与子领域筛选；含会议/期刊全景（`/journals`）。
2. **📈 热度总仪表盘**（首页 `/`）—— 全局 AI 领域多年度统计、多维图表（热度 Hero、方向排行、Top 方向）。
3. **🔍 会议 / 方向探索**（`/directions`）—— 方向矩形树图、象限演化图，以及逐方向下钻画像。
4. **🗓 按年份全景视图** —— 每一年各方向产出分布全景（位于热度仪表盘与方向详情内）。
5. **📁 数据集下载** —— 公开导出的会议元数据与聚合统计数据（见下方数据说明）。

---

## 4. 📋 数据集说明

> 数据边界、标签体系与局限需清晰透明，本节重点说明。

**数据来源**
- [OpenAlex](https://openalex.org) —— 论文计数、引用指标、会议元数据（polite-pool，通过 `OA_MAILTO`）。
- [Crossref](https://www.crossref.org) —— 论文与 DOI 交叉校验。
- [arXiv](https://arxiv.org) —— 预印本体量作为早期信号补充。
- 会议官网与 **CCF 推荐国际学术会议和期刊目录** —— 会议等级与投稿时间线。

**两类数据集**

1. **会议元数据集** —— 会议名称、缩写、CCF 评级、子领域标签、投稿开放/截稿/通知/举办时间、地点、官网、出版社。
2. **聚合统计数据集（无单篇论文）** —— 每年、每个会议下各研究方向的论文计数、热度得分、增长率与跨领域融合指标。

**标签体系**
- `CCF Rank`：A / B / C
- `研究领域`：CV / NLP / ML / RL / Robotics / Theory / AI Safety / Multimodal / Embodied / Generative …
- `会议类型`：Conference / Journal

**刷新频率与局限**
- 通过数据更新工作流**每周**自动刷新。
- 部分小众 CCF-C 会议官网信息不全，时间缺失时显示 `—`，绝不编造。
- 方向标签由算法自动归类，可能存在分类偏差，欢迎社区修正。

**数据集路径（仓库内）**
- 生成 / 聚合数据：`src/lib/data/generated/`（`field-metrics.json`、`field-stats.json`、`FieldMetrics.ts`、`FieldStats.ts`）。
- 管线源与缓存：`scripts/pipeline/`（extract、collect、synthesize、metrics、merge）。

---

## 5. 🛠 技术栈

| 层级 | 选型 |
| ---- | ---- |
| 框架 | Next.js 16（App Router，RSC，静态导出） |
| UI | React 19 + TypeScript 5 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 图表 | Recharts 3 |
| 动效 | Framer Motion |
| 国际化 | 轻量自研 context provider（中文 / English） |
| 数据管线 | Node.js（ESM）脚本：extract → collect → synthesize → metrics → merge |
| 数据源 | OpenAlex / Crossref / arXiv API |
| 部署 | GitHub Pages（静态导出）via GitHub Actions |

> 仓库包含**数据管线脚本**、**前端 Web 代码**与**生成的数据集**。无需独立后端 / 数据库 —— 数据在构建/管线阶段预聚合，以静态 JSON/TS 形式随站发布。

---

## 6. 🚀 快速开始

两套流程：**（A）本地运行完整网站**，或 **（B）仅使用数据集**。

### A. 运行网站

```bash
# 1. 安装依赖
npm install

# 2. （可选）从上游源刷新数据集
npm run pipeline

# 3. 启动开发服务器
npm run dev

# 4. 打开 http://localhost:3000
```

生产构建与静态导出：

```bash
npm run build     # 产出 ./out（静态）
npm run start     # 启动生产构建（或将 ./out 托管到任意静态主机）
```

### B. 仅使用数据集

直接读取生成的 JSON 做二次开发：

```bash
# 聚合方向指标（每年/每方向的热度、增长、产出）
cat src/lib/data/generated/field-metrics.json

# 每方向统计
cat src/lib/data/generated/field-stats.json
```

无需 Web 服务，JSON 为自描述的纯文本。

---

## 7. 📐 项目架构

```
AI-ApexTrace/
├── src/
│   ├── app/                 # Next.js App Router 页面（首页、/venues、/journals、/directions、/about）
│   ├── components/          # UI 组件（dashboard、directions、venues、layout、ui 基元）
│   └── lib/
│       ├── data/            # 静态数据：directions.ts、venues.ts、field-tree.ts、generated/
│       └── i18n/            # 双语文案与 provider
├── scripts/
│   └── pipeline/            # 数据管线：extract → collect → synthesize → metrics → merge
├── .github/
│   └── workflows/           # update-data.yml（每周刷新 + 部署）、deploy.yml
├── public/                  # 静态资源（在此放入 preview-hero.png）
└── README.md / README.zh-CN.md
```

---

## 8. 🤝 如何贡献

我们欢迎各类贡献：

1. **修改 / 补充会议元数据** —— 修正 Deadline、新增会议、修改 CCF 标签。
2. **优化标签体系 / 修复统计脚本 bug** —— 更好的领域分类或数据脚本修正。
3. **前端可视化功能开发** —— 新仪表盘视图、图表或体验打磨。
4. **Bug 反馈** —— 提交带复现步骤的 issue。

**流程**
1. Fork 仓库并创建分支（`git checkout -b fix/venue-cvpr-deadline`）。
2. 任何面向用户的文案保持双语 `Bilingual` 数据结构。
3. 推送前运行 `npm run lint` 与 `npm run build`。
4. 提交 Pull Request（Bug 请使用 issue 模板）。

详见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。会议时间信息**由社区共同维护**——你的修正让数据更可靠。

---

## 9. ⚠️ 限制与已知局限

- 统计为**聚合统计**，本项目不存储单篇论文全文。
- 研究方向标签为**算法自动归类**，会存在分类错误，欢迎社区修正。
- 部分小众 CCF-C 会议官网信息不全，时间可能缺失（`—`）。
- 不提供论文引用检索功能，定位区别于 Semantic Scholar、DBLP。

---

## 10. 🗺 Roadmap（未来计划）

- 更丰富的按年份全景视图与可下载 CSV/JSON 导出界面。
- 更细粒度的跨领域融合指标。
- 社区提交修正的审核队列。
- 更多语言 locale。

---

## 13. 📬 联系方式与链接

- **在线站点：** https://saltgardenia.github.io/AI-ApexTrace
- **Issue 讨论区：** https://github.com/SaltGardenia/AI-ApexTrace/issues
- **CCF 目录参考：** CCF 推荐国际学术会议和期刊目录
- **数据管线：** `.github/workflows/update-data.yml`

---

### FAQ

- **Q：为什么没有单篇论文？** A：本项目定位是宏观聚合视图——会议/方向/年份层级，而非论文流。
- **Q：数据多久更新一次？** A：每周通过 GitHub Actions 数据更新工作流自动更新（也可手动触发）。
- **Q：如何提交错误的会议时间修正？** A：针对会议数据提交 PR，或开 issue——会议时间线由社区共同维护。
