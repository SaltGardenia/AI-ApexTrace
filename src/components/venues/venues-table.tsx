"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Check, ChevronDown } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { cn } from "@/lib/utils";
import type { CCFLevel, CasDivision, JcrQuartile } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

type LevelKey = "all" | CCFLevel | "none";
type CasKey = "all" | CasDivision;
type JcrKey = "all" | JcrQuartile;

type SortKey = "ccf" | "acceptance" | "citations" | "h5";
type SortDir = "asc" | "desc";

const JCR_CLS: Record<"Q1" | "Q2" | "Q3" | "Q4", string> = {
  Q1: "bg-[#6bb39a]/15 text-[#5a9c86]",
  Q2: "bg-[#5aa9c9]/15 text-[#4f93ae]",
  Q3: "bg-[#c9a95a]/15 text-[#b0913f]",
  Q4: "bg-[#d08a8a]/15 text-[#c2766f]",
};

const CCF_DOT: Record<"A" | "B" | "C" | "none", string> = {
  A: "#f43f5e",
  B: "#f59e0b",
  C: "#0ea5e9",
  none: "#94a3b8",
};

const CAS_DOT: Record<1 | 2 | 3 | 4, string> = {
  1: "#7c9cf0",
  2: "#5ac9a6",
  3: "#e0b257",
  4: "#d98a8a",
};

const CAS_CLS: Record<1 | 2 | 3 | 4, string> = {
  1: "bg-[#7c9cf0]/15 text-[#6f8ce0] border border-[#7c9cf0]/30",
  2: "bg-[#5ac9a6]/15 text-[#4fae90] border border-[#5ac9a6]/30",
  3: "bg-[#e0b257]/15 text-[#c79a45] border border-[#e0b257]/30",
  4: "bg-[#d98a8a]/15 text-[#c2766f] border border-[#d98a8a]/30",
};

const JCR_DOT: Record<"Q1" | "Q2" | "Q3" | "Q4", string> = {
  Q1: "#6bb39a",
  Q2: "#5aa9c9",
  Q3: "#c9a95a",
  Q4: "#d08a8a",
};

const LEVELS: LevelKey[] = ["all", "A", "B", "C", "none"];
const levelLabel = (l: LevelKey) =>
  l === "all" ? t_global("th_filter_all") : l === "none" ? "非 CCF" : `CCF-${l}`;
const CAS_OPTS: CasKey[] = ["all", 1, 2, 3, 4];
const JCR_OPTS: JcrKey[] = ["all", "Q1", "Q2", "Q3", "Q4"];

// avoid useI18n in module scope; read lazily via closure below
let _t: ((k: any) => string) | null = null;
function t_global(k: string): string {
  return _t ? _t(k as any) : k;
}

const ccfRank = (v: { ccf: CCFLevel }) =>
  v.ccf === "A" ? 3 : v.ccf === "B" ? 2 : v.ccf === "C" ? 1 : 0;

