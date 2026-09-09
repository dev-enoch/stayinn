import React from 'react';
import Image from 'next/image';
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default async function UpcomingStay() {
  let booking = null;
  try {
    const res = await apiClient.get('/api/bookings');
    if (res?.data && res.data.length > 0) {
      booking = res.data[0];
    }
  } catch (error) {
    console.error("Failed to fetch upcoming stay", error);
  }

  const isMock = !booking;
  const hotelName = booking?.hotel?.name || "The Serene Oasis Villa";
  const location = booking?.hotel?.address || "Maitama, Abuja";
  const bookingRef = booking?.id ? `#STN-${booking.id.substring(0, 5)}` : "#STN-84920";
  const dateStr = isMock ? "Nov 14 – 18, 2024" : `${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">Upcoming Stay</h3>
        <span className="text-sm font-medium text-slate-500">1 Confirmed</span>
      </div>
      
      <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-sm">
        <div className="relative h-48 md:h-auto md:w-2/5 bg-slate-100">
          <Image 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" 
            alt={hotelName} 
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-slate-900 flex items-center gap-1.5 shadow-sm border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium">Active</span>
          </div>
        </div>
        
        <div className="p-5 md:w-3/5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Ref: {bookingRef}</span>
            <h4 className="text-lg font-semibold tracking-tight text-slate-900 mt-1">{hotelName}</h4>
            
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} className="text-slate-400" />
                {location}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays size={16} className="text-slate-400" />
                {dateStr}
              </div>
            </div>
          </div>
          
          <button className="mt-6 w-full md:w-auto md:self-start px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors">
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Skeleton Fallback
export function UpcomingStaySkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="h-5 w-20 bg-slate-200 rounded" />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col md:flex-row h-80 md:h-48">
        <div className="h-48 md:h-full md:w-2/5 bg-slate-100" />
        <div className="p-5 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="h-3 w-24 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-48 bg-slate-200 rounded mb-6" />
            <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-40 bg-slate-200 rounded" />
          </div>
          <div className="h-9 w-full md:w-32 bg-slate-200 rounded-md mt-6" />
        </div>
      </div>
    </div>
  );
}
