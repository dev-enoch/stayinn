"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Bell, ChevronDown, User, LogOut, Home, Compass, MapPin } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

export default function Header({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-200" 
            : "bg-transparent"
        }`}
      >
        <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-10 h-10 rounded-xl bg-teal-900 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-800 transition-colors">
                <Home size={22} className="text-white" />
              </span>
              <span className={`font-serif text-xl tracking-tight font-bold ${scrolled ? 'text-teal-900' : 'text-teal-950'}`}>
                Stayinn
              </span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-1 p-1">
              <Link href="/explore" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all">
                Explore Stays
              </Link>
              <Link href="/cities" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all">
                Cities
              </Link>
              <Link href="/host" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all">
                Become a Host
              </Link>
              <Link href="/support" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all">
                Help & Support
              </Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            
            <div className="flex items-center gap-4">
              {/* Currency Status Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider">NGN</span>
                <span className="text-teal-900 font-bold text-sm">₦</span>
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white"></span>
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            {/* Auth/Profile */}
            {!session ? (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-teal-900 transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="px-5 py-2.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-2">
                <Link href="/profile" className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-xs uppercase">
                    {session?.user?.name ? session.user.name.substring(0, 2) : "US"}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
                    {session?.user?.name?.split(' ')[0] || "Account"}
                  </span>
                  <ChevronDown size={16} className="text-slate-400" />
                </Link>
                
                {session?.role === 'ADMIN' && (
                  <Link href="/dashboard/admin" className="text-xs font-bold px-3 py-1.5 rounded-md bg-slate-800 text-white hover:bg-slate-700">Admin</Link>
                )}
                {session?.role === 'HOTEL_MANAGER' && (
                  <Link href="/dashboard/manager" className="text-xs font-bold px-3 py-1.5 rounded-md bg-slate-800 text-white hover:bg-slate-700">Manager</Link>
                )}
                
                <form action={logoutAction}>
                  <button type="submit" className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Log out">
                    <LogOut size={18} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white flex flex-col pt-6 px-6 md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6 text-lg font-medium text-slate-800">
            <Link href="/explore" className="flex items-center gap-3 hover:text-teal-900" onClick={() => setIsMobileMenuOpen(false)}>
              <Compass size={20} className="text-slate-400" /> Explore Stays
            </Link>
            <Link href="/cities" className="flex items-center gap-3 hover:text-teal-900" onClick={() => setIsMobileMenuOpen(false)}>
              <MapPin size={20} className="text-slate-400" /> Cities
            </Link>
            <Link href="/host" className="flex items-center gap-3 hover:text-teal-900" onClick={() => setIsMobileMenuOpen(false)}>
              <Home size={20} className="text-slate-400" /> Become a Host
            </Link>
            <Link href="/support" className="flex items-center gap-3 hover:text-teal-900" onClick={() => setIsMobileMenuOpen(false)}>
              <User size={20} className="text-slate-400" /> Help & Support
            </Link>
            
            <div className="w-full h-px bg-slate-100 my-2"></div>
            
            {!session ? (
              <div className="flex flex-col gap-4">
                <Link href="/login" className="w-full py-3 text-center rounded-xl border border-slate-200 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link href="/register" className="w-full py-3 text-center rounded-xl bg-teal-900 text-white font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/profile" className="w-full py-3 text-center rounded-xl border border-slate-200 font-semibold flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={18} /> Manage Account
                </Link>
                <form action={logoutAction} className="w-full">
                  <button type="submit" className="w-full py-3 text-center rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100">
                    Log out
                  </button>
                </form>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
