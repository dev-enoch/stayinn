"use client";

import React, { useState } from 'react';
import { PencilLine, Wallet, Building2, Globe } from 'lucide-react';
import EditPaymentModal from '@/components/profile/EditPaymentModal';

export default function ProfilePaymentsClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentCurrency = 'NGN'; // Simulated state since we don't have this in DB yet

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Payment & Dom Payouts</h2>
            <p className="text-slate-500 mt-1">Manage your host earnings and payout preferences</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 text-teal-900 font-semibold hover:bg-teal-100 transition-colors"
          >
            <PencilLine size={18} />
            Edit Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Default Currency */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Settlement Currency</span>
            <div className="flex items-center gap-3">
              <Globe className="text-slate-400" size={20} />
              <span className="text-lg font-semibold text-slate-900">{currentCurrency === 'NGN' ? 'Nigerian Naira (NGN)' : 'US Dollars (USD)'}</span>
            </div>
            <span className="text-xs text-slate-400">Default currency for payouts</span>
          </div>

          {/* Bank Info */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bank Name</span>
            <div className="flex items-center gap-3">
              <Building2 className="text-slate-400" size={20} />
              <span className="text-lg font-medium text-slate-900">Guaranty Trust Bank</span>
            </div>
          </div>

          {/* Account Number */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Number</span>
            <div className="flex items-center gap-3">
              <Wallet className="text-slate-400" size={20} />
              <span className="text-lg font-medium text-slate-900">012****789</span>
            </div>
            <span className="text-xs text-slate-400">Receiving dom account</span>
          </div>
        </div>
      </div>

      <EditPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentCurrency={currentCurrency}
      />
    </>
  );
}
