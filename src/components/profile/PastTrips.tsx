import React from 'react';
import { ChevronRight, Receipt, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export default async function PastTrips() {
  const session = await getSession();

  let pastBookings: any[] = [];
  if (session) {
    try {
      pastBookings = await prisma.booking.findMany({
        where: { 
          userId: session.userId,
          status: 'COMPLETED'
        },
        orderBy: { checkInDate: 'desc' },
        include: { hotel: true }
      });
    } catch (error) {
      console.error("Failed to fetch past trips", error);
    }
  }

  // The user requested: "remove every mock data and replace with empty state or completely hide the section"
  if (!pastBookings || pastBookings.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-slate-900 font-semibold">Past Trips History</h2>
        </div>
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 text-center">
          <p className="text-slate-500 text-sm">You have no past trips.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-slate-900 font-semibold">Past Trips History</h2>
        <Link href="/profile/bookings" className="text-xs text-teal-600 font-bold hover:underline flex items-center gap-1">
          <span>View All Receipts</span>
          <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="flex flex-col gap-3">
        {pastBookings.map((booking: any) => (
          <div key={booking.id} className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-100">
            <div className="flex items-center gap-4 min-w-0">
              <img 
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-slate-100" 
                alt={booking.hotel?.name || 'Hotel'} 
                src={booking.hotel?.image || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80'}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-600 font-semibold">
                    {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-slate-500 text-xs">• 3 Nights</span>
                </div>
                <h3 className="text-lg text-slate-900 font-bold truncate">{booking.hotel?.name || 'Stayinn Property'}</h3>
                <p className="text-sm text-slate-500 truncate">{booking.hotel?.address || 'Lagos, Nigeria'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-teal-900 text-xs font-semibold transition-all" type="button">
                <Receipt size={16} />
                <span>Tax Invoice</span>
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-900 text-white text-xs font-semibold hover:bg-teal-800 transition-all shadow-sm" type="button">
                <RefreshCw size={16} />
                <span>Book Again</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PastTripsSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-slate-200 rounded"></div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-28 bg-white border border-slate-100 rounded-xl"></div>
        <div className="h-28 bg-white border border-slate-100 rounded-xl"></div>
      </div>
    </div>
  );
}
