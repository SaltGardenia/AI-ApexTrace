"use client";

import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <p>{t("footer")}</p>
      </div>
    </footer>
  );
}
