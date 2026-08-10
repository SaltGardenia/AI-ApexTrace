import type { FieldNode } from "@/lib/types";

// Multi-level AI research landscape tree.
// Level 1 = the 12 top categories. Every node carries a stable `id` used as
// the detail-page slug. Leaf nodes (smallest sub-categories) carry a `papers`
// count; intermediate counts are the sum of their children (computed below).
// Paper counts are research-experience estimates for navigation/statistics.
export const fieldTree: FieldNode[] = [
  {
    id: "ml",
    name: { zh: "机器学习", en: "Machine Learning" },
    description: { zh: "表征学习、学习范式与数据高效学习的理论与方法。", en: "Theory and methods of representation learning, learning paradigms and data-efficient learning." },
    children: [
      {
        id: "ml-rep",
        name: { zh: "表征学习", en: "Representation Learning" },
        children: [
          {
            id: "ml-rep-ssl",
            name: { zh: "自监督学习", en: "Self-Supervised Learning" },
            children: [
              {
                id: "ml-rep-ssl-cl",
                name: { zh: "对比学习", en: "Contrastive Learning" },
                children: [
                  { id: "ml-rep-ssl-cl-simclr", name: { zh: "SimCLR", en: "SimCLR" }, papers: 600 },
                  { id: "ml-rep-ssl-cl-moco", name: { zh: "MoCo", en: "MoCo" }, papers: 550 },
                  { id: "ml-rep-ssl-cl-byol", name: { zh: "BYOL", en: "BYOL" }, papers: 320 },
                  { id: "ml-rep-ssl-cl-swav", name: { zh: "SwAV", en: "SwAV" }, papers: 280 },
                  { id: "ml-rep-ssl-cl-dino", name: { zh: "DINO", en: "DINO" }, papers: 420 },
                  { id: "ml-rep-ssl-cl-dinov2", name: { zh: "DINOv2", en: "DINOv2" }, papers: 260 },
                ],
              },
              {
                id: "ml-rep-ssl-mm",
                name: { zh: "掩码建模", en: "Masked Modeling" },
                children: [
                  { id: "ml-rep-ssl-mm-mae", name: { zh: "MAE", en: "MAE" }, papers: 520 },
                  { id: "ml-rep-ssl-mm-beit", name: { zh: "BEiT", en: "BEiT" }, papers: 240 },
                  { id: "ml-rep-ssl-mm-simmim", name: { zh: "SimMIM", en: "SimMIM" }, papers: 180 },
                  { id: "ml-rep-ssl-mm-maskfeat", name: { zh: "MaskFeat", en: "MaskFeat" }, papers: 120 },
                  { id: "ml-rep-ssl-mm-videomae", name: { zh: "VideoMAE", en: "VideoMAE" }, papers: 160 },
                ],
              },
              {
                id: "ml-rep-ssl-multi",
                name: { zh: "多模态自监督", en: "Multimodal Self-Supervised" },
                children: [
                  { id: "ml-rep-ssl-multi-clip", name: { zh: "CLIP", en: "CLIP" }, papers: 900 },
                  { id: "ml-rep-ssl-multi-align", name: { zh: "ALIGN", en: "ALIGN" }, papers: 220 },
                  { id: "ml-rep-ssl-multi-lit", name: { zh: "LiT", en: "LiT" }, papers: 120 },
                  { id: "ml-rep-ssl-multi-imagebind", name: { zh: "ImageBind", en: "ImageBind" }, papers: 180 },
                ],
              },
            ],
          },
          {
            id: "ml-rep-align",
            name: { zh: "表征对齐", en: "Representation Alignment" },
            children: [
              {
                id: "ml-rep-align-xmodal",
                name: { zh: "跨模态对齐", en: "Cross-modal Alignment" },
                children: [
                  { id: "ml-rep-align-xmodal-vl", name: { zh: "视觉-语言对齐", en: "Vision-Language Alignment" }, papers: 480 },
                  { id: "ml-rep-align-xmodal-av", name: { zh: "音视对齐", en: "Audio-Visual Alignment" }, papers: 220 },
                  { id: "ml-rep-align-xmodal-ti", name: { zh: "文本-图像对齐", en: "Text-Image Alignment" }, papers: 360 },
                ],
              },
              {
                id: "ml-rep-align-emb",
                name: { zh: "Embedding 学习", en: "Embedding Learning" },
                children: [
                  { id: "ml-rep-align-emb-metric", name: { zh: "度量学习", en: "Metric Learning" }, papers: 420 },
                  { id: "ml-rep-align-emb-contrast", name: { zh: "对比嵌入", en: "Contrastive Embedding" }, papers: 300 },
                  { id: "ml-rep-align-emb-disent", name: { zh: "特征解耦", en: "Feature Disentanglement" }, papers: 260 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ml-paradigm",
        name: { zh: "机器学习范式", en: "Learning Paradigm" },
        children: [
          {
            id: "ml-paradigm-few",
            name: { zh: "小样本学习", en: "Few-shot Learning" },
            children: [
              {
                id: "ml-paradigm-few-meta",
                name: { zh: "元学习", en: "Meta Learning" },
                children: [
                  { id: "ml-paradigm-few-meta-maml", name: { zh: "MAML", en: "MAML" }, papers: 700 },
                  { id: "ml-paradigm-few-meta-protonet", name: { zh: "ProtoNet", en: "ProtoNet" }, papers: 420 },
                  { id: "ml-paradigm-few-meta-relation", name: { zh: "Relation Network", en: "Relation Network" }, papers: 260 },
                ],
              },
              {
                id: "ml-paradigm-few-icl",
                name: { zh: "上下文学习", en: "In-context Learning" },
                children: [
                  { id: "ml-paradigm-few-icl-gpt", name: { zh: "GPT 式学习", en: "GPT-style Learning" }, papers: 520 },
                  { id: "ml-paradigm-few-icl-prompt", name: { zh: "提示学习", en: "Prompt Learning" }, papers: 640 },
                ],
              },
            ],
          },
          {
            id: "ml-paradigm-cont",
            name: { zh: "持续学习", en: "Continual Learning" },
            children: [
              {
                id: "ml-paradigm-cont-inc",
                name: { zh: "增量学习", en: "Incremental Learning" },
                children: [
                  { id: "ml-paradigm-cont-inc-class", name: { zh: "类增量学习", en: "Class Incremental Learning" }, papers: 380 },
                  { id: "ml-paradigm-cont-inc-task", name: { zh: "任务增量学习", en: "Task Incremental Learning" }, papers: 240 },
                ],
              },
              {
                id: "ml-paradigm-cont-forget",
                name: { zh: "遗忘问题", en: "Forgetting" },
                children: [
                  { id: "ml-paradigm-cont-forget-cf", name: { zh: "灾难性遗忘", en: "Catastrophic Forgetting" }, papers: 460 },
                  { id: "ml-paradigm-cont-forget-pi", name: { zh: "参数隔离", en: "Parameter Isolation" }, papers: 220 },
                ],
              },
            ],
          },
          {
            id: "ml-paradigm-data",
            name: { zh: "数据高效学习", en: "Data-efficient Learning" },
            children: [
              { id: "ml-paradigm-data-active", name: { zh: "主动学习", en: "Active Learning" }, papers: 360 },
              { id: "ml-paradigm-data-weak", name: { zh: "弱监督学习", en: "Weak Supervision" }, papers: 420 },
              { id: "ml-paradigm-data-semi", name: { zh: "半监督学习", en: "Semi-supervised Learning" }, papers: 540 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cv",
    name: { zh: "计算机视觉", en: "Computer Vision" },
    description: { zh: "图像/视频理解、检测分割、三维感知与重建。", en: "Image/video understanding, detection & segmentation, 3D perception and reconstruction." },
    children: [
      {
        id: "cv-recog",
        name: { zh: "图像识别", en: "Image Recognition" },
        children: [
          {
            id: "cv-recog-cls",
            name: { zh: "图像分类", en: "Image Classification" },
            children: [
              { id: "cv-recog-cls-cnn", name: { zh: "CNN 分类", en: "CNN Classification" }, papers: 820 },
              { id: "cv-recog-cls-vit", name: { zh: "视觉 Transformer", en: "Vision Transformer" }, papers: 760 },
              { id: "cv-recog-cls-convnext", name: { zh: "ConvNeXt", en: "ConvNeXt" }, papers: 240 },
            ],
          },
          {
            id: "cv-recog-longtail",
            name: { zh: "长尾分类", en: "Long-tail Recognition" },
            children: [
              { id: "cv-recog-longtail-lt", name: { zh: "长尾识别", en: "Long-tail Recognition" }, papers: 320 },
              { id: "cv-recog-longtail-imbalance", name: { zh: "类别不平衡学习", en: "Class Imbalance Learning" }, papers: 380 },
            ],
          },
        ],
      },
      {
        id: "cv-det",
        name: { zh: "目标检测", en: "Object Detection" },
        children: [
          {
            id: "cv-det-two",
            name: { zh: "两阶段检测", en: "Two-stage Detection" },
            children: [
              { id: "cv-det-two-frcnn", name: { zh: "Faster R-CNN", en: "Faster R-CNN" }, papers: 920 },
              { id: "cv-det-two-cascade", name: { zh: "Cascade R-CNN", en: "Cascade R-CNN" }, papers: 420 },
            ],
          },
          {
            id: "cv-det-one",
            name: { zh: "一阶段检测", en: "One-stage Detection" },
            children: [
              { id: "cv-det-one-yolo", name: { zh: "YOLO 系列", en: "YOLO Series" }, papers: 880 },
              { id: "cv-det-one-retina", name: { zh: "RetinaNet", en: "RetinaNet" }, papers: 560 },
            ],
          },
          {
            id: "cv-det-trans",
            name: { zh: "Transformer 检测", en: "Transformer Detection" },
            children: [
              { id: "cv-det-trans-detr", name: { zh: "DETR", en: "DETR" }, papers: 680 },
              { id: "cv-det-trans-deform", name: { zh: "Deformable DETR", en: "Deformable DETR" }, papers: 360 },
              { id: "cv-det-trans-dino", name: { zh: "DINO DETR", en: "DINO DETR" }, papers: 220 },
            ],
          },
          {
            id: "cv-det-open",
            name: { zh: "开放世界检测", en: "Open-world Detection" },
            children: [
              { id: "cv-det-open-vocab", name: { zh: "开放词汇检测", en: "Open Vocabulary Detection" }, papers: 300 },
              { id: "cv-det-open-ground", name: { zh: "接地检测", en: "Grounding Detection" }, papers: 240 },
              { id: "cv-det-open-gdino", name: { zh: "Grounding-DINO", en: "Grounding-DINO" }, papers: 180 },
            ],
          },
        ],
      },
      {
        id: "cv-seg",
        name: { zh: "图像分割", en: "Image Segmentation" },
        children: [
          {
            id: "cv-seg-sem",
            name: { zh: "语义分割", en: "Semantic Segmentation" },
            children: [
              { id: "cv-seg-sem-deeplab", name: { zh: "DeepLab", en: "DeepLab" }, papers: 620 },
              { id: "cv-seg-sem-segformer", name: { zh: "SegFormer", en: "SegFormer" }, papers: 320 },
              { id: "cv-seg-sem-mask2former", name: { zh: "Mask2Former", en: "Mask2Former" }, papers: 260 },
            ],
          },
          {
            id: "cv-seg-inst",
            name: { zh: "实例分割", en: "Instance Segmentation" },
            children: [
              { id: "cv-seg-inst-maskrcnn", name: { zh: "Mask R-CNN", en: "Mask R-CNN" }, papers: 860 },
              { id: "cv-seg-inst-solo", name: { zh: "SOLO", en: "SOLO" }, papers: 240 },
            ],
          },
          {
            id: "cv-seg-found",
            name: { zh: "基础模型分割", en: "Foundation-model Segmentation" },
            children: [
              { id: "cv-seg-found-sam", name: { zh: "SAM", en: "SAM" }, papers: 480 },
              { id: "cv-seg-found-sam2", name: { zh: "SAM2", en: "SAM2" }, papers: 220 },
              { id: "cv-seg-found-prompt", name: { zh: "可提示分割", en: "Promptable Segmentation" }, papers: 200 },
            ],
          },
        ],
      },
      {
        id: "cv-3d",
        name: { zh: "三维视觉", en: "3D Vision" },
        children: [
          {
            id: "cv-3d-recon",
            name: { zh: "三维重建", en: "3D Reconstruction" },
            children: [
              {
                id: "cv-3d-recon-trad",
                name: { zh: "传统三维重建", en: "Traditional Reconstruction" },
                children: [
                  { id: "cv-3d-recon-trad-sfm", name: { zh: "SfM", en: "SfM" }, papers: 420 },
                  { id: "cv-3d-recon-trad-mvs", name: { zh: "MVS", en: "MVS" }, papers: 360 },
                ],
              },
              {
                id: "cv-3d-recon-nerf",
                name: { zh: "神经渲染", en: "Neural Rendering" },
                children: [
                  { id: "cv-3d-recon-nerf-nerf", name: { zh: "NeRF", en: "NeRF" }, papers: 720 },
                  { id: "cv-3d-recon-nerf-ngp", name: { zh: "Instant-NGP", en: "Instant-NGP" }, papers: 240 },
                ],
              },
              {
                id: "cv-3d-recon-gs",
                name: { zh: "高斯渲染", en: "Gaussian Rendering" },
                children: [
                  { id: "cv-3d-recon-gs-3dgs", name: { zh: "3D Gaussian Splatting", en: "3D Gaussian Splatting" }, papers: 380 },
                  { id: "cv-3d-recon-gs-dyn", name: { zh: "动态高斯渲染", en: "Dynamic Gaussian Splatting" }, papers: 200 },
                ],
              },
            ],
          },
          {
            id: "cv-3d-understand",
            name: { zh: "三维理解", en: "3D Understanding" },
            children: [
              { id: "cv-3d-understand-pc", name: { zh: "点云理解", en: "Point Cloud Understanding" }, papers: 420 },
              { id: "cv-3d-understand-pt", name: { zh: "Point Transformer", en: "Point Transformer" }, papers: 280 },
              { id: "cv-3d-understand-3ddet", name: { zh: "三维目标检测", en: "3D Object Detection" }, papers: 360 },
              { id: "cv-3d-understand-3dseg", name: { zh: "三维语义分割", en: "3D Semantic Segmentation" }, papers: 240 },
            ],
          },
          {
            id: "cv-3d-indoor",
            name: { zh: "室内场景理解", en: "Indoor Scene Understanding" },
            children: [
              { id: "cv-3d-indoor-sr", name: { zh: "场景重建", en: "Scene Reconstruction" }, papers: 320 },
              { id: "cv-3d-indoor-sg", name: { zh: "场景图生成", en: "Scene Graph Generation" }, papers: 300 },
              { id: "cv-3d-indoor-layout", name: { zh: "室内布局估计", en: "Indoor Layout Estimation" }, papers: 220 },
              { id: "cv-3d-indoor-emb", name: { zh: "具身场景理解", en: "Embodied Scene Understanding" }, papers: 200 },
            ],
          },
        ],
      },
      {
        id: "cv-video",
        name: { zh: "视频理解", en: "Video Understanding" },
        children: [
          { id: "cv-video-cls", name: { zh: "视频分类", en: "Video Classification" }, papers: 480 },
          { id: "cv-video-track", name: { zh: "视频目标跟踪", en: "Video Object Tracking" }, papers: 520 },
          { id: "cv-video-seg", name: { zh: "视频分割", en: "Video Segmentation" }, papers: 360 },
          { id: "cv-video-found", name: { zh: "视频基础模型", en: "Video Foundation Model" }, papers: 280 },
          { id: "cv-video-gen", name: { zh: "视频生成", en: "Video Generation" }, papers: 420 },
        ],
      },
    ],
  },
  {
    id: "nlp",
    name: { zh: "自然语言处理", en: "NLP" },
    description: { zh: "大语言模型、能力增强与各类 NLP 应用。", en: "Large language models, capability enhancement and NLP applications." },
    children: [
      {
        id: "nlp-llm",
        name: { zh: "大语言模型", en: "Large Language Model" },
        children: [
          {
            id: "nlp-llm-base",
            name: { zh: "基础模型", en: "Base Models" },
            children: [
              { id: "nlp-llm-base-gpt", name: { zh: "GPT", en: "GPT" }, papers: 980 },
              { id: "nlp-llm-base-llama", name: { zh: "LLaMA", en: "LLaMA" }, papers: 620 },
              { id: "nlp-llm-base-palm", name: { zh: "PaLM", en: "PaLM" }, papers: 320 },
              { id: "nlp-llm-base-qwen", name: { zh: "Qwen", en: "Qwen" }, papers: 280 },
            ],
          },
          {
            id: "nlp-llm-train",
            name: { zh: "模型训练", en: "Model Training" },
            children: [
              { id: "nlp-llm-train-pre", name: { zh: "预训练", en: "Pre-training" }, papers: 760 },
              { id: "nlp-llm-train-inst", name: { zh: "指令微调", en: "Instruction Tuning" }, papers: 640 },
              { id: "nlp-llm-train-align", name: { zh: "对齐", en: "Alignment" }, papers: 520 },
            ],
          },
          {
            id: "nlp-llm-peft",
            name: { zh: "高效微调", en: "Parameter-efficient Fine-tuning" },
            children: [
              { id: "nlp-llm-peft-lora", name: { zh: "LoRA", en: "LoRA" }, papers: 680 },
              { id: "nlp-llm-peft-adapter", name: { zh: "Adapter", en: "Adapter" }, papers: 420 },
              { id: "nlp-llm-peft-prefix", name: { zh: "Prefix Tuning", en: "Prefix Tuning" }, papers: 260 },
            ],
          },
        ],
      },
      {
        id: "nlp-cap",
        name: { zh: "LLM 能力增强", en: "LLM Capability Enhancement" },
        children: [
          {
            id: "nlp-cap-rag",
            name: { zh: "检索增强生成", en: "Retrieval-Augmented Generation" },
            children: [
              { id: "nlp-cap-rag-dense", name: { zh: "稠密检索", en: "Dense Retrieval" }, papers: 520 },
              { id: "nlp-cap-rag-hybrid", name: { zh: "混合检索", en: "Hybrid Retrieval" }, papers: 280 },
              { id: "nlp-cap-rag-kag", name: { zh: "知识增强生成", en: "Knowledge-Augmented Generation" }, papers: 320 },
            ],
          },
          {
            id: "nlp-cap-reason",
            name: { zh: "推理能力", en: "Reasoning" },
            children: [
              { id: "nlp-cap-reason-cot", name: { zh: "Chain-of-Thought", en: "Chain-of-Thought" }, papers: 640 },
              { id: "nlp-cap-reason-tot", name: { zh: "Tree-of-Thought", en: "Tree-of-Thought" }, papers: 220 },
              { id: "nlp-cap-reason-sc", name: { zh: "Self-Consistency", en: "Self-Consistency" }, papers: 300 },
              { id: "nlp-cap-reason-tts", name: { zh: "测试时缩放", en: "Test-time Scaling" }, papers: 200 },
            ],
          },
          {
            id: "nlp-cap-agent",
            name: { zh: "Agent 能力", en: "Agent Capabilities" },
            children: [
              { id: "nlp-cap-agent-tool", name: { zh: "工具调用 Agent", en: "Tool-use Agent" }, papers: 420 },
              { id: "nlp-cap-agent-code", name: { zh: "编程 Agent", en: "Coding Agent" }, papers: 360 },
              { id: "nlp-cap-agent-research", name: { zh: "研究 Agent", en: "Research Agent" }, papers: 220 },
              { id: "nlp-cap-agent-multi", name: { zh: "多智能体系统", en: "Multi-Agent System" }, papers: 480 },
            ],
          },
        ],
      },
      {
        id: "nlp-app",
        name: { zh: "NLP 应用", en: "NLP Applications" },
        children: [
          { id: "nlp-app-ie", name: { zh: "信息抽取", en: "Information Extraction" }, papers: 560 },
          { id: "nlp-app-mt", name: { zh: "机器翻译", en: "Machine Translation" }, papers: 680 },
          { id: "nlp-app-dlg", name: { zh: "对话系统", en: "Dialogue System" }, papers: 520 },
          { id: "nlp-app-gen", name: { zh: "文本生成", en: "Text Generation" }, papers: 600 },
          { id: "nlp-app-sum", name: { zh: "摘要", en: "Summarization" }, papers: 480 },
        ],
      },
    ],
  },
  {
    id: "multimodal",
    name: { zh: "多模态人工智能", en: "Multimodal AI" },
    description: { zh: "视觉-语言模型与多模态生成。", en: "Vision-language models and multimodal generation." },
    children: [
      {
        id: "multimodal-vlm",
        name: { zh: "视觉-语言模型", en: "Vision-Language Model" },
        children: [
          {
            id: "multimodal-vlm-understand",
            name: { zh: "图文理解", en: "Image-Text Understanding" },
            children: [
              { id: "multimodal-vlm-understand-clip", name: { zh: "CLIP", en: "CLIP" }, papers: 900 },
              { id: "multimodal-vlm-understand-blip", name: { zh: "BLIP", en: "BLIP" }, papers: 420 },
              { id: "multimodal-vlm-understand-flamingo", name: { zh: "Flamingo", en: "Flamingo" }, papers: 260 },
            ],
          },
          {
            id: "multimodal-vlm-large",
            name: { zh: "多模态大模型", en: "Multimodal Large Model" },
            children: [
              { id: "multimodal-vlm-large-gpt4v", name: { zh: "GPT-4V", en: "GPT-4V" }, papers: 320 },
              { id: "multimodal-vlm-large-gemini", name: { zh: "Gemini", en: "Gemini" }, papers: 280 },
              { id: "multimodal-vlm-large-llava", name: { zh: "LLaVA", en: "LLaVA" }, papers: 460 },
            ],
          },
          {
            id: "multimodal-vlm-reason",
            name: { zh: "视觉推理", en: "Visual Reasoning" },
            children: [
              { id: "multimodal-vlm-reason-vqa", name: { zh: "视觉问答", en: "Visual Question Answering" }, papers: 620 },
              { id: "multimodal-vlm-reason-vr", name: { zh: "视觉推理", en: "Visual Reasoning" }, papers: 360 },
              { id: "multimodal-vlm-reason-ground", name: { zh: "接地理解", en: "Grounded Understanding" }, papers: 280 },
            ],
          },
        ],
      },
      {
        id: "multimodal-gen",
        name: { zh: "多模态生成", en: "Multimodal Generation" },
        children: [
          {
            id: "multimodal-gen-t2i",
            name: { zh: "文生图", en: "Text-to-Image" },
            children: [
              { id: "multimodal-gen-t2i-sd", name: { zh: "Stable Diffusion", en: "Stable Diffusion" }, papers: 720 },
              { id: "multimodal-gen-t2i-dalle", name: { zh: "DALL-E", en: "DALL-E" }, papers: 380 },
            ],
          },
          {
            id: "multimodal-gen-t2v",
            name: { zh: "文生视频", en: "Text-to-Video" },
            children: [
              { id: "multimodal-gen-t2v-sora", name: { zh: "Sora", en: "Sora" }, papers: 260 },
              { id: "multimodal-gen-t2v-vdiff", name: { zh: "Video Diffusion", en: "Video Diffusion" }, papers: 340 },
            ],
          },
          {
            id: "multimodal-gen-t23d",
            name: { zh: "文生三维", en: "Text-to-3D" },
            children: [
              { id: "multimodal-gen-t23d-dream", name: { zh: "DreamFusion", en: "DreamFusion" }, papers: 220 },
              { id: "multimodal-gen-t23d-gauss", name: { zh: "高斯生成", en: "Gaussian Generation" }, papers: 180 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "generative",
    name: { zh: "生成式人工智能", en: "Generative AI" },
    description: { zh: "扩散模型与基础模型。", en: "Diffusion models and foundation models." },
    children: [
      {
        id: "generative-diff",
        name: { zh: "扩散模型", en: "Diffusion Model" },
        children: [
          {
            id: "generative-diff-image",
            name: { zh: "图像生成", en: "Image Generation" },
            children: [
              { id: "generative-diff-image-ddpm", name: { zh: "DDPM", en: "DDPM" }, papers: 680 },
              { id: "generative-diff-image-ldm", name: { zh: "潜在扩散", en: "Latent Diffusion" }, papers: 520 },
            ],
          },
          {
            id: "generative-diff-video",
            name: { zh: "视频生成", en: "Video Generation" },
            children: [
              { id: "generative-diff-video-vd", name: { zh: "Video Diffusion", en: "Video Diffusion" }, papers: 420 },
              { id: "generative-diff-video-wm", name: { zh: "World Model", en: "World Model" }, papers: 320 },
            ],
          },
          {
            id: "generative-diff-3d",
            name: { zh: "三维生成", en: "3D Generation" },
            children: [
              { id: "generative-diff-3d-t23d", name: { zh: "Text-to-3D", en: "Text-to-3D" }, papers: 360 },
              { id: "generative-diff-3d-scene", name: { zh: "场景生成", en: "Scene Generation" }, papers: 220 },
            ],
          },
        ],
      },
      {
        id: "generative-found",
        name: { zh: "基础模型", en: "Foundation Model" },
        children: [
          { id: "generative-found-vision", name: { zh: "视觉基础模型", en: "Vision Foundation Model" }, papers: 480 },
          { id: "generative-found-language", name: { zh: "语言基础模型", en: "Language Foundation Model" }, papers: 620 },
          { id: "generative-found-multi", name: { zh: "多模态基础模型", en: "Multimodal Foundation Model" }, papers: 540 },
          { id: "generative-found-world", name: { zh: "世界基础模型", en: "World Foundation Model" }, papers: 260 },
        ],
      },
    ],
  },
  {
    id: "embodied",
    name: { zh: "具身智能", en: "Embodied AI" },
    description: { zh: "智能体、环境理解与机器人学习。", en: "Agents, environment understanding and robot learning." },
    children: [
      {
        id: "embodied-agent",
        name: { zh: "智能体", en: "Agent" },
        children: [
          {
            id: "embodied-agent-cog",
            name: { zh: "认知智能体", en: "Cognitive Agent" },
            children: [
              { id: "embodied-agent-cog-plan", name: { zh: "规划", en: "Planning" }, papers: 520 },
              { id: "embodied-agent-cog-memory", name: { zh: "记忆", en: "Memory" }, papers: 360 },
              { id: "embodied-agent-cog-reason", name: { zh: "推理", en: "Reasoning" }, papers: 440 },
            ],
          },
          {
            id: "embodied-agent-llm",
            name: { zh: "LLM 智能体", en: "LLM Agent" },
            children: [
              { id: "embodied-agent-llm-tool", name: { zh: "工具智能体", en: "Tool Agent" }, papers: 420 },
              { id: "embodied-agent-llm-auto", name: { zh: "自主智能体", en: "Autonomous Agent" }, papers: 380 },
              { id: "embodied-agent-llm-multi", name: { zh: "多智能体", en: "Multi-Agent" }, papers: 560 },
            ],
          },
        ],
      },
      {
        id: "embodied-env",
        name: { zh: "环境理解", en: "Environment Understanding" },
        children: [
          {
            id: "embodied-env-nav",
            name: { zh: "视觉导航", en: "Visual Navigation" },
            children: [
              { id: "embodied-env-nav-vn", name: { zh: "视觉导航", en: "Visual Navigation" }, papers: 420 },
              { id: "embodied-env-nav-vln", name: { zh: "VLN", en: "VLN" }, papers: 320 },
              { id: "embodied-env-nav-habitat", name: { zh: "Habitat", en: "Habitat" }, papers: 220 },
            ],
          },
          {
            id: "embodied-env-3d",
            name: { zh: "三维空间理解", en: "3D Spatial Understanding" },
            children: [
              { id: "embodied-env-3d-scene", name: { zh: "场景理解", en: "Scene Understanding" }, papers: 360 },
              { id: "embodied-env-3d-spatial", name: { zh: "空间推理", en: "Spatial Reasoning" }, papers: 280 },
              { id: "embodied-env-3d-mapping", name: { zh: "三维建图", en: "3D Mapping" }, papers: 240 },
            ],
          },
        ],
      },
      {
        id: "embodied-robot",
        name: { zh: "机器人学习", en: "Robot Learning" },
        children: [
          { id: "embodied-robot-manip", name: { zh: "机器人操作", en: "Robot Manipulation" }, papers: 520 },
          { id: "embodied-robot-imit", name: { zh: "模仿学习", en: "Imitation Learning" }, papers: 480 },
          { id: "embodied-robot-rl", name: { zh: "强化学习", en: "Reinforcement Learning" }, papers: 560 },
          { id: "embodied-robot-sim2real", name: { zh: "Sim2Real 迁移", en: "Sim2Real Transfer" }, papers: 280 },
        ],
      },
    ],
  },
  {
    id: "rl",
    name: { zh: "强化学习", en: "Reinforcement Learning" },
    description: { zh: "深度强化学习、离线强化学习与基于人类反馈的强化学习。", en: "Deep RL, offline RL and RL from human feedback." },
    children: [
      {
        id: "rl-deep",
        name: { zh: "深度强化学习", en: "Deep Reinforcement Learning" },
        children: [
          { id: "rl-deep-dqn", name: { zh: "DQN", en: "DQN" }, papers: 760 },
          { id: "rl-deep-ppo", name: { zh: "PPO", en: "PPO" }, papers: 820 },
          { id: "rl-deep-sac", name: { zh: "SAC", en: "SAC" }, papers: 460 },
          { id: "rl-deep-td3", name: { zh: "TD3", en: "TD3" }, papers: 280 },
        ],
      },
      {
        id: "rl-offline",
        name: { zh: "离线强化学习", en: "Offline RL" },
        children: [
          { id: "rl-offline-dataset", name: { zh: "数据集强化学习", en: "Dataset RL" }, papers: 320 },
          { id: "rl-offline-conserv", name: { zh: "保守强化学习", en: "Conservative RL" }, papers: 260 },
          { id: "rl-offline-dt", name: { zh: "决策 Transformer", en: "Decision Transformer" }, papers: 360 },
        ],
      },
      {
        id: "rl-rlhf",
        name: { zh: "RLHF", en: "RLHF" },
        children: [
          { id: "rl-rlhf-pref", name: { zh: "人类偏好学习", en: "Human Preference Learning" }, papers: 420 },
          { id: "rl-rlhf-rm", name: { zh: "奖励模型", en: "Reward Model" }, papers: 480 },
          { id: "rl-rlhf-po", name: { zh: "偏好优化", en: "Preference Optimization" }, papers: 520 },
        ],
      },
    ],
  },
  {
    id: "robotics",
    name: { zh: "机器人", en: "Robotics" },
    description: { zh: "机器人感知、规划与控制。", en: "Robot perception, planning and control." },
    children: [
      {
        id: "robotics-perc",
        name: { zh: "机器人感知", en: "Robot Perception" },
        children: [
          { id: "robotics-perc-visual", name: { zh: "视觉感知", en: "Visual Perception" }, papers: 480 },
          { id: "robotics-perc-tactile", name: { zh: "触觉感知", en: "Tactile Perception" }, papers: 280 },
          { id: "robotics-perc-multi", name: { zh: "多模态感知", en: "Multimodal Sensing" }, papers: 320 },
        ],
      },
      {
        id: "robotics-plan",
        name: { zh: "机器人规划", en: "Robot Planning" },
        children: [
          { id: "robotics-plan-motion", name: { zh: "运动规划", en: "Motion Planning" }, papers: 420 },
          { id: "robotics-plan-task", name: { zh: "任务规划", en: "Task Planning" }, papers: 380 },
          { id: "robotics-plan-long", name: { zh: "长程规划", en: "Long Horizon Planning" }, papers: 280 },
        ],
      },
      {
        id: "robotics-ctrl",
        name: { zh: "机器人控制", en: "Robot Control" },
        children: [
          { id: "robotics-ctrl-neural", name: { zh: "神经控制", en: "Neural Control" }, papers: 320 },
          { id: "robotics-ctrl-learn", name: { zh: "学习控制", en: "Learning Control" }, papers: 380 },
          { id: "robotics-ctrl-dexterous", name: { zh: "灵巧操作", en: "Dexterous Manipulation" }, papers: 340 },
        ],
      },
    ],
  },
  {
    id: "efficiency",
    name: { zh: "AI 系统与模型效率", en: "AI Efficiency" },
    description: { zh: "模型压缩、高效 Transformer 与 AI 系统。", en: "Model compression, efficient Transformers and AI systems." },
    children: [
      {
        id: "efficiency-compress",
        name: { zh: "模型压缩", en: "Model Compression" },
        children: [
          {
            id: "efficiency-compress-prune",
            name: { zh: "剪枝", en: "Pruning" },
            children: [
              { id: "efficiency-compress-prune-struct", name: { zh: "结构化剪枝", en: "Structured Pruning" }, papers: 360 },
              { id: "efficiency-compress-prune-unstruct", name: { zh: "非结构化剪枝", en: "Unstructured Pruning" }, papers: 280 },
              { id: "efficiency-compress-prune-token", name: { zh: "Token 剪枝", en: "Token Pruning" }, papers: 220 },
            ],
          },
          {
            id: "efficiency-compress-quant",
            name: { zh: "量化", en: "Quantization" },
            children: [
              { id: "efficiency-compress-quant-ptq", name: { zh: "PTQ", en: "PTQ" }, papers: 320 },
              { id: "efficiency-compress-quant-qat", name: { zh: "QAT", en: "QAT" }, papers: 240 },
              { id: "efficiency-compress-quant-llm", name: { zh: "LLM 量化", en: "LLM Quantization" }, papers: 360 },
            ],
          },
          {
            id: "efficiency-compress-distill",
            name: { zh: "蒸馏", en: "Distillation" },
            children: [
              { id: "efficiency-compress-distill-kd", name: { zh: "知识蒸馏", en: "Knowledge Distillation" }, papers: 520 },
              { id: "efficiency-compress-distill-feat", name: { zh: "特征蒸馏", en: "Feature Distillation" }, papers: 280 },
            ],
          },
        ],
      },
      {
        id: "efficiency-trans",
        name: { zh: "高效 Transformer", en: "Efficient Transformer" },
        children: [
          { id: "efficiency-trans-sparse", name: { zh: "稀疏注意力", en: "Sparse Attention" }, papers: 420 },
          { id: "efficiency-trans-linear", name: { zh: "线性注意力", en: "Linear Attention" }, papers: 320 },
          { id: "efficiency-trans-merge", name: { zh: "Token 合并", en: "Token Merging" }, papers: 240 },
          { id: "efficiency-trans-dyn", name: { zh: "动态网络", en: "Dynamic Network" }, papers: 280 },
        ],
      },
      {
        id: "efficiency-system",
        name: { zh: "AI 系统", en: "AI Systems" },
        children: [
          { id: "efficiency-system-dist", name: { zh: "分布式训练", en: "Distributed Training" }, papers: 480 },
          { id: "efficiency-system-gpu", name: { zh: "GPU 优化", en: "GPU Optimization" }, papers: 360 },
          { id: "efficiency-system-infer", name: { zh: "推理加速", en: "Inference Acceleration" }, papers: 520 },
          { id: "efficiency-system-edge", name: { zh: "边缘 AI", en: "Edge AI" }, papers: 300 },
        ],
      },
    ],
  },
  {
    id: "security",
    name: { zh: "AI 安全与可信人工智能", en: "AI Safety & Trustworthy AI" },
    description: { zh: "对抗攻击、模型安全与 AI 对齐。", en: "Adversarial attacks, model security and AI alignment." },
    children: [
      {
        id: "security-adv",
        name: { zh: "对抗攻击", en: "Adversarial Attack" },
        children: [
          { id: "security-adv-example", name: { zh: "对抗样本", en: "Adversarial Examples" }, papers: 680 },
          { id: "security-adv-robust", name: { zh: "鲁棒训练", en: "Robust Training" }, papers: 420 },
        ],
      },
      {
        id: "security-model",
        name: { zh: "模型安全", en: "Model Security" },
        children: [
          { id: "security-model-poison", name: { zh: "数据投毒", en: "Data Poisoning" }, papers: 320 },
          { id: "security-model-backdoor", name: { zh: "后门攻击", en: "Backdoor Attack" }, papers: 360 },
          { id: "security-model-jailbreak", name: { zh: "越狱攻击", en: "Jailbreak Attack" }, papers: 420 },
        ],
      },
      {
        id: "security-align",
        name: { zh: "AI 对齐", en: "AI Alignment" },
        children: [
          { id: "security-align-rlhf", name: { zh: "RLHF", en: "RLHF" }, papers: 520 },
          { id: "security-align-constitutional", name: { zh: "宪法 AI", en: "Constitutional AI" }, papers: 280 },
          { id: "security-align-value", name: { zh: "价值对齐", en: "Value Alignment" }, papers: 320 },
        ],
      },
    ],
  },
  {
    id: "applications",
    name: { zh: "AI 应用前沿方向", en: "AI Applications" },
    description: { zh: "自动驾驶、医疗 AI、科学智能与工业智能。", en: "Autonomous driving, healthcare AI, AI for science and industrial AI." },
    children: [
      {
        id: "applications-driving",
        name: { zh: "自动驾驶", en: "Autonomous Driving" },
        children: [
          { id: "applications-driving-perc", name: { zh: "感知", en: "Perception" }, papers: 520 },
          { id: "applications-driving-pred", name: { zh: "预测", en: "Prediction" }, papers: 420 },
          { id: "applications-driving-plan", name: { zh: "规划", en: "Planning" }, papers: 400 },
          { id: "applications-driving-e2e", name: { zh: "端到端驾驶", en: "End-to-End Driving" }, papers: 320 },
          { id: "applications-driving-wm", name: { zh: "世界模型", en: "World Model" }, papers: 260 },
        ],
      },
      {
        id: "applications-health",
        name: { zh: "医疗 AI", en: "Healthcare AI" },
        children: [
          { id: "applications-health-imaging", name: { zh: "医学影像", en: "Medical Imaging" }, papers: 620 },
          { id: "applications-health-drug", name: { zh: "药物发现", en: "Drug Discovery" }, papers: 480 },
          { id: "applications-health-biolm", name: { zh: "生物医学大模型", en: "Biomedical LLM" }, papers: 360 },
        ],
      },
      {
        id: "applications-science",
        name: { zh: "科学智能", en: "AI for Science" },
        children: [
          { id: "applications-science-protein", name: { zh: "蛋白质折叠", en: "Protein Folding" }, papers: 420 },
          { id: "applications-science-material", name: { zh: "材料发现", en: "Material Discovery" }, papers: 360 },
          { id: "applications-science-physics", name: { zh: "物理仿真", en: "Physics Simulation" }, papers: 300 },
        ],
      },
      {
        id: "applications-industry",
        name: { zh: "工业智能", en: "Industrial AI" },
        children: [
          { id: "applications-industry-vision", name: { zh: "工业视觉", en: "Industrial Vision" }, papers: 360 },
          { id: "applications-industry-twin", name: { zh: "数字孪生", en: "Digital Twin" }, papers: 280 },
          { id: "applications-industry-pm", name: { zh: "预测性维护", en: "Predictive Maintenance" }, papers: 240 },
        ],
      },
    ],
  },
  {
    id: "frontier",
    name: { zh: "最热门交叉方向", en: "Hot Cross-direction" },
    description: { zh: "AI Agent、世界模型、具身智能、多模态基础模型与三维基础模型。", en: "AI Agent, World Model, Embodied Intelligence, Multimodal Foundation Model and 3D Foundation Model." },
    children: [
      {
        id: "frontier-agent",
        name: { zh: "AI Agent", en: "AI Agent" },
        children: [
          { id: "frontier-agent-llm", name: { zh: "LLM Agent", en: "LLM Agent" }, papers: 520 },
          { id: "frontier-agent-code", name: { zh: "编程 Agent", en: "Coding Agent" }, papers: 360 },
          { id: "frontier-agent-research", name: { zh: "研究 Agent", en: "Research Agent" }, papers: 240 },
          { id: "frontier-agent-multi", name: { zh: "多智能体", en: "Multi-Agent" }, papers: 480 },
        ],
      },
      {
        id: "frontier-world",
        name: { zh: "World Model", en: "World Model" },
        children: [
          { id: "frontier-world-video", name: { zh: "视频世界模型", en: "Video World Model" }, papers: 320 },
          { id: "frontier-world-robot", name: { zh: "机器人世界模型", en: "Robotics World Model" }, papers: 260 },
          { id: "frontier-world-sim", name: { zh: "仿真模型", en: "Simulation Model" }, papers: 220 },
        ],
      },
      {
        id: "frontier-embodied",
        name: { zh: "具身智能", en: "Embodied Intelligence" },
        children: [
          { id: "frontier-embodied-vla", name: { zh: "视觉-语言-动作模型", en: "Vision-Language-Action Model" }, papers: 420 },
          { id: "frontier-embodied-rfm", name: { zh: "机器人基础模型", en: "Robot Foundation Model" }, papers: 320 },
          { id: "frontier-embodied-general", name: { zh: "通用机器人", en: "Generalist Robot" }, papers: 260 },
        ],
      },
      {
        id: "frontier-multimodal",
        name: { zh: "多模态基础模型", en: "Multimodal Foundation Model" },
        children: [
          { id: "frontier-multimodal-vl", name: { zh: "视觉-语言", en: "Vision-Language" }, papers: 420 },
          { id: "frontier-multimodal-av", name: { zh: "音视", en: "Audio-Visual" }, papers: 280 },
          { id: "frontier-multimodal-omni", name: { zh: "全模态 AI", en: "Omni-modal AI" }, papers: 240 },
        ],
      },
      {
        id: "frontier-3d",
        name: { zh: "三维基础模型", en: "3D Foundation Model" },
        children: [
          { id: "frontier-3d-gauss", name: { zh: "三维高斯", en: "3D Gaussian" }, papers: 300 },
          { id: "frontier-3d-nsr", name: { zh: "神经场景表示", en: "Neural Scene Representation" }, papers: 260 },
          { id: "frontier-3d-spatial", name: { zh: "空间智能", en: "Spatial Intelligence" }, papers: 220 },
        ],
      },
    ],
  },
];
