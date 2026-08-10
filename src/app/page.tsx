"use client";

import Link from "next/link";
import { HeatHero } from "@/components/dashboard/heat-hero";
import { TopDirections } from "@/components/dashboard/top-directions";
import { DirectionTrend } from "@/components/charts/direction-trend";
import { DirectionsExplorer } from "@/components/directions/directions-explorer";
import { CompareExplorer } from "@/components/compare/compare-explorer";
import { CalendarView } from "@/components/calendar/calendar-view";
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
            <SectionHeader title={t("trend_title")} desc={t("trend_sub")} />
            <div className="mt-6">
              <DirectionTrend />
            </div>
          </section>

          <section id="directions" className="scroll-mt-24">
            <SectionHeader
              title={t("page_directions")}
              desc={t("page_directions_desc")}
              href="/directions"
              hrefLabel={t("home_view_all")}
            />
            <div className="mt-6 space-y-6">
              <div id="ranking" className="scroll-mt-24">
                <TopDirections />
              </div>
              <DirectionsExplorer />
            </div>
            <div className="mt-8">
              <SectionHeader title={t("compare_title")} desc={t("compare_desc")} />
              <div className="mt-4">
                <CompareExplorer />
              </div>
            </div>
          </section>

          <section id="calendar" className="scroll-mt-24">
            <SectionHeader
              title={t("page_calendar")}
              desc={t("page_calendar_desc")}
              href="/venues"
              hrefLabel={t("home_view_all")}
            />
            <div className="mt-6">
              <CalendarView />
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
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      {href && hrefLabel && (
        <Link
          href={href}
          className="shrink-0 text-sm text-primary transition-colors hover:underline"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
