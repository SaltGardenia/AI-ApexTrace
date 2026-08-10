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
  nlp: [
    {
      id: "nlp-llm",
      name: { zh: "大语言模型", en: "Large Language Models" },
      description: {
        zh: "以 Transformer 预训练为核心的基座模型，涵盖指令微调（SFT）、对齐（RLHF/DPO）与规模化训练（Scaling Law）。",
        en: "Transformer-pretrained foundation models covering instruction tuning (SFT), alignment (RLHF/DPO) and scaling laws.",
      },
      children: [
        { id: "nlp-llm-pretrain", name: { zh: "预训练与缩放律", en: "Pretraining & Scaling" }, papers: 2600 },
        { id: "nlp-llm-align", name: { zh: "对齐 (RLHF/DPO)", en: "Alignment (RLHF/DPO)" }, papers: 1600 },
        { id: "nlp-llm-sft", name: { zh: "指令微调", en: "Instruction Tuning" }, papers: 1400 },
      ],
    },
    {
      id: "nlp-rag",
      name: { zh: "检索增强生成", en: "Retrieval-Augmented" },
      description: {
        zh: "将外部知识检索注入生成过程以缓解幻觉，从朴素 RAG 演进到模块化、智能体式（Agentic）RAG。",
        en: "Injecting external retrieval into generation to curb hallucination; from naive to modular and agentic RAG.",
      },
      children: [
        { id: "nlp-rag-naive", name: { zh: "朴素/高级 RAG", en: "Naive / Advanced RAG" }, papers: 1200 },
        { id: "nlp-rag-agentic", name: { zh: "智能体式 RAG", en: "Agentic RAG" }, papers: 900 },
        { id: "nlp-rag-eval", name: { zh: "RAG 评测", en: "RAG Evaluation" }, papers: 500 },
      ],
    },
    {
      id: "nlp-reason",
      name: { zh: "推理能力", en: "Reasoning" },
      description: {
        zh: "从推理时缩放（CoT、Self-Consistency）到学习式推理（DeepSeek-R1、GRPO）与可验证奖励训练。",
        en: "From inference scaling (CoT, self-consistency) to learning-to-reason (DeepSeek-R1, GRPO) and verifier training.",
      },
      children: [
        { id: "nlp-re-cot", name: { zh: "思维链/缩放", en: "CoT / Scaling" }, papers: 1100 },
        { id: "nlp-re-rl", name: { zh: "强化学习推理", en: "RL Reasoning" }, papers: 700 },
        { id: "nlp-re-math", name: { zh: "数学推理", en: "Math Reasoning" }, papers: 600 },
      ],
    },
    {
      id: "nlp-agent",
      name: { zh: "Agent 能力", en: "Agent Capabilities" },
      description: {
        zh: "赋予 LLM 规划、工具调用、自我反思与多智能体协作的自主任务求解能力。",
        en: "Equipping LLMs with planning, tool use, self-reflection and multi-agent collaboration for autonomous solving.",
      },
      children: [
        { id: "nlp-ag-tool", name: { zh: "工具调用", en: "Tool Use" }, papers: 1000 },
        { id: "nlp-ag-reflect", name: { zh: "自我反思", en: "Self-Reflection" }, papers: 600 },
        { id: "nlp-ag-multi", name: { zh: "多智能体协作", en: "Multi-Agent" }, papers: 700 },
      ],
    },
    {
      id: "nlp-app",
      name: { zh: "NLP 应用", en: "NLP Applications" },
      description: {
        zh: "机器翻译、摘要、问答、情感分析与信息抽取等面向任务的自然语言处理应用。",
        en: "Machine translation, summarization, QA, sentiment analysis and information extraction.",
      },
      children: [
        { id: "nlp-ap-trans", name: { zh: "机器翻译", en: "Machine Translation" }, papers: 800 },
        { id: "nlp-ap-qa", name: { zh: "问答/对话", en: "QA / Dialogue" }, papers: 900 },
        { id: "nlp-ap-sum", name: { zh: "摘要/抽取", en: "Summarization" }, papers: 700 },
      ],
    },
  ],
  ml: [
    {
      id: "ml-rep",
      name: { zh: "表征学习", en: "Representation Learning" },
      description: {
        zh: "学习数据的高效低维表示，自监督、对比学习与生成式预训练是核心范式。",
        en: "Learning efficient low-dimensional representations; self-supervised, contrastive and generative pretraining are key.",
      },
      children: [
        { id: "ml-re-ssl", name: { zh: "自监督学习", en: "Self-Supervised" }, papers: 2200 },
        { id: "ml-re-contrast", name: { zh: "对比学习", en: "Contrastive" }, papers: 1400 },
        { id: "ml-re-disent", name: { zh: "解耦表征", en: "Disentangled" }, papers: 600 },
      ],
    },
    {
      id: "ml-paradigm",
      name: { zh: "学习范式", en: "Learning Paradigms" },
      description: {
        zh: "监督、无监督、半监督、迁移与元学习的整体方法论谱系。",
        en: "The methodological spectrum of supervised, unsupervised, semi-supervised, transfer and meta learning.",
      },
      children: [
        { id: "ml-pa-meta", name: { zh: "元学习", en: "Meta-Learning" }, papers: 1100 },
        { id: "ml-pa-trans", name: { zh: "迁移学习", en: "Transfer Learning" }, papers: 1300 },
        { id: "ml-pa-semi", name: { zh: "半监督学习", en: "Semi-Supervised" }, papers: 700 },
      ],
    },
    {
      id: "ml-fewshot",
      name: { zh: "小样本学习", en: "Few-shot Learning" },
      description: {
        zh: "利用先验知识快速适配新任务，涵盖元学习、上下文学习（In-context）与神经过程。",
        en: "Rapid adaptation to novel tasks via meta-learning, in-context learning and neural processes.",
      },
      children: [
        { id: "ml-fs-icl", name: { zh: "上下文学习", en: "In-Context Learning" }, papers: 900 },
        { id: "ml-fs-meta", name: { zh: "少样本元学习", en: "Few-shot Meta" }, papers: 600 },
        { id: "ml-fs-zero", name: { zh: "零样本泛化", en: "Zero-Shot" }, papers: 500 },
      ],
    },
    {
      id: "ml-cont",
      name: { zh: "持续学习", en: "Continual Learning" },
      description: {
        zh: "在不遗忘旧知识的前提下序贯学习新任务，应对灾难性遗忘（架构/正则/回放三类方法）。",
        en: "Sequentially learning new tasks without forgetting old ones; tackles catastrophic forgetting via architecture/regularization/replay.",
      },
      children: [
        { id: "ml-co-replay", name: { zh: "回放方法", en: "Replay" }, papers: 600 },
        { id: "ml-co-reg", name: { zh: "正则方法", en: "Regularization" }, papers: 400 },
        { id: "ml-co-llm", name: { zh: "LLM 持续学习", en: "LLM Continual" }, papers: 500 },
      ],
    },
    {
      id: "ml-gen",
      name: { zh: "生成模型", en: "Generative Models" },
      description: {
        zh: "学习数据分布并生成新样本，GAN、VAE、归一化流与扩散模型构成主干。",
        en: "Learning data distributions to synthesize samples; GANs, VAEs, flows and diffusion models form the backbone.",
      },
      children: [
        { id: "ml-ge-diff", name: { zh: "扩散模型", en: "Diffusion Models" }, papers: 2400 },
        { id: "ml-ge-gan", name: { zh: "GAN/VAE", en: "GAN / VAE" }, papers: 1200 },
        { id: "ml-ge-flow", name: { zh: "归一化流", en: "Normalizing Flows" }, papers: 400 },
      ],
    },
  ],
  robotics: [],
  multimodal: [],
  ai4science: [],
  datamining: [],
  graphics: [],
  security: [],
  hci: [],
  theory: [],
};
