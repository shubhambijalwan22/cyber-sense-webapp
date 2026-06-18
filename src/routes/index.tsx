import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Zap, Target, AlertTriangle, QrCode, CreditCard, Video, ArrowRight, Sparkles, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSense — Think Before You Click" },
      { name: "description", content: "Gamified cyber awareness platform. Spot scams, train your instincts, stay safe online." },
      { property: "og:title", content: "CyberSense — Think Before You Click" },
      { property: "og:description", content: "Gamified cyber awareness platform. Spot scams, train your instincts, stay safe online." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/" }],
  }),
  component: Home,
});

const threats = [
  { icon: AlertTriangle, name: "Phishing Attacks", desc: "Deceptive emails & sites that steal credentials.", to: "/threat-library" },
  { icon: QrCode, name: "QR Code Scams", desc: "Malicious QR codes that redirect to fraud sites.", to: "/threat-library" },
  { icon: CreditCard, name: "UPI Fraud", desc: "Fake payment requests and collect-money tricks.", to: "/threat-library" },
  { icon: Video, name: "Deepfake Scams", desc: "AI-generated audio & video impersonations.", to: "/threat-library" },
] as const;

const stats = [
  { value: "5,000+", label: "Scam Cases Analyzed" },
  { value: "50+", label: "Threat Types Tracked" },
  { value: "100+", label: "Awareness Challenges" },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-navy/40 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-neon" />
              LIVE · scam intel feed
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Can You <span className="neon-text">Spot The Scam</span><br />
              Before It Spots <span className="italic text-primary/80">You?</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
              Train your cyber awareness through interactive challenges and real-world scam simulations.
              Built for the era of phishing, deepfakes, and UPI fraud.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/simulator"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.03]"
              >
                <Zap className="h-4 w-4" /> Start Challenge
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/threat-library"
                className="inline-flex items-center gap-2 rounded-md glass px-5 py-3 text-sm font-semibold hover:neon-border transition-all"
              >
                Explore Threat Library
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> Privacy-first</div>
              <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" /> No login required</div>
              <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Free forever</div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-up">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Orbits */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_24s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-primary/15 animate-[spin_18s_linear_infinite_reverse]" />
              <div className="absolute inset-12 rounded-full border border-primary/10 animate-[spin_30s_linear_infinite]" />
              {/* Core */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid h-44 w-44 place-items-center rounded-3xl glass-strong neon-border animate-float">
                  <Shield className="h-20 w-20 text-primary drop-shadow-[0_0_24px_oklch(0.85_0.24_145/0.6)]" />
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                  </div>
                </div>
              </div>
              {/* Floating icons */}
              {[
                { Icon: AlertTriangle, pos: "top-2 right-4", delay: "0s" },
                { Icon: QrCode, pos: "bottom-6 left-2", delay: "1s" },
                { Icon: CreditCard, pos: "top-1/2 -right-2", delay: "2s" },
                { Icon: Video, pos: "-bottom-2 right-10", delay: "1.5s" },
              ].map(({ Icon, pos, delay }, i) => (
                <div key={i} className={`absolute ${pos} grid h-12 w-12 place-items-center rounded-xl glass-strong animate-float`} style={{ animationDelay: delay }}>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center hover:neon-border transition-all">
              <div className="font-display text-3xl sm:text-4xl font-bold neon-text">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED THREATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <div className="text-xs font-mono text-primary mb-2">// THREAT_INTEL</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Threats</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">The scams targeting users right now. Know the patterns. Beat the trap.</p>
          </div>
          <Link to="/threat-library" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            View all threats <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {threats.map((t) => (
            <Link
              key={t.name}
              to={t.to}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:neon-border"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <t.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary font-medium">
                Learn more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-60 rounded-full bg-primary/30 blur-[100px]" />
          <div className="relative">
            <Target className="h-10 w-10 mx-auto text-primary" />
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Test your cyber instincts in 60 seconds</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Take the Cyber Decision Simulator and find out if you'd survive today's most common scams.
            </p>
            <Link
              to="/simulator"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-105 transition-transform"
            >
              Launch Simulator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
