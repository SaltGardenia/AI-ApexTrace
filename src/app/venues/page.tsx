import type { Metadata } from "next";
import { VenuesTable } from "@/components/venues/venues-table";

export const metadata: Metadata = {
  title: "会议全景",
  description: "CCF A/B/C 类顶会顶刊的等级、录用率与影响力排行。",
};

export default function VenuesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">会议全景</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          按 CCF 等级与领域筛选全部收录的顶会顶刊，查看录用率、影响力和方向分布。
        </p>
      </div>
      <VenuesTable />
    </div>
  );
}
