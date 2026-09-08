import { apiClient } from "@/lib/api-client";
import HotelCard from "@/components/hotel/HotelCard";
import { Search } from "lucide-react";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const url = q ? `/api/hotels?search=${encodeURIComponent(q)}&limit=50` : `/api/hotels?limit=50`;
  const response = await apiClient.get(url);
  const hotels = response.success ? response.data.items : [];

  return (
    <div className="w-full min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">
        
        {/* Editorial Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 border-b border-gray-100 pb-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6">
              Explore.
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Discover premium, vetted properties across Nigeria.
            </p>
          </div>
          
          <form action="/explore" method="GET" className="w-full md:w-1/2 md:max-w-md relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={24} />
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              placeholder="Search by city or property name"
              className="w-full bg-transparent border-0 border-b border-gray-300 pl-10 pr-0 py-4 text-xl text-gray-900 placeholder-gray-400 focus:ring-0 focus:border-green-600 transition-colors outline-none"
            />
          </form>
        </div>
        
        {/* Results Grid */}
        {hotels.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 mt-12 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-8">
              <Search size={40} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">No properties found</h3>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">We couldn't find any stays matching "{q}". Try adjusting your search or exploring different cities.</p>
            <a 
              href="/explore" 
              className="bg-gray-900 text-white font-semibold py-4 px-10 rounded-full hover:bg-green-600 transition-colors text-lg"
            >
              Clear Search
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {hotels.map((hotel: any) => (
              <HotelCard 
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                locationName={hotel.address.split(',')[0]}
                coverImage={hotel.coverImage || ""}
                startingPrice={hotel.startingPrice || 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
