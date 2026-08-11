// 管线生成的真实统计数据加载器。
// 数据由 scripts/pipeline 采集 OpenAlex/Crossref/arXiv 多源交叉印证后生成，
// 落盘到 src/lib/data/generated/field-stats.json。
// 前端按节点 id 读取 paperCount 等真实指标，注入领域树骨架（field-tree.ts）。

export type Confidence = "high" | "medium" | "low";

export interface FieldStatSource {
  oa_phrase: number | null;
  oa_concept: number | null;
  crossref: number | null;
  arxiv: number | null;
}

export interface FieldStat {
  id: string;
  zh: string;
  en: string;
  path: string[];
  paperCount: number; // 多源交叉后的真实论文数（绝对数）
  paperCountNormalized: number; // 归一化值（用于图表视觉，保留相对排序）
  confidence: Confidence;
  corroborated: boolean; // Crossref/arXiv 是否佐证该方向有真实体量
  sources: FieldStatSource;
  yearly?: { year: number; papers: number }[]; // 年份分布（管线后续补全）
}

export interface FieldStatsData {
  generatedAt: string;
  method: string;
  sources: string[];
  leaves: FieldStat[];
}

import statsJson from "./field-stats.json";

const data = statsJson as FieldStatsData;
const byId = new Map(data.leaves.map((l) => [l.id, l]));

export function getFieldStat(id: string): FieldStat | undefined {
  return byId.get(id);
}

export function allFieldStats(): FieldStat[] {
  return data.leaves;
}

export function fieldStatsMeta() {
  return { generatedAt: data.generatedAt, method: data.method, sources: data.sources };
}
