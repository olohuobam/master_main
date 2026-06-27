"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio, ScanLine, DollarSign, BarChart3, ShoppingCart, Upload,
  Search, ArrowLeftRight, Users, Store, ShieldCheck, Database, Eye,
  X, ChevronRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const TOOLS = [
  {
    id: "sniper", num: "01",
    name: "VIDEO STREAM SNIPER",
    tag: "MOST POPULAR",
    tagColor: "#F59E0B",
    Icon: Radio,
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, #1A1200 0%, #2D1F00 100%)",
    border: "rgba(245,158,11,0.25)",
    desc: "Identify any graded card on a live stream in under 5 seconds. See real market value before the auction timer hits zero.",
    stats: [{ v: "<5s", l: "Card ID" }, { v: "ALL", l: "Platforms" }, { v: "16M", l: "Database" }],
    bullets: ["Works on Whatnot, eBay Live, Fanatics, TikTok", "Reads parallels, autos, serial numbers", "Shows PSA 10 value instantly"],
    screenshot: "/carousel/CARD APP INSTANT SNIPER PRO UPDATE copy.png",
  },
  {
    id: "scanner", num: "02",
    name: "BULK CARD SCANNER",
    tag: "4AI VISION",
    tagColor: "#3B82F6",
    Icon: ScanLine,
    accent: "#3B82F6",
    gradient: "linear-gradient(135deg, #000D1A 0%, #001A2D 100%)",
    border: "rgba(59,130,246,0.25)",
    desc: "Photograph a stack of cards and get values on all of them at once. Our 4-layer AI catches every parallel, auto, and numbered card.",
    stats: [{ v: "100s", l: "Per Batch" }, { v: "<1s", l: "Per Card" }, { v: "RAW+PSA", l: "Same Upload" }],
    bullets: ["Photo your whole collection at once", "AI identifies every variant automatically", "No manual entry — ever"],
    screenshot: "/carousel/CARD APP BULK CARD SCANNER UPLOAD UPDATE copy.png",
  },
  {
    id: "value", num: "03",
    name: "VALUE TOOL",
    tag: "LIVE PRICING",
    tagColor: "#10B981",
    Icon: DollarSign,
    accent: "#10B981",
    gradient: "linear-gradient(135deg, #001A12 0%, #002D1F 100%)",
    border: "rgba(16,185,129,0.25)",
    desc: "Real market values across all 8 grade tiers. Scan one card or bulk-select your library. No typing, no guessing.",
    stats: [{ v: "8", l: "Grade Tiers" }, { v: "LIVE", l: "Market Data" }, { v: "7.9M", l: "Sales Records" }],
    bullets: ["Values from real completed sales", "Updated weekly", "Covers raw, PSA, BGS, SGC"],
    screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png",
  },
  {
    id: "portfolio", num: "04",
    name: "PORTFOLIO TRACKER",
    tag: "6 DASHBOARDS",
    tagColor: "#8B5CF6",
    Icon: BarChart3,
    accent: "#8B5CF6",
    gradient: "linear-gradient(135deg, #0D001A 0%, #1A0030 100%)",
    border: "rgba(139,92,246,0.25)",
    desc: "Find your top undervalued cards, major price movers, what to grade, and what's dead stock — all in one dashboard.",
    stats: [{ v: "LIVE", l: "P&L Tracking" }, { v: "∞", l: "Cards" }, { v: "1-CLICK", l: "Import" }],
    bullets: ["Surface undervalued cards automatically", "See price changes before market reacts", "Know which raw cards to grade"],
    screenshot: "/carousel/CARD APP Portfolio Tracker copy2.png",
  },
  {
    id: "ebay", num: "05",
    name: "EBAY BULK LISTER",
    tag: "8 SECONDS",
    tagColor: "#EC4899",
    Icon: ShoppingCart,
    accent: "#EC4899",
    gradient: "linear-gradient(135deg, #1A0010 0%, #2D001C 100%)",
    border: "rgba(236,72,153,0.25)",
    desc: "Bulk list auctions or buy-it-now. 14 fields auto-filled per card in 8 seconds flat. Save templates. Track everything.",
    stats: [{ v: "8s", l: "Per Listing" }, { v: "14", l: "Fields Auto" }, { v: "BULK", l: "Management" }],
    bullets: ["Auction or BIN with set offers", "Save your own listing templates", "Bulk manage active listings"],
    screenshot: "/carousel/CARD APP EBAY BULK LISTER copy.png",
  },
  {
    id: "csv", num: "06",
    name: "CSV BULK IMPORT",
    tag: "ANY FORMAT",
    tagColor: "#F97316",
    Icon: Upload,
    accent: "#F97316",
    gradient: "linear-gradient(135deg, #1A0800 0%, #2D1400 100%)",
    border: "rgba(249,115,22,0.25)",
    desc: "Export from TCGplayer, COMC, eBay or anywhere. Drop your file and we map every column, value every row in under a minute.",
    stats: [{ v: "ANY", l: "File Format" }, { v: "ZERO", l: "Setup" }, { v: "60s", l: "Full Collection" }],
    bullets: ["JPG, CSV, TSV, XLS all accepted", "AI maps columns automatically", "Processes images too, not just text"],
    screenshot: "/carousel/CARD APP CSV Bulk Upload UPDATE 2 copy.png",
  },
  {
    id: "deals", num: "07",
    name: "DEAL FINDER",
    tag: "REAL-TIME",
    tagColor: "#14B8A6",
    Icon: Search,
    accent: "#14B8A6",
    gradient: "linear-gradient(135deg, #001A18 0%, #002D29 100%)",
    border: "rgba(20,184,166,0.25)",
    desc: "We scan every live auction and listing to surface cards selling below true value. You get the alert before anyone else bids.",
    stats: [{ v: "LIVE", l: "Market Scan" }, { v: "4+", l: "Platforms" }, { v: "INSTANT", l: "Alerts" }],
    bullets: ["Catches mispriced cards immediately", "Filter by player, set, grade", "Built-in profit calculator"],
    screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png",
  },
  {
    id: "flip", num: "08",
    name: "FLIP FINDER",
    tag: "BUY LOW SELL HIGH",
    tagColor: "#DC2626",
    Icon: ArrowLeftRight,
    accent: "#DC2626",
    gradient: "linear-gradient(135deg, #1A0000 0%, #2D0000 100%)",
    border: "rgba(220,38,38,0.25)",
    desc: "See exact profit margins on every card in the market. Every active listing compared to recent sold prices. You see the spreads.",
    stats: [{ v: "EVERY", l: "Active Listing" }, { v: "LIVE", l: "Margins" }, { v: "ROI%", l: "Per Card" }],
    bullets: ["Filter by minimum profit or ROI %", "Track flips and total earnings", "Spot trending players early"],
    screenshot: "/carousel/CARD APP FLIP FINDER copy3 up.png",
  },
  {
    id: "affiliate", num: "09",
    name: "AFFILIATE PROGRAM",
    tag: "UP TO 30%",
    tagColor: "#4F46E5",
    Icon: Users,
    accent: "#4F46E5",
    gradient: "linear-gradient(135deg, #06001A 0%, #0D002D 100%)",
    border: "rgba(79,70,229,0.25)",
    desc: "Earn up to 30% recurring on every referral that subscribes. Join even on the free plan. Top affiliates earn $5K+ per month.",
    stats: [{ v: "30%", l: "Recurring" }, { v: "LIFETIME", l: "Earnings" }, { v: "FREE", l: "To Join" }],
    bullets: ["Custom link and real-time stats", "Paid monthly", "Available on free plan"],
    screenshot: "/carousel/CARD APP AFFILIATE PROGRAM copy2.png",
  },
  {
    id: "whitelabel", num: "10",
    name: "WHITE LABEL SAAS",
    tag: "YOUR BRAND",
    tagColor: "#64748B",
    Icon: Store,
    accent: "#94A3B8",
    gradient: "linear-gradient(135deg, #0A0A0B 0%, #1A1A1C 100%)",
    border: "rgba(148,163,184,0.2)",
    desc: "Run our entire platform under your own brand. Card shops, breakers, distributors — your logo, your domain, our AI.",
    stats: [{ v: "YOUR", l: "Brand & Domain" }, { v: "FULL", l: "Platform" }, { v: "CUSTOM", l: "Pricing" }],
    bullets: ["Custom domain and branding", "Built for shops, breakers, distributors", "We handle hosting and updates"],
    screenshot: "/carousel/CARD APP WHITE LABEL SAAS copy.png",
  },
  {
    id: "slabiq", num: "11",
    name: "SLAB IQ",
    tag: "GRADING INTEL",
    tagColor: "#B45309",
    Icon: ShieldCheck,
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, #1A1000 0%, #2D1D00 100%)",
    border: "rgba(180,83,9,0.25)",
    desc: "Track every slab. Monitor pop reports. AI-predicted price moves before the market reacts. The smartest grading tool ever built.",
    stats: [{ v: "LIVE", l: "Pop Reports" }, { v: "AI", l: "Price Predictions" }, { v: "PSA+BGS", l: "All Graders" }],
    bullets: ["Notified when pop reports change", "Know which cards to grade before fees", "Sort entire submissions in seconds"],
    screenshot: "/carousel/CARD APP SLAB IQ copy2.png",
  },
  {
    id: "inventory", num: "12",
    name: "INVENTORY MANAGER",
    tag: "ALL-IN-ONE",
    tagColor: "#16A34A",
    Icon: Database,
    accent: "#16A34A",
    gradient: "linear-gradient(135deg, #001A08 0%, #002D12 100%)",
    border: "rgba(22,163,74,0.25)",
    desc: "One home for every card you own. Scan, organize, value, and track your entire collection — raw and graded — without a spreadsheet.",
    stats: [{ v: "∞", l: "Cards" }, { v: "LIVE", l: "Valuations" }, { v: "SYNCED", l: "All Devices" }],
    bullets: ["Auto-identified in seconds on scan", "Live value updates always", "Filter by profit potential"],
    screenshot: "/carousel/CARD APP Inventory Manager copy2.png",
  },
  {
    id: "market", num: "13",
    name: "LIVE MARKETPLACE",
    tag: "REAL-TIME",
    tagColor: "#EA580C",
    Icon: Eye,
    accent: "#EA580C",
    gradient: "linear-gradient(135deg, #1A0800 0%, #2D1200 100%)",
    border: "rgba(234,88,12,0.25)",
    desc: "A live feed of every card moving on the market right now. Filter to exactly what you care about. Never miss a hot drop.",
    stats: [{ v: "LIVE", l: "Feed" }, { v: "4+", l: "Platforms" }, { v: "INSTANT", l: "Filters" }],
    bullets: ["Real-time cards selling right now", "Spot trending cards before prices spike", "Price history overlays"],
    screenshot: "/carousel/CARD APP LIVE MARKETPLACE copy2.png",
  },
];

