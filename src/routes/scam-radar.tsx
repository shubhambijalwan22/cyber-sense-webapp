import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Radar, CheckCircle2, AlertTriangle, ShieldX, RotateCcw } from "lucide-react";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/scam-radar")({
  head: () => ({
    meta: [
      { title: "Scam Radar — CyberSense" },
      { name: "description", content: "Classify real messages as Safe, Suspicious or Scam. Sharpen your radar." },
      { property: "og:title", content: "Scam Radar — Train Your Instincts" },
      { property: "og:description", content: "Classify real-world SMS, email, and DM samples as Safe, Suspicious, or Scam — and learn why." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/scam-radar" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/scam-radar" }],
  }),
  component: ScamRadar,
});

type Verdict = "safe" | "suspicious" | "scam";
type Msg = { id: string; from: string; channel: string; text: string; answer: Verdict; explanation: string };

const MESSAGES: Msg[] = [
  {
    id: "r1", from: "+91 90000 12345", channel: "SMS",
    text: "Dear customer, your SBI account will be blocked today. Update KYC: http://sbi-update.in/verify",
    answer: "scam",
    explanation: "Real banks never send KYC links via SMS. The domain is not sbi.co.in. Classic phishing.",
  },
  {
    id: "r2", from: "noreply@github.com", channel: "Email",
    text: "A new sign-in to your GitHub account from Chrome on macOS was detected. If this was you, no action needed.",
    answer: "safe",
    explanation: "Legitimate security notification from an authentic domain. No links demanding action.",
  },
  {
    id: "r3", from: "HR Recruiter", channel: "LinkedIn",
    text: "Hi! We have an opening matching your profile. Could we schedule a 30-min interview this week?",
    answer: "safe",
    explanation: "Normal recruiter outreach — no money request, no urgent links, polite tone.",
  },
  {
    id: "r4", from: "Amazon Support", channel: "WhatsApp",
    text: "Your order #82H1 is on hold. Verify payment details here to release: amzn-verify.co/pay",
    answer: "scam",
    explanation: "Amazon doesn't contact via WhatsApp with shady domains. The TLD and url are fake.",
  },
  {
    id: "r5", from: "Unknown", channel: "Email",
    text: "Hello, I'm a Nigerian prince needing help moving $10M. I'll share 30% with you for assistance.",
    answer: "scam",
    explanation: "The original — and still active — advance-fee fraud. Never engage.",
  },
  {
    id: "r6", from: "Swiggy", channel: "SMS",
    text: "Your OTP for order delivery is 482910. Do not share with anyone.",
    answer: "safe",
    explanation: "Standard delivery OTP from a legit sender. No link, no action requested.",
  },
  {
    id: "r7", from: "+1 415 555 0144", channel: "Call",
    text: "This is Microsoft Support. Your Windows is infected. Install our remote tool to fix it.",
    answer: "scam",
    explanation: "Microsoft never cold-calls. Remote-tool requests = full system takeover.",
  },
  {
    id: "r8", from: "Friend", channel: "Instagram DM",
    text: "Hey, check this out 😂 https://insta-clips.shortly/abc — looks just like you!",
    answer: "suspicious",
    explanation: "Friend's account may be compromised. Mystery link + curiosity bait = classic worm spread.",
  },
  {
    id: "r9", from: "+91 75000 99221", channel: "SMS",
    text: "Hi, this is Priya from Tech Mahindra HR. Can I call you regarding your application? Reply YES.",
    answer: "suspicious",
    explanation: "Could be real, could be a lead-generation scam. Verify the recruiter on LinkedIn before engaging.",
  },
];

const LABELS: Record<Verdict, { label: string; icon: typeof CheckCircle2; tone: string }> = {
  safe: { label: "Safe", icon: CheckCircle2, tone: "text-primary border-primary/50 bg-primary/10" },
  suspicious: { label: "Suspicious", icon: AlertTriangle, tone: "text-warning border-warning/50 bg-warning/10" },
  scam: { label: "Scam", icon: ShieldX, tone: "text-destructive border-destructive/50 bg-destructive/10" },
};

function ScamRadar() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Verdict | null>(null);
  const { record, progress } = useProgress();
  const m = MESSAGES[i];
  const correct = pick === m.answer;

  function choose(v: Verdict) {
    if (pick) return;
    setPick(v);
    const isCorrect = v === m.answer;
    const tags = ["radar", `radar-${m.answer}`];
    record(`radar:${m.id}`, isCorrect, tags);
  }
  function next() { setPick(null); setI((x) => (x + 1) % MESSAGES.length); }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-primary mb-2">
          <Radar className="h-3 w-3" /> // SCAM_RADAR
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Classify The Signal</h1>
        <p className="mt-2 text-muted-foreground">Read each message. Mark it as Safe, Suspicious, or Scam.</p>
      </div>

      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
        <span>Message {i + 1} of {MESSAGES.length}</span>
        <span>Score: <span className="text-primary font-semibold">{progress.correct}/{progress.total}</span></span>
      </div>

      <div className="glass-strong rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
          <span className="text-primary">{m.channel}</span>
          <span>from: {m.from}</span>
        </div>
        <div className="rounded-xl border border-border bg-background/40 p-5 text-sm leading-relaxed font-mono">
          {m.text}
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {(Object.keys(LABELS) as Verdict[]).map((v) => {
            const L = LABELS[v];
            const reveal = pick !== null;
            const isPick = pick === v;
            const isAnswer = m.answer === v;
            let cls = "border-border bg-card/60 hover:border-primary/50";
            if (reveal && isAnswer) cls = L.tone + " border";
            else if (reveal && isPick && !isAnswer) cls = "border-destructive/60 bg-destructive/10 text-destructive";
            return (
              <button
                key={v}
                onClick={() => choose(v)}
                disabled={!!pick}
                className={`rounded-xl border px-5 py-4 font-semibold inline-flex items-center justify-center gap-2 transition-all ${cls}`}
              >
                <L.icon className="h-4 w-4" /> {L.label}
              </button>
            );
          })}
        </div>

        {pick && (
          <div className="mt-6 animate-fade-up">
            <div className={`rounded-xl border p-5 ${correct ? "border-primary/50 bg-primary/5" : "border-destructive/50 bg-destructive/5"}`}>
              <div className="font-semibold mb-1">
                {correct ? "✓ Correct" : "✗ Not quite"} — Real answer: <span className="text-primary">{LABELS[m.answer].label}</span>
              </div>
              <p className="text-sm text-muted-foreground">{m.explanation}</p>
            </div>
            <button
              onClick={next}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-[1.01] transition-transform"
            >
              {i === MESSAGES.length - 1 ? <><RotateCcw className="h-4 w-4" /> Restart</> : "Next message"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
