import type { Metadata } from "next";
import { VenuesTable } from "@/components/venues/venues-table";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "期刊全景",
  description: "按 CCF 等级与领域覆盖筛选全部收录的 AI 顶刊，查看影响力、录用率与方向分布。",
};

export default function JournalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="nav_journals" descKey="page_journals_desc" />
      <VenuesTable type="journal" />
    </div>
  );
}
