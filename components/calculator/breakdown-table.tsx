import type { MonthProjection } from "@/lib/calculations";
import { formatCurrency } from "@/lib/calculations";
import { SectionHeader } from "./section-header";

interface BreakdownTableProps {
  projections: MonthProjection[];
}

export function BreakdownTable({ projections }: BreakdownTableProps) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-4 sm:p-6 transition-colors duration-300 animate-slide-up">
      <SectionHeader
        title="Month-by-Month Breakdown"
        subtitle="Detailed projection with pipeline lag and cumulative ROI"
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-brand-border">
              <th
                scope="col"
                className="text-left text-[11px] uppercase tracking-wider text-[var(--text-muted)] pb-3 font-medium"
              >
                Month
              </th>
              <th
                scope="col"
                className="text-left text-[11px] uppercase tracking-wider text-[var(--text-muted)] pb-3 font-medium"
              >
                Meetings
              </th>
              <th
                scope="col"
                className="text-right text-[11px] uppercase tracking-wider text-[var(--text-muted)] pb-3 font-medium"
              >
                Monthly Pipeline
              </th>
              <th
                scope="col"
                className="text-right text-[11px] uppercase tracking-wider text-[var(--text-muted)] pb-3 font-medium"
              >
                Cumul. Revenue
              </th>
              <th
                scope="col"
                className="text-right text-[11px] uppercase tracking-wider text-[var(--text-muted)] pb-3 font-medium"
              >
                Investment
              </th>
              <th
                scope="col"
                className="text-right text-[11px] uppercase tracking-wider text-[var(--text-muted)] pb-3 font-medium"
              >
                Net ROI
              </th>
            </tr>
          </thead>
          <tbody>
            {projections.map((p) => {
              const netRoi =
                p.cumulativeOutbound - p.cumulativeCurrent - p.investment;
              const isPositive = netRoi > 0;

              return (
                <tr
                  key={p.month}
                  className="border-b border-brand-border/50 hover:bg-brand-card-hover transition-colors"
                >
                  <td className="py-2.5 text-sm text-[var(--text-secondary)]">
                    {p.month}
                  </td>
                  <td className="py-2.5 text-sm font-mono">
                    <span className="text-[var(--text-dim)]">
                      {p.currentMeetings}
                    </span>
                    <span className="text-[var(--text-dim)] mx-1">&rarr;</span>
                    <span className="text-[var(--accent)] font-bold">
                      {p.outboundMeetings}
                    </span>
                  </td>
                  <td className="py-2.5 text-sm font-mono text-right text-[var(--text-secondary)]">
                    {formatCurrency(p.outboundPipeline)}
                  </td>
                  <td className="py-2.5 text-sm font-mono text-right text-[var(--text-primary)] font-bold">
                    {formatCurrency(p.cumulativeOutbound)}
                  </td>
                  <td className="py-2.5 text-sm font-mono text-right text-[var(--text-dim)]">
                    {formatCurrency(p.investment)}
                  </td>
                  <td
                    className={`py-2.5 text-sm font-mono text-right font-bold ${
                      isPositive ? "text-[var(--green)]" : "text-[var(--red)]"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(netRoi)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
