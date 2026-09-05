import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Gauge, Bot, Zap, Smartphone, Layers } from "lucide-react";

const FEATURED_INSIGHTS = [
  {
    id: "sub-second-page-speed",
    title: "Why Sub-Second Page Speed is Google's #1 Ranking Factor in 2026",
    category: "Performance & SEO",
    tag: "Core Web Vitals",
    stat: "99/100",
    statLabel: "Lighthouse Score",
    readTime: "4 min read",
    desc: "Discover the architectural optimizations we implement to cut bounce rates by 68% and secure top Google rankings.",
    icon: Gauge,
    color: "emerald"
  },
  {
    id: "ai-whatsapp-automation",
    title: "Automating Business Operations with AI & WhatsApp: From Leads to Revenue in 12s",
    category: "AI & Automation",
    tag: "3s Response",
    stat: "7.4x",
    statLabel: "Conversion Multiplier",
    readTime: "5 min read",
    desc: "How connecting AI LLMs with WhatsApp Cloud API captures and qualifies high-intent customer leads 24/7.",
    icon: Bot,
    color: "brand"
  },
  {
    id: "what-is-an-api",
    title: "Understanding APIs: The Waiters of the Digital Economy",
    category: "APIs & Backend",
    tag: "Architecture",
    stat: "12ms",
    statLabel: "Average Latency",
    readTime: "4 min read",
    desc: "A hands-on visual guide to how modern web applications route encrypted HTTP requests to PostgreSQL databases.",
    icon: Zap,
    color: "indigo"
  }
];

export default function ArticlesPreview() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 font-semibold text-xs tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Engineering Research & Insights
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Interactive Lab & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-pink-400">Tech Blueprints</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl text-base md:text-lg">
              We test, benchmark, and open-source our software engineering methodologies. Explore our live simulators.
            </p>
          </div>

          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold text-sm transition-all group"
          >
            <span>Explore All 4 Interactive Blueprints</span>
            <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_INSIGHTS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 md:p-8 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-brand-950/30"
              >
                <div>
                  {/* Category & Stat Bar */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-950/80 px-2.5 py-1 rounded border border-brand-800/50">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.readTime}
                    </span>
                  </div>

                  {/* Icon & Stat Highlight */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black font-mono text-emerald-400">{item.stat}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{item.statLabel}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-brand-300 transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Live Simulator Available</span>
                  <Link
                    to={`/articles#${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 group-hover:text-brand-300 transition-colors"
                  >
                    Simulate Live <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
