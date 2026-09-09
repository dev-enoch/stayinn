import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account — Stayinn',
  description: 'Join Stayinn to book verified luxury serviced apartments in Nigeria, or list your own property.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
