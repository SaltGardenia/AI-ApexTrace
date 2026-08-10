"use client";

import type { FieldNode } from "@/lib/types";
import { fieldTree } from "@/lib/data/field-tree";
import { useI18n } from "@/lib/i18n";

export function FieldTreeNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const { t, pick } = useI18n();
  return (
    <nav className="overflow-hidden rounded-xl border border-border/60">
      <div className="border-b border-border/40 bg-muted/30 px-3 py-2 text-sm font-semibold tracking-tight">
        {t("field_tree_title")}
      </div>
      <ul className="p-1.5">
        {fieldTree.map((n: FieldNode) => {
          const active = n.id === activeId;
          return (
            <li key={n.id}>
              <button
                onClick={() => onSelect(n.id)}
                className={`flex w-full items-center gap-1 rounded-md px-1.5 py-1.5 text-left text-sm font-semibold transition-colors ${
                  active ? "bg-primary/10 text-foreground" : "hover:bg-muted/50"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="flex-1 truncate">{pick(n.name)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
