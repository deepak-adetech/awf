import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoWorkflows — AI workflows that run your operations",
  description:
    "We design, build, and operate AI workflows for ops-led companies. Audit, blueprint, and ship measurable automation in 30 days.",
  metadataBase: new URL("https://autoworkflows.ai"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AutoWorkflows — AI workflows that run your operations",
    description:
      "Architectural AI automation for COOs and ops leaders. We replace work, not headcount.",
    url: "https://autoworkflows.ai",
    siteName: "AutoWorkflows",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
