"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  ChevronDown,
  GraduationCap,
  Award,
  CheckCircle,
} from "lucide-react";
import { mockTrainings, mockTrainingCategories } from "@/lib/mock/training";
import { mockUser } from "@/lib/mock/user";

export default function TrainingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [modeFilter, setModeFilter] = useState("All");
  const [sponsoredOnly, setSponsoredOnly] = useState(false);

  const filtered = mockTrainings.filter((t) => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.provider.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All Categories" || t.category === category;
    const matchMode = modeFilter === "All" || t.mode === modeFilter;
    const matchSponsored = !sponsoredOnly || t.sponsored;
    return matchSearch && matchCat && matchMode && matchSponsored;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">Training & Skills</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Browse government-sponsored and private training programmes across Lagos State
        </p>
      </div>

      {/* My Certifications */}
      {mockUser.completedTrainings.length > 0 && (
        <div className="bg-[#0B1D6E] rounded-2xl p-5 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-[#0B1D6E]" />
            </div>
            <div>
              <p className="font-semibold">You have {mockUser.completedTrainings.length} digital certification</p>
              <p className="text-white/60 text-sm mt-0.5">Certified Fashion Artisan — Lagos State Fashion Council</p>
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex-shrink-0">
            View Badges
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, provider, or skill..."
            className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition cursor-pointer"
            >
              {mockTrainingCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition cursor-pointer"
            >
              {["All", "Physical", "Online", "Hybrid"].map((m) => <option key={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sponsoredOnly}
              onChange={(e) => setSponsoredOnly(e.target.checked)}
              className="w-4 h-4 accent-[#1E3FAE]"
            />
            <span className="text-sm text-gray-600">Free / Sponsored only</span>
          </label>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-[#111827]">{filtered.length}</span> programmes
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((training) => {
          const isEnrolled = mockUser.enrolledTrainings.includes(training.id);
          const isCompleted = mockUser.completedTrainings.includes(training.id);
          const seatsLeft = training.seats - training.enrolled;
          const fillPercent = (training.enrolled / training.seats) * 100;

          return (
            <div key={training.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md hover:border-[#1E3FAE]/20 transition-all">
              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-[#0B1D6E] to-[#1E3FAE]" />

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: training.logoColor }}
                  >
                    {training.providerLogo}
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    {training.sponsored && (
                      <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                        Gov't Sponsored
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" /> Certified
                      </span>
                    )}
                    {isEnrolled && !isCompleted && (
                      <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                        Enrolled
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-semibold text-[#111827] text-sm leading-snug mb-1">{training.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{training.provider}</p>

                <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1">{training.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {training.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#EEF2FF] text-[#1E3FAE] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>

                <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span>{training.duration} · {training.mode}</span>
                  </div>
                  {training.mode !== "Online" && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{training.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3 h-3 flex-shrink-0" />
                    <span>{training.level} · {training.certification ? "Certification included" : "No certification"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 flex-shrink-0 text-yellow-400" />
                    <span>{training.rating} rating</span>
                  </div>
                </div>

                {/* Seats */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Users className="w-3 h-3" /> {training.enrolled} enrolled
                    </span>
                    <span className={`font-semibold ${seatsLeft <= 5 ? "text-red-500" : "text-gray-500"}`}>
                      {seatsLeft} seats left
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className={`h-1.5 rounded-full ${fillPercent >= 90 ? "bg-red-400" : fillPercent >= 70 ? "bg-yellow-400" : "bg-[#1E3FAE]"}`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`text-sm font-bold ${training.sponsored ? "text-green-600" : "text-[#0B1D6E]"}`}>
                    {training.cost}
                  </span>
                  {isCompleted ? (
                    <button className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-xl cursor-default">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </button>
                  ) : isEnrolled ? (
                    <button className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-xl hover:bg-blue-200 transition">
                      Continue →
                    </button>
                  ) : seatsLeft === 0 ? (
                    <button disabled className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl cursor-not-allowed">
                      Full
                    </button>
                  ) : (
                    <button className="text-xs font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] px-3 py-1.5 rounded-xl transition">
                      Enrol Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
