import React from 'react';
import { Wallet, Plus, CreditCard, Trash2 } from 'lucide-react';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  let savedCards: any[] = [];
  if (token) {
    const session = await verifyAccessToken(token);
    if (session?.userId) {
      savedCards = await prisma.savedCard.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: 'desc' }
      });
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Payment & Payouts</h2>
          <p className="text-slate-500 mt-1">Manage NGN/USD payment methods and host payouts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 text-teal-900 font-semibold hover:bg-teal-100 transition-colors">
          <Plus size={18} />
          Add Method
        </button>
      </div>

      {savedCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <Wallet size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No payment methods added</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            Add a card or bank account for faster bookings and secure host payouts.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {savedCards.map((card) => (
            <div key={card.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                  <CreditCard size={20} className="text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 capitalize">{card.brand} •••• {card.last4}</p>
                  <p className="text-xs text-slate-500">Expires {card.expMonth}/{card.expYear}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
