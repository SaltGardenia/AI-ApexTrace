// 合成层：把采集到的多源原始数交叉印证，合成最终 paperCount + confidence + 归一化值。
// 输入：scripts/pipeline/cache/<id>.json（采集层产物）
// 输出：src/lib/data/generated/field-stats.json（前端消费）
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

const GEN_DIR = "src/lib/data/generated";
mkdirSync(GEN_DIR, { recursive: true });

// 交叉印证规则：
//  - 主值 paperCount = oa_phrase（OpenAlex 短语匹配，对应术语最准）
//  - 若 oa_concept 命中且与 phrase 量级接近（比值<3），视为互相印证，confidence 升
//  - Crossref / arXiv 口径天然更宽（全文/预印本），仅用于"方向是否有真实体量"佐证，不参与数值
//  - confidence:
//      high   = oa_phrase 与 oa_concept（若有）比值<3 且 crossref/arxiv 佐证方向存在
//      medium = 仅单一 OpenAlex 口径，或 concept 缺失
//      low    = oa_phrase 与 oa_concept 比值>=3（口径严重分歧）
function synthesize(rec) {
  const s = rec.sources;
  const oa = s.oa_phrase;
  const concept = s.oa_concept;
  let paperCount = oa ?? concept ?? s.crossref ?? s.arxiv ?? 0;
  if (oa != null && oa > 0) paperCount = oa;
  else if (concept != null && concept > 0) paperCount = concept;

  let confidence = "medium";
  if (oa != null && oa > 0 && concept != null && concept > 0) {
    const ratio = Math.max(oa, concept) / Math.min(oa, concept);
    confidence = ratio < 3 ? "high" : "low";
  } else if (oa != null && oa > 0) {
    confidence = "high"; // 单一可靠口径
  }
  // Crossref/arXiv 佐证方向体量（非数值参与）
  const hasCorroboration = (s.crossref ?? 0) > 1000 || (s.arxiv ?? 0) > 1000;
  if (confidence === "low" && hasCorroboration) confidence = "medium";

  return { ...rec, paperCount, confidence, corroborated: hasCorroboration };
}

function main() {
  const { leaves, nodes } = JSON.parse(readFileSync("scripts/pipeline/nodes.json", "utf8"));
  const cacheDir = "scripts/pipeline/cache";
  const collected = [];
  let missing = 0;
  for (const leaf of leaves) {
    const cf = `${cacheDir}/${leaf.id}.json`;
    if (!existsSync(cf)) { missing++; continue; }
    const raw = JSON.parse(readFileSync(cf, "utf8"));
    collected.push(synthesize(raw));
  }
  console.log(`合成 ${collected.length} 个末级（缺失 ${missing}）`);

  // 归一化：用 log 压缩量级差异，映射到原视觉区间（约 100~3000 量级），保留相对排序
  const counts = collected.map((c) => c.paperCount).filter((v) => v > 0);
  const min = Math.min(...counts), max = Math.max(...counts);
  const logMin = Math.log10(min), logMax = Math.log10(max);
  for (const c of collected) {
    if (c.paperCount > 0) {
      const t = (Math.log10(c.paperCount) - logMin) / (logMax - logMin || 1);
      c.paperCountNormalized = Math.round(100 + t * 2900); // 100~3000
    } else {
      c.paperCountNormalized = 0;
    }
  }

  const out = {
    generatedAt: new Date().toISOString(),
    method: "OpenAlex title/abstract phrase 为主口径；Crossref 全文、arXiv 预印本交叉印证；概念口径(concept)辅助归一。",
    sources: ["OpenAlex", "Crossref", "arXiv"],
    leaves: collected,
  };
  writeFileSync(`${GEN_DIR}/field-stats.json`, JSON.stringify(out, null, 2));
  // 汇总打印
  const byConf = collected.reduce((a, c) => ((a[c.confidence] = (a[c.confidence] || 0) + 1), a), {});
  console.log("confidence 分布:", byConf);
  console.log(`已写出 ${GEN_DIR}/field-stats.json`);
  console.log("样例:", collected.slice(0, 3).map((c) => `${c.zh}=${c.paperCount}(norm ${c.paperCountNormalized},${c.confidence})`));
}
main();
