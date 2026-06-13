"use client";

import Image from "next/image";
import {
  Zap,
  Brain,
  Shield,
  Layers,
  TrendingUp,
  Target,
  Eye,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
   ────────────────────────────────────────────────────────────────────────── */
// Dark palette — used by the hero header + phone mockup + Pro card
const C = {
  bg: "#0A0A0B",
  surface: "#111114",
  border: "#1F2024",
  borderBright: "#2A2B2E",
  emerald: "#10B981",
  amber: "#F59E0B",
  white: "#FFFFFF",
  body: "#D1D5DB",
  muted: "#9CA3AF",
  dim: "#6B7280",
};

// Light palette — used by the entire white section (hero + body)
// All text is true black, all borders are true black per spec
const CL = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceSoft: "#FFFFFF",
  border: "#0A0A0B",
  borderBright: "#0A0A0B",
  emerald: "#059669", // slightly deeper for better contrast on white
  amber: "#D97706",
  ink: "#0A0A0B",
  body: "#0A0A0B",
  muted: "#0A0A0B",
  dim: "#0A0A0B",
};

const FONT_DISPLAY =
  'var(--font-geist-sans), "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
const FONT_MONO =
  'var(--font-geist-mono), "JetBrains Mono", ui-monospace, monospace';
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED PRIMITIVES
   ────────────────────────────────────────────────────────────────────────── */
function EyebrowPill({
  label,
  tone = "emerald",
  theme = "dark",
  size = "sm",
}: {
  label: string;
  tone?: "emerald" | "amber" | "neutral";
  theme?: "dark" | "light";
  size?: "sm" | "lg";
}) {
  const palette =
    theme === "light"
      ? tone === "emerald"
        ? { color: CL.emerald, bg: "rgba(5,150,105,0.10)", border: "rgba(5,150,105,0.35)" }
        : tone === "amber"
        ? { color: CL.amber, bg: "rgba(217,119,6,0.10)", border: "rgba(217,119,6,0.30)" }
        : { color: CL.muted, bg: CL.surfaceSoft, border: CL.border }
      : tone === "emerald"
      ? { color: C.emerald, bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.45)" }
      : tone === "amber"
      ? { color: C.amber, bg: "rgba(245,158,11,0.10)", border: C.border }
      : { color: C.muted, bg: C.surface, border: C.border };
  const sizing =
    size === "lg"
      ? { fontSize: 18, padding: "12px 24px", letterSpacing: "0.18em", borderWidth: 2 }
      : { fontSize: 11, padding: "6px 12px", letterSpacing: "0.14em", borderWidth: 1 };
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full"
      style={{
        background: palette.bg,
        border: `${sizing.borderWidth}px solid ${palette.border}`,
        color: palette.color,
        fontFamily: FONT_DISPLAY,
        fontSize: sizing.fontSize,
        fontWeight: 700,
        letterSpacing: sizing.letterSpacing,
        textTransform: "uppercase",
        padding: sizing.padding,
      }}
    >
      {label}
    </span>
  );
}

function PrimaryButton({
  children,
  tone = "emerald",
  size = "md",
}: {
  children: React.ReactNode;
  tone?: "emerald" | "amber";
  size?: "md" | "lg";
}) {
  const bg = tone === "emerald" ? C.emerald : C.amber;
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center font-bold transition-transform duration-200 will-change-transform hover:scale-[1.02] active:scale-[0.99]"
      style={{
        background: bg,
        color: "#000000",
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        letterSpacing: "-0.01em",
        fontSize: size === "lg" ? 18 : 16,
        padding: size === "lg" ? "16px 40px" : "14px 28px",
        borderRadius: size === "lg" ? 16 : 12,
        boxShadow: `0 10px 30px -10px ${bg}55, 0 0 0 1px ${bg}22 inset`,
        transition: `transform 240ms ${EASE}`,
      }}
    >
      {children}
    </button>
  );
}

