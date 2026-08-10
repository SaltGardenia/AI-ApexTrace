"use client";

import * as React from "react";
import { ChevronRight, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Milestone } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

interface TreeNode {
  node: Milestone;
  children: TreeNode[];
}

function buildForest(list: Milestone[]): TreeNode[] {
  const byId = new Map(list.map((m) => [m.id, m]));
  const nodes = list.map((m) => ({ node: m, children: [] as TreeNode[] }));
  const nodeMap = new Map(nodes.map((n) => [n.node.id, n]));
  const roots: TreeNode[] = [];
  for (const n of nodes) {
    const parents = n.node.parentIds
      .map((p) => nodeMap.get(p))
      .filter((x): x is TreeNode => Boolean(x));
    if (parents.length === 0) roots.push(n);
    else for (const p of parents) p.children.push(n);
  }
  // 防止孤立但 parent 不在本方向的数据作为根
  return roots.length ? roots : nodes;
}

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  const { t, pick } = useI18n();
  const [open, setOpen] = React.useState(true);
  const hasChildren = node.children.length > 0;
  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-muted/50"
        style={{ paddingLeft: depth * 16 + 8 }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-90")}
          />
        ) : (
          <span className="ml-3.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
        )}
         <span className="shrink-0 text-xs font-mono text-muted-foreground">{node.node.year}</span>
         <span className="text-sm font-medium">{pick(node.node.title)}</span>
          {node.node.nodeType === "leaf" && (
           <span className="ml-auto rounded bg-emerald-500/15 px-1.5 text-[10px] text-emerald-400">{t("ms_sota")}</span>
         )}
      </button>
      {hasChildren && open && (
        <div className="relative ml-4 border-l border-border/60">
          {node.children.map((c) => (
            <TreeItem key={c.node.id} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MilestoneTree({ milestones }: { milestones: Milestone[] }) {
  const { t, pick } = useI18n();
  const forest = React.useMemo(() => buildForest(milestones), [milestones]);
  if (!forest.length) return <p className="text-sm text-muted-foreground">{t("ms_empty")}</p>;
  return (
    <div className="space-y-1">
      <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <GitBranch className="size-3.5" /> {t("ms_intro")}
      </div>
      {forest.map((root) => (
        <TreeItem key={root.node.id} node={root} depth={0} />
      ))}
    </div>
  );
}
