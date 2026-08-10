"use client";

import type { Baseline, Dataset } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { SourceLink } from "@/components/shared/source-link";

export function BaselineList({ baselines }: { baselines: Baseline[] }) {
  const { t, pick } = useI18n();
  if (!baselines.length) return <p className="text-sm text-muted-foreground">{t("list_empty")}</p>;
  return (
    <ul className="space-y-2">
      {baselines.map((b) => (
        <li key={b.id} className="rounded-lg border border-border/60 bg-card/40 p-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{pick(b.name)}</p>
            <SourceLink href={b.link} />
          </div>
          {b.description && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(b.description)}</p>
          )}
          <div className="mt-1.5 text-[11px] text-muted-foreground">
            {b.year && <span>@ {b.year}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DatasetList({ datasets }: { datasets: Dataset[] }) {
  const { t, pick } = useI18n();
  if (!datasets.length) return <p className="text-sm text-muted-foreground">{t("list_empty")}</p>;
  return (
    <ul className="space-y-2">
      {datasets.map((d) => (
        <li key={d.id} className="rounded-lg border border-border/60 bg-card/40 p-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{pick(d.name)}</p>
            <SourceLink href={d.link} />
          </div>
          {d.description && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(d.description)}</p>
          )}
          <div className="mt-1.5 text-[11px] text-muted-foreground">
            {d.year && <span>@ {d.year}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
