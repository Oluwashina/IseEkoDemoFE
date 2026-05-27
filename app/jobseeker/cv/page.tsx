"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload, FileText, CheckCircle, AlertCircle, TrendingUp,
  Download, Loader2, Sparkles, ScanLine, Shield, RefreshCw,
  Award, Zap, XCircle, Info, ChevronDown, Search, Plus,
} from "lucide-react";
import { mockUser } from "@/lib/mock/user";

// ─── Mock ATS data ────────────────────────────────────────────────────────────

const ATS_SECTIONS = [
  {
    label:    "Contact Information",
    score:    95,
    icon:     "👤",
    feedback: "Name, email, and phone clearly present. Consider adding a LinkedIn or portfolio URL.",
  },
  {
    label:    "Professional Summary",
    score:    38,
    icon:     "📝",
    feedback: "No objective or summary section detected. Add 3–4 sentences at the top of your CV — this is the first thing recruiters read.",
  },
  {
    label:    "Work Experience",
    score:    76,
    icon:     "💼",
    feedback: "Experience is present but lacks quantified achievements. Replace vague descriptions with numbers (e.g. 'reduced load time by 40%').",
  },
  {
    label:    "Education",
    score:    92,
    icon:     "🎓",
    feedback: "Degree, institution, and dates are clearly formatted. Well structured.",
  },
  {
    label:    "Skills & Keywords",
    score:    81,
    icon:     "⚡",
    feedback: "Good technical coverage. Missing several high-frequency keywords found in job descriptions for your target roles.",
  },
  {
    label:    "Formatting & Structure",
    score:    65,
    icon:     "📐",
    feedback: "Possible multi-column layout or table detected. ATS scanners prefer single-column plain text to avoid misreading sections.",
  },
];

const MATCHED_KEYWORDS = [
  "React", "JavaScript", "TypeScript", "CSS", "HTML",
  "Git", "Node.js", "Agile", "REST API", "Team Collaboration",
  "Problem Solving", "UI/UX",
];
const MISSING_KEYWORDS = [
  "Next.js", "CI/CD", "Testing", "Accessibility",
  "Performance Optimisation", "Docker", "PostgreSQL", "Figma",
];

const PRIORITY_FIXES = [
  {
    level: "critical",
    label: "Critical",
    bg:    "bg-red-50",
    border:"border-red-200",
    dot:   "bg-red-500",
    text:  "text-red-700",
    items: [
      "Add a professional summary or objective (3–4 sentences) at the very top of your CV.",
      "Replace vague experience descriptions with quantified achievements (e.g. 'built a dashboard used by 2,000+ users').",
    ],
  },
  {
    level: "important",
    label: "Should Fix",
    bg:    "bg-yellow-50",
    border:"border-yellow-200",
    dot:   "bg-yellow-500",
    text:  "text-yellow-700",
    items: [
      "Add missing keywords: Next.js, CI/CD, Testing — these appear in 70%+ of tech job descriptions.",
      "Include a LinkedIn URL and portfolio / GitHub link in your contact section.",
      "Use a single-column layout to ensure ATS can read every section correctly.",
    ],
  },
  {
    level: "minor",
    label: "Nice to Have",
    bg:    "bg-blue-50",
    border:"border-blue-100",
    dot:   "bg-blue-400",
    text:  "text-blue-700",
    items: [
      "Ensure consistent date formatting throughout (e.g. Jan 2023 – Mar 2024).",
      "Start each bullet point with a strong action verb (built, led, designed, improved).",
      "Keep CV to 1–2 pages; recruiters spend an average of 7 seconds on a first scan.",
    ],
  },
];

type SubmitStage = "idle" | "submitting" | "submitted";

function getValidationSteps(validated: boolean, submitted: boolean) {
  return [
    { label: "Received", done: validated || submitted },
    { label: "Queued",   done: validated || submitted },
    { label: "Reviewed", done: validated              },
    { label: "Validated",done: validated              },
  ];
}

type UploadStage = "idle" | "uploading" | "parsing" | "extracting" | "done";

// ─── Score colours ─────────────────────────────────────────────────────────

