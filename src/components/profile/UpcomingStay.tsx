import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default async function UpcomingStay() {
  let booking = null;
  try {
    // Assume /api/bookings returns { data: [...] }
    const res = await apiClient.get('/api/bookings');
    if (res?.data && res.data.length > 0) {
      booking = res.data[0]; // Just take the first one for demonstration
    }
  } catch (error) {
    console.error("Failed to fetch upcoming stay", error);
  }

  // If there's no booking, we could return null or a nice placeholder.
  // For the sake of the design, we'll fall back to the placeholder if none found.
  const isMock = !booking;
  const hotelName = booking?.hotel?.name || "The Serene Oasis Villa";
  const location = booking?.hotel?.address || "Maitama, Abuja";
  const bookingRef = booking?.id ? `#STN-${booking.id.substring(0, 5)}` : "#STN-84920";
  // Fake dates for mock
  const dateStr = isMock ? "Nov 14 – 18, 2024 • 4 Nights" : `${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Upcoming Stay</h3>
        <span className="text-xs font-bold text-green-700">1 Confirmed</span>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        <div className="relative h-44 w-full bg-slate-200">
          <Image 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" 
            alt={hotelName} 
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-slate-900 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold">Active Reservation</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 tracking-wide">Booking Ref: {bookingRef}</span>
            <h4 className="text-lg font-serif font-bold text-slate-900 mt-1">{hotelName}</h4>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin size={16} className="text-green-700" />
              {location}
            </p>
          </div>
          <div className="flex items-center gap-2 py-2 px-3 bg-slate-50 rounded-lg text-slate-800 border border-slate-100 mt-1">
            <Calendar size={18} className="text-green-700" />
            <span className="text-xs font-semibold">{dateStr}</span>
          </div>
          <button className="mt-2 w-full py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-green-800 font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors">
            <span>View Details</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Skeleton Fallback
export function UpcomingStaySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-20 bg-slate-200 rounded" />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        <div className="h-44 w-full bg-slate-200" />
        <div className="p-4 flex flex-col gap-3">
          <div>
            <div className="h-3 w-32 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-48 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
          <div className="h-10 w-full bg-slate-100 rounded-lg mt-1" />
          <div className="h-12 w-full bg-slate-100 rounded-lg mt-2" />
        </div>
      </div>
    </div>
  );
}
