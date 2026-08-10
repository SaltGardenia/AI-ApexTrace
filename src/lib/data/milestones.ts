import type { Milestone } from "@/lib/types";

export const milestones: Milestone[] = [
  // ---------- CV ----------
  { id: "cv-lenet", direction: "cv", year: 1998, title: "LeNet-5：卷积神经网络奠基", venue: "Proc. IEEE", parentIds: [], impact: "首个成功部署的 CNN，开启卷积特征学习范式", nodeType: "root" },
  { id: "cv-alexnet", direction: "cv", year: 2012, title: "AlexNet：ImageNet 引爆深度学习", venue: "NeurIPS", parentIds: ["cv-lenet"], impact: "Top-5 错误率 15.3%，较传统方法大幅下降，深度学习元年", nodeType: "branch" },
  { id: "cv-vgg", direction: "cv", year: 2014, title: "VGG / GoogLeNet：深层网络结构探索", venue: "ICLR / CVPR", parentIds: ["cv-alexnet"], impact: "证明更深的网络与 Inception 模块可显著提升表达力", nodeType: "branch" },
  { id: "cv-resnet", direction: "cv", year: 2015, title: "ResNet：残差连接突破深度瓶颈", venue: "CVPR", parentIds: ["cv-vgg"], impact: "152 层网络可训练，成为后续所有视觉骨干网基础", nodeType: "branch" },
  { id: "cv-fasterrcnn", direction: "cv", year: 2015, title: "Faster R-CNN：两阶段检测范式", venue: "NeurIPS", parentIds: ["cv-vgg"], impact: "RPN 实现端到端检测，奠定检测框架", nodeType: "branch" },
  { id: "cv-vit", direction: "cv", year: 2020, title: "Vision Transformer：注意力进入视觉", venue: "ICLR", parentIds: ["cv-resnet"], impact: "纯 Transformer 在图像分类超越 CNN，统一架构趋势", nodeType: "branch" },
  { id: "cv-mae", direction: "cv", year: 2021, title: "MAE：掩码自编码预训练", venue: "CVPR", parentIds: ["cv-vit"], impact: "非对称编解码掩码重建，推动视觉自监督", nodeType: "leaf" },
  { id: "cv-sam", direction: "cv", year: 2023, title: "SAM：可提示的分割基础模型", venue: "ICCV", parentIds: ["cv-mae", "cv-vit"], impact: "零样本分割基础模型，开启视觉基础模型时代", nodeType: "leaf" },

  // ---------- NLP ----------
  { id: "nlp-word2vec", direction: "nlp", year: 2013, title: "Word2Vec：分布式词向量", venue: "NeurIPS", parentIds: [], impact: "词嵌入成为 NLP 标准输入表示", nodeType: "root" },
  { id: "nlp-seq2seq", direction: "nlp", year: 2014, title: "Seq2Seq + Attention：神经机器翻译", venue: "NeurIPS / EMNLP", parentIds: ["nlp-word2vec"], impact: "注意力机制大幅提升翻译质量", nodeType: "branch" },
  { id: "nlp-transformer", direction: "nlp", year: 2017, title: "Transformer：Attention is All You Need", venue: "NeurIPS", parentIds: ["nlp-seq2seq"], impact: "自注意力架构成为现代 LLM 基石", nodeType: "branch" },
  { id: "nlp-bert", direction: "nlp", year: 2018, title: "BERT：预训练-微调范式", venue: "NAACL", parentIds: ["nlp-transformer"], impact: "双向掩码预训练刷新 11 项 NLP 任务 SOTA", nodeType: "branch" },
  { id: "nlp-gpt3", direction: "nlp", year: 2020, title: "GPT-3：少样本上下文学习", venue: "NeurIPS", parentIds: ["nlp-transformer"], impact: "175B 参数展示 in-context learning 涌现能力", nodeType: "branch" },
  { id: "nlp-rlhf", direction: "nlp", year: 2022, title: "InstructGPT / RLHF：对齐人类偏好", venue: "NeurIPS", parentIds: ["nlp-gpt3"], impact: "人类反馈强化学习显著提升指令遵循与有用性", nodeType: "branch" },
  { id: "nlp-gpt4", direction: "nlp", year: 2023, title: "GPT-4：多模态大模型", venue: "arXiv", parentIds: ["nlp-rlhf", "mm-clip"], impact: "强推理 + 视觉理解，开启通用助手时代", nodeType: "leaf" },

  // ---------- ML ----------
  { id: "ml-bp", direction: "ml", year: 1986, title: "反向传播算法", venue: "Nature", parentIds: [], impact: "多层网络可训练的理论与工程基础", nodeType: "root" },
  { id: "ml-dropout", direction: "ml", year: 2012, title: "Dropout / ReLU：稳定深度训练", venue: "ICML", parentIds: ["ml-bp"], impact: "缓解过拟合，加速收敛", nodeType: "branch" },
  { id: "ml-batchnorm", direction: "ml", year: 2015, title: "Batch Normalization", venue: "ICML", parentIds: ["ml-dropout"], impact: "允许更大学习率与更深网络", nodeType: "branch" },
  { id: "ml-gan", direction: "ml", year: 2014, title: "GAN：生成式对抗网络", venue: "NeurIPS", parentIds: ["ml-dropout"], impact: "开启对抗式生成的广阔研究方向", nodeType: "branch" },
  { id: "ml-diffusion", direction: "ml", year: 2020, title: "Diffusion Models：去噪生成", venue: "NeurIPS", parentIds: ["ml-gan"], impact: "超越 GAN 的样本质量，主导图像生成", nodeType: "branch" },
  { id: "ml-transformer", direction: "ml", year: 2017, title: "Transformer 架构统一", venue: "NeurIPS", parentIds: ["ml-batchnorm"], impact: "可并行序列建模，跨模态通用骨干", nodeType: "branch" },
  { id: "ml-scaling", direction: "ml", year: 2020, title: "Scaling Laws：规模定律", venue: "arXiv", parentIds: ["ml-transformer"], impact: "预测损失随参数/数据/算力的幂律关系", nodeType: "leaf" },

  // ---------- Multimodal ----------
  { id: "mm-clip", direction: "multimodal", year: 2021, title: "CLIP：图文对比预训练", venue: "ICML", parentIds: ["nlp-transformer"], impact: "大规模图文对比对齐，零样本视觉分类", nodeType: "root" },
  { id: "mm-dalle", direction: "multimodal", year: 2021, title: "DALL·E / 扩散文生图", venue: "arXiv", parentIds: ["mm-clip", "ml-diffusion"], impact: "文本到图像生成走向主流", nodeType: "branch" },
  { id: "mm-flamingo", direction: "multimodal", year: 2022, title: "Flamingo / 少样本多模态", venue: "NeurIPS", parentIds: ["mm-clip"], impact: "多模态 few-shot 上下文学习", nodeType: "branch" },
  { id: "mm-gpt4v", direction: "multimodal", year: 2023, title: "GPT-4V / Gemini：统一多模态", venue: "arXiv", parentIds: ["mm-flamingo"], impact: "任意模态输入的统一推理", nodeType: "leaf" },

  // ---------- Robotics ----------
  { id: "rob-alphago", direction: "robotics", year: 2016, title: "AlphaGo：深度强化学习里程碑", venue: "Nature", parentIds: [], impact: "RL + 搜索在复杂博弈中超越人类", nodeType: "root" },
  { id: "rob-rl", direction: "robotics", year: 2018, title: "Sim2Real 与策略强化", venue: "CoRL", parentIds: ["rob-alphago"], impact: "仿真到现实的迁移学习框架", nodeType: "branch" },
  { id: "rob-rt1", direction: "robotics", year: 2023, title: "RT-1 / PaLM-E：视觉-语言-动作", venue: "RSS", parentIds: ["rob-rl", "mm-clip"], impact: "端到端 VLA 模型驱动机器人操作", nodeType: "leaf" },

  // ---------- AI4Science ----------
  { id: "sci-alphafold", direction: "ai4science", year: 2021, title: "AlphaFold2：蛋白质结构预测", venue: "Nature", parentIds: [], impact: "CASP14 逼近实验精度，生物学范式变革", nodeType: "root" },
  { id: "sci-gnn", direction: "ai4science", year: 2017, title: "图神经网络 GNN", venue: "ICLR", parentIds: [], impact: "分子/材料/物理系统的结构化建模", nodeType: "branch" },
  { id: "sci-aurora", direction: "ai4science", year: 2024, title: "AI 天气预报（Pangu / Aurora）", venue: "Nature", parentIds: ["sci-gnn"], impact: "秒级高精度全球预报，超越数值方法", nodeType: "leaf" },
];

export const milestonesByDirection = (dir: string) =>
  milestones.filter((m) => m.direction === dir);
