"use client";

import React, { useState } from 'react';
import { Settings, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SecurityClient({ user }: { user: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handle2FAToggle = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/users/security', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ twoFactorEnabled: !user.twoFactorEnabled }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (formData.password.length < 12) {
      setErrorMsg('Password must be at least 12 characters');
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch('/api/users/security', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ password: '', confirmPassword: '' });
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Security & 2FA</h2>
          <p className="text-slate-500 mt-1">Manage your account security and authentication methods</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-2xl">
        {/* 2FA Section */}
        <div className="flex flex-col sm:flex-row items-start justify-between p-6 bg-slate-50 rounded-xl border border-slate-100 gap-4">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <ShieldCheck className={user.twoFactorEnabled ? "text-teal-600" : "text-slate-400"} size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-slate-500 mt-1 mb-3">Protect your account with an extra layer of security.</p>
              {user.twoFactorEnabled ? (
                <span className="inline-flex px-2 py-1 rounded bg-teal-100 text-teal-800 text-xs font-bold">Active</span>
              ) : (
                <span className="inline-flex px-2 py-1 rounded bg-slate-200 text-slate-600 text-xs font-bold">Disabled</span>
              )}
            </div>
          </div>
          <button 
            onClick={handle2FAToggle}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {user.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>

        {/* Change Password Section */}
        <div className="flex flex-col p-6 bg-white rounded-xl border border-slate-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="mt-1">
              <Settings className="text-slate-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Change Password</h3>
              <p className="text-sm text-slate-500 mt-1">Ensure your password is at least 12 characters and highly secure.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4 ml-10">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                {errorMsg}
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700">New Password</label>
              <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full md:w-2/3 px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-1 focus:ring-teal-900 focus:border-teal-900 transition-colors"
                placeholder="At least 12 characters"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700">Confirm New Password</label>
              <input 
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full md:w-2/3 px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-1 focus:ring-teal-900 focus:border-teal-900 transition-colors"
              />
            </div>

            <div className="mt-2 flex">
              <button 
                type="submit"
                disabled={isSaving || success || !formData.password}
                className={`min-w-[140px] px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm flex items-center justify-center gap-2 ${success ? 'bg-green-600' : 'bg-teal-900 hover:bg-teal-800 disabled:opacity-70'}`}
              >
                {success ? (
                  <>
                    <CheckCircle2 size={16} />
                    Updated!
                  </>
                ) : isSaving && formData.password ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
