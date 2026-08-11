"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { FieldTreeNav } from "@/components/directions/field-tree-nav";
import { FieldDetailView } from "@/components/directions/field-detail-view";
import { FieldTreemap } from "@/components/directions/field-treemap";
import { findNode } from "@/lib/field-tree-utils";

export function DirectionsBrowser() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  // URL is the single source of truth: /directions -> treemap, /directions/{id} -> detail.
  const match = pathname?.match(/^\/directions\/(.+)$/);
  const selectedId = match ? match[1] : "";
  const node = selectedId ? findNode(selectedId) : undefined;
  const showDetail = !!node;

  const goTo = React.useCallback(
    (id: string) => {
      router.push(id ? `/directions/${id}` : "/directions");
    },
    [router],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <FieldTreeNav activeId={selectedId} onSelect={goTo} />
        </aside>

        <div className="min-w-0">
          {showDetail && node ? (
            <FieldDetailView node={node} onSelect={goTo} />
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{t("field_treemap_title")}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t("field_treemap_sub")}</p>
                </div>
              </div>
              <FieldTreemap onLeafClick={goTo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
