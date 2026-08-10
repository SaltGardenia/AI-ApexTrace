"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { CcfBadge } from "@/components/shared/ccf-badge";

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
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">顶会时间轴</h2>
          <p className="text-sm text-muted-foreground">即将截稿与召开的会议（投稿 → 截稿 → 开会）</p>
        </div>
        <Link href="/calendar" className="text-sm text-primary hover:underline">
          完整日历 →
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
              <span className="font-semibold">{venue.name}</span>
              <CcfBadge venue={venue} />
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">{venue.fullName}</p>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">摘要截稿</span>
                <span className="tabular-nums">{fmt(venue.deadline?.abstractDeadline)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">全文截稿</span>
                <span className="font-medium tabular-nums">{fmt(venue.deadline?.deadline)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">开会</span>
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
