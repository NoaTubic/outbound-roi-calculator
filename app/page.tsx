import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ResultsSummary = dynamic(
  () =>
    import("@/components/calculator/results-summary").then(
      (mod) => mod.ResultsSummary
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-12 sm:pt-16 pb-8 sm:pb-10 text-center px-4 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            Outbound{" "}
            <em className="italic text-brand-accent">ROI Calculator</em>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Model the revenue impact of adding outbound to your GTM motion.
            See projected meetings, pipeline, and ROI over 12 months.
          </p>
        </section>

        {/* Calculator */}
        <section className="max-w-[900px] mx-auto px-4 sm:px-6 pb-12">
          <ResultsSummary />
        </section>
      </main>
      <Footer />
    </div>
  );
}
