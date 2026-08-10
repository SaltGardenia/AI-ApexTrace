import type { Metadata } from "next";
import { DirectionsExplorer } from "@/components/directions/directions-explorer";
import { CompareExplorer } from "@/components/compare/compare-explorer";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "研究方向版图",
  description: "研究方向气泡象限、热度排行与分类筛选，以及多维对比分析。",
};

export default function DirectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="page_directions" descKey="page_directions_desc" />
      <DirectionsExplorer />
      <section className="mt-10">
        <h2 className="mb-1 text-lg font-semibold">对比分析</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          对比 2-5 个研究方向的热度、增长与多维画像。
        </p>
        <CompareExplorer />
      </section>
    </div>
  );
}
