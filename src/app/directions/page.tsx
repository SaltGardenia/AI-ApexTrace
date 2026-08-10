import type { Metadata } from "next";
import { DirectionsExplorer } from "@/components/directions/directions-explorer";

export const metadata: Metadata = {
  title: "研究方向版图",
  description: "研究方向气泡象限、热度排行与分类筛选。",
};

export default function DirectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">研究方向版图</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          从产出、影响力、增长与交叉融合多视角透视 AI 各研究方向。
        </p>
      </div>
      <DirectionsExplorer />
    </div>
  );
}
