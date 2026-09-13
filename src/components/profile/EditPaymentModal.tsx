"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Wallet, CheckCircle2, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditPaymentModal({
  isOpen,
  onClose,
  currentCurrency,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: string;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currency, setCurrency] = useState(currentCurrency);
  const [bankName, setBankName] = useState("Guaranty Trust Bank");
  const [accountNumber, setAccountNumber] = useState("0123456789");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call for saving payment details
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsSaving(false);
        onClose();
        router.refresh();
      }, 1500);
    }, 1000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-xl border border-slate-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Payment & Payouts
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your preferred settlement account
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
        <form onSubmit={handleSave} className="p-5 flex flex-col gap-5">
          {/* Payout Currency Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Settlement Currency
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCurrency("NGN")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                  currency === "NGN"
                    ? "bg-teal-50 border-teal-200 text-teal-900"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                ₦ NGN
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                  currency === "USD"
                    ? "bg-teal-50 border-teal-200 text-teal-900"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Bank Details Area */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="bankName"
                className="text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Bank Name
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  disabled={isSaving}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-sm font-medium text-slate-900 disabled:opacity-60 disabled:bg-slate-50"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="accountNumber"
                className="text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                Account Number
              </label>
              <div className="relative">
                <Wallet
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  disabled={isSaving}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-sm font-medium text-slate-900 disabled:opacity-60 disabled:bg-slate-50"
                  required
                />
              </div>
            </div>
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
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
