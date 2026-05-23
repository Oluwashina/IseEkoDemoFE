"use client";

import { useState } from "react";
import {
  MapPin, Clock, ChevronRight, Video, Phone, Building2,
  CheckCircle, XCircle, Star, Gift, CalendarCheck,
  FileText, Search, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { mockUser } from "@/lib/mock/user";
import { mockJobs } from "@/lib/mock/jobs";
import { getSessionApplications } from "@/lib/sessionApplications";

// ─── Status config ─────────────────────────────────────────────────────────────

type AppStatus = "applied" | "reviewed" | "shortlisted" | "interview" | "offer" | "rejected";

const STATUS_CONFIG: Record<AppStatus, {
  label: string; bg: string; text: string; dot: string; step: number;
}> = {
  applied:     { label: "Applied",        bg: "bg-blue-100",    text: "text-blue-700",    dot: "bg-blue-500",   step: 1 },
  reviewed:    { label: "Under Review",   bg: "bg-yellow-100",  text: "text-yellow-700",  dot: "bg-yellow-500", step: 2 },
  shortlisted: { label: "Shortlisted",    bg: "bg-green-100",   text: "text-green-700",   dot: "bg-green-500",  step: 3 },
  interview:   { label: "Interview",      bg: "bg-purple-100",  text: "text-purple-700",  dot: "bg-purple-500", step: 4 },
  offer:       { label: "Offer Received", bg: "bg-orange-100",  text: "text-orange-700",  dot: "bg-orange-500", step: 5 },
  rejected:    { label: "Not Selected",   bg: "bg-red-100",     text: "text-red-600",     dot: "bg-red-400",    step: 0 },
};

const PROGRESS_STEPS = ["Applied", "Under Review", "Shortlisted", "Interview", "Offer"];

type FilterTab = "all" | AppStatus;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const sessionApps = getSessionApplications();

  // Merge mock + session apps, de-duped by jobId (mock takes priority)
  const mockJobIds = new Set(mockUser.applications.map((a) => a.jobId));
  const merged = [
    ...mockUser.applications,
    ...sessionApps.filter((a) => !mockJobIds.has(a.jobId)),
  ] as typeof mockUser.applications;

  const [filter, setFilter] = useState<FilterTab>("all");

  const visible = filter === "all" ? merged : merged.filter((a) => a.status === filter);

  const counts = {
    total:       merged.length,
    offer:       merged.filter((a) => a.status === "offer").length,
    shortlisted: merged.filter((a) => a.status === "shortlisted").length,
    interview:   merged.filter((a) => a.status === "interview").length,
    reviewed:    merged.filter((a) => a.status === "reviewed").length,
    applied:     merged.filter((a) => a.status === "applied").length,
    rejected:    merged.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#111827]">Job Applications</h2>
        <p className="text-sm text-gray-500 mt-0.5">Track every application from submission to offer</p>
      </div>

      {/* Unified filter + stats cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {(
          [
            { tab: "all",         label: "All",          value: counts.total,       activeColor: "bg-[#0B1D6E] text-white",   inactiveBg: "bg-[#EEF2FF]",   inactiveText: "text-[#1E3FAE]",  dot: null },
            { tab: "offer",       label: "Offer",        value: counts.offer,       activeColor: "bg-orange-500 text-white",  inactiveBg: "bg-orange-50",    inactiveText: "text-orange-600", dot: "bg-orange-400" },
            { tab: "interview",   label: "Interview",    value: counts.interview,   activeColor: "bg-purple-600 text-white",  inactiveBg: "bg-purple-50",    inactiveText: "text-purple-600", dot: "bg-purple-400" },
            { tab: "shortlisted", label: "Shortlisted",  value: counts.shortlisted, activeColor: "bg-green-600 text-white",   inactiveBg: "bg-green-50",     inactiveText: "text-green-700",  dot: "bg-green-500"  },
            { tab: "reviewed",    label: "Under Review", value: counts.reviewed,    activeColor: "bg-yellow-500 text-white",  inactiveBg: "bg-yellow-50",    inactiveText: "text-yellow-700", dot: "bg-yellow-400" },
            { tab: "applied",     label: "Applied",      value: counts.applied,     activeColor: "bg-blue-600 text-white",    inactiveBg: "bg-blue-50",      inactiveText: "text-blue-700",   dot: "bg-blue-400"   },
            { tab: "rejected",    label: "Not Selected", value: counts.rejected,    activeColor: "bg-red-500 text-white",     inactiveBg: "bg-red-50",       inactiveText: "text-red-600",    dot: "bg-red-400"    },
          ] as { tab: FilterTab; label: string; value: number; activeColor: string; inactiveBg: string; inactiveText: string; dot: string | null }[]
        ).map(({ tab, label, value, activeColor, inactiveBg, inactiveText, dot }) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-2xl p-3 text-center transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                isActive ? `${activeColor} shadow-md` : `${inactiveBg} hover:opacity-90`
              }`}
            >
              {dot && (
                <div className="flex justify-center mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white/60" : dot}`} />
                </div>
              )}
              <p className={`text-xl font-bold ${isActive ? "text-white" : inactiveText}`}>{value}</p>
              <p className={`text-[10px] mt-0.5 leading-tight ${isActive ? "text-white/80" : "text-gray-500"}`}>{label}</p>
            </button>
          );
        })}
      </div>

      {/* Application cards */}
      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Search className="w-8 h-8 text-gray-200 mx-auto mb-2" />
          <p className="font-semibold text-[#111827]">No applications here</p>
          <p className="text-xs text-gray-400 mt-1">Switch tab or browse jobs to apply.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((app) => {
            const status   = app.status as AppStatus;
            const config   = STATUS_CONFIG[status];
            const job      = mockJobs.find((j) => j.id === app.jobId);
            const step     = config.step;

            // Type-cast to access optional fields
            const a = app as typeof mockUser.applications[0];

            return (
              <div key={app.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Status colour strip */}
                <div className={`h-1 ${config.dot}`} />

                <div className="p-5">
                  {/* Job header row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {job && (
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{ backgroundColor: job.logoColor }}
                        >
                          {job.logo}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#111827]">{app.jobTitle}</p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-sm text-gray-500">{app.company}</span>
                          {job && (
                            <>
                              <span className="text-gray-300">·</span>
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />{job.location}
                              </span>
                              <span className="text-gray-300">·</span>
                              <span className="text-xs text-gray-400">{job.type}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 flex items-center gap-1 ${config.bg} ${config.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      {config.label}
                    </span>
                  </div>

                  {/* ── PROGRESS TRACKER (non-rejected) ─────────────────── */}
                  {status !== "rejected" && (
                    <div className="mb-4">
                      <div className="flex items-start">
                        {PROGRESS_STEPS.map((label, i) => {
                          const isDone    = i + 1 < step;
                          const isCurrent = i + 1 === step;
                          const isPending = i + 1 > step;
                          return (
                            <div key={label} className="flex items-start flex-1 last:flex-none">
                              <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                                  isDone    ? "bg-green-500 text-white"
                                : isCurrent ? "bg-[#1E3FAE] text-white ring-4 ring-[#1E3FAE]/20"
                                :             "bg-gray-100 text-gray-400"
                                }`}>
                                  {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-[10px] mt-1.5 text-center leading-tight max-w-[56px] ${
                                  isCurrent ? "font-bold text-[#1E3FAE]"
                                : isDone    ? "font-semibold text-green-700"
                                :             "text-gray-400"
                                }`}>{label}</span>
                              </div>
                              {i < PROGRESS_STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 mt-3.5 rounded-full transition-all ${isDone ? "bg-green-400" : "bg-gray-100"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── STATUS-SPECIFIC CONTENT ─────────────────────────── */}

                  {/* APPLIED */}
                  {status === "applied" && (
                    <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4">
                      <FileText className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-blue-700">Application submitted</p>
                        <p className="text-xs text-blue-600 mt-0.5">The employer typically reviews applications within 5–7 business days. You&apos;ll be notified of any updates here.</p>
                      </div>
                    </div>
                  )}

                  {/* UNDER REVIEW */}
                  {status === "reviewed" && (
                    <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 mb-4">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-yellow-700">Your application is being reviewed</p>
                        <p className="text-xs text-yellow-600 mt-0.5">The hiring team has your CV and is evaluating it against the job requirements. Hang tight!</p>
                      </div>
                    </div>
                  )}

                  {/* SHORTLISTED */}
                  {status === "shortlisted" && (
                    <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <p className="text-xs font-bold text-green-700">Congratulations — you&apos;ve been shortlisted!</p>
                      </div>
                      {"note" in a && a.note && (
                        <p className="text-xs text-green-600 leading-relaxed">{a.note}</p>
                      )}
                      <p className="text-xs text-green-600">Next step: the recruiter will reach out to schedule an interview. Keep your phone and email handy.</p>
                    </div>
                  )}

                  {/* INTERVIEW */}
                  {status === "interview" && (
                    <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 mb-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <p className="text-xs font-bold text-purple-700">Interview Scheduled</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: "Date",     value: ("interviewDate" in a && a.interviewDate) ? a.interviewDate as string : "—" },
                          { label: "Time",     value: ("interviewTime" in a && a.interviewTime) ? a.interviewTime as string : "—" },
                          { label: "Format",   value: ("interviewType" in a && a.interviewType) ? a.interviewType as string : "—" },
                          { label: "Platform", value: ("interviewPlatform" in a && a.interviewPlatform) ? a.interviewPlatform as string : "—" },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-white rounded-xl px-3 py-2">
                            <p className="text-[10px] text-gray-400">{label}</p>
                            <p className="text-xs font-semibold text-[#111827] mt-0.5">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {"interviewLink" in a && a.interviewLink && (
                          <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition flex-shrink-0">
                            {"interviewType" in a && a.interviewType === "Video Call"
                              ? <Video className="w-3.5 h-3.5" />
                              : "interviewType" in a && a.interviewType === "Phone Call"
                              ? <Phone className="w-3.5 h-3.5" />
                              : <Building2 className="w-3.5 h-3.5" />
                            }
                            Join Interview
                          </button>
                        )}
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-xl transition">
                          <CalendarCheck className="w-3.5 h-3.5" /> Add to Calendar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* OFFER */}
                  {status === "offer" && (
                    <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <p className="text-xs font-bold text-orange-700">🎉 Offer Extended — Action Required</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Salary",    value: ("offerSalary" in a && a.offerSalary) ? a.offerSalary as string : "—" },
                          { label: "Type",      value: ("offerType" in a && a.offerType)     ? a.offerType as string   : "—" },
                          { label: "Respond by",value: ("offerDeadline" in a && a.offerDeadline) ? a.offerDeadline as string : "—" },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-white rounded-xl px-3 py-2">
                            <p className="text-[10px] text-gray-400">{label}</p>
                            <p className="text-xs font-semibold text-[#111827] mt-0.5">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 py-2.5 rounded-xl transition">
                          <CheckCircle className="w-4 h-4" /> Accept Offer
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl transition">
                          <XCircle className="w-4 h-4" /> Decline
                        </button>
                      </div>
                    </div>
                  )}

                  {/* REJECTED */}
                  {status === "rejected" && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <p className="text-xs font-bold text-red-600">Application not successful</p>
                      </div>
                      {"rejectionReason" in a && a.rejectionReason && (
                        <p className="text-xs text-red-500 leading-relaxed">{a.rejectionReason}</p>
                      )}
                      <p className="text-xs text-red-400">Don&apos;t be discouraged — new matching jobs are available for you.</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> Applied {app.appliedDate}
                    </span>
                    <Link
                      href={`/jobseeker/jobs`}
                      className="flex items-center gap-1 text-xs font-semibold text-[#1E3FAE] hover:underline"
                    >
                      View job <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
