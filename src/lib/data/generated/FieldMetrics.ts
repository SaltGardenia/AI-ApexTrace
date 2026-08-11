// 管线生成的末级真实指标加载器（年份/来源/引用/开放率/增长）。
// 数据由 scripts/pipeline 抓取 OpenAlex 后生成，落盘到 src/lib/data/generated/field-metrics.json。
// 前端按节点 id 读取，注入领域树叶子节点。

export interface FieldMetric {
  id: string;
  paperCount: number;
  yearly: { year: number; papers: number }[];
  topVenues: string[]; // 真实来源全称（OpenAlex source.display_name）
  topInstitutions: { name: string; papers: number }[];
  avgCitations: number; // 采样论文平均被引
  topCitedRatio: number; // 高引(>=10 被引)占比
  openRate: number; // 开放获取占比
  growth: number; // 逐年 CAGR
}

export interface FieldMetricsData {
  generatedAt: string;
  method: string;
  sources: string[];
  leaves: FieldMetric[];
}

import metricsJson from "./field-metrics.json";

const data = metricsJson as FieldMetricsData;
const byId = new Map(data.leaves.map((l) => [l.id, l]));

export function getFieldMetric(id: string): FieldMetric | undefined {
  return byId.get(id);
}

export function allFieldMetrics(): FieldMetric[] {
  return data.leaves;
}

export function fieldMetricsMeta() {
  return { generatedAt: data.generatedAt, method: data.method, sources: data.sources };
}
