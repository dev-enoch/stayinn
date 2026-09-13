"use client";

import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Minus,
  X,
  BedDouble,
  Users,
  Expand,
  CheckCircle2,
  Calendar,
  CreditCard,
  Smartphone,
  ChevronRight,
  MessageCircle,
  Loader2,
  AlertCircle,
  Check,
  Star,
} from "lucide-react";

type RoomImage = { url: string; sortOrder: number };
type RoomType = {
  id: string;
  name: string;
  description: string | null;
  pricePerNight: number;
  capacity: number;
  quantity: number;
  bedType: string | null;
  roomSize: number | null;
  amenities: string[];
  images: RoomImage[];
};
type Hotel = {
  id: string;
  slug: string;
  name: string;
  phoneNumber: string | null;
  whatsappNumber: string | null;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

function toISODate(d: Date) {
  return d.toISOString().split("T")[0];
}
function addDays(d: Date, n: number) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
function todayDate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─── Simple Room Display Card ─────────────────────────────────────────────────
export function RoomCard({
  room,
  quantity,
  onIncrease,
  onDecrease,
}: {
  room: RoomType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  const img =
    room.images[0]?.url ||
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80";
  return (
    <div
      id={`room-${room.id}`}
      className={`scroll-mt-36 bg-white rounded-2xl border overflow-hidden flex flex-col sm:flex-row transition-all duration-200 shadow-sm
        ${quantity > 0 ? "border-teal-900 ring-2 ring-teal-900/20 shadow-md" : "border-slate-200"}`}
    >
      {/* Image */}
      <div className="w-full sm:w-44 h-40 sm:h-auto shrink-0 relative overflow-hidden bg-slate-100">
        <img src={img} alt={room.name} className="w-full h-full object-cover" />
        {quantity > 0 && (
          <div className="absolute top-2 left-2 bg-teal-900 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Check size={10} /> {quantity} Selected
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900">{room.name}</h3>
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-teal-950">
              {fmt(room.pricePerNight)}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold">
              /night
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {room.bedType && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
              <BedDouble size={11} />
              {room.bedType}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
            <Users size={11} />
            Sleeps {room.capacity}
          </span>
          {room.roomSize && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
              <Expand size={11} />
              {room.roomSize}m²
            </span>
          )}
        </div>

        {room.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {room.description}
          </p>
        )}

        {room.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {room.amenities.slice(0, 5).map((am, i) => (
              <span
                key={i}
                className="text-[10px] text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full font-semibold"
              >
                {am}
              </span>
            ))}
            {room.amenities.length > 5 && (
              <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                +{room.amenities.length - 5} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            {room.quantity - quantity > 0
              ? `${room.quantity - quantity} available`
              : "No more rooms available"}
          </p>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg p-1">
            <button
              onClick={onDecrease}
              disabled={quantity === 0}
              className="p-1 rounded-md text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm font-bold w-4 text-center">{quantity}</span>
            <button
              onClick={onIncrease}
              disabled={quantity >= room.quantity}
              className="p-1 rounded-md text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Widget + Modal ───────────────────────────────────────────────────
export default function HotelBookingSection({
  hotel,
  rooms,
  isLoggedIn,
}: {
  hotel: Hotel;
  rooms: RoomType[];
  isLoggedIn: boolean;
}) {
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({});
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState(toISODate(addDays(todayDate(), 1)));
  const [checkOut, setCheckOut] = useState(toISODate(addDays(todayDate(), 2)));
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<"payment" | "confirmation">("payment");
  const [paymentMethod, setPaymentMethod] = useState<
    "paystack" | "bank_transfer"
  >("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{ bookingId: string; amount: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  const selectedRoom = rooms[0] || { name: "Room" };

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalRooms = Object.values(selectedRooms).reduce((a, b) => a + b, 0);

  const totalPrice = Object.entries(selectedRooms).reduce((acc, [id, qty]) => {
    const room = rooms.find(r => r.id === id);
    if (!room) return acc;
    return acc + (room.pricePerNight * qty * nights);
  }, 0);

  const handleNightsChange = (delta: number) => {
    setNights((n) => {
      const next = Math.max(1, Math.min(30, n + delta));
      // Sync checkout date
      const newCheckOut = toISODate(addDays(new Date(checkIn), next));
      setCheckOut(newCheckOut);
      return next;
    });
  };

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    const newCheckOut = toISODate(addDays(new Date(val), nights));
    setCheckOut(newCheckOut);
  };

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val);
    const diff = Math.max(
      1,
      Math.ceil(
        (new Date(val).getTime() - new Date(checkIn).getTime()) / 86400000,
      ),
    );
    setNights(diff);
  };

  const openModal = () => {
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/hotels/${hotel.slug}`;
      return;
    }
    if (totalRooms === 0) return;
    setStep("payment");
    setError(null);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    setStep("payment");
    setError(null);
    setBookingResult(null);
  };

  const handleBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          hotelId: hotel.id,
          rooms: Object.entries(selectedRooms).map(([id, qty]) => ({
            roomTypeId: id,
            quantity: qty,
          })).filter(r => r.quantity > 0),
          checkInDate: checkIn,
          checkOutDate: checkOut,
          numberOfGuests: guests,
        }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.error?.message || "Booking failed");

      if (paymentMethod === "paystack" && data.data.authorizationUrl) {
        window.location.href = data.data.authorizationUrl;
      } else {
        setBookingResult({ bookingId: data.data.id, amount: totalPrice });
        setStep("confirmation");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {/* ── ROOM CARDS (left column, passed in from parent but rendered here) ── */}
      <div id="rooms" className="flex flex-col gap-4 scroll-mt-36">
        <div>
          <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">
            Accommodation
          </span>
          <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">
            Available Room Types
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click a room to select it, then configure your stay in the booking
            panel.
          </p>
        </div>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            quantity={selectedRooms[room.id] || 0}
            onIncrease={() => setSelectedRooms(prev => ({ ...prev, [room.id]: (prev[room.id] || 0) + 1 }))}
            onDecrease={() => setSelectedRooms(prev => ({ ...prev, [room.id]: Math.max(0, (prev[room.id] || 0) - 1) }))}
          />
        ))}
      </div>

      {/* ── BOOKING WIDGET (used by hotel page in right column via slot) ── */}
      {/* This widget is rendered inside the right sticky column in the hotel page */}

      {/* ── PAYMENT MODAL ─────────────────────────────────────────────────── */}
      {modalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Sheet — bottom on mobile, centered dialog on desktop */}
          <div className="relative w-full md:w-[520px] bg-white md:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] md:max-h-[88vh] flex flex-col animate-[slideUp_0.3s_ease-out] md:animate-none md:scale-100">
            <div className="flex justify-center pt-3 pb-1 shrink-0 md:hidden">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {step === "confirmation"
                    ? "Booking Confirmed! 🎉"
                    : "Complete Your Booking"}
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  {hotel.name}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {step === "payment" && (
                <>
                  {/* Booking Summary */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Booking Summary
                    </p>
                    <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-1">
                      {Object.entries(selectedRooms).map(([id, qty]) => {
                        if (qty === 0) return null;
                        const room = rooms.find(r => r.id === id)!;
                        return (
                          <div key={id} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-200 relative">
                              <img
                                src={room.images[0]?.url || ""}
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-0.5 right-0.5 bg-teal-900 text-white text-[9px] font-bold px-1 rounded-sm">
                                {qty}x
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm leading-tight">
                                {room.name}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {room.bedType} · Sleeps {room.capacity * qty}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Check-in
                        </p>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {new Date(checkIn).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Check-out
                        </p>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {new Date(checkOut).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-sm text-slate-500">
                        {nights} night{nights !== 1 ? "s" : ""} · {guests} guest
                        {guests !== 1 ? "s" : ""}
                      </span>
                      <span className="text-xl font-bold text-teal-950">
                        {fmt(totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Payment Method
                    </p>
                    <button
                      onClick={() => setPaymentMethod("paystack")}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "paystack" ? "border-teal-900 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <CreditCard size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-900 text-sm">
                          Pay with Paystack
                        </p>
                        <p className="text-xs text-slate-500">
                          Card, USSD, QR, Bank Transfer via Paystack
                        </p>
                      </div>
                      {paymentMethod === "paystack" && (
                        <CheckCircle2
                          size={20}
                          className="text-teal-900 shrink-0"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank_transfer")}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "bank_transfer" ? "border-teal-900 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Smartphone size={20} className="text-teal-900" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-900 text-sm">
                          Direct Bank Transfer
                        </p>
                        <p className="text-xs text-slate-500">
                          Transfer directly to Monarch Stay — confirmed within
                          2hrs
                        </p>
                      </div>
                      {paymentMethod === "bank_transfer" && (
                        <CheckCircle2
                          size={20}
                          className="text-teal-900 shrink-0"
                        />
                      )}
                    </button>
                    {paymentMethod === "bank_transfer" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                        <p className="font-bold mb-1.5">Bank Details</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <span className="text-amber-600">Bank:</span>
                          <span className="font-bold">GTBank</span>
                          <span className="text-amber-600">Account:</span>
                          <span className="font-bold">0123456789</span>
                          <span className="text-amber-600">Name:</span>
                          <span className="font-bold">Monarch Stay Ltd</span>
                        </div>
                        <p className="mt-2 text-xs text-amber-700">
                          Use your name as the payment reference.
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}
                </>
              )}

              {step === "confirmation" && (
                <div className="flex flex-col gap-5 items-center text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check
                      size={36}
                      className="text-teal-900"
                      strokeWidth={3}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Booking Request Sent!
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                      Complete the transfer of{" "}
                      <strong className="text-teal-900">
                        {fmt(totalPrice)}
                      </strong>{" "}
                      to confirm your booking at {hotel.name}.
                    </p>
                  </div>
                  {bookingResult && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 w-full text-left">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                        Reference
                      </p>
                      <p className="font-mono font-bold text-slate-900">
                        STN-{bookingResult.bookingId?.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  )}
                  {hotel.whatsappNumber && (
                    <a
                      href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, "")}?text=Hi, I made a bank transfer for booking ref: STN-${bookingResult?.bookingId?.slice(0, 8).toUpperCase()}. Please confirm.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm"
                    >
                      <MessageCircle size={18} /> Confirm via WhatsApp
                    </a>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-sm text-slate-400 hover:text-slate-600 underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {step !== "confirmation" && (
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl shrink-0">
                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Processing…
                    </>
                  ) : paymentMethod === "paystack" ? (
                    <>
                      Pay {fmt(totalPrice)} with Paystack{" "}
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      Confirm Bank Transfer — {fmt(totalPrice)}{" "}
                      <Check size={16} />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  Your card won&apos;t be charged until you confirm on Paystack.
                </p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ─── Exported Booking Widget (for right sticky column) ────────────────────────
export function BookingWidget({
  hotel,
  rooms,
  isLoggedIn,
  selectedRooms,
  setSelectedRooms,
}: {
  hotel: Hotel;
  rooms: RoomType[];
  isLoggedIn: boolean;
  selectedRooms: Record<string, number>;
  setSelectedRooms: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState(toISODate(addDays(todayDate(), 1)));
  const [checkOut, setCheckOut] = useState(toISODate(addDays(todayDate(), 2)));
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<"payment" | "confirmation">("payment");
  const [paymentMethod, setPaymentMethod] = useState<
    "paystack" | "bank_transfer"
  >("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{ bookingId: string; amount: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalRooms = Object.values(selectedRooms).reduce((a, b) => a + b, 0);

  const totalPrice = Object.entries(selectedRooms).reduce((acc, [id, qty]) => {
    const room = rooms.find(r => r.id === id);
    if (!room) return acc;
    return acc + (room.pricePerNight * qty * nights);
  }, 0);

  const handleNightsChange = (delta: number) => {
    setNights((n) => {
      const next = Math.max(1, Math.min(30, n + delta));
      setCheckOut(toISODate(addDays(new Date(checkIn), next)));
      return next;
    });
  };

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    setCheckOut(toISODate(addDays(new Date(val), nights)));
  };

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val);
    const diff = Math.max(
      1,
      Math.ceil(
        (new Date(val).getTime() - new Date(checkIn).getTime()) / 86400000,
      ),
    );
    setNights(diff);
  };

  const openModal = () => {
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/hotels/${hotel.slug}`;
      return;
    }
    if (totalRooms === 0) return;
    setStep("payment");
    setError(null);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    setStep("payment");
    setError(null);
    setBookingResult(null);
  };

  const handleBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          hotelId: hotel.id,
          rooms: Object.entries(selectedRooms).map(([id, qty]) => ({
            roomTypeId: id,
            quantity: qty,
          })).filter(r => r.quantity > 0),
          checkInDate: checkIn,
          checkOutDate: checkOut,
          numberOfGuests: guests,
        }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.error?.message || "Booking failed");

      if (paymentMethod === "paystack" && data.data.authorizationUrl) {
        window.location.href = data.data.authorizationUrl;
      } else {
        setBookingResult({ bookingId: data.data.id, amount: totalPrice });
        setStep("confirmation");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const totalCapacity = Object.entries(selectedRooms).reduce((acc, [id, qty]) => {
    return acc + ((rooms.find(r => r.id === id)?.capacity || 0) * qty);
  }, 0);

  const minPrice = rooms.length > 0 ? Math.min(...rooms.map(r => r.pricePerNight)) : 0;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Price Header */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-teal-50/50">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">
              From
            </span>
            <span className="font-serif text-3xl font-bold text-slate-900">
              {fmt(minPrice)}
            </span>
            <span className="text-sm font-semibold text-slate-500">
              / night
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Select rooms from the list to begin
          </p>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Selected Rooms Summary */}
          {totalRooms > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Selected Rooms
              </p>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                {Object.entries(selectedRooms).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const room = rooms.find(r => r.id === id)!;
                  return (
                    <div key={id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <span className="bg-teal-900 text-white text-[10px] px-1.5 py-0.5 rounded-md">{qty}x</span>
                          {room.name}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Sleeps up to {room.capacity * qty}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-teal-900">
                        {fmt(room.pricePerNight * qty)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Calendar size={10} />
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                min={toISODate(addDays(todayDate(), 1))}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-teal-900 bg-slate-50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Calendar size={10} />
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                min={toISODate(addDays(new Date(checkIn), 1))}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-teal-900 bg-slate-50"
              />
            </div>
          </div>

          {/* Nights & Guests Steppers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Nights
              </p>
              <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
                <button
                  onClick={() => handleNightsChange(-1)}
                  disabled={nights <= 1}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-slate-100 transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="text-sm font-bold text-slate-900">
                  {nights}
                </span>
                <button
                  onClick={() => handleNightsChange(1)}
                  disabled={nights >= 30}
                  className="w-7 h-7 rounded-lg bg-teal-900 flex items-center justify-center text-white disabled:opacity-30 hover:bg-teal-800 transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Guests
              </p>
              <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-slate-100 transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="text-sm font-bold text-slate-900">
                  {guests}
                </span>
                <button
                  onClick={() =>
                    setGuests((g) => Math.min(totalCapacity || 1, g + 1))
                  }
                  disabled={totalRooms === 0 || guests >= totalCapacity}
                  className="w-7 h-7 rounded-lg bg-teal-900 flex items-center justify-center text-white disabled:opacity-30 hover:bg-teal-800 transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between bg-teal-50 rounded-xl px-4 py-3 border border-teal-100">
            <div>
              <p className="text-xs text-teal-700 font-bold">
                {totalRooms} room{totalRooms !== 1 ? "s" : ""} · {nights} night{nights !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-teal-600">
                {guests} guest{guests !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="text-xl font-bold text-teal-950">
              {fmt(totalPrice)}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={openModal}
            disabled={totalRooms === 0}
            className="w-full py-4 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-sm font-bold tracking-wide transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {totalRooms === 0 ? "Select a room" : "Reserve Now"} <ChevronRight size={18} />
          </button>

          {/* Trust */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 size={13} className="text-teal-900 shrink-0" />
              <span className="text-xs font-semibold">
                Secure escrow — funds held until check-in
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 size={13} className="text-teal-900 shrink-0" />
              <span className="text-xs font-semibold">
                Free cancellation on most rooms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAYMENT MODAL ── */}
      {modalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full md:w-[520px] bg-white md:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex justify-center pt-3 pb-1 md:hidden shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {step === "confirmation"
                    ? "Booking Confirmed! 🎉"
                    : "Complete Your Booking"}
                </h2>
                <p className="text-xs text-slate-500">
                  {hotel.name} · {totalRooms} Room{totalRooms === 1 ? "" : "s"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {step === "payment" && (
                <>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Summary
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Check-in
                        </p>
                        <p className="font-bold text-slate-900 text-xs mt-0.5">
                          {new Date(checkIn).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Check-out
                        </p>
                        <p className="font-bold text-slate-900 text-xs mt-0.5">
                          {new Date(checkOut).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-sm text-slate-500">
                        {nights}n · {guests} guest{guests !== 1 ? "s" : ""} ·{" "}
                        {totalRooms} Room{totalRooms === 1 ? "" : "s"}
                      </span>
                      <span className="text-xl font-bold text-teal-950">
                        {fmt(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Payment Method
                    </p>
                    <button
                      onClick={() => setPaymentMethod("paystack")}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "paystack" ? "border-teal-900 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <CreditCard size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-900 text-sm">
                          Pay with Paystack
                        </p>
                        <p className="text-xs text-slate-500">
                          Card, USSD, QR, Bank Transfer
                        </p>
                      </div>
                      {paymentMethod === "paystack" && (
                        <CheckCircle2
                          size={20}
                          className="text-teal-900 shrink-0"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank_transfer")}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "bank_transfer" ? "border-teal-900 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Smartphone size={20} className="text-teal-900" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-900 text-sm">
                          Direct Bank Transfer
                        </p>
                        <p className="text-xs text-slate-500">
                          Confirmed within 2 hours of receipt
                        </p>
                      </div>
                      {paymentMethod === "bank_transfer" && (
                        <CheckCircle2
                          size={20}
                          className="text-teal-900 shrink-0"
                        />
                      )}
                    </button>
                    {paymentMethod === "bank_transfer" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <p className="font-bold mb-1.5 text-sm text-amber-800">
                          Bank Details
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-amber-800">
                          <span className="text-amber-600">Bank:</span>
                          <span className="font-bold">GTBank</span>
                          <span className="text-amber-600">Account:</span>
                          <span className="font-bold">0123456789</span>
                          <span className="text-amber-600">Name:</span>
                          <span className="font-bold">Monarch Stay Ltd</span>
                        </div>
                        <p className="mt-2 text-xs text-amber-700">
                          Use your full name as reference.
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}
                </>
              )}

              {step === "confirmation" && (
                <div className="flex flex-col gap-5 items-center text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check
                      size={36}
                      className="text-teal-900"
                      strokeWidth={3}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Booking Request Sent!
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                      Transfer{" "}
                      <strong className="text-teal-900">
                        {fmt(totalPrice)}
                      </strong>{" "}
                      to confirm your stay at {hotel.name}.
                    </p>
                  </div>
                  {bookingResult && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 w-full text-left">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                        Reference
                      </p>
                      <p className="font-mono font-bold text-slate-900">
                        STN-{bookingResult.bookingId?.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  )}
                  {hotel.whatsappNumber && (
                    <a
                      href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, "")}?text=Hi, I made a transfer for booking STN-${bookingResult?.bookingId?.slice(0, 8).toUpperCase()}. Please confirm.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm"
                    >
                      <MessageCircle size={18} /> Confirm via WhatsApp
                    </a>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-sm text-slate-400 hover:text-slate-600 underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {step !== "confirmation" && (
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl shrink-0">
                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing…
                    </>
                  ) : paymentMethod === "paystack" ? (
                    <>
                      Pay {fmt(totalPrice)} with Paystack{" "}
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      Confirm — {fmt(totalPrice)} <Check size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
