import React, { Suspense } from 'react';
import {
  Bell,
  Home,
  ChevronRight,
  IdCard,
  Wallet,
  Lock,
  Settings2,
  Headphones,
  Shield,
  FileText,
  LogOut
} from 'lucide-react';
import ProfileBackButton from '@/components/profile/ProfileBackButton';
import ProfileHeaderStats, { ProfileHeaderStatsSkeleton } from '@/components/profile/ProfileHeaderStats';
import UpcomingStay, { UpcomingStaySkeleton } from '@/components/profile/UpcomingStay';
import WishlistsPreview, { WishlistsPreviewSkeleton } from '@/components/profile/WishlistsPreview';
import Link from 'next/link';
import BottomNav from '@/components/ui/BottomNav';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-slate-900 pb-24">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ProfileBackButton />
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">Profile</h1>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full relative">
        
        {/* Profile Stats */}
        <Suspense fallback={<ProfileHeaderStatsSkeleton />}>
          <ProfileHeaderStats />
        </Suspense>

        <div className="w-full h-px bg-slate-200"></div>

        {/* Content Body */}
        <div className="px-4 py-8 space-y-10">
          
          {/* Host Program Promotion */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-sm">
                <Home size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-slate-900">Stayinn Host Program</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">Earn extra income by sharing your premium space with verified guests.</p>
              </div>
            </div>
            <button className="self-start md:self-auto px-4 py-2 rounded-md bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              Learn More
            </button>
          </div>

          {/* Active Booking Spotlight */}
          <Suspense fallback={<UpcomingStaySkeleton />}>
            <UpcomingStay />
          </Suspense>

          {/* Wishlists Preview */}
          <Suspense fallback={<WishlistsPreviewSkeleton />}>
            <WishlistsPreview />
          </Suspense>

          <div className="w-full h-px bg-slate-200"></div>

          {/* Settings Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider px-2">Account</h3>
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <Link href="/profile/personal-info" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <IdCard size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Personal Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold uppercase tracking-wider">Verified</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </Link>
              
              <Link href="/profile/payments" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Wallet size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Payments & Payouts</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
              
              <Link href="/profile/security" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </Link>

              <Link href="/profile/preferences" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Settings2 size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Preferences</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider px-2">Support & Legal</h3>
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <Link href="/support" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Headphones size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Help Center</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
              
              <Link href="/safety" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Safety Center</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
              
              <Link href="/terms" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Terms & Privacy</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Actions & Version Footer */}
          <div className="pt-6 pb-4 flex flex-col items-center gap-6">
            <button className="w-full md:w-auto md:min-w-[200px] py-2.5 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm flex items-center justify-center gap-2 transition-colors">
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-xs font-medium text-slate-400">Stayinn App v2.5.0</p>
              <p className="text-[10px] text-slate-400">RC 1948291</p>
            </div>
          </div>

        </div>
      </main>
      <BottomNav />
    </div>
  );
}
