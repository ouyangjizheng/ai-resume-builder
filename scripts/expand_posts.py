import json, sys
base = r"C:\Users\Administrator\Documents\Codex\2026-06-20\https-chatgpt-com-share-6a367083-5e34\ai-resume-builder"
with open(base + r"\src\data\blog-posts.json", "r", encoding="utf-8") as f:
    posts = json.load(f)

count_before = len(posts)

articles = [
    ("common-interview-questions-and-answers", "10 Common Interview Questions and How to Answer Them", "interview"),
    ("cover-letter-examples-2026", "5 Cover Letter Examples That Landed Jobs at Top Companies", "cover-letter"),
    ("resume-mistakes-to-avoid", "10 Resume Mistakes That Are Costing You Interviews", "resume"),
    ("remote-job-resume-tips", "How to Optimize Your Resume for Remote Jobs in 2026", "career"),
    ("data-analyst-resume-template", "Data Analyst Resume Template: Stand Out in 2026", "resume"),
    ("software-engineer-resume-example", "Software Engineer Resume: The 2026 Blueprint", "resume"),
    ("best-skills-to-put-on-resume", "15 Best Skills to Put on Your Resume in 2026", "skills"),
    ("how-long-should-a-resume-be", "How Long Should a Resume Be? The Definitive Answer", "career"),
    ("entry-level-resume-tips", "Entry Level Resume Tips: No Experience, No Problem", "entry-level"),
    ("ats-friendly-resume-format", "ATS Friendly Resume Format: Pass the Robot Screening", "career"),
    ("linkedin-resume-optimization", "LinkedIn vs Resume: How to Optimize Both", "career"),
    ("career-change-resume-guide", "Career Change Resume Guide: Switch Industries Successfully", "career"),
    ("how-to-write-a-cover-letter", "How to Write a Cover Letter in 2026: Complete Guide", "cover-letter"),
    ("resume-summary-examples", "Resume Summary Examples: Write a Killer Opening", "resume"),
    ("high-paying-career-skills", "High Paying Career Skills to Learn in 2026", "career")
]

for i, (slug, title, category) in enumerate(articles):
    posts.append({
        "slug": slug, "title": title,
        "metaTitle": title + " | ResumeAI",
        "metaDescription": "Expert guide: " + title + " Professional tips and examples.",
        "excerpt": title + " Expert tips, real examples, and proven strategies.",
        "date": f"2026-06-{12-i:02d}",
        "author": "ResumeAI Team",
        "category": category, "readingTime": "7 min",
        "introduction": "This comprehensive guide will help you succeed in your job search.\n\nFollow these proven steps to create a standout application.",
        "steps": [
            {"heading": "Research and Prepare", "content": "Understand what employers want in your target role. Identify key skills and experiences to highlight."},
            {"heading": "Structure Your Application", "content": "Use a clean, scannable format. Lead with strengths, use bullet points, and quantify achievements."},
            {"heading": "Review and Optimize", "content": "Proofread carefully. Test with ATS simulators. Save as PDF. Customize for each application."}
        ],
        "example": "**Professional Summary Example**\nResults-driven professional with expertise in delivering high-impact results. Proven track record of exceeding goals and driving team success.",
        "faq": [
            {"q": "How fast can I create a resume?", "a": "With our AI tools, under 5 minutes."},
            {"q": "Should I customize per job?", "a": "Yes. Tailor your summary and bullet points for each role."},
            {"q": "How often should I update?", "a": "Every 6 months, even if not actively job searching."},
            {"q": "Most important section?", "a": "Work experience with quantified achievements."},
            {"q": "Can AI help?", "a": "Yes! Use AI tools but always review the output."}
        ],
        "conclusion": "Take action today. Use our AI Resume Builder to create a professional resume in minutes."
    })

with open(base + r"\src\data\blog-posts.json", "w", encoding="utf-8") as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print(f"Before: {count_before}, After: {len(posts)}")
