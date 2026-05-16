"use client";

import { useState } from "react";
import { Search, MapPin, Users, Eye, Check, X, Flag, ChevronDown } from "lucide-react";
import { mockJobs, mockSectors } from "@/lib/mock/jobs";

export default function VacanciesPage() {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All Sectors");
  const [statusFilter, setStatusFilter] = useState("All");
  const [actions, setActions] = useState<Record<string, string>>({});

  const setAction = (id: string, action: string) => {
    setActions((prev) => ({ ...prev, [id]: action }));
  };

  const filtered = mockJobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === "All Sectors" || j.sector === sectorFilter;
    const matchStatus = statusFilter === "All" || (actions[j.id] ?? "active") === statusFilter;
    return matchSearch && matchSector && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Vacancy Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Review, approve, and moderate all job postings on the platform
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Vacancies", value: mockJobs.length, bg: "bg-[#EEF2FF]", text: "text-[#1E3FAE]" },
          { label: "Active", value: mockJobs.length - Object.values(actions).filter((a) => a !== "active").length, bg: "bg-green-50", text: "text-green-700" },
          { label: "Flagged", value: Object.values(actions).filter((a) => a === "flagged").length, bg: "bg-red-50", text: "text-red-600" },
          { label: "Closed", value: Object.values(actions).filter((a) => a === "closed").length, bg: "bg-gray-50", text: "text-gray-500" },
        ].map(({ label, value, bg, text }) => (
          <div key={label} className={`${bg} rounded-2xl p-4`}>
            <p className={`text-2xl font-bold ${text}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3 flex-wrap">
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vacancy or company..."
            className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
          />
        </div>
        <div className="relative">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm outline-none focus:border-[#1E3FAE] transition cursor-pointer"
          >
            {mockSectors.map((s) => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm outline-none focus:border-[#1E3FAE] transition cursor-pointer"
          >
            {["All", "active", "flagged", "closed"].map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Job Title</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Company</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Sector</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Applications</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((job) => {
                const currentStatus = actions[job.id] ?? "active";
                return (
                  <tr key={job.id} className="hover:bg-[#F8F9FC] transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: job.logoColor }}
                        >
                          {job.logo}
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827]">{job.title}</p>
                          <p className="text-xs text-gray-400">{job.type} · {job.posted}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 hidden sm:table-cell">{job.company}</td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs bg-[#EEF2FF] text-[#1E3FAE] px-2 py-1 rounded-full font-medium">{job.sector}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" /> {job.applications}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        currentStatus === "active" ? "bg-green-100 text-green-700"
                        : currentStatus === "flagged" ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-500"
                      }`}>
                        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          title="View"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#1E3FAE] transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {currentStatus !== "active" && (
                          <button
                            title="Approve"
                            onClick={() => setAction(job.id, "active")}
                            className="p-1.5 rounded-lg hover:bg-green-100 text-gray-400 hover:text-green-600 transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {currentStatus !== "flagged" && (
                          <button
                            title="Flag"
                            onClick={() => setAction(job.id, "flagged")}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {currentStatus !== "closed" && (
                          <button
                            title="Close"
                            onClick={() => setAction(job.id, "closed")}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
