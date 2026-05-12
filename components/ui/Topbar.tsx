export function Topbar() {
  return (
    <div className="relative z-[4] border-b border-[var(--line)] bg-paper py-[10px]">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-4 font-sans text-[9px] uppercase tracking-[0.18em] text-ink-faint sm:px-6 sm:text-[10.5px] md:px-8 lg:px-[64px]">
        <span className="whitespace-nowrap">
          <b className="font-semibold text-ink">KIBO / 2026</b> / MIT desktop companion
        </span>
        <span className="hidden gap-[26px] xl:inline-flex">
          <span className="whitespace-nowrap">Voice / Memory / Animation</span>
          <span className="whitespace-nowrap">Groq + Ollama + Piper</span>
        </span>
        <span className="inline-flex items-center gap-[18px] whitespace-nowrap">
          <a
            className="text-inherit no-underline transition-colors hover:text-coral"
            href="https://github.com/yash-dev007/KIBO"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="mr-[6px] inline-block h-[6px] w-[6px] animate-pulse bg-coral" />
            GitHub
          </a>
          <span>
            <b className="font-semibold text-ink">254</b> tests
          </span>
        </span>
      </div>
    </div>
  );
}
