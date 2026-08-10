"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { venues } from "@/lib/data/venues";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { cn } from "@/lib/utils";
import type { CCFLevel } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const LEVELS: ("all" | "A" | "B" | "C" | "none")[] = ["all", "A", "B", "C", "none"];
const levelLabel = (l: string) => (l === "all" ? "全部" : l === "none" ? "非 CCF" : `CCF-${l}`);
const TYPES: ("all" | "conference" | "journal")[] = ["all", "conference", "journal"];

type SortKey = "heat" | "acceptance" | "citations" | "h5";

export function VenuesTable() {
  const { pick, t } = useI18n();
  const [type, setType] = React.useState<"all" | "conference" | "journal">("all");
  const [level, setLevel] = React.useState<"all" | CCFLevel | "none">("all");
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("heat");

  const list = venues
    .filter((v) => {
      const okType = type === "all" || v.type === type;
      const okLevel =
        level === "all" ||
        (level === "none" ? !v.ccf : v.ccf === level);
      const okQ =
        !q ||
        v.name.toLowerCase().includes(q.toLowerCase()) ||
        v.fullName.toLowerCase().includes(q.toLowerCase());
      return okType && okLevel && okQ;
    })
    .sort((a, b) => {
      switch (sort) {
        case "acceptance": return (a.acceptanceRate ?? 0) - (b.acceptanceRate ?? 0);
        case "citations": return (b.avgCitations ?? 0) - (a.avgCitations ?? 0);
        case "h5": return (b.h5 ?? 0) - (a.h5 ?? 0);
        default: {
          const rank = (v: typeof a) => (v.ccf === "A" ? 3 : v.ccf === "B" ? 2 : v.ccf === "C" ? 1 : 0);
          return rank(b) - rank(a);
        }
      }
    });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1">
          {TYPES.map((ty) => (
            <button
              key={ty}
              onClick={() => setType(ty)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                type === ty ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {ty === "all" ? t("venue_all") : ty === "conference" ? t("venue_conf") : t("venue_journal")}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                level === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {levelLabel(l)}
            </button>
          ))}
        </div>
        <Input
          placeholder="搜索会议 / 期刊…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="max-w-xs"
        />
        <div className="ml-auto flex gap-1 text-xs">
          {([
            ["heat", "等级"],
            ["acceptance", "录用率"],
            ["citations", "引用"],
            ["h5", "H5"],
          ] as [SortKey, string][]).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={cn(
                "rounded-md px-2 py-1 transition-colors",
                sort === k ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">简称</th>
              <th className="px-4 py-2.5 font-medium">全称</th>
              <th className="px-4 py-2.5 font-medium">分级</th>
              <th className="px-4 py-2.5 font-medium">领域</th>
              <th className="px-4 py-2.5 text-right font-medium">录用率</th>
              <th className="px-4 py-2.5 text-right font-medium">平均引用</th>
              <th className="px-4 py-2.5 text-right font-medium">H5</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => (
              <tr key={v.id} className="border-t border-border/40 hover:bg-muted/40">
                <td className="px-4 py-2.5">
                  <Link href={`/venues/${v.id}`} className="font-medium text-primary hover:underline">
                    {v.name}
                  </Link>
                </td>
                <td className="max-w-[260px] truncate px-4 py-2.5 text-muted-foreground">{v.fullName}</td>
                <td className="px-4 py-2.5"><CcfBadge venue={v} /></td>
                <td className="px-4 py-2.5 text-muted-foreground">{pick(v.field)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {v.acceptanceRate ? `${Math.round(v.acceptanceRate * 100)}%` : "—"}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">{v.avgCitations ?? "—"}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{v.h5 ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
