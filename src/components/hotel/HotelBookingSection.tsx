"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Plus, Minus, X, BedDouble, Users, Expand, CheckCircle2,
  Calendar, CreditCard, Smartphone, ChevronRight, ArrowRight,
  MessageCircle, Loader2, AlertCircle, Check
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

type SelectedRoom = { room: RoomType; qty: number };
type BookingStep = "rooms" | "dates" | "payment" | "confirmation";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

function toISODate(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function HotelBookingSection({
  hotel,
  rooms,
  isLoggedIn,
}: {
  hotel: Hotel;
  rooms: RoomType[];
  isLoggedIn: boolean;
}) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>("dates");
  const [checkIn, setCheckIn] = useState(toISODate(addDays(today(), 1)));
  const [checkOut, setCheckOut] = useState(toISODate(addDays(today(), 2)));
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "bank_transfer">("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const selectedRooms: SelectedRoom[] = rooms
    .filter((r) => (selected[r.id] || 0) > 0)
    .map((r) => ({ room: r, qty: selected[r.id] }));

  const nights = Math.max(
    1,
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
  );

  const subtotal = selectedRooms.reduce(
    (acc, { room, qty }) => acc + room.pricePerNight * qty * nights,
    0
  );

  const totalRooms = Object.values(selected).reduce((a, b) => a + b, 0);

  const setQty = useCallback((roomId: string, delta: number) => {
    setSelected((prev) => {
      const room = rooms.find((r) => r.id === roomId)!;
      const cur = prev[roomId] || 0;
      const next = Math.max(0, Math.min(room.quantity, cur + delta));
      if (next === 0) {
        const { [roomId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [roomId]: next };
    });
  }, [rooms]);

  const openModal = () => {
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/hotels/${hotel.slug}`;
      return;
    }
    if (selectedRooms.length === 0) return;
    setStep("dates");
    setError(null);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    setStep("dates");
    setError(null);
    setBookingResult(null);
  };

  const handleBook = async () => {
    setLoading(true);
    setError(null);
    try {
      if (paymentMethod === "bank_transfer") {
        // Create booking without Paystack
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            hotelId: hotel.id,
            roomTypeId: selectedRooms[0].room.id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            numberOfGuests: selectedRooms[0].room.capacity,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error?.message || "Booking failed");
        setBookingResult({ type: "bank_transfer", bookingId: data.data.id, amount: subtotal });
        setStep("confirmation");
      } else {
        // Paystack - create booking then redirect
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            hotelId: hotel.id,
            roomTypeId: selectedRooms[0].room.id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            numberOfGuests: selectedRooms[0].room.capacity,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error?.message || "Booking failed");
        if (data.data.authorizationUrl) {
          window.location.href = data.data.authorizationUrl;
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── ROOM CARDS ─────────────────────────────────────── */}
      <div id="rooms" className="flex flex-col gap-4 scroll-mt-36">
        <div>
          <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">Book Your Stay</span>
          <h2 className="font-serif text-2xl text-slate-900 font-bold mt-1">Available Room Types</h2>
          <p className="text-sm text-slate-500 mt-1">Select rooms and quantities, then click Reserve to proceed.</p>
        </div>

        {rooms.length === 0 ? (
          <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 text-center text-slate-500">
            No rooms currently available. Please check back soon.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {rooms.map((room) => {
              const qty = selected[room.id] || 0;
              const img = room.images[0]?.url || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80";
              return (
                <div
                  key={room.id}
                  id={`room-${room.id}`}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col sm:flex-row scroll-mt-36 ${qty > 0 ? "border-teal-900 shadow-md ring-1 ring-teal-900/20" : "border-slate-200 hover:border-slate-300 shadow-sm"}`}
                >
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 sm:h-auto shrink-0 relative overflow-hidden bg-slate-100">
                    <img src={img} alt={room.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <h3 className="text-base font-bold text-slate-900">{room.name}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {room.bedType && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold">
                            <BedDouble size={12} />{room.bedType}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold">
                          <Users size={12} />Sleeps {room.capacity}
                        </span>
                        {room.roomSize && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold">
                            <Expand size={12} />{room.roomSize}m²
                          </span>
                        )}
                      </div>
                      {room.amenities?.slice(0, 4).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {room.amenities.slice(0, 4).map((am, i) => (
                            <span key={i} className="text-[10px] text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full font-semibold">{am}</span>
                          ))}
                          {room.amenities.length > 4 && (
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">+{room.amenities.length - 4} more</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price + Qty */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold text-teal-950">{fmt(room.pricePerNight)}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">/night</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(room.id, -1)}
                          disabled={qty === 0}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30 transition-colors font-bold"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-slate-900">{qty}</span>
                        <button
                          onClick={() => setQty(room.id, 1)}
                          disabled={qty >= room.quantity}
                          className="w-8 h-8 rounded-lg bg-teal-900 hover:bg-teal-800 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Booking Summary Bar */}
        <div className={`sticky bottom-4 z-20 transition-all duration-300 ${totalRooms > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
          <div className="bg-teal-950 text-white rounded-2xl shadow-2xl shadow-teal-900/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">Selected</p>
                <p className="text-base font-bold">
                  {selectedRooms.map(({ room, qty }) => `${qty}× ${room.name}`).join(", ")}
                </p>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <div>
                <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">Subtotal (1 night)</p>
                <p className="text-xl font-bold">{fmt(subtotal / nights)}</p>
              </div>
            </div>
            <button
              onClick={openModal}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Reserve Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── BOOKING MODAL ──────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          {/* Sheet */}
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col animate-[slideUp_0.3s_ease-out]">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-12 h-1 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {step === "confirmation" ? "Booking Confirmed!" : step === "payment" ? "Payment" : "Your Reservation"}
                </h2>
                <p className="text-xs text-slate-500 font-semibold">{hotel.name}</p>
              </div>
              <button onClick={closeModal} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

              {/* ── STEP: DATES ── */}
              {step === "dates" && (
                <div className="p-6 max-w-2xl mx-auto w-full">
                  <div className="flex flex-col gap-6">

                    {/* Date Pickers */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Calendar size={13} />Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          min={toISODate(addDays(today(), 1))}
                          onChange={(e) => {
                            setCheckIn(e.target.value);
                            if (e.target.value >= checkOut) setCheckOut(toISODate(addDays(new Date(e.target.value), 1)));
                          }}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-teal-900"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Calendar size={13} />Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          min={toISODate(addDays(new Date(checkIn), 1))}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-teal-900"
                        />
                      </div>
                    </div>

                    {/* Duration pill */}
                    <div className="flex items-center gap-2 text-sm font-bold text-teal-900 bg-teal-50 px-4 py-2.5 rounded-xl border border-teal-100 w-fit">
                      <Calendar size={16} />{nights} night{nights !== 1 ? "s" : ""}
                    </div>

                    {/* Room Summary */}
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Rooms Selected</p>
                      {selectedRooms.map(({ room, qty }) => (
                        <div key={room.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{qty}× {room.name}</p>
                            <p className="text-xs text-slate-500">{room.bedType} · Sleeps {room.capacity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-teal-950">{fmt(room.pricePerNight * qty * nights)}</p>
                            <p className="text-[10px] text-slate-400">{fmt(room.pricePerNight)}/night × {qty} × {nights}n</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <span className="font-bold text-slate-900">Total</span>
                        <span className="text-2xl font-bold text-teal-950">{fmt(subtotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP: PAYMENT ── */}
              {step === "payment" && (
                <div className="p-6 max-w-2xl mx-auto w-full flex flex-col gap-6">

                  {/* Booking summary recap */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Summary</p>
                    {selectedRooms.map(({ room, qty }) => (
                      <div key={room.id} className="flex justify-between text-sm">
                        <span className="text-slate-700 font-semibold">{qty}× {room.name}</span>
                        <span className="font-bold text-slate-900">{fmt(room.pricePerNight * qty * nights)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-500">{nights} night{nights !== 1 ? "s" : ""} · {new Date(checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })} → {new Date(checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-teal-950">{fmt(subtotal)}</span>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Payment Method</p>
                    <button
                      onClick={() => setPaymentMethod("paystack")}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "paystack" ? "border-teal-900 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#00C3F7]/10 flex items-center justify-center shrink-0">
                        <CreditCard size={20} className="text-[#00C3F7]" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-900 text-sm">Pay with Paystack</p>
                        <p className="text-xs text-slate-500">Card, Bank Transfer, USSD, QR via Paystack</p>
                      </div>
                      {paymentMethod === "paystack" && <CheckCircle2 size={20} className="text-teal-900 shrink-0" />}
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank_transfer")}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "bank_transfer" ? "border-teal-900 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Smartphone size={20} className="text-teal-900" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-900 text-sm">Bank Transfer</p>
                        <p className="text-xs text-slate-500">Pay directly to Stayinn — confirmation on receipt</p>
                      </div>
                      {paymentMethod === "bank_transfer" && <CheckCircle2 size={20} className="text-teal-900 shrink-0" />}
                    </button>

                    {paymentMethod === "bank_transfer" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium">
                        <p className="font-bold mb-1">Bank Details</p>
                        <p>Bank: <strong>GTBank</strong></p>
                        <p>Account: <strong>0123456789</strong></p>
                        <p>Name: <strong>Stayinn Ltd</strong></p>
                        <p className="mt-2 text-xs text-amber-700">Please use your name as payment reference. Your booking will be confirmed within 2 hours of receipt.</p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />{error}
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP: CONFIRMATION ── */}
              {step === "confirmation" && (
                <div className="p-6 max-w-2xl mx-auto w-full flex flex-col gap-6 items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check size={36} className="text-teal-900" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Request Sent!</h3>
                    <p className="text-slate-500 text-sm max-w-sm">Your bank transfer request has been received. Complete the transfer of <strong className="text-teal-900">{fmt(subtotal)}</strong> to confirm your booking.</p>
                  </div>
                  {bookingResult && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 w-full text-left">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-2">Booking Reference</p>
                      <p className="font-mono text-sm font-bold text-slate-900">STN-{bookingResult.bookingId?.slice(0, 8).toUpperCase()}</p>
                    </div>
                  )}
                  {hotel.whatsappNumber && (
                    <a
                      href={`https://wa.me/${hotel.whatsappNumber.replace(/\D/g, "")}?text=Hi, I just made a bank transfer booking (Ref: STN-${bookingResult?.bookingId?.slice(0, 8).toUpperCase()}). Please confirm.`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm"
                    >
                      <MessageCircle size={18} /> Confirm via WhatsApp
                    </a>
                  )}
                  <button onClick={closeModal} className="text-sm text-slate-500 hover:text-slate-700 underline">Close</button>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            {step !== "confirmation" && (
              <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
                <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">{nights} night{nights !== 1 ? "s" : ""} · {selectedRooms.length} room type{selectedRooms.length !== 1 ? "s" : ""}</p>
                    <p className="text-xl font-bold text-teal-950">{fmt(subtotal)}</p>
                  </div>
                  {step === "dates" ? (
                    <button
                      onClick={() => setStep("payment")}
                      className="px-8 py-3.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-white font-bold text-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-teal-900/20"
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleBook}
                      disabled={loading}
                      className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap shadow-lg disabled:opacity-70"
                    >
                      {loading ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : paymentMethod === "paystack" ? <>Pay with Paystack <ChevronRight size={16} /></> : <>Confirm Booking <Check size={16} /></>}
                    </button>
                  )}
                </div>
                {step === "payment" && (
                  <button onClick={() => setStep("dates")} className="mt-2 text-xs text-slate-400 hover:text-slate-600 font-semibold w-full text-center">
                    ← Back to dates
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
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
