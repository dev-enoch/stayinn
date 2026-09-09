"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Zap, Wifi } from "lucide-react";

interface HotelCardProps {
  id: string;
  name: string;
  locationName: string;
  coverImage: string;
  startingPrice: number;
}

export default function HotelCard({
  id,
  name,
  locationName,
  coverImage,
  startingPrice,
}: HotelCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(startingPrice);

  return (
    <article className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-slate-100 h-full">
      <Link href={`/hotels/${id}`} className="block relative w-full h-56 overflow-hidden bg-slate-100">
        <Image
          src={coverImage}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-teal-900/90 text-white text-[11px] font-bold backdrop-blur-sm shadow-sm flex items-center gap-1">
            Verified
          </span>
          <span className="px-2.5 py-1 rounded-full bg-orange-700 text-white text-[11px] font-bold backdrop-blur-sm shadow-sm">
            Superhost
          </span>
        </div>
        
        {/* Wishlist Button (prevent default to avoid navigating) */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 flex items-center justify-center backdrop-blur-sm transition-colors shadow-sm z-10"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
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
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal-900 uppercase tracking-wider">{locationName}</span>
            <div className="flex items-center gap-1 text-slate-900 font-bold">
              <Star size={14} className="text-orange-500 fill-orange-500" />
              <span>4.98</span>
              <span className="text-slate-400 font-normal">(54)</span>
            </div>
          </div>
          
          <Link href={`/hotels/${id}`}>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors leading-tight line-clamp-1">
              {name}
            </h3>
          </Link>
          
          <p className="text-xs text-slate-500 mt-1">2 Beds • 2.5 Baths • Premium Serviced</p>
        </div>
        
        {/* Amenities Chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-teal-900 font-bold text-[10px] flex items-center gap-1">
            <Zap size={12} /> 24/7 Power
          </span>
          <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-teal-900 font-bold text-[10px] flex items-center gap-1">
            <Wifi size={12} /> Fiber Wi-Fi
          </span>
        </div>
        
        {/* Price & Action */}
        <div className="pt-2 mt-auto border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-lg text-teal-950 font-bold">{formattedPrice}</span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
          </div>
          <Link 
            href={`/hotels/${id}`}
            className="px-4 py-2 rounded-lg bg-teal-900 hover:bg-teal-800 text-white text-xs font-bold tracking-wide transition-colors shadow-sm"
          >
            Reserve
          </Link>
        </div>
      </div>
    </article>
  );
}
