import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voice AI Platform for Calls & Chat | One Brain for Every Conversation | CometLab",
  description:
    "CometLab is an AI voice platform for inbound and outbound calls that qualifies leads, schedules meetings, and supports customers in real time at scale.",
  openGraph: {
    title: "Automate Sales & Support Calls with human like AI Voice Agents",
    description:
      "CometLab lets you automate outbound & inbound calls with human-like AI agents. Scale sales, support & retention on autopilot.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/seo/favicon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
