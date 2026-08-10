import type { Bilingual } from "@/lib/i18n/types";

export type { Bilingual } from "@/lib/i18n/types";
export type { RankedDirection } from "@/lib/heat-index";

export type CCFLevel = "A" | "B" | "C" | null;

export type CasDivision = 1 | 2 | 3 | 4 | null;

export type JcrQuartile = "Q1" | "Q2" | "Q3" | "Q4" | null;

export type VenueType = "conference" | "journal";

export type DirectionId =
  | "ml"
  | "cv"
  | "nlp"
  | "multimodal"
  | "generative"
  | "embodied"
  | "rl"
  | "robotics"
  | "efficiency"
  | "security"
  | "applications"
  | "frontier";

export type RadarMetricKey = "output" | "impact" | "growth" | "ecosystem" | "fusion";

// A node in the multi-level AI research landscape tree.
// The first level (12 top categories) maps to a DirectionId; every node
// (including the smallest leaf sub-category) has a stable `id` used as the
// detail-page slug. `papers` is the aggregated paper count for that node.
export interface FieldNode {
  id: string;
  name: Bilingual;
  description?: Bilingual;
  papers?: number;
  children?: FieldNode[];
}

export interface DeadlineInfo {
  submissionStart?: string;
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
  cas?: CasDivision;
  jcr?: JcrQuartile;
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
  baselines?: Baseline[];
  datasets?: Dataset[];
  radar: { metric: RadarMetricKey; value: number }[];
  yearly: { year: number; papers: number }[];
}

export interface Baseline {
  id: string;
  name: Bilingual;
  description?: Bilingual;
  year?: number;
  link?: string;
}

export interface Dataset {
  id: string;
  name: Bilingual;
  description?: Bilingual;
  year?: number;
  link?: string;
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
  link?: string;
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
  link?: string;
}
