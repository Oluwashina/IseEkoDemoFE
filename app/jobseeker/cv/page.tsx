"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload, FileText, CheckCircle, AlertCircle, TrendingUp,
  Tag, Star, ChevronRight, Download, Loader2, Sparkles,
  GraduationCap, Briefcase, ScanLine, Shield, RefreshCw,
  Award, Zap,
} from "lucide-react";
import { mockUser } from "@/lib/mock/user";

// ─── Constants ────────────────────────────────────────────────────────────────

const FEEDBACK = [
  { type: "good",    category: "Strengths",    text: "Strong technical skills section clearly listed" },
  { type: "good",    category: "Strengths",    text: "Education background is well structured and complete" },
  { type: "good",    category: "Strengths",    text: "Relevant work experience with clear progression" },
  { type: "improve", category: "Suggestions",  text: "Add a compelling personal statement or objective" },
  { type: "improve", category: "Suggestions",  text: "Include quantifiable achievements (e.g. 'improved load time by 40%')" },
  { type: "improve", category: "Suggestions",  text: "Add volunteer work or community contributions" },
];

const SCORE_BREAKDOWN = [
  { label: "Education",           score: 85, color: "bg-[#1E3FAE]" },
  { label: "Work Experience",     score: 70, color: "bg-purple-500" },
  { label: "Skills",              score: 90, color: "bg-green-500"  },
  { label: "Profile Completeness",score: 78, color: "bg-orange-400" },
];

function getValidationSteps(validated: boolean) {
  return [
    { label: "Received",  done: true       },
    { label: "Queued",    done: true       },
    { label: "Reviewed",  done: validated  },
    { label: "Validated", done: validated  },
  ];
}

type UploadStage = "idle" | "uploading" | "parsing" | "extracting" | "done";

// ─── Circular score ring ──────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 85 ? "#22c55e" : score >= 70 ? "#1E3FAE" : "#f59e0b";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#f3f4f6" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-[#0B1D6E]">{score}</span>
          <span className="text-xs text-gray-400 font-medium">/ 100</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-center mt-2" style={{ color }}>
        {score >= 85 ? "Excellent" : score >= 70 ? "Strong" : "Developing"}
      </p>
    </div>
  );
}

// ─── Upload process visualiser ────────────────────────────────────────────────

