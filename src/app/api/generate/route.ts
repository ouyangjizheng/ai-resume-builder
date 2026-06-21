import { NextResponse } from "next/server";

const SYSTEM_PROMPTS: Record<string, string> = {};

SYSTEM_PROMPTS.resume = "You are an expert resume writer. Create a professional, ATS-friendly resume based on the user's details. Format the resume with clear sections: Contact Info, Professional Summary, Work Experience, Skills, Education. Use bullet points for achievements and quantify results where possible. Make the resume compelling and tailored to the target job title.";

SYSTEM_PROMPTS["cover-letter"] = "You are an expert cover letter writer. Write a professional, compelling cover letter. Structure: Header (name, contact), Date, Company Address, Salutation, Opening paragraph, Body (2-3 paragraphs highlighting relevant experience and skills), Closing paragraph, Signature. Keep it concise (300-400 words) and tailored to the job.";

SYSTEM_PROMPTS.interview = "You are an expert interview coach. Generate interview questions and answers for the specified role. For each question provide: Q: [The interview question] A: [A detailed, structured answer with tips]. Include 5-7 questions covering: background/experience questions, technical/skill questions, behavioral questions (STAR method), and role-specific questions. Add preparation tips at the end.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, jobTitle, company, experience, skills, education, role, industry, focus } = body;

    if (!type || !SYSTEM_PROMPTS[type]) {
      return NextResponse.json({ error: "Invalid generation type" }, { status: 400 });
    }

    let userPrompt = "";

    if (type === "resume") {
      userPrompt = "Create a professional resume for:\nName: " + (name || "[Your Name]") + "\nTarget Job Title: " + (jobTitle || "[Job Title]") + "\nWork Experience: " + (experience || "[Experience details]") + "\nSkills: " + (skills || "[Skills]") + "\nEducation: " + (education || "[Education]") + "\n\nCreate a complete, polished resume.";
    } else if (type === "cover-letter") {
      userPrompt = "Write a cover letter for:\nName: " + (name || "[Your Name]") + "\nTarget Job: " + (jobTitle || "[Job Title]") + "\nCompany: " + (company || "[Company Name]") + "\nExperience: " + (experience || "[Experience]") + "\nSkills: " + (skills || "[Skills]") + "\n\nWrite a professional, engaging cover letter.";
    } else if (type === "interview") {
      userPrompt = "Generate interview preparation for:\nTarget Role: " + (role || "[Role]") + "\nIndustry: " + (industry || "[Industry]") + "\nExperience Level: " + (experience || "[Experience Level]") + "\nFocus Areas: " + (focus || "[General]") + "\n\nGenerate comprehensive interview questions and answers.";
    }

    if (process.env.DEEPSEEK_API_KEY) {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.DEEPSEEK_API_KEY,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPTS[type] },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI API error:", errorText);
        return NextResponse.json({
          result: generateFallbackContent(type, { name, jobTitle, company, experience, skills, education, role, industry, focus }),
        });
      }

      const data = await response.json();
      return NextResponse.json({ result: data.choices[0].message.content });
    } else {
      return NextResponse.json({
        result: generateFallbackContent(type, { name, jobTitle, company, experience, skills, education, role, industry, focus }),
      });
    }
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

function generateFallbackContent(type: string, data: any) {
  if (type === "resume") {
    return (data.name || "[Your Name]") + "\n" + (data.jobTitle || "[Job Title]") + "\n" +
      (data.skills ? "Skills: " + data.skills : "") + "\n" +
      (data.education ? "Education: " + data.education : "") + "\n\n" +
      "PROFESSIONAL SUMMARY\nResults-driven professional with expertise in " + (data.skills || "relevant field") + ".\n\n" +
      "WORK EXPERIENCE\n" + (data.experience || "[Describe your work experience here]") + "\n\n" +
      "EDUCATION\n" + (data.education || "[List your education]") + "\n\n" +
      "SKILLS\n" + (data.skills || "[List your key skills]");
  } else if (type === "cover-letter") {
    return "Dear Hiring Manager,\n\nI am writing to express my strong interest in the " + (data.jobTitle || "[Job Title]") + " position at " + (data.company || "[Company]") + ".\n\n" +
      (data.experience ? "With my experience in " + data.experience + ", I am confident in my ability to contribute to your team.\n" : "") +
      (data.skills ? "My skills in " + data.skills + " make me an excellent candidate for this role.\n" : "") + "\n" +
      "I am excited about the opportunity to bring my unique perspective and skills to " + (data.company || "your company") + ".\n\n" +
      "Thank you for your consideration.\n\nBest regards,\n" + (data.name || "[Your Name]");
  } else {
    return "INTERVIEW PREPARATION: " + (data.role || "[Role]") + " at " + (data.industry || "[Industry]") + "\n\n" +
      "Q1: Tell me about yourself.\nA1: Prepare a brief summary of your background, key achievements, and career goals.\n\n" +
      "Q2: Why are you interested in this role?\nA2: Research the company and connect your skills to their needs.\n\n" +
      "Q3: Describe a challenging project you worked on.\nA3: Use the STAR method: Situation, Task, Action, Result.\n\n" +
      "Q4: Where do you see yourself in 5 years?\nA4: Show ambition aligned with the company growth trajectory.\n\n" +
      "Q5: What are your greatest strengths and weaknesses?\nA5: Be honest but strategic. Frame weaknesses as areas of growth.\n\n" +
      "Preparation Tips:\n- Research the company thoroughly\n- Prepare questions to ask the interviewer\n- Practice your responses out loud\n- Dress professionally and arrive early";
  }
}