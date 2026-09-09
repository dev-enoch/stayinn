import React from "react";
import Link from "next/link";
import { Search, MapPin, Shield } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HotelCard from "@/components/hotel/HotelCard";
import ExploreFilters from "@/components/explore/ExploreFilters";
import ExplorePagination from "@/components/explore/ExplorePagination";
import ExploreMap from "@/components/explore/ExploreMap";
import { Prisma } from "@prisma/client";

export default async function ExplorePage(
  props: {
    searchParams: Promise<{
      q?: string;
      city?: string;
      dates?: string;
      guests?: string;
      power?: string;
      wifi?: string;
      security?: string;
      sort?: string;
      page?: string;
    }>
  }
) {
  const searchParams = await props.searchParams;
  const { q, city, dates, guests, power, wifi, security, sort, page: pageStr } = searchParams;

  const searchQuery = city || q;
  const page = parseInt(pageStr || "1", 10) || 1;
  const limit = 4; // Use 4 so pagination is visible for small DB sizes

  const AND: Prisma.HotelWhereInput[] = [{ status: 'APPROVED' }];
  
  if (searchQuery) {
    AND.push({
      OR: [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { address: { contains: searchQuery, mode: 'insensitive' } },
      ]
    });
  }

  if (power === 'true') {
    AND.push({ amenities: { some: { amenity: 'BACKUP_POWER' } } });
  }
  if (wifi === 'true') {
    AND.push({ amenities: { some: { amenity: 'WIFI' } } });
  }
  if (security === 'true') {
    // There is no security amenity enum right now, so we will filter by something else or just skip it
    // For now we will just use parking as a proxy or skip it
  }

  const orderBy: Prisma.HotelOrderByWithRelationInput = 
    sort === 'price_asc' ? { roomTypes: { _count: 'asc' } } : // Can't easily order by relation min price natively without raw, so we'll sort in memory later if needed, but for now fallback to createdAt
    sort === 'price_desc' ? { createdAt: 'desc' } : 
    { createdAt: 'desc' };

  const total = await prisma.hotel.count({ where: { AND } });

  let hotelsData = await prisma.hotel.findMany({
    where: { AND },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' }, // Base sorting
    include: {
      amenities: true,
      roomTypes: {
        where: { status: 'ACTIVE' },
        select: { pricePerNight: true, capacity: true }
      }
    }
  });

  const hotels = hotelsData.map(hotel => {
    const startingPrice = hotel.roomTypes.length > 0 
      ? Math.min(...hotel.roomTypes.map(rt => rt.pricePerNight)) 
      : 0;
    const capacity = hotel.roomTypes.length > 0
      ? Math.max(...hotel.roomTypes.map(rt => rt.capacity))
      : 2;
    return {
      ...hotel,
      startingPrice,
      capacity,
      amenityList: hotel.amenities.map(a => a.amenity),
    };
  });

  // In-memory price sort
  if (sort === 'price_asc') {
    hotels.sort((a, b) => a.startingPrice - b.startingPrice);
  } else if (sort === 'price_desc') {
    hotels.sort((a, b) => b.startingPrice - a.startingPrice);
  }

  // Calculate dynamic min/max price for the UI filter button
  const allPrices = hotels.map(h => h.startingPrice);
  const minPriceDisplay = allPrices.length > 0 ? Math.min(...allPrices) : 50000;
  const maxPriceDisplay = allPrices.length > 0 ? Math.max(...allPrices) : 300000;

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
                <span className="text-sm text-slate-500 font-semibold">{dates || 'Any dates'}</span>
                <span className="text-slate-300">•</span>
                <span className="text-sm text-slate-500 font-semibold">{guests || 'Guests'}</span>
              </div>
              <Link href="/" className="text-teal-900 hover:text-teal-700 text-xs uppercase tracking-wider font-bold transition-colors">
                Modify Search
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Showing <strong className="text-slate-900">{total} verified stays</strong></span>
              <div className="h-4 w-px bg-slate-300"></div>
              {/* Note: Sort moved into ExploreFilters */}
            </div>
          </div>

          {/* Quick Filters */}
          <ExploreFilters minPrice={minPriceDisplay} maxPrice={maxPriceDisplay} />
          
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
                    capacity={hotel.capacity}
                    amenities={hotel.amenityList}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <ExplorePagination totalItems={total} itemsPerPage={limit} />
            
          </div>

          {/* Right: Map (5 Cols, Sticky) */}
          <aside className="flex flex-col xl:col-span-5 w-full h-[500px] xl:sticky xl:top-[180px] xl:h-[calc(100vh-210px)] rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-200 order-first xl:order-last mb-8 xl:mb-0">
            <div className="relative w-full h-full">
              <ExploreMap hotels={hotels} />
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
