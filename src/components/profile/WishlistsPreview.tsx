import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

export default async function WishlistsPreview() {
  let wishlists = [];
  try {
    // Attempt to fetch wishlists
    const res = await apiClient.get('/api/wishlists');
    if (res?.data) {
      wishlists = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch wishlists", error);
  }

  // Fallback to mock data if empty
  const isMock = wishlists.length === 0;
  const listsToDisplay = isMock ? [
    { id: 1, name: "Abuja Getaways", count: 5, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Lagos Workations", count: 8, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "Beachfront Stays", count: 4, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=400&auto=format&fit=crop" }
  ] : wishlists.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Saved & Wishlists</h3>
        <Link href="/wishlists" className="text-xs font-bold text-green-700 hover:underline">
          View All ({isMock ? 3 : wishlists.length})
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {listsToDisplay.map((list: any) => (
          <div key={list.id} className="bg-white rounded-xl p-2 shadow-sm border border-slate-200 flex flex-col items-center text-center group cursor-pointer hover:border-green-300 transition-colors">
            <div className="w-full aspect-square rounded-lg bg-slate-200 overflow-hidden mb-2 relative">
              <Image 
                src={list.img || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop"} 
                alt={list.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <span className="text-xs font-bold text-slate-900 truncate w-full">{list.name}</span>
            <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{list.count || 0} places</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton Fallback
export function WishlistsPreviewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-40 bg-slate-200 rounded" />
        <div className="h-4 w-20 bg-slate-200 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-2 shadow-sm border border-slate-200 flex flex-col items-center">
            <div className="w-full aspect-square rounded-lg bg-slate-200 mb-2" />
            <div className="h-3 w-16 bg-slate-200 rounded mb-1" />
            <div className="h-2 w-10 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
