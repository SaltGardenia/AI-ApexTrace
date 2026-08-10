"use client";

import * as React from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { fieldTree } from "@/lib/data/field-tree";
import type { Bilingual, FieldNode } from "@/lib/types";
import { DIRECTION_PALETTE } from "@/lib/chart-palette";
import { useI18n } from "@/lib/i18n";

type LeafDatum = { label: string; size: number; catColor: string };
type CatDatum = { label: string; catColor: string; children: LeafDatum[] };

function collectLeaves(node: FieldNode): FieldNode[] {
  if (!node.children || node.children.length === 0) return [node];
  return node.children.flatMap(collectLeaves);
}

function buildRaw(locale: "zh" | "en"): CatDatum[] {
  return fieldTree.map((top) => {
    const color = DIRECTION_PALETTE[top.id as keyof typeof DIRECTION_PALETTE] ?? "#9a8fd0";
    const name: Bilingual = top.name;
    return {
      label: name[locale],
      catColor: color,
      children: collectLeaves(top).map((leaf) => ({
        label: leaf.name[locale],
        size: leaf.papers ?? 0,
        catColor: color,
      })),
    };
  });
}

function Content(props: any) {
  const { x, y, width, height, payload } = props;
  if (width <= 0 || height <= 0) return null;
  const label = payload?.label ?? "";
  const isParent = !!payload?.children;
  const color = payload?.catColor ?? "#9a8fd0";

  if (isParent) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          fillOpacity={0.14}
          stroke={color}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
        {width > 70 && height > 18 && (
          <text x={x + 6} y={y + 15} fill={color} fontSize={12} fontWeight={600}>
            {label}
          </text>
        )}
      </g>
    );
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.78}
        stroke="#fff"
        strokeWidth={1}
      >
        <title>{`${label}: ${((payload?.size ?? 0)).toLocaleString()}`}</title>
      </rect>
      {width > 46 && height > 22 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={11}
          fontWeight={500}
          pointerEvents="none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function FieldTreemap() {
  const { lang, pick } = useI18n();
  const data = React.useMemo(() => buildRaw(lang), [lang]);

  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="h-[440px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            stroke="#fff"
            isAnimationActive={false}
            content={<Content />}
          />
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {fieldTree.map((top) => (
          <span key={top.id} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="size-2.5 rounded-sm"
              style={{ background: DIRECTION_PALETTE[top.id as keyof typeof DIRECTION_PALETTE] }}
            />
            {pick(top.name)}
          </span>
        ))}
      </div>
    </div>
  );
}
