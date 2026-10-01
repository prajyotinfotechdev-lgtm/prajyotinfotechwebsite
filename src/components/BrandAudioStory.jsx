// src/components/BrandAudioStory.jsx
// PRAJYOT INFOTECH — PRODUCTION AUDIO-SYNCHRONIZED BRAND STORY
// Master Clock: audio.currentTime (Zero-drift, requestAnimationFrame + native audio events)
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
  Building2,
  HardHat,
  ShoppingCart,
  Stethoscope,
  Utensils,
  GraduationCap,
  PackageCheck,
  Truck,
  Smartphone,
  Laptop,
  Check,
  Zap,
  Globe,
  Users,
  Compass,
  FileCode2,
  Lock,
  ChevronRight,
  Clock,
  Radio,
  ExternalLink
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

// Authoritative uploaded audio path
export const BRAND_STORY_AUDIO_URL = "/audio/prajyot_infotech.mpeg";
export const TOTAL_DURATION = 108.2;

// 15 Semantic Visual Scenes aligned with the exact speech pauses of prajyot_infotech.mpeg
export const BRAND_SCENES = [
  {
    id: 1,
    start: 0.0,
    end: 2.78,
    chapter: "01",
    tag: "DIVERSITY OF WORK",
    narration: "Every business works differently.",
    headline: "Every Business Works Differently.",
    subtext: "Different people, unique operational workflows, distinct industry realities.",
  },
  {
    id: 2,
    start: 2.78,
    end: 7.10,
    chapter: "02",
    tag: "THE TEMPLATE TRAP",
    narration: "So why should the technology behind it work from a template?",
    headline: "Why Should Technology Work From A Template?",
    subtext: "Rigid cookie-cutter systems force businesses to change how they work.",
  },
  {
    id: 3,
    start: 7.10,
    end: 12.79,
    chapter: "03",
    tag: "THE PHILOSOPHY",
    narration: "At Prajyot Infotech, we build software around the way businesses actually work.",
    headline: "We Build Software Around How You Work.",
    subtext: "Engineering bespoke digital platforms adapted to your exact operational reality.",
  },
  {
    id: 4,
    start: 12.79,
    end: 22.34,
    chapter: "04",
    tag: "THE TRANSFORMATION",
    narration: "We take ideas, complex processes, and everyday operational problems... and turn them into digital products built for real-world use.",
    headline: "From Operational Friction to Working Software.",
    subtext: "Taking paper bottlenecks, disconnected chats, and manual delays into cohesive digital engines.",
  },
  {
    id: 5,
    start: 22.34,
    end: 34.68,
    chapter: "05",
    tag: "CAPABILITIES",
    narration: "From high-performance websites and e-commerce platforms... to mobile applications, ERP and CRM systems, inventory platforms, workflow automation, and industry-specific SaaS...",
    headline: "What We Engineer & Deliver.",
    subtext: "End-to-end full-stack systems spanning web, mobile, enterprise backend, and cloud APIs.",
  },
  {
    id: 6,
    start: 34.68,
    end: 40.41,
    chapter: "06",
    tag: "THE TRIAD",
    narration: "we bring design, engineering, and business logic together under one roof.",
    headline: "Design + Engineering + Business Logic.",
    subtext: "Under one roof — crafted with technical precision and commercial understanding.",
  },
  {
    id: 7,
    start: 40.41,
    end: 44.30,
    chapter: "07",
    tag: "BEYOND LAUNCH",
    narration: "But we don’t believe our job ends when the software is delivered.",
    headline: "Our Job Doesn't End at Code Delivery.",
    subtext: "True software success is proven in operational adoption, not just Git commits.",
  },
  {
    id: 8,
    start: 44.30,
    end: 51.93,
    chapter: "08",
    tag: "GROUND EXECUTION",
    narration: "We deploy it. We onboard teams. We train people on the ground. And we stay involved beyond launch.",
    headline: "Deploy. Onboard. Train. Support.",
    subtext: "Hands-on site visits, ground employee training, and guaranteed post-launch warranties.",
  },
  {
    id: 9,
    start: 51.93,
    end: 56.40,
    chapter: "09",
    tag: "CORE PRINCIPLE",
    narration: "Because real software has to work where real work happens.",
    headline: "Real Software Has To Work Where Real Work Happens.",
    subtext: "On dusty construction sites, busy retail floors, noisy warehouses, and active clinics.",
  },
  {
    id: 10,
    start: 56.40,
    end: 66.31,
    chapter: "10",
    tag: "CLIENT OWNERSHIP",
    narration: "And when we build custom technology, we believe our clients should own what they build. Their code. Their systems. Their intellectual property.",
    headline: "Your Code. Your Systems. Your IP.",
    subtext: "100% full Git repository handover. Zero vendor lock-in. Zero per-seat recurring fees.",
  },
  {
    id: 11,
    start: 66.31,
    end: 71.19,
    chapter: "11",
    tag: "INDEPENDENCE",
    narration: "No unnecessary dependence. Just technology they can truly own.",
    headline: "Technology You Can Truly Own.",
    subtext: "Independent cloud infrastructure, dedicated databases, and complete operational freedom.",
  },
  {
    id: 12,
    start: 71.19,
    end: 84.88,
    chapter: "12",
    tag: "SECTOR SOLUTIONS",
    narration: "From construction and retail to healthcare, hospitality, real estate, education, and distribution… we build technology for businesses with different challenges, different people, and different ways of working.",
    headline: "Solutions Tailored Across 7 Key Sectors.",
    subtext: "Engineered specifically around the ground realities of Indian and global enterprises.",
  },
  {
    id: 13,
    start: 84.88,
    end: 94.67,
    chapter: "13",
    tag: "PROPRIETARY SAAS",
    narration: "And we’re building beyond client solutions too. With products like Oibuz, we turn our own understanding of business problems into technology of our own.",
    headline: "Building Our Own Products: OIBUZ.",
    subtext: "Turning deep industry understanding into an enterprise Construction HRMS & Workforce suite.",
  },
  {
    id: 14,
    start: 94.67,
    end: 101.44,
    chapter: "14",
    tag: "THE MISSION",
    narration: "Because we’re not here just to write software. We’re here to engineer what businesses can become.",
    headline: "We Engineer What Businesses Can Become.",
    subtext: "Empowering visionary founders and enterprises to lead their industries with modern digital capabilities.",
  },
  {
    id: 15,
    start: 101.44,
    end: 108.20,
    chapter: "15",
    tag: "PRAJYOT INFOTECH",
    narration: "Prajyot Infotech. Software engineered around your business.",
    headline: "Software Engineered Around Your Business.",
    subtext: "Headquartered in Pune, Maharashtra • Delivering Globally across India, USA, UAE, and Europe.",
  },
];

