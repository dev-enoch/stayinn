import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle, AlertCircle, ArrowLeft, Download, Calendar as CalendarIcon, MapPin } from "lucide-react";

export default async function BookingDetailPage(
  props: { params: Promise<{ id: string }>, searchParams: Promise<{ status?: string }> }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (!session) {
    redirect(`/login?callbackUrl=/bookings/${params.id}`);
  }

  const dbBooking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { hotel: true, roomType: true, user: true }
  });

  if (!dbBooking) {
    notFound();
  }

  // Format amount back to NGN for UI (if db stores in kobo)
  const booking = {
    ...dbBooking,
    totalAmount: dbBooking.totalAmount / 100
  };

  // Ensure user owns this booking, or is hotel manager for this hotel, or is admin
  if (booking.userId !== session.userId && session.role !== "ADMIN" && session.role !== "HOTEL_MANAGER") {
    redirect("/explore");
  }

  const isSuccess = searchParams.status === "success" || booking.status === "PAID" || booking.status === "CONFIRMED";
  const isFailed = searchParams.status === "failed" || booking.status === "CANCELLED";

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const nights = Math.ceil(
    (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-28 pb-32">
      <div className="max-w-[800px] mx-auto px-4 md:px-0">
        
        <Link href="/explore" className="inline-flex items-center text-gray-500 hover:text-green-600 font-medium mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Explore
        </Link>

        {isSuccess ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                <CheckCircle size={40} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-500 font-medium">Your stay at {booking.hotel.name} is all set.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: QR Code (The Ticket) */}
              <div className="flex flex-col items-center justify-center bg-gray-50 rounded-3xl p-8 border border-gray-200">
                <p className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Your Digital Key</p>
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                  {booking.qrData ? (
                    <QRCodeSVG value={booking.qrData} size={200} level="H" />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-gray-100 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
                      <span className="text-gray-400 text-sm font-medium">Generating...</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 text-center max-w-[200px]">
                  Present this code to the receptionist at check-in.
                </p>
                <button className="mt-6 flex items-center justify-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors">
                  <Download size={18} /> Save Ticket
                </button>
              </div>

              {/* Right: Booking Details */}
              <div className="space-y-6">
                <h3 className="font-bold text-xl text-gray-900 border-b border-gray-100 pb-4">Reservation Details</h3>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Dates</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(booking.checkInDate).toLocaleDateString()} &mdash; {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="text-gray-900 font-medium">{booking.hotel.name}</p>
                    <p className="text-sm text-gray-500">{booking.hotel.address}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Paid</span>
                    <span className="font-bold text-2xl text-gray-900">{formatPrice(booking.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isFailed ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-red-100 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 mb-6">
              <AlertCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Payment Failed</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't process your payment. Don't worry, no charges were made.
            </p>
            <Link 
              href={`/book/${booking.roomTypeId}`}
              className="bg-gray-900 text-white font-bold py-4 px-8 rounded-full hover:bg-green-600 transition-colors inline-block"
            >
              Try Again
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Processing...</h1>
            <p className="text-gray-500">Please wait while we verify your payment with Paystack.</p>
          </div>
        )}
      </div>
    </div>
  );
}
