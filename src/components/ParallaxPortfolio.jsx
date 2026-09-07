import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Monitor,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  ExternalLink,
  MessageSquare,
  Server,
  Database,
  Smartphone,
  Tablet,
  Check,
  QrCode,
  Barcode,
  Clock,
  Printer
} from "lucide-react";
import { PROJECTS } from "../data/projectsData.js";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// We select the 3 biggest flagship systems from the central project data
const FLAGSHIP_IDS = ["restaurant-management", "mobile-shop-management", "vyapaariyo-saas"];

// ─── HIGH-FIDELITY SIMULATED INTERFACE SCREENS ───────────────────────────────

function RestaurantScreenPreview() {
  return (
    <div className="w-full h-full bg-[#0a0f1d] text-slate-200 flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Browser / App bar */}
      <div className="h-8 bg-[#070b14] border-b border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[9px] font-mono text-slate-400">
            <span className="text-emerald-400">●</span> https://kds.copperchimney.prajyotinfotech.in/live-stream
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            WebSocket Live: 14ms
          </span>
          <span className="text-slate-400 hidden sm:inline">14 Branches Connected</span>
        </div>
      </div>

      {/* Main KDS Grid */}
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden bg-gradient-to-b from-[#0a0f1d] to-[#040812]">
        {/* Column 1: Live Table Orders */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-orange-400" />
                Live Table Queue
              </span>
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono text-[9px] font-bold">
                3 Active
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white flex items-center gap-1">
                    Table #04 <span className="text-[9px] font-mono text-slate-400">• 4 Guests</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Paneer Butter Masala x1, Garlic Naan x2</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold">
                  Cooking
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white flex items-center gap-1">
                    Table #12 <span className="text-[9px] font-mono text-slate-400">• 2 Guests</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Cold Coffee x2, Veg Crispy x1</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">
                  Ready
                </span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-400">
            <span>Avg Ticket Wait: <strong className="text-white">11 min</strong></span>
            <span className="text-emerald-400 font-bold">Turnover +35%</span>
          </div>
        </div>

        {/* Column 2: Kitchen Display Chef Screen */}
        <div className="rounded-xl border border-orange-500/30 bg-orange-950/10 p-2.5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-1.5 mb-2">
              <span className="font-bold text-orange-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                Chef KDS Station #1
              </span>
              <span className="text-[9px] font-mono text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded">
                Auto-Printed
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/90 border border-orange-500/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-white">KOT #1049</span>
                <span className="text-orange-400 font-mono text-[10px] font-bold">Timer: 03:42</span>
              </div>
              <div className="text-[10px] space-y-1 text-slate-200">
                <div className="flex justify-between border-b border-slate-800/80 pb-0.5">
                  <span>1x Dal Makhani Special</span>
                  <span className="text-emerald-400 font-bold">✓ Prepped</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-0.5">
                  <span>2x Butter Garlic Naan</span>
                  <span className="text-amber-400 font-bold">Tandoor</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Hyderabadi Biryani</span>
                  <span className="text-amber-400 font-bold">Plating</span>
                </div>
              </div>
              <div className="pt-1.5 flex gap-1.5">
                <button className="flex-1 py-1 rounded bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9px] transition">
                  Mark Order Ready
                </button>
                <button className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">
                  Reprint
                </button>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-slate-400 flex justify-between items-center pt-2">
            <span>Kitchen Errors: <strong className="text-emerald-400">0.0%</strong></span>
            <span>Chef Dispatch: <strong className="text-white">Active</strong></span>
          </div>
        </div>

        {/* Column 3: Automated WhatsApp Receipt Stream */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp Cloud Engine
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                Instant PDF
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono font-semibold">
                <span>✓ Delivered to +91 98*** 44102</span>
              </div>
              <p className="text-[10px] text-slate-200 leading-snug">
                "Hi Rajesh! Thank you for dining at Copper Chimney. Your invoice #CC-8291 for ₹1,280 is ready. View tax bill: cc.in/b/8291"
              </p>
              <div className="text-[9px] font-mono text-slate-400 bg-slate-950/80 p-1.5 rounded flex justify-between">
                <span>GST: 5% (₹60.95)</span>
                <span className="text-emerald-300 font-bold">Paid via UPI</span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px]">
            <span className="text-slate-400">Paper Slips Saved:</span>
            <span className="text-emerald-400 font-mono font-bold">1,500+ / Day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileShopScreenPreview() {
  return (
    <div className="w-full h-full bg-[#0a0f1d] text-slate-200 flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Browser / App bar */}
      <div className="h-8 bg-[#070b14] border-b border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[9px] font-mono text-slate-400">
            <span className="text-indigo-400">●</span> https://pos.shreesamarth.prajyotinfotech.in/imei-billing
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-indigo-400 flex items-center gap-1 font-semibold">
            <Barcode className="w-3.5 h-3.5 text-indigo-400" />
            Barcode Scanner: Synced
          </span>
          <span className="text-slate-400 hidden sm:inline">GST Ledger: 100% ACID</span>
        </div>
      </div>

      {/* Main POS Interface */}
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden bg-gradient-to-b from-[#0a0f1d] to-[#040812]">
        {/* Column 1: Live IMEI Scanner */}
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/10 p-2.5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-1.5 mb-2">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Barcode className="w-3.5 h-3.5 text-indigo-400" />
                Live IMEI Ingestion
              </span>
              <span className="text-[9px] font-mono text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded">
                Instant Lookup
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-indigo-500/30 space-y-1.5">
              <div className="text-[9px] text-slate-400 uppercase font-mono">Scanned Serial Number:</div>
              <div className="font-mono text-xs font-bold text-indigo-300 tracking-wider bg-slate-900 px-2 py-1 rounded border border-indigo-500/20">
                869401058291042
              </div>
              <div className="text-[10px] text-slate-200 pt-1">
                <div className="font-bold text-white">Apple iPhone 15 Pro (256GB)</div>
                <div className="text-slate-400 text-[9px] mt-0.5">Color: Natural Titanium • Warranty: 1 Yr Apple India</div>
                <div className="text-emerald-400 font-mono text-[10px] font-bold mt-1">₹1,24,900 incl. 18% GST</div>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-indigo-500/20 flex justify-between items-center text-[9px]">
            <span className="text-slate-400">Total Tracked Units:</span>
            <span className="text-indigo-400 font-mono font-bold">50,000+ IMEIs</span>
          </div>
        </div>

        {/* Column 2: Invoice & Thermal Generator */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-brand-400" />
                Automated Tax Invoice
              </span>
              <span className="px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono text-[9px] font-bold">
                Auto-Calculated
              </span>
            </div>
            <div className="space-y-1 text-[9px] font-mono bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Taxable Base Value:</span>
                <span className="text-white">₹1,05,847.46</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CGST @ 9%:</span>
                <span className="text-white">₹9,526.27</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SGST @ 9%:</span>
                <span className="text-white">₹9,526.27</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1 text-[11px]">
                <span>Invoice Total:</span>
                <span>₹1,24,900.00</span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px]">
            <span className="text-slate-400">Checkout Speed:</span>
            <span className="text-emerald-400 font-mono font-bold">&lt; 45 Seconds</span>
          </div>
        </div>

        {/* Column 3: Customer Job Card & Repair Alert */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Job Card & Repair CRM
              </span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold">
                Live Status
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-white font-bold">JC #8419 — OnePlus 11R</span>
                <span className="text-amber-400 font-bold bg-amber-500/20 px-1.5 py-0.5 rounded">Part Replaced</span>
              </div>
              <p className="text-[9px] text-slate-400">
                Issue: OLED display flicker. Replaced with OEM panel. Tested 12-point hardware check.
              </p>
              <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                <span>✓ WhatsApp notification dispatched: Ready for pickup</span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px]">
            <span className="text-slate-400">Repeat Repair Rate:</span>
            <span className="text-emerald-400 font-mono font-bold">+22% Growth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaasScreenPreview() {
  return (
    <div className="w-full h-full bg-[#0a0f1d] text-slate-200 flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Browser / App bar */}
      <div className="h-8 bg-[#070b14] border-b border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[9px] font-mono text-slate-400">
            <span className="text-purple-400">●</span> https://admin.vyapaariyo.com/multi-tenant/orchestrator
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-purple-400 flex items-center gap-1 font-semibold">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            Isolated Multi-DB: Active
          </span>
          <span className="text-slate-400 hidden sm:inline">60+ Merchant Portals Live</span>
        </div>
      </div>

      {/* Main SaaS Interface */}
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden bg-gradient-to-b from-[#0a0f1d] to-[#040812]">
        {/* Column 1: Tenant Provisioning */}
        <div className="rounded-xl border border-purple-500/30 bg-purple-950/10 p-2.5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-1.5 mb-2">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-purple-400" />
                Tenant Cloud Provisioning
              </span>
              <span className="text-[9px] font-mono text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded">
                &lt; 3 Min Setup
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-purple-500/30 space-y-1.5">
              <div className="text-[9px] font-mono text-slate-400">Active Tenant Context:</div>
              <div className="text-[10px] font-bold text-white flex items-center justify-between bg-slate-900 p-1.5 rounded">
                <span>ApexWholesale.vyapaariyo.com</span>
                <span className="text-[9px] text-emerald-400 font-mono">Live</span>
              </div>
              <div className="text-[9px] text-slate-300 space-y-0.5 pt-1">
                <div className="flex justify-between"><span>Catalog SKUs:</span><strong className="text-white">12,400+ items</strong></div>
                <div className="flex justify-between"><span>Wholesale Tier:</span><strong className="text-purple-300">MOQ 50 Units</strong></div>
                <div className="flex justify-between"><span>Storage CDN:</span><strong className="text-white">AWS S3 Synced</strong></div>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-purple-500/20 flex justify-between items-center text-[9px]">
            <span className="text-slate-400">Total Merchants Live:</span>
            <span className="text-purple-400 font-mono font-bold">60+ Portals</span>
          </div>
        </div>

        {/* Column 2: ACID Inventory Across 12 Warehouses */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                ACID Inventory Sync
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold">
                Zero Discrepancy
              </span>
            </div>
            <div className="space-y-1 text-[9px] bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono">
              <div className="flex justify-between text-slate-300 border-b border-slate-800/80 pb-0.5">
                <span>Warehouse A (Pune):</span>
                <span className="text-emerald-400">4,820 Units</span>
              </div>
              <div className="flex justify-between text-slate-300 border-b border-slate-800/80 pb-0.5">
                <span>Warehouse B (Mumbai):</span>
                <span className="text-emerald-400">8,190 Units</span>
              </div>
              <div className="flex justify-between text-slate-300 border-b border-slate-800/80 pb-0.5">
                <span>Warehouse C (Nagpur):</span>
                <span className="text-amber-400">1,240 Units (Low)</span>
              </div>
              <div className="flex justify-between text-indigo-300 pt-0.5">
                <span>Total Aggregated:</span>
                <span className="font-bold">14,250 Units</span>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px]">
            <span className="text-slate-400">Ledger Discrepancy:</span>
            <span className="text-emerald-400 font-mono font-bold">0.00% Verified</span>
          </div>
        </div>

        {/* Column 3: Wholesale Dispatch Manifest */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Dispatch & E-Way Engine
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                Automated E-Way
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-white font-bold">Dispatch #DISP-9021</span>
                <span className="text-emerald-400 font-mono font-bold">In Transit</span>
              </div>
              <div className="text-[9px] text-slate-400 space-y-0.5">
                <div>Route: Bhosari Industrial → Solapur Hub</div>
                <div>Vehicle: MH 12 QX 9821 • Driver: Santosh P.</div>
                <div>E-Way Bill: 8912-0943-1123 (Govt Portal Synced)</div>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px]">
            <span className="text-slate-400">Turnaround Speed:</span>
            <span className="text-emerald-400 font-mono font-bold">Under 25 Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PARALLAX PORTFOLIO COMPONENT ───────────────────────────────────────

export default function ParallaxPortfolio({ onOpenDemo }) {
  const targetRef = useRef(null);
  const [manualIndex, setManualIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Find the 3 flagship projects from the dataset
  const flagshipProjects = FLAGSHIP_IDS.map((id) =>
    PROJECTS.find((p) => p.id === id) || PROJECTS[0]
  );

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll mapping for the 3 slides
  const activeIndex = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.33) return 0;
    if (pos < 0.66) return 1;
    return 2;
  });

  // Translation of the screen reel inside the laptop
  const reelY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-33.333%", "-66.666%"]);

  const screens = [
    <RestaurantScreenPreview key="restaurant" />,
    <MobileShopScreenPreview key="mobileshop" />,
    <SaasScreenPreview key="saas" />,
  ];

  return (
    <section ref={targetRef} className="relative h-[280vh] md:h-[300vh] bg-[#070b14]" aria-label="Flagship Engineering Works">
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between py-8 px-4 overflow-hidden">
        
        {/* Dynamic Background Glow matching current active project */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <motion.div
            className="w-[700px] h-[700px] blur-[140px] rounded-full"
            style={{
              background: useTransform(
                activeIndex,
                [0, 1, 2],
                [
                  "radial-gradient(circle, #f97316 0%, transparent 70%)", // Orange for Restaurant
                  "radial-gradient(circle, #6366f1 0%, transparent 70%)", // Indigo for POS
                  "radial-gradient(circle, #8b5cf6 0%, transparent 70%)"  // Purple for SaaS
                ]
              )
            }}
          />
        </div>

        {/* Section Header */}
        <div className="text-center relative z-10 max-w-3xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-bold text-brand-300 backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            ENTERPRISE ARCHITECTURE SHOWCASE
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Software Engineered for{" "}
            <span className="bg-gradient-to-r from-brand-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              High-Velocity Scale
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1.5 hidden sm:block">
            Scroll to inspect production systems built for Indian enterprises with live WebSockets, IMEI serial tracking, and multi-tenant cloud schemas.
          </p>

          {/* Quick Tab Switcher Dock */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {flagshipProjects.map((proj, idx) => (
              <a
                key={proj.id}
                href={`#${proj.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  // Smooth scroll to corresponding offset in container
                  if (targetRef.current) {
                    const top = targetRef.current.offsetTop;
                    const height = targetRef.current.offsetHeight;
                    window.scrollTo({
                      top: top + (idx / 2.5) * height,
                      behavior: "smooth"
                    });
                  }
                }}
                className="px-3 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white backdrop-blur-md"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-orange-400" : idx === 1 ? "bg-indigo-400" : "bg-purple-400"}`} />
                <span className="truncate max-w-[120px] sm:max-w-none">{proj.tag}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 3D Laptop Mockup Container */}
        <div className="relative w-full max-w-4xl px-2 sm:px-4 perspective-1000 z-10 my-auto">
          <motion.div
            className="relative transform-style-3d"
            style={{
              rotateX: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [15, 0, 0, -15]),
              scale: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.92, 1, 1, 0.92])
            }}
          >
            {/* Laptop Screen Frame */}
            <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-t-2xl sm:rounded-t-3xl border-[8px] sm:border-[12px] border-slate-900 shadow-2xl shadow-black/80 overflow-hidden rounded-b-lg">
              {/* Web Reel (Moves up on scroll) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[300%]"
                style={{ y: reelY }}
              >
                {screens.map((screen, idx) => (
                  <div key={idx} className="relative w-full h-1/3 overflow-hidden">
                    {screen}
                  </div>
                ))}
              </motion.div>

              {/* Screen Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            </div>

            {/* Laptop Base/Keyboard Deck */}
            <div className="relative w-[108%] -ml-[4%] h-4 sm:h-7 bg-slate-700 rounded-b-2xl rounded-t-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-center border-t border-slate-600">
              {/* Trackpad Indentation */}
              <div className="w-1/4 h-2 sm:h-3 bg-slate-800/80 rounded-b-md mt-0.5 border-t border-slate-900" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Interactive Spec Bar */}
        <div className="relative z-10 w-full max-w-4xl px-2 pb-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>Explore all 8+ Production Architectures</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">100% Code Ownership</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Every system is shipped with zero vendor lock-in, source code repositories, and ACID guarantees.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                to="/work"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={WA("Hi Prajyot Infotech, I was inspecting your portfolio architecture on the website and want to consult on building a custom platform.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consult on WhatsApp"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
