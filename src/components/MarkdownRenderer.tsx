"use client";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  const html = renderMarkdown(content);
  return (
    <div
      className="prose-invert max-w-none space-y-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inList: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Close list if needed
    if (inList && !line.match(/^[\s]*[-*+]\s/) && !line.match(/^[\s]*\d+\.\s/)) {
      html += "</" + inList + ">";
      inList = null;
    }

    const trimmed = line.trim();

    // Empty lines
    if (trimmed === "") {
      html += "\n";
      continue;
    }

    // Headers
    if (trimmed.startsWith("### ")) {
      html += "<h3 class='text-xl font-semibold text-white mt-8 mb-3'>" + escapeHtml(trimmed.slice(4)) + "</h3>\n";
      continue;
    }
    if (trimmed.startsWith("## ")) {
      html += "<h2 class='text-2xl font-bold text-white mt-10 mb-4'>" + escapeHtml(trimmed.slice(3)) + "</h2>\n";
      continue;
    }
    if (trimmed.startsWith("# ")) {
      html += "<h1 class='text-3xl font-bold text-white mt-10 mb-6'>" + escapeHtml(trimmed.slice(2)) + "</h1>\n";
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      html += "<hr class='border-white/10 my-8' />\n";
      continue;
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[\s]*[-*+]\s+(.*)/);
    if (ulMatch) {
      if (inList !== "ul") {
        if (inList) html += "</" + inList + ">\n";
        html += "<ul class='space-y-2 pl-5 my-4'>\n";
        inList = "ul";
      }
      html += "<li class='text-gray-300'>" + renderInline(ulMatch[1]) + "</li>\n";
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^[\s]*\d+\.\s+(.*)/);
    if (olMatch) {
      if (inList !== "ol") {
        if (inList) html += "</" + inList + ">\n";
        html += "<ol class='space-y-2 pl-5 my-4 list-decimal'>\n";
        inList = "ol";
      }
      html += "<li class='text-gray-300'>" + renderInline(olMatch[1]) + "</li>\n";
      continue;
    }

    // Bold text (lines that are **bold**)
    if (trimmed.match(/^\*\*.*\*\*$/)) {
      html += "<p class='font-semibold text-white text-lg mt-6 mb-2'>" + renderInline(trimmed) + "</p>\n";
      continue;
    }

    // Regular paragraph
    if (trimmed.startsWith("> ")) {
      html += "<blockquote class='border-l-4 border-purple-500 pl-4 py-2 my-4 text-gray-400 italic'>" + renderInline(trimmed.slice(2)) + "</blockquote>\n";
      continue;
    }

    html += "<p class='text-gray-300 leading-relaxed'>" + renderInline(trimmed) + "</p>\n";
  }

  if (inList) html += "</" + inList + ">";

  return html;
}

function renderInline(text: string): string {
  let result = escapeHtml(text);
  // Bold: **text**
  result = result.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-white'>$1</strong>");
  // Italic: *text*
  result = result.replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>");
  // Inline code: `text`
  result = result.replace(/`([^`]+)`/g, "<code class='bg-white/10 px-1.5 py-0.5 rounded text-sm text-purple-300'>$1</code>");
  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' class='text-purple-400 hover:text-purple-300 underline transition-colors'>$1</a>");
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
