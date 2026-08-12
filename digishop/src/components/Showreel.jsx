// src/components/Showreel.jsx
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SHOWREEL = {
  provider: "mp4", // "mp4" | "youtube" | "vimeo"
  // MP4/local options:
  src: "/videos/company-profile.mp4",
  poster: "/images/company-profile-poster.jpg",
};

export default function Showreel() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="showreel" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
            Motion-first storytelling
          </h2>
          <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
            Subtle parallax, smooth transitions, and crisp micro-interactions—built to be fast,
            accessible, and reliable.
          </p>
          <ul className="mt-7 space-y-4 text-slate-700">
            {[
              "Framer Motion choreography",
              "Smooth-scroll ready",
              "SSR-friendly architecture",
              "Color-safe contrasts",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="flex items-center justify-center size-6 rounded-full bg-gradient-to-br from-brand-500 to-brand-700">
                  <svg viewBox="0 0 24 24" className="size-4 text-white" aria-hidden>
                    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                </div>
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Player */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl shadow-brand-500/10">
          <InlinePlayer prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}

/* Router for inline player */
function InlinePlayer({ prefersReducedMotion }) {
  switch (SHOWREEL.provider) {
    case "mp4":
      return (
        <Mp4Inline
          poster={SHOWREEL.poster}
          prefersReducedMotion={prefersReducedMotion}
          src={SHOWREEL.src}
          sources={SHOWREEL.sources}
          captions={SHOWREEL.captions}
        />
      );
    case "youtube":
      return <YouTubeInline id={SHOWREEL.id} />;
    case "vimeo":
      return <VimeoInline id={SHOWREEL.id} />;
    default:
      return null;
  }
}

/* MP4 inline player:
   - Autoplay muted when motion is allowed
   - Pause when off-screen / hidden tab
   - Play overlay when reduced motion or autoplay fails
*/
function Mp4Inline({ src, sources, poster, prefersReducedMotion, captions }) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [allowMotion, setAllowMotion] = useState(!prefersReducedMotion);
  const [needTapToPlay, setNeedTapToPlay] = useState(false); // shown if autoplay gets blocked
  const [isPlaying, setIsPlaying] = useState(false);

  // Attempt to play
  const tryPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");

    return v.play().then(
      () => {
        setNeedTapToPlay(false);
        setIsPlaying(true);
      },
      () => {
        // Autoplay blocked; show overlay button
        setNeedTapToPlay(true);
        setIsPlaying(false);
      }
    );
  };

  // Wire up listeners + intersection pause/resume
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    let io;
    if (allowMotion && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!v) return;
          if (entry.isIntersecting) {
            // Resume on view if we're allowed
            if (!prefersReducedMotion) tryPlay();
          } else {
            v.pause();
          }
        },
        { threshold: 0.45 }
      );
      io.observe(wrapRef.current || v);
    }

    // Pause on hidden tab
    const onVis = () => {
      if (document.hidden) v.pause();
      else if (allowMotion && !prefersReducedMotion) tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    // Initial attempt
    if (allowMotion && !prefersReducedMotion) {
      if (v.readyState >= 2) tryPlay();
      else {
        const onCanPlay = () => tryPlay();
        v.addEventListener("canplay", onCanPlay, { once: true });
      }
    }

    return () => {
      v.pause();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowMotion, prefersReducedMotion]);

  const onUserPlay = () => {
    setAllowMotion(true);
    setNeedTapToPlay(false);
    tryPlay();
  };

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        // Performance note: "metadata" is friendlier on first paint than "auto"
        preload="metadata"
        poster={poster}
        autoPlay={allowMotion && !prefersReducedMotion}
        muted
        loop={allowMotion && !prefersReducedMotion}
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        aria-label="Company showreel"
        onError={(e) => {
          console.warn("Video error:", e?.currentTarget?.error);
          setNeedTapToPlay(true);
        }}
      >
        {/* Prefer custom sources list if provided */}
        {Array.isArray(sources) && sources.length > 0 ? (
          sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
        ) : (
          <source src={src} type="video/mp4" />
        )}
        {captions?.src && (
          <track
            kind="captions"
            src={captions.src}
            srcLang={captions.srclang || "en"}
            label={captions.label || "English"}
            default
          />
        )}
        Your browser doesn't support inline video.
      </video>

      {/* Overlay controls (shown when motion is disabled or autoplay blocked) */}
      {(!allowMotion || needTapToPlay) && (
        <div className="absolute inset-0 grid place-items-center bg-navy-900/20 backdrop-blur-sm">
          <button
            type="button"
            onClick={onUserPlay}
            className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-3 text-sm font-semibold text-navy-800 shadow-lg ring-1 ring-slate-200 hover:bg-white hover:shadow-xl transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-600" aria-hidden>
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
            Play reel
          </button>
        </div>
      )}

      {/* Subtle bottom-left controls readout (optional) */}
      <div className="pointer-events-none absolute left-3 bottom-3 rounded-full bg-gradient-to-r from-brand-600/80 to-navy-800/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        {isPlaying ? "▶ Playing" : "❚❚ Paused"}
      </div>
    </div>
  );
}

/* YouTube inline (autoplay, muted, loop) */
function YouTubeInline({ id }) {
  if (!id) return null;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&controls=0&loop=1&playlist=${id}`;
  return (
    <iframe
      title="Showreel"
      src={src}
      className="absolute inset-0 h-full w-full"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="autoplay; encrypted-media; picture-in-picture"
    />
  );
}

/* Vimeo inline (background mode) */
function VimeoInline({ id }) {
  if (!id) return null;
  const src = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`;
  return (
    <iframe
      title="Showreel"
      src={src}
      className="absolute inset-0 h-full w-full"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="autoplay; fullscreen; picture-in-picture"
    />
  );
}
