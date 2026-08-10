"use client";

import * as React from "react";
import { useI18n } from "@/lib/i18n";
import { FieldTreeNav } from "@/components/directions/field-tree-nav";
import { FieldDetailView } from "@/components/directions/field-detail-view";
import { findNode, allFieldNodes, flattenTree } from "@/lib/field-tree-utils";

const FIRST_LEAF = flattenTree().find((n) => n.leaf)?.node.id ?? allFieldNodes[0]?.id ?? "";

export function DirectionsBrowser() {
  const { t } = useI18n();
  const [selectedId, setSelectedId] = React.useState<string>(FIRST_LEAF);

  const node = findNode(selectedId) ?? allFieldNodes[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <FieldTreeNav activeId={selectedId} />
        </aside>

        <div className="min-w-0">
          {node ? (
            <FieldNodeRouter nodeId={node.id} onSelect={setSelectedId} />
          ) : (
            <p className="text-sm text-muted-foreground">{t("dir_select_hint")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Minimal client router so clicking tree links updates the selected panel
// without a full page navigation.
function FieldNodeRouter({
  nodeId,
  onSelect,
}: {
  nodeId: string;
  onSelect: (id: string) => void;
}) {
  React.useEffect(() => {
    onSelect(nodeId);
  }, [nodeId, onSelect]);

  const node = findNode(nodeId);
  if (!node) return null;
  return <FieldDetailView node={node} />;
}
