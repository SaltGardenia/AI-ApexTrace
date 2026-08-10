import type { FieldNode } from "@/lib/types";
import { fieldTree } from "@/lib/data/field-tree";

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
  return walk(fieldTree);
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
  walk(fieldTree, []);
  return out;
}

export const allFieldNodes = fieldTree;

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

// All leaf nodes under the given id (inclusive of self if it is a leaf).
export function leavesUnder(id: string): FieldNode[] {
  const node = findNode(id);
  if (!node) return [];
  const out: FieldNode[] = [];
  const walk = (n: FieldNode) => {
    if (!n.children || n.children.length === 0) {
      out.push(n);
      return;
    }
    n.children.forEach(walk);
  };
  walk(node);
  return out;
}

// Merge a node's whole subtree into a single aggregated view: paper counts
// sum, rates/stats weight by papers, venues/institutions/radar/yearly merge.
export function aggregateNode(node: FieldNode): FieldNode {
  const leaves = leavesUnder(node.id);
  if (leaves.length === 0) return node;

  const total = leaves.reduce((s, n) => s + (n.papers ?? 0), 0) || 1;
  const wAvg = (sel: (n: FieldNode) => number | undefined) =>
    leaves.reduce((s, n) => s + (sel(n) ?? 0) * (n.papers ?? 0), 0) / total;

  // Yearly: sum papers per year across leaves.
  const yearlyMap = new Map<number, number>();
  for (const l of leaves) {
    for (const p of l.yearly ?? []) {
      yearlyMap.set(p.year, (yearlyMap.get(p.year) ?? 0) + p.papers);
    }
  }
  const yearly = [...yearlyMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, papers]) => ({ year, papers }));

  // Radar: average across leaves.
  const radar = (leaves[0].radar ?? []).map((r) => ({
    metric: r.metric,
    value: Math.round(leaves.reduce((s, l) => s + (l.radar?.find((x) => x.metric === r.metric)?.value ?? 0), 0) / leaves.length),
  }));

  // Venues: union, deduped.
  const topVenues = Array.from(new Set(leaves.flatMap((l) => l.topVenues ?? [])));

  // Institutions: merge by name, sum papers, sort desc.
  const instMap = new Map<string, number>();
  for (const l of leaves) {
    for (const i of l.topInstitutions ?? []) {
      instMap.set(i.name, (instMap.get(i.name) ?? 0) + (i.papers ?? 0));
    }
  }
  const topInstitutions = [...instMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, papers]) => ({ name, papers }));

  const crossFields = Array.from(new Set(leaves.flatMap((l) => l.crossFields ?? [])));

  return {
    ...node,
    papers: total,
    avgCitations: Math.round(wAvg((n) => n.avgCitations)),
    topCitedRatio: wAvg((n) => n.topCitedRatio),
    growth: wAvg((n) => n.growth),
    openRate: wAvg((n) => n.openRate),
    topVenues,
    topInstitutions,
    radar,
    yearly,
    crossFields,
    children: undefined,
  };
}
