"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, User } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

export default function Header({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out border-b border-gray-100">
        <div className="flex justify-between items-center px-4 md:px-12 h-20 max-w-[1280px] mx-auto">
          <button 
            className="text-green-600 md:hidden hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 rounded-full p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="font-bold text-2xl tracking-tighter text-green-600 cursor-pointer">
            STAYINN
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-lg">Explore</Link>
            {session?.role === 'HOTEL_MANAGER' && (
              <Link href="/dashboard/manager" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-lg">Dashboard</Link>
            )}
            {session?.role === 'ADMIN' && (
              <Link href="/dashboard/admin" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-lg">Admin</Link>
            )}
            
            {!session ? (
              <Link href="/login" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-lg">Sign In</Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-lg flex items-center gap-1.5">
                  <User size={18} /> Account
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className="text-gray-600 hover:text-red-600 transition-colors font-medium text-lg">
                    Log out
                  </button>
                </form>
              </div>
            )}
          </nav>
          
          <button className="text-green-600 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 rounded-full p-2">
            <Search size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white flex flex-col pt-8 px-8 space-y-8 md:hidden overflow-y-auto pb-24 shadow-xl">
          <Link 
            href="/explore" 
            className="text-xl font-medium text-gray-800 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore Properties
          </Link>
          <Link 
            href="/about" 
            className="text-xl font-medium text-gray-800 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            href="/host" 
            className="text-xl font-medium text-gray-800 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Host your Home
          </Link>
          <Link 
            href="/support" 
            className="text-xl font-medium text-gray-800 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Support Center
          </Link>
          <div className="pt-8 border-t border-gray-100">
            <Link 
              href="/login" 
              className="w-full text-center inline-block bg-gray-900 text-white font-semibold py-4 px-10 rounded-full hover:bg-green-600 transition-colors text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
