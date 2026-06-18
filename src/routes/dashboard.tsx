import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Target, Award, Zap, RotateCcw, ChevronRight, Search, Fish, QrCode, Shield } from "lucide-react";
import { useProgress, getBadge, ACHIEVEMENTS } from "@/lib/progress";

const ACH_ICONS: Record<string, typeof Trophy> = {
  "scam-spotter": Search,
  "phishing-hunter": Fish,
  "qr-detective": QrCode,
  "cyber-defender": Shield,
};

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Results Dashboard — CyberSense" },
      { name: "description", content: "Track your cyber awareness score, badges, and completed challenges." },
      { property: "og:title", content: "Your Cyber Awareness Dashboard" },
      { property: "og:description", content: "See your Cyber Awareness Score, unlocked achievements, and progress through every simulator and radar challenge." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/dashboard" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/dashboard" }],
  }),
  component: Dashboard,
});

const BADGES = [
  { name: "Beginner", tier: 1, desc: "You've started the journey.", req: "0 – 39% score" },
  { name: "Aware User", tier: 2, desc: "You spot most surface-level scams.", req: "40 – 64% score" },
  { name: "Cyber Defender", tier: 3, desc: "Sharp instincts, real defence.", req: "65 – 84% score" },
  { name: "Cyber Guardian", tier: 4, desc: "Elite. You protect others too.", req: "85 – 100% score" },
] as const;

function Dashboard() {
  const { progress, reset } = useProgress();
  const score = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
  const badge = getBadge(score);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <div className="text-xs font-mono text-primary mb-2">// PERFORMANCE_DASHBOARD</div>
        <h1 className="text-3xl sm:text-4xl font-bold">Your Cyber Awareness Score</h1>
        <p className="mt-2 text-muted-foreground">Live results from your simulator and radar runs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 glass-strong rounded-2xl p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Awareness Score</span>
            <span className="text-xs font-mono text-primary">{progress.correct}/{progress.total} correct</span>
          </div>
          <div className="flex items-end gap-3">
            <div className="font-display text-6xl sm:text-7xl font-bold neon-text">{score}</div>
            <div className="text-xl text-muted-foreground mb-2">/ 100</div>
          </div>
          <div className="mt-6 h-3 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-[var(--gradient-neon)] transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{badge.name}</span>
            <span className="text-xs text-muted-foreground">· Tier {badge.tier}/4</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Target className="h-4 w-4 text-primary" /> Completed</div>
          <div className="font-display text-4xl font-bold mt-2">{progress.completed.length}</div>
          <div className="text-xs text-muted-foreground mt-1">challenges</div>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><Zap className="h-4 w-4 text-primary" /> Accuracy</div>
          <div className="font-display text-4xl font-bold mt-2">{score}%</div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Badges</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map((b) => {
            const unlocked = badge.tier >= b.tier;
            return (
              <div
                key={b.name}
                className={`relative rounded-2xl p-5 transition-all ${unlocked ? "glass-strong neon-border" : "glass opacity-50"}`}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${unlocked ? "bg-primary/20" : "bg-secondary"}`}>
                  <Trophy className={`h-6 w-6 ${unlocked ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="mt-4 font-semibold">{b.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{b.desc}</div>
                <div className="mt-3 text-[10px] font-mono text-primary/80">{b.req}</div>
                {unlocked && <div className="absolute top-3 right-3 text-[10px] font-mono text-primary">UNLOCKED</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Achievements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a) => {
            const { unlocked, current, goal } = a.check(progress);
            const Icon = ACH_ICONS[a.id] ?? Trophy;
            const pct = Math.round((current / goal) * 100);
            return (
              <div
                key={a.id}
                className={`relative rounded-2xl p-5 transition-all ${unlocked ? "glass-strong neon-border" : "glass opacity-70"}`}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${unlocked ? "bg-primary/20" : "bg-secondary"}`}>
                  <Icon className={`h-6 w-6 ${unlocked ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="mt-4 font-semibold">{a.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.desc}</div>
                <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-[var(--gradient-neon)] transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">{a.requirement}</span>
                  <span className="text-primary">{current}/{goal}</span>
                </div>
                {unlocked && <div className="absolute top-3 right-3 text-[10px] font-mono text-primary">UNLOCKED</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <Link to="/simulator" className="group glass rounded-2xl p-6 flex items-center justify-between hover:neon-border transition-all">
          <div>
            <div className="font-semibold">Continue Simulator</div>
            <div className="text-sm text-muted-foreground">Play more scenarios</div>
          </div>
          <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/scam-radar" className="group glass rounded-2xl p-6 flex items-center justify-between hover:neon-border transition-all">
          <div>
            <div className="font-semibold">Open Scam Radar</div>
            <div className="text-sm text-muted-foreground">Classify more messages</div>
          </div>
          <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
      >
        <RotateCcw className="h-4 w-4" /> Reset progress
      </button>
    </div>
  );
}
