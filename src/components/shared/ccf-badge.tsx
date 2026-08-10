import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CCFLevel, Venue } from "@/lib/types";

const styles: Record<string, string> = {
  A: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  B: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  C: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  none: "bg-muted text-muted-foreground border-border",
};

export function CcfBadge({ venue }: { venue: Venue }) {
  const key = venue.ccf ?? "none";
  const label = venue.ccf ? `CCF-${venue.ccf}` : "非 CCF";
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", styles[key])}
    >
      {label}
    </Badge>
  );
}

export function ccfLevel(venue: Venue): CCFLevel {
  return venue.ccf;
}
