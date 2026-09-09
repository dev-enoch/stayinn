import React from 'react';
import Image from 'next/image';
import { Camera, BadgeCheck, Star } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default async function ProfileHeaderStats() {
  // Simulate network delay or fetch real data
  let user = null;
  try {
    const res = await apiClient.get('/api/auth/me');
    if (res?.data) {
      user = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch user profile", error);
  }

  // Fallback to mock data if API fails or doesn't exist yet
  const profileName = user?.fullName || "Amina Adebayo";
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "March 2023";
  const stays = user?.staysCount || 12;
  const reviews = user?.reviewsCount || 4;
  const rating = user?.rating || 4.95;

  return (
    <section className="px-4 pt-6 pb-6 bg-slate-100 lg:bg-slate-50/50">
      <div className="flex flex-col items-center text-center">
        {/* Avatar with edit button */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md bg-slate-200 relative">
            <Image 
              src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=400&auto=format&fit=crop" 
              alt={`${profileName} profile`}
              fill 
              className="object-cover"
            />
          </div>
          <button 
            aria-label="Update profile photo" 
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <Camera size={16} />
          </button>
        </div>
        
        {/* Identity */}
        <h2 className="text-2xl font-semibold font-serif text-slate-900 mb-1">{profileName}</h2>
        <p className="text-base text-slate-500 mb-4">Verified Guest • Member since {memberSince}</p>
        
        {/* Badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-700/10 text-green-700">
            <BadgeCheck size={16} className="fill-green-700 text-green-50" />
            <span className="text-xs font-semibold tracking-wide">ID Verified</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            <Star size={16} className="fill-amber-500 text-amber-500" />
            <span className="text-xs font-semibold tracking-wide">Super Guest</span>
          </div>
        </div>
        
        {/* Stats Metric Bar */}
        <div className="w-full grid grid-cols-3 gap-2 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="flex flex-col items-center justify-center py-1">
            <span className="text-xl font-bold text-green-700">{stays}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stays</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1">
            <span className="text-xl font-bold text-green-700">{reviews}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reviews</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-amber-500 text-amber-500" />
              <span className="text-xl font-bold text-green-700">{rating}</span>
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skeleton Fallback
export function ProfileHeaderStatsSkeleton() {
  return (
    <section className="px-4 pt-6 pb-6 bg-slate-100 lg:bg-slate-50/50 animate-pulse">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-slate-200 mb-3" />
        <div className="h-8 w-48 bg-slate-200 rounded mb-2" />
        <div className="h-5 w-64 bg-slate-200 rounded mb-4" />
        <div className="flex gap-2 mb-6">
          <div className="h-7 w-28 bg-slate-200 rounded-full" />
          <div className="h-7 w-28 bg-slate-200 rounded-full" />
        </div>
        <div className="w-full h-20 bg-white rounded-xl shadow-sm border border-slate-100" />
      </div>
    </section>
  );
}
