import React, { Suspense } from 'react';
import {
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
import ProfileHeaderStats, { ProfileHeaderStatsSkeleton } from '@/components/profile/ProfileHeaderStats';
import UpcomingStay, { UpcomingStaySkeleton } from '@/components/profile/UpcomingStay';
import WishlistsPreview, { WishlistsPreviewSkeleton } from '@/components/profile/WishlistsPreview';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pb-12">
      <div className="max-w-4xl mx-auto w-full px-4">
        
        {/* Page Title */}
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Account</h1>
          <p className="text-slate-500 mt-2">Manage your profile, bookings, and preferences.</p>
        </div>
        
        {/* Profile Stats */}
        <div className="mb-10 bg-slate-50 rounded-2xl border border-slate-200">
          <Suspense fallback={<ProfileHeaderStatsSkeleton />}>
            <ProfileHeaderStats />
          </Suspense>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Host Program Promotion */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-shadow hover:shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-sm">
                  <Home size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">Stayinn Host Program</h3>
                  <p className="text-sm text-slate-500 mt-1">Earn extra income by sharing your premium space with verified guests.</p>
                </div>
              </div>
              <button className="self-start md:self-auto px-5 py-2.5 rounded-md bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm shrink-0">
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

          </div>
          
          {/* Sidebar / Settings Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Settings Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Account Settings</h3>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <Link href="/profile/personal-info" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <IdCard size={18} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">Personal Information</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
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
                  <ChevronRight size={16} className="text-slate-400" />
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
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Support</h3>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
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

            {/* Logout */}
            <div className="pt-2">
              <button className="w-full py-3 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
