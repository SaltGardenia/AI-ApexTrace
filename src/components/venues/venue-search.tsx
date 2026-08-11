"use client";

import { Input } from "@/components/ui/input";
import { ListFilter } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function VenueSearch({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div className={`relative w-full max-w-xs ${className ?? ""}`}>
      <Input
        placeholder={t("venue_search")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
      <ListFilter className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
