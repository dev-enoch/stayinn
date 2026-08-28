import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Wifi, Droplets, Zap, Car, Waves, Dumbbell, Utensils, Wind } from "lucide-react";
import { Amenity } from "@prisma/client";

// Helper to map DB amenities to icons
const getAmenityIcon = (amenity: Amenity) => {
  switch (amenity) {
    case "WIFI": return <Wifi size={18} />;
    case "WATER": return <Droplets size={18} />;
    case "BACKUP_POWER": return <Zap size={18} />;
    case "PARKING": return <Car size={18} />;
    case "POOL": return <Waves size={18} />;
    case "GYM": return <Dumbbell size={18} />;
    case "RESTAURANT": return <Utensils size={18} />;
    case "AIR_CONDITIONING": return <Wind size={18} />;
    default: return null;
  }
};

const getAmenityLabel = (amenity: Amenity) => {
  return amenity.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export default async function HotelStorePage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const hotelId = params.id;

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      amenities: true,
      roomTypes: {
        where: { status: "ACTIVE" },
      },
    },
  });

  if (!hotel || hotel.status !== "APPROVED") {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      
      {/* Cover Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-100">
        {hotel.coverImage ? (
          <Image 
            src={hotel.coverImage}
            alt={hotel.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-16">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Main Info */}
          <div className="w-full md:w-2/3 space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                {hotel.name}
              </h1>
              <div className="flex items-center text-lg text-gray-600">
                <MapPin size={20} className="mr-2 text-green-600 flex-shrink-0" />
                <span>{hotel.address}</span>
              </div>
            </div>

            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="leading-relaxed">
                {hotel.description || "A premium stay curated for your ultimate comfort."}
              </p>
            </div>

            {/* Amenities row */}
            {hotel.amenities.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">What this place offers</h3>
                <div className="flex flex-wrap gap-4">
                  {hotel.amenities.map(a => (
                    <div key={a.id} className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-gray-700 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      {getAmenityIcon(a.amenity)}
                      <span className="font-medium">{getAmenityLabel(a.amenity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Map Preview Placeholder */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-32 bg-gray-50 p-1 rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative group cursor-pointer">
                <Image 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Map preview" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-green-600 mb-3">
                    <MapPin size={24} />
                  </div>
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-gray-900 shadow-sm text-sm">
                    View on Map
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Types */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">Available Rooms</h2>
          
          {hotel.roomTypes.length === 0 ? (
            <p className="text-gray-500 text-lg">No rooms currently available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotel.roomTypes.map(room => {
                const formattedPrice = new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  maximumFractionDigits: 0,
                }).format(room.pricePerNight);

                return (
                  <Link href={`/hotels/${hotel.id}/rooms/${room.id}`} key={room.id} className="block group">
                    <div className="border border-gray-200 p-8 rounded-3xl hover:border-green-600 hover:shadow-md transition-all duration-300 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {room.name}
                        </h3>
                        <div className="text-right">
                          <span className="block text-2xl font-bold text-gray-900">{formattedPrice}</span>
                          <span className="text-sm text-gray-500">per night</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-500 mb-6">
                        <div className="flex items-center gap-1.5">
                          <Users size={18} />
                          <span>Sleeps {room.capacity}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">
                        {room.description || "A beautiful and comfortable space for your stay."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
