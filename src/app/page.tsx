"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeatHero } from "@/components/dashboard/heat-hero";
import { TopDirections } from "@/components/dashboard/top-directions";
import { DirectionTrend } from "@/components/charts/direction-trend";
import { ConferenceTimeline } from "@/components/dashboard/conference-timeline";
import { HomeNav } from "@/components/home/home-nav";
import { useI18n } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/translations";

const QUICK = [
  { href: "/directions", titleKey: "ql_directions", descKey: "ql_directions_desc" },
  { href: "/venues", titleKey: "ql_venues", descKey: "ql_venues_desc" },
  { href: "/calendar", titleKey: "ql_calendar", descKey: "ql_calendar_desc" },
] as const;

const NAV_SECTIONS = [
  { id: "ranking", key: "home_nav_ranking" },
  { id: "trend", key: "home_nav_trend" },
  { id: "timeline", key: "home_nav_timeline" },
  { id: "explore", key: "home_nav_explore" },
] as const;

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="pb-16">
      <HeatHero />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[180px_1fr] lg:gap-12">
        <aside>
          <HomeNav
            sections={NAV_SECTIONS.map((s) => ({ id: s.id, label: t(s.key as DictKey) }))}
          />
        </aside>

        <div className="min-w-0 space-y-16">
          <section id="ranking" className="scroll-mt-24">
            <SectionHeader
              title={t("ranking_title")}
              desc={t("sort_overall")}
              href="/directions"
              hrefLabel={t("nav_directions")}
            />
            <div className="mt-5 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <TopDirections />
              </div>
              <div className="lg:col-span-2">
                <DirectionTrend />
              </div>
            </div>
          </section>

          <section id="timeline" className="scroll-mt-24">
            <ConferenceTimeline />
          </section>

          <section id="explore" className="scroll-mt-24">
            <SectionHeader title={t("home_nav_explore")} desc={t("hero_desc")} />
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {QUICK.map((q) => (
                <QuickLink key={q.href} href={q.href} title={t(q.titleKey)} desc={t(q.descKey)} />
              ))}
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
      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/40 p-5 transition-all hover:border-primary/40 hover:bg-card/80"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,theme(colors.primary/10%),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <p className="relative mt-1 text-sm text-muted-foreground">{desc}</p>
    </Link>
  );
}
