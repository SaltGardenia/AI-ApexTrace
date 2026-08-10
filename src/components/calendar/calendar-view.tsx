"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { cn } from "@/lib/utils";
import type { CCFLevel, Venue } from "@/lib/types";

interface Ev {
  date: string;
  label: string;
  kind: "deadline" | "conference";
  venue: Venue;
}

const ccfColor: Record<string, string> = {
  A: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  B: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  C: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  none: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
};
const ccfKey = (v: Venue) => (v.ccf ?? "none") as string;

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const NOW = new Date("2026-08-11T00:00:00");

function buildEvents(): Ev[] {
  const out: Ev[] = [];
  for (const v of venues) {
    const d = v.deadline;
    if (!d) continue;
    if (d.deadline) out.push({ date: d.deadline, label: `${v.name} 截稿`, kind: "deadline", venue: v });
    if (d.date) out.push({ date: d.date, label: `${v.name} 开会`, kind: "conference", venue: v });
  }
  return out;
}

const LEVELS: ("all" | "A" | "B" | "C" | "none")[] = ["all", "A", "B", "C", "none"];
const levelLabel = (l: string) => (l === "all" ? "全部" : l === "none" ? "非 CCF" : `CCF-${l}`);

export function CalendarView() {
  const [view, setView] = React.useState<"year" | "timeline">("year");
  const [level, setLevel] = React.useState<"all" | CCFLevel | "none">("all");

  const events = React.useMemo(() => buildEvents(), []);
  const filtered = events.filter((e) => level === "all" || ccfKey(e.venue) === level);

  const byMonth = React.useMemo(() => {
    const map: Record<number, Ev[]> = {};
    for (const e of filtered) {
      const dt = new Date(e.date + "T00:00:00");
      if (dt.getFullYear() !== 2026) continue;
      const m = dt.getMonth() + 1;
      (map[m] ||= []).push(e);
    }
    for (const m of MONTHS) (map[m] ||= []).sort((a, b) => a.date.localeCompare(b.date));
    return map;
  }, [filtered]);

  const upcoming = React.useMemo(
    () => filtered.filter((e) => new Date(e.date + "T00:00:00") >= NOW).sort((a, b) => a.date.localeCompare(b.date)),
    [filtered],
  );

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

      {view === "year" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MONTHS.map((m) => (
            <div key={m} className="rounded-xl border border-border/60 bg-card/40 p-3">
              <div className="mb-2 text-sm font-medium">{m} 月</div>
              <div className="space-y-1.5">
                {byMonth[m]?.length ? (
                  byMonth[m].map((e, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-md border px-2 py-1 text-xs",
                        e.kind === "deadline" ? ccfColor[ccfKey(e.venue)] : "bg-muted/60 text-muted-foreground border-border",
                      )}
                    >
                      <span className="tabular-nums opacity-70">
                        {new Date(e.date + "T00:00:00").getDate()}日 ·
                      </span>{" "}
                      {e.label}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground/50">无收录节点</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative space-y-3 pl-4">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
          {upcoming.map((e, i) => (
            <motion.div
              key={`${e.label}-${e.date}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative flex items-center gap-3 rounded-lg border border-border/60 bg-card/50 p-3"
            >
              <span
                className={cn(
                  "absolute -left-[13px] size-2.5 rounded-full ring-4 ring-background",
                  e.kind === "deadline" ? "bg-primary" : "bg-emerald-400",
                )}
              />
              <CalendarDays className="size-4 text-muted-foreground" />
              <span className="text-sm">{e.label}</span>
              <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                {new Date(e.date + "T00:00:00").toLocaleDateString("zh-CN")}
              </span>
            </motion.div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-sm text-muted-foreground">未来 6 个月内暂无收录节点。</p>
          )}
        </div>
      )}
    </div>
  );
}
