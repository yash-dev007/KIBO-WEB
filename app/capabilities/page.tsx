import { Reveal } from "@/components/ui/Reveal";

export default function Capabilities() {
  return (
    <section className="relative py-[130px] sm:py-[90px]" id="capabilities">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">II.</span>
          <span className="inline-flex gap-[26px]">
            <span>Abilities</span>
            <span className="text-coral">•</span>
            <span>Reactive Loop</span>
          </span>
          <span>002 / 007</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] md:gap-[70px] items-center">
          <Reveal delay={0} direction="left">
            <div className="relative aspect-square max-w-[600px]">
              <span className="absolute w-[22px] h-[22px] border-solid border-ink-faint top-0 left-0 border-t border-l"></span>
              <span className="absolute w-[22px] h-[22px] border-solid border-ink-faint bottom-0 right-0 border-b border-r"></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/xyz.avif" alt="" className="w-full h-full object-contain" />
              <div className="absolute right-[-42px] top-[50%] font-sans text-[10.5px] tracking-[0.42em] uppercase text-ink-faint rotate-180 hidden md:block" style={{ writingMode: 'vertical-rl' }}>
                <b className="text-coral">KIBO COMPANION</b> &nbsp;·&nbsp; ABILITIES MATRIX &nbsp;·&nbsp; K/01
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col">
            <Reveal delay={0}>
              <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
                Capabilities <span className="text-ink-faint font-medium ml-1">· Nº 03</span>
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(40px,4.8vw,64px)] my-[22px] md:mb-[30px]">
                Contextual awareness <em className="font-serif italic font-medium tracking-[-0.018em]">meets deep</em> memory<span className="text-coral">.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-body text-[16px] leading-[1.55] text-ink-soft max-w-[36ch] mb-[30px]">
                KIBO uses 12 real-time sensors to understand your current focus and retrieve relevant memories from its persistent local bank.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mt-[22px]">
              <Reveal delay={0}>
                <div className="p-[28px_26px_32px] bg-bone rounded-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18),inset_0_0_0_1px_rgba(21,20,15,0.06)] relative overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] group">
                  <div className="font-serif italic text-[22px] font-medium text-coral tracking-[0.04em] mb-[16px] flex justify-between items-baseline">
                    01<span className="font-sans text-[9.5px] text-ink-faint tracking-[0.18em] uppercase not-italic font-medium">Observation</span>
                  </div>
                  <svg className="w-[28px] h-[28px] mb-[16px] text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
                  </svg>
                  <h3 className="font-sans text-[22px] font-bold leading-[1.05] tracking-[-0.014em] mb-[14px]">Persistent<br/>Sight</h3>
                  <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[24ch]">Optional screen and camera awareness to understand your physical and digital environment.</p>
                  <a className="absolute right-[22px] bottom-[22px] w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink transition-all duration-180 group-hover:bg-coral group-hover:border-coral group-hover:text-white" href="#" aria-label="Learn more about Observation">
                    <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </a>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div className="p-[28px_26px_32px] bg-bone rounded-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18),inset_0_0_0_1px_rgba(21,20,15,0.06)] relative overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] group">
                  <div className="font-serif italic text-[22px] font-medium text-coral tracking-[0.04em] mb-[16px] flex justify-between items-baseline">
                    02<span className="font-sans text-[9.5px] text-ink-faint tracking-[0.18em] uppercase not-italic font-medium">Memory</span>
                  </div>
                  <svg className="w-[28px] h-[28px] mb-[16px] text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5z"/>
                  </svg>
                  <h3 className="font-sans text-[22px] font-bold leading-[1.05] tracking-[-0.014em] mb-[14px]">Infinite<br/>Recall</h3>
                  <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[24ch]">Every interaction is indexed. KIBO remembers that color you liked three weeks ago.</p>
                  <a className="absolute right-[22px] bottom-[22px] w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink transition-all duration-180 group-hover:bg-coral group-hover:border-coral group-hover:text-white" href="#" aria-label="Learn more about Memory">
                    <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </a>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="p-[28px_26px_32px] bg-bone rounded-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18),inset_0_0_0_1px_rgba(21,20,15,0.06)] relative overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] group">
                  <div className="font-serif italic text-[22px] font-medium text-coral tracking-[0.04em] mb-[16px] flex justify-between items-baseline">
                    03<span className="font-sans text-[9.5px] text-ink-faint tracking-[0.18em] uppercase not-italic font-medium">Reaction</span>
                  </div>
                  <svg className="w-[28px] h-[28px] mb-[16px] text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  <h3 className="font-sans text-[22px] font-bold leading-[1.05] tracking-[-0.014em] mb-[14px]">Proactive<br/>Action</h3>
                  <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[24ch]">KIBO doesn&apos;t wait for a prompt. It suggests files, snippets, and ideas as you work.</p>
                  <a className="absolute right-[22px] bottom-[22px] w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink transition-all duration-180 group-hover:bg-coral group-hover:border-coral group-hover:text-white" href="#" aria-label="Learn more about Reaction">
                    <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </a>
                </div>
              </Reveal>
              <Reveal delay={270}>
                <div className="p-[28px_26px_32px] bg-bone rounded-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18),inset_0_0_0_1px_rgba(21,20,15,0.06)] relative overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] group">
                  <div className="font-serif italic text-[22px] font-medium text-coral tracking-[0.04em] mb-[16px] flex justify-between items-baseline">
                    04<span className="font-sans text-[9.5px] text-ink-faint tracking-[0.18em] uppercase not-italic font-medium">Local</span>
                  </div>
                  <svg className="w-[28px] h-[28px] mb-[16px] text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <h3 className="font-sans text-[22px] font-bold leading-[1.05] tracking-[-0.014em] mb-[14px]">Privacy<br/>First</h3>
                  <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[24ch]">All data stays on your machine. Local-first intelligence means zero-cloud dependency.</p>
                  <a className="absolute right-[22px] bottom-[22px] w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink transition-all duration-180 group-hover:bg-coral group-hover:border-coral group-hover:text-white" href="#" aria-label="Learn more about Local">
                    <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}