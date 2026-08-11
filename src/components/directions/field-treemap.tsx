"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ResponsiveContainer, Treemap } from "recharts";
import { fieldTree } from "@/lib/data/field-tree";
import { pathToNode } from "@/lib/field-tree-utils";
import type { Bilingual, FieldNode } from "@/lib/types";
import { DIRECTION_PALETTE } from "@/lib/chart-palette";
import { useI18n } from "@/lib/i18n";

type LeafDatum = {
  id: string;
  label: string;
  size: number;
  catColor: string;
  path: string[];
};

// 中文字形在低分替代字体下会发虚、笔画粘连；显式指定 CJK 字体栈保证清晰渲染。
const CJK_FONT =
  '"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans CJK SC","Noto Sans SC",sans-serif';

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
        id: leaf.id,
        label: leaf.name[locale],
        size: leaf.papers ?? 0,
        catColor: color,
        path: pathToNode(leaf.id).map((n) => n.name[locale]),
      });
    }
  }
  return out;
}

type HoverState = { label: string; size: number; path: string[]; color: string; x: number; y: number };

function isLatin(text: string): boolean {
  return !/[\u4e00-\u9fff]/.test(text);
}

// 自动换行：英文按词换行（绝不切断单词），中文按字换行；放不下的部分交由
// clipPath 自然裁切，不做省略号截断。
function wrapLabel(text: string, maxChars: number, maxLines: number): string[] {
  if (maxChars <= 0 || maxLines <= 0) return [];
  const lines: string[] = [];
  if (isLatin(text)) {
    const words = text.split(/\s+/).filter(Boolean);
    let cur = "";
    for (const w of words) {
      if (lines.length >= maxLines) break;
      const cand = cur ? cur + " " + w : w;
      if (cand.length <= maxChars) {
        cur = cand;
      } else {
        if (cur) {
          lines.push(cur);
          cur = "";
        }
        if (lines.length >= maxLines) break;
        cur = w; // 单词整体保留，超出部分由矩形裁切，不切断单词
      }
    }
    if (cur && lines.length < maxLines) lines.push(cur);
  } else {
    let i = 0;
    while (i < text.length && lines.length < maxLines) {
      lines.push(text.slice(i, i + maxChars));
      i += maxChars;
    }
  }
  return lines;
}

// recharts clones `content` with `nodeProps`, so our data fields (label,
// catColor, size, path) arrive as direct props (no `payload` wrapper).
function Content(props: any) {
  const { x, y, width, height, label, catColor, size, path, index } = props;
  if (width <= 0 || height <= 0) return null;
  const color = catColor ?? "#9a8fd0";
  const text = label ?? "";
  const clipId = `tm-clip-${index}`;
  const fontSize = width < 70 ? 10 : 12;
  const charW = fontSize * 0.92;
  const maxChars = Math.floor((width - 8) / charW);
  // 仅给足够大的格子标注，避免小格文字拥挤、笔画粘连
  const showText = width > 34 && height > 18 && maxChars >= 2;
  // 自动换行：放得下则完整显示，放不下按词（英文）或按字（中文）换行，
  // 超出矩形高度的部分由 clipPath 自然裁切，不做省略号截断、不切断单词。
  const lineH = fontSize * 1.25;
  const maxLines = Math.max(1, Math.min(6, Math.floor((height - 6) / lineH)));
  const lines = showText ? wrapLabel(text, maxChars, maxLines) : [];
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
        style={{ cursor: "pointer" }}
      />
      {lines.length > 0 && (
        <text
          x={tx}
          y={ty}
          textAnchor="start"
          dominantBaseline="hanging"
          fill="#fff"
          fillOpacity={1}
          fontSize={fontSize}
          fontWeight={200}
          style={{
            fontWeight: 200,
            fontFamily: CJK_FONT,
          }}
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

export function FieldTreemap({ onLeafClick }: { onLeafClick?: (id: string) => void }) {
  const { lang, pick, t } = useI18n();
  const router = useRouter();
  const data = React.useMemo(() => buildRaw(lang), [lang]);
  const [hover, setHover] = React.useState<HoverState | null>(null);

  const levelNames = [t("lvl_one"), t("lvl_two"), t("lvl_three")];

  const handleClick = (node: any) => {
    if (!node?.id) return;
    if (onLeafClick) onLeafClick(node.id);
    else router.push(`/directions/${node.id}`);
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="relative h-[560px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            type="flat"
            dataKey="size"
            stroke="#fff"
            isAnimationActive={false}
            content={<Content />}
            onMouseEnter={(node: any, e: React.MouseEvent) => {
              setHover({
                label: node.label,
                size: node.size,
                path: node.path ?? [],
                color: node.catColor ?? "#9a8fd0",
                x: e.clientX,
                y: e.clientY,
              });
            }}
            onMouseLeave={() => setHover(null)}
            onClick={handleClick}
          />
        </ResponsiveContainer>

        {hover && (
          <div
            className="pointer-events-none fixed z-50 max-w-[260px] rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg"
            style={{ left: hover.x + 14, top: hover.y + 14 }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-sm" style={{ background: hover.color }} />
              <span className="font-semibold text-foreground">{hover.label}</span>
            </div>
            <div className="space-y-0.5 text-muted-foreground">
              {hover.path.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <span className="shrink-0 text-[10px] text-muted-foreground/70">
                    {levelNames[i] ?? `L${i + 1}`}
                  </span>
                  <span>{p}</span>
                </div>
              ))}
              <div className="flex gap-2 pt-0.5">
                <span className="shrink-0 text-[10px] text-muted-foreground/70">{t("field_papers")}</span>
                <span className="tabular-nums">{(hover.size ?? 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
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
