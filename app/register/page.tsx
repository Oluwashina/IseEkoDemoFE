"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Eye, EyeOff, ChevronDown,
  Users, Wrench, Building2, Briefcase, GraduationCap, BarChart3,
  ArrowRight, Lock, Search, CheckCircle, XCircle, Loader2,
  ShieldCheck, RefreshCw,
} from "lucide-react";
import IseEkoLogo from "@/components/ui/IseEkoLogo";
import { mockLGAs } from "@/lib/mock/jobs";

// ─── Demo credentials ────────────────────────────────────────────────────────
// Valid:   NIN 12345678901  |  LASSRA LSR-2024-001234
// Invalid: anything else

const DEMO_VALID_NIN     = "12345678901";
const DEMO_VALID_LASSRA  = "LSR-2024-001234";

const MOCK_PROFILE = {
  firstName:   "Adaeze",
  lastName:    "Okonkwo",
  dateOfBirth: "1999-04-12",
  gender:      "Female",
  stateOfOrigin: "Lagos",
  lga:         "Ikeja",
  phone:       "08012345678",
};

// ─── User types ───────────────────────────────────────────────────────────────

const userTypes = [
  {
    id: "jobseeker",
    icon: Users,
    label: "Job Seeker",
    description: "Find jobs, get your CV validated, and access training opportunities across Lagos State.",
    active: true,
    count: "14,782 registered",
    badge: null,
  },
  {
    id: "artisan",
    icon: Wrench,
    label: "Artisan",
    description: "Get formally recognised, build your client profile, and access tools & equipment support.",
    active: false,
    count: "800+ artisans",
    badge: "Coming Soon",
  },
  {
    id: "employer",
    icon: Building2,
    label: "Employer",
    description: "Post verified vacancies, search Ministry-validated candidates, and manage applications.",
    active: false,
    count: "634 employers",
    badge: "Coming Soon",
  },
  {
    id: "recruiter",
    icon: Briefcase,
    label: "Recruitment Agency",
    description: "Source and place candidates across industries. Track placements and manage compliance.",
    active: false,
    count: "Licensed agencies",
    badge: "Coming Soon",
  },
  {
    id: "training",
    icon: GraduationCap,
    label: "Training Provider",
    description: "List your programmes, issue digital certificates, and reach thousands of Lagos learners.",
    active: false,
    count: "47 programmes live",
    badge: "Coming Soon",
  },
  {
    id: "researcher",
    icon: BarChart3,
    label: "Researcher",
    description: "Access anonymised labour market data for policy research and workforce insights.",
    active: false,
    count: "NDPR compliant data",
    badge: "Coming Soon",
  },
];

// ─── Registration steps ───────────────────────────────────────────────────────

const steps = [
  "Identity Lookup",
  "Personal Details",
  "Education & Skills",
];

type VerifyState = "idle" | "loading" | "otp" | "success" | "error";

