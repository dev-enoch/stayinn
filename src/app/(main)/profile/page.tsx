import React, { Suspense } from 'react';
import {
  Bell,
  Home,
  ArrowRight,
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
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 text-slate-900 pb-24 lg:max-w-3xl lg:mx-auto lg:border-x lg:border-slate-200 lg:bg-white lg:shadow-sm">
      
      {/* Custom Mobile Header */}
      <header className="sticky top-0 z-40 bg-slate-50/80 lg:bg-white/80 backdrop-blur-xl border-b border-slate-200/60 pt-safe">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <ProfileBackButton />
            <h1 className="text-xl font-bold font-serif text-slate-900 truncate">Profile & Account</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            <div className="relative w-8 h-8 rounded-full ring-2 ring-slate-300 overflow-hidden shrink-0">
              <Image 
                src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=200&auto=format&fit=crop" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full relative">
        
        {/* Profile Header Tier with Suspense */}
        <Suspense fallback={<ProfileHeaderStatsSkeleton />}>
          <ProfileHeaderStats />
        </Suspense>

        {/* Main Body Content */}
        <div className="px-4 py-6 space-y-8">
          
          {/* Switch to Host Mode Promotion */}
          <div className="relative overflow-hidden bg-green-700 text-white rounded-xl p-6 shadow-md border border-green-800">
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-green-200 uppercase tracking-wider">Host Program</span>
                <div className="w-8 h-8 rounded-full bg-green-900/60 flex items-center justify-center text-green-200">
                  <Home size={18} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Become a Stayinn Host</h3>
                <p className="text-sm text-green-100/90 leading-relaxed">Earn extra income sharing your premium space in Lagos, Abuja, or Port Harcourt.</p>
              </div>
              <div className="pt-2">
                <button className="px-5 py-2.5 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2">
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            {/* Tactile background illustration */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-green-800/50 pointer-events-none"></div>
          </div>

          {/* Active Booking Spotlight with Suspense */}
          <Suspense fallback={<UpcomingStaySkeleton />}>
            <UpcomingStay />
          </Suspense>

          {/* Wishlists Preview with Suspense */}
          <Suspense fallback={<WishlistsPreviewSkeleton />}>
            <WishlistsPreview />
          </Suspense>

          {/* Account Settings Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Account Settings</h3>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              
              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <IdCard size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900">Personal Information</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">Name, Phone, NIN • Verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="px-2 py-0.5 rounded-full bg-green-700/10 text-green-700 text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </button>
              
              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <Wallet size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900">Payments & Payouts</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">Cards, GTBank, Zenith Bank</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs font-semibold text-slate-500">2 saved</span>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </button>
              
              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <Lock size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900">Security & Login</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">2FA active • Biometrics enabled</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </button>

              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <Settings2 size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900">Preferences & Currency</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">NGN (₦) • English (Nigeria)</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0 ml-2">
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </button>
              
            </div>
          </div>

          {/* Support & Legal Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Support & Trust</h3>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              
              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <Headphones size={20} />
                  </div>
                  <span className="text-base font-semibold text-slate-900">Help & Support Center</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
              
              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <Shield size={20} />
                  </div>
                  <span className="text-base font-semibold text-slate-900">Safety Guidelines</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
              
              <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-green-700 shrink-0">
                    <FileText size={20} />
                  </div>
                  <span className="text-base font-semibold text-slate-900">Terms & Privacy</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
              
            </div>
          </div>

          {/* Actions & Version Footer */}
          <div className="pt-4 pb-8 flex flex-col items-center gap-6">
            <button className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center gap-2 active:bg-red-100 transition-colors">
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-xs font-semibold text-slate-400">Stayinn App v2.4.1 (Nigeria)</p>
              <p className="text-[10px] font-medium text-slate-400/80">Modern Nigerian Hospitality • RC 1948291</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
