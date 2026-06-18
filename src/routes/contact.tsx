import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MessageSquare, Send, Github, Twitter, Linkedin, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CyberSense — Get in Touch" },
      { name: "description", content: "Questions, partnerships, or feedback for the CyberSense team? Send us a message and we'll reply within 48 hours." },
      { property: "og:title", content: "Contact CyberSense — Get in Touch" },
      { property: "og:description", content: "Reach the CyberSense team for questions, partnerships, or feedback. We read every message and reply within 48 hours." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/contact" }],
  }),
  component: Contact,
});

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  // Honeypot: hidden field bots auto-fill but real users never see
  const [website, setWebsite] = useState("");
  // Timestamp: bots typically submit in <2s
  const [mountedAt] = useState(() => Date.now());
  // Lightweight human check (math captcha)
  const [captcha] = useState(() => ({ a: 2 + Math.floor(Math.random() * 7), b: 1 + Math.floor(Math.random() * 6) }));
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot triggered → silently "succeed" to avoid bot feedback
    if (website.trim() !== "") {
      setSent(true);
      return;
    }
    // Too fast → likely a bot
    if (Date.now() - mountedAt < 2000) {
      toast.error("Please take a moment to review your message.");
      return;
    }
    // Captcha check
    if (Number(captchaAnswer) !== captcha.a + captcha.b) {
      setErrors({ captcha: "Incorrect answer" });
      toast.error("Spam check failed — try the math question again");
      return;
    }

    const parsed = Schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setCaptchaAnswer("");
    toast.success("Message sent!", { description: "We'll get back to you within 48 hours." });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <div className="text-xs font-mono text-primary mb-2">// CONTACT</div>
        <h1 className="text-4xl sm:text-5xl font-bold">Let's Talk Security</h1>
        <p className="mt-3 text-muted-foreground">Questions, partnerships, or feedback — we read every message.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-strong rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-10 animate-fade-up">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold">Message received</h3>
              <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within 48 hours.</p>
              <button onClick={() => setSent(false)} className="mt-5 text-sm text-primary hover:underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:neon-border transition-all"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:neon-border transition-all"
                  placeholder="you@domain.com"
                />
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={5}
                  className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:neon-border transition-all resize-none"
                  placeholder="How can we help?"
                />
              </Field>

              {/* Honeypot — hidden from real users, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden" style={{ position: "absolute" }}>
                <label>
                  Website (leave empty)
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              <Field label={`Spam check — what is ${captcha.a} + ${captcha.b}?`} error={errors.captcha}>
                <input
                  inputMode="numeric"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:neon-border transition-all"
                  placeholder="Answer"
                />
              </Field>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-[1.01] transition-transform"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <Mail className="h-5 w-5 text-primary mb-3" />
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-mono text-sm">hello@cybersense.app</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <MessageSquare className="h-5 w-5 text-primary mb-3" />
            <div className="text-sm text-muted-foreground">Response time</div>
            <div className="font-semibold">Within 48 hours</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-sm text-muted-foreground mb-3">Follow us</div>
            <div className="flex gap-2">
              {[
                { Icon: Github, label: "GitHub" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`CyberSense on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-md glass hover:neon-border transition-all"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{label}</label>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </div>
  );
}
