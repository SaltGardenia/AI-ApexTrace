// 采集层（纯采集，不合成）：对每个末级节点抓取多源原始计数，落盘缓存。
import { openalex, crossref as crSource, arxiv as axSource } from "./sources.mjs";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

const FROM = 2015, TO = 2025;
const CACHE = "scripts/pipeline/cache";
mkdirSync(CACHE, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function collectLeaf(leaf) {
  const phrase = leaf.en;
  const oa_phrase = await openalex.countByPhrase(phrase, { from: FROM, to: TO });
  await sleep(500);
  const cr = await crSource.countByQuery(phrase, { from: FROM, to: TO });
  await sleep(500);
  const ax = await axSource.countByQuery(phrase, { from: FROM, to: TO });
  let oa_concept = null, concept_id = null, concept_name = null;
  const concepts = await openalex.findConcept(phrase);
  if (concepts?.length) {
    concept_id = concepts[0].id;
    concept_name = concepts[0].name;
    oa_concept = await openalex.countByConcept(concept_id, { from: FROM, to: TO });
    await sleep(500);
  }
  return {
    id: leaf.id, zh: leaf.zh, en: leaf.en, path: leaf.path,
    sources: { oa_phrase, oa_concept, concept_id, concept_name, crossref: cr, arxiv: ax },
  };
}

export async function runCollect(leaves, { onProgress } = {}) {
  const out = [];
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    const cf = `${CACHE}/${leaf.id}.json`;
    if (existsSync(cf)) {
      const c = JSON.parse(readFileSync(cf, "utf8"));
      out.push(c); onProgress?.(i + 1, leaves.length, c, true); continue;
    }
    const r = await collectLeaf(leaf);
    writeFileSync(cf, JSON.stringify(r, null, 2));
    out.push(r); onProgress?.(i + 1, leaves.length, r, false);
    await sleep(300);
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { leaves } = JSON.parse(readFileSync("scripts/pipeline/nodes.json", "utf8"));
  const res = await runCollect(leaves, {
    onProgress: (i, n, r, h) => console.log(`[${i}/${n}]${h ? "cached" : "  NEW"} ${r.zh} | oaP=${r.sources.oa_phrase} cr=${r.sources.crossref} ax=${r.sources.arxiv} concept=${r.sources.oa_concept ?? "-"}`),
  });
  writeFileSync("scripts/pipeline/out/collected.json", JSON.stringify(res, null, 2));
  console.log(`\n采集完成 ${res.length} 节点 → scripts/pipeline/out/collected.json`);
}