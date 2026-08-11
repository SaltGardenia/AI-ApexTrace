// 从 field-tree.ts 解析出领域树骨架（仅结构：id / zh / en / 层级路径 / 是否末级）
// 统计数字将由管线填充，骨架只保留分类信息。
import { readFileSync, writeFileSync } from "fs";

const s = readFileSync("src/lib/data/field-tree.ts", "utf8");
const re = /id:\s*"([^"]+)",[\s\S]*?name:\s*\{\s*zh:\s*"([^"]+)",\s*en:\s*"([^"]+)"\s*\}/g;
let m, raw = [];
while ((m = re.exec(s))) raw.push({ id: m[1], zh: m[2], en: m[3], idx: m.index });
for (let i = 0; i < raw.length; i++) {
  const start = raw[i].idx;
  const end = i + 1 < raw.length ? raw[i + 1].idx : s.length;
  const blk = s.slice(start, end);
  raw[i].isLeaf = blk.includes("papers:") && !blk.includes("children:");
}

// 还原层级路径：name 出现的顺序即 DFS 顺序，用栈推父子
const lines = s.split("\n");
let stack = []; // {id, depth}
let nodes = [];
const depthOf = (line) => (line.match(/^\s*/)?.[0].length ?? 0);
for (let i = 0; i < lines.length; i++) {
  const idm = lines[i].match(/^\s*id:\s*"([^"]+)",/);
  if (idm) {
    const indent = depthOf(lines[i]);
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    const parent = stack.length ? stack[stack.length - 1].id : null;
    const meta = raw.find((r) => r.id === idm[1]);
    if (meta) {
      nodes.push({
        id: meta.id,
        zh: meta.zh,
        en: meta.en,
        isLeaf: meta.isLeaf,
        parent,
        path: [...stack.map((x) => x.id), meta.id],
      });
    }
    stack.push({ id: idm[1], indent });
  }
}

const leaves = nodes.filter((n) => n.isLeaf);
const branches = nodes.filter((n) => !n.isLeaf);
console.log(`解析骨架：分支 ${branches.length}，末级 ${leaves.length}`);
writeFileSync("scripts/pipeline/nodes.json", JSON.stringify({ nodes, leaves, branches }, null, 2));
console.log("已写出 scripts/pipeline/nodes.json");
