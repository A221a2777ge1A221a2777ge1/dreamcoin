"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
      <TooltipProvider delayDuration={0}>
        {children}
        <Toaster />
      </TooltipProvider>
  );
}
