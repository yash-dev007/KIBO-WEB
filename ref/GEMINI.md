# KIBO Deep System Architecture & Codebase Reference Manual

Welcome to **KIBO**, a next-generation desktop companion built as a frameless, transparent animated character that lives on the user's screen. Rather than a standard web chatbot in a box, KIBO acts as a physical companion: listening for voice input, responding with streaming neural Text-to-Speech (TTS), and building an Obsidian-compatible long-term memory.

This document serves as the absolute, single-source reference for KIBO's deep system architecture, design patterns, directory mapping, thread orchestration, and data schemas. It acts as our developer memory context to understand the entire repository without having to read every line of code.

---

## 1. High-Level Architectural Blueprint

KIBO is split cleanly into a **headless Python backend** and an **Electron + React + TypeScript frontend**. They communicate locally via:
1. **HTTP REST API** for standard configurations, state mutations, and health checks.
2. **WebSockets** for high-frequency, bidirectional real-time event streaming (voice transcriptions, LLM chunks, audio cues, animation states).

### System Topology & Graceful Degradation
One of KIBO's key architectural achievements is its robust **Provider Abstraction** with automatic fallback. If any component is unavailable (e.g., no internet, no voice model, or low-end hardware), KIBO degrades gracefully without crashing:

```
┌────────────────────────────────────────────────────────┐
│                        AI LLM                          │
│  Groq SDK (Cloud)  ──►  Ollama (Local)  ──►  Mock Demo  │
└────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────┐
│                   KIBO Capabilities                    │
│   Web Search (DDG)  ──►  Memory RAG  ──►  Proactive    │
└────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────┐
│                        AI TTS                          │
│     Piper (Neural ONNX)  ──►  pyttsx3  ──►  Mock Demo  │
└────────────────────────────────────────────────────────┘
                            │
┌────────────────────────────────────────────────────────┐
│                        Memory                          │
│     sqlite-vec (Vector)  ──►  Lexical (Keyword-based)  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Core Python Backend (`src/`)

The Python backend is built with **FastAPI** and uses a thread-safe, decoupled event-driven model. The **Composition Root** is in [src/api/main.py](file:///D:/Projects/KIBO/src/api/main.py), where all background threads, managers, and servers are instantiated and wired together.

### 2.1 Thread-Safe Pub/Sub: `EventBus`
At the heart of the backend is `EventBus` ([src/api/event_bus.py](file:///D:/Projects/KIBO/src/api/event_bus.py)), which decouples components.
- Wires events across thread boundaries (e.g., `VoiceThread` emitting a transcript, triggering `AIThread` to query the LLM).
- Supports `async_dispatch` to safely bridge synchronous background thread loops with FastAPI's asynchronous WebSocket server.

#### Central Event Bus Matrix
All decoupled systems communicate asynchronously via these events:

| Event Name | Source | Receivers | Payload | Description |
| :--- | :--- | :--- | :--- | :--- |
| `sensor_update` | `SystemMonitor` | `Brain`, `ProactiveEngine` | `SensorData` | Dispatches system hardware metrics (CPU, battery, window, hour) |
| `hotkey_pressed` | `HotkeyThread` or WS | `Brain`, `VoiceThread`, `AIThread` | None | Triggers voice recording and cancels active TTS/LLM speech |
| `recording_started` | `VoiceListener` | WebSocket / UI | None | Notifies the UI to show the listening indicator bubble |
| `transcript_ready` | `VoiceListener` | `AIThread` | `text: str` | Dispatches local transcribed text from Whisper to Groq/Ollama |
| `chat_query_received` | WebSocket | `AIThread` | `text: str` | Dispatches manual text typed into the UI to the AI client |
| `response_chunk` | `AIThread` | `SentenceBuffer`, WebSocket | `token: str` | Streams incremental text chunks from the LLM |
| `sentence_ready` | `SentenceBuffer` | `TTSThread` | `sentence: str` | Dispatches completed parsed sentences for speech generation |
| `response_done` | `AIThread` | `Brain`, WebSocket, DB | `full_text: str` | Dispatches completed full LLM response text |
| `speech_done` | `TTSThread` | `Brain` | None | Notifies that the TTS audio output has finished draining |
| `memory_fact_extracted`| `AIThread` | `MemoryStore` | `fact: dict` | Emits raw dictionary args extracted from inline `remember` tool call |
| `facts_updated` | `MemoryStore` | UI / dashboard | None | Forces memory dashboard rebuild and notifies client UI |
| `task_completed` | `TaskRunner` | `ProactiveEngine`, UI | `task: dict` | Triggered when a background task finishes successfully |
| `task_blocked` | `TaskRunner` | `ProactiveEngine`, UI | `task: dict` | Triggered when a task requires user approval or fails repeatedly |
| `config_changed` | API Server / UI | All threads | `config: dict` | Dispatches updated configuration changes dynamically |

### 2.2 Component Directory Mapping
```
src/
├── ai/
│   ├── llm_providers/         # Groq, Ollama, OpenAI-compat, and Mock classes
│   │   ├── __init__.py        # Dynamic provider selection factory
│   │   ├── base.py            # Abstract BaseLLMProvider definition & REMEMBER schema
│   │   ├── groq_provider.py   # Groq SDK cloud integration
│   │   ├── ollama_provider.py # Local Ollama JSON chat API
│   │   ├── mock_provider.py   # No-network deterministic mock streams
│   │   └── openai_compat.py   # OpenAI-compatible custom routes
│   ├── memory_providers/      # Vector (sqlite-vec + fastembed) & Lexical classes
│   │   ├── __init__.py        # Memory index provider picker
│   │   ├── base.py            # Abstract BaseMemoryProvider interface
│   │   ├── vector_provider.py # SQLite-vec vector storage & RAG index
│   │   └── lexical_provider.py# Plain token keyword search fallback
│   ├── tts_providers/         # Piper TTS, pyttsx3, and Mock classes
│   │   ├── __init__.py        # TTS provider picker
│   │   ├── base.py            # Abstract BaseTTSProvider interface
│   │   ├── piper_provider.py  # Local ONNX Piper neural speech streaming
│   │   ├── pyttsx3_provider.py# Native Windows SAPI5 audio fallback
│   │   └── mock_provider.py   # Silence/delay generator for demos
│   ├── ai_client.py           # Orchestrates LLM streams, safety checks, inline tool parsing
│   ├── brain.py               # Immutable state machine for KIBO's emotional/visual state
│   ├── conversation_store.py  # JSON-file-backed conversation persistence with UUID v4 validation
│   ├── prompt_builder.py      # Stateless assembly of safety rules & recalled memories
│   ├── memory_store.py        # SQLite vector DB syncing with an Obsidian Markdown vault
│   ├── memory_io.py           # Markdown frontmatter loader & parser
│   ├── memory_dashboard.py    # Auto-generation of Obsidian visual index
│   ├── safety.py              # Safety net scans for self-harm and prohibited claims
│   ├── sentence_buffer.py     # Accumulates token deltas into well-formed sentences for TTS
│   ├── tts_manager.py         # Provider-agnostic TTS thread-safe queue & background playback daemon
│   └── voice_listener.py      # passive hotkey recording + Whisper STT transcription
├── api/
│   ├── event_bus.py           # Thread-safe decoupled pub/sub bus
│   ├── server.py              # FastAPI endpoints and WebSocket stream managers
│   └── main.py                # Backend starting point; boots threads & FastAPI
├── system/
│   ├── proactive_engine.py    # Periodic evaluation of trigger conditions (e.g., CPU, battery)
│   ├── proactive_policy.py    # Pure logic evaluating daily caps, quiet hours, cooldowns
│   ├── proactive_types.py     # Immutable data envelopes for proactive events
│   ├── notification_router.py # State manager checking snooze, snooze API, logging routing state
│   ├── provider_health.py     # Diagnostic connections checks for offline/online providers
│   ├── diagnostics.py         # JSON exporter of system parameters and redacted configs
│   ├── hotkey_listener.py     # Global low-level OS hotkey hook
│   ├── system_monitor.py      # Polls CPU, battery status, and user idle times
│   ├── calendar_manager.py    # Syncs events with local clock offsets via Google OAuth API
│   ├── search_client.py       # Static DuckDuckGo HTML scraper for zero-dependency web search lookup
│   └── task_runner.py         # Runs background agent tasks with rate limits and approvals
└── core/
    ├── config_manager.py      # Immutable MappingProxyType config validator and parser
    └── periodic_thread.py     # Utility thread class for periodic background tasks
