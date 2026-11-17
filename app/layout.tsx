import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aayush Nilesh Buchade",
    template: "%s — Aayush Nilesh Buchade",
  },
  description:
    "AI and machine learning engineer in Pune. Cybersecurity detection, explainable models, and codebase intelligence. Open to full-time and fresher roles.",
  authors: [{ name: "Aayush Nilesh Buchade" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plex.variable} suppressHydrationWarning>
      <body className={`${plex.className} bg-paper text-ink antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
