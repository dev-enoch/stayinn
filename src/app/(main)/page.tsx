import React from "react";
import Link from "next/link";
import { ArrowRight, Search, MapPin, Calendar, Users, Zap, Wifi, Shield, ShieldCheck, ChevronRight } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import HotelCard from "@/components/hotel/HotelCard";

export default async function Home() {
  let featuredHotels = [];
  try {
    const response = await apiClient.get('/api/hotels?limit=3');
    featuredHotels = response.success ? response.data.items : [];
  } catch (error) {
    console.error("Failed to fetch featured hotels:", error);
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 px-4 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Text & Search */}
          <div className="lg:col-span-7 flex flex-col z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-900 w-fit mb-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider font-bold">Boutique Serviced Residences</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-teal-950 tracking-tight mb-6 leading-[1.1]">
              Find Your Perfect Stay <br />
              <span className="italic font-normal text-orange-700">in Nigeria.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
              Experience curated architectural spaces, uncompromised comfort, and the warmth of Nigerian hospitality across Lagos, Abuja, Port Harcourt, and Calabar.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 pt-2">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-teal-900">100%</span>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">24/7 Power</span>
              </div>
              <div className="w-px h-10 bg-slate-300 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-teal-900">350+</span>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">Verified Suites</span>
              </div>
              <div className="w-px h-10 bg-slate-300 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-orange-700">4.92 ★</span>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">Guest Rating</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" 
                alt="Luxury Villa" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent"></div>
              
              {/* Floating Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900 font-bold">The Courtyard Residence</p>
                  <p className="text-xs text-slate-500 font-medium">Ikoyi, Lagos · Private Chef Included</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold whitespace-nowrap">₦150k/night</span>
              </div>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-teal-900/10 blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Floating Search Widget */}
        <div className="relative z-20 mt-12 lg:-mt-8 bg-white rounded-2xl shadow-xl p-4 sm:p-5 border border-slate-100 max-w-5xl mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-text border border-slate-100">
              <MapPin className="text-teal-900 shrink-0" size={20} />
              <div className="flex flex-col min-w-0 flex-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Destination</label>
                <input className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none placeholder:text-slate-400 truncate" placeholder="e.g. Ikoyi, Maitama" type="text" />
              </div>
            </div>
            
            <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-text border border-slate-100">
              <Calendar className="text-teal-900 shrink-0" size={20} />
              <div className="flex flex-col min-w-0 flex-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Dates</label>
                <input className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none placeholder:text-slate-400 truncate" placeholder="Check in - Check out" type="text" />
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-text border border-slate-100">
              <Users className="text-teal-900 shrink-0" size={20} />
              <div className="flex flex-col min-w-0 flex-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Guests</label>
                <input className="bg-transparent border-0 p-0 text-slate-900 text-sm font-semibold focus:outline-none placeholder:text-slate-400 truncate" placeholder="2 Adults" type="text" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <button className="w-full h-[52px] rounded-xl bg-orange-700 hover:bg-orange-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all" type="button">
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <section className="w-full bg-white py-16 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Guaranteed 24/7 Power</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">Dual industrial generators and solar battery inverters at every property.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0">
                <Wifi size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">High-Speed Fiber Wi-Fi</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">100Mbps+ uncapped dedicated bandwidth for remote work & streaming.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Vetted Gated Security</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">Access-controlled private estates, CCTV, and 24-hour trained personnel.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Curated Nigerian Hosts</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">Personally verified spaces inspected for pristine hygiene & hospitality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS SHOWCASE */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-orange-700 font-bold">Prime Locations</span>
            <h2 className="font-serif text-3xl md:text-4xl text-teal-950 mt-2 font-bold tracking-tight">Explore by Curated Destinations</h2>
          </div>
          <Link href="/cities" className="inline-flex items-center gap-1.5 text-sm text-teal-900 font-bold hover:text-orange-700 transition-colors group">
            <span>View all 14 Nigerian cities</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Lagos", sub: "Victoria Island & Lekki", img: "https://images.unsplash.com/photo-1590483736622-398bb2c45980?auto=format&fit=crop&q=80", count: "140+" },
            { name: "Abuja", sub: "Maitama & Asokoro", img: "https://images.unsplash.com/photo-1577977461421-4f1647413a96?auto=format&fit=crop&q=80", count: "95+" },
            { name: "Port Harcourt", sub: "Old GRA", img: "https://images.unsplash.com/photo-1626245107068-18e404bf7cba?auto=format&fit=crop&q=80", count: "45+" },
            { name: "Calabar", sub: "Marina Resort", img: "https://images.unsplash.com/photo-1602028682054-0a3a41147814?auto=format&fit=crop&q=80", count: "30+" },
          ].map((city, i) => (
            <Link key={i} href={`/explore?city=${city.name}`} className="group relative rounded-3xl overflow-hidden h-96 shadow-md bg-slate-200 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-end p-6">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url('${city.img}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/40 to-transparent"></div>
              
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-white font-bold">{city.name}</h3>
                <p className="text-xs text-teal-100 mt-1">{city.sub}</p>
                <div className="mt-4 pt-3 flex items-center justify-between text-white text-xs font-semibold border-t border-white/20">
                  <span>{city.count} Properties</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED STAYS */}
      <section className="bg-slate-100 py-24 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-700 font-bold">Handpicked Accommodations</span>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 mt-2 font-bold tracking-tight">Featured Luxury Stays</h2>
            </div>
            <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-teal-900 font-bold hover:text-orange-700 transition-colors group">
              <span>View all properties</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel: any) => (
              <HotelCard 
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                locationName={hotel.address.split(',')[0]}
                coverImage={hotel.coverImage || ""}
                startingPrice={hotel.startingPrice || 0}
              />
            ))}
            
            {/* Fallback if no API data yet */}
            {featuredHotels.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">
                No featured hotels available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOST BANNER */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 py-24 w-full">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-teal-900 text-white p-8 sm:p-14 lg:p-20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-800 text-teal-100 text-xs uppercase tracking-wider mb-6 font-bold">
                <span>Host Partnership Program</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-bold leading-[1.1] mb-6">
                Earn with Your Premium Space in Nigeria.
              </h2>
              <p className="text-lg text-teal-100 max-w-xl mb-10 leading-relaxed">
                Join over 1,200 property owners earning reliable rental yields. We handle guest vetting, continuous concierge, payment settlement in Naira or USD, and damage protection.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/host" className="px-6 py-4 rounded-xl bg-orange-700 text-white text-sm font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                  List Your Property
                </Link>
                <Link href="/host/estimate" className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold backdrop-blur-md transition-all border border-white/20">
                  Calculate Your Earnings
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-700">Instant Yield Estimator</span>
                  <span className="px-2.5 py-1 rounded bg-teal-50 text-xs font-bold text-teal-900">Lekki Phase 1</span>
                </div>
                <p className="text-sm text-slate-500 mb-2">Average host earnings for 3-Bedroom Villa</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl text-teal-950 font-bold">₦1,850,000</span>
                  <span className="text-sm text-slate-500 font-semibold">/ month</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-500 mb-1">Guaranteed Payout</span>
                    <span className="text-sm font-bold text-teal-900">Every 48 Hours</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-500 mb-1">Host Protection</span>
                    <span className="text-sm font-bold text-teal-900">₦25M Insurance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,0 L100,100 M0,50 L50,100 M50,0 L100,50" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
      </section>

    </div>
  );
}
