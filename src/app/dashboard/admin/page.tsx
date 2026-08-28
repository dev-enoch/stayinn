import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Building2, CheckCircle, Clock, XCircle, Settings, BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const [hotels, bookings] = await Promise.all([
    prisma.hotel.findMany({
      orderBy: { createdAt: 'desc' },
      include: { manager: true }
    }),
    prisma.booking.findMany({
      where: { status: { in: ["PAID", "CONFIRMED", "COMPLETED"] } }
    })
  ]);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalCommission = totalRevenue * 0.10; // 10% platform fee

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pendingHotels = hotels.filter(h => h.status === "PENDING");
  const approvedHotels = hotels.filter(h => h.status === "APPROVED");

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Platform Admin</h1>
            <p className="text-gray-500 mt-1">Manage hotels and view global analytics</p>
          </div>
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Settings size={20} />
            Platform Settings
          </button>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
              <BarChart3 size={20} />
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Building2 size={20} />
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Platform Commission</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(totalCommission)}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={20} />
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Live Hotels</p>
            <p className="text-2xl font-bold text-gray-900">{approvedHotels.length}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <Clock size={20} />
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Pending Approval</p>
            <p className="text-2xl font-bold text-gray-900">{pendingHotels.length}</p>
          </div>
        </div>

        {/* Hotels Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Hotel Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Hotel Name</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Manager</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Location</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Status</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hotels.map(hotel => (
                  <tr key={hotel.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{hotel.name}</td>
                    <td className="p-4 text-gray-600">{hotel.manager.fullName}</td>
                    <td className="p-4 text-gray-600">{hotel.address}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        hotel.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        hotel.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {hotel.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {hotel.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-green-50 text-green-600 font-bold text-xs rounded-full hover:bg-green-100">Approve</button>
                          <button className="px-3 py-1 bg-red-50 text-red-600 font-bold text-xs rounded-full hover:bg-red-100">Reject</button>
                        </div>
                      )}
                      {hotel.status === 'APPROVED' && (
                        <button className="px-3 py-1 bg-red-50 text-red-600 font-bold text-xs rounded-full hover:bg-red-100">Suspend</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
