"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-28 px-4 pb-20">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-500 font-medium">Join Stayinn as a booker or a host</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100">
              {state.error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Full Name
              </label>
              <input 
                id="fullName"
                name="fullName"
                type="text" 
                required
                placeholder="e.g. John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Phone Number
              </label>
              <input 
                id="phone"
                name="phone"
                type="tel" 
                required
                placeholder="e.g. 08000000000"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Email Address
            </label>
            <input 
              id="email"
              name="email"
              type="email" 
              required
              placeholder="e.g. hello@stayinn.ng"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <input 
              id="password"
              name="password"
              type="password" 
              required
              placeholder="Create a strong password"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-4 pt-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative cursor-pointer">
                <input type="radio" name="role" value="BOOKER" className="peer sr-only" defaultChecked />
                <div className="p-4 rounded-xl border-2 border-gray-200 text-center peer-checked:border-green-600 peer-checked:bg-green-50 transition-all font-semibold text-gray-700 peer-checked:text-green-700">
                  Booker
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input type="radio" name="role" value="HOTEL_MANAGER" className="peer sr-only" />
                <div className="p-4 rounded-xl border-2 border-gray-200 text-center peer-checked:border-green-600 peer-checked:bg-green-50 transition-all font-semibold text-gray-700 peer-checked:text-green-700">
                  Host
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full flex items-center justify-center bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-70 mt-8 group"
          >
            {isPending ? "Creating account..." : "Create Account"}
            {!isPending && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
