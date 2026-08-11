"use client";

import * as React from "react";
import { VenuesTable } from "@/components/venues/venues-table";
import { VenueSearch } from "@/components/venues/venue-search";
import { PageHeader } from "@/components/shared/page-header";

export default function JournalsPage() {
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    document.title = "期刊全景 · AI-ApexTrace";
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader titleKey="nav_journals" action={<VenueSearch value={q} onChange={setQ} />} />
      <VenuesTable type="journal" q={q} onQChange={setQ} />
    </div>
  );
}
