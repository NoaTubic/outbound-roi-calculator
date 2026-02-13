"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { initPostHog, posthog } from "@/lib/posthog";
import { ThemeProvider } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
    posthog.capture("calculator_loaded");
  }, []);

  return (
    <ThemeProvider>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
