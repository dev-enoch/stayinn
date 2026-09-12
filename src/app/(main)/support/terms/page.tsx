import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SupportTermsPage() {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-gray-500">Last Updated: October 24, 2024</p>
      </div>

      {/* Table of Contents Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contents</h2>
          <ul className="space-y-3">
            <li>
              <a
                className="text-green-600 hover:text-green-700 transition-colors underline-offset-4 hover:underline font-medium"
                href="#acceptance"
              >
                1. Acceptance of Terms
              </a>
            </li>
            <li>
              <a
                className="text-green-600 hover:text-green-700 transition-colors underline-offset-4 hover:underline font-medium"
                href="#responsibilities"
              >
                2. User Responsibilities
              </a>
            </li>
            <li>
              <a
                className="text-green-600 hover:text-green-700 transition-colors underline-offset-4 hover:underline font-medium"
                href="#booking"
              >
                3. Booking Policy
              </a>
            </li>
            <li>
              <a
                className="text-green-600 hover:text-green-700 transition-colors underline-offset-4 hover:underline font-medium"
                href="#liability"
              >
                4. Liability
              </a>
            </li>
          </ul>
        </div>
      </div>

      <article className="space-y-8 text-gray-700 leading-relaxed">
        <section className="scroll-mt-32" id="acceptance">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing or using the Monarch Stay platform, you agree to be
            bound by these Terms of Service. If you do not agree to all the
            terms and conditions, you may not access the platform or use any
            services. These terms constitute a legally binding agreement between
            you and Monarch Stay.
          </p>
          <p>
            We reserve the right to update, change or replace any part of these
            Terms of Service by posting updates and/or changes to our website.
            It is your responsibility to check this page periodically for
            changes. Your continued use of or access to the website following
            the posting of any changes constitutes acceptance of those changes.
          </p>
        </section>

        <hr className="border-gray-100" />

        <section className="scroll-mt-32" id="responsibilities">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. User Responsibilities
          </h2>
          <p className="mb-4">
            As a user of our platform, you agree to provide accurate, current,
            and complete information during the registration process and to
            update such information to keep it accurate, current, and complete.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
            <li>You are responsible for safeguarding your password.</li>
            <li>You agree not to disclose your password to any third party.</li>
            <li>
              You must notify us immediately upon becoming aware of any breach
              of security or unauthorized use of your account.
            </li>
            <li>
              You agree not to use the platform for any illegal or unauthorized
              purpose.
            </li>
          </ul>
        </section>

        <hr className="border-gray-100" />

        <section className="scroll-mt-32" id="booking">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Booking Policy
          </h2>
          <p className="mb-4">
            When you make a booking through Monarch Stay, you agree to pay all
            charges associated with the booking, including the accommodation
            rate, applicable fees, and taxes.
          </p>

          <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600 my-6">
            <p className="font-semibold text-green-800 mb-2">
              Cancellation Policy Summary:
            </p>
            <p className="text-sm text-green-900/80">
              Cancellations made 48 hours prior to the check-in date are
              eligible for a full refund. Cancellations made within 48 hours
              will incur a fee equivalent to the first night's stay.
            </p>
          </div>
        </section>

        <hr className="border-gray-100" />

        <section className="scroll-mt-32" id="liability">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Liability
          </h2>
          <p className="mb-4">
            Monarch Stay acts solely as a platform to facilitate bookings
            between guests and hosts. We do not own, operate, or manage the
            properties listed on our platform.
          </p>
          <p>
            To the maximum extent permitted by law, Monarch Stay shall not be
            liable for any indirect, incidental, special, consequential or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses, resulting from your access to or use of
            or inability to access or use the platform.
          </p>
        </section>
      </article>

      {/* Mobile-only quick navigation to other help pages */}
      <div className="mt-12 md:hidden pt-8 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Other Helpful Links
        </h3>
        <div className="space-y-3">
          <Link
            href="/support"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">Help Home</span>
            <ArrowRight size={16} className="text-gray-400" />
          </Link>
          <Link
            href="/support/safety"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">Safety Guide</span>
            <ArrowRight size={16} className="text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
