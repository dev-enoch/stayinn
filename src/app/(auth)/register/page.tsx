"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, UserPlus, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="flex lg:flex-row-reverse min-h-screen w-full bg-white overflow-hidden">
      {/* Right side - Image (hidden on small screens) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
        <Image 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury hotel lobby"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <Link href="/explore" className="inline-flex items-center text-white/80 hover:text-white font-medium mb-6 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Explore
          </Link>
          <h2 className="text-4xl font-bold font-serif mb-4">Join the Stayinn community.</h2>
          <p className="text-lg text-white/80 max-w-md">Create an account to unlock exclusive rates, manage your properties, and experience seamless booking.</p>
        </div>
      </div>

      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto max-h-screen py-12">
        <div className="w-full max-w-xl mx-auto">
          {/* Mobile Back Button */}
          <Link href="/explore" className="lg:hidden inline-flex items-center text-gray-500 hover:text-gray-900 font-medium mb-12 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Explore
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2 font-serif">Create Account</h1>
            <p className="text-gray-500 font-medium text-lg">Join Stayinn as a booker or a host</p>
          </div>

          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100 flex items-start">
                <span className="shrink-0 mr-2 mt-0.5">⚠️</span>
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
                  <div className="p-4 rounded-xl border-2 border-gray-200 text-center peer-checked:border-green-600 peer-checked:bg-green-50 transition-all font-bold text-gray-700 peer-checked:text-green-700">
                    Booker
                  </div>
                </label>
                <label className="relative cursor-pointer">
                  <input type="radio" name="role" value="HOTEL_MANAGER" className="peer sr-only" />
                  <div className="p-4 rounded-xl border-2 border-gray-200 text-center peer-checked:border-green-600 peer-checked:bg-green-50 transition-all font-bold text-gray-700 peer-checked:text-green-700">
                    Host
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-70 mt-8 group"
            >
              {isPending ? "Creating account..." : "Create Account"}
              {!isPending && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-10 text-center text-gray-600 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
