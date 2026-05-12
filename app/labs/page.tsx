import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export default function Labs() {
  return (
    <section className="relative py-[130px] sm:py-[90px]" id="labs">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">III.</span>
          <span className="inline-flex gap-[26px]">
            <span>Experiments</span>
            <span className="text-coral">•</span>
            <span>Beta Phase</span>
          </span>
          <span>003 / 007</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[60px] items-end mb-[48px]">
          <Reveal delay={0}>
            <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
              Labs <span className="text-ink-faint font-medium ml-1">· Nº 04</span>
            </span>
            <h2 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(40px,4.8vw,68px)] mt-[30px]">
              Exploring the <em className="font-serif italic font-medium tracking-[-0.018em]">future</em> of human-machine coexistence<span className="text-coral">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0} direction="right">
            <div className="flex flex-wrap gap-[10px] justify-start md:justify-end">
              <button className="py-[9px] px-[18px] rounded-full border font-sans text-[13px] bg-coral border-coral text-white inline-flex items-center gap-[8px] transition-all duration-180 cursor-pointer">
                All<span className="text-[10px] text-[rgba(255,255,255,0.7)] border-l border-[rgba(255,255,255,0.3)] pl-[8px]">05</span>
              </button>
              <button className="py-[9px] px-[18px] rounded-full border border-[var(--line)] font-sans text-[13px] text-ink-soft bg-transparent inline-flex items-center gap-[8px] transition-all duration-180 hover:bg-[rgba(21,20,15,0.04)] cursor-pointer">
                Memory<span className="text-[10px] text-ink-faint border-l border-[var(--line)] pl-[8px]">02</span>
              </button>
              <button className="py-[9px] px-[18px] rounded-full border border-[var(--line)] font-sans text-[13px] text-ink-soft bg-transparent inline-flex items-center gap-[8px] transition-all duration-180 hover:bg-[rgba(21,20,15,0.04)] cursor-pointer">
                Sight<span className="text-[10px] text-ink-faint border-l border-[var(--line)] pl-[8px]">01</span>
              </button>
              <button className="py-[9px] px-[18px] rounded-full border border-[var(--line)] font-sans text-[13px] text-ink-soft bg-transparent inline-flex items-center gap-[8px] transition-all duration-180 hover:bg-[rgba(21,20,15,0.04)] cursor-pointer">
                Evo<span className="text-[10px] text-ink-faint border-l border-[var(--line)] pl-[8px]">02</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="flex items-start justify-end gap-[22px] mb-[30px]">
          <span className="w-[38px] h-[38px] rounded-full border border-dashed border-ink inline-flex items-center justify-center font-sans text-[11px] font-bold">01</span>
          <div className="font-sans text-[10.5px] tracking-[0.18em] uppercase leading-[1.55] text-ink-faint max-w-[28ch]">
            <b className="block text-ink">Beta experiments</b>
            pushing the boundaries<br/>of persistent desktop<br/>entities
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[22px] md:gap-[14px] lg:gap-[22px]">
          <Reveal delay={0}>
            <div className="flex flex-col h-full group cursor-pointer">
              <div className="aspect-[4/5] bg-bone rounded-[14px] overflow-hidden mb-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] relative">
                <span className="absolute top-[12px] left-[12px] bg-[rgba(239,231,210,0.9)] text-ink p-[4px_9px] rounded-[4px] font-sans text-[9.5px] font-semibold tracking-[0.14em] uppercase">Evo</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lab-1.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="font-sans text-[10.5px] text-ink-faint tracking-[0.14em] mb-[8px] flex justify-between uppercase"><span>Nº 01</span><span>2026</span></div>
              <h4 className="font-sans text-[18px] font-bold tracking-[-0.014em] mb-[8px] text-ink">Self-Naming</h4>
              <p className="font-body text-[13px] text-ink-mute leading-[1.55] mb-[14px]">KIBO chooses its own variations based on your shared history.</p>
              <span className="w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink mt-auto self-start transition-colors duration-200 group-hover:bg-coral group-hover:border-coral group-hover:text-white">
                <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
              </span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="flex flex-col h-full group cursor-pointer">
              <div className="aspect-[4/5] bg-bone rounded-[14px] overflow-hidden mb-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] relative">
                <span className="absolute top-[12px] left-[12px] bg-[rgba(239,231,210,0.9)] text-ink p-[4px_9px] rounded-[4px] font-sans text-[9.5px] font-semibold tracking-[0.14em] uppercase">Memory</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lab-2.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="font-sans text-[10.5px] text-ink-faint tracking-[0.14em] mb-[8px] flex justify-between uppercase"><span>Nº 02</span><span>2026</span></div>
              <h4 className="font-sans text-[18px] font-bold tracking-[-0.014em] mb-[8px] text-ink">Dream State</h4>
              <p className="font-body text-[13px] text-ink-mute leading-[1.55] mb-[14px]">Background processing of local data to find non-obvious creative links.</p>
              <span className="w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink mt-auto self-start transition-colors duration-200 group-hover:bg-coral group-hover:border-coral group-hover:text-white">
                <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
              </span>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-col h-full group cursor-pointer">
              <div className="aspect-[4/5] bg-bone rounded-[14px] overflow-hidden mb-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] relative">
                <span className="absolute top-[12px] left-[12px] bg-[rgba(239,231,210,0.9)] text-ink p-[4px_9px] rounded-[4px] font-sans text-[9.5px] font-semibold tracking-[0.14em] uppercase">Sight</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lab-3.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="font-sans text-[10.5px] text-ink-faint tracking-[0.14em] mb-[8px] flex justify-between uppercase"><span>Nº 03</span><span>2026</span></div>
              <h4 className="font-sans text-[18px] font-bold tracking-[-0.014em] mb-[8px] text-ink">Gaze Tracking</h4>
              <p className="font-body text-[13px] text-ink-mute leading-[1.55] mb-[14px]">Predictive scrolling and UI highlight based on where your eyes land.</p>
              <span className="w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink mt-auto self-start transition-colors duration-200 group-hover:bg-coral group-hover:border-coral group-hover:text-white">
                <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
              </span>
            </div>
          </Reveal>
          <Reveal delay={270}>
            <div className="flex flex-col h-full group cursor-pointer">
              <div className="aspect-[4/5] bg-bone rounded-[14px] overflow-hidden mb-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] relative">
                <span className="absolute top-[12px] left-[12px] bg-[rgba(239,231,210,0.9)] text-ink p-[4px_9px] rounded-[4px] font-sans text-[9.5px] font-semibold tracking-[0.14em] uppercase">Loop</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lab-4.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="font-sans text-[10.5px] text-ink-faint tracking-[0.14em] mb-[8px] flex justify-between uppercase"><span>Nº 04</span><span>2026</span></div>
              <h4 className="font-sans text-[18px] font-bold tracking-[-0.014em] mb-[8px] text-ink">Emotional Echo</h4>
              <p className="font-body text-[13px] text-ink-mute leading-[1.55] mb-[14px]">Tone-matching your communication style to reduce friction.</p>
              <span className="w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink mt-auto self-start transition-colors duration-200 group-hover:bg-coral group-hover:border-coral group-hover:text-white">
                <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
              </span>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-col h-full group cursor-pointer">
              <div className="aspect-[4/5] bg-bone rounded-[14px] overflow-hidden mb-[18px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] relative">
                <span className="absolute top-[12px] left-[12px] bg-[rgba(239,231,210,0.9)] text-ink p-[4px_9px] rounded-[4px] font-sans text-[9.5px] font-semibold tracking-[0.14em] uppercase">Runtime</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lab-5.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="font-sans text-[10.5px] text-ink-faint tracking-[0.14em] mb-[8px] flex justify-between uppercase"><span>Nº 05</span><span>2026</span></div>
              <h4 className="font-sans text-[18px] font-bold tracking-[-0.014em] mb-[8px] text-ink">The Ghost</h4>
              <p className="font-body text-[13px] text-ink-mute leading-[1.55] mb-[14px]">A transparent overlay that floats where you need it most.</p>
              <span className="w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink mt-auto self-start transition-colors duration-200 group-hover:bg-coral group-hover:border-coral group-hover:text-white">
                <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="flex items-center justify-between mt-[50px] border-t border-[var(--line)] border-dashed pt-[22px]">
          <div className="flex items-center gap-[8px]">
            <span className="w-[26px] h-[2px] rounded-[2px] bg-coral"></span>
            <span className="w-[26px] h-[2px] rounded-[2px] bg-coral"></span>
            <span className="w-[26px] h-[2px] rounded-[2px] bg-coral"></span>
            <span className="w-[26px] h-[2px] rounded-[2px] bg-coral"></span>
            <span className="w-[26px] h-[2px] rounded-[2px] bg-coral"></span>
          </div>
          <span className="font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            05 / 05 EXPERIMENTS &nbsp;·&nbsp; <Link href="#" className="text-coral no-underline border-b border-transparent transition-colors hover:border-coral">JOIN THE LAB →</Link>
          </span>
        </div>
      </div>
    </section>
  );
}