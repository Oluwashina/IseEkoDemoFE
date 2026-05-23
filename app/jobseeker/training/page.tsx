"use client";

import React, { useState } from "react";
import {
  Search, MapPin, Clock, Users, Star, ChevronDown,
  GraduationCap, Award, CheckCircle, Zap, BookOpen,
  Play, CalendarClock, ChevronRight, ExternalLink, Shield,
  X, Lock, CheckCircle2,
} from "lucide-react";
import { mockTrainings, mockTrainingCategories } from "@/lib/mock/training";
import { mockUser } from "@/lib/mock/user";

// ─── Types ────────────────────────────────────────────────────────────────────

type Training   = typeof mockTrainings[0];
type TabId      = "all" | "mine" | "certs";
type MineSubTab = "progress" | "upcoming" | "completed" | "recommended";
type CertSubTab = "earned" | "pending" | "howto";
type ModalType  = "enrol" | "schedule" | "lesson" | "cert-view";
type ModalState = { type: ModalType; training: Training } | null;

// ─── Module list for lesson modal ─────────────────────────────────────────────

const COURSE_MODULES: Record<string, { title: string; weeks: string; done: boolean; current?: boolean }[]> = {
  t001: [
    { title: "HTML & CSS Fundamentals",   weeks: "Weeks 1–2",  done: true },
    { title: "JavaScript Basics",         weeks: "Weeks 3–4",  done: true },
    { title: "JavaScript DOM & Events",   weeks: "Weeks 5–6",  done: true },
    { title: "React Fundamentals",        weeks: "Weeks 7–8",  done: false, current: true },
    { title: "React State & Hooks",       weeks: "Weeks 9–10", done: false },
    { title: "Node.js & Express",         weeks: "Weeks 11–12",done: false },
    { title: "SQL & Databases",           weeks: "Weeks 13–14",done: false },
    { title: "Full Stack Projects",       weeks: "Weeks 15–16",done: false },
    { title: "Deployment & DevOps",       weeks: "Weeks 17–18",done: false },
    { title: "Capstone Project",          weeks: "Weeks 19–24",done: false },
  ],
};

// ─── Session schedule for schedule modal ──────────────────────────────────────

const SESSION_SCHEDULES: Record<string, { date: string; time: string; topic: string; venue?: string }[]> = {
  t003: [
    { date: "Tue 10 Jun 2026", time: "09:00 – 12:00", topic: "Financial Planning Basics" },
    { date: "Fri 13 Jun 2026", time: "09:00 – 12:00", topic: "Budgeting & Saving" },
    { date: "Tue 17 Jun 2026", time: "09:00 – 12:00", topic: "Introduction to Bookkeeping" },
    { date: "Fri 20 Jun 2026", time: "09:00 – 12:00", topic: "Access to Finance" },
    { date: "Tue 24 Jun 2026", time: "09:00 – 12:00", topic: "Starting a Micro-Enterprise" },
    { date: "Fri 27 Jun 2026", time: "09:00 – 12:00", topic: "Final Assessment & Presentations", venue: "Boardroom A" },
  ],
};

// ─── Modal ────────────────────────────────────────────────────────────────────

