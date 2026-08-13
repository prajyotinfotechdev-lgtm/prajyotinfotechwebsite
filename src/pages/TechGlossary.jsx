import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Globe, Smartphone, Cloud, Server, Code2, Cpu, LineChart, Zap } from 'lucide-react';
import Seo from "../components/Seo.jsx";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

const TERMS = [
  {
    id: "api",
    term: "API (Application Programming Interface)",
    icon: <Server className="w-8 h-8 text-indigo-500" />,
    shortDesc: "A bridge that lets two different apps talk to each other.",
    fullDesc: "Think of an API like a waiter in a restaurant. You (the client app) give your order (request) to the waiter (the API), who takes it to the kitchen (the server/database). The waiter then brings your food (data) back to you. We use APIs to connect your website to payment gateways like Razorpay, or to send WhatsApp messages.",
    tags: ["Integration", "Backend", "Data"],
    visual: (
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">Client</div>
        <div className="flex-1 px-4 relative">
          <div className="h-0.5 bg-slate-200 w-full"></div>
          <motion.div 
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -mt-1.5 left-4 w-3 h-3 bg-brand-500 rounded-full"
          />
        </div>
        <div className="w-12 h-12 bg-navy-900 text-white border border-navy-800 rounded-lg flex items-center justify-center shadow-sm">Server</div>
      </div>
    )
  },
  {
    id: "erp",
    term: "ERP (Enterprise Resource Planning)",
    icon: <Database className="w-8 h-8 text-emerald-500" />,
    shortDesc: "Software that manages your entire business's day-to-day operations.",
    fullDesc: "An ERP ties together a multitude of business processes and enables the flow of data between them. Instead of having one software for accounting, another for HR, and another for inventory, an ERP combines them all into a single, unified system (the 'single source of truth').",
    tags: ["Business", "Management", "Software"],
    visual: (
      <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50 rounded-xl">
        <div className="bg-white p-2 text-center text-xs border border-slate-200 rounded shadow-sm">Inventory</div>
        <div className="bg-white p-2 text-center text-xs border border-slate-200 rounded shadow-sm">HR</div>
        <div className="bg-white p-2 text-center text-xs border border-slate-200 rounded shadow-sm">Finance</div>
        <div className="bg-white p-2 text-center text-xs border border-slate-200 rounded shadow-sm">Sales</div>
        <div className="col-span-2 mt-2 bg-emerald-100 text-emerald-700 font-bold p-2 text-center text-xs border border-emerald-200 rounded shadow-sm">Unified ERP Database</div>
      </div>
    )
  },
  {
    id: "crm",
    term: "CRM (Customer Relationship Management)",
    icon: <Users className="w-8 h-8 text-rose-500" />,
    shortDesc: "A system to track and manage all your customer interactions.",
    fullDesc: "A CRM helps you store customer data, track sales leads, schedule follow-ups, and automate marketing. If you've ever lost a potential sale because you forgot to call them back, or if your sales data is scattered across Excel sheets and WhatsApp chats, you need a CRM.",
    tags: ["Sales", "Customers", "Growth"],
  },
  {
    id: "frontend",
    term: "Frontend (Client-Side)",
    icon: <Globe className="w-8 h-8 text-sky-500" />,
    shortDesc: "The part of the software that the user sees and interacts with.",
    fullDesc: "The frontend is the visual layer (buttons, text, colors, layouts) that runs in your web browser or on your phone. We build incredibly fast, interactive frontends using technologies like React and Tailwind CSS to ensure your users have a buttery-smooth experience.",
    tags: ["UI/UX", "Web", "Design"],
  },
  {
    id: "backend",
    term: "Backend (Server-Side)",
    icon: <Cpu className="w-8 h-8 text-slate-700" />,
    shortDesc: "The invisible engine that powers the software.",
    fullDesc: "The backend is the server, database, and logic that runs behind the scenes. It handles user authentication, data processing, security, and storing information. A beautiful frontend is useless without a powerful, scalable backend to serve it data.",
    tags: ["Server", "Logic", "Database"],
  },
  {
    id: "seo",
    term: "SEO (Search Engine Optimization)",
    icon: <LineChart className="w-8 h-8 text-amber-500" />,
    shortDesc: "Techniques used to make your website rank higher on Google.",
    fullDesc: "SEO is not magic; it's a combination of technical website structure (fast loading, mobile-friendly, proper tags) and high-quality content. We build all our websites with 'Technical SEO' baked in from day one, meaning search engines can easily read and index your pages.",
    tags: ["Marketing", "Google", "Traffic"],
  },
];

// In this file, since we used 'Users' earlier, we need to import it if it wasn't
// Let's ensure all icons are imported from lucide-react at the top.
import { Users } from 'lucide-react';

export default function TechGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTerm, setActiveTerm] = useState(TERMS[0]);

  const filteredTerms = TERMS.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Seo 
        title="Visual Tech Glossary | Prajyot Infotech"
        description="Confused by tech jargon like API, ERP, or CRM? Explore our interactive visual tech glossary to understand exactly how these technologies help your business."
      />
      
      {/* Header */}
      <header className="bg-navy-900 pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Tech Jargon, <span className="text-brand-400">Demystified.</span></h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            We don't expect you to be a software engineer. Explore our visual dictionary to understand exactly what we build and how it helps your business grow.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for a term (e.g., API, CRM, Frontend)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white/20 transition-all backdrop-blur-md"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar List */}
        <div className="md:col-span-4 h-[600px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-300">
          {filteredTerms.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No terms found.</p>
          ) : (
            filteredTerms.map(term => (
              <button
                key={term.id}
                onClick={() => setActiveTerm(term)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  activeTerm.id === term.id 
                    ? 'bg-white border-brand-500 shadow-md ring-1 ring-brand-500' 
                    : 'bg-white/50 border-slate-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                    {React.cloneElement(term.icon, { className: "w-5 h-5" })}
                  </div>
                  <h3 className="font-bold text-navy-900 truncate">{term.term}</h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{term.shortDesc}</p>
              </button>
            ))
          )}
        </div>

        {/* Detail View */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTerm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                  {activeTerm.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-navy-900">{activeTerm.term}</h2>
                  <div className="flex gap-2 mt-2">
                    {activeTerm.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none mb-8">
                <p className="text-xl text-slate-700 font-medium leading-relaxed">
                  {activeTerm.shortDesc}
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  {activeTerm.fullDesc}
                </p>
              </div>

              {activeTerm.visual && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Visual Interactive Example</h3>
                  <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 overflow-hidden">
                    {activeTerm.visual}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
