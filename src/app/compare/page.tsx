import type { Metadata } from "next";
import { CompareExplorer } from "@/components/compare/compare-explorer";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "对比分析",
  description: "对比 2-5 个研究方向的热度、增长与多维画像。",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="page_compare" descKey="page_compare_desc" />
      <CompareExplorer />
    </div>
  );
}
