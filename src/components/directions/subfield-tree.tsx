"use client";

import * as React from "react";
import { ChevronRight, Hash } from "lucide-react";
import type { FieldSubfield } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

interface FlatLeaf {
  id: string;
  name: { zh: string; en: string };
  papers?: number;
  path: string[];
}

function collectLeaves(nodes: FieldSubfield[], prefix: string[] = []): FlatLeaf[] {
  const out: FlatLeaf[] = [];
  for (const n of nodes) {
    const path = [...prefix, n.name.en];
    if (n.children && n.children.length > 0) {
      out.push(...collectLeaves(n.children, path));
    } else {
      out.push({ id: n.id, name: n.name, papers: n.papers, path });
    }
  }
  return out;
}

export function SubfieldTree({ subfields }: { subfields: FieldSubfield[] }) {
  const { t, pick } = useI18n();
  const leaves = React.useMemo(() => collectLeaves(subfields), [subfields]);

  return (
    <div className="space-y-5">
      {subfields.map((cat) => (
        <div key={cat.id}>
          <div className="flex items-center gap-2">
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <h4 className="text-sm font-semibold">{pick(cat.name)}</h4>
          </div>
          {cat.description && (
            <p className="ml-6 mt-1 text-xs leading-relaxed text-muted-foreground">
              {pick(cat.description)}
            </p>
          )}
          <div className="ml-6 mt-2 grid gap-1.5 sm:grid-cols-2">
            {cat.children?.map((leaf) => (
              <div
                key={leaf.id}
                id={`sub-${leaf.id}`}
                className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm scroll-mt-20"
              >
                <span className="flex items-center gap-1.5">
                  <Hash className="size-3 text-muted-foreground" />
                  {pick(leaf.name)}
                </span>
                {leaf.papers != null && (
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {leaf.papers.toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-dashed border-border/70 bg-card/30 p-3">
        <div className="text-xs text-muted-foreground">
          {t("subfield_leaves_count")}
          <span className="ml-1 font-medium text-foreground">{leaves.length}</span>
        </div>
      </div>
    </div>
  );
}
