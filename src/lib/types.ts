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
// The first level = 12 top categories. The smallest sub-fields (leaves, the
// numbered end-nodes in the source taxonomy) carry full `Direction`-like
// statistics so their detail page mirrors the original direction page.
export interface FieldNode {
  id: string;
  name: Bilingual;
  description?: Bilingual;
  papers?: number;
  children?: FieldNode[];
  // Leaf-only statistics (mirror Direction for the detail page layout)
  avgCitations?: number;
  topCitedRatio?: number;
  growth?: number;
  openRate?: number;
  topVenues?: string[];
  topInstitutions?: { name: string; papers: number }[];
  crossFields?: string[];
  radar?: { metric: RadarMetricKey; value: number }[];
  yearly?: { year: number; papers: number }[];
  // 管线生成的真实统计（OpenAlex/Crossref/arXiv 多源交叉）
  paperCount?: number;
  paperCountNormalized?: number;
  confidence?: "high" | "medium" | "low";
  corroborated?: boolean;
  statSources?: { oa_phrase: number | null; oa_concept: number | null; crossref: number | null; arxiv: number | null };
  realMetrics?: boolean; // 标记该节点已注入管线真实指标（OpenAlex）
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
  domain: string;
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
  direction: string;
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
  direction: string;
  text: Bilingual;
  source: Bilingual;
  status: BottleneckStatus;
  relatedMilestone?: string;
  priority: number;
  link?: string;
}
