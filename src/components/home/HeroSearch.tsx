"use client";

import React, { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSearch({ cities = [] }: { cities?: { name: string }[] }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (destination) query.append("city", destination);
    if (checkIn) query.append("checkIn", checkIn);
    if (checkOut) query.append("checkOut", checkOut);
    if (guests) query.append("guests", guests);
    router.push(`/explore?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <label className="md:col-span-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-text border border-slate-100">
        <MapPin className="text-teal-900 shrink-0" size={20} />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Destination</span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none w-full appearance-none cursor-pointer"
          >
            <option value="">Anywhere</option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </label>
      
      <label className="md:col-span-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-text border border-slate-100">
        <Calendar className="text-teal-900 shrink-0" size={20} />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Check in</span>
          <input 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none w-full cursor-pointer" 
            type="date" 
            min={today}
          />
        </div>
        <div className="w-px h-8 bg-slate-200 shrink-0 mx-2 hidden sm:block"></div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Check out</span>
          <input 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none w-full cursor-pointer" 
            type="date" 
            min={checkIn || today}
          />
        </div>
      </label>
      
      <label className="md:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-text border border-slate-100">
        <Users className="text-teal-900 shrink-0" size={20} />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Guests</span>
          <input 
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none placeholder:text-slate-400 truncate w-full" 
            placeholder="2 Adults" 
            type="number" 
            min="1"
          />
        </div>
      </label>
      
      <div className="md:col-span-2">
        <button type="submit" className="w-full h-[52px] rounded-xl bg-orange-700 hover:bg-orange-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all">
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
