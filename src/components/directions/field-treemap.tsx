"use client";

import * as React from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { fieldTree } from "@/lib/data/field-tree";
import type { Bilingual, FieldNode } from "@/lib/types";
import { DIRECTION_PALETTE } from "@/lib/chart-palette";
import { useI18n } from "@/lib/i18n";

type LeafDatum = { label: string; size: number; catColor: string };

function collectLeaves(node: FieldNode): FieldNode[] {
  if (!node.children || node.children.length === 0) return [node];
  return node.children.flatMap(collectLeaves);
}

function buildRaw(locale: "zh" | "en"): LeafDatum[] {
  const out: LeafDatum[] = [];
  for (const top of fieldTree) {
    const color = DIRECTION_PALETTE[top.id as keyof typeof DIRECTION_PALETTE] ?? "#9a8fd0";
    for (const leaf of collectLeaves(top)) {
      out.push({
        label: leaf.name[locale],
        size: leaf.papers ?? 0,
        catColor: color,
      });
    }
  }
  return out;
}

// Break a (mostly CJK) label into lines that fit the rect width.
function wrapLabel(str: string, maxChars: number): string[] {
  if (maxChars <= 0) return [];
  const lines: string[] = [];
  for (let i = 0; i < str.length; i += maxChars) {
    lines.push(str.slice(i, i + maxChars));
    if (lines.length >= 4) break;
  }
  if (str.length > lines.length * maxChars) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.slice(0, Math.max(1, maxChars - 1)) + "…";
  }
  return lines;
}

const YOUYUAN = '"YouYuan", "幼圆", "Yuanti SC", "圆体-简", ui-rounded, sans-serif';

// recharts clones `content` with `nodeProps`, so our data fields (label,
// catColor, size) arrive as direct props (no `payload` wrapper).
function Content(props: any) {
  const { x, y, width, height, label, catColor, size, index } = props;
  if (width <= 0 || height <= 0) return null;
  const color = catColor ?? "#9a8fd0";
  const text = label ?? "";
  const clipId = `tm-clip-${index}`;
  const fontSize = width < 64 ? 10 : 12;
  const charW = fontSize * 0.95;
  const maxChars = Math.floor((width - 8) / charW);
  const showText = width > 34 && height > 14 && maxChars >= 1;
  const lines = showText ? wrapLabel(text, maxChars) : [];
  const lineH = fontSize * 1.2;
  const tx = x + 5;
  const ty = y + fontSize + 3;

  return (
    <g>
      <clipPath id={clipId}>
        <rect x={x} y={y} width={width} height={height} />
      </clipPath>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.85}
        stroke="#fff"
        strokeWidth={1}
      >
        <title>{`${text}: ${(size ?? 0).toLocaleString()}`}</title>
      </rect>
      {lines.length > 0 && (
        <text
          x={tx}
          y={ty}
          textAnchor="start"
          dominantBaseline="hanging"
          fill="#fff"
          fillOpacity={0.95}
          fontSize={fontSize}
          fontWeight="normal"
          fontFamily={YOUYUAN}
          clipPath={`url(#${clipId})`}
          pointerEvents="none"
        >
          {lines.map((ln, i) => (
            <tspan key={i} x={tx} dy={i === 0 ? 0 : lineH}>
              {ln}
            </tspan>
          ))}
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
      <div className="h-[560px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            type="flat"
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
