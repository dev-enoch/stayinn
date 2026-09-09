import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Stayinn',
  description: 'Sign in to your Stayinn account to manage reservations, saved properties, and host dashboard.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
