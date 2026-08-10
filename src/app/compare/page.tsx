import type { Metadata } from "next";
import { CompareExplorer } from "@/components/compare/compare-explorer";

export const metadata: Metadata = {
  title: "对比分析",
  description: "对比 2-5 个研究方向的热度、增长与多维画像。",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">对比分析</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          并排对比研究方向的热度曲线、增长率与多维画像，发现交叉与差异。
        </p>
      </div>
      <CompareExplorer />
    </div>
  );
}
