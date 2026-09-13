"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Users,
  Calendar as CalendarIcon,
  ShieldCheck,
} from "lucide-react";

import { createBookingAndPay } from "@/app/actions/booking";

export default function BookingWizard({
  room,
  user,
}: {
  room: { id: string; hotelId: string; capacity: number; pricePerNight: number; coverImage: string; name: string; hotelName: string; };
  user: unknown;
}) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Formats price
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getNumberOfNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(
      new Date(checkOut).getTime() - new Date(checkIn).getTime(),
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = getNumberOfNights();
  const total = nights * room.pricePerNight;
  const commission = total * 0.1; // 10% deducted from hotel payout

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const data = await createBookingAndPay({
        roomId: room.id,
        hotelId: room.hotelId,
        checkIn,
        checkOut,
        guests,
        total,
      });

      if (data.success && data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else {
        alert(data.error || "Failed to initiate payment");
        setIsProcessing(false);
      }
    } catch (e) {
      alert("Network error");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-12 pt-28 pb-32">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-600 -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>

          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= num
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-300 border-2 border-gray-100"
              }`}
            >
              {step > num ? <Check size={18} /> : num}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side: Wizard Forms */}
        <div className="w-full md:w-3/5">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Who's coming?
              </h2>
              <div className="p-6 border border-gray-200 rounded-3xl flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Guests</h3>
                  <p className="text-gray-500">
                    Maximum capacity: {room.capacity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-6 text-center">
                    {guests}
                  </span>
                  <button
                    onClick={() =>
                      setGuests(Math.min(room.capacity, guests + 1))
                    }
                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-gray-900 text-white font-semibold py-4 rounded-full hover:bg-green-600 transition-colors text-lg mt-8"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  When are you staying?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-sm text-gray-700 uppercase tracking-wide">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-gray-700 uppercase tracking-wide">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow text-lg"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={
                  !checkIn ||
                  !checkOut ||
                  new Date(checkOut) <= new Date(checkIn)
                }
                className="w-full bg-gray-900 text-white font-semibold py-4 rounded-full hover:bg-green-600 transition-colors text-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Review your trip
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-900">Dates</h4>
                    <p className="text-gray-500">
                      {new Date(checkIn).toLocaleDateString()} –{" "}
                      {new Date(checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-green-600 font-semibold underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-900">Guests</h4>
                    <p className="text-gray-500">
                      {guests} guest{guests > 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-green-600 font-semibold underline"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gray-900 text-white font-semibold py-4 rounded-full hover:bg-green-600 transition-colors text-lg mt-8"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Secure Checkout
                </h2>
              </div>

              <div className="bg-green-50 p-6 rounded-3xl flex items-start gap-4">
                <ShieldCheck
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={24}
                />
                <p className="text-gray-700 font-medium leading-relaxed">
                  You will be securely redirected to Paystack to complete your
                  payment. Monarch Stay never stores your card details.
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white font-bold py-5 rounded-full hover:bg-green-700 transition-colors text-xl mt-8 shadow-lg shadow-green-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-2/5">
          <div className="border border-gray-200 rounded-3xl p-6 sticky top-28 bg-white shadow-sm">
            <div className="flex gap-4 mb-6">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={room.coverImage}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">
                  {room.hotelName}
                </p>
                <h3 className="font-bold text-xl text-gray-900">{room.name}</h3>
              </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            <h4 className="font-bold text-gray-900 text-lg mb-4">
              Price details
            </h4>

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between items-center py-2">
                <span>
                  {formatPrice(room.pricePerNight)} x {nights} night
                  {nights !== 1 ? "s" : ""}
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-lg">
                Total (NGN)
              </span>
              <span className="font-bold text-2xl text-gray-900">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
