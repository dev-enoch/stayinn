import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, TrendingUp, Bolt, ShieldCheck, Home, Shield, ConciergeBell, Landmark, CheckCircle, Timer, Camera, Rocket, ChevronRight, Phone } from "lucide-react";
import YieldEstimator from "@/components/host/YieldEstimator";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "List Your Property — Become a Stayinn Host",
  description: "Earn more from your serviced apartment. Join Stayinn's network of verified hosts across Lagos, Abuja and beyond. Transparent payouts, full-service management.",
  openGraph: {
    title: "Become a Stayinn Host",
    description: "Earn more from your serviced apartment in Nigeria. Transparent payouts, full-service management.",
    type: "website",
    url: "/host",
  },
};



export default async function HostPage() {
  let managerCount = 0;
  try {
    managerCount = await prisma.user.count({ where: { role: 'HOTEL_MANAGER' } });
  } catch (error) {
    console.error("Failed to fetch manager count:", error);
  }

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 min-h-screen flex flex-col pt-10">

      {/* Immersive Editorial Hero */}
      <section className="relative w-full overflow-hidden bg-teal-950 text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80')` }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/95 to-teal-950/60 z-10"></div>
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl pointer-events-none z-10"></div>

        <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-12 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Text & High Impact Value Pitch */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md w-fit border border-white/20">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-teal-100 font-bold">Partner Portal & Host Yield Engine</span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white font-bold">
                Turn Your Luxury Space into <span className="italic font-normal text-orange-400">Exceptional Returns</span>
              </h1>

              <p className="text-lg md:text-xl text-teal-100 max-w-xl leading-relaxed">
                {managerCount > 0 
                  ? `Join over ${managerCount} property owners earning reliable rental income in Naira or USD with fully managed vetting, 24/7 guest concierge, and continuous maintenance.`
                  : `Join our founding property owners earning reliable rental income in Naira or USD with fully managed vetting, 24/7 guest concierge, and continuous maintenance.`}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#calculator"
                  className="h-14 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>List Your Property</span>
                  <ChevronRight size={20} />
                </a>
                <a
                  href="#inspection"
                  className="h-14 px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar size={20} />
                  <span>Schedule Inspection</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-teal-800/50 mt-4">
                <div className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-white">0%</span>
                  <span className="text-xs text-teal-300 uppercase tracking-wider font-bold mt-1">Management Fees</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-white">82%</span>
                  <span className="text-xs text-teal-300 uppercase tracking-wider font-bold mt-1">Average Occupancy</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-white">48 Hours</span>
                  <span className="text-xs text-teal-300 uppercase tracking-wider font-bold mt-1">Payout Settlement</span>
                </div>
              </div>
            </div>

            {/* Right: Premium Floating Showcase Card */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative z-10 p-6 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-100 transform rotate-1">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80')` }}
                  ></div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-teal-900/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Bolt size={14} className="text-orange-400" />
                    <span>24/7 Power Audit Verified</span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                    Ikoyi Waterfront Loft
                  </div>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Host Yield Highlight</span>
                    <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">Olumide B.</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl text-teal-900 font-bold">₦3.85M</span>
                    <span className="block text-xs text-slate-500 font-bold mt-0.5">August 2024 Net</span>
                  </div>
                </div>

                {/* Mini Sparkline Visualization */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 flex flex-col gap-3 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">Occupancy Trend (Last 6 Months)</span>
                    <span className="text-orange-600 flex items-center gap-1">
                      <TrendingUp size={14} /> 91% Peak
                    </span>
                  </div>
                  <svg className="w-full h-12 text-teal-900" fill="none" preserveAspectRatio="none" viewBox="0 0 300 40">
                    <path d="M0 32 Q 50 28, 75 22 T 150 14 T 225 18 T 300 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                    <path d="M0 32 Q 50 28, 75 22 T 150 14 T 225 18 T 300 6 L 300 40 L 0 40 Z" fill="currentColor" fillOpacity="0.1"></path>
                  </svg>
                </div>
              </div>
              {/* Decorative backing card */}
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl bg-teal-800/30 backdrop-blur-sm border border-white/10 pointer-events-none transform -rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Earnings Calculator Section */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-16 -mt-16 relative z-30" id="calculator">
        <YieldEstimator />
      </section>

      {/* Three-Pillar Host Benefits Grid */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-teal-900 font-bold">Uncompromising Standards</span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight mt-3">
            Engineered for Premium Nigerian Real Estate
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed text-lg">
            We handle the complexities of high-end short stays so you enjoy passive, institutional-grade cash flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-teal-100 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-teal-900/5">
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-900 mb-2 border border-teal-100">
                <ShieldCheck size={32} />
              </div>
              <span className="text-xs uppercase tracking-wider text-orange-600 font-bold">Zero Compromise Safety</span>
              <h3 className="text-xl text-slate-900 font-bold leading-tight">
                Guaranteed Vetted Diaspora & Corporate Guests
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Every prospective guest undergoes strict biometric BVN/NIN cross-checks, corporate email credentialing, and international passport validation before reservation approval.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-teal-100 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-teal-900/5">
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-900 mb-2 border border-teal-100">
                <ConciergeBell size={32} />
              </div>
              <span className="text-xs uppercase tracking-wider text-teal-900 font-bold">Turnkey Operations</span>
              <h3 className="text-xl text-slate-900 font-bold leading-tight">
                Complete Hospitality & Facility Management
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Keyless smart-lock installation, professional 5-star linen turnover, dedicated emergency technicians, diesel fuel level tracking, and monthly preventative checks.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-teal-100 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-teal-900/5">
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-900 mb-2 border border-teal-100">
                <Landmark size={32} />
              </div>
              <span className="text-xs uppercase tracking-wider text-orange-600 font-bold">Asset Security</span>
              <h3 className="text-xl text-slate-900 font-bold leading-tight">
                ₦25,000,000 Host Protection & Bi-Weekly Payouts
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Rest easy with comprehensive primary coverage on high-value artworks, furnishings, and structural fittings. Direct automated deposits into your Nigerian or domiciliary bank.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Onboarding Timeline */}
      <section className="w-full bg-teal-950 text-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-400 font-bold">Frictionless Path</span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mt-3 font-bold">
                How to Onboard in 4 Simple Stages
              </h2>
            </div>
            <p className="text-teal-100 max-w-md text-lg leading-relaxed">
              From first submission to welcome cocktails for your first guest in under seven business days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-teal-900/50 border border-teal-800 flex flex-col justify-between hover:bg-teal-900 transition-colors">
              <div>
                <span className="font-serif text-5xl text-teal-700/50 font-bold">01</span>
                <h3 className="text-xl font-bold mt-4 mb-3">Submit Details</h3>
                <p className="text-teal-100 text-sm leading-relaxed">
                  Provide basic property coordinates, room inventory, and desired availability window via our fast web form.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-teal-800/50 flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Timer size={16} /> Under 5 minutes
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-teal-900/50 border border-teal-800 flex flex-col justify-between hover:bg-teal-900 transition-colors">
              <div>
                <span className="font-serif text-5xl text-teal-700/50 font-bold">02</span>
                <h3 className="text-xl font-bold mt-4 mb-3">Quality & Power Audit</h3>
                <p className="text-teal-100 text-sm leading-relaxed">
                  Our engineering inspectors verify inverter/generator redundancy, water pressure, internet latency, and safety fixtures.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-teal-800/50 flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle size={16} /> 54-Point Standard
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-teal-900/50 border border-teal-800 flex flex-col justify-between hover:bg-teal-900 transition-colors">
              <div>
                <span className="font-serif text-5xl text-teal-700/50 font-bold">03</span>
                <h3 className="text-xl font-bold mt-4 mb-3">Staging & Media</h3>
                <p className="text-teal-100 text-sm leading-relaxed">
                  Professional architectural photography, 3D matterport walkthrough capture, and boutique Nigerian art placement.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-teal-800/50 flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Camera size={16} /> 100% Sponsored
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-8 rounded-3xl bg-teal-900/50 border border-teal-800 flex flex-col justify-between hover:bg-teal-900 transition-colors">
              <div>
                <span className="font-serif text-5xl text-teal-700/50 font-bold">04</span>
                <h3 className="text-xl font-bold mt-4 mb-3">Welcome Guests</h3>
                <p className="text-teal-100 text-sm leading-relaxed">
                  Listing goes live to verified corporate partners and travelers. Automated payouts initiate upon first checkout.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-teal-800/50 flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Rocket size={16} /> Immediate Live Bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Heroic Conversion Banner */}
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-20">
        <div className="p-8 md:p-16 rounded-[2.5rem] bg-orange-500 text-white shadow-2xl shadow-orange-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="max-w-xl z-10 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-orange-950 font-bold bg-orange-400/50 px-4 py-2 rounded-full inline-block mb-4">Start Maximizing Today</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to Elevate Your Nigerian Property Portfolio?
            </h2>
            <p className="text-orange-50 text-lg mt-4 leading-relaxed">
              Partner with Nigeria's most trusted hospitality curator. Our onboarding team is available across Lagos, Abuja, and Port Harcourt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full md:w-auto">
            <a href="#calculator" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold flex items-center justify-center gap-2 shadow-xl transition-all">
              <span>Apply as Host</span>
              <ChevronRight size={20} />
            </a>
            <a href="tel:+2348130007829" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-orange-600/50 hover:bg-orange-600 border border-orange-400 text-white font-bold flex items-center justify-center gap-2 transition-all backdrop-blur-sm">
              <Phone size={20} />
              <span>+234 813 000 7829</span>
            </a>
          </div>

          {/* Ambient decorative rings */}
          <div className="absolute -right-24 -bottom-24 w-[500px] h-[500px] rounded-full bg-white/10 pointer-events-none"></div>
          <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-orange-600/50 blur-3xl pointer-events-none"></div>
        </div>
      </section>

    </div>
  );
}