function scoreColor(s: number) {
  if (s >= 80) return { bar: "bg-green-500",  text: "text-green-700",  label: "Excellent" };
  if (s >= 60) return { bar: "bg-[#1E3FAE]",  text: "text-[#1E3FAE]", label: "Good"      };
  if (s >= 40) return { bar: "bg-yellow-400", text: "text-yellow-700", label: "Fair"      };
  return             { bar: "bg-red-500",     text: "text-red-600",    label: "Poor"      };
}

// ─── Circular ATS score ring ──────────────────────────────────────────────

function ATSRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const { bar } = scoreColor(score);
  const strokeColor = bar.includes("green") ? "#22c55e"
                    : bar.includes("red")   ? "#ef4444"
                    : bar.includes("yellow")? "#f59e0b"
                    :                         "#1E3FAE";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#f3f4f6" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke={strokeColor} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-[#0B1D6E]">{score}</span>
          <span className="text-xs text-gray-400 font-medium">/ 100</span>
        </div>
      </div>
      <p className={`text-xs font-bold mt-2 ${scoreColor(score).text}`}>
        {scoreColor(score).label} ATS Score
      </p>
    </div>
  );
}

// ─── Upload process visualiser ────────────────────────────────────────────

function UploadProcess({ stage, visibleSkills }: { stage: UploadStage; visibleSkills: string[] }) {
  const steps = [
    { id: "uploading",  icon: <Upload className="w-4 h-4" />,      label: "Uploading",        desc: "Transferring file securely" },
    { id: "parsing",    icon: <ScanLine className="w-4 h-4" />,    label: "Parsing",          desc: "Reading document structure" },
    { id: "extracting", icon: <Sparkles className="w-4 h-4" />,    label: "Extracting",       desc: "Detecting skills & sections" },
    { id: "done",       icon: <CheckCircle className="w-4 h-4" />, label: "Analysis Ready",   desc: "ATS report generated" },
  ];
  const stageOrder: UploadStage[] = ["uploading", "parsing", "extracting", "done"];
  const rawIdx = stageOrder.indexOf(stage);
  const currentIdx = stage === "done" ? stageOrder.length : rawIdx;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <h3 className="font-semibold text-[#111827] mb-5">Scanning Your CV</h3>
      <div className="space-y-3 mb-6">
        {steps.map((step, i) => {
          const isDone    = i < currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={step.id} className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
              isCurrent ? "bg-[#EEF2FF] border border-[#1E3FAE]/20"
            : isDone    ? "bg-green-50"
            :             "bg-gray-50 opacity-50"
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isCurrent ? "bg-[#1E3FAE] text-white"
              : isDone    ? "bg-green-500 text-white"
              :             "bg-gray-200 text-gray-400"
              }`}>
                {isCurrent ? <Loader2 className="w-4 h-4 animate-spin" />
                : isDone    ? <CheckCircle className="w-4 h-4" />
                : step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isCurrent ? "text-[#1E3FAE]" : isDone ? "text-green-700" : "text-gray-400"}`}>{step.label}</p>
                <p className={`text-xs mt-0.5 ${isCurrent ? "text-[#1E3FAE]/70" : isDone ? "text-green-600" : "text-gray-400"}`}>{step.desc}</p>
              </div>
              {isCurrent && <span className="text-[10px] font-bold bg-[#1E3FAE] text-white px-2 py-0.5 rounded-full flex-shrink-0 animate-pulse">Live</span>}
            </div>
          );
        })}
      </div>
      {(stage === "extracting" || stage === "done") && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#1E3FAE]" /> Detected Keywords
          </p>
          <div className="flex flex-wrap gap-1.5 min-h-[48px]">
            {visibleSkills.map((s, i) => (
              <span key={s} style={{ animationDelay: `${i * 0.05}s` }}
                className="animate-in fade-in zoom-in-75 duration-300 text-xs bg-[#EEF2FF] text-[#1E3FAE] font-semibold px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {stage === "done" && (
        <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-xs font-semibold text-green-700">ATS scan complete — report ready below</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ATS_SCORE = Math.round(
  ATS_SECTIONS.reduce((sum, s) => sum + s.score, 0) / ATS_SECTIONS.length
);

export default function CVPage() {
  const [uploaded, setUploaded]           = useState(true);
  const [dragging, setDragging]           = useState(false);
  const [uploadStage, setUploadStage]     = useState<UploadStage>("done");
  const [visibleSkills, setVisibleSkills] = useState<string[]>(MATCHED_KEYWORDS);
  const [cvValidated, setCvValidated]     = useState(mockUser.cvValidated);
  const [submitStage, setSubmitStage]     = useState<SubmitStage>(mockUser.cvValidated ? "submitted" : "idle");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab]         = useState<"overview" | "keywords" | "fixes">("overview");
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSubmitForReview() {
    setSubmitStage("submitting");
    submitTimer.current = setTimeout(() => {
      setSubmitStage("submitted");
    }, 2000);
  }

  function startUpload() {
    setUploaded(true);
    setVisibleSkills([]);
    setCvValidated(false);
    setSubmitStage("idle"); // new CV needs to be re-submitted
    setUploadStage("uploading");
    timerRef.current = setTimeout(() => {
      setUploadStage("parsing");
      timerRef.current = setTimeout(() => {
        setUploadStage("extracting");
        MATCHED_KEYWORDS.forEach((kw, i) => {
          timerRef.current = setTimeout(() => {
            setVisibleSkills((p) => [...p, kw]);
          }, i * 180);
        });
        timerRef.current = setTimeout(() => {
          setUploadStage("done");
        }, MATCHED_KEYWORDS.length * 180 + 400);
      }, 1400);
    }, 1800);
  }

  useEffect(() => () => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (submitTimer.current) clearTimeout(submitTimer.current);
  }, []);

  const isProcessing = uploadStage !== "done" && uploadStage !== "idle";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">CV Analyser</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Your CV is scanned like an Applicant Tracking System (ATS) to highlight what to fix before you apply
          </p>
        </div>
        <div className="flex items-center gap-2">
          {cvValidated ? (
            <span className="flex items-center gap-1.5 text-xs bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" /> Ministry Validated
            </span>
          ) : submitStage === "submitted" ? (
            <span className="flex items-center gap-1.5 text-xs bg-blue-100 text-[#1E3FAE] font-semibold px-3 py-1.5 rounded-full">
              <Loader2 className="w-3.5 h-3.5" /> Under Review
            </span>
          ) : uploaded ? (
            <span className="flex items-center gap-1.5 text-xs bg-yellow-100 text-yellow-700 font-semibold px-3 py-1.5 rounded-full">
              <AlertCircle className="w-3.5 h-3.5" /> Not Submitted
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* CV file */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-[#111827] mb-3">CV Document</h3>
            {uploaded ? (
              <div className="flex flex-col gap-3">
                <div className={`flex items-center gap-3 rounded-xl p-3 ${submitStage === "submitted" && !cvValidated ? "bg-blue-50 border border-blue-100" : "bg-[#EEF2FF]"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${submitStage === "submitted" && !cvValidated ? "bg-[#1E3FAE]" : "bg-[#1E3FAE]"}`}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">Adaeze_CV_2026.pdf</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {submitStage === "submitted" && !cvValidated
                        ? "Under Ministry review — locked"
                        : "Uploaded 10 May 2026 · 2.1 MB"}
                    </p>
                  </div>
                  {submitStage === "submitted" && !cvValidated && (
                    <Shield className="w-4 h-4 text-[#1E3FAE] flex-shrink-0" />
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100 py-2 rounded-xl transition">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  {submitStage === "submitted" && !cvValidated ? (
                    /* Locked while under review — offer a withdraw escape hatch */
                    <button
                      onClick={() => setSubmitStage("idle")}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-200 hover:text-red-500 hover:border-red-200 hover:bg-red-50 py-2 rounded-xl transition"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Withdraw
                    </button>
                  ) : (
                    <button
                      onClick={() => setUploaded(false)}
                      disabled={cvValidated === false && submitStage === "submitted"}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Replace
                    </button>
                  )}
                </div>

                {/* Contextual note under the buttons */}
                {submitStage === "submitted" && !cvValidated && (
                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                    CV is locked during review. Click <span className="font-semibold text-red-500">Withdraw</span> to cancel the submission and re-upload a new version.
                  </p>
                )}
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); startUpload(); }}
                onClick={startUpload}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
                  dragging ? "border-[#1E3FAE] bg-[#EEF2FF]" : "border-gray-200 hover:border-[#1E3FAE] hover:bg-[#EEF2FF]/50"
                }`}
              >
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Drag & drop your CV</p>
                <p className="text-xs text-gray-400 mt-1">PDF or Word — max 5 MB</p>
                <span className="mt-3 inline-block bg-[#1E3FAE] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#0B1D6E] transition">
                  Browse Files
                </span>
              </div>
            )}
          </div>

          {/* ATS Score ring */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">ATS Score</h3>
              <div className="group relative ml-auto">
                <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                <div className="hidden group-hover:block absolute right-0 top-5 w-56 bg-gray-800 text-white text-xs rounded-xl p-3 z-10 leading-relaxed shadow-xl">
                  ATS (Applicant Tracking System) score measures how well your CV will pass automated screening before a human ever reads it.
                </div>
              </div>
            </div>
            <ATSRing score={ATS_SCORE} />
            <div className="mt-4 space-y-1.5">
              {ATS_SECTIONS.map(({ label, score }) => {
                const { bar } = scoreColor(score);
                return (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-500 truncate pr-2">{label}</span>
                      <span className={`font-bold flex-shrink-0 ${scoreColor(score).text}`}>{score}</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full">
                      <div className={`h-1 rounded-full ${bar}`} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ministry validation timeline */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">Ministry Validation</h3>
            </div>

            <div className="flex flex-col gap-0">
              {getValidationSteps(cvValidated, submitStage === "submitted").map((step, i, arr) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step.done ? "bg-green-500" : "bg-gray-100"}`}>
                      {step.done
                        ? <CheckCircle className="w-4 h-4 text-white" />
                        : <div className="w-2 h-2 rounded-full bg-gray-300" />
                      }
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-0.5 h-6 my-0.5 ${step.done ? "bg-green-300" : "bg-gray-100"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm font-semibold ${step.done ? "text-green-700" : "text-gray-400"}`}>{step.label}</p>
                    {step.label === "Queued" && submitStage === "submitted" && !cvValidated && (
                      <p className="text-xs text-gray-400 mt-0.5">Estimated: 2–3 business days</p>
                    )}
                    {step.label === "Validated" && cvValidated && (
                      <p className="text-xs text-gray-400 mt-0.5">12 May 2026 · via Ministry Review</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Status message + action */}
            {cvValidated ? (
              <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 text-xs text-green-700 flex items-start gap-1.5">
                <Award className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                Ministry Validated badge active — employers see this on your applications.
              </div>
            ) : submitStage === "submitted" ? (
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-xs text-[#1E3FAE] flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>Submitted for review. You&apos;ll be notified once validated — usually 2–3 business days.</span>
              </div>
            ) : (
              <>
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-500 mb-3 leading-relaxed">
                  Use the ATS feedback to improve your CV, then submit it to the Ministry for a human review and a validated badge.
                </div>
                <button
                  onClick={handleSubmitForReview}
                  disabled={!uploaded || submitStage === "submitting"}
                  className="w-full flex items-center justify-center gap-2 bg-[#0B1D6E] hover:bg-[#071245] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition"
                >
                  {submitStage === "submitting" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <><Shield className="w-4 h-4" /> Submit for Ministry Review</>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Upload pipeline */}
          {(isProcessing || uploadStage === "done") && uploaded && (
            <UploadProcess stage={uploadStage} visibleSkills={visibleSkills} />
          )}

          {/* Analysis tabs — only visible when not processing */}
          {!isProcessing && (
            <>
              {/* Tab bar */}
              <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1">
                {(["overview", "keywords", "fixes"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-xs sm:text-sm font-medium py-2 px-2 rounded-xl transition-all capitalize ${
                      activeTab === tab ? "bg-[#0B1D6E] text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}>
                    {tab === "overview" ? "Section Scores" : tab === "keywords" ? "Keywords" : "Recommendations"}
                  </button>
                ))}
              </div>

              {/* ── OVERVIEW TAB ─────────────────────────────── */}
              {activeTab === "overview" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#111827]">Section-by-Section Analysis</h3>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Click any row for details
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    ATS systems score each section independently. Weak sections cause your CV to be filtered out before a human sees it.
                  </p>
                  <div className="space-y-2">
                    {ATS_SECTIONS.map(({ label, score, icon, feedback }) => {
                      const { bar, text, label: sLabel } = scoreColor(score);
                      const isOpen = expandedSection === label;
                      return (
                        <div key={label} className={`border rounded-xl overflow-hidden transition-all ${
                          isOpen ? "border-[#1E3FAE]/30" : "border-gray-100 hover:border-gray-200"
                        }`}>
                          <button
                            onClick={() => setExpandedSection(isOpen ? null : label)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left"
                          >
                            <span className="text-base flex-shrink-0">{icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-[#111827]">{label}</span>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                    score >= 80 ? "bg-green-100 text-green-700"
                                    : score >= 60 ? "bg-blue-100 text-blue-700"
                                    : score >= 40 ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-600"
                                  }`}>{sLabel}</span>
                                  <span className={`text-sm font-black ${text}`}>{score}</span>
                                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </div>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full">
                                <div className={`h-1.5 rounded-full transition-all ${bar}`} style={{ width: `${score}%` }} />
                              </div>
                            </div>
                          </button>
                          {isOpen && (
                            <div className={`px-4 pb-4 pt-1 border-t border-gray-50 flex items-start gap-2`}>
                              {score < 60
                                ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                : score < 80
                                ? <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                : <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              }
                              <p className="text-xs text-gray-600 leading-relaxed">{feedback}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── KEYWORDS TAB ─────────────────────────────── */}
              {activeTab === "keywords" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-0.5">Keyword Analysis</h3>
                    <p className="text-xs text-gray-400">
                      ATS systems scan for role-relevant keywords. Missing high-frequency keywords can cause auto-rejection even if you&apos;re qualified.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Found in your CV ({MATCHED_KEYWORDS.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {MATCHED_KEYWORDS.map((kw) => (
                        <span key={kw} className="text-xs bg-green-50 border border-green-200 text-green-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> Missing keywords ({MISSING_KEYWORDS.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {MISSING_KEYWORDS.map((kw) => (
                        <span key={kw} className="text-xs bg-red-50 border border-red-200 text-red-600 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Plus className="w-3 h-3" /> {kw}
                        </span>
                      ))}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 text-xs text-yellow-800 leading-relaxed">
                      <span className="font-semibold">Tip:</span> You don&apos;t need to stuff these in randomly. Naturally weave them into your experience bullet points where they genuinely apply.
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#1E3FAE]" /> Keyword match rate
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-gray-100 rounded-full">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-[#1E3FAE] to-green-500"
                          style={{ width: `${Math.round(MATCHED_KEYWORDS.length / (MATCHED_KEYWORDS.length + MISSING_KEYWORDS.length) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#0B1D6E] flex-shrink-0">
                        {Math.round(MATCHED_KEYWORDS.length / (MATCHED_KEYWORDS.length + MISSING_KEYWORDS.length) * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      {MATCHED_KEYWORDS.length} of {MATCHED_KEYWORDS.length + MISSING_KEYWORDS.length} target keywords present
                    </p>
                  </div>
                </div>
              )}

              {/* ── FIXES TAB ─────────────────────────────────── */}
              {activeTab === "fixes" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-0.5">Recommendations</h3>
                    <p className="text-xs text-gray-400">
                      Fixes are ranked by impact. Addressing Critical items first can significantly raise your ATS score and recruiter response rate.
                    </p>
                  </div>

                  {PRIORITY_FIXES.map(({ level, label, bg, border, dot, text, items }) => (
                    <div key={level}>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5 ${text}`}>
                        <span className={`w-2 h-2 rounded-full ${dot}`} />
                        {label}
                      </p>
                      <div className={`${bg} border ${border} rounded-xl overflow-hidden`}>
                        {items.map((item, i) => (
                          <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i > 0 ? "border-t " + border : ""}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${dot}`}>
                              <span className="text-white text-[10px] font-bold">{i + 1}</span>
                            </div>
                            <p className={`text-xs leading-relaxed ${text}`}>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-[#1E3FAE]">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      After updating your CV, re-upload it here to run a fresh ATS scan and see your improved score.
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