function UploadProcess({ stage, visibleSkills }: { stage: UploadStage; visibleSkills: string[] }) {
  const steps: { id: UploadStage; icon: React.ReactNode; label: string; desc: string }[] = [
    { id: "uploading",  icon: <Upload className="w-4 h-4" />,   label: "Uploading",        desc: "Transferring your file securely" },
    { id: "parsing",    icon: <ScanLine className="w-4 h-4" />, label: "Parsing",          desc: "Reading document structure" },
    { id: "extracting", icon: <Sparkles className="w-4 h-4" />, label: "Extracting",       desc: "Detecting skills & experience" },
    { id: "done",       icon: <CheckCircle className="w-4 h-4" />, label: "Profile Built", desc: "Ready for Ministry review" },
  ];

  const stageOrder: UploadStage[] = ["uploading", "parsing", "extracting", "done"];
  const rawIdx = stageOrder.indexOf(stage);
  // When fully done, push the index beyond all steps so every step renders as completed
  const currentIdx = stage === "done" ? stageOrder.length : rawIdx;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <h3 className="font-semibold text-[#111827] mb-5">Processing Your CV</h3>

      {/* Step tracker */}
      <div className="space-y-3 mb-6">
        {steps.map((step, i) => {
          const isDone    = i < currentIdx;
          const isCurrent = i === currentIdx;
          const isPending = i > currentIdx;
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
                {isCurrent
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : isDone
                  ? <CheckCircle className="w-4 h-4" />
                  : step.icon
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isCurrent ? "text-[#1E3FAE]" : isDone ? "text-green-700" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 ${isCurrent ? "text-[#1E3FAE]/70" : isDone ? "text-green-600" : "text-gray-400"}`}>
                  {step.desc}
                </p>
              </div>
              {isDone && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
              {isCurrent && <span className="text-[10px] font-bold bg-[#1E3FAE] text-white px-2 py-0.5 rounded-full flex-shrink-0 animate-pulse">Live</span>}
            </div>
          );
        })}
      </div>

      {/* Live skill extraction feed */}
      {(stage === "extracting" || stage === "done") && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#1E3FAE]" /> Detected Skills
          </p>
          <div className="flex flex-wrap gap-1.5 min-h-[48px]">
            {visibleSkills.map((skill, i) => (
              <span
                key={skill}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="animate-in fade-in zoom-in-75 duration-300 text-xs bg-[#EEF2FF] text-[#1E3FAE] font-semibold px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {stage === "done" && (
        <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-xs font-semibold text-green-700">CV processed successfully — submitted for Ministry review</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CVPage() {
  const [uploaded, setUploaded]           = useState(true);
  const [dragging, setDragging]           = useState(false);
  const [uploadStage, setUploadStage]     = useState<UploadStage>("done");
  const [visibleSkills, setVisibleSkills] = useState<string[]>(mockUser.skills);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [cvValidated, setCvValidated]     = useState(mockUser.cvValidated);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate the upload pipeline
  function startUpload() {
    setUploaded(true);
    setVisibleSkills([]);
    setCvValidated(false); // new upload resets validation status
    setUploadStage("uploading");

    timerRef.current = setTimeout(() => {
      setUploadStage("parsing");
      timerRef.current = setTimeout(() => {
        setUploadStage("extracting");
        // Reveal skills one by one
        mockUser.skills.forEach((skill, i) => {
          timerRef.current = setTimeout(() => {
            setVisibleSkills((prev) => [...prev, skill]);
          }, i * 200);
        });
        timerRef.current = setTimeout(() => {
          setUploadStage("done");
        }, mockUser.skills.length * 200 + 400);
      }, 1400);
    }, 1800);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const isProcessing = uploadStage !== "done" && uploadStage !== "idle";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">My CV</h2>
          <p className="text-sm text-gray-500 mt-0.5">Upload, manage, and get your CV reviewed by the Ministry</p>
        </div>
        {cvValidated ? (
          <span className="flex items-center gap-1.5 text-xs bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
            <Shield className="w-3.5 h-3.5" /> Ministry Validated
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs bg-yellow-100 text-yellow-700 font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
            <AlertCircle className="w-3.5 h-3.5" /> Pending Review
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* CV Document */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-[#111827] mb-3">CV Document</h3>

            {uploaded ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-[#EEF2FF] rounded-xl p-3">
                  <div className="w-10 h-10 bg-[#1E3FAE] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">Adaeze_CV_2026.pdf</p>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded 10 May 2026 · 2.1 MB</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100 py-2 rounded-xl transition">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button
                    onClick={() => setUploaded(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Replace
                  </button>
                </div>
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
                <p className="text-sm font-medium text-gray-600">Drag & drop your CV here</p>
                <p className="text-xs text-gray-400 mt-1">PDF or Word — max 5 MB</p>
                <span className="mt-3 inline-block bg-[#1E3FAE] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#0B1D6E] transition">
                  Browse Files
                </span>
              </div>
            )}
          </div>

          {/* Validation timeline */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">Ministry Validation</h3>
            </div>
            <div className="relative flex flex-col gap-0">
              {getValidationSteps(cvValidated).map((step, i) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step.done ? "bg-green-500" : "bg-gray-100"}`}>
                      {step.done
                        ? <CheckCircle className="w-4 h-4 text-white" />
                        : <div className="w-2 h-2 rounded-full bg-gray-300" />
                      }
                    </div>
                    {i < getValidationSteps(cvValidated).length - 1 && (
                      <div className={`w-0.5 h-6 my-0.5 ${step.done ? "bg-green-300" : "bg-gray-100"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm font-semibold ${step.done ? "text-green-700" : "text-gray-400"}`}>{step.label}</p>
                    {step.label === "Validated" && step.done && (
                      <p className="text-xs text-gray-400 mt-0.5">12 May 2026 · via NIMC + Ministry Review</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {cvValidated ? (
              <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 text-xs text-green-700 flex items-start gap-1.5">
                <Award className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                Your CV carries the ISE EKO Ministry Validated badge, increasing employer trust.
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2 text-xs text-yellow-700 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                Your CV has been received and is awaiting Ministry review. Estimated: 2–3 business days.
              </div>
            )}
          </div>

          {/* Employability score ring */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Employability Score</h3>
              </div>
              <button onClick={() => setShowBreakdown((v) => !v)} className="text-xs font-semibold text-[#1E3FAE] hover:underline">
                {showBreakdown ? "Hide" : "Breakdown"}
              </button>
            </div>

            <ScoreRing score={mockUser.employabilityScore} />

            <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
              {mockUser.employabilityScore >= 80
                ? "Strong profile — you're competitive for most roles."
                : "Good start — complete your profile to boost your score."}
            </p>

            {showBreakdown && (
              <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">
                {SCORE_BREAKDOWN.map(({ label, score, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold text-[#111827]">{score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Upload process panel — shown during and after upload */}
          {(isProcessing || uploadStage === "done") && uploaded && (
            <UploadProcess stage={uploadStage} visibleSkills={visibleSkills} />
          )}

          {/* Extracted profile — shown only when not actively processing */}
          {!isProcessing && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#111827]">Extracted Profile</h3>
                <span className="text-xs bg-[#EEF2FF] text-[#1E3FAE] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Auto-tagged
                </span>
              </div>

              {/* Education */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </p>
                <div className="flex flex-col gap-2">
                  {mockUser.education.map((edu) => (
                    <div key={edu.id} className="flex items-start gap-3 bg-[#F8F9FC] rounded-xl p-3">
                      <div className="w-8 h-8 bg-[#1E3FAE] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{edu.degree} — {edu.field}</p>
                        <p className="text-xs text-gray-500">{edu.institution} · {edu.startYear}–{edu.endYear} · {edu.grade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Work Experience
                </p>
                <div className="flex flex-col gap-2">
                  {mockUser.experience.map((exp) => (
                    <div key={exp.id} className="flex items-start gap-3 bg-[#F8F9FC] rounded-xl p-3">
                      <div className="w-2 h-2 rounded-full bg-[#1E3FAE] flex-shrink-0 mt-1.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{exp.role}</p>
                        <p className="text-xs text-gray-500">{exp.company} · {exp.startDate} – {exp.current ? "Present" : exp.endDate}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Detected Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {mockUser.skills.map((skill) => (
                    <span key={skill} className="bg-[#EEF2FF] text-[#1E3FAE] text-xs font-medium px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ministry feedback */}
          {!isProcessing && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-[#111827] mb-0.5">Ministry Feedback</h3>
              <p className="text-xs text-gray-400 mb-4">Improvement suggestions from the ISE EKO CV Review team</p>

              <div className="mb-3">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Strengths
                </p>
                <div className="flex flex-col gap-2">
                  {FEEDBACK.filter((f) => f.type === "good").map(({ text }) => (
                    <div key={text} className="flex items-start gap-3 bg-green-50 rounded-xl p-3">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-xs text-green-800 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-yellow-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Suggested Improvements
                </p>
                <div className="flex flex-col gap-2">
                  {FEEDBACK.filter((f) => f.type === "improve").map(({ text }) => (
                    <div key={text} className="flex items-start gap-3 bg-yellow-50 rounded-xl p-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-[#0B1D6E]" />
                      </div>
                      <p className="text-xs text-yellow-800 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
