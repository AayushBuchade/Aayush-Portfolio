import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { profile } from "@/lib/portfolio";
import "./globals.css";

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plex",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const description =
  "AI and machine learning engineer in Pune. Cybersecurity detection, explainable models, and codebase intelligence. Open to full-time and fresher roles.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: {
    default: profile.name,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: ["AI engineer", "machine learning", "cybersecurity", "Pune", profile.name],
  openGraph: {
    title: profile.name,
    description,
    locale: "en_IN",
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressCountry: "IN",
    },
    sameAs: [profile.github, profile.linkedin],
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return (
    <html lang="en" className={plex.variable} suppressHydrationWarning>
      <body className={`${plex.className} bg-paper text-ink antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
