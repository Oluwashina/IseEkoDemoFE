"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Top colour strip */}
      <div className="fixed top-0 left-0 right-0 h-1 flex z-50">
        <div className="flex-1 bg-red-500" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-blue-600" />
      </div>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-10 overflow-hidden bg-[#071245]">
        {/* Decorative rings */}
        <div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full border border-white/10" />
        <div className="absolute top-[-30px] right-[-30px] w-[220px] h-[220px] rounded-full border border-white/10" />
        <div className="absolute bottom-[60px] left-[-100px] w-[340px] h-[340px] rounded-full bg-[#0B1D6E]/60" />
        <div className="absolute bottom-[-80px] right-[60px] w-[240px] h-[240px] rounded-full border border-white/10" />

        <IseEkoLogo variant="light" size="md" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
              Ministry of Wealth Creation & Employment
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Ministry
            <br />
            <span className="text-yellow-400">Admin Portal</span>
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Restricted access for authorised Lagos State Government administrators only.
            All activity is logged and monitored.
          </p>

          {/* Access level cards */}
          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: ShieldCheck, label: "Platform Governance", sub: "Approve employers, agencies, and training providers" },
              { icon: Lock, label: "CV Review & Validation", sub: "Review and validate job seeker profiles" },
              { icon: ShieldCheck, label: "Labour Intelligence", sub: "Access real-time employment data and policy insights" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-3">
                <Icon className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs relative z-10">
          © 2026 Lagos State Ministry of Wealth Creation & Employment. Authorised access only.
        </p>
      </div>

      {/* Right — Login form */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-6 lg:p-8">
          <IseEkoLogo variant="dark" size="md" />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-full px-3 py-1.5 mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3FAE]" />
              <span className="text-xs font-semibold text-[#1E3FAE]">Restricted — Authorised Personnel Only</span>
            </div>

            <h2 className="text-2xl font-bold text-[#111827] mb-1">Ministry Login</h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter your Ministry credentials to access the admin portal
            </p>

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Ministry Email
                </label>
                <input
                  type="email"
                  placeholder="admin@mwce.lagosstate.gov.ng"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-[#374151]">Password</label>
                  <a href="#" className="text-sm text-[#1E3FAE] hover:underline">
                    Reset password
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Staff ID / Admin Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. MWCE-ADM-0042"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition font-mono tracking-wider"
                />
              </div>

              <Link
                href="/admin/dashboard"
                className="w-full bg-[#0B1D6E] hover:bg-[#071245] text-white font-semibold py-2.5 rounded-lg text-sm text-center transition-colors mt-1 block"
              >
                Access Admin Portal
              </Link>
            </form>

            <div className="mt-6 bg-[#FEF3C7] border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-yellow-600" />
              <p>
                Unauthorised access to this system is prohibited. All login attempts are monitored and recorded.
              </p>
            </div>

            <p className="text-sm text-gray-400 text-center mt-5">
              Not an admin?{" "}
              <Link href="/login" className="text-[#1E3FAE] font-semibold hover:underline">
                Job Seeker login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