function TrainingModal({
  modal,
  onClose,
  onConfirmEnrol,
}: {
  modal: ModalState;
  onClose: () => void;
  onConfirmEnrol: (t: Training) => void;
}) {
  const isOpen = !!modal;
  const { type, training } = modal ?? { type: null, training: null };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!training ? null : (
          <>
        {/* Coloured top bar */}
        <div className="h-1.5 flex-shrink-0" style={{ background: `linear-gradient(to right, ${training.logoColor}, #0B1D6E)` }} />

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: training.logoColor }}>
              {training.providerLogo}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[#111827] text-sm leading-snug truncate">{training.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{training.provider}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 ml-3 transition">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5">
          <div>

          {/* ── ENROL CONFIRMATION ─────────────────────────── */}
          {type === "enrol" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">You&apos;re about to register your seat for this programme. Please confirm the details below.</p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Mode",       value: training.mode },
                  { label: "Duration",   value: training.duration },
                  { label: "Level",      value: training.level },
                  { label: "Start Date", value: training.startDate },
                  { label: "Location",   value: training.mode === "Online" ? "Remote / Online" : training.location },
                  { label: "Cost",       value: training.cost },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F8F9FC] rounded-xl px-3 py-2">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-[#111827] mt-0.5 leading-tight">{value}</p>
                  </div>
                ))}
              </div>

              {training.certification && (
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2.5">
                  <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <p className="text-xs text-yellow-700 font-semibold">This programme awards a digital certification: <span className="font-bold">{training.badgeTitle}</span></p>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button onClick={onClose} className="flex-1 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl transition">
                  Cancel
                </button>
                <button
                  onClick={() => onConfirmEnrol(training)}
                  className="flex-1 text-sm font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] py-3 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirm Enrolment
                </button>
              </div>
            </div>
          )}

          {/* ── VIEW SCHEDULE ──────────────────────────────── */}
          {type === "schedule" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{training.mode === "Online" ? "Remote / Online" : training.location}</span>
              </div>

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Upcoming Sessions</p>

              <div className="space-y-2">
                {(SESSION_SCHEDULES[training.id] ?? [
                  { date: `${training.startDate}`, time: "09:00 – 17:00", topic: "Orientation & Module 1" },
                  { date: "Week 2", time: "09:00 – 17:00", topic: "Module 2 — Core Skills" },
                  { date: "Week 3", time: "09:00 – 17:00", topic: "Module 3 — Practical Application" },
                  { date: "Final Week", time: "09:00 – 15:00", topic: "Assessment & Certification" },
                ]).map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#F8F9FC] rounded-xl px-3 py-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CalendarClock className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">{s.topic}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.date} · {s.time}</p>
                      {s.venue && <p className="text-xs text-gray-400 mt-0.5">{s.venue}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 py-3 rounded-xl transition border border-purple-100">
                <CalendarClock className="w-4 h-4" /> Add all sessions to Calendar
              </button>
            </div>
          )}

          {/* ── LESSON / CONTINUE ──────────────────────────── */}
          {type === "lesson" && (
            <div className="space-y-4">
              {/* Progress summary */}
              {mockUser.trainingProgress[training.id as keyof typeof mockUser.trainingProgress] && (() => {
                const prog = mockUser.trainingProgress[training.id as keyof typeof mockUser.trainingProgress];
                return (
                  <div className="bg-[#EEF2FF] rounded-xl p-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500 font-medium">Overall Progress</span>
                      <span className="font-bold text-[#1E3FAE]">{prog.progressPercent}%</span>
                    </div>
                    <div className="h-2 bg-white rounded-full">
                      <div className="h-2 bg-[#1E3FAE] rounded-full transition-all" style={{ width: `${prog.progressPercent}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Last activity: {prog.lastActivity}</p>
                  </div>
                );
              })()}

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Course Modules</p>

              <div className="space-y-2">
                {(COURSE_MODULES[training.id] ?? [
                  { title: "Introduction & Orientation",  weeks: "Week 1",        done: true  },
                  { title: "Core Concepts",               weeks: "Weeks 2–3",     done: true  },
                  { title: "Practical Workshop",          weeks: "Weeks 4–5",     done: false, current: true },
                  { title: "Advanced Topics",             weeks: "Weeks 6–7",     done: false },
                  { title: "Final Assessment",            weeks: "Final Week",    done: false },
                ]).map((mod, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border ${
                      mod.current
                        ? "bg-[#EEF2FF] border-[#1E3FAE]/20"
                        : "bg-[#F8F9FC] border-transparent"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      mod.done    ? "bg-green-100" :
                      mod.current ? "bg-[#1E3FAE]" :
                                    "bg-gray-100"
                    }`}>
                      {mod.done    ? <CheckCircle className="w-3.5 h-3.5 text-green-600" /> :
                       mod.current ? <Play className="w-3 h-3 text-white" /> :
                                     <Lock className="w-3 h-3 text-gray-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold truncate ${mod.current ? "text-[#1E3FAE]" : mod.done ? "text-gray-500" : "text-gray-400"}`}>
                        {mod.title}
                      </p>
                      <p className="text-[10px] text-gray-400">{mod.weeks}</p>
                    </div>
                    {mod.current && (
                      <span className="text-[10px] font-bold bg-[#1E3FAE] text-white px-2 py-0.5 rounded-full flex-shrink-0">Now</span>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] py-3 rounded-xl transition">
                <Play className="w-4 h-4" /> Resume Current Module
              </button>
            </div>
          )}

          {/* ── CERTIFICATE VIEW ───────────────────────────── */}
          {type === "cert-view" && (() => {
            const cert = mockUser.certifications.find((c) => c.trainingId === training.id);
            return cert ? (
              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-5 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 relative" style={{ backgroundColor: cert.logoColor }}>
                    {cert.providerLogo}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                      <Award className="w-3 h-3 text-[#0B1D6E]" />
                    </div>
                  </div>
                  <h4 className="font-bold text-[#111827] text-base">{cert.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{cert.provider}</p>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-green-600 font-semibold">
                    <Shield className="w-3.5 h-3.5" /> Verified by ISE EKO Platform
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F8F9FC] rounded-xl px-3 py-2">
                    <p className="text-xs text-gray-400">Issue Date</p>
                    <p className="text-sm font-semibold text-[#111827] mt-0.5">{cert.issuedDate}</p>
                  </div>
                  <div className="bg-[#F8F9FC] rounded-xl px-3 py-2">
                    <p className="text-xs text-gray-400">Credential ID</p>
                    <p className="font-semibold text-[#111827] mt-0.5 font-mono text-xs">{cert.credentialId}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <span key={s} className="text-xs bg-[#F8F9FC] border border-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100 py-2.5 rounded-xl transition">
                    <ExternalLink className="w-3 h-3" /> View Full Certificate
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl transition">
                    <Shield className="w-3 h-3" /> Verify Credential
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <p className="font-semibold text-[#111827]">Programme completed</p>
                <p className="text-xs text-gray-400 mt-1">No certification was attached to this programme.</p>
              </div>
            );
          })()}
          </div>
        </div>
          </>
        )}
      </div>
    </>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-[#0B1D6E] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
      {message}
    </div>
  );
}

// ─── TrainingCard ─────────────────────────────────────────────────────────────

function TrainingCard({
  training,
  showProgress = false,
  extraEnrolled = false,
  onEnrol,
  onContinue,
  onSchedule,
  onCompleted,
}: {
  training: Training;
  showProgress?: boolean;
  extraEnrolled?: boolean;
  onEnrol: (t: Training) => void;
  onContinue: (t: Training) => void;
  onSchedule: (t: Training) => void;
  onCompleted: (t: Training) => void;
}) {
  const isCompleted = completedSet.has(training.id);
  const isEnrolled  = enrolledSet.has(training.id) || extraEnrolled;
  const seatsLeft   = training.seats - training.enrolled;
  const fillPercent = (training.enrolled / training.seats) * 100;
  const prog = mockUser.trainingProgress[training.id as keyof typeof mockUser.trainingProgress];

  // Badge
  let badge: React.ReactNode = null;
  if (isCompleted)              badge = <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"><Award className="w-3 h-3" />Certified</span>;
  else if (isEnrolled && prog?.started) badge = <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"><Play className="w-3 h-3" />In Progress</span>;
  else if (isEnrolled)          badge = <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"><CalendarClock className="w-3 h-3" />Enrolled</span>;
  else if (training.sponsored)  badge = <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Gov&apos;t Sponsored</span>;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md hover:border-[#1E3FAE]/20 transition-all">
      <div className="h-1.5 bg-gradient-to-r from-[#0B1D6E] to-[#1E3FAE]" />
      <div className="p-5 flex flex-col flex-1">

        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: training.logoColor }}>
            {training.providerLogo}
          </div>
          <div className="flex flex-col gap-1 items-end">{badge}</div>
        </div>

        <h4 className="font-semibold text-[#111827] text-sm leading-snug mb-0.5">{training.title}</h4>
        <p className="text-xs text-gray-500 mb-3">{training.provider}</p>
        <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1">{training.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {training.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[#EEF2FF] text-[#1E3FAE] px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="space-y-1.5 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-2"><Clock className="w-3 h-3 flex-shrink-0" /><span>{training.duration} · {training.mode}</span></div>
          {training.mode !== "Online" && (
            <div className="flex items-center gap-2"><MapPin className="w-3 h-3 flex-shrink-0" /><span>{training.location}</span></div>
          )}
          <div className="flex items-center gap-2"><GraduationCap className="w-3 h-3 flex-shrink-0" /><span>{training.level} · {training.certification ? "Certification included" : "No certification"}</span></div>
          <div className="flex items-center gap-2"><CalendarClock className="w-3 h-3 flex-shrink-0" /><span>Starts {training.startDate}</span></div>
          <div className="flex items-center gap-2"><Star className="w-3 h-3 flex-shrink-0 text-yellow-400" /><span>{training.rating} rating</span></div>
        </div>

        {/* Progress bar (My Trainings view) */}
        {showProgress && isEnrolled && !isCompleted && prog && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{prog.started ? "Progress" : "Starting"}</span>
              <span className={`font-semibold ${prog.started ? "text-[#1E3FAE]" : "text-purple-600"}`}>
                {prog.started ? `${prog.progressPercent}%` : prog.nextSession}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className={`h-2 rounded-full transition-all ${prog.started ? "bg-[#1E3FAE]" : "bg-purple-200 w-0"}`} style={prog.started ? { width: `${prog.progressPercent}%` } : {}} />
            </div>
            {prog.started && prog.lastActivity && <p className="text-xs text-gray-400 mt-1">Last activity: {prog.lastActivity}</p>}
            {!prog.started && <p className="text-xs text-gray-400 mt-1">Not yet started — first session {prog.nextSession}</p>}
          </div>
        )}

        {/* Seat fill bar (All Trainings view) */}
        {!showProgress && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center gap-1 text-gray-500"><Users className="w-3 h-3" />{training.enrolled} enrolled</span>
              <span className={`font-semibold ${seatsLeft <= 5 ? "text-red-500" : "text-gray-500"}`}>
                {seatsLeft > 0 ? `${seatsLeft} seats left` : "Full"}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full">
              <div className={`h-1.5 rounded-full ${fillPercent >= 100 ? "bg-red-400" : fillPercent >= 70 ? "bg-yellow-400" : "bg-[#1E3FAE]"}`} style={{ width: `${Math.min(fillPercent, 100)}%` }} />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className={`text-sm font-bold ${training.sponsored ? "text-green-600" : "text-[#0B1D6E]"}`}>{training.cost}</span>

          {isCompleted ? (
            <button onClick={() => onCompleted(training)} className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-xl transition">
              <CheckCircle className="w-3 h-3" /> Completed
            </button>
          ) : isEnrolled && prog?.started ? (
            <button onClick={() => onContinue(training)} className="text-xs font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] px-3 py-1.5 rounded-xl transition flex items-center gap-1">
              <Play className="w-3 h-3" /> Continue
            </button>
          ) : isEnrolled ? (
            <button onClick={() => onSchedule(training)} className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-xl hover:bg-purple-200 transition flex items-center gap-1">
              <CalendarClock className="w-3 h-3" /> View Schedule
            </button>
          ) : seatsLeft <= 0 ? (
            <button disabled className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl cursor-not-allowed">Full</button>
          ) : (
            <button onClick={() => onEnrol(training)} className="text-xs font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] px-3 py-1.5 rounded-xl transition">
              Enrol Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Derived sets (module-level, from mock data) ───────────────────────────────

const enrolledSet    = new Set(mockUser.enrolledTrainings);
const completedSet   = new Set(mockUser.completedTrainings);
const recommendedSet = new Set(mockUser.recommendedTrainings);

const myTrainings     = mockTrainings.filter((t) => enrolledSet.has(t.id) || completedSet.has(t.id));
const recommendedList = mockTrainings.filter((t) => recommendedSet.has(t.id) && !enrolledSet.has(t.id));
const inProgress      = myTrainings.filter((t) => enrolledSet.has(t.id) && !completedSet.has(t.id) && mockUser.trainingProgress[t.id as keyof typeof mockUser.trainingProgress]?.started);
const upcoming        = myTrainings.filter((t) => enrolledSet.has(t.id) && !completedSet.has(t.id) && !mockUser.trainingProgress[t.id as keyof typeof mockUser.trainingProgress]?.started);
const completedList   = mockTrainings.filter((t) => completedSet.has(t.id));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrainingPage() {
  const [activeTab, setActiveTab]   = useState<TabId>("all");
  const [mineSubTab, setMineSubTab] = useState<MineSubTab>("progress");
  const [certSubTab, setCertSubTab] = useState<CertSubTab>("earned");
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("All Categories");
  const [modeFilter, setModeFilter] = useState("All");
  const [sponsoredOnly, setSponsoredOnly] = useState(false);

  // Interactive state
  const [modal, setModal]                   = useState<ModalState>(null);
  const [sessionEnrolled, setSessionEnrolled] = useState<Set<string>>(new Set());
  const [toast, setToast]                   = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
  }

  function handleEnrol(t: Training) { setModal({ type: "enrol",    training: t }); }
  function handleContinue(t: Training) { setModal({ type: "lesson",   training: t }); }
  function handleSchedule(t: Training) { setModal({ type: "schedule", training: t }); }
  function handleCompleted(t: Training) { setModal({ type: "cert-view", training: t }); }

  function confirmEnrol(t: Training) {
    setSessionEnrolled((prev) => new Set([...prev, t.id]));
    setModal(null);
    showToast(`Enrolled in "${t.title}" — check My Trainings → Upcoming`);
  }

  // ─── Filtered list for All Trainings tab ──────────────────────────────────

  const filtered = mockTrainings.filter((t) => {
    const matchSearch = !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.provider.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchCat  = category === "All Categories" || t.category === category;
    const matchMode = modeFilter === "All" || t.mode === modeFilter;
    const matchSponsored = !sponsoredOnly || t.sponsored;
    return matchSearch && matchCat && matchMode && matchSponsored;
  });

  // ─── Shared card props ─────────────────────────────────────────────────────

  const cardProps = {
    onEnrol:     handleEnrol,
    onContinue:  handleContinue,
    onSchedule:  handleSchedule,
    onCompleted: handleCompleted,
  };

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "all",   label: "All Trainings",    count: mockTrainings.length },
    { id: "mine",  label: "My Trainings",      count: myTrainings.length + sessionEnrolled.size },
    { id: "certs", label: "My Certifications", count: mockUser.certifications.length },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Modal */}
      <TrainingModal modal={modal} onClose={() => setModal(null)} onConfirmEnrol={confirmEnrol} />

      {/* Page header */}
      <div>
        <h2 className="text-xl font-bold text-[#111827]">Training & Skills</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Browse programmes, track your progress, and manage your certifications
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Enrolled",       value: mockUser.enrolledTrainings.length + sessionEnrolled.size, color: "text-[#1E3FAE]",  bg: "bg-[#EEF2FF]" },
          { label: "In Progress",    value: inProgress.length,                color: "text-blue-600",   bg: "bg-blue-50" },
          { label: "Completed",      value: completedList.length,             color: "text-green-700",  bg: "bg-green-50" },
          { label: "Certifications", value: mockUser.certifications.length,   color: "text-yellow-700", bg: "bg-yellow-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Main tabs */}
      <div className="flex bg-white border border-gray-100 rounded-2xl p-1 gap-1">
        {tabs.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 px-3 rounded-xl transition-all ${
              activeTab === id ? "bg-[#0B1D6E] text-white shadow-sm" : "text-gray-500 hover:text-[#0B1D6E] hover:bg-gray-50"
            }`}
          >
            {label}
            {count !== undefined && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── ALL TRAININGS ──────────────────────────────────────────────────── */}
      {activeTab === "all" && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, provider, or skill..."
                className="w-full bg-[#F8F9FC] border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition" />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <div className="relative">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1E3FAE] transition cursor-pointer">
                  {mockTrainingCategories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className="appearance-none bg-[#F8F9FC] border border-gray-100 rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1E3FAE] transition cursor-pointer">
                  {["All", "Physical", "Online", "Hybrid"].map((m) => <option key={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={sponsoredOnly} onChange={(e) => setSponsoredOnly(e.target.checked)} className="w-4 h-4 accent-[#1E3FAE]" />
                <span className="text-sm text-gray-600">Free / Sponsored only</span>
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#111827]">{filtered.length}</span> programmes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <TrainingCard key={t.id} training={t} extraEnrolled={sessionEnrolled.has(t.id)} {...cardProps} />
            ))}
          </div>
        </div>
      )}

      {/* ── MY TRAININGS ───────────────────────────────────────────────────── */}
      {activeTab === "mine" && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(
              [
                { id: "progress",    label: "In Progress",  count: inProgress.length,     activeCls: "bg-blue-600 text-white",    inactiveCls: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
                { id: "upcoming",    label: "Upcoming",     count: upcoming.length + sessionEnrolled.size, activeCls: "bg-purple-600 text-white",  inactiveCls: "text-purple-600 bg-purple-50 hover:bg-purple-100" },
                { id: "completed",   label: "Completed",    count: completedList.length,  activeCls: "bg-green-600 text-white",   inactiveCls: "text-green-600 bg-green-50 hover:bg-green-100" },
                { id: "recommended", label: "Recommended",  count: recommendedList.length,activeCls: "bg-yellow-500 text-white",  inactiveCls: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100" },
              ] as { id: MineSubTab; label: string; count: number; activeCls: string; inactiveCls: string }[]
            ).map(({ id, label, count, activeCls, inactiveCls }) => (
              <button key={id} onClick={() => setMineSubTab(id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${mineSubTab === id ? activeCls : inactiveCls}`}
              >
                {label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${mineSubTab === id ? "bg-white/25" : "bg-white"}`}>{count}</span>
              </button>
            ))}
          </div>

          {mineSubTab === "progress" && (
            inProgress.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {inProgress.map((t) => <TrainingCard key={t.id} training={t} showProgress {...cardProps} />)}
              </div>
            ) : (
              <EmptyState icon={<Play className="w-6 h-6 text-blue-400" />} bg="bg-blue-50" title="Nothing in progress" desc="Start an enrolled programme or enrol in a new one." />
            )
          )}

          {mineSubTab === "upcoming" && (
            upcoming.length > 0 || sessionEnrolled.size > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {upcoming.map((t) => (
                  <TrainingCard key={t.id} training={t} showProgress {...cardProps} />
                ))}
                {[...sessionEnrolled].map((id) => {
                  const t = mockTrainings.find((tr) => tr.id === id);
                  return t ? (
                    <div key={id} className="relative pt-3">
                      <div className="absolute top-0 left-4 z-10">
                        <span className="text-xs bg-green-500 text-white font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Just enrolled
                        </span>
                      </div>
                      <TrainingCard training={t} showProgress extraEnrolled {...cardProps} />
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <EmptyState icon={<CalendarClock className="w-6 h-6 text-purple-300" />} bg="bg-purple-50" title="No upcoming programmes" desc="All enrolled programmes have already started." />
            )
          )}

          {mineSubTab === "completed" && (
            completedList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {completedList.map((t) => <TrainingCard key={t.id} training={t} showProgress {...cardProps} />)}
              </div>
            ) : (
              <EmptyState icon={<CheckCircle className="w-6 h-6 text-green-300" />} bg="bg-green-50" title="No completed programmes yet" desc="Keep going — your completions will appear here." />
            )
          )}

          {mineSubTab === "recommended" && (
            recommendedList.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-gray-400">Based on your skills — <span className="font-semibold text-[#111827]">{mockUser.skills.slice(0, 4).join(", ")}</span></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {recommendedList.map((t) => (
                    <div key={t.id} className="relative pt-3">
                      <div className="absolute top-0 left-4 z-10">
                        <span className="text-xs bg-yellow-400 text-[#0B1D6E] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <Zap className="w-2.5 h-2.5" /> Recommended
                        </span>
                      </div>
                      <TrainingCard training={t} extraEnrolled={sessionEnrolled.has(t.id)} {...cardProps} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState icon={<Zap className="w-6 h-6 text-yellow-300" />} bg="bg-yellow-50" title="No recommendations yet" desc="Complete your profile so we can suggest the best programmes." />
            )
          )}
        </div>
      )}

      {/* ── MY CERTIFICATIONS ──────────────────────────────────────────────── */}
      {activeTab === "certs" && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(
              [
                { id: "earned",  label: "Earned",       count: mockUser.certifications.length,   activeCls: "bg-yellow-500 text-white",  inactiveCls: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100" },
                { id: "pending", label: "In Progress",  count: inProgress.filter((t) => t.certification).length + upcoming.filter((t) => t.certification).length, activeCls: "bg-[#1E3FAE] text-white", inactiveCls: "text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100" },
                { id: "howto",   label: "How it Works", count: undefined,                          activeCls: "bg-gray-700 text-white",    inactiveCls: "text-gray-600 bg-gray-100 hover:bg-gray-200" },
              ] as { id: CertSubTab; label: string; count: number | undefined; activeCls: string; inactiveCls: string }[]
            ).map(({ id, label, count, activeCls, inactiveCls }) => (
              <button key={id} onClick={() => setCertSubTab(id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${certSubTab === id ? activeCls : inactiveCls}`}
              >
                {label}
                {count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${certSubTab === id ? "bg-white/25" : "bg-white"}`}>{count}</span>
                )}
              </button>
            ))}
          </div>

          {certSubTab === "earned" && (
            mockUser.certifications.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockUser.certifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="h-2" style={{ background: `linear-gradient(to right, ${cert.logoColor}, #0B1D6E)` }} />
                    <div className="p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 relative" style={{ backgroundColor: cert.logoColor }}>
                          {cert.providerLogo}
                          <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                            <Award className="w-2.5 h-2.5 text-[#0B1D6E]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#111827] leading-snug">{cert.title}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">{cert.provider}</p>
                          <span className="inline-block mt-1.5 text-xs bg-[#EEF2FF] text-[#1E3FAE] font-semibold px-2 py-0.5 rounded-full">{cert.category}</span>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <p className="text-[10px] text-green-600 font-semibold mt-1">Verified</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">{cert.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.map((s) => (
                          <span key={s} className="text-xs bg-[#F8F9FC] border border-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-[#F8F9FC] rounded-xl px-3 py-2">
                          <p className="text-xs text-gray-400">Issue Date</p>
                          <p className="text-sm font-semibold text-[#111827] mt-0.5">{cert.issuedDate}</p>
                        </div>
                        <div className="bg-[#F8F9FC] rounded-xl px-3 py-2">
                          <p className="text-xs text-gray-400">Credential ID</p>
                          <p className="font-semibold text-[#111827] mt-0.5 font-mono text-xs">{cert.credentialId}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100 py-2 rounded-xl transition">
                          <ExternalLink className="w-3 h-3" /> View Certificate
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition">
                          <Shield className="w-3 h-3" /> Verify Credential
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={<Award className="w-7 h-7 text-yellow-300" />} bg="bg-yellow-50" title="No certifications yet" desc="Complete a certified programme to earn your first badge.">
                <button onClick={() => setActiveTab("all")} className="text-sm font-semibold text-white bg-[#1E3FAE] hover:bg-[#0B1D6E] px-5 py-2.5 rounded-xl transition">
                  Browse Certified Programmes
                </button>
              </EmptyState>
            )
          )}

          {certSubTab === "pending" && (
            <div className="space-y-5">
              {inProgress.filter((t) => t.certification).length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Certification Pending — In Progress</p>
                  <div className="flex flex-col gap-3">
                    {inProgress.filter((t) => t.certification).map((t) => {
                      const prog = mockUser.trainingProgress[t.id as keyof typeof mockUser.trainingProgress];
                      return (
                        <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: t.logoColor }}>{t.providerLogo}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#111827] text-sm truncate">{t.title}</p>
                            <p className="text-xs text-gray-400">{t.provider}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                                <div className="h-1.5 bg-[#1E3FAE] rounded-full" style={{ width: `${prog?.progressPercent ?? 0}%` }} />
                              </div>
                              <span className="text-xs font-semibold text-[#1E3FAE] flex-shrink-0">{prog?.progressPercent ?? 0}%</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center"><Award className="w-5 h-5 text-gray-300" /></div>
                            <p className="text-[10px] text-gray-400 mt-1">Pending</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {upcoming.filter((t) => t.certification).length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Certification Included — Not Yet Started</p>
                  <div className="flex flex-col gap-3">
                    {upcoming.filter((t) => t.certification).map((t) => {
                      const prog = mockUser.trainingProgress[t.id as keyof typeof mockUser.trainingProgress];
                      return (
                        <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: t.logoColor }}>{t.providerLogo}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#111827] text-sm truncate">{t.title}</p>
                            <p className="text-xs text-gray-400">{t.provider}</p>
                            <p className="text-xs text-purple-600 font-semibold mt-1 flex items-center gap-1"><CalendarClock className="w-3 h-3" /> Starts {prog?.nextSession}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-purple-200 bg-purple-50 flex items-center justify-center"><Award className="w-5 h-5 text-purple-300" /></div>
                            <p className="text-[10px] text-purple-500 font-semibold mt-1">On track</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {inProgress.filter((t) => t.certification).length === 0 && upcoming.filter((t) => t.certification).length === 0 && (
                <EmptyState icon={<GraduationCap className="w-6 h-6 text-[#1E3FAE]/40" />} bg="bg-[#EEF2FF]" title="Nothing in progress toward a certification" desc="Enrol in a certified programme to track your progress here." />
              )}
            </div>
          )}

          {certSubTab === "howto" && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-bold text-[#111827] mb-1">How ISE EKO Certifications Work</h3>
                <p className="text-sm text-gray-400">Digital credentials you can share, embed, and verify — recognised across Lagos State.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { step: "01", title: "Complete the programme", desc: "Attend all required sessions and pass the programme assessments.", bg: "bg-[#EEF2FF]", icon: <BookOpen className="w-5 h-5 text-[#1E3FAE]" /> },
                  { step: "02", title: "Receive your digital badge", desc: "Your certificate is issued digitally and permanently linked to your ISE EKO profile.", bg: "bg-yellow-50", icon: <Award className="w-5 h-5 text-yellow-500" /> },
                  { step: "03", title: "Share & get verified", desc: "Employers verify your credential in real-time using your unique Credential ID.", bg: "bg-green-50", icon: <Shield className="w-5 h-5 text-green-500" /> },
                ].map(({ step, title, desc, bg, icon }) => (
                  <div key={step} className={`${bg} rounded-2xl p-4 flex flex-col gap-3`}>
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">{icon}</div>
                      <span className="text-3xl font-black text-black/10 leading-none">{step}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{title}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button onClick={() => setActiveTab("all")} className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3FAE] hover:gap-2.5 transition-all">
                  Browse all certification programmes <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Empty state helper ────────────────────────────────────────────────────────

function EmptyState({ icon, bg, title, desc, children }: { icon: React.ReactNode; bg: string; title: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>{icon}</div>
      <p className="font-semibold text-[#111827]">{title}</p>
      <p className="text-xs text-gray-400 mt-1 mb-4">{desc}</p>
      {children}
    </div>
  );
}
