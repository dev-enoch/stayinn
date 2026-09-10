import React, { Suspense } from 'react';
import ProfileSidebar, { ProfileSidebarSkeleton } from '@/components/profile/ProfileSidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAccessToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const session = await verifyAccessToken(token);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 min-h-screen flex flex-col pt-5">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-10">

        {/* Top Account Banner with Quick Stats & Breadcrumb */}
        <div className="relative w-full rounded-2xl bg-gradient-to-r from-teal-950 via-teal-900 to-slate-800 p-8 text-white shadow-xl overflow-hidden mb-12">
          {/* Background Ambient Glow */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-teal-200">
                <span>Account Portal</span>
                <span className="text-white/50">/</span>
                <span className="text-teal-400">Guest Hub</span>
              </div>
              <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tight">Welcome back</h1>
              <p className="text-teal-100 max-w-xl text-sm md:text-base leading-relaxed">
                Manage your verified Nigerian stays, estate access passes, and bespoke concierge preferences.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white border border-white/10">
              <div className="flex flex-col px-3 py-1 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Loyalty Tier</span>
                <span className="text-lg font-bold text-orange-400">Gold Crest</span>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="flex flex-col px-3 py-1 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Power Uptime</span>
                <span className="text-lg font-bold text-teal-400">24/7 Monitored</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT SIDEBAR */}
          <Suspense fallback={<ProfileSidebarSkeleton />}>
            <ProfileSidebar />
          </Suspense>

          {/* RIGHT MAIN CONTENT PANEL */}
          <section className="lg:col-span-8 flex flex-col gap-12">
            {children}
          </section>
        </div>

      </div>
    </div>
  );
}
