import type { Metadata } from "next";
import { Database, GitBranch, Scale } from "lucide-react";
import { heatWeights } from "@/lib/heat-index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "关于",
  description: "AI 研究热度指数的计算口径、数据来源与局限性。",
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

const LIMITS = [
  "新论文引用存在滞后，新方向冷启动期影响力被低估。",
  "方向分类依赖主题模型，存在少量标注误差。",
  "开源率依赖 GitHub 链接识别，覆盖不完全。",
  "CCF 等级年度变动可能导致跨年口径不可比。",
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">关于 & 更新日志</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          公开、可解释、可复现的 AI 研究热度指数计算口径。
        </p>
      </div>

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

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GitBranch className="size-4" /> 局限性说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {LIMITS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="size-4" /> 数据管线与多源交叉印证
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>每个子领域的论文数由离线数据管线生成，而非手工填写：</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li><span className="text-foreground">采集</span>：对领域树每个末级节点，并行查询 OpenAlex（主）、Crossref、arXiv 三源，原始计数落盘缓存、可断点续跑。</li>
            <li><span className="text-foreground">映射</span>：用 OpenAlex concepts 官方主题体系将自研领域树自动归一，解决「自研分类 vs 真实分类不对应」问题。</li>
            <li><span className="text-foreground">交叉印证</span>：以 OpenAlex 短语口径为最终值，concept 口径互相验证；Crossref/arXiv 仅佐证方向是否有真实体量，不参与数值合成。</li>
            <li><span className="text-foreground">可信度</span>：各口径比值 &lt;3 标记为 high，单一可靠口径为 high，严重分歧降为 low/medium，并在详情页标注。</li>
            <li><span className="text-foreground">归一化</span>：真实绝对数（常达数万）经 log 压缩后映射到图表可视区间，保留相对排序，详情页展示原始真实数。</li>
          </ol>
          <p className="pt-1">数据产物位于 <code className="rounded bg-muted px-1">src/lib/data/generated/field-stats.json</code>，可重跑 <code className="rounded bg-muted px-1">scripts/pipeline</code> 刷新。</p>
        </CardContent>
      </Card>

    </div>
  );
}
