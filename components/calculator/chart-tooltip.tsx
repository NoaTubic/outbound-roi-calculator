import { formatCurrency } from "@/lib/calculations";

interface PayloadEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadEntry[];
  label?: string | number;
}

export function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-[var(--tooltip-bg)] border border-[var(--tooltip-border)] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-[var(--text-secondary)] mb-1.5 font-medium">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--text-secondary)]">{entry.name}:</span>
          <span className="font-mono font-medium text-[var(--text-primary)]">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MeetingsTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-[var(--tooltip-bg)] border border-[var(--tooltip-border)] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-[var(--text-secondary)] mb-1.5 font-medium">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--text-secondary)]">{entry.name}:</span>
          <span className="font-mono font-medium text-[var(--text-primary)]">
            {entry.value} meetings
          </span>
        </div>
      ))}
    </div>
  );
}
