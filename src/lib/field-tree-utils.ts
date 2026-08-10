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
