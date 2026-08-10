"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { directions } from "@/lib/data/directions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

const years = directions[0].yearly.map((d) => d.year);
const data = years.map((year, idx) => {
  const row: Record<string, number> = { year };
  for (const d of directions) row[d.id] = d.yearly[idx].papers;
  return row;
});

export function DirectionTrend() {
  const { t, pick } = useI18n();
  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base">{t("trend_title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                {directions.map((d) => (
                  <linearGradient key={d.id} id={`grad-${d.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={d.color} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={d.color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              {directions.map((d) => (
                  <Area
                   key={d.id}
                   type="monotone"
                   dataKey={d.id}
                   name={pick(d.name)}
                   stackId="1"
                  stroke={d.color}
                  fill={`url(#grad-${d.id})`}
                  strokeWidth={1.5}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {directions.map((d) => (
              <span key={d.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
               <span className="size-2 rounded-full" style={{ background: d.color }} />
               {pick(d.name)}
             </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
