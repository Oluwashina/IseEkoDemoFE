import { mockUser } from "@/lib/mock/user";
import { mockJobs } from "@/lib/mock/jobs";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; bg: string; text: string; step: number }> = {
  applied:     { label: "Applied",        bg: "bg-blue-100",   text: "text-blue-700",  step: 1 },
  reviewed:    { label: "Under Review",   bg: "bg-yellow-100", text: "text-yellow-700",step: 2 },
  shortlisted: { label: "Shortlisted",    bg: "bg-green-100",  text: "text-green-700", step: 3 },
  rejected:    { label: "Not Selected",   bg: "bg-red-100",    text: "text-red-600",   step: 0 },
};

const progressSteps = ["Applied", "Under Review", "Shortlisted", "Offer"];

export default function ApplicationsPage() {
  const applications = mockUser.applications;
  const counts = {
    total: applications.length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    applied: applications.filter((a) => a.status === "applied").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">My Applications</h2>
        <p className="text-sm text-gray-500 mt-0.5">Track the status of every job you've applied to</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Applied", value: counts.total, color: "text-[#1E3FAE]", bg: "bg-[#EEF2FF]" },
          { label: "Shortlisted", value: counts.shortlisted, color: "text-green-700", bg: "bg-green-50" },
          { label: "Under Review", value: counts.reviewed, color: "text-yellow-700", bg: "bg-yellow-50" },
          { label: "Not Selected", value: counts.rejected, color: "text-red-600", bg: "bg-red-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Application cards */}
      <div className="flex flex-col gap-4">
        {applications.map((app) => {
          const config = statusConfig[app.status];
          const job = mockJobs.find((j) => j.id === app.jobId);
          const currentStep = config.step;

          return (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {job && (
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-[#111827]">{app.jobTitle}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-gray-500">{app.company}</span>
                      {job && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${config.bg} ${config.text}`}>
                  {config.label}
                </span>
              </div>

              {/* Progress tracker */}
              {app.status !== "rejected" && (
                <div className="mb-4">
                  <div className="flex items-center gap-0">
                    {progressSteps.map((step, i) => (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            i < currentStep
                              ? "bg-green-500 text-white"
                              : i === currentStep
                              ? "bg-[#1E3FAE] text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}>
                            {i < currentStep ? "✓" : i + 1}
                          </div>
                          <span className={`text-xs mt-1 whitespace-nowrap ${
                            i <= currentStep ? "text-[#111827] font-medium" : "text-gray-400"
                          }`}>{step}</span>
                        </div>
                        {i < progressSteps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 -mt-4 ${
                            i < currentStep ? "bg-green-400" : "bg-gray-100"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {app.status === "rejected" && (
                <div className="bg-red-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-red-600">
                    Unfortunately you were not selected for this position. Keep applying — new matches are available!
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  Applied {app.appliedDate}
                </span>
                <Link
                  href={`/jobseeker/jobs?id=${app.jobId}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[#1E3FAE] hover:underline"
                >
                  View job <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
