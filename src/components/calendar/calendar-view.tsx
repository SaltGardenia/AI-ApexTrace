"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { cn } from "@/lib/utils";
import type { CCFLevel, Venue } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

type Kind = "submit" | "abstract" | "full" | "conference";

interface Ev {
  date: string;
  kind: Kind;
  venue: Venue;
}

const ccfColor: Record<string, string> = {
  A: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  B: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  C: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  none: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
};
const ccfKey = (v: Venue) => (v.ccf ?? "none") as string;

const NOW = new Date("2026-08-11T00:00:00");

function buildEvents(): Ev[] {
  const out: Ev[] = [];
  for (const v of venues) {
    const d = v.deadline;
    if (!d) continue;
    if (d.submissionStart) out.push({ date: d.submissionStart, kind: "submit", venue: v });
    if (d.abstractDeadline) out.push({ date: d.abstractDeadline, kind: "abstract", venue: v });
    if (d.deadline) out.push({ date: d.deadline, kind: "full", venue: v });
    if (d.date) out.push({ date: d.date, kind: "conference", venue: v });
  }
  return out;
}

function spanMonths(): { year: number; month: number }[] {
  const start = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  });
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_LABELS_ZH = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const LEVELS: ("all" | "A" | "B" | "C" | "none")[] = ["all", "A", "B", "C", "none"];
const levelLabel = (l: string) => (l === "all" ? "全部" : l === "none" ? "非 CCF" : `CCF-${l}`);

export function CalendarView() {
  const { t, lang } = useI18n();
  const [view, setView] = React.useState<"year" | "timeline">("year");
  const [level, setLevel] = React.useState<"all" | CCFLevel | "none">("all");

  const kindLabel: Record<Kind, DictKey> = {
    submit: "dl_submit",
    abstract: "dl_abstract",
    full: "dl_full",
    conference: "dl_conference",
  };

  const kindStyle: Record<Kind, string> = {
    submit: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    abstract: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    full: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    conference: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  };

  const events = React.useMemo(() => buildEvents(), []);
  const months = React.useMemo(() => spanMonths(), []);

  const filtered = events.filter((e) => level === "all" || ccfKey(e.venue) === level);

  const inSpan = (e: Ev) => {
    const dt = new Date(e.date + "T00:00:00");
    return months.some((m) => m.year === dt.getFullYear() && m.month === dt.getMonth() + 1);
  };

  const byMonth = React.useMemo(() => {
    const map: Record<string, Ev[]> = {};
    for (const m of months) {
      const key = `${m.year}-${m.month}`;
      map[key] = filtered
        .filter((e) => {
          const dt = new Date(e.date + "T00:00:00");
          return dt.getFullYear() === m.year && dt.getMonth() + 1 === m.month;
        })
        .sort((a, b) => a.date.localeCompare(b.date));
    }
    return map;
  }, [filtered, months]);

  const upcoming = React.useMemo(
    () =>
      filtered
        .filter((e) => inSpan(e))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [filtered, months],
  );

  const fmt = (s: string) =>
    new Date(s + "T00:00:00").toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1">
          {(["year", "timeline"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v === "year" ? "年历视图" : "时间线视图"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                level === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {levelLabel(l)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <LegendTag className={kindStyle.submit} label={t("dl_submit")} />
        <LegendTag className={kindStyle.abstract} label={t("dl_abstract")} />
        <LegendTag className={kindStyle.full} label={t("dl_full")} />
        <LegendTag className={kindStyle.conference} label={t("dl_conference")} />
      </div>

      {view === "year" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {months.map((m) => {
            const key = `${m.year}-${m.month}`;
            const items = byMonth[key] ?? [];
            return (
              <div key={key} className="rounded-xl border border-border/60 bg-card/40 p-3">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm font-medium">
                    {lang === "zh" ? MONTH_LABELS_ZH[m.month - 1] : MONTH_LABELS[m.month - 1]}
                  </span>
                  <span className="text-xs text-muted-foreground">{m.year}</span>
                </div>
                <div className="space-y-1.5">
                  {items.length ? (
                    items.map((e, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-2 rounded-md border px-2 py-1 text-xs",
                          kindStyle[e.kind],
                        )}
                      >
                        <span className="tabular-nums opacity-70">
                          {new Date(e.date + "T00:00:00").getDate()}日
                        </span>
                        <span className="font-medium">{t(kindLabel[e.kind])}</span>
                        <span className="ml-auto truncate text-foreground/80">{e.venue.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground/50">无收录节点</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative space-y-3 pl-4">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
          {upcoming.map((e, i) => (
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
                  e.kind === "conference" ? "bg-emerald-400" : "bg-primary",
                )}
              />
              <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className={cn("rounded border px-1.5 py-0.5 text-[10px]", kindStyle[e.kind])}>
                    {t(kindLabel[e.kind])}
                  </span>
                  <span className="truncate font-medium">{e.venue.name}</span>
                </div>
                <div className="mt-0.5 text-xs tabular-nums text-muted-foreground">{fmt(e.date)}</div>
              </div>
            </motion.div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-sm text-muted-foreground">未来 12 个月内暂无收录节点。</p>
          )}
        </div>
      )}
    </div>
  );
}

function LegendTag({ className, label }: { className: string; label: string }) {
  return (
    <span className={cn("flex items-center gap-1 rounded border px-1.5 py-0.5", className)}>{label}</span>
  );
}
