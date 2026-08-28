import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Hero from "@/components/landing/Hero";
import Amenities from "@/components/landing/Amenities";
import WhyStayinn from "@/components/landing/WhyStayinn";
import HotelCard from "@/components/hotel/HotelCard";

export default async function Home() {
  // Fetch exactly 3 featured hotels for the landing page
  const featuredHotels = await prisma.hotel.findMany({
    where: { status: 'APPROVED' },
    include: {
      roomTypes: {
        where: { status: 'ACTIVE' },
        select: { pricePerNight: true }
      }
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Amenities />
      
      {/* Featured Stays Section */}
      <section className="py-32 px-4 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-4">Featured Stays.</h2>
              <p className="text-gray-600 text-xl">Discover our most sought-after properties across Nigeria.</p>
            </div>
            <Link href="/explore" className="hidden md:flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors text-lg">
              View All <ArrowRight className="ml-2" size={24} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map(hotel => {
              const prices = hotel.roomTypes.map((rt) => rt.pricePerNight);
              const startingPrice = prices.length > 0 ? Math.min(...prices) : 0;
              
              return (
                <HotelCard 
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  locationName={hotel.address.split(',')[0]}
                  coverImage={hotel.coverImage || ""}
                  startingPrice={startingPrice}
                />
              );
            })}
          </div>
          
          {/* Mobile view all button */}
          <div className="mt-12 text-center md:hidden">
            <Link href="/explore" className="inline-flex items-center text-green-600 font-semibold text-lg hover:underline underline-offset-4">
              View All Properties <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <WhyStayinn />
    </div>
  );
}
