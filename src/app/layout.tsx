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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900 pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0 pt-0 md:pt-20">
        <ReactQueryProvider>
          <Header session={session} />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
