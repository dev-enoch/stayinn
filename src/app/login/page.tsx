"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4 pb-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
            <LogIn size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 font-medium">Sign in to your Stayinn account</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100">
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
              <Link href="#" className="text-sm text-green-600 font-medium hover:underline">Forgot?</Link>
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
            className="w-full flex items-center justify-center bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-70 group"
          >
            {isPending ? "Signing in..." : "Sign In"}
            {!isPending && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600 font-medium">
          Don't have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
