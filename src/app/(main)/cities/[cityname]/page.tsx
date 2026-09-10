import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import HotelCard from '@/components/hotel/HotelCard';
import { ArrowLeft, MapPin } from 'lucide-react';

interface Props {
  params: Promise<{ cityname: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CityHotelsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const cityName = decodeURIComponent(resolvedParams.cityname);
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const ITEMS_PER_PAGE = 6;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause = {
    address: { contains: cityName, mode: 'insensitive' as const },
    status: 'APPROVED' as const
  };

  const totalHotels = await prisma.hotel.count({ where: whereClause });
  const totalPages = Math.ceil(totalHotels / ITEMS_PER_PAGE);

  const hotels = await prisma.hotel.findMany({
    where: whereClause,
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' },
    include: {
      amenities: true,
      roomTypes: {
        where: { status: 'ACTIVE' },
        select: { pricePerNight: true, capacity: true }
      }
    }
  });

  const formattedHotels = hotels.map(hotel => {
    const startingPrice = hotel.roomTypes.length > 0 
      ? Math.min(...hotel.roomTypes.map(rt => Number(rt.pricePerNight))) 
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

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="relative w-full pt-40 pb-16 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/90 via-teal-950/80 to-slate-900"></div>
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 relative z-10">
          <Link href="/cities" className="inline-flex items-center gap-2 text-teal-200 hover:text-white transition-colors mb-6 text-sm font-bold">
            <ArrowLeft size={16} /> Back to Cities
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center">
              <MapPin size={20} className="text-teal-200" />
            </div>
            <span className="text-xs uppercase tracking-widest text-teal-200 font-bold">City Profile</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white tracking-tight font-bold mb-4 capitalize">
            {cityName}
          </h1>
          <p className="text-lg text-teal-100/80 leading-relaxed max-w-xl">
            {totalHotels} properties found in this location. Explore our curated selection of premium serviced apartments and luxury stays.
          </p>
        </div>
      </section>

      <section className="w-full py-16 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12">
          {formattedHotels.length === 0 ? (
            <div className="w-full bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <MapPin className="text-slate-400 mb-4" size={48} />
              <h3 className="font-serif text-2xl text-slate-900 font-bold mb-2">No Properties Found</h3>
              <p className="text-slate-500 max-w-md mx-auto">We couldn't find any approved properties in {cityName} matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {formattedHotels.map(hotel => (
                <HotelCard 
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  locationName={hotel.address.split(',')[0]}
                  coverImage={hotel.coverImage || ""}
                  startingPrice={hotel.startingPrice || 0}
                  capacity={hotel.capacity}
                  amenities={hotel.amenityList}
                  isVerified={hotel.isVerified}
                  isSuperhost={hotel.isSuperhost}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16 border-t border-slate-200 pt-8">
              {currentPage > 1 ? (
                <Link href={`/cities/${resolvedParams.cityname}?page=${currentPage - 1}`} className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors shadow-sm">
                  Previous
                </Link>
              ) : (
                <button disabled className="px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold cursor-not-allowed">
                  Previous
                </button>
              )}
              
              <span className="text-sm font-bold text-slate-500">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link href={`/cities/${resolvedParams.cityname}?page=${currentPage + 1}`} className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors shadow-sm">
                  Next
                </Link>
              ) : (
                <button disabled className="px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold cursor-not-allowed">
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
