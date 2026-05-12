export function SideRails() {
  return (
    <>
      <div className="pointer-events-none fixed bottom-8 right-0 top-[120px] z-[3] hidden w-[36px] items-center justify-center overflow-hidden border-l border-[var(--line-faint)] min-[1800px]:flex">
        <span className="rotate-180 whitespace-nowrap font-sans text-[9px] font-semibold uppercase tracking-[0.34em] text-ink-faint" style={{ writingMode: "vertical-rl" }}>
          KIBO / desktop companion
        </span>
      </div>
      <div className="pointer-events-none fixed bottom-8 left-0 top-[120px] z-[3] hidden w-[36px] items-center justify-center overflow-hidden border-r border-[var(--line-faint)] min-[1800px]:flex">
        <span className="whitespace-nowrap font-sans text-[9px] font-semibold uppercase tracking-[0.34em] text-ink-faint" style={{ writingMode: "vertical-rl" }}>
          Voice / Memory / Privacy
        </span>
      </div>
    </>
  );
}
