<p align="right">
  <a href="README_EN.md">English</a>
</p>

<p align="center">
  <picture>
    <img alt="AI-ApexTrace" src="https://img.shields.io/badge/AI--ApexTrace-研究版图仪表盘-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0zIDNoMTh2MThIM3pNNSA1djE0aDE0VjV6bTItMmg0djRoLTR6bTAgNmg0djRoLTR6bTYtMmg0djRoLTR6bTYtMmg0djZoLTR6bS02IDZoNHYyaC00eiIvPjwvc3ZnPg==">
  </picture>
</p>

<div align="center">

# 🚀 AI-ApexTrace

### 把「AI 领域现在在研究什么、哪里最热、谁在主导、该往哪投」做成一张可交互的仪表盘

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Data Source](https://img.shields.io/badge/Data-OpenAlex-0ABF53?logo=openaccess&logoColor=white)](https://openalex.org/)
[![Demo](https://img.shields.io/badge/🌐%20Live%20Demo-点击体验-6366f1)](https://saltgardenia.github.io/AI-ApexTrace/)
[![Stars](https://img.shields.io/github/stars/SaltGardenia/AI-ApexTrace?style=social)](https://github.com/SaltGardenia/AI-ApexTrace/stargazers)

[🌐 在线体验](https://saltgardenia.github.io/AI-ApexTrace/) · [📖 关于页面](https://saltgardenia.github.io/AI-ApexTrace/about) · [🐛 问题反馈](https://github.com/SaltGardenia/AI-ApexTrace/issues)

</div>

---

## ✨ 特性

- 🗺️ **一眼看清全局** —— 将散落在海量论文中的研究方向，浓缩成一张可缩放的「研究版图」。
- 🔥 **找方向、看热度** —— 哪个子领域正在爆发、哪个已经饱和、哪里是交叉蓝海。
- 📈 **做规划有依据** —— 选题、组队、找合作机构、规划全年投稿节奏，用数据支撑而非「听说」。
- 🧭 **少走弯路** —— 用真实论文数据替代感觉，快速对齐自己的研究方向与领域大势。

## 🧩 核心模块

| 模块 | 说明 |
| --- | --- |
| 🗺️ [研究方向版图](https://saltgardenia.github.io/AI-ApexTrace/directions) | 矩形树图总览 + 气泡象限图 + 子领域详情页 + 领域分类树 |
| 🏛️ [会议全景](https://saltgardenia.github.io/AI-ApexTrace/venues) | 按 CCF 等级、JCR/CAS 分区、领域多维筛选，含录用率与方向分布 |
| 📚 [期刊全景](https://saltgardenia.github.io/AI-ApexTrace/journals) | 同样的筛选与对比体验，选刊不再盲投 |
| 📅 会议日历 | 截稿与召开时间线，把全年投稿节奏排进一张图 |
| 🏠 首页热度总览 | 打开即看的整体趋势仪表盘 |

### 研究方向版图亮点

- **领域分布总览（矩形树图）**：每个色块是一个最小子领域，面积代表论文产出规模。
- **方向气泡象限图**：横轴 = 增长、纵轴 = 影响力、气泡大小 = 产出，快速定位「高潜方向」。
- **子领域详情页**：综合热度指数、年度产出曲线、影响力指标、Top 机构、核心承载会议、里程碑 / 瓶颈 / 基线 / 数据集 / 交叉方向 —— 一页看清一个方向。
- **领域分类树**：从 AI 总览逐层下钻到具体子领域。

## 🖥️ 界面一览

> 直接打开 [🌐 在线体验](https://saltgardenia.github.io/AI-ApexTrace/) 即可查看全部交互界面，无需安装。

- 顶部可切换 **中文 / English** 与 **明暗主题** 🌗
- 用筛选、搜索、点击色块 / 气泡来自由探索 🔍

## 🛠️ 技术栈

- **框架**：[Next.js 16](https://nextjs.org/)（App Router） + React 19
- **语言**：[TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **图表 / 可视化**：[Recharts](https://recharts.org/) · [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei)（3D）
- **动效**：[Framer Motion](https://www.framer.com/motion/)
- **主题**：[next-themes](https://github.com/pacocoursey/next-themes) · 图标：[lucide-react](https://lucide.dev/)

## 🚀 本地开发

> 需要先安装 [Node.js](https://nodejs.org/)（建议 ≥ 20 LTS）。

```bash
# 1. 克隆仓库
git clone https://github.com/SaltGardenia/AI-ApexTrace.git
cd AI-ApexTrace

# 2. 安装依赖
npm install

# 3. 拉取并构建本地数据（基于 OpenAlex 等开放学术库）
npm run pipeline

# 4. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可本地预览。

## 📊 关于数据

- 数据来自 [OpenAlex](https://openalex.org/) 等开放学术库，**每周自动更新**。
- 以 **宏观聚合** 方式呈现趋势，不展示单篇论文。
- 采用公开、可解释的「研究热度指数」（产出规模、学术影响力、增长趋势、生态活跃度加权合成）；计算口径详见 [关于页面](https://saltgardenia.github.io/AI-ApexTrace/about)。
- **已知局限**：新方向存在冷启动期低估、主题分类与开源率识别存在误差、CCF 等级年度口径可能变动。

## 🗺️ 路线图

- [ ] 更多数据源接入与交叉验证
- [ ] 个性化关注方向与订阅提醒
- [ ] 机构 / 学者维度的深度对比
- [ ] 导出与分享（报告、图表）

## 🤝 贡献

欢迎 Issue、PR 与建议！详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 📄 许可证

[Apache 2.0](LICENSE) © AI-ApexTrace
