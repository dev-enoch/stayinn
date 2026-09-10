import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CitiesPage() {
  const cities = await prisma.city.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen pt-20">
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

          <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
            <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-full shadow-sm w-full sm:w-auto overflow-x-auto scrollbar-hide">
              <span className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all font-bold whitespace-nowrap bg-white text-teal-950 shadow-sm">
                Available Destinations
              </span>
            </div>
            <div className="flex items-center gap-2 text-teal-200/80 text-sm font-semibold shrink-0">
              <ShieldCheck size={20} className="text-orange-500" />
              <span>{cities.length} Prime Zones Documented</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Cities Grid */}
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cities.map((city) => (
              <article key={city.id} className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col group border border-slate-200 hover:shadow-xl transition-all relative">
                {city.isComingSoon && (
                  <div className="absolute top-5 right-5 z-20">
                    <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    className={`w-full h-full object-cover transition-transform duration-700 ${!city.isComingSoon ? "group-hover:scale-105" : ""}`}
                    alt={`${city.name} — Serviced Apartments`}
                    src={city.imageUrl || "https://images.unsplash.com/photo-1590483736622-398bb2c45980?auto=format&fit=crop&q=80"}
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-teal-900 font-bold shadow-sm">
                      Premium Destination
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <span className="text-xs text-teal-300 uppercase tracking-wider font-bold block mb-1">State Profile</span>
                    <h3 className="font-serif text-3xl font-bold">{city.name}</h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                    {city.description || `Explore luxury serviced apartments and premium properties in ${city.name}. Managed by elite hosts.`}
                  </p>
                  <div className="flex items-center justify-end pt-6 border-t border-slate-100">
                    {!city.isComingSoon ? (
                      <Link href={`/cities/${city.name.toLowerCase()}`} className="px-6 py-3 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
                        Browse {city.name} <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <button disabled className="px-6 py-3 rounded-xl bg-slate-100 text-slate-400 text-xs uppercase tracking-wider font-bold shadow-sm cursor-not-allowed">
                        Launching Soon
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
