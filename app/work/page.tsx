import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export default function Work() {
  return (
    <section className="relative py-[80px] sm:py-[90px] lg:py-[130px]" id="work">
      <div className="bg-[#15140f] text-paper rounded-[24px] md:rounded-[32px] mx-3 md:mx-[64px] overflow-hidden relative p-[40px_20px] sm:p-[60px_32px] md:p-[110px_64px]">
        <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>\")", backgroundSize: "240px 240px" }} />

        <div className="relative flex justify-between items-center border-t border-[rgba(247,241,222,0.16)] pt-[16px] mb-[48px] font-sans text-[10.5px] tracking-[0.18em] uppercase text-[rgba(247,241,222,0.55)]">
          <span className="text-coral font-serif italic text-[14px] tracking-[0.04em] normal-case">V.</span>
          <span className="hidden sm:inline-flex gap-[24px]">
            <span>Artifacts</span>
            <span className="text-coral">•</span>
            <span>Generated with KIBO</span>
          </span>
          <span>005 / 007</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr_0.85fr] gap-[40px] md:gap-[48px] items-center relative z-10">
          <Reveal delay={0}>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                Case Studies
              </span>
              <h2 className="font-sans font-extrabold tracking-[-0.024em] leading-none text-[clamp(36px,5vw,66px)] my-[28px] md:mb-[36px] text-paper">
                Seeing the <em className="font-serif italic font-medium">world</em> through the <em className="font-serif italic font-medium">KIBO</em> lens<span className="text-coral">.</span>
              </h2>
              <Link href="#" className="inline-flex items-center gap-[18px] text-paper font-sans text-[14px] no-underline border-b-2 border-coral pb-[12px] w-fit after:content-['↗'] after:text-coral transition-colors hover:text-coral">
                View all studies
              </Link>
            </div>
          </Reveal>

          <Reveal delay={90}>
            {/* Rotation only on md+ to avoid layout issues on mobile */}
            <Link href="#work" className="bg-paper text-ink rounded-[18px] p-[28px_26px] sm:p-[32px_30px] relative block no-underline transition-all duration-280 hover:shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] hover:-translate-y-[4px] md:[transform:rotate(-1.2deg)]">
              <div className="flex justify-between items-center mb-[22px]">
                <span className="font-sans text-[10.5px] text-coral tracking-[0.18em] uppercase font-semibold">Case Study 01</span>
                <span className="font-mono text-[11px] text-ink-faint tracking-[0.04em]">01 / 02</span>
              </div>
              <h3 className="font-sans text-[clamp(22px,2.4vw,38px)] font-extrabold tracking-[-0.022em] leading-[1.05] mb-[14px]">Project Atlas</h3>
              <p className="font-body text-[14px] text-ink-mute leading-[1.55] mb-[22px] max-w-[28ch]">Managing 400+ assets for a global rebranding using KIBO&apos;s proactive retrieval.</p>
              <div className="aspect-[4/3] bg-bone rounded-[12px] overflow-hidden mb-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/work-1.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between text-ink-faint font-sans text-[11px] tracking-[0.16em] uppercase border-t border-[var(--line)] pt-[14px]">
                <span className="text-coral font-semibold">2026 · BRAND</span>
                <span>FEATURED</span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={180}>
            <Link href="#work" className="bg-paper text-ink rounded-[18px] p-[28px_26px] relative block no-underline transition-all duration-280 hover:shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] hover:-translate-y-[4px] md:[transform:rotate(2.4deg)_translateY(20px)]">
              <div className="flex justify-between items-center mb-[22px]">
                <span className="font-sans text-[10.5px] text-coral tracking-[0.18em] uppercase font-semibold">Case Study 02</span>
                <span className="font-mono text-[11px] text-ink-faint tracking-[0.04em]">02 / 02</span>
              </div>
              <h3 className="font-sans text-[clamp(22px,2.4vw,38px)] font-extrabold tracking-[-0.022em] leading-[1.05] mb-[14px]">Flux Design</h3>
              <p className="font-body text-[14px] text-ink-mute leading-[1.55] mb-[22px] max-w-[28ch]">Iterative product design where KIBO managed the entire versioning history.</p>
              <div className="aspect-[4/3] bg-bone rounded-[12px] overflow-hidden mb-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/work-2.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between text-ink-faint font-sans text-[11px] tracking-[0.16em] uppercase border-t border-[var(--line)] pt-[14px]">
                <span className="text-coral font-semibold">2026 · UI/UX</span>
                <span>STORY</span>
              </div>
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 flex justify-end items-center gap-[10px] z-20 md:absolute md:right-[64px] md:bottom-[64px] md:mt-0">
          <button className="w-[46px] h-[46px] rounded-full border border-[rgba(247,241,222,0.2)] bg-transparent text-paper inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-coral hover:border-coral">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 6l-6 6 6 6"/></svg>
          </button>
          <button className="w-[46px] h-[46px] rounded-full border border-coral bg-coral text-paper inline-flex items-center justify-center cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      {/* Voices */}
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto mt-[80px] sm:mt-[90px] lg:mt-[130px]">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">VI.</span>
          <span className="hidden sm:inline-flex gap-[26px]">
            <span>Voices</span>
            <span className="text-coral">•</span>
            <span>Early Adopters</span>
          </span>
          <span>006 / 007</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[50px] md:gap-[80px] items-center">
          <Reveal delay={0}>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                Voices <span className="text-ink-faint font-medium ml-1">· Nº 06</span>
              </span>
              <h2 className="font-sans text-[clamp(28px,4vw,54px)] font-bold tracking-[-0.022em] leading-[1.12] mb-[36px] mt-[30px] text-ink">
                &ldquo;KIBO is the first <em className="font-serif italic font-medium">AI companion</em> that doesn&apos;t feel like a chatbot. It feels like <em className="font-serif italic font-medium">part of the screen</em>.&rdquo;
              </h2>
              <div className="flex items-center gap-[18px] mt-[22px]">
                <span className="w-[50px] h-[50px] rounded-full bg-ink overflow-hidden inline-flex items-center justify-center text-paper font-serif italic text-[24px] shrink-0">k</span>
                <p className="font-sans text-[14px] text-ink font-semibold">Kieran Moore<br /><span className="block text-ink-mute font-normal">Lead Designer · Future Systems</span></p>
              </div>
              <div className="border-t border-[var(--line)] my-[40px] md:my-[60px] mb-[32px]" />
              <p className="font-body text-[14px] text-ink-mute mb-[26px] max-w-[38ch]">Integrating with the tools you already use every day.</p>
              <div className="grid grid-cols-3 gap-[18px] items-end">
                {[
                  { icon: <rect x="6" y="6" width="18" height="18"/>, name: "Cursor", type: "IDE" },
                  { icon: <circle cx="15" cy="15" r="9"/>, name: "Figma", type: "Design" },
                  { icon: <path d="M5 5l20 20M5 25l20-20"/>, name: "Linear", type: "Tasks" },
                ].map((tool) => (
                  <Link key={tool.name} href="#" className="flex flex-col gap-[10px] no-underline text-inherit cursor-pointer transition-transform hover:-translate-y-[2px] group">
                    <div className="h-[32px] flex items-center text-ink transition-colors group-hover:text-coral">
                      <svg viewBox="0 0 80 30" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-auto max-w-[90px]">{tool.icon}</svg>
                    </div>
                    <span className="font-sans text-[13px] text-ink tracking-[-0.005em] font-semibold transition-colors group-hover:text-coral">{tool.name}</span>
                    <small className="font-sans text-[10px] text-ink-faint tracking-[0.1em] uppercase">{tool.type}</small>
                  </Link>
                ))}
              </div>
              <Link href="#" className="mt-[48px] inline-flex items-center gap-[10px] font-sans text-[13px] text-ink no-underline tracking-[0.04em] border-b border-coral pb-[6px] w-fit after:content-['→'] after:text-coral hover:text-coral transition-colors">
                Read all stories
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0} direction="right">
            <div className="relative aspect-square max-w-[560px] mx-auto md:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/testimonial.png" alt="" className="w-full h-full object-contain" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto mt-[80px] sm:mt-[90px] lg:mt-[130px]" id="contact">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">VII.</span>
          <span className="hidden sm:inline-flex gap-[26px]">
            <span>Join</span>
            <span className="text-coral">•</span>
            <span>Final Terminal</span>
          </span>
          <span>007 / 007</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-[50px] items-center">
          <Reveal delay={0}>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                Begin the journey <span className="text-ink-faint font-medium ml-1">· Nº 07</span>
              </span>
              <h2 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(42px,6.6vw,100px)] my-[32px]">
                A more <em className="font-serif italic font-medium">thoughtful</em> way to <em className="font-serif italic font-medium">work</em> starts here<span className="text-coral">.</span>
              </h2>
              <p className="font-body text-[16px] leading-[1.55] text-ink-soft max-w-[36ch] mb-[36px]">
                KIBO is currently in limited alpha. Join the waitlist to be part of the first cohort.
              </p>
              <div className="flex flex-wrap items-center gap-[14px] mb-[32px]">
                <Link href="#" className="inline-flex items-center gap-[12px] py-[14px] px-[22px] rounded-full font-sans text-[14px] font-medium no-underline bg-coral text-white shadow-[0_14px_26px_-16px_rgba(237,111,92,1)] transition-transform hover:-translate-y-[1px] hover:bg-[#e25e4a]">
                  Join Alpha
                  <span className="w-[16px] h-[16px] inline-flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </span>
                </Link>
                <Link href="mailto:hello@kibo.ai" className="inline-flex items-center gap-[12px] p-[14px_18px_14px_22px] rounded-full border border-[var(--line)] font-sans text-[14px] text-ink no-underline hover:bg-[rgba(21,20,15,0.04)] transition-colors">
                  Open an issue
                  <span className="w-[22px] h-[22px] rounded-full bg-ink text-paper inline-flex items-center justify-center text-[12px]">→</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-[28px] gap-y-2 items-center mt-[32px] pt-[22px] border-t border-[var(--line)] font-sans text-[11px] tracking-[0.18em] uppercase text-ink-faint">
                <span className="text-coral font-semibold">● Live</span>
                <span>v0.1.0 / Proprietary</span>
                <span className="hidden sm:inline">0.0000° N · 0.0000° E</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0} direction="right">
            <div className="relative aspect-square max-w-[620px] mx-auto md:ml-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/cta.png" alt="" className="w-full h-full object-contain" />
              <div className="absolute right-[8px] top-[24px] font-serif italic text-[28px] text-ink-faint">Nº 08</div>
              <div className="absolute left-[-32px] top-[50%] font-sans text-[10.5px] tracking-[0.42em] uppercase text-ink-faint rotate-180 hidden md:block" style={{ writingMode: "vertical-rl" }}>
                KIBO · MMXXVI · FIN.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
