// 烟雾测试：验证采集层多源 + 概念映射是否通畅
import { openalex, crossref, arxiv } from "./lib/sources.mjs";

const TEST = [
  { id: "ml-rep-ssl-cl", en: "Contrastive Learning", zh: "对比学习" },
  { id: "cv-recog-cls", en: "Image Classification", zh: "图像分类" },
  { id: "nlp-mt", en: "Machine Translation", zh: "机器翻译" },
];

async function main() {
  for (const t of TEST) {
    console.log(`\n===== ${t.zh} / ${t.en} =====`);
    const oa = await openalex.countByPhrase(t.en);
    console.log("  OpenAlex phrase count:", oa);
    const cr = await crossref.countByQuery(t.en);
    console.log("  Crossref query count:", cr);
    const ax = await arxiv.countByQuery(t.en);
    console.log("  arXiv count:", ax);
    const concepts = await openalex.findConcept(t.en);
    if (concepts) {
      console.log("  Top concepts:");
      concepts.slice(0, 3).forEach((c) => console.log(`    - ${c.name} (${c.id}) works=${c.works} score=${c.score?.toFixed?.(2)}`));
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log("\n烟雾测试完成");
}
main().catch((e) => console.error(e));
