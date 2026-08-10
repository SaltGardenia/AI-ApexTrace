"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { directions as allDirections } from "@/lib/data/directions";
import { colorById } from "@/lib/chart-palette";
import { SortedLineTooltip } from "@/components/charts/line-tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

// 按论文总量降序排序，确保 数据 / 图例 / tooltip 顺序一致
const directions = [...allDirections].sort((a, b) => b.papers - a.papers);

const years = directions[0].yearly.map((d) => d.year);
const data = years.map((year, idx) => {
  const row: Record<string, number> = { year };
  for (const d of directions) row[d.id] = d.yearly[idx].papers;
  return row;
});

export function DirectionTrend() {
  const { t, pick } = useI18n();
  const nameById = (id: string) => {
    const d = directions.find((x) => x.id === id);
    return d ? pick(d.name) : id;
  };
  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base">{t("trend_title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" interval={0} angle={-35} textAnchor="end" height={40} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" tickFormatter={(v: number) => (v >= 10000 ? `${Math.round(v / 1000)}k` : `${Math.round(v)}`)} />
              <Tooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                content={
                  <SortedLineTooltip
                    colorById={colorById}
                    nameById={nameById}
                    title={t("trend_title")}
                  />
                }
              />
              {directions.map((d, i) => (
                <Line
                  key={d.id}
                  type="monotone"
                  dataKey={d.id}
                  name={pick(d.name)}
                  stroke={colorById(d.id)}
                  strokeWidth={i < 4 ? 2.25 : 1.25}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {directions.map((d) => (
            <span key={d.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: colorById(d.id) }} />
              {pick(d.name)}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
