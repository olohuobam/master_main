"use client";

import { motion } from "framer-motion";
import { Store, Check, Globe, Zap, Users, TrendingUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  { Icon: Globe,     title: "YOUR DOMAIN",        desc: "Full white-label deployment on your own domain. Your brand, your URL, your identity." },
  { Icon: Users,     title: "YOUR CUSTOMERS",      desc: "Your users see only your brand. We stay completely invisible behind the scenes." },
  { Icon: Zap,       title: "OUR AI ENGINE",       desc: "Every tool — Scanner, Sniper, Portfolio, Slab IQ — powered by our 4AI Vision tech." },
  { Icon: TrendingUp,title: "CUSTOM PRICING",      desc: "Set your own subscription tiers and pricing. Keep 100% of what you charge above our fee." },
];

const USE_CASES = ["Card Shops", "Breakers", "Distributors", "Marketplaces", "Collector Clubs", "Sports Retailers"];

export default function WhiteLabelSection() {
  return (
    <section id="whitelabel" style={{ background: "#0F0F10", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* Ambient */}
      <div aria-hidden style={{ position: "absolute", top: "50%", right: -200, transform: "translateY(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(148,163,184,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px,5%,60px)" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)", alignItems: "center" }} className="cv-wl-grid">

          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 100 }}>
              <Store size={12} color="#94A3B8" strokeWidth={2} />
              <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#94A3B8" }}>WHITE LABEL SAAS</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
              style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(2.8rem,5vw,5rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "white", margin: "0 0 20px" }}>
              YOUR BRAND.<br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px rgba(148,163,184,0.6)" }}>OUR TECHNOLOGY.</span><br />
              <span style={{ color: "#94A3B8" }}>YOUR CUSTOMERS.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 36px", maxWidth: 440 }}>
              Run our full platform under your brand and domain. Card shops, breakers, distributors — we handle the tech, you handle the customers.
            </motion.p>

            {/* Use cases */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
              {USE_CASES.map((u, i) => (
                <span key={i} style={{ padding: "6px 14px", background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 100, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>{u}</span>
              ))}
            </motion.div>

            <motion.a href="#contact" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "white", color: "#0A0A0B", padding: "14px 30px", borderRadius: 100, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 20, letterSpacing: "0.08em", textDecoration: "none", fontWeight: 900 }}>
              GET WHITE LABEL ACCESS →
            </motion.a>
          </div>

          {/* RIGHT — feature cards */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {FEATURES.map(({ Icon, title, desc }) => (
              <motion.div key={title}
                variants={{ hidden: { opacity: 0, y: 24, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}
                whileHover={{ y: -4 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 12, cursor: "default" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(148,163,184,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8" }}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 18, letterSpacing: "0.04em", color: "white", lineHeight: 1.1 }}>{title}</div>
                <div style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.4)" }}>{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          style={{ marginTop: 64, padding: "28px 36px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          {[
            "Custom domain & SSL included",
            "Full platform access from day one",
            "We handle hosting, updates & AI",
            "Your pricing, your margins",
          ].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
              <Check size={14} color="#94A3B8" strokeWidth={3} />{item}
            </span>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .cv-wl-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}