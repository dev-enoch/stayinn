import Image from "next/image";
import { Compass, CheckCircle2 } from "lucide-react";

export default function WhyStayinn() {
  return (
    <section className="py-24 px-4 md:px-12 bg-green-50 text-gray-900">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center md:text-left">Why Choose Stayinn?</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                  <Compass size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We know Nigeria. Our properties are strategically located in safe, vibrant neighborhoods, giving you the best authentic experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Curated Spaces</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every listing is hand-picked and verified to meet our strict standards for design, cleanliness, and premium comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden h-[400px] md:h-[500px] relative shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="People relaxing in a modern Nigerian living room"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
