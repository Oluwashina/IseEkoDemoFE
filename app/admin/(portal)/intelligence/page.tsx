"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { TrendingUp, AlertTriangle, BarChart3, Download } from "lucide-react";
import {
  mockSkillsGap,
  mockSectorDemand,
  mockLGADistribution,
  mockRegistrationTrend,
} from "@/lib/mock/admin";

const employmentOutcomes = [
  { month: "Jan", placements: 210, trainings: 380, registrations: 890 },
  { month: "Feb", placements: 265, trainings: 410, registrations: 1100 },
  { month: "Mar", placements: 280, trainings: 450, registrations: 980 },
  { month: "Apr", placements: 298, trainings: 490, registrations: 1320 },
  { month: "May", placements: 318, trainings: 520, registrations: 1243 },
];

const workforceForecast = [
  { year: "2026", supply: 14782, demand: 12400 },
  { year: "2027", supply: 18000, demand: 16800 },
  { year: "2028", supply: 22500, demand: 21200 },
  { year: "2029", supply: 28000, demand: 27000 },
  { year: "2030", supply: 35000, demand: 34500 },
];

export default function IntelligencePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Labour Market Intelligence</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Anonymised insights to inform employment policy and workforce investment decisions
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#0B1D6E] hover:bg-[#071245] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Employment Rate (Platform)", value: "42.3%", sub: "of registered seekers placed", trend: "+3.1%", color: "text-green-600" },
          { label: "Avg. Time to Placement", value: "38 days", sub: "from registration to hire", trend: "-4 days", color: "text-blue-600" },
          { label: "Training Completion Rate", value: "67%", sub: "of enrolled programmes", trend: "+5%", color: "text-purple-600" },
          { label: "Top Skills Gap", value: "Data Analysis", sub: "272 unfilled vacancies", trend: "Critical", color: "text-red-500" },
        ].map(({ label, value, sub, trend, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-[#111827]">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            <span className={`text-xs font-semibold ${color} mt-1 flex items-center gap-1`}>
              <TrendingUp className="w-3 h-3" /> {trend}
            </span>
          </div>
        ))}
      </div>

      {/* Employment outcomes + Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-[#1E3FAE]" />
            <h3 className="font-semibold text-[#111827]">Employment Outcomes (2026)</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">Monthly placements, training enrolments, and new registrations</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={employmentOutcomes} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E4E7EF", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Line type="monotone" dataKey="placements" stroke="#16A34A" strokeWidth={2.5} dot={{ r: 3 }} name="Placements" />
              <Line type="monotone" dataKey="trainings" stroke="#1E3FAE" strokeWidth={2.5} dot={{ r: 3 }} name="Training Enrolments" />
              <Line type="monotone" dataKey="registrations" stroke="#F5C518" strokeWidth={2.5} dot={{ r: 3 }} name="Registrations" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#111827] mb-1">Workforce Supply vs Demand Forecast</h3>
          <p className="text-xs text-gray-400 mb-4">Projected trajectory 2026–2030 based on current growth rates</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={workforceForecast} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E4E7EF", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="supply" name="Workforce Supply" fill="#1E3FAE" radius={[4, 4, 0, 0]} />
              <Bar dataKey="demand" name="Labour Demand" fill="#F5C518" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="font-semibold text-[#111827]">Critical Skills Gaps</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Skills where demand significantly exceeds available supply in Lagos State
          </p>
          <div className="flex flex-col gap-3">
            {mockSkillsGap.map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#374151]">{item.skill}</span>
                  <span className="text-red-500 font-semibold">{item.gap} gap</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full relative">
                  <div
                    className="h-2 bg-green-400 rounded-full absolute top-0 left-0"
                    style={{ width: `${(item.supply / item.demand) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-0.5 text-gray-400">
                  <span>Supply: {item.supply}</span>
                  <span>Demand: {item.demand}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" /> Supply filled
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-100" /> Unfilled gap
            </div>
          </div>
        </div>

        {/* LGA distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#111827] mb-1">LGA Unemployment Density</h3>
          <p className="text-xs text-gray-400 mb-4">
            Number of registered job seekers by Local Government Area
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockLGADistribution} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} />
              <YAxis type="category" dataKey="lga" tick={{ fontSize: 10, fill: "#6B7280" }} width={80} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E4E7EF", fontSize: "12px" }} />
              <Bar dataKey="count" name="Job Seekers" fill="#0B1D6E" radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="bg-[#EEF2FF] border border-[#1E3FAE]/20 rounded-2xl p-4 text-sm text-[#1E3FAE]">
        <strong>Data Governance Notice:</strong>{" "}
        All data displayed on this dashboard is fully anonymised in accordance with Nigeria Data Protection Regulation (NDPR) guidelines.
        No personally identifiable information (PII) is exposed in research or policy outputs.
        Raw data access is restricted to authorised Ministry administrators only.
      </div>
    </div>
  );
}
