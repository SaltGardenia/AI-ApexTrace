import type { DirectionId } from "@/lib/types";

// A soft, harmonious, low-saturation multi-hue palette (12 directions).
// Tuned to read well on both light and dark backgrounds and to avoid
// high-chroma clashes, while staying distinguishable across charts.
export const DIRECTION_PALETTE: Record<DirectionId, string> = {
  ai: "#c98a5e", // warm sand
  cv: "#7b8fd6", // periwinkle
  nlp: "#5aa9c9", // muted cyan
  ml: "#6bb39a", // sage teal
  robotics: "#c9a95a", // soft amber
  multimodal: "#c98ab0", // dusty rose
  ai4science: "#5ec2c9", // aqua
  datamining: "#9a8fd0", // lavender
  graphics: "#d08a8a", // clay
  security: "#cf9b8a", // coral clay
  hci: "#7cc2b0", // sea green
  theory: "#a98fd0", // muted violet
};

export const colorById = (id: string): string => DIRECTION_PALETTE[id as DirectionId] ?? "#9a8fd0";