export default function AllToolsSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeData = TOOLS.find(t => t.id === active);

  return (
    <section id="features" style={{ background: "#0A0A0B", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div aria-hidden style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px,5%,60px)" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: 60, maxWidth: 700 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 100 }}>
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#F59E0B" }}>13 POWER TOOLS</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(3rem,5.5vw,5.5rem)", lineHeight: 0.88, letterSpacing: "-0.01em", color: "white", margin: 0 }}>
            ONE PLATFORM.<br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px white" }}>EVERY EDGE.</span>
          </h2>
        </motion.div>

        {/* Tools grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }} className="cv-tools-grid">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: EASE, delay: Math.min(i * 0.04, 0.35) }}
              onClick={() => setActive(tool.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              style={{
                background: tool.gradient,
                border: `1px solid ${tool.border}`,
                borderRadius: 20,
                padding: "24px 22px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Glow corner */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${tool.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />

              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${tool.accent}18`, border: `1px solid ${tool.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: tool.accent }}>
                  <tool.Icon size={22} strokeWidth={2} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-geist-sans), monospace", fontSize: 7, fontWeight: 700, letterSpacing: "0.14em", color: tool.tagColor, background: `${tool.tagColor}15`, border: `1px solid ${tool.tagColor}30`, borderRadius: 100, padding: "3px 8px", whiteSpace: "nowrap" }}>{tool.tag}</span>
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>{tool.num}</span>
                </div>
              </div>

              {/* Name */}
              <div style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 22, letterSpacing: "0.04em", color: "white", lineHeight: 1.05 }}>{tool.name}</div>

              {/* Desc */}
              <div style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.5)", flex: 1 }}>{tool.desc}</div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${tool.accent}15`, paddingTop: 14, marginTop: 4 }}>
                {tool.stats.map((s, si) => (
                  <div key={si} style={{ flex: 1, paddingRight: si < 2 ? 12 : 0, paddingLeft: si > 0 ? 12 : 0, borderRight: si < 2 ? `1px solid ${tool.accent}15` : "none" }}>
                    <div style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 18, color: tool.accent, lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 8.5, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginTop: 3, textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Learn more */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 13, letterSpacing: "0.1em", color: tool.accent }}>
                EXPLORE <ChevronRight size={13} strokeWidth={2.5} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && activeData && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 999 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              style={{
                position: "fixed", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(900px, 92vw)",
                maxHeight: "88vh",
                zIndex: 1000,
                background: "#0F0F10",
                border: `1px solid ${activeData.border}`,
                borderRadius: 24,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px ${activeData.accent}20`,
              }}
              className="cv-tool-modal"
            >
              {/* Left — screenshot */}
              <div style={{ background: activeData.gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
                <div style={{ position: "absolute", top: 14, left: 14, width: 36, height: 36, borderRadius: 10, background: `${activeData.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: activeData.accent }}>
                  <activeData.Icon size={18} strokeWidth={2} />
                </div>
                <img src={activeData.screenshot} alt={activeData.name} style={{ width: "100%", objectFit: "contain", borderRadius: 12, maxHeight: 360 }} />
              </div>

              {/* Right — content */}
              <div style={{ padding: "28px 32px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Close */}
                <button onClick={() => setActive(null)} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", zIndex: 2 }}>
                  <X size={16} />
                </button>

                <div>
                  <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: activeData.tagColor, display: "block", marginBottom: 8 }}>{activeData.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", color: "white", lineHeight: 0.9, letterSpacing: "0.03em", margin: 0 }}>{activeData.name}</h3>
                </div>

                <p style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", margin: 0 }}>{activeData.desc}</p>

                {/* Stats */}
                <div style={{ display: "flex", gap: 0, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {activeData.stats.map((s, i) => (
                    <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 20 : 0, paddingRight: i < 2 ? 20 : 0, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none", textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 28, color: activeData.accent, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginTop: 5, textTransform: "uppercase" }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {activeData.bullets.map((b, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-geist-sans), Inter, sans-serif", fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: activeData.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: 11, color: "#0A0A0B", fontWeight: 900 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: activeData.accent, color: "#0A0A0B", padding: "12px 24px", borderRadius: 100, fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: 18, letterSpacing: "0.08em", textDecoration: "none", alignSelf: "flex-start", fontWeight: 900 }}>
                  TRY IT FREE <ChevronRight size={16} strokeWidth={3} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 640px) {
          .cv-tools-grid { grid-template-columns: 1fr !important; }
          .cv-tool-modal { grid-template-columns: 1fr !important; }
          .cv-tool-modal > div:first-child { display: none !important; }
        }
        @media (max-width: 900px) {
          .cv-tool-modal { grid-template-columns: 1fr !important; }
          .cv-tool-modal > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}