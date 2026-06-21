import Link from "next/link";
import posts from "@/data/blog-posts.json";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title + " | ResumeAI Blog",
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const sections = post.content.split("\n\n");

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Blog
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase">{post.category}</span>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400">{post.excerpt}</p>
      </div>

      <div className="space-y-6 text-gray-300 leading-relaxed">
        {sections.map((section, i) => {
          if (section.startsWith("## ")) {
            return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{section.replace("## ", "")}</h2>;
          }
          if (section.startsWith("### ")) {
            return <h3 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{section.replace("### ", "")}</h3>;
          }
          if (section.startsWith("**Q:")) {
            const [q, ...aParts] = section.split("\n**A:");
            return (
              <div key={i} className="bg-white/5 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">{q.replace(/\*\*/g, "")}</p>
                <p className="text-gray-400">{aParts.join(" ").replace(/\*\*/g, "")}</p>
              </div>
            );
          }
          if (section.startsWith("**")) {
            return <p key={i} className="font-semibold text-white">{section.replace(/\*\*/g, "")}</p>;
          }
          if (section.startsWith("1. ") || section.startsWith("2. ") || section.startsWith("3. ") || section.startsWith("4. ") || section.startsWith("5. ")) {
            return <p key={i} className="pl-4 border-l-2 border-purple-500/30">{section}</p>;
          }
          return <p key={i}>{section}</p>;
        })}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-white/5">
        <h3 className="font-semibold mb-4">Ready to Take the Next Step?</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/resume" className="btn-primary text-sm !py-2 !px-4">Build Your Resume</a>
          <a href="/cover-letter" className="btn-secondary text-sm !py-2 !px-4">Generate Cover Letter</a>
          <a href="/interview" className="btn-secondary text-sm !py-2 !px-4">Interview Prep</a>
        </div>
      </div>

      <div className="card text-center py-6 mt-12">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sponsor</div>
        <div className="bg-white/5 rounded-lg h-20 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Advertisement - Google AdSense</span>
        </div>
      </div>
    </article>
  );
}
