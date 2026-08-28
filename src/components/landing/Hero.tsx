"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden -mt-20 pt-20">
      {/* Full-width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1543489822-c49534f3271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful premium stay"
          fill
          className="object-cover object-right md:object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Fade to blend seamlessly. On mobile it fades from bottom, desktop from left */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/95 md:via-white/70 to-transparent md:to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-12 md:pt-0">
        
        <div className="w-full max-w-xl space-y-6 text-center md:text-left mx-auto md:mx-0 mt-32 md:mt-0">
          <p className="text-green-600 font-bold tracking-widest text-xs md:text-sm uppercase">
            Curated. Comfort. Authentic.
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Elevate Your<br />Next Getaway
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0">
            From luxury penthouses in Lagos to serene villas in Abuja, find the perfect space curated for your ultimate comfort.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 justify-center md:justify-start">
            <Link 
              href="/explore" 
              className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20"
            >
              View Top Stays
            </Link>
            
            <Link href="/explore" className="group flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors font-semibold">
              <div className="w-14 h-14 bg-white md:bg-green-600 rounded-full flex items-center justify-center text-green-600 md:text-white shadow-lg shadow-green-900/10 group-hover:bg-green-50 md:group-hover:bg-green-700 transition-colors border md:border-0 border-gray-100">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>
              Take a Tour
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
