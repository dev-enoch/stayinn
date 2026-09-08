import { 
  ShieldCheck, 
  CreditCard, 
  Home, 
  CheckCircle2, 
  HeadphonesIcon,
  AlertTriangle,
  PhoneCall,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Your Safety is Our Priority</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At Stayinn, we are committed to creating a secure and trustworthy community for both guests and hosts. Here's how we protect you every step of the way.
        </p>
      </div>

      {/* Bento Grid Layout for Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        
        {/* Guest Safety (Large Card) */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl shadow-sm transition-all duration-300 border border-gray-100">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={160} className="text-green-600" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-green-100 text-green-700 p-3 rounded-full">
                <ShieldCheck size={28} />
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Guest Safety</h2>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <ShieldCheck className="text-green-600 mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Verified Listings</h3>
                  <p className="text-gray-600">Every host and property goes through a rigorous verification process to ensure authenticity and quality standards.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CreditCard className="text-green-600 mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Secure Payments</h3>
                  <p className="text-gray-600">Transactions are securely processed through our platform. Never pay directly outside the Stayinn system.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Host Safety (Medium Card) */}
        <div className="md:col-span-4 bg-gray-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity translate-x-4 translate-y-4">
            <Home size={140} className="text-white" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-800 text-green-400 p-3 rounded-full">
                  <ShieldCheck size={24} />
                </span>
                <h2 className="text-2xl font-bold text-white">Host Safety</h2>
              </div>
              <p className="text-gray-300 text-lg mb-4">We protect your home as if it were our own, with comprehensive coverage and vetting.</p>
            </div>
            
            <ul className="space-y-4 mt-8 border-t border-gray-800 pt-6">
              <li className="flex items-center gap-3 text-gray-200 font-medium">
                <CheckCircle2 size={20} className="text-green-400" /> Damage Protection
              </li>
              <li className="flex items-center gap-3 text-gray-200 font-medium">
                <CheckCircle2 size={20} className="text-green-400" /> Guest Screening
              </li>
            </ul>
          </div>
        </div>

        {/* 24/7 Support (Wide Info Card) */}
        <div className="md:col-span-12 bg-green-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-green-100 hover:bg-green-100/50 transition-colors">
          <div className="flex items-center gap-6">
            <div className="bg-green-600 text-white p-4 rounded-full shrink-0 shadow-lg shadow-green-900/20">
              <HeadphonesIcon size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">24/7 Global Support</h2>
              <p className="text-gray-600 max-w-xl text-lg">Our dedicated team is available around the clock to assist with any urgent issues, ensuring peace of mind during every stay.</p>
            </div>
          </div>
          <Link 
            href="/support/contact" 
            className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-sm text-center"
          >
            Contact Support
          </Link>
        </div>
        
      </div>

      {/* Emergency Contact Section */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 md:p-10 text-center max-w-3xl mx-auto mb-12 shadow-sm">
        <AlertTriangle size={48} className="text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">In Case of Emergency</h2>
        <p className="text-gray-700 mb-8 text-lg">If you find yourself in immediate danger, please contact local authorities immediately before contacting Stayinn support.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="bg-white px-6 py-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-center gap-3">
            <PhoneCall className="text-red-600" size={24} />
            <span className="font-semibold text-gray-900 text-lg">Local Police: <strong>112</strong></span>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-center gap-3">
            <Activity className="text-red-600" size={24} />
            <span className="font-semibold text-gray-900 text-lg">Medical Emergency: <strong>112</strong></span>
          </div>
        </div>
        <p className="text-sm text-red-600/80 mt-6 font-medium">112 is the toll-free national emergency number in Nigeria.</p>
      </div>

    </div>
  );
}
