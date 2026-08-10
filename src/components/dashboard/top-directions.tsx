"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { directionRanking } from "@/lib/heat-index";
import type { RankedDirection } from "@/lib/heat-index";

type SortKey = "heat" | "output" | "impact" | "growth";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "heat", label: "综合" },
  { key: "output", label: "产出" },
  { key: "impact", label: "影响力" },
  { key: "growth", label: "新兴" },
];

function metricValue(d: RankedDirection, key: SortKey) {
  switch (key) {
    case "output": return d.papers;
    case "impact": return d.avgCitations;
    case "growth": return Math.round(d.growth * 100);
    default: return d.heatIndex;
  }
}

export function TopDirections() {
  const [sort, setSort] = React.useState<SortKey>("heat");
  const list = directionRanking(sort);
  const max = Math.max(...list.map((d) => metricValue(d, sort)));

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base">研究方向热度总榜</CardTitle>
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1">
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                sort === s.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {list.map((d, i) => {
          const v = metricValue(d, sort);
          const pct = (v / max) * 100;
          return (
            <motion.div
              key={d.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/directions/${d.id}`}
                className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50"
              >
                <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: d.color }}
                />
                <span className="w-28 shrink-0 truncate text-sm font-medium">
                  {d.name}
                </span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted/60">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: d.color }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="w-14 text-right text-sm tabular-nums text-muted-foreground">
                  {sort === "growth" ? `${v}%` : v.toLocaleString()}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
