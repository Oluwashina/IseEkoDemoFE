"use client";

import { Bell, Menu, Search } from "lucide-react";

interface Props {
  onMenuClick?: () => void;
  title?: string;
}

export default function JobseekerTopbar({ onMenuClick, title }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-6 flex-shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-500 hover:text-gray-700"
      >
        <Menu className="w-5 h-5" />
      </button>

      {title && (
        <h1 className="text-base font-semibold text-[#111827] hidden sm:block">
          {title}
        </h1>
      )}

      {/* Search */}
      <div className="flex-1 max-w-sm ml-auto lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs, skills, training..."
            className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#0B1D6E] flex items-center justify-center text-white text-xs font-bold">
          AO
        </div>
      </div>
    </header>
  );
}