```

### 2.3 Streaming Output Sanitization: `StreamingThinkingFilter`
To prevent KIBO from dumping internal reasoning text or ugly markup into the visual speech bubbles and TTS voice audio, all raw LLM token streams are intercepted in real-time inside [src/ai/ai_client.py](file:///D:/Projects/KIBO/src/ai/ai_client.py) using a stateful `StreamingThinkingFilter`:
*   **Chain-of-Thought Tag Stripping**: Detects and purges `<think>...</think>` tags and everything inside them. Holds partial tag boundaries statefully across streaming packets.
*   **Parentheses Thinking Pruning**: Matches and strips parentheses-wrapped thinking commentary (e.g. `( Okay, the user asked for Einstein... )`) at the absolute beginning of the stream, while safely preserving normal parenthetical statements later in the response.
*   **HTML `<br>` Tag Sanitization**: Converts any raw `<br>`, `<br/>`, or `<br />` HTML tags into standard markdown newlines (`\n`) mid-stream to ensure flawless rendering across both Markdown components and TTS buffers.

---

## 3. Core Frontend & Electron Structure (`frontend/`)

The frontend is an **Electron + React** app powered by **Vite** and **Tailwind CSS (v4 OKLCH material system)**. 

### 3.1 Electron Multi-Window Architecture & Boundary Adaptation
Electron supervises KIBO through isolated BrowserWindows to optimize memory and maintain render state:
*   **Pet Window (`frontend/electron/main/pet-window.ts`)**: Expanded to `240x320` (from `200x200`) to comfortably house the dual Kibo+Bubble layout. It is a transparent, frameless click-through window positioned in the system tray quadrant. Click-through safety is achieved via:
    ```typescript
    ipcMain.handle("pet:set-click-through", (event, enabled) => {
      petWindow?.setIgnoreMouseEvents(enabled, { forward: true });
    });
    ```
    This instructs Windows to ignore mouse coordinates on completely transparent pixels, passing clicks back to the underlying OS surface, but registering hover focus inside visible areas.
*   **Space-Aware Speech Bubbles & Redesigned Context Menu**: To prevent collision with screen bounds, the Pet Window renderer (`PetSprite.tsx`) monitors `window.screenY < 120`. If Kibo floats near the top of the desktop, it anchors to the top (`justify-start`) and renders the Speech Bubble *below* Kibo; otherwise, Kibo anchors to the bottom (`justify-end`) and floats the Speech Bubble *above* Kibo's head. The Pet sprite also houses a premium redesigned context menu (Chat and Quit) featuring smooth React entry animations, an elegant blue aura shadow (`var(--color-kibo-accent-glow)`), and cohesive uniform colors matching the white-blue glassmorphic theme.
*   **Deferred Initialization**: To avoid app initialization crashes, filesystem/path lookups (like reading `buddy_skin` from `config.json` on boot) are encapsulated in `initializeWindowState()` and deferred until `app.whenReady()` inside `index.ts`.
*   **Chat Window (`frontend/electron/main/chat-window.ts`)**: A warm panel showing transcript cards, custom serifs, and the InputBar.
*   **Settings Window & Capabilities Section (`frontend/electron/main/settings-window.ts`)**: Dense layout featuring visual tabs. A dedicated **"Capabilities"** tab allows users to selectively toggle KIBO's compute-heavy modules (Web Search, Proactive Alerts, Durable Memory, Inline Memory Extraction, Text-to-Speech) to save local CPU cycles and API tokens.
*   **Onboarding Window (`frontend/electron/main/OnboardingWindow.tsx`)**: Renders first-run wizard steps. Once finished, writes `first_run_completed: true` to `config.json`.
*   **Python Subprocess Bridge (`python-bridge.ts`)**: Controls the lifecycles of `src.api.main`. In dev mode, spawns python. In production, calls a packaged `server.exe`. Monitors startup success via `/health` REST polling. Binds process cleanup directly to Electron exit events:
    ```typescript
    app.on("before-quit", () => {
      bridge.stop(); // process.kill()
    });
    ```

### 3.2 Security Bypasses in Dev Mode
Vite serves assets on `http://localhost:5173`. For security, Chromium blocks loading local media (`file://`) assets directly into an HTTP page. KIBO resolves this elegantly by routing dev assets via Vite's local file-system proxy:
```typescript
ipcMain.handle("assets:animation-path", (event, relativePath) => {
  const assetPath = join(app.getAppPath(), "..", "assets", "animations", relativePath);
  if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
    return `${process.env.ELECTRON_RENDERER_URL}/@fs/${assetPath.replace(/\\/g, "/")}`;
  }
  return pathToFileURL(assetPath).toString();
});
```

