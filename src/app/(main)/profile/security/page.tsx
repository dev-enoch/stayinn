import React from 'react';
import { Settings, ShieldCheck } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Security & 2FA</h2>
          <p className="text-slate-500 mt-1">Manage your account security and authentication methods</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <ShieldCheck className="text-teal-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-slate-500 mt-1 mb-3">Protect your account with an extra layer of security.</p>
              <span className="inline-flex px-2 py-1 rounded bg-teal-100 text-teal-800 text-xs font-bold">Active</span>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            Manage
          </button>
        </div>

        <div className="flex items-start justify-between p-6 bg-white rounded-xl border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Settings className="text-slate-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Change Password</h3>
              <p className="text-sm text-slate-500 mt-1">Ensure your password is at least 12 characters and highly secure.</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
