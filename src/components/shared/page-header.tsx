"use client";

import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

export function PageHeader({
  titleKey,
  descKey,
}: {
  titleKey: DictKey;
  descKey: DictKey;
}) {
  const { t } = useI18n();
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t(titleKey)}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t(descKey)}</p>
    </div>
  );
}