### 3.3 Design & Material System (OKLCH Semantic Tokens)
Following the updated guidelines, KIBO implements a premium, minimal, soft companion aesthetic. The layout uses smooth OKLCH palette tokens in `globals.css`:
*   **Background**: `oklch(98.2% 0.008 235)` (Soft minimal ice-white)
*   **Surface**: `oklch(99.6% 0.003 235)` (Clean off-white surface)
*   **Text**: `oklch(24% 0.032 235)` (Deep slate navy charcoal)
*   **Muted Text**: `oklch(50% 0.024 235)` (Soft slate-blue)
*   **Accent**: `oklch(62% 0.160 235)` (Premium soft blue aura)
*   **Border**: `oklch(91% 0.012 235)` (Soft ice border)
*   **Success**: `oklch(56% 0.125 150)` (Sage green)
*   **Danger**: `oklch(58% 0.170 24)` (Coral red)

#### Premium Visual Integrations:
- **OKLAB Gradient Interpolation**: Outer viewport background (`.kibo-window-shell`) employs radial and linear gradients utilizing explicit `in oklab` space interpolation for smoother lighting transitions.
- **Component Classes**: Common elements are bound to semantic styling classes: `.kibo-soft-panel` (backdrop frosted sheet), `.kibo-input-bar` (interactive input capsule), and `.kibo-msg-bubble` (user/assistant message blocks).
- **Organic Breathing Aura**: An ambient background glow breathes slowly in a non-distracting `4s` cycle (`.animate-glow-breathe`) to satisfy cognitive ergonomics.

