export function SideRails() {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 w-[36px] z-[3] pointer-events-none flex items-center justify-center border-l border-[var(--line-faint)] hidden xl:flex">
        <span className="font-sans text-[10px] font-semibold tracking-[0.42em] uppercase text-ink-faint rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          KIBO — A Persistant Digital Life · Vol. 01 · 2026
        </span>
      </div>
      <div className="fixed top-0 bottom-0 left-0 w-[36px] z-[3] pointer-events-none flex items-center justify-center border-r border-[var(--line-faint)] hidden xl:flex">
        <span className="font-sans text-[10px] font-semibold tracking-[0.42em] uppercase text-ink-faint whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          Reactive · Evolving · Personal · Memory
        </span>
      </div>
    </>
  );
}