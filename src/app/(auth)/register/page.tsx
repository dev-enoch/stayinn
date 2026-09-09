"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/app/actions/auth";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full text-slate-700">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign up</h1>
      </div>



      <form action={formAction} className="space-y-4">
        {state?.error && (
          <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-lg border border-red-100 flex items-start">
            <span className="shrink-0 mr-2">⚠️</span>
            {state.error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-xs font-medium text-slate-700">
              Full Name:
            </label>
            <input 
              id="fullName"
              name="fullName"
              type="text" 
              required
              autoComplete="name"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-3 md:py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-slate-700">
              Phone Number:
            </label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              required
              autoComplete="tel"
              pattern="^(\+234|0)\d{10}$"
              title="Must be a valid Nigerian phone number (e.g. 08012345678 or +2348012345678)"
              defaultValue="+234"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-3 md:py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors min-h-[44px]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-slate-700">
            Email Address:
          </label>
          <input 
            id="email"
            name="email"
            type="email" 
            required
            autoComplete="email"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-3 md:py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5 relative">
          <label htmlFor="password" className="text-xs font-medium text-slate-700">
            Password:
          </label>
          <div className="relative">
            <input 
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} 
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-3 md:py-2 pr-10 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors min-h-[44px]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none min-h-[44px] min-w-[44px] justify-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-xs font-medium text-slate-700">
            Account Type:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative cursor-pointer group">
              <input type="radio" name="role" value="BOOKER" className="peer sr-only" defaultChecked />
              <div className="p-3 md:p-2.5 rounded-lg border border-slate-200 bg-white text-center peer-checked:border-green-500 peer-checked:bg-green-50 transition-all font-medium text-xs text-slate-500 peer-checked:text-green-700 group-hover:border-slate-300 min-h-[44px] flex items-center justify-center">
                Booker
              </div>
            </label>
            <label className="relative cursor-pointer group">
              <input type="radio" name="role" value="HOTEL_MANAGER" className="peer sr-only" />
              <div className="p-3 md:p-2.5 rounded-lg border border-slate-200 bg-white text-center peer-checked:border-green-500 peer-checked:bg-green-50 transition-all font-medium text-xs text-slate-500 peer-checked:text-green-700 group-hover:border-slate-300 min-h-[44px] flex items-center justify-center">
                Host
              </div>
            </label>
          </div>
        </div>

        <label className="flex items-start gap-3 pt-2 group cursor-pointer">
          <input type="checkbox" required name="consent" className="mt-1 min-w-[20px] min-h-[20px] accent-green-600 rounded cursor-pointer" />
          <span className="text-xs text-slate-500 leading-relaxed">
            I agree to the <Link href="/support/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>, and consent to the processing of my data in accordance with NDPR.
          </span>
        </label>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-slate-900 text-white text-sm font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-70 border border-slate-900 min-h-[44px]"
          >
            {isPending ? "Creating..." : "Sign Up"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 font-medium hover:text-green-700 transition-colors min-h-[44px] inline-flex items-center">
          Log in
        </Link>
      </div>
    </div>
  );
}
