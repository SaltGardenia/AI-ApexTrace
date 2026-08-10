import type { DirectionId, FieldSubfield } from "@/lib/types";

// Sub-field trees for each top-level direction. Leaves (method-level nodes)
// carry optional paper counts. Filled incrementally per direction.
export const fieldSubfields: Record<DirectionId, FieldSubfield[]> = {
  ai: [
    {
      id: "ai-kr",
      name: { zh: "知识表示与推理", en: "Knowledge & Reasoning" },
      description: {
        zh: "用逻辑、知识图谱与符号推理对事实、关系与规则进行结构化表达，并与 LLM 结合提升可解释性（神经-符号融合）。",
        en: "Structured representation of facts, relations and rules via logic, knowledge graphs and symbolic reasoning, increasingly fused with LLMs for explainability (neuro-symbolic).",
      },
      children: [
        { id: "ai-kr-kg", name: { zh: "知识图谱", en: "Knowledge Graphs" }, papers: 1300 },
        { id: "ai-kr-symbolic", name: { zh: "符号推理", en: "Symbolic Reasoning" }, papers: 900 },
        { id: "ai-kr-neuro", name: { zh: "神经-符号融合", en: "Neuro-Symbolic AI" }, papers: 500 },
      ],
    },
    {
      id: "ai-multiagent",
      name: { zh: "多智能体", en: "Multi-Agent" },
      description: {
        zh: "以 LLM 为认知核心的智能体系统：单/多智能体协作、谈判、工具调用与自主任务求解（AutoGen、MetaGPT、CAMEL 等）。",
        en: "LLM-centric agentic systems: single/multi-agent collaboration, negotiation, tool use and autonomous task solving (AutoGen, MetaGPT, CAMEL).",
      },
      children: [
        { id: "ai-ma-llm", name: { zh: "LLM 智能体", en: "LLM Agents" }, papers: 1400 },
        { id: "ai-ma-mar", name: { zh: "多智能体强化学习", en: "MARL" }, papers: 800 },
        { id: "ai-ma-orch", name: { zh: "智能体编排", en: "Agent Orchestration" }, papers: 500 },
      ],
    },
    {
      id: "ai-planning",
      name: { zh: "规划调度", en: "Planning & Scheduling" },
      description: {
        zh: "面向离散任务分配与连续动作可行性的自动规划，多智能体 TAMP 与 LLM 驱动的规划成为新前沿。",
        en: "Automated planning over discrete task allocation and continuous motion feasibility; multi-agent TAMP and LLM-driven planning are emerging frontiers.",
      },
      children: [
        { id: "ai-pl-tamp", name: { zh: "任务与运动规划", en: "Task & Motion Planning" }, papers: 900 },
        { id: "ai-pl-llm", name: { zh: "LLM 规划", en: "LLM Planning" }, papers: 600 },
        { id: "ai-pl-sched", name: { zh: "调度优化", en: "Scheduling" }, papers: 300 },
      ],
    },
    {
      id: "ai-uncertain",
      name: { zh: "不确定性推理", en: "Uncertain Reasoning" },
      description: {
        zh: "在概率图模型、贝叶斯推理与可信框架下处理噪声、缺失与分布外数据。",
        en: "Reasoning under probabilistic graphical models, Bayesian inference and trustworthy frameworks for noisy, missing and out-of-distribution data.",
      },
      children: [
        { id: "ai-un-bayes", name: { zh: "贝叶斯推理", en: "Bayesian Inference" }, papers: 1000 },
        { id: "ai-un-pgm", name: { zh: "概率图模型", en: "Probabilistic Graphs" }, papers: 600 },
        { id: "ai-un-ood", name: { zh: "分布外泛化", en: "OOD Generalization" }, papers: 300 },
      ],
    },
  ],
  cv: [
    {
      id: "cv-recognition",
      name: { zh: "图像识别", en: "Image Recognition" },
      description: {
        zh: "将整图分类、识别为预定义类别，CNN/Transformer 与迁移学习是核心方法。",
        en: "Assigning a label to a whole image via CNNs/Transformers and transfer learning.",
      },
      children: [
        { id: "cv-re-class", name: { zh: "图像分类", en: "Image Classification" }, papers: 2200 },
        { id: "cv-re-found", name: { zh: "视觉基础模型", en: "Vision Foundation Models" }, papers: 1500 },
      ],
    },
    {
      id: "cv-detection",
      name: { zh: "目标检测", en: "Object Detection" },
      description: {
        zh: "在图像中定位并识别物体，YOLO、Faster R-CNN、SSD 等支撑实时应用；开放词汇检测成为新趋势。",
        en: "Localizing and identifying objects; YOLO, Faster R-CNN, SSD enable real-time use; open-vocabulary detection is the new trend.",
      },
      children: [
        { id: "cv-de-yolo", name: { zh: "实时检测 (YOLO 等)", en: "Real-time (YOLO)" }, papers: 1500 },
        { id: "cv-de-ovd", name: { zh: "开放词汇检测", en: "Open-Vocabulary" }, papers: 1000 },
        { id: "cv-de-tracking", name: { zh: "多目标跟踪", en: "Multi-Object Tracking" }, papers: 500 },
      ],
    },
    {
      id: "cv-segmentation",
      name: { zh: "图像分割", en: "Segmentation" },
      description: {
        zh: "像素级划分图像区域：语义分割、实例分割与全景分割，是医学影像与自动驾驶的关键技术。",
        en: "Pixel-level partitioning: semantic, instance and panoptic segmentation; key to medical imaging and autonomous driving.",
      },
      children: [
        { id: "cv-se-sem", name: { zh: "语义/实例分割", en: "Semantic/Instance" }, papers: 1700 },
        { id: "cv-se-pano", name: { zh: "全景分割", en: "Panoptic" }, papers: 700 },
        { id: "cv-se-med", name: { zh: "医学影像分割", en: "Medical Segmentation" }, papers: 500 },
      ],
    },
    {
      id: "cv-3d",
      name: { zh: "三维视觉", en: "3D Vision" },
      description: {
        zh: "从多视图/点云重建三维结构，支撑自动驾驶、数字孪生与机器人抓取。",
        en: "Reconstructing 3D structure from multi-view/depth/point clouds; powers autonomous driving, digital twins and robotic grasping.",
      },
      children: [
        { id: "cv-3d-nerf", name: { zh: "NeRF/辐射场", en: "NeRF / Radiance Fields" }, papers: 1200 },
        { id: "cv-3d-pc", name: { zh: "点云理解", en: "Point Cloud" }, papers: 800 },
        { id: "cv-3d-depth", name: { zh: "深度估计", en: "Depth Estimation" }, papers: 600 },
      ],
    },
    {
      id: "cv-video",
      name: { zh: "视频理解", en: "Video Understanding" },
      description: {
        zh: "对视频内容进行识别、定位、问答与描述，开放词汇视频分类与实时视觉推理是热点。",
        en: "Recognizing, localizing, QA-ing and captioning video; open-vocabulary video classification and real-time visual reasoning are hot.",
      },
      children: [
        { id: "cv-vi-action", name: { zh: "动作识别", en: "Action Recognition" }, papers: 1300 },
        { id: "cv-vi-vqa", name: { zh: "视频问答", en: "Video QA" }, papers: 800 },
        { id: "cv-vi-cap", name: { zh: "视频描述生成", en: "Video Captioning" }, papers: 500 },
      ],
    },
  ],
  nlp: [],
  ml: [],
  robotics: [],
  multimodal: [],
  ai4science: [],
  datamining: [],
  graphics: [],
  security: [],
  hci: [],
  theory: [],
};
