"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import type { FieldNode } from "@/lib/types";
import { pathToNode, nodePapers } from "@/lib/field-tree-utils";
import { useI18n } from "@/lib/i18n";

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

  // In-page SPA navigation: use buttons to switch panels without a full reload.
  // Fallback to <Link> only when no handler is supplied (deep-link route).
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

  // Only the smallest sub-fields (leaves) have a dedicated detail page.
  // Non-leaf nodes act as navigational groupings only.
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
        <h1 className="text-2xl font-semibold tracking-tight">{pick(node.name)}</h1>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
          {t("field_leaf_badge")}
        </span>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {node.description ? pick(node.description) : t("field_no_children")}
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3 py-2 text-sm">
        <Layers className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground">{t("field_papers")}</span>
        <span className="font-semibold tabular-nums">{papers.toLocaleString()}</span>
      </div>
    </div>
  );
}
