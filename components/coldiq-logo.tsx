interface LogoProps {
  className?: string;
}

export function BrandLogo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 160 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PipelineROI logo"
      role="img"
    >
      <text
        x="0"
        y="22"
        fontFamily="var(--font-instrument), system-ui, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        <tspan fill="var(--text-primary)">Pipeline</tspan>
        <tspan fill="var(--accent)">ROI</tspan>
      </text>
    </svg>
  );
}
