import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, ShieldAlert, RotateCcw, ChevronRight, Lightbulb } from "lucide-react";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Cyber Decision Simulator — CyberSense" },
      { name: "description", content: "Interactive scam scenarios. Make the call. See if you'd survive." },
      { property: "og:title", content: "Cyber Decision Simulator — Test Your Instincts" },
      { property: "og:description", content: "Play through realistic phishing, OTP, UPI, and QR scam scenarios with instant feedback and prevention tips." },
      { property: "og:url", content: "https://cyber-sense-maker.lovable.app/simulator" },
    ],
    links: [{ rel: "canonical", href: "https://cyber-sense-maker.lovable.app/simulator" }],
  }),
  component: Simulator,
});

type Scenario = {
  id: string;
  category: string;
  title: string;
  message: string;
  options: { id: string; label: string; correct: boolean }[];
  explanation: string;
  tips: string[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "prize",
    category: "Prize Scam",
    title: "The ₹50,000 Prize",
    message: "🎉 Congratulations! You have won ₹50,000 in our lucky draw. Click the link below to claim your reward: http://bit.ly/claim-prize-now",
    options: [
      { id: "a", label: "Click Link", correct: false },
      { id: "b", label: "Ignore Message", correct: true },
      { id: "c", label: "Verify Source", correct: true },
    ],
    explanation: "You didn't enter any contest. Unsolicited prize messages with shortened links are a classic phishing pattern. Ignoring or verifying via official channels is the safe path.",
    tips: [
      "Never click shortened links from unknown senders.",
      "Real organizations never ask you to claim a prize you didn't enter.",
      "Hover over links to preview the actual URL before clicking.",
    ],
  },
  {
    id: "otp",
    category: "OTP Scam",
    title: "Bank 'Verification' Call",
    message: "Caller: 'This is HDFC Bank. We've detected suspicious activity on your account. Please share the OTP we just sent to verify your identity and secure your card.'",
    options: [
      { id: "a", label: "Share the OTP", correct: false },
      { id: "b", label: "Hang up and call official bank number", correct: true },
      { id: "c", label: "Ask for their employee ID and share OTP", correct: false },
    ],
    explanation: "Banks never ask for OTPs — those exist precisely so only YOU can authorise a transaction. Sharing it lets the attacker drain your account.",
    tips: [
      "OTP = One Time Password = Only You.",
      "Always end the call and dial the number printed on your bank card.",
      "Report scam calls to 1930 (India's cybercrime helpline).",
    ],
  },
  {
    id: "job",
    category: "Job Offer Scam",
    title: "Dream Job, No Interview",
    message: "WhatsApp message: 'Hi! We saw your profile. We offer ₹80,000/month part-time work-from-home. Pay ₹2,500 registration fee to get started today!'",
    options: [
      { id: "a", label: "Pay the registration fee", correct: false },
      { id: "b", label: "Decline and report", correct: true },
      { id: "c", label: "Negotiate the fee", correct: false },
    ],
    explanation: "Legitimate employers pay YOU — they never ask for upfront fees. High salary + no interview + registration fee = scam trifecta.",
    tips: [
      "No real job demands payment for onboarding.",
      "Verify companies on LinkedIn and their official website.",
      "Report fake offers to the platform you received them on.",
    ],
  },
  {
    id: "whatsapp",
    category: "WhatsApp Scam",
    title: "'Mom, I lost my phone'",
    message: "Unknown number: 'Hey mom, this is my new number. I lost my phone and urgently need ₹15,000. Please send to this UPI ID: rescuepay@okhdfc'",
    options: [
      { id: "a", label: "Send the money immediately", correct: false },
      { id: "b", label: "Call your child on their known number first", correct: true },
      { id: "c", label: "Ask for a photo to verify", correct: false },
    ],
    explanation: "Family-emergency scams exploit urgency. AI can even fake photos. The only safe move: contact the person on a number you already trust.",
    tips: [
      "Establish a family 'safe word' for emergencies.",
      "Urgency is the #1 manipulation tactic — slow down.",
      "Verify through a separate, trusted channel.",
    ],
  },
  {
    id: "upi",
    category: "UPI Fraud",
    title: "Unexpected Money Request",
    message: "Your UPI app pings: 'Pay ₹4,999 to MERCHANT — Tap to approve.' The note reads: 'Refund processing — approve to receive.'",
    options: [
      { id: "a", label: "Approve to claim refund", correct: false },
      { id: "b", label: "Reject — you never receive money by approving a request", correct: true },
      { id: "c", label: "Approve a smaller amount as test", correct: false },
    ],
    explanation: "UPI 'collect requests' debit YOUR account when approved. You never need to enter a PIN to RECEIVE money — only to send it.",
    tips: [
      "PIN entry = money leaving your account.",
      "To receive money, you simply share your UPI ID or QR.",
      "Disable 'collect requests' from unknown people in your UPI app settings.",
    ],
  },
  {
    id: "qr",
    category: "QR Scam",
    title: "Refund via QR Code",
    message: "Online seller: 'Sorry for the defective product. Scan this QR to get your ₹1,200 refund instantly.'",
    options: [
      { id: "a", label: "Scan and approve", correct: false },
      { id: "b", label: "Refuse — request bank transfer instead", correct: true },
      { id: "c", label: "Scan but don't enter PIN", correct: false },
    ],
    explanation: "QR codes in India can only be used to PAY, not receive. Any 'refund via QR' is a scam to debit your account.",
    tips: [
      "Refunds reach you automatically — no QR scan needed.",
      "If you must scan, check the amount and direction carefully.",
      "Never approve a transaction you don't fully understand.",
    ],
  },
];