function SecondaryLink({
  children,
  theme = "dark",
}: {
  children: React.ReactNode;
  theme?: "dark" | "light";
}) {
  const baseColor = theme === "light" ? CL.muted : C.muted;
  const hoverClass =
    theme === "light"
      ? "hover:text-[#0A0A0B]"
      : "hover:text-white";
  return (
    <a
      href="#"
      className={`inline-flex items-center gap-1 transition-colors duration-200 ${hoverClass}`}
      style={{ color: baseColor, fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500 }}
    >
      {children}
      <ChevronRight size={14} strokeWidth={2.25} />
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PART 1 — DARK HERO HEADER (stays dark)
   ────────────────────────────────────────────────────────────────────────── */
function SectionHeader() {
  return (
    <header className="flex w-full flex-col items-center px-5 text-center">
      <h2
        className="w-full"
        style={{
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          color: CL.ink,
          fontSize: "clamp(3.4rem, 9vw, 8rem)",
        }}
      >
        <span className="whitespace-nowrap">Know every card&apos;s value</span>{" "}
        <span
          className="whitespace-nowrap"
          style={{
            color: CL.emerald,
            WebkitTextStroke: "1.8px #0A0A0B",
            paintOrder: "stroke fill",
            textShadow: "0 2px 0 rgba(0,0,0,0.08)",
          }}
        >
          before the bid closes.
        </span>
      </h2>

    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PART 2 — STAT TRIPLE (LIGHT)
   ────────────────────────────────────────────────────────────────────────── */
type Stat = {
  value: string;
  label: string;
  micro: string;
  icon: LucideIcon;
  tint: string; // soft pastel for icon chip + corner blob
  blobColor: string; // pastel blob color
  accent?: boolean; // colored border highlight
};

const STATS: Stat[] = [
  {
    value: "<5s",
    label: "Camera to value",
    micro: "From scan tap to confirmed value",
    icon: Zap,
    tint: "rgba(5,150,105,0.10)",
    blobColor: "rgba(5,150,105,0.18)",
  },
  {
    value: "16M+",
    label: "Cards in the library",
    micro: "Every sport, era, parallel — graded and raw",
    icon: Layers,
    tint: "rgba(59,130,246,0.10)",
    blobColor: "rgba(59,130,246,0.16)",
  },
  {
    value: "1,000+",
    label: "Bulk snipes per minute",
    micro: "Pro tier — for power buyers",
    icon: Target,
    tint: "rgba(217,119,6,0.10)",
    blobColor: "rgba(217,119,6,0.18)",
    accent: true,
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  // Extract base RGB from tint to derive an accent border
  const accentBorder = stat.accent
    ? stat.blobColor.replace(/[\d.]+\)$/, "0.65)")
    : CL.border;
  return (
    <div
      className="group relative flex flex-col items-center justify-center overflow-hidden text-center"
      style={{
        background: CL.surface,
        border: `${stat.accent ? "1.5px" : "1px"} solid ${accentBorder}`,
        borderRadius: 18,
        padding: "22px 18px",
        aspectRatio: "1 / 1",
        width: "100%",
        flex: "1 1 0",
        minHeight: 0,
        transition: `border-color 240ms ${EASE}, transform 240ms ${EASE}, box-shadow 240ms ${EASE}`,
        boxShadow: stat.accent
          ? `0 4px 14px ${stat.blobColor}, 0 1px 2px rgba(16,24,40,0.04)`
          : "0 1px 2px rgba(16,24,40,0.04)",
      }}
    >
      {/* Pastel corner blob — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: -28,
          right: -28,
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: stat.blobColor,
          filter: "blur(2px)",
        }}
      />
      {/* Second smaller blob for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: 16,
          right: 8,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: stat.blobColor,
          opacity: 0.6,
        }}
      />

      {/* Icon chip */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: stat.tint,
        }}
      >
        <Icon
          size={18}
          strokeWidth={2.2}
          style={{ color: stat.blobColor.replace(/[\d.]+\)$/, "1)") }}
        />
      </div>

      {/* Big numeric stat */}
      <div
        className="relative mt-4 lg:text-[clamp(34px,3.4vw,52px)]"
        style={{
          fontFamily: FONT_MONO,
          fontWeight: 700,
          fontSize: 32,
          color: CL.ink,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {stat.value}
      </div>

      {/* Label */}
      <div
        className="relative mt-3 lg:text-[clamp(12px,0.95vw,15px)]"
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 12,
          fontWeight: 800,
          color: CL.ink,
          lineHeight: 1.2,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </div>
      {/* Micro */}
      <div
        className="relative mt-1.5 lg:text-[clamp(11px,0.85vw,14px)]"
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 12,
          color: CL.ink,
          opacity: 0.72,
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {stat.micro}
      </div>
    </div>
  );
}

function StatTriple() {
  return (
    <div className="mx-auto mt-16 grid w-full max-w-[1100px] grid-cols-1 gap-4 px-5 md:grid-cols-3">
      {STATS.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PART 3 — CINEMATIC BLOCK (LIGHT copy + DARK phone)
   ────────────────────────────────────────────────────────────────────────── */
type Benefit = { icon: LucideIcon; title: string; desc: string };

const BENEFITS: Benefit[] = [
  {
    icon: Zap,
    title: "Sub-5-second scans",
    desc: "Card appears on stream. Scan. Value. Bid. Done. The Sniper is faster than the auction clock.",
  },
  {
    icon: Brain,
    title: "AI knows every detail",
    desc: "Player, parallel, refractor, numbering, grade — auto-detected from the visible card alone.",
  },
  {
    icon: Shield,
    title: "Never overpay again",
    desc: "Live values pulled from active marketplaces. One avoided overpay covers your subscription. Forever.",
  },
];

function BenefitRow({ b }: { b: Benefit }) {
  const Icon = b.icon;
  return (
    <li className="flex items-start gap-4">
      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: "rgba(5,150,105,0.10)",
          border: `1px solid rgba(5,150,105,0.25)`,
        }}
      >
        <Icon size={22} color={CL.emerald} strokeWidth={2} />
      </div>
      <div>
        <div
          className="lg:text-[clamp(17px,1.25vw,20px)]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 16,
            fontWeight: 700,
            color: CL.ink,
            lineHeight: 1.3,
          }}
        >
          {b.title}
        </div>
        <p
          className="mt-1 lg:text-[clamp(14px,1.05vw,17px)]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 14,
            color: CL.body,
            lineHeight: 1.55,
            maxWidth: 460,
          }}
        >
          {b.desc}
        </p>
      </div>
    </li>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto block w-full max-w-[400px]">
      {/* Soft glow behind phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,0.30) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "sniperGlowPulse 4s ease-in-out infinite",
        }}
      />

      {/* Phone frame */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: "9 / 19",
          borderRadius: 44,
          background: "#0B0B0D",
          border: `1px solid ${C.borderBright}`,
          padding: 10,
          boxShadow:
            "0 60px 120px -30px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.04)",
          animation: "sniperFloat 6s ease-in-out infinite",
        }}
      >
        {/* Notch */}
        <div
          aria-hidden
          className="absolute left-1/2 top-2.5 z-20 -translate-x-1/2"
          style={{
            width: 90,
            height: 26,
            background: "#000",
            borderRadius: 999,
          }}
        />

        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: 36,
            background: "#000",
          }}
        >
          {/* Stream still */}
          <Image
            src="/sniper/scan-results-rj-harvey.jpg"
            alt="Sniper scanning a card live"
            fill
            sizes="(max-width: 768px) 280px, 400px"
            style={{ objectFit: "cover" }}
          />

          {/* Dim gradient to make overlay legible */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* LIVE MARKET pill */}
          <div
            className="absolute right-3 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              background: "rgba(16,185,129,0.95)",
              color: "#000",
              fontFamily: FONT_DISPLAY,
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: "#000",
                animation: "sniperBlink 1.2s ease-in-out infinite",
              }}
            />
            Live Market
          </div>

          {/* Scan-line sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 z-10"
            style={{
              height: 80,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.18) 45%, rgba(16,185,129,0.55) 50%, rgba(16,185,129,0.18) 55%, transparent 100%)",
              animation: "sniperScan 8s ease-in-out infinite",
              mixBlendMode: "screen",
            }}
          />

          {/* Overlay card — bottom */}
          <div
            className="absolute inset-x-3 bottom-3 z-10 overflow-hidden"
            style={{
              background: "rgba(10,10,11,0.92)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${C.borderBright}`,
              borderRadius: 16,
              padding: "12px 14px",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 10,
                color: C.muted,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              2024 Topps Chrome
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 13,
                color: C.white,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Caleb Williams RC
            </div>
            <div
              className="mt-0.5 flex items-center gap-2"
              style={{ fontFamily: FONT_DISPLAY, fontSize: 11, color: C.body }}
            >
              <span>PSA 10</span>
              <span style={{ color: C.dim }}>•</span>
              <span>#150</span>
            </div>

            <div className="mt-2 flex items-end justify-between">
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 26,
                  fontWeight: 800,
                  color: C.white,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                $847.50
              </div>
              <div
                className="inline-flex items-center gap-1 rounded-md px-2 py-1"
                style={{
                  background: "rgba(16,185,129,0.18)",
                  border: `1px solid rgba(16,185,129,0.35)`,
                  color: C.emerald,
                  fontFamily: FONT_DISPLAY,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: C.emerald,
                    boxShadow: `0 0 8px ${C.emerald}`,
                  }}
                />
                98% match
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CinematicBlock() {
  return (
    <div className="relative mt-0 w-full overflow-hidden lg:mt-0">
      {/* Subtle radial bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(5,150,105,0.06) 0%, transparent 70%)",
        }}
      />

      {/* MOBILE-ONLY full-width headline above the phone + text row */}
      <div className="px-4 sm:px-5 lg:hidden">
        <div className="mt-10 flex justify-center">
          <span
            className="inline-flex items-center rounded-full"
            style={{
              background: "rgba(217,119,6,0.14)",
              border: "1px solid rgba(217,119,6,0.35)",
              color: CL.ink,
              fontFamily: FONT_DISPLAY,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "6px 12px",
            }}
          >
            The live selling cheat code
          </span>
        </div>
        <h3
          className="mt-5 w-full"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: CL.ink,
            fontSize: "clamp(30px, 8vw, 48px)",
            textWrap: "balance",
          }}
        >
          While they&apos;re still typing the bid, you already{" "}
          <span
            style={{
              color: CL.emerald,
              textShadow: "0 0 20px rgba(5,150,105,0.20)",
            }}
          >
            know the price.
          </span>
        </h3>

        {/* MOBILE-ONLY full-width intro paragraph (desktop version lives in the grid) */}
        <p
          className="mt-6 w-full"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 18,
            lineHeight: 1.45,
            color: CL.body,
          }}
        >
          Whatnot streamers blast through 50 cards an hour. Most bidders are guessing.
          You&apos;re not. The Sniper reads the card on screen — player, year, set, parallel,
          grade — and shows you the real market value before the timer hits zero.
        </p>
      </div>

      <div className="relative grid w-full grid-cols-2 items-start gap-4 px-4 pt-2 pb-12 sm:gap-6 sm:px-5 md:gap-10 md:pt-4 md:pb-16 lg:grid-cols-[460px_minmax(0,900px)_260px] lg:items-stretch lg:justify-center lg:justify-items-stretch lg:px-6 lg:gap-14 xl:px-10 xl:gap-20">
        {/* LEFT — Copy */}
        <div className="order-1 w-full max-w-[480px] lg:order-1 lg:flex lg:h-full lg:max-w-none lg:flex-col lg:justify-between lg:justify-self-end lg:text-left">
          {/* DESKTOP-ONLY eyebrow + headline (mobile version is rendered full-width above) */}
          <div className="hidden lg:block">
            <span
              className="inline-flex items-center rounded-full"
              style={{
                background: "rgba(217,119,6,0.14)",
                border: "1px solid rgba(217,119,6,0.35)",
                color: CL.ink,
                fontFamily: FONT_DISPLAY,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "6px 12px",
              }}
            >
              The live selling cheat code
            </span>

            <h3
              className="mt-6 text-left"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: CL.ink,
                fontSize: "clamp(30px, 3.4vw, 50px)",
              }}
            >
              While they&apos;re still typing the
              <br />
              bid, you already
              <br />
              <span
                style={{
                  color: CL.emerald,
                  textShadow: "0 0 20px rgba(5,150,105,0.20)",
                }}
              >
                know the price.
              </span>
            </h3>
          </div>

          <p
            className="hidden lg:block lg:mt-8 lg:text-[clamp(26px,2.8vw,42px)]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 18,
              lineHeight: 1.45,
              color: CL.body,
              maxWidth: 720,
            }}
          >
            Whatnot streamers blast through 50 cards an hour. Most bidders are guessing.
            You&apos;re not. The Sniper reads the card on screen — player, year, set, parallel,
            grade — and shows you the real market value before the timer hits zero.
          </p>

          <p
            className="mt-5 lg:mt-7 lg:text-[clamp(26px,2.8vw,42px)]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 18,
              lineHeight: 1.45,
              color: CL.body,
              maxWidth: 720,
            }}
          >
            The Sniper Tool reads cards directly from your livestream feed and returns the
            exact market value in under 5 seconds.{" "}
            <span style={{ fontWeight: 600, color: CL.emerald }}>
              No more overpaying. No more missed shots.
            </span>
          </p>

          <ul className="mt-8 flex flex-col gap-6">
            {BENEFITS.map((b) => (
              <BenefitRow key={b.title} b={b} />
            ))}
          </ul>

          <div className="mt-8 hidden flex-wrap items-center gap-5 lg:flex lg:justify-start">
            <PrimaryButton>Start sniping</PrimaryButton>
            <SecondaryLink theme="light">See pricing</SecondaryLink>
          </div>
        </div>

        {/* CENTER — Phone on mobile, inline Pro card on desktop */}
        <div className="order-2 mt-6 flex w-full justify-center lg:mt-0 lg:hidden">
          <PhoneMockup />
        </div>
        <div className="order-2 hidden w-full lg:flex lg:items-stretch lg:justify-self-stretch">
          <ProUpsellCard inline />
        </div>

        {/* MOBILE-ONLY centered CTA — full width below the phone + benefits row */}
        <div className="order-3 col-span-2 mt-8 flex flex-col items-center gap-5 lg:hidden">
          <PrimaryButton>Start sniping</PrimaryButton>
          <SecondaryLink theme="light">See pricing</SecondaryLink>
        </div>

        {/* RIGHT — Stat cards. Horizontal row on mobile (full width below), stacked vertical column on lg */}
        <div className="order-3 col-span-2 mt-8 grid w-full grid-cols-3 gap-3 lg:col-span-1 lg:mt-0 lg:flex lg:h-full lg:max-w-none lg:flex-col lg:justify-between lg:gap-4 lg:justify-self-start lg:ml-auto">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PART 4 — PLATFORM STRIP (LIGHT)
   ────────────────────────────────────────────────────────────────────────── */
