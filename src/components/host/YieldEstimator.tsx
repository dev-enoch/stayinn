"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const EXCHANGE_RATE = 1600; // 1 USD = 1600 NGN

const CITIES = ["Lagos", "Abuja", "Port Harcourt"];

const NEIGHBORHOODS: Record<string, string[]> = {
  Lagos: ["Ikoyi", "Victoria Island", "Lekki Phase 1", "Ikeja GRA"],
  Abuja: ["Maitama", "Wuse II", "Asokoro", "Garki"],
  "Port Harcourt": ["GRA Phase 2", "Peter Odili", "Trans Amadi", "Ada George"],
};

// Base nightly rate for 1 bedroom in NGN
const BASE_RATES: Record<string, number> = {
  Ikoyi: 80000,
  "Victoria Island": 70000,
  "Lekki Phase 1": 60000,
  "Ikeja GRA": 45000,
  Maitama: 75000,
  "Wuse II": 65000,
  Asokoro: 80000,
  Garki: 40000,
  "GRA Phase 2": 55000,
  "Peter Odili": 45000,
  "Trans Amadi": 50000,
  "Ada George": 35000,
};

const BEDROOM_MULTIPLIERS: Record<string, number> = {
  "1 Bed": 1,
  "2 Bed": 1.6,
  "3 Bed": 2.2,
  "4+ Bed": 3.0,
};

export default function YieldEstimator() {
  const router = useRouter();

  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [city, setCity] = useState("Lagos");
  const [neighborhood, setNeighborhood] = useState("Ikoyi");
  const [bedrooms, setBedrooms] = useState("2 Bed");

  // When city changes, reset neighborhood
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    setNeighborhood(NEIGHBORHOODS[newCity][0]);
  };

  const adrNGN = useMemo(() => {
    const base = BASE_RATES[neighborhood] || 50000;
    const multiplier = BEDROOM_MULTIPLIERS[bedrooms] || 1;
    return base * multiplier;
  }, [neighborhood, bedrooms]);

  const monthlyPayoutNGN = useMemo(() => {
    const occupancyRate = 0.82;
    const daysInMonth = 30;
    return adrNGN * daysInMonth * occupancyRate;
  }, [adrNGN]);

  const monthlyPayoutUSD = monthlyPayoutNGN / EXCHANGE_RATE;

  const formatCurrency = (amount: number, curr: "NGN" | "USD") => {
    if (curr === "NGN") {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleContinue = () => {
    // Route to registration flow with host intent
    router.push("/register?role=host");
  };

  return (
    <div className="p-8 lg:p-12 rounded-3xl bg-white shadow-2xl shadow-teal-900/5 border border-slate-100">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-slate-100">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
            Simulate Your Yield
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-tight mt-2 font-bold">
            Estimate Your Monthly Rental Income
          </h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Calculated against real-time Monarch Stay booking volume, seasonal
            surge rates, and corporate lease averages across Nigeria.
          </p>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100 self-stretch sm:self-auto border border-slate-200">
          <button
            onClick={() => setCurrency("NGN")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${currency === "NGN" ? "bg-white text-teal-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
          >
            NGN (₦)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${currency === "USD" ? "bg-white text-teal-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10">
        {/* Interactive Controls */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* City Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              City
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCityChange(c)}
                  className={`px-4 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2 ${city === c ? "bg-teal-900 text-white shadow-md" : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhood Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Prime Neighborhood
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {NEIGHBORHOODS[city].map((n) => (
                <button
                  key={n}
                  onClick={() => setNeighborhood(n)}
                  className={`px-3 py-3 rounded-xl text-sm font-bold transition-all text-center ${neighborhood === n ? "bg-teal-50 text-teal-900 border border-teal-200 shadow-sm" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Bedroom Capacity Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Property Size
              </label>
              <span className="text-sm text-teal-900 font-bold">
                {bedrooms} Luxury Flat
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Object.keys(BEDROOM_MULTIPLIERS).map((b) => (
                <button
                  key={b}
                  onClick={() => setBedrooms(b)}
                  className={`px-3 py-4 rounded-xl font-bold transition-all text-center ${bedrooms === b ? "bg-teal-900 border border-teal-900 text-white shadow-md" : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Yield Output Display */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-50 flex flex-col justify-between h-full border border-slate-200 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-900/5 rounded-bl-[100px] pointer-events-none"></div>

          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                Estimated Monthly Payout
              </span>
              <span className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs font-bold flex items-center gap-1.5 border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-teal-900"></span> 82%
                Occupancy
              </span>
            </div>

            <div className="my-4 transition-all duration-300">
              <span className="font-serif text-5xl md:text-6xl text-teal-900 font-bold tracking-tight block">
                {formatCurrency(
                  currency === "NGN" ? monthlyPayoutNGN : monthlyPayoutUSD,
                  currency,
                )}
              </span>
              <span className="text-slate-500 font-medium mt-2 block">
                approx.{" "}
                <span className="font-bold text-slate-900">
                  {formatCurrency(
                    currency === "NGN" ? monthlyPayoutUSD : monthlyPayoutNGN,
                    currency === "NGN" ? "USD" : "NGN",
                  )}
                </span>{" "}
                net per calendar month
              </span>
            </div>

            {/* Yield breakdown chips */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm py-2.5 px-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-slate-500 font-bold">
                  Projected ADR (Avg Daily Rate)
                </span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(
                    currency === "NGN" ? adrNGN : adrNGN / EXCHANGE_RATE,
                    currency,
                  )}{" "}
                  / night
                </span>
              </div>
              <div className="flex items-center justify-between text-sm py-2.5 px-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-slate-500 font-bold">
                  Concierge & Housekeeping
                </span>
                <span className="font-bold text-teal-900">
                  Fully Included (0% added)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm py-2.5 px-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-slate-500 font-bold">
                  Host Protection Insurance
                </span>
                <span className="font-bold text-orange-600">
                  Up to {currency === "NGN" ? "₦25,000,000" : "$15,625"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col gap-4 relative z-10">
            <button
              onClick={handleContinue}
              className="w-full h-14 rounded-xl bg-teal-900 hover:bg-teal-800 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20 transition-all"
            >
              <span>Continue with this Estimate</span>
              <ChevronRight size={20} />
            </button>
            <p className="text-xs text-slate-500 font-semibold text-center">
              No long-term lock-in. Retain complete personal stay privileges
              anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
