"use client";

import * as React from "react";
import { VenuesTable } from "@/components/venues/venues-table";
import { VenueSearch } from "@/components/venues/venue-search";
import { PageHeader } from "@/components/shared/page-header";

export default function VenuesPage() {
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    document.title = "会议全景 · AI-ApexTrace";
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="page_venues" action={<VenueSearch value={q} onChange={setQ} />} />
      <VenuesTable type="conference" q={q} onQChange={setQ} />
    </div>
  );
}
