"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, Layers, Flag, Database, ChevronRight } from "lucide-react";
import type { FieldNode } from "@/lib/types";
import { pathToNode, nodePapers, topLevelId, findNode } from "@/lib/field-tree-utils";
import { colorById } from "@/lib/chart-palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { DirectionCharts } from "@/components/directions/direction-charts";
import { MilestoneTree } from "@/components/directions/milestone-tree";
import { BottleneckList } from "@/components/directions/bottleneck-list";
import { BaselineList, DatasetList } from "@/components/directions/list-cards";
import { milestonesByDirection } from "@/lib/data/milestones";
import { bottlenecksByDirection } from "@/lib/data/bottlenecks";
import { baselinesByDirection, datasetsByDirection } from "@/lib/data/baselines";
import { venueById } from "@/lib/data/venues";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

const STAT_KEYS: { key: DictKey; value: (n: FieldNode) => string }[] = [
  { key: "stat_index", value: () => "0" },
  { key: "stat_output", value: (n) => nodePapers(n).toLocaleString() },
  { key: "stat_citations", value: (n) => (n.avgCitations ?? 0).toString() },
  { key: "stat_topcited", value: (n) => `${Math.round((n.topCitedRatio ?? 0) * 100)}%` },
  { key: "stat_cagr", value: (n) => `${Math.round((n.growth ?? 0) * 100)}%` },
  { key: "stat_open", value: (n) => `${Math.round((n.openRate ?? 0) * 100)}%` },
];

export function FieldDetailView({
  node,
  onSelect,
}: {
  node: FieldNode;
  onSelect?: (id: string) => void;
}) {
  const { t, pick } = useI18n();
  const path = pathToNode(node.id);
  const papers = nodePapers(node);
  const isLeaf = !node.children?.length;
  const color = colorById(topLevelId(node.id));

  const goTo = (id: string) => (onSelect ? onSelect(id) : undefined);
  const Crumb = ({ id, label }: { id: string; label: string }) =>
    onSelect ? (
      <button onClick={() => goTo(id)} className="hover:text-foreground">
        {label}
      </button>
    ) : (
      <Link href={`/directions/${id}`} className="hover:text-foreground">
        {label}
      </Link>
    );

  // Non-leaf nodes act as navigational groupings only (no detail page).
  if (!isLeaf) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {onSelect ? (
          <button onClick={() => goTo("")} className="text-sm text-muted-foreground hover:text-foreground">
            {t("back_directions")}
          </button>
        ) : (
          <Link href="/directions" className="text-sm text-muted-foreground hover:text-foreground">
            {t("back_directions")}
          </Link>
        )}
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{pick(node.name)}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {node.description ? pick(node.description) : ""}
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3 py-2 text-sm">
          <Layers className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">{t("field_papers")}</span>
          <span className="font-semibold tabular-nums">{papers.toLocaleString()}</span>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{t("field_select_leaf_hint")}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {node.children!.map((c) =>
            onSelect ? (
              <button
                key={c.id}
                onClick={() => goTo(c.id)}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/40 px-3 py-2.5 text-left hover:border-primary/40"
              >
                <span className="truncate text-sm font-medium">{pick(c.name)}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {nodePapers(c).toLocaleString()}
                </span>
              </button>
            ) : (
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
            ),
          )}
        </div>
      </div>
    );
  }

  const top = (node.topVenues ?? []).map((id) => venueById(id)).filter(Boolean) as NonNullable<ReturnType<typeof venueById>>[];
  const milestones = milestonesByDirection(node.id);
  const bottlenecks = bottlenecksByDirection(node.id);
  const baselines = baselinesByDirection(node.id);
  const datasets = datasetsByDirection(node.id);
  const cross = node.crossFields ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {onSelect ? (
        <button onClick={() => goTo("")} className="text-sm text-muted-foreground hover:text-foreground">
          {t("back_directions")}
        </button>
      ) : (
        <Link href="/directions" className="text-sm text-muted-foreground hover:text-foreground">
          {t("back_directions")}
        </Link>
      )}

      <nav className="mt-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {path.slice(0, -1).map((p) => (
          <span key={p.id} className="flex items-center gap-1">
            <Crumb id={p.id} label={pick(p.name)} />
            <ChevronRight className="size-3" />
          </span>
        ))}
        <span className="font-medium text-foreground">{pick(node.name)}</span>
      </nav>

      <div className="mt-3 flex items-center gap-3">
        <span className="size-4 rounded-full" style={{ background: color }} />
        <h1 className="text-2xl font-semibold tracking-tight">{pick(node.name)}</h1>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {node.description ? pick(node.description) : ""}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STAT_KEYS.map((s) => (
          <div key={s.key} className="rounded-xl border border-border/60 bg-card/50 p-3">
            <div className="text-[11px] text-muted-foreground">{t(s.key)}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{s.value(node)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <DirectionCharts
          direction={{
            color,
            radar: node.radar ?? [],
            yearly: node.yearly ?? [],
          }}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("core_venues")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {top.map((v) => (
              <Link
                key={v.id}
                href={`/venues/${v.id}`}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm hover:border-primary/40"
              >
                <span className="font-medium">{v.name}</span>
                <CcfBadge venue={v} />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="size-4" /> {t("top_insts")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(node.topInstitutions ?? []).map((inst, i) => (
              <div key={inst.name} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                <span className="flex-1 text-sm">{inst.name}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{inst.papers}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="size-4" /> {t("tab_milestone")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MilestoneTree milestones={milestones} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Flag className="size-4" /> {t("tab_bottleneck")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BottleneckList bottlenecks={bottlenecks} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="size-4" /> {t("card_baselines")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BaselineList baselines={baselines} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="size-4" /> {t("card_datasets")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DatasetList datasets={datasets} />
          </CardContent>
        </Card>
      </div>

      {cross.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">{t("related_dirs")}</h3>
          <div className="flex flex-wrap gap-2">
            {cross.map((cid) => {
              const c = findNode(cid);
              if (!c) return null;
              return (
                <Link
                  key={cid}
                  href={`/directions/${cid}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:border-primary/40"
                >
                  <span className="size-2.5 rounded-full" style={{ background: colorById(topLevelId(cid)) }} />
                  {pick(c.name)}
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
