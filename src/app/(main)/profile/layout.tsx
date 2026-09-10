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
