"use client";

import React, { useState } from "react";
import { X, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditSecurityModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { twoFactorEnabled: boolean };
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user.twoFactorEnabled,
  );

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twoFactorEnabled }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsSaving(false);
          onClose();
          router.refresh();
        }, 1500);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-xl border border-slate-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Security Settings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your account protection
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-teal-100 bg-teal-50">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-teal-700" size={20} />
              <span className="font-bold text-teal-900 text-sm">
                Two-Factor Authentication
              </span>
            </div>
            <p className="text-xs text-teal-800/80 leading-relaxed">
              Enhance your account security by requiring an SMS or authenticator
              code when logging in from new devices.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  disabled={isSaving}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                <span className="ml-3 text-sm font-bold text-slate-700">
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
          </div>

          {/* Password Change placeholder */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Update Password
            </label>
            <button
              type="button"
              className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              disabled={isSaving}
            >
              Send Password Reset Link
            </button>
            <p className="text-[10px] text-slate-400 mt-1">
              We&apos;ll send a secure link to your registered email
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 mt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="min-w-[120px] px-5 py-2.5 rounded-lg bg-teal-900 text-white text-sm font-bold shadow-sm hover:bg-teal-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                success ? (
                  <>
                    <CheckCircle2 size={18} className="text-teal-300" /> Saved
                  </>
                ) : (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving...
                  </>
                )
              ) : (
                "Update Security"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
