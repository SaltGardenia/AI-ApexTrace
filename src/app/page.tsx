import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeatHero } from "@/components/dashboard/heat-hero";
import { TopDirections } from "@/components/dashboard/top-directions";
import { DirectionTrend } from "@/components/charts/direction-trend";
import { ConferenceTimeline } from "@/components/dashboard/conference-timeline";

export default function HomePage() {
  return (
    <div className="pb-12">
      <HeatHero />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TopDirections />
          </div>
          <div className="lg:col-span-2">
            <DirectionTrend />
          </div>
        </div>
      </section>

      <ConferenceTimeline />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <QuickLink
            href="/directions"
            title="研究方向版图"
            desc="气泡象限、雷达画像与里程碑/瓶颈"
          />
          <QuickLink
            href="/venues"
            title="会议全景"
            desc="CCF 等级、录用率与方向分布"
          />
          <QuickLink
            href="/calendar"
            title="会议日历"
            desc="全年截稿与开会时间线"
          />
        </div>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40 hover:bg-card/80"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </Link>
  );
}
