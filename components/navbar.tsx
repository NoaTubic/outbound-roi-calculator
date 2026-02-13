import { BrandLogo } from "./coldiq-logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <BrandLogo className="h-6 w-auto" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]">
            Free Tool
          </span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
