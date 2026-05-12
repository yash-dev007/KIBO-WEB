export function Topbar() {
  return (
    <div className="border-b border-[var(--line)] py-[10px] bg-paper relative z-[4]">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto flex justify-between items-center gap-6 font-sans text-[9px] sm:text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
        <span className="whitespace-nowrap"><b className="text-ink font-semibold">OD / 2026</b> &nbsp;·&nbsp; Early Access / Vol. 01</span>
        <span className="hidden xl:inline-flex gap-[26px]">
          <span className="whitespace-nowrap">Filed under <b className="text-coral">Human · Interface</b></span>
          <span className="whitespace-nowrap">Proprietary · Made on Earth</span>
        </span>
        <span className="inline-flex gap-[18px] items-center whitespace-nowrap">
          <a className="text-inherit no-underline border-b border-transparent transition-colors hover:text-coral hover:border-coral" href="https://kibo.ai/releases" target="_blank" rel="noreferrer noopener">
            <span className="w-[6px] h-[6px] rounded-full bg-coral inline-block mr-[6px] animate-pulse"></span>Beta · v0.1.0
          </a>
          <span><b className="text-ink font-semibold">EN</b> · FR · JP</span>
        </span>
      </div>
    </div>
  );
}