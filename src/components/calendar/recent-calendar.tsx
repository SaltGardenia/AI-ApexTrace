"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";
import { NOW, buildEvents, type Ev, type Kind } from "@/components/calendar/calendar-view";

const WINDOW_DAYS = 30;

const kindStyle: Record<Kind, string> = {
  submit: "bg-[#5aa9c9]/20 text-[#4f93ae] border-[#5aa9c9]/30",
  abstract: "bg-[#c9a95a]/20 text-[#b0913f] border-[#c9a95a]/30",
  full: "bg-[#d08a8a]/20 text-[#c2766f] border-[#d08a8a]/30",
  conference: "bg-[#6bb39a]/20 text-[#5a9c86] border-[#6bb39a]/30",
};

export function RecentCalendar() {
  const { t, lang } = useI18n();

  const kindLabel: Record<Kind, DictKey> = {
    submit: "dl_submit",
    abstract: "dl_abstract",
    full: "dl_full",
    conference: "dl_conference",
  };

  const events = React.useMemo<Ev[]>(() => {
    const end = new Date(NOW.getTime() + WINDOW_DAYS * 86400000);
    return buildEvents()
      .filter((e) => {
        const dt = new Date(e.date + "T00:00:00");
        return dt >= NOW && dt <= end;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const fmt = (s: string) =>
    new Date(s + "T00:00:00").toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
      month: "long",
      day: "numeric",
    });

  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">近 30 天内暂无收录节点。</p>;
  }

  return (
    <div className="relative space-y-3 pl-4">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      {events.map((e, i) => (
        <motion.div
          key={`${e.venue.name}-${e.kind}-${e.date}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          className="relative flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 p-3"
        >
          <span
            className={cn(
              "absolute -left-[13px] size-2.5 rounded-full ring-4 ring-background",
              e.kind === "conference" ? "bg-[#6bb39a]" : "bg-primary",
            )}
          />
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className={cn("rounded border px-1.5 py-0.5 text-[10px]", kindStyle[e.kind])}>
                {t(kindLabel[e.kind])}
              </span>
              <span className="truncate font-medium">{e.venue.name} {e.venue.deadline?.year}</span>
            </div>
            <div className="mt-0.5 text-xs tabular-nums text-muted-foreground">{fmt(e.date)}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
