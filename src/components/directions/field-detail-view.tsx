"use client";

import * as React from "react";

// 由管线真实指标派生雷达五维（0–100，真实驱动，避免手写假值）
function deriveRadarFromReal(node: any) {
  const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, Math.round(v)));
  const out = node.paperCount ? clamp((Math.log10(node.paperCount) - 2) * 32) : 0;     // 体量
  const imp = node.avgCitations ? clamp(node.avgCitations / 5) : 0;                     // 影响力(平均被引)
  const gro = node.growth != null ? clamp(node.growth * 150) : 0;                       // 增长(CAGR)
  const eco = node.openRate != null ? clamp(node.openRate * 100) : 0;                   // 生态(开放率)
  const fus = node.crossFields?.length ? clamp(node.crossFields.length * 20) : 0;       // 融合(跨领域)
  return [
    { metric: "output", value: out },
    { metric: "impact", value: imp },
    { metric: "growth", value: gro },
    { metric: "ecosystem", value: eco },
    { metric: "fusion", value: fus },
  ] as { metric: RadarMetricKey; value: number }[];
}

import Link from "next/link";
import { ArrowUpRight, Building2, Layers, Flag, Database, ChevronRight } from "lucide-react";
import type { FieldNode, Venue, RadarMetricKey } from "@/lib/types";
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
  { key: "stat_citations", value: (n) => (n.realMetrics ? (n.avgCitations ?? 0).toString() : "—") },
  { key: "stat_topcited", value: (n) => (n.realMetrics && n.topCitedRatio != null ? `${Math.round(n.topCitedRatio * 100)}%` : "—") },
  { key: "stat_cagr", value: (n) => (n.realMetrics && n.growth != null ? `${Math.round(n.growth * 100)}%` : "—") },
  { key: "stat_open", value: (n) => (n.realMetrics && n.openRate != null ? `${Math.round(n.openRate * 100)}%` : "—") },
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

  // 真实来源全称 → 已知 venue（模糊匹配）以支持跳转；匹配不到则纯文本展示
  const VENUE_KEYWORDS: Record<string, string> = {
    "neurips": "neurips", "nips": "neurips", "icml": "icml", "iclr": "iclr", "cvpr": "cvpr",
    "iccv": "iccv", "eccv": "eccv", "aaai": "aaai", "acl": "acl", "emnlp": "emnlp", "naacl": "naacl",
    "coling": "coling", "ijcai": "ijcai", "corl": "corl", "mlsys": "mlsys", "wacv": "wacv", "iros": "iros",
    "icra": "icra", "kdd": "kdd", "sigir": "sigir", "www": "www", "siggraph": "siggraph", "acmmm": "acmmm",
    "tpami": "tpami", "ijcv": "ijcv", "jmlr": "jmlr", "tmlr": "tmlr", "arxiv": "arxiv", "nature": "nature-mi",
  };
  const top: any[] = (node.topVenues ?? []).map((name) => {
    const low = name.toLowerCase();
    const key = Object.keys(VENUE_KEYWORDS).find((k) => low.includes(k));
    const v = key ? venueById(VENUE_KEYWORDS[key]) : undefined;
    return v ? { ...v, displayName: name } : { id: name, name, displayName: name, isRaw: true };
  });
  const milestones = milestonesByDirection(node.id);
  const bottlenecks = bottlenecksByDirection(node.id);
  const baselines = baselinesByDirection(node.id);
  const datasets = datasetsByDirection(node.id);
  const cross = node.crossFields ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {onSelect ? (
        <button
          onClick={() => goTo("")}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-3.5 -rotate-180" />
          {t("back_directions")}
        </button>
      ) : (
        <Link
          href="/directions"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-3.5 -rotate-180" />
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

      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/30 px-4 py-3">
        <span className="size-4 rounded-full shadow-sm ring-2 ring-background" style={{ background: color }} />
        <h1 className="text-2xl font-semibold tracking-tight">{pick(node.name)}</h1>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {node.description ? pick(node.description) : ""}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STAT_KEYS.map((s) => (
          <div
            key={s.key}
            className="group rounded-xl border border-border/60 bg-gradient-to-b from-card to-card/40 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="text-[11px] text-muted-foreground">{t(s.key)}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{s.value(node)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <DirectionCharts
          direction={{
            color,
            radar: node.realMetrics
              ? deriveRadarFromReal(node)
              : [],
            yearly: node.realMetrics ? node.yearly ?? [] : [],
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
              (v as any).isRaw ? (
                <span
                  key={v.id}
                  className="rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm text-muted-foreground"
                  title="OpenAlex 来源（未在场馆库收录）"
                >
                  {(v as any).displayName}
                </span>
              ) : (
                <Link
                  key={v.id}
                  href={`/venues/${v.id}`}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm hover:border-primary/40"
                >
                  <span className="font-medium">{(v as any).displayName}</span>
                  <CcfBadge venue={v} />
                </Link>
              )
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                <Building2 className="size-3.5" />
              </span>
              {t("top_insts")}
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
              <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                <Layers className="size-3.5" />
              </span>
              {t("tab_milestone")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MilestoneTree milestones={milestones} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                <Flag className="size-3.5" />
              </span>
              {t("tab_bottleneck")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BottleneckList bottlenecks={bottlenecks} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                <Layers className="size-3.5" />
              </span>
              {t("card_baselines")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BaselineList baselines={baselines} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-primary">
                <Database className="size-3.5" />
              </span>
              {t("card_datasets")}
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
