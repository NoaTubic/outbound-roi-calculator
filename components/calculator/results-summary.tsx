"use client";

import { useMemo, useState, useCallback } from "react";
import { CalendarPlus, DollarSign, TrendingUp, Crosshair } from "lucide-react";
import {
  projectOutbound,
  computeSummary,
  formatCurrency,
} from "@/lib/calculations";
import type { CalculatorInputs } from "@/lib/calculations";
import { SLIDER_CONFIGS } from "@/lib/constants";
import { posthog } from "@/lib/posthog";
import { SliderInput } from "./slider-input";
import { MetricCard } from "./metric-card";
import { RevenueChart } from "./revenue-chart";
import { MeetingsChart } from "./meetings-chart";
import { BreakdownTable } from "./breakdown-table";
import { SectionHeader } from "./section-header";

export function ResultsSummary() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    dealSize: 15000,
    closeRate: 15,
    salesCycle: 3,
    sdrCount: 2,
    currentMeetings: 8,
    monthlyBudget: 5000,
  });

  const handleInputChange = useCallback((key: string, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    posthog.capture("input_changed", { field: key, value });
  }, []);

  const projections = useMemo(() => projectOutbound(inputs), [inputs]);

  const summary = useMemo(
    () => computeSummary(inputs, projections),
    [inputs, projections],
  );

  const handleCtaClick = useCallback(() => {
    posthog.capture("cta_clicked", {
      target: "coldiq",
      projected_meetings: summary.addedMeetingsPerMonth,
      projected_roi: Math.round(summary.roi),
    });
  }, [summary.addedMeetingsPerMonth, summary.roi]);

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 transition-colors duration-300 animate-fade-in">
        <SectionHeader
          title="Your Outbound Parameters"
          subtitle="Adjust the sliders to model your outbound investment"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {SLIDER_CONFIGS.map((config) => (
            <SliderInput
              key={config.key}
              label={config.label}
              value={inputs[config.key as keyof CalculatorInputs]}
              min={config.min}
              max={config.max}
              step={config.step}
              format={config.format}
              onChange={(v) => handleInputChange(config.key, v)}
            />
          ))}
        </div>
        {/* Benchmark Info */}
        <div className="mt-6 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-lg px-4 py-3">
          <p className="text-xs text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-medium">
              Benchmark assumptions:
            </span>{" "}
            15 qualified meetings per SDR/month at full velocity, 2-month ramp
            period, 85% delivery rate. Based on campaign data across 10,000+
            outbound campaigns.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <MetricCard
          icon={CalendarPlus}
          label="Added Meetings/mo"
          value={`+${summary.addedMeetingsPerMonth}`}
          subtitle={`${summary.totalMonthlyMeetings} total (${summary.pipelineMultiplier} current)`}
          highlight
          className="animate-fade-in stagger-1"
        />
        <MetricCard
          icon={DollarSign}
          label="Pipeline Added/mo"
          value={formatCurrency(summary.monthlyPipelineAdded)}
          subtitle="New monthly pipeline value"
          className="animate-fade-in stagger-2"
        />
        <MetricCard
          icon={TrendingUp}
          label="12-Month ROI"
          value={`${Math.round(summary.roi)}%`}
          subtitle={
            summary.breakEvenMonth
              ? `Break-even in month ${summary.breakEvenMonth}`
              : "Ramp period \u2014 ROI building"
          }
          highlight={summary.roi > 0}
          className="animate-fade-in stagger-3"
        />
        <MetricCard
          icon={Crosshair}
          label="Cost per Meeting"
          value={formatCurrency(summary.costPerMeeting)}
          subtitle={`${formatCurrency(inputs.monthlyBudget)}/mo investment`}
          className="animate-fade-in stagger-4"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart projections={projections} />
        <MeetingsChart projections={projections} />
      </div>

      {/* Breakdown Table */}
      <BreakdownTable projections={projections} />

      {/* CTA */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 text-center transition-colors duration-300 animate-fade-in">
        <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-2">
          Ready to add{" "}
          <span className="text-[var(--accent)] font-bold">
            +{summary.addedMeetingsPerMonth}
          </span>{" "}
          <em className="italic text-[var(--accent)]">meetings/month</em> to
          your pipeline?
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-lg mx-auto">
          Build and run outbound systems that generate qualified meetings on
          autopilot. See how you can scale your pipeline.
        </p>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          Get Started &rarr;
        </a>
      </div>
    </div>
  );
}
