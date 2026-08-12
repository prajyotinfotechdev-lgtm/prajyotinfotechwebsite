// src/pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main
      id="not-found"
      className="relative mx-auto max-w-3xl px-4 py-20 md:py-28"
      aria-labelledby="nf-title"
    >
      {/* soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 100% 0%, rgba(20,184,166,.08), transparent 60%)",
        }}
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-14 place-items-center rounded-2xl bg-teal-50 text-teal-700 border border-teal-100">
            {/* compass-ish icon */}
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
              <path
                d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm3.9 6.1-2.2 5.3a2 2 0 0 1-1.1 1.1l-5.3 2.2 2.2-5.3a2 2 0 0 1 1.1-1.1l5.3-2.2Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1
            id="nf-title"
            className="mt-6 text-5xl md:text-6xl font-black tracking-tight text-slate-900"
          >
            404
          </h1>
          <p className="mt-2 text-base md:text-lg text-slate-600">
            We couldn’t find that page. It may have moved or the link is broken.
          </p>

          {/* Primary actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Back to Home
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Go back
            </button>
            <a
              href={`mailto:prajyotkankal9@gmail.com?subject=${encodeURIComponent(
                "Broken link on DigiShop"
              )}&body=${encodeURIComponent(
                "Hi, I landed on a 404 page. The link that failed was: "
              )}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Report issue
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-8 w-full">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Try these
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
              {[
                { to: "/work", label: "See our work" },
                { to: "/services", label: "What we build" },
                { to: "/about", label: "About DigiShop" },
                { to: "/contact", label: "Start a project" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                    <span className="group-hover:underline group-hover:underline-offset-2">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
