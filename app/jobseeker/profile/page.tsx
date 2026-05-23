"use client";

import { useState } from "react";
import {
  Plus, Pencil, Check, User, GraduationCap, Briefcase,
  Tag, Shield, Lock, X, Save, ChevronDown,
} from "lucide-react";
import { mockUser } from "@/lib/mock/user";

const TABS = ["Personal Info", "Education", "Experience", "Skills", "Identity"];

const SUGGESTED_SKILLS = [
  "Python", "Java", "C#", "Vue.js", "Angular", "Docker", "Kubernetes",
  "AWS", "Azure", "Product Management", "Agile", "Scrum", "Data Science",
  "Machine Learning", "UX Research", "Figma", "Adobe XD", "SEO",
  "Google Analytics", "Content Writing", "Project Management", "Leadership",
];

type EduItem = typeof mockUser.education[0];
type ExpItem = typeof mockUser.experience[0];

// ─── Shared field row ────────────────────────────────────────────────────────

function FieldRow({
  label, value, editable = false, locked = false,
  inputType = "text", children,
}: {
  label: string; value: string; editable?: boolean; locked?: boolean;
  inputType?: string; children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl px-4 py-3 ${editable ? "bg-white border-2 border-[#1E3FAE]/30" : "bg-[#F8F9FC]"}`}>
      <div className="flex items-center justify-between mb-0.5">
        <p className="text-xs text-gray-400">{label}</p>
        {locked && <Lock className="w-3 h-3 text-gray-300" />}
        {editable && <span className="text-[10px] text-[#1E3FAE] font-semibold">Editable</span>}
      </div>
      {children ?? <p className="text-sm font-medium text-[#111827]">{value}</p>}
    </div>
  );
}

// ─── Education form ───────────────────────────────────────────────────────────

function EduForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: EduItem;
  onSave: (item: EduItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<EduItem>(initial ?? {
    id: `edu${Date.now()}`, institution: "", degree: "", field: "",
    startYear: new Date().getFullYear() - 4, endYear: new Date().getFullYear(), grade: "",
  });
  const set = (k: keyof EduItem, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="border-2 border-[#1E3FAE]/20 bg-[#EEF2FF]/30 rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-[#1E3FAE] uppercase tracking-wide">{initial ? "Edit Education" : "Add Education"}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {([
          { key: "institution", label: "Institution", span: true },
          { key: "degree",      label: "Degree / Qualification" },
          { key: "field",       label: "Field of Study" },
          { key: "startYear",   label: "Start Year",  type: "number" },
          { key: "endYear",     label: "End Year",    type: "number" },
          { key: "grade",       label: "Grade / Result" },
        ] as { key: keyof EduItem; label: string; span?: boolean; type?: string }[]).map(({ key, label, span, type }) => (
          <div key={key} className={span ? "sm:col-span-2" : ""}>
            <label className="text-xs text-gray-500 mb-1 block">{label}</label>
            <input
              type={type ?? "text"}
              value={String(form[key] ?? "")}
              onChange={(e) => set(key, type === "number" ? Number(e.target.value) : e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className="flex-1 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button onClick={() => onSave(form)} className="flex-1 text-sm font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>
    </div>
  );
}

// ─── Experience form ──────────────────────────────────────────────────────────

function ExpForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: ExpItem;
  onSave: (item: ExpItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ExpItem>(initial ?? {
    id: `exp${Date.now()}`, company: "", role: "", location: "",
    startDate: "", endDate: null, current: false, description: "",
  });
  const set = (k: keyof ExpItem, v: string | boolean | null) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="border-2 border-[#1E3FAE]/20 bg-[#EEF2FF]/30 rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-[#1E3FAE] uppercase tracking-wide">{initial ? "Edit Experience" : "Add Experience"}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {([
          { key: "role",     label: "Job Title / Role" },
          { key: "company",  label: "Company" },
          { key: "location", label: "Location" },
          { key: "startDate",label: "Start Date (e.g. 2023-06)" },
        ] as { key: keyof ExpItem; label: string }[]).map(({ key, label }) => (
          <div key={key}>
            <label className="text-xs text-gray-500 mb-1 block">{label}</label>
            <input
              value={String(form[key] ?? "")}
              onChange={(e) => set(key, e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
            />
          </div>
        ))}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">End Date</label>
          <input
            value={form.endDate ?? ""}
            disabled={form.current}
            onChange={(e) => set("endDate", e.target.value)}
            placeholder={form.current ? "Present" : "e.g. 2024-01"}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition disabled:opacity-40"
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input id="current" type="checkbox" checked={form.current} onChange={(e) => { set("current", e.target.checked); if (e.target.checked) set("endDate", null); }}
            className="w-4 h-4 accent-[#1E3FAE]" />
          <label htmlFor="current" className="text-sm text-gray-600 cursor-pointer">Currently working here</label>
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Description</label>
        <textarea rows={3} value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition resize-none" />
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className="flex-1 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button onClick={() => onSave(form)} className="flex-1 text-sm font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] py-2.5 rounded-xl transition flex items-center justify-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);

  // ── Personal Info state ────────────────────────────────────────────────────
  const [personalEdit, setPersonalEdit] = useState(false);
  const [phone,   setPhone]   = useState(mockUser.phone);
  const [address, setAddress] = useState(mockUser.address);

  // ── Education state ────────────────────────────────────────────────────────
  const [eduItems, setEduItems]     = useState<EduItem[]>(mockUser.education);
  const [showEduForm, setShowEduForm] = useState(false);
  const [editEduId,  setEditEduId]  = useState<string | null>(null);

  // ── Experience state ───────────────────────────────────────────────────────
  const [expItems, setExpItems]     = useState<ExpItem[]>(mockUser.experience);
  const [showExpForm, setShowExpForm] = useState(false);
  const [editExpId,  setEditExpId]  = useState<string | null>(null);

  // ── Skills state ───────────────────────────────────────────────────────────
  const [skills,     setSkills]     = useState<string[]>(mockUser.skills);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SUGGESTED_SKILLS.filter(
    (s) => !skills.includes(s) && s.toLowerCase().includes(skillInput.toLowerCase())
  );

  function addSkill(s: string) {
    const trimmed = s.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills((p) => [...p, trimmed]);
    setSkillInput("");
    setShowSuggestions(false);
  }
  function removeSkill(s: string) { setSkills((p) => p.filter((x) => x !== s)); }

  // ── Education helpers ──────────────────────────────────────────────────────
  function saveEdu(item: EduItem) {
    setEduItems((p) =>
      editEduId ? p.map((e) => e.id === editEduId ? item : e) : [...p, item]
    );
    setShowEduForm(false);
    setEditEduId(null);
  }
  function deleteEdu(id: string) { setEduItems((p) => p.filter((e) => e.id !== id)); }

  // ── Experience helpers ─────────────────────────────────────────────────────
  function saveExp(item: ExpItem) {
    setExpItems((p) =>
      editExpId ? p.map((e) => e.id === editExpId ? item : e) : [...p, item]
    );
    setShowExpForm(false);
    setEditExpId(null);
  }
  function deleteExp(id: string) { setExpItems((p) => p.filter((e) => e.id !== id)); }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Page header */}
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
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-[#0B1D6E] flex items-center justify-center text-white text-xl font-bold">
              {mockUser.firstName[0]}{mockUser.lastName[0]}
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#1E3FAE] rounded-full flex items-center justify-center shadow-md hover:bg-[#0B1D6E] transition">
              <Pencil className="w-3 h-3 text-white" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
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
            <p className="text-sm text-gray-500 mt-0.5 truncate">{mockUser.email} · {phone}</p>
            <p className="text-sm text-gray-500">{mockUser.lga}, Lagos State</p>
          </div>
        </div>
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
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`flex-1 text-xs sm:text-sm font-medium py-2 px-2 rounded-xl transition-all ${
              activeTab === i ? "bg-[#0B1D6E] text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >{tab}</button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">

        {/* ── PERSONAL INFO ────────────────────────────────────────── */}
        {activeTab === 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Personal Information</h3>
              </div>
              {!personalEdit ? (
                <button onClick={() => setPersonalEdit(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] px-3 py-1.5 rounded-xl hover:bg-blue-100 transition">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setPersonalEdit(false)}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl hover:bg-gray-200 transition">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                  <button onClick={() => setPersonalEdit(false)}
                    className="flex items-center gap-1 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                    <Save className="w-3 h-3" /> Save
                  </button>
                </div>
              )}
            </div>

            {personalEdit && (
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 mb-4 text-xs text-blue-700">
                <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>Only <strong>Phone Number</strong> and <strong>Address</strong> can be changed. Other fields are set at registration and verified by the platform.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldRow label="First Name"    value={mockUser.firstName}               locked={personalEdit} />
              <FieldRow label="Last Name"     value={mockUser.lastName}                locked={personalEdit} />
              <FieldRow label="Email"         value={mockUser.email}                   locked={personalEdit} />
              <FieldRow label="Date of Birth" value={mockUser.dateOfBirth}             locked={personalEdit} />
              <FieldRow label="Gender"        value={mockUser.gender}                  locked={personalEdit} />
              <FieldRow label="LGA"           value={mockUser.lga}                     locked={personalEdit} />

              {/* Phone — editable */}
              <FieldRow label="Phone Number" value={phone} editable={personalEdit}>
                {personalEdit ? (
                  <input value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-0.5 bg-transparent text-sm font-medium text-[#111827] outline-none border-b border-[#1E3FAE]/40 pb-0.5 focus:border-[#1E3FAE]" />
                ) : <p className="text-sm font-medium text-[#111827]">{phone}</p>}
              </FieldRow>

              {/* Address — editable */}
              <FieldRow label="Address" value={address} editable={personalEdit}>
                {personalEdit ? (
                  <input value={address} onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-0.5 bg-transparent text-sm font-medium text-[#111827] outline-none border-b border-[#1E3FAE]/40 pb-0.5 focus:border-[#1E3FAE]" />
                ) : <p className="text-sm font-medium text-[#111827]">{address}</p>}
              </FieldRow>

              <FieldRow label="Disability" value={mockUser.disability ? "Yes" : "None declared"} locked={personalEdit} />
            </div>
          </div>
        )}

        {/* ── EDUCATION ────────────────────────────────────────────── */}
        {activeTab === 1 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Education History</h3>
              </div>
              {!showEduForm && (
                <button onClick={() => { setShowEduForm(true); setEditEduId(null); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                  <Plus className="w-3 h-3" /> Add
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {/* Add form */}
              {showEduForm && !editEduId && (
                <EduForm
                  onSave={saveEdu}
                  onCancel={() => setShowEduForm(false)}
                />
              )}

              {eduItems.map((edu) => (
                editEduId === edu.id ? (
                  <EduForm key={edu.id} initial={edu}
                    onSave={saveEdu}
                    onCancel={() => setEditEduId(null)}
                  />
                ) : (
                  <div key={edu.id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-3 hover:border-gray-200 transition">
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
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setEditEduId(edu.id)} className="text-gray-400 hover:text-[#1E3FAE] p-1.5 rounded-lg hover:bg-[#EEF2FF] transition">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteEdu(edu.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              ))}

              {eduItems.length === 0 && !showEduForm && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                  <GraduationCap className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No education added yet</p>
                  <button onClick={() => setShowEduForm(true)} className="text-xs font-semibold text-[#1E3FAE] mt-2 hover:underline">Add your first qualification</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── EXPERIENCE ───────────────────────────────────────────── */}
        {activeTab === 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Work Experience</h3>
              </div>
              {!showExpForm && (
                <button onClick={() => { setShowExpForm(true); setEditExpId(null); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E3FAE] px-3 py-1.5 rounded-xl hover:bg-[#0B1D6E] transition">
                  <Plus className="w-3 h-3" /> Add
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {showExpForm && !editExpId && (
                <ExpForm
                  onSave={saveExp}
                  onCancel={() => setShowExpForm(false)}
                />
              )}

              {expItems.map((exp) => (
                editExpId === exp.id ? (
                  <ExpForm key={exp.id} initial={exp}
                    onSave={saveExp}
                    onCancel={() => setEditExpId(null)}
                  />
                ) : (
                  <div key={exp.id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-3 hover:border-gray-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#1E3FAE] flex-shrink-0 mt-2" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[#111827]">{exp.role}</p>
                          {exp.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Current</span>}
                        </div>
                        <p className="text-sm text-gray-500">{exp.company} · {exp.location}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</p>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setEditExpId(exp.id)} className="text-gray-400 hover:text-[#1E3FAE] p-1.5 rounded-lg hover:bg-[#EEF2FF] transition">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteExp(exp.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              ))}

              {expItems.length === 0 && !showExpForm && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                  <Briefcase className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No experience added yet</p>
                  <button onClick={() => setShowExpForm(true)} className="text-xs font-semibold text-[#1E3FAE] mt-2 hover:underline">Add your first role</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SKILLS ───────────────────────────────────────────────── */}
        {activeTab === 3 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#1E3FAE]" />
                <h3 className="font-semibold text-[#111827]">Skills & Expertise</h3>
                <span className="text-xs text-gray-400">{skills.length}/20</span>
              </div>
            </div>

            {/* Current skills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-1.5 bg-[#EEF2FF] text-[#1E3FAE] text-sm font-medium px-3 py-1.5 rounded-xl group transition-all hover:bg-blue-100">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="w-4 h-4 rounded-full bg-[#1E3FAE]/10 hover:bg-red-100 flex items-center justify-center transition text-[#1E3FAE] hover:text-red-500">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-gray-400">No skills added yet</p>
              )}
            </div>

            {/* Add skill input */}
            {skills.length < 20 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Add a skill</p>
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        value={skillInput}
                        onChange={(e) => { setSkillInput(e.target.value); setShowSuggestions(true); }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(e) => { if (e.key === "Enter" && skillInput.trim()) addSkill(skillInput); if (e.key === "Escape") setShowSuggestions(false); }}
                        placeholder="Type a skill (e.g. Python, Figma...)"
                        className="w-full bg-[#F8F9FC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition"
                      />
                      {/* Suggestions dropdown */}
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-40 overflow-y-auto">
                          {filteredSuggestions.slice(0, 8).map((s) => (
                            <button key={s} onMouseDown={() => addSkill(s)}
                              className="w-full text-left text-sm px-4 py-2 hover:bg-[#EEF2FF] hover:text-[#1E3FAE] transition first:rounded-t-xl last:rounded-b-xl">
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => { if (skillInput.trim()) addSkill(skillInput); }}
                      disabled={!skillInput.trim()}
                      className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] px-4 py-2.5 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>

                {/* Quick-add suggestions */}
                {!skillInput && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Quick add:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).slice(0, 8).map((s) => (
                        <button key={s} onClick={() => addSkill(s)}
                          className="text-xs text-gray-600 bg-gray-100 hover:bg-[#EEF2FF] hover:text-[#1E3FAE] px-2.5 py-1 rounded-lg transition flex items-center gap-1">
                          <Plus className="w-2.5 h-2.5" /> {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {skills.length >= 20 && (
              <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3">You&apos;ve reached the 20-skill limit. Remove a skill to add a new one.</p>
            )}
          </div>
        )}

        {/* ── IDENTITY ─────────────────────────────────────────────── */}
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
                { label: "NIN",       value: "•••••••" + mockUser.nin.slice(-4),        verified: true },
                { label: "LASSRA ID", value: "LSR-••••-" + mockUser.lassra.slice(-6),   verified: true },
              ].map(({ label, value, verified }) => (
                <div key={label} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{label}</p>
                    {verified
                      ? <span className="flex items-center gap-1 text-xs text-green-700 font-semibold"><Check className="w-3 h-3" /> Verified</span>
                      : <span className="text-xs text-yellow-600 font-semibold">Pending</span>
                    }
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
