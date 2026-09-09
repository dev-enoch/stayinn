"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="flex flex-col w-full text-slate-700">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign up</h1>
      </div>

      {/* SSO Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <button type="button" className="flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors shadow-sm">
            <Mail size={20} className="text-red-500" />
          </div>
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700">Google</span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Or</span>
        <div className="flex-1 h-px bg-slate-200"></div>
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
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
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
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
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
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-medium text-slate-700">
            Password:
          </label>
          <input 
            id="password"
            name="password"
            type="password" 
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-xs font-medium text-slate-700">
            Account Type:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative cursor-pointer group">
              <input type="radio" name="role" value="BOOKER" className="peer sr-only" defaultChecked />
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white text-center peer-checked:border-green-500 peer-checked:bg-green-50 transition-all font-medium text-xs text-slate-500 peer-checked:text-green-700 group-hover:border-slate-300">
                Booker
              </div>
            </label>
            <label className="relative cursor-pointer group">
              <input type="radio" name="role" value="HOTEL_MANAGER" className="peer sr-only" />
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white text-center peer-checked:border-green-500 peer-checked:bg-green-50 transition-all font-medium text-xs text-slate-500 peer-checked:text-green-700 group-hover:border-slate-300">
                Host
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-slate-900 text-white text-sm font-semibold py-2 px-6 rounded hover:bg-slate-800 transition-colors disabled:opacity-70 border border-slate-900"
          >
            {isPending ? "Creating..." : "Sign Up"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 font-medium hover:text-green-700 transition-colors">
          Log in
        </Link>
      </div>

      <div className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
        By signing up, you acknowledge that you agree to our<br/>
        <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and{" "}
        <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>.
      </div>
    </div>
  );
}
