"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarClock, FileText, Info, Mail, MapPin, PenLine } from "lucide-react";
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

type Stage = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  date?: string;
  tone: string;
  // primary: 投稿核心节点（开始投稿 / 截止摘要 / 截止全文），视觉上更突出
  primary?: boolean;
};

export function SubmissionTimeline({ deadline }: { deadline?: DeadlineInfo }) {
  if (!deadline) {
    return null;
  }
  const offset = parseOffset(deadline.timezone);
  const isBeijing = offset === 8;

  // 投稿核心三节点前置并突出，录用通知与正式召开作为后续节点弱化展示
  const submitStages: Stage[] = [
    { icon: PenLine, label: "开始投稿", date: deadline.submissionStart, tone: "text-sky-400", primary: true },
    { icon: FileText, label: "截止摘要", date: deadline.abstractDeadline, tone: "text-amber-400", primary: true },
    { icon: CalendarClock, label: "截止全文", date: deadline.deadline, tone: "text-rose-400", primary: true },
  ];
  const laterStages: Stage[] = [
    { icon: Mail, label: "录用通知", date: deadline.notification, tone: "text-violet-400" },
    { icon: MapPin, label: "正式召开", date: deadline.date, tone: "text-emerald-400" },
  ];

  const renderStage = (s: Stage, i: number) => {
    const bj = toBeijing(s.date, offset);
    const showBj = bj && !isBeijing;
    return (
      <motion.div
        key={s.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
        className={
          "rounded-xl border p-4 " +
          (s.primary
            ? "border-sky-400/40 bg-sky-400/5"
            : "border-border/60 bg-card/50")
        }
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
  };

  return (
    <div className="relative">
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        投稿关键节点
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {submitStages.map((s, i) => renderStage(s, i))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {laterStages.map((s, i) => renderStage(s, i + submitStages.length))}
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
