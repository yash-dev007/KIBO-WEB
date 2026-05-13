import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-[60px] border-t border-[var(--line)] pb-[30px] pt-[60px]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-[64px]">
        <div className="mb-[60px] grid grid-cols-1 gap-[40px] lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="mb-4 lg:mb-0">
            <Link href="/" className="mb-[18px] inline-flex items-center no-underline">
              <div className="relative h-[60px] w-[160px] overflow-hidden">
                <Image
                  src="/assets/LOGO.svg"
                  alt="KIBO Desktop"
                  width={165}
                  height={165}
                  unoptimized
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: 165, height: 165 }}
                />
              </div>
            </Link>
            <p className="mt-[18px] max-w-[38ch] font-body text-[13.5px] leading-[1.55] text-ink-mute">
              KIBO is an open-source desktop companion with voice, neural TTS, animation states, and transparent long-term memory.
            </p>
          </div>
          <div>
            <h5 className="mb-[18px] font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ink">Platform</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="/#install" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Download</Link></li>
              <li className="mb-[10px]"><Link href="/#features" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Voice loop</Link></li>
              <li className="mb-[10px]"><Link href="/#privacy" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Memory</Link></li>
              <li className="mb-[10px]"><Link href="/#architecture" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Fallbacks</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-[18px] font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ink">Resources</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="https://github.com/yash-dev007/KIBO" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Repository</Link></li>
              <li className="mb-[10px]"><Link href="https://github.com/yash-dev007/KIBO/issues" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Issues</Link></li>
              <li className="mb-[10px]"><Link href="/#install" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Install</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-[18px] font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ink">Project</h5>
            <ul className="list-none">
              <li className="mb-[10px]"><Link href="/#architecture" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Architecture</Link></li>
              <li className="mb-[10px]"><Link href="/#privacy" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Privacy</Link></li>
              <li className="mb-[10px]"><Link href="/#features" className="font-body text-[13.5px] text-ink-soft no-underline hover:text-coral">Features</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--line)] pt-[22px] font-sans text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          <span><span className="mr-[6px] inline-block h-[6px] w-[6px] animate-pulse bg-coral align-middle" /><b className="font-semibold text-ink">KIBO</b> / MIT / 2026</span>
          <span className="hidden items-center gap-[24px] md:inline-flex">
            <span>Local-first by default</span>
            <span className="font-semibold text-coral">MMXXVI</span>
          </span>
        </div>
        <div className="mt-[60px] overflow-hidden border-t border-[var(--line)] pb-[12px] pt-0">
          <div className="mt-[30px] text-center font-sans text-[clamp(48px,9vw,128px)] font-black leading-[1.05] tracking-normal text-ink">
            KIBO<em className="font-serif font-medium italic text-coral"> Desktop</em>.
          </div>
        </div>
      </div>
    </footer>
  );
}
