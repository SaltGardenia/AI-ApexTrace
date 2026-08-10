import type { DirectionId } from "@/lib/types";

// A soft, harmonious, low-saturation multi-hue palette (12 directions).
// Tuned to read well on both light and dark backgrounds and to avoid
// high-chroma clashes, while staying distinguishable across charts.
export const DIRECTION_PALETTE: Record<DirectionId, string> = {
  ml: "#6bb39a", // sage teal
  cv: "#7b8fd6", // periwinkle
  nlp: "#5aa9c9", // muted cyan
  multimodal: "#c98ab0", // dusty rose
  generative: "#d08a8a", // clay
  embodied: "#c9a95a", // soft amber
  rl: "#9a8fd0", // lavender
  robotics: "#5ec2c9", // aqua
  efficiency: "#cf9b8a", // coral clay
  security: "#c98a5e", // warm sand
  applications: "#7cc2b0", // sea green
  frontier: "#a98fd0", // muted violet
};

export const colorById = (id: string): string => DIRECTION_PALETTE[id as DirectionId] ?? "#9a8fd0";
