"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  SlidersHorizontal,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";
import { mockJobs, mockSectors, mockLGAs } from "@/lib/mock/jobs";
import { mockUser } from "@/lib/mock/user";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All Sectors");
  const [lga, setLga] = useState("All LGAs");
  const [jobType, setJobType] = useState("All Types");
  const [saved, setSaved] = useState<string[]>(mockUser.savedJobs);
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const [applied, setApplied] = useState<string[]>(
    mockUser.applications.map((a) => a.jobId)
  );

  const filtered = mockJobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchSector = sector === "All Sectors" || j.sector === sector;
    const matchLga = lga === "All LGAs" || j.location.includes(lga);
    const matchType = jobType === "All Types" || j.type === jobType;
    return matchSearch && matchSector && matchLga && matchType;
  });

  const toggleSave = (id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#111827]">Find Jobs</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Showing {filtered.length} opportunities in Lagos State
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, company, or skill..."
            className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {[
            { value: sector, options: mockSectors, onChange: setSector, placeholder: "Sector" },
            { value: lga, options: mockLGAs, onChange: setLga, placeholder: "LGA" },
            { value: jobType, options: ["All Types", "Full-time", "Part-time", "Contract"], onChange: setJobType, placeholder: "Type" },
          ].map(({ value, options, onChange, placeholder }) => (
            <div key={placeholder} className="relative">
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition cursor-pointer"
              >
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Content: list + detail */}
      <div className="flex gap-5 h-[calc(100vh-280px)] min-h-[500px]">
        {/* Job list */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-2 overflow-y-auto pr-1">
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <SlidersHorizontal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No jobs match your filters.</p>
            </div>
          )}
          {filtered.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            const isSaved = saved.includes(job.id);
            const isApplied = applied.includes(job.id);
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#1E3FAE] ring-2 ring-[#1E3FAE]/10"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: job.logoColor }}
                  >
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-sm font-semibold text-[#111827] leading-tight">{job.title}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSave(job.id); }}
                        className="text-gray-300 hover:text-[#1E3FAE] flex-shrink-0"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-[#1E3FAE]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{job.company}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.posted}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isApplied && (
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Applied</span>
                        )}
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                          job.matchScore >= 90 ? "bg-green-100 text-green-700"
                          : job.matchScore >= 75 ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {job.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Job detail */}
        {selectedJob && (
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-y-auto hidden lg:flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: selectedJob.logoColor }}
                  >
                    {selectedJob.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827]">{selectedJob.title}</h3>
                    <p className="text-gray-500 mt-0.5">{selectedJob.company}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedJob.location}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-500">{selectedJob.type}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-500">{selectedJob.sector}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-bold px-3 py-1.5 rounded-xl flex-shrink-0 ${
                  selectedJob.matchScore >= 90 ? "bg-green-100 text-green-700"
                  : selectedJob.matchScore >= 75 ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}>
                  {selectedJob.matchScore}% match
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <div className="bg-[#F8F9FC] rounded-xl px-4 py-2 text-center">
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="text-sm font-semibold text-[#111827] mt-0.5">{selectedJob.salary}</p>
                </div>
                <div className="bg-[#F8F9FC] rounded-xl px-4 py-2 text-center">
                  <p className="text-xs text-gray-500">Applications</p>
                  <p className="text-sm font-semibold text-[#111827] mt-0.5">{selectedJob.applications}</p>
                </div>
                <div className="bg-[#F8F9FC] rounded-xl px-4 py-2 text-center">
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm font-semibold text-[#111827] mt-0.5">{selectedJob.deadline}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {applied.includes(selectedJob.id) ? (
                  <button disabled className="flex-1 bg-gray-100 text-gray-500 font-semibold py-2.5 rounded-xl text-sm cursor-not-allowed">
                    ✓ Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setApplied((prev) => [...prev, selectedJob.id])}
                    className="flex-1 bg-[#1E3FAE] hover:bg-[#0B1D6E] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Apply Now
                  </button>
                )}
                <button
                  onClick={() => toggleSave(selectedJob.id)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-gray-600"
                >
                  {saved.includes(selectedJob.id) ? <BookmarkCheck className="w-4 h-4 text-[#1E3FAE]" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="font-semibold text-[#111827] mb-2">About this role</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#111827] mb-2">Requirements</h4>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3FAE] flex-shrink-0 mt-1.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#111827] mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.tags.map((tag) => (
                    <span key={tag} className="bg-[#EEF2FF] text-[#1E3FAE] text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
