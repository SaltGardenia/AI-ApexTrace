import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, CalendarDays, ExternalLink, Radio } from "lucide-react";
import { venues, venueById } from "@/lib/data/venues";
import { directions } from "@/lib/data/directions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { SubmissionTimeline } from "@/components/venues/submission-timeline";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return venues.map((x) => ({ slug: x.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = venueById(slug);
  return { title: v ? `${v.name} · ${v.type === "conference" ? "会议全景" : "期刊全景"}` : "出版物" };
}

const CAS_CLS: Record<1 | 2 | 3 | 4, string> = {
  1: "bg-[#7c9cf0]/15 text-[#6f8ce0] border border-[#7c9cf0]/30",
  2: "bg-[#5ac9a6]/15 text-[#4fae90] border border-[#5ac9a6]/30",
  3: "bg-[#e0b257]/15 text-[#c79a45] border border-[#e0b257]/30",
  4: "bg-[#d98a8a]/15 text-[#c2766f] border border-[#d98a8a]/30",
};

const JCR_CLS: Record<string, string> = {
  Q1: "bg-[#6bb39a]/15 text-[#5a9c86]",
  Q2: "bg-[#5aa9c9]/15 text-[#4f93ae]",
  Q3: "bg-[#c9a95a]/15 text-[#b0913f]",
  Q4: "bg-[#d08a8a]/15 text-[#c2766f]",
};

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = venueById(slug);
  if (!v) notFound();

  const isConf = v.type === "conference";

  const related = directions
    .filter((d) => d.topVenues.includes(v.id))
    .map((d) => ({ id: d.id, name: d.name.zh, color: d.color, weight: d.papers }))
    .sort((a, b) => b.weight - a.weight);
  const total = related.reduce((s, d) => s + d.weight, 0) || 1;

  const peers = venues
    .filter((x) => x.id !== v.id && x.type === v.type && x.field.zh === v.field.zh)
    .sort((a, b) => (b.ccf ?? "").localeCompare(a.ccf ?? ""));

  const metrics = [
    { label: "录用率", value: v.acceptanceRate ? `${Math.round(v.acceptanceRate * 100)}%` : "—" },
    { label: "平均引用", value: v.avgCitations ?? "—" },
    { label: "H5-index", value: v.h5 ?? "—" },
    { label: "CORE", value: v.coreRank ?? "—" },
    { label: "中科院分区", value: v.cas ? `CAS ${v.cas}` : "—" },
    { label: "JCR 分区", value: v.jcr ?? "—" },
  ];

  const externalLinks = [
    v.link ? { key: "home", label: "官网主页", href: v.link } : null,
    v.deadline?.link
      ? { key: "edition", label: `本届主页（${v.deadline.year}）`, href: v.deadline.link }
      : null,
    v.dblpKey
      ? { key: "dblp", label: "DBLP", href: `https://dblp.org/db/${v.dblpKey}/` }
      : null,
  ].filter((x): x is { key: string; label: string; href: string } => x !== null)
   .filter((x, i, arr) => arr.findIndex((y) => y.href === x.href) === i);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        href={isConf ? "/venues" : "/journals"}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← {isConf ? "会议全景" : "期刊全景"}
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{v.name}</h1>
        <CcfBadge venue={v} />
        {v.cas && (
          <span className={cn("rounded px-1.5 py-0.5 text-xs font-medium", CAS_CLS[v.cas])}>
            CAS {v.cas}
          </span>
        )}
        {v.jcr && (
          <span className={cn("rounded px-1.5 py-0.5 text-xs font-medium", JCR_CLS[v.jcr])}>
            {v.jcr}
          </span>
        )}
      </div>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{v.fullName}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border/60 bg-card/50 p-3">
            <div className="text-[11px] text-muted-foreground">{m.label}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{m.value}</div>
          </div>
        ))}
      </div>

      {externalLinks.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ExternalLink className="size-4" /> 相关链接
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {externalLinks.map((l) => (
                  <a
                    key={l.key}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:border-primary/40 hover:text-primary"
                  >
                    {l.label}
                    <ExternalLink className="size-3.5" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              {isConf ? <CalendarDays className="size-4" /> : <BookOpen className="size-4" />}
              {isConf ? "投稿时间线" : "出版信息"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isConf ? (
              <SubmissionTimeline deadline={v.deadline} />
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <Tag label="SCI" on={!!v.sci} />
                  <Tag label="EI" on={!!v.ei} />
                  {v.cas && <Tag label={`CAS ${v.cas}`} on />}
                  {v.jcr && <Tag label={v.jcr} on />}
                </div>
                <p className="text-muted-foreground">
                  期刊为持续征稿，无统一截稿日期。具体投稿须知、审稿周期与版面费请以官网公告为准。
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">研究方向分布</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {related.length === 0 && (
              <p className="text-sm text-muted-foreground">暂无关联方向数据。</p>
            )}
            {related.map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <Link
                  href={`/directions/${d.id}`}
                  className="flex w-24 shrink-0 items-center gap-1.5 text-sm hover:text-primary"
                >
                  <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </Link>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted/60">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${(d.weight / total) * 100}%`, background: d.color }}
                  />
                </div>
                <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
                  {Math.round((d.weight / total) * 100)}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">基础信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row k="类型" val={isConf ? "会议" : "期刊"} />
            <Row k="CCF 等级" val={v.ccf ? `CCF-${v.ccf}` : "非 CCF"} />
            <Row k="CCF 领域" val={v.ccfField?.zh ?? "—"} />
            <Row k="领域标签" val={v.field.zh} />
            <Row k="中科院分区" val={v.cas ? `CAS ${v.cas}` : "—"} />
            <Row k="JCR 分区" val={v.jcr ?? "—"} />
            <Row k="CORE" val={v.coreRank ?? "—"} />
            <Row k="收录" val={`${v.sci ? "SCI " : ""}${v.ei ? "EI" : ""}`.trim() || "—"} />
            <Row k="DBLP key" val={v.dblpKey ?? "—"} />
          </CardContent>
        </Card>
      </div>

      {peers.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Radio className="size-4" /> 同领域其他{v.type === "conference" ? "会议" : "期刊"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {peers.map((p) => (
              <Link
                key={p.id}
                href={`/venues/${p.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:border-primary/40"
              >
                <span className="font-medium">{p.name}</span>
                {p.ccf && <span className="text-xs text-muted-foreground">CCF-{p.ccf}</span>}
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">关联研究方向</h3>
          <div className="flex flex-wrap gap-2">
            {related.map((d) => (
              <Link
                key={d.id}
                href={`/directions/${d.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:border-primary/40"
              >
                <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                {d.name}
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, val }: { k: string; val: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-medium">{val}</span>
    </div>
  );
}

function Tag({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium",
        on
          ? "bg-primary/10 text-primary"
          : "border border-dashed border-border text-muted-foreground/60 line-through",
      )}
    >
      {label}
    </span>
  );
}
