"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Shield, Zap, Coffee, Building, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function CitiesPage() {
  const [activeCity, setActiveCity] = useState("all");

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">

      {/* Atmospheric Hero / Exploration Header */}
      <section className="relative w-full pt-40 pb-16 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577977461421-4f1647413a96?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/90 via-teal-950/80 to-slate-900"></div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/50 backdrop-blur-md shadow-sm mb-6 border border-teal-800">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-xs text-teal-100 uppercase tracking-widest font-bold">Curated Neighborhood Intelligence</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-white tracking-tight font-bold mb-4">
                Explore Nigerian Neighborhoods with Confidence
              </h1>
              <p className="text-lg text-teal-100/80 leading-relaxed max-w-xl">
                Make decisions rooted in ground reality. Every district is verified for uninterrupted 24/7 power systems, high-protocol gate access, fiber connectivity, and immediate access to fine dining and lifestyle hubs.
              </p>
            </div>

            {/* Metric badges showcasing reliability */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full lg:w-auto">
              <div className="flex flex-col px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-teal-200/70 font-bold">Power Uptime</span>
                <span className="text-2xl text-white font-bold my-1">99.8%</span>
                <span className="text-xs text-teal-200/50">Dual-Grid & Solar</span>
              </div>
              <div className="flex flex-col px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-teal-200/70 font-bold">Security Protocol</span>
                <span className="text-2xl text-white font-bold my-1">Tier-1</span>
                <span className="text-xs text-teal-200/50">Manned Gates & Pass</span>
              </div>
              <div className="flex flex-col px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-teal-200/70 font-bold">Avg. Concierge</span>
                <span className="text-2xl text-white font-bold my-1">&lt; 3 min</span>
                <span className="text-xs text-teal-200/50">Local Host Support</span>
              </div>
            </div>
          </div>

          {/* City Switcher Filter Bar */}
          <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
            <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-full shadow-sm w-full sm:w-auto overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveCity("all")}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all font-bold whitespace-nowrap ${activeCity === "all" ? "bg-white text-teal-950 shadow-sm" : "text-white hover:bg-white/10"}`}
              >
                All Cities
              </button>
              <button
                onClick={() => setActiveCity("lagos")}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all font-bold whitespace-nowrap ${activeCity === "lagos" ? "bg-white text-teal-950 shadow-sm" : "text-white hover:bg-white/10"}`}
              >
                Lagos
              </button>
              <button
                onClick={() => setActiveCity("abuja")}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all font-bold whitespace-nowrap ${activeCity === "abuja" ? "bg-white text-teal-950 shadow-sm" : "text-white hover:bg-white/10"}`}
              >
                Abuja
              </button>
            </div>
            <div className="flex items-center gap-2 text-teal-200/80 text-sm font-semibold shrink-0">
              <ShieldCheck size={20} className="text-orange-500" />
              <span>5 Prime Zones Documented</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lagos Showcase Section */}
      {(activeCity === "all" || activeCity === "lagos") && (
        <section className="w-full py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                  <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">Commercial & Creative Heart</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-teal-950 font-bold">Lagos: Islands of Distinction</h2>
              </div>
              <p className="text-slate-600 max-w-md">
                From tranquil diplomatic estates to the cosmopolitan pulse of waterfront high-rises and tech creator sanctuaries.
              </p>
            </div>

            {/* Asymmetric Bento-Inspired Neighborhood Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Ikoyi - Premium Anchor Card (7 Cols) */}
              <article className="lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col group border border-slate-100 hover:shadow-xl transition-all">
                <div className="relative h-[340px] w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Ikoyi, Lagos — Luxury Serviced Apartments"
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
                    width={900}
                    height={340}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-teal-900 font-bold shadow-sm">
                      Diplomatic Enclave
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-teal-900 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Zap size={14} /> 99.9% Power
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-xs text-orange-400 uppercase tracking-wider font-bold block mb-1">Lagos Island East</span>
                    <h3 className="font-serif text-4xl text-white font-bold">Ikoyi</h3>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Prestigious, secluded, and enveloped in lush canopy avenues. Favored by expatriates, embassy dignitaries, and executives seeking discreet comfort, elite private clubs, and immediate security cordons.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <Coffee className="text-teal-900 mt-0.5 shrink-0" size={20} />
                        <div>
                          <span className="block text-xs font-bold text-slate-900 mb-1">Fine Dining Access</span>
                          <span className="text-sm text-slate-500">NOK by Alara, RSVP, Talindo Steakhouse</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <Shield className="text-orange-600 mt-0.5 shrink-0" size={20} />
                        <div>
                          <span className="block text-xs font-bold text-slate-900 mb-1">Security Profile</span>
                          <span className="text-sm text-slate-500">Armed estate checkpoints, digital entry badges</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">Typical Rate</span>
                      <span className="text-xl text-teal-900 font-bold">₦95,000 <span className="text-sm text-slate-500 font-normal">/ night</span></span>
                    </div>
                    <Link href="/explore?city=Ikoyi" className="px-6 py-3 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
                      <span>View Stays</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>

              {/* Right Stack: Victoria Island & Lekki Phase 1 (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">

                {/* Victoria Island Card */}
                <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group border border-slate-100 hover:shadow-xl transition-all h-full">
                  <div className="relative h-48 w-full overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Victoria Island, Lagos — Serviced Apartments"
                      src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80"
                      width={600}
                      height={192}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs text-teal-900 font-bold shadow-sm">
                        Commerce & Nights
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif text-2xl font-bold">Victoria Island (VI)</h3>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed flex-1">
                      The financial nervous system. Home to multinational headquarters, waterfront sky lofts, upscale rooftop lounges, and curated retail on Akin Adesola.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-lg text-teal-900 font-bold">₦75,000 <span className="text-xs text-slate-500 font-normal">/ night</span></span>
                      <Link href="/explore?city=Victoria%20Island" className="text-teal-900 hover:text-orange-600 text-xs uppercase tracking-wider font-bold inline-flex items-center gap-1 transition-colors">
                        Explore VI <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>

                {/* Lekki Phase 1 Card */}
                <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group border border-slate-100 hover:shadow-xl transition-all h-full">
                  <div className="relative h-48 w-full overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Lekki Phase 1, Lagos — Serviced Apartments"
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                      width={600}
                      height={192}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs text-teal-900 font-bold shadow-sm">
                        Creative & Tech Hub
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif text-2xl font-bold">Lekki Phase 1</h3>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed flex-1">
                      Vibrant, entrepreneurial, and pedestrian-friendly along Admiralty Way. Filled with boutique coworking lofts, specialty coffee roasters, and lively weekend supper clubs.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-lg text-teal-900 font-bold">₦95,000 <span className="text-xs text-slate-500 font-normal">/ night</span></span>
                      <Link href="/explore?city=Lekki" className="text-teal-900 hover:text-orange-600 text-xs uppercase tracking-wider font-bold inline-flex items-center gap-1 transition-colors">
                        Explore Lekki <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Abuja Showcase Section */}
      {(activeCity === "all" || activeCity === "abuja") && (
        <section className="w-full py-20 bg-slate-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-900"></span>
                  <span className="text-xs uppercase tracking-widest text-teal-900 font-bold">Federal Capital Territory</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-teal-950 font-bold">Abuja: Monumental Calm & Green Spaces</h2>
              </div>
              <p className="text-slate-600 max-w-md">
                Defined by rolling monolithic granites, impeccably paved boulevards, diplomatic estates, and lush hill sanctuaries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Maitama Luxury Haven */}
              <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col group border border-slate-200 hover:shadow-xl transition-all">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Maitama, Abuja — Serviced Apartments"
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
                    width={700}
                    height={288}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-teal-900 font-bold shadow-sm">
                      Diplomatic Hills
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-xs text-teal-300 uppercase tracking-wider font-bold block mb-1">Abuja Central North</span>
                    <h3 className="font-serif text-3xl font-bold">Maitama</h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                    Abuja's pinnacle address. Home to foreign missions, high-commission residences, and manicured gated compounds with uncompromised tranquility and security cordons.
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">Typical Rate</span>
                      <span className="text-xl text-teal-900 font-bold">₦150,000 <span className="text-sm text-slate-500 font-normal">/ night</span></span>
                    </div>
                    <Link href="/explore?city=Maitama" className="px-6 py-3 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md active:scale-95">
                      Browse Maitama
                    </Link>
                  </div>
                </div>
              </article>

              {/* Wuse II Commercial & Culinary Oasis */}
              <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col group border border-slate-200 hover:shadow-xl transition-all">
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Wuse II, Abuja — Serviced Apartments"
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
                    width={700}
                    height={288}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-teal-900 font-bold shadow-sm">
                      Culinary & Fashion Core
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-xs text-orange-400 uppercase tracking-wider font-bold block mb-1">Abuja Central</span>
                    <h3 className="font-serif text-3xl font-bold">Wuse II</h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                    The dynamic social anchor of the capital. Packed with artisanal bakeries, upscale design showrooms, contemporary art lounges, and convenient access to the Central Business District.
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">Typical Rate</span>
                      <span className="text-xl text-teal-900 font-bold">₦85,000 <span className="text-sm text-slate-500 font-normal">/ night</span></span>
                    </div>
                    <Link href="/explore?city=Wuse" className="px-6 py-3 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md active:scale-95">
                      Browse Wuse II
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
