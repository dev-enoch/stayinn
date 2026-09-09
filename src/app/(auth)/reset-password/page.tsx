"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset", token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }
      
      setStatus("success");
      // Redirect after a few seconds
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An error occurred");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow-xl sm:rounded-2xl border border-slate-100 text-center">
          <h2 className="text-xl font-bold text-slate-900">Invalid Link</h2>
          <p className="mt-2 text-sm text-slate-600 mb-6">This password reset link is missing or invalid.</p>
          <Link href="/forgot-password" className="text-teal-900 font-bold hover:underline">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 shadow-inner border border-teal-200">
            <KeyRound size={32} />
          </div>
        </div>
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-slate-900">
          Create new password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Your new password must be different from previous used passwords.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {status === "success" ? (
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Password Reset Complete</h3>
              <p className="text-sm text-slate-600 mb-6">
                Your password has been successfully reset. Redirecting to login...
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 font-medium text-center">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                  New Password
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-900 focus:border-teal-900 sm:text-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700">
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-900 focus:border-teal-900 sm:text-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading" || !password || !confirmPassword}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-teal-900 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "loading" ? "Resetting..." : "Reset password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </React.Suspense>
  );
}
