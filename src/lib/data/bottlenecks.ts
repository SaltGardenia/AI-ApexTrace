import type { Bottleneck, DirectionId } from "@/lib/types";

export const bottlenecks: Bottleneck[] = [
  // CV
  { id: "cv-b1", direction: "cv", text: { zh: "大模型在长尾/小样本场景泛化不足，分布外鲁棒性差", en: "Large models generalize poorly on long-tail / few-shot and out-of-distribution cases" }, source: { zh: "CVPR 2024 Surveys (Limitations)", en: "CVPR 2024 Surveys (Limitations)" }, status: "partial", relatedMilestone: "cv-sam", priority: 9, link: "https://github.com/facebookresearch/segment-anything" },
  { id: "cv-b2", direction: "cv", text: { zh: "视频理解的时空复杂度与长视频推理仍受限", en: "Spatio-temporal complexity & long-video reasoning remain limited" }, source: { zh: "ICCV 2023 Future Work", en: "ICCV 2023 Future Work" }, status: "unsolved", relatedMilestone: "cv-mae", priority: 7 },
  { id: "cv-b3", direction: "cv", text: { zh: "视觉基础模型的标注/算力成本与可解释性", en: "Annotation / compute cost and interpretability of visual foundation models" }, source: { zh: "专家标注", en: "Expert annotation" }, status: "partial", relatedMilestone: "cv-sam", priority: 6 },

  // NLP
  { id: "nlp-b1", direction: "nlp", text: { zh: "大模型的幻觉（Hallucination）与事实一致性", en: "Hallucination & factual consistency of LLMs" }, source: { zh: "ACL 2024 Surveys", en: "ACL 2024 Surveys" }, status: "partial", relatedMilestone: "nlp-gpt4", priority: 10, link: "https://github.com/NVIDIA/NeMo-Guardrails" },
  { id: "nlp-b2", direction: "nlp", text: { zh: "推理能力（数学/规划）的可控与可靠性", en: "Controllability & reliability of reasoning (math / planning)" }, source: { zh: "NeurIPS 2023", en: "NeurIPS 2023" }, status: "partial", relatedMilestone: "nlp-gpt4", priority: 9 },
  { id: "nlp-b3", direction: "nlp", text: { zh: "多语言、低资源语言覆盖不均", en: "Uneven coverage of multilingual & low-resource languages" }, source: { zh: "EMNLP 2024", en: "EMNLP 2024" }, status: "unsolved", relatedMilestone: "nlp-bert", priority: 6 },

  // ML
  { id: "ml-b1", direction: "ml", text: { zh: "训练/推理能效与碳足迹（绿色 AI）", en: "Training/inference energy & carbon footprint (Green AI)" }, source: { zh: "ICML 2024", en: "ICML 2024" }, status: "partial", relatedMilestone: "ml-scaling", priority: 8 },
  { id: "ml-b2", direction: "ml", text: { zh: "可解释性与机理可解释（Mechanistic Interpretability）", en: "Interpretability & mechanistic interpretability" }, source: { zh: "NeurIPS 2023", en: "NeurIPS 2023" }, status: "unsolved", relatedMilestone: "ml-transformer", priority: 9, link: "https://github.com/TransformerLensOrg/TransformerLens" },
  { id: "ml-b3", direction: "ml", text: { zh: "分布偏移下的持续学习与灾难性遗忘", en: "Continual learning under distribution shift & catastrophic forgetting" }, source: { zh: "ICLR 2024", en: "ICLR 2024" }, status: "partial", relatedMilestone: "ml-transformer", priority: 7 },

  // Robotics
  { id: "rob-b1", direction: "robotics", text: { zh: "Sim2Real 差距与真实世界安全部署", en: "Sim2Real gap & safe real-world deployment" }, source: { zh: "CoRL 2024", en: "CoRL 2024" }, status: "partial", relatedMilestone: "rob-rt1", priority: 9 },
  { id: "rob-b2", direction: "robotics", text: { zh: "长程任务规划与常识推理", en: "Long-horizon planning & commonsense reasoning" }, source: { zh: "RSS 2024", en: "RSS 2024" }, status: "unsolved", relatedMilestone: "rob-rt1", priority: 8 },

  // Multimodal
  { id: "mm-b1", direction: "multimodal", text: { zh: "跨模态对齐中的幻觉与模态冲突", en: "Hallucination & modality conflict in cross-modal alignment" }, source: { zh: "ICML 2024", en: "ICML 2024" }, status: "partial", relatedMilestone: "mm-gpt4v", priority: 9 },
  { id: "mm-b2", direction: "multimodal", text: { zh: "统一模态表示与任意到任意生成", en: "Unified modality representation & any-to-any generation" }, source: { zh: "NeurIPS 2023", en: "NeurIPS 2023" }, status: "unsolved", relatedMilestone: "mm-gpt4v", priority: 7 },

  // AI4Science
  { id: "sci-b1", direction: "ai4science", text: { zh: "科学发现的可信度与可复现验证", en: "Trustworthiness & reproducible verification of scientific discovery" }, source: { zh: "Nature MI 2024", en: "Nature MI 2024" }, status: "unsolved", relatedMilestone: "sci-aurora", priority: 9 },
  { id: "sci-b2", direction: "ai4science", text: { zh: "物理一致性约束与符号回归结合", en: "Combining physical-consistency constraints with symbolic regression" }, source: { zh: "ICLR 2024", en: "ICLR 2024" }, status: "partial", relatedMilestone: "sci-gnn", priority: 7 },

  // Datamining
  { id: "dm-b1", direction: "datamining", text: { zh: "图模型的可扩展性与动态图在线学习", en: "Scalability of graph models & online learning on dynamic graphs" }, source: { zh: "KDD 2024", en: "KDD 2024" }, status: "partial", priority: 6 },
  { id: "dm-b2", direction: "datamining", text: { zh: "推荐系统的公平性与信息茧房", en: "Fairness of recommender systems & filter bubbles" }, source: { zh: "SIGIR 2024", en: "SIGIR 2024" }, status: "unsolved", priority: 7 },

  // Graphics
  { id: "gr-b1", direction: "graphics", text: { zh: "三维生成的几何一致性与物理合理性", en: "Geometric consistency & physical plausibility of 3D generation" }, source: { zh: "SIGGRAPH 2024", en: "SIGGRAPH 2024" }, status: "partial", priority: 7 },
  { id: "gr-b2", direction: "graphics", text: { zh: "实时神经渲染的显存与延迟", en: "Memory & latency of real-time neural rendering" }, source: { zh: "CVPR 2024", en: "CVPR 2024" }, status: "unsolved", priority: 6 },

  // Security
  { id: "sec-b1", direction: "security", text: { zh: "对抗样本的鲁棒认证与自适应攻击", en: "Robust certification of adversarial examples & adaptive attacks" }, source: { zh: "S&P 2024", en: "S&P 2024" }, status: "partial", priority: 8, link: "https://github.com/Trusted-AI/adversarial-robustness-toolbox" },
  { id: "sec-b2", direction: "security", text: { zh: "大模型对齐安全与越狱防御", en: "Alignment safety of LLMs & jailbreak defense" }, source: { zh: "ICML 2024", en: "ICML 2024" }, status: "unsolved", priority: 9 },

  // HCI
  { id: "hci-b1", direction: "hci", text: { zh: "生成式 AI 界面的可控性与用户信任", en: "Controllability of generative-AI interfaces & user trust" }, source: { zh: "CHI 2024", en: "CHI 2024" }, status: "partial", priority: 7 },
  { id: "hci-b2", direction: "hci", text: { zh: "可解释 AI 的可理解性与可用性鸿沟", en: "Understandability & usability gap of explainable AI" }, source: { zh: "CHI 2023", en: "CHI 2023" }, status: "unsolved", priority: 6 },

  // Theory
  { id: "th-b1", direction: "theory", text: { zh: "深度网络泛化能力的严格界", en: "Tight bounds on the generalization of deep networks" }, source: { zh: "COLT 2024", en: "COLT 2024" }, status: "unsolved", priority: 8 },
  { id: "th-b2", direction: "theory", text: { zh: "Transformer 表达力与注意力机制理论", en: "Expressiveness of Transformers & attention theory" }, source: { zh: "COLT 2023", en: "COLT 2023" }, status: "partial", priority: 7 },
];

export const bottlenecksByDirection = (dir: DirectionId | string) =>
  bottlenecks.filter((b) => b.direction === dir);
