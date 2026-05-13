import { Reveal } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section className="relative py-[80px] sm:py-[90px] lg:py-[130px]" id="about">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">I.</span>
          <span className="hidden sm:inline-flex gap-[26px]">
            <span>Manifesto</span>
            <span className="text-coral">•</span>
            <span>KIBO / Vol 01</span>
          </span>
          <span>001 / 007</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-[50px] md:gap-[80px] items-center">
          <div className="flex flex-col">
            <Reveal delay={0}>
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                The Manifesto <span className="text-ink-faint font-medium ml-1">· Nº 02</span>
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(36px,5.4vw,78px)] my-[30px] md:mb-[36px]">
                Intelligence should be <em className="font-serif italic font-medium tracking-[-0.018em]">present,</em> not just <em className="font-serif italic font-medium tracking-[-0.018em]">available</em> on demand<span className="text-coral">.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-body text-[17px] leading-[1.55] text-ink-soft max-w-[42ch] mb-[36px]">
                We believe the next frontier of computing isn&apos;t a better tool, but a better relationship. KIBO lives on your desktop, a quiet presence that grows more capable the more you work together.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a className="inline-flex items-center gap-[12px] py-[14px] px-[22px] rounded-full font-sans text-[14px] font-medium tracking-[-0.005em] no-underline bg-transparent text-ink border border-[rgba(21,20,15,0.2)] transition-colors hover:bg-[rgba(21,20,15,0.04)] w-fit" href="#">
                Read the Whitepaper
                <span className="w-[16px] h-[16px] inline-flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                </span>
              </a>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex flex-wrap items-center gap-[16px] mt-[56px] text-ink-faint font-sans text-[11px] tracking-[0.18em] uppercase">
                <span className="w-[30px] h-[30px] rounded-full border border-ink inline-flex items-center justify-center font-serif italic text-[14px] text-ink shrink-0">К</span>
                <span className="flex-1 min-w-0">Presence · Context · Memory · Growth</span>
                <span className="inline-flex flex-col items-end leading-[1.4] shrink-0">
                  <span className="text-coral">New Interface</span>
                  <span className="text-ink">Est. MMXXVI</span>
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0} direction="right">
            <div className="relative aspect-square max-w-[620px] mx-auto md:ml-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/about.png" alt="" className="w-full h-full object-contain" />
              <div className="absolute right-[18px] bottom-[4px] font-sans text-[9.5px] text-ink-faint text-right tracking-[0.06em] leading-[1.45]">
                <b className="text-ink block">The evolution of the desktop metaphor.</b>
                (KIBO Studio, 2026)
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
