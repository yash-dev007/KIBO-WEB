import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <section className="relative p-0 min-h-[calc(100vh-140px)] flex flex-col items-stretch border-b border-[var(--line)] pt-[130px] sm:pt-[90px]">
        <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto w-full flex-none">
          <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">I.</span>
            <span className="inline-flex gap-[26px]">
              <span>Hero / Cover Plate</span>
              <span className="text-coral">•</span>
              <span>KIBO / Volume 01</span>
            </span>
            <span>001 / 008</span>
          </div>
        </div>
        <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto w-full flex-auto relative grid grid-cols-1 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-[36px] items-stretch">
          <div className="py-[4vh] flex flex-col relative">
            <Reveal delay={0}>
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                Persistent digital life <span className="text-ink-faint font-medium ml-1">· Nº 01</span>
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(44px,5vw,78px)] mb-[28px]">
                A companion that <em className="font-serif italic font-medium tracking-[-0.018em]">lives</em> with you, <em className="font-serif italic font-medium tracking-[-0.018em]">learns</em> from you, and <em className="font-serif italic font-medium tracking-[-0.018em]">evolves</em><span className="text-coral">.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-body text-[16px] leading-[1.55] text-ink-soft max-w-[38ch] mb-[30px]">
                The first desktop companion designed for deep integration. KIBO doesn&apos;t just wait for prompts—it watches, listens, and acts as a silent partner in your creative process. Built on the Atelier Zero editorial system.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="inline-flex items-center gap-[14px] mb-[38px]">
                <button className="inline-flex items-center gap-[12px] py-[14px] px-[22px] rounded-full font-sans text-[14px] font-medium tracking-[-0.005em] no-underline bg-coral text-white shadow-[0_14px_26px_-16px_rgba(237,111,92,1)] transition-transform hover:-translate-y-[1px] hover:bg-[#e25e4a]">
                  Join Waitlist
                  <span className="w-[16px] h-[16px] inline-flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </span>
                </button>
                <button className="inline-flex items-center gap-[12px] py-[14px] px-[22px] rounded-full font-sans text-[14px] font-medium tracking-[-0.005em] no-underline bg-transparent text-ink border border-[rgba(21,20,15,0.2)] transition-colors hover:bg-[rgba(21,20,15,0.04)]">
                  Watch Demo
                  <span className="w-[16px] h-[16px] inline-flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-current fill-none stroke-[1.6px]"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg>
                  </span>
                </button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex items-center gap-[22px] flex-nowrap mb-[28px]">
                <div className="inline-flex items-center gap-[9px] whitespace-nowrap">
                  <span className="w-[34px] h-[34px] rounded-full border border-ink border-solid inline-flex items-center justify-center font-sans text-[11px] font-bold shrink-0">01</span>
                  <span className="font-sans text-[11px] leading-[1.25] text-ink-soft tracking-[0.04em] uppercase">
                    <b className="block font-bold text-ink text-[12px]">Awareness</b>Implicit context
                  </span>
                </div>
                <div className="inline-flex items-center gap-[9px] whitespace-nowrap">
                  <span className="w-[34px] h-[34px] rounded-full border border-ink border-dashed inline-flex items-center justify-center font-sans text-[11px] font-bold shrink-0">∞</span>
                  <span className="font-sans text-[11px] leading-[1.25] text-ink-soft tracking-[0.04em] uppercase">
                    <b className="block font-bold text-ink text-[12px]">Memory</b>Long-term index
                  </span>
                </div>
                <div className="inline-flex items-center gap-[9px] whitespace-nowrap">
                  <span className="w-[34px] h-[34px] rounded-full border border-coral text-coral border-dashed inline-flex items-center justify-center font-sans text-[11px] font-bold shrink-0">0</span>
                  <span className="font-sans text-[11px] leading-[1.25] text-ink-soft tracking-[0.04em] uppercase">
                    <b className="block font-bold text-ink text-[12px]">Privacy</b>Local execution
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-auto pt-[22px] border-t border-[var(--line)] flex items-center justify-between gap-[24px]">
                <span className="font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint leading-[1.4]">↳ &nbsp; Launch KIBO &nbsp; · &nbsp; Shift + K to reveal</span>
                <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">0.0000° N · 0.0000° E</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0} direction="scale">
            <div className="relative h-[calc(100vh-160px)] max-h-[860px] ml-auto mr-[-12px] w-full overflow-visible hidden md:block">
              <span className="absolute w-[22px] h-[22px] border-solid border-ink-faint top-0 left-0 border-t border-l"></span>
              <span className="absolute w-[22px] h-[22px] border-solid border-ink-faint top-0 right-0 border-t border-r"></span>
              <span className="absolute w-[22px] h-[22px] border-solid border-ink-faint bottom-0 left-0 border-b border-l"></span>
              <span className="absolute w-[22px] h-[22px] border-solid border-ink-faint bottom-0 right-0 border-b border-r"></span>
              <span className="absolute font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint leading-[1.4] whitespace-nowrap font-mono text-[10px] tracking-[0.04em] normal-case top-[14px] left-[14px]">KIBO / ALPHA-01</span>
              <span className="absolute font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint leading-[1.4] whitespace-nowrap top-[14px] right-[14px] text-right">Plate Nº 01</span>
              <span className="absolute font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint leading-[1.4] whitespace-nowrap font-mono text-[10px] tracking-[0.04em] normal-case bottom-[14px] left-[14px]">LOC · LOCALHOST</span>
              <span className="absolute font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint leading-[1.4] whitespace-nowrap bottom-[14px] right-[14px] text-right">Designed in&nbsp;<span className="text-coral">Atelier Zero</span></span>
              {/* Note: In Next.js, images are usually loaded from public folder or via next/image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/Hero_Img.png" alt="" className="w-full h-full object-contain object-right" />
              <div className="absolute right-[12px] top-[36%] font-sans text-[10.5px] font-semibold tracking-[0.16em] text-ink-faint uppercase bg-[rgba(239,231,210,0.7)] p-[10px_12px] border border-[var(--line-soft)] rounded-[6px] backdrop-blur-[2px]">
                <span className="block leading-[1.6]"><span className="text-coral mr-[6px] font-bold">01</span>Observe</span>
                <span className="block leading-[1.6] text-ink font-bold"><span className="text-coral mr-[6px] font-bold">02</span>Learn</span>
                <span className="block leading-[1.6]"><span className="text-coral mr-[6px] font-bold">03</span>Act</span>
                <span className="block leading-[1.6]"><span className="text-coral mr-[6px] font-bold">04</span>Remember</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-b border-[var(--line)] py-[26px] pb-[28px] bg-paper relative overflow-hidden">
        <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] gap-[32px] items-center">
          <div className="inline-flex items-center gap-[14px] md:border-r border-b md:border-b-0 border-[var(--line)] md:pr-[24px] pb-[12px] md:pb-0 min-h-0 md:min-h-[56px]">
            <div className="w-[22px] h-[22px] rounded-full border border-[var(--line)] inline-flex items-center justify-center shrink-0">
              <span className="w-[6px] h-[6px] rounded-full bg-coral inline-block animate-pulse"></span>
            </div>
            <div className="font-sans text-[11px] leading-[1.4] flex flex-col gap-[3px]">
              <b className="text-ink font-bold tracking-[0.18em] uppercase">Network Status</b>
              <span className="text-ink-faint text-[10px] tracking-[0.14em] uppercase">Live Contextual Loop</span>
            </div>
          </div>
          <div className="grid gap-[8px] min-w-0">
            <div className="overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
              <div className="inline-flex items-center gap-[36px] w-max whitespace-nowrap animate-marquee-x hover:[animation-play-state:paused]">
                {/* Simulated Ticker Content */}
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">35.6895° N, 139.6917° E</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">Tokyo Node</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">51.5074° N, 0.1278° W</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">London Hub</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">40.7128° N, 74.0060° W</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">New York Instance</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">48.8566° N, 2.3522° E</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">Paris Core</span>
                </span>
                {/* Duplicate */}
                 <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">35.6895° N, 139.6917° E</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">Tokyo Node</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="font-mono text-[10.5px] text-ink-faint tracking-normal">51.5074° N, 0.1278° W</span>
                  <span className="uppercase tracking-[0.18em] text-ink font-medium">London Hub</span>
                </span>
              </div>
            </div>
            <div className="overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)" }}>
              <div className="inline-flex items-center gap-[36px] w-max whitespace-nowrap animate-marquee-x-reverse hover:[animation-play-state:paused]">
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="uppercase tracking-[0.16em] text-coral text-[10px]">Contributor</span>
                  <span className="font-mono text-ink text-[11.5px] font-medium">@alex_v</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="uppercase tracking-[0.16em] text-coral text-[10px]">Contributor</span>
                  <span className="font-mono text-ink text-[11.5px] font-medium">@m_parker</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="uppercase tracking-[0.16em] text-coral text-[10px]">Contributor</span>
                  <span className="font-mono text-ink text-[11.5px] font-medium">@sara_chen</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="uppercase tracking-[0.16em] text-coral text-[10px]">Contributor</span>
                  <span className="font-mono text-ink text-[11.5px] font-medium">@j_doe</span>
                </span>
                {/* Duplicate */}
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="uppercase tracking-[0.16em] text-coral text-[10px]">Contributor</span>
                  <span className="font-mono text-ink text-[11.5px] font-medium">@alex_v</span>
                </span>
                <span className="inline-flex items-baseline gap-[8px] font-sans text-[12px] tracking-[0.04em] text-ink-mute shrink-0">
                  <span className="text-coral text-[16px] leading-none relative -top-[1px] mr-[2px]">•</span>
                  <span className="uppercase tracking-[0.16em] text-coral text-[10px]">Contributor</span>
                  <span className="font-mono text-ink text-[11.5px] font-medium">@m_parker</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}