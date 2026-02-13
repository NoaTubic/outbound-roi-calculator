import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
  className?: string;
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  highlight = false,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`bg-brand-card border border-brand-border rounded-xl p-4 sm:p-5 flex-1 min-w-[140px] transition-all duration-300 hover:border-brand-border-light ${className}`}
    >
      <div className="mb-2">
        <Icon
          size={18}
          strokeWidth={1.5}
          className="text-[var(--accent)]"
        />
      </div>
      <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
        {label}
      </p>
      <p
        className={`font-mono text-xl sm:text-2xl font-bold ${
          highlight ? "text-[var(--green)]" : "text-[var(--text-primary)]"
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-[var(--text-dim)] mt-1">{subtitle}</p>
    </div>
  );
}
