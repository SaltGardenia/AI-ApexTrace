import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Building2, Layers } from "lucide-react";
import { directions } from "@/lib/data/directions";
import { rankedDirections } from "@/lib/heat-index";
import { milestonesByDirection } from "@/lib/data/milestones";
import { bottlenecksByDirection } from "@/lib/data/bottlenecks";
import { venueById } from "@/lib/data/venues";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CcfBadge } from "@/components/shared/ccf-badge";
import { DirectionCharts } from "@/components/directions/direction-charts";
import { MilestoneTree } from "@/components/directions/milestone-tree";
import { BottleneckList } from "@/components/directions/bottleneck-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = directions.find((x) => x.id === slug);
  return { title: d ? d.name : "研究方向" };
}

export default async function DirectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = directions.find((x) => x.id === slug);
  if (!d) notFound();
  const ranked = rankedDirections.find((x) => x.id === slug)!;
  const ms = milestonesByDirection(slug);
  const bs = bottlenecksByDirection(slug);
  const topVenues = d.topVenues.map((id) => venueById(id)).filter(Boolean);

  const stats = [
    { label: "综合热度指数", value: ranked.heatIndex.toString() },
    { label: "年度论文产出", value: d.papers.toLocaleString() },
    { label: "平均引用", value: d.avgCitations.toString() },
    { label: "高被引占比(Top10%)", value: `${Math.round(d.topCitedRatio * 100)}%` },
    { label: "2年复合增长", value: `${Math.round(d.growth * 100)}%` },
    { label: "开源率", value: `${Math.round(d.openRate * 100)}%` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link href="/directions" className="text-sm text-muted-foreground hover:text-foreground">
        ← 研究方向版图
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span className="size-4 rounded-full" style={{ background: d.color }} />
        <h1 className="text-2xl font-semibold tracking-tight">{d.name}</h1>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
          Heat {ranked.heatIndex}
        </span>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{d.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-card/50 p-3">
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <DirectionCharts direction={d} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">核心承载会议</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {topVenues.map(
              (v) =>
                v && (
                  <Link
                    key={v.id}
                    href={`/venues/${v.id}`}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-sm hover:border-primary/40"
                  >
                    <span className="font-medium">{v.name}</span>
                    <CcfBadge venue={v} />
                  </Link>
                ),
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="size-4" /> 代表机构 TOP5
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {d.topInstitutions.map((inst, i) => (
              <div key={inst.name} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                <span className="flex-1 text-sm">{inst.name}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{inst.papers}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="size-4" /> 里程碑与前沿瓶颈
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="milestone">
            <TabsList>
              <TabsTrigger value="milestone">里程碑工作树</TabsTrigger>
              <TabsTrigger value="bottleneck">前沿瓶颈清单</TabsTrigger>
            </TabsList>
            <TabsContent value="milestone" className="mt-4">
              <MilestoneTree milestones={ms} />
            </TabsContent>
            <TabsContent value="bottleneck" className="mt-4">
              <BottleneckList bottlenecks={bs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {d.crossDirections.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">交叉关联方向</h3>
          <div className="flex flex-wrap gap-2">
            {d.crossDirections.map((cid) => {
              const c = directions.find((x) => x.id === cid);
              if (!c) return null;
              return (
                <Link
                  key={cid}
                  href={`/directions/${cid}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:border-primary/40"
                >
                  <span className="size-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
