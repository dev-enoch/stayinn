import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import RoomGallery from "./RoomGallery";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(
  props: { params: Promise<{ hotelslug: string; roomId: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const room = await prisma.roomType.findUnique({
    where: { id: params.roomId, status: 'ACTIVE' },
    include: { hotel: { select: { name: true, address: true, status: true } } },
  });

  if (!room || room.hotel.status !== 'APPROVED') return { title: "Suite Not Found" };

  const priceStr = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(room.pricePerNight);
  const title = `${room.name} at ${room.hotel.name}`;
  const description = room.description
    ? `${room.description} ${priceStr}/night at ${room.hotel.address}.`
    : `${room.name} — ${priceStr}/night at ${room.hotel.name}, ${room.hotel.address}. Book on Stayinn.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RoomDetailPage(
  props: { params: Promise<{ hotelslug: string; roomId: string }> }
) {
  const params = await props.params;

  const room = await prisma.roomType.findUnique({
    where: { id: params.roomId, status: 'ACTIVE' },
    include: {
      hotel: true,
      images: { orderBy: { sortOrder: 'asc' } }
    }
  });

  if (!room || room.hotel.status !== 'APPROVED') {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(room.pricePerNight);

  const REPLACEMENTS: Record<string, string> = {
    '1626245107068-18e404bf7cba': '1600585154340-be6161a56a0c',
    '1577977461421-4f1647413a96': '1600607686527-6fb886090705',
    '1590483736622-398bb2c45980': '1618221118493-9cfa1a1c00da',
  };

  const sanitizeUrl = (url: string) => {
    let safeUrl = url;
    for (const [oldId, newId] of Object.entries(REPLACEMENTS)) {
      if (safeUrl?.includes(oldId)) {
        safeUrl = safeUrl.replace(oldId, newId);
      }
    }
    return safeUrl;
  };

  // Default image if none exist
  const images = room.images.length > 0
    ? room.images.map((img: any) => sanitizeUrl(img.url))
    : ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"];

  return (
    <div className="w-full min-h-screen bg-white pb-32">
      {/* Top navigation */}
      <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 h-20 flex items-center">
          <Link href={`/hotels/${room.hotel.slug}`} className="flex items-center text-gray-900 hover:text-green-600 font-semibold transition-colors">
            <ArrowLeft size={24} className="mr-1" />
            Back to {room.hotel.name}
          </Link>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto pt-32 px-4 md:px-0">

        {/* Swipeable Gallery */}
        <RoomGallery images={images} />

        {/* Room Info */}
        <div className="mt-12 space-y-10 px-2 md:px-0">
          <div className="border-b border-gray-100 pb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6">
              {room.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-xl font-medium">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <Users size={20} className="text-green-600" />
                <span>Sleeps {room.capacity}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg text-gray-600 max-w-none">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">About this room</h3>
            <p className="leading-relaxed text-lg">
              {room.description || "Experience comfort and tranquility in our carefully designed spaces. This room features premium bedding, modern amenities, and everything you need for a perfect stay. Whether you are traveling for business or leisure, our attention to detail ensures a restful and rejuvenating experience."}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Booking */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 md:p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <div>
            <span className="block text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{formattedPrice}</span>
            <span className="text-gray-500 font-medium">per night</span>
          </div>
          <Link
            href={`/book/${room.id}`}
            className="bg-gray-900 text-white font-semibold py-4 px-8 md:px-12 rounded-full hover:bg-green-600 transition-colors text-lg shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
