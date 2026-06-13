"use client";

import { useEffect, useRef, useState } from "react";
import SniperFeaturesBento from "@/components/sniper-features-bento";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play, Zap, Target, Crosshair, TrendingUp, Activity,
  DollarSign, Award, History, ShoppingCart, Gauge,
  XCircle, CheckCircle, Globe2, Trophy, Music2, Camera, Facebook,
  Database, RefreshCw, Video, ShieldCheck, Check,
} from "lucide-react";

// ============================================
// SNIPER FEED STAGE — connector tree pattern (like UploadScan, inverted)
// 8 platform icons in a row on top, lines fan DOWN through a hub
// into the video below. Rain-shower light pulses travel the connectors.
// ============================================
const FEED_PLATFORMS = [
  { name: "Whatnot",   logoSrc: "/logos/whatnot.png" },
  { name: "eBay Live", logoSrc: "/logos/ebay.png" },
  { name: "Fanatics",  logoSrc: "/logos/fanatics.png" },
  { name: "TikTok",    logoSrc: "/logos/tiktok.png" },
  { name: "Loupe",     logoSrc: "/logos/loupe.png" },
  { name: "YouTube",   logoSrc: "/logos/youtube.png" },
  { name: "Instagram", logoSrc: "/logos/instagram.png" },
  { name: "Facebook",  logoSrc: "/logos/facebook.png" },
];

const SNIPE_GREEN = "#10B981";
const SNIPE_GREEN_SOFT = "#6EE7B7";

