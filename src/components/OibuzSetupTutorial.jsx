// src/components/OibuzSetupTutorial.jsx
// OIBUZ — Bilingual Audio-Synchronized Account Setup Interactive Tutorial (EN + हिंदी)
// v2 — Enhanced UX: cinematic caption bar, animated scenes, step progress, confetti ring, typing effect
// Master Clock: audio.currentTime (Zero-drift requestAnimationFrame + bidirectional pointer scrubbing)
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Mail,
  MailCheck,
  Globe,
  Building2,
  User,
  KeyRound,
  Clock,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Languages,
  Radio,
  Headphones,
  MousePointerClick,
  Settings,
  Users,
  HardHat,
  Gauge,
  FolderSearch,
  Timer,
  ChevronRight,
  Zap,
  Star,
  Trophy,
  BadgeCheck,
  Keyboard,
} from "lucide-react";
import {
  TUTORIAL_LANGUAGES,
  resolveCrossLanguageSceneIndex,
} from "./OibuzSetupTutorialData.js";
import { getOibuzRegisterUrl, trackOibuzTrialClick } from "../utils/oibuzLinks.js";

const EASE = [0.16, 1, 0.3, 1];
const SPEED_OPTIONS = [1, 1.25, 1.5];

function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function hasReachedPhase(beats = [], currentPhase, targetPhase) {
  const currentIdx = beats.findIndex((b) => b.phase === currentPhase);
  const targetIdx = beats.findIndex((b) => b.phase === targetPhase);
  if (currentIdx === -1 || targetIdx === -1) return false;
  return currentIdx >= targetIdx;
}

/* ── Live Voice Equalizer ── */
function VoiceEqualizer({ isPlaying, barCount = 4, className = "" }) {
  return (
    <div className={`inline-flex items-end gap-[2px] h-3.5 ${className}`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          animate={isPlaying ? { height: ["20%", "100%", "45%", "85%", "30%"] } : { height: "28%" }}
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
          className="w-[2.5px] rounded-full bg-blue-600 inline-block"
        />
      ))}
    </div>
  );
}

/* ── Cinematic Caption Soundwave ── */
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
                  opacity: [0.6, 1, 0.7],
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
          className="w-[2px] rounded-full bg-gradient-to-t from-blue-700 to-emerald-500 inline-block"
        />
      ))}
    </div>
  );
}

/* ── Confetti Ring (for verified-trial scene) ── */
function ConfettiRing({ active }) {
  const dots = [
    { color: "#10b981", size: 7, angle: 0 },
    { color: "#2563eb", size: 5, angle: 45 },
    { color: "#f59e0b", size: 6, angle: 90 },
    { color: "#8b5cf6", size: 5, angle: 135 },
    { color: "#10b981", size: 7, angle: 180 },
    { color: "#ef4444", size: 5, angle: 225 },
    { color: "#2563eb", size: 6, angle: 270 },
    { color: "#f59e0b", size: 5, angle: 315 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const r = active ? 48 : 20;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <motion.div
            key={i}
            animate={
              active
                ? {
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: [0, 1, 0.8],
                    scale: [0, 1.2, 1],
                  }
                : { left: "50%", top: "50%", opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ width: d.size, height: d.size, backgroundColor: d.color }}
          />
        );
      })}
    </div>
  );
}

/* ── Typing Animation Text ── */
function TypingText({ text, active, className = "" }) {
  const [displayed, setDisplayed] = useState(active ? text : "");
  const prevActiveRef = useRef(active);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    if (!prevActiveRef.current && active) {
      setDisplayed("");
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 38);
      return () => clearInterval(interval);
    } else {
      setDisplayed(text);
    }
    prevActiveRef.current = active;
  }, [active, text]);

  return <span className={className}>{displayed}<span className={`inline-block w-[1.5px] h-[1em] bg-current align-middle ml-0.5 ${active && displayed.length < text.length ? "opacity-100 animate-pulse" : "opacity-0"}`} /></span>;
}

/* ── Shimmer skeleton ── */
function Shimmer({ className = "" }) {
  return (
    <div className={`animate-pulse rounded bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%] ${className}`}
      style={{ animation: "shimmer 1.5s infinite", backgroundSize: "200% 100%" }}
    />
  );
}

/* ── Dynamic Mood Lighting per visualKey ── */
function getSceneAmbientLighting(visualKey) {
  switch (visualKey) {
    case "open-register":
    case "verified-trial":
    case "launch-ready":
      return "radial-gradient(ellipse at 75% 25%, rgba(16, 185, 129, 0.16), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(37, 99, 235, 0.12), transparent 55%)";
    case "email-prep":
      return "radial-gradient(ellipse at 20% 40%, rgba(16, 185, 129, 0.14), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(239, 68, 68, 0.10), transparent 50%)";
    case "step1-workspace":
    case "step2-credentials":
      return "radial-gradient(ellipse at 50% 35%, rgba(37, 99, 235, 0.16), transparent 60%), radial-gradient(ellipse at 85% 85%, rgba(79, 70, 229, 0.12), transparent 55%)";
    case "verify-pending":
      return "radial-gradient(ellipse at 30% 30%, rgba(245, 158, 11, 0.16), transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(37, 99, 235, 0.12), transparent 50%)";
    case "signin-dashboard":
      return "radial-gradient(ellipse at 50% 30%, rgba(15, 31, 61, 0.14), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(16, 185, 129, 0.14), transparent 50%)";
    case "pro-tips":
      return "radial-gradient(ellipse at 35% 30%, rgba(124, 58, 237, 0.14), transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(37, 99, 235, 0.12), transparent 50%)";
    case "intro":
    default:
      return "radial-gradient(ellipse at 50% 30%, rgba(37, 99, 235, 0.18), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(16, 185, 129, 0.12), transparent 50%)";
  }
}