// Helper: Format seconds to MM:SS
function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Live Voice Equalizer graphic
function VoiceEqualizer({ isPlaying, barCount = 4, className = "" }) {
  return (
    <div className={`inline-flex items-end gap-[2px] h-3.5 ${className}`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          animate={
            isPlaying
              ? {
                  height: ["20%", "100%", "45%", "85%", "30%"],
                }
              : { height: "28%" }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.55 + (i % 3) * 0.16,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.08,
                }
              : { duration: 0.2 }
          }
          className="w-[2.5px] rounded-full bg-brand-600 inline-block"
        />
      ))}
    </div>
  );
}

export default function BrandAudioStory() {
  const { openLeadModal } = useLeadModal();
  const prefersReducedMotion = useReducedMotion();

  // Core Playback State
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TOTAL_DURATION);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [audioError, setAudioError] = useState(null);

  // Smooth dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const isDraggingRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const lastAudioSeekTimeRef = useRef(0);
  const trackRef = useRef(null);

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  // Determine current active scene based strictly on currentTime
  const syncSceneWithTime = useCallback((time) => {
    const idx = BRAND_SCENES.findIndex((s) => time >= s.start && time < s.end);
    if (idx !== -1) {
      setActiveSceneIndex(idx);
    } else if (time >= BRAND_SCENES[BRAND_SCENES.length - 1].start) {
      setActiveSceneIndex(BRAND_SCENES.length - 1);
    }
  }, []);

  // Continuous high-precision master sync loop via requestAnimationFrame
  const startRafLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const loop = () => {
      if (audioRef.current && !audioRef.current.paused) {
        if (!isDraggingRef.current) {
          const t = audioRef.current.currentTime;
          setCurrentTime(t);
          syncSceneWithTime(t);
        }
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [syncSceneWithTime]);

  const stopRafLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Audio lifecycle handlers
  const handlePlay = useCallback(() => {
    if (!audioRef.current) return;
    setHasStarted(true);
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        startRafLoop();
      })
      .catch((err) => {
        console.warn("Audio play prevented:", err);
        setIsPlaying(false);
        setAudioError("Click to enable audio playback");
      });
  }, [startRafLoop]);

  const handlePause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    stopRafLoop();
  }, [stopRafLoop]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePause, handlePlay]);

  const handleReplay = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setActiveSceneIndex(0);
    handlePlay();
  }, [handlePlay]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  }, []);

  // Direct scrub / seek handler (audio.currentTime is single source of truth)
  const handleSeek = useCallback(
    (targetTime) => {
      const clamped = Math.max(0, Math.min(targetTime, duration || TOTAL_DURATION));
      if (audioRef.current) {
        audioRef.current.currentTime = clamped;
      }
      setCurrentTime(clamped);
      syncSceneWithTime(clamped);
      if (!hasStarted) {
        setHasStarted(true);
      }
    },
    [duration, hasStarted, syncSceneWithTime]
  );

  // Jump directly to a scene start
  const jumpToScene = useCallback(
    (sceneIdx) => {
      const targetScene = BRAND_SCENES[sceneIdx];
      if (!targetScene) return;
      handleSeek(targetScene.start + 0.05);
      if (!isPlaying) {
        handlePlay();
      }
    },
    [handleSeek, isPlaying, handlePlay]
  );

  // Calculate target time from pointer clientX relative to track
  const getTimeFromPointer = useCallback(
    (clientX) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      return ratio * (duration || TOTAL_DURATION);
    },
    [duration]
  );

  // High-performance pointer drag handlers (supports mouse & touch seamlessly)
  const handlePointerDown = useCallback(
    (e) => {
      if (!hasStarted) setHasStarted(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      isDraggingRef.current = true;
      setIsDragging(true);

      if (audioRef.current && !audioRef.current.paused) {
        wasPlayingRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
        stopRafLoop();
      } else {
        wasPlayingRef.current = false;
      }

      const t = getTimeFromPointer(e.clientX);
      setDragTime(t);
      setCurrentTime(t);
      syncSceneWithTime(t);

      if (audioRef.current) {
        audioRef.current.currentTime = t;
      }
    },
    [getTimeFromPointer, hasStarted, stopRafLoop, syncSceneWithTime]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      const t = getTimeFromPointer(e.clientX);
      setDragTime(t);
      setCurrentTime(t);
      syncSceneWithTime(t);

      // Throttle audio element seek to ~20fps during fast dragging so audio engine doesn't stutter
      const now = performance.now();
      if (now - lastAudioSeekTimeRef.current > 50) {
        lastAudioSeekTimeRef.current = now;
        if (audioRef.current) {
          audioRef.current.currentTime = t;
        }
      }
    },
    [getTimeFromPointer, syncSceneWithTime]
  );

  const handlePointerUp = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      isDraggingRef.current = false;
      setIsDragging(false);

      const finalTime = getTimeFromPointer(e.clientX);
      setCurrentTime(finalTime);
      syncSceneWithTime(finalTime);

      if (audioRef.current) {
        audioRef.current.currentTime = finalTime;
      }

      if (wasPlayingRef.current) {
        handlePlay();
      }
    },
    [getTimeFromPointer, syncSceneWithTime, handlePlay]
  );

  // Bind native audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      stopRafLoop();
      setCurrentTime(duration);
      setActiveSceneIndex(BRAND_SCENES.length - 1);
    };
    const onTimeUpdate = () => {
      // Fallback update in case rAF is throttled
      const t = audio.currentTime;
      setCurrentTime(t);
      syncSceneWithTime(t);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      stopRafLoop();
    };
  }, [duration, stopRafLoop, syncSceneWithTime]);

  const activeScene = BRAND_SCENES[activeSceneIndex] || BRAND_SCENES[0];
  const effectiveTime = isDragging ? dragTime : currentTime;
  const progressRatio = duration > 0 ? Math.max(0, Math.min((effectiveTime / duration) * 100, 100)) : 0;

  return (
    <section
      id="brand-story"
      aria-label="Prajyot Infotech Brand Story Film"
      className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-brand-500/10 blur-[130px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[480px] h-[300px] bg-navy-500/10 blur-[110px] rounded-full"
      />

      {/* Hidden Master Audio Element */}
      <audio
        ref={audioRef}
        src={BRAND_STORY_AUDIO_URL}
        preload="metadata"
        playsInline
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Radio className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>AUTHENTIC BRAND FILM &bull; AUDIO-SYNCHRONIZED STORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How We Engineer Software{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-navy-700">
              Around Your Business
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium">
            Listen to the philosophy, engineering standards, and ground deployment principles that define every digital system we build.
          </p>
        </div>

        {/* ═══ MAIN FILM THEATRE CARD ═══ */}
        <div className="relative rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-brand-500/5 overflow-hidden transition-all">
          {/* Top Bar / Scene Navigation Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 bg-slate-50/90 border-b border-slate-200/80 text-xs">
            {/* Left: Brand Identity & Active Chapter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/videos/SingleLogo.png"
                  alt="Prajyot Infotech"
                  className="h-6 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="font-extrabold text-slate-900 tracking-tight">PRAJYOT INFOTECH</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1.5 font-mono font-bold text-brand-700 bg-brand-100/70 px-2.5 py-0.5 rounded-md">
                <span>SCENE {activeScene.chapter}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="truncate max-w-[130px] sm:max-w-none">{activeScene.tag}</span>
              </span>
            </div>

            {/* Right: Audio State Badge & Timer */}
            <div className="flex items-center gap-3 font-mono text-slate-600">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-xs">
                <VoiceEqualizer isPlaying={isPlaying} />
                <span className="text-[11px] font-bold text-slate-700">
                  {isPlaying ? "NARRATION LIVE" : hasStarted ? "PAUSED" : "1:48 MASTER AUDIO"}
                </span>
              </div>

              <div className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>

          {/* ═══ SCENE VISUAL VIEWPORT (16:9 / Dynamic Responsive Stage) ═══ */}
          <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-gradient-to-b from-white via-slate-50/40 to-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden">
            {/* INITIAL OVERLAY (Before User Hits Play) */}
            <AnimatePresence>
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="max-w-xl mx-auto space-y-6">
                    <div className="inline-flex items-center justify-center size-20 rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 text-brand-700 shadow-md shadow-brand-500/10">
                      <img
                        src="/videos/SingleLogo.png"
                        alt="Prajyot Infotech Logo"
                        className="h-10 w-auto object-contain"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-600">
                        PRAJYOT INFOTECH OFFICIAL FILM
                      </div>
                      <h3 className="mt-2 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        See How We Engineer Technology Around Your Business.
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                        1 minute and 48 seconds of pure company philosophy, architecture, ground deployments, and client IP ownership.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handlePlay}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 text-white font-bold text-base shadow-lg shadow-brand-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        <span>▶ PLAY BRAND STORY</span>
                      </button>

                      <button
                        onClick={() => {
                          handlePlay();
                          setIsMuted(true);
                          if (audioRef.current) audioRef.current.muted = true;
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        <VolumeX className="w-4 h-4 text-slate-500" />
                        <span>Watch Silently (Muted)</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                      Press Space anytime to Play/Pause &bull; Click timeline to seek
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LIVE SCENE RENDERING ENGINE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                {/* Scene Header */}
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-700 uppercase tracking-widest bg-brand-50 border border-brand-200/80 px-3 py-1 rounded-md mb-3">
                    <span>CHAPTER {activeScene.chapter}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span>{activeScene.tag}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                    {activeScene.headline}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    {activeScene.subtext}
                  </p>
                </div>

                {/* Dynamic Semantic Visual Content for Each Scene */}
                <div className="my-6 flex-1 flex items-center justify-center">
                  <SceneVisualRenderer sceneId={activeScene.id} onExploreLead={openLeadModal} />
                </div>

                {/* Subtitle / Narration Teleprompter Strip */}
                <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="size-2 rounded-full bg-brand-600 shrink-0 animate-pulse" />
                    <span className="italic text-slate-800 font-semibold leading-relaxed">
                      "{activeScene.narration}"
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 shrink-0">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ═══ SCRUBBABLE TIMELINE & CHAPTER TICKERS ═══ */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-5 sm:px-8 py-4">
            {/* Interactive Timeline Scrub Bar with Smooth Bidirectional Pointer Drag */}
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative py-3 cursor-grab active:cursor-grabbing select-none touch-none group mb-2"
              title="Click or drag smoothly forward / backward"
            >
              {/* Scrub Track Line */}
              <div className="relative h-3 bg-slate-200 group-hover:bg-slate-300/80 rounded-full overflow-hidden transition-colors">
                {/* Buffered / Progress Fill */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 rounded-full"
                  style={{ width: `${progressRatio}%` }}
                />

                {/* Scene Start Tick Markers */}
                {BRAND_SCENES.map((s) => {
                  const tickPercent = (s.start / (duration || TOTAL_DURATION)) * 100;
                  return (
                    <div
                      key={s.id}
                      style={{ left: `${tickPercent}%` }}
                      className="absolute top-0 bottom-0 w-[1.5px] bg-slate-300/90 pointer-events-none"
                    />
                  );
                })}
              </div>

              {/* Scrubber Knob with Instant 1:1 Tracking */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                style={{ left: `${progressRatio}%` }}
              >
                <div
                  className={`size-5 rounded-full bg-white border-2 border-brand-700 shadow-md flex items-center justify-center transition-transform ${
                    isDragging ? "scale-125 ring-4 ring-brand-500/25" : "group-hover:scale-125"
                  }`}
                >
                  <div className="size-1.5 rounded-full bg-brand-700" />
                </div>
              </div>

              {/* Live Scrub Tooltip while dragging */}
              {isDragging && (
                <div
                  className="absolute bottom-full mb-1 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-mono font-bold shadow-lg whitespace-nowrap z-30"
                  style={{ left: `${progressRatio}%` }}
                >
                  {formatTime(effectiveTime)} &bull; {activeScene.tag}
                </div>
              )}
            </div>

            {/* Player Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Play / Pause / Replay Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center size-10 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause audio story" : "Play audio story"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleReplay}
                  className="flex items-center justify-center size-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title="Replay from beginning"
                  aria-label="Replay audio story from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center size-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-slate-700" />
                  )}
                </button>

                <span className="ml-2 text-xs font-mono text-slate-500 font-semibold">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Quick Jump Buttons (Prev / Next Scene) */}
              <div className="flex items-center gap-1.5">
                <button
                  disabled={activeSceneIndex <= 0}
                  onClick={() => jumpToScene(activeSceneIndex - 1)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  &larr; Prev Scene
                </button>

                <button
                  disabled={activeSceneIndex >= BRAND_SCENES.length - 1}
                  onClick={() => jumpToScene(activeSceneIndex + 1)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next Scene &rarr;
                </button>

                <button
                  onClick={openLeadModal}
                  className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Build With Us</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Horizontal Mini Chapter Pill Carousel */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-1">
              {BRAND_SCENES.map((s, idx) => {
                const isActive = idx === activeSceneIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => jumpToScene(idx)}
                    className={`shrink-0 px-3 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-brand-700 text-white font-bold shadow-xs scale-102"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>{s.chapter}</span>
                    <span className="hidden md:inline">{s.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// COMPONENT: SceneVisualRenderer
// Rich, authentic visual compositions representing each narration beat
// ═════════════════════════════════════════════════════════════════════
function SceneVisualRenderer({ sceneId, onExploreLead }) {
  switch (sceneId) {
    // 01 — EVERY BUSINESS IS DIFFERENT
    case 1:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { title: "Construction", desc: "GPS muster, gang punch, site safety", icon: HardHat, color: "amber" },
            { title: "Retail & Electronics", desc: "IMEI barcode POS, job cards", icon: ShoppingCart, color: "blue" },
            { title: "Healthcare", desc: "Digital EHR, clinic tokens, WhatsApp", icon: Stethoscope, color: "rose" },
            { title: "Wholesale & Logistics", desc: "Multi-warehouse, e-way bills", icon: PackageCheck, color: "emerald" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
            >
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-3">
                <item.icon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-slate-900">{item.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    // 02 — WHY TEMPLATES?
    case 2:
      return (
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Rigid Template Card */}
          <div className="p-5 rounded-2xl border border-red-200 bg-red-50/40 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-red-700 mb-3">
              <span>RIGID OFF-THE-SHELF TEMPLATE</span>
              <span className="line-through">One Size Fits All</span>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2 rounded bg-white border border-red-100 line-through">Rigid data columns you can't edit</div>
              <div className="p-2 rounded bg-white border border-red-100 line-through">Monthly per-user licensing fees</div>
              <div className="p-2 rounded bg-white border border-red-100 line-through">Forced manual workarounds outside the software</div>
            </div>
          </div>

          {/* Custom Software Card */}
          <div className="p-5 rounded-2xl border-2 border-brand-500 bg-white shadow-lg relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-brand-600 text-white text-[10px] font-bold tracking-wider uppercase">
              Prajyot Engineering
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-700 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CUSTOM BUSINESS ARCHITECTURE</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div className="p-2 rounded bg-brand-50/60 border border-brand-100 flex items-center justify-between">
                <span>Direct Workflow Matching</span>
                <span className="text-emerald-700 font-bold">100% Fit</span>
              </div>
              <div className="p-2 rounded bg-brand-50/60 border border-brand-100 flex items-center justify-between">
                <span>Source Code & Database</span>
                <span className="text-brand-700 font-bold">You Own It</span>
              </div>
              <div className="p-2 rounded bg-brand-50/60 border border-brand-100 flex items-center justify-between">
                <span>Zero Seat Penalties</span>
                <span className="text-emerald-700 font-bold">Scale Freely</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 03 — PRAJYOT INFOTECH REVEAL
    case 3:
      return (
        <div className="w-full max-w-3xl p-6 rounded-3xl border border-slate-200 bg-white shadow-md text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-semibold mb-4">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ESTABLISHED 2018 &bull; PUNE, MAHARASHTRA</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/videos/SingleLogo.png"
              alt="Prajyot Infotech Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="text-left">
              <div className="text-xl font-black text-slate-900 tracking-tight">PRAJYOT INFOTECH</div>
              <div className="text-xs font-mono text-brand-700 font-bold">SOFTWARE ENGINEERING & PRODUCT STUDIO</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono text-slate-600">
            <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">Problem First</span>
            <span className="text-slate-400">&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">Deep Understanding</span>
            <span className="text-slate-400">&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">Bespoke Design</span>
            <span className="text-slate-400">&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 font-bold">Production System</span>
          </div>
        </div>
      );

    // 04 — FROM IDEA TO DIGITAL PRODUCT
    case 4:
      return (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {[
            { step: "01", label: "Business Need", detail: "Pain points, legacy bottlenecks, compliance requirements" },
            { step: "02", label: "User Journey", detail: "Figma wireframes, role permissions, approval flows" },
            { step: "03", label: "Architecture", detail: "Clean APIs, PostgreSQL ACID ledgers, WebSockets" },
            { step: "04", label: "Hardened Code", detail: "React, Node, test-driven validation, security protocols" },
            { step: "05", label: "Working Product", detail: "Deployed to cloud, zero-downtime, fully operational" },
          ].map((s, i) => (
            <div key={s.step} className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="text-xs font-mono font-bold text-brand-600 mb-1">{s.step}</div>
              <div className="text-sm font-bold text-slate-900">{s.label}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-snug">{s.detail}</div>
            </div>
          ))}
        </div>
      );

    // 05 — WHAT WE BUILD
    case 5:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: "Websites & Portals", desc: "Sub-1s loads, SEO, lead capture", tag: "Web" },
            { name: "E-Commerce Suites", desc: "Dual wholesale/retail, fuzzy search", tag: "B2B/B2C" },
            { name: "Mobile Applications", desc: "Android & iOS, offline GPS sync", tag: "Apps" },
            { name: "Enterprise ERP & CRM", desc: "GST e-way bills, multi-branch", tag: "ERP" },
            { name: "Inventory & POS", desc: "IMEI tracking, barcode scanner", tag: "Stock" },
            { name: "Workflow Automation", desc: "WhatsApp Cloud API, webhooks", tag: "Automate" },
          ].map((item) => (
            <div key={item.name} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-700 mb-1">
                <span>{item.tag}</span>
                <span className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-sm font-extrabold text-slate-900">{item.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      );

    // 06 — DESIGN + ENGINEERING + BUSINESS LOGIC
    case 6:
      return (
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/50 text-center">
            <div className="size-10 rounded-xl bg-white border border-purple-200 text-purple-700 flex items-center justify-center mx-auto mb-2 font-black text-sm">
              UX
            </div>
            <div className="font-extrabold text-sm text-slate-900">Design</div>
            <div className="text-xs text-slate-600 mt-1">Intuitive interfaces that any ground worker or executive can master immediately.</div>
          </div>

          <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 text-center">
            <div className="size-10 rounded-xl bg-white border border-blue-200 text-blue-700 flex items-center justify-center mx-auto mb-2 font-black text-sm">
              ENG
            </div>
            <div className="font-extrabold text-sm text-slate-900">Engineering</div>
            <div className="text-xs text-slate-600 mt-1">Fault-tolerant code, lightning response times, robust databases, zero bloat.</div>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center">
            <div className="size-10 rounded-xl bg-white border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-black text-sm">
              BIZ
            </div>
            <div className="font-extrabold text-sm text-slate-900">Business Logic</div>
            <div className="text-xs text-slate-600 mt-1">Tax laws, multi-tier approvals, inventory checks, financial reconciliation.</div>
          </div>
        </div>
      );

    // 07 — BEYOND DELIVERY
    case 7:
      return (
        <div className="w-full max-w-3xl p-6 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
            TRADITIONAL AGENCIES VS. PRAJYOT INFOTECH
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase">Typical Agency Model</div>
              <div className="text-sm font-semibold text-slate-700 mt-1">Dump code files in a ZIP &rarr; Disappear after final payment.</div>
              <div className="mt-2 text-xs text-red-500 font-semibold">&times; Zero user training &bull; High staff abandonment</div>
            </div>
            <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
              <div className="text-xs font-bold text-brand-700 uppercase">Prajyot Infotech Lifecycle</div>
              <div className="text-sm font-bold text-slate-900 mt-1">Deploy &rarr; Onboard Teams &rarr; Train on Site &rarr; Long-term Care.</div>
              <div className="mt-2 text-xs text-emerald-600 font-bold">&check; 100% System Adoption &bull; Guaranteed Warranty</div>
            </div>
          </div>
        </div>
      );

    // 08 — ON THE GROUND (DEPLOY, ONBOARD, TRAIN, SUPPORT)
    case 8:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { phase: "DEPLOY", title: "Cloud Launch", desc: "Zero-downtime server setup, domain DNS, and SSL security.", icon: Globe },
            { phase: "ONBOARD", title: "Team Rollout", desc: "Setting up role tiers, worker profiles, and initial data.", icon: Users },
            { phase: "TRAIN", title: "Onsite Training", desc: "Physical site visits to teach supervisors and laborers.", icon: GraduationCap },
            { phase: "SUPPORT", title: "60-Day Warranty", desc: "Guaranteed SLA, immediate bug fixes, and continuous health checks.", icon: ShieldCheck },
          ].map((item) => (
            <div key={item.phase} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">{item.phase}</span>
                <item.icon className="w-4 h-4 text-brand-600" />
              </div>
              <div className="font-bold text-sm text-slate-900">{item.title}</div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">{item.desc}</div>
            </div>
          ))}
        </div>
      );

    // 09 — REAL SOFTWARE HAS TO WORK WHERE REAL WORK HAPPENS
    case 9:
      return (
        <div className="w-full max-w-3xl p-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900 text-white text-center shadow-xl">
          <div className="size-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Compass className="w-6 h-6 text-brand-400" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            Real Software Has To Work Where Real Work Happens.
          </h4>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium">
            Not just in clean air-conditioned boardrooms — but on hot construction sites, crowded wholesale loading docks, busy billing counters, and fast-paced clinic corridors.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-mono">
            <span>OFFLINE FIRST &bull; ONE-TAP SIMPLICITY &bull; RUGGED RELIABILITY</span>
          </div>
        </div>
      );

    // 10 — OWNERSHIP (CODE, SYSTEMS, IP)
    case 10:
      return (
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
            <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2 text-brand-700">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-sm text-slate-900">Their Code</div>
            <div className="text-xs text-slate-500 mt-1">Full Git repo handover upon completion. Clean, well-documented architecture.</div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
            <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2 text-brand-700">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-sm text-slate-900">Their Systems</div>
            <div className="text-xs text-slate-500 mt-1">Hosted directly on your company's own cloud accounts. Never hostage to a provider.</div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
            <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2 text-brand-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-sm text-slate-900">Their IP</div>
            <div className="text-xs text-slate-500 mt-1">100% legal intellectual property transfer. You own your proprietary technology assets.</div>
          </div>
        </div>
      );

    // 11 — TECHNOLOGY THEY CAN TRULY OWN
    case 11:
      return (
        <div className="w-full max-w-3xl p-6 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
          <div className="text-xs font-mono font-bold text-brand-700 uppercase tracking-widest mb-3">
            ARCHITECTURAL AUTONOMY
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg font-black text-slate-900">BUILD</div>
              <div className="text-xs text-slate-500">Custom scoped to need</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-50 border border-brand-200">
              <div className="text-lg font-black text-brand-700">OWN</div>
              <div className="text-xs text-slate-600">Zero recurring seat tax</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg font-black text-slate-900">CONTROL</div>
              <div className="text-xs text-slate-500">Scale without limits</div>
            </div>
          </div>
        </div>
      );

    // 12 — INDUSTRIES
    case 12:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { name: "Construction", tag: "Oibuz HRMS & Muster", icon: HardHat },
            { name: "Retail & IMEI", tag: "POS & Repair Job Cards", icon: ShoppingCart },
            { name: "Healthcare", tag: "Clinic EHR & WhatsApp", icon: Stethoscope },
            { name: "Hospitality", tag: "QR Table Menus & KDS", icon: Utensils },
            { name: "Real Estate", tag: "90s Brochure Dispatch", icon: Building2 },
            { name: "Education", tag: "Student LMS & Fees", icon: GraduationCap },
            { name: "Wholesale", tag: "Multi-Warehouse ERP", icon: PackageCheck },
            { name: "Enterprise SaaS", tag: "Custom Cloud Platforms", icon: Zap },
          ].map((ind) => (
            <div key={ind.name} className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                <ind.icon className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="font-extrabold text-xs text-slate-900 truncate">{ind.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{ind.tag}</div>
              </div>
            </div>
          ))}
        </div>
      );

    // 13 — OIBUZ (PROPRIETARY PRODUCT)
    case 13:
      return (
        <div className="w-full max-w-3xl p-6 rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-100">
            <div className="flex items-center gap-3">
              <img
                src="/images/oibuz_logo.png"
                alt="Oibuz Logo"
                className="h-9 w-auto object-contain bg-white p-1 rounded-lg border border-amber-200 shadow-xs"
              />
              <div>
                <div className="font-black text-slate-900 text-lg">OIBUZ CONSTRUCTION HRMS</div>
                <div className="text-xs text-amber-800 font-mono font-bold">PROPRIETARY SAAS INNOVATION</div>
              </div>
            </div>

            <Link
              to="/products/hrms"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <span>Explore Oibuz</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-amber-200 font-bold text-slate-800">
              Face & GPS Geofence
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-amber-200 font-bold text-slate-800">
              30s Gang Punching
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-amber-200 font-bold text-slate-800">
              3-Tier Site Expenses
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-amber-200 font-bold text-slate-800">
              1-Click Bank Payroll
            </div>
          </div>
        </div>
      );

    // 14 — WHAT BUSINESSES CAN BECOME
    case 14:
      return (
        <div className="w-full max-w-3xl p-8 rounded-3xl border border-slate-200 bg-white shadow-md text-center">
          <div className="text-xs font-mono font-bold text-brand-600 uppercase tracking-widest mb-3">
            BEYOND WRITING CODE
          </div>
          <h4 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            We’re Here To Engineer What Businesses Can Become.
          </h4>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-medium">
            Transforming manual constraints into scalable operational speed, accountability, and commercial growth.
          </p>
        </div>
      );

    // 15 — FINAL BRAND REVEAL
    case 15:
    default:
      return (
        <div className="w-full max-w-3xl p-6 sm:p-8 rounded-3xl border border-brand-200 bg-gradient-to-br from-white via-brand-50/20 to-white shadow-xl text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="/videos/SingleLogo.png"
              alt="Prajyot Infotech Logo"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>

          <h4 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            PRAJYOT INFOTECH
          </h4>

          <p className="mt-2 text-base sm:text-lg font-bold text-brand-700">
            Software Engineered Around Your Business.
          </p>

          <p className="mt-1 text-xs text-slate-500 font-mono">
            Pune, Maharashtra • Serving Clients Across India & Worldwide
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreLead}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Get Free Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      );
  }
}
