import type { Metadata } from "next";
import { Database, Mail, Scale } from "lucide-react";
import { heatWeights } from "@/lib/heat-index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONTACT_EMAIL = "saltgardenia@gmail.com";

export const metadata: Metadata = {
  title: "关于",
  description: "AI 研究热度指数的计算口径与数据来源。",
};

const WEIGHT_ROWS = [
  { name: "产出规模分", desc: "该方向当年顶会顶刊论文数量归一化", w: heatWeights.output },
  { name: "学术影响力分", desc: "论文平均引用、高被引占比（Top 10%）加权归一化", w: heatWeights.impact },
  { name: "增长趋势分", desc: "近 2 年论文数量复合增长率归一化", w: heatWeights.growth },
  { name: "生态活跃度分", desc: "论文开源率（GitHub 链接占比）归一化", w: heatWeights.ecosystem },
];

const SOURCES = [
  { name: "OpenAlex", desc: "主力数据源（CC0 开放）。用 title/abstract 精确短语匹配统计各子领域 2015–2025 论文数，并以 concepts 官方主题体系做分类归一。" },
  { name: "Crossref", desc: "交叉校验源。全文检索总量用于佐证方向的真实体量，口径较宽（含预印本与会议录），不参与最终数值合成。" },
  { name: "arXiv", desc: "趋势补充源。预印本检索量用于观察新兴方向的早期热度，仅作参照不参与合成。" },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">关于</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="size-4" /> 热度指数公式
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-border/60 bg-muted/30 p-4 text-center font-mono text-sm">
            Heat Index = 0.4·产出 + 0.3·影响力 + 0.2·增长 + 0.1·生态
          </div>
          <div className="space-y-2">
            {WEIGHT_ROWS.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm font-medium">{r.name}</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted/60">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${r.w * 100}%` }} />
                </div>
                <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
                  {Math.round(r.w * 100)}%
                </span>
                <span className="hidden w-72 shrink-0 text-xs text-muted-foreground sm:block">{r.desc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="size-4" /> 数据来源
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {SOURCES.map((s) => (
            <div key={s.name} className="border-b border-border/40 pb-2 last:border-0">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="size-4" /> 勘误与联系
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>如发现数据、分类或引用上的错误，欢迎反馈以便及时勘误。</p>
          <Button
            render={<a href={`mailto:${CONTACT_EMAIL}`} />}
            variant="outline"
            className="gap-2"
          >
            <Mail className="size-4" />
            {CONTACT_EMAIL}
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
