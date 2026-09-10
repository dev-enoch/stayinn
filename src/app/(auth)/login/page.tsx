"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  return (
    <div className="flex flex-col w-full text-slate-700">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign in</h1>
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        {state?.error && (
          <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-lg border border-red-100 flex items-start">
            <span className="shrink-0 mr-2">⚠️</span>
            {state.error}
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="identifier" className="text-sm font-medium text-slate-700">Email or Phone:</label>
          <input
            id="identifier" name="identifier" type="text" required autoComplete="username"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-3 md:py-2.5 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors placeholder:text-slate-400 min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">Password:</label>
          <input
            id="password" name="password" type="password" required autoComplete="current-password"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-3 md:py-2.5 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors placeholder:text-slate-400 min-h-[44px]"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link href="/forgot-password" className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors min-h-[44px] inline-flex items-center">
            Forgot Password?
          </Link>
          <button
            type="submit" disabled={isPending}
            className="bg-teal-900 text-white text-sm font-semibold py-3 px-6 rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-70 min-h-[44px]"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <div className="mt-12 text-center text-sm text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link
          href={`/register${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
          className="text-teal-700 font-medium hover:text-teal-900 transition-colors"
        >
          Sign up
        </Link>
      </div>

      <div className="mt-8 text-center text-xs text-slate-500 leading-relaxed">
        By signing in, you agree to our<br />
        <Link href="/support/terms" className="text-teal-700 hover:underline">Terms of Service</Link> and{" "}
        <Link href="/privacy" className="text-teal-700 hover:underline">Privacy Policy</Link>.
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex flex-col w-full text-slate-700"><div className="mb-8 text-center"><h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign in</h1></div></div>}>
      <LoginForm />
    </Suspense>
  );
}
