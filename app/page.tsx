import {
  BellOff,
  Brain,
  Cpu,
  Database,
  Download,
  Github,
  HeartPulse,
  Mic2,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const proof = [
  { label: "Voice round-trip", value: "~1.2s" },
  { label: "Tests", value: "254 passing" },
  { label: "Idle CPU", value: "<2%" },
  { label: "Memory facts", value: "200 cap" },
];

const features = [
  {
    icon: Mic2,
    title: "Push-to-talk voice",
    text: "Ctrl+K starts a faster-whisper voice loop with interruptible LLM streaming and sentence-level Piper TTS.",
  },
  {
    icon: Brain,
    title: "Long-term memory",
    text: "Facts are embedded with sqlite-vec and also written to an Obsidian-compatible vault you can inspect and edit.",
  },
  {
    icon: Sparkles,
    title: "Animated desktop pet",
    text: "A frameless transparent companion uses VP9 alpha WebM states for idle, thinking, talking, acting, and happy moments.",
  },
  {
    icon: BellOff,
    title: "Policy-gated proactivity",
    text: "Morning greetings, idle check-ins, battery alerts, and meeting reminders obey quiet hours, snooze, and daily caps.",
  },
];

const stack = [
  ["LLM", "Groq cloud", "Ollama local", "Mock demo"],
  ["TTS", "Piper neural", "pyttsx3 fallback", "Mock audio"],
  ["Memory", "sqlite-vec", "Lexical fallback", "Markdown vault"],
];

const trust = [
  "First-run wizard explains provider choice, audio, privacy, hotkeys, and tray controls.",
  "Memory and proactive behavior are explicit opt-ins with settings to inspect, edit, delete, clear, snooze, or disable.",
  "Diagnostics export redacts sensitive data by default and keeps logs under the local ~/.kibo directory.",
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100vh-118px)] border-b border-[var(--line)]">
        <div className="mx-auto grid min-h-[calc(100vh-118px)] w-full max-w-[1360px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8 lg:px-16">
          <div className="py-8">
            <Reveal>
              <span className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft shadow-[var(--shadow-sm)]">
                <span className="h-2 w-2 rounded-full bg-coral" />
                Desktop companion / voice / memory
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 max-w-[10ch] font-sans text-[clamp(46px,7vw,92px)] font-black leading-[0.94] tracking-normal text-ink">
                KIBO lives on your desktop.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-[43rem] font-body text-[17px] leading-7 text-ink-soft">
                A frameless animated character that listens for your voice, answers with neural TTS,
                remembers what matters, and can run cloud-fast with Groq or locally through Ollama and
                Piper fallbacks.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/yash-dev007/KIBO"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-teal hover:shadow-[var(--shadow-md)]"
                >
                  <Github className="h-4 w-4" />
                  View source
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-6 py-3 font-sans text-sm font-semibold text-ink no-underline transition-all hover:-translate-y-0.5 hover:border-coral hover:text-coral hover:shadow-[var(--shadow-sm)]"
                >
                  <Play className="h-4 w-4" />
                  See runtime
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-10 grid max-w-[620px] grid-cols-2 gap-3 sm:grid-cols-4">
                {proof.map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/80 p-4 shadow-[var(--shadow-sm)]">
                    <dt className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink-faint">{item.label}</dt>
                    <dd className="mt-2 font-mono text-xl font-bold text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal direction="scale">
            <div id="demo" className="relative min-h-[560px] overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[var(--shadow-lg)]">
              <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between rounded-t-2xl border-b border-[var(--line)] bg-ash px-4 py-3 font-mono text-[11px] text-ink-faint">
                <span>KIBO / transparent overlay</span>
                <span>state: TALKING</span>
              </div>
              <div className="absolute left-4 top-20 z-20 max-w-[200px] sm:max-w-[260px] rounded-xl border border-[var(--line)] bg-paper/95 p-3 sm:p-4 shadow-[var(--shadow-md)] backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                  <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  sentence streaming
                </div>
                <p className="font-body text-xs sm:text-sm leading-6 text-ink-soft">
                  &ldquo;You mentioned preferring espresso. Want me to remember that?&rdquo;
                </p>
              </div>
              <div className="absolute bottom-8 left-4 sm:left-6 z-20 hidden sm:grid gap-2 font-mono text-[11px] text-ink-soft">
                <span className="rounded-lg border border-[var(--line)] bg-white/90 px-3 py-2">Ctrl+K push-to-talk</span>
                <span className="rounded-lg border border-[var(--line)] bg-white/90 px-3 py-2">Ctrl+Alt+K save clip</span>
              </div>
              <div className="absolute right-4 sm:right-5 top-20 z-20 grid w-[160px] sm:w-[230px] gap-2">
                {["Groq healthy", "Piper ready", "Memory enabled"].map((item) => (
                  <span key={item} className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white/85 px-2 sm:px-3 py-2 font-sans text-[10px] sm:text-xs font-semibold text-ink-soft">
                    <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-teal" />
                    {item}
                  </span>
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Hero_Img.png"
                alt="KIBO animated desktop companion character"
                className="absolute bottom-0 right-0 z-0 h-[70%] w-[88%] object-contain object-bottom md:h-[78%]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-b border-[var(--line)] bg-white py-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-16">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-coral">What KIBO does</span>
                <h2 className="mt-4 max-w-[12ch] font-sans text-[clamp(34px,5vw,64px)] font-black leading-none tracking-normal text-ink">
                  Not a chatbot widget.
                </h2>
              </div>
              <p className="max-w-[58ch] font-body text-[18px] leading-8 text-ink-soft">
                KIBO is a desktop-resident companion: visible as a character, reachable through hotkeys,
                backed by a local memory vault, and governed by policy when it speaks first.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 70} className="h-full">
                  <article className="flex h-full min-h-[280px] flex-col rounded-2xl bg-paper p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[var(--shadow-sm)]">
                      <Icon className="h-5 w-5 text-teal" />
                    </div>
                    <h3 className="mt-6 font-sans text-xl font-bold leading-tight text-ink">{feature.title}</h3>
                    <p className="mt-3 font-body text-sm leading-6 text-ink-mute">{feature.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section id="architecture" className="border-b border-[var(--line)] bg-ash py-20">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1fr] md:px-8 lg:px-16">
          <Reveal>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-coral">Runtime stack</span>
            <h2 className="mt-4 max-w-[13ch] font-sans text-[clamp(34px,5vw,62px)] font-black leading-none tracking-normal text-ink">
              Cloud-fast, locally capable.
            </h2>
            <p className="mt-6 max-w-[52ch] font-body text-base leading-7 text-ink-soft">
              Each dependency has a graceful degradation path so the app can still start when keys,
              models, or network access are missing.
            </p>
          </Reveal>
          <Reveal direction="right">
            <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[var(--shadow-sm)]">
              {stack.map((row) => (
                <div key={row[0]} className="grid grid-cols-1 border-b border-[var(--line)] last:border-b-0 sm:grid-cols-[120px_1fr_1fr_1fr]">
                  {row.map((cell, index) => (
                    <div key={cell} className={index === 0 ? "bg-ink p-4 font-mono text-sm font-bold text-white" : "p-4 font-sans text-sm font-semibold text-ink-soft"}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section id="privacy" className="border-b border-[var(--line)] bg-paper py-20">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8 lg:px-16">
          <Reveal>
            <div className="relative aspect-square max-w-[560px] overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[var(--shadow-sm)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/about.png" alt="KIBO companion detail" className="h-full w-full object-contain p-8" />
            </div>
          </Reveal>
          <Reveal direction="right">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-coral">Trust model</span>
            <h2 className="mt-4 font-sans text-[clamp(34px,5vw,62px)] font-black leading-none tracking-normal text-ink">
              Proactive only after permission.
            </h2>
            <div className="mt-8 grid gap-4">
              {trust.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-xl border border-[var(--line)] bg-white p-5 shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)]">
                  <span className="font-mono text-sm font-bold text-coral">0{index + 1}</span>
                  <p className="font-body text-base leading-7 text-ink-soft">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Install ── */}
      <section id="install" className="bg-ink py-20 text-white">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1fr] md:px-8 lg:px-16">
          <Reveal>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-coral-soft">Quick start</span>
            <h2 className="mt-4 max-w-[13ch] font-sans text-[clamp(34px,5vw,62px)] font-black leading-none tracking-normal">
              Run the companion locally.
            </h2>
            <p className="mt-6 max-w-[54ch] font-body text-base leading-7 text-white/72">
              Install with uv, optionally add Groq and Piper, then launch the Python backend and Electron frontend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://github.com/yash-dev007/KIBO" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-sans text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-coral-soft hover:shadow-[0_8px_24px_rgba(232,95,79,0.4)]">
                <Download className="h-4 w-4" />
                Get KIBO
              </a>
              <a href="https://github.com/yash-dev007/KIBO/issues" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:border-coral hover:shadow-[var(--shadow-sm)]">
                <HeartPulse className="h-4 w-4" />
                Report issue
              </a>
            </div>
          </Reveal>
          <Reveal direction="right">
            <pre className="overflow-x-auto rounded-xl border border-white/15 bg-black/35 p-5 font-mono text-sm leading-7 text-white/84"><code>{`git clone https://github.com/yash-dev007/KIBO.git
cd KIBO
pip install uv
uv sync

# Windows launcher
KIBO.bat`}</code></pre>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 p-4 transition-all hover:border-white/30 hover:bg-white/5">
                <Cpu className="mb-3 h-5 w-5 text-coral-soft" />
                <p className="font-sans text-sm font-semibold">Backend API runs on port 8765.</p>
              </div>
              <div className="rounded-xl border border-white/15 p-4 transition-all hover:border-white/30 hover:bg-white/5">
                <Database className="mb-3 h-5 w-5 text-coral-soft" />
                <p className="font-sans text-sm font-semibold">Local data lives under ~/.kibo.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
