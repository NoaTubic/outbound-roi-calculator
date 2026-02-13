interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-secondary)] mt-1">{subtitle}</p>
      )}
    </div>
  );
}
