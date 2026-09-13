import React from "react";
import Image from "next/image";
import { Camera, ShieldCheck, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export default async function ProfileHeaderStats() {
  const session = await getSession();

  type UserStats = {
    id: string;
    staysCount?: number;
    reviewsCount?: number;
    rating?: number;
    fullName?: string | null;
    createdAt?: Date | string;
    avatarUrl?: string | null;
  };
  let user: UserStats | null = null;
  if (session) {
    try {
      user = await prisma.user.findUnique({
        where: { id: session.userId },
      });
      if (user) {
        // mock some stats for the UI
        user.staysCount = 0;
        user.reviewsCount = 0;
        user.rating = 5.0;
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  }

  if (!user) {
    return (
      <section className="px-4 py-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Camera size={32} className="text-slate-300" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Guest User
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Please sign in to view your profile
        </p>
      </section>
    );
  }

  const profileName = user.fullName || "User";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";
  const stays = user.staysCount || 0;
  const reviews = user.reviewsCount || 0;
  const rating = user.rating || 0;

  return (
    <section className="px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Avatar Area */}
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 relative shadow-sm">
              <Image
                src={
                  user.avatarUrl ||
                  "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=400&auto=format&fit=crop"
                }
                alt={`${profileName} profile`}
                fill
                className="object-cover"
              />
            </div>
            <button
              aria-label="Update profile photo"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Camera size={14} />
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {profileName}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Member since {memberSince}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-slate-700">
                <ShieldCheck size={14} className="text-green-600" />
                <span className="text-xs font-medium">Verified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-slate-700">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium">Super Guest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Divider (Desktop) */}
        <div className="hidden md:block w-px h-16 bg-slate-200 mx-4"></div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-4 md:mt-0 px-2 md:px-0">
          <div className="flex flex-col">
            <span className="text-2xl font-semibold tracking-tight text-slate-900">
              {stays}
            </span>
            <span className="text-xs font-medium text-slate-500 mt-0.5">
              Stays
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-semibold tracking-tight text-slate-900">
              {reviews}
            </span>
            <span className="text-xs font-medium text-slate-500 mt-0.5">
              Reviews
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-semibold tracking-tight text-slate-900">
                {rating}
              </span>
              <Star size={16} className="fill-slate-900 text-slate-900 mb-1" />
            </div>
            <span className="text-xs font-medium text-slate-500 mt-0.5">
              Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skeleton Fallback
export function ProfileHeaderStatsSkeleton() {
  return (
    <section className="px-4 py-8 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-200" />
          <div className="flex flex-col gap-2">
            <div className="h-7 w-48 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="flex gap-2 mt-1">
              <div className="h-6 w-20 bg-slate-200 rounded-full" />
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
        <div className="hidden md:block w-px h-16 bg-slate-200 mx-4"></div>
        <div className="flex items-center gap-8 mt-4 md:mt-0 px-2 md:px-0">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-8 bg-slate-200 rounded" />
            <div className="h-3 w-10 bg-slate-200 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-8 w-8 bg-slate-200 rounded" />
            <div className="h-3 w-12 bg-slate-200 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-8 w-12 bg-slate-200 rounded" />
            <div className="h-3 w-10 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
