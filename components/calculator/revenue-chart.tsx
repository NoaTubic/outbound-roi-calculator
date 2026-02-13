"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthProjection } from "@/lib/calculations";
import { formatCurrency } from "@/lib/calculations";
import { useTheme } from "@/lib/theme";
import { ChartTooltip } from "./chart-tooltip";
import { SectionHeader } from "./section-header";

interface RevenueChartProps {
  projections: MonthProjection[];
}

export function RevenueChart({ projections }: RevenueChartProps) {
  const { brand } = useTheme();

  const data = projections.map((p) => ({
    month: p.month,
    "Current Revenue": p.cumulativeCurrent,
    "With Outbound": p.cumulativeOutbound,
    "Total Investment": p.investment,
  }));

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-4 sm:p-6 transition-colors duration-300 animate-slide-up">
      <SectionHeader
        title="Cumulative Revenue"
        subtitle="12-month revenue projection with outbound investment overlay"
      />
      <div
        role="img"
        aria-label="Area chart comparing cumulative revenue with and without outbound over 12 months"
        className="h-[300px] sm:h-[350px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="gradientCurrent"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={brand.textMuted}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={brand.textMuted}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="gradientOutbound"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={brand.accent}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={brand.accent}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="gradientInvestment"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={brand.red}
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor={brand.red}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={brand.border}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: brand.textDim, fontSize: 12 }}
              axisLine={{ stroke: brand.border }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => formatCurrency(v)}
              tick={{ fill: brand.textDim, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: 12, color: brand.textSecondary }}
            />
            <Area
              type="monotone"
              dataKey="Current Revenue"
              stroke={brand.textMuted}
              strokeWidth={2}
              fill="url(#gradientCurrent)"
            />
            <Area
              type="monotone"
              dataKey="With Outbound"
              stroke={brand.accent}
              strokeWidth={2.5}
              fill="url(#gradientOutbound)"
            />
            <Area
              type="monotone"
              dataKey="Total Investment"
              stroke={brand.red}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#gradientInvestment)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
