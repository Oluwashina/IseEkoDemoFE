"use client";

import { useState } from "react";
import { FileText, CheckCircle, MessageSquare, Clock, Eye, Send } from "lucide-react";
import { mockCVQueue } from "@/lib/mock/admin";

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  pending:   { label: "Pending Review", bg: "bg-yellow-100", text: "text-yellow-700" },
  reviewed:  { label: "Reviewed",       bg: "bg-blue-100",   text: "text-blue-700" },
  validated: { label: "Validated",      bg: "bg-green-100",  text: "text-green-700" },
};

export default function CVReviewPage() {
  const [queue, setQueue] = useState(mockCVQueue);
  const [selected, setSelected] = useState(mockCVQueue[0]);
  const [feedback, setFeedback] = useState("");

  const handleValidate = (id: string) => {
    setQueue((prev) =>
      prev.map((cv) => (cv.id === id ? { ...cv, status: "validated" } : cv))
    );
    if (selected?.id === id) setSelected((s) => ({ ...s!, status: "validated" }));
  };

  const handleSendFeedback = (id: string) => {
    if (!feedback.trim()) return;
    setQueue((prev) =>
      prev.map((cv) => (cv.id === id ? { ...cv, status: "reviewed", feedback } : cv))
    );
    setFeedback("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">CV Review Queue</h2>
        <p className="text-sm text-gray-500 mt-0.5">Review and validate job seeker CVs on behalf of the Ministry</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending Review", value: queue.filter((c) => c.status === "pending").length, color: "bg-yellow-50 text-yellow-700" },
          { label: "Reviewed", value: queue.filter((c) => c.status === "reviewed").length, color: "bg-blue-50 text-blue-700" },
          { label: "Validated", value: queue.filter((c) => c.status === "validated").length, color: "bg-green-50 text-green-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-4 ${color.split(" ")[0]}`}>
            <p className={`text-2xl font-bold ${color.split(" ")[1]}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-5 h-[calc(100vh-320px)] min-h-[500px]">
        {/* Queue list */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-2 overflow-y-auto">
          {queue.map((cv) => {
            const sc = statusConfig[cv.status];
            const isSelected = selected?.id === cv.id;
            return (
              <div
                key={cv.id}
                onClick={() => setSelected(cv)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all ${
                  isSelected ? "border-[#1E3FAE] ring-2 ring-[#1E3FAE]/10" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-[#1E3FAE]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">{cv.seekerName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cv.fileType} · Uploaded {cv.uploadedDate}</p>
                    <span className={`inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                      {sc.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-y-auto flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#1E3FAE]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827]">{selected.seekerName}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {selected.fileType} document · Uploaded {selected.uploadedDate}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusConfig[selected.status].bg} ${statusConfig[selected.status].text}`}>
                  {statusConfig[selected.status].label}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 space-y-5">
              {/* Mock CV preview */}
              <div>
                <h4 className="font-semibold text-[#111827] mb-3">CV Preview</h4>
                <div className="bg-[#F8F9FC] border border-gray-100 rounded-2xl p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Education</p>
                    <p className="text-sm font-medium text-[#111827]">{selected.education}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skills Detected</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.skills.map((s) => (
                        <span key={s} className="bg-[#EEF2FF] text-[#1E3FAE] text-xs font-medium px-3 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full CV document preview</p>
                      <p className="text-xs text-gray-400">PDF viewer would be embedded here in production</p>
                    </div>
                    <button className="ml-auto text-xs font-semibold text-[#1E3FAE] bg-[#EEF2FF] px-3 py-1.5 rounded-xl hover:bg-blue-100 transition">
                      View PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous feedback */}
              {selected.feedback && (
                <div>
                  <h4 className="font-semibold text-[#111827] mb-2">Previous Feedback</h4>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
                      <p>{selected.feedback}</p>
                    </div>
                    <p className="text-xs text-blue-500 mt-2">Sent by Ministry Reviewer</p>
                  </div>
                </div>
              )}

              {/* Feedback area */}
              {selected.status !== "validated" && (
                <div>
                  <h4 className="font-semibold text-[#111827] mb-2">Send Feedback</h4>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    placeholder="Write improvement suggestions for the job seeker..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1E3FAE] focus:ring-2 focus:ring-[#1E3FAE]/10 transition resize-none"
                  />
                </div>
              )}
            </div>

            {/* Action footer */}
            {selected.status !== "validated" && (
              <div className="p-5 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => handleSendFeedback(selected.id)}
                  disabled={!feedback.trim()}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#1E3FAE] bg-[#EEF2FF] hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl transition"
                >
                  <Send className="w-3.5 h-3.5" /> Send Feedback
                </button>
                <button
                  onClick={() => handleValidate(selected.id)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-2.5 rounded-xl transition"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Validate CV
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition">
                  <Clock className="w-3.5 h-3.5" /> Mark Pending
                </button>
              </div>
            )}
            {selected.status === "validated" && (
              <div className="p-5 border-t border-gray-100">
                <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  This CV has been validated by the Ministry.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
