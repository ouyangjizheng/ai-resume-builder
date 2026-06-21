"use client";

import { useState } from "react";
import DownloadButtons from "@/components/DownloadButtons";

export default function CoverLetterPage() {
  const [form, setForm] = useState({ name: "", jobTitle: "", company: "", experience: "", skills: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "cover-letter", ...form }),
      });
      const data = await res.json();
      setResult(data.result || "Error generating cover letter.");
    } catch {
      setResult("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-5xl mb-4">✉️</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">AI <span className="gradient-text">Cover Letter Generator</span></h1>
        <p className="text-gray-400 max-w-xl mx-auto">Create a compelling cover letter that gets you noticed.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card animate-fade-in">
          <h2 className="text-xl font-semibold mb-6">Your Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Name</label>
              <input className="input-field" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Job Title</label>
              <input className="input-field" placeholder="Product Manager" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company Name</label>
              <input className="input-field" placeholder="Google" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Relevant Experience</label>
              <textarea className="input-field min-h-[100px]" placeholder="Briefly describe your relevant experience..." value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Key Skills</label>
              <input className="input-field" placeholder="Leadership, Strategy, Data Analysis" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
            </div>
            <button onClick={generate} disabled={loading} className="btn-primary w-full justify-center mt-4">
              {loading ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Generating...</>
              ) : (
                <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Generate Cover Letter</>
              )}
            </button>
          </div>
        </div>

        <div className="card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl font-semibold mb-6">Your Cover Letter</h2>
          {result ? (
            <div>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-white/5 rounded-lg p-4 max-h-[500px] overflow-y-auto">{result}</pre>
              <div className="mt-4 flex gap-3">
                <DownloadButtons content={result} filename={"cover_letter_" + (form.name || "untitled")} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <p>Your cover letter will appear here</p>
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
