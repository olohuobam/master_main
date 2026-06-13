"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Radio,
  ScanLine,
  DollarSign,
  BarChart3,
  ShoppingCart,
  Upload,
  Image as ImageIcon,
  Layers,
  Play,
  Tag,
  Mail,
  Zap,
  Search,
  ArrowLeftRight,
  Users,
  Store,
  ShieldCheck,
  Menu,
  X,
  Database,
  Eye,
  Sparkles,
  Wrench,
  Crosshair,
} from "lucide-react";

// =============================================================================
// NAVIGATION
// =============================================================================

const TICKER_ITEMS = [
  { label: "LIVE", isLive: true },
  { label: "CHASE TOPPS 2024", value: "+12%", up: true },
  { label: "PRIZM SILVER", value: "-2%", up: false },
  { label: "PSA POP", value: "+318", up: true },
  { label: "14M CARDS INDEXED" },
  { label: "SLABS GRADED TODAY", value: "2,847", up: true },
];

const NAV_LINKS = [
  { label: "FEATURES", Icon: Layers, href: "#features", active: true },
  { label: "DEMO",     Icon: Play,   href: "#demo",     active: false },
  { label: "PRICING",  Icon: Tag,    href: "#pricing",  active: false },
  { label: "CONTACT",  Icon: Mail,   href: "#contact",  active: false },
];

function Navigation() {
  const tickerLoop = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  const [mobileOpen, setMobileOpen] = useState(false);
  const SNIPER_MESSAGES = [
    "5 SECOND VALUE",
    "SNIPE GRADED CARDS",
    "SNIPE ANY PLATFORM",
    "NO MORE OVERBIDDING",
    "MAKE FAST MONEY",
    "THE CHEAT CODE",
  ];
  const [sniperMsgIndex, setSniperMsgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSniperMsgIndex((i) => (i + 1) % SNIPER_MESSAGES.length);
    }, 3400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "#0A0A0B",
      }}
    >
      {/* Live ticker */}
      <div
        className="cv-ticker"
        style={{
          height: "40px",
          background: "#0A0A0B",
          backgroundColor: "#0A0A0B",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          overflow: "hidden",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "36px",
            animation: "cv-ticker-scroll 40s linear infinite",
            flexShrink: 0,
          }}
        >
          {tickerLoop.map((item, i) => (
            <span
              key={i}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", flexShrink: 0 }}
            >
              {item.isLive ? (
                <>
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "#10B981",
                      display: "inline-block",
                      animation: "cv-live-pulse 1.4s ease-in-out infinite",
                      boxShadow: "0 0 8px rgba(16,185,129,0.7)",
                    }}
                  />
                  <span style={{ color: "#10B981", fontWeight: 500 }}>LIVE</span>
                </>
              ) : (
                <>
                  <span style={{ color: "#FFFFFF", opacity: 0.95 }}>
                    {item.label}
                  </span>
                  {item.value && (
                    <span style={{ color: item.up ? "#10B981" : "#EF4444", fontWeight: 500 }}>
                      {item.value}
                    </span>
                  )}
                </>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Nav row */}
      <nav
        className="cv-nav-row"
        style={{
          position: "relative",
          height: "78px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 170px 0 32px",
          background: "white",
          gap: "16px",
        }}
      >
        {/* Brand */}
        <div
          className="cv-nav-brand"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="cv-nav-hamburger"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "transparent",
              border: "1.5px solid #E5E7EB",
              color: "#0A0A0B",
              cursor: "pointer",
              flexShrink: 0,
              padding: 0,
            }}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
          <div
            className="cv-nav-logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "14px",
              background: "linear-gradient(155deg, #7C3AED 0%, #4F46E5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "28px",
              lineHeight: 1,
              letterSpacing: "0.04em",
              border: "2.5px solid white",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 22px rgba(79,70,229,0.38), 0 2px 6px rgba(0,0,0,0.12)",
              flexShrink: 0,
            }}
          >
            CV
          </div>
          <span
            className="cv-nav-wordmark"
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "30px",
              letterSpacing: "0.03em",
              color: "#0A0A0B",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            CARDVALUES
            <span
              style={{
                fontSize: "11px",
                verticalAlign: "top",
                color: "#6B7280",
                marginLeft: "4px",
                fontFamily: "var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              ™
            </span>
          </span>
        </div>

        {/* Sniper tool callout — shown on desktop + mobile, hangs over the orange amber rail on the right */}
        <a
          href="#sniper"
          className="cv-mobile-sniper-tile"
          aria-label="Now featuring: Video Stream Sniping Tool"
          style={{
            display: "flex",
            position: "absolute",
            right: "14px",
            top: "12px",
            width: "130px",
            height: "130px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #18181B 0%, #27272A 55%, #18181B 100%)",
            border: "3px solid white",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 42px rgba(245,158,11,0.45), 0 4px 10px rgba(0,0,0,0.25)",
            zIndex: 20,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 10px 10px",
            textAlign: "center",
            textDecoration: "none",
            color: "#FFFFFF",
            overflow: "visible",
            flexShrink: 0,
            animation: "cv-sniper-tile-pulse 2.4s ease-in-out infinite",
          }}
        >
          {/* NOW FEATURING bubble floating on top edge */}
          <span
            style={{
              position: "absolute",
              top: "-9px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              borderRadius: "100px",
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
              fontSize: "7px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "white",
              whiteSpace: "nowrap",
              boxShadow: "0 3px 8px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
              border: "1.5px solid white",
              zIndex: 3,
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 0 5px rgba(255,255,255,0.9)",
                animation: "cv-live-pulse 1.4s ease-in-out infinite",
              }}
            />
            NOW FEATURING
          </span>

          {/* Inner clipped area: rotating target at low opacity */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "17px",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            {/* Subtle sweeping amber shine */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(115deg, transparent 35%, rgba(245,158,11,0.18) 50%, transparent 65%)",
                animation: "cv-sniper-shine 3s linear infinite",
              }}
            />
            {/* Rotating bullseye target — sized so outer ring is visible inside the box */}
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "108px",
                height: "108px",
                marginLeft: "-54px",
                marginTop: "-54px",
                opacity: 0.28,
                animation: "cv-sniper-tile-spin 16s linear infinite",
              }}
            >
              <svg viewBox="0 0 100 100" width="108" height="108" fill="none">
                <circle cx="50" cy="50" r="46" stroke="#F59E0B" strokeWidth="1.2" />
                <circle cx="50" cy="50" r="34" stroke="#F59E0B" strokeWidth="0.9" />
                <circle cx="50" cy="50" r="22" stroke="#F59E0B" strokeWidth="0.9" />
                <circle cx="50" cy="50" r="10" stroke="#F59E0B" strokeWidth="0.9" />
                <circle cx="50" cy="50" r="2.5" fill="#EF4444" />
                <line x1="50" y1="2" x2="50" y2="12" stroke="#F59E0B" strokeWidth="1.2" />
                <line x1="50" y1="88" x2="50" y2="98" stroke="#F59E0B" strokeWidth="1.2" />
                <line x1="2" y1="50" x2="12" y2="50" stroke="#F59E0B" strokeWidth="1.2" />
                <line x1="88" y1="50" x2="98" y2="50" stroke="#F59E0B" strokeWidth="1.2" />
              </svg>
            </span>
          </span>

          {/* Title — two words per line, fills the box */}
          <span
            style={{
              position: "relative",
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "20px",
              lineHeight: 1.0,
              letterSpacing: "0.03em",
              color: "#F59E0B",
              textShadow: "0 1px 3px rgba(0,0,0,0.7), 0 0 10px rgba(245,158,11,0.3)",
              zIndex: 2,
            }}
          >
            VIDEO STREAM
            <br />
            SNIPING TOOL
          </span>

          {/* Rotating sniper messages — fly in to the bullseye, hold, fade out, swap, repeat */}
          <span
            key={sniperMsgIndex}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "10px",
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "12px",
              lineHeight: 1,
              letterSpacing: "0.05em",
              color: "#10B981",
              textShadow: "0 0 8px rgba(16,185,129,0.85), 0 1px 2px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 3,
              animation: "cv-sniper-value-fly 3.4s ease-in-out 1 forwards",
            }}
          >
            {SNIPER_MESSAGES[sniperMsgIndex]}
          </span>
        </a>

        {/* Center links */}
        <div className="cv-nav-links" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {NAV_LINKS.map((link) => {
            const { Icon } = link;
            const active = link.active;
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                  fontSize: "20px",
                  letterSpacing: "0.08em",
                  color: "#0A0A0B",
                  padding: "12px 18px",
                  cursor: "pointer",
                  position: "relative",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  color={active ? "#F59E0B" : "#4F46E5"}
                  style={{ opacity: active ? 1 : 0.85 }}
                />
                <span style={{ position: "relative" }}>
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: "-3px",
                        height: "1.5px",
                        background: "#F59E0B",
                        borderRadius: "1px",
                      }}
                    />
                  )}
                </span>
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <a
            href="#signin"
            className="cv-nav-signin"
            style={{
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
              fontSize: "13px",
              color: "#6B7280",
              padding: "8px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Sign in
          </a>
          {/* Desktop-only TRY FREE in the header (mobile shows the bubble under the headline instead) */}
          <button
            type="button"
            className="cv-nav-cta"
            style={{
              position: "relative",
              background: "#0A0A0B",
              color: "#FFFFFF",
              border: "1.5px solid #10B981",
              padding: "11px 20px",
              borderRadius: "100px",
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "16px",
              letterSpacing: "0.08em",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              animation: "cv-cta-glow 2.4s ease-in-out infinite",
              whiteSpace: "nowrap",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <Zap size={16} strokeWidth={2} color="#10B981" />
            <span style={{ color: "#FFFFFF" }}>TRY FREE</span>
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>→</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="cv-mobile-menu"
          style={{
            display: "none",
            flexDirection: "column",
            background: "white",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            padding: "12px 16px 20px",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((link) => {
            const { Icon } = link;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 12px",
                  borderRadius: "10px",
                  fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                  fontSize: "22px",
                  letterSpacing: "0.06em",
                  color: "#0A0A0B",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  color={link.active ? "#F59E0B" : "#4F46E5"}
                />
                {link.label}
              </a>
            );
          })}
          <a
            href="#signin"
            onClick={() => setMobileOpen(false)}
            style={{
              padding: "14px 12px",
              marginTop: "6px",
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
              fontSize: "15px",
              color: "#6B7280",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Sign in
          </a>
        </div>
      )}

      {/* Amber rail */}
      <div style={{ height: "6px", background: "#F59E0B" }} />
      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }} />
    </header>
  );
}

