import React from 'react';
import { Bolt } from 'lucide-react';

export default function PreferencesPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Power & Amenity Specs</h2>
          <p className="text-slate-500 mt-1">Set your requirements for power, internet, and estate amenities</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <Bolt size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">No strict preferences set</h3>
        <p className="text-slate-500 max-w-sm">
          You will see all properties regardless of their power uptime guarantees or fiber connectivity.
        </p>
      </div>
    </div>
  );
}