// ─── Component ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [phase, setPhase] = useState<"select" | "form">("select");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);

  // Identity lookup state
  const [idType, setIdType]       = useState<"nin" | "lassra">("nin");
  const [idValue, setIdValue]     = useState("");
  const [verifyState, setVerifyState] = useState<VerifyState>("idle");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError]   = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Pre-populated profile from lookup
  const [prefilled, setPrefilled] = useState<typeof MOCK_PROFILE | null>(null);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const handleVerify = () => {
    const val = idValue.trim();
    const valid =
      (idType === "nin"    && val === DEMO_VALID_NIN) ||
      (idType === "lassra" && val.toUpperCase() === DEMO_VALID_LASSRA);

    setVerifyState("loading");
    setTimeout(() => {
      if (valid) {
        setVerifyState("otp");
      } else {
        setVerifyState("error");
      }
    }, 1800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otpValues];
    next[index] = value.slice(-1);
    setOtpValues(next);
    setOtpError(false);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const code = otpValues.join("");
    // Any 6-digit code works in demo
    if (code.length === 6) {
      setVerifyState("success");
      setPrefilled(MOCK_PROFILE);
    } else {
      setOtpError(true);
    }
  };

  const resetVerify = () => {
    setVerifyState("idle");
    setIdValue("");
    setOtpValues(["", "", "", "", "", ""]);
    setOtpError(false);
    setPrefilled(null);
  };

  // ── Left panel ──────────────────────────────────────────────────────────────

  const leftPanel = (
    <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-10 overflow-hidden bg-[#0B1D6E] relative flex-shrink-0">
      <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full border border-white/10" />
      <div className="absolute bottom-[80px] left-[-100px] w-[320px] h-[320px] rounded-full bg-[#1E3FAE]/30" />

      <IseEkoLogo variant="light" size="md" />

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center gap-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">Lagos State</span>
        </div>
        <h2 className="text-4xl font-bold text-white leading-tight">
          {phase === "select"
            ? <>Who are<br />you joining as?</>
            : <>Start your<br />journey today.</>}
        </h2>
        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
          {phase === "select"
            ? "ISE EKO serves multiple user types across Lagos State. Select the category that best describes you."
            : "Join 14,000+ registered job seekers on ISE EKO — the official Lagos State Digital Job Centre."}
        </p>

        {phase === "form" && (
          <div className="flex flex-col gap-3 mt-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i < step
                    ? "bg-green-400 text-white"
                    : i === step
                    ? "bg-yellow-400 text-[#0B1D6E]"
                    : "bg-white/20 text-white/50"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm ${i === step ? "text-white font-semibold" : "text-white/50"}`}>{s}</span>
              </div>
            ))}
          </div>
        )}

        {phase === "select" && (
          <div className="flex flex-col gap-2.5 mt-4">
            {[
              { label: "Job Seekers registered", value: "14,782" },
              { label: "Employers verified",     value: "634" },
              { label: "Training programmes",    value: "47" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between bg-white/10 border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-white/60 text-xs">{label}</span>
                <span className="text-white font-bold text-sm">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Demo hint box */}
        {phase === "form" && step === 0 && (
          <div className="mt-4 bg-yellow-400/15 border border-yellow-400/30 rounded-xl p-4">
            <p className="text-yellow-300 text-xs font-bold mb-2 uppercase tracking-wider">Demo Credentials</p>
            <div className="flex flex-col gap-1.5 text-xs text-white/70">
              <div>
                <span className="text-white/50">Valid NIN:</span>{" "}
                <span className="font-mono text-yellow-300">12345678901</span>
              </div>
              <div>
                <span className="text-white/50">Valid LASSRA:</span>{" "}
                <span className="font-mono text-yellow-300">LSR-2024-001234</span>
              </div>
              <div className="mt-1 text-white/40">Any other value will return "not found". OTP: any 6 digits.</div>
            </div>
          </div>
        )}
      </div>

      <p className="text-white/40 text-xs relative z-10">
        © 2026 Lagos State Ministry of Wealth Creation & Employment
      </p>
    </div>
  );

  // ── PHASE: Select user type ─────────────────────────────────────────────────

  if (phase === "select") {
    return (
      <div className="min-h-screen flex">
        <ColourStrip />
        {leftPanel}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          <div className="p-6 lg:p-8"><IseEkoLogo variant="dark" size="md" /></div>
          <div className="flex-1 flex items-start justify-center px-6 pb-12 pt-2 overflow-y-auto">
            <div className="w-full max-w-xl">
              <p className="text-xs font-semibold text-[#1E3FAE] uppercase tracking-widest mb-1">Step 1 — Account Type</p>
              <h2 className="text-2xl font-bold text-[#111827] mb-1">I want to join as a…</h2>
              <p className="text-sm text-gray-500 mb-6">
                Select the option that best describes you. Only Job Seeker registration is open at this time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {userTypes.map(({ id, icon: Icon, label, description, active, count, badge }) => {
                  const isSelected = selectedType === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => active && setSelectedType(id)}
                      disabled={!active}
                      className={`relative text-left rounded-2xl border-2 p-4 transition-all ${
                        !active
                          ? "cursor-not-allowed opacity-60 border-gray-200 bg-gray-50"
                          : isSelected
                          ? "border-[#1E3FAE] bg-[#EEF2FF] shadow-md shadow-[#1E3FAE]/10"
                          : "border-gray-200 hover:border-[#1E3FAE]/40 hover:bg-[#EEF2FF]/30 cursor-pointer"
                      }`}
                    >
                      {badge && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          <Lock className="w-2.5 h-2.5" />{badge}
                        </span>
                      )}
                      {isSelected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#1E3FAE] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? "bg-[#1E3FAE]" : "bg-gray-200"}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <p className={`font-semibold text-sm mb-0.5 ${active ? "text-[#111827]" : "text-gray-400"}`}>{label}</p>
                          <p className={`text-xs leading-relaxed ${active ? "text-gray-500" : "text-gray-400"}`}>{description}</p>
                          <p className={`text-xs font-semibold mt-2 ${active ? "text-[#1E3FAE]" : "text-gray-400"}`}>{count}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => selectedType && setPhase("form")}
                disabled={!selectedType}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all ${
                  selectedType
                    ? "bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue as {selectedType ? userTypes.find((u) => u.id === selectedType)?.label : "…"}
                {selectedType && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-sm text-gray-500 text-center mt-5">
                Already have an account?{" "}
                <Link href="/login" className="text-[#1E3FAE] font-semibold hover:underline">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PHASE: Form ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex">
      <ColourStrip />
      {leftPanel}

      <div className="flex-1 flex flex-col bg-white min-w-0">
        <div className="p-6 lg:p-8"><IseEkoLogo variant="dark" size="md" /></div>

        <div className="flex-1 flex items-start justify-center px-6 pb-12 pt-2 overflow-y-auto">
          <div className="w-full max-w-lg">
            {/* Mobile step bar */}
            <div className="flex gap-1 mb-5 lg:hidden">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-[#1E3FAE]" : "bg-gray-200"}`} />
              ))}
            </div>

            {/* Account type pill */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-full px-3 py-1">
                <Users className="w-3 h-3 text-[#1E3FAE]" />
                <span className="text-xs font-semibold text-[#1E3FAE]">Job Seeker</span>
              </div>
              <button
                onClick={() => { setPhase("select"); setStep(0); resetVerify(); }}
                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition"
              >
                Change account type
              </button>
            </div>

            <p className="text-xs font-semibold text-[#1E3FAE] uppercase tracking-widest mb-1">
              Step {step + 1} of {steps.length}
            </p>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">{steps[step]}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {step === 0 && "Enter your NIN or LASSRA number to verify your identity and auto-fill your details"}
              {step === 1 && "Review and complete your personal information — some fields have been pre-filled"}
              {step === 2 && "Tell us about your education and key skills"}
            </p>

            {/* ── STEP 0: Identity Lookup ──────────────────────────────────── */}
            {step === 0 && (
              <div className="flex flex-col gap-4">

                {/* ID type toggle */}
                {verifyState === "idle" || verifyState === "error" ? (
                  <>
                    <div className="flex bg-[#F1F5F9] rounded-xl p-1 gap-1">
                      {(["nin", "lassra"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => { setIdType(t); setIdValue(""); setVerifyState("idle"); }}
                          className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${
                            idType === t ? "bg-white text-[#0B1D6E] shadow-sm" : "text-gray-400"
                          }`}
                        >
                          {t === "nin" ? "NIN" : "LASSRA ID"}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">
                        {idType === "nin" ? "National Identification Number (NIN)" : "LASSRA ID Number"}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={idValue}
                          onChange={(e) => { setIdValue(e.target.value); setVerifyState("idle"); }}
                          placeholder={idType === "nin" ? "e.g. 12345678901" : "e.g. LSR-2024-001234"}
                          maxLength={idType === "nin" ? 11 : 18}
                          className={`w-full border rounded-xl px-4 py-3 text-sm font-mono tracking-wider outline-none transition pr-10 ${
                            verifyState === "error"
                              ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/15"
                              : "border-gray-200 focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15"
                          }`}
                        />
                        {idValue && (
                          <button
                            type="button"
                            onClick={() => { setIdValue(""); setVerifyState("idle"); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5">
                        {idType === "nin"
                          ? "Your 11-digit NIN as issued by NIMC"
                          : "Your Lagos State Residents Registration Agency ID"}
                      </p>
                    </div>

                    {verifyState === "error" && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-700">Identity not found</p>
                          <p className="text-xs text-red-500 mt-0.5">
                            The {idType === "nin" ? "NIN" : "LASSRA ID"} you entered could not be verified.
                            Please check the number and try again.
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleVerify}
                      disabled={!idValue.trim()}
                      className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all ${
                        idValue.trim()
                          ? "bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      Verify Identity
                    </button>
                  </>
                ) : null}

                {/* Loading state */}
                {verifyState === "loading" && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-[#1E3FAE] animate-spin" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[#111827]">Verifying your identity…</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Checking against {idType === "nin" ? "NIMC" : "LASSRA"} database
                      </p>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {["Connecting", "Verifying", "Fetching details"].map((t, i) => (
                        <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
                          {i > 0 && <span className="text-gray-200">›</span>}
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* OTP state */}
                {verifyState === "otp" && (
                  <div className="flex flex-col gap-4">
                    <div className="bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-xl p-4 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#1E3FAE] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#0B1D6E]">OTP sent to your registered phone</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          A 6-digit code has been sent to the phone number linked to your{" "}
                          {idType === "nin" ? "NIN" : "LASSRA ID"}.
                          Enter it below to confirm your identity.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-3">
                        Enter 6-digit OTP
                      </label>
                      <div className="flex gap-2 justify-between">
                        {otpValues.map((val, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={val}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition ${
                              otpError
                                ? "border-red-400 bg-red-50 text-red-600"
                                : val
                                ? "border-[#1E3FAE] bg-[#EEF2FF] text-[#0B1D6E]"
                                : "border-gray-200 focus:border-[#1E3FAE]"
                            }`}
                          />
                        ))}
                      </div>
                      {otpError && (
                        <p className="text-xs text-red-500 mt-2">Please enter all 6 digits</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Didn&apos;t receive it?{" "}
                        <button className="text-[#1E3FAE] font-semibold hover:underline">
                          Resend OTP
                        </button>
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={resetVerify}
                        className="flex items-center gap-1.5 border border-gray-200 text-gray-600 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Try again
                      </button>
                      <button
                        onClick={handleOtpSubmit}
                        className="flex-1 bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                      >
                        Confirm OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* Success state */}
                {verifyState === "success" && prefilled && (
                  <div className="flex flex-col gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-700">Identity verified successfully</p>
                        <p className="text-xs text-green-600 mt-0.5">
                          Your details have been retrieved from the{" "}
                          {idType === "nin" ? "NIMC" : "LASSRA"} database and pre-filled below.
                        </p>
                      </div>
                    </div>

                    {/* Pre-filled preview card */}
                    <div className="border border-gray-100 rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0B1D6E] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {prefilled.firstName[0]}{prefilled.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#111827]">{prefilled.firstName} {prefilled.lastName}</p>
                          <p className="text-xs text-gray-500">
                            {prefilled.gender} · Born {prefilled.dateOfBirth}
                          </p>
                        </div>
                        <span className="ml-auto text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        {[
                          { label: "State",       value: prefilled.stateOfOrigin },
                          { label: "LGA",         value: prefilled.lga },
                          { label: "Phone",       value: prefilled.phone },
                          { label: idType === "nin" ? "NIN" : "LASSRA ID",
                            value: idType === "nin"
                              ? `•••••••${idValue.slice(-4)}`
                              : idValue.toUpperCase() },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-[#F8F9FC] rounded-lg px-3 py-2">
                            <p className="text-gray-400 mb-0.5">{label}</p>
                            <p className="font-semibold text-[#111827]">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 1: Personal Details ─────────────────────────────────── */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                {prefilled && (
                  <div className="bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-[#1E3FAE]">
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    Some fields have been pre-filled from your verified identity record. You can still update them.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">First Name</label>
                    <input
                      type="text"
                      defaultValue={prefilled?.firstName}
                      placeholder="e.g. Adaeze"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Last Name</label>
                    <input
                      type="text"
                      defaultValue={prefilled?.lastName}
                      placeholder="e.g. Okonkwo"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue={prefilled?.phone}
                      placeholder="08012345678"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Date of Birth</label>
                    <input
                      type="date"
                      defaultValue={prefilled?.dateOfBirth}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Gender</label>
                    <div className="relative">
                      <select
                        defaultValue={prefilled?.gender}
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white"
                      >
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
                      <select
                        defaultValue={prefilled?.lga}
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white"
                      >
                        {mockLGAs.filter((l) => l !== "All LGAs").map((lga) => (
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
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition pr-10"
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

            {/* ── STEP 2: Education & Skills ───────────────────────────────── */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Highest Level of Education</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/15 transition appearance-none bg-white">
                      <option value="">Select level</option>
                      <option>WAEC/NECO/GCE</option>
                      <option>OND</option>
                      <option>HND</option>
                      <option>Bachelor&apos;s Degree (BSc/BA/BEng)</option>
                      <option>Master&apos;s Degree</option>
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
              </div>
            )}

            {/* ── Navigation ───────────────────────────────────────────────── */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (step === 0) { setPhase("select"); resetVerify(); }
                  else setStep(step - 1);
                }}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Back
              </button>

              {step === 0 ? (
                // On step 0, Continue is only enabled after successful verification
                <button
                  onClick={() => setStep(1)}
                  disabled={verifyState !== "success"}
                  className={`flex-1 font-semibold py-2.5 rounded-lg text-sm transition-colors ${
                    verifyState === "success"
                      ? "bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              ) : step < steps.length - 1 ? (
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
              <Link href="/login" className="text-[#1E3FAE] font-semibold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ColourStrip() {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 flex z-50">
      <div className="flex-1 bg-red-500" />
      <div className="flex-1 bg-yellow-400" />
      <div className="flex-1 bg-green-500" />
      <div className="flex-1 bg-blue-600" />
    </div>
  );
}