function SignalRail_DEPRECATED() {
  return (
    <div
      className="relative h-full w-full rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0F1115 0%, #14171E 60%, #0F1115 100%)",
        border: "1px solid rgba(16,185,129,0.18)",
        boxShadow:
          "0 30px 60px -25px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-5 pt-5 pb-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-emerald-400"
            style={{
              boxShadow: "0 0 10px rgba(16,185,129,0.9)",
              animation: "feedPulse 1.6s ease-in-out infinite",
            }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-300/90"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            Live Signal Feed
          </span>
        </div>
        <span
          className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          8 Sources
        </span>
      </div>

      {/* Rows */}
      <div className="relative z-10 px-5 py-4 flex flex-col gap-2.5">
        {FEED_PLATFORMS.map((p, i) => (
          <div key={p.name} className="relative flex items-center gap-3 h-11">
            {/* LED dot */}
            <span
              className="relative flex-shrink-0 w-2.5 h-2.5 rounded-full"
              style={{
                background: p.led,
                boxShadow: `0 0 8px ${p.led}, 0 0 14px ${p.led}99`,
                animation: `feedLed 2.2s ease-in-out ${i * 0.22}s infinite`,
              }}
            />
            {/* Logo chip */}
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden grid place-items-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logoSrc}
                alt={p.name}
                className="w-6 h-6 object-contain"
                draggable={false}
              />
            </span>
            {/* Name */}
            <span
              className="text-[13px] font-semibold text-white/85"
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
            >
              {p.name}
            </span>

            {/* Fiber line + traveling pulse, ends at right spine */}
            <span className="relative flex-1 ml-2 mr-4 h-[2px] overflow-hidden rounded-full">
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.22) 100%)",
                }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 h-[6px] w-12 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(110,255,200,1) 50%, rgba(16,185,129,0) 100%)",
                  filter: "blur(0.4px)",
                  boxShadow: "0 0 10px rgba(16,185,129,0.8)",
                  animation: `feedTravel 2.8s linear ${i * 0.35}s infinite`,
                }}
              />
            </span>

            {/* Spine node (right end of the row) */}
            <span
              className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 6px rgba(16,185,129,0.9)" }}
            />
          </div>
        ))}
      </div>

      {/* Right spine connecting all node tips */}
      <div
        className="absolute right-5 z-0 w-[2px] rounded-full"
        style={{
          top: "92px",
          bottom: "92px",
          background:
            "linear-gradient(180deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.55) 50%, rgba(16,185,129,0.15) 100%)",
          boxShadow: "0 0 14px rgba(16,185,129,0.35)",
        }}
      />

      {/* Output trunk — pulses out the LEFT side toward the video */}
      <div className="relative z-10 px-5 pt-2 pb-5 mt-1 border-t border-white/5">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            Output
          </span>
          <span className="relative flex-1 h-[3px] overflow-hidden rounded-full">
            <span
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(16,185,129,0.55) 0%, rgba(16,185,129,0.18) 100%)",
              }}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 h-[10px] w-20 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(110,255,200,0) 0%, rgba(110,255,200,1) 50%, rgba(110,255,200,0) 100%)",
                filter: "blur(0.6px)",
                boxShadow: "0 0 16px rgba(16,185,129,0.95)",
                animation: "feedTrunk 1.6s linear infinite",
              }}
            />
          </span>
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.5)",
              boxShadow: "0 0 18px rgba(16,185,129,0.35)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{
                boxShadow: "0 0 8px rgba(16,185,129,0.95)",
                animation: "feedPulse 1.1s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.18em] uppercase text-emerald-300"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              Sniped
            </span>
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes feedLed {
          0%, 100% { opacity: 0.55; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.15); }
        }
        @keyframes feedTravel {
          0%   { transform: translateX(-60px) translateY(-50%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(110%) translateY(-50%); opacity: 0; }
        }
        @keyframes feedTrunk {
          0%   { transform: translateX(-80px) translateY(-50%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(110%) translateY(-50%); opacity: 0; }
        }
        @keyframes feedPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.9); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
      ` }} />
    </div>
  );
}

function SniperFeedStage() {
  const [hovered, setHovered] = useState(false);
  // 8 evenly distributed x positions across a 1200-unit viewBox
  const xs = [75, 235, 395, 555, 645, 805, 965, 1125];

  // Fluid sizes — scale smoothly with viewport, no breakpoint snapping
  const ICON_SIZE = "clamp(48px, 5.2vw, 80px)";
  const ICON_LABEL_SIZE = "clamp(9px, 0.85vw, 13px)";
  const BANNER_WIDTH = "clamp(56px, 5vw, 84px)";
  const BANNER_TEXT_SIZE = "clamp(14px, 1.5vw, 22px)";

  return (
    <div
      className="relative w-full max-w-[1500px] mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── TOP ROW: 8 platform icons ────────────────────────────── */}
      <div className="relative grid grid-cols-8 gap-1 md:gap-3 px-2 md:px-6">
        {FEED_PLATFORMS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col-reverse items-center text-center"
          >
            <div
              className="relative rounded-full flex items-center justify-center overflow-hidden aspect-square"
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                background: "transparent",
                border: "1.5px solid #FB923C",
                boxShadow: "0 0 18px rgba(251,146,60,0.45)",
              }}
            >
              {/* Bottom pinpoint where the connector line meets the circle */}
              <span
                aria-hidden
                className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full z-10"
                style={{
                  background: "white",
                  boxShadow: `0 0 6px 2px ${SNIPE_GREEN}`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logoSrc}
                alt={p.name}
                className="w-[88%] h-[88%] object-contain"
                draggable={false}
              />
            </div>
            <p
              className="mb-2 md:mb-3 font-semibold text-white/85 leading-tight"
              style={{ fontSize: ICON_LABEL_SIZE }}
            >
              {p.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── CONNECTOR TREE: 8 icons → hub → trunk → video ────────── */}
      <div className="relative">
        <svg
          aria-hidden
          viewBox="0 0 1200 280"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 w-full h-[140px] md:h-[170px] pointer-events-none"
        >
          <defs>
            <filter id="snipePulseGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="snipeBulbGlow">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="35%" stopColor={SNIPE_GREEN_SOFT} stopOpacity="0.7" />
              <stop offset="100%" stopColor={SNIPE_GREEN} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 8 BLACK static rails from each icon (y=0) down to hub (600, 200) */}
          {xs.map((x, i) => (
            <motion.path
              key={`conn-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              d={`M ${x} 0 C ${x} 100, 600 120, 600 200`}
              fill="none"
              stroke="#000000"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}

          {/* Hub halo at (600, 200) */}
          <motion.circle
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.4 }}
            cx="600" cy="200" r="18"
            fill="url(#snipeBulbGlow)"
          />
          <motion.circle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.3 }}
            cx="600" cy="200" r="4"
            fill="white"
          />

          {/* BLACK trunk from hub (600, 200) down to video top (y=280) */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            x1="600" y1="200" x2="600" y2="280"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ─── GREEN PULSING BULB traveling down each rail ─── */}
          {xs.map((x, i) => (
            <motion.path
              key={`rain-${i}`}
              d={`M ${x} 0 C ${x} 100, 600 120, 600 200`}
              fill="none"
              stroke={SNIPE_GREEN_SOFT}
              strokeWidth={hovered ? 4 : 3}
              strokeLinecap="round"
              strokeDasharray="10 260"
              animate={{ strokeDashoffset: [270, 0] }}
              transition={{
                duration: hovered ? 0.6 : 2.0,
                repeat: Infinity,
                ease: "linear",
                delay: hovered ? 0 : i * 0.12,
              }}
              opacity={1}
              filter="url(#snipePulseGlow)"
              style={{
                filter: `drop-shadow(0 0 6px ${SNIPE_GREEN}) drop-shadow(0 0 14px ${SNIPE_GREEN})`,
              }}
            />
          ))}

          {/* Green pulse traveling down the trunk into the video */}
          <motion.line
            x1="600" y1="200" x2="600" y2="280"
            stroke={SNIPE_GREEN_SOFT}
            strokeWidth={hovered ? 4 : 3.2}
            strokeLinecap="round"
            strokeDasharray="10 72"
            animate={{ strokeDashoffset: [82, 0] }}
            transition={{
              duration: hovered ? 0.4 : 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            opacity={1}
            style={{
              filter: `drop-shadow(0 0 6px ${SNIPE_GREEN}) drop-shadow(0 0 12px ${SNIPE_GREEN})`,
            }}
          />
        </svg>

        {/* Spacer that reserves room for the SVG before the video starts */}
        <div className="h-[140px] md:h-[170px]" />
      </div>

      {/* ── BOTTOM: the video, centered, max-width so trunk lands on it ─── */}
      <div className="relative mx-auto" style={{ maxWidth: "min(1439px, 100%)" }}>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: `3px solid ${SNIPE_GREEN}8c`,
            background: "linear-gradient(135deg, #1a1d24 0%, #0f1115 100%)",
            boxShadow: `0 60px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px ${SNIPE_GREEN}40, 0 0 40px ${SNIPE_GREEN}30`,
            aspectRatio: "16 / 10",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/card-app-sniper.mp4" type="video/mp4" />
          </video>

          {/* Top pinpoint where trunk meets the video frame */}
          <span
            aria-hidden
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              background: "white",
              boxShadow: `0 0 10px 2px ${SNIPE_GREEN}, 0 0 24px 6px ${SNIPE_GREEN}99`,
            }}
          />

          {/* LIVE pill */}
          <div
            className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600"
            style={{
              boxShadow: "0 6px 24px rgba(220,38,38,0.55), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
            />
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              Live · Sniping
            </span>
          </div>

          {/* Latency badge */}
          <div
            className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Zap className="w-3 h-3 text-emerald-300" strokeWidth={2.5} />
            <span
              className="text-[10px] font-bold text-white/90"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              0.4s
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function FloatingDataTile({ 
  className, 
  yAnim, 
  duration, 
  children 
}: { 
  className: string; 
  yAnim: number[]; 
  duration: number; 
  children: React.ReactNode 
}) {
  return (
    <motion.div
      animate={{ y: yAnim }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`${className} flex items-center gap-2.5 px-3 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl`}
    >
      {children}
    </motion.div>
  );
}

function SpeedStat({ 
  bigNumber, 
  unit, 
  label, 
  sublabel, 
  accent, 
  icon: Icon 
}: {
  bigNumber: string;
  unit: string;
  label: string;
  sublabel: string;
  accent: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center md:text-left"
    >
      <div 
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4" 
        style={{ background: `${accent}15` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      <div className="flex items-baseline gap-1 justify-center md:justify-start">
        <span
          style={{
            fontSize: "clamp(4rem, 9vw, 7rem)",
            lineHeight: "0.85",
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            color: accent,
            letterSpacing: "-0.02em",
          }}
        >
          {bigNumber}
        </span>
        <span
          style={{
            fontSize: "1.75rem",
            fontFamily: "var(--font-geist-mono), monospace",
            color: accent,
            fontWeight: 500,
          }}
        >
          {unit}
        </span>
      </div>
      <p
        className="text-base md:text-lg font-semibold mt-3"
        style={{ 
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "var(--cv-text)",
        }}
      >
        {label}
      </p>
      <p
        className="text-sm mt-1"
        style={{ 
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "var(--cv-text-muted)",
        }}
      >
        {sublabel}
      </p>
    </motion.div>
  );
}

function FeatureTile({ 
  icon: Icon, 
  accent, 
  title, 
  description 
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="p-6 md:p-7 rounded-2xl bg-white border transition-shadow hover:shadow-xl"
      style={{ 
        borderColor: "var(--cv-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)" 
      }}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
        style={{ background: `${accent}15` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>
      <h3
        className="font-semibold text-lg md:text-xl mb-2"
        style={{ 
          fontFamily: "var(--font-geist-sans), Inter, sans-serif", 
          letterSpacing: "-0.01em",
          color: "var(--cv-text)",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ 
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "var(--cv-text-muted)",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

function PlatformBadge({ 
  bg, 
  mark, 
  icon: Icon, 
  name 
}: {
  bg: string;
  mark?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${bg} flex items-center justify-center shadow-lg`}>
        {mark && <span className="text-white font-black text-lg md:text-xl">{mark}</span>}
        {Icon && <Icon size={22} className="text-white" />}
      </div>
      <span
        className="text-xs md:text-sm font-semibold"
        style={{ 
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          color: "var(--cv-text)",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function ConvergencePlatform({ name, mark, icon: Icon, bg }: {
  name: string;
  mark?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  bg: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="flex flex-col items-center gap-2 z-10"
    >
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${bg} flex items-center justify-center shadow-lg`}>
        {mark && <span className="text-white font-black text-base md:text-xl">{mark}</span>}
        {Icon && <Icon size={20} className="text-white md:hidden" />}
        {Icon && <Icon size={26} className="text-white hidden md:block" />}
      </div>
      <span
        className="text-[10px] md:text-xs font-semibold text-[--cv-text]"
        style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

// ============================================
// PLATFORM ORBIT STAGE (9 platforms + video with wires, pulses, splatters)
// ============================================

const PLATFORMS = [
  { name: "Whatnot",   logoSrc: "/logos/whatnot.png"   },
  { name: "eBay Live", logoSrc: "/logos/ebay.png"       },
  { name: "Fanatics",  logoSrc: "/logos/fanatics.png"   },
  { name: "TikTok",    logoSrc: "/logos/tiktok.png"     },
  { name: "Instagram", logoSrc: "/logos/instagram.png"  },
  { name: "YouTube",   logoSrc: "/logos/youtube.png"    },
  { name: "Drip",      logoSrc: "/logos/drip.png"       },
  { name: "Loupe",     logoSrc: "/logos/loupe.png"      },
  { name: "Facebook",  logoSrc: "/logos/facebook.png"   },
];

function PlatformOrbitStage() {
  // Stage SVG coordinate system: 1920×1080 (matches a desktop viewport, 16:9)
  // Video sits in the center: 1100×620 — roughly doubles the previous size
  const SW = 1920;
  const SH = 1080;
  const CX = SW / 2;
  const CY = SH / 2;
  const VW = 1100;
  const VH = 620;
  const VL = CX - VW / 2;
  const VT = CY - VH / 2;

  // Logos pushed almost to the edges — wires become dramatically long
  const LOGO_RADIUS_X = 880;
  const LOGO_RADIUS_Y = 480;

  // Custom angle (degrees: 0=right, 90=bottom, -90=top) + optional radius multiplier per logo
  const LOGO_LAYOUT = [
    { angle: -90,  radiusMult: 1.00 },  // Whatnot     — top center (12 o'clock)
    { angle: -50,  radiusMult: 1.15 },  // eBay Live   — upper right, extended longer
    { angle: -10,  radiusMult: 0.80 },  // Fanatics    — right, pulled in
    { angle:  30,  radiusMult: 0.88 },  // TikTok      — lower right, pulled in
    { angle:  70,  radiusMult: 1.15 },  // Instagram   — bottom right (pushed out 15%)
    { angle: 110,  radiusMult: 1.05 },  // YouTube     — bottom (slight bump out)
    { angle: 150,  radiusMult: 0.95 },  // Drip        — bottom left, slightly extended
    { angle: -170, radiusMult: 0.88 },  // Loupe       — left, slightly extended
    { angle: -130, radiusMult: 1.05 },  // Facebook    — upper left (fills the gap)
  ];

  const slots = PLATFORMS.map((_, i) => {
    const layout = LOGO_LAYOUT[i];
    const angleRad = (layout.angle * Math.PI) / 180;
    const rx = LOGO_RADIUS_X * layout.radiusMult;
    const ry = LOGO_RADIUS_Y * layout.radiusMult;

    const lx = CX + Math.cos(angleRad) * rx;
    const ly = CY + Math.sin(angleRad) * ry;

    // Compute where the wire hits the video rectangle
    const dx = CX - lx;
    const dy = CY - ly;
    const halfW = VW / 2;
    const halfH = VH / 2;
    const tx = halfW / Math.abs(dx);
    const ty = halfH / Math.abs(dy);
    const t = Math.min(tx, ty);
    const edgeX = CX - dx * t;
    const edgeY = CY - dy * t;

    return { logoX: lx, logoY: ly, edgeX, edgeY, angle: angleRad };
  });

  // Build the wire path for each slot
  const wirePaths = slots.map((s) => {
    const midX = (s.logoX + s.edgeX) / 2;
    const midY = (s.logoY + s.edgeY) / 2;
    const inwardBias = 0.15;
    const cpX = midX + (CX - midX) * inwardBias;
    const cpY = midY + (CY - midY) * inwardBias;
    return `M ${s.logoX} ${s.logoY} Q ${cpX} ${cpY}, ${s.edgeX} ${s.edgeY}`;
  });

  // Refs and state
  const pulsesLayerRef = useRef<SVGGElement>(null);
  const explosionLayerRef = useRef<HTMLDivElement>(null);
  const [liveActive, setLiveActive] = useState(false);
  const liveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseIndexRef = useRef(0);

  // Sequence timing
  const PULSE_DURATION = 800;
  const SEQUENCE_INTERVAL = 700;
  const LIVE_HOLD = 2000;

  useEffect(() => {
    let stopped = false;
    let sequenceTimeout: ReturnType<typeof setTimeout> | null = null;

    function firePulse(idx: number) {
      if (stopped) return;
      const pulsesLayer = pulsesLayerRef.current;
      if (!pulsesLayer) return;

      // Elongated beam of light instead of a dot
      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      pulse.setAttribute("rx", "32");
      pulse.setAttribute("ry", "7");
      pulse.setAttribute("fill", "#10B981");
      pulse.setAttribute("filter", "url(#orbit-beamGlow)");

      const animMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
      animMotion.setAttribute("dur", `${PULSE_DURATION}ms`);
      animMotion.setAttribute("repeatCount", "1");
      animMotion.setAttribute("fill", "freeze");
      animMotion.setAttribute("rotate", "auto");
      const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
      mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#orbit-wire-path-${idx}`);
      animMotion.appendChild(mpath);

      const animOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animOpacity.setAttribute("attributeName", "opacity");
      animOpacity.setAttribute("values", "0;1;1;1;0");
      animOpacity.setAttribute("keyTimes", "0;0.1;0.5;0.9;1");
      animOpacity.setAttribute("dur", `${PULSE_DURATION}ms`);
      animOpacity.setAttribute("repeatCount", "1");
      animOpacity.setAttribute("fill", "freeze");

      pulse.appendChild(animMotion);
      pulse.appendChild(animOpacity);
      pulsesLayer.appendChild(pulse);
      animMotion.beginElement();
      animOpacity.beginElement();

      setTimeout(() => {
        pulse.remove();
        triggerLive(slots[idx].edgeX, slots[idx].edgeY);
      }, PULSE_DURATION);
    }

    function triggerLive(svgX: number, svgY: number) {
      // Badge swap + video glow
      setLiveActive(true);
      if (liveTimeoutRef.current) clearTimeout(liveTimeoutRef.current);
      liveTimeoutRef.current = setTimeout(() => setLiveActive(false), LIVE_HOLD);

      // LIVE word explosion at the exact hit point
      const layer = explosionLayerRef.current;
      if (!layer) return;
      const xPct = (svgX / SW) * 100;
      const yPct = (svgY / SH) * 100;

      const explosion = document.createElement("div");
      explosion.style.cssText = `
        position: absolute;
        left: ${xPct}%;
        top: ${yPct}%;
        pointer-events: none;
        z-index: 1;
      `;
      explosion.innerHTML = `
        <div style="
          position: absolute;
          left: 50%;
          top: 50%;
          width: 56px;
          height: 56px;
          margin: -28px 0 0 -28px;
          border-radius: 50%;
          border: 2px solid rgba(220, 38, 38, 0.6);
          animation: liveExplodeRing 0.8s ease-out forwards;
        "></div>
        <div style="
          position: relative;
          transform: translate(-50%, -50%);
          font-family: var(--font-bebas-neue), Impact, sans-serif;
          font-size: clamp(1.25rem, 2.5vw, 2rem);
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: 0.04em;
          text-shadow:
            0 0 12px rgba(220, 38, 38, 0.9),
            0 0 24px rgba(220, 38, 38, 0.6),
            0 0 3px rgba(255, 255, 255, 0.8);
          animation: liveExplode 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          white-space: nowrap;
        ">LIVE</div>
      `;
      layer.appendChild(explosion);
      setTimeout(() => explosion.remove(), 1300);
    }

    function startSequence() {
      if (stopped) return;
      firePulse(pulseIndexRef.current);
      pulseIndexRef.current = (pulseIndexRef.current + 1) % slots.length;
      sequenceTimeout = setTimeout(startSequence, SEQUENCE_INTERVAL);
    }

    sequenceTimeout = setTimeout(startSequence, 600);

    return () => {
      stopped = true;
      if (sequenceTimeout) clearTimeout(sequenceTimeout);
      if (liveTimeoutRef.current) clearTimeout(liveTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ aspectRatio: `${SW}/${SH}`, margin: "0 auto", maxWidth: "100%" }}>

      {/* SVG layer — wires, pulses */}
      <svg
        viewBox={`0 0 ${SW} ${SH}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <defs>
          {/* Premium glow filter for beam pulses */}
          <filter id="orbit-beamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Wire gradient — cools from white at logo end to emerald at video end */}
          <linearGradient id="orbit-wireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.6)" />
          </linearGradient>
        </defs>

        {/* Static wires — 3-layer cable treatment: shadow halo + gradient body + dashed bevel highlight */}
        <g>
          {wirePaths.map((d, i) => (
            <g key={`wire-${i}`}>
              {/* Outer shadow halo — wider for more weight */}
              <path
                d={d}
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Mid wire — main cable body, thicker */}
              <path
                d={d}
                stroke="url(#orbit-wireGradient)"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
              />
              {/* Inner highlight — thin dashed top line gives 3D bevel illusion, also the animateMotion path */}
              <path
                id={`orbit-wire-path-${i}`}
                d={d}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1 7"
                opacity="0.75"
              />
            </g>
          ))}
        </g>

        {/* Pulses layer (injected dynamically by useEffect) */}
        <g ref={pulsesLayerRef} />
      </svg>

      {/* LIVE word explosion overlay — words burst at each wire impact point */}
      <div
        ref={explosionLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 50 }}
        aria-hidden="true"
      />

      {/* Video frame — absolute center with premium floating treatment */}
      <div
        className="absolute z-10 overflow-hidden transition-all duration-300"
        style={{
          left: `${(VL / SW) * 100}%`,
          top: `${(VT / SH) * 100}%`,
          width: `${(VW / SW) * 100}%`,
          height: `${(VH / SH) * 100}%`,
          borderRadius: "28px",
          border: liveActive
            ? "3px solid rgba(220,38,38,0.7)"
            : "3px solid rgba(16, 185, 129, 0.45)",
          background: "linear-gradient(135deg, #1a1d24 0%, #0f1115 100%)",
          boxShadow: `
              0 60px 120px -30px rgba(0,0,0,0.9),
              inset 0 1px 0 rgba(255,255,255,0.05)
            `,
        }}
      >
        {/* Actual video element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster="/banners/sniper-desktop.jpg"
        >
          <source src="/videos/card-app-sniper.mp4" type="video/mp4" />
        </video>

        {/* STANDBY badge (shown when !liveActive) */}
        {!liveActive && (
          <div
            className="absolute top-7 left-7 md:top-9 md:left-9 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span
              className="text-sm md:text-base font-bold uppercase tracking-widest text-white/60"
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
            >
              Standby
            </span>
          </div>
        )}

        {/* LIVE badge (shown when liveActive) */}
        {liveActive && (
          <div
            className="absolute top-7 left-7 md:top-9 md:left-9 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-red-600"
            style={{
              boxShadow: "0 6px 24px rgba(220,38,38,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
              animation: "liveBadgePop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full bg-white"
              style={{ animation: "liveDot 1s ease-in-out infinite" }}
            />
            <span
              className="text-sm md:text-base font-bold uppercase tracking-widest text-white"
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
            >
              Live · Sniping
            </span>
          </div>
        )}

        {/* Detection timer top-right */}
        <div
          className="absolute top-7 right-7 md:top-9 md:right-9 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Zap size={18} className="text-emerald-400" />
          <span
            className="text-sm md:text-base font-bold text-white"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            0.4s
          </span>
        </div>
      </div>

      {/* Logos layer — absolute positioned around the orbit */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {PLATFORMS.map((p, i) => {
          const s = slots[i];
          return (
            <div
              key={p.name}
              className="absolute flex flex-col items-center gap-2"
              style={{
                left: `${(s.logoX / SW) * 100}%`,
                top: `${(s.logoY / SH) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Name label above for Facebook, Whatnot, eBay Live */}
              {["Facebook", "Whatnot", "eBay Live"].includes(p.name) && (
                <span
                  className="text-xs md:text-sm font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  {p.name}
                </span>
              )}

              {/* Logo container — direct on background */}
              <div
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center overflow-hidden"
              >
                <img
                  src={p.logoSrc}
                  alt={p.name}
                  className="w-full h-full object-contain p-2"
                  draggable={false}
                />
              </div>
              {/* Platform name label below for other platforms */}
              {!["Facebook", "Whatnot", "eBay Live"].includes(p.name) && (
                <span
                  className="text-xs md:text-sm font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  {p.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

// MAIN COMPONENT
// ============================================

function SpinningTargetBackground() {
  return (
    <div
      style={{
        width: "min(95vw, 1100px)",
        aspectRatio: "1 / 1",
        animation: "spinTargetSlow 40s linear infinite",
        transformOrigin: "center center",
      }}
    >
      <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", display: "block" }}>
        <circle cx="120" cy="120" r="118" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        <circle cx="120" cy="120" r="70"  fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <circle cx="120" cy="120" r="40"  fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
        <circle cx="120" cy="120" r="18"  fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
        <line x1="120" y1="0"   x2="120" y2="45"  stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <line x1="120" y1="195" x2="120" y2="240" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <line x1="0"   y1="120" x2="45"  y2="120" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <line x1="195" y1="120" x2="240" y2="120" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <circle cx="120" cy="120" r="5" fill="#F97316" />
      </svg>
      <style jsx>{`
        @keyframes spinTargetSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function CenterBullseyeAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const centerDotRef = useRef<SVGCircleElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const acqRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);
  const statusStackRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stopped = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function schedule(fn: () => void, delay: number) {
      if (stopped) return;
      timeouts.push(setTimeout(fn, delay));
    }

    function runCycle() {
      if (stopped) return;
      const wrap = wrapRef.current;
      const dot = centerDotRef.current;
      const flash = flashRef.current;
      const corners = cornersRef.current?.querySelectorAll<HTMLElement>(".bs-corner");
      const acq = acqRef.current;
      const lock = lockRef.current;
      const fire = fireRef.current;
      const stack = statusStackRef.current;
      const reveal = revealRef.current;
      const letters = reveal?.querySelectorAll<HTMLElement>(".sniped-letter");
      if (!wrap || !dot || !flash || !corners || !acq || !lock || !fire || !stack || !reveal || !letters) return;

      // RESET
      wrap.style.transition = "none";
      wrap.style.transform = "rotate(0deg) scale(1)";
      wrap.style.opacity = "1";
      dot.setAttribute("fill", "#F97316");
      dot.setAttribute("r", "7");
      corners.forEach((c) => {
        c.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
        c.style.transform = "scale(1)";
        c.style.opacity = "1";
      });
      flash.style.opacity = "0";
      stack.style.opacity = "1";
      [acq, lock, fire].forEach((p) => {
        p.style.transition = "opacity 0.25s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      });
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

      // T=0.8s — LOCKED
      schedule(() => {
        corners.forEach((c) => (c.style.transform = "scale(0.78)"));
        acq.style.opacity = "0";
        acq.style.transform = "translate(-50%, -50%) scale(0.85)";
        lock.style.opacity = "1";
        lock.style.transform = "translate(-50%, -50%) scale(1.1)";
        schedule(() => { lock.style.transform = "translate(-50%, -50%) scale(1)"; }, 250);
      }, 800);

      // T=1.7s — FIRING
      schedule(() => {
        lock.style.opacity = "0";
        lock.style.transform = "translate(-50%, -50%) scale(0.85)";
        fire.style.opacity = "1";
        fire.style.transform = "translate(-50%, -50%) scale(1.2)";
        schedule(() => { fire.style.transform = "translate(-50%, -50%) scale(1)"; }, 250);
        dot.setAttribute("r", "16");
        dot.setAttribute("fill", "#DC2626");
        flash.style.transition = "opacity 0.15s";
        flash.style.opacity = "1";
      }, 1700);

      // T=1.95s — Spin out
      schedule(() => {
        flash.style.opacity = "0";
        wrap.style.transition = "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s";
        wrap.style.transform = "rotate(540deg) scale(1)";
        wrap.style.opacity = "0.32";
        corners.forEach((c) => { c.style.transform = "scale(0)"; c.style.opacity = "0"; });
        stack.style.opacity = "0";
      }, 1950);

      // T=2.7s — SNIPED letters cascade in
      schedule(() => {
        reveal.style.transition = "opacity 0.4s";
        reveal.style.opacity = "1";
        letters.forEach((letter, i) => {
          schedule(() => {
            letter.style.transition = "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s";
            letter.style.transform = "scale(1.4)";
            letter.style.opacity = "1";
            schedule(() => { letter.style.transform = "scale(1)"; }, 200);
          }, i * 90);
        });
      }, 2700);

      // T=3.05s — Background rotates continuously
      schedule(() => {
        wrap.style.transition = "transform 8s linear";
        wrap.style.transform = "rotate(1260deg) scale(1)";
      }, 3050);

      // Restart
      schedule(runCycle, 8000);
    }

    runCycle();
    return () => { stopped = true; timeouts.forEach((t) => clearTimeout(t)); };
  }, []);

  return (
    <div className="bs-anim-root">
      <div className="bs-stage">
        {/* Orange L-bracket corners */}
        <div className="bs-corners" ref={cornersRef}>
          <div className="bs-corner bs-corner-tl" />
          <div className="bs-corner bs-corner-tr" />
          <div className="bs-corner bs-corner-bl" />
          <div className="bs-corner bs-corner-br" />
        </div>

        {/* Bullseye SVG wrapper */}
        <div className="bs-wrap" ref={wrapRef}>
          <svg viewBox="0 0 240 240" className="bs-svg">
            <defs>
              <filter id="bs-center-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4.5" />
            <circle cx="120" cy="120" r="70"  fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="4.5" />
            <circle cx="120" cy="120" r="40"  fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="4.5" />
            <circle cx="120" cy="120" r="18"  fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="4.5" />
            <line x1="120" y1="0"   x2="120" y2="45"  stroke="rgba(255,255,255,0.55)" strokeWidth="5" />
            <line x1="120" y1="195" x2="120" y2="240" stroke="rgba(255,255,255,0.55)" strokeWidth="5" />
            <line x1="0"   y1="120" x2="45"  y2="120" stroke="rgba(255,255,255,0.55)" strokeWidth="5" />
            <line x1="195" y1="120" x2="240" y2="120" stroke="rgba(255,255,255,0.55)" strokeWidth="5" />
            <circle ref={centerDotRef} cx="120" cy="120" r="7" fill="#F97316" filter="url(#bs-center-glow)" />
          </svg>
        </div>

        {/* Fire flash */}
        <div className="bs-flash" ref={flashRef} />

        {/* Status banner pills */}
        <div className="bs-status-stack" ref={statusStackRef}>
          <div className="bs-pill bs-pill-acq" ref={acqRef}>
            <span className="bs-acq-dot" />
            <span className="bs-acq-text">ACQUIRING</span>
          </div>
          <div className="bs-pill bs-pill-lock" ref={lockRef}>
            <span className="bs-lock-dot" />
            <span className="bs-lock-text">LOCKED</span>
          </div>
          <div className="bs-pill bs-pill-fire" ref={fireRef}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white" className="bs-fire-bolt">
              <path d="M7 0 L0 8 L5 8 L4 14 L11 5 L6 5 Z" />
            </svg>
            <span className="bs-fire-text">FIRING</span>
          </div>
        </div>

        {/* SNIPED reveal */}
        <div className="bs-reveal" ref={revealRef}>
          <div className="sniped-word">
            {"SNIPED".split("").map((letter, i) => (
              <span key={i} className="sniped-letter">{letter}</span>
            ))}
          </div>
          <div className="bs-seconds-row">
            <div className="bs-seconds-pill">
              <span className="bs-seconds-word">IN</span>
              <span className="bs-seconds-number">4.3</span>
              <span className="bs-seconds-word">SECONDS</span>
            </div>
          </div>
          <div className="bs-psa-row">
            <div className="bs-psa-pill">
              <div className="bs-psa-card-label">
                <span className="bs-psa-italic">PSA</span>
                <span className="bs-psa-grade">10</span>
              </div>
              <span className="bs-psa-price">$430</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bs-anim-root { display:flex; align-items:center; justify-content:center; width:100%; min-height:460px; padding:16px 0; }
        .bs-stage { position:relative; width:460px; height:460px; max-width:100%; }
        .bs-corners { position:absolute; inset:95px; pointer-events:none; z-index:4; }
        .bs-corner { position:absolute; width:32px; height:32px; box-shadow:0 0 18px rgba(249,115,22,0.75); }
        .bs-corner-tl { top:0; left:0; border-top:4px solid #F97316; border-left:4px solid #F97316; }
        .bs-corner-tr { top:0; right:0; border-top:4px solid #F97316; border-right:4px solid #F97316; }
        .bs-corner-bl { bottom:0; left:0; border-bottom:4px solid #F97316; border-left:4px solid #F97316; }
        .bs-corner-br { bottom:0; right:0; border-bottom:4px solid #F97316; border-right:4px solid #F97316; }
        .bs-wrap { position:absolute; top:50%; left:50%; width:240px; height:240px; margin:-120px 0 0 -120px; transform-origin:120px 120px; z-index:3; will-change:transform,opacity; }
        .bs-svg { width:100%; height:100%; display:block; }
        .bs-flash { position:absolute; inset:0; background:radial-gradient(circle,rgba(249,115,22,0.7) 0%,transparent 60%); opacity:0; pointer-events:none; z-index:5; }
        .bs-status-stack { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:7; pointer-events:none; }
        .bs-pill { position:absolute; top:50%; left:50%; display:flex; align-items:center; gap:8px; white-space:nowrap; }
        .bs-pill-acq { transform:translate(-50%,-50%); padding:7px 16px 7px 14px; background:rgba(0,0,0,0.75); border:1px solid rgba(255,255,255,0.25); border-radius:6px; box-shadow:0 4px 16px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.1); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); opacity:1; }
        .bs-acq-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:white; box-shadow:0 0 8px white; animation:bsAcqBlink 1s ease-in-out infinite; }
        .bs-acq-text { font-family:var(--font-geist-mono),"JetBrains Mono","SF Mono",monospace; font-size:13px; line-height:1; color:white; letter-spacing:0.32em; font-weight:700; text-shadow:0 0 4px rgba(255,255,255,0.4); }
        .bs-pill-lock { transform:translate(-50%,-50%) scale(0.8); padding:7px 16px 7px 14px; background:rgba(249,115,22,0.95); border:1px solid rgba(255,255,255,0.35); border-radius:6px; box-shadow:0 6px 24px rgba(249,115,22,0.6),0 0 0 1px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.3); opacity:0; }
        .bs-lock-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:white; box-shadow:0 0 10px white; }
        .bs-lock-text { font-family:var(--font-bebas-neue),Impact,sans-serif; font-size:22px; line-height:1; color:white; letter-spacing:0.12em; font-weight:900; text-shadow:0 1px 0 rgba(0,0,0,0.4); }
        .bs-pill-fire { transform:translate(-50%,-50%) scale(0.8); padding:8px 18px 8px 16px; background:rgba(220,38,38,0.95); border:1px solid rgba(255,255,255,0.4); border-radius:6px; box-shadow:0 8px 32px rgba(220,38,38,0.7),0 0 0 1px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.35); opacity:0; }
        .bs-fire-bolt { filter:drop-shadow(0 0 4px white); }
        .bs-fire-text { font-family:var(--font-bebas-neue),Impact,sans-serif; font-size:24px; line-height:1; color:white; letter-spacing:0.14em; font-weight:900; text-shadow:0 1px 0 rgba(0,0,0,0.4); }
        .bs-reveal { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); opacity:0; z-index:6; text-align:center; pointer-events:none; width:100%; }
        .sniped-word { font-family:var(--font-bebas-neue),Impact,sans-serif; font-size:56px; line-height:0.85; color:white; letter-spacing:0.04em; font-weight:900; text-shadow:0 0 28px rgba(16,185,129,1),0 0 10px rgba(16,185,129,0.8),0 0 3px rgba(255,255,255,0.6),0 2px 0 rgba(0,0,0,0.4); white-space:nowrap; display:inline-flex; }
        .sniped-letter { display:inline-block; transform:scale(0); opacity:0; }
        .bs-seconds-row { margin-top:8px; }
        .bs-seconds-pill { display:inline-flex; align-items:center; padding:5px 12px; background:white; border-radius:6px; box-shadow:0 0 16px rgba(255,255,255,0.5),0 5px 16px rgba(0,0,0,0.6),inset 0 -1.5px 0 rgba(0,0,0,0.1),inset 0 1px 0 white; }
        .bs-seconds-word { font-family:var(--font-bebas-neue),Impact,sans-serif; font-size:17px; line-height:1; color:#0A0A0B; font-weight:900; letter-spacing:0.06em; }
        .bs-seconds-number { font-family:var(--font-bebas-neue),Impact,sans-serif; font-size:17px; line-height:1; color:#10B981; font-weight:900; margin:0 6px; }
        .bs-psa-row { margin-top:11px; }
        .bs-psa-pill { display:inline-flex; align-items:center; gap:9px; padding:6px 13px 6px 9px; background:linear-gradient(180deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.03) 100%); border:1.5px solid rgba(16,185,129,0.6); border-radius:10px; backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); box-shadow:0 8px 24px rgba(0,0,0,0.7),0 0 20px rgba(16,185,129,0.25),inset 0 1px 0 rgba(255,255,255,0.2),inset 0 -1px 0 rgba(0,0,0,0.3); }
        .bs-psa-card-label { display:inline-flex; align-items:center; gap:5px; padding:3px 7px; background:white; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.4),inset 0 -1px 0 rgba(0,0,0,0.1); }
        .bs-psa-italic { font-family:"Arial Black","Helvetica Neue",sans-serif; font-size:12px; line-height:1; font-weight:900; color:#1A3FA0; letter-spacing:-0.04em; font-style:italic; }
        .bs-psa-grade { font-family:"Arial Black","Helvetica Neue",sans-serif; font-size:14px; line-height:1; font-weight:900; color:#0A0A0B; }
        .bs-psa-price { font-family:var(--font-bebas-neue),Impact,sans-serif; font-size:22px; line-height:1; color:white; font-weight:900; letter-spacing:0.02em; text-shadow:0 0 12px rgba(16,185,129,0.7),0 1px 0 rgba(0,0,0,0.4); }
        @keyframes bsAcqBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width:1024px) {
          .bs-anim-root{min-height:380px} .bs-stage{width:380px;height:380px} .bs-corners{inset:78px} .bs-corner{width:28px;height:28px;border-width:3.5px}
          .bs-wrap{width:200px;height:200px;margin:-100px 0 0 -100px;transform-origin:100px 100px}
          .sniped-word{font-size:46px} .bs-acq-text{font-size:12px;letter-spacing:0.28em} .bs-lock-text{font-size:20px} .bs-fire-text{font-size:22px}
          .bs-seconds-word,.bs-seconds-number{font-size:15px} .bs-psa-price{font-size:20px} .bs-psa-italic{font-size:11px} .bs-psa-grade{font-size:13px}
        }
        @media (max-width:640px) {
          .bs-anim-root{min-height:320px} .bs-stage{width:320px;height:320px} .bs-corners{inset:64px} .bs-corner{width:24px;height:24px;border-width:3px}
          .bs-wrap{width:170px;height:170px;margin:-85px 0 0 -85px;transform-origin:85px 85px}
          .sniped-word{font-size:38px} .bs-acq-text{font-size:11px;letter-spacing:0.24em} .bs-pill-acq,.bs-pill-lock{padding:5px 12px 5px 11px} .bs-pill-fire{padding:6px 14px 6px 12px}
          .bs-lock-text{font-size:17px} .bs-fire-text{font-size:19px} .bs-seconds-word,.bs-seconds-number{font-size:13px} .bs-seconds-pill{padding:4px 10px}
          .bs-psa-pill{padding:5px 11px 5px 8px;gap:7px} .bs-psa-card-label{padding:2.5px 6px;gap:4px} .bs-psa-price{font-size:17px} .bs-psa-italic{font-size:10px} .bs-psa-grade{font-size:12px}
        }
        @media (prefers-reduced-motion:reduce) { .bs-wrap,.bs-corner,.bs-pill,.bs-flash,.bs-reveal,.sniped-letter{animation:none!important;transition:none!important} }
      `}</style>
    </div>
  );
}

function LaurelLeft() {
  return (
    <svg width="36" height="60" viewBox="0 0 36 60" fill="none" className="text-[--cv-text-subtle] flex-shrink-0 opacity-40">
      <path
        d="M30 5 Q15 15 10 30 Q15 45 30 55"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M20 12 Q15 14 12 18" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M16 22 Q11 24 9 28" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M16 36 Q11 36 9 32" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M20 46 Q15 46 12 42" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M24 52 Q19 52 16 48" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function LaurelRight() {
  return (
    <svg width="36" height="60" viewBox="0 0 36 60" fill="none" className="text-[--cv-text-subtle] flex-shrink-0 opacity-40">
      <path
        d="M6 5 Q21 15 26 30 Q21 45 6 55"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M16 12 Q21 14 24 18" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M20 22 Q25 24 27 28" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M20 36 Q25 36 27 32" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M16 46 Q21 46 24 42" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M12 52 Q17 52 20 48" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function PlatformOrbitStageMobile() {
  // Top row: 4 platforms (Whatnot, eBay Live, Fanatics, TikTok)
  // Bottom row: 4 platforms (Instagram, YouTube, Loupe, Facebook) — Drip removed for symmetry
  const TOP_ROW = PLATFORMS.slice(0, 4);
  const BOTTOM_ROW = PLATFORMS.filter((p) => p.name !== "Drip").slice(4);
  const TOP_X = [12.5, 37.5, 62.5, 87.5];
  const BOT_X = [12.5, 37.5, 62.5, 87.5];

  return (
    <div className="w-full flex flex-col items-center">
      {/* TOP — 4 platform icons evenly spread */}
      <div className="w-full grid grid-cols-4 gap-2 items-end">
        {TOP_ROW.map((p) => (
          <div key={p.name} className="flex flex-col items-center">
            <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ animation: "mobileTilePulse 2.4s ease-in-out infinite" }}
            >
              <img
                src={p.logoSrc || "/placeholder.svg"}
                alt={p.name}
                className="w-full h-full object-contain p-1"
                draggable={false}
              />
            </div>
            <span
              className="text-[9px] sm:text-[10px] font-semibold text-white text-center mt-1.5 leading-tight"
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
            >
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* CONNECTING LINES — top icons to video (with traveling light pulse) */}
      <svg
        className="w-full my-1"
        height="28"
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {TOP_X.map((x, i) => (
          <g key={i}>
            <line
              x1={x}
              y1={0}
              x2={x}
              y2={28}
              stroke="rgba(16,185,129,0.55)"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.5"
            />
            {/* Traveling light pulse */}
            <circle
              cx={x}
              cy={0}
              r="0.9"
              fill="#10B981"
              style={{
                filter: "drop-shadow(0 0 1.5px #10B981)",
                animation: `mobileLineDown 2.2s ease-in ${i * 0.35}s infinite`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* VIDEO — full width */}
      <div
        className="relative rounded-xl overflow-hidden w-full"
        style={{
          aspectRatio: "16/9",
          background: "linear-gradient(135deg, #1a1d24 0%, #0f1115 100%)",
          border: "2px solid rgba(16, 185, 129, 0.4)",
          boxShadow: "0 0 40px rgba(16,185,129,0.25), 0 20px 40px -16px rgba(0,0,0,0.6)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster="/banners/sniper-desktop.jpg"
        >
          <source src="/videos/card-app-sniper.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-600">
          <span className="w-1 h-1 rounded-full bg-white" style={{ animation: "liveDot 1s ease-in-out infinite" }} />
          <span
            className="text-[8px] font-bold uppercase tracking-widest text-white"
            style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
          >
            Live · Sniping
          </span>
        </div>
      </div>

      {/* CONNECTING LINES — video to bottom icons (with traveling light pulse) */}
      <svg
        className="w-full my-1"
        height="28"
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {BOT_X.map((x, i) => (
          <g key={i}>
            <line
              x1={x}
              y1={0}
              x2={x}
              y2={28}
              stroke="rgba(16,185,129,0.55)"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.5"
            />
            <circle
              cx={x}
              cy={28}
              r="0.9"
              fill="#10B981"
              style={{
                filter: "drop-shadow(0 0 1.5px #10B981)",
                animation: `mobileLineUp 2.2s ease-in ${i * 0.35 + 0.6}s infinite`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* BOTTOM — 4 platform icons evenly spread */}
      <div className="w-full grid grid-cols-4 gap-2 items-start">
        {BOTTOM_ROW.map((p) => (
          <div key={p.name} className="flex flex-col items-center">
            <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ animation: "mobileTilePulse 2.4s ease-in-out 1.2s infinite" }}
            >
              <img
                src={p.logoSrc || "/placeholder.svg"}
                alt={p.name}
                className="w-full h-full object-contain p-1"
                draggable={false}
              />
            </div>
            <span
              className="text-[9px] sm:text-[10px] font-semibold text-white text-center mt-1.5 leading-tight"
              style={{ fontFamily: "var(--font-geist-sans), Inter, sans-serif" }}
            >
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InstantSnipe() {
  return (
    <section id="instant-snipe" className="relative overflow-hidden" style={{ backgroundColor: "var(--cv-bg-section-alt)" }}>
      
      {/* Custom keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes snipePulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.6); }
          }
          @keyframes cheatCodeGlow {
            0%, 100% { box-shadow: 0 12px 28px -8px rgba(245,158,11,0.45), 0 0 0 0 rgba(245,158,11,0); }
            50% { box-shadow: 0 16px 36px -6px rgba(245,158,11,0.65), 0 0 32px 4px rgba(245,158,11,0.15); }
          }
          @keyframes scanLineSweep {
            0%, 100% { opacity: 0; transform: translateY(-100%); }
            45%, 55% { opacity: 0.6; transform: translateY(100%); }
          }
          @keyframes targetReticle {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.15); opacity: 1; }
          }
          @keyframes mobileLineDown {
            0%   { transform: translateY(0);     opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateY(28px); opacity: 0; }
          }
          @keyframes mobileLineUp {
            0%   { transform: translateY(0);      opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateY(-28px); opacity: 0; }
          }
          @keyframes mobileTilePulse {
            0%, 100% { box-shadow: 0 4px 14px -4px rgba(0,0,0,0.12), 0 0 0 0 rgba(16,185,129,0); }
            50%      { box-shadow: 0 4px 14px -4px rgba(0,0,0,0.12), 0 0 0 4px rgba(16,185,129,0.18); }
          }
        `
      }} />

      {/* ============================================ */}
      {/* SUB-SECTION 1: COMBINED HOOK + REVEAL (FULL-WIDTH DARK BAND) */}
      {/* ============================================ */}
      <div className="relative w-screen left-1/2 -ml-[50vw] pt-5 pb-4 md:pt-8 md:pb-8 overflow-hidden" style={{ backgroundColor: "var(--cv-bg-section-alt)" }}>

        {/* Decorative atmospheric glow — subtle emerald wash for light bg */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500 opacity-[0.06] blur-3xl rounded-full pointer-events-none" />

        {/* Dot grid overlay — adjusted for light bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(10,10,11,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Giant spinning target as faded background (stronger on mobile so it shows behind center cue) */}
        <div
          className="absolute inset-0 md:hidden flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ opacity: 0.07, zIndex: 0, transform: "translateY(8%)" }}
        >
          <SpinningTargetBackground />
        </div>
        <div
          className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ opacity: 0.05, zIndex: 0, transform: "translateY(-3%)" }}
        >
          <SpinningTargetBackground />
        </div>

        <div className="relative w-full px-4 md:px-8" style={{ zIndex: 1 }}>

          {/* TOP — FULL WIDTH HEADLINE */}
          <div className="w-full text-center mb-6 md:mb-14">
            <h1
              className="whitespace-nowrap"
              style={{
                fontSize: "clamp(2.6rem, 9.5vw, 9rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                color: "#0A0A0B",
              }}
            >
              Meet the live stream{" "}
              <span
                className="relative inline-block"
                style={{
                  color: "#10B981",
                  WebkitTextStroke: "1.8px #0A0A0B",
                  paintOrder: "stroke fill",
                  textShadow: "0 2px 0 rgba(0,0,0,0.08)",
                }}
              >
                sniper
              </span>
              .
            </h1>

            <h2
              className="mt-8 md:mt-2"
              style={{
                fontSize: "clamp(1.4rem, 5.5vw, 6rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                color: "#0A0A0B",
              }}
            >
              <span
                style={{
                  color: "#F59E0B",
                  WebkitTextStroke: "1.6px #0A0A0B",
                  paintOrder: "stroke fill",
                  textShadow: "0 2px 0 rgba(0,0,0,0.08)",
                  display: "inline-block",
                }}
              >
                Exclusive
              </span>
              {" · "}
              <span style={{ color: "#0A0A0B" }}>
                Cheat Code Unlocked
              </span>
            </h2>
          </div>

          {/* CENTER — clean video + LED signal rail */}
          <div className="w-full px-2 md:px-6">
            <SniperFeedStage />
          </div>

          {/* BELOW VIDEO — Tired of overpaying headline + subtext, centered, FULL WIDTH ONE LINE */}
          <div className="text-center mt-20 md:mt-32 w-full">
            <h2
              className="whitespace-nowrap"
              style={{
                fontSize: "clamp(1.6rem, 8vw, 10rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                color: "#0A0A0B",
              }}
            >
              Tired of{" "}
              <span
                className="relative inline-block"
                style={{
                  color: "#EF4444",
                  WebkitTextStroke: "1.8px #0A0A0B",
                  paintOrder: "stroke fill",
                  textShadow: "0 2px 0 rgba(0,0,0,0.08)",
                }}
              >
                overpaying
              </span>{" "}
              on streams?
            </h2>

          </div>
        </div>

        {/* Required keyframes for this sub-section */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes scrollCueBounce {
              0%, 100% { transform: translateY(0); opacity: 0.4; }
              50% { transform: translateY(8px); opacity: 1; }
            }
            @keyframes bullseyePulse {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.05); opacity: 0.6; }
            }
            @keyframes bullseyeGlow {
              0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
              50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
            }
          `
        }} />
      </div>

      {/* ���─ ORBITAL ANIMATION KEYFRAMES (used by the in-hero orbital stage) ──── */}
      <div className="hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes snipePulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(1.6); }
            }
            @keyframes liveDot {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            @keyframes splatPop {
              0% { opacity: 0; transform: scale(0.2); }
              20% { opacity: 1; transform: scale(1.3); }
              70% { opacity: 0.8; transform: scale(1.6); }
              100% { opacity: 0; transform: scale(2); }
            }
            @keyframes splatRingExpand {
              0% { opacity: 0.9; transform: scale(0.3); }
              100% { opacity: 0; transform: scale(2.8); }
            }
            @keyframes liveBadgePop {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes liveExplode {
              0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(-8deg); }
              15%  { opacity: 1; transform: translate(-50%, -50%) scale(1.4) rotate(2deg); }
              30%  { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
              70%  { opacity: 1; transform: translate(-50%, -50%) scale(1.05) rotate(0deg); }
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1.8) rotate(0deg); }
            }
            @keyframes liveExplodeRing {
              0%   { opacity: 0.9; transform: scale(0.3); }
              100% { opacity: 0;   transform: scale(3.5); }
            }
          `
        }} />
      </div>

      {/* ============================================ */}
      {/* SUB-SECTION 4: EVERY DATA POINT — NEW BENTO LAYOUT */}
      {/* ============================================ */}
      <SniperFeaturesBento />

      {/* ============================================ */}
    </section>
  );
}
