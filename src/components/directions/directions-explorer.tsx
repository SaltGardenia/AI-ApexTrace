"use client";

import * as React from "react";
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
import { FieldTreemap } from "@/components/directions/field-treemap";
import { useI18n } from "@/lib/i18n";

export function DirectionsExplorer() {
  const { t, pick } = useI18n();
  const data = directions.map((d) => ({
    id: d.id,
    x: Math.round(d.growth * 100),
    y: d.avgCitations,
    z: d.papers,
    name: d.name,
    color: d.color,
  }));

  return (
    <div className="space-y-6">
      <Card id="field-treemap">
        <CardHeader>
          <CardTitle className="text-base">{t("treemap_title")}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {t("treemap_sub")}
          </p>
        </CardHeader>
        <CardContent>
          <FieldTreemap />
        </CardContent>
      </Card>

      <Card id="quadrant">
        <CardHeader>
          <CardTitle className="text-base">{t("quadrant_title")}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {t("quadrant_sub")}
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
                  name={t("axis_growth")}
                  unit="%"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  stroke="var(--muted-foreground)"
                  interval={0}
                  tickMargin={6}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name={t("axis_citations")}
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  stroke="var(--muted-foreground)"
                  interval={0}
                  tickMargin={6}
                />
                <ZAxis type="number" dataKey="z" range={[60, 900]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const p = payload[0].payload as (typeof data)[number];
                     return (
                       <div className="rounded-lg border border-border bg-popover p-2 text-xs shadow">
                         <div className="font-medium">{pick(p.name)}</div>
                         <div className="text-muted-foreground">
                           {t("tooltip_quadrant", { x: p.x, y: p.y, z: p.z.toLocaleString() })}
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
        </CardContent>
      </Card>
    </div>
  );
}
