"use client";

import { Bell, Menu, ChevronDown } from "lucide-react";

interface Props {
  onMenuClick?: () => void;
  title?: string;
  subtitle?: string;
}

export default function AdminTopbar({ onMenuClick, title, subtitle }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-6 flex-shrink-0">
      <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-700">
        <Menu className="w-5 h-5" />
      </button>

      <div className="hidden sm:block">
        {title && <h1 className="text-base font-semibold text-[#111827] leading-tight">{title}</h1>}
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Date badge */}
        <div className="hidden md:block bg-[#F8F9FC] border border-gray-100 rounded-xl px-3 py-1.5 text-xs text-gray-500 font-medium">
          May 16, 2026
        </div>

        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1.5 transition">
          <div className="w-8 h-8 rounded-full bg-[#0B1D6E] flex items-center justify-center text-white text-xs font-bold">
            MA
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Ministry Admin</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
