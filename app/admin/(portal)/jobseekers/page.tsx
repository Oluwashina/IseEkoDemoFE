"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, ChevronDown, Eye, FileText, MoreHorizontal,
  Users, Shield, Accessibility, User, Check, X,
} from "lucide-react";
import { mockJobseekers } from "@/lib/mock/admin";

// ─── Reusable multi-select dropdown ──────────────────────────────────────────

function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: string; display: string }[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(value: string) {
    const next = new Set(selected);
    next.has(value) ? next.delete(value) : next.add(value);
    onChange(next);
  }

  function toggleAll() {
    onChange(selected.size === options.length ? new Set() : new Set(options.map((o) => o.value)));
  }

  const summary =
    selected.size === 0
      ? `All ${label}`
      : selected.size === 1
      ? options.find((o) => o.value === [...selected][0])?.display ?? "1 selected"
      : `${selected.size} ${label}`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 bg-[#F8F9FC] border rounded-xl pl-3 pr-2.5 py-2.5 text-sm transition cursor-pointer min-w-[140px] ${
          selected.size > 0
            ? "border-[#1E3FAE] bg-[#EEF2FF] text-[#1E3FAE] font-semibold"
            : "border-gray-100 text-gray-700"
        }`}
      >
        <span className="flex-1 text-left truncate">{summary}</span>
        {selected.size > 0 && (
          <span
            onClick={(e) => { e.stopPropagation(); onChange(new Set()); }}
            className="w-4 h-4 rounded-full bg-[#1E3FAE]/20 hover:bg-[#1E3FAE]/40 flex items-center justify-center flex-shrink-0 transition"
          >
            <X className="w-2.5 h-2.5" />
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform text-gray-400 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 min-w-[180px] overflow-hidden">
          {/* Select all toggle */}
          <button
            onClick={toggleAll}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 border-b border-gray-100 transition"
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${
              selected.size === options.length
                ? "bg-[#1E3FAE] border-[#1E3FAE]"
                : selected.size > 0
                ? "border-[#1E3FAE]"
                : "border-gray-300"
            }`}>
              {selected.size === options.length && <Check className="w-2.5 h-2.5 text-white" />}
              {selected.size > 0 && selected.size < options.length && (
                <div className="w-2 h-0.5 bg-[#1E3FAE]" />
              )}
            </div>
            {selected.size === options.length ? "Deselect all" : "Select all"}
          </button>

          {options.map(({ value, display }) => (
            <button
              key={value}
              onClick={() => toggle(value)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left hover:bg-[#EEF2FF] transition"
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${
                selected.has(value) ? "bg-[#1E3FAE] border-[#1E3FAE]" : "border-gray-300"
              }`}>
                {selected.has(value) && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <span className={selected.has(value) ? "font-semibold text-[#1E3FAE]" : "text-gray-700"}>
                {display}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  seeking:      { label: "Seeking",      bg: "bg-blue-100",   text: "text-blue-700" },
  employed:     { label: "Employed",     bg: "bg-green-100",  text: "text-green-700" },
  underemployed:{ label: "Underemployed",bg: "bg-yellow-100", text: "text-yellow-700" },
  training:     { label: "In Training",  bg: "bg-purple-100", text: "text-purple-700" },
};

export default function JobseekersPage() {
  const [search, setSearch]               = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [selectedLGAs, setSelectedLGAs]   = useState<Set<string>>(new Set());
  const [selectedSeeker, setSelectedSeeker] = useState<typeof mockJobseekers[0] | null>(null);

  const filtered = mockJobseekers.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = selectedStatuses.size === 0 || selectedStatuses.has(s.status);
    const matchLga    = selectedLGAs.size === 0     || selectedLGAs.has(s.lga);
    return matchSearch && matchStatus && matchLga;
  });

  const lgaOptions = Array.from(new Set(mockJobseekers.map((s) => s.lga)))
    .sort()
    .map((l) => ({ value: l, display: l }));

  const statusOptions = Object.entries(statusConfig).map(([value, { label }]) => ({
    value,
    display: label,
  }));

  const activeFilterCount = selectedStatuses.size + selectedLGAs.size;

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Job Seekers</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} of {mockJobseekers.length} registered (demo sample)
          </p>
        </div>
        <button className="bg-[#0B1D6E] hover:bg-[#071245] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
          Export CSV
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "Total Registered", value: "14,782", color: "bg-[#EEF2FF] text-[#1E3FAE]" },
          { icon: User, label: "Seeking Jobs", value: "9,241", color: "bg-blue-50 text-blue-600" },
          { icon: Shield, label: "Identity Verified", value: "11,893", color: "bg-green-50 text-green-600" },
          { icon: Accessibility, label: "PWD Registered", value: "412", color: "bg-yellow-50 text-yellow-600" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${color.split(" ")[0]} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${color.split(" ")[1]}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#111827]">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3 flex-wrap items-center">
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
          />
        </div>

        <MultiSelect
          label="Statuses"
          options={statusOptions}
          selected={selectedStatuses}
          onChange={setSelectedStatuses}
        />

        <MultiSelect
          label="LGAs"
          options={lgaOptions}
          selected={selectedLGAs}
          onChange={setSelectedLGAs}
        />

        {activeFilterCount > 0 && (
          <button
            onClick={() => { setSelectedStatuses(new Set()); setSelectedLGAs(new Set()); }}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2.5 rounded-xl transition"
          >
            <X className="w-3.5 h-3.5" /> Clear filters
            <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">LGA</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Education</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Skills</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">CV</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((seeker) => {
                const sc = statusConfig[seeker.status];
                return (
                  <tr
                    key={seeker.id}
                    className={`hover:bg-[#F8F9FC] transition cursor-pointer ${selectedSeeker?.id === seeker.id ? "bg-[#EEF2FF]" : ""}`}
                    onClick={() => setSelectedSeeker(selectedSeeker?.id === seeker.id ? null : seeker)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0B1D6E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {seeker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827]">{seeker.name}</p>
                          <p className="text-xs text-gray-400">{seeker.gender} · {seeker.age} yrs{seeker.disability ? " · PWD" : ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{seeker.lga}</td>
                    <td className="px-4 py-3.5 text-gray-600 text-xs hidden md:table-cell">{seeker.education}</td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {seeker.skills.slice(0, 2).map((s) => (
                          <span key={s} className="text-xs bg-[#EEF2FF] text-[#1E3FAE] px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                        {seeker.skills.length > 2 && (
                          <span className="text-xs text-gray-400">+{seeker.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      {seeker.cvValidated ? (
                        <span className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                          <FileText className="w-3 h-3" /> Validated
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected seeker detail */}
        {selectedSeeker && (
          <div className="border-t border-gray-100 p-5 bg-[#F8F9FC]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0B1D6E] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {selectedSeeker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-[#111827]">{selectedSeeker.name}</p>
                  <p className="text-sm text-gray-500">{selectedSeeker.education} · {selectedSeeker.lga}, Lagos</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                  <Eye className="w-3 h-3" /> View Full Profile
                </button>
                {!selectedSeeker.cvValidated && (
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-xl hover:bg-green-200 transition">
                    <FileText className="w-3 h-3" /> Validate CV
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSeeker.skills.map((s) => (
                <span key={s} className="bg-[#EEF2FF] text-[#1E3FAE] text-xs font-medium px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
