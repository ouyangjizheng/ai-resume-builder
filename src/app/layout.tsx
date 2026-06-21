import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Builder | Professional Resumes, Cover Letters & Interview Prep",
  description: "Build professional resumes, cover letters, and prepare for interviews with AI-powered tools. Free, fast, and effective.",
  keywords: "resume builder, AI resume, cover letter generator, interview prep, career tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">R</div>
                <span className="font-bold text-lg hidden sm:block">
                  <span className="gradient-text">ResumeAI</span>
                </span>
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a href="/resume" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Resume Builder</a>
                <a href="/cover-letter" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Cover Letter</a>
                <a href="/interview" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Interview Prep</a>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Blog</a>
              </div>
              <div className="flex items-center gap-3">
                <a href="/resume" className="btn-primary text-sm !py-2 !px-4">
                  Build Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="bg-[#0a0a1a] border-t border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">R</div>
                  <span className="font-bold"><span className="gradient-text">ResumeAI</span></span>
                </div>
                <p className="text-gray-400 text-sm">AI-powered career tools to help you land your dream job.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/resume" className="hover:text-white transition-colors">Resume Builder</a></li>
                  <li><a href="/cover-letter" className="hover:text-white transition-colors">Cover Letter Generator</a></li>
                  <li><a href="/interview" className="hover:text-white transition-colors">Interview Prep</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/blog" className="hover:text-white transition-colors">Career Blog</a></li>
                  <li><a href="/resume" className="hover:text-white transition-colors">Resume Tips</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
              <p>&copy; 2026 ResumeAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
