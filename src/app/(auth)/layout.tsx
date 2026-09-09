import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Left side - Branding & Illustration (hidden on small screens) */}
      <div className="hidden lg:flex flex-col lg:w-1/2 relative bg-white border-r border-slate-200 p-12 xl:p-20 justify-between">
        
        {/* Brand */}
        <div className="z-10 flex items-center">
          <Link href="/" className="text-3xl font-bold font-serif text-green-600 tracking-tight flex items-center">
            Stayinn.
          </Link>
        </div>

        {/* Tagline */}
        <div className="z-10 max-w-md mt-16">
          <h2 className="text-3xl xl:text-4xl font-medium leading-tight mb-8 text-slate-800">
            Experience hospitality with seamless, scalable speed.
          </h2>
          
          <div className="flex items-center gap-6 mt-12 text-slate-500">
            <span className="font-semibold text-sm uppercase tracking-wider">Bookers</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <span className="font-semibold text-sm uppercase tracking-wider">Hosts</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <span className="font-semibold text-sm uppercase tracking-wider">Partners</span>
          </div>
        </div>

        {/* Abstract Illustration */}
        <div className="relative flex-1 w-full flex items-end justify-center mt-12 pointer-events-none">
          <svg className="w-full h-auto max-w-[450px] text-green-600/10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M200 300L400 200V100L200 200L0 100V200L200 300Z" fill="currentColor" fillOpacity="0.8"/>
            <path d="M200 200L400 100L200 0L0 100L200 200Z" fill="currentColor" fillOpacity="0.4"/>
            <rect x="180" y="50" width="40" height="150" fill="#f1f5f9" />
            <rect x="250" y="80" width="40" height="180" fill="#e2e8f0" />
            <rect x="110" y="120" width="40" height="140" fill="#cbd5e1" />
            
            <circle cx="200" cy="30" r="4" fill="#16a34a" />
            <line x1="200" y1="30" x2="200" y2="50" stroke="#16a34a" strokeDasharray="2 2" strokeWidth="2" />
            <circle cx="130" cy="100" r="3" fill="#16a34a" />
            <line x1="130" y1="100" x2="130" y2="120" stroke="#16a34a" strokeDasharray="2 2" strokeWidth="1.5" />
            <circle cx="270" cy="60" r="3" fill="#16a34a" />
            <line x1="270" y1="60" x2="270" y2="80" stroke="#16a34a" strokeDasharray="2 2" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Right side - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 xl:p-24 bg-slate-50">
        <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl relative overflow-y-auto max-h-[90vh] scrollbar-hide">
           {children}
        </div>
      </div>
    </div>
  );
}
