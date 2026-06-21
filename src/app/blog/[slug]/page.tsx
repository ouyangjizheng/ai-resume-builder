import Link from "next/link";
import posts from "@/data/blog-posts.json";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  introduction: string;
  steps: { heading: string; content: string }[];
  example: string;
  faq: { q: string; a: string }[];
  conclusion: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p: Post) => p.slug === slug) as Post | undefined;
  if (!post) return { title: "Not Found" };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p: Post) => p.slug === slug) as Post | undefined;
  if (!post) notFound();

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300">{post.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase font-medium">
            {post.category}
          </span>
          <span className="text-xs text-gray-500">{post.date}</span>
          <span className="text-xs text-gray-500">|</span>
          <span className="text-xs text-gray-500">{post.readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
        <p className="text-gray-400 text-lg">{post.metaDescription}</p>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <MarkdownRenderer content={post.introduction} />
      </section>

      {/* Steps Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <span className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center text-sm">S</span>
          Step-by-Step Guide
        </h2>
        <div className="space-y-10">
          {post.steps.map((step, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-purple-500/30">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.heading}</h3>
              <MarkdownRenderer content={step.content} />
            </div>
          ))}
        </div>
      </section>

      {/* Real Example Section */}
      {post.example && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center text-sm">E</span>
            Real Resume Example
          </h2>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <MarkdownRenderer content={post.example} />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center text-sm">?</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {post.faq.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-semibold text-white mb-2" itemProp="name">{faq.q}</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div className="text-gray-400 text-sm" itemProp="text"><MarkdownRenderer content={faq.a} /></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center text-sm">!</span>
          Conclusion
        </h2>
        <MarkdownRenderer content={post.conclusion} />
      </section>

      {/* Tool Links - SEO Internal Linking */}
      <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10">
        <h3 className="text-xl font-bold mb-4">Ready to Build Your Resume?</h3>
        <p className="text-gray-400 mb-6">Use our AI-powered tools to create a professional resume in minutes.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/resume" className="btn-primary text-sm !py-2.5 !px-5">Build Your Resume</a>
          <a href="/cover-letter" className="btn-secondary text-sm !py-2.5 !px-5">Generate Cover Letter</a>
          <a href="/interview" className="btn-secondary text-sm !py-2.5 !px-5">Interview Prep</a>
        </div>
      </div>

      {/* Ad placement */}
      <div className="card text-center py-6 mt-12">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sponsor</div>
        <div className="bg-white/5 rounded-lg h-20 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Advertisement - Google AdSense</span>
        </div>
      </div>
    </article>
  );
}
