import type { RadarMetricKey } from "@/lib/types";

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, Math.round(v)));

// 全局最大产出（ml 方向），作为线性归一基准，与 heat-index 口径一致
const MAX_PAPERS = 15200;
// 全局最高平均被引（ml 方向），作为影响力归一基准
const MAX_CITATIONS = 61;

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

// 由真实指标派生雷达五维（0–100）。顶层方向与末级子领域共用同一套归一口径
// （与 src/lib/heat-index.ts 的 computeHeatBreakdown 一致），避免不同页面尺度不一致。
export function deriveRadar(node: RadarInput): RadarPoint[] {
  const papers = node.paperCount ?? node.papers ?? 0;
  const output = papers > 0 ? clamp((papers / MAX_PAPERS) * 100) : 0;
  const impact =
    node.avgCitations != null
      ? clamp((node.avgCitations / MAX_CITATIONS) * 50 + (node.topCitedRatio ?? 0) * 50)
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
