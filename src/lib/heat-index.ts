import type { Direction, DirectionId } from "@/lib/types";
import { directions } from "@/lib/data/directions";

const WEIGHTS = {
  output: 0.4,
  impact: 0.3,
  growth: 0.2,
  ecosystem: 0.1,
} as const;

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

const normalize = (vals: number[]) => {
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  return vals.map((v) => clamp(((v - min) / span) * 100));
};

export interface HeatBreakdown {
  output: number;
  impact: number;
  growth: number;
  ecosystem: number;
  total: number;
}

export function computeHeatBreakdown(d: Direction): HeatBreakdown {
  const output = clamp((d.papers / 15200) * 100);
  const impact = clamp((d.avgCitations / 61) * 50 + d.topCitedRatio * 100 * 0.5);
  const growth = clamp(d.growth * 100 * 1.2);
  const ecosystem = clamp(d.openRate * 100);
  const total =
    output * WEIGHTS.output +
    impact * WEIGHTS.impact +
    growth * WEIGHTS.growth +
    ecosystem * WEIGHTS.ecosystem;
  return { output, impact, growth, ecosystem, total };
}

export interface RankedDirection extends Direction {
  heat: HeatBreakdown;
}

export const rankedDirections: RankedDirection[] = directions.map((d) => {
  const heat = computeHeatBreakdown(d);
  return { ...d, heatIndex: Math.round(heat.total), heat };
});

export const directionsByHeat = [...rankedDirections].sort(
  (a, b) => b.heatIndex - a.heatIndex,
);

export function directionRanking(
  metric: "heat" | "output" | "impact" | "growth",
): RankedDirection[] {
  const sorted = [...rankedDirections];
  switch (metric) {
    case "output":
      return sorted.sort((a, b) => b.papers - a.papers);
    case "impact":
      return sorted.sort((a, b) => b.avgCitations - a.avgCitations);
    case "growth":
      return sorted.sort((a, b) => b.growth - a.growth);
    default:
      return sorted.sort((a, b) => b.heatIndex - a.heatIndex);
  }
}

export const heatWeights = WEIGHTS;

export { normalize };
