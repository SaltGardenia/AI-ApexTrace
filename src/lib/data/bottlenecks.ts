import type { Bottleneck, DirectionId } from "@/lib/types";

export const bottlenecks: Bottleneck[] = [
  // CV
  { id: "cv-b1", direction: "cv", text: "大模型在长尾/小样本场景泛化不足，分布外鲁棒性差", source: "CVPR 2024 Surveys (Limitations)", status: "partial", relatedMilestone: "cv-sam", priority: 9 },
  { id: "cv-b2", direction: "cv", text: "视频理解的时空复杂度与长视频推理仍受限", source: "ICCV 2023 Future Work", status: "unsolved", relatedMilestone: "cv-mae", priority: 7 },
  { id: "cv-b3", direction: "cv", text: "视觉基础模型的标注/算力成本与可解释性", source: "专家标注", status: "partial", relatedMilestone: "cv-sam", priority: 6 },

  // NLP
  { id: "nlp-b1", direction: "nlp", text: "大模型的幻觉（Hallucination）与事实一致性", source: "ACL 2024 Surveys", status: "partial", relatedMilestone: "nlp-gpt4", priority: 10 },
  { id: "nlp-b2", direction: "nlp", text: "推理能力（数学/规划）的可控与可靠性", source: "NeurIPS 2023", status: "partial", relatedMilestone: "nlp-gpt4", priority: 9 },
  { id: "nlp-b3", direction: "nlp", text: "多语言、低资源语言覆盖不均", source: "EMNLP 2024", status: "unsolved", relatedMilestone: "nlp-bert", priority: 6 },

  // ML
  { id: "ml-b1", direction: "ml", text: "训练/推理能效与碳足迹（绿色 AI）", source: "ICML 2024", status: "partial", relatedMilestone: "ml-scaling", priority: 8 },
  { id: "ml-b2", direction: "ml", text: "可解释性与机理可解释（Mechanistic Interpretability）", source: "NeurIPS 2023", status: "unsolved", relatedMilestone: "ml-transformer", priority: 9 },
  { id: "ml-b3", direction: "ml", text: "分布偏移下的持续学习与灾难性遗忘", source: "ICLR 2024", status: "partial", relatedMilestone: "ml-transformer", priority: 7 },

  // Robotics
  { id: "rob-b1", direction: "robotics", text: "Sim2Real 差距与真实世界安全部署", source: "CoRL 2024", status: "partial", relatedMilestone: "rob-rt1", priority: 9 },
  { id: "rob-b2", direction: "robotics", text: "长程任务规划与常识推理", source: "RSS 2024", status: "unsolved", relatedMilestone: "rob-rt1", priority: 8 },

  // Multimodal
  { id: "mm-b1", direction: "multimodal", text: "跨模态对齐中的幻觉与模态冲突", source: "ICML 2024", status: "partial", relatedMilestone: "mm-gpt4v", priority: 9 },
  { id: "mm-b2", direction: "multimodal", text: "统一模态表示与任意到任意生成", source: "NeurIPS 2023", status: "unsolved", relatedMilestone: "mm-gpt4v", priority: 7 },

  // AI4Science
  { id: "sci-b1", direction: "ai4science", text: "科学发现的可信度与可复现验证", source: "Nature MI 2024", status: "unsolved", relatedMilestone: "sci-aurora", priority: 9 },
  { id: "sci-b2", direction: "ai4science", text: "物理一致性约束与符号回归结合", source: "ICLR 2024", status: "partial", relatedMilestone: "sci-gnn", priority: 7 },

  // Datamining
  { id: "dm-b1", direction: "datamining", text: "图模型的可扩展性与动态图在线学习", source: "KDD 2024", status: "partial", priority: 6 },
  { id: "dm-b2", direction: "datamining", text: "推荐系统的公平性与信息茧房", source: "SIGIR 2024", status: "unsolved", priority: 7 },

  // Graphics
  { id: "gr-b1", direction: "graphics", text: "三维生成的几何一致性与物理合理性", source: "SIGGRAPH 2024", status: "partial", priority: 7 },
  { id: "gr-b2", direction: "graphics", text: "实时神经渲染的显存与延迟", source: "CVPR 2024", status: "unsolved", priority: 6 },

  // Security
  { id: "sec-b1", direction: "security", text: "对抗样本的鲁棒认证与自适应攻击", source: "S&P 2024", status: "partial", priority: 8 },
  { id: "sec-b2", direction: "security", text: "大模型对齐安全与越狱防御", source: "ICML 2024", status: "unsolved", priority: 9 },

  // HCI
  { id: "hci-b1", direction: "hci", text: "生成式 AI 界面的可控性与用户信任", source: "CHI 2024", status: "partial", priority: 7 },
  { id: "hci-b2", direction: "hci", text: "可解释 AI 的可理解性与可用性鸿沟", source: "CHI 2023", status: "unsolved", priority: 6 },

  // Theory
  { id: "th-b1", direction: "theory", text: "深度网络泛化能力的严格界", source: "COLT 2024", status: "unsolved", priority: 8 },
  { id: "th-b2", direction: "theory", text: "Transformer 表达力与注意力机制理论", source: "COLT 2023", status: "partial", priority: 7 },
];

export const bottlenecksByDirection = (dir: DirectionId | string) =>
  bottlenecks.filter((b) => b.direction === dir);