export function VenuesTable({
  type = "conference",
  q,
  onQChange,
}: {
  type?: "conference" | "journal";
  q?: string;
  onQChange?: (v: string) => void;
}) {
  const { pick, t } = useI18n();
  _t = t;
  const [innerQ, setInnerQ] = React.useState("");
  const query = q ?? innerQ;
  const setQuery = onQChange ?? setInnerQ;
  const [level, setLevel] = React.useState<LevelKey>("all");
  const [cas, setCas] = React.useState<CasKey>("all");
  const [jcr, setJcr] = React.useState<JcrKey>("all");
  const [sort, setSort] = React.useState<SortKey>("ccf");
  const [dir, setDir] = React.useState<SortDir>("desc");

  const toggleSort = (key: SortKey) => {
    if (sort === key) setDir((d) => (d === "desc" ? "asc" : "desc"));
    else {
      setSort(key);
      setDir("desc");
    }
  };

  const list = venues
    .filter((v) => {
      const okType = v.type === type;
      const okLevel = level === "all" || (level === "none" ? !v.ccf : v.ccf === level);
      const okCas = cas === "all" || v.cas === cas;
      const okJcr = jcr === "all" || v.jcr === jcr;
      const okQ =
        !query ||
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.fullName.toLowerCase().includes(query.toLowerCase());
      return okType && okLevel && okCas && okJcr && okQ;
    })
    .sort((a, b) => {
      let cmp = 0;
      switch (sort) {
        case "ccf": cmp = ccfRank(a) - ccfRank(b); break;
        case "acceptance": cmp = (a.acceptanceRate ?? 0) - (b.acceptanceRate ?? 0); break;
        case "citations": cmp = (a.avgCitations ?? 0) - (b.avgCitations ?? 0); break;
        case "h5": cmp = (a.h5 ?? 0) - (b.h5 ?? 0); break;
      }
      // secondary: CCF rank then name
      if (cmp === 0) cmp = ccfRank(b) - ccfRank(a);
      if (cmp === 0) cmp = a.name.localeCompare(b.name);
      return dir === "desc" ? -cmp : cmp;
    });

  const activeFilters =
    (level !== "all" ? 1 : 0) + (cas !== "all" ? 1 : 0) + (jcr !== "all" ? 1 : 0);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full min-w-[920px] text-sm">
          <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">{t("th_abbr")}</th>
              <th className="px-4 py-2.5 font-medium">{t("th_field")}</th>
              <th className="px-4 py-2.5 font-medium">
                <HeaderFilter
                  label={t("th_tier")}
                  active={level !== "all"}
                  options={LEVELS.map((l) => ({
                    value: l,
                    label: levelLabel(l),
                    dot: l === "all" ? undefined : CCF_DOT[l as "A" | "B" | "C" | "none"],
                  }))}
                  selected={level}
                  onSelect={(v) => setLevel(v as LevelKey)}
                />
              </th>
              <th className="px-4 py-2.5 text-center font-medium">
                <HeaderFilter
                  label={t("th_cas")}
                  align="center"
                  active={cas !== "all"}
                  options={CAS_OPTS.map((c) => ({
                    value: c,
                    label: c === "all" ? t("th_filter_all") : `CAS ${c}`,
                    dot: c === "all" ? undefined : CAS_DOT[c as 1 | 2 | 3 | 4],
                  }))}
                  selected={cas}
                  onSelect={(v) => setCas(v as CasKey)}
                />
              </th>
              <th className="px-4 py-2.5 text-center font-medium">
                <HeaderFilter
                  label={t("th_jcr")}
                  align="center"
                  active={jcr !== "all"}
                  options={JCR_OPTS.map((j) => ({
                    value: j,
                    label: j === "all" ? t("th_filter_all") : (j ?? ""),
                    dot: j === "all" ? undefined : JCR_DOT[j as "Q1" | "Q2" | "Q3" | "Q4"],
                  }))}
                  selected={jcr}
                  onSelect={(v) => setJcr(v as JcrKey)}
                />
              </th>
              <th className="px-4 py-2.5 text-right font-medium">
                <SortHeader label={t("th_accept")} dir={sort === "acceptance" ? dir : null} onClick={() => toggleSort("acceptance")} />
              </th>
              <th className="px-4 py-2.5 text-right font-medium">
                <SortHeader label={t("th_cit")} dir={sort === "citations" ? dir : null} onClick={() => toggleSort("citations")} />
              </th>
              <th className="px-4 py-2.5 text-right font-medium">
                <SortHeader label={t("th_h5")} dir={sort === "h5" ? dir : null} onClick={() => toggleSort("h5")} />
              </th>
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
                <td className="px-4 py-2.5 text-muted-foreground">{pick(v.field)}</td>
                <td className="px-4 py-2.5"><CcfBadge venue={v} /></td>
                <td className="px-4 py-2.5 text-center tabular-nums">
                  {v.cas ? (
                    <span className={cn("rounded px-1.5 py-0.5 text-xs font-medium", CAS_CLS[v.cas])}>CAS {v.cas}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center">
                  {v.jcr ? (
                    <span className={cn("rounded px-1.5 py-0.5 text-xs font-medium", JCR_CLS[v.jcr])}>{v.jcr}</span>
                  ) : (
                    <span className="text-muted-foreground/50">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {v.acceptanceRate ? `${Math.round(v.acceptanceRate * 100)}%` : <span className="text-muted-foreground/50">—</span>}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">{v.avgCitations ?? <span className="text-muted-foreground/50">—</span>}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{v.h5 ?? <span className="text-muted-foreground/50">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {t("venue_count", { n: list.length })}
        {activeFilters > 0 && ` · ${t("venue_filtered", { n: activeFilters })}`}
      </p>
    </div>
  );
}

function SortHeader({
  label,
  dir,
  onClick,
}: {
  label: string;
  dir: SortDir | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="ml-auto flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
      data-active={dir !== null}
    >
      {label}
      {dir === "asc" ? (
        <ArrowUp className="size-3" />
      ) : dir === "desc" ? (
        <ArrowDown className="size-3" />
      ) : (
        <ArrowDown className="size-3 opacity-25" />
      )}
    </button>
  );
}

function HeaderFilter({
  label,
  options,
  selected,
  onSelect,
  active,
  align = "left",
  sortable = false,
  sortDir = null,
  onSort,
}: {
  label: string;
  options: { value: string | number | null; label: string; dot?: string }[];
  selected: string | number | null;
  onSelect: (v: string | number | null) => void;
  active: boolean;
  align?: "left" | "center";
  sortable?: boolean;
  sortDir?: SortDir | null;
  onSort?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", align === "center" && "flex justify-center")}>
      <div className="flex items-center gap-1">
        {sortable && onSort && (
          <button
            onClick={onSort}
            className="flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            data-active={sortDir !== null}
          >
            {label}
            {sortDir === "asc" ? (
              <ArrowUp className="size-3" />
            ) : sortDir === "desc" ? (
              <ArrowDown className="size-3" />
            ) : (
              <ArrowDown className="size-3 opacity-25" />
            )}
          </button>
        )}
        {!sortable && <span className="font-medium">{label}</span>}
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex items-center gap-0.5 rounded px-1 py-0.5 transition-colors",
            active ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={`Filter ${label}`}
        >
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="absolute z-20 mt-1 min-w-[140px] rounded-lg border border-border bg-popover p-1 shadow-lg">
          {options.map((o) => {
            const on = selected === o.value;
            return (
              <button
                key={String(o.value)}
                onClick={() => {
                  onSelect(o.value);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted/60"
              >
                {o.dot ? (
                  <span className="size-3.5 shrink-0 rounded-sm" style={{ background: o.dot }} />
                ) : (
                  <span
                    className={cn(
                      "grid size-3.5 place-items-center rounded border",
                      on ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    )}
                  >
                    {on && <Check className="size-2.5" />}
                  </span>
                )}
                <span className={cn(on ? "font-medium text-foreground" : "text-muted-foreground")}>{o.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
