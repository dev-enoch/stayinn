import React from "react";
import Link from "next/link";
import { Search, Headset, TrendingUp, ShieldCheck, MessageCircle, Calendar, CreditCard, Bolt, Shield, Building, Building2, ExternalLink, ChevronRight, CheckCircle, Phone, Lock, ChevronDown, ArrowRight } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 min-h-screen flex flex-col pt-20">
      
      {/* Immersive Hero Section */}
      <section className="relative w-full overflow-hidden bg-teal-950 text-white min-h-[60vh] flex flex-col justify-center">
        {/* Atmospheric background photography with tonal teal scrim */}
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80')` }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/95 via-teal-950/90 to-teal-900"></div>
        
        {/* Decorative subtle ambient glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-12 w-80 h-80 rounded-full bg-teal-400/10 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-12 py-20 flex flex-col items-center text-center w-full">
          {/* Tag / Overline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 text-teal-100 border border-white/20">
            <Headset size={16} />
            <span className="text-xs uppercase tracking-wider font-bold">Stayinn Hospitality Assistance Hub</span>
          </div>
          
          {/* Hero Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl tracking-tight mb-6 font-bold">
            How can we help you today?
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mb-10 leading-relaxed">
            Instant answers to reservation queries, power supply assurances, estate security protocol, and payment procedures across our verified Nigerian stays.
          </p>
          
          {/* Desktop Search Bar */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-2 flex items-center gap-2 transition-all duration-300 focus-within:shadow-2xl focus-within:ring-4 focus-within:ring-teal-500/30">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-teal-900 flex-shrink-0">
              <Search size={24} />
            </div>
            <input 
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none py-2 text-lg" 
              placeholder="Search topics, policies, booking queries, or safety guidelines..." 
              type="text"
            />
            <button className="px-6 py-3 rounded-xl bg-teal-900 hover:bg-teal-800 text-white font-bold text-sm uppercase tracking-wider flex-shrink-0 transition-colors shadow-md">
              Search
            </button>
          </div>
          
          {/* Trending Search Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-teal-100 text-sm font-bold">
            <span className="text-white flex items-center gap-1">
              <TrendingUp size={16} className="text-orange-400" /> Popular:
            </span>
            <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 backdrop-blur-sm">
              Cancellation Policy
            </button>
            <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 backdrop-blur-sm">
              24/7 Power Guarantee
            </button>
            <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 backdrop-blur-sm hidden sm:block">
              Airport Pickup & Chauffeur
            </button>
            <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 backdrop-blur-sm">
              Caution Deposits
            </button>
          </div>
        </div>
      </section>

      {/* Live Status Floating Ribbon */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-12 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-teal-500 animate-ping absolute"></span>
              <span className="w-4 h-4 rounded-full bg-teal-600 relative"></span>
            </div>
            <div>
              <h2 className="text-lg text-slate-900 font-bold">Stayinn Real-Time Dispatch is Online</h2>
              <p className="text-slate-500 text-sm mt-1">Lagos, Abuja & Calabar concierge teams are active. Average response: <span className="font-bold text-teal-900">under 3 minutes</span>.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <a href="#emergency-section" className="px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-teal-900 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
              <ShieldCheck size={18} /> Emergency Protocols
            </a>
            <a href="https://wa.me/2348007829466" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-teal-900 text-white hover:bg-teal-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md">
              <MessageCircle size={18} /> WhatsApp Support
            </a>
          </div>
        </div>
      </section>

      {/* Categorized Help Cards */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">Knowledge Center</span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight mt-2">Browse by Category</h2>
          </div>
          <p className="text-slate-500 max-w-md text-lg">
            Comprehensive guides covering everything from arrival logistics in gated estates to dual-currency settlement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Bookings */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-teal-900 flex items-center justify-center mb-6 group-hover:bg-teal-900 group-hover:text-white transition-colors border border-slate-100 group-hover:border-teal-900">
                <Calendar size={28} />
              </div>
              <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">01 • Bookings</span>
              <h3 className="text-xl text-slate-900 font-bold mt-2 mb-3">Booking & Reservations</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Modifying dates, managing group itineraries, automated check-in codes, and booking extensions.
              </p>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Self check-in smart lock access</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Itinerary changes & date extensions</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Group stays & ID verification</span><ChevronRight size={16} /></a></li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-teal-900 font-bold group-hover:text-orange-600 transition-colors">
                18 Articles Included <ArrowRight size={14} />
              </span>
            </div>
          </div>
          
          {/* Card 2: Finance */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-teal-900 flex items-center justify-center mb-6 group-hover:bg-teal-900 group-hover:text-white transition-colors border border-slate-100 group-hover:border-teal-900">
                <CreditCard size={28} />
              </div>
              <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">02 • Finance</span>
              <h3 className="text-xl text-slate-900 font-bold mt-2 mb-3">Payments, VAT & Pricing</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Seamless payments via NGN Debit Cards, USSD, Bank Transfer, USD Cards, and caution deposit handling.
              </p>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Refund schedules & timelines</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Caution deposit holds & release</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>FIRS compliant tax invoices</span><ChevronRight size={16} /></a></li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-teal-900 font-bold group-hover:text-orange-600 transition-colors">
                12 Articles Included <ArrowRight size={14} />
              </span>
            </div>
          </div>
          
          {/* Card 3: Hospitality */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-teal-900 flex items-center justify-center mb-6 group-hover:bg-teal-900 group-hover:text-white transition-colors border border-slate-100 group-hover:border-teal-900">
                <Bolt size={28} />
              </div>
              <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">03 • Hospitality</span>
              <h3 className="text-xl text-slate-900 font-bold mt-2 mb-3">Stays & On-Site Amenities</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Solar and generator backup switch times, high-speed Starlink Wi-Fi, private chefs, and housekeeping.
              </p>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Guaranteed 24/7 power policies</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Fibre & satellite broadband resets</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>In-villa catering & cleaning</span><ChevronRight size={16} /></a></li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-teal-900 font-bold group-hover:text-orange-600 transition-colors">
                15 Articles Included <ArrowRight size={14} />
              </span>
            </div>
          </div>
          
          {/* Card 4: Security */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-teal-900 flex items-center justify-center mb-6 group-hover:bg-teal-900 group-hover:text-white transition-colors border border-slate-100 group-hover:border-teal-900">
                <Shield size={28} />
              </div>
              <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">04 • Security</span>
              <h3 className="text-xl text-slate-900 font-bold mt-2 mb-3">Trust, Safety & Access</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Gated estate gate-pass generation, guest registrations, noise curfews, and verified host credentials.
              </p>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Generating estate gate codes</span><ChevronRight size={16} /></a></li>
                <li><a href="#faq" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Visitor limits & party restrictions</span><ChevronRight size={16} /></a></li>
                <li><a href="#emergency-section" className="flex items-center justify-between hover:text-teal-900 transition-colors"><span>Armed escort & transit info</span><ChevronRight size={16} /></a></li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-teal-900 font-bold group-hover:text-orange-600 transition-colors">
                14 Articles Included <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Feature Callout: Local Hospitality Promise */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-20">
        <div className="bg-teal-50 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 border border-teal-100 shadow-sm">
          <div className="flex-1 z-10">
            <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">Standard of Excellence</span>
            <h3 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold mt-3 mb-4">The Stayinn Guarantee in Every City</h3>
            <p className="text-slate-600 max-w-xl mb-8 leading-relaxed text-lg">
              Every villa, loft, and penthouse listed undergoes physical verification by our Nigerian operations team. From uninterrupted dual-source power systems in Victoria Island to secure estate access in Abuja's Diplomatic Zone, we ensure standard luxury.
            </p>
            
            {/* Inline Data Visualizer: Resolution Metric Pill */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-100">
                <span className="font-serif text-2xl md:text-3xl text-teal-900 font-bold block">99.8%</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Power Uptime</span>
              </div>
              <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-100">
                <span className="font-serif text-2xl md:text-3xl text-teal-900 font-bold block">&lt; 3 min</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Support Reply</span>
              </div>
              <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-100">
                <span className="font-serif text-2xl md:text-3xl text-orange-600 font-bold block">100%</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 block">Verified Stays</span>
              </div>
            </div>
          </div>
          
          {/* Feature Visual Graphic */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-full lg:w-96 h-80 bg-teal-900 rounded-[2rem] overflow-hidden p-8 text-white shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')` }}></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white text-teal-900 flex items-center justify-center mb-4 shadow-lg shadow-black/20">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold">Concierge Rapid Dispatch</h4>
              <p className="text-teal-100 text-sm mt-3 leading-relaxed">Available 24/7 across Lagos Island, Ikeja, Maitama, Jabi, and Old GRA Port Harcourt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Nigerian Emergency & 24/7 Support Banner */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-20" id="emergency-section">
        <div className="bg-orange-600 text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-orange-600/20 relative overflow-hidden">
          {/* Ambient pattern detail */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-orange-500/50">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-orange-600 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
                  <ShieldCheck size={16} />
                  Immediate Assistance
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">Stayinn Rapid Response Network</h2>
                <p className="text-orange-100 max-w-xl mt-3 text-lg">
                  For urgent safety, maintenance, medical dispatch, or security protocol escalations during your stay in Nigeria.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                <a href="tel:+2348007829466" className="px-6 py-4 rounded-xl bg-white text-orange-700 hover:bg-orange-50 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors">
                  <Phone size={20} />
                  <span>+234 800 STAYINN</span>
                </a>
                <a href="https://wa.me/2348007829466" target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-orange-500">
                  <MessageCircle size={20} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
            
            {/* Emergency Protocol Quick Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
              <div className="bg-black/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-black/20 transition-colors">
                <div className="flex items-center gap-2 text-orange-200 mb-3">
                  <Shield size={24} />
                  <span className="text-xs uppercase tracking-wider font-bold">Local Emergency Lines</span>
                </div>
                <h4 className="text-xl text-white font-bold mb-2">National 112 / 767 (Lagos)</h4>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Direct connection to State Emergency Management (LASEMA) and Federal Police command centers.
                </p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-black/20 transition-colors">
                <div className="flex items-center gap-2 text-orange-200 mb-3">
                  <Building2 size={24} />
                  <span className="text-xs uppercase tracking-wider font-bold">Medical Partner Dispatch</span>
                </div>
                <h4 className="text-xl text-white font-bold mb-2">Private Ambulances On-Call</h4>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Affiliated priority ambulance transport to Reddington, Lagoon, or Nizamiye Hospital Abuja.
                </p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-black/20 transition-colors">
                <div className="flex items-center gap-2 text-orange-200 mb-3">
                  <Building size={24} />
                  <span className="text-xs uppercase tracking-wider font-bold">Physical Security Intervention</span>
                </div>
                <h4 className="text-xl text-white font-bold mb-2">Estate Liaison Officers</h4>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Dedicated field officers stationed in Lekki, Ikoyi, Ikeja GRA, and Abuja Central for in-person support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host & Traveler Direct Contact & Ticket Submission */}
      <section className="max-w-[1280px] mx-auto w-full px-4 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Submit a Request Ticket */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="mb-8 border-b border-slate-100 pb-8">
              <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">Direct Assistance</span>
              <h3 className="font-serif text-3xl text-slate-900 font-bold mt-2">Submit a Support Request</h3>
              <p className="text-slate-500 mt-3 text-lg">
                Our guest operations department will review your reservation file and respond within 15 minutes.
              </p>
            </div>
            
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Your Full Name</label>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all" placeholder="Amara Kalu" required type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Booking ID (Optional)</label>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all" placeholder="STY-2025-XXXX" type="text" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Phone / WhatsApp</label>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all" placeholder="+234 812 345 6789" required type="tel" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Department / Topic</label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all appearance-none">
                      <option value="power">24/7 Power or Generator Maintenance</option>
                      <option value="booking">Reservation Change or Cancellation</option>
                      <option value="access">Estate Access & Gate Pass</option>
                      <option value="payment">Billing, NGN/USD Charges, Refund</option>
                      <option value="host">Host Partnership Inquiry</option>
                      <option value="other">Other Inquiries</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Describe the Situation</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none transition-all resize-y min-h-[120px]" placeholder="Please provide details such as estate address, unit number, or specific assistance required..." required rows={4}></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                  <Lock size={16} className="text-teal-900" />
                  <span>Encrypted SSL ticket tracking</span>
                </div>
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-teal-900 hover:bg-teal-800 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-teal-900/20 transition-all active:scale-95" type="button">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
          
          {/* Right Column: Host Standards, Quick Guides & Community Links */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card: Become a Host Support */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Building size={24} />
                </div>
                <div>
                  <h4 className="text-lg text-slate-900 font-bold">Are You a Property Host?</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Host success team</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Need guidance on meeting the Stayinn 24/7 Power standard, syncing external booking calendars, or setting up NGN settlement bank accounts?
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/host" className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-900 flex items-center justify-between transition-colors shadow-sm group">
                  <span className="text-sm font-bold">Host Guarantee & ₦25M Cover</span>
                  <ArrowRight size={18} className="text-teal-900 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/host" className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-900 flex items-center justify-between transition-colors shadow-sm group">
                  <span className="text-sm font-bold">Inverter & Solar Specs Guide</span>
                  <ArrowRight size={18} className="text-teal-900 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Card: Policy & Legal Direct Links */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-teal-400" size={24} />
                Policies & Legal Framework
              </h4>
              <div className="flex flex-col gap-4 text-sm font-semibold">
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span>Guest Terms of Service</span>
                  <ExternalLink size={16} />
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span>Privacy Policy & NDPR Compliance</span>
                  <ExternalLink size={16} />
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span>Party & Photography Strict Policy</span>
                  <ExternalLink size={16} />
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span>Estate By-Laws & Curfews</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            
            {/* Office Locations Detail */}
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-slate-700">
              <div className="flex items-center gap-2 text-teal-900 font-bold mb-3">
                <Building size={20} />
                <span className="text-xs uppercase tracking-wider">Stayinn Physical Centers</span>
              </div>
              <p className="text-sm leading-relaxed">
                <strong className="text-teal-900">Lagos Hub:</strong> Plot 14 Admiralty Way, Lekki Phase 1, Lagos.<br/><br/>
                <strong className="text-teal-900">Abuja Hub:</strong> 5th Floor, Churchgate Towers, Central Business District, Abuja.
              </p>
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
