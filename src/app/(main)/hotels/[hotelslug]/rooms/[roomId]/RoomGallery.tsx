"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function RoomGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update active dot
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollPosition = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.offsetWidth;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.offsetWidth;
    scrollContainerRef.current.scrollTo({
      left: width * index,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 group shadow-sm">
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 snap-center relative">
            <Image 
              src={src}
              alt={`Room image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-white scale-125 shadow-sm" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
