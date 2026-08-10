"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Layers, Building2 } from "lucide-react";
import type { FieldNode } from "@/lib/types";
import { pathToNode, nodePapers } from "@/lib/field-tree-utils";
import { directionById } from "@/lib/data/directions";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { DirectionCharts } from "@/components/directions/direction-charts";
import { venueById } from "@/lib/data/venues";
import { useI18n } from "@/lib/i18n";

export function FieldDetailView({ node }: { node: FieldNode }) {
  const { t, pick } = useI18n();
  const path = pathToNode(node.id);
  const papers = nodePapers(node);
  const children = node.children ?? [];
  const direction = directionById(node.id as never);
  const topVenues = direction ? direction.topVenues.map((id) => venueById(id)) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/directions" className="text-sm text-muted-foreground hover:text-foreground">
        {t("back_directions")}
      </Link>

      <nav className="mt-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {path.map((p, i) => (
          <span key={p.id} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3" />}
            <Link href={`/directions/${p.id}`} className="hover:text-foreground">
              {pick(p.name)}
            </Link>
          </span>
        ))}
      </nav>

      <div className="mt-3 flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{pick(node.name)}</h1>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {node.description ? pick(node.description) : t("field_no_children")}
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3 py-2 text-sm">
        <Layers className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground">{t("field_papers")}</span>
        <span className="font-semibold tabular-nums">{papers.toLocaleString()}</span>
      </div>

      {direction && (
        <div className="mt-6 space-y-6">
          <DirectionCharts direction={direction} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/40 p-3">
              <div className="mb-2 text-sm font-medium">{t("core_venues")}</div>
              <div className="flex flex-wrap gap-2">
                {topVenues.filter(Boolean).map((v) => (
                  <Link
                    key={v!.id}
                    href={`/venues/${v!.id}`}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm hover:border-primary/40"
                  >
                    <span className="font-medium">{v!.name}</span>
                    <CcfBadge venue={v!} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Building2 className="size-4" /> {t("top_insts")}
              </div>
              <div className="space-y-2">
                {direction.topInstitutions.map((inst, i) => (
                  <div key={inst.name} className="flex items-center gap-3">
                    <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                    <span className="flex-1 text-sm">{inst.name}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">{inst.papers}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {children.length > 0 ? (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">{t("field_children")}</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {children.map((c) => (
              <Link
                key={c.id}
                href={`/directions/${c.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/40 px-3 py-2.5 hover:border-primary/40"
              >
                <span className="truncate text-sm font-medium">{pick(c.name)}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {nodePapers(c).toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-border/60 px-3 py-4 text-center text-sm text-muted-foreground">
          {t("field_no_children")}
        </div>
      )}
    </div>
  );
}
