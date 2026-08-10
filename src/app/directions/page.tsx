import type { Metadata } from "next";
import { DirectionsBrowser } from "@/components/directions/directions-browser";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "研究方向",
  description: "从产出、影响力、增长与交叉融合多视角透视 AI 各研究方向。",
};

export default function DirectionsPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <PageHeader titleKey="page_directions" descKey="page_directions_desc" />
      </div>
      <DirectionsBrowser />
    </div>
  );
}
