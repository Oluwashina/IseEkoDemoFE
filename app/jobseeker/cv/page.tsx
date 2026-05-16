"use client";

import { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Tag,
  Star,
  ChevronRight,
  Download,
} from "lucide-react";
import { mockUser } from "@/lib/mock/user";

const feedbackItems = [
  { type: "good", text: "Strong technical skills section clearly listed" },
  { type: "good", text: "Education background is well structured" },
  { type: "good", text: "Relevant work experience included" },
  { type: "improve", text: "Add a compelling personal statement / objective" },
  { type: "improve", text: "Include quantifiable achievements in work history" },
  { type: "improve", text: "Add volunteer work or community contributions" },
];

export default function CVPage() {
  const [uploaded, setUploaded] = useState(true);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">My CV</h2>
        <p className="text-sm text-gray-500 mt-0.5">Upload, manage, and get your CV reviewed by the Ministry</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Upload + Status */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Upload area */}
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
                    <Upload className="w-3.5 h-3.5" /> Replace
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); setUploaded(true); }}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
                  dragging ? "border-[#1E3FAE] bg-[#EEF2FF]" : "border-gray-200 hover:border-[#1E3FAE] hover:bg-[#EEF2FF]/50"
                }`}
                onClick={() => setUploaded(true)}
              >
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">
                  Drag & drop your CV here
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF or Word — max 5MB</p>
                <button className="mt-3 bg-[#1E3FAE] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#0B1D6E] transition">
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Validation status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-[#111827] mb-3">Ministry Validation</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                mockUser.cvValidated ? "bg-green-100" : "bg-yellow-100"
              }`}>
                {mockUser.cvValidated
                  ? <CheckCircle className="w-5 h-5 text-green-600" />
                  : <AlertCircle className="w-5 h-5 text-yellow-600" />
                }
              </div>
              <div>
                <p className={`text-sm font-semibold ${mockUser.cvValidated ? "text-green-700" : "text-yellow-700"}`}>
                  {mockUser.cvValidated ? "Validated by Ministry" : "Pending Review"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {mockUser.cvValidated ? "Reviewed on 12 May 2026" : "Estimated: 2–3 business days"}
                </p>
              </div>
            </div>
            {mockUser.cvValidated && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs text-green-700">
                ✓ Your CV carries the ISE EKO Ministry Validated badge, increasing employer trust.
              </div>
            )}
          </div>

          {/* Score */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">Employability Score</h3>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-[#0B1D6E]">{mockUser.employabilityScore}</span>
              <span className="text-gray-400 mb-1 text-sm">/ 100</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full mb-2">
              <div
                className="h-3 bg-gradient-to-r from-[#1E3FAE] to-[#0B1D6E] rounded-full"
                style={{ width: `${mockUser.employabilityScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {mockUser.employabilityScore >= 80
                ? "Strong profile — you're competitive for most roles."
                : "Good start — complete your profile to boost your score."}
            </p>
          </div>
        </div>

        {/* Right: Profile extraction + Feedback */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Extracted profile */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Extracted Profile</h3>
              <span className="text-xs bg-[#EEF2FF] text-[#1E3FAE] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" /> Auto-tagged
              </span>
            </div>

            {/* Education */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Education</p>
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

            {/* Work history */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Work Experience</p>
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
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Detected Skills</p>
              <div className="flex flex-wrap gap-2">
                {mockUser.skills.map((skill) => (
                  <span key={skill} className="bg-[#EEF2FF] text-[#1E3FAE] text-xs font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ministry feedback */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-[#111827] mb-1">Ministry Feedback</h3>
            <p className="text-xs text-gray-400 mb-4">Improvement suggestions from the ISE EKO CV Review team</p>
            <div className="flex flex-col gap-2.5">
              {feedbackItems.map(({ type, text }) => (
                <div key={text} className={`flex items-start gap-3 rounded-xl p-3 ${
                  type === "good" ? "bg-green-50" : "bg-yellow-50"
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    type === "good" ? "bg-green-500" : "bg-yellow-400"
                  }`}>
                    {type === "good"
                      ? <CheckCircle className="w-3 h-3 text-white" />
                      : <ChevronRight className="w-3 h-3 text-[#0B1D6E]" />
                    }
                  </div>
                  <p className={`text-xs leading-relaxed ${type === "good" ? "text-green-800" : "text-yellow-800"}`}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
