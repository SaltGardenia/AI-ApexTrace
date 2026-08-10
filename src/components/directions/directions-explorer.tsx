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
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

const CATEGORY_KEY: Record<DirectionId, DictKey> = {
  ml: "cat_ml",
  cv: "cat_vision",
  nlp: "cat_language",
  multimodal: "cat_cross",
  generative: "cat_vision",
  embodied: "cat_robotics",
  rl: "cat_ml",
  robotics: "cat_robotics",
  efficiency: "cat_ml",
  security: "cat_cross",
  applications: "cat_cross",
  frontier: "cat_cross",
};

const CATEGORY_LABELS: DictKey[] = [
  "cat_all",
  "cat_general",
  "cat_vision",
  "cat_language",
  "cat_ml",
  "cat_robotics",
  "cat_cross",
];

export function DirectionsExplorer() {
  const { t, pick } = useI18n();
  const [cat, setCat] = React.useState<DictKey>("cat_all");
  const list = directions.filter((d) => cat === "cat_all" || CATEGORY_KEY[d.id] === cat);
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
    <div className="space-y-6">
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
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name={t("axis_citations")}
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
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <LegendTag className="border-[#6bb39a]/40 text-[#5a9c86]" label={t("quad_star")} />
            <LegendTag className="border-[#5aa9c9]/40 text-[#4f93ae]" label={t("quad_potential")} />
            <LegendTag className="border-[#c9a95a]/40 text-[#b0913f]" label={t("quad_mature")} />
            <LegendTag className="border-[#9a8fd0]/40 text-[#8276b8]" label={t("quad_declining")} />
          </div>
        </CardContent>
      </Card>

      <Card id="direction-list">
        <CardHeader>
            <div className="flex flex-wrap gap-1">
              {CATEGORY_LABELS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    cat === c ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(c)}
                </button>
              ))}
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
            {list.map((d, i) => (
              <Link
                key={d.id}
                href={`/directions/${d.id}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50"
              >
                <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
                <span className="flex-1 truncate text-sm font-medium">{pick(d.name)}</span>
                <span className="text-xs text-muted-foreground">{t(CATEGORY_KEY[d.id])}</span>
              </Link>
            ))}
          </div>
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
