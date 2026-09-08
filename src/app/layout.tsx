import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/ui/BottomNav";
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
  title: "Stayinn - Find Your Perfect Stay in Nigeria",
  description: "Experience curated spaces, unparalleled comfort, and authentic local hospitality across Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
