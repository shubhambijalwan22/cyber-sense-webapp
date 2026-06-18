import { Link } from "@tanstack/react-router";
import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 neon-border">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="font-display text-lg font-bold">
              Cyber<span className="neon-text">Sense</span>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A gamified cyber awareness platform. Train your instincts, decode the threats,
            and stay one step ahead of every scam.
          </p>
          <div className="mt-5 flex gap-2">
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md glass hover:neon-border transition-all">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/simulator" className="hover:text-primary">Simulator</Link></li>
            <li><Link to="/scam-radar" className="hover:text-primary">Scam Radar</Link></li>
            <li><Link to="/threat-library" className="hover:text-primary">Threat Library</Link></li>
            <li><Link to="/safety-tips" className="hover:text-primary">Safety Tips</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CyberSense. All rights reserved.</p>
          <p className="text-xs font-mono text-primary/80">// stay sharp · stay safe · think before you click</p>
        </div>
      </div>
    </footer>
  );
}
