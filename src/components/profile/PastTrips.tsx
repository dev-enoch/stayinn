import React from 'react';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import Image from 'next/image';

export default async function PastTrips({ page = 1 }: { page?: number }) {
  const session = await getSession();

  let pastBookings: any[] = [];
  let totalBookings = 0;
  const ITEMS_PER_PAGE = 5;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  if (session) {
    try {
      totalBookings = await prisma.booking.count({
        where: { 
          userId: session.userId,
          status: 'COMPLETED'
        }
      });

      pastBookings = await prisma.booking.findMany({
        where: { 
          userId: session.userId,
          status: 'COMPLETED'
        },
        orderBy: { checkInDate: 'desc' },
        skip,
        take: ITEMS_PER_PAGE,
        include: { hotel: true }
      });
    } catch (error) {
      console.error("Failed to fetch past trips", error);
    }
  }

  const totalPages = Math.ceil(totalBookings / ITEMS_PER_PAGE);

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
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Check-in Date</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pastBookings.map((booking: any) => {
                const amountFormatted = new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  maximumFractionDigits: 0,
                }).format(booking.totalAmount);

                return (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-slate-200 shrink-0">
                          <Image 
                            src={booking.hotel?.coverImage || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80'}
                            alt={booking.hotel?.name || 'Hotel'}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 truncate max-w-[150px] sm:max-w-[200px]">
                            {booking.hotel?.name || 'Stayinn Property'}
                          </span>
                          <span className="text-xs text-slate-500 truncate max-w-[150px] sm:max-w-[200px]">
                            {booking.hotel?.address || 'Nigeria'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {booking.numberOfNights} Nights
                    </td>
                    <td className="px-6 py-4 font-semibold text-teal-900">
                      {amountFormatted}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/hotels/${booking.hotelId}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-900 text-white text-xs font-semibold hover:bg-teal-800 transition-all shadow-sm"
                      >
                        <RefreshCw size={14} />
                        <span>Book Again</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              {page > 1 ? (
                <Link 
                  href={`/profile?page=${page - 1}`}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Previous
                </Link>
              ) : (
                <button disabled className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold cursor-not-allowed">
                  Previous
                </button>
              )}

              {page < totalPages ? (
                <Link 
                  href={`/profile?page=${page + 1}`}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Next
                </Link>
              ) : (
                <button disabled className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold cursor-not-allowed">
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PastTripsSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 rounded"></div>
      <div className="h-64 bg-white border border-slate-100 rounded-xl"></div>
    </div>
  );
}