### 3.4 Unified Progress & Loading Bubble: `TypingIndicator`
To keep the desktop chat interface pristine, KIBO avoids rendering double loading/thinking bubble blocks concurrently. The `TypingIndicator` component in [ChatWindow.tsx](file:///D:/Projects/KIBO/frontend/src/components/chat/ChatWindow.tsx) was refactored into a single, unified loading capsule:
*   **Dual-State Mode**: If a `searchQuery` prop is provided, the bubble renders a clean progress spinner and search feedback (`Searching the web for "{query}"...`). If the query is null, it renders the classic three pulsing dots typing indicator.
*   **Unified Render**: Renders under the singular condition `{isLoading || searchQuery ? <TypingIndicator searchQuery={searchQuery} /> : null}`, ensuring the user always sees a single, gorgeous cohesive loading bubble.

---

## 4. Key Workflows & Thread Sequences

### 4.1 Voice Conversation Lifecycle (Phase 3/4.5A)
The streaming dialogue pipeline is fully concurrent, sentence-buffered, and instantly interruptible:

```
[User Hits Ctrl+K]
       │
       ├──► VoiceListener recording (passively checking audio levels)
       │
[Hotkey Released / Silence VAD]
       │
       ├──► sounddevice captures buffer ──► Whisper transcribes locally
       │
[Transcript Dispatched]
       │
       ├──► event_bus emits 'transcript_ready'
       │
[AIThread Triggers Groq / Ollama]
       │
       ├──► Inject prompt contract & recalled memories (MemoryStore)
       ├──► Stream starts: chunks emitted as 'response_chunk'
       │
[Sentence Buffer Accumulation]
       │
       ├──► SentenceBuffer joins tokens ──► detects sentence boundary
       ├──► Emits 'sentence_ready' containing the isolated sentence
       │
[Neural TTS Streaming Playback]
       │
       ├──► TTSThread intercepts sentence ──► feeds to Piper ONNX engine
       ├──► Audio starts playing immediately while subsequent tokens are generating!
```

### 4.2 Interruption Hardening (Phase 4.5A)
If the user presses `Ctrl+K` while KIBO is speaking, the event bus fires `hotkey_pressed`. `AIThread` calls `cancel_current()` to abort active LLM requests. `TTSThread` calls `stop_current()` to immediately sever the audio output stream, discard queued sentence frames, and reset the buffer. This achieves an instant, conversational voice interruption.

---

## 5. Memory Vault & Vector DB

KIBO combines absolute user transparency with neural kNN retrieval using a hybrid architecture:

### 5.1 The Obsidian Markdown Vault
Every memory extracted is saved as a separate Markdown file under `~/.kibo/vault/memories/` using structured YAML frontmatter:

```markdown
---
id: a8b3cd12
category: preference
keywords:
  - coffee
  - espresso
extracted_at: 1779432000
source_session: 2026-05-21
---

The user loves dark-roast espresso in the morning and dislikes sweetened milk.
```

- **Dashboard Sync**: A file named `KIBO Dashboard.md` is automatically maintained at the vault root by `MemoryDashboard` ([src/ai/memory_dashboard.py](file:///D:/Projects/KIBO/src/ai/memory_dashboard.py)), grouping memories by category and exposing links.
- **Obsidian Vault Compatible**: Users can open `~/.kibo/vault/` inside Obsidian to search, edit, or delete memories.
- **Auto-Sync Migration**: On startup, KIBO compares disk files against the SQLite provider index and syncs changes bidirectionally (Markdown edits are re-indexed; deleted Markdown files are purged from the vector index).

### 5.2 SQLite Vector Provider Details (`sqlite-vec`)
The vector provider initialization uses standard SQLite virtual tables:
```sql
CREATE TABLE IF NOT EXISTS memories (
    id          TEXT PRIMARY KEY,
    content     TEXT NOT NULL,
    category    TEXT NOT NULL DEFAULT 'fact',
    keywords    TEXT NOT NULL DEFAULT '[]',
    extracted_at INTEGER NOT NULL DEFAULT 0
);
CREATE VIRTUAL TABLE IF NOT EXISTS memories_vec USING vec0(
    id          TEXT PRIMARY KEY,
    embedding   float[384]
);
```

#### kNN RAG SQL Query
```sql
SELECT m.id, m.content, m.category, m.keywords, m.extracted_at
FROM memories_vec AS mv
JOIN memories AS m ON m.id = mv.id
WHERE mv.embedding MATCH ?
  AND k = ?
ORDER BY distance
```

### 5.3 Inline Memory Tool Call
Memory storage is highly efficient and operates *inline* without secondary round-trips. When the user shares something memorable, the LLM emits a `remember` tool call mid-stream:

```json
{
  "name": "remember",
  "arguments": {
    "content": "User prefers dark-roast espresso",
    "category": "preference",
    "keywords": ["coffee", "espresso"]
  }
}
```
`AIClient` suppresses this tool call from the visible chat bubble, saves it to `MemoryStore`, and prints a short verbal confirmation (e.g., *"Got it! I've saved that to my memory."*).

---

## 6. Proactivity Engine & Gated Policies

KIBO does not spam. Proactive ambient updates go through a pure, deterministic policy layer ([src/system/proactive_policy.py](file:///D:/Projects/KIBO/src/system/proactive_policy.py)) before reaching the interface.

```
ProactiveEngine (tick, sensor data)
       │
       ▼  ProactiveEvent(type, source_data)
ProactivePolicy.evaluate(event, RouterState, config, clock)
       │
       ▼  ProactiveDecision(approved, reason)
NotificationRouter (update RouterState, persist, emit signal)
       │
       ▼  notification_approved(message, type)
UIManager / TTSManager
```

### 6.1 Gated Delivery Rules
*   **Daily Cap**: Maximum **4 non-explicit ambient notifications** per calendar day.
*   **Min Interval**: At least **45 minutes** of silence must separate ambient alerts.
*   **Quiet Hours**: Ambient alerts are completely blocked (default 22:00 to 07:00).
*   **Snooze**: The user can silence KIBO from the tray for 1 hour. This sets `snoozed_until = now_ts + 3600`.
*   **Opt-In Rules**: Per-category toggles in Settings can disable specific types.

### 6.2 Trigger Matrix
| Trigger Name | Context Criteria | Priority | Cooldown |
| :--- | :--- | :--- | :--- |
| **Morning Greeting** | Time 08:00–12:00, application open $\ge 2$ min | Low | 12 hours |
| **Idle Check-in** | User has been completely idle $\ge 60$ min | Low | 60 min |
| **End of Day Summary** | Time 17:00–20:00, $\ge 1$ task completed | Low | 8 hours |
| **Battery Low** | Battery $\le 20\%$ | Medium | 30 min |
| **CPU Stress** | CPU $\ge 90\%$ | Medium | 5 min |
| **Meeting Reminder** | Google Calendar event start is $\le 30$ min | Medium | 25 min |

---

## 7. Background Task Runner (`TaskRunner`)

The backend runs a periodic task-worker loop to complete async operations using local model executions.

### 7.1 Lifecycle Rules & Database
- Tasks are kept in `tasks.json` under `~/.kibo/`.
- Tasks transition through: `pending` $\rightarrow$ `in_progress` $\rightarrow$ `completed` or `blocked` / `cancelled`.
- Enforces an hourly execution rate limit of **20 calls** using `cost_state.json`.
- Failed API tasks are retried up to **3 times** with automatic error serialization, and transitioned to `blocked` once exceeded.
- Tasks flagged with `requires_approval` are locked until the user explicitly permits execution via:
  ```
  POST /tasks/approve/{task_id}
  ```

---

## 8. Personality & Safety Constraints

KIBO's personality and safety guardrails are injected via [src/ai/prompt_builder.py](file:///D:/Projects/KIBO/src/ai/prompt_builder.py) and enforced by the double-pass safety system in [src/ai/safety.py](file:///D:/Projects/KIBO/src/ai/safety.py).

### 8.1 Pre-LLM User Message Scan (Crisis Short-Circuit)
If `check_user_input` detects self-harm patterns, KIBO bypasses the LLM network request entirely to prevent any risk of hallucinated advice. The backend immediately fires:
- A structured `safety_event` to the frontend dashboard.
- Generates `crisis_response()` containing the standard, calm supportive message and the official 988 Suicide and Crisis Lifeline resource context.

### 8.2 Post-LLM Assistant Message Scan (The Safety Net)
Scans streaming LLM output in real time for violating assertions:
- **Romantic / Attraction Claims**: Flagged immediately. KIBO must remain a desktop companion.
- **Therapist Impersonation**: Cannot diagnose or claim counseling roles.
- **Sentience / Consciousness Claims**: Holds the line honestly — KIBO is software, not a conscious entity.
If flagged, the backend fires a warning signal without silently rewriting the text, notifying the client metrics pipeline.

### 8.3 Proactive Web Search Mandate
To ensure KIBO is a highly knowledgeable virtual companion that never answers with outdated or hallucinated facts, its core system prompt in `sys_prompt/KIBO Hyperion 4.8.txt` and `src/ai/prompt_builder.py` enforces a strict **Web Search Mandate**:
*   **Automatic Triggering**: KIBO is commanded to automatically and aggressively trigger the `web_search` tool for any factual queries, historical or biographical questions (such as asking about Albert Einstein), science, technology, technical documentation, or news.
*   **Zero Permission Flow**: KIBO must execute the search immediately without asking the user for permission.
*   **Prose Synthesis**: KIBO must synthesize the search results using its natural spoken prose style, strictly avoiding lists, links, or tables that would ruin TTS speech.

---

## 9. API Protocol Specification

### 9.1 REST Endpoints
The following endpoints are hosted on port `8765` by default:

| Endpoint | Method | Payload | Response Schema | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/health` | `GET` | None | `{"status": "ok"}` | Liveness health checker |
| `/settings` | `GET` | None | `dict` (masked config) | Returns verified, redacted configuration keys |
| `/settings` | `POST` | `dict` (partial fields) | `{"ok": true}` | Validates and updates configuration on disk |
| `/memory` | `GET` | None | `list[dict]` | Returns all indexed facts and YAML parameters |
| `/memory/{id}`| `DELETE`| None | `{"ok": true}` | Deletes memory Markdown file and purges SQLite vector row |
| `/memory/{id}`| `PUT` | `dict` | `{"ok": bool}` | Updates memory file contents and rebuilds DB index |
| `/tasks` | `GET` | None | `list[dict]` | Returns active queues in the task list |
| `/tasks` | `POST` | `{"title": "...", "description": "..."}` | `{"id": "uuid-str"}`| Adds a task to the background queue |
| `/tasks/{id}` | `DELETE`| None | `{"ok": true}` | Cancels a pending or blocked task |
| `/conversations`| `GET`| None | `list[dict]` | Lists past saved chat session logs |
| `/conversations`| `POST`| None | `{"id": "...", "title": "..."}` | Creates a new chat transcript session on disk |
| `/conversations/{conv_id}`| `GET`| None | `dict` | Returns messages list inside conversation |
| `/conversations/{conv_id}`| `DELETE`| None | `{"ok": true}` | Deletes conversation session from disk |
| `/export` | `GET` | None | `{"settings":..., "memory":..., "conversations":...}` | Exportable single-JSON package of all user data |
| `/clear` | `POST` | None | `{"ok": true}` | Complete system reset (wipes all markdown files and database) |

### 9.2 WebSocket Interfaces
- **`/ws/chat`**: Bidirectional real-time stream.
  - *Client query packet*: `{"type": "query", "text": "user message", "conversation_id": "optional-uuid"}`
  - *Server response chunk*: `{"type": "response_chunk", "text": "token"}`
  - *Server done indicator*: `{"type": "response_done", "text": "full compiled reply"}`
- **`/ws/state`**: Unidirectional server-to-client event stream. Sends real-time changes in KIBO's state machine, sensor events, and proactive alerts.

---

## 10. Hardware Audio Integration Details

### 10.1 Windows Input Device selection (`sounddevice`)
WASAPI often rejects 16 kHz sampling and PortAudio crashes on WDM-KS devices. KIBO's `VoiceListener` scoring logic automatically scores MME or DirectSound endpoints to pick physical microphones over loopback:
```python
_VIRTUAL = {"transscreen", "virtual", "mapper", "loopback", "stereo mix"}
_PREFER  = {"microphone", "mic", "realtek", "array"}
_AVOID_HOSTAPI = {"Windows WDM-KS", "Windows WASAPI"}
```

### 10.2 Low-Latency Piper Streaming
`synthesize_stream_raw` yields raw PCM data chunks, which are converted to `numpy` arrays and written straight to the `OutputStream` in real time:
```python
stream = sd.OutputStream(samplerate=sample_rate, channels=1, dtype="int16")
stream.start()
for audio_chunk in voice.synthesize_stream_raw(text):
    samples = np.frombuffer(audio_chunk, dtype=np.int16)
    stream.write(samples)
```

---

## 11. Verification & Testing Playbook

KIBO maintains a strict **TDD** development flow. A massive test suite consisting of **254 tests** covers the entire application.

### 11.1 Commands
*   **Run All Tests (Silent / Quick)**:
    ```bash
    uv run python -m pytest tests/ -q
    ```
*   **Run Latency Profiler (Mock baseline)**:
    ```bash
    uv run python scripts/profile_latency.py
    ```
*   **Run Latency Profiler (Real configured pipeline)**:
    ```bash
    uv run python scripts/profile_latency.py --real
    ```

### 11.2 Critical Testing Modules
- `test_phase3_pipeline.py`: Tests the end-to-end conversation pipeline, streaming token chunks, sentence splitting, and memory extraction.
- `test_ai_client.py`: Verifies AI client conversation history trimming, inline memory extraction, cancellation, and provides full unit coverage for the `StreamingThinkingFilter` (including tag filtering, partial boundary buffering, paren thoughts, and HTML `<br>` sanitization).
- `test_personality_regression.py`: Simulates long conversations to check prompt coherence and safety limits under stressful inputs.
- `test_tts_full.py`: Extensively verifies audio chunk delivery, Piper subprocess pipes, Pyttsx3 fallbacks, and the voice cancellation loop.
- `test_proactive_engine.py`: Runs pure mock clocks against `ProactivePolicy` rules to test boundary conditions (quiet hours transition, daily limits, rule cooldowns).
- `test_vector_memory.py`: Confirms sqlite-vec can search embeddings (using fastembed) and evict facts correctly when hitting the maximum cap.
- `test_web_search_edge_cases.py`: Verifies zero-dependency search clients, protocol aliases, and sequential DuckDuckGo parameter redirect resolution.
- `test_ollama_fallback.py`: Hardens local LLM streaming by verifying the graceful inside-stream text-only fallback retry when Ollama returns a 400 Bad Request error.

---

## 12. Core Coding Standards & Conventions

To maintain KIBO's exceptional engineering credibility, developers must adhere to these standards:

1.  **Immutability First**: Always return new objects or configurations (e.g., `MappingProxyType` or frozen dataclasses). Never mutate data structures in place.
2.  **Short, Scannable Files**: Keep standard files under 400 lines (maximum 800). Extract classes or methods when file limits are exceeded.
3.  **Explicit Error Boundaries**: Never swallow an exception. Catch explicitly, log clearly (using `logging`), and degrade gracefully using alternative providers.
4.  **Security Net Integrity**: Never edit `src/ai/safety.py` without writing corresponding regression unit tests in `test_safety.py`. Ensure self-harm detection triggers immediate short-circuiting.
5.  **Clean Asset Preprocessing**: WebM files must use VP9 alpha coding (`yuva420p`). Use `python scripts/preprocess_alpha.py` to prepare transparency sheets, ensuring zero runtime CPU cost.

---

*This document is the official blueprint for KIBO's system intelligence. When extending or modifying features, always consult this roadmap to respect the separation of concerns and provider-agnostic designs.*