const PLATFORMS = [
  "Whatnot",
  "eBay Live",
  "Fanatics Live",
  "TikTok Live",
  "Instagram Live",
  "YouTube Live",
  "Drip",
  "Loupe",
  "Facebook Live",
];

function PlatformStrip() {
  return (
    <div className="relative w-full" style={{ background: CL.bg }}>
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-2 pb-14">
        <p
          className="text-center"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(22px, 2.6vw, 32px)",
            fontWeight: 700,
            color: CL.ink,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          Works on every platform you sell on
        </p>

        <div className="mt-7 -mx-5 overflow-x-auto px-5">
          <div className="mx-auto flex min-w-max items-center justify-center gap-0">
            {PLATFORMS.map((p, i) => (
              <div key={p} className="flex items-center">
                <span
                  className="px-5 transition-opacity duration-300 hover:opacity-100"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 15,
                    fontWeight: 600,
                    color: CL.body,
                    opacity: 0.75,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p}
                </span>
                {i < PLATFORMS.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      width: 1,
                      height: 28,
                      background: CL.border,
                      display: "inline-block",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <p
          className="mt-5 text-center"
          style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: CL.muted }}
        >
          Universal — works with any livestream feed
        </p>
      </div>
    </div>
  );
}

/* ────────���────────────────────────────────────────────────────────────────────
   PART 5 — PRO TIER UPSELL CARD (dark card on white bg — kept dark for premium feel)
   ────────────────────────────────────────────────────────────────────────── */
type ProPill = { icon: LucideIcon; title: string; subtitle: string };

const PRO_PILLS: ProPill[] = [
  { icon: Layers, title: "Bulk snipes", subtitle: "1,000+ cards per minute" },
  { icon: TrendingUp, title: "PSA grade projections", subtitle: "AI-predicted grades on raw cards" },
  { icon: Target, title: "Max-bid intelligence", subtitle: "Know when to stop bidding" },
  { icon: Eye, title: "Multi-stream mode", subtitle: "Watch 4 streams simultaneously" },
];

function ProPillCard({ p }: { p: ProPill }) {
  const Icon = p.icon;
  return (
    <div
      className="group flex items-start gap-2 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "rgba(31,32,36,0.6)",
        border: `1px solid ${C.borderBright}`,
        borderRadius: 10,
        padding: 12,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: "rgba(16,185,129,0.12)",
          border: `1px solid rgba(16,185,129,0.22)`,
        }}
      >
        <Icon size={14} color={C.emerald} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 13,
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.25,
          }}
        >
          {p.title}
        </div>
        <div
          className="mt-0.5"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 11,
            color: C.muted,
            lineHeight: 1.4,
          }}
        >
          {p.subtitle}
        </div>
      </div>
    </div>
  );
}

