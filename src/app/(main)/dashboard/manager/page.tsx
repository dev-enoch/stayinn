import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, CreditCard, CalendarCheck, Hotel, QrCode } from "lucide-react";

export default async function ManagerDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "HOTEL_MANAGER") {
    redirect("/login");
  }

  const dbHotel = await prisma.hotel.findFirst({
    where: { managerId: session.userId },
    include: {
      bookings: {
        where: { status: { in: ['PAID', 'CONFIRMED', 'COMPLETED'] } },
        orderBy: { createdAt: 'desc' },
        include: { roomType: true, user: true }
      }
    }
  });

  const hotel = dbHotel ? {
    id: dbHotel.id,
    name: dbHotel.name,
    status: dbHotel.status,
    totalEarnings: dbHotel.bookings.reduce((sum, b) => sum + (b.totalAmount * 0.9), 0),
    pendingCheckins: dbHotel.bookings.filter(b => b.status === 'PAID').length,
    bookingsCount: dbHotel.bookings.length,
    bookings: dbHotel.bookings.map(booking => ({
      id: booking.id,
      guestName: booking.user.fullName,
      roomName: booking.roomType.name,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      status: booking.status,
      payoutAmount: (booking.totalAmount * 0.9),
    }))
  } : null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // If they don't have a hotel yet, prompt them to create one
  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
            <Hotel size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to your Dashboard</h1>
          <p className="text-gray-500 mb-8">You haven't registered a hotel yet. Let's get your property listed on Stayinn.</p>
          <Link href="/dashboard/manager/setup" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors">
            Register Property
          </Link>
        </div>
      </div>
    );
  }

  const totalEarnings = hotel.totalEarnings;
  const pendingCheckins = hotel.pendingCheckins;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{hotel.name} Dashboard</h1>
            <p className="text-gray-500 mt-1">Status: <span className={`font-bold ${hotel.status === 'APPROVED' ? 'text-green-600' : 'text-orange-500'}`}>{hotel.status}</span></p>
          </div>
          <Link href="/dashboard/manager/scanner" className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors flex items-center gap-2">
            <QrCode size={20} />
            Scan Check-in QR
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(totalEarnings)}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <CalendarCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{hotel.bookingsCount}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Pending Check-ins</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCheckins}</p>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Guest</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Room</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Check In/Out</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Payout</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hotel.bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{booking.guestName}</td>
                    <td className="p-4 text-gray-600">{booking.roomName}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(booking.checkInDate).toLocaleDateString()} &mdash; {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-gray-900">{formatPrice(booking.payoutAmount)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        booking.status === 'PAID' ? 'bg-orange-100 text-orange-700' :
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {hotel.bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No bookings yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
