import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface HotelCardProps {
  id: string;
  name: string;
  locationName: string;
  coverImage: string;
  startingPrice: number;
}

export default function HotelCard({
  id,
  name,
  locationName,
  coverImage,
  startingPrice,
}: HotelCardProps) {
  // Format price in NGN
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(startingPrice);

  return (
    <Link href={`/hotels/${id}`} className="block w-full">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
        <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden bg-gray-100">
          <Image
            src={coverImage}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1 pr-4">
              {name}
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">from</span>
              <span className="text-lg font-bold text-gray-900 bg-yellow-50 px-2 py-0.5 rounded-md mt-0.5">
                {formattedPrice}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span className="truncate">{locationName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
