"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockUser } from "@/lib/mock/user";
import { useProfile } from "@/lib/profileContext";
import {
  LayoutDashboard,
  Briefcase,
  User,
  FileText,
  GraduationCap,
  ClipboardList,
  Bell,
  LogOut,
  X,
} from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";

const nav = [
  { href: "/jobseeker/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobseeker/jobs", label: "Find Jobs", icon: Briefcase },
  { href: "/jobseeker/applications", label: "Job Applications", icon: ClipboardList },
  { href: "/jobseeker/cv", label: "My CV", icon: FileText },
  { href: "/jobseeker/training", label: "Training & Skills", icon: GraduationCap },
  { href: "/jobseeker/profile", label: "My Profile", icon: User },
];

interface Props {
  onClose?: () => void;
}

export default function JobseekerSidebar({ onClose }: Props) {
  const pathname = usePathname();
  const { profileCompletion, photoUrl } = useProfile();

  return (
    <aside className="w-64 bg-[#0B1D6E] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <IseEkoLogo variant="light" size="sm" />
        {onClose && (
          <button onClick={onClose} className="text-white/60 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User quick info */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-yellow-400 flex items-center justify-center text-[#0B1D6E] font-bold text-sm flex-shrink-0">
            {photoUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              : "AO"
            }
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">Adaeze Okonkwo</p>
            <p className="text-white/50 text-xs truncate">Job Seeker</p>
          </div>
        </div>
        {/* Profile completeness */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/60">Profile complete</span>
            <span className={`font-semibold ${profileCompletion === 100 ? "text-green-400" : "text-yellow-400"}`}>
              {profileCompletion}%
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${profileCompletion === 100 ? "bg-green-400" : "bg-yellow-400"}`}
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {label === "Job Applications" && (
                <span className="ml-auto bg-yellow-400 text-[#0B1D6E] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  4
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 flex flex-col gap-0.5">
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all">
          <Bell className="w-4 h-4 flex-shrink-0" />
          Notifications
          <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">3</span>
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-white/10 transition-all">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
