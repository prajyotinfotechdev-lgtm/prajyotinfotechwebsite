import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo.jsx";
import { Play, Pause, RefreshCw, Send, Server, Smartphone, Layout, ArrowRight } from "lucide-react";

/* ─── Interactive Diagram: How an API Works ─── */
const ApiInteractiveDiagram = () => {
  const [step, setStep] = useState(0);

  const simulateApiCall = () => {
    setStep(1); // Client sending
    setTimeout(() => setStep(2), 1000); // Server processing
    setTimeout(() => setStep(3), 2000); // Server responding
    setTimeout(() => setStep(4), 3000); // Client received
    setTimeout(() => setStep(0), 5000); // Reset
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner my-6 relative overflow-hidden">
      <div className="flex items-center justify-between relative z-10">
        
        {/* Client */}
        <div className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border ${step === 0 || step === 4 ? 'border-brand-500 shadow-brand-500/20' : 'border-slate-200'}`}>
          <Smartphone className="w-8 h-8 text-brand-500 mb-2" />
          <span className="font-bold text-navy-900 text-sm">Client App</span>
          <span className="text-xs text-slate-500 mt-1">{step === 4 ? "Data Received!" : "Waiting..."}</span>
        </div>

        {/* The Connection */}
        <div className="flex-1 px-8 relative">
          <div className="h-1 bg-slate-200 w-full rounded-full overflow-hidden relative">
            {/* Request Packet */}
            <motion.div 
              initial={{ left: "0%", opacity: 0 }}
              animate={step === 1 ? { left: "100%", opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 w-8 h-full bg-blue-500 rounded-full"
            />
            {/* Response Packet */}
            <motion.div 
              initial={{ right: "0%", opacity: 0 }}
              animate={step === 3 ? { right: "100%", opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-0 w-8 h-full bg-emerald-500 rounded-full"
            />
          </div>
          <div className="text-center mt-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            {step === 1 && "Sending Request..."}
            {step === 2 && "Processing at Server"}
            {step === 3 && "Returning Data..."}
            {step === 0 && step !== 4 && "Internet"}
          </div>
        </div>

        {/* Server */}
        <div className={`flex flex-col items-center p-4 bg-navy-900 rounded-xl shadow-sm border ${step === 2 ? 'border-emerald-500 shadow-emerald-500/40 animate-pulse' : 'border-navy-800'}`}>
          <Server className="w-8 h-8 text-emerald-400 mb-2" />
          <span className="font-bold text-white text-sm">Database</span>
          <span className="text-xs text-emerald-400/80 mt-1">{step === 2 ? "Fetching Data" : "Idle"}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={simulateApiCall}
          disabled={step !== 0 && step !== 4}
          className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg font-bold text-sm shadow-md hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4 mr-2" />
          Test API Call
        </button>
      </div>
    </div>
  );
};


/* ─── Interactive Diagram: Responsive Design ─── */
const ResponsiveInteractiveDiagram = () => {
  const [device, setDevice] = useState('desktop');

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner my-6 text-center">
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setDevice('mobile')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${device === 'mobile' ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Mobile</button>
        <button onClick={() => setDevice('tablet')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${device === 'tablet' ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Tablet</button>
        <button onClick={() => setDevice('desktop')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${device === 'desktop' ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Desktop</button>
      </div>

      <div className="flex justify-center items-center h-64 bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
        <motion.div 
          animate={{
            width: device === 'mobile' ? 150 : device === 'tablet' ? 300 : 500,
            height: device === 'mobile' ? 220 : device === 'tablet' ? 200 : 180
          }}
          className="bg-white border-4 border-navy-900 rounded-xl overflow-hidden flex flex-col"
        >
          {/* Mock Header */}
          <div className="bg-slate-100 h-8 flex items-center px-2 border-b border-slate-200">
            <div className="w-4 h-4 rounded-full bg-brand-500" />
            <div className="ml-auto w-12 h-3 bg-slate-300 rounded" />
          </div>
          {/* Mock Grid Content */}
          <div className={`p-2 flex-1 grid gap-2 ${device === 'mobile' ? 'grid-cols-1' : device === 'tablet' ? 'grid-cols-2' : 'grid-cols-3'}`}>
            <div className="bg-emerald-100 rounded border border-emerald-200 min-h-[40px]" />
            <div className="bg-emerald-100 rounded border border-emerald-200 min-h-[40px]" />
            <div className="bg-emerald-100 rounded border border-emerald-200 min-h-[40px]" />
          </div>
        </motion.div>
      </div>
      <p className="text-sm text-slate-500 mt-4">Notice how the layout grid automatically shifts from 1 to 2 to 3 columns based on the screen width.</p>
    </div>
  );
};


const ARTICLES = [
  {
    id: "what-is-an-api",
    title: "Understanding APIs: The Waiters of the Internet",
    category: "Technical Explained",
    readTime: "4 min read",
    interactiveComponent: <ApiInteractiveDiagram />,
    content: "If you want to build a modern app, you need to understand APIs. Think of an API like a waiter in a restaurant. You (the user) sit at a table and look at a menu (the frontend). You tell the waiter what you want. The waiter takes your order to the kitchen (the backend server), and then brings your food (data) back to you. Without the waiter, you would have to go into the kitchen and cook it yourself. Try the interactive model above to see how a request travels across the internet!"
  },
  {
    id: "responsive-design",
    title: "Why Responsive Design is Non-Negotiable in 2026",
    category: "Design & UX",
    readTime: "3 min read",
    interactiveComponent: <ResponsiveInteractiveDiagram />,
    content: "Over 70% of web traffic now comes from mobile devices. If your website was only designed for a desktop monitor, you are actively losing customers. Responsive design isn't just about shrinking elements; it's about intelligently rearranging the layout (like grids stacking into single columns) so the user experience is flawless on a 4-inch screen and a 32-inch monitor. Use the toggle above to see how a responsive grid adapts to different devices."
  }
];

export default function Articles() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Seo 
        title="Interactive Learning Hub | Prajyot Infotech"
        description="Explore our interactive articles and learn how modern software, APIs, and responsive design work through hands-on visual diagrams."
      />
      
      {/* Header */}
      <header className="bg-navy-900 pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 font-semibold text-sm mb-6">
            Interactive Learning Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Don't just read. <span className="text-brand-400">Experience it.</span></h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Our articles feature live, interactive components so you can visually understand exactly how the software we build actually works.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 space-y-16">
        {ARTICLES.map((article) => (
          <article key={article.id} className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{article.category}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{article.readTime}</span>
            </div>
            <h2 className="text-3xl font-black text-navy-900 mb-6">{article.title}</h2>
            
            {article.interactiveComponent}

            <div className="prose prose-slate max-w-none mt-8 text-slate-700 leading-relaxed text-lg">
              <p>{article.content}</p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="font-bold text-navy-900 mb-4">Want to build something like this for your business?</p>
              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-navy-900 text-white font-bold rounded-full hover:bg-brand-600 transition-colors">
                Let's Talk <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
