import React from "react";
import { Heart, Search, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WishlistsPage() {
  const wishlists = [
    {
      id: 1,
      name: "Weekend Getaways",
      count: 3,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      location: "Lagos, Nigeria",
    },
    {
      id: 2,
      name: "Lagos Work Trips",
      count: 2,
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
      location: "Victoria Island",
    },
    {
      id: 3,
      name: "Abuja Villas",
      count: 1,
      image:
        "https://images.unsplash.com/photo-1577977461421-4f1647413a96?auto=format&fit=crop&q=80",
      location: "Maitama",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 flex flex-col gap-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Saved Stays & Wishlists
            </h2>
            <p className="text-slate-500 mt-1">
              Curate and manage your favorite luxury stays
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-900 text-white font-semibold hover:bg-teal-800 transition-colors shadow-sm active:scale-95">
            <Heart size={18} className="fill-white" />
            Create List
          </button>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {wishlists.map((list) => (
          <Link
            href={`/profile/wishlists/${list.id}`}
            key={list.id}
            className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <Image
                src={list.image}
                alt={list.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="font-serif text-lg font-bold">{list.name}</h3>
                  <p className="text-xs text-white/80 font-medium flex items-center gap-1 mt-0.5">
                    <Home size={12} /> {list.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold border border-white/20">
                  {list.count}
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-teal-900 group-hover:text-orange-600 transition-colors">
                View all {list.count} stays
              </span>
              <ArrowRight
                size={16}
                className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Explore More CTA */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 border-dashed p-8 text-center flex flex-col items-center justify-center gap-4 mt-4">
        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-900">
          <Search size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Discover more premium stays
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Explore verified properties with 24/7 power, guaranteed security,
            and tier-1 amenities across Nigeria.
          </p>
        </div>
        <Link
          href="/explore"
          className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-teal-900 transition-colors mt-2"
        >
          Start Exploring
        </Link>
      </div>
    </div>
  );
}
