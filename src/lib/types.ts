import type { Bilingual } from "@/lib/i18n/types";

export type { Bilingual } from "@/lib/i18n/types";
export type { RankedDirection } from "@/lib/heat-index";

export type CCFLevel = "A" | "B" | "C" | null;

export type VenueType = "conference" | "journal";

export type DirectionId =
  | "ai"
  | "cv"
  | "nlp"
  | "ml"
  | "robotics"
  | "multimodal"
  | "ai4science"
  | "datamining"
  | "graphics"
  | "security"
  | "hci"
  | "theory";

export type RadarMetricKey = "output" | "impact" | "growth" | "ecosystem" | "fusion";

export interface DeadlineInfo {
  abstractDeadline?: string;
  deadline?: string;
  notification?: string;
  date?: string;
  place?: string;
  timezone?: string;
  year?: number;
  link?: string;
}

export interface Venue {
  id: string;
  name: string;
  fullName: string;
  type: VenueType;
  ccf: CCFLevel;
  ccfField?: Bilingual;
  domain: DirectionId | "cross";
  field: Bilingual;
  link?: string;
  dblpKey?: string;
  coreRank?: string;
  ei?: boolean;
  sci?: boolean;
  acceptanceRate?: number;
  avgCitations?: number;
  h5?: number;
  deadline?: DeadlineInfo;
}

export interface Direction {
  id: DirectionId;
  name: Bilingual;
  description: Bilingual;
  color: string;
  papers: number;
  avgCitations: number;
  topCitedRatio: number;
  growth: number;
  openRate: number;
  heatIndex: number;
  topVenues: string[];
  topInstitutions: { name: string; papers: number }[];
  crossDirections: DirectionId[];
  radar: { metric: RadarMetricKey; value: number }[];
  yearly: { year: number; papers: number }[];
}

export type MilestoneType = "root" | "branch" | "leaf";

export interface Milestone {
  id: string;
  direction: DirectionId;
  year: number;
  title: Bilingual;
  venue?: string;
  parentIds: string[];
  impact: Bilingual;
  nodeType: MilestoneType;
}

export type BottleneckStatus = "unsolved" | "partial" | "solved";

export interface Bottleneck {
  id: string;
  direction: DirectionId;
  text: Bilingual;
  source: Bilingual;
  status: BottleneckStatus;
  relatedMilestone?: string;
  priority: number;
}
