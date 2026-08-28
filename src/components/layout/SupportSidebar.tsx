"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShieldCheck, FileText, HeadphonesIcon } from "lucide-react";

export default function SupportSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Help Home",
      href: "/support",
      icon: <Home size={18} />,
      // Exact match for the root support page
      isActive: pathname === "/support",
    },
    {
      name: "Safety Guide",
      href: "/support/safety",
      icon: <ShieldCheck size={18} />,
      isActive: pathname.startsWith("/support/safety"),
    },
    {
      name: "Terms of Service",
      href: "/support/terms",
      icon: <FileText size={18} />,
      isActive: pathname.startsWith("/support/terms"),
    },
    {
      name: "Contact Us",
      href: "/support/contact",
      icon: <HeadphonesIcon size={18} />,
      isActive: pathname.startsWith("/support/contact"),
    },
  ];

  return (
    <nav className="hidden md:flex flex-col p-4 bg-gray-50 border border-gray-100 rounded-xl h-fit w-72 sticky top-28 shrink-0">
      <div className="mb-6 px-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Help & Support</h2>
      </div>
      
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                link.isActive 
                  ? "bg-green-50 text-green-700 font-semibold" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
