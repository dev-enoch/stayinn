"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function ProfileBackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="w-9 h-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
      aria-label="Go back"
    >
      <ChevronLeft size={20} />
    </button>
  );
}
