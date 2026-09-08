import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  Layers,
  TrendingUp,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Clock,
  Printer,
  FileText,
  Server,
  Database,
  Cpu,
  RefreshCw,
  Plus,
  Trash2,
  Check,
  Truck,
  GraduationCap,
  Building2,
  Users,
  MapPin,
  CreditCard,
  AlertCircle,
  Send,
} from "lucide-react";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// ─── SIMULATOR: RESTAURANT QR & KDS ──────────────────────────────────────────
function RestaurantSimulator() {
  const [cart, setCart] = useState([
    { id: 1, name: "Paneer Butter Masala", price: 280, qty: 1 },
    { id: 2, name: "Butter Garlic Naan", price: 60, qty: 2 },
  ]);
  const [tableNum, setTableNum] = useState("04");
  const [orderStatus, setOrderStatus] = useState("idle"); // idle | placed | preparing | ready
  const [kdsLogs, setKdsLogs] = useState([
    { id: "T-02", item: "Chicken Biryani x2", time: "2 min ago", status: "Cooking" },
    { id: "T-09", item: "Cold Coffee x1", time: "Just now", status: "Ready" }
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
      status: "Received"
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
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
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
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-orange-500/50 text-left transition group cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-slate-200 group-hover:text-orange-400 transition">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">₹{item.price}</p>
                  </div>
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold group-hover:bg-orange-500 group-hover:text-white transition">
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
                      onClick={() => removeFromCart(c.id)}
                      aria-label={`Remove ${c.name} from cart`}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Incl. 5% GST (₹{gst})</span>
            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0 || orderStatus === "placed"}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-4 py-1.5 rounded-lg shadow-lg shadow-orange-500/20 disabled:opacity-50 transition cursor-pointer flex items-center gap-1.5"
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
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
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

          {/* Current Order Status Banner */}
          {orderStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-3 p-3 rounded-xl bg-gradient-to-r from-orange-500/20 via-red-500/10 to-transparent border border-orange-500/40"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-orange-300">Live Ticket: Table #{tableNum}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  orderStatus === "ready"
                    ? "bg-emerald-500/30 text-emerald-300"
                    : orderStatus === "preparing"
                    ? "bg-amber-500/30 text-amber-300"
                    : "bg-blue-500/30 text-blue-300"
                }`}>
                  {orderStatus === "ready" ? "✓ Food Ready for Dispatch" : orderStatus === "preparing" ? "🔥 Cooking on Stove 3" : "📥 Ticket Received"}
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                WhatsApp receipt auto-dispatched to customer phone with tracking link.
              </p>
            </motion.div>
          )}

          {/* Real-time Ticket Queue */}
          <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Active Chef Queue (Auto-Syncs with POS):
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {kdsLogs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-orange-400">{log.id}</span>
                    <span className="text-slate-200 font-medium">{log.item}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{log.time}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mt-3 text-slate-400 flex items-center justify-between">
          <span>⚡ Table Turnover Speed: <strong>+35% Faster</strong></span>
          <span>Zero paper tickets lost</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: MOBILE SHOP POS & IMEI BILLING ──────────────────────────────
function MobileShopSimulator() {
  const [imei, setImei] = useState("864920058392019");
  const [model, setModel] = useState("iPhone 15 Pro 128GB - Natural Titanium");
  const [price, setPrice] = useState(129900);
  const [customer, setCustomer] = useState("Rahul Deshmukh");
  const [phone, setPhone] = useState("+91 98230 45821");
  const [invoiceReady, setInvoiceReady] = useState(false);

  const sampleDevices = [
    { imei: "864920058392019", model: "iPhone 15 Pro 128GB - Natural Titanium", price: 129900 },
    { imei: "354019284729104", model: "Samsung Galaxy S24 Ultra 256GB - Titanium Gray", price: 119999 },
    { imei: "869103829471920", model: "OnePlus 12 516GB - Silky Black", price: 64999 },
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
      {/* Left Form */}
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
                onClick={() => handleSelectDevice(dev)}
                className={`flex items-center justify-between p-2 rounded-xl text-left border transition cursor-pointer ${
                  imei === dev.imei
                    ? "bg-indigo-950/60 border-indigo-500 text-white"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <div>
                  <p className="font-medium text-[11px]">{dev.model}</p>
                  <p className="text-[10px] font-mono text-slate-400">IMEI: {dev.imei}</p>
                </div>
                <span className="font-bold text-indigo-300">₹{dev.price.toLocaleString("en-IN")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Customer Name</label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Customer Mobile</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => setInvoiceReady(true)}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Generate Instant GST Tax Invoice & WhatsApp PDF
        </button>
      </div>

      {/* Right: Live Simulated PDF Invoice */}
      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              Simulated GST Tax Invoice
            </span>
            <span className="text-[10px] text-slate-400 font-mono">INV-2025-08492</span>
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
                <p className="text-[10px] text-slate-500 mt-1">Date: 07-Sep-2025</p>
              </div>
            </div>

            <div className="my-2 py-1 border-b border-slate-200 flex justify-between">
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
              <div className="flex justify-between text-slate-700">
                <span>{model}</span>
                <span className="font-mono">₹{price.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>IGST (18%)</span>
                <span className="font-mono">₹{gst18.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-slate-950 text-sm">
                <span>Net Payable:</span>
                <span className="text-indigo-600">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {invoiceReady && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 text-[10px] flex items-center justify-between"
              >
                <span>✓ WhatsApp PDF automatically delivered to {phone}</span>
                <span className="font-bold">Sent via API</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-3 text-slate-400 flex items-center justify-between text-[11px]">
          <span>⚡ Billing Time: <strong>Cut from 10m to 45s</strong></span>
          <span className="text-emerald-400 font-bold">0% Inventory Discrepancy</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: JOLLYBABA E-COMMERCE B2B / B2C ──────────────────────────────
function EcommerceSimulator() {
  const [role, setRole] = useState("b2b"); // b2c | b2b
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(3);

  const products = [
    { id: 1, name: "SuperFast 65W GaN Fast Charger", retail: 1899, b2b: 920, moq: 10, stock: "In Stock (500+)" },
    { id: 2, name: "Braided 2M USB-C to Lightning Cable", retail: 699, b2b: 195, moq: 25, stock: "In Stock (1200+)" },
    { id: 3, name: "Curved 9H Tempered Glass for iPhone", retail: 499, b2b: 65, moq: 50, stock: "In Stock (3000+)" },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 text-xs">
      {/* Controls Bar */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200">Interactive Role Switcher:</span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setRole("b2c")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                role === "b2c"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Consumer (B2C)
            </button>
            <button
              onClick={() => setRole("b2b")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                role === "b2b"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Wholesale Dealer (B2B VIP)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Try typing 'charger' or 'cable'..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-48 sm:w-64 focus:outline-none focus:border-emerald-500"
          />
          <div className="relative">
            <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300 font-bold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart ({cartCount})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Live Storefront Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-emerald-400">{item.stock}</span>
                {role === "b2b" && (
                  <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    MOQ: {item.moq} Units
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-200 text-sm mb-2">{item.name}</h4>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-3">
                {role === "b2b" ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-indigo-400">₹{item.b2b}</span>
                      <span className="line-through text-slate-500 text-xs">₹{item.retail}</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                      Save ₹{item.retail - item.b2b} per unit with Dealer Pricing
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xl font-black text-slate-200">₹{item.retail}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Standard MRP with Free Delivery</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCartCount((c) => c + 1)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl transition cursor-pointer"
              >
                Add {role === "b2b" ? `${item.moq} Units to Bulk Cart` : "to Cart"}
              </button>
              <a
                href={WA(`Hi JollyBaba, I want to order ${item.name} at ${role === "b2b" ? `Dealer price ₹${item.b2b}` : `₹${item.retail}`}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-[11px] transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp Direct Order Fallback
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SIMULATOR: CLINIC MANAGEMENT SAAS ──────────────────────────────────────
function ClinicSimulator() {
  const [selectedSlot, setSelectedSlot] = useState("10:30 AM");
  const [patient, setPatient] = useState("Anita Kulkarni");
  const [condition, setCondition] = useState("Hypertension & Routine Checkup");
  const [confirmed, setConfirmed] = useState(false);

  const slots = ["09:30 AM", "10:30 AM", "11:15 AM", "04:30 PM", "05:45 PM"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-slate-200">Doctor OPD Calendar Booking</span>
          <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px] font-mono">
            HIPAA Compliant
          </span>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Select Consulting Time Slot</label>
          <div className="flex flex-wrap gap-2">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSlot(s)}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold transition cursor-pointer ${
                  selectedSlot === s
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Patient Full Name</label>
          <input
            type="text"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Diagnosis / Visit Reason</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-rose-500"
          />
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-rose-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          Confirm Slot & Trigger Automated WhatsApp Reminder
        </button>
      </div>

      <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="font-bold text-slate-200">Simulated WhatsApp Reminder Engine</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Meta Cloud API Ready
            </span>
          </div>

          <div className="bg-[#0b141a] p-3 rounded-xl border border-slate-800 text-slate-100 font-sans space-y-2">
            <div className="bg-[#202c33] p-3 rounded-lg max-w-[90%] shadow">
              <p className="text-[11px] font-semibold text-emerald-400 mb-1">
                🏥 Lifeline Multispeciality Clinic
              </p>
              <p className="text-[11px] leading-relaxed">
                Dear <strong>{patient}</strong>, your appointment with <strong>Dr. S. Kulkarni (MD Med)</strong> is scheduled for today at <strong className="text-amber-400">{selectedSlot}</strong>.
              </p>
              <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>Token #14 • Room 204</span>
                <span className="text-emerald-400">✓✓ Delivered</span>
              </div>
            </div>

            {confirmed && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#202c33] p-2.5 rounded-lg max-w-[90%] border-l-4 border-emerald-500"
              >
                <p className="text-[10px] text-slate-300">
                  🔔 2-hour pre-appointment reminder auto-scheduled in queue.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-3 text-slate-400 flex items-center justify-between text-[11px]">
          <span>⚡ Patient No-Shows: <strong>Reduced by 40%</strong></span>
          <span className="text-rose-400 font-bold">Paperless Prescriptions</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: VYAPAARIYO MULTI-TENANT B2B SAAS ─────────────────────────────
function SaasSimulator() {
  const [tenant, setTenant] = useState("apex"); // apex | zenith | organics

  const tenants = {
    apex: {
      name: "Apex Hardware Distributors",
      subdomain: "apex-industrial.vyapaariyo.com",
      accent: "#f59e0b",
      theme: "from-amber-500/20 to-orange-500/10",
      stats: { products: 1420, ordersToday: 48, revenue: "12.4k Units" },
      catalog: ["Angle Grinder 850W", "Heavy Duty Drill 13mm", "Galvanized Bolts 100pk"]
    },
    zenith: {
      name: "Zenith Fabrics & Textiles",
      subdomain: "zenith-textiles.vyapaariyo.com",
      accent: "#8b5cf6",
      theme: "from-violet-500/20 to-purple-500/10",
      stats: { products: 890, ordersToday: 62, revenue: "18.2k Units" },
      catalog: ["Mulberry Silk 60GSM", "Egyptian Cotton Yarn", "Linen Weave 40s"]
    },
    organics: {
      name: "Sahyadri Organics Supply",
      subdomain: "sahyadri-farms.vyapaariyo.com",
      accent: "#10b981",
      theme: "from-emerald-500/20 to-teal-500/10",
      stats: { products: 310, ordersToday: 89, revenue: "8.5k Units" },
      catalog: ["Alphonso Pulp Drum 20kg", "A2 Gir Cow Ghee 5L", "Organic Turmeric Bulk"]
    }
  };

  const active = tenants[tenant];

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200">Switch Live SaaS Tenant:</span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTenant("apex")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                tenant === "apex" ? "bg-amber-500 text-slate-950 font-black shadow" : "text-slate-400"
              }`}
            >
              Apex Hardware
            </button>
            <button
              onClick={() => setTenant("zenith")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                tenant === "zenith" ? "bg-violet-600 text-white font-black shadow" : "text-slate-400"
              }`}
            >
              Zenith Textiles
            </button>
            <button
              onClick={() => setTenant("organics")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                tenant === "organics" ? "bg-emerald-600 text-white font-black shadow" : "text-slate-400"
              }`}
            >
              Sahyadri Organics
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          <span>Tenant Isolated DB:</span>
          <strong className="text-violet-400">tenant_{tenant}_prod</strong>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tenant}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className={`bg-gradient-to-br ${active.theme} bg-slate-900/95 rounded-2xl p-5 border border-slate-700/80 shadow-2xl space-y-4`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Multi-Tenant Storefront Active
              </span>
              <h4 className="text-base font-black text-white">{active.name}</h4>
              <p className="text-[11px] font-mono text-brand-300">https://{active.subdomain}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Catalog SKUs</span>
                <p className="font-bold text-white text-sm">{active.stats.products}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Orders Today</span>
                <p className="font-bold text-white text-sm">{active.stats.ordersToday}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Volume</span>
                <p className="font-bold text-emerald-400 text-sm">{active.stats.revenue}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-slate-300 mb-2">
              Isolated Catalog Items Sample:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {active.catalog.map((c, i) => (
                <div key={i} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="font-medium text-slate-200">{c}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    SKU-{100 + i * 27}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── SIMULATOR: WHOLESALE DISTRIBUTION & LOGISTICS ERP ───────────────────────
function WholesaleSimulator() {
  const [warehouse, setWarehouse] = useState("pune");
  const [party] = useState("Shree Ganesh Supermarket (GSTIN: 27AABCS1429B1Z8)");
  const [items, setItems] = useState([
    { id: 1, name: "Fortune Refined Oil (15L Tin)", rate: 1420, qty: 25, stock: 340 },
    { id: 2, name: "Kohinoor Basmati Super (25kg Bag)", rate: 2150, qty: 15, stock: 180 },
    { id: 3, name: "Tata Iodized Salt (50kg Case)", rate: 820, qty: 30, stock: 520 },
  ]);
  const [dispatched, setDispatched] = useState(false);

  const warehouses = {
    pune: { name: "Pune Central Hub (Wh-01)", capacity: "84% Loaded", vehicle: "MH-12-RN-8821", driver: "Ramesh Pawar (+91 98234 11204)" },
    nagpur: { name: "Nagpur Logistics Depot (Wh-04)", capacity: "62% Loaded", vehicle: "MH-31-CB-4019", driver: "Satish More (+91 94220 55192)" },
    mumbai: { name: "Bhiwandi Superhub (Wh-09)", capacity: "91% Loaded", vehicle: "MH-04-AZ-9932", driver: "Imran Khan (+91 98210 88310)" },
  };

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.rate * curr.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const ewayRequired = total > 50000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs font-sans">
      {/* Left: ERP Dispatch Console */}
      <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-200">Wholesale B2B Dispatch & Ledger ERP</span>
          </div>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono">
            Multi-Warehouse Sync
          </span>
        </div>

        {/* Warehouse Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.entries(warehouses).map(([key, wh]) => (
            <button
              key={key}
              onClick={() => setWarehouse(key)}
              className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                warehouse === key
                  ? "bg-amber-500/10 border-amber-500/80 text-white shadow-md shadow-amber-500/10"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="text-[10px] font-mono text-amber-400 font-bold">{wh.name}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Fleet: {wh.vehicle}</div>
            </button>
          ))}
        </div>

        {/* Retailer Party Header */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">BILL TO RETAIL PARTY:</span>
            <span className="font-bold text-slate-200 text-xs">{party}</span>
          </div>
          <div className="flex gap-3 text-[11px] font-mono">
            <div>
              <span className="text-slate-500 block text-[9px]">CREDIT LIMIT</span>
              <span className="text-slate-300 font-bold">₹5,00,000</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">OUTSTANDING</span>
              <span className="text-emerald-400 font-bold">₹1,85,000</span>
            </div>
          </div>
        </div>

        {/* Wholesale Order Table */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
            Active Consignment Items ({items.reduce((a, b) => a + b.qty, 0)} Units):
          </span>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-slate-200 text-xs">{item.name}</p>
                  <p className="text-[10px] font-mono text-slate-400">
                    Rate: ₹{item.rate.toLocaleString()} / Unit • Stock: {item.stock} Avail
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700">
                    <button
                      onClick={() => updateQty(item.id, -5)}
                      className="px-2 py-1 text-slate-300 hover:text-white font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 font-mono font-bold text-amber-400 text-xs">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 5)}
                      className="px-2 py-1 text-slate-300 hover:text-white font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right min-w-[70px]">
                    <span className="font-bold text-white text-xs">
                      ₹{(item.rate * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="text-[11px] font-mono">
            <span className="text-slate-400">GST (5%): ₹{gst.toLocaleString()}</span>
            <span className="text-slate-600 mx-2">•</span>
            {ewayRequired ? (
              <span className="text-emerald-400 font-bold">Auto e-Way Bill Active</span>
            ) : (
              <span className="text-slate-400">Below e-Way Threshold</span>
            )}
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">TOTAL INVOICE VALUE</span>
            <span className="text-base font-black text-amber-400 font-mono">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => setDispatched(true)}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          Generate Verified e-Way Bill & Dispatch Vehicle
        </button>
      </div>

      {/* Right: Live Truck Route & Simulated WhatsApp Confirmation */}
      <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="font-bold text-slate-200">Dispatch Logistics & Fleet Sync</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Telematics
            </span>
          </div>

          <div className="bg-[#0b141a] p-3.5 rounded-xl border border-slate-800 space-y-2.5">
            {/* Live Dispatch Badge */}
            <div className="bg-[#202c33] p-3 rounded-lg border-l-4 border-amber-500 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
                <span>CONSIGNMENT #WD-8429</span>
                <span>STATUS: {dispatched ? "IN TRANSIT" : "READY TO LOAD"}</span>
              </div>
              <p className="text-xs text-white font-semibold">
                Vehicle: {warehouses[warehouse].vehicle} (14ft Eicher)
              </p>
              <p className="text-[10px] text-slate-300">
                Driver: {warehouses[warehouse].driver}
              </p>
              <p className="text-[10px] text-slate-400">
                Route: {warehouses[warehouse].name} ➔ {party.split(" ")[0]}
              </p>
              <div className="text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-700 flex justify-between">
                <span>e-Way Bill: 2819-4820-9182</span>
                <span className="text-emerald-400">NIC Govt Verified</span>
              </div>
            </div>

            {/* Simulated WhatsApp Notification to Retailer */}
            <div className="bg-[#202c33] p-3 rounded-lg space-y-1.5 shadow">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Retailer WhatsApp Notification
                </span>
                <span>✓✓ Sent</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-200">
                Dear <strong>{party.split(" ")[0]}</strong>, your Wholesale Order <strong>#WD-8429</strong> of <strong>₹{total.toLocaleString()}</strong> has been dispatched from <strong>{warehouses[warehouse].name}</strong>.
              </p>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-700/80 text-[10px] text-slate-300 flex items-center justify-between font-mono">
                <span>📄 Tax_Invoice_eWay_8429.pdf</span>
                <span className="text-cyan-400 font-bold">Download</span>
              </div>
            </div>

            {dispatched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Driver GPS active. Retailer notified with live ETA.</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-slate-400 flex items-center justify-between text-[11px] font-mono">
          <span>⚡ Invoice Gen: <strong>&lt; 25 Sec</strong></span>
          <span className="text-amber-400 font-bold">Zero Ledger Errors</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: EDUPULSE COACHING & STUDENT LMS ─────────────────────────────
function CoachingSimulator() {
  const [batch, setBatch] = useState("jee");
  const [students, setStudents] = useState([
    { id: 1, name: "Aditya Sharma", roll: "01", attendance: "Present", feeDue: 12000 },
    { id: 2, name: "Rhea Deshmukh", roll: "04", attendance: "Present", feeDue: 0 },
    { id: 3, name: "Tanmay Patil", roll: "09", attendance: "Absent", feeDue: 8500 },
    { id: 4, name: "Ananya Joshi", roll: "15", attendance: "Present", feeDue: 15000 },
  ]);
  const [reminderSent, setReminderSent] = useState(false);
  const [paidAditya, setPaidAditya] = useState(false);

  const batches = {
    jee: { name: "JEE Advanced 2026 (Batch Alpha)", timing: "08:00 AM - 12:30 PM", room: "Hall 02" },
    neet: { name: "NEET Medical Super-30 (Batch Beta)", timing: "01:30 PM - 06:00 PM", room: "Hall 05" },
    foundation: { name: "Class 10th Olympiad (Batch Spark)", timing: "04:30 PM - 07:30 PM", room: "Hall 01" },
  };

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, attendance: s.attendance === "Present" ? "Absent" : "Present" }
          : s
      )
    );
  };

  const pendingCount = students.filter((s) => (s.id === 1 && paidAditya ? 0 : s.feeDue > 0)).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs font-sans">
      {/* Left: Academy Admin & Attendance View */}
      <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span className="font-bold text-slate-200">EduPulse Institute Attendance & Fee LMS</span>
          </div>
          <span className="bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded text-[10px] font-mono">
            RFID Synced
          </span>
        </div>

        {/* Batch Selector */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(batches).map(([key, b]) => (
            <button
              key={key}
              onClick={() => setBatch(key)}
              className={`px-3 py-1.5 rounded-xl text-left border transition cursor-pointer ${
                batch === key
                  ? "bg-sky-500/20 border-sky-500/80 text-white font-bold shadow"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="text-[11px]">{b.name}</div>
            </button>
          ))}
        </div>

        {/* Student Roster Table */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
            <span>Student & Roll</span>
            <span>Fee Status</span>
            <span>Live Attendance</span>
          </div>

          <div className="space-y-2">
            {students.map((st) => {
              const effectiveDue = st.id === 1 && paidAditya ? 0 : st.feeDue;
              return (
                <div
                  key={st.id}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-[10px]">
                      {st.roll}
                    </span>
                    <div>
                      <p className="font-bold text-white text-xs">{st.name}</p>
                      <p className="text-[10px] text-slate-400">RFID: 9482-AD-{st.roll}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {effectiveDue > 0 ? (
                      <span className="text-[11px] font-mono text-rose-400 font-bold">
                        ₹{effectiveDue.toLocaleString()} Due
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        ✓ Paid Full
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleAttendance(st.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                      st.attendance === "Present"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                    }`}
                  >
                    {st.attendance === "Present" ? "● Present" : "○ Absent"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setReminderSent(true)}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-sky-500/20 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Dispatch 1-Click WhatsApp UPI Link to {pendingCount} Pending Parents
        </button>
      </div>

      {/* Right: Simulated Parent WhatsApp Screen */}
      <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="font-bold text-slate-200">Parent WhatsApp Notification Feed</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Meta Verified
            </span>
          </div>

          <div className="bg-[#0b141a] p-3.5 rounded-xl border border-slate-800 space-y-2.5">
            {/* RFID Attendance Notification */}
            <div className="bg-[#202c33] p-3 rounded-lg shadow space-y-1">
              <p className="text-[10px] font-bold text-sky-400 flex items-center justify-between">
                <span>🎓 Pioneer Science Academy</span>
                <span className="text-slate-400 font-mono">08:02 AM</span>
              </p>
              <p className="text-[11px] leading-relaxed text-slate-200">
                Dear Parent, your child <strong>Aditya Sharma</strong> scanned in at campus at <strong className="text-amber-400">08:02 AM</strong> for <strong>{batches[batch].name}</strong>.
              </p>
              <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-700/80 flex justify-between">
                <span>Subject: Advanced Mechanics</span>
                <span className="text-emerald-400">✓✓ Delivered</span>
              </div>
            </div>

            {/* Simulated 1-Click UPI Payment Card */}
            {reminderSent && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#202c33] p-3 rounded-lg border-l-4 border-sky-500 space-y-2 shadow"
              >
                <div className="text-[10px] font-bold text-emerald-400 flex items-center justify-between">
                  <span>💳 Term-2 Tuition Fee Due</span>
                  <span>Instant UPI Link</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Installment of <strong>₹12,000</strong> due for <strong>Aditya Sharma</strong>. Pay securely below with zero extra charges:
                </p>

                {paidAditya ? (
                  <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Payment Verified! Receipt #REC-8849 sent to WhatsApp.</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setPaidAditya(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Pay ₹12,000 via UPI (GPay/PhonePe)</span>
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-slate-400 flex items-center justify-between text-[11px] font-mono">
          <span>⚡ Fee Recovery: <strong>100% Timely</strong></span>
          <span className="text-sky-400 font-bold">Zero Phone Calling</span>
        </div>
      </div>
    </div>
  );
}

// ─── SIMULATOR: PRIMESTATE CRM & LUXURY PROPERTY PORTAL ──────────────────────
function RealEstateSimulator() {
  const [propertyKey, setPropertyKey] = useState("skycrest");
  const [leadName, setLeadName] = useState("Vikram Singhania");
  const [contact, setContact] = useState("+91 98220 11223");
  const [stage, setStage] = useState("captured"); // captured | dispatched | assigned | booked
  const [brochureDispatched, setBrochureDispatched] = useState(false);

  const properties = {
    skycrest: {
      name: "The Skycrest Luxury Penthouses",
      location: "Koregaon Park, Pune",
      price: "₹2.85 Cr – ₹4.10 Cr",
      carpet: "2,450 – 3,200 sq.ft",
      status: "Under Construction (RERA Approved)",
      units: "18 Units Remaining",
    },
    emerald: {
      name: "Emerald Valley Smart Villas",
      location: "Baner Hills, Pune",
      price: "₹1.95 Cr – ₹2.80 Cr",
      carpet: "1,980 – 2,400 sq.ft",
      status: "Ready for Possession",
      units: "6 Villas Remaining",
    },
    apextech: {
      name: "Apex Signature Tech Park",
      location: "Phase-1 Hinjawadi",
      price: "₹1.20 Cr – ₹6.50 Cr",
      carpet: "950 – 4,500 sq.ft",
      status: "Pre-Leased Commercial Grade-A",
      units: "12 Offices Remaining",
    },
  };

  const current = properties[propertyKey];

  const handleInquiry = () => {
    setBrochureDispatched(true);
    setStage("dispatched");
    setTimeout(() => setStage("assigned"), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs font-sans">
      {/* Left: Luxury Property Showcase & Lead Ingestion */}
      <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-slate-200">PrimeEstate High-Ticket CRM & Lead Engine</span>
          </div>
          <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded text-[10px] font-mono">
            90-Sec SLA Dispatch
          </span>
        </div>

        {/* Project Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.entries(properties).map(([key, prop]) => (
            <button
              key={key}
              onClick={() => {
                setPropertyKey(key);
                setBrochureDispatched(false);
                setStage("captured");
              }}
              className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                propertyKey === key
                  ? "bg-teal-500/15 border-teal-500 text-white font-bold shadow"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="text-[11px] font-bold text-teal-300 leading-tight">{prop.name}</div>
              <div className="text-[9px] text-slate-400 mt-1">{prop.location}</div>
            </button>
          ))}
        </div>

        {/* Property Highlights Card */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm">{current.name}</span>
            <span className="text-emerald-400 font-mono font-black text-sm">{current.price}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
            <div>
              <span className="text-slate-500 block text-[9px]">CARPET AREA</span>
              <span>{current.carpet}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">INVENTORY STATUS</span>
              <span className="text-amber-400">{current.units}</span>
            </div>
          </div>
        </div>

        {/* Simulated Lead Inquiry Form */}
        <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <span className="text-[10px] font-mono text-teal-400 font-bold block uppercase tracking-wider">
            Simulate VIP Buyer Inquiry:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Buyer Full Name</label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">WhatsApp Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleInquiry}
          className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Capture Lead & Trigger Automated 90-Sec WhatsApp Brochure Delivery
        </button>
      </div>

      {/* Right: CRM Sales Pipeline & Simulated WhatsApp Screen */}
      <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 shadow-xl flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="font-bold text-slate-200">CRM Deal Pipeline & Auto-Dispatch</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Realtime Webhook
            </span>
          </div>

          {/* Pipeline Tracker */}
          <div className="grid grid-cols-4 gap-1 text-[9px] font-mono mb-3 text-center">
            <div className="p-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              1. Captured
            </div>
            <div
              className={`p-1 rounded font-bold border ${
                stage === "dispatched" || stage === "assigned" || stage === "booked"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}
            >
              2. Brochure
            </div>
            <div
              className={`p-1 rounded font-bold border ${
                stage === "assigned" || stage === "booked"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}
            >
              3. Agent Call
            </div>
            <div
              className={`p-1 rounded font-bold border ${
                stage === "booked"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}
            >
              4. Site Visit
            </div>
          </div>

          {/* Simulated WhatsApp Phone View */}
          <div className="bg-[#0b141a] p-3.5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="bg-[#202c33] p-3 rounded-lg shadow space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-teal-400 font-bold">
                <span>🏢 Apex Realty VIP Concierge</span>
                <span className="text-slate-400 font-mono">Just Now</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-200">
                Dear <strong>{leadName}</strong>, thank you for inquiring about <strong>{current.name}</strong>!
              </p>
              <div className="p-2 rounded bg-slate-900/90 border border-slate-700/80 text-[10px] text-slate-200 flex items-center justify-between font-mono">
                <span className="truncate">📄 {current.name.replace(/ /g, "_")}_Brochure.pdf</span>
                <span className="text-emerald-400 font-bold shrink-0 ml-1">4.2 MB</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Assigned Senior Consultant <strong>Rajesh Mehta</strong> is reviewing your slot.
              </p>
            </div>

            {brochureDispatched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#202c33] p-2.5 rounded-lg border-l-4 border-emerald-500 space-y-2 shadow"
              >
                <p className="text-[10px] text-slate-300">
                  Ready for private site walkthrough? Confirm your preferred timing:
                </p>
                {stage === "booked" ? (
                  <div className="text-[10px] text-emerald-300 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VIP Site Walkthrough Booked: Saturday 11:00 AM!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setStage("booked")}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-1.5 rounded-lg text-[11px] transition cursor-pointer"
                  >
                    Confirm Private VIP Site Walkthrough (Saturday 11:00 AM)
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-slate-400 flex items-center justify-between text-[11px] font-mono">
          <span>⚡ First Contact SLA: <strong>&lt; 90 Seconds</strong></span>
          <span className="text-teal-400 font-bold">+25% Site Visits</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN MODAL EXPORT ───────────────────────────────────────────────────────
export default function PortfolioDemoModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("simulator"); // simulator | architecture | impact

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        {/* Deep Backdrop */}
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity" />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar / Chrome Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="h-4 w-px bg-slate-800" />
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Interactive Enterprise Showcase
                </span>
                <h2 className="text-base sm:text-lg font-black text-white leading-none mt-0.5">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${project.tagColor} px-3 py-1 text-[11px] font-bold text-white shadow-sm`}>
                {project.tag}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs shrink-0 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("simulator")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  activeTab === "simulator"
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Live Interactive Simulator
              </button>
              <button
                onClick={() => setActiveTab("casestudy")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  activeTab === "casestudy"
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-brand-300" />
                Problem vs Solution Case Study
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  activeTab === "architecture"
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                System Architecture & Stack
              </button>
              <button
                onClick={() => setActiveTab("impact")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                  activeTab === "impact"
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Business Impact & ROI
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span>Production Version:</span>
              <strong className="text-slate-200 font-mono">v3.4.2</strong>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === "simulator" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <p className="text-xs text-slate-300">
                    💡 <strong>Test-Drive Live:</strong> Interact with the buttons, sliders, and inputs below to experience how this application operates in production.
                  </p>
                  <span className="text-[10px] text-brand-400 font-mono shrink-0 ml-2">
                    Realtime Virtual Environment
                  </span>
                </div>

                {project.id === "restaurant-management" && <RestaurantSimulator />}
                {project.id === "mobile-shop-management" && <MobileShopSimulator />}
                {project.id === "jollybaba-ecommerce" && <EcommerceSimulator />}
                {project.id === "clinic-management" && <ClinicSimulator />}
                {project.id === "vyapaariyo-saas" && <SaasSimulator />}
                {project.id === "wholesale-order-management" && <WholesaleSimulator />}
                {project.id === "coaching-management" && <CoachingSimulator />}
                {project.id === "real-estate-crm" && <RealEstateSimulator />}
                {/* Fallback based on project category or default */}
                {!["restaurant-management", "mobile-shop-management", "jollybaba-ecommerce", "clinic-management", "vyapaariyo-saas", "wholesale-order-management", "coaching-management", "real-estate-crm"].includes(project.id) && (
                  project.tag === "Wholesale" ? <WholesaleSimulator /> :
                  project.tag === "Education" ? <CoachingSimulator /> :
                  project.tag === "Real Estate" ? <RealEstateSimulator /> :
                  project.tag === "Healthcare" ? <ClinicSimulator /> :
                  project.tag === "Retail" ? <MobileShopSimulator /> :
                  project.tag === "E-Commerce" ? <EcommerceSimulator /> :
                  project.tag === "SaaS" ? <SaasSimulator /> :
                  <RestaurantSimulator />
                )}
              </motion.div>
            )}

            {activeTab === "casestudy" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-xs text-slate-300"
              >
                {/* Client Profile & Project Meta */}
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Enterprise Client</span>
                    <h3 className="text-base font-black text-white">{project.client}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{project.scale}</p>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-right">
                      <span className="text-[10px] text-slate-500 uppercase block">Delivery Duration</span>
                      <strong className="text-white font-mono text-xs">3.5 Weeks</strong>
                    </div>
                    <div className="bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-right">
                      <span className="text-[10px] text-slate-500 uppercase block">IP Handover</span>
                      <strong className="text-emerald-400 font-mono text-xs">100% Client Owned</strong>
                    </div>
                  </div>
                </div>

                {/* The 3-Pillar Breakdown: Problem -> Solution -> Business Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pillar 1: The Business Challenge / Pain Point */}
                  <div className="bg-slate-950/90 rounded-2xl p-5 border border-red-500/30 shadow-lg space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      1. The Business Bottleneck
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      {project.problem?.title || "Manual Delays & Discrepancies"}
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {project.problem?.description || project.shortDesc}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-red-400/90 font-semibold block mb-1">Impact Before Prajyot Infotech:</span>
                      <p className="text-slate-400 text-[11px] italic">
                        "{project.problem?.painQuote || "High operational friction and delayed customer checkouts."}"
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2: Engineered Solution */}
                  <div className="bg-slate-950/90 rounded-2xl p-5 border border-indigo-500/30 shadow-lg space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      2. Our Custom Architecture
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      {project.solution?.title || "Bespoke Full-Stack Deployment"}
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {project.solution?.description || project.fullDesc}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold block mb-1">Architecture Archetype:</span>
                      <span className="text-slate-200 text-[11px] font-medium block">
                        {project.architecture}
                      </span>
                    </div>
                  </div>

                  {/* Pillar 3: Measured ROI */}
                  <div className="bg-slate-950/90 rounded-2xl p-5 border border-emerald-500/30 shadow-lg space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      3. Quantifiable ROI Delivered
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      {project.roi?.title || "Measurable Efficiency Gains"}
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {project.roi?.description || "Significant operational acceleration with zero runtime error rates."}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      {project.results.slice(0, 3).map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Deliverables Matrix */}
                <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                    Complete Handover Artifacts Included in this Engagement:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Repository</span>
                      <p className="font-bold text-slate-200 text-xs mt-0.5">100% Git Source Code</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Infrastructure</span>
                      <p className="font-bold text-slate-200 text-xs mt-0.5">Automated Cloud CI/CD</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Warranty</span>
                      <p className="font-bold text-emerald-400 text-xs mt-0.5">60-Day Bug Warranty</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Licensing</span>
                      <p className="font-bold text-brand-300 text-xs mt-0.5">₹0 Recurring Fees</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "architecture" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-slate-300 text-xs"
              >
                {/* Visual Architecture Diagram */}
                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                  <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-400" />
                    High-Concurrency System Flow Architecture
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-brand-400 block mb-1">CLIENT TIER</span>
                      <p className="font-bold text-white">React 19 SPA + PWA</p>
                      <p className="text-[10px] text-slate-400 mt-1">Vite, Tailwind, Mobile Touch Optimizations</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 block mb-1">GATEWAY & SOCKETS</span>
                      <p className="font-bold text-white">Node.js / Express</p>
                      <p className="text-[10px] text-slate-400 mt-1">JWT Auth, Rate Limiting & WebSocket Stream</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-emerald-400 block mb-1">DATA LAYER</span>
                      <p className="font-bold text-white">PostgreSQL / Mongo</p>
                      <p className="text-[10px] text-slate-400 mt-1">ACID Ledger, Redis Cache & Auto Indexing</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-orange-400 block mb-1">INTEGRATIONS</span>
                      <p className="font-bold text-white">WhatsApp & Razorpay</p>
                      <p className="text-[10px] text-slate-400 mt-1">Cloud Webhooks, UPI Gateway, S3 Storage</p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Matrix */}
                <div>
                  <h3 className="font-black text-white text-sm mb-3">Technology Stack Breakdown</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl font-mono text-xs text-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-white mb-2 text-xs">Security & Reliability</h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-400">
                      <li>• End-to-end encrypted payload transfers with AES-256</li>
                      <li>• Automated offsite hourly database backups</li>
                      <li>• Zero-downtime deployment pipelines via GitHub Actions</li>
                    </ul>
                  </div>
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-white mb-2 text-xs">Performance Benchmarks</h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-400">
                      <li>• Median API latency &lt; 140ms across all Indian regions</li>
                      <li>• Sub-second initial page load with edge caching</li>
                      <li>• 100% Google Lighthouse score on desktop & mobile</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "impact" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-xs text-slate-300"
              >
                {/* Key Metric Hero */}
                <div className="bg-gradient-to-br from-brand-900/40 via-slate-950 to-slate-950 p-6 rounded-2xl border border-brand-500/30 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-300 font-mono">
                      PRIMARY BUSINESS OUTCOME
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mt-1">
                      {project.metrics.value}
                    </h3>
                    <p className="text-slate-300 text-sm mt-1">{project.metrics.label} ({project.metrics.sub})</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase">Delivery Time</span>
                      <p className="font-black text-white text-base">3 Weeks</p>
                    </div>
                    <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase">Code Ownership</span>
                      <p className="font-black text-emerald-400 text-base">100% Client</p>
                    </div>
                  </div>
                </div>

                {/* Results Bullet Grid */}
                <div>
                  <h3 className="font-black text-white text-sm mb-3">Key Results Delivered</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.results.map((r, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 leading-snug">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h3 className="font-black text-white text-sm mb-3">Core Features Delivered</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {project.features.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Bar with Direct Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-950 border-t border-slate-800 shrink-0">
            <div className="text-xs text-slate-400">
              <span>Interested in a similar deployment?</span>
              <span className="text-white font-semibold block sm:inline sm:ml-1">
                We deliver complete turnkey software in 2-4 weeks.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={WA(`Hi Prajyot Infotech, I was reviewing your live demo of ${project.title} on your portfolio. I would like to build something similar for my business. Can we discuss?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 transition cursor-pointer flex items-center gap-2 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                Build Something Similar on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
