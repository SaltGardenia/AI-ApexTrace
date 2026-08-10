import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findNode, pathToNode } from "@/lib/field-tree-utils";
import { FieldDetailView } from "@/components/directions/field-detail-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const node = findNode(slug);
  return { title: node ? node.name.zh : "研究方向" };
}

export default async function DirectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = findNode(slug);
  if (!node) notFound();
  // touch pathToNode to ensure tree integrity at build time
  void pathToNode(slug);
  return <FieldDetailView node={node} />;
}