/* ── Reusable Simulated Browser Frame ── */
function BrowserMockup({ url, badge, children, className = "" }) {
  return (
    <div className={`w-full rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/8 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#0f1f3d] text-white">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="size-2.5 rounded-full bg-rose-400/85" />
          <span className="size-2.5 rounded-full bg-amber-400/85" />
          <span className="size-2.5 rounded-full bg-emerald-400/85" />
        </div>
        <div className="flex-1 mx-2 bg-slate-800/90 border border-white/10 rounded-md px-2.5 py-1 flex items-center gap-1.5 min-w-0">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono text-slate-200 truncate">{url}</span>
        </div>
        {badge && (
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-blue-500/20 border border-blue-400/30 text-[10px] font-mono font-bold text-blue-200 shrink-0">
            {badge}
          </span>
        )}
      </div>
      <div className="p-3.5 sm:p-5 bg-gradient-to-b from-slate-50/70 to-white">{children}</div>
    </div>
  );
}

/* ── Guided Animated Click Pointer ── */
function GuidedPointer({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: [1, 0.92, 1] }}
      transition={{ duration: 0.45, ease: EASE }}
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-lg border border-white/20 pointer-events-none"
    >
      <MousePointerClick className="w-3 h-3 text-emerald-400" />
      <span>{label}</span>
    </motion.div>
  );
}

/* ── Keyboard shortcut badge ── */
function KbdBadge({ children }) {
  return (
    <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[9px] font-mono font-bold border border-slate-300/80 shadow-xs">
      {children}
    </kbd>
  );
}

/* ── Progress ring (SVG) ── */
function ProgressRing({ pct, size = 36, strokeWidth = 3, color = "#2563eb" }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * Math.min(1, Math.max(0, pct / 100));
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
    </svg>
  );
}

/* ═════════════════════════════════════════════════════════════════════════════
   MAIN INTERACTIVE TUTORIAL COMPONENT
═════════════════════════════════════════════════════════════════════════════ */
export default function OibuzSetupTutorial({
  onDemoClick,
  id = "setup-tutorial",
  language: controlledLanguage,
  onLanguageChange,
  externalJumpRequest,
  guidePageUrl,
  compactHeader = false,
}) {
  const prefersReducedMotion = useReducedMotion();

  const [internalLanguage, setInternalLanguage] = useState("en");
  const language = controlledLanguage ?? internalLanguage;
  const setLanguageState = useCallback(
    (nextLang) => {
      if (controlledLanguage === undefined) {
        setInternalLanguage(nextLang);
      }
      onLanguageChange?.(nextLang);
    },
    [controlledLanguage, onLanguageChange]
  );

  const langData = TUTORIAL_LANGUAGES[language] || TUTORIAL_LANGUAGES.en;
  const scenes = langData.scenes;
  const ui = langData.ui;

  // Core Playback State
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(langData.duration);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [showKbdHint, setShowKbdHint] = useState(false);

  // Scrubbing State
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const isDraggingRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const lastAudioSeekTimeRef = useRef(0);
  const pendingSwitchRef = useRef(null);
  const prevLangRef = useRef(language);
  const handledExternLangChangeRef = useRef(false);

  const trackRef = useRef(null);
  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const stageShellRef = useRef(null);

  const syncSceneWithTime = useCallback(
    (time, targetScenes = scenes) => {
      const idx = targetScenes.findIndex((s) => time >= s.start && time < s.end);
      if (idx !== -1) {
        setActiveSceneIndex(idx);
      } else if (targetScenes.length > 0 && time >= targetScenes[targetScenes.length - 1].start) {
        setActiveSceneIndex(targetScenes.length - 1);
      }
    },
    [scenes]
  );

  const stopRafLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

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

  const handlePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasStarted(true);
    setAudioError(null);
    audio.playbackRate = playbackRate;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        startRafLoop();
      })
      .catch((err) => {
        console.warn("Tutorial audio play prevented:", err);
        setIsPlaying(false);
        setAudioError("Tap Play again to start audio");
      });
  }, [playbackRate, startRafLoop]);

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

  const cycleSpeed = useCallback(() => {
    setPlaybackRate((prev) => {
      const idx = SPEED_OPTIONS.indexOf(prev);
      const next = SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
      if (audioRef.current) {
        audioRef.current.playbackRate = next;
      }
      return next;
    });
  }, []);

  const handleSeek = useCallback(
    (targetTime) => {
      const maxDur = duration || langData.duration;
      const clamped = Math.max(0, Math.min(targetTime, maxDur));
      if (audioRef.current) {
        audioRef.current.currentTime = clamped;
      }
      setCurrentTime(clamped);
      syncSceneWithTime(clamped);
      if (!hasStarted) setHasStarted(true);
    },
    [duration, langData.duration, hasStarted, syncSceneWithTime]
  );

  const jumpToScene = useCallback(
    (sceneIdx) => {
      const targetScene = scenes[sceneIdx];
      if (!targetScene) return;
      handleSeek(targetScene.start + 0.05);
      if (!isPlaying) {
        handlePlay();
      }
    },
    [scenes, handleSeek, isPlaying, handlePlay]
  );

  // Switch between English and Hindi while keeping the user on the same tutorial step
  const handleSwitchLanguage = useCallback(
    (nextLang) => {
      if (nextLang === language || !TUTORIAL_LANGUAGES[nextLang]) return;

      const currentScene = scenes[activeSceneIndex] || scenes[0];
      const nextData = TUTORIAL_LANGUAGES[nextLang];
      const targetIdx = hasStarted
        ? resolveCrossLanguageSceneIndex(currentScene.visualKey, nextLang)
        : 0;
      const targetScene = nextData.scenes[targetIdx] || nextData.scenes[0];
      const targetTime = hasStarted ? targetScene.start + 0.05 : 0;

      const wasPlaying = isPlaying;
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      stopRafLoop();
      setIsPlaying(false);

      pendingSwitchRef.current = {
        time: targetTime,
        autoPlay: wasPlaying,
        muted: isMuted,
        rate: playbackRate,
      };

      handledExternLangChangeRef.current = true;
      setLanguageState(nextLang);
      setDuration(nextData.duration);
      setActiveSceneIndex(targetIdx);
      setCurrentTime(targetTime);
      setAudioError(null);
    },
    [language, scenes, activeSceneIndex, hasStarted, isPlaying, isMuted, playbackRate, stopRafLoop, setLanguageState]
  );

  // Sync if controlledLanguage prop is changed externally from a parent page
  useEffect(() => {
    if (prevLangRef.current === language) return;
    const prevLang = prevLangRef.current;
    prevLangRef.current = language;

    if (handledExternLangChangeRef.current) {
      handledExternLangChangeRef.current = false;
      return;
    }

    const prevScenes = TUTORIAL_LANGUAGES[prevLang]?.scenes || scenes;
    const currentScene = prevScenes[activeSceneIndex] || prevScenes[0];
    const nextData = TUTORIAL_LANGUAGES[language] || TUTORIAL_LANGUAGES.en;
    const targetIdx = hasStarted
      ? resolveCrossLanguageSceneIndex(currentScene?.visualKey, language)
      : 0;
    const targetScene = nextData.scenes[targetIdx] || nextData.scenes[0];
    const targetTime = hasStarted ? targetScene.start + 0.05 : 0;

    const wasPlaying = isPlaying;
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    stopRafLoop();
    setIsPlaying(false);

    pendingSwitchRef.current = {
      time: targetTime,
      autoPlay: wasPlaying,
      muted: isMuted,
      rate: playbackRate,
    };
    setDuration(nextData.duration);
    setActiveSceneIndex(targetIdx);
    setCurrentTime(targetTime);
    setAudioError(null);
  }, [language, scenes, activeSceneIndex, hasStarted, isPlaying, isMuted, playbackRate, stopRafLoop]);

  // Allow parent Setup Guide page step cards to jump directly to a scene
  useEffect(() => {
    if (!externalJumpRequest?.visualKey) return;
    const idx = resolveCrossLanguageSceneIndex(externalJumpRequest.visualKey, language);
    if (idx !== -1) {
      jumpToScene(idx);
      stageShellRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalJumpRequest?.seq]);

  // Sync audio metadata, speed, mute, and pending language-switch seeks
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.playbackRate = playbackRate;

    const applyPendingSwitch = () => {
      const pending = pendingSwitchRef.current;
      if (!pending) return;
      pendingSwitchRef.current = null;
      audio.currentTime = pending.time;
      audio.muted = pending.muted;
      audio.playbackRate = pending.rate;
      setCurrentTime(pending.time);
      syncSceneWithTime(pending.time);
      if (pending.autoPlay) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            startRafLoop();
          })
          .catch(() => setIsPlaying(false));
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      applyPendingSwitch();
    };

    const onCanPlay = () => {
      applyPendingSwitch();
    };

    const onTimeUpdate = () => {
      if (!isDraggingRef.current && !pendingSwitchRef.current) {
        const t = audio.currentTime;
        setCurrentTime(t);
        syncSceneWithTime(t);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      stopRafLoop();
      const endDur = audio.duration && !isNaN(audio.duration) ? audio.duration : langData.duration;
      setCurrentTime(endDur);
      setActiveSceneIndex(scenes.length - 1);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      stopRafLoop();
    };
  }, [language, langData.duration, scenes.length, isMuted, playbackRate, startRafLoop, stopRafLoop, syncSceneWithTime]);

  // Pointer drag scrubber
  const getTimeFromPointer = useCallback(
    (clientX) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      return ratio * (duration || langData.duration);
    },
    [duration, langData.duration]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (!hasStarted) setHasStarted(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Pointer capture unavailable in older browsers
      }
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
      if (audioRef.current) audioRef.current.currentTime = t;
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

      const now = performance.now();
      if (now - lastAudioSeekTimeRef.current > 50) {
        lastAudioSeekTimeRef.current = now;
        if (audioRef.current) audioRef.current.currentTime = t;
      }
    },
    [getTimeFromPointer, syncSceneWithTime]
  );

  const handlePointerUp = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
      isDraggingRef.current = false;
      setIsDragging(false);

      const finalTime = getTimeFromPointer(e.clientX);
      setCurrentTime(finalTime);
      syncSceneWithTime(finalTime);
      if (audioRef.current) audioRef.current.currentTime = finalTime;

      if (wasPlayingRef.current) handlePlay();
    },
    [getTimeFromPointer, syncSceneWithTime, handlePlay]
  );

  const toggleFullscreen = useCallback(() => {
    if (!stageShellRef.current) return;
    if (!document.fullscreenElement) {
      stageShellRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Scoped keyboard navigation on theatre card
  const handleTheatreKeyDown = useCallback(
    (e) => {
      if (e.target && ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(e.target.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight" && activeSceneIndex < scenes.length - 1) {
        e.preventDefault();
        jumpToScene(activeSceneIndex + 1);
      } else if (e.code === "ArrowLeft" && activeSceneIndex > 0) {
        e.preventDefault();
        jumpToScene(activeSceneIndex - 1);
      }
    },
    [togglePlay, activeSceneIndex, scenes.length, jumpToScene]
  );

  const handleTheatreFocus = useCallback(() => setShowKbdHint(true), []);
  const handleTheatreBlur = useCallback(() => setShowKbdHint(false), []);

  const activeScene = scenes[activeSceneIndex] || scenes[0];
  const effectiveTime = isDragging ? dragTime : currentTime;
  const maxDuration = duration || langData.duration;
  const progressRatio = maxDuration > 0 ? Math.max(0, Math.min((effectiveTime / maxDuration) * 100, 100)) : 0;
  const progressPct = Math.round(progressRatio);

  const sceneDuration = Math.max(0.1, activeScene.end - activeScene.start);
  const sceneElapsed = Math.max(0, effectiveTime - activeScene.start);
  const sceneShotProgress = Math.max(0, Math.min((sceneElapsed / sceneDuration) * 100, 100));

  const beats = activeScene.beats || [];
  const activeBeat =
    beats.find((b) => effectiveTime >= b.start && effectiveTime < b.end) ||
    beats[beats.length - 1] || { phase: "", text: activeScene.subtext };

  // Step X of Y
  const stepFraction = `${activeSceneIndex + 1} / ${scenes.length}`;

  return (
    <section
      id={id}
      aria-label="OIBUZ Account Setup Interactive Video Tutorial"
      className={`relative ${
        compactHeader ? "py-6 sm:py-10 bg-transparent" : "py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#f3f7ff] to-white border-y border-slate-200/80"
      } overflow-hidden scroll-mt-20`}
    >
      {/* Ambient Background Glows */}
      {!compactHeader && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/3 -translate-x-1/2 w-[640px] h-[300px] bg-blue-500/8 blur-[120px] rounded-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-1/4 w-[480px] h-[280px] bg-emerald-500/8 blur-[110px] rounded-full"
          />
        </>
      )}

      {/* Master Audio Clock */}
      <audio ref={audioRef} src={langData.audioUrl} preload="metadata" playsInline />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Top Header ── */}
        {!compactHeader && (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3 shadow-2xs">
              <Languages className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{ui.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1f3d] tracking-tight leading-tight">
              {ui.sectionTitlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600">
                {ui.sectionTitleAccent}
              </span>
            </h2>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              {ui.sectionSubtitle}
            </p>

            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: Zap, label: "Under 2 Minutes", color: "#f59e0b" },
                { icon: Star, label: "No Credit Card", color: "#10b981" },
                { icon: BadgeCheck, label: "Hindi & English", color: "#2563eb" },
              ].map((b) => (
                <div key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-xs">
                  <b.icon className="w-3 h-3" style={{ color: b.color }} />
                  <span>{b.label}</span>
                </div>
              ))}
              {guidePageUrl && (
                <Link
                  to={guidePageUrl}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1a3a6b] hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors"
                >
                  <span>{language === "hi" ? "पूरा लिखित सेटअप गाइड पेज खोलें" : "Open Full Written Setup Guide Page"}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ═══ MAIN TUTORIAL THEATRE CARD ═══ */}
        <div
          ref={stageShellRef}
          tabIndex={0}
          onKeyDown={handleTheatreKeyDown}
          onFocus={handleTheatreFocus}
          onBlur={handleTheatreBlur}
          className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {/* Top Cinema Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-6 py-2.5 sm:py-3 bg-slate-50/95 border-b border-slate-200/80 text-xs relative z-20">
            {/* Left: Brand & Active Step + progress ring */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src="/images/oibuz_logo.png"
                alt="OIBUZ"
                className="h-4 sm:h-6 w-auto object-contain shrink-0"
              />
              <span className="text-slate-300 hidden sm:inline">|</span>

              {/* Step fraction + ring */}
              {hasStarted && (
                <div className="hidden sm:flex items-center gap-1.5">
                  <ProgressRing pct={progressPct} size={28} strokeWidth={2.5} color={activeScene.accent || "#2563eb"} />
                  <span className="text-[10px] font-mono font-bold text-slate-500">{stepFraction}</span>
                </div>
              )}

              <span className="inline-flex items-center gap-1 font-mono font-bold text-[#1a3a6b] bg-blue-100/75 px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs truncate">
                <span>
                  {ui.stepPrefix} {activeScene.chapter}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="truncate max-w-[110px] sm:max-w-none">{activeScene.tag}</span>
              </span>
            </div>

            {/* Right: Language Switcher + Speed + Voice Status + Timer */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto">
              {/* Live Language Switcher Pill */}
              <div
                className="inline-flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs"
                role="group"
                aria-label="Tutorial audio language"
              >
                {["en", "hi"].map((langKey) => {
                  const cfg = TUTORIAL_LANGUAGES[langKey];
                  const active = language === langKey;
                  return (
                    <button
                      key={langKey}
                      type="button"
                      onClick={() => handleSwitchLanguage(langKey)}
                      className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#1a3a6b] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {cfg.nativeLabel}
                    </button>
                  );
                })}
              </div>

              {/* Playback Speed */}
              <button
                type="button"
                onClick={cycleSpeed}
                title="Change playback speed"
                className="hidden sm:inline-flex items-center gap-1 bg-white border border-slate-200 hover:border-blue-300 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold text-slate-700 cursor-pointer transition-colors"
              >
                <Gauge className="w-3 h-3 text-blue-600" />
                <span>{playbackRate}x</span>
              </button>

              {/* Voice Status */}
              <div className="hidden md:flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                <VoiceEqualizer isPlaying={isPlaying} />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-700">
                  {isPlaying ? ui.voiceLive : hasStarted ? ui.paused : ui.readyAudio}
                </span>
              </div>

              {/* Timer */}
              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">
                {formatTime(effectiveTime)} / {formatTime(maxDuration)}
              </div>

              {/* Fullscreen — desktop only (iOS Safari disables element fullscreen) */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className="hidden sm:flex w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 items-center justify-center transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ═══ SCENE VISUAL VIEWPORT ═══ */}
          <div className="relative min-h-[490px] sm:min-h-[500px] lg:min-h-[540px] bg-gradient-to-b from-white via-slate-50/40 to-white flex flex-col justify-between p-4 sm:p-7 lg:p-10 overflow-hidden">
            {/* Shot Duration Metronome */}
            <div className="absolute top-0 inset-x-0 h-1 bg-slate-100 z-20 overflow-hidden" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"
                style={{ width: `${sceneShotProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Dynamic Ambient Lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-all duration-1000 opacity-75 z-0"
              style={{ background: getSceneAmbientLighting(activeScene.visualKey) }}
            />

            {/* Dot Blueprint Matrix */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0f1f3d_1px,transparent_1px)] [background-size:18px_18px] z-0"
            />

            {/* Keyboard shortcut hint (shown on focus) */}
            <AnimatePresence>
              {showKbdHint && hasStarted && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-3 right-4 z-30 hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-mono shadow-lg border border-white/10"
                >
                  <Keyboard className="w-3 h-3 text-slate-400" />
                  <KbdBadge>Space</KbdBadge>
                  <span className="text-slate-400">play/pause</span>
                  <KbdBadge>←</KbdBadge><KbdBadge>→</KbdBadge>
                  <span className="text-slate-400">steps</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── PRE-ROLL SPLASH OVERLAY ── */}
            <AnimatePresence>
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 text-center overflow-y-auto"
                >
                  <div className="max-w-2xl mx-auto space-y-3 sm:space-y-5 my-auto">
                    {/* Pulsing logo badge */}
                    <motion.div
                      animate={{ scale: [1, 1.04, 1], boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 24px rgba(37,99,235,0.18)", "0 0 0px rgba(37,99,235,0)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center justify-center px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200/80 shadow-sm mx-auto"
                    >
                      <img src="/images/oibuz_logo.png" alt="OIBUZ" className="h-7 sm:h-10 w-auto object-contain" />
                    </motion.div>

                    {/* Prominent Language Picker on Splash */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-blue-700">
                        {ui.splashEyebrow}
                      </div>
                      <div className="inline-flex flex-wrap justify-center items-center gap-1.5 bg-slate-100 border border-slate-200 p-1 rounded-xl max-w-full">
                        {["en", "hi"].map((langKey) => {
                          const cfg = TUTORIAL_LANGUAGES[langKey];
                          const isSelected = language === langKey;
                          return (
                            <button
                              key={langKey}
                              type="button"
                              onClick={() => handleSwitchLanguage(langKey)}
                              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                                isSelected
                                  ? "bg-[#1a3a6b] text-white shadow-sm"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              <Headphones className="w-3.5 h-3.5 shrink-0" />
                              <span className="whitespace-nowrap">
                                {cfg.nativeLabel} ({cfg.durationLabel})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-3xl font-black text-[#0f1f3d] tracking-tight leading-snug">
                        {ui.splashTitle}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                        {ui.splashSub}
                      </p>
                    </div>

                    {/* Step overview chips — with estimated durations */}
                    <div className="hidden sm:flex flex-wrap justify-center gap-1.5 max-w-xl mx-auto">
                      {scenes.map((s) => {
                        const dur = Math.round(s.end - s.start);
                        return (
                          <span
                            key={s.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-600 shadow-2xs"
                          >
                            <span>{s.chapter}</span>
                            <span className="text-slate-400">·</span>
                            <span>{s.shortLabel}</span>
                            <span className="text-slate-400 font-normal">~{dur}s</span>
                          </span>
                        );
                      })}
                    </div>

                    <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={handlePlay}
                        className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0f1f3d] via-[#1a3a6b] to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-xs sm:text-base shadow-lg shadow-blue-900/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                      >
                        <Play className="w-4 h-4 fill-current shrink-0" />
                        <span>
                          {ui.playBtn} ({langData.durationLabel})
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsMuted(true);
                          if (audioRef.current) audioRef.current.muted = true;
                          handlePlay();
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all cursor-pointer min-h-[44px]"
                      >
                        <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                        <span>{ui.muteBtn}</span>
                      </button>
                    </div>

                    <div className="hidden sm:block text-[10px] sm:text-xs text-slate-400 font-medium">{ui.keyboardTip}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LIVE SCENE RENDERING ENGINE ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${language}-${activeScene.id}`}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10, scale: 0.99 }}
                transition={{ duration: 0.24, ease: EASE }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                {/* Scene Header */}
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#1a3a6b] uppercase tracking-widest bg-blue-50/90 border border-blue-200/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md mb-2 shadow-2xs">
                    <span>
                      {ui.stepPrefix} {activeScene.chapter}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span>{activeScene.tag}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0f1f3d] tracking-tight leading-snug">
                    {activeScene.headline}
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                    {activeScene.subtext}
                  </p>
                </div>

                {/* Dynamic Interactive OIBUZ Product Simulation */}
                <div className="my-4 sm:my-5 flex-1 flex items-center justify-center">
                  <TutorialVisualStage
                    scene={activeScene}
                    activePhase={activeBeat.phase}
                    language={language}
                    effectiveTime={effectiveTime}
                    onSwitchLanguage={handleSwitchLanguage}
                    onReplay={handleReplay}
                    onDemoClick={onDemoClick}
                  />
                </div>

                {/* ── CINEMATIC CAPTION BAR ── */}
                <div className="mt-auto rounded-xl bg-slate-900/95 backdrop-blur-sm border border-white/10 px-3.5 sm:px-4 py-2.5 flex items-center gap-3 sm:gap-4 shadow-lg">
                  <div className="flex items-center gap-2 shrink-0">
                    <CinematicSoundwave isPlaying={isPlaying} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeBeat.text}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-white font-semibold leading-relaxed text-[11px] sm:text-sm tracking-tight"
                      >
                        &ldquo;{activeBeat.text}&rdquo;
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 border border-white/15 font-bold text-white/80 text-[10px] font-mono">
                      <Radio className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                      <span>{ui.masterVoiceBadge}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {audioError && (
              <div className="mt-2 text-center text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg py-1.5 px-3 relative z-20">
                {audioError}
              </div>
            )}
          </div>

          {/* ═══ SCRUBBABLE TIMELINE & STEP CAROUSEL ═══ */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-3.5 sm:px-6 py-3.5 sm:py-4">
            {/* Chapter tick labels */}
            <div className="relative h-4 mb-0.5 hidden sm:block" aria-hidden="true">
              {scenes.map((s) => {
                const pct = (s.start / maxDuration) * 100;
                return (
                  <div
                    key={s.id}
                    className="absolute text-[9px] font-mono font-bold text-slate-400 -translate-x-1/2 leading-none"
                    style={{ left: `${pct}%` }}
                  >
                    {s.chapter}
                  </div>
                );
              })}
            </div>

            {/* Bidirectional Drag Track */}
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative py-2.5 cursor-grab active:cursor-grabbing select-none touch-none group mb-2"
              title="Click or drag smoothly forward / backward"
            >
              <div className="relative h-2.5 sm:h-3 bg-slate-200 group-hover:bg-slate-300/80 rounded-full overflow-hidden transition-colors">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1a3a6b] via-blue-600 to-emerald-500 rounded-full"
                  style={{ width: `${progressRatio}%` }}
                />

                {scenes.map((s) => {
                  const tickPercent = (s.start / maxDuration) * 100;
                  const isDone = hasStarted && effectiveTime >= s.end;
                  return (
                    <div
                      key={s.id}
                      style={{ left: `${tickPercent}%` }}
                      className={`absolute top-0 bottom-0 w-[1.5px] ${isDone ? "bg-emerald-400/70" : "bg-white/80"} pointer-events-none transition-colors`}
                    />
                  );
                })}
              </div>

              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                style={{ left: `${progressRatio}%` }}
              >
                <div
                  className={`size-4 sm:size-5 rounded-full bg-white border-2 border-[#1a3a6b] shadow-md flex items-center justify-center transition-transform ${
                    isDragging ? "scale-125 ring-4 ring-blue-500/25" : "group-hover:scale-125"
                  }`}
                >
                  <div className="size-1.5 rounded-full bg-[#1a3a6b]" />
                </div>
              </div>

              {isDragging && (
                <div
                  className="absolute bottom-full mb-1 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] sm:text-[11px] font-mono font-bold shadow-lg whitespace-nowrap z-30"
                  style={{ left: `${progressRatio}%` }}
                >
                  {formatTime(effectiveTime)} &bull; {activeScene.shortLabel}
                </div>
              )}
            </div>

            {/* Player Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center justify-center size-9 sm:size-10 rounded-xl bg-[#1a3a6b] hover:bg-blue-800 text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause tutorial" : "Play tutorial"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  title={ui.replay}
                  aria-label={ui.replay}
                  className="flex items-center justify-center size-8 sm:size-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="flex items-center justify-center size-8 sm:size-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-slate-700" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="sm:hidden inline-flex items-center px-2 py-1 rounded-lg border border-slate-200 bg-white text-[10px] font-mono font-bold text-slate-700"
                >
                  {playbackRate}x
                </button>

                <span className="ml-1 text-[11px] sm:text-xs font-mono text-slate-500 font-semibold">
                  {formatTime(effectiveTime)} / {formatTime(maxDuration)}
                </span>

                {/* Live progress % */}
                {hasStarted && (
                  <span className="hidden sm:inline text-[10px] font-mono font-bold text-slate-400">
                    ({progressPct}%)
                  </span>
                )}
              </div>

              {/* Prev / Next Step + Direct Trial CTA */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <button
                  type="button"
                  disabled={activeSceneIndex <= 0}
                  onClick={() => jumpToScene(activeSceneIndex - 1)}
                  className="px-3 py-1.5 min-h-[38px] rounded-lg border border-slate-200 bg-white text-[11px] sm:text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> {ui.prevStep}
                </button>

                <button
                  type="button"
                  disabled={activeSceneIndex >= scenes.length - 1}
                  onClick={() => jumpToScene(activeSceneIndex + 1)}
                  className="px-3 py-1.5 min-h-[38px] rounded-lg border border-slate-200 bg-white text-[11px] sm:text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1"
                >
                  {ui.nextStep} <ChevronRight className="w-3 h-3" />
                </button>

                <a
                  href={getOibuzRegisterUrl({ source: "oibuz_setup_tutorial_bar" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOibuzTrialClick("oibuz_setup_tutorial_bar")}
                  className="ml-1 hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>{ui.openRegisterCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Step Chapter Pill Carousel */}
            <div
              className="mt-3 pt-2.5 border-t border-slate-200/70 overflow-x-auto flex items-center gap-1.5 pb-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {scenes.map((s, idx) => {
                const isActive = idx === activeSceneIndex && hasStarted;
                const isDone = hasStarted && effectiveTime >= s.end;
                const dur = Math.round(s.end - s.start);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jumpToScene(idx)}
                    className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#1a3a6b] text-white font-bold shadow-xs"
                        : isDone
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3 text-emerald-600 shrink-0" /> : <span>{s.chapter}</span>}
                    <span className="whitespace-nowrap">{s.shortLabel}</span>
                    <span className={`text-[9px] font-normal ${isActive ? "text-blue-200" : isDone ? "text-emerald-500" : "text-slate-400"}`}>
                      ~{dur}s
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Below-Theatre Premium Callout Bar ── */}
        <div className="mt-6 relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-gradient-to-r from-[#0f1f3d] via-[#1a3a6b] to-[#0f2d55]">
          {/* Subtle grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
          />
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 sm:p-6">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <p className="font-extrabold text-sm sm:text-base">{ui.bottomTitle}</p>
              </div>
              <p className="text-blue-200/80 text-xs sm:text-sm">{ui.bottomSub}</p>
              {/* Mini trust stats */}
              <div className="mt-2 flex flex-wrap gap-3">
                {[
                  { label: "No credit card" },
                  { label: "2-min setup" },
                  { label: "14-day free trial" },
                ].map((t) => (
                  <span key={t.label} className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                    <Check className="w-3 h-3" /> {t.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <a
                href={getOibuzRegisterUrl({ source: "oibuz_setup_tutorial_cta" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOibuzTrialClick("oibuz_setup_tutorial_cta")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-px whitespace-nowrap"
              >
                <span>{ui.openRegisterCta}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
              {onDemoClick && (
                <button
                  type="button"
                  onClick={onDemoClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all hover:-translate-y-px whitespace-nowrap cursor-pointer"
                >
                  <span>{ui.bookDemoCta}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════════════
   DYNAMIC INTERACTIVE SCENE VISUALIZER
   Renders step-by-step live product browser & inbox UI synced to activePhase
═════════════════════════════════════════════════════════════════════════════ */
function TutorialVisualStage({
  scene,
  activePhase,
  language,
  effectiveTime,
  onSwitchLanguage,
  onReplay,
  onDemoClick,
}) {
  const beats = scene.beats || [];
  const isHi = language === "hi";

  switch (scene.visualKey) {
    /* 01 — INTRO & 4-MILESTONE ROADMAP */
    case "intro": {
      const showRoadmap = hasReachedPhase(beats, activePhase, "roadmap");
      const showReady = hasReachedPhase(beats, activePhase, "ready");
      const milestones = [
        {
          n: "01",
          title: isHi ? "ऑर्गनाइज़ेशन रजिस्टर" : "Register Organization",
          desc: "www.oibuz.in/register",
          icon: Building2,
          color: "#2563eb",
          bgColor: "#eff6ff",
        },
        {
          n: "02",
          title: isHi ? "ईमेल वेरिफिकेशन" : "Verify Email Address",
          desc: isHi ? "24 घंटे वैलिड लिंक" : "24h Inbox Link",
          icon: MailCheck,
          color: "#d97706",
          bgColor: "#fffbeb",
        },
        {
          n: "03",
          title: isHi ? "वर्कस्पेस एक्टिवेशन" : "Activate Workspace",
          desc: isHi ? "14-दिन का फ्री ट्रायल" : "14-Day Trial Begins",
          icon: Sparkles,
          color: "#059669",
          bgColor: "#ecfdf5",
        },
        {
          n: "04",
          title: isHi ? "एडमिन डैशबोर्ड" : "Admin Dashboard",
          desc: isHi ? "सेटिंग्स और स्टाफ" : "Settings & Site Ops",
          icon: Settings,
          color: "#4f46e5",
          bgColor: "#eef2ff",
        },
      ];

      return (
        <div className="w-full max-w-4xl space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0.35, y: 12 }}
                animate={showRoadmap ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: EASE }}
                className={`relative p-3.5 sm:p-4 rounded-2xl border bg-white shadow-sm transition-all ${
                  showRoadmap ? "border-blue-200 shadow-md" : "border-slate-200"
                }`}
              >
                {/* Connecting arrow (not on last) */}
                {idx < milestones.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6">
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: m.bgColor }}
                  >
                    <m.icon className="w-5 h-5" style={{ color: m.color }} />
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-300">{m.n}</span>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">{m.title}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1 font-mono truncate">{m.desc}</p>
                {showRoadmap && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: idx * 0.12 + 0.3, duration: 0.4 }}
                    className="h-0.5 rounded-full mt-2.5"
                    style={{ backgroundColor: m.color, opacity: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={showReady ? { scale: [1, 1.02, 1], opacity: 1 } : { opacity: 0.85 }}
            className="mx-auto max-w-md px-4 py-2.5 rounded-xl bg-[#0f1f3d] text-white text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>
              {isHi
                ? "सिर्फ 4 आसान स्टेप्स • बिना क्रेडिट कार्ड के शुरू करें"
                : "4 Quick Steps • No Credit Card Required • Live in 2 Mins"}
            </span>
          </motion.div>
        </div>
      );
    }

    /* 02 — OPEN www.oibuz.in & CLICK START FREE TRIAL */
    case "open-register": {
      const clickCta = activePhase === "visit-home" || activePhase === "click-cta";
      const directUrl = hasReachedPhase(beats, activePhase, "direct-url");

      return (
        <div className="w-full max-w-3xl space-y-3">
          <BrowserMockup
            url={directUrl ? "https://www.oibuz.in/register" : "https://www.oibuz.in"}
            badge={directUrl ? "DIRECT SIGNUP URL" : "OIBUZ HOMEPAGE"}
          >
            <div className="grid sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-3 space-y-2.5">
                <img src="/images/oibuz_logo.png" alt="OIBUZ" className="h-7 w-auto object-contain" />
                <div className="text-sm sm:text-lg font-black text-[#0f1f3d] leading-snug">
                  Workforce Management Built for Construction.
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Attendance, leave, timesheets, expenses &amp; payroll across every active site.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-2.5">
                  <div
                    className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md transition-all ${
                      clickCta ? "ring-4 ring-emerald-400/40 scale-105" : ""
                    }`}
                  >
                    <span>Start Free Trial</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {clickCta && (
                      <div className="absolute -bottom-6 right-0">
                        <GuidedPointer label={isHi ? "क्लिक करें" : "Click Here"} />
                      </div>
                    )}
                  </div>
                  <span className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
                    Book a Demo
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <motion.div
                  animate={directUrl ? { scale: 1.03, borderColor: "#059669" } : { scale: 1 }}
                  className={`p-3.5 rounded-xl border transition-all ${
                    directUrl ? "bg-emerald-50/90 border-emerald-400 shadow-md" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 uppercase mb-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{isHi ? "सीधा रजिस्ट्रेशन लिंक" : "Direct Fast-Path"}</span>
                  </div>
                  <div className="font-mono text-xs font-black text-slate-900 break-all">
                    www.oibuz.in/register
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">
                    {isHi
                      ? "सीधे रजिस्ट्रेशन फॉर्म खोलने के लिए यह URL टाइप करें।"
                      : "Bookmark or visit directly to jump straight to Create Account."}
                  </p>
                </motion.div>
              </div>
            </div>
          </BrowserMockup>
        </div>
      );
    }

    /* 03 — EMAIL READINESS (EN pre-step) */
    case "email-prep": {
      const highlightNoTemp = hasReachedPhase(beats, activePhase, "no-temp");
      const typingActive = activePhase === "valid-email";

      return (
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-400 bg-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 uppercase">
                <CheckCircle2 className="w-4 h-4" />
                Accepted Emails
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                VALID
              </span>
            </div>
            <div className="space-y-2 text-[11px] sm:text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between font-mono gap-2">
                <TypingText text="ops@acmeconstruction.in" active={typingActive} className="text-slate-800 font-semibold truncate min-w-0" />
                <span className="text-emerald-700 font-bold shrink-0">Work</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between font-mono gap-2">
                <TypingText text="john.doe@gmail.com" active={typingActive} className="text-slate-800 font-semibold truncate min-w-0" />
                <span className="text-emerald-700 font-bold shrink-0">Personal</span>
              </div>
            </div>
          </div>

          <motion.div
            animate={highlightNoTemp ? { scale: [1, 1.03, 1], borderColor: "#ef4444" } : {}}
            className={`p-4 sm:p-5 rounded-2xl border bg-rose-50/50 space-y-3 transition-all ${
              highlightNoTemp ? "border-rose-400 shadow-lg" : "border-rose-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-700 uppercase">
                <ShieldAlert className="w-4 h-4" />
                Blocked Domains
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                REJECTED
              </span>
            </div>
            <div className="space-y-2 text-[11px] sm:text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center justify-between font-mono gap-2">
                <span className="line-through text-slate-400 truncate min-w-0">temp123@mailinator.com</span>
                <span className="text-rose-600 font-bold shrink-0">Disposable</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center justify-between font-mono gap-2">
                <span className="line-through text-slate-400 truncate min-w-0">test@10minutemail.net</span>
                <span className="text-rose-600 font-bold shrink-0">Temporary</span>
              </div>
            </div>
            {highlightNoTemp && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-semibold"
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Automatically blocked to protect your workspace security</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      );
    }

    /* 04 — CREATE ACCOUNT STEP 1 OF 2: ORGANIZATION & DEDICATED URL */
    case "step1-workspace": {
      const hasOrg = hasReachedPhase(beats, activePhase, "org-name");
      const hasUrl = hasReachedPhase(beats, activePhase, "url-preview");
      const hasName = hasReachedPhase(beats, activePhase, "full-name");
      const showRules = hasReachedPhase(beats, activePhase, "rules");
      const clickContinue = activePhase === "click-continue";

      return (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          {/* Left: Live Step 1 Form */}
          <div className="lg:col-span-7">
            <BrowserMockup url="https://www.oibuz.in/register" badge="STEP 1 OF 2">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <div className="text-xs sm:text-sm font-black text-[#0f1f3d]">Create Account</div>
                    <div className="text-[10px] text-slate-500">Step 1 of 2 — Organization Details</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="w-6 h-1.5 rounded-full bg-blue-600" />
                    <span className="w-6 h-1.5 rounded-full bg-slate-200" />
                    <span className="ml-1 text-[9px] font-mono text-slate-400">1/2</span>
                  </div>
                </div>

                {/* Organization Name */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Organization Name *</span>
                    {hasOrg && <span className="text-emerald-600 font-mono text-[9px]">✓ Unique &amp; Available</span>}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                      hasOrg ? "border-blue-500 bg-blue-50/40 text-slate-900 ring-2 ring-blue-500/15" : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{hasOrg ? "Acme Construction" : "Enter company or business name..."}</span>
                    {hasOrg && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto w-2 h-2 rounded-full bg-blue-500 animate-pulse"
                      />
                    )}
                  </div>
                </div>

                {/* Dedicated Workspace URL Preview */}
                <motion.div
                  animate={hasUrl ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.99 }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    hasUrl ? "bg-emerald-50/80 border-emerald-300 shadow-xs" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[9px] font-mono font-bold uppercase text-emerald-700 mb-0.5">
                    Dedicated Workspace URL Preview
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-black text-[#0f1f3d] flex items-center gap-1.5 min-w-0">
                    <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate min-w-0">{hasUrl ? "https://acme-construction.oibuz.in" : "your-company.oibuz.in"}</span>
                    {hasUrl && (
                      <span className="ml-auto shrink-0 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">LIVE</span>
                    )}
                  </div>
                </motion.div>

                {/* Your Full Name */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Your Full Name *</span>
                    {hasName && (
                      <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded">
                        Primary Administrator
                      </span>
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                      hasName ? "border-indigo-500 bg-indigo-50/40 text-slate-900 ring-2 ring-indigo-500/15" : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{hasName ? "John Doe" : "Enter your full name..."}</span>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="pt-1 relative">
                  <div
                    className={`w-full py-2.5 rounded-xl bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      clickContinue ? "ring-4 ring-blue-400/50 bg-blue-700 scale-[1.02]" : ""
                    }`}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  {clickContinue && (
                    <div className="absolute -bottom-5 right-3">
                      <GuidedPointer label={isHi ? "Continue दबाएं" : "Click Continue"} />
                    </div>
                  )}
                </div>
              </div>
            </BrowserMockup>
          </div>

          {/* Right: Guardrails Card */}
          <div className="lg:col-span-5 space-y-2.5">
            <motion.div
              animate={showRules ? { scale: 1.02, borderColor: "#2563eb" } : { scale: 1 }}
              className={`p-3.5 sm:p-4 rounded-2xl border bg-white shadow-sm transition-all ${
                showRules ? "border-blue-400 shadow-md ring-2 ring-blue-500/15" : "border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#0f1f3d] mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{isHi ? "कंपनी नाम के नियम" : "Organization Naming Rules"}</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isHi
                      ? "कंपनी का नाम यूनिक होना चाहिए (हर कंपनी के लिए अलग URL)।"
                      : "Company names must be unique across OIBUZ."}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {isHi ? "ये रिज़र्व्ड शब्द इस्तेमाल नहीं किए जा सकते:" : "Reserved words cannot be used:"}
                  </span>
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap gap-1">
                {["www", "app", "api", "admin", "support", "platform"].map((w) => (
                  <span
                    key={w}
                    className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-[10px] font-mono font-bold text-rose-700 line-through"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] text-blue-950 font-medium">
              <strong className="font-bold">{isHi ? "एडमिन प्रोफाइल:" : "Admin Profile:"}</strong>{" "}
              {isHi
                ? "Step 1 में भरा गया नाम आपके प्राइमरी एडमिनिस्ट्रेटर अकाउंट से जुड़ता है।"
                : "Your full name creates the primary administrator account for your company."}
            </div>
          </div>
        </div>
      );
    }

    /* 05 — CREATE ACCOUNT STEP 2 OF 2: EMAIL, PASSWORD & TERMS */
    case "step2-credentials": {
      const hasEmail = hasReachedPhase(beats, activePhase, "email");
      const hasPw = hasReachedPhase(beats, activePhase, "password");
      const hasConfirm = hasReachedPhase(beats, activePhase, "confirm-pw");
      const hasTerms = hasReachedPhase(beats, activePhase, "terms");
      const showBack = activePhase === "back-tip";
      const clickCreate = activePhase === "click-create";

      return (
        <div className="w-full max-w-3xl">
          <BrowserMockup url="https://www.oibuz.in/register" badge="STEP 2 OF 2">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <div className="text-xs sm:text-sm font-black text-[#0f1f3d]">Create Account</div>
                  <div className="text-[10px] text-slate-500">Step 2 of 2 — Sign-In Credentials</div>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="w-6 h-1.5 rounded-full bg-emerald-500" />
                  <span className="w-6 h-1.5 rounded-full bg-indigo-600" />
                  <span className="ml-1 text-[9px] font-mono text-slate-400">2/2</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {/* Email */}
                <div className="sm:col-span-2">
                  <div className="text-[10px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Email Address *</span>
                    {hasEmail && <span className="text-emerald-600 font-mono text-[9px]">✓ Valid &amp; New</span>}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                      hasEmail ? "border-indigo-500 bg-indigo-50/40 text-slate-900" : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{hasEmail ? "john@acme-construction.in" : "you@company.com"}</span>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Password *</span>
                    {hasPw && <span className="text-emerald-600 font-mono text-[9px]">6+ chars ✓</span>}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                      hasPw ? "border-indigo-500 bg-indigo-50/40 text-slate-900" : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{hasPw ? "••••••••••" : "Min 6 characters"}</span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Confirm Password *</span>
                    {hasConfirm && <span className="text-emerald-600 font-mono text-[9px]">Matched ✓</span>}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                      hasConfirm ? "border-emerald-500 bg-emerald-50/40 text-slate-900" : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{hasConfirm ? "••••••••••" : "Re-enter password"}</span>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div
                className={`p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${
                  hasTerms ? "bg-blue-50/60 border-blue-300" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                    hasTerms ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-300"
                  }`}
                >
                  {hasTerms && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-700 leading-snug">
                  I agree to the{" "}
                  <span className="text-blue-700 font-bold underline inline-flex items-center gap-0.5">
                    Terms of Service <ExternalLink className="w-2.5 h-2.5" />
                  </span>{" "}
                  and acknowledge the{" "}
                  <span className="text-blue-700 font-bold underline inline-flex items-center gap-0.5">
                    Privacy Policy <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                  <span className="ml-1.5 text-[9px] text-slate-400 font-mono">(Opens in new tab)</span>
                </div>
              </div>

              {/* Action Row: Back + Create Account */}
              <div className="flex items-center gap-2.5 pt-1 relative">
                <div
                  className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                    showBack ? "border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20" : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </div>
                <div
                  className={`flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all ${
                    clickCreate ? "ring-4 ring-emerald-400/50 scale-[1.02]" : ""
                  }`}
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                {clickCreate && (
                  <div className="absolute -bottom-5 right-3">
                    <GuidedPointer label={isHi ? "Create Account दबाएं" : "Click Create Account"} />
                  </div>
                )}
              </div>
            </div>
          </BrowserMockup>
        </div>
      );
    }

    /* 06 — CHECK YOUR EMAIL & VERIFICATION PENDING */
    case "verify-pending": {
      const openInbox = hasReachedPhase(beats, activePhase, "open-inbox");
      const show24h = hasReachedPhase(beats, activePhase, "expiry-24h");
      const showResend = hasReachedPhase(beats, activePhase, "resend-spam");
      const showMustVerify = hasReachedPhase(beats, activePhase, "must-verify");

      return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
          {/* Left: Check Your Email Screen */}
          <BrowserMockup url="https://www.oibuz.in/verify-pending" badge="PENDING">
            <div className="text-center space-y-2.5 py-1">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto"
              >
                <Mail className="w-5 h-5" />
              </motion.div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono font-bold text-amber-800">
                Account Created &bull; Pending Verification
              </div>
              <div className="text-sm sm:text-base font-black text-[#0f1f3d]">Check Your Email</div>
              <p className="text-[11px] text-slate-600 leading-snug">
                We sent a verification link to <span className="font-mono font-bold">john@acme-construction.in</span>
              </p>

              <div
                className={`p-2 rounded-xl border text-[10px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  showResend ? "bg-blue-50 border-blue-300 text-blue-800" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend Verification Email (Once / 60s)</span>
              </div>

              <motion.div
                animate={showMustVerify ? { scale: [1, 1.03, 1], borderColor: "#d97706" } : {}}
                className={`p-2 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1.5 ${
                  showMustVerify ? "bg-amber-50 border-amber-400 text-amber-900" : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                <Lock className="w-3 h-3" />
                <span>
                  {isHi ? "वेरिफिकेशन से पहले लॉगिन बंद रहता है" : "Must verify email before you can sign in"}
                </span>
              </motion.div>
            </div>
          </BrowserMockup>

          {/* Right: Email Inbox & Helper Cards */}
          <div className="flex flex-col justify-between gap-2.5">
            <motion.div
              animate={openInbox ? { y: 0, opacity: 1 } : { y: 6, opacity: 0.7 }}
              className={`rounded-2xl border bg-white p-3.5 shadow-md space-y-2.5 ${
                openInbox ? "border-blue-300 ring-2 ring-blue-500/10" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1a3a6b] text-white flex items-center justify-center font-black text-[10px]">
                    OB
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">OIBUZ Verification</div>
                    <div className="text-[10px] text-slate-400">no-reply@oibuz.in &bull; Just now</div>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                    show24h ? "bg-amber-50 border-amber-300 text-amber-800" : "bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                >
                  24h Valid
                </span>
              </div>

              <div className="relative flex items-center justify-between gap-2 bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5">
                <span className="text-xs font-bold text-emerald-900">Verify Email Address</span>
                <motion.span
                  animate={openInbox ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1.2, repeat: openInbox ? Infinity : 0 }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold"
                >
                  Verify Link &rarr;
                </motion.span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
              <div
                className={`p-2.5 rounded-xl border text-[10px] sm:text-[11px] transition-all ${
                  show24h ? "bg-amber-50 border-amber-300 text-amber-900 font-bold" : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Timer className="w-3.5 h-3.5 text-amber-600" />
                  <span>24-Hour Expiry</span>
                </div>
                <p className="text-[10px] font-normal opacity-80">
                  {isHi ? "लिंक 24 घंटे तक मान्य रहता है।" : "Link stays active for 24 hours."}
                </p>
              </div>
              <div
                className={`p-2.5 rounded-xl border text-[10px] sm:text-[11px] transition-all ${
                  showResend ? "bg-blue-50 border-blue-300 text-blue-900 font-bold" : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <FolderSearch className="w-3.5 h-3.5 text-blue-600" />
                  <span>Spam / Junk</span>
                </div>
                <p className="text-[10px] font-normal opacity-80">
                  {isHi ? "ईमेल न मिले तो स्पैम चेक करें।" : "Check Spam or resend every 60s."}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* 07 — VERIFICATION SUCCESSFUL & 14-DAY FREE TRIAL STARTS */
    case "verified-trial": {
      const wsActive = hasReachedPhase(beats, activePhase, "workspace-active");
      const trialStarts = hasReachedPhase(beats, activePhase, "trial-starts");
      const proceedLogin = activePhase === "proceed-login";

      return (
        <div className="w-full max-w-3xl">
          <BrowserMockup url="https://www.oibuz.in/verify-email?status=success" badge="VERIFIED ✓">
            <div className="text-center space-y-3 py-1">
              {/* Success icon with confetti ring */}
              <div className="relative inline-flex items-center justify-center">
                <ConfettiRing active={wsActive} />
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative w-14 h-14 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-700 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-7 h-7" />
                  {wsActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-2xl bg-emerald-400/20"
                    />
                  )}
                </motion.div>
              </div>

              <div>
                <div className="text-base sm:text-xl font-black text-emerald-700">Verification Successful!</div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isHi
                    ? "ईमेल वेरिफिकेशन पूरा हुआ — आपका वर्कस्पेस अब एक्टिव है।"
                    : "Your email is confirmed and your company workspace is ready."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5 text-left">
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    wsActive ? "bg-emerald-50/80 border-emerald-300 shadow-xs" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Workspace Status</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5">acme-construction.oibuz.in</div>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl border transition-all ${
                    trialStarts ? "bg-blue-50 border-blue-400 shadow-md ring-2 ring-blue-500/15" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-blue-700 uppercase">14-Day Free Trial</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5">
                    {isHi ? "अभी से शुरू (वेरिफिकेशन पर)" : "Starts Now (At Verification)"}
                  </div>
                  {trialStarts && (
                    <div className="mt-1.5">
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "7%" }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-blue-500 rounded-full"
                        />
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5 font-mono">Day 1 of 14</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-1 relative inline-block">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a3a6b] text-white font-bold text-xs shadow-md transition-all ${
                    proceedLogin ? "ring-4 ring-blue-400/50 bg-blue-700 scale-105" : ""
                  }`}
                >
                  <span>Proceed to Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                {proceedLogin && (
                  <div className="absolute -bottom-5 right-0">
                    <GuidedPointer label={isHi ? "लॉगिन पर जाएं" : "Click Proceed"} />
                  </div>
                )}
              </div>
            </div>
          </BrowserMockup>
        </div>
      );
    }

    /* 08 — SIGN IN & ADMIN DASHBOARD TOUR */
    case "signin-dashboard": {
      const showDashboard = hasReachedPhase(beats, activePhase, "dashboard-land");
      const showActions = hasReachedPhase(beats, activePhase, "dashboard-actions");

      return (
        <div className="w-full max-w-4xl">
          <BrowserMockup
            url={showDashboard ? "https://acme-construction.oibuz.in/admin/dashboard" : "https://acme-construction.oibuz.in/login"}
            badge={showDashboard ? "ADMIN DASHBOARD" : "WORKSPACE LOGIN"}
          >
            {!showDashboard ? (
              <div className="max-w-sm mx-auto py-2 space-y-2.5">
                <div className="text-center">
                  <div className="text-sm font-black text-[#0f1f3d]">Sign In to Acme Construction</div>
                  <p className="text-[10px] text-slate-500">Or sign in via www.oibuz.in main portal</p>
                </div>
                <div className="p-2 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-700">
                  john@acme-construction.in
                </div>
                <div className="p-2 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-700">
                  ••••••••••
                </div>
                <div className="py-2 rounded-xl bg-[#1a3a6b] text-white text-xs font-bold text-center">
                  Sign In &rarr;
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <div className="text-xs sm:text-sm font-black text-[#0f1f3d]">
                      Acme Construction &bull; Admin Command
                    </div>
                    <div className="text-[10px] text-slate-500">Welcome, John Doe (Primary Administrator)</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    14-Day Free Trial Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      title: isHi ? "1. कंपनी सेटिंग्स" : "1. Company Settings",
                      desc: isHi ? "साइट्स, जियोफेंस और नीतियां सेट करें" : "Configure sites, geofences & leave policies",
                      icon: Settings,
                      color: "#2563eb",
                    },
                    {
                      title: isHi ? "2. एम्प्लॉइज जोड़ें" : "2. Add Employees",
                      desc: isHi ? "स्टाफ, रोल और वेतन विवरण जोड़ें" : "Add site workers, supervisors, HR & roles",
                      icon: Users,
                      color: "#059669",
                    },
                    {
                      title: isHi ? "3. साइट ऑपरेशंस" : "3. Site Operations",
                      desc: isHi ? "GPS अटेंडेंस, टाइमशीट और पेरोल शुरू करें" : "Manage attendance, timesheets & payroll",
                      icon: HardHat,
                      color: "#4f46e5",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-3 rounded-xl border bg-white shadow-xs transition-all ${
                        showActions ? "border-blue-200 shadow-sm" : "border-slate-200"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${card.color}15` }}
                      >
                        <card.icon className="w-4 h-4" style={{ color: card.color }} />
                      </div>
                      <div className="text-xs font-extrabold text-slate-900">{card.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{card.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </BrowserMockup>
        </div>
      );
    }

    /* 09 — IMPORTANT SETUP TIPS & RATE LIMITS */
    case "pro-tips": {
      const tips = [
        {
          id: "existing-user",
          title: isHi ? "पहले से अकाउंट है?" : "Already Have an Account?",
          badge: "Sign In",
          desc: isHi
            ? "नया अकाउंट बनाने के बजाय रजिस्ट्रेशन फॉर्म के नीचे 'Sign In' चुनें।"
            : "Click 'Sign In' at the bottom of the registration form instead of creating a duplicate.",
          icon: User,
          color: "#2563eb",
        },
        {
          id: "rate-limit",
          title: isHi ? "5 प्रयास / घंटे की सीमा" : "5 Attempts / Hour Limit",
          badge: "Countdown Timer",
          desc: isHi
            ? "1 घंटे में अधिकतम 5 रजिस्ट्रेशन प्रयास संभव हैं — सबमिट से पहले जानकारी जांचें।"
            : "Up to 5 registration attempts per hour. If reached, an on-screen countdown shows wait time.",
          icon: Clock,
          color: "#7c3aed",
        },
        {
          id: "no-temp",
          title: isHi ? "अस्थायी ईमेल ब्लॉक" : "No Disposable Emails",
          badge: "Security",
          desc: isHi
            ? "वर्कस्पेस की सुरक्षा के लिए टेंपररी/डिस्पोजेबल ईमेल स्वीकार नहीं किए जाते।"
            : "Temporary email domains are automatically blocked to protect workspace security.",
          icon: ShieldAlert,
          color: "#059669",
        },
      ];

      return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-3">
          {tips.map((t) => {
            const isActive = activePhase === t.id;
            return (
              <motion.div
                key={t.id}
                animate={isActive ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-4 rounded-2xl border bg-white transition-all ${
                  isActive ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20 scale-[1.02]" : "border-slate-200 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${t.color}15` }}
                  >
                    <t.icon className="w-4.5 h-4.5" style={{ color: t.color }} />
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${t.color}12`, color: t.color }}
                  >
                    {t.badge}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1">{t.title}</div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="h-0.5 rounded-full mt-3"
                    style={{ backgroundColor: t.color }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      );
    }

    /* 10 — FINAL LAUNCH PAYOFF CARD */
    case "launch-ready":
    default: {
      const otherLang = isHi ? "en" : "hi";
      return (
        <div className="w-full max-w-3xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-[#0f1f3d] via-[#13294d] to-[#0b3b36] text-white text-center shadow-2xl relative overflow-hidden">
          {/* Background particle dots */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px]"
          />
          {/* Ambient glow */}
          <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/20 blur-[60px] rounded-full" />

          <div className="relative z-10 space-y-4">
            <img
              src="/images/oibuz_logo.png"
              alt="OIBUZ"
              className="h-9 sm:h-11 w-auto object-contain mx-auto brightness-0 invert"
            />

            <div>
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 rounded-full mb-2">
                {isHi ? "14-दिन का फ्री ट्रायल शुरू" : "14-Day Free Trial Ready"}
              </span>
              <h4 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                {isHi ? "OIBUZ: Simplifying Workforce Management" : "Register. Verify. Activate. Manage."}
              </h4>
              <p className="text-xs sm:text-sm text-blue-100/85 mt-1 max-w-lg mx-auto">
                {isHi
                  ? "Empowering Your Business — आज ही अपना कंपनी वर्कस्पेस शुरू करें।"
                  : "Create your company workspace at oibuz.in/register in under 2 minutes."}
              </p>
            </div>

            {/* Achievement badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                isHi ? "✓ रजिस्टर हुआ" : "✓ Registered",
                isHi ? "✓ वेरीफाई हुआ" : "✓ Verified",
                isHi ? "✓ वर्कस्पेस एक्टिव" : "✓ Workspace Active",
                isHi ? "✓ डैशबोर्ड खुला" : "✓ Dashboard Open",
              ].map((badge) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-full"
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <a
                href={getOibuzRegisterUrl({ source: "oibuz_setup_tutorial_payoff" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOibuzTrialClick("oibuz_setup_tutorial_payoff")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.02]"
              >
                <span>{isHi ? "अभी अकाउंट बनाएं" : "Start Free Trial Now"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => onSwitchLanguage(otherLang)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <Languages className="w-4 h-4" />
                <span>{isHi ? "Watch in English" : "हिंदी में देखें"}</span>
              </button>

              {onDemoClick && (
                <button
                  type="button"
                  onClick={onDemoClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <span>{isHi ? "डेमो बुक करें" : "Book Demo"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isHi ? "फिर से देखें" : "Replay"}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
