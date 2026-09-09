import React from "react";
import Link from "next/link";
import { Search, MapPin, SlidersHorizontal, ChevronDown, Filter, Zap, Wifi, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HotelCard from "@/components/hotel/HotelCard";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; city?: string }>;
}) {
  const { q, city } = await searchParams;

  const searchQuery = city || q;
  
  const hotelsData = await prisma.hotel.findMany({
    where: { 
      status: 'APPROVED',
      ...(searchQuery ? {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { address: { contains: searchQuery, mode: 'insensitive' } },
        ]
      } : {})
    },
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: {
      roomTypes: {
        where: { status: 'ACTIVE' },
        select: { pricePerNight: true }
      }
    }
  });

  const hotels = hotelsData.map(hotel => ({
    ...hotel,
    startingPrice: hotel.roomTypes.length > 0 
      ? Math.min(...hotel.roomTypes.map(rt => rt.pricePerNight)) 
      : 0
  }));

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen pt-20">
      
      {/* Sticky Filter Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-3 flex flex-col gap-3">
          
          {/* Top Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 border border-slate-200">
                <MapPin size={16} className="text-teal-900" />
                <span className="text-sm font-bold">{city || q || 'Nigeria'}</span>
                <span className="text-slate-300">•</span>
                <span className="text-sm text-slate-500 font-semibold">Any dates</span>
                <span className="text-slate-300">•</span>
                <span className="text-sm text-slate-500 font-semibold">Guests</span>
              </div>
              <button className="text-teal-900 hover:text-teal-700 text-xs uppercase tracking-wider font-bold transition-colors">
                Modify Search
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Showing <strong className="text-slate-900">{hotels.length} verified stays</strong></span>
              <div className="h-4 w-px bg-slate-300"></div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 text-sm font-medium transition-all">
                <span>Sort: <strong className="font-bold">Recommended</strong></span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide text-sm">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-900 text-white font-bold hover:bg-teal-800 transition-colors shadow-sm shrink-0">
              <SlidersHorizontal size={16} />
              <span>₦50k – ₦300k+</span>
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors shrink-0">
              <span>Property Type</span>
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-900 hover:bg-teal-100 font-bold transition-colors shrink-0">
              <Zap size={16} />
              <span>24/7 Power Guaranteed</span>
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors shrink-0">
              <Wifi size={16} />
              <span>Fiber Wi-Fi</span>
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors shrink-0">
              <Shield size={16} />
              <span>Gated Security</span>
            </button>
            
            <div className="h-6 w-px bg-slate-200 shrink-0 mx-2"></div>
            
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold ml-auto shrink-0 transition-colors">
              <Filter size={16} />
              <span>More Filters (4)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Split Layout: Grid & Map */}
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-12 py-8 flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left: Listings (7 Cols on XL) */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            
            {/* Header Highlight */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-teal-900/10 flex items-center justify-center text-teal-900 shrink-0">
                  <Shield size={24} />
                </span>
                <div>
                  <p className="font-serif text-lg font-bold text-teal-950">The Stayinn Verified Collection</p>
                  <p className="text-sm text-teal-900/70 font-semibold">Continuous power & security verified on all listings.</p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-white text-teal-900 text-xs font-bold uppercase tracking-wider shadow-sm border border-teal-100">
                100% Uptime
              </span>
            </div>

            {/* Grid */}
            {hotels.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 mt-4 flex flex-col items-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-6 border border-slate-100">
                  <Search size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">No properties found</h3>
                <p className="text-sm text-slate-500 mb-8 max-w-md">We couldn't find any stays matching your criteria. Try adjusting your search filters.</p>
                <Link 
                  href="/explore" 
                  className="bg-teal-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-teal-800 transition-colors text-sm shadow-md"
                >
                  Clear Search
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {hotels.map((hotel: any) => (
                  <HotelCard 
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name}
                    locationName={hotel.address.split(',')[0]}
                    coverImage={hotel.coverImage || ""}
                    startingPrice={hotel.startingPrice || 0}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {hotels.length > 0 && (
              <div className="pt-8 pb-12 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-50" disabled>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-teal-900 text-white font-bold shadow-sm">1</button>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors">2</button>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors">3</button>
                  <span className="px-2 text-slate-400">...</span>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors">7</button>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
                <p className="text-sm text-slate-500 font-semibold">Showing 1 – {hotels.length} of {hotels.length} properties</p>
              </div>
            )}
          </div>

          {/* Right: Map (5 Cols, Sticky) */}
          <aside className="hidden xl:flex xl:col-span-5 sticky top-[180px] h-[calc(100vh-210px)] rounded-2xl overflow-hidden bg-slate-100 shadow-inner flex-col border border-slate-200">
            <div className="relative w-full h-full">
              {/* Map Background Placeholder */}
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')` }}
              >
              </div>
              
              {/* Top Scrim */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
              
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-md text-slate-900 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span>{city || q || 'Nigeria'} Map View</span>
                </div>
              </div>

              {/* Fake Map Pins based on hotels length */}
              {hotels.slice(0, 5).map((hotel: any, index: number) => {
                // Random position for effect
                const top = 20 + (index * 15) + (Math.random() * 10);
                const left = 30 + (index * 10) + (Math.random() * 20);
                
                return (
                  <div key={index} className="absolute z-20 group cursor-pointer" style={{ top: `${top}%`, left: `${left}%` }}>
                    <div className="px-3 py-1.5 rounded-full bg-teal-900 text-white font-bold text-xs shadow-lg flex items-center gap-1 border-2 border-white hover:scale-110 transition-transform">
                      <span>₦{Math.round(hotel.startingPrice / 1000)}k</span>
                    </div>
                  </div>
                );
              })}

              {/* Location Chips */}
              <div className="absolute bottom-4 inset-x-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide z-20">
                {['Ikoyi', 'Victoria Island', 'Lekki Phase 1', 'Abuja', 'Port Harcourt'].map((loc) => (
                  <Link key={loc} href={`/explore?city=${loc}`} className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-slate-700 font-bold text-xs hover:bg-teal-900 hover:text-white transition-colors shrink-0">
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
