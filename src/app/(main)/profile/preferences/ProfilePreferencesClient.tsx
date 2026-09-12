"use client";

import React, { useState } from "react";
import { PencilLine, Zap, Wifi } from "lucide-react";
import EditPreferencesModal from "@/components/profile/EditPreferencesModal";

export default function ProfilePreferencesClient({ user }: { user: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Power & Amenity Specs
            </h2>
            <p className="text-slate-500 mt-1">
              Configure your minimum stay requirements
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 text-teal-900 font-semibold hover:bg-teal-100 transition-colors"
          >
            <PencilLine size={18} />
            Edit Preferences
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Power Requirement */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Power Supply
            </span>
            <div className="flex items-center gap-3 mt-1">
              <Zap
                className={
                  user.powerRequirement === "24/7"
                    ? "text-orange-500"
                    : "text-slate-400"
                }
                size={20}
              />
              <span className="text-lg font-semibold text-slate-900">
                {user.powerRequirement === "24/7"
                  ? "Strict 24/7 Power"
                  : user.powerRequirement === "18h+"
                    ? "Flexible (18h+)"
                    : "Strict 24/7 Power"}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {user.powerRequirement === "24/7"
                ? "Uninterrupted supply guaranteed"
                : "Minor scheduled downtimes acceptable"}
            </span>
          </div>

          {/* Internet Info */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Internet Speed
            </span>
            <div className="flex items-center gap-3 mt-1">
              <Wifi
                className={
                  user.internetRequirement === "Fiber"
                    ? "text-blue-500"
                    : "text-slate-400"
                }
                size={20}
              />
              <span className="text-lg font-medium text-slate-900">
                {user.internetRequirement === "Fiber"
                  ? "Enterprise Fiber & Starlink"
                  : user.internetRequirement === "Standard"
                    ? "Standard Broadband"
                    : "Enterprise Fiber & Starlink"}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {user.internetRequirement === "Fiber"
                ? "High-speed dedicated bandwidth"
                : "Regular browsing and streaming"}
            </span>
          </div>
        </div>
      </div>

      <EditPreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
}
