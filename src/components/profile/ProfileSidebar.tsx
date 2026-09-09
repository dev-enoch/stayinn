import React from 'react';
import Image from 'next/image';
import { Verified, Shield, Luggage, Star, Calendar, Heart, BadgeCheck, Wallet, Bolt, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function ProfileSidebar() {
  // Simulate network delay for isolated loading
  await new Promise(resolve => setTimeout(resolve, 800));

  // In a real scenario, fetch user profile data
  // const res = await apiClient.get('/api/users/me');

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      {/* User Profile Snapshot Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img 
              className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white" 
              alt="Amina Adebayo" 
              src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80"
            />
            <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-teal-900 text-white flex items-center justify-center shadow-sm" title="Verified Identity">
              <Verified size={16} />
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl text-slate-900 font-bold">Amina Adebayo</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-semibold mb-2">
            <Shield size={14} />
            Verified Super Guest
          </span>
          <p className="text-xs text-slate-500">Member since March 2023</p>
        </div>
        
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
          <div className="flex flex-col items-center justify-center py-1">
            <BadgeCheck className="text-teal-900 mb-1" size={20} />
            <span className="text-xs font-bold text-slate-900">BVN & NIN</span>
            <span className="text-[10px] text-slate-500">Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1 border-x border-slate-200">
            <Luggage className="text-teal-900 mb-1" size={20} />
            <span className="text-xs font-bold text-slate-900">12 Stays</span>
            <span className="text-[10px] text-slate-500">Completed</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1">
            <Star className="text-orange-500 mb-1" size={20} />
            <span className="text-xs font-bold text-slate-900">4.95</span>
            <span className="text-[10px] text-slate-500">Guest Score</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
        <Link href="/profile/bookings" className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-teal-900 text-white transition-all shadow-sm">
          <div className="flex items-center gap-3">
            <Calendar size={20} />
            <span className="font-semibold text-sm">Bookings & Trips</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-bold">1 upcoming</span>
        </Link>
        <Link href="/profile/wishlists" className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <div className="flex items-center gap-3">
            <Heart size={20} />
            <span className="font-medium text-sm">Saved Stays & Wishlists</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">3 lists</span>
        </Link>
        <Link href="/profile/info" className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <div className="flex items-center gap-3">
            <BadgeCheck size={20} />
            <span className="font-medium text-sm">Personal Info & Verification</span>
          </div>
          <Verified size={18} className="text-teal-600" />
        </Link>
        <Link href="/profile/payments" className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <div className="flex items-center gap-3">
            <Wallet size={20} />
            <span className="font-medium text-sm">Payment & Dom Payouts</span>
          </div>
          <span className="text-xs text-slate-500">NGN / USD</span>
        </Link>
        <Link href="/profile/preferences" className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <div className="flex items-center gap-3">
            <Bolt size={20} />
            <span className="font-medium text-sm">Power & Amenity Specs</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        </Link>
        <Link href="/profile/security" className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
          <div className="flex items-center gap-3">
            <Settings size={20} />
            <span className="font-medium text-sm">Security & 2FA</span>
          </div>
          <span className="text-xs text-teal-600 font-semibold">Active</span>
        </Link>
      </nav>

      {/* Host Transition Banner */}
      <div className="relative rounded-xl bg-slate-50 p-6 overflow-hidden shadow-sm flex flex-col gap-3 border border-slate-100">
        <div className="flex items-center gap-2 text-orange-600 text-xs uppercase tracking-wider font-bold">
          <BadgeCheck size={18} />
          <span>Host Earnings Program</span>
        </div>
        <h3 className="text-lg text-slate-900 font-bold leading-snug">
          Earn up to <span className="text-teal-900 font-bold">₦3.2M/mo</span> hosting your luxury home
        </h3>
        <p className="text-sm text-slate-600">
          Full hospitality management, insured estate protection, and verified corporate guests in Lagos & Abuja.
        </p>
        <Link href="/host" className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-all shadow-sm">
          <span>Become a Host</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </aside>
  );
}

export function ProfileSidebarSkeleton() {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-6 animate-pulse">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6 items-center">
        <div className="w-24 h-24 rounded-full bg-slate-200"></div>
        <div className="w-32 h-6 bg-slate-200 rounded"></div>
        <div className="w-24 h-4 bg-slate-200 rounded"></div>
        <div className="w-full h-16 bg-slate-100 rounded-xl mt-2"></div>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col gap-2">
        <div className="w-full h-12 bg-slate-100 rounded-lg"></div>
        <div className="w-full h-12 bg-slate-100 rounded-lg"></div>
        <div className="w-full h-12 bg-slate-100 rounded-lg"></div>
        <div className="w-full h-12 bg-slate-100 rounded-lg"></div>
      </div>
    </aside>
  );
}
