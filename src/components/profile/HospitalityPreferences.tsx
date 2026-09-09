import React from 'react';
import { SlidersHorizontal, Banknote, KeyRound, ChefHat } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export default async function HospitalityPreferences() {
  const session = await getSession();

  let preferences: any = null;
  if (session) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.userId }
      });
      if (user) {
        preferences = {
          billing: { 
            title: "NGN (₦ Naira)", // Defaulting since currency is not in schema
            desc: "Direct bank transfers & Card billing" 
          },
          estate: { 
            title: "Automated Pass", 
            desc: "WhatsApp QR delivery to driver & guest" 
          },
          chef: { 
            title: "On-call Private Chef", 
            desc: "Selected meal preferences applied" 
          }
        };
      }
    } catch (error) {
      console.error("Failed to fetch preferences", error);
    }
  }

  // Use default preferences for display if none returned (as they are usually set to defaults rather than strictly empty)
  // But if requested empty state:
  if (!preferences) {
    preferences = {
      billing: { title: "NGN (₦ Naira)", desc: "Direct bank transfers & Card billing" },
      estate: { title: "Automated Pass", desc: "WhatsApp QR delivery to driver & guest" },
      chef: { title: "On-call Private Chef", desc: "Pescatarian • Jollof & Grill preference" }
    };
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-6 border border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-900">
          <SlidersHorizontal size={24} />
          <h2 className="text-xl font-semibold text-slate-900">Nigerian Hospitality & Security Preferences</h2>
        </div>
        <button className="text-xs font-bold text-orange-600 hover:underline" type="button">
          Edit Preferences
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl bg-slate-50 flex flex-col gap-3 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Billing & Currency</span>
            <Banknote className="text-teal-900" size={18} />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900">{preferences.billing.title}</span>
            <p className="text-xs text-slate-500 mt-1">{preferences.billing.desc}</p>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-slate-50 flex flex-col gap-3 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Estate Clearance</span>
            <KeyRound className="text-teal-900" size={18} />
          </div>
          <div>
            <span className="text-sm font-bold text-teal-900">{preferences.estate.title}</span>
            <p className="text-xs text-slate-500 mt-1">{preferences.estate.desc}</p>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-slate-50 flex flex-col gap-3 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Chef & Dining</span>
            <ChefHat className="text-orange-500" size={18} />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900">{preferences.chef.title}</span>
            <p className="text-xs text-slate-500 mt-1">{preferences.chef.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HospitalityPreferencesSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-200"></div>
          <div className="h-6 w-64 bg-slate-200 rounded"></div>
        </div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-28 bg-slate-100 rounded-xl"></div>
        <div className="h-28 bg-slate-100 rounded-xl"></div>
        <div className="h-28 bg-slate-100 rounded-xl"></div>
      </div>
    </div>
  );
}
