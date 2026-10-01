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
  ExternalLink,
  Activity,
  Cpu,
  Database,
  Workflow,
  Scan,
  TrendingUp,
  Award,
  Server,
  Key,
  Eye,
  Flame,
  MapPin,
  Gauge
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

// Cinematic Director Soundwave Visualizer for teleprompter strip
function CinematicSoundwave({ isPlaying, className = "" }) {
  const bars = [40, 75, 100, 60, 85, 45, 90, 50];
  return (
    <div className={`inline-flex items-center gap-[2.5px] h-4 ${className}`} aria-hidden="true">
      {bars.map((maxH, i) => (
        <motion.span
          key={i}
          animate={
            isPlaying
              ? {
                  height: [`${Math.max(20, maxH * 0.2)}%`, `${maxH}%`, `${Math.max(15, maxH * 0.45)}%`],
                  opacity: [0.6, 1, 0.7]
                }
              : { height: "25%", opacity: 0.35 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.4 + (i % 4) * 0.12,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.05,
                }
              : { duration: 0.3 }
          }
          className="w-[2px] rounded-full bg-gradient-to-t from-brand-700 to-indigo-500 inline-block"
        />
      ))}
    </div>
  );
}

// Cinematic Director Mood Lighting per scene
function getSceneAmbientLighting(sceneId) {
  switch (sceneId) {
    case 1:
      return "radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.14), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.12), transparent 50%)";
    case 2:
      return "radial-gradient(ellipse at 15% 50%, rgba(239, 68, 68, 0.14), transparent 50%), radial-gradient(ellipse at 85% 50%, rgba(16, 185, 129, 0.16), transparent 50%)";
    case 3:
      return "radial-gradient(ellipse at 50% 35%, rgba(37, 99, 235, 0.18), transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(99, 102, 241, 0.12), transparent 50%)";
    case 4:
      return "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.16), transparent 60%), radial-gradient(ellipse at 10% 50%, rgba(59, 130, 246, 0.12), transparent 45%)";
    case 5:
      return "radial-gradient(ellipse at 30% 20%, rgba(14, 165, 233, 0.15), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.15), transparent 50%)";
    case 6:
      return "radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.14), transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(59, 130, 246, 0.14), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.14), transparent 50%)";
    case 7:
      return "radial-gradient(ellipse at 75% 50%, rgba(16, 185, 129, 0.16), transparent 55%), radial-gradient(ellipse at 25% 50%, rgba(239, 68, 68, 0.08), transparent 50%)";
    case 8:
      return "radial-gradient(ellipse at 50% 40%, rgba(245, 158, 11, 0.15), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(16, 185, 129, 0.12), transparent 50%)";
    case 9:
      return "radial-gradient(ellipse at 50% 40%, rgba(15, 23, 42, 0.95), transparent 80%), radial-gradient(ellipse at 20% 80%, rgba(245, 158, 11, 0.15), transparent 50%)";
    case 10:
    case 11:
      return "radial-gradient(ellipse at 50% 40%, rgba(16, 185, 129, 0.18), transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(37, 99, 235, 0.12), transparent 50%)";
    case 12:
      return "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(14, 165, 233, 0.12), transparent 50%)";
    case 13:
      return "radial-gradient(ellipse at 50% 40%, rgba(217, 119, 6, 0.22), transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(245, 158, 11, 0.14), transparent 50%)";
    case 14:
      return "radial-gradient(ellipse at 50% 30%, rgba(79, 70, 229, 0.22), transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(147, 51, 234, 0.14), transparent 50%)";
    case 15:
    default:
      return "radial-gradient(ellipse at 50% 30%, rgba(37, 99, 235, 0.22), transparent 65%), radial-gradient(ellipse at 50% 80%, rgba(99, 102, 241, 0.16), transparent 50%)";
  }
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

  // Real-time within-scene shot metronome (0% to 100%)
  const sceneDuration = Math.max(0.1, activeScene.end - activeScene.start);
  const sceneElapsed = Math.max(0, effectiveTime - activeScene.start);
  const sceneShotProgress = Math.max(0, Math.min((sceneElapsed / sceneDuration) * 100, 100));

  return (
    <section
      id="brand-story"
      aria-label="Prajyot Infotech Brand Story Film"
      className="relative py-12 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80 overflow-hidden"
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
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How We Engineer Software{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-navy-700">
              Around Your Business
            </span>
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Listen to the philosophy, engineering standards, and ground deployment principles that define every digital system we build.
          </p>
        </div>

        {/* ═══ MAIN FILM THEATRE CARD ═══ */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-brand-500/5 overflow-hidden transition-all">
          {/* Top Bar / Scene Navigation Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-8 py-2.5 sm:py-3.5 bg-slate-50/90 border-b border-slate-200/80 text-xs relative z-20">
            {/* Left: Brand Identity & Active Chapter */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img
                  src="/videos/SingleLogo.png"
                  alt="Prajyot Infotech"
                  className="h-5 sm:h-6 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="font-extrabold text-slate-900 tracking-tight text-xs sm:text-sm">PRAJYOT INFOTECH</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1 font-mono font-bold text-brand-700 bg-brand-100/70 px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs">
                <span>SCENE {activeScene.chapter}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="truncate max-w-[85px] sm:max-w-none">{activeScene.tag}</span>
              </span>
            </div>

            {/* Right: Audio State Badge & Timer */}
            <div className="flex items-center gap-2 sm:gap-3 font-mono text-slate-600 ml-auto sm:ml-0">
              <div className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-xs">
                <VoiceEqualizer isPlaying={isPlaying} />
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                  {isPlaying ? "VOICE LIVE" : hasStarted ? "PAUSED" : "1:48 AUDIO"}
                </span>
              </div>

              <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg">
                {formatTime(effectiveTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>

          {/* ═══ SCENE VISUAL VIEWPORT (16:9 / Dynamic Responsive Stage) ═══ */}
          <div className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] bg-gradient-to-b from-white via-slate-50/50 to-white flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden">
            {/* Real-time Shot Duration Metronome (Director's Progress Bar) */}
            <div className="absolute top-0 inset-x-0 h-1 bg-slate-100 z-20 overflow-hidden" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500"
                style={{ width: `${sceneShotProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Director's Dynamic Scene Mood Lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-all duration-1000 opacity-60 z-0"
              style={{
                background: getSceneAmbientLighting(activeScene.id)
              }}
            />

            {/* Subtle High-Tech Blueprint Matrix Dot Pattern */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px] z-0"
            />

            {/* INITIAL OVERLAY (Before User Hits Play) */}
            <AnimatePresence>
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 text-center"
                >
                  <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
                    <div className="inline-flex items-center justify-center size-14 sm:size-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 text-brand-700 shadow-md shadow-brand-500/10">
                      <img
                        src="/videos/SingleLogo.png"
                        alt="Prajyot Infotech Logo"
                        className="h-7 sm:h-10 w-auto object-contain"
                      />
                    </div>

                    <div>
                      <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-brand-600">
                        PRAJYOT INFOTECH OFFICIAL FILM
                      </div>
                      <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                        See How We Engineer Technology Around Your Business.
                      </h3>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                        1 minute and 48 seconds of pure company philosophy, architecture, ground deployments, and client IP ownership.
                      </p>
                    </div>

                    <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                      <button
                        onClick={handlePlay}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 text-white font-bold text-xs sm:text-base shadow-lg shadow-brand-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>▶ PLAY BRAND STORY</span>
                      </button>

                      <button
                        onClick={() => {
                          handlePlay();
                          setIsMuted(true);
                          if (audioRef.current) audioRef.current.muted = true;
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                        <span>Watch Silently (Muted)</span>
                      </button>
                    </div>

                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                      Press Space anytime to Play/Pause &bull; Drag timeline to seek
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LIVE SCENE RENDERING ENGINE (Cinematic Camera Push & Rack-Focus Transition) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: 0.98, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16, scale: 0.98, filter: "blur(3px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                {/* Scene Header */}
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-brand-700 uppercase tracking-widest bg-brand-50/90 backdrop-blur-xs border border-brand-200/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md mb-2 shadow-2xs">
                    <span>CHAPTER {activeScene.chapter}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span>{activeScene.tag}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                    {activeScene.headline}
                  </h3>

                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                    {activeScene.subtext}
                  </p>
                </div>

                {/* Dynamic Semantic Visual Content for Each Scene */}
                <div className="my-4 sm:my-6 flex-1 flex items-center justify-center">
                  <SceneVisualRenderer
                    sceneId={activeScene.id}
                    onExploreLead={openLeadModal}
                    sceneShotProgress={sceneShotProgress}
                    isPlaying={isPlaying}
                  />
                </div>

                {/* Subtitle / Narration Teleprompter Strip with Live Soundwave */}
                <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 font-medium overflow-hidden">
                    <CinematicSoundwave isPlaying={isPlaying} className="shrink-0" />
                    <span className="italic text-slate-900 font-semibold leading-relaxed text-[11px] sm:text-sm tracking-tight">
                      &ldquo;{activeScene.narration}&rdquo;
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600">
                      <Radio className="w-3 h-3 text-brand-600 animate-pulse" />
                      <span>MASTER VOICE</span>
                    </span>
                    <span className="text-slate-500 font-bold">{formatTime(effectiveTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ═══ SCRUBBABLE TIMELINE & CHAPTER TICKERS ═══ */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-3.5 sm:px-8 py-3.5 sm:py-4">
            {/* Interactive Timeline Scrub Bar with Smooth Bidirectional Pointer Drag */}
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative py-2.5 sm:py-3 cursor-grab active:cursor-grabbing select-none touch-none group mb-2"
              title="Click or drag smoothly forward / backward"
            >
              {/* Scrub Track Line */}
              <div className="relative h-2.5 sm:h-3 bg-slate-200 group-hover:bg-slate-300/80 rounded-full overflow-hidden transition-colors">
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
                  className={`size-4 sm:size-5 rounded-full bg-white border-2 border-brand-700 shadow-md flex items-center justify-center transition-transform ${
                    isDragging ? "scale-125 ring-4 ring-brand-500/25" : "group-hover:scale-125"
                  }`}
                >
                  <div className="size-1 sm:size-1.5 rounded-full bg-brand-700" />
                </div>
              </div>

              {/* Live Scrub Tooltip while dragging */}
              {isDragging && (
                <div
                  className="absolute bottom-full mb-1 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] sm:text-[11px] font-mono font-bold shadow-lg whitespace-nowrap z-30"
                  style={{ left: `${progressRatio}%` }}
                >
                  {formatTime(effectiveTime)} &bull; {activeScene.tag}
                </div>
              )}
            </div>

            {/* Player Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              {/* Play / Pause / Replay Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center size-9 sm:size-10 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause audio story" : "Play audio story"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleReplay}
                  className="flex items-center justify-center size-8 sm:size-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title="Replay from beginning"
                  aria-label="Replay audio story from start"
                >
                  <RotateCcw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </button>

                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center size-8 sm:size-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
                  )}
                </button>

                <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-slate-500 font-semibold">
                  {formatTime(effectiveTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Quick Jump Buttons (Prev / Next Scene) */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <button
                  disabled={activeSceneIndex <= 0}
                  onClick={() => jumpToScene(activeSceneIndex - 1)}
                  className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] sm:text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  &larr; Prev
                </button>

                <button
                  disabled={activeSceneIndex >= BRAND_SCENES.length - 1}
                  onClick={() => jumpToScene(activeSceneIndex + 1)}
                  className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] sm:text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next &rarr;
                </button>

                <button
                  onClick={openLeadModal}
                  className="ml-1.5 hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Build With Us</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Horizontal Mini Chapter Pill Carousel */}
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/70 overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-1">
              {BRAND_SCENES.map((s, idx) => {
                const isActive = idx === activeSceneIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => jumpToScene(idx)}
                    className={`shrink-0 px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? "bg-brand-700 text-white font-bold shadow-xs scale-102"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>{s.chapter}</span>
                    <span className="hidden sm:inline">{s.tag}</span>
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
// ═════════════════════════════════════════════════════════════════════
// COMPONENT: SceneVisualRenderer
// Master-directed, rich animative visual compositions representing each beat
// ═════════════════════════════════════════════════════════════════════
function SceneVisualRenderer({ sceneId, onExploreLead, sceneShotProgress = 0, isPlaying = false }) {
  switch (sceneId) {
    // 01 — EVERY BUSINESS IS DIFFERENT
    case 1:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
          {[
            {
              title: "Construction",
              desc: "GPS muster & site safety",
              icon: HardHat,
              badge: "● GPS Active",
              metric: "14 Sites",
              color: "amber"
            },
            {
              title: "Retail & IMEI",
              desc: "IMEI barcode POS & repair cards",
              icon: ShoppingCart,
              badge: "● Scan 0.2s",
              metric: "9,800+ Devices",
              color: "blue"
            },
            {
              title: "Healthcare",
              desc: "Digital EHR & clinic tokens",
              icon: Stethoscope,
              badge: "● WhatsApp OPD",
              metric: "Live Queue",
              color: "rose"
            },
            {
              title: "Logistics",
              desc: "Multi-depot & e-way bills",
              icon: PackageCheck,
              badge: "● Fleet Sync",
              metric: "GST Ready",
              color: "emerald"
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle top scanner line on hover */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="size-8 sm:size-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    <item.icon className="w-4 h-4 text-brand-700" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                    <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{item.badge}</span>
                  </span>
                </div>

                <div className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight group-hover:text-brand-700 transition-colors">
                  {item.title}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-snug">
                  {item.desc}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
                <span>METRIC</span>
                <span className="font-bold text-slate-700">{item.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      );

    // 02 — WHY TEMPLATES?
    case 2:
      return (
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-center">
          {/* Rigid Template Card (Stamped & Rejected) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-red-200/90 bg-red-50/40 relative overflow-hidden shadow-xs"
          >
            {/* The "REJECTED" Director Stamp */}
            <motion.div
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 0.9, rotate: -8 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 18 }}
              className="absolute top-4 right-3 z-10 pointer-events-none px-2 py-0.5 rounded border-2 border-red-600 bg-white/90 text-red-700 font-mono font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow-xs"
            >
              FORCED FIT
            </motion.div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-red-700 mb-3">
              <span className="line-through">OFF-THE-SHELF TEMPLATES</span>
            </div>

            <div className="space-y-2 text-[11px] sm:text-xs text-slate-600">
              <div className="p-2 rounded-lg bg-white/90 border border-red-100 flex items-center justify-between">
                <span className="line-through text-slate-500">Rigid columns you can't adapt</span>
                <span className="text-[10px] font-mono text-red-600 font-bold">&times; Stiff</span>
              </div>
              <div className="p-2 rounded-lg bg-white/90 border border-red-100 flex items-center justify-between">
                <span className="line-through text-slate-500">Per-user monthly licensing fees</span>
                <span className="text-[10px] font-mono text-red-600 font-bold">&times; Seat Tax</span>
              </div>
              <div className="p-2 rounded-lg bg-white/90 border border-red-100 flex items-center justify-between">
                <span className="line-through text-slate-500">Forced manual spreadsheet workarounds</span>
                <span className="text-[10px] font-mono text-red-600 font-bold">&times; Friction</span>
              </div>
            </div>
          </motion.div>

          {/* Custom Software Card (Illuminated & Verified) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-emerald-500/80 bg-white shadow-lg shadow-emerald-500/10 relative"
          >
            <div className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1">
              <Check className="w-2.5 h-2.5" />
              <span>Prajyot Engineering</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-emerald-700 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>BESPOKE BUSINESS ARCHITECTURE</span>
            </div>

            <div className="space-y-2 text-[11px] sm:text-xs text-slate-700 font-medium">
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <span>Direct Workflow Matching</span>
                <span className="text-emerald-700 font-bold font-mono">100% Fit</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <span>Source Code & Dedicated Database</span>
                <span className="text-brand-700 font-bold font-mono">You Own It</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <span>Zero Seat Penalties</span>
                <span className="text-emerald-700 font-bold font-mono">Scale Freely</span>
              </div>
            </div>
          </motion.div>
        </div>
      );

    // 03 — PRAJYOT INFOTECH REVEAL
    case 3:
      return (
        <div className="w-full max-w-3xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-brand-200/80 bg-white/95 backdrop-blur-md shadow-lg shadow-brand-500/10 text-center relative overflow-hidden">
          {/* Animated Concentric Radar Pulse Waves Behind Brand Crest */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
              className="size-36 rounded-full border border-brand-400"
            />
            <motion.div
              animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, delay: 0.6, ease: "easeOut" }}
              className="size-36 rounded-full border border-indigo-400 absolute inset-0"
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] sm:text-xs font-mono font-semibold mb-3 border border-slate-200/80">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ESTABLISHED 2018 &bull; PUNE, MAHARASHTRA &bull; GLOBAL CLIENTS</span>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="p-2 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-200/70 shadow-xs">
                <img
                  src="/videos/SingleLogo.png"
                  alt="Prajyot Infotech Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">PRAJYOT INFOTECH</div>
                <div className="text-[10px] sm:text-xs font-mono text-brand-700 font-bold">SOFTWARE ENGINEERING & PRODUCT STUDIO</div>
              </div>
            </div>

            {/* Kinetic 4-Phase Pipeline Wire */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 text-[10px] sm:text-xs font-mono text-slate-600">
              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">Problem First</span>
              <span className="text-brand-500 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">Deep Understanding</span>
              <span className="text-brand-500 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">Bespoke Design</span>
              <span className="text-brand-500 font-bold">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold shadow-xs">
                Production Engine
              </span>
            </div>
          </div>
        </div>
      );

    // 04 — FROM IDEA TO DIGITAL PRODUCT (Active Conveyor Beam)
    case 4: {
      const activeStepIdx = Math.min(4, Math.floor((sceneShotProgress / 100) * 5));
      const steps = [
        { step: "01", label: "Business Need", detail: "Ground audits & pain points", icon: Activity },
        { step: "02", label: "User Journey", detail: "Figma UX & approval flows", icon: Workflow },
        { step: "03", label: "Architecture", detail: "Clean APIs & PostgreSQL ACID", icon: Database },
        { step: "04", label: "Hardened Code", detail: "React, Node, test security", icon: Code2 },
        { step: "05", label: "Working Product", detail: "Cloud deployed & operational", icon: CheckCircle2 },
      ];

      return (
        <div className="w-full max-w-4xl space-y-2.5">
          {/* Animated Laser Runner Track */}
          <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-400 transition-all duration-150"
              style={{ width: `${Math.max(15, sceneShotProgress)}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            {steps.map((s, i) => {
              const isCurrent = i === activeStepIdx;
              return (
                <div
                  key={s.step}
                  className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all ${
                    isCurrent
                      ? "border-brand-500 bg-brand-50/70 shadow-sm ring-2 ring-brand-500/20 scale-102"
                      : "border-slate-200 bg-white/90 shadow-2xs"
                  } ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600">{s.step}</span>
                    <s.icon className={`w-3.5 h-3.5 ${isCurrent ? "text-brand-600" : "text-slate-400"}`} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{s.label}</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">{s.detail}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 05 — WHAT WE BUILD (High-Performance Modular Suite)
    case 5:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {[
            { name: "Websites & Portals", desc: "< 0.8s LCP, SEO, lead capture", tag: "WEB", icon: Globe },
            { name: "E-Commerce Platforms", desc: "Dual wholesale/retail, stock sync", tag: "B2B/B2C", icon: ShoppingCart },
            { name: "Mobile Applications", desc: "Android & iOS, offline GPS sync", tag: "MOBILE", icon: Smartphone },
            { name: "Enterprise ERP & CRM", desc: "GST e-way bills, multi-branch", tag: "ENTERPRISE", icon: Building2 },
            { name: "Inventory & POS", desc: "IMEI barcode, instant invoicing", tag: "STOCK", icon: PackageCheck },
            { name: "Workflow Automation", desc: "WhatsApp Cloud API, webhooks", tag: "AUTOMATE", icon: Zap },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="p-3 sm:p-3.5 rounded-xl border border-slate-200/90 bg-white/95 shadow-xs hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-brand-700 mb-1">
                <span className="flex items-center gap-1">
                  <item.icon className="w-3 h-3 text-brand-600" />
                  <span>{item.tag}</span>
                </span>
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">{item.name}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-tight">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      );

    // 06 — DESIGN + ENGINEERING + BUSINESS LOGIC (The Triad Orbital)
    case 6:
      return (
        <div className="w-full max-w-3xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-200 bg-purple-50/50 text-center relative overflow-hidden shadow-xs">
              <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-white border border-purple-200 text-purple-700 flex items-center justify-center mx-auto mb-1.5 font-black text-xs sm:text-sm shadow-2xs">
                UX
              </div>
              <div className="font-extrabold text-xs sm:text-sm text-slate-900">Design</div>
              <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
                Intuitive interfaces that any ground worker or executive can master immediately.
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-200 bg-blue-50/50 text-center relative overflow-hidden shadow-xs">
              <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-white border border-blue-200 text-blue-700 flex items-center justify-center mx-auto mb-1.5 font-black text-xs sm:text-sm shadow-2xs">
                ENG
              </div>
              <div className="font-extrabold text-xs sm:text-sm text-slate-900">Engineering</div>
              <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
                Fault-tolerant code, lightning response times, robust databases, zero bloat.
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center relative overflow-hidden shadow-xs">
              <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-white border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-1.5 font-black text-xs sm:text-sm shadow-2xs">
                BIZ
              </div>
              <div className="font-extrabold text-xs sm:text-sm text-slate-900">Business Logic</div>
              <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
                Tax laws, multi-tier approvals, inventory checks, financial reconciliation.
              </div>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900 text-white text-center text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-xs">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>THE PRAJYOT TRIAD: ZERO-COMPROMISE PRODUCTION SYSTEM</span>
          </div>
        </div>
      );

    // 07 — BEYOND DELIVERY
    case 7:
      return (
        <div className="w-full max-w-3xl p-4 sm:p-6 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xs shadow-sm text-center">
          <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5 sm:mb-3">
            TRADITIONAL AGENCIES VS. PRAJYOT INFOTECH
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-left">
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Typical Agency Model</span>
                <span className="text-red-500 font-mono">Discontinued</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1.5">
                Dump code files in a ZIP &rarr; Disappear after final invoice payment.
              </div>
              <div className="mt-2 text-[11px] sm:text-xs text-red-500 font-semibold flex items-center gap-1">
                <span>&times; Zero staff onboarding &bull; High system abandonment</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-2xs">
              <div className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase flex items-center justify-between">
                <span>Prajyot Infotech Lifecycle</span>
                <span className="text-emerald-700 font-mono font-bold">100% Care</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5">
                Deploy &rarr; Onboard Teams &rarr; Train on Site &rarr; Long-term Care.
              </div>
              <div className="mt-2 text-[11px] sm:text-xs text-emerald-700 font-bold flex items-center gap-1">
                <span>&check; 100% System Adoption &bull; Guaranteed SLA Warranty</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 08 — ON THE GROUND (DEPLOY, ONBOARD, TRAIN, SUPPORT)
    case 8: {
      const activePhaseIdx = Math.min(3, Math.floor((sceneShotProgress / 100) * 4));
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {[
            { phase: "DEPLOY", title: "Cloud Launch", desc: "Zero-downtime servers & SSL A+.", icon: Globe },
            { phase: "ONBOARD", title: "Team Rollout", desc: "Role tiers & initial staff records.", icon: Users },
            { phase: "TRAIN", title: "Onsite Training", desc: "Physical site visits & tablet coaching.", icon: GraduationCap },
            { phase: "SUPPORT", title: "60-Day Warranty", desc: "Guaranteed SLA & bug fix coverage.", icon: ShieldCheck },
          ].map((item, idx) => {
            const isHighlight = idx === activePhaseIdx;
            return (
              <div
                key={item.phase}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                  isHighlight
                    ? "border-amber-400 bg-amber-50/60 shadow-sm ring-2 ring-amber-400/20 scale-102"
                    : "border-slate-200 bg-white/90 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isHighlight ? "bg-amber-500 text-white" : "text-brand-700 bg-brand-50"
                  }`}>
                    {item.phase}
                  </span>
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-600" />
                </div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">{item.title}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-snug">{item.desc}</div>
              </div>
            );
          })}
        </div>
      );
    }

    // 09 — REAL SOFTWARE HAS TO WORK WHERE REAL WORK HAPPENS (Cinematic Dark Stage)
    case 9:
      return (
        <div className="w-full max-w-3xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Radar Beacon Sweep in Background */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 blur-3xl pointer-events-none" />

          <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xs">
            <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-brand-400 animate-pulse" />
          </div>

          <h4 className="text-xl sm:text-3xl font-black tracking-tight leading-snug text-white">
            Real Software Has To Work Where Real Work Happens.
          </h4>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs">
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <HardHat className="w-3 h-3" /> Construction
              </div>
              <div className="text-slate-400 mt-0.5 text-[9px] sm:text-[10px]">Dusty site GPS check</div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs">
              <div className="font-bold text-blue-300 flex items-center gap-1">
                <PackageCheck className="w-3 h-3" /> Wholesale
              </div>
              <div className="text-slate-400 mt-0.5 text-[9px] sm:text-[10px]">Noisy dock scanner</div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs">
              <div className="font-bold text-emerald-300 flex items-center gap-1">
                <ShoppingCart className="w-3 h-3" /> Retail
              </div>
              <div className="text-slate-400 mt-0.5 text-[9px] sm:text-[10px]">Fast billing counters</div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs">
              <div className="font-bold text-rose-300 flex items-center gap-1">
                <Stethoscope className="w-3 h-3" /> Clinics
              </div>
              <div className="text-slate-400 mt-0.5 text-[9px] sm:text-[10px]">OPD queue tokens</div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-[10px] sm:text-xs font-mono">
            <span>OFFLINE FIRST &bull; HIGH CONTRAST &bull; ZERO LATENCY</span>
          </div>
        </div>
      );

    // 10 — OWNERSHIP (CODE, SYSTEMS, IP)
    case 10:
      return (
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/95 shadow-sm text-center"
          >
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-1.5 text-brand-700">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-900">Your Code</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
              Full Git repo handover upon completion. Clean, well-documented architecture.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/95 shadow-sm text-center"
          >
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-1.5 text-brand-700">
              <Server className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-900">Your Systems</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
              Hosted directly on your company's own cloud accounts. Never locked in.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/95 shadow-sm text-center"
          >
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-1.5 text-brand-700">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-900">Your IP</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
              100% legal intellectual property transfer. You own your proprietary technology.
            </div>
          </motion.div>
        </div>
      );

    // 11 — TECHNOLOGY THEY CAN TRULY OWN
    case 11:
      return (
        <div className="w-full max-w-3xl p-4 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
          <div className="text-[10px] sm:text-xs font-mono font-bold text-brand-700 uppercase tracking-widest mb-2 sm:mb-3">
            ARCHITECTURAL SOVEREIGNTY
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-sm sm:text-xl font-black text-slate-900">BUILD</div>
              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Custom scoped to need</div>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-sm sm:text-xl font-black text-emerald-700">OWN</div>
              <div className="text-[10px] sm:text-xs text-emerald-800 font-medium mt-0.5">Zero recurring seat tax</div>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-sm sm:text-xl font-black text-slate-900">CONTROL</div>
              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Scale without limits</div>
            </div>
          </div>
        </div>
      );

    // 12 — INDUSTRIES
    case 12:
      return (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {[
            { name: "Construction", tag: "Oibuz HRMS & Muster", icon: HardHat },
            { name: "Retail & IMEI", tag: "POS & Repair Job Cards", icon: ShoppingCart },
            { name: "Healthcare", tag: "Clinic EHR & WhatsApp", icon: Stethoscope },
            { name: "Hospitality", tag: "QR Table Menus & KDS", icon: Utensils },
            { name: "Real Estate", tag: "Brochure Dispatch", icon: Building2 },
            { name: "Education", tag: "Student LMS & Fees", icon: GraduationCap },
            { name: "Wholesale", tag: "Multi-Warehouse ERP", icon: PackageCheck },
            { name: "Custom SaaS", tag: "Custom Cloud Platforms", icon: Zap },
          ].map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white/95 shadow-2xs flex items-center gap-2 sm:gap-2.5 hover:border-brand-300"
            >
              <div className="size-7 sm:size-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                <ind.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="font-extrabold text-[11px] sm:text-xs text-slate-900 truncate">{ind.name}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 truncate">{ind.tag}</div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    // 13 — OIBUZ (PROPRIETARY PRODUCT)
    case 13:
      return (
        <div className="w-full max-w-3xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/40 shadow-xl relative overflow-hidden">
          {/* Animated Geofence Radar Pulse */}
          <div className="absolute -top-10 -right-10 pointer-events-none opacity-40">
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
              className="size-32 rounded-full border border-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-amber-100 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/images/oibuz_logo.png"
                alt="Oibuz Logo"
                className="h-8 sm:h-10 w-auto object-contain bg-white p-1 rounded-lg border border-amber-200 shadow-xs"
              />
              <div>
                <div className="font-black text-slate-900 text-sm sm:text-lg">OIBUZ CONSTRUCTION HRMS</div>
                <div className="text-[10px] sm:text-xs text-amber-800 font-mono font-bold">OUR PROPRIETARY SAAS SUITE</div>
              </div>
            </div>

            <Link
              to="/products/hrms"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] sm:text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>Explore Oibuz</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs relative z-10">
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-amber-200 font-bold text-slate-800 shadow-2xs">
              Face & GPS Geofence
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-amber-200 font-bold text-slate-800 shadow-2xs">
              30s Gang Punching
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-amber-200 font-bold text-slate-800 shadow-2xs">
              3-Tier Site Expenses
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-amber-200 font-bold text-slate-800 shadow-2xs">
              1-Click Bank Payroll
            </div>
          </div>
        </div>
      );

    // 14 — WHAT BUSINESSES CAN BECOME
    case 14:
      return (
        <div className="w-full max-w-3xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 shadow-lg text-center relative overflow-hidden">
          <div className="text-[10px] sm:text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest mb-2 sm:mb-3">
            BEYOND WRITING CODE
          </div>
          <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            We’re Here To Engineer What Businesses Can Become.
          </h4>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
            Transforming manual constraints into scalable operational speed, accountability, and commercial growth.
          </p>
        </div>
      );

    // 15 — FINAL BRAND REVEAL
    case 15:
    default:
      return (
        <div className="w-full max-w-3xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-brand-300 bg-gradient-to-br from-white via-brand-50/30 to-indigo-50/20 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Ambient Halo */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 relative z-10">
            <div className="p-2.5 rounded-2xl bg-white border border-brand-200 shadow-xs">
              <img
                src="/videos/SingleLogo.png"
                alt="Prajyot Infotech Logo"
                className="h-10 sm:h-14 w-auto object-contain"
              />
            </div>
          </div>

          <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight relative z-10">
            PRAJYOT INFOTECH
          </h4>

          <p className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-bold text-brand-700 relative z-10">
            Software Engineered Around Your Business.
          </p>

          <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-mono relative z-10">
            Pune, Maharashtra • Serving Clients Across India & Worldwide
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 relative z-10">
            <button
              onClick={onExploreLead}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 hover:from-brand-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Free Project Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-all"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      );
  }
}
