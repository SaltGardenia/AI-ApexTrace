"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { useI18n } from "@/lib/i18n";

const fmt = (s?: string) =>
  s ? new Date(s + "T00:00:00").toLocaleDateString("zh-CN", { month: "short", day: "numeric" }) : "—";

const items = venues
  .filter((v) => v.deadline?.deadline || v.deadline?.date)
  .map((v) => ({
    venue: v,
    sortKey: v.deadline?.deadline ?? v.deadline?.date ?? "",
  }))
  .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  .slice(0, 14);

export function ConferenceTimeline() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{t("timeline_title")}</h2>
          <p className="text-sm text-muted-foreground">{t("timeline_sub")}</p>
        </div>
        <Link href="/calendar" className="text-sm text-primary hover:underline">
          {t("full_calendar")}
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {items.map(({ venue }, i) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="w-60 shrink-0 rounded-xl border border-border/60 bg-card/50 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{venue.name} {venue.deadline?.year}</span>
              <CcfBadge venue={venue} />
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">{venue.fullName}</p>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("dl_abstract")}</span>
                <span className="tabular-nums">{fmt(venue.deadline?.abstractDeadline)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("dl_full")}</span>
                <span className="font-medium tabular-nums">{fmt(venue.deadline?.deadline)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("dl_conference")}</span>
                <span className="tabular-nums">{fmt(venue.deadline?.date)}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="size-3" />
              <span className="truncate">{venue.deadline?.place ?? "TBD"}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
