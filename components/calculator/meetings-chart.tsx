"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthProjection } from "@/lib/calculations";
import { useTheme } from "@/lib/theme";
import { MeetingsTooltip } from "./chart-tooltip";
import { SectionHeader } from "./section-header";

interface MeetingsChartProps {
  projections: MonthProjection[];
}

export function MeetingsChart({ projections }: MeetingsChartProps) {
  const { brand } = useTheme();

  const data = projections.map((p) => ({
    month: p.month,
    Current: p.currentMeetings,
    "With Outbound": p.outboundMeetings,
  }));

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-4 sm:p-6 transition-colors duration-300 animate-slide-up">
      <SectionHeader
        title="Monthly Meetings"
        subtitle="Current pipeline vs projected with outbound added"
      />
      <div
        role="img"
        aria-label="Bar chart comparing current monthly meetings with projected meetings including outbound"
        className="h-[300px] sm:h-[350px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
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
              tick={{ fill: brand.textDim, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Tooltip content={<MeetingsTooltip />} />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: 12, color: brand.textSecondary }}
            />
            <Bar
              dataKey="Current"
              fill={brand.textDim}
              barSize={16}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="With Outbound"
              fill={brand.accent}
              barSize={16}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
