import { Search, Calendar, CreditCard, ShieldCheck, Home, ChevronRight, HeadphonesIcon, FileText } from "lucide-react";
import Link from "next/link";

export default function HelpCenterHome() {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Search Section */}
      <section className="w-full bg-green-50 rounded-2xl py-12 px-6 flex flex-col items-center justify-center text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">How can we help?</h2>
        <p className="text-gray-600 mb-8 max-w-xl text-lg">
          Find answers to your questions about bookings, payments, and hosting on Stayinn.
        </p>
        
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-white border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 text-gray-900 placeholder-gray-400 transition-all outline-none shadow-sm" 
            placeholder="Search for help..." 
            type="text"
          />
        </div>
      </section>

      {/* Quick Links / Categories Grid */}
      <section className="w-full mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Quick Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex flex-col items-start gap-4 group">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Booking & Reservations</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Managing trips, cancellations, and special requests.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex flex-col items-start gap-4 group">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Payments</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Receipts, refunds, and payment methods.</p>
            </div>
          </div>

          <Link href="/support/safety" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex flex-col items-start gap-4 group">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Safety</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Guidelines, emergency contacts, and account security.</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex flex-col items-start gap-4 group">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
              <Home size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Hosting</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Listing management, guest communication, and payouts.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Recommended Articles */}
      <section className="w-full bg-gray-50 rounded-2xl p-6 md:p-8 mb-12 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Recommended for you</h3>
        <div className="flex flex-col gap-3">
          
          <Link href="/support/terms" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200">
            <div className="flex items-center gap-4 text-gray-900">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-green-600 transition-colors">
                <FileText size={20} />
              </div>
              <span className="font-semibold group-hover:text-green-600 transition-colors">How to cancel a reservation</span>
            </div>
            <ChevronRight size={20} className="text-gray-400 group-hover:text-green-600 transition-colors" />
          </Link>

          <Link href="/support/terms" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200">
            <div className="flex items-center gap-4 text-gray-900">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-green-600 transition-colors">
                <FileText size={20} />
              </div>
              <span className="font-semibold group-hover:text-green-600 transition-colors">What happens if my host cancels?</span>
            </div>
            <ChevronRight size={20} className="text-gray-400 group-hover:text-green-600 transition-colors" />
          </Link>

          <Link href="/support/terms" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200">
            <div className="flex items-center gap-4 text-gray-900">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-green-600 transition-colors">
                <FileText size={20} />
              </div>
              <span className="font-semibold group-hover:text-green-600 transition-colors">When will I get my refund?</span>
            </div>
            <ChevronRight size={20} className="text-gray-400 group-hover:text-green-600 transition-colors" />
          </Link>
          
        </div>
      </section>

      {/* Contact Us CTA */}
      <section className="w-full py-12 flex flex-col items-center justify-center text-center border-t border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Still need help?</h3>
        <p className="text-gray-600 mb-8 max-w-md">
          Our support team is available 24/7 to assist you with any inquiries.
        </p>
        <Link 
          href="/support/contact"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2"
        >
          <HeadphonesIcon size={20} />
          Contact Support
        </Link>
      </section>

    </div>
  );
}
