import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export default function Method() {
  return (
    <section className="relative py-[80px] sm:py-[90px] lg:py-[130px]" id="method">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="border-t border-[var(--line)] pt-[18px] mb-[48px] flex justify-between items-center font-sans text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          <span className="font-serif italic text-coral text-[14px] tracking-[0.05em] normal-case">IV.</span>
          <span className="hidden sm:inline-flex gap-[26px]">
            <span>Evolution</span>
            <span className="text-coral">•</span>
            <span>The Memory Loop</span>
          </span>
          <span>004 / 007</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[40px] md:gap-[60px] items-start mb-[60px] md:mb-[80px]">
          <Reveal delay={0}>
            <span className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-coral inline-flex items-center gap-[12px] mb-[28px] before:content-[''] before:w-[18px] before:h-[1px] before:bg-coral before:inline-block">
              Method <span className="text-ink-faint font-medium ml-1">· Nº 05</span>
            </span>
            <h2 className="font-sans font-extrabold tracking-[-0.028em] text-ink leading-none text-[clamp(38px,5.2vw,76px)] mt-[30px]">
              The <em className="font-serif italic font-medium tracking-[-0.018em]">Memory</em> Loop<span className="text-coral">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0} direction="right">
            <div className="flex items-start gap-[14px] pt-0 md:pt-[14px]">
              <span className="text-coral text-[24px] leading-none font-sans shrink-0">+</span>
              <p className="font-sans text-[13px] text-ink-soft max-w-[22ch] leading-[1.55]">
                KIBO evolves through four stages of integration, from passive observer to active collaborator.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[36px] md:gap-[50px] relative">
          <div className="hidden md:block absolute top-[60px] left-[50px] right-[50px] h-[1px] bg-[var(--line-soft)]" />
          {[
            { n: "01", title: "Observe", arrow: true, desc: "KIBO indexes your open files, active windows, and project context locally.", img: "/assets/method-1.png" },
            { n: "02", title: "Synthesize", arrow: true, desc: "Context is cross-referenced with your entire project history in real-time.", img: "/assets/method-2.png" },
            { n: "03", title: "Act", arrow: true, desc: "KIBO surfaces snippets, assets, or advice through its desktop presence.", img: "/assets/method-3.png" },
            { n: "04", title: "Refine", arrow: false, desc: "Your feedback loops back, strengthening KIBO's understanding of your taste.", img: "/assets/method-4.png" },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 110}>
              <div className="relative">
                <div className="font-serif italic font-medium text-[clamp(48px,6vw,78px)] text-coral leading-[0.85] mb-[24px] tracking-[-0.02em] bg-paper inline-block pr-[12px] relative z-10">{step.n}</div>
                <h4 className="font-sans text-[clamp(22px,2.5vw,30px)] font-extrabold tracking-[-0.022em] mb-[18px] flex items-center justify-between pr-[18px] text-ink">
                  {step.title} {step.arrow && <span className="text-ink-faint text-[22px] leading-none">→</span>}
                </h4>
                <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] mb-[24px] max-w-[24ch]">{step.desc}</p>
                <div className="aspect-square bg-bone rounded-[12px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(21,20,15,0.18)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={step.img} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-[60px] md:mt-[80px] flex flex-wrap justify-between items-center gap-3 border-t border-[var(--line)] border-dashed pt-[24px]">
          <div className="inline-flex items-center gap-[12px] font-sans text-[11px] text-ink-faint tracking-[0.18em] uppercase">
            <span className="w-[20px] h-[20px] border border-dashed border-ink-faint rounded-full shrink-0" />
            <span>Context is king. Memory is the foundation.</span>
          </div>
          <div className="hidden sm:block font-sans text-[11px] text-ink-faint tracking-[0.18em] uppercase">
            <Link href="https://kibo.ai/method" className="text-inherit no-underline border-b border-transparent transition-colors hover:text-coral hover:border-coral" target="_blank" rel="noreferrer noopener">
              <b className="text-ink font-semibold">kibo.ai/method</b>
            </Link> &nbsp;·&nbsp; Alpha-01
          </div>
        </div>
      </div>
    </section>
  );
}
