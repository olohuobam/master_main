"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Database, Award, ScanLine } from "lucide-react";
import { ProcessSteps } from "@/components/process-steps";

const CARDS = [
  { name: "PARALLELS",      src: "/icons/PARALLELS 1.png" },
  { name: "AUTOGRAPHS",     src: "/icons/AUTOGRAPHS 1.png" },
  { name: "SERIAL NUMBERED",src: "/icons/SERIAL NUMBERED1.png" },
  { name: "GRADED SLABS",   src: "/icons/GRADED SLABS 1.png" },
  { name: "LIMITED SETS",   src: "/icons/LIMITED SETS 1.png" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PremiumScanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="scanner" style={{ background: "#FAFAFA", padding: "clamp(72px,8vw,120px) 0", overflow: "hidden", position: "relative" }}>
      {/* Subtle grid texture */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px,5%,80px)", position: "relative" }}>

        {/* HEADLINE — cinematic wipe in */}
        <div style={{ textAlign: "center", overflow: "hidden", marginBottom: 48 }}>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(2.4rem,6vw,7.5rem)", lineHeight: 0.92, letterSpacing: "-0.02em", color: "#0A0A0B", margin: 0 }}
          >
            BULK{" "}
            <span style={{ color: "#10B981", WebkitTextStroke: "1.8px #0A0A0B", paintOrder: "stroke fill" }}>VALUE SCANNER</span>
            <br />
            WITH{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: "#10B981", WebkitTextStroke: "1.8px #0A0A0B", paintOrder: "stroke fill" }}>4-AI VISION</span>
              <motion.span initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, ease, delay: 0.6 }} style={{ position: "absolute", bottom: "0.06em", left: 0, right: 0, height: "0.06em", background: "#10B981", borderRadius: 2, transformOrigin: "left" }} />
            </span>{" "}
            TECHNOLOGY
          </motion.h2>
        </div>

        {/* Process steps */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay: 0.25 }} style={{ maxWidth: 800, margin: "0 auto 56px" }}>
          <ProcessSteps />
        </motion.div>

        {/* Two col */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.9fr)", gap: "clamp(32px,4vw,72px)", alignItems: "start" }}>

          {/* LEFT — card type icons */}
          <div>
            <motion.h3 initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease, delay: 0.2 }} style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(1.8rem,3.5vw,3.2rem)", lineHeight: 0.95, color: "#0A0A0B", margin: "0 0 12px", fontWeight: 400 }}>
              WE READ <span style={{ textDecoration: "underline", textDecorationThickness: "0.05em", textUnderlineOffset: "0.1em" }}>EVERY</span>{" "}
              <span style={{ color: "#10B981" }}>CARD TYPE.</span>
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, ease, delay: 0.3 }} style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.6, color: "#52525B", margin: "0 0 28px", maxWidth: "22em" }}>
              Generic AI guesses. Our 4-AI identifies every variant across five categories — <strong style={{ color: "#10B981" }}>instantly</strong>.
            </motion.p>

            {/* Icon grid — each pops in from different direction */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Row 1 */}
              <div style={{ display: "flex", gap: 10 }}>
                {CARDS.slice(0, 2).map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.35 + i * 0.08 }}
                    whileHover={{ y: -6, scale: 1.04, boxShadow: "0 16px 32px rgba(0,0,0,0.12)" }}
                    style={{ flex: 1, aspectRatio: "1/1", borderRadius: 16, overflow: "hidden", background: "white", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
                  >
                    <img src={c.src} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                  </motion.div>
                ))}
              </div>
              {/* Row 2 */}
              <div style={{ display: "flex", gap: 10 }}>
                {CARDS.slice(2).map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 + i * 0.08 }}
                    whileHover={{ y: -6, scale: 1.04, boxShadow: "0 16px 32px rgba(0,0,0,0.12)" }}
                    style={{ flex: 1, aspectRatio: "1/1", borderRadius: 16, overflow: "hidden", background: "white", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
                  >
                    <img src={c.src} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — scanner demo */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease, delay: 0.3 }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Demo box */}
            <div style={{ width: "100%", aspectRatio: "16/10", background: "#0A0A0B", borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}>
              {/* Glow */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(16,185,129,0.3) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(59,130,246,0.22) 0%, transparent 55%)", pointerEvents: "none" }} />

              {/* Live badge */}
              <div style={{ position: "absolute", top: 16, left: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "#3B82F6", borderRadius: 100, padding: "6px 14px", zIndex: 10 }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "white", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "white" }}>LIVE SCANNING</span>
              </div>

              {/* Scanner ring */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: 80, height: 80 }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, ease: "linear", repeat: Infinity }} style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(16,185,129,0.6)", position: "absolute" }}>
                    <div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 12px rgba(16,185,129,0.9)" }} />
                  </motion.div>
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 4.5, ease: "linear", repeat: Infinity }} style={{ width: 56, height: 56, borderRadius: "50%", border: "1.5px solid rgba(16,185,129,0.35)", position: "absolute", top: 12, left: 12 }} />
                  <ScanLine size={22} color="#10B981" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
              </div>

              {/* Result overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
                style={{ position: "absolute", bottom: 16, left: 16, right: 16, background: "rgba(10,10,11,0.92)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 14, padding: 16, backdropFilter: "blur(14px)" }}
              >
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, letterSpacing: "0.16em", color: "#10B981", marginBottom: 8 }}>IDENTIFIED IN 2.4S</div>
                <div style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 20, color: "white", letterSpacing: "0.03em", marginBottom: 4 }}>2020 TOPPS CHROME</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Gold Refractor /50 · PSA 10</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 26, color: "#10B981", letterSpacing: "0.02em" }}>$430</span>
                  {["PSA 9 $180", "RAW $38"].map(t => (
                    <span key={t} style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", padding: "3px 9px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5 }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay: 0.5 }} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "18px 0", gap: 0 }}>
              {[{ Icon: Zap, color: "#F59E0B", text: "Sub-3s ID" }, { Icon: Database, color: "#3B82F6", text: "16M+ database" }, { Icon: Award, color: "#10B981", text: "For collectors" }].map(({ Icon, color, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 16px", borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                  <Icon size={16} color={color} strokeWidth={2.2} />
                  <span style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#0A0A0B", whiteSpace: "nowrap" }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