function ProUpsellCard({ inline = false }: { inline?: boolean }) {
  const content = (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${C.surface} 0%, ${C.bg} 100%)`,
        border: `1px solid ${C.borderBright}`,
        borderRadius: 24,
        padding: "clamp(24px, 4vw, 48px)",
        boxShadow:
          "0 30px 80px -30px rgba(16,185,129,0.18), 0 0 0 1px rgba(16,185,129,0.06) inset",
      }}
    >
      {/* Top accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${C.emerald}, transparent)`,
          opacity: 0.6,
        }}
      />

      <div
        className={
          inline
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(240px,26vw,340px)] lg:items-center lg:gap-10"
            : ""
        }
      >
        <div>
        {/* Pro pill — anchored upper-left (above headline on mobile + desktop) */}
        <div className="flex items-center justify-start">
          <span
            className="inline-flex items-center rounded-full"
            style={{
              background: C.amber,
              color: "#000",
              fontFamily: FONT_DISPLAY,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "6px 12px",
            }}
          >
            Sniper Pro
          </span>
        </div>

        {/* Closing headline — visible on mobile + desktop */}
        <h3
          className="mt-6 text-center lg:text-left"
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            color: C.white,
          }}
        >
          <span className="lg:whitespace-nowrap">Stop guessing.</span>{" "}
          <span
            className="lg:whitespace-nowrap"
            style={{ color: C.emerald, textShadow: "0 0 24px rgba(16,185,129,0.35)" }}
          >
            Start sniping.
          </span>
        </h3>

        <h3
          className="mt-6 text-center lg:text-left"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: C.white,
            fontSize: "clamp(24px, 3.4vw, 32px)",
          }}
        >
          Pro unlocks the entire arsenal
        </h3>

        <p
          className="mt-4 text-center lg:text-left"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(17px, 1.4vw, 21px)",
            lineHeight: 1.6,
            color: C.muted,
            maxWidth: 720,
            marginInline: "auto",
          }}
        >
          Single Sniper handles one stream. Sniper Pro snipes 1,000+ cards per minute
          across multiple feeds, projects PSA grades on raw cards before they&apos;re
          slabbed, and gives you max-bid recommendations based on real-time auction
          velocity.
        </p>

        {/* 2x2 pill grid — 2 across on mobile too */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          {PRO_PILLS.map((p) => (
            <ProPillCard key={p.title} p={p} />
          ))}
        </div>
        </div>
        {/* Phone column — only when inline (desktop) */}
        {inline && (
          <div className="hidden lg:flex lg:h-full lg:items-center lg:justify-center">
            <div className="w-full max-w-[320px]">
              <PhoneMockup />
            </div>
          </div>
        )}
      </div>

      {/* Platforms — FULL WIDTH across the bottom of the card */}
      <div className="mt-10">
        <p
          className="text-center"
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 12,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Works on every platform
        </p>
        <div
          aria-hidden
          className="mx-auto mt-4 h-px w-24"
          style={{ background: "rgba(255,255,255,0.18)" }}
        />
        <ul className="mt-5 grid w-full grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-4 lg:grid-cols-9 lg:gap-x-4">
          {PLATFORMS.map((p) => (
            <li
              key={p}
              className="text-center"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 13,
                fontWeight: 600,
                color: C.white,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (inline) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-5 lg:max-w-[1200px]">
      {content}
    </div>
  );
}

/* ───────────────────────────────────────────��─────────────────────────────────
   PART 6 — CLOSING TAGLINE (LIGHT)
   ────────────────���───────────────────────────────────────────────────────── */
function ClosingTagline() {
  return (
    <div className="mt-20 w-full px-5 pb-2 text-center">
      <h3
        className="whitespace-nowrap"
        style={{
          fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          fontSize: "clamp(2.6rem, 9vw, 11rem)",
          color: CL.ink,
        }}
      >
        Stop guessing.{" "}
        <span style={{ color: CL.emerald, textShadow: "0 0 24px rgba(5,150,105,0.30)" }}>
          Start sniping.
        </span>
      </h3>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT — Dark hero on top, white body below
   ────────────────────────────────────────────────────────────────────────── */
export default function SniperFeaturesBento() {
  return (
    <section
      aria-labelledby="sniper-features-title"
      className="relative w-full overflow-hidden"
      style={{
        background: CL.bg,
        color: CL.ink,
      }}
    >
      {/* Keyframes for in-component animations */}
      <style jsx>{`
        @keyframes sniperFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes sniperGlowPulse {
          0%, 100% { opacity: 0.30; }
          50%      { opacity: 0.55; }
        }
        @keyframes sniperBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        @keyframes sniperScan {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          80%  { transform: translateY(900%); opacity: 1; }
          85%  { opacity: 0; }
          100% { transform: translateY(900%); opacity: 0; }
        }
      `}</style>

      <h2 id="sniper-features-title" className="sr-only">
        Sniper features
      </h2>

      {/* ──── ALL-WHITE SECTION ───────────────────────────────���───────────── */}
      {/* CinematicBlock first on all viewports */}
      <div className="relative w-full pt-0 lg:pt-0">
        <CinematicBlock />
      </div>
      {/* SectionHeader now sits at the BOTTOM of this section on every viewport */}
      <div className="relative w-full pt-6 pb-12 lg:pt-16 lg:pb-20">
        <SectionHeader />
      </div>
      <div className="relative w-full pb-16 lg:hidden">
        <ProUpsellCard />
      </div>
    </section>
  );
}
