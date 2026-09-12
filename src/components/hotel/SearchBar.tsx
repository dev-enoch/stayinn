"use client";

import { MapPin, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type SearchFormInputs = {
  query: string;
  dates: string;
};

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("search") || "";

  const { register, handleSubmit, setValue } = useForm<SearchFormInputs>({
    defaultValues: {
      query: currentQuery,
      dates: "",
    },
  });

  // Sync form when URL changes (e.g. going back)
  useEffect(() => {
    setValue("query", currentQuery);
  }, [currentQuery, setValue]);

  const onSubmit = (data: SearchFormInputs) => {
    const params = new URLSearchParams(searchParams.toString());
    if (data.query.trim()) {
      params.set("search", data.query.trim());
    } else {
      params.delete("search");
    }
    // In the future, we can add 'dates' to the URL params here as well
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 md:p-6 rounded-xl shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col md:flex-row gap-4 items-end w-full"
    >
      <div className="w-full md:w-2/5">
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          Location
        </label>
        <div className="relative">
          <MapPin
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            {...register("query")}
            className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all text-gray-900 outline-none placeholder-gray-400"
            placeholder="Where to?"
          />
        </div>
      </div>

      <div className="w-full md:w-2/5">
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          Dates
        </label>
        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            {...register("dates")}
            className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all text-gray-900 outline-none placeholder-gray-400"
            placeholder="Add dates"
          />
        </div>
      </div>

      <div className="w-full md:w-1/5">
        <button
          type="submit"
          className="w-full h-12 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  );
}
