"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";
import { mockLGAs } from "@/lib/mock/jobs";

const steps = [
  "Personal Info",
  "Education & Skills",
  "Identity Verification",
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);

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
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-10 overflow-hidden bg-[#0B1D6E] relative">
        <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full border border-white/10" />
        <div className="absolute bottom-[80px] left-[-100px] w-[320px] h-[320px] rounded-full bg-[#1E3FAE]/30" />

        <IseEkoLogo variant="light" size="md" />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">Lagos State</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Start your
            <br />
            journey today.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Join 14,000+ registered job seekers and artisans on ISE EKO — the
            official Lagos State Digital Job Centre.
          </p>

          {/* Steps indicator */}
          <div className="flex flex-col gap-3 mt-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i < step
                      ? "bg-green-400 text-white"
                      : i === step
                      ? "bg-yellow-400 text-[#0B1D6E]"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm ${
                    i === step ? "text-white font-semibold" : "text-white/50"
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-xs relative z-10">
          © 2026 Lagos State Ministry of Wealth Creation & Employment
        </p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-6 lg:p-8">
          <IseEkoLogo variant="dark" size="md" />
        </div>

        <div className="flex-1 flex items-start justify-center px-6 pb-12 pt-4">
          <div className="w-full max-w-lg">
            {/* Mobile step bar */}
            <div className="flex gap-1 mb-6 lg:hidden">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i <= step ? "bg-[#1E3FAE]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs font-semibold text-[#1E3FAE] uppercase tracking-widest mb-1">
              Step {step + 1} of {steps.length}
            </p>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">
              {steps[step]}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {step === 0 && "Provide your basic personal information"}
              {step === 1 && "Tell us about your education and key skills"}
              {step === 2 && "Verify your identity to activate your account"}
            </p>

            {/* Step 0: Personal Info */}
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">First Name</label>
                    <input type="text" placeholder="e.g. Adaeze" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Last Name</label>
                    <input type="text" placeholder="e.g. Okonkwo" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Email Address</label>
                  <input type="email" placeholder="email@example.com" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="08012345678" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Date of Birth</label>
                    <input type="date" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Gender</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white">
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">LGA of Residence</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white">
                        {mockLGAs.filter(l => l !== "All LGAs").map((lga) => (
                          <option key={lga}>{lga}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Create a strong password" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Disability inclusion */}
                <div className="bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-xl p-4 flex items-start gap-3">
                  <input
                    id="disability"
                    type="checkbox"
                    checked={hasDisability}
                    onChange={(e) => setHasDisability(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#1E3FAE]"
                  />
                  <div>
                    <label htmlFor="disability" className="text-sm font-semibold text-[#0B1D6E] select-none">
                      I have a disability or special need
                    </label>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Tagging enables inclusive job matching and dedicated support pathways.
                    </p>
                  </div>
                </div>
                {hasDisability && (
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Type of Disability</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white">
                        <option value="">Select type</option>
                        <option>Visual impairment</option>
                        <option>Hearing impairment</option>
                        <option>Physical/mobility</option>
                        <option>Cognitive/learning</option>
                        <option>Speech impairment</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Education & Skills */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Highest Level of Education</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white">
                      <option value="">Select level</option>
                      <option>WAEC/NECO/GCE</option>
                      <option>OND</option>
                      <option>HND</option>
                      <option>Bachelor's Degree (BSc/BA/BEng)</option>
                      <option>Master's Degree</option>
                      <option>PhD/Doctorate</option>
                      <option>Trade/Vocational Certificate</option>
                      <option>No formal education</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Course / Field of Study</label>
                  <input type="text" placeholder="e.g. Computer Science, Tailoring, etc." className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Current Employment Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Unemployed", "Underemployed", "Self-employed", "Student"].map((s) => (
                      <label key={s} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer hover:border-[#1E3FAE] hover:bg-[#EEF2FF] transition">
                        <input type="radio" name="status" className="accent-[#1E3FAE]" />
                        <span className="text-sm text-gray-700">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    Key Skills <span className="text-gray-400 font-normal">(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Python", "Marketing", "Accounting", "Tailoring", "Plumbing", "Carpentry", "Sales", "Teaching", "Nursing", "Data Analysis", "Driving", "Cooking/Catering", "Graphic Design", "Electrical"].map((skill) => (
                      <label key={skill} className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1 cursor-pointer hover:border-[#1E3FAE] hover:bg-[#EEF2FF] transition text-sm text-gray-700">
                        <input type="checkbox" className="accent-[#1E3FAE] w-3 h-3" />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Work Preference</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Full-time", "Part-time", "Contract", "Remote", "Hybrid", "On-site"].map((p) => (
                      <label key={p} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer hover:border-[#1E3FAE] hover:bg-[#EEF2FF] transition">
                        <input type="checkbox" className="accent-[#1E3FAE]" />
                        <span className="text-sm text-gray-700">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div className="bg-[#FEF3C7] border border-yellow-300 rounded-xl p-4 text-sm text-yellow-800">
                  <strong>Data Privacy Notice:</strong> Your NIN/BVN is used strictly for identity verification
                  in accordance with NDPR guidelines. It will not be shared with employers.
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    National Identification Number (NIN)
                  </label>
                  <input type="text" maxLength={11} placeholder="11-digit NIN" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition tracking-widest font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    Bank Verification Number (BVN) <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input type="text" maxLength={11} placeholder="11-digit BVN" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition tracking-widest font-mono" />
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input type="checkbox" id="terms" className="mt-0.5 w-4 h-4 accent-[#1E3FAE]" />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-[#1E3FAE] hover:underline font-medium">Terms of Use</a>{" "}
                    and{" "}
                    <a href="#" className="text-[#1E3FAE] hover:underline font-medium">Privacy Policy</a>
                    {" "}of the ISE EKO Digital Job Center.
                  </label>
                </div>

                <div className="bg-[#DCFCE7] border border-green-200 rounded-xl p-4 text-sm text-green-800 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>After registration, a verification code will be sent to your phone number and email address.</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                >
                  Continue
                </button>
              ) : (
                <Link
                  href="/jobseeker/dashboard"
                  className="flex-1 bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors text-center"
                >
                  Create Account
                </Link>
              )}
            </div>

            <p className="text-sm text-gray-500 text-center mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1E3FAE] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
