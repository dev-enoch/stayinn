"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Wifi,
  Droplets,
  Zap,
  Car,
  Waves,
  Dumbbell,
  Utensils,
  Wind,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  XCircle,
} from "lucide-react";
import { Amenity } from "@prisma/client";
import {
  RoomCard,
  BookingWidget,
} from "@/components/hotel/HotelBookingSection";

type RoomImage = { url: string; sortOrder: number };
type RoomType = {
  id: string;
  name: string;
  description: string | null;
  pricePerNight: number;
  capacity: number;
  quantity: number;
  bedType: string | null;
  roomSize: number | null;
  amenities: string[];
  images: RoomImage[];
};
type Hotel = {
  id: string;
  slug: string;
  name: string;
  phoneNumber: string | null;
  whatsappNumber: string | null;
};
type HotelMeta = {
  managerInitial: string;
  hostResponseRate: number;
  description: string | null;
  highlights: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string | null;
  amenities: Amenity[];
  galleryImages: string[];
  latitude: number;
  longitude: number;
};

const getAmenityIcon = (amenity: Amenity) => {
  switch (amenity) {
    case "WIFI":
      return <Wifi size={20} />;
    case "WATER":
      return <Droplets size={20} />;
    case "BACKUP_POWER":
      return <Zap size={20} />;
    case "PARKING":
      return <Car size={20} />;
    case "POOL":
      return <Waves size={20} />;
    case "GYM":
      return <Dumbbell size={20} />;
    case "RESTAURANT":
      return <Utensils size={20} />;
    case "AIR_CONDITIONING":
      return <Wind size={20} />;
    default:
      return <CheckCircle2 size={20} />;
  }
};

const getAmenityLabel = (amenity: Amenity) =>
  amenity
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

export default function HotelClientSection({
  hotel,
  rooms,
  isLoggedIn,
  hotelMeta,
}: {
  hotel: Hotel;
  rooms: RoomType[];
  isLoggedIn: boolean;
  hotelMeta: HotelMeta;
}) {
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* ── LEFT COLUMN ───────────────────────────────────────── */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
        {/* Host */}
        <div className="flex items-center gap-4 pb-8 border-b border-slate-200">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-lg shadow-sm ring-4 ring-slate-50 uppercase">
              {hotelMeta.managerInitial}
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow border-2 border-white">
              <ShieldCheck size={11} />
            </span>
          </div>
          <div>
            <h2 className="text-lg text-slate-900 font-bold">
              Managed by Monarch Stay Verified Partners
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-0.5">
              Premium Host · {hotelMeta.hostResponseRate}% Response Rate
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slate-900 font-bold">
            About the Property
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {hotelMeta.description}
          </p>
          {hotelMeta.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {hotelMeta.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-900 text-xs font-bold border border-teal-100"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-t border-b border-slate-200">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-teal-900">
              <Clock size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Check-in
              </span>
            </div>
            <span className="text-slate-900 font-bold">
              {hotelMeta.checkInTime}
            </span>
            <span className="text-xs text-slate-500">With valid ID card</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-teal-900">
              <Clock size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Check-out
              </span>
            </div>
            <span className="text-slate-900 font-bold">
              {hotelMeta.checkOutTime}
            </span>
            <span className="text-xs text-slate-500">
              Late checkout on request
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-teal-900">
              <XCircle size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Cancellation
              </span>
            </div>
            <span className="text-slate-900 font-bold text-xs leading-snug">
              {hotelMeta.cancellationPolicy ||
                "Free cancellation 48hrs before arrival"}
            </span>
          </div>
        </div>

        {/* Amenities */}
        {hotelMeta.amenities.length > 0 && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">
                Curated Conveniences
              </span>
              <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">
                What This Place Offers
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
              {hotelMeta.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3">
                  <span className="text-teal-900 p-2 bg-teal-50 rounded-lg shrink-0">
                    {getAmenityIcon(a)}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {getAmenityLabel(a)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ROOM CARDS ── */}
        <div id="rooms" className="flex flex-col gap-4 scroll-mt-36">
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">
              Accommodation
            </span>
            <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">
              Available Room Types
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Click a room to select it, then configure your stay in the booking
              panel →
            </p>
          </div>

          {rooms.length === 0 ? (
            <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 text-center text-slate-500">
              No rooms currently available. Check back soon.
            </div>
          ) : (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                quantity={selectedRooms[room.id] || 0}
                onIncrease={() => setSelectedRooms(prev => ({ ...prev, [room.id]: (prev[room.id] || 0) + 1 }))}
                onDecrease={() => setSelectedRooms(prev => ({ ...prev, [room.id]: Math.max(0, (prev[room.id] || 0) - 1) }))}
              />
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT COLUMN: Sticky Booking Widget ───────────────── */}
      <div className="lg:col-span-5 xl:col-span-4 sticky top-28 flex flex-col gap-6">
        <BookingWidget
          hotel={hotel}
          rooms={rooms}
          isLoggedIn={isLoggedIn}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
        />

        {/* Map */}
        <div className="bg-white p-1 rounded-2xl shadow-md border border-slate-100 cursor-pointer group">
          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Map"
              fill
              className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-teal-900 border-4 border-white/50">
                <MapPin size={20} />
              </div>
              <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-slate-900 shadow-md text-xs mt-2">
                View precise location
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
