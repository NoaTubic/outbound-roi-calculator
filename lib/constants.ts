// Benchmark constants (from 10,000+ outbound campaigns)
export const MEETINGS_PER_SDR_PER_MONTH = 15;
export const RAMP_MONTHS = 2;
export const DELIVERY_RATE = 0.85;
export const PROJECTION_MONTHS = 12;

// Slider configurations
export interface SliderConfig {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format: (value: number) => string;
}

export const SLIDER_CONFIGS: SliderConfig[] = [
  {
    key: "dealSize",
    label: "Average Deal Size",
    min: 1000,
    max: 100000,
    step: 1000,
    defaultValue: 15000,
    format: (v: number) => `$${v.toLocaleString()}`,
  },
  {
    key: "closeRate",
    label: "Close Rate (meetings \u2192 deals)",
    min: 5,
    max: 40,
    step: 1,
    defaultValue: 15,
    format: (v: number) => `${v}%`,
  },
  {
    key: "salesCycle",
    label: "Sales Cycle Length",
    min: 1,
    max: 9,
    step: 1,
    defaultValue: 3,
    format: (v: number) => `${v} month${v !== 1 ? "s" : ""}`,
  },
  {
    key: "sdrCount",
    label: "SDRs / Sending Profiles",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 2,
    format: (v: number) => `${v}`,
  },
  {
    key: "currentMeetings",
    label: "Current Meetings/month",
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 8,
    format: (v: number) => `${v}/mo`,
  },
  {
    key: "monthlyBudget",
    label: "Monthly Outbound Budget",
    min: 1000,
    max: 25000,
    step: 500,
    defaultValue: 5000,
    format: (v: number) => `$${v.toLocaleString()}`,
  },
];

// Brand colors (for Recharts — these need to be resolved values, not CSS vars)
// We provide both dark and light sets, selected at runtime via getThemeBrand()
export const BRAND_DARK = {
  accent: "#4B6BFB",
  accentHover: "#5B7BFF",
  accentSoft: "rgba(75, 107, 251, 0.12)",
  accentBorder: "rgba(75, 107, 251, 0.25)",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  textDim: "#475569",
  green: "#22C55E",
  greenSoft: "rgba(34, 197, 94, 0.1)",
  red: "#EF4444",
  border: "#1E293B",
  card: "#111827",
  bg: "#0B0F1A",
  tooltipBg: "#111827",
  tooltipBorder: "#2A3548",
} as const;

export const BRAND_LIGHT = {
  accent: "#4B6BFB",
  accentHover: "#3B5BEB",
  accentSoft: "rgba(75, 107, 251, 0.08)",
  accentBorder: "rgba(75, 107, 251, 0.2)",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
  textDim: "#94A3B8",
  green: "#16A34A",
  greenSoft: "rgba(22, 163, 74, 0.08)",
  red: "#DC2626",
  border: "#E2E8F0",
  card: "#FFFFFF",
  bg: "#F8FAFC",
  tooltipBg: "#FFFFFF",
  tooltipBorder: "#E2E8F0",
} as const;

export interface BrandTokens {
  accent: string;
  accentHover: string;
  accentSoft: string;
  accentBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;
  green: string;
  greenSoft: string;
  red: string;
  border: string;
  card: string;
  bg: string;
  tooltipBg: string;
  tooltipBorder: string;
}
