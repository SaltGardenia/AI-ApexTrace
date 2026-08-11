// 采集层：统一封装 OpenAlex / Crossref / arXiv 三个数据源。
// 设计原则：
//  - 每个源独立限速 + 指数退避，避免 429 把整个管线打挂。
//  - OpenAlex 走 mailto polite pool；其余源带 UA 标识。
//  - 失败返回 null 而非抛错，让上层做"多源交叉、缺源降级"。
import { setTimeout as sleep } from "timers/promises";

const UA = "ApexTrace/1.0 (academic-landscape-index; mailto:apextrace@example.com)";

// ---------- 通用带重试的 JSON 请求 ----------
async function getJSON(url, { headers = {}, retries = 5, baseWait = 1200 } = {}) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, ...headers } });
      if (res.status === 429) {
        const wait = Math.min(30000, baseWait * 2 ** attempt);
        console.warn(`  [429] ${new URL(url).host} 退避 ${wait}ms`);
        await sleep(wait);
        continue;
      }
      if (res.status === 301 || res.status === 302) {
        const loc = res.headers.get("location");
        if (loc) return getJSON(loc, { headers, retries, baseWait });
        return null;
      }
      if (!res.ok) {
        console.warn(`  [${res.status}] ${url}`);
        if (attempt === retries - 1) return null;
        await sleep(baseWait);
        continue;
      }
      return await res.json();
    } catch (e) {
      if (attempt === retries - 1) {
        console.warn(`  [ERR] ${e.message}`);
        return null;
      }
      await sleep(baseWait);
    }
  }
  return null;
}

// ---------- 通用带重试的 TEXT 请求（arXiv 返回 XML） ----------
async function getText(url, { headers = {}, retries = 5, baseWait = 1200 } = {}) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, ...headers } });
      if (res.status === 429) {
        await sleep(Math.min(30000, baseWait * 2 ** attempt));
        continue;
      }
      if (res.status === 301 || res.status === 302) {
        const loc = res.headers.get("location");
        if (loc) return getText(loc, { headers, retries, baseWait });
        return null;
      }
      if (!res.ok) return null;
      return await res.text();
    } catch (e) {
      if (attempt === retries - 1) return null;
      await sleep(baseWait);
    }
  }
  return null;
}

// ---------- OpenAlex ----------
export const openalex = {
  name: "OpenAlex",
  async countByPhrase(phrase, { from = 2015, to = 2025 } = {}) {
    const filter = `title_and_abstract.search:${JSON.stringify(phrase)},from_publication_date:${from}-01-01,to_publication_date:${to}-12-31`;
    const url = `https://api.openalex.org/works?filter=${encodeURIComponent(filter)}&per-page=1&mailto=apextrace@example.com`;
    const d = await getJSON(url);
    return d ? d.meta.count : null;
  },
  async yearCounts(phrase, { from = 2015, to = 2025 } = {}) {
    const years = [];
    for (let y = from; y <= to; y++) {
      const filter = `title_and_abstract.search:${JSON.stringify(phrase)},publication_year:${y}`;
      const url = `https://api.openalex.org/works?filter=${encodeURIComponent(filter)}&per-page=1&mailto=apextrace@example.com`;
      const d = await getJSON(url);
      years.push(d ? d.meta.count : 0);
      await sleep(400);
    }
    return years;
  },
  async findConcept(term) {
    const url = `https://api.openalex.org/concepts?search=${encodeURIComponent(term)}&per-page=5&mailto=apextrace@example.com`;
    const d = await getJSON(url);
    if (!d || !d.results?.length) return null;
    return d.results.map((c) => ({
      id: c.id,
      name: c.display_name,
      works: c.works_count,
      score: c.score,
    }));
  },
  async countByConcept(conceptId, { from = 2015, to = 2025 } = {}) {
    const filter = `concepts.id:${conceptId},from_publication_date:${from}-01-01,to_publication_date:${to}-12-31`;
    const url = `https://api.openalex.org/works?filter=${encodeURIComponent(filter)}&per-page=1&mailto=apextrace@example.com`;
    const d = await getJSON(url);
    return d ? d.meta.count : null;
  },
};

// ---------- Crossref（交叉校验出版元数据/被引） ----------
export const crossref = {
  name: "Crossref",
  async countByQuery(query, { from = 2015, to = 2025 } = {}) {
    const url =
      `https://api.crossref.org/works?query=${encodeURIComponent(query)}` +
      `&filter=from-pub-date:${from}-01-01,until-pub-date:${to}-12-31` +
      `&rows=0&mailto=apextrace@example.com`;
    const d = await getJSON(url);
    return d?.message?.["total-results"] ?? null;
  },
};

// ---------- arXiv（预印本趋势，返回 XML 文本） ----------
export const arxiv = {
  name: "arXiv",
  async countByQuery(query, { from = 2015, to = 2025 } = {}) {
    const url =
      `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}` +
      `&start=0&max_results=1`;
    const xml = await getText(url);
    if (!xml) return null;
    const m = xml.match(/<opensearch:totalResults[^>]*>(\d+)<\/opensearch:totalResults>/);
    return m ? Number(m[1]) : null;
  },
};

export const SOURCES = { openalex, crossref, arxiv };
