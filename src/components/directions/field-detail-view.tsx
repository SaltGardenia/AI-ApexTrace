"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import type { FieldNode } from "@/lib/types";
import { pathToNode, nodePapers } from "@/lib/field-tree-utils";
import { useI18n } from "@/lib/i18n";

export function FieldDetailView({ node }: { node: FieldNode }) {
  const { t, pick } = useI18n();
  const path = pathToNode(node.id);
  const papers = nodePapers(node);
  const children = node.children ?? [];

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
