"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ProfileBackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft size={24} />
    </button>
  );
}
