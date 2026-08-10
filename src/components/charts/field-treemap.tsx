"use client";

import * as React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import {
  buildFieldTreemap,
  treemapInfo,
  type TmNode,
} from "@/lib/data/field-treemap";
import type { Bilingual } from "@/lib/i18n/types";

// lighten a hex toward white by ratio (0..1)
function tint(hex: string, ratio: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * ratio);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export function FieldTreemap() {
  const { t, pick, lang } = useI18n();
  const data = React.useMemo(() => buildFieldTreemap(), []);
  const info = React.useMemo(() => treemapInfo(data), [data]);

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base">{t("fieldmap_title")}</CardTitle>
        <p className="mt-1 text-xs text-muted-foreground">{t("fieldmap_sub")}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[460px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data as never}
              dataKey="size"
              nameKey="name"
              stroke="var(--card)"
              isAnimationActive={false}
              content={
                <TreemapNode info={info} pick={pick} lang={lang} />
              }
            >
              <Tooltip content={<TreemapTooltip info={info} pick={pick} t={(k) => t(k as never)} />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t("fieldmap_note")}</p>
      </CardContent>
    </Card>
  );
}

function TreemapNode({
  info,
  pick,
  lang,
  x,
  y,
  width,
  height,
  depth,
  name,
}: {
  info: Map<string, { color: string; papers: number; label: Bilingual }>;
  pick: (b?: Bilingual) => string;
  lang: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  depth?: number;
  name?: string;
}) {
  if (x == null || y == null || width == null || height == null || !name) return null;
  const node = info.get(name);
  if (!node) return null;

  const isCat = depth === 1;
  const fill = isCat ? tint(node.color, 0.86) : tint(node.color, 0.34);
  const showLabel = width > 46 && height > 22;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={isCat ? node.color : "var(--card)"}
        strokeWidth={isCat ? 1.5 : 1}
        rx={3}
      />
      {showLabel && (
        <text
          x={x + 7}
          y={y + (isCat ? 18 : 16)}
          fill={isCat ? node.color : "var(--foreground)"}
          fontSize={isCat ? 13 : 11}
          fontWeight={isCat ? 700 : 500}
        >
          {truncate(pick(node.label), isCat ? 22 : 16)}
        </text>
      )}
      {showLabel && !isCat && height > 40 && (
        <text x={x + 7} y={y + 30} fill="var(--muted-foreground)" fontSize={10}>
          {node.papers.toLocaleString()}
          {lang === "zh" ? " 篇" : ""}
        </text>
      )}
    </g>
  );
}

function TreemapTooltip({
  info,
  pick,
  t,
  active,
  payload,
}: {
  info: Map<string, { color: string; papers: number; label: Bilingual }>;
  pick: (b?: Bilingual) => string;
  t: (k: string) => string;
  active?: boolean;
  payload?: { payload: TmNode }[];
}) {
  if (!active || !payload?.length) return null;
  const key = (payload[0].payload as { name?: string }).name;
  const node = key ? info.get(key) : undefined;
  if (!node) return null;
  return (
    <div className="rounded-xl border border-border bg-popover p-3 text-xs shadow-lg">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full" style={{ background: node.color }} />
        <span className="font-medium text-foreground">{pick(node.label)}</span>
      </div>
      <div className="mt-1 text-muted-foreground">
        {node.papers.toLocaleString()} {t("fieldmap_papers")}
      </div>
    </div>
  );
}
