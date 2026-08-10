"use client";

import * as React from "react";
import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div
      className="flex items-center rounded-md border border-border/60 bg-muted/40 p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {(["zh", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={
            "rounded px-2 py-1 transition-colors " +
            (lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground")
          }
        >
          {l === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}
