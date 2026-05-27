"use client";

import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  Users, Briefcase, GraduationCap, FileText,
  Building2, TrendingUp, ArrowUpRight, Clock,
  CheckCircle, AlertCircle, ShieldCheck,
} from "lucide-react";
import {
  mockDashboardStats,
  mockRegistrationTrend,
  mockSectorDemand,
  mockLGADistribution,
} from "@/lib/mock/admin";

const KPI_CARDS = [
  {
    label: "Total Job Seekers",
    value: mockDashboardStats.totalJobseekers.toLocaleString(),
    sub: `+${mockDashboardStats.newThisMonth} this month`,
    icon: Users,
    color: "bg-[#EEF2FF]",
    iconColor: "text-[#1E3FAE]",
    trend: "+8.4%",
  },
  {
    label: "Active Vacancies",
    value: mockDashboardStats.activeVacancies.toLocaleString(),
    sub: `${mockDashboardStats.totalEmployers} employers registered`,
    icon: Briefcase,
    color: "bg-green-50",
    iconColor: "text-green-600",
    trend: "+12.1%",
  },
  {
    label: "Total Placements",
    value: mockDashboardStats.placementsThisMonth.toLocaleString(),
    sub: "Confirmed employment outcomes",
    icon: TrendingUp,
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
    trend: "+5.2%",
  },
  {
    label: "Training Enrolments",
    value: mockDashboardStats.trainingEnrolments.toLocaleString(),
    sub: `${mockDashboardStats.totalTrainings} active programmes`,
    icon: GraduationCap,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    trend: "+18.7%",
  },
  {
    label: "CVs Pending Review",
    value: mockDashboardStats.cvsPendingReview.toLocaleString(),
    sub: "Awaiting Ministry validation",
    icon: FileText,
    color: "bg-red-50",
    iconColor: "text-red-500",
    trend: null,
  },
  {
    label: "Pending Verifications",
    value: mockDashboardStats.pendingVerifications.toLocaleString(),
    sub: "Employer/Agency accounts",
    icon: Building2,
    color: "bg-orange-50",
    iconColor: "text-orange-500",
    trend: null,
  },
];

const GENDER_DATA = [
  { name: "Female",  value: mockDashboardStats.femaleJobseekers,      color: "#3B82F6" },
  { name: "Male",    value: mockDashboardStats.maleJobseekers,         color: "#0B1D6E" },
  { name: "PWD",     value: mockDashboardStats.disabilityRegistered,   color: "#F59E0B" },
];

// Distinct per-bar colour ramp for LGA chart (dark → teal)
const LGA_COLORS = ["#0B1D6E", "#1E3FAE", "#3B82F6", "#06B6D4", "#10B981"];

const recentActivity = [
  { icon: CheckCircle, text: "CV validated for Adaeze Okonkwo", time: "5 min ago", color: "text-green-500" },
  { icon: Users, text: "New registration: Rasheed Ibrahim — Shomolu", time: "12 min ago", color: "text-blue-500" },
  { icon: Building2, text: "Employer pending review: TechTalent Lagos", time: "34 min ago", color: "text-yellow-500" },
  { icon: AlertCircle, text: "Vacancy flagged: Suspicious posting — #VAC092", time: "1 hr ago", color: "text-red-500" },
  { icon: ShieldCheck, text: "Identity verified: Emeka Nwosu — NIN confirmed", time: "2 hr ago", color: "text-green-500" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">Ministry Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Lagos State Employment Intelligence — updated in real time</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {KPI_CARDS.map(({ label, value, sub, icon: Icon, color, iconColor, trend }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
              </div>
              {trend && (
                <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />{trend}
                </span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111827]">{value}</p>
              <p className="text-xs text-gray-400 leading-tight mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Registration trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#111827]">Registration Trend</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly new registrations (Nov 2025 – May 2026)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockRegistrationTrend} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #E4E7EF", fontSize: "12px" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fill="url(#regGradient)"
                dot={{ r: 4, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gender / inclusion breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#111827] mb-1">Inclusion Breakdown</h3>
          <p className="text-xs text-gray-400 mb-4">Registered job seekers by demographics</p>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={GENDER_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {GENDER_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => (typeof value === "number" ? value.toLocaleString() : value)}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E4E7EF", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {GENDER_DATA.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-600">{name}</span>
                </div>
                <span className="text-xs font-semibold text-[#111827]">{value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sector demand */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-[#111827] mb-1">Sector Demand vs Supply</h3>
          <p className="text-xs text-gray-400 mb-4">Job vacancy demand compared to registered candidate supply</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockSectorDemand} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} />
              <YAxis type="category" dataKey="sector" tick={{ fontSize: 10, fill: "#6B7280" }} width={70} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #E4E7EF", fontSize: "12px" }}
              />
              <Bar dataKey="demand" name="Vacancies"   fill="#6366F1" radius={[0, 4, 4, 0]} barSize={8} />
              <Bar dataKey="supply" name="Candidates"  fill="#10B981" radius={[0, 4, 4, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-3 h-3 rounded-sm bg-[#6366F1]" /> Vacancies
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-3 h-3 rounded-sm bg-[#10B981]" /> Candidates
            </div>
          </div>
        </div>

        {/* Top LGAs + Recent Activity */}
        <div className="flex flex-col gap-4">
          {/* Top LGAs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-[#111827] mb-3">Top LGAs by Registration</h3>
            <div className="flex flex-col gap-2.5">
              {mockLGADistribution.slice(0, 5).map((item, i) => {
                const max = mockLGADistribution[0].count;
                const color = LGA_COLORS[i];
                return (
                  <div key={item.lga} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-[#374151] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                          {item.lga}
                        </span>
                        <span className="text-gray-400 font-semibold">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{ width: `${(item.count / max) * 100}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">Recent Activity</h3>
            </div>
            <div className="flex flex-col gap-3">
              {recentActivity.map(({ icon: Icon, text, time, color }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#374151] leading-relaxed">{text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{time}</p>
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
