import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Monarch Stay",
  description:
    "Sign in to your Monarch Stay account to manage reservations, saved properties, and host dashboard.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
