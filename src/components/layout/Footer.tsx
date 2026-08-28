import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 w-full pt-16 pb-24 md:pb-16 transition-colors border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="md:col-span-1 space-y-4">
          <div className="font-bold text-2xl tracking-tighter text-green-600">
            STAYINN
          </div>
          <p className="text-gray-600 text-base leading-relaxed">
            Redefining hospitality across Nigeria with curated, premium stays.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-gray-900">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-500 hover:text-green-600 transition-colors block py-1">About Us</Link></li>
            <li><Link href="/explore" className="text-gray-500 hover:text-green-600 transition-colors block py-1">Explore Properties</Link></li>
            <li><Link href="/host" className="text-gray-500 hover:text-green-600 transition-colors block py-1">Host your Home</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-gray-900">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/support" className="text-gray-500 hover:text-green-600 transition-colors block py-1">Help Center</Link></li>
            <li><Link href="/support/safety" className="text-gray-500 hover:text-green-600 transition-colors block py-1">Safety Guidelines</Link></li>
            <li><Link href="/support/terms" className="text-gray-500 hover:text-green-600 transition-colors block py-1">Terms of Service</Link></li>
            <li><Link href="/support/contact" className="text-gray-500 hover:text-green-600 transition-colors block py-1">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-gray-900">Contact</h4>
          <ul className="space-y-2">
            <li className="text-gray-500 py-1 flex items-center gap-2">
              <Mail size={16} /> hello@stayinn.ng
            </li>
            <li className="text-gray-500 py-1 flex items-center gap-2">
              <Phone size={16} /> +234 800 STAYINN
            </li>
          </ul>
        </div>
        
        <div className="col-span-1 md:col-span-4 mt-8 md:mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Stayinn Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
