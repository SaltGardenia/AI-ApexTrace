"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Bottleneck, BottleneckStatus } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";
import { SourceLink } from "@/components/shared/source-link";

const STATUS: Record<BottleneckStatus, { labelKey: DictKey; cls: string }> = {
  unsolved: { labelKey: "b_unsolved", cls: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  partial: { labelKey: "b_partial", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  solved: { labelKey: "b_solved", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
};

const FILTERS: ("all" | BottleneckStatus)[] = ["all", "unsolved", "partial", "solved"];

export function BottleneckList({ bottlenecks }: { bottlenecks: Bottleneck[] }) {
  const { t, pick } = useI18n();
  const [filter, setFilter] = React.useState<"all" | BottleneckStatus>("all");
  const list = bottlenecks
    .filter((b) => filter === "all" || b.status === filter)
    .sort((a, b) => b.priority - a.priority);

  return (
    <div>
      <div className="mb-3 flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {f === "all" ? t("b_all") : t(STATUS[f].labelKey)}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {list.map((b) => (
          <li key={b.id} className="rounded-lg border border-border/60 bg-card/40 p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm">{pick(b.text)}</p>
              <span className={cn("shrink-0 rounded border px-1.5 py-0.5 text-[10px]", STATUS[b.status].cls)}>
                {t(STATUS[b.status].labelKey)}
              </span>
              {b.link && <SourceLink href={b.link} />}
            </div>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>{t("b_source")}：{pick(b.source)}</span>
              <span>· {t("b_priority")} {b.priority}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
