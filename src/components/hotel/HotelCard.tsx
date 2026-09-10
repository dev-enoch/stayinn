"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Zap, Wifi } from "lucide-react";

interface HotelCardProps {
  id: string;
  slug: string;
  name: string;
  locationName: string;
  coverImage: string;
  startingPrice: number;
  amenities?: string[];
  capacity?: number;
  isVerified?: boolean;
  isSuperhost?: boolean;
}

const amenityIconMap: Record<string, React.ReactNode> = {
  WIFI: <Wifi size={12} />,
  WATER: <Zap size={12} />, // Using Zap for Water as placeholder, or add a Drop icon
  BACKUP_POWER: <Zap size={12} />,
};

const amenityNameMap: Record<string, string> = {
  WIFI: "Fiber Wi-Fi",
  WATER: "Constant Water",
  BACKUP_POWER: "24/7 Power",
  PARKING: "Secure Parking",
  POOL: "Swimming Pool",
  GYM: "Fitness Center",
  RESTAURANT: "Restaurant",
  AIR_CONDITIONING: "Air Conditioning"
};

export default function HotelCard({
  id,
  slug,
  name,
  locationName,
  coverImage,
  startingPrice,
  amenities = [],
  capacity = 2,
  isVerified = false,
  isSuperhost = false,
}: HotelCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(startingPrice);

  const REPLACEMENTS: Record<string, string> = {
    '1626245107068-18e404bf7cba': '1600585154340-be6161a56a0c',
    '1577977461421-4f1647413a96': '1600607686527-6fb886090705',
    '1590483736622-398bb2c45980': '1618221118493-9cfa1a1c00da',
  };
  
  let safeCoverImage = coverImage;
  for (const [oldId, newId] of Object.entries(REPLACEMENTS)) {
    if (safeCoverImage?.includes(oldId)) {
      safeCoverImage = safeCoverImage.replace(oldId, newId);
    }
  }

  return (
    <article className="group rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden border border-slate-100 h-full">
      <Link href={`/hotels/${slug}`} className="block relative w-full h-56 overflow-hidden bg-slate-100">
        <Image
          src={safeCoverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isVerified && (
            <span className="px-3 py-1.5 rounded-full bg-teal-900/90 text-white text-xs font-bold backdrop-blur-sm shadow-sm flex items-center gap-1">
              Verified
            </span>
          )}
          {isSuperhost && (
            <span className="px-3 py-1.5 rounded-full bg-orange-700 text-white text-xs font-bold backdrop-blur-sm shadow-sm">
              Superhost
            </span>
          )}
        </div>
        
        {/* Wishlist Button (prevent default to avoid navigating) */}
        <button 
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 w-[44px] h-[44px] rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 flex items-center justify-center backdrop-blur-sm transition-colors shadow-sm z-10"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={20} />
        </button>
        
        {/* Gallery Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-bold text-teal-900 uppercase tracking-wider">{locationName}</span>
            {isVerified && (
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <span className="text-slate-600 font-normal ml-1">Verified</span>
              </div>
            )}
          </div>
          
          <Link href={`/hotels/${slug}`}>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors leading-tight line-clamp-1">
              {name}
            </h3>
          </Link>
          
          <p className="text-xs text-slate-600 mt-1">Sleeps {capacity} Guests • Premium Serviced</p>
        </div>
        
        {/* Amenities Chips */}
        <div className="flex flex-wrap gap-1.5">
          {amenities.slice(0, 3).map(amenity => (
            <span key={amenity} className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-teal-900 font-bold text-[10px] flex items-center gap-1">
              {amenityIconMap[amenity] || <Zap size={12} />} {amenityNameMap[amenity] || amenity}
            </span>
          ))}
          {amenities.length === 0 && (
            <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-500 font-medium text-[10px] flex items-center gap-1">
              Serviced Suite
            </span>
          )}
        </div>
        
        {/* Price & Action */}
        <div className="pt-2 mt-auto border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Starting from</div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-lg text-teal-950 font-bold">{formattedPrice}</span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
          </div>
          <Link 
            href={`/hotels/${slug}`}
            className="px-4 py-2 rounded-lg bg-teal-900 hover:bg-teal-800 text-white text-xs font-bold tracking-wide transition-colors shadow-sm"
          >
            Reserve
          </Link>
        </div>
      </div>
    </article>
  );
}
