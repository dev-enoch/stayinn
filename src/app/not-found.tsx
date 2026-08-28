import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
        <Compass size={40} strokeWidth={1.5} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Looks like you're lost</h1>
      <p className="text-lg text-gray-500 max-w-md mx-auto mb-8">
        We can't seem to find the page you're looking for. The good news is, there are plenty of incredible stays waiting for you back home.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center h-12 px-8 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors shadow-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
