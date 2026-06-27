"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Palette ──────────────────────────────────────────────────────────────────
// #0A0A0B  — near-black base
// #F59E0B  — amber (sniper / accent)
// #10B981  — emerald (CTA / live)
// #FFFFFF  — white type
// #1A1A1C  — card surface

// ─── Tool screenshots ─────────────────────────────────────────────────────────
const TOOLS = [
  "/carousel/CARD APP INSTANT SNIPER PRO UPDATE copy.png",
  "/carousel/CARD APP BULK CARD SCANNER UPLOAD UPDATE copy.png",
  "/carousel/CARD APP Deal Finder ALT 2 copy.png",
  "/carousel/CARD APP Portfolio Tracker copy2.png",
  "/carousel/CARD APP EBAY BULK LISTER copy.png",
  "/carousel/CARD APP CSV Bulk Upload UPDATE 2 copy.png",
  "/carousel/CARD APP FLIP FINDER copy3 up.png",
  "/carousel/CARD APP AFFILIATE PROGRAM copy2.png",
  "/carousel/CARD APP WHITE LABEL SAAS copy.png",
  "/carousel/CARD APP SLAB IQ copy2.png",
  "/carousel/CARD APP Inventory Manager copy2.png",
  "/carousel/CARD APP LIVE MARKETPLACE copy2.png",
];

const TICKER = [
  { label: "LIVE", isLive: true },
  { label: "TOPPS CHROME 2024", value: "+12%", up: true },
  { label: "PRIZM SILVER", value: "-2%", up: false },
  { label: "PSA POP", value: "+318", up: true },
  { label: "14M CARDS INDEXED" },
  { label: "SLABS GRADED TODAY", value: "2,847", up: true },
  { label: "BGS AUTO", value: "+8.4%", up: true },
  { label: "LIVE AUCTIONS", value: "1,203", up: true },
];

const NAV = [
  { label: "FEATURES", href: "#features" },
  { label: "DEMO",     href: "#demo" },
  { label: "PRICING",  href: "#pricing" },
  { label: "CONTACT",  href: "#contact" },
];

