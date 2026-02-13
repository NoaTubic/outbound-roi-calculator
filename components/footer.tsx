import { BrandLogo } from "./coldiq-logo";

export function Footer() {
  return (
    <footer className="border-t border-brand-border py-8 mt-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-3">
        <BrandLogo className="h-5 w-auto opacity-60 hover:opacity-100 transition-opacity" />
        <p className="text-xs text-[var(--text-muted)]">
          Benchmarks based on 10,000+ outbound campaigns
        </p>
      </div>
    </footer>
  );
}
