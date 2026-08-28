import { Wifi, Zap, ShieldCheck, BedDouble } from "lucide-react";

export default function Amenities() {
  const amenities = [
    {
      icon: <Wifi size={32} />,
      title: "High-speed Wi-Fi",
      desc: "Stay connected seamlessly."
    },
    {
      icon: <Zap size={32} />,
      title: "24/7 Power",
      desc: "Uninterrupted comfort always."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Top-notch Security",
      desc: "Peace of mind guaranteed."
    },
    {
      icon: <BedDouble size={32} />,
      title: "Premium Comfort",
      desc: "Curated for relaxation."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-12 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Everything You Need</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've thought of every detail to ensure your stay is seamless, comfortable, and exactly what you expect from a premium hospitality experience.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
