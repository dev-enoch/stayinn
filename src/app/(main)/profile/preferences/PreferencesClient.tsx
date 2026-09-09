"use client";

import React, { useState } from 'react';
import { Bolt, Wifi, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PreferencesClient({ user }: { user: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    powerRequirement: user.powerRequirement || 'NONE',
    internetRequirement: user.internetRequirement || 'NONE',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/users/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsSaving(false);
          router.refresh();
        }, 2000);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Power & Amenity Specs</h2>
          <p className="text-slate-500 mt-1">Set your requirements for power, internet, and estate amenities</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-8 max-w-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Bolt className="text-orange-500" size={24} />
            <h3 className="font-bold text-lg text-slate-900">Power Uptime Guarantee</h3>
          </div>
          <p className="text-sm text-slate-500">Filter your search results to only show properties that meet your specific power requirements.</p>

          <select
            value={formData.powerRequirement}
            onChange={(e) => setFormData({ ...formData, powerRequirement: e.target.value })}
            className="w-full md:w-1/2 p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-1 focus:ring-teal-900 focus:border-teal-900 text-slate-900 font-medium"
          >
            <option value="NONE">No specific requirement</option>
            <option value="24_7_SOLAR">24/7 Solar / Inverter Backup</option>
            <option value="ESTATE_GENERATOR">Estate Generator Backup</option>
            <option value="ANY_BACKUP">Any Backup Solution</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Wifi className="text-blue-500" size={24} />
            <h3 className="font-bold text-lg text-slate-900">Internet Connectivity</h3>
          </div>
          <p className="text-sm text-slate-500">Select the minimum internet speed and reliability you need for work or streaming.</p>

          <select
            value={formData.internetRequirement}
            onChange={(e) => setFormData({ ...formData, internetRequirement: e.target.value })}
            className="w-full md:w-1/2 p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-1 focus:ring-teal-900 focus:border-teal-900 text-slate-900 font-medium"
          >
            <option value="NONE">No specific requirement</option>
            <option value="FIBER_OPTIC">High-Speed Fiber Optic (`{'>'}`50Mbps)</option>
            <option value="STARLINK">Starlink Satellite</option>
            <option value="ANY_WIFI">Any Wi-Fi Connection</option>
          </select>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving || success}
            className={`min-w-[160px] px-6 py-3 rounded-lg font-bold text-white transition-all shadow-sm flex items-center justify-center gap-2 ${success ? 'bg-green-600' : 'bg-teal-900 hover:bg-teal-800 disabled:opacity-70'}`}
          >
            {success ? (
              <>
                <CheckCircle2 size={18} />
                Preferences Saved
              </>
            ) : isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
