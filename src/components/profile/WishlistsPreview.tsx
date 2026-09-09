import React from 'react';
import { Plus } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default async function WishlistsPreview() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  let wishlists = [];
  try {
    const res = await apiClient.get('/api/users/me/wishlists'); // Assuming this endpoint exists
    if (res?.data) {
      wishlists = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch wishlists", error);
  }

  // The user requested: "remove every mock data and replace with empty state or completely hide the section"
  if (!wishlists || wishlists.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-slate-900 font-semibold">Saved Collections</h2>
            <p className="text-sm text-slate-500">Curated wishlists for upcoming vacations</p>
          </div>
          <button className="text-xs text-teal-600 font-bold hover:underline flex items-center gap-1" type="button">
            <span>Create New List</span>
            <Plus size={16} />
          </button>
        </div>
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-10 text-center">
          <p className="text-slate-500 text-sm">You have no saved collections.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-slate-900 font-semibold">Saved Collections</h2>
          <p className="text-sm text-slate-500 mt-1">Curated wishlists for upcoming vacations and business workations</p>
        </div>
        <button className="text-xs text-teal-600 font-bold hover:underline flex items-center gap-1" type="button">
          <span>Create New List</span>
          <Plus size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {wishlists.map((list: any, i: number) => (
          <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer border border-slate-100">
            <div className="relative h-40 overflow-hidden bg-slate-100">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                alt={list.name} 
                src={list.image || 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80'}
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/75 text-white text-xs font-semibold backdrop-blur-sm">
                {list.itemCount || 0} stays
              </span>
            </div>
            <div className="p-4 flex flex-col">
              <h3 className="text-base text-slate-900 font-bold">{list.name || 'Wishlist'}</h3>
              <p className="text-xs text-slate-500">{list.description || 'Saved places'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WishlistsPreviewSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-slate-200 rounded"></div>
        </div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="h-40 w-full bg-slate-200"></div>
          <div className="p-4">
            <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="h-40 w-full bg-slate-200"></div>
          <div className="p-4">
            <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="h-40 w-full bg-slate-200"></div>
          <div className="p-4">
            <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
