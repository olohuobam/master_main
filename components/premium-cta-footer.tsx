"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Zap, ArrowRight, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function MagneticBtn({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 20 });
  const sy = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href="#"
      style={{ x: sx, y: sy, ...style }}
      className={className}
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

const TRUST = [
  "No credit card required",
  "Free plan available",
  "Cancel anytime",
];

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Sniper", href: "#sniper" },
  { label: "Scanner", href: "#scanner" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Affiliate", href: "#affiliate" },
];

export default function PremiumCtaFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── CTA SECTION ──────────────────────────────────────────────── */}
      <section
        ref={ref}
        style={{
          background: "#0A0A0B",
          padding: "clamp(80px,10vw,140px) 6%",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Radial glow */}
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 600, background: "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Animated grid lines */}
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}
          >
            <span style={{ width: 24, height: 2, background: "#10B981", display: "inline-block", borderRadius: 2 }} />
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: "#10B981", textTransform: "uppercase" }}>
              Get Started Free
            </span>
            <span style={{ width: 24, height: 2, background: "#10B981", display: "inline-block", borderRadius: 2 }} />
          </motion.div>

          {/* Headline — splits into two lines with stagger */}
          <div style={{ overflow: "hidden" }}>
            {["STOP GUESSING.", "START MAKING MONEY."].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 80 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
              >
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                  fontSize: "clamp(3.5rem,9vw,9rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.02em",
                  color: i === 1 ? "transparent" : "white",
                  WebkitTextStroke: i === 1 ? "2px white" : undefined,
                  paintOrder: i === 1 ? "stroke fill" : undefined,
                }}>
                  {line}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,255,255,0.45)", margin: "28px 0 40px", lineHeight: 1.65 }}
          >
            Join 50,000+ collectors and flippers who use CardValues to find deals,<br />
            track values, and dominate the card market.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}
          >
            <MagneticBtn
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#10B981", color: "white",
                padding: "16px 36px", borderRadius: 100,
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "clamp(18px,2vw,22px)", letterSpacing: "0.08em",
                textDecoration: "none", lineHeight: 1,
                boxShadow: "0 0 0 0 rgba(16,185,129,0.5)",
                animation: "cv-pulse-glow 2.4s ease-in-out infinite",
              }}
            >
              <Zap size={18} strokeWidth={2} />
              TRY FREE NOW
              <ArrowRight size={16} strokeWidth={2} />
            </MagneticBtn>

            <MagneticBtn
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "transparent", color: "rgba(255,255,255,0.65)",
                padding: "16px 36px", borderRadius: 100,
                border: "1.5px solid rgba(255,255,255,0.15)",
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "clamp(18px,2vw,22px)", letterSpacing: "0.08em",
                textDecoration: "none", lineHeight: 1,
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              EXPLORE ALL TOOLS →
            </MagneticBtn>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}
          >
            {TRUST.map(t => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
                <Check size={12} color="#10B981" strokeWidth={3} />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0A0A0B", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 6%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: "linear-gradient(145deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 19, color: "white" }}>
              CV
            </div>
            <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 22, letterSpacing: "0.03em", color: "rgba(255,255,255,0.6)" }}>
              CARDVALUES™
            </span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {FOOTER_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.35)", textDecoration: "none", padding: "6px 10px", borderRadius: 6, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Copy */}
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
            © 2024 CARDVALUES™ · ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>
    </>
  );
}
