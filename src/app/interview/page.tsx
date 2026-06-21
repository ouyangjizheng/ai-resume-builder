"use client";

import { useState } from "react";

export default function InterviewPrepPage() {
  const [form, setForm] = useState({ role: "", industry: "", experience: "", focus: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "interview", ...form }),
      });
      const data = await res.json();
      setResult(data.result || "Error generating interview prep.");
    } catch {
      setResult("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">AI <span className="gradient-text">Interview Preparation</span></h1>
        <p className="text-gray-400 max-w-xl mx-auto">Get tailored interview questions and expert answers for your next job interview.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card animate-fade-in">
          <h2 className="text-xl font-semibold mb-6">Job Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Role</label>
              <input className="input-field" placeholder="Software Engineer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <input className="input-field" placeholder="Technology" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Experience Level</label>
              <input className="input-field" placeholder="Senior / 5+ years" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Focus Areas</label>
              <textarea className="input-field min-h-[100px]" placeholder="e.g. System Design, Behavioral Questions, Technical Skills" value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value })} />
            </div>
            <button onClick={generate} disabled={loading} className="btn-primary w-full justify-center mt-4">
              {loading ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Generating...</>
              ) : (
                <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Generate Questions & Answers</>
              )}
            </button>
          </div>
        </div>

        <div className="card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl font-semibold mb-6">Interview Questions & Answers</h2>
          {result ? (
            <div>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-white/5 rounded-lg p-4 max-h-[500px] overflow-y-auto">{result}</pre>
              <div className="mt-4 flex gap-3">
                <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary text-sm !py-2 !px-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
                <button onClick={() => { const blob = new Blob([result], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = interview_prep_.txt; a.click(); }} className="btn-primary text-sm !py-2 !px-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <p>Your interview prep will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="card text-center py-6 mt-12">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sponsor</div>
        <div className="bg-white/5 rounded-lg h-20 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Advertisement — Google AdSense</span>
        </div>
      </div>
    </div>
  );
}
