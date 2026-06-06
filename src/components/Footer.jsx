import { useState, useEffect, useRef } from "react";
import { FaGithub, FaTerminal, FaTrash, FaTimes } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

// 1. TelemetryHUD component
const TelemetryHUD = ({ telemetryRef }) => {
  const [telemetry, setTelemetry] = useState({
    cpu: 0.08,
    memory: 42.4,
    latency: 24,
    vectors: 1402
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const nextTelemetry = {
          cpu: +(Math.max(0.02, Math.min(0.25, prev.cpu + (Math.random() - 0.5) * 0.03))).toFixed(3),
          memory: +(Math.max(40.1, Math.min(44.9, prev.memory + (Math.random() - 0.5) * 0.2))).toFixed(1),
          latency: Math.max(18, Math.min(35, prev.latency + Math.round((Math.random() - 0.5) * 4))),
          vectors: prev.vectors
        };
        telemetryRef.current = nextTelemetry;
        return nextTelemetry;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [telemetryRef]);

  return (
    <div className="rounded-lg border border-neutral-900 bg-black/40 p-4 font-mono text-[11px] text-neutral-400 space-y-3 backdrop-blur-md">
      <div className="flex justify-between border-b border-neutral-900 pb-1.5 text-white font-bold uppercase tracking-wider">
        <span>[ Telemetry Core ]</span>
        <span className="text-cyan-400">active_session</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>CORE CPU OVERHEAD</span>
          <span className="text-cyan-400">{telemetry.cpu}%</span>
        </div>
        <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-1000" 
            style={{ width: `${Math.min(100, telemetry.cpu * 350)}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>VECTOR RAG NODES</span>
          <span className="text-cyan-400">{telemetry.vectors} ITEMS</span>
        </div>
        <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 w-3/4" />
        </div>
      </div>

      <div className="flex justify-between pt-1 border-t border-neutral-900/50">
        <span>TTS ENGINE PIPER</span>
        <span className="text-emerald-400">READY</span>
      </div>
      <div className="flex justify-between">
        <span>SYSTEM PING LATENCY</span>
        <span className="text-yellow-500 font-bold">{telemetry.latency}ms</span>
      </div>
    </div>
  );
};

// 2. SystemClock component
const SystemClock = () => {
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const timeStr = date.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setSystemTime(`${timeStr} [HYPERION-NODE]`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-2.5 border border-neutral-900 bg-neutral-950/80 px-4 py-1.5 rounded-full text-xs font-mono text-neutral-500">
      <span className="text-cyan-400 font-semibold select-none">NODE_TIME ::</span>
      <span>{systemTime}</span>
    </div>
  );
};

// 3. TerminalCore component
const TerminalCore = ({ telemetryRef }) => {
  const [cliInput, setCliInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState([
    { type: "system", text: "KIBO v4.8 Hyperion Core Online." },
    { type: "system", text: "Type /help or click a quick-command below to start." }
  ]);

  const terminalEndRef = useRef(null);
  const isInitialMount = useRef(true);

  // Auto Scroll CLI terminal to bottom
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  // Handle CLI Command Execution
  const executeCommand = (cmdText) => {
    const cleanCmd = cmdText.trim();
    if (!cleanCmd) return;

    // Add user input to logs
    const newLogs = [...terminalLogs, { type: "user", text: `guest@kibo_core:~$ ${cleanCmd}` }];
    
    // Command Router
    const lowerCmd = cleanCmd.toLowerCase();
    
    if (lowerCmd === "/help") {
      newLogs.push(
        { type: "system", text: "Available System Directives:" },
        { type: "info", text: "  /status   - Diagnostic core telemetry" },
        { type: "info", text: "  /download - Access onboarding assistant wizard" },
        { type: "info", text: "  /memory   - Fetch vector RAG sqlite-vec logs" },
        { type: "info", text: "  /clear    - Flush system terminal buffer" }
      );
    } else if (lowerCmd === "/status") {
      const telemetry = telemetryRef.current;
      newLogs.push(
        { type: "success", text: "🟢 KIBO DIAGNOSTIC COMPLETED: ALL CHANNELS NOMINAL" },
        { type: "info", text: `  Core Load: ${telemetry.cpu}% CPU overhead` },
        { type: "info", text: `  RAG Vector Index: ${telemetry.vectors} nodes active` },
        { type: "info", text: `  Piper ONNX Cache Buffer: ${telemetry.memory} MB allocated` },
        { type: "info", text: `  Hardware Telemetry Loop: Latency ${telemetry.latency}ms` }
      );
    } else if (lowerCmd === "/download") {
      newLogs.push(
        { type: "success", text: "🚀 DIRECTIVE EXECUTED: ONBOARDING ASSISTANT TRIGGERED." },
        { type: "system", text: "Redirecting to KIBO-Core installation source..." }
      );
      setTimeout(() => {
        window.open("https://github.com/yash-dev007/KIBO", "_blank");
      }, 1200);
    } else if (lowerCmd === "/memory") {
      newLogs.push(
        { type: "system", text: "Accessing private sqlite-vec sqlite tables..." },
        { type: "info", text: "[MEM-IDX-001] (Confidence: 99.4%) 'User config: deep cyberpunk aesthetic preferred'" },
        { type: "info", text: "[MEM-IDX-002] (Confidence: 98.1%) 'Obsidian vault indexing complete: 486 markdown nodes'" },
        { type: "info", text: "[MEM-IDX-003] (Confidence: 95.8%) 'TTS Piper: Sentence-buffering speech gate active'" }
      );
    } else if (lowerCmd === "/clear") {
      setTerminalLogs([{ type: "system", text: "System logs flushed. Terminal clean." }]);
      setCliInput("");
      return;
    } else {
      newLogs.push({
        type: "error",
        text: `KIBO System Core: Unknown directive '${cleanCmd}'. Type /help for details.`
      });
    }

    setTerminalLogs(newLogs);
    setCliInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      executeCommand(cliInput);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:col-span-5">
      <div className="flex items-center gap-2">
        <FaTerminal className="text-cyan-400 text-sm animate-pulse" />
        <h3 className="font-general text-xs uppercase tracking-widest text-white font-semibold">
          KIBO Interface Terminal
        </h3>
      </div>
      
      {/* Interactive Terminal Shell */}
      <div className="flex flex-col h-56 rounded-lg border border-neutral-900 bg-neutral-950/80 p-4 font-mono text-[11px] leading-relaxed backdrop-blur-md shadow-2xl">
        <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-neutral-900 pr-1">
          {terminalLogs.map((log, idx) => {
            let colorClass = "text-neutral-400";
            if (log.type === "user") colorClass = "text-cyan-300 font-medium";
            else if (log.type === "system") colorClass = "text-neutral-500";
            else if (log.type === "success") colorClass = "text-emerald-400 font-semibold";
            else if (log.type === "info") colorClass = "text-cyan-400";
            else if (log.type === "error") colorClass = "text-rose-400 font-semibold";
            
            return (
              <div key={idx} className="whitespace-pre-wrap">
                <span className={colorClass}>{log.text}</span>
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Command Input */}
        <div className="mt-3 flex items-center border-t border-neutral-900 pt-2.5">
          <span className="text-cyan-400 font-bold mr-1.5 select-none text-xs">guest@kibo_core:~$</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type /help..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-700 text-xs font-mono"
            aria-label="Terminal Command Input"
          />
          {cliInput && (
            <button 
              onClick={() => setCliInput("")}
              className="text-neutral-600 hover:text-white transition-colors p-1"
              aria-label="Clear CLI Input"
            >
              <FaTimes size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Clickable Quick Command Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button 
          onClick={() => executeCommand("/help")}
          className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-mono text-neutral-400 hover:text-white hover:bg-cyan-950/40 border border-neutral-800 hover:border-cyan-800 transition-all duration-300"
        >
          /help
        </button>
        <button 
          onClick={() => executeCommand("/status")}
          className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-mono text-neutral-400 hover:text-white hover:bg-cyan-950/40 border border-neutral-800 hover:border-cyan-800 transition-all duration-300"
        >
          /status
        </button>
        <button 
          onClick={() => executeCommand("/memory")}
          className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-mono text-neutral-400 hover:text-white hover:bg-cyan-950/40 border border-neutral-800 hover:border-cyan-800 transition-all duration-300"
        >
          /memory
        </button>
        <button 
          onClick={() => executeCommand("/download")}
          className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-mono text-neutral-400 hover:text-white hover:bg-cyan-950/40 border border-neutral-800 hover:border-cyan-800 transition-all duration-300"
        >
          /download
        </button>
        <button 
          onClick={() => executeCommand("/clear")}
          className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-mono text-neutral-600 hover:text-rose-400 transition-colors"
          title="Clear Logs"
        >
          <FaTrash className="inline mr-1" size={8} /> Clear
        </button>
      </div>
    </div>
  );
};

// 4. Main Footer component
const Footer = () => {
  const telemetryRef = useRef({
    cpu: 0.08,
    memory: 42.4,
    latency: 24,
    vectors: 1402
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-neutral-950 py-20 text-neutral-400 border-t border-neutral-900 overflow-hidden">
      
      {/* Holographic Cyber Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-20 pointer-events-none z-0"></div>
      
      {/* Ambient Cyan Avatar Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute -top-10 left-1/4 w-[25rem] h-[15rem] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container relative mx-auto px-6 md:px-12 z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-16 border-b border-neutral-900">
          
          {/* Column 1: Brand & Telemetry System Panel (Span 4) */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div>
              <h2 className="special-font font-zentry text-4xl font-black uppercase text-white tracking-widest leading-none">
                K<b>I</b>BO
              </h2>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  v4.8 Hyperion Core
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed max-w-sm text-neutral-400 font-circular-web">
              A transparent, frameless, voice-controlled desktop companion that lives on your screen, reacts in real-time, and remembers everything with high-fidelity local vector memory.
            </p>

            {/* Hardware Telemetry HUD Panel */}
            <TelemetryHUD telemetryRef={telemetryRef} />
          </div>

          {/* Column 2: Live Interactive Command Terminal (Span 5) */}
          <TerminalCore telemetryRef={telemetryRef} />

          {/* Column 3: High-Tech Navigation Lists & CTA (Span 3) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3">
            
            {/* System Node Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-general text-xs uppercase tracking-widest text-white font-semibold">
                Companion Core
              </h3>
              <ul className="flex flex-col gap-3 text-[13px] text-neutral-400">
                {["Voice Dialogue Loop", "Neural TTS (Piper)", "sqlite-vec RAG", "Proactivity Policy"].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={idx === 0 ? "#home" : idx === 1 ? "#about" : idx === 2 ? "#features" : "#story"} 
                      className="group relative flex items-center transition-all duration-300 hover:text-cyan-400"
                    >
                      <span className="absolute -left-3.5 opacity-0 group-hover:opacity-100 group-hover:-left-3 text-[10px] text-cyan-400 font-mono transition-all duration-300">
                        [
                      </span>
                      <span>{item}</span>
                      <span className="absolute -right-3.5 opacity-0 group-hover:opacity-100 group-hover:-right-3 text-[10px] text-cyan-400 font-mono transition-all duration-300">
                        ]
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Deck Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-general text-xs uppercase tracking-widest text-white font-semibold">
                Developer Deck
              </h3>
              <ul className="flex flex-col gap-3 text-[13px] text-neutral-400">
                {[
                  { name: "Obsidian Vault API", url: "https://github.com/yash-dev007/KIBO" },
                  { name: "Rust Telemetry SDK", url: "https://github.com/yash-dev007/KIBO" },
                  { name: "Diagnostics Exporter", url: "https://github.com/yash-dev007/KIBO" },
                  { name: "Protocol Docs", url: "https://github.com/yash-dev007/KIBO" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="group relative flex items-center transition-all duration-300 hover:text-cyan-400"
                    >
                      <span className="absolute -left-3.5 opacity-0 group-hover:opacity-100 group-hover:-left-3 text-[10px] text-cyan-400 font-mono transition-all duration-300">
                        [
                      </span>
                      <span>{link.name}</span>
                      <span className="absolute -right-3.5 opacity-0 group-hover:opacity-100 group-hover:-right-3 text-[10px] text-cyan-400 font-mono transition-all duration-300">
                        ]
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Panel Actions & Global CTA Card */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-neutral-900/50">
          <div className="max-w-md text-center md:text-left">
            <h4 className="font-general text-sm uppercase tracking-wider text-white font-bold">
              Ready to deploy your offline assistant?
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Run custom voice-dialogue states locally. Private memory vectors, zero global latency limits.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <a 
              href="https://github.com/yash-dev007/KIBO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-cyan-600 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] group hover:scale-[1.02]"
            >
              <TiLocationArrow className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Download Onboarding Wizard
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 lg:flex-row">
          
          {/* Copyright & License */}
          <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
            <p className="text-[11px] text-neutral-500 font-mono">
              © 2026 KIBO SYSTEM INC. All rights reserved. Open-source under Apache 2.0.
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                System Status: <span className="text-emerald-400">All Protocols Nominal</span>
              </span>
            </div>
          </div>

          {/* Center Column: Live Telemetry system clock */}
          <SystemClock />

          {/* GitHub Repository link, Privacy Policy & Scroll-to-Top Compass */}
          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <a
              href="https://github.com/yash-dev007/KIBO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-neutral-900 border border-neutral-800 px-5 py-2.5 text-xs font-medium text-neutral-400 hover:text-white hover:bg-cyan-950/40 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              <FaGithub className="text-sm" />
              <span>Repository Source</span>
            </a>

            <a
              href="#privacy-policy"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>

            {/* Scroll-to-Top Compass */}
            <button
              onClick={scrollToTop}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:bg-cyan-600 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 cursor-pointer"
              title="Return to Core"
              aria-label="Scroll to top of page"
            >
              <TiLocationArrow className="text-neutral-400 text-lg rotate-[-45deg] group-hover:text-white transition-all group-hover:scale-110" />
              <span className="absolute -top-7 scale-0 group-hover:scale-100 bg-black border border-neutral-900 text-cyan-400 text-[9px] font-mono py-0.5 px-2 rounded tracking-wider transition-all shadow-md pointer-events-none">
                TOP
              </span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
