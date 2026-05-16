"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Top colour strip */}
      <div className="fixed top-0 left-0 right-0 h-1 flex z-50">
        <div className="flex-1 bg-red-500" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-blue-600" />
      </div>

      {/* Left — Hero panel */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-10 overflow-hidden bg-[#0B1D6E]">
        <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full border border-white/10" />
        <div className="absolute top-[-40px] right-[-40px] w-[240px] h-[240px] rounded-full border border-white/10" />
        <div className="absolute bottom-[80px] left-[-100px] w-[320px] h-[320px] rounded-full bg-[#1E3FAE]/30" />
        <div className="absolute bottom-[-80px] right-[40px] w-[260px] h-[260px] rounded-full border border-white/10" />

        <IseEkoLogo variant="light" size="md" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">
              Lagos State
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Find work
            <br />
            in Lagos.
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xs">
            Connect with top employers, recruiters, and training providers
            across Lagos State — all in one platform.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-2">
            {[
              { value: "12k+", label: "Job listings" },
              { value: "3.4k+", label: "Employers" },
              { value: "800+", label: "Artisans" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Job match widget */}
          <div className="mt-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">New job match</span>
              </div>
              <span className="text-xs font-bold bg-yellow-400 text-[#0B1D6E] px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
            <p className="text-white/70 text-xs mb-3">Frontend Developer · Ikeja, Lagos</p>
            <div>
              <p className="text-white/60 text-xs mb-1">Match score</p>
              <p className="text-white font-bold text-2xl">94%</p>
              <div className="flex gap-0.5 mt-1">
                {[8, 6, 7, 9, 8, 7, 9, 10, 9].map((h, i) => (
                  <div key={i} className="w-2 rounded-sm bg-yellow-400" style={{ height: `${h * 2}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/40 text-xs relative z-10">
          © 2026 Lagos State Ministry of Wealth Creation & Employment
        </p>
      </div>

      {/* Right — Login form */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 lg:p-8">
          <IseEkoLogo variant="dark" size="md" />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-[#111827] mb-1">Log in</h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter your credentials to sign in
            </p>

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-[#374151]">Password</label>
                  <a href="#" className="text-sm text-[#1E3FAE] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-[#1E3FAE]"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 select-none">
                  Remember me
                </label>
              </div>

              <Link
                href="/jobseeker/dashboard"
                className="w-full bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white font-semibold py-2.5 rounded-lg text-sm text-center transition-colors mt-1 block"
              >
                Log in
              </Link>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#1E3FAE] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
