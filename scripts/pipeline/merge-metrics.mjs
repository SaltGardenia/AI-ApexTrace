// 合并层：把 metrics-cache/<id>.json 合成前端消费的 field-metrics.json。
// 仅纳入「完整且通过校验」的节点；不完整节点不产出，前端回退到骨架默认值。
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const CACHE = path.join(ROOT, "metrics-cache");
const GEN = path.resolve(ROOT, "..", "..", "src", "lib", "data", "generated");
mkdirSync(GEN, { recursive: true });

function main() {
  if (!existsSync(CACHE)) {
    console.log("[merge] 无 metrics-cache，跳过");
    return;
  }
  const files = readdirSync(CACHE).filter((f) => f.endsWith(".json"));
  const leaves = [];
  let skipped = 0;
  for (const f of files) {
    const d = JSON.parse(readFileSync(path.join(CACHE, f), "utf8"));
    const ok =
      d.ok &&
      d.paperCount > 0 &&
      Array.isArray(d.topVenues) &&
      d.topVenues.length > 0 &&
      d.avgCitations > 0 &&
      d.openRate > 0 &&
      d.openRate <= 1 &&
      Array.isArray(d.yearly) &&
      d.yearly.length > 0;
    if (!ok) {
      skipped++;
      continue;
    }
    leaves.push({
      id: d.id,
      paperCount: d.paperCount,
      yearly: d.yearly,
      topVenues: d.topVenues,
      topInstitutions: d.topInstitutions,
      avgCitations: d.avgCitations,
      topCitedRatio: d.topCitedRatio,
      openRate: d.openRate,
      growth: d.growth,
    });
  }
  const out = {
    generatedAt: new Date().toISOString(),
    method:
      "OpenAlex /works 采样（top-cited 200 篇）计算平均被引/高引占比/开放率/来源机构；逐年分布用 11 次 meta.count 精确统计。",
    sources: ["OpenAlex"],
    leaves,
  };
  writeFileSync(path.join(GEN, "field-metrics.json"), JSON.stringify(out, null, 2));
  console.log(`[merge] 写出 ${leaves.length} 个末级真实指标（跳过不完整 ${skipped}） → src/lib/data/generated/field-metrics.json`);
}

main();
