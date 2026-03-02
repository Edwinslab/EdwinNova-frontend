"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./TerminalChat.module.css";

// ─── CONFIG ─────────────────────────────────────────────
const API_URL = " https://edwinnova-chatbot.onrender.com/chat"; // <-- Replace with your API URL
const BOT_NAME = "EDWIN";

// ─── Types ──────────────────────────────────────────────
type MessageType =
  | "user"
  | "bot"
  | "error"
  | "typing"
  | "system"
  | "ascii-art"
  | "divider";

interface ChatMessage {
  id: string;
  text: string;
  type: MessageType;
}

// ─── Generate session ID ────────────────────────────────
function generateSessionId(): string {
  return (
    "sess_" +
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36)
  );
}

// ─── ASCII Banner ───────────────────────────────────────
const ASCII_BANNER = `
  ███████╗██████╗ ██╗    ██╗██╗███╗   ██╗
  ██╔════╝██╔══██╗██║    ██║██║████╗  ██║
  █████╗  ██║  ██║██║ █╗ ██║██║██╔██╗ ██║
  ██╔══╝  ██║  ██║██║███╗██║██║██║╚██╗██║
  ███████╗██████╔╝╚███╔███╔╝██║██║ ╚████║
  ╚══════╝╚═════╝  ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝
          A I   A S S I S T A N T`;

const DIVIDER = "─────────────────────────────────────";

// ─── Escape HTML ────────────────────────────────────────
function escapeHTML(str: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}

// ─── Message Component ──────────────────────────────────
function MessageLine({ msg }: { msg: ChatMessage }) {
  switch (msg.type) {
    case "ascii-art":
      return (
        <div className={`${styles.msgLine} ${styles.asciiArt}`}>
          {msg.text}
        </div>
      );

    case "divider":
      return <div className={`${styles.msgLine} ${styles.msgDivider}`}>{msg.text}</div>;

    case "system":
      return (
        <div className={`${styles.msgLine} ${styles.msgSystem}`}>
          <span className={styles.sysArrow}>▸</span> {msg.text}
        </div>
      );

    case "user":
      return (
        <div className={`${styles.msgLine} ${styles.msgUser}`}>
          <span className={styles.promptSymbol}>❯</span>{" "}
          <span className={styles.promptPath}>~</span>{" "}
          <span className={styles.promptText}>{msg.text}</span>
        </div>
      );

    case "bot":
      return (
        <div className={`${styles.msgLine} ${styles.msgBot}`}>
          <span className={styles.botPrefix}>[{BOT_NAME}]</span>
          <span className={styles.botText}>{msg.text}</span>
        </div>
      );

    case "typing":
      return (
        <div className={`${styles.msgLine} ${styles.msgBot}`}>
          <span className={styles.botPrefix}>[{BOT_NAME}]</span>{" "}
          <span className={styles.cursorBlink}></span>
        </div>
      );

    case "error":
      return (
        <div className={`${styles.msgLine} ${styles.msgError}`}>
          <span className={styles.errPrefix}>ERROR:</span> {msg.text}
        </div>
      );

    default:
      return null;
  }
}

