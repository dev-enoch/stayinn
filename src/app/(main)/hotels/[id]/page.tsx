import { apiClient } from "@/lib/api-client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Wifi, Droplets, Zap, Car, Waves, Dumbbell, Utensils, Wind, ChevronRight, Share, Heart, Star, Shield, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Amenity } from "@prisma/client";

// Helper to map DB amenities to icons
const getAmenityIcon = (amenity: Amenity) => {
  switch (amenity) {
    case "WIFI": return <Wifi size={24} />;
    case "WATER": return <Droplets size={24} />;
    case "BACKUP_POWER": return <Zap size={24} />;
    case "PARKING": return <Car size={24} />;
    case "POOL": return <Waves size={24} />;
    case "GYM": return <Dumbbell size={24} />;
    case "RESTAURANT": return <Utensils size={24} />;
    case "AIR_CONDITIONING": return <Wind size={24} />;
    default: return <CheckCircle2 size={24} />;
  }
};

const getAmenityLabel = (amenity: Amenity) => {
  return amenity.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export default async function HotelDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const response = await apiClient.get(`/api/hotels/${params.id}`);

  if (!response.success || !response.data) {
    notFound();
  }

  const hotel = response.data;
  const startingPrice = hotel.startingPrice || 0;
  
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(startingPrice);

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20">
      
      {/* Breadcrumb & Top Bar */}
      <div className="w-full bg-slate-100/70 py-4 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/explore" className="hover:text-teal-900 transition-colors">Stays</Link>
            <ChevronRight size={14} />
            <Link href="/cities" className="hover:text-teal-900 transition-colors">Nigeria</Link>
            <ChevronRight size={14} />
            <span className="text-teal-900 truncate max-w-[200px] sm:max-w-none">{hotel.name}</span>
          </nav>
          
          <div className="flex items-center gap-4 shrink-0 pl-4">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all text-slate-700 text-xs font-bold shadow-sm">
              <Share size={14} />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all text-slate-700 text-xs font-bold shadow-sm">
              <Heart size={14} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 w-full mt-8 flex flex-col gap-10">
        
        {/* Property Title & Headline Metadata */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-900/10 text-teal-900 text-xs font-bold tracking-wider uppercase border border-teal-900/20">
              <ShieldCheck size={14} />
              Verified Premium Stay
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase border border-orange-200">
              <Star size={14} className="fill-orange-800" />
              Top Rated
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-900 font-bold tracking-tight">
            {hotel.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Star size={18} className="text-orange-500 fill-orange-500" />
              <span>4.96</span>
              <span className="font-normal text-slate-500">(128 reviews)</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-teal-900">Premium Estate</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin size={18} className="text-teal-900" />
              {hotel.address}
            </span>
          </div>
        </div>

        {/* Photo Mosaic Grid (Editorial 5-photo split) */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px]">
            {/* Dominant Hero Left Image */}
            <div className="md:col-span-2 h-full relative group cursor-pointer overflow-hidden bg-slate-200">
              {hotel.coverImage ? (
                <Image 
                  src={hotel.coverImage}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                  <span className="text-slate-400 font-bold">No Image Available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              <span className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-lg">
                Exterior & Property View
              </span>
            </div>
            
            {/* Right 2x2 Subgrid (Placeholders for other images) */}
            <div className="md:col-span-2 grid grid-cols-2 gap-2 h-full hidden sm:grid">
              {[
                "https://images.unsplash.com/photo-1590483736622-398bb2c45980?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1577977461421-4f1647413a96?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1626245107068-18e404bf7cba?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1602028682054-0a3a41147814?auto=format&fit=crop&q=80"
              ].map((imgUrl, i) => (
                <div key={i} className="relative group cursor-pointer overflow-hidden bg-slate-200 h-full">
                  <img 
                    src={imgUrl} 
                    alt="Gallery thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button className="absolute bottom-6 right-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md text-xs font-bold tracking-wide transition-all transform hover:scale-105 border border-slate-100">
            <span>Show all photos</span>
          </button>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-24">
          
          {/* Left Column: Rich Property Information */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
            
            {/* Host Header & Space Metrics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-xl shadow-sm ring-4 ring-slate-50">
                    {hotel.name.charAt(0)}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow border-2 border-white">
                    <ShieldCheck size={12} />
                  </span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl text-slate-900 font-bold">Managed by Stayinn Verified Partners</h2>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Premium Host • 100% Response rate</p>
                </div>
              </div>
            </div>

            {/* Architectural Overview & Space Description */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-slate-900 font-bold">About the Property</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>
                  {hotel.description || "Welcome to your curated stay. Conceived as a tranquil sanctuary away from the vibrant hum of the city, this newly curated property seamlessly blurs indoor comfort with lush outdoor living. The property is designed for guests who desire uncompromised comfort, high-speed connectivity, and absolute security."}
                </p>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">Self Check-in (Smart Lock)</span>
                <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">Dedicated Workspace</span>
                <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">Premium Linens</span>
              </div>
            </div>

            {/* Amenities Mosaic */}
            {hotel.amenities.length > 0 && (
              <div className="flex flex-col gap-6 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-teal-900 font-bold">Curated Conveniences</span>
                    <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">What This Place Offers</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 pt-4">
                  {hotel.amenities.map((a: any) => (
                    <div key={a.code} className="flex items-center gap-3">
                      <span className="text-teal-900 p-2 bg-teal-50 rounded-lg">
                        {getAmenityIcon(a.code)}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{getAmenityLabel(a.code)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Rooms Section (Adapted to backend model) */}
            <div className="flex flex-col gap-6 pt-8 border-t border-slate-200">
              <div>
                <span className="text-xs uppercase tracking-widest text-teal-900 font-bold">Accommodations</span>
                <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">Available Room Types</h2>
              </div>
              
              {hotel.roomTypes.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                  No rooms currently available for this property.
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {hotel.roomTypes.map((room: any) => {
                    const roomPrice = new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      maximumFractionDigits: 0,
                    }).format(room.pricePerNight);

                    return (
                      <div key={room.id} className="border border-slate-200 p-6 rounded-2xl hover:border-teal-900 hover:shadow-lg transition-all duration-300 bg-white flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden relative">
                          <Image 
                            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80" 
                            alt={room.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-slate-900">
                                {room.name}
                              </h3>
                              <div className="text-right">
                                <span className="block text-xl font-bold text-teal-950">{roomPrice}</span>
                                <span className="text-xs text-slate-500 font-semibold">per night</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-slate-500 text-sm font-semibold mb-4 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Users size={16} />
                                <span>Sleeps {room.capacity} Guests</span>
                              </div>
                            </div>
                            
                            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                              {room.description || "A beautifully appointed suite designed for absolute relaxation, featuring premium bedding, dedicated workspace, and en-suite facilities."}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex justify-end">
                            <Link 
                              href={`/hotels/${hotel.id}/rooms/${room.id}`}
                              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-900 text-white text-sm font-bold shadow-md transition-colors w-full md:w-auto text-center"
                            >
                              View Suite & Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-6">
              
              {/* Pricing Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">From</span>
                  <span className="font-serif text-3xl font-bold text-slate-900">{formattedPrice}</span>
                  <span className="text-sm font-semibold text-slate-500">/ night</span>
                </div>
              </div>

              <div className="text-sm text-slate-600 font-medium bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                Please select a specific room suite from the <strong className="text-teal-900">Available Room Types</strong> list to finalize your booking dates and guests.
              </div>

              {/* Action CTA */}
              <div className="flex flex-col gap-3 pt-2">
                <a href="#accommodations" className="w-full py-4 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-base font-bold tracking-wide transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2">
                  <span>Browse Available Suites</span>
                  <ChevronRight size={18} />
                </a>
                <p className="text-center text-xs font-semibold text-slate-500 mt-1">
                  No charges until suite is selected.
                </p>
              </div>

              {/* Trust Badges & Policies */}
              <div className="flex flex-col gap-4 pt-6 mt-2 border-t border-slate-100">
                <div className="flex items-start gap-3 text-slate-700">
                  <AlertCircle size={20} className="text-teal-900 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">24/7 Concierge Support</span>
                    <span className="text-xs font-semibold text-slate-500">Dedicated on-ground coordinator</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <Shield size={20} className="text-teal-900 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Secure Escrow Payments</span>
                    <span className="text-xs font-semibold text-slate-500">Funds held securely until check-in</span>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Neighborhood Preview Mini Map */}
            <div className="mt-6 bg-white p-1 rounded-3xl shadow-md border border-slate-100 cursor-pointer group">
              <div className="relative w-full h-40 rounded-[1.25rem] overflow-hidden bg-slate-200">
                <Image 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Neighborhood Map" 
                  fill 
                  className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-teal-900 mb-2 border-4 border-white/50">
                    <MapPin size={24} />
                  </div>
                  <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full font-bold text-slate-900 shadow-md text-xs">
                    View precise location
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
