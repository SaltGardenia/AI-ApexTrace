import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function SourceLink({
  href,
  className,
}: {
  href?: string;
  className?: string;
}) {
  if (!href) return null;
  const isGH = href.includes("github.com");
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={isGH ? "GitHub 仓库" : "工程 / 项目页面"}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      {isGH ? "GitHub" : "项目"}
      <ExternalLink className="size-2.5" />
    </Link>
  );
}
