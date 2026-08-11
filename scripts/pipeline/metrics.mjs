// 为每个末级节点抓取 OpenAlex 真实指标（单次 /works 列表采样，温和低负载）。
// 对每个节点取 200 篇「被引最高」论文，从中计算：
//   - paperCount: 用 countByPhrase 的精确总数（来自 field-stats 缓存或重新查询）
//   - yearly: 采样论文的年份分布（真实样本）
//   - topVenues / topInstitutions: 采样论文的来源期刊/会议与机构（真实）
//   - avgCitations / topCitedRatio: 采样论文平均被引与高被引占比（真实，偏重高引）
//   - openRate: 采样论文开放获取占比（真实）
//   - growth: 由 yearly 样本计算 CAGR
// 产物：scripts/pipeline/metrics-cache/<id>.json（可断点续跑）。
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { openalex } from "./lib/sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const nodesPath = path.join(ROOT, "nodes.json");
const CACHE = path.join(ROOT, "metrics-cache");
fs.mkdirSync(CACHE, { recursive: true });

const FROM = 2015;
const TO = 2025;
const YEARS = Array.from({ length: TO - FROM + 1 }, (_, i) => FROM + i);
const CALL_DELAY = 4000;

function loadNodes() {
  const d = JSON.parse(fs.readFileSync(nodesPath, "utf8"));
  return d.leaves || [];
}
function cached(id) {
  const p = path.join(CACHE, `${id}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}
function save(id, obj) {
  fs.writeFileSync(path.join(CACHE, `${id}.json`), JSON.stringify(obj, null, 1));
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getPaperCount(phrase) {
  return await openalex.countByPhrase(phrase, { from: FROM, to: TO });
}

function summarizeWorks(works) {
  const yearlyMap = new Map(YEARS.map((y) => [y, 0]));
  const venueCount = new Map();
  const instCount = new Map();
  let citTotal = 0,
    citN = 0,
    top10 = 0,
    oa = 0;
  for (const w of works) {
    const y = w.publication_year;
    if (y >= FROM && y <= TO) yearlyMap.set(y, yearlyMap.get(y) + 1);
    const src = w.primary_location?.source?.display_name;
    if (src && src !== "Unknown") venueCount.set(src, (venueCount.get(src) || 0) + 1);
    for (const a of w.authorships || []) {
      for (const inst of a.institutions || []) {
        if (inst.display_name && inst.display_name !== "Unknown")
          instCount.set(inst.display_name, (instCount.get(inst.display_name) || 0) + 1);
      }
    }
    const c = w.cited_by_count || 0;
    citTotal += c;
    citN++;
    if (c >= 10) top10++;
    if (w.open_access?.is_oa) oa++;
  }
  const n = works.length || 1;
  const yearly = YEARS.map((y) => ({ year: y, papers: yearlyMap.get(y) || 0 }));
  const first = yearly.find((v) => v.papers > 0);
  const last = yearly[yearly.length - 1].papers;
  let growth = 0;
  if (first && last > 0) {
    const fi = yearly.findIndex((v) => v.papers > 0);
    const yrs = yearly.length - 1 - fi;
    if (yrs > 0) growth = +((Math.pow(last / first.papers, 1 / yrs) - 1).toFixed(3));
  }
  const top = (m, k) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, k);
  return {
    yearly,
    topVenues: top(venueCount, 5).map(([name]) => name),
    topInstitutions: top(instCount, 5).map(([name, papers]) => ({ name, papers })),
    avgCitations: +(citTotal / n).toFixed(1),
    topCitedRatio: +(top10 / n).toFixed(3),
    openRate: +(oa / n).toFixed(3),
    growth,
  };
}

async function fetchYearlyTrue(phrase) {
  // 用 11 次 meta.count（温和，已验证不被限流）得到真实逐年分布。
  const out = [];
  for (let y = FROM; y <= TO; y++) {
    const n = await openalex.countByPhrase(phrase, { from: y, to: y });
    out.push({ year: y, papers: n ?? 0 });
    await sleep(450);
  }
  return out;
}

async function fetchNode(leaf) {
  const phrase = leaf.en;
  const filter = `title_and_abstract.search:${JSON.stringify(phrase)},from_publication_date:${FROM}-01-01,to_publication_date:${TO}-12-31`;
  const url = `https://api.openalex.org/works?filter=${encodeURIComponent(filter)}&per-page=200&sort=cited_by_count:desc&mailto=${MAILTO}${MAILTO}`;
  const d = await openalex._raw(url);
  if (!d || !d.results?.length) return null;
  const s = summarizeWorks(d.results);
  const paperCount = (await getPaperCount(phrase)) ?? s.yearly.reduce((a, y) => a + y.papers, 0);
  // 真实逐年分布（覆盖采样偏差）
  const yearly = await fetchYearlyTrue(phrase);
  // 由真实逐年重算增长
  const first = yearly.find((v) => v.papers > 0);
  const last = yearly[yearly.length - 1].papers;
  let growth = 0;
  if (first && last > 0) {
    const fi = yearly.findIndex((v) => v.papers > 0);
    const yrs = yearly.length - 1 - fi;
    if (yrs > 0) growth = +((Math.pow(last / first.papers, 1 / yrs) - 1).toFixed(3));
  }
  await sleep(CALL_DELAY);
  return { id: leaf.id, en: phrase, ok: true, paperCount, ...s, yearly, growth };
}

async function processLeaf(leaf) {
  const c = cached(leaf.id);
  if (c && c.ok && c.paperCount > 0 && c.topVenues?.length && c.avgCitations > 0 && c.openRate > 0) return "skip";
  try {
    const r = await fetchNode(leaf);
    if (!r) {
      save(leaf.id, { id: leaf.id, ok: false, error: "empty" });
      return null;
    }
    save(leaf.id, r);
    return r;
  } catch (e) {
    save(leaf.id, { id: leaf.id, ok: false, error: e.message });
    return null;
  }
}

async function run() {
  const leaves = loadNodes();
  const need = () =>
    leaves.filter((l) => {
      const c = cached(l.id);
      return !(c && c.ok && c.paperCount > 0 && c.topVenues?.length && c.avgCitations > 0 && c.openRate > 0);
    });
  let pass = 0;
  while (true) {
    const todo = need();
    if (todo.length === 0) break;
    pass++;
    console.log(`\n=== pass ${pass}: ${todo.length} left ===`);
    for (const leaf of todo) {
      const r = await processLeaf(leaf);
      if (r && r.ok) console.log(`[+] ${r.en} p=${r.paperCount} avgC=${r.avgCitations} oa=${r.openRate} v=${r.topVenues.length}`);
      else console.log(`[ ] ${leaf.en} incomplete`);
      await sleep(18000 + Math.floor(Math.random()*6000));
    }
    if (need().length === 0) break;
    console.log(`pass ${pass} done, ${need().length} left — cooldown 45s`);
    await sleep(45000);
  }
  console.log(`\nmetrics done. all ${leaves.length} complete.`);
}

run();
