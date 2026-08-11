import type { FieldNode } from "@/lib/types";
import { fieldTree } from "@/lib/data/field-tree";
import { allFieldStats, getFieldStat } from "@/lib/data/generated/FieldStats";

// 构建 enriched 树：把管线生成的真实统计作为「来源佐证」合并进末级节点，
// 但【不覆盖】领域树自带的、彼此自洽的展示指标（papers/avgCitations/growth/...）。
// 原因：管线 OpenAlex 抓取量纲与领域树人工校准量纲不一致（同一子领域论文数
// 可达 27 万、且出现 0 值；topCitedRatio 多个为 1 的明显异常），直接覆盖会把
// 雷达/热度顶满或压成 0，并出现「子领域论文数 > 父方向」的矛盾。故展示仍用
// 自洽的领域树数值，管线数据仅保留为 provenance（paperCount/confidence/...）。
function buildEnrichedTree(): FieldNode[] {
  const statsMap = new Map(allFieldStats().map((s) => [s.id, s]));
  const clone = structuredClone(fieldTree);
  const walk = (nodes: FieldNode[]) => {
    for (const n of nodes) {
      const stat = statsMap.get(n.id);
      if (stat && (!n.children || n.children.length === 0)) {
        n.paperCount = stat.paperCount;
        n.paperCountNormalized = stat.paperCountNormalized;
        n.confidence = stat.confidence;
        n.corroborated = stat.corroborated;
        n.statSources = stat.sources;
        n.realMetrics = true;
      }
      if (n.children) walk(n.children);
    }
  };
  walk(clone);
  return clone;
}
const enrichedFieldTree = buildEnrichedTree();

export type FlatNode = {
  node: FieldNode;
  path: FieldNode[];
  depth: number;
  leaf: boolean;
  papers: number;
};

export function findNode(id: string): FieldNode | undefined {
  const walk = (nodes: FieldNode[]): FieldNode | undefined => {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children) {
        const f = walk(n.children);
        if (f) return f;
      }
    }
    return undefined;
  };
  return walk(enrichedFieldTree);
}

export function pathToNode(id: string): FieldNode[] {
  const path: FieldNode[] = [];
  const walk = (nodes: FieldNode[], trail: FieldNode[]): boolean => {
    for (const n of nodes) {
      const next = [...trail, n];
      if (n.id === id) {
        path.push(...next);
        return true;
      }
      if (n.children && walk(n.children, next)) return true;
    }
    return false;
  };
  walk(fieldTree, []);
  return path;
}

function sumNode(n: FieldNode): number {
  if (!n.children || n.children.length === 0) return n.papers ?? 0;
  return n.children.reduce((s, c) => s + sumNode(c), 0);
}

export function nodePapers(n: FieldNode): number {
  return sumNode(n);
}

export function flattenTree(): FlatNode[] {
  const out: FlatNode[] = [];
  const walk = (nodes: FieldNode[], trail: FieldNode[]) => {
    for (const n of nodes) {
      const path = [...trail, n];
      const leaf = !n.children || n.children.length === 0;
      out.push({ node: n, path, depth: path.length - 1, leaf, papers: nodePapers(n) });
      if (n.children) walk(n.children, path);
    }
  };
  walk(enrichedFieldTree, []);
  return out;
}

export const allFieldNodes = enrichedFieldTree;

// 末级子领域数据集自身的归一基准（用自洽的领域树数值），供雷达/热度在
// 领域详情页按「子领域之间」相对归一，避免被方向级常量(15200/61)压扁。
export const fieldRadarMax: { papers: number; citations: number } = (() => {
  let mp = 1;
  let mc = 1;
  for (const f of flattenTree()) {
    if (!f.leaf) continue;
    const p = f.node.papers ?? 0;
    const c = f.node.avgCitations ?? 0;
    if (p > mp) mp = p;
    if (c > mc) mc = c;
  }
  return { papers: mp, citations: mc };
})();

// The top-level category id of a node (first element of its path).
export function topLevelId(id: string): string {
  const path = pathToNode(id);
  return path[0]?.id ?? id;
}

// Self + all ancestor ids (root → ... → self), for inherited sub-table lookup.
export function ancestorIds(id: string): string[] {
  const path = pathToNode(id);
  return path.map((n) => n.id);
}
