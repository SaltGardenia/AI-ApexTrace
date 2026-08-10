import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findNode, flattenTree } from "@/lib/field-tree-utils";
import { DirectionsBrowser } from "@/components/directions/directions-browser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const node = findNode(slug);
  return { title: node ? node.name.zh : "研究方向" };
}

export function generateStaticParams() {
  return flattenTree().map((n) => ({ slug: n.node.id }));
}

export default async function DirectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!findNode(slug)) notFound();
  return <DirectionsBrowser initialId={slug} />;
}
