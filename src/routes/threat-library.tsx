import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Fish, Bug, Lock, QrCode, KeyRound, CreditCard, Video, Users, AlertTriangle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/threat-library")({
  head: () => ({
    meta: [
      { title: "Threat Library — CyberSense" },
      { name: "description", content: "Searchable knowledge center for phishing, malware, ransomware, UPI fraud and more." },
      { property: "og:title", content: "Threat Library — Know Every Threat" },
      { property: "og:description", content: "Searchable index of modern cyber threats — phishing, malware, ransomware, QR fraud, UPI fraud, deepfakes — with warning signs and prevention." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/threat-library" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/threat-library" }],
  }),
  component: Library,
});

const THREATS = [
  {
    name: "Phishing", icon: Fish, category: "Social",
    desc: "Fraudulent messages designed to trick you into revealing credentials or installing malware.",
    signs: ["Urgent or threatening language", "Generic greetings ('Dear customer')", "Mismatched or shortened URLs", "Spelling and grammar errors"],
    prevention: ["Hover over links before clicking", "Verify sender domain carefully", "Use a password manager (auto-fill won't work on fake domains)", "Enable two-factor authentication"],
  },
  {
    name: "Malware", icon: Bug, category: "Malware",
    desc: "Malicious software including spyware, trojans, and keyloggers that compromise your device.",
    signs: ["Sudden slowdown or crashes", "Unknown apps installed", "Browser redirects to strange sites", "High data usage"],
    prevention: ["Install apps only from official stores", "Keep OS and apps updated", "Use a reputable antivirus", "Avoid pirated software"],
  },
  {
    name: "Ransomware", icon: Lock, category: "Malware",
    desc: "Encrypts your files and demands payment for decryption. Often targets businesses and individuals alike.",
    signs: ["Files renamed with strange extensions", "Ransom note on desktop", "Inability to open documents"],
    prevention: ["Keep offline backups", "Patch systems regularly", "Disable macros in Office documents", "Never pay — restore from backup"],
  },
  {
    name: "QR Fraud", icon: QrCode, category: "Payment",
    desc: "Malicious QR codes that redirect to phishing pages or trigger unauthorised UPI payments.",
    signs: ["Unexpected payment screen on scan", "QR code stuck over a legitimate one", "Request to scan to 'receive' money"],
    prevention: ["Always check URL preview after scanning", "Never enter PIN to receive money", "Scan only QR codes from trusted sources"],
  },
  {
    name: "OTP Fraud", icon: KeyRound, category: "Payment",
    desc: "Social engineering to extract one-time passwords for account takeover or transactions.",
    signs: ["Caller claims to be from bank/telecom", "Asks for OTP to 'verify' or 'cancel'", "Creates urgency"],
    prevention: ["Never share OTP — even with bank staff", "Hang up and call official number", "Report to 1930 (India cybercrime)"],
  },
  {
    name: "UPI Fraud", icon: CreditCard, category: "Payment",
    desc: "Collect-money requests, fake refunds, and impersonation to drain bank accounts via UPI.",
    signs: ["Collect requests from strangers", "Refund offers via QR", "Pressure to enter UPI PIN"],
    prevention: ["PIN = paying, not receiving", "Disable collect requests from unknown users", "Verify merchant name before approving"],
  },
  {
    name: "Deepfake Scams", icon: Video, category: "Social",
    desc: "AI-generated audio or video impersonating real people to manipulate or extort.",
    signs: ["Unnatural blinking or lip sync", "Voice timing feels off", "Sudden financial requests from familiar voices"],
    prevention: ["Verify via a separate trusted channel", "Establish family safe-words", "Be skeptical of unexpected video calls"],
  },
  {
    name: "Social Engineering", icon: Users, category: "Social",
    desc: "Manipulation tactics that exploit trust and emotion rather than technical vulnerabilities.",
    signs: ["Urgency or fear pressure", "Authority impersonation (police, boss)", "Too-good-to-be-true offers"],
    prevention: ["Pause before acting on urgency", "Verify identity independently", "When in doubt — say no"],
  },
] as const;

const CATEGORIES = ["All", "Social", "Malware", "Payment"] as const;

function Library() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(
    () => THREATS.filter((t) =>
      (cat === "All" || t.category === cat) &&
      (t.name.toLowerCase().includes(q.toLowerCase()) ||
        t.desc.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, cat]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-xs font-mono text-primary mb-2">// THREAT_LIBRARY</div>
        <h1 className="text-3xl sm:text-4xl font-bold">Know Every Threat</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">A searchable index of modern cyber threats — what they look like, and how to beat them.</p>
      </div>

      <div className="relative max-w-xl mx-auto mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search threats…"
          className="w-full rounded-xl glass-strong pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:neon-border transition-all"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              cat === c
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-neon)]"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => {
          const isOpen = open === t.name;
          return (
            <button
              key={t.name}
              onClick={() => setOpen(isOpen ? null : t.name)}
              className={`text-left glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:neon-border ${isOpen ? "neon-border" : ""}`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 mb-4">
                <t.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>

              {isOpen && (
                <div className="mt-5 animate-fade-up space-y-4">
                  <div>
                    <div className="text-xs font-mono text-warning flex items-center gap-1 mb-2"><AlertTriangle className="h-3 w-3" /> WARNING SIGNS</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {t.signs.map((s) => <li key={s} className="flex gap-2"><span className="text-warning">›</span>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-primary flex items-center gap-1 mb-2"><ShieldCheck className="h-3 w-3" /> PREVENTION</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {t.prevention.map((s) => <li key={s} className="flex gap-2"><span className="text-primary">›</span>{s}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {!isOpen && <div className="mt-4 text-xs text-primary font-medium">Tap to expand →</div>}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-12">No threats match "{q}"</div>
      )}
    </div>
  );
}
