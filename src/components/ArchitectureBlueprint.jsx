import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  Database,
  ShieldCheck,
  Server,
  Zap,
  Lock,
  CheckCircle2,
  Layers,
  ArrowRight,
  Activity,
  Code2
} from "lucide-react";

const ARCH_LAYERS = [
  {
    id: "edge",
    name: "Layer 01: Global Edge & CDN",
    tagline: "Sub-80ms Global TTFB & DDoS Shielding",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    description: "Every web request hits our global edge network before reaching core servers, terminating SSL, blocking malicious bot traffic, and serving cached assets at extreme speed.",
    specs: [
      { label: "Global Edge Routing", value: "Cloudflare / AWS CloudFront" },
      { label: "Transport Protocol", value: "HTTP/3 over QUIC + TLS 1.3" },
      { label: "Median Edge TTFB", value: "< 75ms Worldwide" },
      { label: "DDoS Mitigation", value: "Layer 3/4/7 Automated Scrubbing" }
    ],
    codeSnippet: `// Edge Routing Configuration
export const runtime = 'edge';
export const config = {
  regions: ['bom1', 'sin1', 'fra1'],
  headers: {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  }
};`
  },
  {
    id: "app",
    name: "Layer 02: Reactive Microservices",
    tagline: "React 19 SSR, Node.js & Real-time WebSockets",
    icon: Cpu,
    color: "from-indigo-500 to-violet-500",
    accent: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    description: "Built with decoupled microservices and event-driven architectures. Handles high-concurrency spikes during sales flash events or sudden traffic surges without performance degradation.",
    specs: [
      { label: "Frontend Framework", value: "React 19 / Next.js SSR" },
      { label: "Backend Core", value: "Node.js Cluster / Express Microservices" },
      { label: "Real-time Protocol", value: "WebSocket Event Bus (Pub/Sub)" },
      { label: "Deploy Strategy", value: "Zero-Downtime Blue/Green Rollouts" }
    ],
    codeSnippet: `// High-Concurrency Event Pipeline
app.post('/api/v1/orders', rateLimiter({ max: 100 }), async (req, res) => {
  const transaction = await db.beginTransaction();
  try {
    const order = await orderService.createOrder(req.body, { transaction });
    await eventBus.publish('ORDER_CREATED', order);
    await transaction.commit();
    return res.status(201).json(order);
  } catch (err) {
    await transaction.rollback();
  }
});`
  },
  {
    id: "data",
    name: "Layer 03: ACID Data Persistence",
    tagline: "PostgreSQL, MongoDB & Redis Memory Caching",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    description: "Complete transactional integrity. We structure database schemas with strict foreign keys, specialized indexing, Redis caching, and automated multi-region replication.",
    specs: [
      { label: "Primary Storage", value: "PostgreSQL (ACID) / MongoDB 7.0" },
      { label: "In-Memory Cache", value: "Redis v7 Cluster (< 2ms queries)" },
      { label: "Backup Protocol", value: "Automated Daily Encrypted Snapshots" },
      { label: "Point-In-Time Recovery", value: "Enabled (Up to 30 Days)" }
    ],
    codeSnippet: `-- Optimized Serialized Indexing
CREATE TABLE retail_inventory (
  imei_serial VARCHAR(18) PRIMARY KEY,
  model_id UUID REFERENCES product_catalog(id),
  stock_status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_inventory_lookup ON retail_inventory (model_id, stock_status);`
  },
  {
    id: "security",
    name: "Layer 04: Security & Compliance",
    tagline: "AES-256 Encryption & 100% IP Handover",
    icon: ShieldCheck,
    color: "from-amber-500 to-rose-500",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    description: "Enterprise-grade data sovereignty. Your application is safeguarded by AES-256 encryption at rest, OWASP Top 10 mitigation, and India DPDP Act / GDPR principles.",
    specs: [
      { label: "At-Rest Encryption", value: "AES-256 KMS Key Rotation" },
      { label: "In-Transit Security", value: "TLS 1.3 Strict Ciphers" },
      { label: "Data Privacy Standards", value: "India DPDP Act & GDPR Ready" },
      { label: "Codebase Ownership", value: "100% Full Git Repository Transfer" }
    ],
    codeSnippet: `// Enterprise JWT Cookie Auth & CORS
const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};
// 100% Git Repository Handover on Day 1`
  }
];

export default function ArchitectureBlueprint() {
  const [activeLayer, setActiveLayer] = useState("edge");

  const current = ARCH_LAYERS.find((l) => l.id === activeLayer) || ARCH_LAYERS[0];
  const IconComponent = current.icon;

  return (
    <section id="architecture" className="relative py-20 md:py-28 bg-[#070c18] text-slate-100 overflow-hidden" aria-label="System Architecture & Security Blueprint">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md mb-4 shadow-inner">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            ENTERPRISE ARCHITECTURE &amp; SECURITY
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Engineered for 99.98% Uptime &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-brand-300 to-indigo-300 bg-clip-text text-transparent">
              Zero Vendor Lock-In
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Inspect the 4-layer technical topology we deploy for your enterprise. Every system is built to withstand heavy transaction concurrency, guarantee data integrity, and remain 100% owned by your company.
          </p>
        </div>

        {/* Layer Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mb-8">
          {ARCH_LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 border-cyan-500/70 shadow-xl shadow-cyan-950/40 scale-[1.02]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    {layer.id}
                  </span>
                </div>
                <div className="font-bold text-white text-xs sm:text-sm">{layer.name.split(":")[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Detail Card */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-10 max-w-5xl mx-auto backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Specs & Overview (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border mb-3 ${current.accent}`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{current.tagline}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {current.name}
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {current.specs.map((spec, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Code / Topology Mockup (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Code2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>production_spec.ts</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">Strict Typing</span>
                </div>
                <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed p-1 font-mono">
                  <code>{current.codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Production Metrics Bar */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">99.98%</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Cloud Uptime SLA</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-mono font-black text-cyan-400">&lt; 120ms</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Median API Latency</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-mono font-black text-brand-400">100%</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Full IP Ownership</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-mono font-black text-indigo-400">Zero</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Proprietary Locks</div>
          </div>
        </div>
      </div>
    </section>
  );
}
