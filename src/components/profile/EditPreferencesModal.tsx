"use client";

import React, { useState } from "react";
import { X, Loader2, CheckCircle2, Zap, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditPreferencesModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { powerRequirement: string | null; internetRequirement: string | null };
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [power, setPower] = useState(user.powerRequirement || "24/7");
  const [internet, setInternet] = useState(user.internetRequirement || "Fiber");

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          powerRequirement: power,
          internetRequirement: internet,
        }),
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
              Edit Preferences
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize your amenity requirements
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
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={14} className="text-orange-500" />
              Power Requirement
            </label>
            <div className="flex flex-col gap-2">
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${power === "24/7" ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <input
                  type="radio"
                  name="power"
                  value="24/7"
                  checked={power === "24/7"}
                  onChange={(e) => setPower(e.target.value)}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-600"
                  disabled={isSaving}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${power === "24/7" ? "text-teal-900" : "text-slate-900"}`}
                  >
                    Strict 24/7 Power
                  </span>
                  <span className="text-xs text-slate-500">
                    Uninterrupted supply guaranteed
                  </span>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${power === "18h+" ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <input
                  type="radio"
                  name="power"
                  value="18h+"
                  checked={power === "18h+"}
                  onChange={(e) => setPower(e.target.value)}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-600"
                  disabled={isSaving}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${power === "18h+" ? "text-teal-900" : "text-slate-900"}`}
                  >
                    Flexible (18h+)
                  </span>
                  <span className="text-xs text-slate-500">
                    Minor scheduled downtimes acceptable
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Wifi size={14} className="text-blue-500" />
              Internet Requirement
            </label>
            <div className="flex flex-col gap-2">
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${internet === "Fiber" ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <input
                  type="radio"
                  name="internet"
                  value="Fiber"
                  checked={internet === "Fiber"}
                  onChange={(e) => setInternet(e.target.value)}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-600"
                  disabled={isSaving}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${internet === "Fiber" ? "text-teal-900" : "text-slate-900"}`}
                  >
                    Enterprise Fiber & Starlink
                  </span>
                  <span className="text-xs text-slate-500">
                    High-speed dedicated bandwidth
                  </span>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${internet === "Standard" ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <input
                  type="radio"
                  name="internet"
                  value="Standard"
                  checked={internet === "Standard"}
                  onChange={(e) => setInternet(e.target.value)}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-600"
                  disabled={isSaving}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${internet === "Standard" ? "text-teal-900" : "text-slate-900"}`}
                  >
                    Standard Broadband
                  </span>
                  <span className="text-xs text-slate-500">
                    Regular browsing and streaming
                  </span>
                </div>
              </label>
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
                "Save Preferences"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
