"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Users, Shield, Lock, Zap, Verified, Headset, CreditCard, Banknote, Globe, Phone } from "lucide-react";

export default function CheckoutPage({ params }: { params: Promise<{ roomId: string }> }) {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [addons, setAddons] = useState({
    chauffeur: false,
    chef: false,
    cot: false,
  });

  const basePrice = 750000;
  const fees = 45000;
  const escrow = 50000;

  let addonTotal = 0;
  if (addons.chauffeur) addonTotal += 35000;
  if (addons.chef) addonTotal += 45000;

  const grandTotal = basePrice + fees + escrow + addonTotal;

  const toggleAddon = (key: keyof typeof addons) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen pt-20">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-12 py-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 text-slate-500 text-sm font-semibold">
          <Link href="/explore" className="hover:text-teal-900 transition-colors">Explore Stays</Link>
          <ChevronRight size={14} />
          <span className="hover:text-teal-900 transition-colors cursor-pointer">The Courtyard Residence</span>
          <ChevronRight size={14} />
          <span className="text-teal-900 font-bold">Confirm & Pay</span>
        </nav>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: Booking Form & Checkout Engine (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-12">

            {/* Header / Flow Indicator */}
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-orange-600 font-bold">Reservation Step 3 of 3</span>
              <h1 className="font-serif text-4xl text-teal-950 tracking-tight font-bold">Review & Secure Your Stay</h1>
              <p className="text-slate-600 leading-relaxed">Review your travel dates, concierge selections, and finalize your secure Nigerian escrow payment.</p>
            </div>

            {/* Section 1: Stay Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between pb-4 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center shrink-0">
                    <Calendar size={24} />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Dates & Duration</span>
                    <span className="text-lg text-slate-900 font-bold">Oct 24 – Oct 29, 2025 <span className="text-sm text-slate-500 font-normal">(5 nights)</span></span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-teal-900 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold transition-all shadow-sm">
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center shrink-0">
                    <Users size={24} />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Occupancy</span>
                    <span className="text-lg text-slate-900 font-bold">2 Adults <span className="text-sm text-slate-500 font-normal">• Full Private Villa Access</span></span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-teal-900 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold transition-all shadow-sm">
                  Edit
                </button>
              </div>
            </section>

            {/* Section 2: Guest Information & Identity Verification */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold text-sm">1</span>
                  <h2 className="text-xl text-slate-900 font-bold">Guest Details & Verification</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-900 text-xs font-bold border border-teal-100">
                  <Verified size={16} /> Verified via NIN / BVN
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Primary Traveler Name</label>
                  <div className="p-3.5 bg-slate-50 rounded-xl text-sm text-slate-900 font-semibold flex items-center justify-between border border-slate-100">
                    <span>Amara Kalu</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email Receipt Address</label>
                  <div className="p-3.5 bg-slate-50 rounded-xl text-sm text-slate-900 font-semibold flex items-center justify-between border border-slate-100">
                    <span className="truncate">amara.kalu@gmail.com</span>
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">WhatsApp / SMS Contact (For Host & Gate Coordinator)</label>
                  <div className="p-3.5 bg-slate-50 rounded-xl text-sm text-slate-900 font-semibold flex items-center justify-between border border-slate-100">
                    <span>+234 812 345 6789</span>
                  </div>
                </div>
              </div>

              {/* Pre-clearance Gate Pass Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-4">
                  <Lock className="text-teal-900 mt-0.5 shrink-0" size={24} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base text-slate-900 font-bold">Ikoyi Estate Gate Pre-Clearance</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-orange-100 text-orange-800 uppercase font-bold">Fast-Track</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The Courtyard Residence is located in a secured access-controlled neighborhood. Provide your vehicle details for automatic barrier clearance upon arrival.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Vehicle Plate Number (Optional)</label>
                    <input className="px-4 py-3 bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 shadow-sm placeholder:text-slate-400 border border-slate-200" placeholder="e.g. KSF-492-AA" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Vehicle Model / Ride App</label>
                    <input className="px-4 py-3 bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 shadow-sm placeholder:text-slate-400 border border-slate-200" placeholder="e.g. Toyota Prado / Uber Black" type="text" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Concierge & Bespoke Add-ons */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <h2 className="text-xl text-slate-900 font-bold mb-1">Curated Concierge Services</h2>
                  <p className="text-sm text-slate-600">Personalize your Ikoyi residence experience prior to arrival.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Option 1 */}
                <label className={`flex items-start gap-4 p-5 rounded-2xl transition-all cursor-pointer border ${addons.chauffeur ? 'bg-teal-50 border-teal-200' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                  <input className="mt-1 w-5 h-5 rounded accent-teal-900" type="checkbox" checked={addons.chauffeur} onChange={() => toggleAddon('chauffeur')} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base text-slate-900 font-bold">Private Airport Chauffeur</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">MMIA Ikeja</span>
                      </div>
                      <p className="text-sm text-slate-600">Air-conditioned executive SUV with security-cleared driver directly to Ikoyi villa.</p>
                    </div>
                    <span className="text-base text-teal-900 font-bold whitespace-nowrap">+₦35,000</span>
                  </div>
                </label>

                {/* Option 2 */}
                <label className={`flex items-start gap-4 p-5 rounded-2xl transition-all cursor-pointer border ${addons.chef ? 'bg-teal-50 border-teal-200' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                  <input className="mt-1 w-5 h-5 rounded accent-teal-900" type="checkbox" checked={addons.chef} onChange={() => toggleAddon('chef')} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base text-slate-900 font-bold">Dedicated In-Villa Private Chef</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">Chef Dayo</span>
                      </div>
                      <p className="text-sm text-slate-600">Daily curated breakfasts & Nigerian/Continental dining tailored to your dietary profile.</p>
                    </div>
                    <span className="text-base text-teal-900 font-bold whitespace-nowrap">+₦45,000<span className="text-xs text-slate-500 font-normal">/day</span></span>
                  </div>
                </label>

                {/* Option 3 */}
                <label className={`flex items-start gap-4 p-5 rounded-2xl transition-all cursor-pointer border ${addons.cot ? 'bg-teal-50 border-teal-200' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                  <input className="mt-1 w-5 h-5 rounded accent-teal-900" type="checkbox" checked={addons.cot} onChange={() => toggleAddon('cot')} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base text-slate-900 font-bold">Sanitized Wooden Infant Cot</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">Complimentary</span>
                      </div>
                      <p className="text-sm text-slate-600">Pre-assembled in the master bedroom with organic cotton bedding.</p>
                    </div>
                    <span className="text-base text-teal-900 font-bold whitespace-nowrap">₦0</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Section 4: Payment Selection */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <h2 className="text-xl text-slate-900 font-bold mb-1">Select Payment Method</h2>
                  <p className="text-sm text-slate-600">Protected by Central Bank of Nigeria compliant 256-bit encryption escrow.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Card */}
                <div
                  className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 ${selectedPayment === 'card' ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${selectedPayment === 'card' ? 'border-teal-900' : 'border-slate-300'}`}>
                        {selectedPayment === 'card' && <div className="w-2 h-2 rounded-full bg-teal-900" />}
                      </div>
                      <span className="text-base text-slate-900 font-bold">Nigerian Bank Cards</span>
                    </div>
                    <CreditCard className="text-teal-900" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Verve, Mastercard, Visa via Paystack/Flutterwave.</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">Verve</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">Mastercard</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">Visa</span>
                    </div>
                  </div>
                </div>

                {/* Option 2: Transfer */}
                <div
                  className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 ${selectedPayment === 'transfer' ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                  onClick={() => setSelectedPayment('transfer')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${selectedPayment === 'transfer' ? 'border-teal-900' : 'border-slate-300'}`}>
                        {selectedPayment === 'transfer' && <div className="w-2 h-2 rounded-full bg-teal-900" />}
                      </div>
                      <span className="text-base text-slate-900 font-bold">Direct NIBSS Transfer</span>
                    </div>
                    <Banknote className="text-teal-900" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Automated instant payment verification via dynamic virtual account.</p>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-100 border border-orange-200 text-orange-800">Zero card fail rate</span>
                  </div>
                </div>

                {/* Option 3: USD */}
                <div
                  className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 ${selectedPayment === 'usd' ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                  onClick={() => setSelectedPayment('usd')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${selectedPayment === 'usd' ? 'border-teal-900' : 'border-slate-300'}`}>
                        {selectedPayment === 'usd' && <div className="w-2 h-2 rounded-full bg-teal-900" />}
                      </div>
                      <span className="text-base text-slate-900 font-bold">Pay in USD ($)</span>
                    </div>
                    <Globe className="text-teal-900" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Charge directly to AMEX, UK/US/EU cards at live CBN interbank rate.</p>
                    <span className="text-xs font-bold text-teal-900 mt-1 inline-block">Estimated ~$1,050 USD</span>
                  </div>
                </div>

                {/* Option 4: USSD */}
                <div
                  className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 ${selectedPayment === 'ussd' ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                  onClick={() => setSelectedPayment('ussd')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${selectedPayment === 'ussd' ? 'border-teal-900' : 'border-slate-300'}`}>
                        {selectedPayment === 'ussd' && <div className="w-2 h-2 rounded-full bg-teal-900" />}
                      </div>
                      <span className="text-base text-slate-900 font-bold">Instant USSD Banking</span>
                    </div>
                    <Phone className="text-teal-900" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">GTBank, Access, Zenith, UBA & First Bank instant mobile string.</p>
                    <span className="text-[10px] font-bold text-slate-600 mt-1 inline-block">*737# • *901# • *966#</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Details Box for Card */}
              {selectedPayment === 'card' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4 mt-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Card Number</label>
                    <div className="relative">
                      <input className="w-full px-4 py-3 bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 shadow-sm border border-slate-200" placeholder="5399 •••• •••• 8201" type="text" defaultValue="5399 4120 9044 8201" />
                      <CreditCard className="absolute right-4 top-3 text-slate-400" size={20} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Expiry Date</label>
                      <input className="px-4 py-3 bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 shadow-sm border border-slate-200" placeholder="MM/YY" type="text" defaultValue="08/27" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CVV</label>
                      <input className="px-4 py-3 bg-white rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 shadow-sm border border-slate-200" maxLength={4} placeholder="123" type="password" defaultValue="482" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                    <Lock size={14} className="text-teal-900" />
                    Card details are tokenized by Paystack (PCIDSS Level 1 Certified). Stayinn does not store card data.
                  </p>
                </div>
              )}
            </section>

            {/* Section 5: Cancellation & Host Rules */}
            <section className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
              <h3 className="text-base text-slate-900 font-bold flex items-center gap-2">
                <Shield className="text-orange-600" size={20} />
                Flexible Cancellation & Residence Etiquette
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cancel up to <strong className="text-slate-900">48 hours before check-in (by 2:00 PM, Oct 22, 2025)</strong> for a full refund minus ₦10,000 processing charges. Caution escrow of ₦50,000 is automatically unfrozen and returned within 24 hours post-checkout following standard housekeeper checklist sign-off.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                  Non-Smoking Villa
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                  Quiet hours from 10:00 PM
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                  Private Pool Rules Apply
                </span>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Trust Card (5 Cols) */}
          <aside className="lg:col-span-5 sticky top-28 flex flex-col gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col gap-6">

              {/* Property Mini Hero */}
              <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="The Courtyard Residence, Ikoyi Lagos"
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
                    width={96}
                    height={96}
                  />
                  <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm text-teal-900 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Ikoyi</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-orange-500 mb-1">
                    <span className="text-sm font-bold">4.96 ★</span>
                    <span className="text-xs text-slate-500 font-semibold">(84 reviews) • Superhost</span>
                  </div>
                  <h2 className="text-base text-slate-900 font-bold truncate">The Courtyard Residence & Private Pool</h2>
                  <p className="text-xs text-slate-500 mt-1">Parkview Estate, Ikoyi, Lagos</p>
                  <div className="mt-2 flex items-center gap-1 text-teal-900 text-xs font-bold">
                    <Zap size={14} /> 100% Uninterrupted Power Guarantee
                  </div>
                </div>
              </div>

              {/* Line items Price Breakdown */}
              <div className="flex flex-col gap-3 py-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="text-[10px] uppercase tracking-wider text-teal-900 font-bold mb-1">Billing Breakdown</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">₦{basePrice.toLocaleString()} × 5 nights</span>
                  <span className="text-slate-900 font-semibold">₦{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <span>Stayinn Concierge & Facility Fee</span>
                  </div>
                  <span className="text-slate-900 font-semibold">₦{fees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <span>Refundable Caution Escrow</span>
                  </div>
                  <span className="text-slate-900 font-semibold">₦{escrow.toLocaleString()}</span>
                </div>

                {addonTotal > 0 && (
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200 mt-1">
                    <span className="text-orange-600 font-semibold">Selected Add-ons</span>
                    <span className="text-orange-600 font-bold">₦{addonTotal.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between items-end">
                  <div>
                    <span className="text-base text-slate-900 block font-bold">Total Payable</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Inclusive of all local taxes</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl text-teal-900 font-bold block">₦{grandTotal.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-semibold">approx. ${(grandTotal / 805).toFixed(0)} USD</span>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <button className="w-full h-14 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all font-bold active:scale-[0.98]">
                <Lock size={20} />
                <span>Confirm & Pay ₦{grandTotal.toLocaleString()}</span>
              </button>

              {/* CBN & Guarantee Badges */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap size={20} />
                  </span>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-900 font-bold">Zero Outage Guarantee</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Dual soundproof 60kVA Perkins generators + 15kWh hybrid lithium-solar inverter. Constant chilled AC.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Banknote size={20} />
                  </span>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-900 font-bold">CBN-Compliant Escrow Protection</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Funds are secured safely in licensed custody until 24 hours after successful arrival and inspection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Support Micro Ribbon */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
              <span className="flex items-center gap-2 font-semibold">
                <Headset size={18} className="text-teal-900" />
                Need assistance with booking?
              </span>
              <Link href="/support" className="font-bold text-teal-900 hover:text-orange-600 transition-colors">Chat with Stayinn Concierge</Link>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
