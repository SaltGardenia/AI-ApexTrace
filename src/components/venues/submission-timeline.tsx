"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarClock, FileText, Info, Mail, MapPin } from "lucide-react";
import type { DeadlineInfo } from "@/lib/types";

const fmt = (s?: string) =>
  s
    ? new Date(s + "T00:00:00").toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "待定";

// 解析 "UTC+8" / "UTC-7" / "UTC+5:30" / "UTC" 为相对 UTC 的小时数
function parseOffset(tz?: string): number | null {
  if (!tz) return null;
  const m = tz.match(/UTC([+-]?\d{1,2})(?::(\d{2}))?/i);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  return h + (h < 0 ? -min / 60 : min / 60);
}

// 将举办地（date 当天 00:00，时区 tz）换算为北京时间（UTC+8）对应的日历日期
function toBeijing(dateStr?: string, offset?: number | null): string | null {
  if (!dateStr || offset === null || offset === undefined) return null;
  const utcMs = Date.parse(dateStr + "T00:00:00Z") - offset * 3600_000;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(utcMs));
}

export function SubmissionTimeline({ deadline }: { deadline?: DeadlineInfo }) {
  if (!deadline) {
    return null;
  }
  const offset = parseOffset(deadline.timezone);
  const isBeijing = offset === 8;

  const stages = [
    { icon: FileText, label: "摘要截稿", date: deadline.abstractDeadline, tone: "text-sky-400" },
    { icon: CalendarClock, label: "全文截稿", date: deadline.deadline, tone: "text-amber-400" },
    { icon: Mail, label: "录用通知", date: deadline.notification, tone: "text-violet-400" },
    { icon: MapPin, label: "正式召开", date: deadline.date, tone: "text-emerald-400" },
  ];

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-border via-border to-transparent" />
      <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stages.map((s, i) => {
          const bj = toBeijing(s.date, offset);
          const showBj = bj && !isBeijing;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <div className={`flex items-center gap-2 text-sm font-medium ${s.tone}`}>
                <s.icon className="size-4" />
                {s.label}
              </div>
              <div className="mt-2 text-sm tabular-nums">{fmt(s.date)}</div>
              {showBj && (
                <div className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                  北京时间 {bj}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
        {deadline.place && (
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {deadline.place}
          </span>
        )}
        {deadline.timezone && <span>举办地时区 {deadline.timezone}</span>}
        {deadline.year && <span>届次 {deadline.year}</span>}
      </div>

      <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        {isBeijing
          ? "会议举办地已使用北京时间（UTC+8），以上日期无需换算。"
          : deadline.timezone
            ? "会议时间按举办地时区（" + deadline.timezone + "）标注，并已换算为北京时间（UTC+8）便于对照。"
            : "具体时区以会议官网公告为准。"}
        以上日期为参考值，最终以会议官网公告为准。
      </p>
    </div>
  );
}
