import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* Editorial Hero */}
      <section className="relative w-full px-4 md:px-12 max-w-[1280px] mx-auto pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold text-gray-900 tracking-tighter leading-[0.95] md:w-2/3">
            Redefining<br />hospitality<br />in Nigeria.
          </h1>
          <div className="md:w-1/3 pb-2">
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              We exist to bridge the gap between world-class standards and the rich, vibrant experiences our cities have to offer.
            </p>
          </div>
        </div>
      </section>

      {/* Massive Full Bleed Image */}
      <section className="w-full h-[60vh] md:h-[80vh] relative">
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80"
          alt="Luxury modern interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* Editorial Story Section */}
      <section className="py-32 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Our Mission</h2>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              A trusted community where everyone belongs.
            </h3>
          </div>
          <div className="md:w-2/3 space-y-8 text-xl text-gray-600 leading-relaxed">
            <p>
              Stayinn was born out of a simple belief: finding a beautiful, safe, and comfortable place to stay in Nigeria shouldn't be a gamble. For too long, travelers have had to choose between overpriced hotels and unpredictable short-term rentals.
            </p>
            <p>
              Whether you're traveling for business in Lagos, unwinding in Abuja, or exploring new horizons across the continent, we ensure every property listed on our platform meets strict criteria for quality, safety, and design.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Principles (No Cards) */}
      <section className="py-24 px-4 md:px-12 max-w-[1280px] mx-auto border-t border-gray-100">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-24">The Stayinn Standard.</h2>
        
        <div className="space-y-32">
          {/* Principle 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16 group">
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-green-600 font-bold tracking-widest text-sm uppercase">01</span>
              <h3 className="text-4xl font-bold tracking-tight text-gray-900">Uncompromising Quality</h3>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                We personally vet our listings. If we wouldn't stay there ourselves, it won't be on Stayinn. Every detail matters, from the thread count of the sheets to the speed of the wifi.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/3] relative overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="High quality interior details"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Principle 2 (Reversed) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-green-600 font-bold tracking-widest text-sm uppercase">02</span>
              <h3 className="text-4xl font-bold tracking-tight text-gray-900">Local Authenticity</h3>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                We celebrate Nigerian culture. Our spaces don't just put a roof over your head; they connect you to the rhythm of the city, empowering local hosts to share their world.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/3] relative overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Authentic local culture"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clean Stats Section */}
      <section className="py-32 px-4 md:px-12 max-w-[1280px] mx-auto border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">By the numbers</h2>
            <p className="text-lg text-gray-600">Our community is growing every day, bringing premium experiences to more travelers.</p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-12 w-full">
            <div className="space-y-2">
              <p className="text-6xl font-bold tracking-tighter text-gray-900">5+</p>
              <p className="text-gray-500 font-medium">Major Cities</p>
            </div>
            <div className="space-y-2">
              <p className="text-6xl font-bold tracking-tighter text-gray-900">500+</p>
              <p className="text-gray-500 font-medium">Verified Stays</p>
            </div>
            <div className="space-y-2">
              <p className="text-6xl font-bold tracking-tighter text-gray-900">24/7</p>
              <p className="text-gray-500 font-medium">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial CTA */}
      <section className="bg-gray-900 text-white py-32 px-4 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Ready to experience<br/>the difference?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/explore" 
              className="bg-green-600 text-white font-semibold py-4 px-10 rounded-full hover:bg-green-700 transition-colors"
            >
              Explore Properties
            </Link>
            <Link 
              href="/host" 
              className="bg-transparent text-white border border-gray-600 font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-gray-900 transition-colors"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
