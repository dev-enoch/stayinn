import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Wifi,
  Droplets,
  Zap,
  Car,
  Waves,
  Dumbbell,
  Utensils,
  Wind,
  ChevronRight,
  Share,
  Heart,
  Star,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Amenity } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import HotelClientSection from "@/components/hotel/HotelClientSection";

const getAmenityIcon = (amenity: Amenity) => {
  switch (amenity) {
    case "WIFI":
      return <Wifi size={20} />;
    case "WATER":
      return <Droplets size={20} />;
    case "BACKUP_POWER":
      return <Zap size={20} />;
    case "PARKING":
      return <Car size={20} />;
    case "POOL":
      return <Waves size={20} />;
    case "GYM":
      return <Dumbbell size={20} />;
    case "RESTAURANT":
      return <Utensils size={20} />;
    case "AIR_CONDITIONING":
      return <Wind size={20} />;
    default:
      return <CheckCircle2 size={20} />;
  }
};

const getAmenityLabel = (amenity: Amenity) =>
  amenity
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

export async function generateMetadata(props: {
  params: Promise<{ hotelslug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const hotel = await prisma.hotel.findUnique({
    where: { slug: params.hotelslug, status: "APPROVED" },
    include: {
      roomTypes: {
        where: { status: "ACTIVE" },
        select: { pricePerNight: true },
      },
    },
  });
  if (!hotel) return { title: "Property Not Found" };
  const location = hotel.address.split(",").slice(-2).join(",").trim();
  const startingPrice =
    hotel.roomTypes.length > 0
      ? Math.min(...hotel.roomTypes.map((rt) => rt.pricePerNight))
      : 0;
  const priceStr = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(startingPrice);
  const title = `${hotel.name} — ${location} | Monarch Stay`;
  const description = hotel.description
    ? `${hotel.description.slice(0, 150)}... From ${priceStr}/night.`
    : `Luxury serviced apartment in ${location}. From ${priceStr}/night. Book on Monarch Stay.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/hotels/${hotel.slug}`,
      images: hotel.coverImage
        ? [{ url: hotel.coverImage, width: 1200, height: 800, alt: hotel.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: hotel.coverImage ? [hotel.coverImage] : undefined,
    },
  };
}

export default async function HotelDetailPage(props: {
  params: Promise<{ hotelslug: string }>;
}) {
  const params = await props.params;

  const [hotel, session] = await Promise.all([
    prisma.hotel.findUnique({
      where: { slug: params.hotelslug, status: "APPROVED" },
      include: {
        amenities: { select: { amenity: true } },
        roomTypes: {
          where: { status: "ACTIVE" },
          include: { images: { orderBy: { sortOrder: "asc" } } },
          orderBy: { pricePerNight: "asc" },
        },
        manager: { select: { fullName: true } },
      },
    }),
    getSession(),
  ]);

  if (!hotel) notFound();

  const startingPrice =
    hotel.roomTypes.length > 0
      ? Math.min(...hotel.roomTypes.map((rt) => rt.pricePerNight))
      : 0;
  const formattedStartPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(startingPrice);
  const allImages = [hotel.coverImage, ...hotel.gallery].filter(
    Boolean,
  ) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    description: hotel.description ?? undefined,
    url: `https://monarchstay.ng/hotels/${hotel.slug}`,
    image: hotel.coverImage ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.address,
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    },
    telephone: hotel.phoneNumber ?? undefined,
    priceRange: formattedStartPrice + "/night",
  };

  const serialisedRooms = hotel.roomTypes.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    pricePerNight: Number(r.pricePerNight),
    capacity: r.capacity,
    quantity: r.quantity,
    bedType: r.bedType,
    roomSize: r.roomSize,
    amenities: r.amenities,
    images: r.images.map((img) => ({ url: img.url, sortOrder: img.sortOrder })),
  }));

  const serialisedHotel = {
    id: hotel.id,
    slug: hotel.slug,
    name: hotel.name,
    phoneNumber: hotel.phoneNumber,
    whatsappNumber: hotel.whatsappNumber,
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="w-full bg-white py-3 border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link
              href="/explore"
              className="hover:text-teal-900 transition-colors"
            >
              Stays
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/cities"
              className="hover:text-teal-900 transition-colors"
            >
              Nigeria
            </Link>
            <ChevronRight size={14} />
            <span className="text-teal-900 truncate max-w-[200px] sm:max-w-none">
              {hotel.name}
            </span>
          </nav>
          <div className="flex items-center gap-3 shrink-0 pl-4">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all text-slate-700 text-xs font-bold shadow-sm">
              <Share size={14} />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all text-slate-700 text-xs font-bold shadow-sm">
              <Heart size={14} />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 w-full mt-8 flex flex-col gap-10 pb-24">
        {/* Title */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {hotel.isPremium && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-900/10 text-teal-900 text-xs font-bold tracking-wider uppercase border border-teal-900/20">
                <ShieldCheck size={13} />
                Verified Premium Stay
              </span>
            )}
            {hotel.isTopRated && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase border border-orange-200">
                <Star size={13} className="fill-orange-800" />
                Top Rated
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
              {hotel.isVerified && (
                <span className="font-normal text-slate-500">Verified</span>
              )}
            </div>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-teal-900">
              {hotel.propertyType}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin size={15} className="text-teal-900 shrink-0" />
              {hotel.address}
            </span>
          </div>
        </div>

        {/* Photo Mosaic */}
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[320px] md:h-[440px]">
            <div className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden bg-slate-200">
              {allImages[0] && (
                <Image
                  src={allImages[0]}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              )}
            </div>
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="hidden md:block relative col-span-1 row-span-1 overflow-hidden bg-slate-100 cursor-pointer group"
              >
                {allImages[idx] && (
                  <img
                    src={allImages[idx]}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            ))}
          </div>
          <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg backdrop-blur-md text-xs font-bold transition-all border border-slate-100">
            Show all {allImages.length} photos
          </button>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        {/* The client section owns the two-column layout so state is shared */}
        <HotelClientSection
          hotel={serialisedHotel}
          rooms={serialisedRooms}
          isLoggedIn={!!session}
          hotelMeta={{
            managerInitial: hotel.manager?.fullName?.charAt(0) || "S",
            hostResponseRate: hotel.hostResponseRate,
            description: hotel.description,
            highlights: hotel.highlights,
            checkInTime: hotel.checkInTime,
            checkOutTime: hotel.checkOutTime,
            cancellationPolicy: hotel.cancellationPolicy,
            amenities: hotel.amenities.map((a: { amenity: string }) => a.amenity as Amenity),
            galleryImages: allImages,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
          }}
        />

        {/* Contact */}
        {(hotel.phoneNumber || hotel.whatsappNumber) && (
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">
                Need Help?
              </span>
              <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">
                Contact This Property
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              {hotel.phoneNumber && (
                <a
                  href={`tel:${hotel.phoneNumber}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-900 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center shrink-0 group-hover:bg-teal-900 group-hover:text-white transition-colors">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Call to Book
                    </p>
                    <p className="text-base font-bold text-slate-900">
                      {hotel.phoneNumber}
                    </p>
                  </div>
                </a>
              )}
              {hotel.whatsappNumber && (
                <a
                  href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, "")}?text=Hi, I'd like to book a room at ${encodeURIComponent(hotel.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#25D366] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e9f8ef] text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Chat on WhatsApp
                    </p>
                    <p className="text-base font-bold text-slate-900">
                      {hotel.whatsappNumber}
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
