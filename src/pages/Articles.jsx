import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { ARTICLES, CATEGORIES } from "../data/articlesData.jsx";
import {
  Search,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Share2,
  Heart,
  Check,
  ExternalLink
} from "lucide-react";

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState({
    "sub-second-page-speed": 84,
    "ai-whatsapp-automation": 128,
    "what-is-an-api": 62,
    "responsive-design": 49
  });
  const [copiedId, setCopiedId] = useState(null);

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}/articles/${id}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Articles", url: "https://www.prajyotinfotech.in/articles" }
        ]}
      />

      <Seo
        title="Engineering Articles & Architecture Deep-Dives | Prajyot Infotech"
        description="Technical guides, sub-second web performance blueprints, AI WhatsApp automation architectures, and API design principles by Prajyot Infotech engineers."
        keywords="software engineering articles, sub-second web performance, WhatsApp AI automation, REST API guide, mobile-first responsive architecture"
        path="/articles"
      />

      {/* Hero Header */}
      <header className="relative pt-36 pb-20 px-4 overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-600/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            Prajyot Engineering Research & Insights
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            Don't just read tech.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-pink-400">
              Simulate it live.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Explore hands-on interactive architectural models, Core Web Vitals simulators, and business automation blueprints engineered by the Prajyot Infotech core team.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, architecture, APIs, or performance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm shadow-inner transition-all"
            />
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="max-w-5xl mx-auto mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 space-y-20">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-950 border border-slate-800">
            <p className="text-xl font-bold text-slate-300 mb-2">No articles matched your query</p>
            <p className="text-sm text-slate-400">Try searching for keywords like "API", "Speed", or "Automation".</p>
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <article
              key={article.id}
              id={article.id}
              className="p-6 md:p-10 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-2xl relative scroll-mt-28 transition-all hover:border-slate-700"
            >
              {/* Category & Read Time */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-950/80 border border-brand-800/60 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {article.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-snug">
                <Link to={`/articles/${article.id}`} className="hover:text-brand-300 transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Interactive Widget */}
              <div className="my-6">
                {article.interactiveComponent}
              </div>

              {/* Key Takeaways Box */}
              <div className="my-8 p-5 md:p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  Key Architectural Takeaways
                </h3>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Article Content */}
              <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-800/80 pt-6">
                {article.content}
              </div>

              {/* Article Footer Toolbar */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(article.id)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:text-pink-400 text-xs font-bold text-slate-300 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
                    <span>{likes[article.id] || 0} Helpful</span>
                  </button>

                  <button
                    onClick={() => handleCopyLink(article.id)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-brand-500/50 text-xs font-bold text-slate-300 transition-all cursor-pointer"
                  >
                    {copiedId === article.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Share URL</span>
                      </>
                    )}
                  </button>

                  <Link
                    to={`/articles/${article.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-brand-500/40 text-brand-300 hover:bg-brand-950 text-xs font-bold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Direct Article Page
                  </Link>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-brand-600/20"
                >
                  Implement This Architecture
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
