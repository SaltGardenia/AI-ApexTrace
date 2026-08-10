"use client";

import * as React from "react";
import Link from "next/link";
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { directions } from "@/lib/data/directions";
import type { DirectionId } from "@/lib/types";

const CATEGORY: Record<DirectionId, string> = {
  ai: "综合与理论",
  theory: "综合与理论",
  cv: "视觉与图形",
  graphics: "视觉与图形",
  nlp: "语言与语音",
  ml: "机器学习",
  robotics: "具身与机器人",
  multimodal: "交叉前沿",
  ai4science: "交叉前沿",
  datamining: "交叉前沿",
  security: "交叉前沿",
  hci: "交叉前沿",
};

const CATEGORIES = ["全部", "综合与理论", "视觉与图形", "语言与语音", "机器学习", "具身与机器人", "交叉前沿"];

export function DirectionsExplorer() {
  const [cat, setCat] = React.useState("全部");
  const list = directions.filter((d) => cat === "全部" || CATEGORY[d.id] === cat);
  const data = list.map((d) => ({
    id: d.id,
    x: Math.round(d.growth * 100),
    y: d.avgCitations,
    z: d.papers,
    name: d.name,
    color: d.color,
  }));
  const maxZ = Math.max(...data.map((d) => d.z));

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-base">方向气泡象限图</CardTitle>
          <p className="text-xs text-muted-foreground">
            X = 增长率，Y = 平均引用（影响力），气泡大小 = 论文产出
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="增长率"
                  unit="%"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  stroke="var(--muted-foreground)"
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="引用"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  stroke="var(--muted-foreground)"
                />
                <ZAxis type="number" dataKey="z" range={[60, 900]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const p = payload[0].payload as (typeof data)[number];
                    return (
                      <div className="rounded-lg border border-border bg-popover p-2 text-xs shadow">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-muted-foreground">
                          增长率 {p.x}% · 平均引用 {p.y} · 论文 {p.z.toLocaleString()}
                        </div>
                      </div>
                    );
                  }}
                />
                <Scatter data={data}>
                  {data.map((d) => (
                    <Cell key={d.id} fill={d.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <LegendTag className="border-emerald-500/40 text-emerald-400" label="明星象限（高增·高影响）" />
            <LegendTag className="border-sky-500/40 text-sky-400" label="潜力象限（高增·低影响）" />
            <LegendTag className="border-amber-500/40 text-amber-400" label="成熟象限（低增·高影响）" />
            <LegendTag className="border-zinc-500/40 text-zinc-400" label="衰退象限（低增·低影响）" />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  cat === c ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {list.map((d, i) => (
            <Link
              key={d.id}
              href={`/directions/${d.id}`}
              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50"
            >
              <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">{i + 1}</span>
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="flex-1 truncate text-sm font-medium">{d.name}</span>
              <span className="text-xs text-muted-foreground">{CATEGORY[d.id]}</span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function LegendTag({ className, label }: { className: string; label: string }) {
  return (
    <span className={`flex items-center gap-1 rounded border px-1.5 py-0.5 ${className}`}>
      {label}
    </span>
  );
}
