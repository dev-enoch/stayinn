"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import HotelCard from "./HotelCard";

type HotelData = {
  id: string;
  slug: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  coverImage: string;
  amenities: string[];
  startingPrice: number | null;
};

type HotelsResponse = {
  success: boolean;
  data: {
    items: HotelData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      hasMore: boolean;
    };
  };
};

export default function HotelList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<HotelsResponse>({
      queryKey: ["hotels", { search }],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `/api/hotels?page=${pageParam}&limit=10&search=${encodeURIComponent(search)}`,
        );
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.data?.pagination.hasMore) {
          return lastPage.data.pagination.page + 1;
        }
        return undefined;
      },
    });

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="text-center py-10 text-gray-400">Loading hotels...</div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-10 text-red-500">Error loading hotels</div>
    );
  }

  const allHotels = data?.pages.flatMap((page) => page.data?.items || []) || [];

  if (allHotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-lg border border-dashed border-gray-100 shadow-sm mt-4">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🏨</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No hotels found
        </h3>
        <p className="text-gray-400 text-sm max-w-[250px]">
          We couldn't find any hotels matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
        {allHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            slug={hotel.slug}
            name={hotel.name}
            locationName={hotel.address}
            coverImage={hotel.coverImage}
            startingPrice={hotel.startingPrice || 0}
          />
        ))}
      </div>

      {/* Infinite Scroll trigger element */}
      <div ref={observerRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
