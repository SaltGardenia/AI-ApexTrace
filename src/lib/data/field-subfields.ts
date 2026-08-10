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
  robotics: [
    {
      id: "robotics-perception",
      name: { zh: "感知", en: "Perception" },
      description: {
        zh: "融合视觉、触觉与力觉的机器人感知，涵盖分割/跟踪、位姿估计与基于基础模型的物理属性推理。",
        en: "Fusing vision, tactile and force sensing; covers segmentation/tracking, pose estimation and foundation-model physical reasoning.",
      },
      children: [
        { id: "rob-pe-vision", name: { zh: "视觉感知", en: "Visual Perception" }, papers: 1300 },
        { id: "rob-pe-tactile", name: { zh: "触觉/力觉", en: "Tactile / Force" }, papers: 700 },
        { id: "rob-pe-pose", name: { zh: "位姿估计", en: "Pose Estimation" }, papers: 700 },
      ],
    },
    {
      id: "robotics-planning",
      name: { zh: "规划", en: "Planning" },
      description: {
        zh: "在连续运动与离散任务之间联合推理，运动规划、任务与运动规划（TAMP）与基于 LLM 的高层规划。",
        en: "Joint reasoning over continuous motion and discrete tasks; motion planning, TAMP and LLM-driven high-level planning.",
      },
      children: [
        { id: "rob-pl-motion", name: { zh: "运动规划", en: "Motion Planning" }, papers: 900 },
        { id: "rob-pl-tamp", name: { zh: "任务与运动规划", en: "TAMP" }, papers: 700 },
        { id: "rob-pl-llm", name: { zh: "LLM 规划", en: "LLM Planning" }, papers: 600 },
      ],
    },
    {
      id: "robotics-control",
      name: { zh: "控制", en: "Control" },
      description: {
        zh: "从优化控制（MPC）到学习式控制（模仿/强化学习）与视觉-语言-动作（VLA）模型。",
        en: "From optimal control (MPC) to learning-based control (imitation/RL) and vision-language-action (VLA) models.",
      },
      children: [
        { id: "rob-co-mpc", name: { zh: "模型预测控制", en: "MPC" }, papers: 700 },
        { id: "rob-co-rl", name: { zh: "强化学习控制", en: "RL Control" }, papers: 900 },
        { id: "rob-co-vla", name: { zh: "视觉-语言-动作", en: "VLA Models" }, papers: 800 },
      ],
    },
    {
      id: "robotics-manipulation",
      name: { zh: "操作", en: "Manipulation" },
      description: {
        zh: "抓取与灵巧操作，尤其柔性与可变形物体操作的建模、感知与策略（扩散策略、模仿学习）。",
        en: "Grasping and dexterous manipulation, esp. modeling, perception and policies (diffusion, imitation) for deformable objects.",
      },
      children: [
        { id: "rob-ma-grasp", name: { zh: "抓取", en: "Grasping" }, papers: 900 },
        { id: "rob-ma-dexterous", name: { zh: "灵巧操作", en: "Dexterous" }, papers: 700 },
        { id: "rob-ma-deform", name: { zh: "柔体操作", en: "Deformable Objects" }, papers: 600 },
      ],
    },
    {
      id: "robotics-nav",
      name: { zh: "导航", en: "Navigation" },
      description: {
        zh: "自主与多机器人导航：SLAM、路径规划、避障及基于基础语言模型的导航协作。",
        en: "Autonomous & multi-robot navigation: SLAM, path planning, obstacle avoidance and LLM-based navigation.",
      },
      children: [
        { id: "rob-na-slam", name: { zh: "SLAM/建图", en: "SLAM / Mapping" }, papers: 700 },
        { id: "rob-na-path", name: { zh: "路径规划", en: "Path Planning" }, papers: 600 },
        { id: "rob-na-llm", name: { zh: "语言模型导航", en: "LLM Navigation" }, papers: 500 },
      ],
    },
  ],
  multimodal: [
    {
      id: "mm-vl",
      name: { zh: "图文理解", en: "Vision-Language" },
      description: {
        zh: "视觉-语言模型（VLM/MLLM）已成为 CV 研究的组织核心，从 2023 年 16% 增至 2025 年 40% 的论文占比。",
        en: "Vision-language models (VLM/MLLM) became the organizing center of CV, rising from 16% (2023) to 40% (2025) of papers.",
      },
      children: [
        { id: "mm-vl-mllm", name: { zh: "多模态大模型", en: "MLLMs" }, papers: 1800 },
        { id: "mm-vl-ground", name: { zh: "视觉定位", en: "Visual Grounding" }, papers: 900 },
        { id: "mm-vl-align", name: { zh: "模态对齐", en: "Modality Alignment" }, papers: 800 },
      ],
    },
    {
      id: "mm-gen",
      name: { zh: "多模态生成", en: "Multimodal Generation" },
      description: {
        zh: "文本到图像/视频生成、图文编辑与统一生成框架（扩散模型占生成论文 19.2%）。",
        en: "Text-to-image/video generation, image-text editing and unified generative frameworks (diffusion ~19% of generative papers).",
      },
      children: [
        { id: "mm-ge-t2i", name: { zh: "文生图", en: "Text-to-Image" }, papers: 1200 },
        { id: "mm-ge-t2v", name: { zh: "文生视频", en: "Text-to-Video" }, papers: 1000 },
        { id: "mm-ge-edit", name: { zh: "多模态编辑", en: "Multimodal Editing" }, papers: 700 },
      ],
    },
    {
      id: "mm-reason",
      name: { zh: "视觉推理", en: "Visual Reasoning" },
      description: {
        zh: "多模态思维链、空间推理与具身推理（VLM 上的 RFT/CoT），连接感知与决策。",
        en: "Multimodal chain-of-thought, spatial reasoning and embodied reasoning (RFT/CoT on VLMs) bridging perception and action.",
      },
      children: [
        { id: "mm-re-cot", name: { zh: "多模态思维链", en: "Multimodal CoT" }, papers: 800 },
        { id: "mm-re-space", name: { zh: "空间推理", en: "Spatial Reasoning" }, papers: 500 },
        { id: "mm-re-emb", name: { zh: "具身推理", en: "Embodied Reasoning" }, papers: 500 },
      ],
    },
    {
      id: "mm-audio",
      name: { zh: "音视频多模态", en: "Audio-Visual" },
      description: {
        zh: "语音/音频与视觉的联合理解与生成，包括视听说话人分离与音频驱动生成。",
        en: "Joint audio-visual understanding and generation, incl. audio-visual separation and audio-driven synthesis.",
      },
      children: [
        { id: "mm-au-av", name: { zh: "视听理解", en: "Audio-Visual" }, papers: 500 },
        { id: "mm-au-speech", name: { zh: "语音生成", en: "Speech Generation" }, papers: 400 },
      ],
    },
  ],
  ai4science: [],
  datamining: [],
  graphics: [],
  security: [],
  hci: [],
  theory: [],
};
