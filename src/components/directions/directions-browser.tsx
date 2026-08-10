"use client";

import * as React from "react";
import { useI18n } from "@/lib/i18n";
import { FieldTreeNav } from "@/components/directions/field-tree-nav";
import { FieldDetailView } from "@/components/directions/field-detail-view";
import { findNode, allFieldNodes } from "@/lib/field-tree-utils";

const FIRST_TOP = allFieldNodes[0]?.id ?? "";

export function DirectionsBrowser({ initialId }: { initialId?: string }) {
  const { t } = useI18n();
  const [selectedId, setSelectedId] = React.useState<string>(initialId || FIRST_TOP);

  const handleSelect = React.useCallback((id: string) => {
    setSelectedId(id || FIRST_TOP);
  }, []);

  // Keep the URL in sync for deep-linking / refresh, without full navigation.
  React.useEffect(() => {
    if (!selectedId) return;
    window.history.replaceState(null, "", `/directions/${selectedId}`);
  }, [selectedId]);

  const node = findNode(selectedId) ?? allFieldNodes[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <FieldTreeNav activeId={selectedId} onSelect={handleSelect} />
        </aside>

        <div className="min-w-0">
          {node ? (
            <FieldDetailView node={node} onSelect={handleSelect} />
          ) : (
            <p className="text-sm text-muted-foreground">{t("dir_select_hint")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
