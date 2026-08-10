import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { directions } from "@/lib/data/directions";
import { rankedDirections } from "@/lib/heat-index";
import { milestonesByDirection } from "@/lib/data/milestones";
import { bottlenecksByDirection } from "@/lib/data/bottlenecks";
import { baselinesByDirection, datasetsByDirection } from "@/lib/data/baselines";
import { venueById } from "@/lib/data/venues";
import { DirectionDetailView } from "@/components/directions/direction-detail-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = directions.find((x) => x.id === slug);
  return { title: d ? d.name.zh : "研究方向" };
}

export default async function DirectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = directions.find((x) => x.id === slug);
  if (!d) notFound();
  const ranked = rankedDirections.find((x) => x.id === slug)!;
  const ms = milestonesByDirection(slug);
  const bs = bottlenecksByDirection(slug);
  const bl = baselinesByDirection(slug);
  const ds = datasetsByDirection(slug);
  const topVenues = d.topVenues.map((id) => venueById(id));

  return (
    <DirectionDetailView
      direction={d}
      ranked={ranked}
      milestones={ms}
      bottlenecks={bs}
      topVenues={topVenues}
      baselines={bl}
      datasets={ds}
    />
  );
}
