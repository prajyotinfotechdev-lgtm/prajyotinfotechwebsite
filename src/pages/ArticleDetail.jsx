import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { ARTICLES } from "../data/articlesData.jsx";
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Heart,
  Copy,
  Check,
  Calendar,
  User,
  Sparkles,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WA_NUMBER = "917020708747";

export default function ArticleDetail() {
  const { id } = useParams();
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const related = ARTICLES.filter((a) => a.id !== id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleUrl = `https://www.prajyotinfotech.in/articles/${article.id}`;

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "headline": article.title,
    "description": article.excerpt,
    "image": "https://www.prajyotinfotech.in/og/og-default.jpg",
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole,
      "worksFor": {
        "@type": "Organization",
        "name": "Prajyot Infotech"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prajyot Infotech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.prajyotinfotech.in/videos/Logo.jpg"
      }
    },
    "datePublished": "2026-09-01T08:00:00+05:30",
    "dateModified": "2026-11-23T12:00:00+05:30"
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Articles", url: "https://www.prajyotinfotech.in/articles" },
          { name: article.title, url: articleUrl }
        ]}
      />

      <Seo
        title={`${article.title} — Prajyot Infotech`}
        description={article.excerpt}
        keywords={`${article.category}, software engineering Pune, ${article.title.toLowerCase()}`}
        path={`/articles/${article.id}`}
        schema={techArticleSchema}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-semibold mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all engineering insights
        </Link>

        {/* Header Block */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {article.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                {article.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <span className="font-semibold text-white block">{article.author}</span>
                <span className="text-xs text-slate-400">{article.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  liked ? "bg-rose-500/20 text-rose-400 border-rose-500/40" : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-400" : ""}`} />
                {liked ? "Liked" : "Like"}
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Link" : "Share"}
              </button>
            </div>
          </div>
        </header>

        {/* Lead Excerpt */}
        <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-800/40 text-lg sm:text-xl font-medium text-brand-200 leading-relaxed mb-8">
          "{article.excerpt}"
        </div>

        {/* Embedded Interactive Simulator */}
        {article.interactiveComponent && (
          <div className="my-8">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Live Interactive Simulation & Calculator
            </h2>
            {article.interactiveComponent}
          </div>
        )}

        {/* Key Takeaways Box */}
        <div className="my-10 p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Executive Key Takeaways
          </h2>
          <ul className="space-y-3">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-brand-400 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert prose-brand max-w-none text-slate-300 text-base sm:text-lg leading-relaxed space-y-6">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {/* Mid-Article Consultation CTA */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-brand-900/60 via-slate-900 to-indigo-950/60 border border-brand-500/30 text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want to apply this architecture to your business?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Prajyot Infotech provides a complimentary 2027 Technology Audit to identify software bottlenecks, automate workflows, and engineer high-throughput web & app platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openLeadModal({ projectType: `Inquiry from Article: ${article.title}` })}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              Book Complimentary Tech Audit
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Prajyot Infotech, I read your article "${article.title}" and would like to consult with your engineering team.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Recommended Next Reads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/articles/${item.id}`}
                className="group p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-brand-400 block mb-2">{item.category}</span>
                  <h4 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.excerpt}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-400 font-semibold">
                  Read article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

