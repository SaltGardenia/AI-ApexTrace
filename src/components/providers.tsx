"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { LangProvider } from "@/lib/i18n/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors closeButton position="top-right" />
      </ThemeProvider>
    </LangProvider>
  );
}
