"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";

const nav = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/jobseekers", label: "Job Seekers", icon: Users },
  { href: "/admin/vacancies", label: "Vacancies", icon: Briefcase },
  { href: "/admin/cv-review", label: "CV Review Queue", icon: FileText },
  { href: "/admin/employers", label: "Employers & Agencies", icon: Building2 },
  { href: "/admin/intelligence", label: "Labour Intelligence", icon: BarChart3 },
];

interface Props {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex flex-col">
          <IseEkoLogo variant="dark" size="sm" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1 ml-7">
            Ministry Admin
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Admin info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3 bg-[#F8F9FC] rounded-xl px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0B1D6E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            MA
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#111827] truncate">Ministry Admin</p>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-green-500" />
              <p className="text-[10px] text-green-600 font-medium">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#0B1D6E] text-white"
                  : "text-gray-500 hover:text-[#0B1D6E] hover:bg-[#F8F9FC]"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {label === "CV Review Queue" && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
              {label === "Employers & Agencies" && (
                <span className="ml-auto bg-yellow-400 text-[#0B1D6E] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  2
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 border-t border-gray-100 pt-3 flex flex-col gap-0.5">
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-[#0B1D6E] hover:bg-[#F8F9FC] transition-all">
          <Settings className="w-4 h-4 flex-shrink-0" />
          Settings
        </Link>
        <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
