"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Zap, Menu, X, Radio, ScanLine, DollarSign, BarChart3,
  ShoppingCart, Upload, Search, ArrowLeftRight, Users,
  Store, ShieldCheck, Database, Eye, Sparkles, Wrench,
  Crosshair, ChevronDown, Globe, TrendingUp, Award
} from "lucide-react";

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
  { name: "VIDEO SNIPER",  Icon: Radio,          accent: "#F59E0B", screenshot: "/carousel/CARD APP INSTANT SNIPER PRO UPDATE copy.png",      desc: "Snipe graded cards live in under 5 seconds" },
  { name: "BULK SCANNER",  Icon: ScanLine,       accent: "#3B82F6", screenshot: "/carousel/CARD APP BULK CARD SCANNER UPLOAD UPDATE copy.png", desc: "Scan hundreds of cards at once with 4AI Vision" },
  { name: "VALUE TOOL",    Icon: DollarSign,     accent: "#10B981", screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png",              desc: "Real market values across all 8 grade tiers" },
  { name: "PORTFOLIO",     Icon: BarChart3,      accent: "#8B5CF6", screenshot: "/carousel/CARD APP Portfolio Tracker copy2.png",             desc: "Six dashboards tracking every card you own" },
  { name: "EBAY LISTER",   Icon: ShoppingCart,   accent: "#EC4899", screenshot: "/carousel/CARD APP EBAY BULK LISTER copy.png",               desc: "14 fields auto-filled in 8 seconds flat" },
  { name: "CSV BULK",      Icon: Upload,         accent: "#F97316", screenshot: "/carousel/CARD APP CSV Bulk Upload UPDATE 2 copy.png",       desc: "Import entire collections from any platform" },
  { name: "DEAL FINDER",   Icon: Search,         accent: "#14B8A6", screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png",              desc: "Catch deals across every marketplace in real time" },
  { name: "FLIP FINDER",   Icon: ArrowLeftRight, accent: "#DC2626", screenshot: "/carousel/CARD APP FLIP FINDER copy3 up.png",                desc: "See exact profit margins on every card" },
  { name: "AFFILIATE",     Icon: Users,          accent: "#4F46E5", screenshot: "/carousel/CARD APP AFFILIATE PROGRAM copy2.png",             desc: "Earn up to 30% recurring on every referral" },
  { name: "WHITE LABEL",   Icon: Store,          accent: "#64748B", screenshot: "/carousel/CARD APP WHITE LABEL SAAS copy.png",               desc: "Full platform under your brand and domain" },
  { name: "SLAB IQ",       Icon: ShieldCheck,    accent: "#B45309", screenshot: "/carousel/CARD APP SLAB IQ copy2.png",                      desc: "Live pop tracking and AI-predicted price moves" },
  { name: "INVENTORY",     Icon: Database,       accent: "#16A34A", screenshot: "/carousel/CARD APP Inventory Manager copy2.png",             desc: "One home for every card you own, valued live" },
  { name: "LIVE MARKET",   Icon: Eye,            accent: "#EA580C", screenshot: "/carousel/CARD APP LIVE MARKETPLACE copy2.png",              desc: "Real-time feed across every card platform" },
];

const STATS = [
  { value: "14M+",   label: "Cards Indexed",    color: "#10B981" },
  { value: "13",     label: "Power Tools",      color: "#F59E0B" },
  { value: "50K+",   label: "Collectors",       color: "#8B5CF6" },
  { value: "<5s",    label: "Live Card ID",     color: "#3B82F6" },
];

const PORTFOLIO_GRAPHS = [
  { title: "PORTFOLIO VALUE",     sub: "All-time growth",   color: "#10B981" },
  { title: "PRICE MOVERS",        sub: "7-day changes",     color: "#F59E0B" },
  { title: "GRADING ROI",         sub: "Submit vs raw",     color: "#8B5CF6" },
  { title: "DEAD STOCK",          sub: "Days without sale", color: "#EF4444" },
  { title: "FLIP MARGINS",        sub: "Buy-low spreads",   color: "#3B82F6" },
  { title: "MARKET HEAT",         sub: "Trending players",  color: "#EC4899" },
];

const FEATURES_GRID = [
  { Icon: Database,  accent: "#10B981", title: "16 MILLION CARDS",     desc: "The deepest card database on the internet." },
  { Icon: Eye,       accent: "#3B82F6", title: "4AI VISION",           desc: "Reads parallels, autos, numbered — every time." },
  { Icon: Sparkles,  accent: "#8B5CF6", title: "2+ YRS TRAINING",      desc: "Knows variations other apps completely miss." },
  { Icon: Wrench,    accent: "#F59E0B", title: "TOOLS THAT PAY",       desc: "Built to find profit, not just look at cards." },
  { Icon: Crosshair, accent: "#EF4444", title: "VIDEO SNIPER",         desc: "Live stream values in under 5 seconds." },
  { Icon: Globe,     accent: "#14B8A6", title: "WORLDWIDE",            desc: "All platforms. Every market. One app." },
];

// ─── Magnetic CTA ─────────────────────────────────────────────────────────────
function MagneticBtn({ children, style, href = "#" }: { children: React.ReactNode; style?: React.CSSProperties; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  return (
    <motion.a ref={ref} href={href} style={{ x: sx, y: sy, ...style, textDecoration: "none" }}
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
      {/* Ticker */}
      <div style={{ height: 36, background: "#0A0A0B", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 24px" }}>
        <motion.div
          style={{ display: "flex", gap: 40, flexShrink: 0 }}
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {tickerLoop.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", whiteSpace: "nowrap", color: "rgba(255,255,255,0.7)" }}>
              {item.isLive ? (
                <>
                  <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px rgba(16,185,129,0.9)" }} />
                  <span style={{ color: "#10B981", fontWeight: 700 }}>LIVE</span>
                </>
              ) : (
                <>
                  <span>{item.label}</span>
                  {item.value && <span style={{ color: item.up ? "#10B981" : "#EF4444", fontWeight: 700 }}>{item.value}</span>}
                </>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Nav row */}
      <motion.nav
        style={{
          height: 72, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 40px",
          background: scrolled ? "rgba(255,255,255,0.97)" : "white",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          transition: "background 0.3s",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <motion.div whileHover={{ scale: 1.06, rotate: -4 }} transition={SPRING}
            style={{ width: 52, height: 52, borderRadius: 13, background: "linear-gradient(145deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 24, letterSpacing: "0.04em", border: "2.5px solid white", boxShadow: "0 8px 24px rgba(79,70,229,0.35), inset 0 1px 0 rgba(255,255,255,0.5)" }}>
            CV
          </motion.div>
          <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 26, letterSpacing: "0.03em", color: "#0A0A0B", lineHeight: 1 }}>
            CARDVALUES<span style={{ fontSize: 10, verticalAlign: "top", color: "#9CA3AF", marginLeft: 3 }}>™</span>
          </span>
        </div>

        {/* Center links */}
        <div className="cv-nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <motion.a key={label} href={href} whileHover={{ background: "rgba(10,10,11,0.05)" }} transition={{ duration: 0.15 }}
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 18, letterSpacing: "0.08em", color: "#0A0A0B", padding: "10px 16px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
              {label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#signin" className="cv-nav-signin" style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 13, color: "#6B7280", fontWeight: 500, textDecoration: "none", padding: "8px 12px" }}>Sign in</a>
          <MagneticBtn className="cv-nav-cta" style={{ background: "#0A0A0B", color: "white", border: "1.5px solid #10B981", padding: "11px 22px", borderRadius: 100, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 16, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 8, lineHeight: 1, flexShrink: 0 }}>
            <Zap size={14} strokeWidth={2.5} color="#10B981" />
            TRY FREE
            <span style={{ fontSize: 13 }}>→</span>
          </MagneticBtn>
        </div>

        {/* Hamburger */}
        <button className="cv-hamburger" onClick={() => setMobileOpen(v => !v)}
          style={{ display: "none", width: 42, height: 42, borderRadius: 10, background: "transparent", border: "1.5px solid #E5E7EB", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "#0A0A0B", padding: 0 }}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Amber rail */}
      <motion.div style={{ height: 4, background: "#F59E0B" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ background: "white", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: 2 }} className="cv-mobile-menu">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "14px 12px", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 22, letterSpacing: "0.06em", color: "#0A0A0B", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── PSA Grading Animation ─────────────────────────────────────────────────────
function PSAGradingAnimation() {
  const [phase, setPhase] = useState<"raw" | "scanning" | "graded" | "slabbed">("raw");

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1800));
      setPhase("scanning");
      await new Promise(r => setTimeout(r, 2200));
      setPhase("graded");
      await new Promise(r => setTimeout(r, 1800));
      setPhase("slabbed");
      await new Promise(r => setTimeout(r, 3000));
      setPhase("raw");
    };
    sequence();
    const id = setInterval(sequence, 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", width: 220, height: 300, flexShrink: 0, perspective: 800 }}>
      {/* Raw card */}
      <AnimatePresence>
        {phase === "raw" && (
          <motion.div key="raw"
            initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #1e293b, #0f172a)", borderRadius: 16, border: "2px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ width: 80, height: 110, borderRadius: 8, background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #6D28D9 100%)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 28, color: "white", letterSpacing: 2 }}>RAW</span>
            </div>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>UNGRADED</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanning phase */}
      <AnimatePresence>
        {phase === "scanning" && (
          <motion.div key="scanning"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0f172a, #1e293b)", borderRadius: 16, border: "2px solid rgba(16,185,129,0.5)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(16,185,129,0.15)" }}>
            {/* Scan line */}
            <motion.div animate={{ top: ["10%", "90%", "10%"] }} transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
              style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #10B981, transparent)", boxShadow: "0 0 12px rgba(16,185,129,0.8)", zIndex: 3 }} />
            <div style={{ position: "absolute", inset: 12, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 28, color: "white" }}>RAW</span>
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#10B981", letterSpacing: "0.2em" }}>SCANNING…</motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graded card */}
      <AnimatePresence>
        {phase === "graded" && (
          <motion.div key="graded"
            initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0f172a, #1e293b)", borderRadius: 16, border: "2.5px solid #F59E0B", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.2)" }}>
            <div style={{ position: "absolute", top: 8, right: 8, background: "#F59E0B", borderRadius: 6, padding: "4px 10px", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 13, color: "#0A0A0B", letterSpacing: "0.1em" }}>PSA 10</div>
            <div style={{ position: "absolute", inset: "12px 12px 50px", borderRadius: 8, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 28, color: "white" }}>PSA 10</span>
            </div>
            <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 22, color: "#10B981", letterSpacing: "0.06em" }}>$430 VALUE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slabbed */}
      <AnimatePresence>
        {phase === "slabbed" && (
          <motion.div key="slabbed"
            initial={{ opacity: 0, scale: 0.85, rotateX: 15 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #1e293b, #0f172a)", borderRadius: 16, border: "3px solid rgba(255,255,255,0.2)", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
            {/* Slab top bar */}
            <div style={{ background: "#0A0A0B", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 14, color: "#F59E0B", letterSpacing: "0.12em" }}>PSA</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>GEM MT 10</span>
            </div>
            <div style={{ margin: "10px", borderRadius: 8, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", height: 180, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 32, color: "white" }}>PSA 10</span>
            </div>
            {/* Slab bottom bar */}
            <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>CERT #</div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.8)" }}>12847391</div>
              </div>
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ background: "#10B981", borderRadius: 8, padding: "6px 14px", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 16, color: "white", letterSpacing: "0.08em" }}>
                $430
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 3D Turntable ─────────────────────────────────────────────────────────────
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
        if (stageRef.current) stageRef.current.style.transform = `rotateY(${rotRef.current}deg)`;
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
      style={{ position: "relative", width: "190%", height: 660, marginLeft: "-45%", perspective: 1200, perspectiveOrigin: "50% 46%", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
      <div ref={stageRef} style={{ position: "relative", width: 260, height: 380, transformStyle: "preserve-3d", willChange: "transform", background: "transparent" }}>
        {TOOLS.map((tool, i) => (
          <div key={tool.name} style={{ position: "absolute", top: 0, left: 0, width: 260, height: 380, backfaceVisibility: "hidden", transform: `rotateY(${(360 / TOOLS.length) * i}deg) translateZ(480px)`, background: "transparent" }}>
            <img src={tool.screenshot} alt={tool.name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block", filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.15))", background: "transparent" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Floating Sniper Widget ────────────────────────────────────────────────────
function SniperWidget() {
  const [visible, setVisible] = useState(false);
  const [sniperMsgIndex, setSniperMsgIndex] = useState(0);
  const MSGS = ["5 SECOND VALUE", "SNIPE GRADED CARDS", "NO MORE OVERBIDDING", "MAKE FAST MONEY", "THE CHEAT CODE", "SNIPE ANY PLATFORM"];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSniperMsgIndex(i => (i + 1) % MSGS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#sniper"
          initial={{ opacity: 0, x: 80, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0 }}
          style={{
            position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
            zIndex: 200, textDecoration: "none",
            width: 118, height: 118, borderRadius: 20,
            background: "linear-gradient(135deg, #18181B 0%, #27272A 55%, #18181B 100%)",
            border: "3px solid white",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "12px 8px 8px",
            textAlign: "center", color: "white", overflow: "hidden",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.08 }}
        >
          {/* Pulse glow */}
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(245,158,11,0.6)", "0 0 0 16px rgba(245,158,11,0)", "0 0 0 0 rgba(245,158,11,0)"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, borderRadius: 17 }}
          />
          {/* Shine sweep */}
          <motion.div
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
            style={{ position: "absolute", top: 0, bottom: 0, width: "60%", background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.18), transparent)", pointerEvents: "none" }}
          />
          {/* NOW FEATURING badge */}
          <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 7px", background: "linear-gradient(135deg, #10B981, #059669)", borderRadius: 100, fontFamily: "'Geist', sans-serif", fontSize: 6.5, fontWeight: 700, letterSpacing: "0.14em", color: "white", whiteSpace: "nowrap", border: "1.5px solid white", zIndex: 3 }}>
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "white", display: "inline-block" }} />
            NOW FEATURING
          </span>
          {/* Title */}
          <span style={{ position: "relative", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 18, lineHeight: 1, letterSpacing: "0.03em", color: "#F59E0B", textShadow: "0 1px 3px rgba(0,0,0,0.7)", zIndex: 2, marginTop: 4 }}>
            VIDEO STREAM<br />SNIPING TOOL
          </span>
          {/* Rotating message */}
          <AnimatePresence mode="wait">
            <motion.span key={sniperMsgIndex}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 9.5, letterSpacing: "0.05em", color: "#10B981", textShadow: "0 0 8px rgba(16,185,129,0.8)", whiteSpace: "nowrap", zIndex: 3 }}>
              {MSGS[sniperMsgIndex]}
            </motion.span>
          </AnimatePresence>
          {/* Arrow */}
          <span style={{ position: "absolute", bottom: 20, right: 8, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>↓</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ─── SECTION 1: Hero ──────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const count14M = useCountUp(14, 1600, statsVisible);
  const count50K = useCountUp(50, 1400, statsVisible);
  const count13 = useCountUp(13, 1000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const flyUp = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", background: "white", overflow: "hidden" }}>
      {/* Very subtle ambient — no coloured blobs, just clean white */}
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%", background: "linear-gradient(135deg, rgba(245,158,11,0.028) 0%, rgba(16,185,129,0.022) 100%)", pointerEvents: "none" }} />
      {/* Faint dot grid on right */}
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%", backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", opacity: 0.6 }} />

      <div className="cv-hero-inner" style={{ width: "100%", padding: "64px 6% 72px", position: "relative", zIndex: 2 }}>
        <div className="cv-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.35fr)", gap: "clamp(24px,3.5vw,60px)", alignItems: "center", minHeight: "86vh" }}>

          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ paddingTop: 16 }}>

            {/* Eyebrow pill */}
            <motion.div variants={flyUp} style={{ marginBottom: 22 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 100, padding: "7px 18px", fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "#059669" }}>
                <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 6px rgba(16,185,129,0.7)" }} />
                THE #1 CARD COLLECTING PLATFORM
              </span>
            </motion.div>

            {/* H1 — new copy, tighter size so it doesn't overflow */}
            <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3rem,5.8vw,5.6rem)", lineHeight: 0.9, letterSpacing: "-0.01em", color: "#0A0A0B", margin: "0 0 20px" }}>
              {[
                { text: "SCAN. VALUE.", outlined: false },
                { text: "SELL. PROFIT.", outlined: false },
                { text: "THE ONLY APP", outlined: false },
                { text: "YOUR CARD", outlined: false },
                { text: "BUSINESS NEEDS.", outlined: true },
              ].map(({ text, outlined }, i) => (
                <motion.div key={i} variants={flyUp} style={{ overflow: "hidden" }}>
                  <span style={outlined ? { color: "#10B981", WebkitTextStroke: "1.5px #0A0A0B", paintOrder: "stroke fill" } : {}}>
                    {text}
                  </span>
                </motion.div>
              ))}
            </h1>

            {/* Sub-headline */}
            <motion.p variants={flyUp} style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: "clamp(14px,1.3vw,17px)", lineHeight: 1.65, color: "#6B7280", margin: "0 0 28px", maxWidth: 420 }}>
              The only card app with AI trained to get values right — every parallel, auto, and numbered card. Run your hobby or business from one platform.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={flyUp} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
              <MagneticBtn style={{ background: "#0A0A0B", color: "white", border: "1.5px solid #10B981", padding: "14px 30px", borderRadius: 100, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 20, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 10, lineHeight: 1 }}>
                <Zap size={15} strokeWidth={2.5} color="#10B981" />
                TRY FREE →
              </MagneticBtn>
              <a href="#demo" style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#6B7280", display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                Watch Demo
                <ChevronDown size={15} />
              </a>
            </motion.div>

            {/* Animated stats */}
            <motion.div ref={statsRef} variants={flyUp}
              className="cv-hero-stats"
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 24 }}>
              {[
                { display: statsVisible ? `${count14M}M+` : "0M+", label: "Cards Indexed", color: "#10B981" },
                { display: statsVisible ? `${count13}` : "0",    label: "Power Tools",   color: "#F59E0B" },
                { display: statsVisible ? `${count50K}K+` : "0K+",label: "Collectors",    color: "#8B5CF6" },
                { display: "<5s",                                    label: "Live Card ID",  color: "#3B82F6" },
              ].map(({ display, label, color }, i) => (
                <div key={label} style={{ paddingRight: 16, borderRight: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none", paddingLeft: i > 0 ? 16 : 0 }}>
                  <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(1.6rem,2.6vw,2.4rem)", lineHeight: 1, color }}>{display}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: "#9CA3AF", letterSpacing: "0.1em", marginTop: 5, textTransform: "uppercase", lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={flyUp} style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
              {["No credit card required", "Free plan available", "Cancel anytime"].map(t => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "'Geist', Inter, sans-serif", fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>
                  <span style={{ color: "#10B981", fontSize: 12, fontWeight: 900 }}>✓</span>
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Turntable, fully transparent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            style={{ position: "relative", width: "100%", height: 660, overflow: "visible", background: "transparent" }}>
            <Turntable />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: 0.35, pointerEvents: "none" }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 8.5, letterSpacing: "0.22em", color: "#0A0A0B" }}>SCROLL</span>
        <ChevronDown size={14} color="#0A0A0B" />
      </motion.div>
    </section>
  );
}

// ─── SECTION 2: Sniper / PSA Grading ─────────────────────────────────────────
function SniperSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} style={{ position: "relative", background: "#0A0A0B", overflow: "hidden", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      {/* Parallax BG — full animation visible as you scroll (on.energy effect) */}
      <motion.div style={{ scale: bgScale, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 65% 50%, rgba(245,158,11,0.1) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </motion.div>

      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "100px 7%" }}>
        <div className="cv-sniper-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)", alignItems: "center" }}>

          {/* LEFT — PSA 3D Animation */}
          <motion.div
            initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <PSAGradingAnimation />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", marginBottom: 8 }}>LIVE GRADING INTELLIGENCE</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {["PSA", "BGS", "SGC"].map(g => (
                  <span key={g} style={{ padding: "4px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>{g}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#F59E0B", letterSpacing: "0.2em", marginBottom: 16 }}>— VIDEO STREAM SNIPING TOOL</div>
            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3rem,5vw,5rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "white", margin: "0 0 24px" }}>
              SNIPE GRADED CARDS
              <br />
              <span style={{ color: "#F59E0B" }}>LIVE.</span> IN 5 SECONDS.
            </h2>
            <p style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", marginBottom: 36, maxWidth: 460 }}>
              Our AI identifies any graded card the moment it appears on screen — Whatnot, eBay Live, Fanatics, TikTok. See the PSA 10 value before anyone else bids.
            </p>
            {[
              "Reads parallels, autos, and numbered variations",
              "Works on every live auction platform",
              "Under 5 seconds from card shown to value displayed",
              "16 million card database updated weekly",
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "white", fontWeight: 900 }}>✓</span>
                <span style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{b}</span>
              </motion.div>
            ))}
            <motion.div style={{ marginTop: 36 }}>
              <MagneticBtn style={{ background: "#F59E0B", color: "#0A0A0B", padding: "14px 32px", borderRadius: 100, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 20, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 10, lineHeight: 1 }}>
                <Crosshair size={16} strokeWidth={2.5} />
                TRY THE SNIPER →
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 3: Features Grid ──────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section style={{ background: "#FAFAFA", padding: "100px 7%" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: 56, maxWidth: 560 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#10B981", letterSpacing: "0.2em", marginBottom: 14 }}>— WHY WE'RE DIFFERENT</div>
        <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2.8rem,5vw,4.8rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "#0A0A0B", margin: 0 }}>
          THE INTELLIGENCE BEHIND
          <br />
          <span style={{ color: "#10B981", WebkitTextStroke: "1.5px #0A0A0B", paintOrder: "stroke fill" }}>EVERY TOOL.</span>
        </h2>
      </motion.div>

      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="cv-features-grid">
        {FEATURES_GRID.map(({ Icon, accent, title, desc }) => (
          <motion.div key={title}
            variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}
            whileHover={{ y: -6, scale: 1.02 }} transition={SPRING}
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 20, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.05)", cursor: "pointer", position: "relative", overflow: "hidden" }}>
            <span aria-hidden style={{ position: "absolute", top: -50, right: -50, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${accent}18, ${accent}30)`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${accent}22` }}>
              <Icon size={24} strokeWidth={2} />
            </div>
            <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 22, lineHeight: 1.1, letterSpacing: "0.03em", color: "#0A0A0B" }}>{title}</div>
            <div style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 14, lineHeight: 1.55, color: "#6B7280" }}>{desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── SECTION 4: Tools Horizontal Scroll (maze.co scroll-into-slideshow) ────────
function ToolsScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Convert vertical scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", `-${(TOOLS.length - 3) * 340}px`]);

  return (
    <section ref={ref} style={{ background: "#0A0A0B", position: "relative" }}>
      {/* Sticky container */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ padding: "0 7% 32px", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#F59E0B", letterSpacing: "0.2em", marginBottom: 12 }}>— 13 POWER TOOLS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2.8rem,5vw,4.8rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "white", margin: 0 }}>
            ONE PLATFORM.
            <br /><span style={{ color: "transparent", WebkitTextStroke: "2px white" }}>EVERY EDGE.</span>
          </h2>
        </motion.div>

        {/* Horizontal scroll track */}
        <div style={{ overflow: "hidden", paddingLeft: "7%" }}>
          <motion.div style={{ x, display: "flex", gap: 20, willChange: "transform" }}>
            {TOOLS.map((tool, i) => (
              <motion.div key={tool.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.04, 0.4) }}
                whileHover={{ scale: 1.03 }}
                transition={{ ...SPRING }}
                style={{ flexShrink: 0, width: 320, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16, cursor: "pointer", position: "relative", overflow: "hidden", backdropFilter: "blur(8px)" }}>
                {/* Accent glow */}
                <div style={{ position: "absolute", top: -60, right: -60, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${tool.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />
                {/* Screenshot */}
                <div style={{ width: "100%", height: 200, borderRadius: 12, background: "rgba(255,255,255,0.04)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <img src={tool.screenshot} alt={tool.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                </div>
                {/* Tool info */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: `linear-gradient(135deg, ${tool.accent}22, ${tool.accent}38)`, color: tool.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <tool.Icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 20, letterSpacing: "0.04em", color: "white", lineHeight: 1.1 }}>{tool.name}</div>
                    <div style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginTop: 4 }}>{tool.desc}</div>
                  </div>
                </div>
                {/* Number badge */}
                <span style={{ position: "absolute", top: 16, right: 16, fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")} / {TOOLS.length}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div style={{ padding: "28px 7% 0", flexShrink: 0 }}>
          <div style={{ width: 160, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 1, overflow: "hidden" }}>
            <motion.div style={{ height: "100%", background: "#F59E0B", borderRadius: 1, scaleX: scrollYProgress, originX: 0 }} />
          </div>
        </div>
      </div>

      {/* Scroll space — drives the sticky animation */}
      <div style={{ height: `${TOOLS.length * 160}px` }} />
    </section>
  );
}

// ─── SECTION 5: Portfolio Graphs Horizontal Scroll ────────────────────────────
function PortfolioScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.05, 0.9], ["0%", `-${(PORTFOLIO_GRAPHS.length - 2) * 460}px`]);

  return (
    <section ref={ref} style={{ background: "#FAFAFA", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ padding: "0 7% 40px", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#8B5CF6", letterSpacing: "0.2em", marginBottom: 12 }}>— PORTFOLIO ANALYTICS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2.8rem,5vw,4.8rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "#0A0A0B", margin: 0 }}>
            SIX DASHBOARDS.
            <br /><span style={{ color: "#8B5CF6", WebkitTextStroke: "1.5px #0A0A0B", paintOrder: "stroke fill" }}>EVERY METRIC.</span>
          </h2>
        </motion.div>

        <div style={{ overflow: "hidden", paddingLeft: "7%" }}>
          <motion.div style={{ x, display: "flex", gap: 24, willChange: "transform" }}>
            {PORTFOLIO_GRAPHS.map(({ title, sub, color }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, rotateX: 12, y: 40 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.06 }}
                style={{ flexShrink: 0, width: 420, height: 280, background: "white", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 24, padding: 28, display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)", position: "relative", overflow: "hidden" }}>
                {/* Accent line */}
                <div style={{ position: "absolute", top: 0, left: 28, right: 28, height: 3, background: color, borderRadius: "0 0 4px 4px" }} />
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#9CA3AF", letterSpacing: "0.14em", marginBottom: 8 }}>{sub}</div>
                <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 28, color: "#0A0A0B", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 20 }}>{title}</div>
                {/* Mock chart bars */}
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6 }}>
                  {[0.4, 0.6, 0.45, 0.75, 0.55, 0.85, 0.65, 0.9, 0.7, 0.95, 0.8, 1.0].map((h, j) => (
                    <motion.div key={j}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.3 + j * 0.04 }}
                      style={{ flex: 1, background: `linear-gradient(to top, ${color}, ${color}55)`, borderRadius: "3px 3px 0 0", minHeight: 4 }} />
                  ))}
                </div>
                {/* Bottom stat */}
                <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#9CA3AF", letterSpacing: "0.1em" }}>LIVE TRACKING</span>
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 18, color, letterSpacing: "0.06em" }}>+24.3%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div style={{ padding: "28px 7% 0", flexShrink: 0 }}>
          <div style={{ width: 120, height: 2, background: "rgba(0,0,0,0.08)", borderRadius: 1, overflow: "hidden" }}>
            <motion.div style={{ height: "100%", background: "#8B5CF6", borderRadius: 1, scaleX: scrollYProgress, originX: 0 }} />
          </div>
        </div>
      </div>
      <div style={{ height: `${PORTFOLIO_GRAPHS.length * 200}px` }} />
    </section>
  );
}

// ─── SECTION 6: Globe / Worldwide (melboucierayane movement effect) ────────────
function GlobalSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  const COUNTRIES = ["USA", "UK", "CA", "AU", "DE", "JP", "FR", "BR", "MX", "KR", "NL", "SG"];

  return (
    <section ref={ref} style={{ background: "#0A0A0B", padding: "120px 7%", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", minHeight: "80vh" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 50%, rgba(16,185,129,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />

      <div className="cv-global-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)", alignItems: "center", width: "100%", position: "relative", zIndex: 2 }}>

        {/* LEFT — Text */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#10B981", letterSpacing: "0.2em", marginBottom: 16 }}>— WORLDWIDE PLATFORM</div>
          <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3rem,5vw,5rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "white", margin: "0 0 24px" }}>
            CARD COLLECTORS
            <br /><span style={{ color: "#10B981" }}>ACROSS THE GLOBE</span>
            <br />USE CARDVALUES.
          </h2>
          <p style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 36, maxWidth: 440 }}>
            From Whatnot to eBay Live to Fanatics — our tools work on every platform, in every market, for every collector worldwide.
          </p>
          {/* Country pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {COUNTRIES.map((c, i) => (
              <motion.span key={c}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.05 }}
                style={{ padding: "6px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>
                {c}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Animated Globe */}
        <motion.div style={{ rotate, scale, display: "flex", alignItems: "center", justifyContent: "center" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}>
          <div style={{ position: "relative", width: 380, height: 380 }}>
            {/* Outer glow ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1px dashed rgba(16,185,129,0.2)" }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              style={{ position: "absolute", inset: 10, borderRadius: "50%", border: "1px dashed rgba(16,185,129,0.12)" }} />

            {/* Globe body */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.18) 0%, rgba(10,10,11,0.9) 60%)", border: "1.5px solid rgba(16,185,129,0.2)", overflow: "hidden", boxShadow: "0 0 80px rgba(16,185,129,0.12), inset 0 0 60px rgba(16,185,129,0.06)" }}>
              {/* Latitude lines */}
              {[20, 35, 50, 65].map(y => (
                <div key={y} style={{ position: "absolute", top: `${y}%`, left: 0, right: 0, height: 1, background: "rgba(16,185,129,0.08)" }} />
              ))}
              {/* Longitude arcs (simplified) */}
              {[15, 30, 45, 60, 75].map((x, i) => (
                <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${x}%`, width: 1, background: "rgba(16,185,129,0.06)" }} />
              ))}
            </motion.div>

            {/* Orbiting dots — active users */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 12 + i * 2.5, ease: "linear", repeat: Infinity }}
                style={{ position: "absolute", inset: 0, borderRadius: "50%" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%", transform: `rotate(${deg}deg)`, transformOrigin: "0 0" }}>
                  <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
                    style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.8)" }} />
                </div>
              </motion.div>
            ))}

            {/* Center icon */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "1.5px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={28} color="#10B981" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 7: Flip-up Cards (brands-essential flip effect) ──────────────────
function FlipCardsSection() {
  const CARDS = [
    { Icon: ScanLine, accent: "#3B82F6", title: "SCAN IN BULK", body: "Point your camera at a stack of cards. Our 4AI Vision identifies every card in seconds — no manual entry, ever." },
    { Icon: TrendingUp, accent: "#10B981", title: "TRACK VALUE LIVE", body: "Every card in your collection is valued against real market sales, updated weekly. Know what everything is worth right now." },
    { Icon: Award, accent: "#F59E0B", title: "KNOW WHAT TO GRADE", body: "See exactly which of your raw cards have PSA 10 potential and what the value jump would be before paying submission fees." },
    { Icon: Search, accent: "#EC4899", title: "FIND DEALS INSTANTLY", body: "We scan every live auction and listing to surface cards selling below true market value. You get the alert before anyone else." },
  ];

  return (
    <section style={{ background: "white", padding: "100px 7%" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#EC4899", letterSpacing: "0.2em", marginBottom: 14 }}>— HOW IT WORKS</div>
        <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(2.8rem,5vw,4.8rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "#0A0A0B", margin: 0 }}>
          BUILT FOR PROFIT.
          <br /><span style={{ color: "transparent", WebkitTextStroke: "2px #0A0A0B" }}>NOT JUST COLLECTING.</span>
        </h2>
      </motion.div>

      <div className="cv-flip-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {CARDS.map(({ Icon, accent, title, body }, i) => (
          <motion.div key={title}
            initial={{ opacity: 0, y: 60, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            transition={{ ...SPRING }}
            style={{ background: "white", border: "1.5px solid rgba(0,0,0,0.07)", borderRadius: 24, padding: "32px 24px", display: "flex", flexDirection: "column", gap: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.05)", cursor: "pointer", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)` }} />
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${accent}18, ${accent}30)`, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={26} strokeWidth={2} />
            </div>
            <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 24, lineHeight: 1.05, letterSpacing: "0.03em", color: "#0A0A0B" }}>{title}</div>
            <div style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 14, lineHeight: 1.65, color: "#6B7280", flex: 1 }}>{body}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 15, letterSpacing: "0.1em", color: accent }}>
              LEARN MORE →
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SECTION 8: Big CTA Footer (on.energy large text reveal) ──────────────────
function CTAFooterSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const FOOTER_LINKS = [
    { label: "Features", href: "#features" }, { label: "Sniper", href: "#sniper" },
    { label: "Scanner", href: "#scanner" }, { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" }, { label: "Affiliate", href: "#affiliate" },
  ];

  return (
    <>
      {/* CTA section */}
      <section ref={ref} style={{ background: "#0A0A0B", padding: "clamp(80px,10vw,140px) 7%", position: "relative", overflow: "hidden", textAlign: "center" }}>
        {/* Radial glow */}
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 600, background: "radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto" }}>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ width: 28, height: 2, background: "#10B981", display: "inline-block", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#10B981" }}>GET STARTED FREE</span>
            <span style={{ width: 28, height: 2, background: "#10B981", display: "inline-block", borderRadius: 2 }} />
          </motion.div>

          {/* BIG TEXT — on.energy footer reveal style */}
          <motion.div style={{ y, opacity }}>
            {["STOP GUESSING.", "START MAKING MONEY."].map((line, i) => (
              <div key={line} style={{ overflow: "hidden", lineHeight: 0.85, marginBottom: i === 0 ? 8 : 0 }}>
                <motion.div
                  initial={{ y: 100 }} whileInView={{ y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}>
                  <span style={{
                    display: "block",
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "clamp(3.8rem,10vw,9.5rem)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.025em",
                    color: i === 1 ? "transparent" : "white",
                    WebkitTextStroke: i === 1 ? "2px white" : undefined,
                    paintOrder: i === 1 ? "stroke fill" : undefined,
                  }}>
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(255,255,255,0.4)", margin: "32px 0 44px", lineHeight: 1.7, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            Join 50,000+ collectors and flippers who use CardValues to find deals, track values, and dominate the card market.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <MagneticBtn style={{ background: "#10B981", color: "white", padding: "16px 40px", borderRadius: 100, fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(18px,2vw,22px)", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 10, lineHeight: 1, boxShadow: "0 8px 32px rgba(16,185,129,0.35)" }}>
              <Zap size={18} strokeWidth={2.5} />
              TRY FREE NOW →
            </MagneticBtn>
            <MagneticBtn style={{ background: "transparent", color: "rgba(255,255,255,0.6)", padding: "16px 40px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,0.14)", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(18px,2vw,22px)", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 10, lineHeight: 1 }}>
              EXPLORE ALL TOOLS →
            </MagneticBtn>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
            {["No credit card required", "Free plan available", "Cancel anytime"].map(t => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)" }}>
                <span style={{ color: "#10B981", fontSize: 14 }}>✓</span>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0A0A0B", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 7%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(145deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 18, color: "white" }}>CV</div>
            <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 20, letterSpacing: "0.03em", color: "rgba(255,255,255,0.5)" }}>CARDVALUES™</span>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {FOOTER_LINKS.map(l => (
              <a key={l.label} href={l.href}
                style={{ fontFamily: "'Geist', Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.3)", textDecoration: "none", padding: "6px 12px", borderRadius: 6, transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}>
                {l.label}
              </a>
            ))}
          </div>
          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em" }}>
            © 2024 CARDVALUES™ · ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>
    </>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function PremiumHero() {
  return (
    <>
      <style jsx global>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        /* Reset & base */
        *, *::before, *::after { box-sizing: border-box; }

        /* Custom cursor */
        #cv-cursor { pointer-events: none; position: fixed; top: 0; left: 0; z-index: 9999; }
        #cv-cursor-dot { width: 6px; height: 6px; background: #10B981; border-radius: 50%; position: absolute; top: -3px; left: -3px; }
        #cv-cursor-ring { width: 40px; height: 40px; border: 1.5px solid rgba(16,185,129,0.5); border-radius: 50%; position: absolute; top: -20px; left: -20px; transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s; }

        /* Scroll reveal */
        [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }

        /* Mobile */
        @media (max-width: 1023px) {
          .cv-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; min-height: auto !important; }
          .cv-sniper-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cv-global-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cv-flip-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cv-features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cv-nav-links { display: none !important; }
          .cv-hamburger { display: inline-flex !important; }
          .cv-nav-cta { display: none !important; }
          .cv-nav-signin { display: none !important; }
          .cv-mobile-menu { display: flex !important; }
        }
        @media (max-width: 640px) {
          .cv-flip-grid { grid-template-columns: 1fr !important; }
          .cv-features-grid { grid-template-columns: 1fr !important; }
          .cv-hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <Navigation />
      <SniperWidget />
      <HeroSection />
      <SniperSection />
      <FeaturesSection />
      <ToolsScrollSection />
      <PortfolioScrollSection />
      <GlobalSection />
      <FlipCardsSection />
      <CTAFooterSection />
    </>
  );
}
