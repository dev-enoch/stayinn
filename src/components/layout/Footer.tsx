import Link from "next/link";
import { Mail, Phone, Home, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 w-full pt-20 pb-12 transition-colors border-t border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 px-4 md:px-12 max-w-[1440px] mx-auto mb-16">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center text-white shadow-sm">
              <Home size={22} className="text-white" />
            </span>
            <span className="font-serif text-2xl tracking-tight font-bold text-white">
              Stayinn
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Experience curated architectural spaces, uncompromised comfort, and the warmth of Nigerian hospitality. The premium standard for extended stays.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-900 hover:text-white transition-colors">
              IN
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-900 hover:text-white transition-colors">
              X
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-900 hover:text-white transition-colors">
              LI
            </a>
          </div>
        </div>
        
        {/* Links Column 1 */}
        <div className="md:col-span-2 md:col-start-6 space-y-5">
          <h4 className="font-semibold text-sm tracking-wider text-white uppercase">Company</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link></li>
            <li><Link href="/explore" className="text-slate-400 hover:text-white text-sm transition-colors">Explore Stays</Link></li>
            <li><Link href="/cities" className="text-slate-400 hover:text-white text-sm transition-colors">Destinations</Link></li>
            <li><Link href="/careers" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</Link></li>
          </ul>
        </div>
        
        {/* Links Column 2 */}
        <div className="md:col-span-2 space-y-5">
          <h4 className="font-semibold text-sm tracking-wider text-white uppercase">Hosting</h4>
          <ul className="space-y-3">
            <li><Link href="/host" className="text-slate-400 hover:text-white text-sm transition-colors">Become a Host</Link></li>
            <li><Link href="/host/protection" className="text-slate-400 hover:text-white text-sm transition-colors">Host Protection</Link></li>
            <li><Link href="/host/resources" className="text-slate-400 hover:text-white text-sm transition-colors">Community Forum</Link></li>
          </ul>
        </div>
        
        {/* Contact Column */}
        <div className="md:col-span-3 space-y-5">
          <h4 className="font-semibold text-sm tracking-wider text-white uppercase">Contact</h4>
          <ul className="space-y-4">
            <li className="text-slate-400 text-sm flex items-start gap-3">
              <MapPin size={18} className="text-teal-500 shrink-0 mt-0.5" />
              <span>14a Admiralty Way,<br/>Lekki Phase 1, Lagos, Nigeria</span>
            </li>
            <li className="text-slate-400 text-sm flex items-center gap-3">
              <Mail size={18} className="text-teal-500 shrink-0" />
              <span>concierge@stayinn.ng</span>
            </li>
            <li className="text-slate-400 text-sm flex items-center gap-3">
              <Phone size={18} className="text-teal-500 shrink-0" />
              <span>+234 800 STAYINN</span>
            </li>
          </ul>
        </div>
        
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>
            © {new Date().getFullYear()} Stayinn Technologies. All rights reserved. RC 1948291.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/support/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/support/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/support/safety" className="hover:text-slate-300 transition-colors">Safety Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
