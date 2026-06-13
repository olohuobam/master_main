"use client";

import { motion } from "framer-motion";
import { Check, RefreshCw, Upload, TrendingUp, Download, Layers, Tag, Megaphone, Clock, ArrowRight } from "lucide-react";

// =============================================================================
// FLIP CSS
// =============================================================================
const flipStyles = `
  .cv-flip:hover .cv-flip-inner { transform: rotateY(180deg); }
  .cv-flip-arrow { animation: cv-flip-pulse 1.6s ease-in-out infinite; }
  @keyframes cv-flip-pulse {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .cv-flip-inner { transition: none !important; }
    .cv-flip-arrow { animation: none !important; }
  }
`;

// =============================================================================
// ANIMATION HELPERS
// =============================================================================
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function stagger(delay: number) {
  return {
    ...fadeUp,
    transition: { ...fadeUp.transition, delay },
  };
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================
function Hl({
  children,
  color = "#0A0A0B",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="font-semibold"
      style={{ color }}
    >
      {children}
    </span>
  );
}

function FeaturePillar({
  icon,
  title,
  body,
  accent,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  accent: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className="group relative flex flex-col items-center sm:items-start text-center sm:text-left rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-7 border transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#FFFFFF",
        borderColor: highlighted ? "rgba(37,99,235,0.25)" : "rgba(10,10,11,0.08)",
        boxShadow: highlighted
          ? "0 12px 30px -12px rgba(37,99,235,0.18), 0 4px 10px -4px rgba(10,10,11,0.06)"
          : "0 4px 14px -6px rgba(10,10,11,0.06)",
      }}
    >
      {/* Icon block */}
      <div
        className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl mb-2 sm:mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: accent }}
      >
        {icon}
      </div>

      {/* Title */}
      <h4
        className="text-[11px] leading-tight sm:text-lg md:text-xl font-bold sm:leading-tight tracking-tight"
        style={{
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "#0A0A0B",
        }}
      >
        {title}
      </h4>

      {/* Body — hidden on mobile so 4 tiles fit cleanly in one row */}
      <p
        className="hidden sm:block mt-2 text-sm md:text-[15px] leading-relaxed"
        style={{
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "#52525B",
        }}
      >
        {body}
      </p>

      {/* Bottom accent rail — only on highlighted */}
      {highlighted && (
        <span
          aria-hidden
          className="absolute bottom-0 left-3 right-3 sm:left-6 sm:right-6 h-[2px] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #2563EB, transparent)" }}
        />
      )}
    </div>
  );
}

function BulletItem({ text, accent }: { text: string; accent: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: `${accent}1A`, border: `1px solid ${accent}40` }}
      >
        <Check size={11} style={{ color: accent }} strokeWidth={2.5} />
      </span>
      <span
        className="text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", color: "var(--cv-text-muted)" }}
      >
        {text}
      </span>
    </li>
  );
}

