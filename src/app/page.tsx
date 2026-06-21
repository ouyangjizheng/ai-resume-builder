"use client";

import { useState } from "react";

const features = [
  {
    title: "AI Resume Builder",
    desc: "Generate professional resumes tailored to your experience in seconds.",
    icon: "📄",
    href: "/resume",
  },
  {
    title: "Cover Letter Generator",
    desc: "Create compelling cover letters that match your resume perfectly.",
    icon: "✉️",
    href: "/cover-letter",
  },
  {
    title: "Interview Preparation",
    desc: "Practice with AI-generated interview questions and expert answers.",
    icon: "🎯",
    href: "/interview",
  },
  {
    title: "SEO Career Blog",
    desc: "Expert tips, resume advice, and career guidance updated weekly.",
    icon: "📝",
    href: "/blog",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center relative">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Powered by Advanced AI
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Build Your Resume in
              <br />
              <span className="gradient-text">2 Minutes with AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Generate professional resumes, compelling cover letters, and ace your interviews
              with our AI-powered career tools. Fast, free, and designed for job seekers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/resume" className="btn-primary text-lg !px-8 !py-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Build Your Resume
              </a>
              <a href="/cover-letter" className="btn-secondary text-lg !px-8 !py-4">
                Generate Cover Letter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "10K+", label: "Resumes Generated" },
            { num: "95%", label: "Success Rate" },
            { num: "50+", label: "Industries Covered" },
            { num: "4.9/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="card text-center animate-fade-in" style={{ animationDelay: (i * 0.1).toString() + "s" }}>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.num}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All-in-One <span className="gradient-text">Career Toolkit</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to create a standout job application, powered by AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <a key={i} href={f.href} className="card group animate-fade-in" style={{ animationDelay: (i * 0.1).toString() + "s" }}>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
              <div className="mt-4 flex items-center text-sm text-purple-400 group-hover:gap-2 transition-all">
                Try Now <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It <span className="gradient-text">Works</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Three simple steps to your perfect job application.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Fill Your Details", desc: "Enter your experience, skills, and job preferences in our simple form." },
            { step: "02", title: "AI Generates Content", desc: "Our AI creates a professional resume or cover letter tailored to your needs." },
            { step: "03", title: "Download & Apply", desc: "Download your polished resume as PDF and start applying to jobs." },
          ].map((item, i) => (
            <div key={i} className="text-center animate-fade-in" style={{ animationDelay: (i * 0.15).toString() + "s" }}>
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Placement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="card text-center py-8 animate-fade-in">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sponsor</div>
          <div className="bg-white/5 rounded-lg h-24 flex items-center justify-center mx-auto max-w-3xl">
            <span className="text-gray-500 text-sm">Advertisement — Google AdSense</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="gradient-bg rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Land Your Dream Job?</h2>
            <p className="text-purple-200 mb-8 max-w-lg mx-auto">Join thousands of professionals who have successfully used our AI tools.</p>
            <a href="/resume" className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105">
              Build Your Resume Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