const SNIPER_MSGS = [
  "5 SECOND VALUE", "SNIPE GRADED CARDS",
  "NO MORE OVERBIDDING", "MAKE FAST MONEY",
  "THE CHEAT CODE", "SNIPE ANY PLATFORM",
];

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagBtn({ children, style, href = "#", className = "" }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 20 });
  const sy = useSpring(y, { stiffness: 100, damping: 20 });
  return (
    <motion.a ref={ref} href={href} className={className}
      style={{ x: sx, y: sy, textDecoration: "none", cursor: "pointer", display: "inline-flex", ...style }}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
    >{children}</motion.a>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const tickerLoop = [...TICKER, ...TICKER, ...TICKER];

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
      {/* Ticker */}
      <div style={{ height: 34, background: "#0A0A0B", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <motion.div
          style={{ display: "flex", gap: 44, flexShrink: 0, paddingLeft: 24 }}
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          {tickerLoop.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.13em", whiteSpace: "nowrap", color: "rgba(255,255,255,0.65)" }}>
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

      {/* Nav bar — dark */}
      <nav style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: "#0A0A0B", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <motion.div whileHover={{ scale: 1.06, rotate: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(145deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 21, letterSpacing: "0.04em", border: "2px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 20px rgba(79,70,229,0.4)" }}>
            CV
          </motion.div>
          <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 24, letterSpacing: "0.04em", color: "white", lineHeight: 1 }}>
            CARDVALUES<span style={{ fontSize: 9, verticalAlign: "top", color: "rgba(255,255,255,0.35)", marginLeft: 3 }}>™</span>
          </span>
        </div>

        {/* Center links */}
        <div className="cv-nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV.map(({ label, href }) => (
            <motion.a key={label} href={href} whileHover={{ color: "#F59E0B" }} transition={{ duration: 0.15 }}
              style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 16, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", padding: "10px 16px", textDecoration: "none", whiteSpace: "nowrap" }}>
              {label}
            </motion.a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <a href="#signin" className="cv-nav-signin" style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500, textDecoration: "none" }}>Sign in</a>
          <MagBtn className="cv-nav-cta" style={{ background: "#10B981", color: "#0A0A0B", padding: "10px 22px", borderRadius: 100, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 16, letterSpacing: "0.08em", alignItems: "center", gap: 8, lineHeight: 1, fontWeight: 900 }}>
            <Zap size={14} strokeWidth={3} />TRY FREE →
          </MagBtn>
        </div>

        {/* Hamburger */}
        <button className="cv-hamburger" onClick={() => setOpen(v => !v)}
          style={{ display: "none", width: 40, height: 40, borderRadius: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "white", padding: 0, flexShrink: 0 }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Amber rail */}
      <motion.div style={{ height: 3, background: "linear-gradient(90deg, #F59E0B, #F97316, #F59E0B)" }}
        initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="cv-mobile-menu" style={{ background: "#0F0F10", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setOpen(false)}
                style={{ display: "block", padding: "14px 12px", fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 24, letterSpacing: "0.06em", color: "white", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Cinematic loader ─────────────────────────────────────────────────────────
function CinematicLoader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(barRef.current, { scaleX: 1, duration: 1.4, ease: "power2.inOut" })
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.6")
      .to(ref.current, { opacity: 0, duration: 0.6, ease: "power2.in", delay: 0.3 })
      .set(ref.current, { display: "none" });
  }, [onDone]);

  return (
    <div ref={ref} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0A0A0B",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
    }}>
      {/* Logo mark */}
      <div style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: "white", letterSpacing: "0.06em", lineHeight: 1 }}>
        CARD<span style={{ color: "#10B981" }}>VALUES</span>
      </div>
      {/* Progress bar */}
      <div style={{ width: "min(320px, 60vw)", height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden" }}>
        <div ref={barRef} style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #10B981, #F59E0B)", borderRadius: 1, transformOrigin: "left", transform: "scaleX(0)" }} />
      </div>
      {/* Status text */}
      <div ref={textRef} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", opacity: 0, transform: "translateY(8px)" }}>
        INITIALIZING PLATFORM
      </div>
    </div>
  );
}