function NumberedEyebrow({
  num,
  label,
  color,
  bg,
  textColor,
}: {
  num: string;
  label: string;
  color: string;
  bg: string;
  textColor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${bg} ${textColor}`}
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {num}
      </span>
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", color }}
      >
        {label}
      </span>
    </div>
  );
}

function FlipStatCard({
  eyebrow,
  bigNumber,
  unit,
  frontLabel,
  backHeadline,
  backFooter,
  barWidth,
}: {
  eyebrow: string;
  bigNumber: string;
  unit: string;
  frontLabel: string;
  backHeadline: string;
  backFooter: string;
  barWidth: number;
}) {
  return (
    <motion.div
      className="cv-flip"
      style={{ perspective: "1200px", cursor: "pointer", height: "190px" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="cv-flip-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            background: "white",
            border: "0.5px solid rgba(0,0,0,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Left accent rail */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "3px",
              borderRadius: "16px 0 0 16px",
              background: "#EF4444",
            }}
          />
          {/* Flip hint */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--cv-text-subtle)",
              opacity: 0.7,
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            <RefreshCw size={11} className="cv-flip-arrow" />
            FLIP
          </div>

          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#EF4444",
              fontWeight: 500,
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            {eyebrow}
          </div>

          <div style={{ marginTop: "8px", display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "76px",
                lineHeight: 0.9,
                color: "#EF4444",
                letterSpacing: "-0.02em",
              }}
            >
              {bigNumber}
            </span>
            {unit && (
              <span
                style={{
                  fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                  fontSize: "24px",
                  color: "#EF4444",
                }}
              >
                {unit}
              </span>
            )}
          </div>

          <div style={{ marginTop: "auto" }}>
            <div
              style={{
                height: "3px",
                background: "rgba(239,68,68,0.15)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${barWidth}%`,
                  background: "#EF4444",
                  borderRadius: "2px",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--cv-text)",
                marginTop: "8px",
                lineHeight: 1.35,
                fontWeight: 500,
                fontFamily: "var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              {frontLabel}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            background: "#0A0A0B",
            color: "white",
            boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "3px",
              borderRadius: "16px 0 0 16px",
              background: "#EF4444",
            }}
          />
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#EF4444",
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            {eyebrow === "THE TAX" ? "WHAT YOU'RE PAYING" : eyebrow}
          </div>
          <div
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "28px",
              lineHeight: 1,
              marginTop: "10px",
              letterSpacing: "-0.01em",
            }}
          >
            {backHeadline}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.7)",
              marginTop: "auto",
              lineHeight: 1.5,
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            {backFooter}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FlipFeatureTile({
  icon,
  accent,
  title,
  frontDesc,
  bullets,
}: {
  icon: string;
  accent: string;
  title: string;
  frontDesc: string;
  bullets: string[];
}) {
  const iconMap: Record<string, React.ElementType> = {
    upload: Upload,
    trendingUp: TrendingUp,
    download: Download,
    layers: Layers,
  };
  const darkAccentMap: Record<string, string> = {
    "#0891B2": "#155E75",
    "#10B981": "#047857",
    "#F59E0B": "#B45309",
    "#3B82F6": "#1E40AF",
  };
  const Icon = iconMap[icon];
  const darkAccent = darkAccentMap[accent];

  return (
    <motion.div
      className="cv-flip"
      style={{ perspective: "1200px", cursor: "pointer", height: "200px" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="cv-flip-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "white",
            border: "0.5px solid rgba(0,0,0,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: `${accent}1A`,
              border: `0.5px solid ${accent}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${accent}1F, inset 0 1px 0 rgba(255,255,255,0.6)`,
            }}
          >
            <Icon size={26} style={{ color: accent }} strokeWidth={1.8} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "26px",
              lineHeight: 1,
              marginTop: "14px",
              letterSpacing: "-0.01em",
              color: "var(--cv-text)",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "var(--cv-text-muted)",
              marginTop: "6px",
              lineHeight: 1.4,
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            {frontDesc}
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: "var(--cv-text-subtle)",
              marginTop: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            <RefreshCw size={10} className="cv-flip-arrow" />
            HOVER
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
            background: `linear-gradient(135deg, ${accent} 0%, ${darkAccent} 100%)`,
            color: "white",
            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontSize: "20px",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
          <ul
            style={{
              fontSize: "11px",
              lineHeight: 1.7,
              margin: "12px 0 0",
              paddingLeft: "16px",
              color: "rgba(255,255,255,0.92)",
              fontFamily: "var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// WORKFLOW ROW — full-bleed magazine-style row used in Section 2
// =============================================================================
function WorkflowRow({
  number,
  eyebrow,
  headlinePre,
  headlineAccent,
  body,
  bullets,
  stats,
  imageSrc,
  imageAlt,
  accent,
  accentSoft,
  bgGradient,
  imageSide,
}: {
  number: string;
  eyebrow: string;
  headlinePre: string;
  headlineAccent: string;
  body: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  imageSrc: string;
  imageAlt: string;
  accent: string;
  accentSoft: string;
  bgGradient: string;
  imageSide: "left" | "right";
}) {
  const imageCol = (
    <motion.div className="relative lg:col-span-8" {...stagger(0)}>
      {/* Soft glow behind image */}
      <div
        aria-hidden
        className="absolute -inset-8 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 65% at 50% 50%, ${accent}1F 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      {/* Floating eyebrow chip — top corner of frame */}
      <div
        className={`absolute z-20 -top-2 sm:-top-3 ${imageSide === "left" ? "-left-2 sm:-left-3 md:-left-6" : "-right-2 sm:-right-3 md:-right-6"}`}
      >
        <div
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg shadow-lg"
          style={{ background: accent, color: "white" }}
        >
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.2em]"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {number}
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em]"
            style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
          >
            {eyebrow}
          </span>
        </div>
      </div>

      {/* Image frame — white inset + colored ring + shadow */}
      <div
        className="relative rounded-3xl p-2 md:p-3 bg-white shadow-2xl"
        style={{
          boxShadow: `0 30px 60px -20px ${accent}33, 0 12px 30px -12px rgba(0,0,0,0.18)`,
          border: `1px solid ${accentSoft}`,
        }}
      >
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          className="block w-full h-auto rounded-2xl select-none"
          loading="lazy"
        />
      </div>

      {/* Floating stat callouts — bottom edge */}
      <div
        className={`absolute z-20 -bottom-4 sm:-bottom-6 ${imageSide === "left" ? "right-2 sm:right-4 md:right-8" : "left-2 sm:left-4 md:left-8"} flex gap-2 sm:gap-3`}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-3 shadow-xl border border-slate-200/80"
          >
            <div
              className="leading-none"
              style={{
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "clamp(1.1rem, 3vw, 2.25rem)",
                color: accent,
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </div>
            <div
              className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] mt-1"
              style={{
                color: "var(--cv-text-muted)",
                fontFamily: "var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const textCol = (
    <motion.div className="lg:col-span-4 relative" {...stagger(0.1)}>
      {/* Giant translucent watermark number */}
      <div
        aria-hidden
        className="absolute -top-6 sm:-top-8 md:-top-12 left-0 pointer-events-none select-none leading-none"
        style={{
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          fontSize: "clamp(5rem, 14vw, 14rem)",
          color: accent,
          opacity: 0.08,
          letterSpacing: "-0.04em",
        }}
      >
        {number}
      </div>

      {/* Eyebrow line */}
      <div className="flex items-center gap-2 sm:gap-3 relative">
        <span aria-hidden className="h-px w-6 sm:w-8" style={{ background: accent }} />
        <span
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em]"
          style={{
            color: accent,
            fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          {eyebrow}
        </span>
      </div>

      {/* Headline */}
      <h3
        className="mt-3 sm:mt-5 relative text-balance"
        style={{
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          fontSize: "clamp(2rem, 4.8vw, 4.5rem)",
          lineHeight: "0.92",
          letterSpacing: "-0.02em",
          color: "#0A0A0B",
        }}
      >
        {headlinePre}{" "}
        <span
          style={{
            color: accent,
            textDecorationLine: "underline",
            textDecorationColor: accent,
            textDecorationThickness: "5px",
            textUnderlineOffset: "-2px",
          }}
        >
          {headlineAccent}
        </span>
        .
      </h3>

      {/* Body */}
      <p
        className="mt-4 sm:mt-7 text-sm sm:text-lg md:text-xl leading-relaxed relative"
        style={{
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "#1F2937",
        }}
      >
        {body}
      </p>

      {/* Bullets — squared colored badges */}
      <ul className="mt-5 sm:mt-8 space-y-2.5 sm:space-y-4 relative">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 sm:gap-4">
            <span
              className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md shadow-sm"
              style={{ background: accent }}
            >
              <Check size={13} className="text-white sm:hidden" strokeWidth={3} />
              <Check size={15} className="text-white hidden sm:block" strokeWidth={3} />
            </span>
            <span
              className="text-sm sm:text-base md:text-lg font-medium leading-snug"
              style={{
                fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                color: "#0A0A0B",
              }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section
      className="relative w-full py-6 sm:py-16 md:py-32 overflow-hidden"
      style={{ background: bgGradient }}
    >
      {/* Decorative angled accent line at top */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
      />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20 items-center">
          {imageSide === "left" ? (
            <>
              {imageCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 1 — PROBLEM
// =============================================================================
function ProblemSection() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "var(--cv-bg)", paddingTop: "2.5rem", paddingBottom: "0.5rem" }}>
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />

      {/* Eyebrow — DESKTOP / MOBILE platform line */}
      <motion.div className="flex justify-center items-center gap-3 sm:gap-5 md:gap-7 mb-5 sm:mb-8 px-4" {...stagger(0)}>
        <span aria-hidden className="h-[2px] w-8 sm:w-16 md:w-28 bg-slate-300" />
        <span
          className="text-xs sm:text-base md:text-xl font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] md:tracking-[0.5em] text-slate-800 whitespace-nowrap"
          style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
        >
          Desktop <span className="text-blue-500 mx-1 md:mx-2">/</span> Mobile
        </span>
        <span aria-hidden className="h-[2px] w-8 sm:w-16 md:w-28 bg-slate-300" />
      </motion.div>

      {/* Headline — wraps on mobile, single line desktop */}
      <motion.h2
        className="text-center w-full px-4 md:px-6 text-balance"
        style={{
          fontSize: "clamp(2.25rem, 4.6vw, 5.5rem)",
          lineHeight: "0.95",
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          color: "var(--cv-text)",
        }}
        {...stagger(0.08)}
      >
        {"Welcome to the "}
        <span
          className="relative inline-block align-baseline"
          style={{ color: "#2563EB" }}
        >
          all-in-one
          <span
            aria-hidden
            className="absolute left-0 right-0"
            style={{
              bottom: "0.06em",
              height: "0.09em",
              background: "#2563EB",
              borderRadius: "2px",
            }}
          />
        </span>
        {" inventory management system"}
      </motion.h2>

      {/* Feature grid — 4 across on every viewport */}
      <motion.div
        className="mt-7 sm:mt-14 md:mt-20 max-w-[1400px] mx-auto px-3 sm:px-6 md:px-12"
        {...stagger(0.16)}
      >
        <div className="grid grid-cols-4 gap-2 sm:gap-5 md:gap-6">
          <FeaturePillar
            icon={<Layers size={22} className="text-white" strokeWidth={2.5} />}
            title="Track Every Card"
            body="One source of truth across desktop, web, and mobile — synced in real time."
            accent="#0A0A0B"
          />
          <FeaturePillar
            icon={<Tag size={22} className="text-white" strokeWidth={2.5} />}
            title="Auto-Value & Reprice"
            body="Live comps recalc your portfolio nightly and re-price every active listing."
            accent="#2563EB"
            highlighted
          />
          <FeaturePillar
            icon={<Megaphone size={22} className="text-white" strokeWidth={2.5} />}
            title="Auto-Post to Marketplaces"
            body="Push to eBay, COMC, and more in one click. Titles, specs, and shipping pre-filled."
            accent="#2563EB"
            highlighted
          />
          <FeaturePillar
            icon={<Clock size={22} className="text-white" strokeWidth={2.5} />}
            title="Catch Stale Inventory"
            body="We flag cards aging past your threshold so nothing sits priced wrong for long."
            accent="#0A0A0B"
          />
        </div>

        {/* Closer band — punchier two-step proposition */}
        <div className="mt-6 sm:mt-10 md:mt-14 relative">
          <div
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border shadow-sm"
            style={{
              background: "#0A0A0B",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {/* Subtle blue glow accent */}
            <div
              aria-hidden
              className="absolute -right-20 -top-20 sm:-right-32 sm:-top-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.35), transparent)" }}
            />
            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-6 md:gap-8 px-3 sm:px-6 md:px-10 py-4 sm:py-7 md:py-9">
              {/* Left: action */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 sm:justify-end text-center sm:text-left">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-white"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    01
                  </span>
                </span>
                <span
                  className="text-xs sm:text-base md:text-lg font-semibold text-white leading-tight sm:text-right"
                  style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
                >
                  Sell a card on<br className="sm:hidden" /> one marketplace
                </span>
              </div>

              {/* Center: arrow — visible on all viewports */}
              <div className="flex items-center justify-center">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full"
                  style={{ background: "#2563EB" }}
                >
                  <ArrowRight size={14} className="text-white sm:hidden" strokeWidth={2.5} />
                  <ArrowRight size={20} className="text-white hidden sm:block" strokeWidth={2.5} />
                </span>
              </div>

              {/* Right: result */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                  style={{ background: "rgba(37,99,235,0.18)" }}
                >
                  <span
                    className="text-[10px] sm:text-xs font-bold tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-geist-mono), monospace", color: "#60A5FA" }}
                  >
                    02
                  </span>
                </span>
                <div className="flex flex-col">
                  <span
                    className="text-xs sm:text-base md:text-lg font-bold leading-tight"
                    style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", color: "#60A5FA" }}
                  >
                    Pulled from<br className="sm:hidden" /> all the rest
                  </span>
                  <span
                    className="hidden sm:block text-xs md:text-sm text-slate-400 mt-1"
                    style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
                  >
                    Automatic delist across every connected channel.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero image ���� full bleed */}
      <motion.div className="w-full mt-6 sm:mt-10" {...stagger(0.12)}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/INVENTORY%20DESKTOP%20MOBILE%20W%20TEXT2%20copy-1ke4jl21DW3BjY8yKLKgZjWVO9tAVh.jpg"
          alt="CardValues across iMac, MacBook and mobile ��� one dashboard, every card, every sale"
          className="w-full h-auto block select-none"
          loading="lazy"
        />
      </motion.div>

    </div>
  );
}

// =============================================================================
// SECTION 2 — ONE DASHBOARD
// =============================================================================
function OneDashboardSection() {
  return (
    <div className="relative overflow-hidden pt-2 pb-6 sm:py-20 md:py-28" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)" }}>
      {/* Background watermark — giant "automated" text, edge-to-edge, faint blue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="block text-center whitespace-nowrap leading-none"
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontSize: "clamp(7rem, 26vw, 32rem)",
            letterSpacing: "-0.04em",
            color: "rgba(37, 99, 235, 0.42)",
            transform: "scaleY(1.05)",
          }}
        >
          automated
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Eyebrow */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
          <span aria-hidden className="h-px w-8 sm:w-12 bg-blue-300" />
          <span
            className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-blue-600"
            style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
          >
            The Solution
          </span>
          <span aria-hidden className="h-px w-8 sm:w-12 bg-blue-300" />
        </div>

        {/* Headline — wraps on mobile (2 lines), single line desktop */}
        <motion.h2
          className="text-center w-full mt-2 sm:mt-4 text-balance"
          style={{
            fontSize: "clamp(2.5rem, 5.2vw, 6rem)",
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            color: "var(--cv-text)",
          }}
          {...stagger(0.08)}
        >
          {"One dashboard. Every move "}
          <span style={{ color: "#3B82F6", borderBottom: "6px solid #3B82F6", paddingBottom: "6px" }}>
            automated
          </span>
          .
        </motion.h2>

        {/* Lead */}
        <motion.p
          className="text-center text-base sm:text-lg md:text-xl leading-relaxed mt-5 sm:mt-8 max-w-2xl mx-auto px-2"
          style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif", color: "var(--cv-text-muted)" }}
          {...stagger(0.16)}
        >
          Scan a card. We pull comps, build the eBay listing, push to your marketplaces, revalue your portfolio. Done in minutes.
        </motion.p>

      </div>

      {/* ROW 1 — Desktop Workflow — full-bleed magazine band */}
      <WorkflowRow
        number="01"
        eyebrow="Desktop Workflow"
        headlinePre="One click."
        headlineAccent="Live on marketplaces"
        body="Auto-fills title, item specifics, description, photos, suggested pricing, and shipping. You review the draft and hit publish. Listing goes live on eBay in seconds."
        bullets={[
          "Auto-fills 14+ listing fields per card",
          "Pricing suggestions from live comps",
          "One-click push to drafts or live",
          "Auto-delist when sold on any channel",
        ]}
        stats={[
          { value: "All in one", label: "system" },
          { value: "14+", label: "fields auto" },
        ]}
        imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/INVENTORY%20DESKTOP%20ONLY%20TEXT%202%20copy-TFhctgL1kGr57OPXCX4tEmhvDrrrbJ.jpg"
        imageAlt="CardValues building an eBay listing automatically with title, photos, comps, and shipping pre-filled"
        accent="#2563EB"
        accentSoft="#DBEAFE"
        bgGradient="linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)"
        imageSide="left"
      />

      {/* ROW 2 — Mobile Workflow — full-bleed magazine band */}
      <WorkflowRow
        number="02"
        eyebrow="Mobile Workflow"
        headlinePre="Sell everywhere."
        headlineAccent="Type once"
        body="Cross-list to every major marketplace from your phone. Set channel-specific pricing. Sold on one channel? Auto-removes from all the rest."
        bullets={[
          "Cross-list to all major platforms",
          "Channel-specific pricing in one click",
          "Auto-removes from all when sold",
          "Live portfolio updates across 14M cards",
        ]}
        stats={[
          { value: "Mobile", label: "friendly" },
          { value: "1", label: "tap to sync" },
        ]}
        imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/INVENTORY%20MOBILE%20ONLY%20W%20TEXT%20copy-SCT11a39SOxNtWaKp0JWUCXqm2RDoP.jpg"
        imageAlt="CardValues cross-listing a card to multiple marketplaces from the mobile app"
        accent="#7C3AED"
        accentSoft="#EDE9FE"
        bgGradient="linear-gradient(180deg, #F8F6FF 0%, #FFFFFF 100%)"
        imageSide="right"
      />

    </div>
  );
}

// =============================================================================
// MAIN EXPORT
// =============================================================================
export default function InventorySection() {
  return (
    <section>
      <ProblemSection />
      <OneDashboardSection />
    </section>
  );
}
