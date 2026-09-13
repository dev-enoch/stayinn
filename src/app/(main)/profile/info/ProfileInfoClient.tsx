"use client";

import React, { useState } from "react";
import { Mail, Phone, BadgeCheck, PencilLine } from "lucide-react";
import EditProfileModal from "@/components/profile/EditProfileModal";

type UserInfo = { fullName: string; email: string; phone: string | null; role?: string; };
export default function ProfileInfoClient({ user }: { user: UserInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Personal Info</h2>
            <p className="text-slate-500 mt-1">
              Manage your identity and contact details
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 text-teal-900 font-semibold hover:bg-teal-100 transition-colors"
          >
            <PencilLine size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legal Name */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Legal Name
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-slate-900">
                {user.fullName}
              </span>
              <BadgeCheck className="text-teal-600" size={18} />
            </div>
            <span className="text-xs text-slate-400">Verified via BVN</span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </span>
            <div className="flex items-center gap-3">
              <Mail className="text-slate-400" size={20} />
              <span className="text-lg font-medium text-slate-900">
                {user.email}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Primary contact for bookings
            </span>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Phone Number
            </span>
            <div className="flex items-center gap-3">
              <Phone className="text-slate-400" size={20} />
              <span className="text-lg font-medium text-slate-900">
                {user.phone ? `+234 ${user.phone}` : "Not provided"}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Used for gate clearance
            </span>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Account Type
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex px-3 py-1 bg-slate-100 rounded-md text-sm font-semibold text-slate-700">
                {user.role === "HOTEL_MANAGER"
                  ? "Host"
                  : user.role === "ADMIN"
                    ? "Admin"
                    : "Guest"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
}
