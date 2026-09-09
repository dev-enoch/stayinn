"use client";

import React, { useState } from 'react';
import { PencilLine, ShieldCheck, KeyRound } from 'lucide-react';
import EditSecurityModal from '@/components/profile/EditSecurityModal';

export default function ProfileSecurityClient({ user }: { user: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Security & 2FA</h2>
            <p className="text-slate-500 mt-1">Manage your account access and protection</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 text-teal-900 font-semibold hover:bg-teal-100 transition-colors"
          >
            <PencilLine size={18} />
            Edit Security
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 2FA Status */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Two-Factor Auth</span>
            <div className="flex items-center gap-3 mt-1">
              <ShieldCheck className={user.twoFactorEnabled ? "text-teal-600" : "text-slate-400"} size={20} />
              <span className="text-lg font-semibold text-slate-900">
                {user.twoFactorEnabled ? 'Active' : 'Disabled'}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {user.twoFactorEnabled ? 'Extra security layer is enabled' : 'Recommended: Enable for extra protection'}
            </span>
          </div>

          {/* Password Status */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</span>
            <div className="flex items-center gap-3 mt-1">
              <KeyRound className="text-slate-400" size={20} />
              <span className="text-lg font-medium text-slate-900">••••••••</span>
            </div>
            <span className="text-xs text-slate-400">Last changed recently</span>
          </div>
        </div>
      </div>

      <EditSecurityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user}
      />
    </>
  );
}
