import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { venues, venueById } from "@/lib/data/venues";
import { directions } from "@/lib/data/directions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { SubmissionTimeline } from "@/components/venues/submission-timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = venueById(slug);
  return { title: v ? `${v.name} · 会议全景` : "会议" };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = venueById(slug);
  if (!v) notFound();

  const related = directions
    .filter((d) => d.topVenues.includes(v.id))
    .map((d) => ({ id: d.id, name: d.name, color: d.color, weight: d.papers }))
    .sort((a, b) => b.weight - a.weight);
  const total = related.reduce((s, d) => s + d.weight, 0) || 1;

  const metrics = [
    { label: "录用率", value: v.acceptanceRate ? `${Math.round(v.acceptanceRate * 100)}%` : "—" },
    { label: "平均引用", value: v.avgCitations ?? "—" },
    { label: "H5-index", value: v.h5 ?? "—" },
    { label: "CORE", value: v.coreRank ?? "—" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link href="/venues" className="text-sm text-muted-foreground hover:text-foreground">
        ← 会议全景
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{v.name}</h1>
        <CcfBadge venue={v} />
        {v.link && (
          <a
            href={v.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            官网 <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{v.fullName}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border/60 bg-card/50 p-3">
            <div className="text-[11px] text-muted-foreground">{m.label}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">投稿时间线</CardTitle>
          </CardHeader>
          <CardContent>
            <SubmissionTimeline deadline={v.deadline} />
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
            <Row k="类型" val={v.type === "conference" ? "会议" : "期刊"} />
            <Row k="CCF 领域" val={v.ccfField ?? "—"} />
            <Row k="领域标签" val={v.field} />
            <Row k="DBLP key" val={v.dblpKey ?? "—"} />
            <Row k="EI / SCI" val={`${v.ei ? "EI " : ""}${v.sci ? "SCI" : ""}`.trim() || "—"} />
          </CardContent>
        </Card>
      </div>

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
