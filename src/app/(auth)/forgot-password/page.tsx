"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email }),
      });

      if (!res.ok) {
        throw new Error("Failed to request reset");
      }
      
      // We simulate success even if the email wasn't found to prevent email enumeration
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 shadow-inner border border-teal-200">
            <KeyRound size={32} />
          </div>
        </div>
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-slate-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {status === "success" ? (
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Check your inbox</h3>
              <p className="text-sm text-slate-600 mb-6">
                If an account exists with <strong>{email}</strong>, we've sent a password reset link to it. Please check your spam folder if you don't see it.
              </p>
              <Link 
                href="/login" 
                className="w-full flex justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                Return to sign in
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 font-medium text-center">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-900 focus:border-teal-900 sm:text-sm transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-teal-900 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "loading" ? "Sending link..." : "Send reset link"}
                </button>
              </div>
            </form>
          )}

          {status !== "success" && (
            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-900 hover:text-teal-700 transition-colors">
                <ArrowLeft size={16} />
                Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
