import type { Bilingual } from "./types";

export const dict = {
  // ---------- nav ----------
  nav_home: { zh: "首页", en: "Home" },
  nav_directions: { zh: "研究方向", en: "Directions" },
  nav_venues: { zh: "会议全景", en: "Venues" },
  nav_journals: { zh: "期刊全景", en: "Journals" },
  page_journals_desc: {
    zh: "按 CCF 等级与领域覆盖筛选全部收录的 AI 顶刊，查看影响力、录用率与方向分布。",
    en: "Filter all covered AI journals by CCF tier and field; see impact, acceptance and direction mix.",
  },
  nav_calendar: { zh: "会议日历", en: "Calendar" },
  nav_about: { zh: "关于", en: "About" },
  menu: { zh: "导航", en: "Navigation" },

  // ---------- controls ----------
  toggle_theme: { zh: "切换主题", en: "Toggle theme" },
  toggle_lang: { zh: "语言", en: "Language" },

  // ---------- home / hero ----------
  hero_title: { zh: "AI-ApexTrace", en: "AI-ApexTrace" },
  home_nav_overview: { zh: "指数概览", en: "Index Overview" },
  home_nav_directions: { zh: "研究方向版图", en: "Research Directions" },
  home_nav_ranking: { zh: "方向热度总榜", en: "Direction Ranking" },
  home_nav_trend: { zh: "领域趋势大图", en: "Field Trends" },
  home_nav_treemap: { zh: "领域论文占比", en: "Field Share" },
  home_nav_quadrant: { zh: "方向气泡象限图", en: "Direction Quadrant" },
  home_nav_list: { zh: "研究方向列表", en: "Direction List" },
  home_nav_compare: { zh: "对比分析", en: "Compare" },
  home_nav_compare_radar: { zh: "多维画像雷达", en: "Profile Radar" },
  home_nav_compare_line: { zh: "历年产出折线", en: "Output Lines" },
  home_nav_compare_table: { zh: "指标对比表", en: "Metrics Table" },
  home_nav_calendar: { zh: "会议日历", en: "Conference Calendar" },
  home_nav_timeline: { zh: "顶会时间轴", en: "Conference Timeline" },
  home_nav_explore: { zh: "继续探索", en: "Explore" },
  home_nav_fieldmap: { zh: "领域贡献分布", en: "Field Contribution" },
  fieldmap_title: { zh: "AI 研究领域贡献热力图", en: "AI Research Field Contribution Treemap" },
  fieldmap_sub: {
    zh: "一级领域以颜色区分，其下各子领域按论文贡献量（papers）铺满该领域的面积。",
    en: "Top-level fields are color-coded; each sub-field fills its parent area by paper contribution.",
  },
  fieldmap_note: {
    zh: "子领域面积 = 父领域论文总数 × 该子领域相对权重，故子矩形之和恒等于父领域总量。",
    en: "Sub-field area = parent papers × relative weight, so sub-rectangles always sum to the parent total.",
  },
  fieldmap_papers: { zh: "篇", en: "papers" },
  hero_desc: {
    zh: "全景透视 CCF A/B/C 类顶会顶刊的研究方向热度、会议画像与投稿时间线，以指数化、对比化视角呈现 AI 学术版图。",
    en: "A panoramic view of research-direction heat, venue profiles and submission timelines across CCF A/B/C venues — an indexed, comparative map of the AI academic landscape.",
  },
  tile_papers: { zh: "年度录用论文(估)", en: "Est. Annual Papers" },
  tile_papers_sub: { zh: "DBLP 正式发表口径", en: "DBLP official publications" },
  tile_growth: { zh: "同比增长", en: "YoY Growth" },
  tile_growth_sub: { zh: "较上一统计周期", en: "vs. previous period" },
  tile_venues: { zh: "收录 venues", en: "Venues Covered" },
  tile_venues_sub: { zh: "A/B/C 类 + 业界顶会", en: "CCF A/B/C + top industry" },
  tile_open: { zh: "平均开源率", en: "Avg. Open-source Rate" },
  tile_open_sub: { zh: "含代码仓库占比", en: "share with code repos" },
  composite_index: { zh: "综合热度指数", en: "Composite Heat Index" },

  // ---------- home dashboard ----------
  ranking_title: { zh: "研究方向热度总榜", en: "Direction Heat Ranking" },
  sort_overall: { zh: "综合", en: "Overall" },
  sort_output: { zh: "产出", en: "Output" },
  sort_impact: { zh: "影响力", en: "Impact" },
  sort_emerging: { zh: "新兴", en: "Emerging" },

  trend_title: { zh: "领域趋势大图 · 历年论文产出演化", en: "Field Trends · Annual Output Evolution" },
  trend_sub: {
    zh: "各研究方向历年论文产出演化，堆叠呈现总量与结构变化。",
    en: "Annual output evolution per direction, stacked to show total and structure.",
  },

  timeline_title: { zh: "顶会时间轴", en: "Conference Timeline" },
  timeline_sub: {
    zh: "即将截稿与召开的会议（投稿 → 截稿 → 开会）",
    en: "Upcoming deadlines & conferences (submit → deadline → meet)",
  },
  full_calendar: { zh: "完整日历", en: "Full calendar" },
  dl_submit: { zh: "投稿开始", en: "Submission opens" },
  dl_abstract: { zh: "摘要截稿", en: "Abstract" },
  dl_full: { zh: "全文截稿", en: "Full paper" },
  dl_conference: { zh: "开会", en: "Conference" },

  // ---------- home quick links ----------
  ql_directions: { zh: "研究方向版图", en: "Research Directions" },
  ql_directions_desc: {
    zh: "气泡象限、雷达画像与里程碑/瓶颈",
    en: "Bubble quadrant, radar profile & milestones/bottlenecks",
  },
  ql_venues: { zh: "会议全景", en: "Venues" },
  ql_venues_desc: {
    zh: "CCF 等级、录用率与方向分布",
    en: "CCF tier, acceptance & direction mix",
  },
  ql_calendar: { zh: "会议日历", en: "Calendar" },
  ql_calendar_desc: { zh: "全年截稿与开会时间线", en: "Year-round deadlines & events" },

  // ---------- page intros ----------
  page_directions: { zh: "研究方向版图", en: "Research Directions" },
  page_directions_desc: {
    zh: "从产出、影响力、增长与交叉融合多视角透视 AI 各研究方向。",
    en: "Explore AI research directions through output, impact, growth and cross-fusion.",
  },
  home_view_all: { zh: "查看全部", en: "View all" },
  dir_list_title: { zh: "全部研究方向", en: "All Directions" },
  dir_count: { zh: "个方向", en: "directions" },
  dir_select_hint: { zh: "选择左侧方向查看详情", en: "Select a direction on the left to view details" },
  field_tree_title: { zh: "领域分类树", en: "Field Tree" },
  field_tree_expand: { zh: "展开全部", en: "Expand all" },
  field_tree_collapse: { zh: "合并全部", en: "Collapse all" },
  field_path: { zh: "路径", en: "Path" },
  field_papers: { zh: "论文数", en: "Papers" },
  field_children: { zh: "子分类", en: "Sub-categories" },
  field_no_children: { zh: "最小子分类（叶子节点）", en: "Smallest sub-category (leaf)" },
  field_select_leaf_hint: { zh: "请在左侧选择最小子领域查看详情页", en: "Select a smallest sub-field on the left to open its detail page" },
  field_leaf_badge: { zh: "最小子领域", en: "Sub-field" },
  page_venues: { zh: "会议全景", en: "Venues" },
  page_venues_desc: {
    zh: "按 CCF 等级与领域覆盖筛选全部收录的顶会顶刊，查看录用率、影响力和方向分布。",
    en: "Filter all covered top venues by CCF tier and field; see acceptance, impact and direction mix.",
  },
  venue_all: { zh: "全部", en: "All" },
  venue_conf: { zh: "会议全景", en: "Conferences" },
  venue_journal: { zh: "期刊全景", en: "Journals" },
  venue_search: { zh: "搜索简称 / 全称…", en: "Search name / full name…" },
  venue_count: { zh: "共 {n} 个", en: "{n} venues" },
  venue_filtered: { zh: "已筛选 {n} 项", en: "{n} filter(s) active" },
  th_sort_asc: { zh: "升序", en: "Ascending" },
  th_sort_desc: { zh: "降序", en: "Descending" },
  th_filter_all: { zh: "全部", en: "All" },
  th_cas: { zh: "中科院分区", en: "CAS" },
  th_jcr: { zh: "JCR 分区", en: "JCR" },
  page_calendar: { zh: "会议日历", en: "Calendar" },
  page_calendar_desc: {
    zh: "全年 12 个月的截稿与召开节点，快速规划投稿与参会节奏。",
    en: "All submission and conference nodes across 12 months to plan your year.",
  },
  home_calendar_desc: {
    zh: "近 30 天内的截稿与会议节点一览，完整时间线见会议日历页。",
    en: "Upcoming deadlines & conferences within 30 days; see the full calendar page for everything.",
  },

  // ---------- directions explorer ----------
  treemap_title: { zh: "领域论文占比", en: "Field Paper Share" },
  treemap_sub: {
    zh: "每个色块为一个最小子领域，面积 = 其论文数量，颜色为所属一级领域",
    en: "Each block is a smallest sub-field; area = paper count, color = its top-level category",
  },
  field_treemap_title: { zh: "领域分布总览", en: "Field Overview" },
  field_treemap_sub: {
    zh: "点击任意色块进入该最小子领域的详情",
    en: "Click any block to open that sub-field's detail",
  },
  lvl_one: { zh: "一级领域", en: "L1 Category" },
  lvl_two: { zh: "二级领域", en: "L2 Field" },
  lvl_three: { zh: "三级子领域", en: "L3 Sub-field" },
  quadrant_title: { zh: "方向气泡象限图", en: "Direction Quadrant" },
  quadrant_sub: {
    zh: "X = 增长率，Y = 平均引用（影响力），气泡大小 = 论文产出",
    en: "X = growth, Y = avg citations (impact), bubble size = output",
  },
  cat_all: { zh: "全部", en: "All" },
  cat_general: { zh: "综合与理论", en: "General & Theory" },
  cat_vision: { zh: "视觉与图形", en: "Vision & Graphics" },
  cat_language: { zh: "语言与语音", en: "Language & Speech" },
  cat_ml: { zh: "机器学习", en: "Machine Learning" },
  cat_robotics: { zh: "具身与机器人", en: "Embodied & Robotics" },
  cat_cross: { zh: "交叉前沿", en: "Cross-frontier" },
  axis_growth: { zh: "增长率", en: "Growth" },
  axis_citations: { zh: "引用", en: "Citations" },
  tooltip_quadrant: {
    zh: "增长率 {x}% · 平均引用 {y} · 论文 {z}",
    en: "Growth {x}% · Citations {y} · Papers {z}",
  },
  quad_star: { zh: "明星象限（高增·高影响）", en: "Star (high growth · high impact)" },
  quad_potential: { zh: "潜力象限（高增·低影响）", en: "Potential (high growth · low impact)" },
  quad_mature: { zh: "成熟象限（低增·高影响）", en: "Mature (low growth · high impact)" },
  quad_declining: { zh: "衰退象限（低增·低影响）", en: "Declining (low growth · low impact)" },

  // ---------- direction detail ----------
  back_directions: { zh: "研究方向版图", en: "Directions" },
  stat_index: { zh: "综合热度指数", en: "Composite Heat Index" },
  stat_output: { zh: "年度论文产出", en: "Annual Output" },
  stat_citations: { zh: "平均引用", en: "Avg Citations" },
  stat_topcited: { zh: "高被引占比(Top10%)", en: "Top-10% Cited" },
  stat_cagr: { zh: "2年复合增长", en: "2Y CAGR" },
  stat_open: { zh: "开源率", en: "Open Rate" },
  core_venues: { zh: "核心承载会议", en: "Core Venues" },
  top_insts: { zh: "代表机构 TOP5", en: "Top-5 Institutions" },
  ms_title: { zh: "里程碑与前沿瓶颈", en: "Milestones & Bottlenecks" },
  tab_milestone: { zh: "里程碑工作树", en: "Milestone Tree" },
  tab_bottleneck: { zh: "前沿瓶颈清单", en: "Bottleneck List" },
  related_dirs: { zh: "交叉关联方向", en: "Related Directions" },
  subfield_title: { zh: "研究领域细分", en: "Sub-fields" },
  subfield_leaves_count: { zh: "最小子分类（方法级）共", en: "Method-level leaves:" },

  // ---------- charts ----------
  chart_yearly: { zh: "历年论文产出", en: "Annual Output" },
  chart_radar: { zh: "多维画像雷达", en: "Profile Radar" },

  // ---------- milestone tree ----------
  ms_empty: { zh: "暂无里程碑数据。", en: "No milestone data yet." },
  ms_intro: { zh: "发展脉络（根 → 分支 → 最新 SOTA）", en: "Evolution (root → branch → latest SOTA)" },
  ms_sota: { zh: "SOTA", en: "SOTA" },
  list_empty: { zh: "暂无数据。", en: "No data yet." },
  card_baselines: { zh: "重要基线", en: "Key Baselines" },
  card_datasets: { zh: "重要数据集", en: "Key Datasets" },

  // ---------- bottleneck list ----------
  b_all: { zh: "全部", en: "All" },
  b_unsolved: { zh: "未解决", en: "Unsolved" },
  b_partial: { zh: "部分解决", en: "Partial" },
  b_solved: { zh: "已突破", en: "Solved" },
  b_source: { zh: "来源", en: "Source" },
  b_priority: { zh: "重要度", en: "Priority" },

  // ---------- venues ----------
  back_venues: { zh: "← 会议全景", en: "← Venues" },
  v_website: { zh: "官网", en: "Website" },
  v_acceptance: { zh: "录用率", en: "Acceptance" },
  v_citations: { zh: "平均引用", en: "Avg Citations" },
  v_h5: { zh: "H5-index", en: "H5-index" },
  v_core: { zh: "CORE", en: "CORE" },
  v_timeline: { zh: "投稿时间线", en: "Submission Timeline" },
  v_dist: { zh: "研究方向分布", en: "Direction Distribution" },
  v_no_related: { zh: "暂无关联方向数据。", en: "No related directions." },
  v_basic: { zh: "基础信息", en: "Basic Info" },
  v_type: { zh: "类型", en: "Type" },
  v_ccffield: { zh: "CCF 领域", en: "CCF Field" },
  v_field: { zh: "领域标签", en: "Field" },
  v_dblp: { zh: "DBLP key", en: "DBLP key" },
  v_eisci: { zh: "EI / SCI", en: "EI / SCI" },
  v_related: { zh: "关联研究方向", en: "Related Directions" },
  type_conference: { zh: "会议", en: "Conference" },
  type_journal: { zh: "期刊", en: "Journal" },

  // ---------- venues table ----------
  search_placeholder: { zh: "搜索会议 / 期刊…", en: "Search venues / journals…" },
  sort_tier: { zh: "等级", en: "Tier" },
  th_abbr: { zh: "简称", en: "Abbr" },
  th_full: { zh: "全称", en: "Full name" },
  th_tier: { zh: "CCF 分级", en: "CCF Tier" },
  th_field: { zh: "领域", en: "Field" },
  th_accept: { zh: "录用率", en: "Accept." },
  th_cit: { zh: "平均引用", en: "Citations" },
  th_h5: { zh: "H5 指数", en: "H5" },

  // ---------- calendar ----------
  view_year: { zh: "年历视图", en: "Year" },
  view_timeline: { zh: "时间线视图", en: "Timeline" },
  level_nonccf: { zh: "非 CCF", en: "Non-CCF" },
  month_empty: { zh: "无收录节点", en: "No events" },
  cal_empty: { zh: "未来 6 个月内暂无收录节点。", en: "No events in the next 6 months." },
  ev_deadline: { zh: "截稿", en: "Deadline" },
  ev_conference: { zh: "开会", en: "Conference" },

  // ---------- compare ----------
  compare_max: { zh: "最多对比 {n} 个", en: "Compare up to {n}" },
  compare_empty: { zh: "请选择至少一个研究方向进行对比。", en: "Select at least one direction to compare." },
  compare_title: { zh: "对比分析", en: "Compare" },
  compare_desc: {
    zh: "并排对比 2-5 个研究方向的热度曲线、增长率与多维画像，发现交叉与差异。",
    en: "Compare heat curves, growth and multi-dimensional profiles of 2-5 directions side by side.",
  },
  compare_radar: { zh: "多维画像对比（雷达）", en: "Profile Comparison (Radar)" },
  compare_line: { zh: "历年论文产出对比", en: "Annual Output Comparison" },
  compare_table: { zh: "指标对比表", en: "Metrics Comparison" },
  th_metric: { zh: "指标", en: "Metric" },
  m_index: { zh: "综合热度指数", en: "Composite Heat Index" },
  m_output: { zh: "年度论文产出", en: "Annual Output" },
  m_citations: { zh: "平均引用", en: "Avg Citations" },
  m_topcited: { zh: "高被引占比", en: "Top-cited %" },
  m_cagr: { zh: "复合增长", en: "CAGR" },
  m_open: { zh: "开源率", en: "Open Rate" },

  // ---------- about ----------
  about_title: { zh: "关于 & 更新日志", en: "About & Changelog" },
  about_desc: {
    zh: "公开、可解释、可复现的 AI 研究热度指数计算口径。",
    en: "An open, explainable and reproducible methodology for the AI research heat index.",
  },
  about_formula: { zh: "热度指数公式", en: "Heat Index Formula" },
  about_sources: { zh: "数据来源", en: "Data Sources" },
  about_limits: { zh: "局限性说明", en: "Limitations" },
  about_scope: { zh: "收录范围与白名单", en: "Coverage & Whitelist" },
  about_changelog: { zh: "更新日志", en: "Changelog" },
  w_output: { zh: "产出规模分", en: "Output Score" },
  w_output_desc: { zh: "该方向当年顶会顶刊论文数量归一化", en: "Normalized count of top-venue papers this year" },
  w_impact: { zh: "学术影响力分", en: "Impact Score" },
  w_impact_desc: {
    zh: "论文平均引用、高被引占比（Top 10%）加权归一化",
    en: "Avg citations & top-10% cited ratio, weighted & normalized",
  },
  w_growth: { zh: "增长趋势分", en: "Growth Score" },
  w_growth_desc: { zh: "近 2 年论文数量复合增长率归一化", en: "Normalized 2-year compound growth rate" },
  w_ecosystem: { zh: "生态活跃度分", en: "Ecosystem Score" },
  w_ecosystem_desc: { zh: "论文开源率（GitHub 链接占比）归一化", en: "Open-source rate (GitHub links) normalized" },
  limit1: {
    zh: "新论文引用存在滞后，新方向冷启动期影响力被低估。",
    en: "Citation lag understates impact for new directions during cold start.",
  },
  limit2: { zh: "方向分类依赖主题模型，存在少量标注误差。", en: "Topic-model classification has minor labeling noise." },
  limit3: { zh: "开源率依赖 GitHub 链接识别，覆盖不完全。", en: "Open-source rate depends on GitHub-link detection, partial coverage." },
  limit4: { zh: "CCF 等级年度变动可能导致跨年口径不可比。", en: "Annual CCF-tier changes may break cross-year comparability." },
  log_v2_items: {
    zh: "初始版上线：综合热度指数、方向版图、会议全景、会议日历、对比分析。白名单接入 CCF A/B/C 类与业界顶会。",
    en: "Initial release: heat index, directions, venues, calendar, compare. Whitelist covers CCF A/B/C & top industry venues.",
  },
  log_v1_items: {
    zh: "关于页与权重口径公开。接入 ccfddl 截止日期字段。",
    en: "About page & weight methodology published. ccfddl deadline fields integrated.",
  },
  scope_text: {
    zh: "会议与期刊白名单以 LIST.md 为权威来源，涵盖 CCF 2022 版人工智能领域 A/B/C 类，并延伸纳入 ICLR / CoRL / MLSys / WACV 等业界公认顶会，以及数据库、图形多媒体、安全、系统、人机交互等 AI 研究者高频投稿的相邻领域。每个 venue 均配套 CCF 等级、领域标签与结构化投稿/截稿/会期字段。",
    en: "The venue whitelist (authoritative source: LIST.md) covers CCF 2022 AI A/B/C tiers and extends to widely-recognized industry venues such as ICLR / CoRL / MLSys / WACV, plus adjacent fields researchers frequently submit to — databases, graphics & multimedia, security, systems, HCI. Every venue carries a CCF tier, field tag and structured submission/deadline/conference fields.",
  },
  footer: {
    zh: "© 2026 AI-ApexTrace. 保留所有权利。",
    en: "© 2026 AI-ApexTrace. All rights reserved.",
  },
} satisfies Record<string, Bilingual>;

export type DictKey = keyof typeof dict;

export const RADAR_METRICS: Record<string, Bilingual> = {
  output: { zh: "产出规模", en: "Output" },
  impact: { zh: "学术影响力", en: "Impact" },
  growth: { zh: "增长趋势", en: "Growth" },
  ecosystem: { zh: "生态活跃度", en: "Ecosystem" },
  fusion: { zh: "交叉融合", en: "Cross-fusion" },
};

export const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
