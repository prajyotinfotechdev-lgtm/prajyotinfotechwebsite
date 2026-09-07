import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Tablet,
  Smartphone,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers
} from "lucide-react";

export default function PortfolioSpotlight({ onOpenDemo }) {
  const [activeDevice, setActiveDevice] = useState("desktop"); // desktop | tablet | mobile
  const [activeTab, setActiveTab] = useState("live"); // live | pos | analytics
  const [ordersServed, setOrdersServed] = useState(1482);

  const simulateNewOrder = () => {
    setOrdersServed((prev) => prev + 1);
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-tr from-brand-600/15 via-indigo-600/10 to-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              FLAGSHIP SPOTLIGHT SYSTEM
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Enterprise QR & Multi-Kitchen{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Cloud ERP
              </span>
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Engineered for high-volume dining establishments. Handles 1,500+ daily orders with zero latency, live chef kitchen display, and automated WhatsApp guest receipts.
            </p>
          </div>

          {/* Device Frame Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-2xl self-start md:self-auto backdrop-blur-xl shadow-xl">
            <button
              onClick={() => setActiveDevice("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeDevice === "desktop"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setActiveDevice("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeDevice === "tablet"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet KDS</span>
            </button>
            <button
              onClick={() => setActiveDevice("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeDevice === "mobile"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guest Mobile</span>
            </button>
          </div>
        </div>

        {/* Showcase Canvas */}
        <div className="relative rounded-3xl border border-slate-700/80 bg-slate-950/90 p-4 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Interactive Device Mockup */}
            <div className="lg:col-span-8 flex justify-center">
              <AnimatePresence mode="wait">
                {activeDevice === "desktop" && (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden"
                  >
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                        </div>
                        <span className="font-mono text-slate-500 ml-2">https://admin.smartdine-cloud.internal</span>
                      </div>
                      <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live Stream Connected
                      </span>
                    </div>

                    {/* Dashboard Body Preview */}
                    <div className="p-4 sm:p-6 bg-slate-900/90 text-xs space-y-4">
                      {/* Top KPIs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Active End Users</span>
                          <span className="text-lg font-black text-emerald-400">2,420</span>
                          <span className="text-[9px] text-emerald-500 block mt-0.5">+18% vs yesterday</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Active Diners</span>
                          <span className="text-lg font-black text-white">42 Guests</span>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Across 14 Tables</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Kitchen Wait Time</span>
                          <span className="text-lg font-black text-amber-400">11m 40s</span>
                          <span className="text-[9px] text-emerald-400 block mt-0.5">Target: &lt;15m</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Live Completed</span>
                          <span className="text-lg font-black text-brand-300 font-mono">{ordersServed}</span>
                          <span className="text-[9px] text-brand-400 block mt-0.5">Orders Dispatched</span>
                        </div>
                      </div>

                      {/* Interactive Interactive Table Grid in Mockup */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-slate-200">Floor Layout Table Management (Click Table to Simulate):</span>
                          <button
                            onClick={simulateNewOrder}
                            className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 px-3 py-1 rounded-lg text-[10px] font-bold border border-orange-500/40 transition cursor-pointer"
                          >
                            + Simulate Guest QR Scan
                          </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {[
                            { num: "01", status: "Occupied", bill: "₹1,280" },
                            { num: "02", status: "Billing", bill: "₹2,450" },
                            { num: "03", status: "Available", bill: "-" },
                            { num: "04", status: "Order Placed", bill: "₹890" },
                            { num: "05", status: "Available", bill: "-" },
                            { num: "06", status: "Occupied", bill: "₹1,740" },
                          ].map((t) => (
                            <button
                              key={t.num}
                              onClick={simulateNewOrder}
                              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                                t.status === "Occupied"
                                  ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                                  : t.status === "Billing"
                                  ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                                  : t.status === "Order Placed"
                                  ? "bg-orange-500/20 border-orange-500/50 text-orange-200"
                                  : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
                              }`}
                            >
                              <div className="flex justify-between font-mono font-bold text-xs">
                                <span>T-{t.num}</span>
                              </div>
                              <span className="text-[9px] block font-semibold truncate mt-1">{t.status}</span>
                              <span className="text-[9px] block text-slate-400 font-mono mt-0.5">{t.bill}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeDevice === "tablet" && (
                  <motion.div
                    key="tablet"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-xl aspect-[4/3] rounded-3xl bg-slate-950 border-[10px] border-slate-800 shadow-2xl p-4 flex flex-col justify-between overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="font-bold text-white text-xs">KDS CHEF DISPLAY TERMINAL</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Station: Tandoor & Grill</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-2 flex-1">
                      <div className="bg-slate-900 p-3 rounded-2xl border border-orange-500/40 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between font-mono font-bold text-xs text-orange-400 mb-1">
                            <span>#T-04</span>
                            <span>04:12</span>
                          </div>
                          <p className="font-bold text-white text-xs">Chicken Tikka x2</p>
                          <p className="text-slate-400 text-[10px]">Garlic Roti x4 (Well done)</p>
                        </div>
                        <button
                          onClick={simulateNewOrder}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-[10px] transition cursor-pointer"
                        >
                          Mark Prepared ✓
                        </button>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between font-mono font-bold text-xs text-slate-300 mb-1">
                            <span>#T-09</span>
                            <span>08:45</span>
                          </div>
                          <p className="font-bold text-white text-xs">Paneer Crispy x1</p>
                          <p className="text-slate-400 text-[10px]">Veg Schezwan Fried Rice x1</p>
                        </div>
                        <button
                          onClick={simulateNewOrder}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-[10px] transition cursor-pointer"
                        >
                          Mark Prepared ✓
                        </button>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 text-center font-mono">
                      Realtime WebSocket sync with floor staff tablets
                    </div>
                  </motion.div>
                )}

                {activeDevice === "mobile" && (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-72 aspect-[9/19] rounded-[42px] bg-slate-950 border-[8px] border-slate-800 shadow-2xl p-4 flex flex-col justify-between overflow-hidden relative"
                  >
                    {/* Dynamic Island */}
                    <div className="w-24 h-5 bg-black rounded-full mx-auto mb-2" />

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-mono text-slate-400 uppercase">Welcome to</p>
                          <h4 className="font-black text-white text-xs">Copper Chimney</h4>
                        </div>
                        <span className="bg-orange-500/20 text-orange-400 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
                          Table #04
                        </span>
                      </div>

                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-200">Chef's Signature</p>
                        <p className="text-white text-xs font-semibold mt-0.5">Dum Biryani Pot</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-orange-400 font-bold text-xs">₹380</span>
                          <button
                            onClick={simulateNewOrder}
                            className="bg-orange-500 text-white px-2 py-0.5 rounded font-bold text-[10px]"
                          >
                            + Add
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-200">Mocktails</p>
                        <p className="text-white text-xs font-semibold mt-0.5">Blue Lagoon Cooler</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-orange-400 font-bold text-xs">₹160</span>
                          <button
                            onClick={simulateNewOrder}
                            className="bg-orange-500 text-white px-2 py-0.5 rounded font-bold text-[10px]"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                      <p className="text-[9px] text-slate-400">No App Download Needed</p>
                      <span className="text-[10px] font-bold text-emerald-400">Instant QR PWA Technology</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Highlights & Technical Value Prop */}
            <div className="lg:col-span-4 space-y-5 text-xs text-slate-300">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Instant Table QR Ordering</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Guests browse high-resolution dishes on their smartphone with zero app download and send orders directly to the kitchen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Realtime Kitchen Display (KDS)</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Eliminates paper KOT slips. Kitchen monitors display color-coded pending tickets with live timer alerts to prevent delays.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">WhatsApp Receipt & Review Loop</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Automated GST invoice delivered to guest WhatsApp with direct 1-click Google Review collection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onOpenDemo("restaurant-management")}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/25 transition cursor-pointer flex items-center justify-center gap-2 text-xs"
                >
                  <Zap className="w-4 h-4" />
                  Launch Full Interactive Simulator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