function Simulator() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const { record, progress } = useProgress();

  const scenario = SCENARIOS[index];
  const answered = selected !== null;
  const chosen = scenario.options.find((o) => o.id === selected);
  const isCorrect = chosen?.correct ?? false;

  function choose(id: string) {
    if (answered) return;
    setSelected(id);
    const opt = scenario.options.find((o) => o.id === id);
    const phishingIds = new Set(["prize", "otp", "job", "whatsapp"]);
    const paymentIds = new Set(["upi", "qr"]);
    const tags: string[] = ["sim"];
    if (phishingIds.has(scenario.id)) tags.push("phishing");
    if (paymentIds.has(scenario.id)) tags.push("payment");
    record(`sim:${scenario.id}`, !!opt?.correct, tags);
  }

  function next() {
    setSelected(null);
    setIndex((i) => (i + 1) % SCENARIOS.length);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-xs font-mono text-primary mb-2">// CYBER_DECISION_SIMULATOR</div>
        <h1 className="text-3xl sm:text-4xl font-bold">Make The Call</h1>
        <p className="mt-2 text-muted-foreground">Each scenario is real. Choose wisely.</p>
      </div>

      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
        <span>Scenario {index + 1} of {SCENARIOS.length}</span>
        <span>Score: <span className="text-primary font-semibold">{progress.correct}/{progress.total}</span></span>
      </div>

      <div className="glass-strong rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <ShieldAlert className="h-3 w-3" /> {scenario.category}
          </span>
          <span className="text-xs font-mono text-muted-foreground">#{scenario.id}</span>
        </div>

        <h2 className="text-2xl font-bold mb-4">{scenario.title}</h2>

        <div className="rounded-xl border border-border bg-background/40 p-5 font-mono text-sm leading-relaxed text-foreground/90">
          {scenario.message}
        </div>

        <div className="mt-6 grid gap-3">
          {scenario.options.map((o) => {
            const isThis = selected === o.id;
            const reveal = answered;
            const correctClass = reveal && o.correct ? "border-primary bg-primary/10" : "";
            const wrongClass = reveal && isThis && !o.correct ? "border-destructive bg-destructive/10" : "";
            return (
              <button
                key={o.id}
                onClick={() => choose(o.id)}
                disabled={answered}
                className={`group flex items-center justify-between rounded-xl border border-border bg-card/60 px-5 py-4 text-left text-sm font-medium transition-all hover:border-primary/60 hover:bg-card disabled:cursor-default ${correctClass} ${wrongClass}`}
              >
                <span>{o.label}</span>
                {reveal && o.correct && <CheckCircle2 className="h-5 w-5 text-primary" />}
                {reveal && isThis && !o.correct && <XCircle className="h-5 w-5 text-destructive" />}
                {!reveal && <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-6 animate-fade-up space-y-4">
            <div className={`rounded-xl p-5 border ${isCorrect ? "border-primary/50 bg-primary/5" : "border-destructive/50 bg-destructive/5"}`}>
              <div className="flex items-center gap-2 font-semibold">
                {isCorrect ? <><CheckCircle2 className="h-5 w-5 text-primary" /> Correct call.</> : <><XCircle className="h-5 w-5 text-destructive" /> That would've cost you.</>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{scenario.explanation}</p>
            </div>

            <div className="rounded-xl glass p-5">
              <div className="flex items-center gap-2 font-semibold mb-3">
                <Lightbulb className="h-4 w-4 text-primary" /> Prevention tips
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {scenario.tips.map((t) => (
                  <li key={t} className="flex gap-2"><span className="text-primary">›</span>{t}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={next}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-[1.01] transition-transform"
            >
              {index === SCENARIOS.length - 1 ? <><RotateCcw className="h-4 w-4" /> Restart scenarios</> : <>Next scenario <ChevronRight className="h-4 w-4" /></>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
