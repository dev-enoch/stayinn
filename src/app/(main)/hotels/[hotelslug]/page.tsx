import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Users, Wifi, Droplets, Zap, Car, Waves, Dumbbell, Utensils, Wind,
  ChevronRight, Share, Heart, Star, Shield, ShieldCheck, CheckCircle2,
  Phone, MessageCircle, Clock, XCircle, BedDouble, Expand, ChevronLeft,
  ArrowRight
} from "lucide-react";
import { Amenity } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const getAmenityIcon = (amenity: Amenity) => {
  switch (amenity) {
    case "WIFI": return <Wifi size={20} />;
    case "WATER": return <Droplets size={20} />;
    case "BACKUP_POWER": return <Zap size={20} />;
    case "PARKING": return <Car size={20} />;
    case "POOL": return <Waves size={20} />;
    case "GYM": return <Dumbbell size={20} />;
    case "RESTAURANT": return <Utensils size={20} />;
    case "AIR_CONDITIONING": return <Wind size={20} />;
    default: return <CheckCircle2 size={20} />;
  }
};

const getAmenityLabel = (amenity: Amenity) =>
  amenity.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

export async function generateMetadata(
  props: { params: Promise<{ hotelslug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const hotel = await prisma.hotel.findUnique({
    where: { slug: params.hotelslug, status: "APPROVED" },
    include: { roomTypes: { where: { status: "ACTIVE" }, select: { pricePerNight: true } } },
  });
  if (!hotel) return { title: "Property Not Found" };
  const location = hotel.address.split(",").slice(-2).join(",").trim();
  const startingPrice = hotel.roomTypes.length > 0
    ? Math.min(...hotel.roomTypes.map(rt => rt.pricePerNight)) : 0;
  const priceStr = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(startingPrice);
  const title = `${hotel.name} — ${location} | Stayinn`;
  const description = hotel.description
    ? `${hotel.description.slice(0, 150)}... From ${priceStr}/night.`
    : `Luxury serviced apartment in ${location}. From ${priceStr}/night. Book on Stayinn.`;
  return {
    title, description,
    openGraph: { title, description, type: "website", url: `/hotels/${hotel.slug}`, images: hotel.coverImage ? [{ url: hotel.coverImage, width: 1200, height: 800, alt: hotel.name }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: hotel.coverImage ? [hotel.coverImage] : undefined },
  };
}

export default async function HotelDetailPage(
  props: { params: Promise<{ hotelslug: string }> }
) {
  const params = await props.params;

  const hotel = await prisma.hotel.findUnique({
    where: { slug: params.hotelslug, status: "APPROVED" },
    include: {
      amenities: { select: { amenity: true } },
      roomTypes: {
        where: { status: "ACTIVE" },
        include: { images: { orderBy: { sortOrder: "asc" } } },
        orderBy: { pricePerNight: "asc" }
      },
      manager: { select: { fullName: true } }
    }
  });

  if (!hotel) notFound();

  const startingPrice = hotel.roomTypes.length > 0
    ? Math.min(...hotel.roomTypes.map(rt => rt.pricePerNight)) : 0;
  const formattedStartPrice = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(startingPrice);

  const allImages = [hotel.coverImage, ...hotel.gallery].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": hotel.name,
    "description": hotel.description ?? undefined,
    "url": `https://stayinn.ng/hotels/${hotel.slug}`,
    "image": hotel.coverImage ?? undefined,
    "address": { "@type": "PostalAddress", "streetAddress": hotel.address, "addressCountry": "NG" },
    "geo": { "@type": "GeoCoordinates", "latitude": hotel.latitude, "longitude": hotel.longitude },
    "telephone": hotel.phoneNumber ?? undefined,
    "priceRange": formattedStartPrice + "/night",
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="w-full bg-white py-3 border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/explore" className="hover:text-teal-900 transition-colors">Stays</Link>
            <ChevronRight size={14} />
            <Link href="/cities" className="hover:text-teal-900 transition-colors">Nigeria</Link>
            <ChevronRight size={14} />
            <span className="text-teal-900 truncate max-w-[200px] sm:max-w-none">{hotel.name}</span>
          </nav>
          <div className="flex items-center gap-3 shrink-0 pl-4">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all text-slate-700 text-xs font-bold shadow-sm">
              <Share size={14} /><span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all text-slate-700 text-xs font-bold shadow-sm">
              <Heart size={14} /><span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 w-full mt-8 flex flex-col gap-10 pb-24">

        {/* Title & Badges */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {hotel.isPremium && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-900/10 text-teal-900 text-xs font-bold tracking-wider uppercase border border-teal-900/20">
                <ShieldCheck size={13} />Verified Premium Stay
              </span>
            )}
            {hotel.isTopRated && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase border border-orange-200">
                <Star size={13} className="fill-orange-800" />Top Rated
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 font-bold tracking-tight">
            {hotel.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 font-medium text-sm">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Star size={16} className="text-orange-500 fill-orange-500" />
              <span>{hotel.rating.toFixed(2)}</span>
              {hotel.isVerified && <span className="font-normal text-slate-500">Verified</span>}
            </div>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-teal-900">{hotel.propertyType}</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin size={15} className="text-teal-900 shrink-0" />{hotel.address}
            </span>
          </div>
        </div>

        {/* Photo Mosaic */}
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[350px] md:h-[480px]">
            {/* Main image */}
            <div className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden bg-slate-200">
              {allImages[0] ? (
                <Image src={allImages[0]} alt={hotel.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Side images */}
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="hidden md:block relative col-span-1 row-span-1 overflow-hidden bg-slate-200 cursor-pointer group">
                {allImages[idx] ? (
                  <img src={allImages[idx]} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                ) : (
                  <div className="w-full h-full bg-slate-100" />
                )}
              </div>
            ))}
          </div>
          <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg backdrop-blur-md text-xs font-bold transition-all border border-slate-100">
            Show all {allImages.length} photos
          </button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT COLUMN ───────────────────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">

            {/* Host info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-lg shadow-sm ring-4 ring-slate-50 uppercase">
                    {hotel.manager?.fullName?.charAt(0) || "S"}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow border-2 border-white">
                    <ShieldCheck size={11} />
                  </span>
                </div>
                <div>
                  <h2 className="text-lg text-slate-900 font-bold">Managed by Stayinn Verified Partners</h2>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-0.5">
                    Premium Host · {hotel.hostResponseRate}% Response Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-slate-900 font-bold">About the Property</h2>
              <p className="text-slate-600 leading-relaxed">
                {hotel.description || "Welcome to your curated stay. This newly curated property seamlessly blurs indoor comfort with lush outdoor living."}
              </p>
              {hotel.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {hotel.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-900 text-xs font-bold border border-teal-100">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-t border-b border-slate-200">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-teal-900"><Clock size={18} /><span className="text-xs font-bold uppercase tracking-wider">Check-in</span></div>
                <span className="text-slate-900 font-bold">{hotel.checkInTime}</span>
                <span className="text-xs text-slate-500">With valid ID card</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-teal-900"><Clock size={18} /><span className="text-xs font-bold uppercase tracking-wider">Check-out</span></div>
                <span className="text-slate-900 font-bold">{hotel.checkOutTime}</span>
                <span className="text-xs text-slate-500">Late checkout on request</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-teal-900"><XCircle size={18} /><span className="text-xs font-bold uppercase tracking-wider">Cancellation</span></div>
                <span className="text-slate-900 font-bold text-xs leading-snug">{hotel.cancellationPolicy || "Free cancellation 48hrs before arrival"}</span>
              </div>
            </div>

            {/* Amenities */}
            {hotel.amenities.length > 0 && (
              <div className="flex flex-col gap-5">
                <div>
                  <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">Curated Conveniences</span>
                  <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">What This Place Offers</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                  {hotel.amenities.map((a: any) => (
                    <div key={a.amenity} className="flex items-center gap-3">
                      <span className="text-teal-900 p-2 bg-teal-50 rounded-lg shrink-0">{getAmenityIcon(a.amenity)}</span>
                      <span className="text-sm font-semibold text-slate-700">{getAmenityLabel(a.amenity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ROOMS SECTION ───────────────────────────────── */}
            <div id="rooms" className="flex flex-col gap-6 scroll-mt-32">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">Book Your Stay</span>
                <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">Available Room Types</h2>
                <p className="text-sm text-slate-500 mt-1">Select a room below to begin your booking.</p>
              </div>

              {hotel.roomTypes.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 text-center text-slate-500">
                  No rooms currently available. Please check back soon.
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {hotel.roomTypes.map((room: any) => {
                    const roomPrice = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(room.pricePerNight);
                    const firstImage = room.images[0]?.url || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80";
                    return (
                      <div key={room.id} id={`room-${room.id}`} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 scroll-mt-36">

                        {/* Room Image Strip */}
                        <div className="relative w-full h-56 sm:h-64 bg-slate-100 overflow-hidden">
                          <img src={firstImage} alt={room.name} className="w-full h-full object-cover" />
                          {room.images.length > 1 && (
                            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                              <span>+{room.images.length - 1} more photos</span>
                            </div>
                          )}
                          {/* Image thumbnails overlay */}
                          <div className="absolute bottom-3 left-3 flex gap-2">
                            {room.images.slice(1, 4).map((img: any, i: number) => (
                              <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md">
                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Room Details */}
                        <div className="p-6 flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{room.name}</h3>
                              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                {room.bedType && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg">
                                    <BedDouble size={14} />{room.bedType}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg">
                                  <Users size={14} />Sleeps {room.capacity}
                                </span>
                                {room.roomSize && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg">
                                    <Expand size={14} />{room.roomSize} m²
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="text-2xl font-bold text-teal-950">{roomPrice}</div>
                              <div className="text-xs text-slate-500 font-semibold">per night</div>
                              <div className="text-xs text-emerald-600 font-bold mt-0.5">Free cancellation</div>
                            </div>
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed">
                            {room.description}
                          </p>

                          {/* Room Amenities */}
                          {room.amenities?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((am: string, i: number) => (
                                <span key={i} className="inline-flex items-center gap-1 text-xs text-teal-900 font-semibold bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                                  <CheckCircle2 size={12} />{am}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Book Button */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
                            <Link
                              href={`/book/${room.id}`}
                              className="flex-1 py-3 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-sm font-bold shadow-md transition-colors text-center flex items-center justify-center gap-2"
                            >
                              Book This Room <ArrowRight size={16} />
                            </Link>
                            {hotel.whatsappNumber && (
                              <a
                                href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, '')}?text=Hi, I'd like to book the ${encodeURIComponent(room.name)} at ${encodeURIComponent(hotel.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20B956] text-white text-sm font-bold transition-colors text-center flex items-center justify-center gap-2"
                              >
                                <MessageCircle size={16} /> WhatsApp
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="flex flex-col gap-4 pt-8 border-t border-slate-200">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">Need Help?</span>
                <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">Contact This Property</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hotel.phoneNumber && (
                  <a href={`tel:${hotel.phoneNumber}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-900 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0 group-hover:bg-teal-900 group-hover:text-white transition-colors">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Call to Book</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">{hotel.phoneNumber}</p>
                    </div>
                  </a>
                )}
                {hotel.whatsappNumber && (
                  <a
                    href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, '')}?text=Hi, I'd like to book a room at ${encodeURIComponent(hotel.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#25D366] hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#e9f8ef] text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Chat on WhatsApp</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">{hotel.whatsappNumber}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Sticky Widget ─────────────────────── */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-5">

              {/* Pricing */}
              <div className="pb-4 border-b border-slate-100">
                {startingPrice > 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">From</span>
                    <span className="font-serif text-3xl font-bold text-slate-900">{formattedStartPrice}</span>
                    <span className="text-sm font-semibold text-slate-500">/ night</span>
                  </div>
                ) : (
                  <span className="font-serif text-2xl font-bold text-slate-900">Price Unavailable</span>
                )}
                <p className="text-xs text-slate-500 mt-1">{hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? "s" : ""} available</p>
              </div>

              {/* Room Type Quick Select */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Select a Room</p>
                {hotel.roomTypes.map((room: any) => {
                  const p = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(room.pricePerNight);
                  return (
                    <a key={room.id} href={`#room-${room.id}`} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-teal-900 hover:bg-teal-50 transition-all group cursor-pointer">
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-teal-900">{room.name}</p>
                        <p className="text-xs text-slate-500">Sleeps {room.capacity} · {room.bedType}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-teal-900">{p}</span>
                        <p className="text-[10px] text-slate-500">/night</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* CTA */}
              <a href="#rooms" className="w-full py-4 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-sm font-bold tracking-wide transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2">
                View All Rooms <ChevronRight size={18} />
              </a>

              {/* Trust Badges */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-700">
                  <Shield size={18} className="text-teal-900 shrink-0" />
                  <span className="text-xs font-semibold">Secure escrow payments — funds held until check-in</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-teal-900 shrink-0" />
                  <span className="text-xs font-semibold">24/7 dedicated concierge support</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <XCircle size={18} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold">Free cancellation available on most rooms</span>
                </div>
              </div>
            </div>

            {/* Contact quick-dial widget */}
            {(hotel.phoneNumber || hotel.whatsappNumber) && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Need Assistance?</p>
                {hotel.phoneNumber && (
                  <a href={`tel:${hotel.phoneNumber}`} className="flex items-center gap-3 text-slate-900 hover:text-teal-900 transition-colors font-semibold text-sm">
                    <Phone size={16} className="text-teal-900 shrink-0" />{hotel.phoneNumber}
                  </a>
                )}
                {hotel.whatsappNumber && (
                  <a href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-900 hover:text-[#25D366] transition-colors font-semibold text-sm">
                    <MessageCircle size={16} className="text-[#25D366] shrink-0" />{hotel.whatsappNumber}
                  </a>
                )}
              </div>
            )}

            {/* Map preview */}
            <div className="bg-white p-1 rounded-2xl shadow-md border border-slate-100 cursor-pointer group">
              <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Neighborhood Map"
                  fill className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-teal-900 border-4 border-white/50">
                    <MapPin size={20} />
                  </div>
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-slate-900 shadow-md text-xs mt-2">View precise location</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
