import type { FieldNode } from "@/lib/types";
import { fieldTree } from "@/lib/data/field-tree";
import { allFieldStats, getFieldStat } from "@/lib/data/generated/FieldStats";
import { allFieldMetrics, getFieldMetric } from "@/lib/data/generated/FieldMetrics";

// 构建 enriched 树：把管线生成的真实统计（多源交叉）合并进每个末级节点的 papers 字段。
function buildEnrichedTree(): FieldNode[] {
  const statsMap = new Map(allFieldStats().map((s) => [s.id, s]));
  const clone = structuredClone(fieldTree);
  const walk = (nodes: FieldNode[]) => {
    for (const n of nodes) {
      const stat = statsMap.get(n.id);
      if (stat && (!n.children || n.children.length === 0)) {
        n.papers = stat.paperCount;
        n.paperCount = stat.paperCount;
        n.paperCountNormalized = stat.paperCountNormalized;
        n.confidence = stat.confidence;
        n.corroborated = stat.corroborated;
        n.statSources = stat.sources;
        // 真实指标（OpenAlex 抓取）：年份/来源/引用/开放率/增长
        const m = getFieldMetric(n.id);
        if (m) {
          n.yearly = m.yearly;
          n.topVenues = m.topVenues;            // 真实来源全称
          n.topInstitutions = m.topInstitutions; // 真实机构 + 论文数
          n.avgCitations = m.avgCitations;
          n.topCitedRatio = m.topCitedRatio;
          n.openRate = m.openRate;
          n.growth = m.growth;
          n.realMetrics = true;
        }
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
