"use client";

import Link from "next/link";
import {
  Briefcase,
  FileText,
  GraduationCap,
  ClipboardList,
  TrendingUp,
  MapPin,
  Clock,
  ChevronRight,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { mockJobs } from "@/lib/mock/jobs";
import { mockUser } from "@/lib/mock/user";
import { useProfile } from "@/lib/profileContext";

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

const statusLabels: Record<string, string> = {
  applied: "Applied",
  reviewed: "Under Review",
  shortlisted: "Shortlisted",
  rejected: "Not Selected",
};

export default function JobseekerDashboard() {
  const { profileCompletion } = useProfile();
  const topMatches = mockJobs.slice(0, 3);
  const recentApplications = mockUser.applications.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome banner */}
      <div className="bg-[#0B1D6E] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#1E3FAE]/40 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute right-16 bottom-0 w-32 h-32 rounded-full bg-[#1E3FAE]/30 translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-1">Good morning 👋</p>
          <h2 className="text-xl font-bold text-white">
            Welcome back, {mockUser.firstName}!
          </h2>
          <p className="text-white/60 text-sm mt-1">
            You have{" "}
            <span className="text-yellow-400 font-semibold">3 new job matches</span>{" "}
            since your last visit.
          </p>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
            <p className="text-white/70 text-xs mb-1">Employability Score</p>
            <p className="text-3xl font-bold text-yellow-400">
              {mockUser.employabilityScore}
            </p>
            <p className="text-white/50 text-xs">/ 100</p>
          </div>
        </div>
      </div>

      {/* Profile completion alert */}
      {profileCompletion < 100 && (
        <div className="bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#1E3FAE] flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#0B1D6E]">
                Your profile is {profileCompletion}% complete
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete your profile to get better job matches and be visible to employers.
              </p>
            </div>
          </div>
          <Link
            href="/jobseeker/profile"
            className="text-xs font-semibold text-[#1E3FAE] whitespace-nowrap hover:underline flex items-center gap-1"
          >
            Complete now <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/jobseeker/jobs", icon: Briefcase, label: "Find Jobs", color: "bg-[#EEF2FF] text-[#1E3FAE]", count: "892 open" },
          { href: "/jobseeker/cv", icon: FileText, label: "My CV", color: "bg-green-50 text-green-700", count: mockUser.cvValidated ? "Validated ✓" : "Upload CV" },
          { href: "/jobseeker/training", icon: GraduationCap, label: "Training", color: "bg-yellow-50 text-yellow-700", count: "47 programmes" },
          { href: "/jobseeker/applications", icon: ClipboardList, label: "Job Applications", color: "bg-red-50 text-red-600", count: `${mockUser.applications.length} total` },
        ].map(({ href, icon: Icon, label, color, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-4 flex flex-col gap-3 border border-gray-100 hover:border-[#1E3FAE]/30 hover:shadow-md transition-all group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{count}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top job matches */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#111827]">Top Job Matches</h3>
              <p className="text-xs text-gray-400 mt-0.5">Based on your skills and profile</p>
            </div>
            <Link
              href="/jobseeker/jobs"
              className="text-xs font-semibold text-[#1E3FAE] hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {topMatches.map((job) => (
              <Link
                key={job.id}
                href={`/jobseeker/jobs?id=${job.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8F9FC] transition group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: job.logoColor }}
                >
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] truncate">
                    {job.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{job.company}</span>
                    <span className="text-gray-300">·</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div
                    className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      job.matchScore >= 90
                        ? "bg-green-100 text-green-700"
                        : job.matchScore >= 75
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.matchScore}% match
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{job.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Application status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Recent Applications</h3>
              <Link
                href="/jobseeker/applications"
                className="text-xs font-semibold text-[#1E3FAE] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#111827] truncate">
                      {app.jobTitle}
                    </p>
                    <p className="text-xs text-gray-400">{app.company}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[app.status]}`}
                  >
                    {statusLabels[app.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CV Validation status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-[#111827] mb-3">CV Status</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-700">Ministry Validated</p>
                <p className="text-xs text-gray-400 mt-0.5">Your CV has been reviewed and approved</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Employability Score</span>
                <span className="font-semibold text-[#0B1D6E]">{mockUser.employabilityScore}/100</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 bg-[#1E3FAE] rounded-full"
                  style={{ width: `${mockUser.employabilityScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">Recent Activity</h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: Zap, text: "3 new job matches found", time: "Today", color: "text-yellow-500" },
                { icon: CheckCircle, text: "Shortlisted by Flutterwave", time: "2 days ago", color: "text-green-500" },
                { icon: Clock, text: "CV reviewed by Ministry", time: "5 days ago", color: "text-blue-500" },
              ].map(({ icon: Icon, text, time, color }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${color}`} />
                  <div>
                    <p className="text-xs text-[#374151]">{text}</p>
                    <p className="text-xs text-gray-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
