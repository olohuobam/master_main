"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import gsap from "gsap";

// ─── Animated dashboard chips (GSAP) ─────────────────────────────────────────
const DASHBOARD_CHIPS = [
  { label: "Portfolio value", color: "var(--cv-accent-purple)" },
  { label: "Top movers", color: "var(--cv-accent-emerald)" },
  { label: "Market sentiment", color: "#2563EB" },
  { label: "KPI breakdowns", color: "var(--cv-accent-purple)" },
  { label: "Aging inventory", color: "#D97706" },
  { label: "Macro trends", color: "var(--cv-accent-emerald)" },
];

function DashboardChips() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chips = Array.from(
      container.querySelectorAll<HTMLElement>("[data-chip]")
    );
    if (chips.length === 0) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      // Staggered pop-in entrance
      gsap.fromTo(
        chips,
        { y: 18, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.6)",
          stagger: 0.07,
          delay: 0.15,
          onComplete: () => {
            // On mobile the chips wrap to multiple lines — a continuous
            // vertical float looks jittery, so use a calm pulse instead.
            if (isMobile) {
              chips.forEach((chip, i) => {
                gsap.to(chip, {
                  scale: 1.04,
                  duration: 1.8,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: true,
                  delay: i * 0.12,
                });
              });
              return;
            }
            // Desktop: continuous gentle floating, each chip offset
            chips.forEach((chip, i) => {
              gsap.to(chip, {
                y: "-=10",
                duration: 1.6 + (i % 3) * 0.3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.15,
              });
            });
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.12,
      y: "-=6",
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 sm:gap-2 lg:gap-3 mt-8 lg:mt-10 w-full max-w-md sm:max-w-none mx-auto"
    >
      {DASHBOARD_CHIPS.map((chip) => (
        <span
          key={chip.label}
          data-chip
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 lg:gap-2 rounded-full border border-[--cv-border] bg-[--cv-bg] px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 text-xs sm:text-sm lg:text-base font-semibold text-[--cv-text] shadow-md cursor-default"
          style={{ willChange: "transform" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: chip.color }}
            aria-hidden="true"
          />
          {chip.label}
        </span>
      ))}
    </div>
  );
}

