import Link from "next/link";
import posts from "@/data/blog-posts.json";

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-5xl mb-4">📝</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Career <span className="gradient-text">Blog</span></h1>
        <p className="text-gray-400 max-w-xl mx-auto">Expert career advice, resume tips, and interview strategies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <Link key={post.slug} href={"/blog/" + post.slug} className="card animate-fade-in group" style={{ animationDelay: (i * 0.1).toString() + "s" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase">
                {post.category}
              </span>
              <span className="text-xs text-gray-500">{post.date}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-purple-400 group-hover:gap-2 transition-all">
              Read More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="card text-center py-6 mt-12">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sponsor</div>
        <div className="bg-white/5 rounded-lg h-20 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Advertisement - Google AdSense</span>
        </div>
      </div>
    </div>
  );
}