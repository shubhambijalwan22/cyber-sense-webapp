import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Smartphone, Wallet, Share2, Lock, Globe, Check } from "lucide-react";

export const Route = createFileRoute("/safety-tips")({
  head: () => ({
    meta: [
      { title: "Cyber Safety Tips — CyberSense" },
      { name: "description", content: "Practical, no-nonsense tips on passwords, 2FA, safe payments, and device security." },
      { property: "og:title", content: "Cyber Safety Tips — Daily Digital Hygiene" },
      { property: "og:description", content: "Six categories of practical cyber hygiene — strong passwords, 2FA, safe payments, social media, mobile, and browsing." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/safety-tips" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/safety-tips" }],
  }),
  component: Tips,
});

const SECTIONS = [
  {
    icon: KeyRound, title: "Strong Passwords",
    tips: ["16+ characters, mix of types", "Unique password per account", "Use a password manager (Bitwarden, 1Password)", "Never reuse work and personal passwords"],
  },
  {
    icon: Lock, title: "Two-Factor Authentication",
    tips: ["Enable 2FA on email, banks, socials", "Prefer authenticator apps over SMS", "Save backup codes offline", "Use hardware keys for high-value accounts"],
  },
  {
    icon: Wallet, title: "Safe Online Payments",
    tips: ["Verify merchant name before paying", "Never enter UPI PIN to RECEIVE money", "Use virtual cards for online shops", "Enable transaction alerts"],
  },
  {
    icon: Share2, title: "Social Media Security",
    tips: ["Make accounts private by default", "Don't share location in real-time", "Review tagged photos regularly", "Audit connected third-party apps"],
  },
  {
    icon: Smartphone, title: "Mobile Device Security",
    tips: ["Install apps only from official stores", "Review app permissions monthly", "Keep OS auto-updated", "Use biometric + strong PIN"],
  },
  {
    icon: Globe, title: "Safe Browsing",
    tips: ["Check for HTTPS padlock", "Use a tracker-blocking browser/extension", "Avoid public Wi-Fi for banking", "Bookmark sensitive sites — don't search them"],
  },
] as const;

function Tips() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-xs font-mono text-primary mb-2">// SAFETY_PROTOCOLS</div>
        <h1 className="text-3xl sm:text-4xl font-bold">Daily Cyber Hygiene</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Six categories. Six small habits. A massively harder attack surface.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((s) => (
          <div key={s.title} className="glass rounded-2xl p-6 hover:neon-border transition-all">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 mb-4">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
            <ul className="space-y-2">
              {s.tips.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
