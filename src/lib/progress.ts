import { useEffect, useState, useCallback } from "react";

const KEY = "cybersense_progress_v1";

export type Progress = {
  correct: number;
  total: number;
  completed: string[];
  tags: Record<string, number>; // correct answers per tag
};

const initial: Progress = { correct: 0, total: 0, completed: [], tags: {} };

function read(): Progress {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(initial);

  useEffect(() => {
    setProgress(read());
    const onStorage = () => setProgress(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("cybersense:progress", onStorage as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cybersense:progress", onStorage as EventListener);
    };
  }, []);

  const record = useCallback((id: string, correct: boolean, tags: string[] = []) => {
    const cur = read();
    if (cur.completed.includes(id)) return;
    const nextTags = { ...cur.tags };
    if (correct) {
      for (const t of tags) nextTags[t] = (nextTags[t] ?? 0) + 1;
    }
    const next: Progress = {
      total: cur.total + 1,
      correct: cur.correct + (correct ? 1 : 0),
      completed: [...cur.completed, id],
      tags: nextTags,
    };
    localStorage.setItem(KEY, JSON.stringify(next));
    setProgress(next);
    window.dispatchEvent(new Event("cybersense:progress"));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    setProgress(initial);
    window.dispatchEvent(new Event("cybersense:progress"));
  }, []);

  return { progress, record, reset };
}

export function getBadge(score: number): { name: string; tier: 1 | 2 | 3 | 4 } {
  if (score >= 85) return { name: "Cyber Guardian", tier: 4 };
  if (score >= 65) return { name: "Cyber Defender", tier: 3 };
  if (score >= 40) return { name: "Aware User", tier: 2 };
  return { name: "Beginner", tier: 1 };
}

export type Achievement = {
  id: string;
  name: string;
  desc: string;
  requirement: string;
  check: (p: Progress) => { unlocked: boolean; current: number; goal: number };
};

const tagCount = (p: Progress, tag: string) => p.tags[tag] ?? 0;

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "scam-spotter",
    name: "Scam Spotter",
    desc: "Correctly flag 3 outright scams on the Radar.",
    requirement: "3 scams identified",
    check: (p) => {
      const c = tagCount(p, "radar-scam");
      return { unlocked: c >= 3, current: Math.min(c, 3), goal: 3 };
    },
  },
  {
    id: "phishing-hunter",
    name: "Phishing Hunter",
    desc: "Survive 2 phishing-style simulator scenarios (Prize, OTP, Job, WhatsApp).",
    requirement: "2 phishing wins",
    check: (p) => {
      const c = tagCount(p, "phishing");
      return { unlocked: c >= 2, current: Math.min(c, 2), goal: 2 };
    },
  },
  {
    id: "qr-detective",
    name: "QR Detective",
    desc: "Beat the QR + UPI payment-trap scenarios.",
    requirement: "2 payment-trap wins",
    check: (p) => {
      const c = tagCount(p, "payment");
      return { unlocked: c >= 2, current: Math.min(c, 2), goal: 2 };
    },
  },
  {
    id: "cyber-defender",
    name: "Cyber Defender",
    desc: "Reach 10 correct answers overall across simulator + radar.",
    requirement: "10 total correct",
    check: (p) => ({ unlocked: p.correct >= 10, current: Math.min(p.correct, 10), goal: 10 }),
  },
];
