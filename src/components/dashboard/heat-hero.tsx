"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, Layers, TrendingUp } from "lucide-react";
import { directions } from "@/lib/data/directions";
import { venues } from "@/lib/data/venues";
import { useI18n } from "@/lib/i18n";

const ResearchGlobe = dynamic(() => import("@/components/three/research-globe"), {
  ssr: false,
  loading: () => <div className="size-full" />,
});

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export function HeatHero() {
  const { t } = useI18n();
  const globe = useCountUp(87.4);
  const totalPapers = directions.reduce((s, d) => s + d.papers, 0);
  const avgOpen = Math.round(
    (directions.reduce((s, d) => s + d.openRate, 0) / directions.length) * 100,
  );

  const tiles = [
    { icon: Layers, label: t("tile_papers"), value: `${(totalPapers / 1000).toFixed(1)}k`, sub: t("tile_papers_sub") },
    { icon: TrendingUp, label: t("tile_growth"), value: "+12.6%", sub: t("tile_growth_sub") },
    { icon: CalendarClock, label: t("tile_venues"), value: `${venues.length}`, sub: t("tile_venues_sub") },
    { icon: ArrowUpRight, label: t("tile_open"), value: `${avgOpen}%`, sub: t("tile_open_sub") },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_0%,theme(colors.primary/10%),transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-primary">AI Research Landscape Index · v2026.Q2</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("hero_title")}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("hero_desc")}
          </p>

          <div className="mt-6 flex items-end gap-4">
            <div className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-6xl font-bold tabular-nums tracking-tight text-transparent">
              {globe.toFixed(1)}
            </div>
            <div className="pb-2 text-sm text-muted-foreground">
              <div>{t("composite_index")}</div>
              <div className="text-emerald-400">▲ 12.6% YoY</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {tiles.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card/80"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <tile.icon className="size-4" />
                  <span className="text-xs">{tile.label}</span>
                </div>
                <div className="mt-2 text-xl font-semibold tabular-nums">{tile.value}</div>
                <div className="text-[11px] text-muted-foreground">{tile.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative h-[320px] md:h-[420px]"
        >
          <ResearchGlobe />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
