import type { Bilingual } from "@/lib/i18n/types";
import { directions } from "@/lib/data/directions";
import { colorById } from "@/lib/chart-palette";

export interface TmNode {
  name: string;
  label: Bilingual;
  color?: string;
  size?: number;
  papers?: number;
  children?: TmNode[];
}

// Relative contribution weights for each sub-field within its parent field.
// The actual area of each sub-field = parent.papers * weight / sum(weights),
// so the sub-rectangles always sum exactly to the parent's total output.
const SUBFIELDS: Record<string, { label: Bilingual; w: number }[]> = {
  ai: [
    { label: { zh: "知识表示与推理", en: "Knowledge & Reasoning" }, w: 3 },
    { label: { zh: "多智能体", en: "Multi-Agent" }, w: 3 },
    { label: { zh: "规划调度", en: "Planning & Scheduling" }, w: 2 },
    { label: { zh: "不确定性推理", en: "Uncertain Reasoning" }, w: 2 },
  ],
  cv: [
    { label: { zh: "图像识别", en: "Image Recognition" }, w: 4 },
    { label: { zh: "目标检测", en: "Object Detection" }, w: 3 },
    { label: { zh: "图像分割", en: "Segmentation" }, w: 3 },
    { label: { zh: "三维视觉", en: "3D Vision" }, w: 2 },
    { label: { zh: "视频理解", en: "Video Understanding" }, w: 2 },
  ],
  nlp: [
    { label: { zh: "大语言模型", en: "Large Language Models" }, w: 5 },
    { label: { zh: "检索增强生成", en: "Retrieval-Augmented" }, w: 2 },
    { label: { zh: "推理能力", en: "Reasoning" }, w: 2 },
    { label: { zh: "Agent 能力", en: "Agent Capabilities" }, w: 2 },
    { label: { zh: "NLP 应用", en: "NLP Applications" }, w: 2 },
  ],
  ml: [
    { label: { zh: "表征学习", en: "Representation Learning" }, w: 4 },
    { label: { zh: "学习范式", en: "Learning Paradigms" }, w: 3 },
    { label: { zh: "小样本学习", en: "Few-shot Learning" }, w: 2 },
    { label: { zh: "持续学习", en: "Continual Learning" }, w: 2 },
  ],
  robotics: [
    { label: { zh: "感知", en: "Perception" }, w: 3 },
    { label: { zh: "规划", en: "Planning" }, w: 3 },
    { label: { zh: "控制", en: "Control" }, w: 3 },
    { label: { zh: "操作", en: "Manipulation" }, w: 2 },
  ],
  multimodal: [
    { label: { zh: "图文理解", en: "Vision-Language" }, w: 3 },
    { label: { zh: "多模态生成", en: "Multimodal Generation" }, w: 3 },
    { label: { zh: "视觉推理", en: "Visual Reasoning" }, w: 2 },
  ],
  ai4science: [
    { label: { zh: "蛋白质结构", en: "Protein Structure" }, w: 3 },
    { label: { zh: "分子生成", en: "Molecule Generation" }, w: 3 },
    { label: { zh: "材料与气候", en: "Materials & Climate" }, w: 2 },
    { label: { zh: "神经微分方程", en: "Neural ODEs" }, w: 1 },
  ],
  datamining: [
    { label: { zh: "图学习", en: "Graph Learning" }, w: 3 },
    { label: { zh: "推荐系统", en: "Recommender Systems" }, w: 3 },
    { label: { zh: "信息检索", en: "Information Retrieval" }, w: 2 },
    { label: { zh: "知识图谱", en: "Knowledge Graphs" }, w: 2 },
  ],
  graphics: [
    { label: { zh: "神经渲染", en: "Neural Rendering" }, w: 3 },
    { label: { zh: "三维重建", en: "3D Reconstruction" }, w: 3 },
    { label: { zh: "扩散生成", en: "Diffusion Generation" }, w: 3 },
    { label: { zh: "交互多媒体", en: "Interactive Media" }, w: 1 },
  ],
  security: [
    { label: { zh: "对抗鲁棒", en: "Adversarial Robustness" }, w: 3 },
    { label: { zh: "隐私保护", en: "Privacy Preservation" }, w: 3 },
    { label: { zh: "模型水印", en: "Model Watermarking" }, w: 2 },
    { label: { zh: "对齐安全", en: "Alignment Safety" }, w: 2 },
  ],
  hci: [
    { label: { zh: "可解释交互", en: "Explainable Interaction" }, w: 3 },
    { label: { zh: "生成式界面", en: "Generative UI" }, w: 3 },
    { label: { zh: "情感计算", en: "Affective Computing" }, w: 2 },
    { label: { zh: "可用性", en: "Usability" }, w: 2 },
  ],
  theory: [
    { label: { zh: "学习理论", en: "Learning Theory" }, w: 3 },
    { label: { zh: "优化收敛", en: "Optimization" }, w: 3 },
    { label: { zh: "博弈理论", en: "Game Theory" }, w: 2 },
    { label: { zh: "因果推断", en: "Causal Inference" }, w: 2 },
  ],
};

export function buildFieldTreemap(): TmNode[] {
  return directions.map((d) => {
    const subs = SUBFIELDS[d.id] ?? [];
    const totalW = subs.reduce((s, x) => s + x.w, 0) || 1;
    const color = colorById(d.id);
    return {
      name: d.id,
      label: d.name,
      color,
      papers: d.papers,
      children: subs.map((s) => ({
        name: `${d.id}:${s.label.en}`,
        label: s.label,
        papers: Math.round((d.papers * s.w) / totalW),
        size: s.w,
      })),
    };
  });
}

// Flat lookup used by the custom treemap renderer / tooltip.
export function treemapInfo(data: TmNode[]): Map<string, { color: string; papers: number; label: Bilingual }> {
  const m = new Map<string, { color: string; papers: number; label: Bilingual }>();
  for (const cat of data) {
    m.set(cat.name, { color: cat.color!, papers: cat.papers!, label: cat.label });
    for (const sub of cat.children ?? []) {
      m.set(sub.name, { color: cat.color!, papers: sub.papers!, label: sub.label });
    }
  }
  return m;
}
