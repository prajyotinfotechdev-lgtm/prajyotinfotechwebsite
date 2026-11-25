import React, { useState } from "react";
import {
  X,
  Zap,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  FileText,
  Cpu,
  MapPin,
  Flame,
  Inbox,
} from "lucide-react";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// ─── SIMULATOR: RESTAURANT QR & KDS ──────────────────────────────────────────
export function RestaurantSimulator() {
  const [cart, setCart] = useState([
    { id: 1, name: "Paneer Butter Masala", price: 280, qty: 1 },
    { id: 2, name: "Butter Garlic Naan", price: 60, qty: 2 },
  ]);
  const [tableNum, setTableNum] = useState("04");
  const [orderStatus, setOrderStatus] = useState("idle"); // idle | placed | preparing | ready
  const [kdsLogs, setKdsLogs] = useState([
    { id: "T-02", item: "Chicken Biryani x2", time: "2 min ago", status: "Cooking" },
    { id: "T-09", item: "Cold Coffee x1", time: "Just now", status: "Ready" },
  ]);

  const menuItems = [
    { id: 1, name: "Paneer Butter Masala", price: 280, category: "Mains" },
    { id: 2, name: "Butter Garlic Naan", price: 60, category: "Breads" },
    { id: 3, name: "Dal Makhani Deluxe", price: 240, category: "Mains" },
    { id: 4, name: "Hyderabadi Dum Biryani", price: 320, category: "Rice" },
    { id: 5, name: "Artisanal Mango Shake", price: 140, category: "Drinks" },
  ];

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setOrderStatus("placed");
    const newKds = {
      id: `T-${tableNum}`,
      item: cart.map((c) => `${c.name} (x${c.qty})`).join(", "),
      time: "Just now",
      status: "Received",
    };
    setKdsLogs([newKds, ...kdsLogs]);

    setTimeout(() => setOrderStatus("preparing"), 1500);
    setTimeout(() => setOrderStatus("ready"), 4500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
      {/* Left: Customer Mobile QR View */}
      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-slate-200">Table QR Guest View</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              <span>Table:</span>
              <select
                value={tableNum}
                onChange={(e) => setTableNum(e.target.value)}
                aria-label="Table number"
                className="bg-transparent font-bold text-orange-400 focus:outline-none"
              >
                <option value="04">Table #04 (Window)</option>
                <option value="07">Table #07 (Patio)</option>
                <option value="12">Table #12 (AC Hall)</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Tap to add to live order:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/50 text-left transition group cursor-pointer min-h-[44px]"
                >
                  <div>
                    <p className="font-semibold text-slate-200 group-hover:text-orange-400 transition">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">₹{item.price}</p>
                  </div>
                  <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold group-hover:bg-orange-500 group-hover:text-white transition shrink-0">
                    +
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Cart in Mobile Frame */}
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 mt-2">
          <div className="flex items-center justify-between font-bold text-slate-300 mb-2">
            <span>Current Table Bill</span>
            <span className="text-orange-400 font-extrabold text-sm">₹{total}</span>
          </div>

          {cart.length === 0 ? (
            <p className="text-slate-500 text-center py-2">Cart is empty. Tap items above!</p>
          ) : (
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-slate-300">
                  <span>{c.name} × {c.qty}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">₹{c.price * c.qty}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(c.id)}
                      aria-label={`Remove ${c.name} from cart`}
                      className="text-red-400 hover:text-red-300 cursor-pointer p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
            <span className="text-[10px] text-slate-400">Incl. 5% GST (₹{gst})</span>
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0 || orderStatus === "placed"}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg shadow-orange-500/20 disabled:opacity-50 transition cursor-pointer flex items-center gap-1.5 min-h-[38px]"
            >
              <Zap className="w-3.5 h-3.5" />
              {orderStatus === "placed" ? "Sending to Kitchen..." : "Punch Order to KDS"}
            </button>
          </div>
        </div>
      </div>

      {/* Right: Kitchen Display Screen (KDS) Simulation */}
      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono font-bold text-[10px]">
                CHEF STATION KDS
              </span>
              <span className="font-bold text-slate-200">Live Kitchen Terminal</span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              WebSocket Active
            </span>
          </div>

          {orderStatus !== "idle" && (
            <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-orange-500/20 via-red-500/10 to-transparent border border-orange-500/40 hero-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                <span className="font-bold text-orange-300">Live Ticket: Table #{tableNum}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                    orderStatus === "ready"
                      ? "bg-emerald-500/30 text-emerald-300"
                      : orderStatus === "preparing"
                      ? "bg-amber-500/30 text-amber-300"
                      : "bg-blue-500/30 text-blue-300"
                  }`}
                >
                  {orderStatus === "ready" ? (
                    <><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Food Ready for Dispatch</>
                  ) : orderStatus === "preparing" ? (
                    <><Flame className="w-3 h-3 text-amber-400" /> Cooking on Stove 3</>
                  ) : (
                    <><Inbox className="w-3 h-3 text-blue-400" /> Ticket Received</>
                  )}
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                WhatsApp receipt auto-dispatched to customer phone with tracking link.
              </p>
            </div>
          )}

          <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Active Chef Queue (Auto-Syncs with POS):
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {kdsLogs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-orange-400">{log.id}</span>
                    <span className="text-slate-200 font-medium">{log.item}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{log.time}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] shrink-0">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mt-3 text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Table Turnover Speed: <strong className="text-slate-200">+35% Faster</strong>
          </span>
          <span>Zero paper tickets lost</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: MOBILE SHOP POS & IMEI BILLING ──────────────────────────────
export function MobileShopSimulator() {
  const [imei, setImei] = useState("864920058392019");
  const [model, setModel] = useState("iPhone 15 Pro 128GB - Natural Titanium");
  const [price, setPrice] = useState(129900);
  const [customer, setCustomer] = useState("Rahul Deshmukh");
  const [phone, setPhone] = useState("+91 98230 45821");
  const [invoiceReady, setInvoiceReady] = useState(false);

  const sampleDevices = [
    { imei: "864920058392019", model: "iPhone 15 Pro 128GB - Natural Titanium", price: 129900 },
    { imei: "354019284729104", model: "Samsung Galaxy S24 Ultra 256GB - Titanium Gray", price: 119999 },
    { imei: "869103829471920", model: "OnePlus 12 512GB - Silky Black", price: 64999 },
  ];

  const handleSelectDevice = (dev) => {
    setImei(dev.imei);
    setModel(dev.model);
    setPrice(dev.price);
    setInvoiceReady(false);
  };

  const gst18 = Math.round(price * 0.18);
  const totalAmount = price + gst18;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Quick IMEI POS Billing Console
          </span>
          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[10px] font-mono">
            GST Tax Ready
          </span>
        </div>

        <div>
          <p className="text-[11px] text-slate-400 mb-1.5">Scan or Click Demo Inventory Unit:</p>
          <div className="grid grid-cols-1 gap-1.5">
            {sampleDevices.map((dev) => (
              <button
                key={dev.imei}
                type="button"
                onClick={() => handleSelectDevice(dev)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-left border transition cursor-pointer min-h-[44px] ${
                  imei === dev.imei
                    ? "bg-indigo-950/60 border-indigo-500 text-white"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <div>
                  <p className="font-medium text-[11px]">{dev.model}</p>
                  <p className="text-[10px] font-mono text-slate-400">IMEI: {dev.imei}</p>
                </div>
                <span className="font-bold text-indigo-300 shrink-0 ml-2">₹{dev.price.toLocaleString("en-IN")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Customer Name</label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Customer Mobile</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setInvoiceReady(true)}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
        >
          <FileText className="w-4 h-4" />
          Generate Instant GST Tax Invoice &amp; WhatsApp PDF
        </button>
      </div>

      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              Simulated GST Tax Invoice
            </span>
            <span className="text-[10px] text-slate-400 font-mono">INV-2026-08492</span>
          </div>

          <div className="bg-white text-slate-900 rounded-xl p-4 shadow-inner text-[11px] font-sans">
            <div className="flex justify-between items-start border-b border-slate-200 pb-2">
              <div>
                <h4 className="font-black text-sm tracking-tight text-slate-950">SHREE SAMARTH MOBILES</h4>
                <p className="text-[10px] text-slate-500">GSTIN: 27AABCS1429K1Z4</p>
                <p className="text-[10px] text-slate-500">FC Road, Shivajinagar, Pune - 411005</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded text-[9px] font-bold">
                  ORIGINAL FOR RECIPIENT
                </span>
                <p className="text-[10px] text-slate-500 mt-1">Date: Live Demo</p>
              </div>
            </div>

            <div className="my-2 py-1 border-b border-slate-200 flex justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-500">Billed To:</span>
                <p className="font-bold text-slate-900">{customer}</p>
                <p className="text-slate-600 text-[10px]">{phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500">IMEI Serial No:</span>
                <p className="font-mono font-bold text-indigo-700">{imei}</p>
                <p className="text-[9px] text-emerald-600 font-bold">1 Year Brand Warranty</p>
              </div>
            </div>

            <div className="space-y-1 my-2">
              <div className="flex justify-between text-slate-700 gap-2">
                <span>{model}</span>
                <span className="font-mono shrink-0">₹{price.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>CGST (9%) + SGST (9%)</span>
                <span className="font-mono">₹{gst18.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-slate-950 text-sm">
                <span>Net Payable:</span>
                <span className="text-indigo-600">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {invoiceReady && (
              <div className="mt-2 p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 text-[10px] flex items-center justify-between gap-2 hero-fade-in">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  WhatsApp PDF automatically delivered to {phone}
                </span>
                <span className="font-bold shrink-0">Sent via API</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 text-slate-400 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Billing Time: <strong className="text-slate-200">Cut from 10m to 45s</strong>
          </span>
          <span className="text-emerald-400 font-bold">0% Inventory Discrepancy</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: SAGYA LUXURY BRIDAL & ETHNIC COUTURE ──────────────────────
export function SagyaSimulator() {
  const [activeCategory, setActiveCategory] = useState("Lehengas");
  const [savedCount, setSavedCount] = useState(2);

  const products = [
    {
      id: "blush-peach-lehenga",
      name: "Blush Peach Heavy Stone-Work Bridal Lehenga",
      category: "Lehengas",
      price: 48500,
      badge: "Bridal 2026",
      fabric: "Pure Raw Silk & Net Dupatta",
      work: "Zardozi, Resham & Cutdana Hand Embroidery",
    },
    {
      id: "ivory-rani-lehenga",
      name: "Ivory Embroidered Lehenga with Rani Pink Dupatta",
      category: "Lehengas",
      price: 36900,
      badge: "Best Seller",
      fabric: "Pure Georgette with Banarasi Weave",
      work: "Tilla & Foil Mirror Embellishments",
    },
    {
      id: "burnt-orange-set",
      name: "Burnt Orange Gold-Embroidered Lehenga Choli Set",
      category: "Lehengas",
      price: 42000,
      badge: "Royal Edit",
      fabric: "Velvet Silk & Organza Dupatta",
      work: "Gold Thread Pita Work & Sequin Border",
    },
    {
      id: "ivory-paisley-blouse",
      name: "Ivory Multicolour Paisley Designer Blouse",
      category: "Blouses",
      price: 6800,
      badge: "Handcrafted",
      fabric: "Raw Silk with Cotton Lining",
      work: "Multicolour Thread Work with Pearl Latkan",
    },
    {
      id: "black-gold-banarasi",
      name: "Black & Gold Banarasi Brocade Designer Blouse",
      category: "Blouses",
      price: 5400,
      badge: "Heritage",
      fabric: "Pure Banarasi Katan Silk",
      work: "Woven Antique Zari Floral Motifs",
    },
    {
      id: "mirror-dandiya-set",
      name: "Multicolour Mirror Work Dandiya Chaniya Choli",
      category: "Festive",
      price: 18500,
      badge: "Navratri Edit",
      fabric: "Cotton Silk with 12m Gher Flared Skirt",
      work: "Authentic Kutch Real Glass Mirror & Gamthi",
    },
  ];

  const categories = ["All", "Lehengas", "Blouses", "Festive"];
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src="/images/sagya-logo.jpg"
            alt="SAGYA Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-serif tracking-widest text-amber-300 font-bold text-sm">SAGYA HAUTE COUTURE</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-mono">
                Flagship Boutique • Latur
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Curated luxury Indian occasionwear • Custom bridal draping &amp; styling
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://www.sagya.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open www.sagya.in</span>
          </a>
          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Saved ({savedCount})</span>
          </span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-1.5 rounded-xl font-bold transition cursor-pointer text-xs shrink-0 ${
              activeCategory === c
                ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  {item.badge}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Bespoke Available</span>
              </div>

              <h4 className="font-bold text-slate-200 text-sm mb-1.5 group-hover:text-amber-300 transition-colors">
                {item.name}
              </h4>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-3 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-amber-300">₹{item.price.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Free Insured Courier</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  <span className="text-slate-500">Fabric:</span> {item.fabric}
                </div>
                <div className="text-[10px] text-slate-400">
                  <span className="text-slate-500">Craft:</span> {item.work}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSavedCount((c) => c + 1)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2 rounded-xl transition cursor-pointer text-xs"
              >
                ♥ Save to Bridal Trousseau
              </button>
              <a
                href={WA(`Hi Sagya Team, I love the "${item.name}" (₹${item.price.toLocaleString("en-IN")}) from your website www.sagya.in. I would like to consult with a bridal stylist for custom sizing & delivery.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Chat with SAGYA Stylist on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-300 text-xs">
            <strong>SAGYA Heritage Studio:</strong> Arya Complex, Behind Shoppers Stop, Ganjgolai, Latur 413512
          </span>
        </div>
        <a
          href="https://maps.app.goo.gl/nEkAnxrAiTVtVWRT8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 font-mono text-[11px] underline flex items-center gap-1"
        >
          View Studio on Google Maps
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

