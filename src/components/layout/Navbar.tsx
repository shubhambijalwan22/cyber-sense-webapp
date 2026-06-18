import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/simulator", label: "Simulator" },
  { to: "/scam-radar", label: "Scam Radar" },
  { to: "/threat-library", label: "Threat Library" },
  { to: "/safety-tips", label: "Safety Tips" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-primary/10 neon-border">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">
              Cyber<span className="neon-text">Sense</span>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">think_before_you_click</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary bg-primary/10" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/60"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/simulator"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105"
          >
            Start Challenge
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />

          <button
            className="rounded-md p-2 text-foreground hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border px-4 py-3 space-y-1 glass-strong">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary bg-primary/10" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="block rounded-md px-3 py-2 text-sm font-medium"
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
