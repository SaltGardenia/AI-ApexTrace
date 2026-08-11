"use client";

import * as React from "react";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

export function PageHeader({
  titleKey,
  descKey,
  action,
}: {
  titleKey: DictKey;
  descKey?: DictKey;
  action?: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t(titleKey)}</h1>
        {descKey && <p className="mt-1 text-sm text-muted-foreground">{t(descKey)}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
