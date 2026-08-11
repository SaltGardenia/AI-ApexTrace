"use client";

import Link from "next/link";
import { HeatHero } from "@/components/dashboard/heat-hero";
import { TopDirections } from "@/components/dashboard/top-directions";
import { DirectionTrend } from "@/components/charts/direction-trend";
import { DirectionsExplorer } from "@/components/directions/directions-explorer";
import { CompareExplorer } from "@/components/compare/compare-explorer";
import { RecentCalendar } from "@/components/calendar/recent-calendar";
import { HomeNav } from "@/components/home/home-nav";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

const NAV_SECTIONS = [
  { id: "trend", key: "home_nav_trend" },
  { id: "ranking", key: "home_nav_ranking" },
  { id: "field-treemap", key: "home_nav_treemap" },
  { id: "quadrant", key: "home_nav_quadrant" },
  { id: "direction-list", key: "home_nav_list" },
  { id: "compare-radar", key: "home_nav_compare_radar" },
  { id: "compare-line", key: "home_nav_compare_line" },
  { id: "compare-table", key: "home_nav_compare_table" },
  { id: "calendar", key: "home_nav_calendar" },
] as const;

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="pb-16">
      <HeatHero />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[200px_1fr] lg:gap-12">
        <aside>
          <HomeNav
            sections={NAV_SECTIONS.map((s) => ({ id: s.id, label: t(s.key as DictKey) }))}
          />
        </aside>

        <div className="min-w-0 space-y-20">
          <section id="trend" className="scroll-mt-24">
            <div className="mt-6">
              <DirectionTrend />
            </div>
          </section>

          <section id="directions" className="scroll-mt-24">
            <div className="mt-6 space-y-6">
              <div id="ranking" className="scroll-mt-24">
                <TopDirections />
              </div>
              <DirectionsExplorer />
            </div>
            <div className="mt-8">
              <div className="mt-4">
                <CompareExplorer />
              </div>
            </div>
          </section>

          <section id="calendar" className="scroll-mt-24">
            <SectionHeader
              title={t("page_calendar")}
              desc={t("home_calendar_desc")}
              href="/calendar"
              hrefLabel={t("full_calendar")}
            />
            <div className="mt-6">
              <RecentCalendar />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  desc,
  href,
  hrefLabel,
}: {
  title: string;
  desc: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-border/60 pb-3">
      <div className="flex items-start gap-3">
        <span className="mt-1 hidden h-7 w-1 shrink-0 rounded-full bg-primary/70 sm:block" />
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      {href && hrefLabel && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm text-primary transition-colors hover:gap-2 hover:underline"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
