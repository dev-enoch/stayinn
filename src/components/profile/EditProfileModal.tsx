"use client";

import React, { useState } from 'react';
import { X, Loader2, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditProfileModal({ 
  isOpen, 
  onClose, 
  user 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  user: { fullName: string; email: string; phone: string | null }
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsSaving(false);
          onClose();
          router.refresh();
        }, 1500);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
            <p className="text-sm text-slate-500 mt-1">Update your personal and contact details</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-6">
          
          {/* Avatar Area */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 shadow-sm border-2 border-white">
              <User size={32} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button type="button" className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                  Change Photo
                </button>
                <button type="button" className="px-4 py-1.5 text-xs font-semibold rounded-lg text-red-600 hover:bg-red-50">
                  Remove
                </button>
              </div>
              <p className="text-xs text-slate-400">JPG, PNG under 5MB</p>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-900 focus:ring-1 focus:ring-teal-900 transition-colors text-slate-900 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 text-sm font-medium cursor-not-allowed"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-teal-700 text-xs font-bold bg-teal-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={12} />
                  Verified
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="flex relative">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-semibold">
                  +234
                </span>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="812 345 6789"
                  className="w-full px-4 py-2.5 rounded-r-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-900 focus:ring-1 focus:ring-teal-900 transition-colors text-slate-900 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 flex items-start gap-3 border border-slate-100 mt-2">
            <ShieldCheck className="text-teal-900 shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-slate-600 leading-relaxed">
              Profile updates automatically sync with our partnered estate security protocols for seamless gate clearance.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSaving || success}
              className={`min-w-[140px] px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm flex items-center justify-center gap-2 ${success ? 'bg-green-600' : 'bg-teal-900 hover:bg-teal-800 disabled:opacity-70'}`}
            >
              {success ? (
                <>
                  <CheckCircle2 size={16} />
                  Saved!
                </>
              ) : isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
