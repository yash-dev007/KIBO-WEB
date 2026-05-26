import { FaGithub } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-950 py-16 text-neutral-400 border-t border-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 pb-12 border-b border-neutral-900">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h2 className="special-font font-zentry text-3xl font-black uppercase text-white tracking-wider">
              K<b>I</b>BO
            </h2>
            <p className="text-sm leading-relaxed max-w-xs text-neutral-400">
              A transparent, frameless, voice-controlled desktop companion that lives on your screen, reacts in real-time, and remembers everything.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-violet-400">
                v4.8 Hyperion Core
              </span>
            </div>
          </div>

          {/* System Telemetry Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-general text-xs uppercase tracking-widest text-white font-semibold">
              System Core
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-neutral-400">
              <li>
                <a href="#home" className="hover:text-violet-400 transition-colors duration-300">
                  Voice Dialogue Loop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-violet-400 transition-colors duration-300">
                  Neural TTS (Piper ONNX)
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-violet-400 transition-colors duration-300">
                  sqlite-vec Vector RAG
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-violet-400 transition-colors duration-300">
                  Proactivity Policy Layer
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-general text-xs uppercase tracking-widest text-white font-semibold">
              Resources
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-neutral-400">
              <li>
                <a href="https://github.com/yash-dev007/KIBO" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors duration-300">
                  Obsidian Vault Integration
                </a>
              </li>
              <li>
                <a href="https://github.com/yash-dev007/KIBO" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors duration-300">
                  Rust Telemetry Monitor
                </a>
              </li>
              <li>
                <a href="https://github.com/yash-dev007/KIBO" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors duration-300">
                  Diagnostics JSON Export
                </a>
              </li>
              <li>
                <a href="https://github.com/yash-dev007/KIBO" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors duration-300">
                  API Protocol Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Action Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-general text-xs uppercase tracking-widest text-white font-semibold">
              Get Started
            </h3>
            <p className="text-sm text-neutral-400">
              Download the onboarding wizard to run KIBO locally or in the cloud.
            </p>
            <a 
              href="https://github.com/yash-dev007/KIBO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 flex w-fit items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-violet-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] group"
            >
              <TiLocationArrow className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Download KIBO
            </a>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Copyright */}
          <p className="text-xs text-neutral-500 text-center md:text-left">
            © 2026 KIBO. All rights reserved. Open-source under the Apache 2.0 License.
          </p>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/yash-dev007/KIBO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-violet-600 transition-all duration-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          >
            <FaGithub className="text-base" />
            <span>GitHub Repository</span>
          </a>

          {/* Privacy Policy */}
          <a
            href="#privacy-policy"
            className="text-xs text-neutral-500 hover:text-white transition-colors hover:underline"
          >
            Privacy Policy
          </a>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
