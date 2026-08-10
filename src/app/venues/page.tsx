import type { Metadata } from "next";
import { VenuesTable } from "@/components/venues/venues-table";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "会议全景",
  description: "CCF A/B/C 类顶会顶刊的等级、录用率与影响力排行。",
};

export default function VenuesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="page_venues" descKey="page_venues_desc" />
      <VenuesTable />
    </div>
  );
}
