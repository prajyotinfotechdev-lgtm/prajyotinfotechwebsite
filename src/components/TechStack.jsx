// src/components/TechStack.jsx
// Shows technologies used — builds confidence with tech-aware clients
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const STACK = [
  { name: "React", category: "Frontend", color: "from-cyan-400 to-cyan-600",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12 10.11A1.89 1.89 0 1 1 10.11 12 1.89 1.89 0 0 1 12 10.11m0-5.68c5.52 0 10 2.5 10 5.57s-4.48 5.57-10 5.57S2 13.57 2 10.5 6.48 4.43 12 4.43m0 9.57c3.58 0 6.49-1.8 6.49-4s-2.91-4-6.49-4S5.51 8.3 5.51 10.5s2.91 4 6.49 4m0-1.57a2.43 2.43 0 1 0-2.43-2.43A2.43 2.43 0 0 0 12 12.43z" opacity=".5"/></svg>
  },
  { name: "Node.js", category: "Backend", color: "from-green-500 to-green-700",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12 1.85L2 7.12v9.76L12 22.15l10-5.27V7.12L12 1.85zm7.88 14.6L12 20.3l-7.88-3.85V8.35L12 4.5l7.88 3.85v8.1z"/></svg>
  },
  { name: "MongoDB", category: "Database", color: "from-emerald-500 to-emerald-700",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12.2 2C8.5 2 5.5 5.1 5.5 9c0 3.2 1.9 5.9 4.6 7.1l.6 5.9h3l.6-5.9C16.9 14.9 18.5 12 18.5 9c0-3.9-2.8-7-6.3-7zM12 14.5c-1.9 0-3.5-2.4-3.5-5.5S10.1 3.5 12 3.5s3.5 2.4 3.5 5.5S13.9 14.5 12 14.5z"/></svg>
  },
  { name: "React Native", category: "Mobile", color: "from-sky-500 to-blue-600",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12 10.11A1.89 1.89 0 1 1 10.11 12 1.89 1.89 0 0 1 12 10.11m0-5.68c5.52 0 10 2.5 10 5.57s-4.48 5.57-10 5.57S2 13.57 2 10.5 6.48 4.43 12 4.43z"/></svg>
  },
  { name: "Razorpay", category: "Payments", color: "from-blue-500 to-indigo-600",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
  },
  { name: "Firebase", category: "Auth & Cloud", color: "from-amber-400 to-orange-500",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M5.47 18.46 3.27 7.08l5.1 3.16L12 2l3.64 8.24 5.09-3.16-2.2 11.38-13.06-.01zm12.91.94H5.62l-.01-.01 6.38 3.15 6.39-3.14z"/></svg>
  },
  { name: "Cloudinary", category: "Media", color: "from-sky-400 to-blue-500",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.61 5.64 5.36 8.04 2.35 8.36 0 10.9 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
  },
  { name: "Express.js", category: "Backend", color: "from-slate-500 to-slate-700",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M24 18.588a1.53 1.53 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.8-.667L18.35 9.82l4.945 6.434-1.574 2.164-.321.17z"/></svg>
  },
  { name: "Tailwind CSS", category: "Styling", color: "from-teal-400 to-cyan-500",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.27 10.8 14.33 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.23 7.2 14.17 6 12 6zm-4 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C9.27 16.8 10.33 18 12.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C11.23 13.2 10.17 12 8 12z"/></svg>
  },
  { name: "WhatsApp API", category: "Automation", color: "from-green-400 to-emerald-600",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.524 5.855L.055 23.454a.5.5 0 0 0 .612.612l5.598-1.469A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.524-5.198-1.435l-.372-.22-3.853 1.011 1.011-3.854-.22-.372A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
  },
  { name: "Next.js", category: "Framework", color: "from-slate-700 to-navy-800",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.573 3.843 20.365.05 16.016.007A18.6 18.6 0 0 0 11.572 0z"/></svg>
  },
  { name: "Vercel / Railway", category: "Deployment", color: "from-violet-500 to-purple-700",
    icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
  },
];

const CATEGORIES = ["Frontend", "Backend", "Mobile", "Database", "Payments", "Auth & Cloud", "Media", "Styling", "Automation", "Framework", "Deployment"];

export default function TechStack() {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.04 },
    },
  };
  const item = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section id="tech-stack" className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="techTitle">
      <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-navy-900 via-navy-800 to-brand-900 p-8 md:p-12 overflow-hidden relative">
        {/* Background glow */}
        <div aria-hidden className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-600/20 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-20 -left-20 size-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        <div className="relative">
          <h2 id="techTitle" className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Built with modern, proven technology
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Every project is built using industry-standard tools — so your software is fast, secure, scalable, and easy to maintain.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {STACK.map((tech) => (
              <motion.div
                key={tech.name}
                variants={item}
                className="group relative rounded-xl border border-white/10 bg-white/5 p-3.5 text-center hover:border-white/25 hover:bg-white/10 transition-all duration-200 cursor-default"
              >
                {/* Icon circle */}
                <div className={`mx-auto mb-2.5 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${tech.color} text-white shadow-lg`}>
                  {tech.icon}
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{tech.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{tech.category}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom note */}
          <p className="mt-8 text-sm text-slate-400">
            We select the right tools for each project — not a one-size-fits-all stack.
            <span className="text-brand-400 font-medium ml-1">Your tech preferences are always considered.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
