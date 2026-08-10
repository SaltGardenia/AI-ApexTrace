import type { Baseline, Dataset } from "@/lib/types";

export const baselines: { direction: string; items: Baseline[] }[] = [
  // ---------- AI ----------
  {
    direction: "ai",
    items: [
      { id: "ai-kg", name: { zh: "经典知识图谱（Freebase / Wikidata）", en: "Classic Knowledge Graphs (Freebase / Wikidata)" }, year: 2012, description: { zh: "符号知识表示的事实库基线", en: "Symbolic fact base for knowledge representation" }, link: "https://www.wikidata.org/" },
      { id: "ai-pddl", name: { zh: "PDDL 规划器（Fast Downward）", en: "PDDL Planner (Fast Downward)" }, year: 2006, description: { zh: "经典自动规划基线", en: "Classical automated planning baseline" }, link: "https://www.fast-downward.org/" },
      { id: "ai-aima", name: { zh: "AIMA 搜索/推理算法", en: "AIMA Search / Reasoning Algorithms" }, year: 1995, description: { zh: "教科书级搜索与推理基线", en: "Textbook-grade search & reasoning baselines" }, link: "https://github.com/aimacode/aima-python" },
    ],
  },
  // ---------- CV ----------
  {
    direction: "cv",
    items: [
      { id: "cv-resnet", name: { zh: "ResNet-50 图像分类", en: "ResNet-50 Image Classification" }, year: 2015, description: { zh: "视觉骨干网通用基线", en: "Universal vision backbone baseline" }, link: "https://github.com/pytorch/vision/blob/main/torchvision/models/resnet.py" },
      { id: "cv-detectron", name: { zh: "Detectron2 检测/分割", en: "Detectron2 Detection / Segmentation" }, year: 2019, description: { zh: "检测与实例分割基线库", en: "Detection & instance-segmentation baseline library" }, link: "https://github.com/facebookresearch/detectron2" },
      { id: "cv-sam", name: { zh: "SAM 分割基础模型", en: "SAM Segmentation Foundation Model" }, year: 2023, description: { zh: "零样本分割基线", en: "Zero-shot segmentation baseline" }, link: "https://github.com/facebookresearch/segment-anything" },
    ],
  },
  // ---------- NLP ----------
  {
    direction: "nlp",
    items: [
      { id: "nlp-bert", name: { zh: "BERT 预训练-微调", en: "BERT Pretrain–Finetune" }, year: 2018, description: { zh: "文本理解通用基线", en: "General text-understanding baseline" }, link: "https://github.com/google-research/bert" },
      { id: "nlp-gpt2", name: { zh: "GPT-2 自回归生成", en: "GPT-2 Autoregressive Generation" }, year: 2019, description: { zh: "生成式语言模型基线", en: "Generative LM baseline" }, link: "https://github.com/openai/gpt-2" },
      { id: "nlp-sentencebert", name: { zh: "Sentence-BERT 句向量", en: "Sentence-BERT Sentence Embeddings" }, year: 2019, description: { zh: "句级语义相似度基线", en: "Sentence-level similarity baseline" }, link: "https://github.com/UKPLab/sentence-transformers" },
    ],
  },
  // ---------- ML ----------
  {
    direction: "ml",
    items: [
      { id: "ml-skl", name: { zh: "scikit-learn 经典模型", en: "scikit-learn Classical Models" }, year: 2011, description: { zh: "ML 通用基线库", en: "General ML baseline library" }, link: "https://github.com/scikit-learn/scikit-learn" },
      { id: "ml-xgboost", name: { zh: "XGBoost 梯度提升", en: "XGBoost Gradient Boosting" }, year: 2016, description: { zh: "表格数据强基线", en: "Strong tabular-data baseline" }, link: "https://github.com/dmlc/xgboost" },
      { id: "ml-resnet", name: { zh: "ResNet 深度训练", en: "ResNet Deep Training" }, year: 2015, description: { zh: "深度网络训练基线", en: "Deep-network training baseline" }, link: "https://github.com/pytorch/vision/blob/main/torchvision/models/resnet.py" },
    ],
  },
  // ---------- Robotics ----------
  {
    direction: "robotics",
    items: [
      { id: "rob-dynamixel", name: { zh: "ROS 导航栈（move_base）", en: "ROS Navigation Stack (move_base)" }, year: 2010, description: { zh: "移动机器人导航基线", en: "Mobile-robot navigation baseline" }, link: "https://github.com/ros-planning/navigation" },
      { id: "rob-isaac", name: { zh: "Isaac Gym 仿真", en: "Isaac Gym Simulation" }, year: 2021, description: { zh: "大规模并行强化学习仿真基线", en: "Large-scale parallel RL simulation baseline" }, link: "https://github.com/isaac-sim/IsaacGymEnvs" },
      { id: "rob-rt1", name: { zh: "RT-1 / Open X-Embodiment", en: "RT-1 / Open X-Embodiment" }, year: 2023, description: { zh: "机器人操作 VLA 基线", en: "Robotic-manipulation VLA baseline" }, link: "https://robotics-transformer1.github.io/" },
    ],
  },
  // ---------- Multimodal ----------
  {
    direction: "multimodal",
    items: [
      { id: "mm-clip", name: { zh: "CLIP 图文对比", en: "CLIP Image–Text Contrastive" }, year: 2021, description: { zh: "多模态对齐基线", en: "Multimodal alignment baseline" }, link: "https://github.com/openai/CLIP" },
      { id: "mm-blip", name: { zh: "BLIP 视觉-语言预训练", en: "BLIP Vision–Language Pretraining" }, year: 2022, description: { zh: "图文理解与生成基线", en: "Image–text understanding & generation baseline" }, link: "https://github.com/salesforce/BLIP" },
      { id: "mm-llava", name: { zh: "LLaVA 多模态指令", en: "LLaVA Multimodal Instruction" }, year: 2023, description: { zh: "多模态对话基线", en: "Multimodal dialogue baseline" }, link: "https://github.com/haotian-liu/LLaVA" },
    ],
  },
  // ---------- AI4Science ----------
  {
    direction: "ai4science",
    items: [
      { id: "sci-alphafold", name: { zh: "AlphaFold2 结构预测", en: "AlphaFold2 Structure Prediction" }, year: 2021, description: { zh: "蛋白结构预测基线", en: "Protein-structure prediction baseline" }, link: "https://github.com/deepmind/alphafold" },
      { id: "sci-pyscf", name: { zh: "PySCF 量子化学", en: "PySCF Quantum Chemistry" }, year: 2014, description: { zh: "量子化学计算基线", en: "Quantum-chemistry computation baseline" }, link: "https://github.com/pyscf/pyscf" },
      { id: "sci-pangu", name: { zh: "Pangu-Weather 气象预报", en: "Pangu-Weather Forecasting" }, year: 2022, description: { zh: "AI 气象预报基线", en: "AI weather-forecasting baseline" }, link: "https://github.com/198808xc/Pangu-Weather" },
    ],
  },
  // ---------- Datamining ----------
  {
    direction: "datamining",
    items: [
      { id: "dm-node2vec", name: { zh: "node2vec 图嵌入", en: "node2vec Graph Embedding" }, year: 2016, description: { zh: "图节点表示基线", en: "Graph node-representation baseline" }, link: "https://github.com/snap-stanford/snap" },
      { id: "dm-arima", name: { zh: "ARIMA 时序预测", en: "ARIMA Time-Series Forecast" }, year: 1970, description: { zh: "经典时序预测基线", en: "Classical time-series baseline" }, link: "https://www.statsmodels.org/" },
      { id: "dm-lightgcn", name: { zh: "LightGCN 推荐", en: "LightGCN Recommendation" }, year: 2020, description: { zh: "协同过滤推荐基线", en: "Collaborative-filtering baseline" }, link: "https://github.com/gusye1234/LightGCN-PyTorch" },
    ],
  },
  // ---------- Graphics ----------
  {
    direction: "graphics",
    items: [
      { id: "gr-ngp", name: { zh: "Instant-NGP 神经渲染", en: "Instant-NGP Neural Rendering" }, year: 2022, description: { zh: "实时辐射场渲染基线", en: "Real-time radiance-field baseline" }, link: "https://github.com/NVlabs/instant-ngp" },
      { id: "gr-threejs", name: { zh: "Three.js 三维引擎", en: "Three.js 3D Engine" }, year: 2010, description: { zh: "Web 三维渲染基线", en: "Web 3D rendering baseline" }, link: "https://github.com/mrdoob/three.js" },
      { id: "gr-shapenet", name: { zh: "ShapeNet 三维形状", en: "ShapeNet 3D Shapes" }, year: 2015, description: { zh: "三维几何理解基线数据/模型", en: "3D geometry baseline data/model" }, link: "https://github.com/ShapeNet/ShapeNet" },
    ],
  },
  // ---------- Security ----------
  {
    direction: "security",
    items: [
      { id: "sec-foolbox", name: { zh: "Foolbox 对抗攻击", en: "Foolbox Adversarial Attacks" }, year: 2017, description: { zh: "对抗鲁棒性评测基线", en: "Adversarial-robustness eval baseline" }, link: "https://github.com/bethgelab/foolbox" },
      { id: "sec-art", name: { zh: "ART 鲁棒训练", en: "ART Robust Training" }, year: 2018, description: { zh: "对抗防御训练基线", en: "Adversarial defense-training baseline" }, link: "https://github.com/Trusted-AI/adversarial-robustness-toolbox" },
      { id: "sec-yara", name: { zh: "YARA 恶意代码检测", en: "YARA Malware Detection" }, year: 2008, description: { zh: "规则化恶意代码基线", en: "Rule-based malware baseline" }, link: "https://github.com/VirusTotal/yara" },
    ],
  },
  // ---------- HCI ----------
  {
    direction: "hci",
    items: [
      { id: "hci-figma", name: { zh: "Figma 原型设计", en: "Figma Prototyping" }, year: 2016, description: { zh: "交互原型基线工具", en: "Interaction-prototyping baseline tool" }, link: "https://www.figma.com/" },
      { id: "hci-gradio", name: { zh: "Gradio 模型演示", en: "Gradio Model Demo" }, year: 2019, description: { zh: "ML 演示界面基线", en: "ML demo-interface baseline" }, link: "https://github.com/gradio-app/gradio" },
      { id: "hci-react", name: { zh: "React 前端框架", en: "React Frontend Framework" }, year: 2013, description: { zh: "交互界面开发基线", en: "Interactive-UI dev baseline" }, link: "https://github.com/facebook/react" },
    ],
  },
  // ---------- Theory ----------
  {
    direction: "theory",
    items: [
      { id: "th-pacbayes", name: { zh: "PAC-Bayes 泛化界", en: "PAC-Bayes Generalization Bound" }, year: 1999, description: { zh: "泛化能力理论基线", en: "Generalization theory baseline" }, link: "https://github.com/jerome-laforgue/PAC-Bayes" },
      { id: "th-cvxpy", name: { zh: "CVXPY 凸优化", en: "CVXPY Convex Optimization" }, year: 2016, description: { zh: "优化求解基线库", en: "Optimization solver baseline library" }, link: "https://github.com/cvxpy/cvxpy" },
      { id: "th-ntk", name: { zh: "NTK 神经正切核", en: "Neural Tangent Kernel (NTK)" }, year: 2018, description: { zh: "无限宽网络理论基线", en: "Infinite-width network theory baseline" }, link: "https://github.com/google/neural-tangents" },
    ],
  },
];

