"use client";

import * as React from "react";
import type { DirectionId } from "@/lib/types";

interface Row {
  id: DirectionId | string;
  name: string;
  color: string;
  value: number;
}

export function SortedLineTooltip({
  active,
  payload,
  label,
  colorById,
  nameById,
  unit = "",
  title,
}: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color?: string }[];
  label?: string | number;
  colorById: (id: string) => string;
  nameById: (id: string) => string;
  unit?: string;
  title?: string;
}) {
  if (!active || !payload?.length) return null;
  const rows: Row[] = payload
    .map((p) => ({
      id: p.dataKey,
      name: nameById(p.dataKey),
      color: p.color ?? colorById(p.dataKey),
      value: p.value,
    }))
    .filter((r) => Number.isFinite(r.value))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="min-w-44 rounded-xl border border-border bg-popover p-3 text-xs shadow-lg">
      <div className="mb-2 font-medium text-foreground">{title ?? label}</div>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: r.color }}
            />
            <span className="truncate text-muted-foreground">{r.name}</span>
            <span className="ml-auto font-medium tabular-nums text-foreground">
              {r.value.toLocaleString()}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
