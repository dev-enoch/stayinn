"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Default center: Lagos, Nigeria
const defaultCenter = {
  lat: 6.5244,
  lng: 3.3792,
};

interface ExploreMapProps {
  hotels: any[];
}

export default function ExploreMap({ hotels }: ExploreMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeHotel, setActiveHotel] = useState<string | null>(null);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds();

      if (hotels.length > 0) {
        hotels.forEach((hotel) => {
          bounds.extend({ lat: hotel.latitude, lng: hotel.longitude });
        });
        map.fitBounds(bounds);

        // Don't zoom in too close if there's only one property or they are close
        const listener = window.google.maps.event.addListener(
          map,
          "idle",
          function () {
            if (map.getZoom()! > 14) map.setZoom(14);
            window.google.maps.event.removeListener(listener);
          },
        );
      } else {
        map.setCenter(defaultCenter);
        map.setZoom(11);
      }

      setMap(map);
    },
    [hotels],
  );

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Graceful fallback if no API key is provided
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-8 text-center border-l border-slate-200">
        <MapPin size={48} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-700 mb-2">
          Map Unavailable
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Please add{" "}
          <code className="bg-slate-200 px-1 rounded">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </code>{" "}
          to your environment variables to enable the interactive map.
        </p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {hotels.map((hotel) => (
        <OverlayView
          key={hotel.id}
          position={{ lat: hotel.latitude, lng: hotel.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="relative -translate-x-1/2 -translate-y-full pb-2">
            <button
              onClick={() => setActiveHotel(hotel.id)}
              className={`px-3 py-1.5 rounded-full font-bold shadow-md transition-all text-sm transform ${
                activeHotel === hotel.id
                  ? "bg-slate-900 text-white scale-110 z-20"
                  : "bg-white text-slate-900 hover:scale-105 z-10"
              }`}
            >
              {hotel.startingPrice > 0
                ? new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    maximumFractionDigits: 0,
                  }).format(hotel.startingPrice)
                : "Unavailable"}
            </button>

            {/* Tooltip Card */}
            {activeHotel === hotel.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotel(null);
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center z-10 text-slate-900"
                >
                  &times;
                </button>
                <Link
                  href={`/hotels/${hotel.slug}`}
                  className="block relative h-32 w-full"
                >
                  <Image
                    src={
                      hotel.coverImage ||
                      "https://images.unsplash.com/photo-1577977461421-4f1647413a96"
                    }
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="p-3">
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="hover:underline"
                  >
                    <h4 className="font-bold text-slate-900 truncate">
                      {hotel.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-slate-500 mt-1">{hotel.address}</p>
                </div>
              </div>
            )}
          </div>
        </OverlayView>
      ))}
    </GoogleMap>
  );
}
