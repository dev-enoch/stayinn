import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistsPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saved Stays & Wishlists</h2>
          <p className="text-slate-500 mt-1">Keep track of your favorite properties across Nigeria</p>
        </div>
      </div>

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
    </div>
  );
}
