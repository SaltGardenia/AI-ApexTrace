"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, Layers, TrendingUp } from "lucide-react";
import { directions } from "@/lib/data/directions";
import { venues } from "@/lib/data/venues";

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
  const globe = useCountUp(87.4);
  const totalPapers = directions.reduce((s, d) => s + d.papers, 0);
  const avgOpen = Math.round(
    (directions.reduce((s, d) => s + d.openRate, 0) / directions.length) * 100,
  );

  const tiles = [
    { icon: Layers, label: "年度录用论文(估)", value: `${(totalPapers / 1000).toFixed(1)}k`, sub: "DBLP 正式发表口径" },
    { icon: TrendingUp, label: "同比增长", value: "+12.6%", sub: "较上一统计周期" },
    { icon: CalendarClock, label: "收录 venues", value: `${venues.length}`, sub: "A/B/C 类 + 业界顶会" },
    { icon: ArrowUpRight, label: "平均开源率", value: `${avgOpen}%`, sub: "含代码仓库占比" },
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
            AI 研究版图指数
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            全景透视 CCF A/B/C 类顶会顶刊的研究方向热度、会议画像与投稿时间线，
            以指数化、对比化视角呈现 AI 学术版图。
          </p>

          <div className="mt-6 flex items-end gap-4">
            <div className="text-6xl font-bold tabular-nums tracking-tight">
              {globe.toFixed(1)}
            </div>
            <div className="pb-2 text-sm text-muted-foreground">
              <div>综合热度指数</div>
              <div className="text-emerald-400">▲ 12.6% YoY</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {tiles.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="rounded-xl border border-border/60 bg-card/50 p-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <t.icon className="size-4" />
                  <span className="text-xs">{t.label}</span>
                </div>
                <div className="mt-2 text-xl font-semibold tabular-nums">{t.value}</div>
                <div className="text-[11px] text-muted-foreground">{t.sub}</div>
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
