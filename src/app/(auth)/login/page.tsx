"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LogIn, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen w-full bg-white overflow-hidden">
      {/* Left side - Image (hidden on small screens) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
        <Image 
          src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury hotel room"
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
          <h2 className="text-4xl font-bold font-serif mb-4">Welcome back to Stayinn.</h2>
          <p className="text-lg text-white/80 max-w-md">Access your bookings, manage your properties, and discover your next extraordinary stay.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto max-h-screen py-12">
        
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Back Button */}
          <Link href="/explore" className="lg:hidden inline-flex items-center text-gray-500 hover:text-gray-900 font-medium mb-12 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Explore
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2 font-serif">Sign In</h1>
            <p className="text-gray-500 font-medium text-lg">Enter your details to access your account.</p>
          </div>

          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100 flex items-start">
                <span className="shrink-0 mr-2 mt-0.5">⚠️</span>
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="identifier" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Email or Phone
              </label>
              <input 
                id="identifier"
                name="identifier"
                type="text" 
                required
                placeholder="e.g. hello@stayinn.ng"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="#" className="text-sm text-green-600 font-bold hover:underline">Forgot?</Link>
              </div>
              <input 
                id="password"
                name="password"
                type="password" 
                required
                placeholder="Enter your password"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-70 group mt-4"
            >
              {isPending ? "Signing in..." : "Sign In"}
              {!isPending && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-10 text-center text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-green-600 font-bold hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
