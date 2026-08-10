"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, Layers, Flag, Database } from "lucide-react";
import type { Direction, RankedDirection, Venue, Milestone, Bottleneck, Baseline, Dataset } from "@/lib/types";
import { directions } from "@/lib/data/directions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { DirectionCharts } from "@/components/directions/direction-charts";
import { MilestoneTree } from "@/components/directions/milestone-tree";
import { BottleneckList } from "@/components/directions/bottleneck-list";
import { BaselineList, DatasetList } from "@/components/directions/list-cards";
import { SubfieldTree } from "@/components/directions/subfield-tree";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

const STAT_KEYS: { key: DictKey; value: (d: Direction, r: RankedDirection) => string }[] = [
  { key: "stat_index", value: (_, r) => r.heatIndex.toString() },
  { key: "stat_output", value: (d) => d.papers.toLocaleString() },
  { key: "stat_citations", value: (d) => d.avgCitations.toString() },
  { key: "stat_topcited", value: (d) => `${Math.round(d.topCitedRatio * 100)}%` },
  { key: "stat_cagr", value: (d) => `${Math.round(d.growth * 100)}%` },
  { key: "stat_open", value: (d) => `${Math.round(d.openRate * 100)}%` },
];

export function DirectionDetailView({
  direction,
  ranked,
  milestones,
  bottlenecks,
  topVenues,
  baselines,
  datasets,
}: {
  direction: Direction;
  ranked: RankedDirection;
  milestones: Milestone[];
  bottlenecks: Bottleneck[];
  topVenues: (Venue | undefined)[];
  baselines: Baseline[];
  datasets: Dataset[];
}) {
  const { t, pick } = useI18n();
  const d = direction;
  const top = topVenues.filter(Boolean) as Venue[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link href="/directions" className="text-sm text-muted-foreground hover:text-foreground">
        {t("back_directions")}
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span className="size-4 rounded-full" style={{ background: d.color }} />
        <h1 className="text-2xl font-semibold tracking-tight">{pick(d.name)}</h1>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
          Heat {ranked.heatIndex}
        </span>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{pick(d.description)}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STAT_KEYS.map((s) => (
          <div key={s.key} className="rounded-xl border border-border/60 bg-card/50 p-3">
            <div className="text-[11px] text-muted-foreground">{t(s.key)}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{s.value(d, ranked)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <DirectionCharts direction={d} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("core_venues")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {top.map(
              (v) => (
                <Link
                  key={v.id}
                  href={`/venues/${v.id}`}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm hover:border-primary/40"
                >
                  <span className="font-medium">{v.name}</span>
                  <CcfBadge venue={v} />
                </Link>
              ),
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="size-4" /> {t("top_insts")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {d.topInstitutions.map((inst, i) => (
              <div key={inst.name} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                <span className="flex-1 text-sm">{inst.name}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{inst.papers}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {d.subfields && d.subfields.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="size-4" /> {t("subfield_title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubfieldTree subfields={d.subfields} />
            </CardContent>
          </Card>
        </div>
      )}

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

      {d.crossDirections.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">{t("related_dirs")}</h3>
          <div className="flex flex-wrap gap-2">
            {d.crossDirections.map((cid) => {
              const c = directions.find((x) => x.id === cid);
              if (!c) return null;
              return (
                <Link
                  key={cid}
                  href={`/directions/${cid}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:border-primary/40"
                >
                  <span className="size-2.5 rounded-full" style={{ background: c.color }} />
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