// ─── Shared animation variants ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Ghost background word (giant, low-opacity display text) ─────────────────
function GhostWord({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none absolute font-display uppercase leading-none whitespace-nowrap text-[--cv-text] ${className}`}
      style={{ letterSpacing: "-0.03em", ...style }}
    >
      {children}
    </span>
  );
}

// ─── Bullet row ─────────────────────────────────────────────────────────────
function Bullet({
  text,
  colorClass,
  bgClass,
}: {
  text: string;
  colorClass: string;
  bgClass: string;
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-[--cv-text-muted] leading-relaxed">
      <span
        className={`w-5 h-5 rounded-full ${bgClass} flex items-center justify-center flex-shrink-0 mt-0.5`}
      >
        <Check className={`w-3 h-3 ${colorClass}`} />
      </span>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </li>
  );
}

// ─── Chart display (real image, no placeholder) ──────────────────────────────
function ChartImage({
  src,
  alt,
  aspectClass,
}: {
  src: string;
  alt: string;
  aspectClass?: string; // when set, forces a fixed height box (object-contain, no crop)
}) {
  return (
    <div className="relative w-full rounded-2xl overflow-visible">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full block rounded-2xl shadow-2xl shadow-black/10 select-none ${
          aspectClass ? `${aspectClass} object-contain object-bottom` : "h-auto"
        }`}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

// ─── Gallery card data ───────────────────────────────────────────────────────
const GALLERY_CARDS = [
  {
    num: "02",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    label: "Movers",
    heading: <>Know what&apos;s moving <span className="text-emerald-600">before everyone else.</span></>,
    body: "We track every card in our 16M+ database every week. See movers before the market does.",
    src: "/charts/chart-2-gainers-losers.png",
    alt: "Top gainers and losers dashboard",
  },
  {
    num: "03",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    label: "Market Sentiment",
    heading: <>Buy the hot ones. <span className="text-amber-600">Skip the overhyped.</span></>,
    body: "Our sentiment model separates real momentum from FOMO-driven spikes that always reverse.",
    src: "/charts/chart-3-hot-buys-overhyped.png",
    alt: "Hot buys versus overhyped dashboard",
  },
  {
    num: "05",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    label: "Dead Stock Alerts",
    heading: <>Find the cards <span className="text-red-600">bleeding you dry.</span></>,
    body: "90, 180, or 365+ days held? They're tying up capital. Sell, trade, or grade before they cost you more.",
    src: "/charts/chart-5-aging-inventory.png",
    alt: "Aging inventory dashboard",
  },
  {
    num: "06",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    label: "Macro Trends",
    heading: <>Zoom out. <span className="text-blue-600">See the whole market.</span></>,
    body: "Sport-level trends, era breakdowns, grade tier shifts. Make moves based on the macro, not just your collection.",
    src: "/charts/chart-6-market-movements.png",
    alt: "Market movements dashboard",
  },
];

// ─── Infinite auto-scroll gallery ───────────────────────────────────────────
function InfiniteGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  // Duplicate cards so the loop is seamless
  const items = [...GALLERY_CARDS, ...GALLERY_CARDS, ...GALLERY_CARDS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.6; // px per frame

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        // Reset when we've scrolled through exactly one full set (4 cards + gaps)
        const halfWidth = track.scrollWidth / 3;
        if (posRef.current >= halfWidth) {
          posRef.current -= halfWidth;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
        style={{ width: "max-content", paddingLeft: "24px", paddingBottom: "8px" }}
      >
        {items.map((card, i) => (
          <div
            key={i}
            className="flex-none w-[72vw] md:w-[40vw] lg:w-[40vw] flex flex-col"
          >
            <div className="text-center mb-4 px-2 sm:px-3">
              <h4 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-[1.1] text-[--cv-text] text-balance">
                {card.heading}
              </h4>
              <p className="text-sm sm:text-lg md:text-xl lg:text-lg text-[--cv-text-muted] leading-relaxed mt-2 text-pretty">
                {card.body}
              </p>
            </div>
            <div className="mt-auto">
              <ChartImage src={card.src} alt={card.alt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PortfolioAnalytics() {
  return (
    <>
      <section
        id="portfolio"
        className="relative overflow-hidden bg-[--cv-bg]"
        aria-label="Portfolio Analytics"
      >
      {/* ── SUB-SECTION 1: OPENER ─────────────────────────────────────── */}
      <div className="relative w-full px-5 md:px-8 pt-14 md:pt-24 pb-14 md:pb-16 overflow-hidden">
        {/* Giant ghost background words */}
        <GhostWord
          className="top-2 left-1/2 -translate-x-1/2 text-[22vw] opacity-[0.035]"
        >
          Analytics
        </GhostWord>
        <GhostWord
          className="bottom-0 left-1/2 -translate-x-1/2 text-[16vw] opacity-[0.025]"
          style={{ color: "var(--cv-accent-purple)" }}
        >
          Portfolio
        </GhostWord>

        <div className="relative flex flex-col items-center text-center">
          {/* Combined eyebrow — much larger, with divider lines */}
          <motion.div
            {...fadeUp(0)}
            className="flex items-center gap-3 md:gap-5 text-[--cv-accent-purple] max-w-full"
          >
            <span className="hidden sm:block h-px w-8 md:w-16 bg-current opacity-40" aria-hidden="true" />
            <span className="font-display uppercase text-base sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.16em] md:tracking-[0.18em] leading-tight">
              Portfolio Analytics{" "}
              <span className="text-[--cv-text-muted] opacity-60">&middot;</span>{" "}
              Real-Time Collection Intelligence
            </span>
            <span className="hidden sm:block h-px w-8 md:w-16 bg-current opacity-40" aria-hidden="true" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display text-6xl sm:text-7xl md:text-7xl lg:text-[clamp(4rem,8vw,7rem)] leading-[0.95] md:leading-[1.0] tracking-tight text-[--cv-text] mt-5 md:mt-6"
          >
            Every number <span className="text-[--cv-accent-purple]">you need.</span>{" "}
            None you don&apos;t.
          </motion.h2>

          {/* Lead — focal point: bold display statement + animated chips */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative mt-8 md:mt-12 w-full max-w-6xl mx-auto"
          >
            <p className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] md:leading-[1.02] text-balance text-[--cv-text]">
              Six purpose-built dashboards,
              <br className="hidden md:block" />{" "}
              built by collectors{" "}
              <span className="text-[--cv-accent-purple]">who actually sell.</span>
            </p>

            {/* Animated dashboard keyword chips (GSAP) */}
            <DashboardChips />

            <p className="text-sm sm:text-base md:text-lg text-[--cv-text-muted] leading-relaxed text-balance mt-8 md:mt-10 max-w-2xl mx-auto">
              The dashboard most collectors didn&apos;t know they needed
              until they had it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── SUB-SECTION 2: CHARTS 1 + 4 SIDE BY SIDE ─────────────────── */}
      <div className="relative w-full px-5 md:px-12 lg:px-16 pb-14 md:pb-20 overflow-hidden">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 max-w-[108rem] mx-auto">
          
          {/* CHART 1 — Portfolio Overview */}
          <motion.div {...fadeUp(0)} className="flex flex-col">
            <div className="text-center mb-6 flex flex-col justify-end lg:min-h-[8.5rem]">
              <h3 className="chart-headline font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[--cv-text]">
                Your collection. Your numbers.{" "}
                <span className="text-purple-600">Crystal clear.</span>
              </h3>
              <p className="text-base md:text-lg text-[--cv-text-muted] leading-relaxed mt-3">
                Real-time portfolio value, gain/loss tracking, and ROI — all in one place.
              </p>
            </div>
            <div className="relative">
              <ChartImage
                src="/charts/chart-1-collection-numbers.png"
                alt="CardValues portfolio dashboard showing total value, total cards, gain/loss, and PSA 10 potential"
                aspectClass="aspect-[16/10]"
              />
            </div>
            {/* Features row */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 mb-2">
                  <Check className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-sm md:text-base font-semibold text-[--cv-text]">Live Portfolio Value</p>
                <p className="text-xs md:text-sm text-[--cv-text-muted] mt-1">Aggregated market price, updated weekly</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 mb-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-sm md:text-base font-semibold text-[--cv-text]">Gain/Loss Tracking</p>
                <p className="text-xs md:text-sm text-[--cv-text-muted] mt-1">Weekly performance trends</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 mb-2">
                  <Check className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm md:text-base font-semibold text-[--cv-text]">PSA 10 Upside</p>
                <p className="text-xs md:text-sm text-[--cv-text-muted] mt-1">What your raw cards could be worth</p>
              </div>
            </div>
          </motion.div>

          {/* CHART 4 — KPI Table */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col">
            <div className="text-center mb-6 flex flex-col justify-end lg:min-h-[8.5rem]">
              <h3 className="chart-headline font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[--cv-text]">
                The spreadsheet you&apos;d build{" "}
                <span className="text-blue-600">if you had a team.</span>
              </h3>
              <p className="text-base md:text-lg text-[--cv-text-muted] leading-relaxed mt-3">
                Every card you own. Every metric that matters. Sort, filter, search.
              </p>
            </div>
            <div className="relative">
              <ChartImage
                src="/charts/chart-4-kpi-table.png"
                alt="Card values by KPI table view — sortable spreadsheet"
                aspectClass="aspect-[16/10]"
              />
            </div>
            {/* Features row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 mt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mb-2">
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-[--cv-text]">Smart Search</p>
                <p className="text-xs text-[--cv-text-muted] mt-1">Find any card instantly</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 mb-2">
                  <Check className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-[--cv-text]">Deep Filters</p>
                <p className="text-xs text-[--cv-text-muted] mt-1">Slice by 12+ fields</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 mb-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-[--cv-text]">Sortable Everything</p>
                <p className="text-xs text-[--cv-text-muted] mt-1">Click any column</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 mb-2">
                  <Check className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm font-semibold text-[--cv-text]">Export to CSV</p>
                <p className="text-xs text-[--cv-text-muted] mt-1">Insurance, tax, backup</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── SUB-SECTION 3+5: INFINITE AUTO-SCROLL GALLERY (Charts 2,3,5,6) ── */}
      <div className="relative bg-[--cv-bg-section-alt] py-6 md:py-20 overflow-hidden">
        <GhostWord
          className="top-2 md:top-4 left-1/2 -translate-x-1/2 text-[32vw] md:text-[20vw] opacity-[0.10]"
          style={{ color: "var(--cv-accent-emerald)" }}
        >
          Markets
        </GhostWord>

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="relative w-full text-center px-5 md:px-8 mt-2 md:mt-10 mb-8 md:mb-28">
          <h3 className="chart-headline font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.0] md:leading-[0.95] text-[--cv-text] text-balance">
            Movers, Sentiment,{" "}
            <span className="text-emerald-600">Aging &amp; Trends.</span>
          </h3>
        </motion.div>

        {/* Infinite scroll track */}
        <InfiniteGallery />

      </div>

    </section>
    </>
  );
}
