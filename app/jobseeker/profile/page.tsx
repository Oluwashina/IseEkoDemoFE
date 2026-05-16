"use client";

import { useState } from "react";
import { Plus, Pencil, Check, User, GraduationCap, Briefcase, Tag, Shield } from "lucide-react";
import { mockUser } from "@/lib/mock/user";
import { mockLGAs } from "@/lib/mock/jobs";

const tabs = ["Personal Info", "Education", "Experience", "Skills", "Identity"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">My Profile</h2>
          <p className="text-sm text-gray-500 mt-0.5">Keep your profile updated to improve your job matches</p>
        </div>
        <div className="bg-[#EEF2FF] rounded-xl px-4 py-2 text-center flex-shrink-0">
          <p className="text-xs text-gray-500">Completion</p>
          <p className="text-lg font-bold text-[#1E3FAE]">{mockUser.profileCompletion}%</p>
        </div>
      </div>

      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0B1D6E] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {mockUser.firstName[0]}{mockUser.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[#111827] text-lg">{mockUser.firstName} {mockUser.lastName}</h3>
              {mockUser.isVerified && (
                <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3" /> Verified
                </span>
              )}
              {mockUser.cvValidated && (
                <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> CV Validated
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{mockUser.email} · {mockUser.phone}</p>
            <p className="text-sm text-gray-500">{mockUser.lga}, Lagos State</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100 px-3 py-2 rounded-xl transition">
            <Pencil className="w-3 h-3" /> Edit
          </button>
        </div>

        {/* Profile completion bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Profile completeness</span>
            <span className="font-semibold text-[#1E3FAE]">{mockUser.profileCompletion}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-2 bg-[#1E3FAE] rounded-full transition-all" style={{ width: `${mockUser.profileCompletion}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 text-xs sm:text-sm font-medium py-2 px-2 rounded-xl transition-all ${
              activeTab === i
                ? "bg-[#0B1D6E] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        {/* Personal Info */}
        {activeTab === 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Personal Information</h3>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] px-3 py-1.5 rounded-xl hover:bg-blue-100 transition">
                <Pencil className="w-3 h-3" /> Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: mockUser.firstName },
                { label: "Last Name", value: mockUser.lastName },
                { label: "Email", value: mockUser.email },
                { label: "Phone", value: mockUser.phone },
                { label: "Date of Birth", value: mockUser.dateOfBirth },
                { label: "Age", value: `${mockUser.age} years` },
                { label: "Gender", value: mockUser.gender },
                { label: "LGA", value: mockUser.lga },
                { label: "Address", value: mockUser.address },
                { label: "Disability", value: mockUser.disability ? "Yes" : "None declared" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#F8F9FC] rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-[#111827]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {activeTab === 1 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Education History</h3>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {mockUser.education.map((edu) => (
                <div key={edu.id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-[#1E3FAE]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">{edu.degree} — {edu.field}</p>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{edu.startYear} – {edu.endYear} · {edu.grade}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-[#1E3FAE] flex-shrink-0">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {activeTab === 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Work Experience</h3>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {mockUser.experience.map((exp) => (
                <div key={exp.id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1E3FAE] flex-shrink-0 mt-2" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#111827]">{exp.role}</p>
                        {exp.current && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Current</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{exp.company} · {exp.location}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-[#1E3FAE] flex-shrink-0">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {activeTab === 3 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Skills & Expertise</h3>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                <Plus className="w-3 h-3" /> Add Skills
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockUser.skills.map((skill) => (
                <div key={skill} className="flex items-center gap-1.5 bg-[#EEF2FF] text-[#1E3FAE] text-sm font-medium px-3 py-1.5 rounded-xl group">
                  {skill}
                  <button className="opacity-0 group-hover:opacity-100 text-[#1E3FAE] hover:text-red-500 transition">×</button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Skills help employers find you. Add up to 20 skills relevant to your work.
            </p>
          </div>
        )}

        {/* Identity */}
        {activeTab === 4 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#1E3FAE]" />
              <h3 className="font-semibold text-[#111827]">Identity & Verification</h3>
            </div>
            <div className="bg-[#FEF3C7] border border-yellow-200 rounded-xl p-4 mb-4 text-sm text-yellow-800">
              <strong>Privacy Notice:</strong> Your identity documents are encrypted and used solely for platform verification. They are never shared with employers.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "NIN", value: "•••••••" + mockUser.nin.slice(-4), verified: true },
                { label: "BVN", value: "•••••••" + mockUser.bvn.slice(-4), verified: true },
              ].map(({ label, value, verified }) => (
                <div key={label} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{label}</p>
                    {verified ? (
                      <span className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-xs text-yellow-600 font-semibold">Pending</span>
                    )}
                  </div>
                  <p className="text-base font-mono font-semibold text-[#111827] mt-1 tracking-widest">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-gray-100 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-700">Identity Fully Verified</p>
                <p className="text-xs text-gray-400 mt-0.5">Verified on {mockUser.joinedDate} via NIMC integration</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
