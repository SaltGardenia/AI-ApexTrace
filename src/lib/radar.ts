import type { RadarMetricKey } from "@/lib/types";

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, Math.round(v)));

// 顶层方向（directions.ts）的归一基准，与 heat-index 口径一致
const DEFAULT_MAX_PAPERS = 15200;
const DEFAULT_MAX_CITATIONS = 61;

// 各数据集自身的归一基准（领域树叶子用各自数据集的最大值，避免被
// 方向级常量压扁 / 被 OpenAlex 噪声值顶满）。
export interface RadarMaxes {
  papers?: number;
  citations?: number;
}

export interface RadarPoint {
  metric: RadarMetricKey;
  value: number;
}

export type RadarInput = {
  papers?: number;
  paperCount?: number;
  avgCitations?: number | null;
  topCitedRatio?: number | null;
  growth?: number | null;
  openRate?: number | null;
  crossFields?: string[];
  crossDirections?: string[];
};

// 由真实指标派生雷达五维（0–100）。顶层方向与末级子领域各自按其数据集的
// 最大基准归一（maxes 不传时回落到方向级常量，与 heat-index.ts 口径一致），
// 避免不同页面尺度不一致或某节点被压扁/顶满。
export function deriveRadar(node: RadarInput, maxes: RadarMaxes = {}): RadarPoint[] {
  const maxPapers = maxes.papers ?? DEFAULT_MAX_PAPERS;
  const maxCit = maxes.citations ?? DEFAULT_MAX_CITATIONS;
  const papers = node.papers ?? node.paperCount ?? 0;
  const output = maxPapers > 0 && papers > 0 ? clamp((papers / maxPapers) * 100) : 0;
  const impact =
    node.avgCitations != null
      ? clamp((node.avgCitations / maxCit) * 50 + (node.topCitedRatio ?? 0) * 50)
      : 0;
  const growth = node.growth != null ? clamp(node.growth * 100 * 1.2) : 0;
  const ecosystem = node.openRate != null ? clamp(node.openRate * 100) : 0;
  const fusionCross = node.crossFields?.length ?? node.crossDirections?.length ?? 0;
  const fusion = clamp(fusionCross * 20);
  return [
    { metric: "output", value: output },
    { metric: "impact", value: impact },
    { metric: "growth", value: growth },
    { metric: "ecosystem", value: ecosystem },
    { metric: "fusion", value: fusion },
  ];
}
