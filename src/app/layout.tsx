import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { getSession } from "@/lib/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monarchstay.ng"),
  title: {
    default: "Monarch Stay — Premium Serviced Apartments in Nigeria",
    template: "%s — Monarch Stay",
  },
  description:
    "Discover curated, fully-serviced apartments across Lagos, Abuja and beyond. 24/7 power, fiber internet, and genuine Nigerian hospitality.",
  keywords: [
    "serviced apartments Nigeria",
    "short stay Lagos",
    "Airbnb Nigeria",
    "Abuja apartments",
    "Lagos shortlet",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Monarch Stay",
    title: "Monarch Stay — Premium Serviced Apartments in Nigeria",
    description:
      "Discover curated, fully-serviced apartments across Lagos, Abuja and beyond. 24/7 power, fiber internet, and genuine Nigerian hospitality.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Monarch Stay – Premium Serviced Apartments in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@monarchstay_ng",
    title: "Monarch Stay — Premium Serviced Apartments in Nigeria",
    description:
      "Discover curated, fully-serviced apartments across Lagos, Abuja and beyond.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