// =============================================================================
// HERO
// =============================================================================

const TOOL_CARDS = [
  { name: "VIDEO SNIPER",   desc: "Live auction snipes",            tint: "#FEF3C7", accent: "#F59E0B", Icon: Radio,          badge: "01 / 13", screenshot: "/carousel/CARD APP INSTANT SNIPER PRO UPDATE copy.png" },
  { name: "BULK SCANNER",   desc: "Hundreds at once",               tint: "#DBEAFE", accent: "#3B82F6", Icon: ScanLine,       badge: "02 / 13", screenshot: "/carousel/CARD APP BULK CARD SCANNER UPLOAD UPDATE copy.png" },
  { name: "VALUE TOOL",     desc: "Every grade tier",               tint: "#D1FAE5", accent: "#10B981", Icon: DollarSign,     badge: "03 / 13", screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png" },
  { name: "PORTFOLIO",      desc: "Six dashboards in one",          tint: "#EDE9FE", accent: "#8B5CF6", Icon: BarChart3,      badge: "04 / 13", screenshot: "/carousel/CARD APP Portfolio Tracker copy2.png" },
  { name: "EBAY LISTER",    desc: "14 fields in 8 seconds",         tint: "#FCE7F3", accent: "#EC4899", Icon: ShoppingCart,   badge: "05 / 13", screenshot: "/carousel/CARD APP EBAY BULK LISTER copy.png" },
  { name: "CSV BULK",       desc: "Import entire collections",      tint: "#FED7AA", accent: "#F97316", Icon: Upload,         badge: "06 / 13", screenshot: "/carousel/CARD APP CSV Bulk Upload UPDATE 2 copy.png" },
  { name: "DEAL FINDER",    desc: "Catch deals across the market",  tint: "#CCFBF1", accent: "#14B8A6", Icon: Search,         badge: "07 / 13", screenshot: "/carousel/CARD APP Deal Finder ALT 2 copy.png" },
  { name: "FLIP FINDER",    desc: "Buy low, sell high",             tint: "#FEE2E2", accent: "#DC2626", Icon: ArrowLeftRight, badge: "08 / 13", screenshot: "/carousel/CARD APP FLIP FINDER copy3 up.png" },
  { name: "AFFILIATE",      desc: "Earn while you collect",         tint: "#E0E7FF", accent: "#4F46E5", Icon: Users,          badge: "09 / 13", screenshot: "/carousel/CARD APP AFFILIATE PROGRAM copy2.png" },
  { name: "WHITE LABEL",    desc: "Your brand, our tech",           tint: "#E2E8F0", accent: "#475569", Icon: Store,          badge: "10 / 13", screenshot: "/carousel/CARD APP WHITE LABEL SAAS copy.png" },
  { name: "SLAB IQ",        desc: "For serious slab collectors",    tint: "#FEF9C3", accent: "#B45309", Icon: ShieldCheck,    badge: "11 / 13", screenshot: "/carousel/CARD APP SLAB IQ copy2.png" },
  { name: "INVENTORY",      desc: "Track every card you own",       tint: "#F0FDF4", accent: "#16A34A", Icon: Database,       badge: "12 / 13", screenshot: "/carousel/CARD APP Inventory Manager copy2.png" },
  { name: "LIVE MARKET",    desc: "Real-time marketplace feed",     tint: "#FFF7ED", accent: "#EA580C", Icon: Eye,            badge: "13 / 13", screenshot: "/carousel/CARD APP LIVE MARKETPLACE copy2.png" },
];

type StatSpec = { value: string; label: string; color: string; small?: boolean };

const TOOL_DETAILS: {
  tagline: React.ReactNode;
  stats: StatSpec[];
  bullets: React.ReactNode[];
  footer: string;
  shimmerGradient: string;
  shimmerDropShadow: string;
}[] = [
  // 0 — VIDEO SNIPER
  {
    tagline: (<>Snipe <strong>graded cards live</strong>. Make money buying undervalued cards before the auction ends. <em>This is the cheat code.</em></>),
    stats: [
      { value: "<5s",  label: "Live ID",   color: "#F59E0B" },
      { value: "ALL",  label: "Platforms", color: "#10B981" },
      { value: "16M",  label: "Database",  color: "#3B82F6" },
    ],
    bullets: [
      <>Spot <strong>undervalued graded cards</strong> before anyone else bids</>,
      <>See the <strong>real market value</strong> the moment a card is shown</>,
      <>Reads <strong>parallels, autos, numbered variations</strong></>,
      <>Works on <strong>any livestream</strong> — Whatnot, eBay Live, Fanatics, TikTok</>,
    ],
    footer: "The Sniper Cheat Code · Buy Low. Sell High.",
    shimmerGradient: "linear-gradient(90deg, #F59E0B 0%, #FCD34D 25%, #F97316 50%, #FCD34D 75%, #F59E0B 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(245,158,11,0.25))",
  },
  // 1 — BULK SCANNER
  {
    tagline: (<>Photo your whole stack. Our <strong>4AI Vision</strong> catches every parallel, auto, and numbered card other apps miss. <em>2+ years of specialized training.</em></>),
    stats: [
      { value: "100s",         label: "Per Batch",   color: "#3B82F6" },
      { value: "<1s",          label: "Per Card",    color: "#F59E0B" },
      { value: "RAW + GRADED", label: "Same Batch",  color: "#10B981", small: true },
    ],
    bullets: [
      <><strong>Most apps see &quot;Topps Chrome.&quot; We see &quot;Gold Refractor /50 PSA 10.&quot;</strong></>,
      <>Find the <strong>hidden gems</strong> in your collection automatically</>,
      <>Know which cards are <strong>worth grading</strong> before submission fees</>,
      <>Mix raw and slabbed cards in the <strong>same upload</strong></>,
    ],
    footer: "4AI Vision · Most Apps Read Cards. We Understand Them.",
    shimmerGradient: "linear-gradient(90deg, #3B82F6 0%, #60A5FA 25%, #2563EB 50%, #60A5FA 75%, #3B82F6 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(59,130,246,0.25))",
  },
  // 2 — VALUE TOOL
  {
    tagline: (<>Our <strong>4AI Vision</strong> captures every detail off the card and gives you <strong>real values</strong>. No manual entry. Ever.</>),
    stats: [
      { value: "8",    label: "Grade Tiers",     color: "#10B981" },
      { value: "LIVE", label: "Market Pricing",  color: "#F59E0B" },
      { value: "7.9M", label: "Sales Records",   color: "#3B82F6" },
    ],
    bullets: [
      <>Capture <strong>one card at a time</strong> with your camera</>,
      <>Or <strong>select multiple from your library</strong> — bulk value instantly</>,
      <>4AI Vision reads <strong>every detail correctly</strong> — no typing</>,
      <>Real prices from <strong>real market sales</strong>, updated weekly</>,
    ],
    footer: "Zero Manual Entry · Real Values · Every Time",
    shimmerGradient: "linear-gradient(90deg, #10B981 0%, #34D399 25%, #059669 50%, #34D399 75%, #10B981 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(16,185,129,0.25))",
  },
  // 3 — PORTFOLIO
  {
    tagline: (<><em>Game changer.</em> Find your <strong>top undervalued cards</strong>, major price movers, what to grade, and what&apos;s <strong>dead stock</strong> — all in one dashboard.</>),
    stats: [
      { value: "LIVE",    label: "P/L Tracking",  color: "#8B5CF6" },
      { value: "∞",       label: "Cards Tracked", color: "#10B981" },
      { value: "1-CLICK", label: "Import",        color: "#F59E0B", small: true },
    ],
    bullets: [
      <>Surface your <strong>top undervalued cards</strong> automatically</>,
      <>See <strong>major price changes</strong> before the market reacts</>,
      <>Find cards <strong>worth grading</strong> based on PSA 10 value</>,
      <>Identify <strong>dead stock</strong> sitting in your inventory too long</>,
    ],
    footer: "Every Metric That Matters · One Dashboard",
    shimmerGradient: "linear-gradient(90deg, #8B5CF6 0%, #A78BFA 25%, #6D28D9 50%, #A78BFA 75%, #8B5CF6 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(139,92,246,0.25))",
  },
  // 4 — EBAY LISTER
  {
    tagline: (<>Bulk list <strong>auctions or buy-it-now</strong>. Set offers. Save your own templates. Track everything that&apos;s online — and what still needs listing.</>),
    stats: [
      { value: "8s",   label: "Per Listing",        color: "#EC4899" },
      { value: "14",   label: "Fields Auto-Filled", color: "#F59E0B" },
      { value: "BULK", label: "Manage",             color: "#10B981", small: true },
    ],
    bullets: [
      <>Bulk list <strong>auctions or BIN</strong> with set offers in one flow</>,
      <>Save your own <strong>listing templates</strong> — never type the same thing twice</>,
      <><strong>Bulk manage</strong> active listings — edit, end, relist in seconds</>,
      <>Track what&apos;s <strong>online vs needs listing</strong> at a glance</>,
    ],
    footer: "Stop Typing · Start Selling · Bulk Everything",
    shimmerGradient: "linear-gradient(90deg, #EC4899 0%, #F472B6 25%, #DB2777 50%, #F472B6 75%, #EC4899 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(236,72,153,0.25))",
  },
  // 5 — CSV BULK
  {
    tagline: (<><strong>Export and import from other platforms.</strong> Bring over inventory that needs pricing. <em>Cut hours of work down to minutes.</em></>),
    stats: [
      { value: "ANY SIZE", label: "Import",     color: "#F97316", small: true },
      { value: "ZERO",     label: "Setup",      color: "#10B981" },
      { value: "INSTANT",  label: "Valuations", color: "#3B82F6" },
    ],
    bullets: [
      <><strong>Export and import</strong> from TCGplayer, COMC, eBay, and more</>,
      <>Bring over <strong>existing stock</strong> that needs current pricing</>,
      <><strong>Processes images too</strong> — not just text data</>,
      <>Auto-matches columns and <strong>bulk-values everything</strong> on upload</>,
    ],
    footer: "Hours Saved · Import Anywhere · Value Instantly",
    shimmerGradient: "linear-gradient(90deg, #F97316 0%, #FB923C 25%, #EA580C 50%, #FB923C 75%, #F97316 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(249,115,22,0.25))",
  },
  // 6 — DEAL FINDER
  {
    tagline: (<>We scan the entire market in real time and surface cards selling <strong>below true value</strong> — across eBay, Whatnot, Fanatics, and COMC.</>),
    stats: [
      { value: "LIVE",    label: "Market Scan",  color: "#14B8A6" },
      { value: "4+",      label: "Marketplaces", color: "#F59E0B" },
      { value: "INSTANT", label: "Alerts",       color: "#10B981" },
    ],
    bullets: [
      <>Catches <strong>mispriced cards</strong> the second they hit the market</>,
      <>Filter by player, set, grade, parallel — see <strong>only deals you&apos;d buy</strong></>,
      <><strong>Push notifications</strong> to your phone when deals drop</>,
      <>Built-in <strong>profit calculator</strong> — know your margin before you click buy</>,
    ],
    footer: "Stop Refreshing · Start Buying",
    shimmerGradient: "linear-gradient(90deg, #14B8A6 0%, #2DD4BF 25%, #0D9488 50%, #2DD4BF 75%, #14B8A6 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(20,184,166,0.25))",
  },
  // 7 — FLIP FINDER
  {
    tagline: (<>Find cards you can <strong>buy low and sell high</strong> automatically. We compare every active listing to recent sold prices. You see the spreads.</>),
    stats: [
      { value: "EVERY",   label: "Active Listing", color: "#DC2626", small: true },
      { value: "LIVE",    label: "Profit Margins", color: "#F59E0B" },
      { value: "1-CLICK", label: "Buy & Resell",   color: "#10B981", small: true },
    ],
    bullets: [
      <>See the <strong>exact profit potential</strong> of every card on the market</>,
      <>Filter by <strong>minimum margin, dollar amount, or ROI %</strong></>,
      <>Track your flips and total earnings inside the dashboard</>,
      <>Identify <strong>trending players</strong> before everyone else catches on</>,
    ],
    footer: "Buy Low · Sell High · Repeat",
    shimmerGradient: "linear-gradient(90deg, #DC2626 0%, #EF4444 25%, #B91C1C 50%, #EF4444 75%, #DC2626 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(220,38,38,0.25))",
  },
  // 8 — AFFILIATE
  {
    tagline: (<>Earn while you collect. Share CardValues with your audience and <strong>earn up to 30% recurring</strong> on every signup.</>),
    stats: [
      { value: "UP TO 30%", label: "Recurring", color: "#4F46E5", small: true },
      { value: "LIFETIME",  label: "Earnings",  color: "#10B981" },
      { value: "FREE",      label: "To Join",   color: "#F59E0B" },
    ],
    bullets: [
      <><strong>Earn up to 30% recurring</strong> on every referral that subscribes</>,
      <><strong>Become an affiliate even on the free plan</strong> — no paid tier required</>,
      <>Custom link, <strong>real-time stats</strong>, paid monthly</>,
      <><strong>Top affiliates earn $5K+/month</strong> with engaged audiences</>,
    ],
    footer: "Free Plan Friendly · Up To 30% · Season 1 Live",
    shimmerGradient: "linear-gradient(90deg, #4F46E5 0%, #6366F1 25%, #4338CA 50%, #6366F1 75%, #4F46E5 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(79,70,229,0.25))",
  },
  // 9 — WHITE LABEL
  {
    tagline: (<>Run our <strong>entire platform under your own brand</strong>. Card shops, breakers, distributors — your logo, your domain, our AI.</>),
    stats: [
      { value: "YOUR",   label: "Brand & Domain",  color: "#475569", small: true },
      { value: "FULL",   label: "Platform Access", color: "#F59E0B" },
      { value: "CUSTOM", label: "Pricing",         color: "#10B981" },
    ],
    bullets: [
      <>Use the entire CardValues platform under <strong>your name</strong></>,
      <>Custom domain, custom branding, <strong>custom user accounts</strong></>,
      <>Built for <strong>card shops, breakers, distributors, marketplaces</strong></>,
      <>We handle hosting, updates, and AI — <strong>you handle customers</strong></>,
    ],
    footer: "Our Tech · Your Brand · Your Customers",
    shimmerGradient: "linear-gradient(90deg, #475569 0%, #64748B 25%, #334155 50%, #64748B 75%, #475569 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(71,85,105,0.25))",
  },
  // 10 — SLAB IQ
  {
    tagline: (<>The <strong>smartest tool ever built</strong> for graded card collectors. Track every slab. Monitor pop reports. <em>Predict price moves before the market reacts.</em></>),
    stats: [
      { value: "PSA · BGS · SGC", label: "All Graders",  color: "#B45309", small: true },
      { value: "LIVE",            label: "Pop Tracking", color: "#F59E0B" },
      { value: "AI-PREDICTED",    label: "Trends",       color: "#10B981", small: true },
    ],
    bullets: [
      <>Track every slab you own with <strong>live valuation by grade</strong></>,
      <>Get notified the moment <strong>pop reports change</strong> on your cards</>,
      <><strong>AI-predicted price moves</strong> before the market catches up</>,
      <>Sort, search, and value entire grading submissions in seconds</>,
    ],
    footer: "Premium Tool · For Serious Slab Collectors",
    shimmerGradient: "linear-gradient(90deg, #B45309 0%, #F59E0B 25%, #FBBF24 50%, #F59E0B 75%, #B45309 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(180,83,9,0.3))",
  },
  // 11 — INVENTORY
  {
    tagline: (<>One home for <strong>every card you own</strong>. Scan, organize, value, and track your entire collection — raw and graded — <em>without a spreadsheet.</em></>),
    stats: [
      { value: "∞",       label: "Cards",           color: "#16A34A" },
      { value: "LIVE",    label: "Valuations",      color: "#F59E0B" },
      { value: "RAW + GRADED", label: "Both Types", color: "#3B82F6", small: true },
    ],
    bullets: [
      <>Scan any card with your camera — <strong>auto-identified in seconds</strong></>,
      <>Live value updates — <strong>never wonder what your collection is worth</strong></>,
      <>Filter and sort by player, set, grade, <strong>profit potential</strong></>,
      <>See which cards <strong>moved in value</strong> since you added them</>,
    ],
    footer: "Your Collection · Valued · Always",
    shimmerGradient: "linear-gradient(90deg, #16A34A 0%, #4ADE80 25%, #15803D 50%, #4ADE80 75%, #16A34A 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(22,163,74,0.3))",
  },
  // 12 — LIVE MARKET
  {
    tagline: (<>A <strong>live feed of every card moving</strong> on the market right now — filtered to what you actually care about. <em>Never miss a hot drop.</em></>),
    stats: [
      { value: "LIVE",    label: "Market Feed",   color: "#EA580C" },
      { value: "4+",      label: "Platforms",     color: "#10B981" },
      { value: "INSTANT", label: "Filters",       color: "#F59E0B" },
    ],
    bullets: [
      <>Real-time feed of cards <strong>selling right now</strong> across all platforms</>,
      <>Filter by sport, set, player, grade — <strong>see only what matters to you</strong></>,
      <>Spot <strong>trending cards</strong> before prices spike</>,
      <><strong>Price history overlays</strong> — know if today&apos;s price is a deal or a trap</>,
    ],
    footer: "Live Market · Real Time · Every Platform",
    shimmerGradient: "linear-gradient(90deg, #EA580C 0%, #FB923C 25%, #C2410C 50%, #FB923C 75%, #EA580C 100%)",
    shimmerDropShadow: "drop-shadow(0 2px 4px rgba(234,88,12,0.3))",
  },
];

const OUTLINED_GREEN_STYLE: React.CSSProperties = {
  color: "#10B981",
  WebkitTextStroke: "1.8px #0A0A0B",
  paintOrder: "stroke fill",
  textShadow: "0 2px 0 rgba(0,0,0,0.08)",
  fontStyle: "normal",
};

function ToolCard({
  card,
  angle,
  isFocused,
  onCardHover,
  onCardLeave,
  onCardClick,
}: {
  card: typeof TOOL_CARDS[number];
  angle: number;
  isFocused: boolean;
  onCardHover: () => void;
  onCardLeave: () => void;
  onCardClick: () => void;
}) {
  const { Icon } = card;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "340px",
        height: "480px",
        borderRadius: "0",
        overflow: "visible",
        background: "transparent",
        backfaceVisibility: "hidden",
        transform: `rotateY(${angle}deg) translateZ(550px)`,
        opacity: isFocused ? 0 : 1,
        transition: "opacity 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={onCardHover}
      onMouseLeave={onCardLeave}
      onClick={(e) => { e.stopPropagation(); onCardClick(); }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${card.name}`}
    >
      {card.screenshot ? (
        <img
          src={card.screenshot}
          alt={`${card.name} preview`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
            filter: "none",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: card.tint,
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageIcon size={56} color="rgba(0,0,0,0.18)" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

function Stat({ color, value, label }: { color: string; value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          fontSize: "52px",
          lineHeight: 1,
          color,
          fontStyle: "normal",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.08em",
          color: "#6B7280",
          marginTop: "6px",
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FeatureTile({
  icon,
  accent,
  title,
  desc,
  highlight,
}: {
  icon: React.ReactNode;
  accent: string;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    // GSAP hover animation
    const handleEnter = () => {
      gsap.to(tile, {
        y: -6,
        scale: 1.03,
        boxShadow: highlight
          ? `0 20px 40px ${accent}40, 0 8px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)`
          : "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        duration: 0.35,
        ease: "power2.out",
      });
    };
    const handleLeave = () => {
      gsap.to(tile, {
        y: 0,
        scale: 1,
        boxShadow: highlight
          ? `0 10px 30px ${accent}30, 0 4px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)`
          : "0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        duration: 0.35,
        ease: "power2.out",
      });
    };
    tile.addEventListener("mouseenter", handleEnter);
    tile.addEventListener("mouseleave", handleLeave);
    return () => {
      tile.removeEventListener("mouseenter", handleEnter);
      tile.removeEventListener("mouseleave", handleLeave);
    };
  }, [accent, highlight]);

  return (
    <div
      ref={tileRef}
      className="cv-feature-tile"
      style={{
        position: "relative",
        flex: "0 0 auto",
        width: "200px",
        scrollSnapAlign: "start",
        background: highlight
          ? `linear-gradient(135deg, white 0%, ${accent}08 100%)`
          : "linear-gradient(135deg, white 0%, #FAFBFC 100%)",
        border: highlight ? `2px solid ${accent}` : "1px solid rgba(0,0,0,0.06)",
        borderRadius: "16px",
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: highlight
          ? `0 10px 30px ${accent}30, 0 4px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)`
          : "0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient accent corner */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      {/* Icon chip */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: `linear-gradient(135deg, ${accent}18 0%, ${accent}28 100%)`,
          color: accent,
          flexShrink: 0,
          boxShadow: `0 2px 8px ${accent}20`,
        }}
      >
        {icon}
      </div>
      {/* Title */}
      <div
        style={{
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          fontSize: "20px",
          lineHeight: 1.1,
          letterSpacing: "0.03em",
          color: "#0A0A0B",
        }}
      >
        {title}
      </div>
      {/* Description */}
      <div
        style={{
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          fontSize: "13.5px",
          lineHeight: 1.5,
          color: "#6B7280",
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function SniperBullseye() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const acqRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: number[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(window.setTimeout(fn, delay));
    };

    function runCycle() {
      const wrap = wrapRef.current;
      const dot = dotRef.current;
      const flash = flashRef.current;
      const cornersEl = cornersRef.current;
      const acq = acqRef.current;
      const lock = lockRef.current;
      const fire = fireRef.current;
      const stack = stackRef.current;
      const reveal = revealRef.current;
      if (!wrap || !dot || !flash || !cornersEl || !acq || !lock || !fire || !stack || !reveal) return;

      const corners = cornersEl.querySelectorAll<HTMLDivElement>(".cv-bull-corner");
      const letters = reveal.querySelectorAll<HTMLSpanElement>(".cv-bull-letter");

      // RESET
      wrap.style.transition = "none";
      wrap.style.transform = "rotate(0deg) scale(1)";
      wrap.style.opacity = "1";
      dot.style.background = "#F97316";
      corners.forEach((c) => {
        c.style.transform = "scale(1)";
        c.style.opacity = "1";
      });
      flash.style.opacity = "0";
      stack.style.opacity = "1";
      acq.style.opacity = "1";
      acq.style.transform = "translate(-50%, -50%) scale(1)";
      lock.style.opacity = "0";
      lock.style.transform = "translate(-50%, -50%) scale(0.8)";
      fire.style.opacity = "0";
      fire.style.transform = "translate(-50%, -50%) scale(0.8)";
      reveal.style.opacity = "0";
      letters.forEach((l) => {
        l.style.transition = "none";
        l.style.transform = "scale(0)";
        l.style.opacity = "0";
      });
      void wrap.offsetWidth;

      // T=0.8s LOCKED
      schedule(() => {
        corners.forEach((c) => (c.style.transform = "scale(0.78)"));
        acq.style.opacity = "0";
        lock.style.opacity = "1";
        lock.style.transform = "translate(-50%, -50%) scale(1.1)";
        schedule(() => {
          lock.style.transform = "translate(-50%, -50%) scale(1)";
        }, 250);
      }, 800);

      // T=1.7s FIRING
      schedule(() => {
        lock.style.opacity = "0";
        fire.style.opacity = "1";
        fire.style.transform = "translate(-50%, -50%) scale(1.2)";
        schedule(() => {
          fire.style.transform = "translate(-50%, -50%) scale(1)";
        }, 250);
        dot.style.background = "#DC2626";
        flash.style.transition = "opacity 0.15s";
        flash.style.opacity = "1";
      }, 1700);

      // T=1.95s SPIN OUT
      schedule(() => {
        flash.style.opacity = "0";
        wrap.style.transition = "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s";
        wrap.style.transform = "rotate(540deg) scale(1)";
        wrap.style.opacity = "0.32";
        corners.forEach((c) => {
          c.style.transform = "scale(0)";
          c.style.opacity = "0";
        });
        stack.style.opacity = "0";
      }, 1950);

      // T=2.7s REVEAL
      schedule(() => {
        reveal.style.transition = "opacity 0.4s";
        reveal.style.opacity = "1";
        letters.forEach((letter, i) => {
          schedule(() => {
            letter.style.transition =
              "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s";
            letter.style.transform = "scale(1.4)";
            letter.style.opacity = "1";
            schedule(() => {
              letter.style.transform = "scale(1)";
            }, 200);
          }, i * 90);
        });
      }, 2700);

      // T=3.05s CONTINUOUS ROTATION
      schedule(() => {
        wrap.style.transition = "transform 8s linear";
        wrap.style.transform = "rotate(1260deg) scale(1)";
      }, 3050);

      // RESTART
      schedule(runCycle, 8000);
    }

    runCycle();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
        flexShrink: 0,
        opacity: 0.5,
      }}
    >
      <div
        ref={cornersRef}
        style={{ position: "absolute", inset: "40px", pointerEvents: "none", zIndex: 4 }}
      >
        <div
          className="cv-bull-corner"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "20px",
            height: "20px",
            borderTop: "3px solid #F97316",
            borderLeft: "3px solid #F97316",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className="cv-bull-corner"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "20px",
            height: "20px",
            borderTop: "3px solid #F97316",
            borderRight: "3px solid #F97316",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className="cv-bull-corner"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "20px",
            height: "20px",
            borderBottom: "3px solid #F97316",
            borderLeft: "3px solid #F97316",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <div
          className="cv-bull-corner"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "20px",
            height: "20px",
            borderBottom: "3px solid #F97316",
            borderRight: "3px solid #F97316",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>

      <div
        ref={wrapRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "116px",
          height: "116px",
          margin: "-58px 0 0 -58px",
          transformOrigin: "58px 58px",
          zIndex: 3,
          willChange: "transform, opacity",
        }}
      >
        {/* 4 concentric rings */}
        {[
          { size: 100, opacity: 0.45 },
          { size: 70, opacity: 0.55 },
          { size: 42, opacity: 0.65 },
          { size: 20, opacity: 0.8 },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${r.size}px`,
              height: `${r.size}px`,
              border: `3px solid rgba(0,0,0,${r.opacity})`,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
        {/* Crosshair arms */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "3px", height: "24px", background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "3px", height: "24px", background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "24px", height: "3px", background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "24px", height: "3px", background: "rgba(0,0,0,0.55)" }} />
        {/* Center dot */}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#F97316",
            boxShadow: "0 0 8px rgba(249,115,22,0.8)",
            transition: "all 0.2s ease",
          }}
        />
      </div>

      {/* Fire flash */}
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, rgba(249,115,22,0.7) 0%, transparent 60%)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Status stack */}
      <div
        ref={stackRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 7,
          pointerEvents: "none",
        }}
      >
        <div
          ref={acqRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap",
            padding: "3px 8px 3px 7px",
            background: "rgba(10,10,11,0.9)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "4px",
            transition: "opacity 0.25s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "white",
              animation: "cv-bull-acq-blink 1s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), 'JetBrains Mono', monospace",
              fontSize: "8px",
              color: "white",
              letterSpacing: "0.28em",
              fontWeight: 700,
            }}
          >
            ACQUIRING
          </span>
        </div>

        <div
          ref={lockRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.8)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap",
            padding: "3px 8px 3px 7px",
            background: "rgba(249,115,22,0.95)",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "4px",
            boxShadow: "0 3px 12px rgba(249,115,22,0.55)",
            opacity: 0,
            transition: "opacity 0.25s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
          <span
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "12px",
              color: "white",
              letterSpacing: "0.1em",
              fontWeight: 900,
            }}
          >
            LOCKED
          </span>
        </div>

        <div
          ref={fireRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.8)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap",
            padding: "3px 10px 3px 8px",
            background: "rgba(220,38,38,0.95)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(220,38,38,0.65)",
            opacity: 0,
            transition: "opacity 0.25s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderLeft: "2.5px solid transparent",
              borderRight: "2.5px solid transparent",
              borderTop: "6px solid white",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "13px",
              color: "white",
              letterSpacing: "0.12em",
              fontWeight: 900,
            }}
          >
            FIRING
          </span>
        </div>
      </div>

      {/* SNIPED reveal */}
      <div
        ref={revealRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          zIndex: 6,
          textAlign: "center",
          pointerEvents: "none",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontSize: "28px",
            color: "#10B981",
            letterSpacing: "0.04em",
            fontWeight: 900,
            lineHeight: 0.85,
            textShadow: "0 0 16px rgba(16,185,129,0.85)",
            whiteSpace: "nowrap",
            display: "inline-flex",
            WebkitTextStroke: "1px #0A0A0B",
            paintOrder: "stroke fill",
          }}
        >
          {["S", "N", "I", "P", "E", "D"].map((letter, i) => (
            <span
              key={i}
              className="cv-bull-letter"
              style={{ display: "inline-block", transform: "scale(0)", opacity: 0 }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "5px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "3px 7px",
              background: "#0A0A0B",
              borderRadius: "3px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "9px", color: "white", fontWeight: 900, letterSpacing: "0.06em" }}>IN</span>
            <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "9px", color: "#10B981", fontWeight: 900, margin: "0 3px" }}>4.3</span>
            <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "9px", color: "white", fontWeight: 900, letterSpacing: "0.06em" }}>SEC</span>
          </span>
        </div>
        <div style={{ marginTop: "5px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 7px 3px 5px",
              background: "white",
              border: "1px solid #10B981",
              borderRadius: "5px",
              boxShadow: "0 4px 12px rgba(16,185,129,0.25)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
                padding: "1px 3px",
                background: "#0A0A0B",
                borderRadius: "2px",
              }}
            >
              <span style={{ fontFamily: "Arial Black, sans-serif", fontSize: "7px", fontWeight: 900, color: "white", letterSpacing: "-0.04em", fontStyle: "italic" }}>PSA</span>
              <span style={{ fontFamily: "Arial Black, sans-serif", fontSize: "8px", fontWeight: 900, color: "white" }}>10</span>
            </span>
            <span style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif", fontSize: "12px", color: "#10B981", fontWeight: 900 }}>$430</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [isPaused, setIsPaused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [mouseInsideFocused, setMouseInsideFocused] = useState(false);
  const [cardSourcePosition, setCardSourcePosition] = useState<{ x: number; y: number } | null>(null);
  const isPausedRef = useRef(false);
  const focusedIndexRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep refs in sync with state so rAF loop always reads live values
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { focusedIndexRef.current = focusedIndex; }, [focusedIndex]);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      if (focusedIndexRef.current === null && !isPausedRef.current) {
        rotationRef.current = (rotationRef.current + (delta / 1000) * 6) % 360;
        if (stageRef.current) {
          stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []); // runs once — reads live values via refs

  // Lock body scroll when popup is open
  useEffect(() => {
    if (focusedIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [focusedIndex]);

  // Cancel pending hover popup if the user starts scrolling
  useEffect(() => {
    function onScroll() {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        background: "#FAFAFA",
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "72px 10% 96px",
        }}
        className="cv-hero-inner"
      >
        <div
          className="cv-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.5fr)",
            gap: "clamp(40px, 4vw, 80px)",
            alignItems: "start",
            minHeight: "740px",
          }}
        >
          {/* LEFT — text */}
          <div style={{ position: "relative", zIndex: 10, paddingTop: "40px", paddingRight: "20px", background: "#FAFAFA" }}>
            <h1
              style={{
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)",
                lineHeight: "0.88",
                letterSpacing: "-0.015em",
                color: "#0A0A0B",
                fontStyle: "normal",
                margin: 0,
              }}
            >
              <div>
                THE <span style={OUTLINED_GREEN_STYLE}>ALL-IN-ONE</span>
              </div>
              <div style={{ whiteSpace: "nowrap" }}>CARD VALUE PLATFORM</div>
              <div>
                THAT <span style={OUTLINED_GREEN_STYLE}>ACTUALLY WORKS</span>.
              </div>
            </h1>

            {/* TRY FREE bubble under the headline (shown on desktop + mobile) */}
            <button
              type="button"
              className="cv-hero-tryfree-mobile"
              style={{
                display: "inline-flex",
                marginTop: "28px",
                marginLeft: "auto",
                marginRight: "auto",
                background: "#0A0A0B",
                color: "#FFFFFF",
                border: "1.5px solid #10B981",
                padding: "14px 28px",
                borderRadius: "100px",
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "22px",
                letterSpacing: "0.08em",
                cursor: "pointer",
                alignItems: "center",
                gap: "8px",
                animation: "cv-cta-glow 2.4s ease-in-out infinite",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              <Zap size={16} strokeWidth={2} color="#10B981" />
              <span style={{ color: "#FFFFFF" }}>TRY FREE</span>
              <span style={{ color: "#FFFFFF", fontSize: "15px" }}>→</span>
            </button>

            {/* WHY WE'RE SO DIFFERENT — big bold with double amber underline */}
            <div style={{ marginTop: "36px", marginBottom: "26px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                  fontSize: "clamp(3rem, 5.5vw, 4.5rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.015em",
                  color: "#0A0A0B",
                  display: "inline-block",
                  position: "relative",
                  paddingBottom: "16px",
                  fontStyle: "normal",
                }}
              >
                WHY WE&apos;RE SO DIFFERENT
                {/* Thick amber underline */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: "6px",
                    height: "3px",
                    background: "#F59E0B",
                    borderRadius: "2px",
                  }}
                />
                {/* Thin amber underline below */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "1.5px",
                    background: "#F59E0B",
                    opacity: 0.5,
                    borderRadius: "1px",
                  }}
                />
              </span>
            </div>

            {/* FEATURE MARQUEE — auto-scrolling row */}
            <div
              className="cv-feature-marquee"
              style={{
                position: "relative",
                width: "100%",
                padding: "26px 0 18px",
                overflow: "hidden",
                maskImage:
                  "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
              }}
            >
              <div
                className="cv-feature-track"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "14px",
                  width: "max-content",
                  animation: "cv-feature-scroll 32s linear infinite",
                }}
              >
                {[0, 1].map((dup) => (
                  <div
                    key={dup}
                    aria-hidden={dup === 1}
                    style={{ display: "flex", flexWrap: "nowrap", gap: "14px", flexShrink: 0 }}
                  >
                    <FeatureTile
                      icon={<Database size={24} strokeWidth={2} />}
                      accent="#10B981"
                      title="16 MILLION CARDS"
                      desc="The deepest card database on the internet."
                    />
                    <FeatureTile
                      icon={<Eye size={24} strokeWidth={2} />}
                      accent="#3B82F6"
                      title="AI VISION"
                      desc="Reads card info accurately — every time."
                    />
                    <FeatureTile
                      icon={<Sparkles size={24} strokeWidth={2} />}
                      accent="#8B5CF6"
                      title="TRAINED INTELLIGENCE"
                      desc="Knows variations, autos, limited, and parallels."
                    />
                    <FeatureTile
                      icon={<BarChart3 size={24} strokeWidth={2} />}
                      accent="#EC4899"
                      title="BULK VALUES"
                      desc="Price your whole collection in seconds."
                    />
                    <FeatureTile
                      icon={<Wrench size={24} strokeWidth={2} />}
                      accent="#F59E0B"
                      title="TOOLS THAT PAY"
                      desc="Built to find profit, not just look at cards."
                    />
                    <FeatureTile
                      icon={<Crosshair size={24} strokeWidth={2} />}
                      accent="#EF4444"
                      title="VIDEO SNIPER"
                      desc="Live stream card values in under 5 seconds."
                      highlight
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — turntable */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "820px",
              overflow: "hidden",
            }}
          >
          {/* OUTER: carousel viewport — pauses spin on hover, fires popup on card hover */}
          <div
            data-carousel-viewport
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              if (!mouseInsideFocused && focusedIndex === null) {
                setCardSourcePosition(null);
              }
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget && focusedIndex !== null) {
                setFocusedIndex(null);
                setMouseInsideFocused(false);
                setCardSourcePosition(null);
              }
            }}
            style={{
              position: "relative",
              width: "280%",
              height: "820px",
              marginLeft: "-90%",
              perspective: "1400px",
              perspectiveOrigin: "50% 50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "40px",
            }}
          >
            {/* STAGE: rAF-driven, no CSS animation */}
            <div
              ref={stageRef}
              style={{
                position: "relative",
        width: "340px",
        height: "480px",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {TOOL_CARDS.map((card, i) => (
                <ToolCard
                  key={card.name}
                  card={card}
                  angle={(360 / TOOL_CARDS.length) * i}
                  isFocused={focusedIndex === i}
                  onCardHover={() => {
                    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                    hoverTimerRef.current = setTimeout(() => setFocusedIndex(i), 900);
                  }}
                  onCardLeave={() => {
                    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
                  }}
                  onCardClick={() => {
                    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                    setFocusedIndex(i);
                  }}
                />
              ))}
            </div>

            {/* POPUP — portal to document.body so position:fixed escapes perspective ancestor */}
            {focusedIndex !== null && typeof document !== "undefined" && (createPortal((() => {
              const card = TOOL_CARDS[focusedIndex];
              const { Icon } = card;
              return (
                <>
                  {/* Backdrop — tap to close */}
                  <div
                    onClick={() => {
                      setFocusedIndex(null);
                      setMouseInsideFocused(false);
                      setCardSourcePosition(null);
                    }}
                    style={{
                      position: "fixed",
                      inset: 0,
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(4px)",
                      zIndex: 9998,
                      animation: "cv-fade-in 0.2s ease forwards",
                    }}
                  />
                <div
                  className="cv-popup-panel"
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(980px, 94vw)",
                    maxHeight: "min(92vh, 760px)",
                    zIndex: 9999,
                    pointerEvents: "auto",
                    animation: "cv-popup-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                    transformOrigin: "center center",
                  }}
                  onMouseEnter={() => setMouseInsideFocused(true)}
                >
                  <div
                    className="cv-popup-grid"
                    style={{
                      width: "100%",
                      maxHeight: "min(92vh, 760px)",
                      borderRadius: "24px",
                      background: "white",
                      boxShadow: "0 50px 120px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.06)",
                      display: "grid",
                      gridTemplateColumns: "300px 1fr",
              overflow: "visible",
                      position: "relative",
                    }}
                  >
                    {(() => {
                      const detail = TOOL_DETAILS[focusedIndex];
                      return (
                        <>
                          {/* LEFT HERO PANEL */}
                          <div
                            style={{
                              position: "relative",
                              background: `linear-gradient(135deg, ${card.tint} 0%, ${card.tint}dd 100%)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "18px",
                            }}
                          >
                            {/* Icon pill */}
                            <div
                              style={{
                                position: "absolute",
                                top: "16px",
                                left: "16px",
                                width: "46px",
                                height: "46px",
                                borderRadius: "13px",
                                background: "white",
                                border: "0.5px solid rgba(0,0,0,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              }}
                            >
                              <Icon size={22} color={card.accent} strokeWidth={2} />
                            </div>
                            {/* Badge */}
                            <span
                              style={{
                                position: "absolute",
                                top: "16px",
                                right: "16px",
                                background: "#0A0A0B",
                                color: "white",
                                fontFamily: "var(--font-geist-mono), monospace",
                                fontSize: "13px",
                                padding: "5px 11px",
                                borderRadius: "6px",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {card.badge}
                            </span>
                            {/* App screenshot */}
                            {card.screenshot ? (
                              <img
                                src={card.screenshot}
                                alt={`${card.name} screenshot`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  minHeight: "240px",
                                  objectFit: "cover",
                                  objectPosition: "top center",
                                  borderRadius: "16px",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  minHeight: "240px",
                                  height: "100%",
                                  borderRadius: "16px",
                                  background: "rgba(255,255,255,0.55)",
                                  backdropFilter: "blur(8px)",
                                  border: "2px dashed rgba(0,0,0,0.12)",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "12px",
                                }}
                              >
                                <ImageIcon size={50} color="rgba(0,0,0,0.22)" strokeWidth={1.5} />
                                <span
                                  style={{
                                    fontFamily: "var(--font-geist-mono), monospace",
                                    fontSize: "10.5px",
                                  }}
                                >
                                  Tool screenshot
                                </span>
                              </div>
                            )}
                          </div>

                          {/* RIGHT CONTENT PANEL */}
                          <div
                            style={{
                    padding: "28px 40px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                              textAlign: "center",
                            }}
                          >
                            {/* Name with shimmer */}
                            <div
                              style={{
                                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                                fontSize: "54px",
                                lineHeight: 0.9,
                                letterSpacing: "0.025em",
                              }}
                            >
                              <span
                                style={{
                                  backgroundImage: detail.shimmerGradient,
                                  backgroundSize: "250% 100%",
                                  backgroundColor: "transparent",
                                  WebkitBackgroundClip: "text",
                                  backgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  color: "transparent",
                                  WebkitTextStroke: "1.5px #0A0A0B",
                                  paintOrder: "stroke fill",
                                  filter: detail.shimmerDropShadow,
                                  animation: "cv-popup-shimmer 4s linear infinite",
                                  display: "inline-block",
                                  padding: "0",
                                  margin: "0",
                                }}
                              >
                                {card.name}
                              </span>
                            </div>

                            {/* Tagline */}
                            <div
                              style={{
                                fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                    fontSize: "26px",
                      lineHeight: 1.55,
                      color: "#0A0A0B",
                      maxWidth: "560px",
                                margin: "0 auto",
                                fontWeight: 500,
                              }}
                            >
                              {detail.tagline}
                            </div>

                            {/* Stats row */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                      gap: "36px",
                      padding: "14px 0",
                                borderTop: "0.5px solid rgba(0,0,0,0.1)",
                                borderBottom: "0.5px solid rgba(0,0,0,0.1)",
                              }}
                            >
                              {detail.stats.map((stat, i) => (
                                <div key={i} style={{ textAlign: "center" }}>
                                  <div
                                    style={{
                                      fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                                      fontSize: stat.small ? "22px" : "30px",
                                      lineHeight: 1,
                                      color: stat.color,
                                    }}
                                  >
                                    {stat.value}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "10.5px",
                                      letterSpacing: "0.1em",
                                      color: "#6B7280",
                                      marginTop: "6px",
                                      textTransform: "uppercase",
                                      lineHeight: 1.2,
                                      fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                                    }}
                                  >
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Bullets */}
                            <ul
                              style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                      gap: "9px",
                      alignItems: "flex-start",
                      textAlign: "left",
                      maxWidth: "560px",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            >
                              {detail.bullets.map((bullet, i) => (
                                <li
                                  key={i}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "11px",
                                    fontSize: "15px",
                                    lineHeight: 1.45,
                                    color: "#0A0A0B",
                                    fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                                  }}
                                >
                                  <span
                                    style={{
                                      flexShrink: 0,
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                      background: "#10B981",
                                      color: "white",
            fontSize: "22px",
                                      fontWeight: 900,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginTop: "2px",
                                    }}
                                  >
                                    ✓
                                  </span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Footer */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: "12px",
                                borderTop: "0.5px dashed rgba(0,0,0,0.1)",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "var(--font-geist-mono), monospace",
                                  fontSize: "11.5px",
                                  letterSpacing: "0.14em",
                                  color: "#6B7280",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                }}
                              >
                                {detail.footer}
                              </div>
                            </div>
                          </div>

                          {/* Close button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFocusedIndex(null);
                              setMouseInsideFocused(false);
                              setCardSourcePosition(null);
                            }}
                            style={{
                              position: "absolute",
                              top: "16px",
                              right: "16px",
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.95)",
                              border: "0.5px solid rgba(0,0,0,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              zIndex: 20,
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              fontSize: "22px",
                              lineHeight: 1,
                              color: "#0A0A0B",
                            }}
                            aria-label="Close detail panel"
                          >
                            ×
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
                </>
              );
            })(), document.body) as any)}

            {/* Floor shadow — absolutely positioned relative to outer flex container */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "60px",
                transform: "translateX(-50%)",
                width: "78%",
                height: "58px",
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)",
                filter: "blur(10px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          </div>
          </div>  {/* end clip wrapper */}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// EXPORT — Renders Nav + Hero together
// =============================================================================

export default function TopHero() {
  return (
    <>
      <style jsx global>{`
        @keyframes cv-popup-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.85);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes cv-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cv-feature-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 7px)); }
        }
        @keyframes cv-sniper-value-fly {
          0% {
            opacity: 0;
            transform: translate(-50%, 32px) scale(2.4);
            filter: blur(6px);
          }
          22% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
            filter: blur(0);
          }
          70% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
            filter: blur(0);
          }
          88% {
            opacity: 0;
            transform: translate(-50%, -10px) scale(0.85);
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -10px) scale(0.85);
          }
        }
        .cv-feature-marquee:hover .cv-feature-track {
          animation-play-state: paused;
        }
        @keyframes cv-turntable-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes cv-ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes cv-live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes cv-cta-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16,185,129,0.55), 0 8px 18px rgba(0,0,0,0.25);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(16,185,129,0), 0 8px 18px rgba(0,0,0,0.25);
          }
        }
        @keyframes cv-sniper-tile-pulse {
          0%, 100% {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.08),
              0 0 0 0 rgba(245,158,11,0.55),
              0 18px 42px rgba(245,158,11,0.45),
              0 4px 10px rgba(0,0,0,0.25);
          }
          50% {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.08),
              0 0 0 12px rgba(245,158,11,0),
              0 18px 42px rgba(245,158,11,0.55),
              0 4px 10px rgba(0,0,0,0.25);
          }
        }
        @keyframes cv-sniper-shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes cv-sniper-tile-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cv-sniper-bubble-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16,185,129,0.5), 0 4px 12px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(16,185,129,0), 0 4px 12px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
            transform: scale(1.03);
          }
        }
        @keyframes cv-sniper-dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes cv-sniper-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes cv-bull-acq-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes cv-popup-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 250% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="cv-live-pulse"],
          [style*="cv-cta-glow"],
          [style*="cv-sniper-bubble-pulse"],
          [style*="cv-sniper-shift"],
          [style*="cv-popup-in"],
          [style*="cv-popup-shimmer"] {
            animation: none !important;
          }
          /* INTENTIONAL: ticker scroll is NOT disabled — it's content, not decoration */
        }

        /* Tablet: 768px–1279px */
        @media (max-width: 1279px) {
          .cv-hero-grid {
            gap: 48px !important;
          }
        }

        /* Desktop: ≥1024px — lock sizes, prevent shrinking */
        @media (min-width: 1024px) {
          .cv-hero-inner {
            min-width: 1000px !important;
            overflow-x: auto !important;
          }
          .cv-hero-grid {
            min-width: 960px !important;
          }
          .cv-mobile-sniper-tile {
            transform: scale(1.16);
            transform-origin: top right;
          }
          .cv-nav-row {
            padding-right: 200px !important;
          }
          /* Hide the under-headline TRY FREE bubble on desktop — CTA lives in the nav header */
          .cv-hero-tryfree-mobile {
            display: none !important;
          }
          /* Desktop feature grid: 2 rows of 3 tiles */
          .cv-feature-marquee {
            overflow: visible !important;
            -webkit-mask-image: none !important;
            mask-image: none !important;
            padding: 24px 0 12px !important;
          }
          .cv-feature-track {
            animation: none !important;
            display: grid !important;
            grid-template-columns: repeat(3, 190px) !important;
            grid-template-rows: auto auto !important;
            gap: 12px !important;
            width: auto !important;
            transform: none !important;
          }
          /* Hide the duplicated marquee copy on desktop */
          .cv-feature-track > div[aria-hidden="true"] {
            display: none !important;
          }
          /* First (visible) copy contributes its tiles directly into the grid */
          .cv-feature-track > div:first-child {
            display: contents !important;
          }
          .cv-feature-tile {
            width: 190px !important;
            min-width: 190px !important;
            flex: 0 0 190px !important;
            aspect-ratio: auto !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            overflow: visible !important;
            padding: 14px 14px !important;
            gap: 7px !important;
            justify-content: flex-start !important;
          }
          .cv-feature-tile > div:nth-child(2) {
            width: 44px !important;
            height: 44px !important;
            min-width: 44px !important;
            border-radius: 12px !important;
          }
          .cv-feature-tile > div:nth-child(2) svg {
            width: 22px !important;
            height: 22px !important;
          }
          .cv-feature-tile > div:nth-child(3) {
            font-size: 20px !important;
            line-height: 1.1 !important;
          }
          .cv-feature-tile > div:nth-child(4) {
            font-size: 13.5px !important;
            line-height: 1.5 !important;
          }
        }

        /* Mid-desktop: 1024px–1279px ��� maintain sizes, allow horizontal scroll */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .cv-hero-grid {
            gap: 32px !important;
            min-width: 960px !important;
          }
          .cv-hero-grid > div:last-child {
            height: 700px !important;
            min-width: 500px !important;
          }
          .cv-hero-grid h1 {
            font-size: 3.5rem !important;
          }
        }

        /* Tablet: ≤1023px — stack columns */
        @media (max-width: 1023px) {
          .cv-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            min-height: auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .cv-hero-grid > div {
            min-width: 0 !important;
            max-width: 100% !important;
          }
          .cv-hero-inner {
            padding: 56px 40px 80px !important;
            overflow-x: hidden !important;
          }
          .cv-hero-grid > div:last-child {
            height: 520px !important;
            overflow: hidden !important;
          }
        }

        /* Mobile: ≤640px */
        @media (max-width: 640px) {
          /* Hero text — centered, full width, larger */
          .cv-hero-grid > div:first-child {
            text-align: center !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .cv-hero-grid h1 {
            font-size: clamp(3.25rem, 10.5vw, 5rem) !important;
            line-height: 0.95 !important;
            text-align: center !important;
            width: 100% !important;
          }
          /* Force the headline to render as 3 lines (no extra wrapping) */
          .cv-hero-grid h1 div {
            white-space: nowrap !important;
          }
          /* WHY WE'RE SO DIFFERENT centered + bigger */
          .cv-hero-grid > div:first-child > div {
            text-align: center !important;
          }
          .cv-hero-grid > div:first-child > div > span {
            font-size: 44px !important;
            line-height: 1 !important;
            white-space: nowrap !important;
            display: inline-block !important;
          }
          /* Feature marquee — auto-scrolling marquee on mobile */
          .cv-feature-marquee {
            margin-left: -16px !important;
            margin-right: -16px !important;
            padding: 16px 0 10px !important;
            overflow: hidden !important;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%) !important;
            mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%) !important;
          }
          .cv-feature-track {
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 12px !important;
            width: max-content !important;
            animation: cv-feature-scroll 22s linear infinite !important;
          }
          .cv-feature-track > div {
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 12px !important;
            flex-shrink: 0 !important;
          }
          .cv-feature-track > div[aria-hidden="true"] {
            display: flex !important;
          }
          .cv-feature-tile {
            width: 160px !important;
            min-width: 160px !important;
            flex: 0 0 160px !important;
            padding: 12px 12px !important;
          }
          /* Turntable: move up, reduce gap */
          .cv-hero-grid > div:last-child {
            height: 380px !important;
            margin-top: -40px !important;
            margin-bottom: 0 !important;
            overflow: visible !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .cv-hero-grid > div:last-child > div:first-child {
            transform: scale(0.55) !important;
            transform-origin: center center !important;
            width: 100% !important;
            margin-left: 0 !important;
            display: flex !important;
            justify-content: center !important;
          }
          /* Tighten hero stack spacing too */
          .cv-hero-grid {
            gap: 24px !important;
          }
          .cv-hero-inner {
            padding-bottom: 32px !important;
          }
          /* Popup — smaller, single-column, centered on mobile */
          .cv-popup-panel {
            width: 92vw !important;
            max-height: 84vh !important;
          }
          .cv-popup-grid {
            grid-template-columns: 1fr !important;
            max-height: 84vh !important;
            overflow-y: auto !important;
          }
          /* Stats — uniform 5-column grid on mobile, small even text */
          .cv-hero-stats {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 6px !important;
            padding: 16px 0 !important;
          }
          .cv-hero-stats > div {
            min-width: 0;
          }
          .cv-hero-stats > div > div:first-child {
            font-size: 20px !important;
            line-height: 1.05 !important;
            white-space: nowrap !important;
          }
          .cv-hero-stats > div > div:last-child {
            font-size: 9px !important;
            line-height: 1.15 !important;
            letter-spacing: 0.06em !important;
            margin-top: 4px !important;
          }
          .cv-sniper-stripe {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          /* Nav links hide on mobile */
          .cv-nav-links {
            display: none !important;
          }
          /* Hamburger shows on mobile */
          .cv-nav-hamburger {
            display: inline-flex !important;
          }
          /* Hide desktop TRY FREE on mobile (it's now under the headline) */
          .cv-nav-cta {
            display: none !important;
          }
          /* Hide Sign in on mobile (lives in dropdown) */
          .cv-nav-signin {
            display: none !important;
          }
          /* Mobile sniper tile shows */
          .cv-mobile-sniper-tile {
            display: flex !important;
          }
          /* Mobile TRY FREE bubble under headline shows — centered, larger */
          .cv-hero-tryfree-mobile {
            display: inline-flex !important;
            font-size: 22px !important;
            padding: 14px 28px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          /* Mobile menu panel shows when open */
          .cv-mobile-menu {
            display: flex !important;
          }
          /* Nav row tightens — extra right padding reserves space for the absolute sniper tile */
          .cv-nav-row {
            padding: 0 158px 0 12px !important;
            gap: 8px !important;
          }
          /* Logo shrinks slightly on mobile */
          .cv-nav-logo {
            width: 48px !important;
            height: 48px !important;
            font-size: 22px !important;
            border-radius: 11px !important;
            border-width: 2px !important;
          }
          .cv-nav-brand {
            gap: 8px !important;
          }
          /* Wordmark stays in the header on mobile, just smaller */
          .cv-nav-wordmark {
            font-size: 18px !important;
          }
          /* CTA shrinks */
          .cv-nav-cta {
            padding: 9px 14px !important;
            font-size: 14px !important;
          }
          /* Sign-in hides */
          .cv-nav-signin {
            display: none !important;
          }
          /* Ticker stays scrolling but tightens */
          .cv-ticker {
            height: 32px !important;
            font-size: 11px !important;
            padding: 0 16px !important;
          }
        }
      `}</style>

      <Navigation />
      <Hero />
    </>
  );
}
