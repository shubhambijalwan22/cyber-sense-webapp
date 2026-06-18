import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Sparkles, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CyberSense — Our Mission" },
      { name: "description", content: "CyberSense is a gamified cyber awareness platform on a mission to build a safer digital society where no one falls for the same scam twice." },
      { property: "og:title", content: "About CyberSense — Our Mission" },
      { property: "og:description", content: "Our mission, vision, and what CyberSense offers — realistic scam simulations, threat intelligence, and safety training for everyone." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <div className="text-xs font-mono text-primary mb-2">// ABOUT</div>
        <h1 className="text-4xl sm:text-5xl font-bold">We're building cyber instincts, not just awareness.</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          CyberSense is a gamified platform that turns dry cybersecurity training into something you'd actually choose to do.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className="glass-strong rounded-2xl p-8">
          <Target className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-muted-foreground">Help users become smarter and safer online — through practice, not lectures.</p>
        </div>
        <div className="glass-strong rounded-2xl p-8">
          <Eye className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-muted-foreground">A cyber-aware digital society where no one falls for a scam because they've seen it before.</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">What CyberSense Offers</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { Icon: Sparkles, title: "Realistic Simulations", desc: "Practice with scams modelled on real incidents." },
            { Icon: ShieldCheck, title: "Threat Intelligence", desc: "A living library of modern attack patterns." },
            { Icon: Users, title: "For Everyone", desc: "From first-time users to security pros." },
          ].map(({ Icon, title, desc }) => (
            <div key={title}>
              <Icon className="h-6 w-6 text-primary mb-3" />
              <div className="font-semibold mb-1">{title}</div>
              <div className="text-sm text-muted-foreground">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/simulator"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-105 transition-transform"
        >
          Try a simulation
        </Link>
      </div>
    </div>
  );
}
