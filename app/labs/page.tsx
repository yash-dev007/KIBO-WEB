import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export default function Labs() {
  return (
    <section className="relative py-[80px] sm:py-[90px] lg:py-[130px]" id="labs">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">III.</span>
          <span className="hidden sm:inline-flex gap-[26px]">
            <span>Experiments</span>
            <span className="text-coral">•</span>
            <span>Beta Phase</span>
          </span>
          <span>003 / 007</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[40px] md:gap-[60px] items-end mb-[48px]">
          <Reveal delay={0}>
            <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
              Labs <span className="text-ink-faint font-medium ml-1">· Nº 04</span>
            </span>
            <h2 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(34px,4.8vw,68px)] mt-[30px]">
              Exploring the <em className="font-serif italic font-medium tracking-[-0.018em]">future</em> of human-machine coexistence<span className="text-coral">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0} direction="right">
            <div className="flex flex-wrap gap-[10px]">
              <button className="py-[9px] px-[18px] rounded-full border font-sans text-[13px] bg-coral border-coral text-white inline-flex items-center gap-[8px] transition-all cursor-pointer">
                All<span className="text-[10px] text-[rgba(255,255,255,0.7)] border-l border-[rgba(255,255,255,0.3)] pl-[8px]">05</span>
              </button>
              {["Memory", "Sight", "Evo"].map((tag, i) => (
                <button key={tag} className="py-[9px] px-[18px] rounded-full border border-[var(--line)] font-sans text-[13px] text-ink-soft bg-transparent inline-flex items-center gap-[8px] transition-all hover:bg-[rgba(21,20,15,0.04)] cursor-pointer">
                  {tag}<span className="text-[10px] text-ink-faint border-l border-[var(--line)] pl-[8px]">0{i + 1}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="hidden sm:flex items-start justify-end gap-[22px] mb-[30px]">
          <span className="w-[38px] h-[38px] rounded-full border border-dashed border-ink inline-flex items-center justify-center font-sans text-[11px] font-bold">01</span>
          <div className="font-sans text-[10.5px] tracking-[0.18em] uppercase leading-[1.55] text-ink-faint max-w-[28ch]">
            <b className="block text-ink">Beta experiments</b>
            pushing the boundaries<br />of persistent desktop entities
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[16px] md:gap-[14px] lg:gap-[22px]">
          {[
            { tag: "Evo", title: "Self-Naming", desc: "KIBO chooses its own variations based on your shared history.", img: "/assets/lab-1.png", n: "01" },
            { tag: "Memory", title: "Dream State", desc: "Background processing of local data to find non-obvious creative links.", img: "/assets/lab-2.png", n: "02" },
            { tag: "Sight", title: "Gaze Tracking", desc: "Predictive scrolling and UI highlight based on where your eyes land.", img: "/assets/lab-3.png", n: "03" },
            { tag: "Loop", title: "Emotional Echo", desc: "Tone-matching your communication style to reduce friction.", img: "/assets/lab-4.png", n: "04" },
            { tag: "Runtime", title: "The Ghost", desc: "A transparent overlay that floats where you need it most.", img: "/assets/lab-5.png", n: "05" },
          ].map((card, i) => (
            <Reveal key={card.n} delay={i * 90}>
              <div className="flex flex-col h-full group cursor-pointer">
                <div className="aspect-[4/5] bg-bone rounded-[14px] overflow-hidden mb-[14px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)] relative">
                  <span className="absolute top-[10px] left-[10px] bg-[rgba(239,231,210,0.9)] text-ink p-[4px_9px] rounded-[4px] font-sans text-[9.5px] font-semibold tracking-[0.14em] uppercase">{card.tag}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="font-sans text-[10.5px] text-ink-faint tracking-[0.14em] mb-[6px] flex justify-between uppercase"><span>Nº {card.n}</span><span>2026</span></div>
                <h4 className="font-sans text-[15px] font-bold tracking-[-0.014em] mb-[6px] text-ink leading-tight">{card.title}</h4>
                <p className="font-body text-[12px] text-ink-mute leading-[1.5] mb-[12px] hidden sm:block">{card.desc}</p>
                <span className="w-[28px] h-[28px] border border-[var(--line)] rounded-full inline-flex items-center justify-center text-ink mt-auto self-start transition-colors group-hover:bg-coral group-hover:border-coral group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-[1.6px]"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-[50px] border-t border-[var(--line)] border-dashed pt-[22px]">
          <div className="flex items-center gap-[8px]">
            {[...Array(5)].map((_, i) => <span key={i} className="w-[26px] h-[2px] rounded-[2px] bg-coral" />)}
          </div>
          <span className="font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
            05 / 05 EXPERIMENTS &nbsp;·&nbsp; <Link href="#" className="text-coral no-underline border-b border-transparent transition-colors hover:border-coral">JOIN THE LAB →</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