// ═══════════════════════════════════════════════════════
// ─── MAIN COMPONENT ───────────────────────────────────
// ═══════════════════════════════════════════════════════
export default function TerminalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const sessionIdRef = useRef(generateSessionId());
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const sessionId = sessionIdRef.current;

  // ── Auto-scroll on new messages ──
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Close on outside click ──
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        windowRef.current &&
        toggleRef.current &&
        !windowRef.current.contains(e.target as Node) &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // ── Keyboard shortcut: Ctrl + / ──
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  // ── Prevent page scroll when hovering over chat ──
  useEffect(() => {
    const chatEl = windowRef.current;
    if (!chatEl) return;

    function handleWheel(e: WheelEvent) {
      const body = bodyRef.current;
      if (!body) return;

      const { scrollTop, scrollHeight, clientHeight } = body;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Only prevent default when NOT at the scroll boundary,
      // or when at the boundary to stop it leaking to the page
      if (atTop || atBottom) {
        e.preventDefault();
      }

      // Always stop propagation so the page never scrolls
      e.stopPropagation();
    }

    chatEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => chatEl.removeEventListener("wheel", handleWheel);
  }, []);

  // ── Helper to add messages ──
  const uid = () => Math.random().toString(36).substring(2, 9);

  const addMessages = useCallback((...msgs: Omit<ChatMessage, "id">[]) => {
    setMessages((prev) => [
      ...prev,
      ...msgs.map((m) => ({ ...m, id: uid() })),
    ]);
  }, []);

  // ── Show welcome on first open ──
  const showWelcome = useCallback(() => {
    const welcomeMsgs: Omit<ChatMessage, "id">[] = [
      { text: ASCII_BANNER, type: "ascii-art" },
      { text: DIVIDER, type: "divider" },
      { text: 'System initialized. Type "help" for commands.', type: "system" },
      { text: `Welcome, user. Session ${sessionId.substring(0, 8)} active.`, type: "system" },
      { text: DIVIDER, type: "divider" },
    ];
    addMessages(...welcomeMsgs);
  }, [sessionId, addMessages]);

  // ── Toggle handler ──
  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    setShowBadge(false);

    if (willOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (!hasOpened) {
        setHasOpened(true);
        showWelcome();
      }
    }
  };

  // ── Send message ──
  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isBusy) return;

    setInputValue("");

    // ── Local commands ──
    if (text.toLowerCase() === "help") {
      addMessages(
        { text, type: "user" },
        { text: "Available commands:", type: "system" },
        { text: "  help     — Show this help menu", type: "system" },
        { text: "  clear    — Clear terminal output", type: "system" },
        { text: "  session  — Show current session ID", type: "system" },
        { text: "  <any>    — Chat with Edwin AI", type: "system" }
      );
      return;
    }

    if (text.toLowerCase() === "clear") {
      setMessages([]);
      addMessages({ text: "Terminal cleared.", type: "system" });
      return;
    }

    if (text.toLowerCase() === "session") {
      addMessages(
        { text, type: "user" },
        { text: `Current session: ${sessionId}`, type: "system" }
      );
      return;
    }

    // ── API call ──
    addMessages({ text, type: "user" });
    setIsBusy(true);

    // Add typing indicator
    const typingId = uid();
    setMessages((prev) => [...prev, { id: typingId, text: "", type: "typing" }]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          session_id: sessionId,
        }),
      });

      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Adapt to your API response shape
      const reply = data.Response;

      addMessages({ text: reply, type: "bot" });

      // Show badge if chat is closed
      if (!isOpen) {
        setShowBadge(true);
      }
    } catch (err: any) {
      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      addMessages(
        { text: `Connection failed — ${err.message}`, type: "error" },
        { text: "Check your API endpoint or try again.", type: "system" }
      );
    }

    setIsBusy(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  // ═════════════════════════════════════════════════════
  // ─── RENDER ─────────────────────────────────────────
  // ═════════════════════════════════════════════════════
  return (
    <>
      {/* Toggle Button */}
      <button
        ref={toggleRef}
        className={`${styles.chatToggle} ${isOpen ? styles.active : ""}`}
        onClick={handleToggle}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Animated Terminal Computer Icon */}
        <span className={styles.iconTerminal}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Monitor body */}
            <rect
              x="6"
              y="4"
              width="52"
              height="38"
              rx="4"
              fill="#0e1320"
              stroke="#9be931"
              strokeWidth="2"
            />
            {/* Screen area */}
            <rect
              x="10"
              y="8"
              width="44"
              height="30"
              rx="2"
              fill="#0b0f1a"
            />
            {/* Scanline shimmer */}
            <rect x="10" y="8" width="44" height="30" rx="2" fill="url(#scanShimmer)" opacity="0.15">
              <animate
                attributeName="y"
                values="8;38;8"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
            {/* Terminal line 1: prompt + typing */}
            <text x="14" y="18" fill="#9be931" fontSize="5" fontFamily="monospace" fontWeight="700">
              $
            </text>
            <rect x="20" y="14" width="12" height="4" rx="1" fill="#9be931" opacity="0.8">
              <animate
                attributeName="width"
                values="0;12;12;12"
                keyTimes="0;0.3;0.8;1"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </rect>
            {/* Terminal line 2: output */}
            <rect x="14" y="21" width="20" height="3" rx="1" fill="#6fc1ff" opacity="0.5">
              <animate
                attributeName="width"
                values="0;0;20;20"
                keyTimes="0;0.35;0.6;1"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </rect>
            {/* Terminal line 3: output */}
            <rect x="14" y="27" width="28" height="3" rx="1" fill="#e6edf3" opacity="0.3">
              <animate
                attributeName="width"
                values="0;0;0;28"
                keyTimes="0;0.5;0.65;0.9"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </rect>
            {/* Blinking cursor */}
            <rect x="14" y="33" width="4" height="3" rx="0.5" fill="#9be931">
              <animate
                attributeName="opacity"
                values="1;1;0;0;1"
                keyTimes="0;0.4;0.5;0.9;1"
                dur="1s"
                repeatCount="indefinite"
              />
            </rect>
            {/* Monitor stand */}
            <rect x="25" y="42" width="14" height="4" rx="1" fill="#1a2233" />
            <rect x="20" y="46" width="24" height="3" rx="1.5" fill="#1a2233" stroke="#9be931" strokeWidth="0.8" />
            {/* Screen glow */}
            <rect x="10" y="8" width="44" height="30" rx="2" fill="url(#screenGlow)" opacity="0.1" />
            {/* Defs */}
            <defs>
              <linearGradient id="screenGlow" x1="32" y1="8" x2="32" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9be931" />
                <stop offset="1" stopColor="#0b0f1a" />
              </linearGradient>
              <linearGradient id="scanShimmer" x1="32" y1="0" x2="32" y2="6" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="transparent" />
                <stop offset="0.5" stopColor="#9be931" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className={styles.iconClose}>✕</span>
        <div
          className={`${styles.notifBadge} ${showBadge ? styles.show : ""}`}
        />
      </button>

      {/* Chat Window */}
      <div
        ref={windowRef}
        className={`${styles.chatWindow} ${isOpen ? styles.open : ""}`}
      >
        {/* Title Bar */}
        <div className={styles.termHeader}>
          <div className={styles.termDots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <div className={styles.termTitle}>
            <span className={styles.highlight}>▸</span> edwin-ai{" "}
            <span className={styles.highlight}>::</span> v2.0
          </div>
        </div>

        {/* System Info */}
        <div className={styles.sysInfo}>
          <span>
            <span className={styles.statusDot} />
            CONNECTED
          </span>
          <span>SESSION: {sessionId.substring(0, 14)}</span>
        </div>

        {/* Messages */}
        <div className={styles.termBody} ref={bodyRef}>
          {messages.map((msg) => (
            <MessageLine key={msg.id} msg={msg} />
          ))}
        </div>

        {/* Input */}
        <div className={styles.termInputArea}>
          <span className={styles.inputPrompt}>
            <span className={styles.inputPath}>~/chat</span> $
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.userInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            autoComplete="off"
            spellCheck={false}
          />
          <button
            className={styles.sendBtn}
            onClick={sendMessage}
            disabled={isBusy}
            aria-label="Send"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}