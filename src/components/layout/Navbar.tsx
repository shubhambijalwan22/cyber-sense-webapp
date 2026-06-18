import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "../../context/AuthContext";

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
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";

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
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md bg-secondary/80 border border-border px-3 py-1.5 text-sm font-medium">
                <UserIcon className="h-4 w-4 text-primary" />
                <span className="max-w-[120px] truncate">{displayName}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-destructive/15 hover:text-destructive hover:border-destructive/30 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105"
            >
              Sign In
            </Link>
          )}
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
        <div className="lg:hidden border-t border-border px-4 py-3 space-y-2 glass-strong">
          <div className="space-y-1">
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

          <div className="pt-2 border-t border-border/50">
            {user ? (
              <div className="space-y-2 px-3 py-2 bg-secondary/35 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <UserIcon className="h-4 w-4 text-primary" />
                  <span className="truncate">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-destructive/10 border border-destructive/25 text-destructive py-2 text-sm font-semibold transition-colors hover:bg-destructive/20 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
