"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "首页" },
  { href: "/directions", label: "研究方向" },
  { href: "/venues", label: "会议全景" },
  { href: "/calendar", label: "会议日历" },
  { href: "/compare", label: "对比分析" },
  { href: "/methodology", label: "方法论" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <Sparkles className="size-4" />
          </span>
          <span className="text-[15px]">
            Apex<span className="text-primary">Trace</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive(pathname, item.href)
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="菜单"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-4" />
            </Button>
            <SheetContent side="right" className="w-64 p-0">
              <SheetTitle className="px-4 pt-4 text-sm font-semibold">导航</SheetTitle>
              <nav className="mt-4 flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-2.5 text-sm",
                      isActive(pathname, item.href)
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted/60",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
