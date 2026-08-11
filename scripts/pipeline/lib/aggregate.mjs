// 聚合层：对领域树末级节点做多源交叉印证（带逐节点缓存，可断点续跑）。
import { openalex, crossref, arxiv } from "./sources.mjs";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

const FROM = 2015, TO = 2025;
const CACHE = "scripts/pipeline/cache";
mkdirSync(CACHE, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function aggregateLeaf(leaf) {
  const phrase = leaf.en;
  const concepts = await openalex.findConcept(phrase);
  let conceptId = null, conceptName = null;
  if (concepts?.length) { conceptId = concepts[0].id; conceptName = concepts[0].name; }

  const oaPhrase = await openalex.countByPhrase(phrase, { from: FROM, to: TO });
  await sleep(500);
  const cr = await crossref.countByQuery(phrase, { from: FROM, to: TO });
  await sleep(500);
  const ax = await arxiv.countByQuery(phrase, { from: FROM, to: TO });
  let conceptCount = null;
  if (conceptId) { conceptCount = await openalex.countByConcept(conceptId, { from: FROM, to: TO }); await sleep(500); }

  const vals = [oaPhrase, cr, ax, conceptCount].filter((v) => v != null && v > 0);
  let confidence = "high";
  let paperCount = oaPhrase ?? conceptCount ?? cr ?? ax ?? 0;
  if (conceptCount != null && conceptCount > 0) paperCount = conceptCount;
  if (vals.length >= 2) {
    const ratio = Math.max(...vals) / Math.min(...vals);
    if (ratio > 5) confidence = "low";
    else if (ratio > 2.5) confidence = "medium";
  } else confidence = "medium";

  return {
    id: leaf.id, zh: leaf.zh, en: leaf.en, path: leaf.path,
    paperCount, confidence,
    sources: { openalex_phrase: oaPhrase, openalex_concept: conceptCount, concept_id: conceptId, concept_name: conceptName, crossref: cr, arxiv: ax },
  };
}

export async function runAggregation(leaves, { onProgress } = {}) {
  const out = [];
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    const cf = `${CACHE}/${leaf.id}.json`;
    if (existsSync(cf)) {
      const cached = JSON.parse(readFileSync(cf, "utf8"));
      out.push(cached);
      onProgress?.(i + 1, leaves.length, cached, true);
      continue;
    }
    const r = await aggregateLeaf(leaf);
    writeFileSync(cf, JSON.stringify(r, null, 2));
    out.push(r);
    onProgress?.(i + 1, leaves.length, r, false);
    await sleep(300);
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { leaves } = JSON.parse(readFileSync("scripts/pipeline/nodes.json", "utf8"));
  const res = await runAggregation(leaves, {
    onProgress: (i, n, r, hit) => console.log(`[${i}/${n}]${hit ? "cached" : "  NEW"} ${r.zh}: ${r.paperCount} (${r.confidence}) oaP=${r.sources.openalex_phrase} cr=${r.sources.crossref} ax=${r.sources.arxiv} concept=${r.sources.openalex_concept}`),
  });
  writeFileSync("scripts/pipeline/out/aggregate.json", JSON.stringify(res, null, 2));
  console.log(`\n聚合完成 ${res.length} 节点 → scripts/pipeline/out/aggregate.json`);
}
