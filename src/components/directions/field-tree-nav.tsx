"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { FieldNode } from "@/lib/types";
import { fieldTree } from "@/lib/data/field-tree";
import { nodePapers } from "@/lib/field-tree-utils";
import { useI18n } from "@/lib/i18n";

function TreeBranch({
  node,
  depth,
  activeId,
  defaultOpen,
}: {
  node: FieldNode;
  depth: number;
  activeId: string;
  defaultOpen: boolean;
}) {
  const { pick } = useI18n();
  const hasChildren = !!node.children?.length;
  const isLeaf = !hasChildren;
  const [open, setOpen] = React.useState(defaultOpen || depth === 0);
  const active = node.id === activeId;

  // Non-leaf nodes only toggle expansion; only leaf nodes route to a detail page.
  if (!isLeaf) {
    return (
      <li>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex w-full items-center gap-1 rounded-md px-1.5 py-1.5 text-left text-sm transition-colors hover:bg-muted/50 ${
            depth === 0 ? "font-semibold" : ""
          }`}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
        >
          <ChevronRight className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`} />
          <span className="flex-1 truncate">{pick(node.name)}</span>
          <span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground">
            {nodePapers(node).toLocaleString()}
          </span>
        </button>
        {open && (
          <ul>
            {node.children!.map((c) => (
              <TreeBranch key={c.id} node={c} depth={depth + 1} activeId={activeId} defaultOpen={defaultOpen} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/directions/${node.id}`}
        className={`flex items-center gap-1 rounded-md px-1.5 py-1.5 text-sm transition-colors ${
          active ? "bg-primary/10 text-foreground" : "hover:bg-muted/50"
        }`}
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
      >
        <span className="size-3.5 shrink-0" />
        <span className="flex-1 truncate">{pick(node.name)}</span>
        <span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground">
          {nodePapers(node).toLocaleString()}
        </span>
      </Link>
    </li>
  );
}

export function FieldTreeNav({ activeId }: { activeId: string }) {
  const { t } = useI18n();
  return (
    <nav className="overflow-hidden rounded-xl border border-border/60">
      <div className="border-b border-border/40 bg-muted/30 px-3 py-2 text-sm font-semibold tracking-tight">
        {t("field_tree_title")}
      </div>
      <ul className="p-1.5">
        {fieldTree.map((n) => (
          <TreeBranch key={n.id} node={n} depth={0} activeId={activeId} defaultOpen />
        ))}
      </ul>
    </nav>
  );
}
