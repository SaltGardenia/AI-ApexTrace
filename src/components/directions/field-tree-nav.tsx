"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import type { FieldNode } from "@/lib/types";
import { fieldTree } from "@/lib/data/field-tree";
import { pathToNode } from "@/lib/field-tree-utils";
import { useI18n } from "@/lib/i18n";

// 判断 activeId 是否落在 node 子树（含自身）内
function isSelfOrDescendant(node: FieldNode, activeId: string): boolean {
  if (node.id === activeId) return true;
  return (node.children ?? []).some((c) => isSelfOrDescendant(c, activeId));
}

function TreeBranch({
  node,
  depth,
  activeId,
  activePathIds,
  expanded,
  onSelect,
}: {
  node: FieldNode;
  depth: number;
  activeId: string;
  activePathIds: Set<string>;
  expanded: boolean;
  onSelect: (id: string) => void;
}) {
  const { pick } = useI18n();
  const hasChildren = !!node.children?.length;
  const isLeaf = !hasChildren;
  const active = node.id === activeId;
  // active 节点自身、其子孙、或其祖先链上的节点都应自动展开
  const onActivePath = activePathIds.has(node.id);
  const descendantActive = isSelfOrDescendant(node, activeId);

  const [open, setOpen] = React.useState(expanded || onActivePath || descendantActive);

  // 全局"展开全部 / 折叠全部"同步；同时保证 active 路径始终展开
  React.useEffect(() => {
    setOpen(expanded || onActivePath || descendantActive);
  }, [expanded, onActivePath, descendantActive]);

  // 非叶子节点：箭头切换展开，标签跳转分组详情页
  if (!isLeaf) {
    return (
      <li>
        <div
          className={`flex w-full items-center gap-1 rounded-md px-1.5 py-1.5 text-left text-sm transition-colors hover:bg-muted/50 ${
            depth === 0 ? "font-semibold" : ""
          } ${active ? "bg-primary/10" : ""}`}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
        >
          <button
            onClick={() => setOpen((o) => !o)}
            className="shrink-0 rounded p-0.5 hover:bg-muted"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <ChevronRight className={`size-3.5 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`} />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`flex-1 truncate text-left ${active ? "text-foreground" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {pick(node.name)}
          </button>
        </div>
        {open && (
          <ul>
            {node.children!.map((c) => (
              <TreeBranch key={c.id} node={c} depth={depth + 1} activeId={activeId} activePathIds={activePathIds} expanded={expanded} onSelect={onSelect} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => onSelect(node.id)}
        className={`flex w-full items-center gap-1 rounded-md px-1.5 py-1.5 text-left text-sm transition-colors ${
          active ? "bg-primary/10 text-foreground" : "hover:bg-muted/50"
        }`}
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
        aria-current={active ? "page" : undefined}
      >
        <span className="size-3.5 shrink-0" />
        <span className="flex-1 truncate">{pick(node.name)}</span>
      </button>
    </li>
  );
}

export function FieldTreeNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const { t } = useI18n();
  const [expanded, setExpanded] = React.useState(false);

  // active 节点的祖先链 id 集合，用于自动展开整条路径
  const activePathIds = React.useMemo(
    () => new Set(activeId ? pathToNode(activeId).map((n) => n.id) : []),
    [activeId],
  );

  return (
    <nav className="overflow-hidden rounded-xl border border-border/60">
      <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-3 py-2">
        <span className="text-sm font-semibold tracking-tight">{t("field_tree_title")}</span>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="rounded-md px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {expanded ? t("field_tree_collapse") : t("field_tree_expand")}
        </button>
      </div>
      <ul className="p-1.5">
        {fieldTree.map((n) => (
          <TreeBranch key={n.id} node={n} depth={0} activeId={activeId} activePathIds={activePathIds} expanded={expanded} onSelect={onSelect} />
        ))}
      </ul>
    </nav>
  );
}
