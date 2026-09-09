import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destinations — Stayinn',
  description: 'Explore our curated Nigerian neighborhoods. Verified stays in Lagos, Abuja, and more.',
};

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
