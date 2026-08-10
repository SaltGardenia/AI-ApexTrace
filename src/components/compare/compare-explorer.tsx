"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { directions } from "@/lib/data/directions";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { RADAR_METRICS } from "@/lib/i18n/translations";

const MAX = 5;

export function CompareExplorer() {
  const { t, pick } = useI18n();
  const [selected, setSelected] = React.useState<string[]>(["cv", "nlp", "ml"]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX
          ? [...prev, id]
          : prev,
    );

  const chosen = directions.filter((d) => selected.includes(d.id));
  const radarData = (() => {
    const metrics = directions[0].radar.map((r) => r.metric);
    return metrics.map((m) => {
      const row: Record<string, string | number> = { metric: m };
      for (const d of chosen) {
        const r = d.radar.find((x) => x.metric === m);
        if (r) row[d.id] = r.value;
      }
      return row;
    });
  })();

  const lineData = directions[0].yearly.map((y, idx) => {
    const row: Record<string, number> = { year: y.year };
    for (const d of chosen) row[d.id] = d.yearly[idx].papers;
    return row;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {directions.map((d) => {
          const on = selected.includes(d.id);
          const disabled = !on && selected.length >= MAX;
          return (
            <button
              key={d.id}
              onClick={() => toggle(d.id)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors",
                on ? "border-primary/50 bg-primary/10" : "border-border/60 hover:border-primary/30",
                disabled && "cursor-not-allowed opacity-40",
              )}
            >
              <span className="size-2.5 rounded-full" style={{ background: d.color }} />
              {pick(d.name)}
            </button>
          );
        })}
        <span className="ml-auto self-center text-xs text-muted-foreground">最多对比 {MAX} 个</span>
      </div>

      {chosen.length === 0 ? (
        <p className="text-sm text-muted-foreground">请选择至少一个研究方向进行对比。</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("compare_radar")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="72%">
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="metric" fontSize={11} tick={{ fill: "var(--muted-foreground)" }} tickFormatter={(m) => pick(RADAR_METRICS[m as string])} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      {chosen.map((d) => (
                        <Radar key={d.id} name={pick(d.name)} dataKey={d.id} stroke={d.color} fill={d.color} fillOpacity={0.12} />
                      ))}
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("compare_line")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                      {chosen.map((d) => (
                        <Line key={d.id} type="monotone" dataKey={d.id} stroke={d.color} strokeWidth={2} dot={false} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
                <CardTitle className="text-base">{t("compare_table")}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">{t("th_metric")}</th>
                    {chosen.map((d) => (
                      <th key={d.id} className="px-3 py-2 text-right font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                          {pick(d.name)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {([
                    { k: "m_index", f: (d: (typeof chosen)[number]) => d.heatIndex },
                    { k: "m_output", f: (d: (typeof chosen)[number]) => d.papers.toLocaleString() },
                    { k: "m_citations", f: (d: (typeof chosen)[number]) => d.avgCitations },
                    { k: "m_topcited", f: (d: (typeof chosen)[number]) => `${Math.round(d.topCitedRatio * 100)}%` },
                    { k: "m_cagr", f: (d: (typeof chosen)[number]) => `${Math.round(d.growth * 100)}%` },
                    { k: "m_open", f: (d: (typeof chosen)[number]) => `${Math.round(d.openRate * 100)}%` },
                  ] as { k: "m_index" | "m_output" | "m_citations" | "m_topcited" | "m_cagr" | "m_open"; f: (d: (typeof chosen)[number]) => string | number }[]).map((row) => (
                    <tr key={row.k} className="border-t border-border/40">
                      <td className="px-3 py-2 text-muted-foreground">{t(row.k)}</td>
                      {chosen.map((d) => (
                        <td key={d.id} className="px-3 py-2 text-right tabular-nums">
                          {row.f(d)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
