# ApexTrace · AI 研究版图指数

> 一个开放、可解释的 AI 学术版图工具——以指数化、对比化、全景化的视角，呈现 CCF A/B/C 类顶会顶刊的研究方向热度、会议画像与投稿时间线。

[🇨🇳 中文](README.zh-CN.md) · [🇺🇸 English](README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SaltGardenia/ApexTrace/blob/main/CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/SaltGardenia/ApexTrace?style=social)](https://github.com/SaltGardenia/ApexTrace)

ApexTrace 把海量 AI 论文整理成一个**冷静、可对比的仪表盘**。它不堆砌单篇论文，而是把 CCF A/B/C 类（及业界公认顶会）聚合为 **AI 研究热度指数**——让你一眼看清*哪些方向在升温、哪些会议值得投、何时截稿*。

---

## ✨ 功能特性

- **📊 研究方向版图** —— 气泡象限（增长率 × 影响力 × 产出）与分类筛选，覆盖 12 个 AI 研究方向。
- **🔥 综合热度指数** —— 每个方向一套透明、可复现的评分（产出 · 影响力 · 增长 · 生态 · 交叉融合）。
- **🏛 会议画像** —— 每个收录会议的 CCF 等级、录用率、引用、H5 指数与方向分布。
- **📅 投稿日历** —— 摘要 / 全文截稿与开会日期，全年覆盖。
- **⚖️ 对比分析** —— 并排叠加 2–5 个方向的热度曲线、增长率与多维画像。
- **🌗 亮色 / 暗色** —— 跟随系统，即时切换。
- **🌐 中英双语** —— 完整的中英双语界面。

---

## 🖼 预览

![ApexTrace 首页](https://github.com/SaltGardenia/ApexTrace/raw/main/public/preview-hero.png)
> _提示：在此处放入 `public/preview-hero.png` 截图即可展示实时仪表盘。_

---

## 🧱 技术栈

| 层级     | 选型                                    |
| -------- | --------------------------------------- |
| 框架     | Next.js 16（App Router, RSC）           |
| UI       | React 19 + TypeScript 5                 |
| 样式     | Tailwind CSS 4 + shadcn/ui              |
| 图表     | Recharts 3                              |
| 3D       | React Three Fiber / Three.js            |
| 动效     | Framer Motion                           |
| 国际化   | 轻量自研 context provider               |

---

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开 http://localhost:3000
```

生产构建：

```bash
npm run build
npm run start
```

---

## 📐 方法论

**综合热度指数** 由每个方向的四项归一化信号加权融合：

| 权重信号 | 含义                                |
| -------- | ----------------------------------- |
| 产出     | 当年顶会顶刊论文数量归一化          |
| 影响力   | 平均引用、高被引占比（Top 10%）      |
| 增长率   | 近 2 年论文数量复合增长率            |
| 生态     | 论文开源率（GitHub 链接占比）        |

数据来源、计算口径与局限性详见应用内**关于**页面。

---

## 🤝 贡献指南

欢迎各种贡献——新增会议、优化权重、翻译或可视化改进。

1. Fork 仓库并创建分支（`git checkout -b feat/my-idea`）。
2. 完成改动，保持双语 `Bilingual` 数据结构。
3. 推送前运行 `npm run lint` 与 `npm run build`。
4. 提交 Pull Request。

详见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。

---

## 🚀 部署

ApexTrace 是一个对静态化友好的 Next.js（App Router）应用，任选其一：

### 方式 A — Vercel（推荐）

1. 把本仓库推送到 GitHub。
2. 打开 [vercel.com](https://vercel.com) → **Add New → Project** → 导入 `SaltGardenia/ApexTrace`。
3. 框架会自动识别为 **Next.js**，构建命令 `npm run build`，输出由平台自动处理。
4. 点击 **Deploy**。每次向 `main` 推送都会自动重新部署（预览/生产）。

### 方式 B — GitHub Pages（静态导出）

1. 在 `next.config.ts` 中开启静态导出：
   ```ts
   export default defineConfig({
     output: "export",
     images: { unoptimized: true },
   });
   ```
2. 构建静态站点：
   ```bash
   npm run build   # 产物输出到 ./out
   ```
3. 在仓库 **Settings → Pages** 中，将 Source 设为 **GitHub Actions**，并添加工作流文件（`.github/workflows/deploy.yml`）：检出代码 → `npm ci && npm run build` → 将 `./out` 发布到 `gh-pages` 分支。
4. 工作流运行后，站点地址为 `https://SaltGardenia.github.io/ApexTrace`。

> 说明：开启 `output: "export"` 会禁用服务端特性（本项目未使用），因此整站可作为纯静态站点运行。

---

## 📄 许可证

[MIT](LICENSE) © ApexTrace 贡献者。
