"use client";

import { useState } from "react";
import { Search, Building2, Check, X, Clock, ChevronDown, Eye } from "lucide-react";
import { mockEmployers } from "@/lib/mock/admin";

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  verified: { label: "Verified",       bg: "bg-green-100", text: "text-green-700" },
  pending:  { label: "Pending Review", bg: "bg-yellow-100", text: "text-yellow-700" },
  rejected: { label: "Rejected",       bg: "bg-red-100",   text: "text-red-600" },
};

export default function EmployersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [employers, setEmployers] = useState(mockEmployers);

  const setStatus = (id: string, status: string) => {
    setEmployers((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const filtered = employers.filter((e) => {
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.sector.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">Employers & Agencies</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Verify and manage all registered organisations on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Registered", value: employers.length, bg: "bg-[#EEF2FF]", text: "text-[#1E3FAE]" },
          { label: "Verified", value: employers.filter((e) => e.status === "verified").length, bg: "bg-green-50", text: "text-green-700" },
          { label: "Pending Verification", value: employers.filter((e) => e.status === "pending").length, bg: "bg-yellow-50", text: "text-yellow-700" },
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
            placeholder="Search employer or sector..."
            className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm outline-none focus:border-[#1E3FAE] transition cursor-pointer"
          >
            {["All", "verified", "pending", "rejected"].map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Statuses" : statusConfig[s]?.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Pending alerts */}
      {employers.filter((e) => e.status === "pending").length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">
              {employers.filter((e) => e.status === "pending").length} employer(s) awaiting verification
            </p>
            <p className="text-xs text-yellow-600 mt-0.5">
              Review and approve or reject pending accounts below.
            </p>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((employer) => {
          const sc = statusConfig[employer.status];
          return (
            <div key={employer.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-[#1E3FAE]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827]">{employer.name}</p>
                    <p className="text-xs text-gray-400">{employer.sector}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${sc.bg} ${sc.text}`}>
                  {sc.label}
                </span>
              </div>

              <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>LGA</span>
                  <span className="font-medium text-[#374151]">{employer.lga}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Vacancies</span>
                  <span className="font-medium text-[#374151]">{employer.activeVacancies}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered</span>
                  <span className="font-medium text-[#374151]">{employer.registeredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact</span>
                  <span className="font-medium text-[#1E3FAE] truncate max-w-[140px]">{employer.contact}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] px-2.5 py-1.5 rounded-xl hover:bg-blue-100 transition">
                  <Eye className="w-3 h-3" /> View
                </button>
                {employer.status === "pending" && (
                  <>
                    <button
                      onClick={() => setStatus(employer.id, "verified")}
                      className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1.5 rounded-xl hover:bg-green-200 transition"
                    >
                      <Check className="w-3 h-3" /> Verify
                    </button>
                    <button
                      onClick={() => setStatus(employer.id, "rejected")}
                      className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-100 px-2.5 py-1.5 rounded-xl hover:bg-red-200 transition"
                    >
                      <X className="w-3 h-3" /> Reject
                    </button>
                  </>
                )}
                {employer.status === "verified" && (
                  <button
                    onClick={() => setStatus(employer.id, "rejected")}
                    className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1.5 rounded-xl hover:bg-red-100 transition"
                  >
                    <X className="w-3 h-3" /> Suspend
                  </button>
                )}
                {employer.status === "rejected" && (
                  <button
                    onClick={() => setStatus(employer.id, "verified")}
                    className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1.5 rounded-xl hover:bg-green-100 transition"
                  >
                    <Check className="w-3 h-3" /> Reinstate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
