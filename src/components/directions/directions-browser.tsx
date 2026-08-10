"use client";

import * as React from "react";
import { directionsByHeat } from "@/lib/heat-index";
import { useI18n } from "@/lib/i18n";
import { DirectionDetailView } from "@/components/directions/direction-detail-view";
import { milestonesByDirection } from "@/lib/data/milestones";
import { bottlenecksByDirection } from "@/lib/data/bottlenecks";
import { baselinesByDirection, datasetsByDirection } from "@/lib/data/baselines";
import { venueById } from "@/lib/data/venues";
import { cn } from "@/lib/utils";

export function DirectionsBrowser() {
  const { t, pick } = useI18n();
  const list = directionsByHeat;
  const [selectedId, setSelectedId] = React.useState<string>(list[0]?.id ?? "");

  const d = list.find((x) => x.id === selectedId) ?? list[0];
  const ranked = d;
  const milestones = d ? milestonesByDirection(d.id) : [];
  const bottlenecks = d ? bottlenecksByDirection(d.id) : [];
  const baselines = d ? baselinesByDirection(d.id) : [];
  const datasets = d ? datasetsByDirection(d.id) : [];
  const topVenues = d ? d.topVenues.map((id) => venueById(id)) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold tracking-tight">{t("dir_list_title")}</h2>
            <span className="text-xs text-muted-foreground">
              {list.length} {t("dir_count")}
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-border/60">
            <ul className="divide-y divide-border/40">
              {list.map((dir, i) => {
                const active = dir.id === d?.id;
                return (
                  <li key={dir.id}>
                    <button
                      onClick={() => setSelectedId(dir.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                        active ? "bg-primary/10" : "hover:bg-muted/50",
                      )}
                    >
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: dir.color }} />
                      <span className="flex-1 truncate text-sm font-medium">{pick(dir.name)}</span>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                        #{i + 1}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="min-w-0">
          {d ? (
            <DirectionDetailView
              direction={d}
              ranked={ranked}
              milestones={milestones}
              bottlenecks={bottlenecks}
              topVenues={topVenues}
              baselines={baselines}
              datasets={datasets}
            />
          ) : (
            <p className="text-sm text-muted-foreground">{t("dir_select_hint")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
