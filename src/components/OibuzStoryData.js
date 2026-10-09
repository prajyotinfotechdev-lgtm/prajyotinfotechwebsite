// src/components/OibuzStoryData.js
// Story scene metadata — separated so OibuzAudioStory.jsx gets clean HMR
export const OIBUZ_AUDIO_URL = "/audio/slideshow_audio.mpeg";

export const STORY_SCENES = [
  { id: 1, start: 0.0,  end: 5.4,  chapter: "01", label: "THE CHALLENGE",           color: "#1a3a6b", accent: "#2563eb" },
  { id: 2, start: 5.4,  end: 13.8, chapter: "02", label: "PROCESS CHAOS",           color: "#7c2d12", accent: "#ea580c" },
  { id: 3, start: 13.8, end: 18.0, chapter: "03", label: "MEET OIBUZ",              color: "#1e3a5f", accent: "#2563eb" },
  { id: 4, start: 18.0, end: 20.6, chapter: "04", label: "ATTENDANCE",              color: "#064e3b", accent: "#059669" },
  { id: 5, start: 20.6, end: 23.0, chapter: "05", label: "LEAVE & TIMESHEETS",      color: "#1e1b4b", accent: "#7c3aed" },
  { id: 6, start: 23.0, end: 28.3, chapter: "06", label: "PAYROLL",                 color: "#0f172a", accent: "#2563eb" },
  { id: 7, start: 28.3, end: 33.6, chapter: "07", label: "CONNECTED ORG",           color: "#0c1a2e", accent: "#0ea5e9" },
  { id: 8, start: 33.6, end: 40.0, chapter: "08", label: "CONNECT THE WORK",        color: "#0f1f3d", accent: "#2563eb" },
];
