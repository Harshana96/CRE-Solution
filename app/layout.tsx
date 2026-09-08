import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { company } from "@/data/company";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cresolutions.lk"),
  title: {
    default: `${company.legalName} | ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "CRE Solutions (Pvt) Ltd delivers solar PV, battery energy storage, EV charging and electrical solutions across Sri Lanka — engineering the energy of tomorrow.",
  keywords: [
    "Solar Solutions Sri Lanka",
    "Solar PV Sri Lanka",
    "Solar Company Sri Lanka",
    "Battery Energy Storage Sri Lanka",
    "EV Charging Sri Lanka",
    "Electrical Solutions Sri Lanka",
    "Renewable Energy Sri Lanka",
    "Solar Installation Sri Lanka",
  ],
  openGraph: {
    title: `${company.legalName} | ${company.tagline}`,
    description:
      "Renewable solutions for a cleaner, greener Sri Lanka — solar PV, battery storage, EV charging and electrical solutions.",
    url: "https://www.cresolutions.lk",
    siteName: company.legalName,
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
