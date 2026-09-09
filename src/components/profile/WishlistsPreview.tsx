import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default async function WishlistsPreview() {
  let wishlists = [];
  try {
    const res = await apiClient.get('/api/wishlists');
    if (res?.data) {
      wishlists = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch wishlists", error);
  }

  if (!wishlists || wishlists.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">Saved Wishlists</h3>
        <Link href="/wishlists" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
          View all ({wishlists.length})
          <ArrowRight size={14} />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {wishlists.slice(0, 3).map((list: any) => (
          <Link href={`/wishlists/${list.id}`} key={list.id} className="group block">
            <div className="w-full aspect-square rounded-xl bg-slate-100 overflow-hidden mb-2 relative border border-slate-200/60">
              <Image 
                src={list.img || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop"} 
                alt={list.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 truncate">{list.name}</span>
              <span className="text-xs text-slate-500 mt-0.5">{list.count || 0} saved items</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Skeleton Fallback
export function WishlistsPreviewSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="h-5 w-20 bg-slate-200 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col">
            <div className="w-full aspect-square rounded-xl bg-slate-200 mb-2" />
            <div className="h-4 w-24 bg-slate-200 rounded mb-1" />
            <div className="h-3 w-16 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
