"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, Filter, Zap, Wifi, Shield } from "lucide-react";

export default function ExploreFilters({
  minPrice,
  maxPrice
}: {
  minPrice: number,
  maxPrice: number
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const power = searchParams.get("power") === "true";
  const wifi = searchParams.get("wifi") === "true";
  const security = searchParams.get("security") === "true";
  const sort = searchParams.get("sort") || "recommended";

  const toggleFilter = (key: string, value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, "true");
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset to page 1 on filter
    router.push(`/explore?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`/explore?${params.toString()}`);
  };

  const formatPrice = (amount: number) => {
    if (amount >= 1000000) return `₦${Math.floor(amount / 1000000)}m`;
    if (amount >= 1000) return `₦${Math.floor(amount / 1000)}k`;
    return `₦${amount}`;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Top Strip (Sort) */}
      <div className="flex items-center justify-end w-full">
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 text-sm font-medium transition-all">
            <span>Sort: <strong className="font-bold">{sort === "price_asc" ? "Price: Low to High" : sort === "price_desc" ? "Price: High to Low" : "Recommended"}</strong></span>
            <ChevronDown size={16} />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button onClick={() => handleSortChange("recommended")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">Recommended</button>
            <button onClick={() => handleSortChange("price_asc")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">Price: Low to High</button>
            <button onClick={() => handleSortChange("price_desc")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">Price: High to Low</button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide text-sm">
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-900 text-white font-bold hover:bg-teal-800 transition-colors shadow-sm shrink-0">
          <SlidersHorizontal size={16} />
          <span>{formatPrice(minPrice)} – {formatPrice(maxPrice)}+</span>
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors shrink-0">
          <span>Property Type</span>
          <ChevronDown size={16} />
        </button>
        <button 
          onClick={() => toggleFilter("power", !power)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold transition-colors shrink-0 ${power ? "bg-teal-900 text-white shadow-sm" : "bg-teal-50 border border-teal-100 text-teal-900 hover:bg-teal-100"}`}
        >
          <Zap size={16} />
          <span>24/7 Power Guaranteed</span>
        </button>
        <button 
          onClick={() => toggleFilter("wifi", !wifi)}
          className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition-colors shrink-0 ${wifi ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        >
          <Wifi size={16} />
          <span>Fiber Wi-Fi</span>
        </button>
        <button 
          onClick={() => toggleFilter("security", !security)}
          className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition-colors shrink-0 ${security ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        >
          <Shield size={16} />
          <span>Gated Security</span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 shrink-0 mx-2"></div>
        
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold ml-auto shrink-0 transition-colors">
          <Filter size={16} />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  );
}
