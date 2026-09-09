import React from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function WishlistsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  let wishlists: any[] = [];
  if (token) {
    const session = await verifyAccessToken(token);
    if (session?.userId) {
      wishlists = await prisma.wishlist.findMany({
        where: { userId: session.userId },
        include: {
          hotel: {
            select: {
              id: true,
              name: true,
              address: true,
              coverImage: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saved Stays & Wishlists</h2>
          <p className="text-slate-500 mt-1">Keep track of your favorite properties across Nigeria</p>
        </div>
      </div>

      {wishlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <Heart size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No saved stays yet</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            As you explore our curated properties, tap the heart icon to save them here for later.
          </p>
          <Link href="/explore" className="px-6 py-3 bg-teal-900 text-white rounded-lg font-bold hover:bg-teal-800 transition-colors">
            Explore Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((item) => (
            <Link key={item.id} href={`/hotels/${item.hotel.id}`} className="group relative rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow bg-white">
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                {item.hotel.coverImage ? (
                  <img src={item.hotel.coverImage} alt={item.hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-200"></div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm z-10">
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-slate-900 truncate">{item.hotel.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={14} className="shrink-0" />
                  <span className="truncate">{item.hotel.address}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
