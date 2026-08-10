"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarClock, FileText, Mail, MapPin } from "lucide-react";
import type { DeadlineInfo } from "@/lib/types";

const fmt = (s?: string) =>
  s
    ? new Date(s + "T00:00:00").toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "待定";

export function SubmissionTimeline({ deadline }: { deadline?: DeadlineInfo }) {
  if (!deadline) {
    return (
      <p className="text-sm text-muted-foreground">
        暂无该届次的结构化时间节点，敬请关注官网更新。
      </p>
    );
  }
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
        {stages.map((s, i) => (
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
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
        {deadline.place && (
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {deadline.place}
          </span>
        )}
        {deadline.timezone && <span>时区 {deadline.timezone}</span>}
        {deadline.year && <span>届次 {deadline.year}</span>}
      </div>
    </div>
  );
}
