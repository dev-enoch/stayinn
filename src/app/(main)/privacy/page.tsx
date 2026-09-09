import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, FileText, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Stayinn's privacy policy explains how we collect, use and protect your personal data in compliance with Nigeria's NDPA/NDPR.",
  robots: { index: false, follow: false },
};


export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-20 pb-20">
      <div className="max-w-[800px] mx-auto px-4 md:px-12">
        <div className="mb-12">
          <Link href="/" className="text-teal-900 font-bold hover:underline mb-6 inline-block text-sm">
            &larr; Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-900">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="font-serif text-4xl text-slate-900 font-bold">Privacy Policy</h1>
              <p className="text-slate-500 font-semibold mt-1">Last Updated: September 2026 • NDPR Compliant</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <p className="lead text-lg text-slate-600 font-medium mb-8">
            At Stayinn, your privacy is our priority. This Privacy Policy outlines how we collect, use, process, and protect your personal data in accordance with the Nigeria Data Protection Regulation (NDPR) and other applicable laws.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2">
            <FileText className="text-teal-900" size={24} />
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us when you create an account, verify your identity, book a stay, or communicate with us. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Identity Data:</strong> Full name, date of birth, Government ID (NIN/Passport) for verification.</li>
            <li><strong>Contact Data:</strong> Email address, phone number, and physical address.</li>
            <li><strong>Financial Data:</strong> Payment card details and bank account information (processed securely via Paystack, our payment gateway).</li>
            <li><strong>Profile Data:</strong> Preferences, wishlists, booking history, and feedback.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2">
            <CheckCircle className="text-teal-900" size={24} />
            2. How We Use Your Data
          </h2>
          <p>We use the data collected to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Facilitate your bookings and process payments securely.</li>
            <li>Verify your identity to maintain a safe and secure community for hosts and guests.</li>
            <li>Send essential service updates, booking confirmations, and security alerts.</li>
            <li>Improve our platform's user experience and customer support.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2">
            <Lock className="text-teal-900" size={24} />
            3. Data Security & Storage
          </h2>
          <p>
            We implement state-of-the-art security measures including encryption, firewalls, and secure socket layer (SSL) technology to protect your personal information from unauthorized access, alteration, or disclosure. We retain your data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Sharing of Information</h2>
          <p>
            We do not sell your personal data. We may share necessary information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Hosts:</strong> Only essential details (e.g., name, phone number) to facilitate your stay.</li>
            <li><strong>Service Providers:</strong> Third-party vendors like Paystack for payment processing and identity verification services.</li>
            <li><strong>Legal Authorities:</strong> When required by Nigerian law or to protect our legal rights.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Your NDPR Rights</h2>
          <p>
            Under the NDPR, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data (Right to be Forgotten).</li>
            <li>Object to or restrict the processing of your data.</li>
            <li>Data portability.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions or wish to exercise your data rights, please contact our Data Protection Officer at:
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-4">
            <p className="font-bold text-slate-900 mb-1">Stayinn Privacy Team</p>
            <p className="text-slate-600">Email: <a href="mailto:privacy@stayinn.ng" className="text-teal-900 hover:underline">privacy@stayinn.ng</a></p>
            <p className="text-slate-600">Phone: +234 813 000 7829</p>
          </div>
        </div>
      </div>
    </div>
  );
}
