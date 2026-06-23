"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 90, damping: 20, mass: 0.9 };

const TICKER_ITEMS = [
  { label: "LIVE", isLive: true },
  { label: "TOPPS CHROME 2024", value: "+12%", up: true },
  { label: "PRIZM SILVER", value: "-2%", up: false },
  { label: "PSA POP", value: "+318", up: true },
  { label: "14M CARDS INDEXED" },
  { label: "SLABS GRADED TODAY", value: "2,847", up: true },
  { label: "BGS AUTO", value: "+8.4%", up: true },
  { label: "LIVE AUCTIONS", value: "1,203", up: true },
];

const NAV_LINKS = [
  { label: "FEATURES", href: "#features" },
  { label: "DEMO",     href: "#demo" },
  { label: "PRICING",  href: "#pricing" },
  { label: "CONTACT",  href: "#contact" },
];

const TOOLS = [
  { name: "VIDEO SNIPER",  screenshot: "/carousel/CARD APP INSTANT SNIPER PRO UPDATE copy.png" },
  { name: "BULK SCANNER",  screenshot: "/carousel/CARD APP BULK CARD SCANNER UPLOAD UPDATE copy.png" },
  { name: "VALUE TOOL",    screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png" },
  { name: "PORTFOLIO",     screenshot: "/carousel/CARD APP Portfolio Tracker copy2.png" },
  { name: "EBAY LISTER",   screenshot: "/carousel/CARD APP EBAY BULK LISTER copy.png" },
  { name: "CSV BULK",      screenshot: "/carousel/CARD APP CSV Bulk Upload UPDATE 2 copy.png" },
  { name: "DEAL FINDER",   screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png" },
  { name: "FLIP FINDER",   screenshot: "/carousel/CARD APP FLIP FINDER copy3 up.png" },
  { name: "AFFILIATE",     screenshot: "/carousel/CARD APP AFFILIATE PROGRAM copy2.png" },
  { name: "WHITE LABEL",   screenshot: "/carousel/CARD APP WHITE LABEL SAAS copy.png" },
  { name: "SLAB IQ",       screenshot: "/carousel/CARD APP SLAB IQ copy2.png" },
  { name: "INVENTORY",     screenshot: "/carousel/CARD APP Inventory Manager copy2.png" },
  { name: "LIVE MARKET",   screenshot: "/carousel/CARD APP LIVE MARKETPLACE copy2.png" },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticBtn({ children, style, href = "#" }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, ...style, textDecoration: "none", cursor: "pointer" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tickerLoop = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
      {/* Live ticker */}
      <div style={{ height: 36, background: "#0A0A0B", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 24px" }}>
        <motion.div
          style={{ display: "flex", gap: 40, flexShrink: 0 }}
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {tickerLoop.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", whiteSpace: "nowrap", color: "rgba(255,255,255,0.75)" }}>
              {item.isLive ? (
                <>
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px rgba(16,185,129,0.9)" }}
                  />
                  <span style={{ color: "#10B981", fontWeight: 700 }}>LIVE</span>
                </>
              ) : (
                <>
                  <span>{item.label}</span>
                  {item.value && (
                    <span style={{ color: item.up ? "#10B981" : "#EF4444", fontWeight: 700 }}>{item.value}</span>
                  )}
                </>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Nav row */}
      <nav style={{
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: scrolled ? "rgba(255,255,255,0.97)" : "white",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        transition: "background 0.3s, box-shadow 0.3s",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <motion.div
            whileHover={{ scale: 1.06, rotate: -4 }}
            transition={SPRING}
            style={{ width: 52, height: 52, borderRadius: 13, background: "linear-gradient(145deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 24, letterSpacing: "0.04em", border: "2.5px solid white", boxShadow: "0 8px 24px rgba(79,70,229,0.35), inset 0 1px 0 rgba(255,255,255,0.5)", flexShrink: 0 }}
          >
            CV
          </motion.div>
          <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 26, letterSpacing: "0.03em", color: "#0A0A0B", lineHeight: 1, whiteSpace: "nowrap" }}>
            CARDVALUES
            <span style={{ fontSize: 10, verticalAlign: "top", color: "#9CA3AF", marginLeft: 3, fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}>™</span>
          </span>
        </div>

        {/* Center links — desktop only */}
        <div className="cv-nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ background: "rgba(10,10,11,0.05)" }}
              transition={{ duration: 0.15 }}
              style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 18, letterSpacing: "0.08em", color: "#0A0A0B", padding: "10px 16px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              {label}
            </motion.a>
          ))}
        </div>

        {/* Right — CTA + sign in */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <a
            href="#signin"
            className="cv-nav-signin"
            style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13, color: "#6B7280", fontWeight: 500, textDecoration: "none", padding: "8px 12px" }}
          >
            Sign in
          </a>
          <MagneticBtn
            className="cv-nav-cta"
            style={{ background: "#0A0A0B", color: "white", border: "1.5px solid #10B981", padding: "11px 22px", borderRadius: 100, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 16, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 8, lineHeight: 1 }}
          >
            <Zap size={14} strokeWidth={2.5} color="#10B981" />
            TRY FREE
            <span style={{ fontSize: 13 }}>→</span>
          </MagneticBtn>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="cv-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          style={{ display: "none", width: 42, height: 42, borderRadius: 10, background: "transparent", border: "1.5px solid #E5E7EB", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "#0A0A0B", padding: 0, flexShrink: 0 }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Amber accent rail */}
      <motion.div
        style={{ height: 4, background: "#F59E0B" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="cv-mobile-menu"
            style={{ background: "white", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: 2 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "14px 12px", fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 22, letterSpacing: "0.06em", color: "#0A0A0B", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.04)" }}
              >
                {label}
              </a>
            ))}
            <a
              href="#signin"
              onClick={() => setMobileOpen(false)}
              style={{ padding: "14px 12px", fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 15, color: "#6B7280", fontWeight: 500, textDecoration: "none" }}
            >
              Sign in
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Turntable ────────────────────────────────────────────────────────────────
function Turntable() {
  const rotRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    let id: number;
    let last = performance.now();
    const tick = (now: number) => {
      if (!pausedRef.current) {
        rotRef.current = (rotRef.current + ((now - last) / 1000) * 5) % 360;
        if (stageRef.current) {
          stageRef.current.style.transform = `rotateY(${rotRef.current}deg)`;
        }
      }
      last = now;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{
        position: "relative",
        width: "190%",
        height: 640,
        marginLeft: "-45%",
        perspective: 1200,
        perspectiveOrigin: "50% 46%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: 260,
          height: 380,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {TOOLS.map((tool, i) => (
          <div
            key={tool.name}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: 260, height: 380,
              backfaceVisibility: "hidden",
              transform: `rotateY(${(360 / TOOLS.length) * i}deg) translateZ(480px)`,
            }}
          >
            <img
              src={tool.screenshot}
              alt={tool.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                // drop-shadow only applies to actual image pixels — no box shadow
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))", mixBlendMode: "multiply" as React.CSSProperties["mixBlendMode"],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Floating Sniper Widget ────────────────────────────────────────────────────
function SniperWidget() {
  const [visible, setVisible] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const MSGS = [
    "5 SECOND VALUE",
    "SNIPE GRADED CARDS",
    "NO MORE OVERBIDDING",
    "MAKE FAST MONEY",
    "THE CHEAT CODE",
    "SNIPE ANY PLATFORM",
  ];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMsgIdx(i => (i + 1) % MSGS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#sniper"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          whileHover={{ scale: 1.06 }}
          style={{
            position: "fixed",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 200,
            textDecoration: "none",
            width: 120,
            height: 120,
            borderRadius: 20,
            background: "linear-gradient(135deg, #18181B 0%, #27272A 55%, #18181B 100%)",
            border: "3px solid white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 8px 10px",
            textAlign: "center",
            color: "white",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Amber pulse ring */}
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(245,158,11,0.7)", "0 0 0 14px rgba(245,158,11,0)", "0 0 0 0 rgba(245,158,11,0)"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, borderRadius: 17 }}
          />
          {/* Shine sweep */}
          <motion.div
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "linear", repeatDelay: 1.4 }}
            style={{ position: "absolute", top: 0, bottom: 0, width: "55%", background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent)", pointerEvents: "none" }}
          />
          {/* NOW FEATURING badge */}
          <span style={{
            position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
            display: "inline-flex", alignItems: "center", gap: 3,
            padding: "2px 8px",
            background: "linear-gradient(135deg, #10B981, #059669)",
            borderRadius: 100,
            fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            fontSize: 6.5, fontWeight: 700, letterSpacing: "0.14em",
            color: "white", whiteSpace: "nowrap",
            border: "1.5px solid white", zIndex: 3,
          }}>
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "white", display: "inline-block" }}
            />
            NOW FEATURING
          </span>
          {/* Title */}
          <span style={{
            position: "relative", zIndex: 2,
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontSize: 19, lineHeight: 1,
            letterSpacing: "0.03em",
            color: "#F59E0B",
            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            marginTop: 6,
          }}>
            VIDEO STREAM<br />SNIPING TOOL
          </span>
          {/* Rotating message */}
          <AnimatePresence mode="wait">
            <motion.span
              key={msgIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute", bottom: 9,
                left: "50%", transform: "translateX(-50%)",
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: 9.5, letterSpacing: "0.06em",
                color: "#10B981",
                textShadow: "0 0 8px rgba(16,185,129,0.9)",
                whiteSpace: "nowrap", zIndex: 3,
              }}
            >
              {MSGS[msgIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const c14 = useCountUp(14, 1600, statsVisible);
  const c50 = useCountUp(50, 1400, statsVisible);
  const c13 = useCountUp(13, 1000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const flyUp = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };

  return (
    <section style={{ position: "relative", minHeight: "100vh", background: "white", overflow: "hidden" }}>
      {/* Subtle dot-grid texture on right half only */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, right: 0,
          width: "58%", height: "100%",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }}
      />

      <div
        className="cv-hero-inner"
        style={{ width: "100%", padding: "60px 6% 72px", position: "relative", zIndex: 2 }}
      >
        <div
          className="cv-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.2fr)",
            gap: "clamp(24px, 3.5vw, 56px)",
            alignItems: "center",
            minHeight: "85vh",
          }}
        >
          {/* LEFT — copy */}
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ paddingTop: 8 }}>

            {/* Live eyebrow */}
            <motion.div variants={flyUp} style={{ marginBottom: 24 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#F0FDF4", border: "1px solid #BBF7D0",
                borderRadius: 100, padding: "7px 18px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "#059669",
              }}>
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 6px rgba(16,185,129,0.7)" }}
                />
                THE #1 CARD COLLECTING PLATFORM
              </span>
            </motion.div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "clamp(2.4rem, 4.4vw, 4.6rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "#0A0A0B",
              margin: "0 0 18px",
            }}>
              {[
                { text: "SCAN. VALUE.", outlined: false },
                { text: "SELL. PROFIT.", outlined: false },
                { text: "THE ONLY APP", outlined: false },
                { text: "YOUR CARD BUSINESS", outlined: false },
                { text: "NEEDS.", outlined: true },
              ].map(({ text, outlined }, i) => (
                <motion.div key={i} variants={flyUp} style={{ overflow: "hidden" }}>
                  <span style={outlined ? {
                    color: "#10B981",
                    WebkitTextStroke: "1.5px #0A0A0B",
                    paintOrder: "stroke fill",
                  } : {}}>
                    {text}
                  </span>
                </motion.div>
              ))}
            </h1>

            {/* Sub-copy */}
            <motion.p
              variants={flyUp}
              style={{
                fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: 1.7,
                color: "#6B7280",
                margin: "0 0 28px",
                maxWidth: 400,
              }}
            >
              The only card app trained to get every value right — parallels, autos, serial numbers.
              Run your hobby or full card business from one platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={flyUp}
              style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}
            >
              <MagneticBtn style={{
                background: "#0A0A0B",
                color: "white",
                border: "1.5px solid #10B981",
                padding: "14px 30px",
                borderRadius: 100,
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: 20,
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                lineHeight: 1,
                boxShadow: "0 8px 24px rgba(16,185,129,0.25)",
              }}>
                <Zap size={15} strokeWidth={2.5} color="#10B981" />
                TRY FREE →
              </MagneticBtn>
              <a
                href="#demo"
                style={{
                  fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#6B7280",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Watch Demo ↓
              </a>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              ref={statsRef}
              variants={flyUp}
              className="cv-hero-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                borderTop: "1px solid rgba(0,0,0,0.07)",
                paddingTop: 24,
                marginBottom: 20,
              }}
            >
              {[
                { display: statsVisible ? `${c14}M+` : "0M+",  label: "Cards Indexed", color: "#10B981" },
                { display: statsVisible ? `${c13}` : "0",       label: "Power Tools",   color: "#F59E0B" },
                { display: statsVisible ? `${c50}K+` : "0K+",  label: "Collectors",    color: "#8B5CF6" },
                { display: "<5s",                                   label: "Live Card ID",  color: "#3B82F6" },
              ].map(({ display, label, color }, i) => (
                <div key={label} style={{
                  paddingRight: i < 3 ? 16 : 0,
                  paddingLeft: i > 0 ? 16 : 0,
                  borderRight: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none",
                }}>
                  <div style={{
                    fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                    fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)",
                    lineHeight: 1,
                    color,
                  }}>
                    {display}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 9,
                    color: "#9CA3AF",
                    letterSpacing: "0.1em",
                    marginTop: 5,
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={flyUp}
              style={{ display: "flex", gap: 18, flexWrap: "wrap" }}
            >
              {["No credit card required", "Free plan available", "Cancel anytime"].map(t => (
                <span key={t} style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                  fontSize: 11, color: "#9CA3AF", fontWeight: 500,
                }}>
                  <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span>
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Turntable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            style={{ position: "relative", width: "100%", height: 640, overflow: "visible", background: "transparent" }}
          >
            <Turntable />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function PremiumHero() {
  return (
    <>
      <style jsx global>{`
        /* Responsive */
        @media (max-width: 1023px) {
          .cv-hero-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            gap: 40px !important;
          }
          .cv-hero-grid > div:last-child {
            height: 420px !important;
          }
          .cv-nav-links { display: none !important; }
          .cv-hamburger { display: inline-flex !important; }
          .cv-nav-cta { display: none !important; }
          .cv-nav-signin { display: none !important; }
          .cv-mobile-menu { display: flex !important; }
        }
        @media (max-width: 640px) {
          .cv-hero-inner { padding: 48px 5% 56px !important; }
          .cv-hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .cv-hero-grid > div:last-child { height: 320px !important; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <Navigation />
      <SniperWidget />
      <HeroSection />
    </>
  );
}