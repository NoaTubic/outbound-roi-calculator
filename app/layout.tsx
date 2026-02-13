import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outbound ROI Calculator | PipelineROI Free Tools",
  description:
    "Model the revenue impact of adding outbound to your GTM. Calculate pipeline, meetings, and ROI with this free interactive tool.",
  openGraph: {
    title: "Outbound ROI Calculator | PipelineROI",
    description: "Free interactive ROI calculator for outbound sales.",
    url: "https://outbound-roi.vercel.app",
    siteName: "PipelineROI",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
