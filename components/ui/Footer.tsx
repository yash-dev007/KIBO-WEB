import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pt-[60px] pb-[30px] mt-[60px]">
      <div className="max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-[40px] mb-[60px]">
          <div className="mb-4 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-[14px] font-sans font-bold tracking-[-0.01em] text-ink text-[18px] no-underline mb-[18px]">
              <span className="w-[36px] h-[36px] inline-flex items-center justify-center border-[1.5px] border-ink rounded-full font-serif italic text-[17px] bg-transparent">К</span>
              <span>KIBO</span>
            </Link>
            <p className="font-body text-[13.5px] text-ink-mute leading-[1.55] max-w-[38ch] mt-[18px]">
              KIBO is a persistent digital companion for creative professionals. Built with privacy and context at its core.
            </p>
          </div>
          <div>
            <h5 className="font-sans text-[11px] text-ink tracking-[0.18em] uppercase mb-[18px] font-bold">Platform</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Download</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Memory</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Sight</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Security</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-sans text-[11px] text-ink tracking-[0.18em] uppercase mb-[18px] font-bold">Resources</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Whitepaper</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Labs</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">API</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Status</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-sans text-[11px] text-ink tracking-[0.18em] uppercase mb-[18px] font-bold">Community</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Discord</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">X / Twitter</Link></li>
              <li className="mb-[10px]"><Link href="#" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">GitHub</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--line)] pt-[22px] flex justify-between items-center font-sans text-[11px] tracking-[0.16em] uppercase text-ink-faint">
          <span><span className="w-[6px] h-[6px] rounded-full bg-coral inline-block mr-[6px] align-middle animate-pulse"></span>● <b className="text-ink font-semibold">KIBO</b> · Proprietary · 2026 / Early Access / Vol. 01</span>
          <span className="hidden md:inline-flex gap-[24px] items-center">
            <span>Distributed / Zero Space</span>
            <span>0.0000° N · 0.0000° E</span>
            <span className="text-coral font-semibold">♥ MMXXVI</span>
          </span>
        </div>
        <div className="mt-[60px] pt-0 pb-[12px] border-t border-[var(--line)] overflow-x-hidden overflow-y-visible">
          <div className="font-sans font-black text-[clamp(70px,13vw,200px)] tracking-[-0.04em] leading-[1.05] text-ink whitespace-nowrap mt-[30px] pb-[0.18em]">
            KIBO<em className="font-serif italic font-medium text-coral"> Companion</em>.
          </div>
        </div>
      </div>
    </footer>
  );
}