export const datasets: { direction: string; items: Dataset[] }[] = [
  // ---------- AI ----------
  {
    direction: "ai",
    items: [
      { id: "ai-commonsense", name: { zh: "ConceptNet 常识库", en: "ConceptNet Commonsense" }, year: 2017, description: { zh: "开放常识知识数据集", en: "Open commonsense knowledge dataset" }, link: "https://github.com/commonsense/conceptnet" },
      { id: "ai-logic", name: { zh: "PDDL 规划基准", en: "PDDL Planning Benchmarks" }, year: 2000, description: { zh: "自动规划评测集", en: "Automated-planning benchmarks" }, link: "https://github.com/AI-Planning/classical-benchilds" },
    ],
  },
  // ---------- CV ----------
  {
    direction: "cv",
    items: [
      { id: "cv-imagenet", name: { zh: "ImageNet 分类", en: "ImageNet Classification" }, year: 2009, description: { zh: "视觉识别标准基准", en: "Standard vision benchmark" }, link: "https://github.com/facebook/fbresnet.torch" },
      { id: "cv-coco", name: { zh: "COCO 检测/分割", en: "COCO Detection / Segmentation" }, year: 2014, description: { zh: "检测与分割基准", en: "Detection & segmentation benchmark" }, link: "https://github.com/cocodataset/cocoapi" },
      { id: "cv-ade20k", name: { zh: "ADE20K 场景解析", en: "ADE20K Scene Parsing" }, year: 2017, description: { zh: "语义分割基准", en: "Semantic-segmentation benchmark" }, link: "https://github.com/CSAILVision/ADE20K" },
    ],
  },
  // ---------- NLP ----------
  {
    direction: "nlp",
    items: [
      { id: "nlp-squad", name: { zh: "SQuAD 阅读理解", en: "SQuAD Reading Comprehension" }, year: 2016, description: { zh: "机器阅读理解基准", en: "Machine-reading benchmark" }, link: "https://github.com/rajpurkar/SQuAD-explorer" },
      { id: "nlp-glue", name: { zh: "GLUE 语言理解", en: "GLUE Language Understanding" }, year: 2018, description: { zh: "自然语言理解评测集", en: "NLU evaluation suite" }, link: "https://gluebenchmark.com/" },
      { id: "nlp-wmt", name: { zh: "WMT 机器翻译", en: "WMT Machine Translation" }, year: 2006, description: { zh: "机器翻译基准", en: "Machine-translation benchmark" }, link: "https://github.com/huggingface/wmt-utils" },
    ],
  },
  // ---------- ML ----------
  {
    direction: "ml",
    items: [
      { id: "ml-cifar", name: { zh: "CIFAR-10/100 图像分类", en: "CIFAR-10/100 Classification" }, year: 2009, description: { zh: "小规模分类基准", en: "Small-scale classification benchmark" }, link: "https://www.cs.toronto.edu/~kriz/cifar.html" },
      { id: "ml-mnist", name: { zh: "MNIST 手写数字", en: "MNIST Handwritten Digits" }, year: 1998, description: { zh: "入门级分类基准", en: "Entry-level classification benchmark" }, link: "https://github.com/cvdfoundation/mnist" },
      { id: "ml-torchvision", name: { zh: "TorchVision 基准集", en: "TorchVision Benchmark Sets" }, year: 2016, description: { zh: "统一视觉数据集接口", en: "Unified vision dataset interface" }, link: "https://github.com/pytorch/vision" },
    ],
  },
  // ---------- Robotics ----------
  {
    direction: "robotics",
    items: [
      { id: "rob-rt1data", name: { zh: "Open X-Embodiment 数据集", en: "Open X-Embodiment Dataset" }, year: 2023, description: { zh: "大规模机器人操作数据", en: "Large-scale robotic-manipulation data" }, link: "https://robotics-transformer1.github.io/" },
      { id: "rob-habitat", name: { zh: "Habitat 具身仿真", en: "Habitat Embodied Simulation" }, year: 2019, description: { zh: "具身智能评测基准", en: "Embodied-AI benchmark" }, link: "https://github.com/facebookresearch/habitat-lab" },
    ],
  },
  // ---------- Multimodal ----------
  {
    direction: "multimodal",
    items: [
      { id: "mm-coco", name: { zh: "COCO Caption 图文", en: "COCO Caption Image–Text" }, year: 2015, description: { zh: "图文描述基准", en: "Image–caption benchmark" }, link: "https://github.com/tylin/coco-caption" },
      { id: "mm-vqav2", name: { zh: "VQA v2 视觉问答", en: "VQA v2 Visual QA" }, year: 2017, description: { zh: "视觉问答基准", en: "Visual-QA benchmark" }, link: "https://visualqa.org/" },
      { id: "mm-mscoco", name: { zh: "LAION-5B 图文对", en: "LAION-5B Image–Text Pairs" }, year: 2022, description: { zh: "大规模图文预训练数据", en: "Large-scale image–text pretraining data" }, link: "https://github.com/LAION-AI/LAION-5B" },
    ],
  },
  // ---------- AI4Science ----------
  {
    direction: "ai4science",
    items: [
      { id: "sci-casp", name: { zh: "CASP14 蛋白结构", en: "CASP14 Protein Structures" }, year: 2020, description: { zh: "结构预测评测集", en: "Structure-prediction benchmark" }, link: "https://predictioncenter.org/" },
      { id: "sci-oqmd", name: { zh: "OQMD 材料数据库", en: "OQMD Materials DB" }, year: 2011, description: { zh: "无机材料性质数据", en: "Inorganic materials data" }, link: "https://oqmd.org/" },
      { id: "sci-geom", name: { zh: "GEOM 分子构象", en: "GEOM Molecular Conformations" }, year: 2020, description: { zh: "分子三维构象数据集", en: "Molecular 3D conformation dataset" }, link: "https://github.com/learningmatter-mit/geom" },
    ],
  },
  // ---------- Datamining ----------
  {
    direction: "datamining",
    items: [
      { id: "dm-taobao", name: { zh: "Taobao 用户行为", en: "Taobao User Behavior" }, year: 2018, description: { zh: "点击流推荐基准", en: "Clickstream recommendation benchmark" }, link: "https://github.com/whs/recommendation_datasets" },
      { id: "dm-cora", name: { zh: "Cora 引文图", en: "Cora Citation Graph" }, year: 2008, description: { zh: "节点分类图基准", en: "Node-classification graph benchmark" }, link: "https://github.com/kimiyoung/planetoid" },
      { id: "dm-movielens", name: { zh: "MovieLens 推荐", en: "MovieLens Recommendation" }, year: 1998, description: { zh: "协同过滤基准", en: "Collaborative-filtering benchmark" }, link: "https://grouplens.org/datasets/movielens/" },
    ],
  },
  // ---------- Graphics ----------
  {
    direction: "graphics",
    items: [
      { id: "gr-shapenet", name: { zh: "ShapeNet 三维形状", en: "ShapeNet 3D Shapes" }, year: 2015, description: { zh: "三维形状识别基准", en: "3D shape recognition benchmark" }, link: "https://github.com/ShapeNet/ShapeNet" },
      { id: "gr-objaverse", name: { zh: "Objaverse 三维资产", en: "Objaverse 3D Assets" }, year: 2022, description: { zh: "大规模三维物体集", en: "Large-scale 3D object set" }, link: "https://github.com/allenai/objaverse" },
    ],
  },
  // ---------- Security ----------
  {
    direction: "security",
    items: [
      { id: "sec-cifar10", name: { zh: "CIFAR-10 对抗鲁棒", en: "CIFAR-10 Adversarial Robustness" }, year: 2019, description: { zh: "鲁棒性评测基准", en: "Robustness evaluation benchmark" }, link: "https://robustbench.github.io/" },
      { id: "sec-kdd99", name: { zh: "KDD Cup 99 入侵检测", en: "KDD Cup 99 Intrusion" }, year: 1999, description: { zh: "入侵检测基准", en: "Intrusion-detection benchmark" }, link: "https://kdd.ics.uci.edu/" },
    ],
  },
  // ---------- HCI ----------
  {
    direction: "hci",
    items: [
      { id: "hci-figma", name: { zh: "Figma 社区模板", en: "Figma Community Templates" }, year: 2016, description: { zh: "交互设计数据集", en: "Interaction-design dataset" }, link: "https://www.figma.com/community" },
      { id: "hci-amt", name: { zh: "MTurk 众包标注", en: "MTurk Crowdsourced Labels" }, year: 2005, description: { zh: "人类标注基线来源", en: "Human-label baseline source" }, link: "https://www.mturk.com/" },
    ],
  },
  // ---------- Theory ----------
  {
    direction: "theory",
    items: [
      { id: "th-mnist", name: { zh: "MNIST 双下降", en: "MNIST Double Descent" }, year: 1998, description: { zh: "泛化现象研究基准", en: "Generalization-phenomenon benchmark" }, link: "https://github.com/cvdfoundation/mnist" },
      { id: "th-tiny", name: { zh: "Tiny ImageNet 核分析", en: "Tiny ImageNet Kernel Analysis" }, year: 2015, description: { zh: "NTK 实证基准", en: "NTK empirical benchmark" }, link: "https://github.com/facebookresearch/ntkdataset" },
    ],
  },
];

export const baselinesByDirection = (dir: DirectionId | string): Baseline[] =>
  baselines.find((b) => b.direction === dir)?.items ?? [];

export const datasetsByDirection = (dir: DirectionId | string): Dataset[] =>
  datasets.find((d) => d.direction === dir)?.items ?? [];