// ─── 3D Turntable ─────────────────────────────────────────────────────────────
function Turntable() {
  const rotRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const velocityRef = useRef(5);

  useEffect(() => {
    let id: number; let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last; last = now;
      if (!pausedRef.current) {
        rotRef.current = (rotRef.current + (delta / 1000) * velocityRef.current) % 360;
        if (stageRef.current) stageRef.current.style.transform = `rotateY(${rotRef.current}deg)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{ position: "relative", width: "100%", height: "100%", perspective: 900, perspectiveOrigin: "50% 46%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div ref={stageRef} style={{ position: "relative", width: 240, height: 340, transformStyle: "preserve-3d", willChange: "transform" }}>
        {TOOLS.map((src, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, left: 0, width: 240, height: 340,
            backfaceVisibility: "hidden",
            transform: `rotateY(${(360 / TOOLS.length) * i}deg) translateZ(320px)`,
          }}>
            <img src={src} alt="" style={{
              width: "100%", height: "100%", objectFit: "contain",
              display: "block",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 1px rgba(255,255,255,0.06))",
            }} />
          </div>
        ))}
      </div>
      {/* Ground fog */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "70%", height: 80,
        background: "radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)",
        filter: "blur(20px)", pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── Sniper Widget ────────────────────────────────────────────────────────────
function SniperWidget() {
  const [visible, setVisible] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // Hide widget when scrolled more than 90vh past hero
      if (window.scrollY > window.innerHeight * 1.5) {
        setVisible(false);
      } else if (window.scrollY < window.innerHeight) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMsgIdx(i => (i + 1) % SNIPER_MSGS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a href="#sniper"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          style={{
            position: "fixed", right: 24, top: "50%", marginTop: "-64px",
            zIndex: 200, textDecoration: "none",
            width: 122, height: 122, borderRadius: 18,
            background: "linear-gradient(145deg, #1C1C1F, #27272A)",
            border: "2px solid rgba(245,158,11,0.4)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "14px 10px 10px", textAlign: "center",
            overflow: "hidden", cursor: "pointer",
          }}
        >
          {/* Amber pulse */}
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(245,158,11,0.5)", "0 0 0 16px rgba(245,158,11,0)", "0 0 0 0 rgba(245,158,11,0)"] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{ position: "absolute", inset: 0, borderRadius: 18 }}
          />
          {/* Shine */}
          <motion.div
            animate={{ x: ["-140%", "140%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
            style={{ position: "absolute", top: 0, bottom: 0, width: "50%", background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.12), transparent)", pointerEvents: "none" }}
          />
          {/* Badge */}
          <span style={{ position: "absolute", top: -7, left: "50%", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", background: "#10B981", borderRadius: 100, fontFamily: "var(--font-geist-sans), sans-serif", fontSize: 6.5, fontWeight: 800, letterSpacing: "0.16em", color: "white", whiteSpace: "nowrap", border: "1.5px solid rgba(255,255,255,0.3)", zIndex: 3 }}>
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "white", display: "inline-block" }} />
            NOW FEATURING
          </span>
          {/* Title */}
          <span style={{ position: "relative", zIndex: 2, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 18, lineHeight: 1.05, letterSpacing: "0.04em", color: "#F59E0B", marginTop: 6 }}>
            VIDEO STREAM<br />SNIPING TOOL
          </span>
          {/* Cycling message */}
          <AnimatePresence mode="wait">
            <motion.span key={msgIdx}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 9, letterSpacing: "0.07em", color: "#10B981", whiteSpace: "nowrap", zIndex: 3, textShadow: "0 0 10px rgba(16,185,129,0.8)" }}>
              {SNIPER_MSGS[msgIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "", color }: { target: number; suffix?: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        gsap.to({ val: 0 }, {
          val: target, duration: 1.8, ease: "power2.out",
          onUpdate: function() {
            if (ref.current) ref.current.textContent = Math.floor(this.targets()[0].val) + suffix;
          }
        });
      }
    }, { threshold: 0.5 });
    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div ref={elRef}>
      <span ref={ref} style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(2rem, 3.5vw, 3.2rem)", lineHeight: 1, color }}>
        0{suffix}
      </span>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const turntableRef = useRef<HTMLDivElement>(null);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Headline lines stagger up
      tl.from(".cv-headline-line", {
        y: 80, opacity: 0, duration: 0.9,
        stagger: 0.1, ease: "power3.out",
      })
      // Sub + CTA
      .from([subRef.current, ctaRef.current], {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
      }, "-=0.4")
      // Stats
      .from(statsRef.current, {
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
      }, "-=0.3")
      // Turntable fades in
      .from(turntableRef.current, {
        opacity: 0, scale: 0.94, duration: 1.1, ease: "power2.out",
      }, "-=0.8");

      // Scroll parallax on turntable
      gsap.to(turntableRef.current, {
        y: 60, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", minHeight: "100vh", background: "#0A0A0B", overflow: "hidden", display: "flex", alignItems: "center" }}>

      {/* Ambient green glow — top right */}
      <div aria-hidden style={{ position: "absolute", top: -200, right: -100, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Amber glow — bottom left */}
      <div aria-hidden style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Subtle grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

      <div className="cv-hero-inner" style={{ width: "100%", padding: "72px 6% 80px", position: "relative", zIndex: 2 }}>
        <div className="cv-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)", gap: "clamp(32px, 4vw, 64px)", alignItems: "center", minHeight: "82vh" }}>

          {/* LEFT — copy */}
          <div>
            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "6px 16px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 100 }}>
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px rgba(16,185,129,0.8)" }} />
              <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#10B981" }}>
                THE #1 CARD COLLECTING PLATFORM
              </span>
            </motion.div>

            {/* Headline */}
            <div ref={headlineRef} style={{ overflow: "hidden" }}>
              <h1 style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(2.6rem, 4.8vw, 5rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "white", margin: "0 0 24px" }}>
                {[
                  { text: "SCAN. VALUE.", color: "white" },
                  { text: "SELL. PROFIT.", color: "white" },
                  { text: "THE ONLY APP", color: "white" },
                  { text: "YOUR CARD BUSINESS", color: "white" },
                  { text: "NEEDS.", color: "#10B981", stroke: true },
                ].map(({ text, color, stroke }, i) => (
                  <div key={i} className="cv-headline-line" style={{ overflow: "hidden", lineHeight: 1 }}>
                    <span style={{
                      display: "block",
                      color: stroke ? "transparent" : color,
                      WebkitTextStroke: stroke ? "2px #10B981" : undefined,
                      paintOrder: stroke ? "stroke fill" : undefined,
                    }}>{text}</span>
                  </div>
                ))}
              </h1>
            </div>

            {/* Sub */}
            <p ref={subRef} style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 32px", maxWidth: 420 }}>
              The only card platform trained to get every value right — parallels, autos, serial numbers. Run your hobby or full card business from one place.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <MagBtn style={{ background: "#10B981", color: "#0A0A0B", padding: "15px 32px", borderRadius: 100, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 20, letterSpacing: "0.08em", alignItems: "center", gap: 10, lineHeight: 1, fontWeight: 900, boxShadow: "0 8px 32px rgba(16,185,129,0.3)" }}>
                <Zap size={16} strokeWidth={3} />TRY FREE →
              </MagBtn>
              <a href="#demo" style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2 }}>
                Watch Demo ↓
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28 }} className="cv-hero-stats">
              {[
                { target: 14, suffix: "M+", label: "Cards Indexed", color: "#10B981" },
                { target: 13, suffix: "",   label: "Power Tools",   color: "#F59E0B" },
                { target: 50, suffix: "K+", label: "Collectors",    color: "#8B5CF6" },
                { target: 5,  suffix: "s",  label: "Live Card ID",  color: "#3B82F6", prefix: "<" },
              ].map(({ target, suffix, label, color, prefix }, i) => (
                <div key={label} style={{ paddingRight: i < 3 ? 16 : 0, paddingLeft: i > 0 ? 16 : 0, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                    {prefix && <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(1.6rem,2.8vw,2.8rem)", color, lineHeight: 1 }}>{prefix}</span>}
                    <Counter target={target} suffix={suffix} color={color} />
                  </div>
                  <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginTop: 6, textTransform: "uppercase", lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
              {["No credit card required", "Free plan available", "Cancel anytime"].map(t => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
                  <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span>{t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Turntable */}
          <div ref={turntableRef} style={{ position: "relative", width: "100%", height: 680 }}>
            <Turntable />
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.25, pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 8, letterSpacing: "0.24em", color: "white" }}>SCROLL</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
      </motion.div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PremiumHero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style jsx global>{`
        @media (max-width: 1023px) {
          .cv-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; gap: 48px !important; }
          .cv-hero-grid > div:last-child { height: 400px !important; }
          .cv-nav-links { display: none !important; }
          .cv-hamburger { display: inline-flex !important; }
          .cv-nav-cta { display: none !important; }
          .cv-nav-signin { display: none !important; }
          .cv-mobile-menu { display: flex !important; }
        }
        @media (max-width: 640px) {
          .cv-hero-inner { padding: 48px 5% 56px !important; }
          .cv-hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .cv-hero-grid > div:last-child { height: 300px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}
      <Nav />
      <SniperWidget />
      <Hero />
    </>
  );
}