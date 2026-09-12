"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
        Something went wrong!
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        We hit an unexpected error while trying to load this page. We've noted
        the issue and are looking into it.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center h-12 px-8 bg-white text-green-600 border border-green-600 rounded-md font-semibold hover:bg-green-50 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
