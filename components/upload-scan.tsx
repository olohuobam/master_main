"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Camera,
  Upload,
  FileSpreadsheet,
  Layers,
  Video,
  ImagePlus,
  ArrowRight,
} from "lucide-react";

const easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing, delay: i * 0.08 },
  }),
};

// 6 feature nodes — circles stay orange; each icon gets its own multi-color gradient
const nodes = [
  {
    icon: ImagePlus,
    label: "Upload one photo",
    // cyan → blue → violet
    gradient: ["#22D3EE", "#3B82F6", "#8B5CF6"],
  },
  {
    icon: Layers,
    label: "Batch 20 at once",
    // emerald → teal → cyan
    gradient: ["#34D399", "#14B8A6", "#22D3EE"],
  },
  {
    icon: FileSpreadsheet,
    label: "Import a CSV",
    // violet → fuchsia → pink
    gradient: ["#A78BFA", "#D946EF", "#EC4899"],
  },
  {
    icon: TrendingUp,
    label: "Value 1000 at once",
    // amber → orange → red
    gradient: ["#FBBF24", "#F97316", "#EF4444"],
  },
  {
    icon: Video,
    label: "Snipe Video Values",
    // pink → rose → red
    gradient: ["#F472B6", "#FB7185", "#EF4444"],
  },
  {
    icon: Camera,
    label: "Snap a photo",
    // lime → emerald → cyan
    gradient: ["#A3E635", "#10B981", "#06B6D4"],
  },
];

const ORANGE = "#F2622E";
const ORANGE_SOFT = "#FF8755";
const BG = "#0A0A0B";

export default function UploadScan() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40"
      style={{ background: BG }}
    >
      {/* Faint full-bleed grid for depth */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${ORANGE} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative orange dotted globe — left edge */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[1100px] pointer-events-none hidden md:block"
        style={{
          backgroundImage: `radial-gradient(circle, ${ORANGE} 1.4px, transparent 1.8px)`,
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse 55% 70% at 30% 50%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 70% at 30% 50%, black 30%, transparent 75%)",
          transform: "perspective(1000px) rotateY(35deg) translateY(-50%)",
          transformOrigin: "left center",
          opacity: 0.85,
        }}
      />
      {/* Decorative orange dotted globe — right edge */}
      <div
        aria-hidden
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[1100px] pointer-events-none hidden md:block"
        style={{
          backgroundImage: `radial-gradient(circle, ${ORANGE} 1.4px, transparent 1.8px)`,
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse 55% 70% at 70% 50%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 70% at 70% 50%, black 30%, transparent 75%)",
          transform: "perspective(1000px) rotateY(-35deg) translateY(-50%)",
          transformOrigin: "right center",
          opacity: 0.85,
        }}
      />

      <UploadScanContent />
    </section>
  );
}

export function UploadScanContent() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      {/* Hidden SVG with multi-color gradient defs — referenced by icon stroke="url(#iconGradN)" */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          {nodes.map((node, i) => (
            <linearGradient
              key={`iconGrad-${i}`}
              id={`iconGrad${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={node.gradient[0]} />
              <stop offset="50%" stopColor={node.gradient[1]} />
              <stop offset="100%" stopColor={node.gradient[2]} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      <div className="relative w-full max-w-3xl mx-auto px-4 md:px-6">
        {/* HEADLINE */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="text-center font-sans font-black uppercase tracking-tight text-white leading-[0.95]"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
        >
          Upload &amp; <span style={{ color: ORANGE }}>Scan Cards</span>
        </motion.h2>

        {/* SUBHEAD */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={1}
          className="mt-4 max-w-2xl mx-auto text-center text-white/70 leading-relaxed"
          style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)", marginTop: "clamp(1rem, 1.5vw, 1.5rem)" }}
        >
          Upload one photo, batch 20 at once, or import a CSV. Our proprietary
          4-layer AI identifies every detail —{" "}
          <span className="text-white font-medium">
            parallels, autographs, serial numbers.
          </span>
        </motion.p>

        {/* SEARCH BAR PILL — hover trigger for the rain shower light effect */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={2}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative max-w-2xl mx-auto cursor-pointer"
          style={{ marginTop: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-2 rounded-full blur-2xl opacity-60"
            style={{ background: ORANGE }}
          />
          <div
            className="relative flex items-center rounded-full border-2"
            style={{
              gap: "clamp(0.75rem, 1vw, 1rem)",
              padding: "clamp(1rem, 1.5vw, 1.5rem) clamp(1.25rem, 2vw, 1.75rem)",
              background: "rgba(10, 10, 11, 0.85)",
              backdropFilter: "blur(8px)",
              borderColor: ORANGE,
              boxShadow: `0 0 24px ${ORANGE}80, inset 0 0 20px ${ORANGE}25`,
            }}
          >
            <div
              className="rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{
                width: "clamp(2rem, 3vw, 3rem)",
                height: "clamp(2rem, 3vw, 3rem)",
                borderColor: ORANGE,
                boxShadow: `0 0 12px ${ORANGE}aa`,
              }}
            >
              <Search
                style={{ color: ORANGE, width: "clamp(1rem, 1.5vw, 1.5rem)", height: "clamp(1rem, 1.5vw, 1.5rem)" }}
                strokeWidth={2.5}
              />
            </div>
            <p className="font-sans font-semibold text-white tracking-tight" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.5rem)" }}>
              Scan Your Entire Collection In One Go.
            </p>
            {/* Glowing dot at bottom center to anchor connector lines */}
            <span
              aria-hidden
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                background: "white",
                boxShadow: `0 0 12px 4px ${ORANGE}, 0 0 32px 10px ${ORANGE}99`,
              }}
            />
          </div>
        </motion.div>

        {/* CONNECTORS + NODES */}
        <div className="relative -mt-4">
          {/* SVG connector lines: starts touching the search pill's bottom dot, vertical stem, fan out, ends touching the circle tops */}
          <svg
            aria-hidden
            viewBox="0 0 1200 280"
            preserveAspectRatio="none"
            className="absolute inset-x-0 -top-2 w-full pointer-events-none"
            style={{ height: "clamp(120px, 12vw, 220px)" }}
          >
            <defs>
              <linearGradient id="connectorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ORANGE} stopOpacity="1" />
                <stop offset="100%" stopColor={ORANGE} stopOpacity="0.7" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="bulbGlow">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="35%" stopColor={ORANGE_SOFT} stopOpacity="0.7" />
                <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Center vertical TRUNK — touches the pill dot at y=0 and runs to the fan-out point */}
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easing }}
              x1="600"
              y1="0"
              x2="600"
              y2="80"
              stroke="url(#connectorGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#lineGlow)"
            />

            {/* MIDDLE TAIL — short vertical line continuing down through the center, between positions 3 and 4 */}
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: easing }}
              x1="600"
              y1="80"
              x2="600"
              y2="150"
              stroke="url(#connectorGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#lineGlow)"
            />

            {/* Fan-out hub halo */}
            <motion.circle
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
              cx="600"
              cy="80"
              r="14"
              fill="url(#bulbGlow)"
            />
            {/* Fan-out hub bright core */}
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.3 }}
              cx="600"
              cy="80"
              r="3.5"
              fill="white"
            />

            {/* Six curved paths from the fan-out point (600, 80) down to each node — END at y=280 so they touch the circle tops */}
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <motion.path
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.6 + i * 0.06, ease: easing }}
                d={`M 600 80 C 600 180, ${x} 170, ${x} 280`}
                fill="none"
                stroke="url(#connectorGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                filter="url(#lineGlow)"
              />
            ))}

            {/* Small soft halos at line endpoints — sitting ON the top of each circle */}
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <motion.circle
                key={`bulb-glow-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.06, duration: 0.4 }}
                cx={x}
                cy="280"
                r="8"
                fill="url(#bulbGlow)"
              />
            ))}

            {/* Tiny bright white dot endpoints */}
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <motion.circle
                key={`bulb-core-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3 + i * 0.06, duration: 0.3 }}
                cx={x}
                cy="280"
                r="2.5"
                fill="white"
              />
            ))}

            {/* ─── RAIN SHOWER: bright light pulses traveling down all 6 connector paths simultaneously ─── */}
            {/* Trunk pulse — flows down the central trunk from pill toward fan-out hub */}
            <motion.line
              x1="600" y1="0" x2="600" y2="80"
              stroke="white"
              strokeWidth={hovered ? 3 : 2}
              strokeLinecap="round"
              strokeDasharray="14 70"
              animate={{ strokeDashoffset: [84, 0] }}
              transition={{
                duration: hovered ? 0.45 : 1.4,
                repeat: Infinity,
                ease: "linear",
              }}
              opacity={hovered ? 1 : 0.55}
              style={{
                filter: `drop-shadow(0 0 6px white) drop-shadow(0 0 12px ${ORANGE})`,
              }}
            />

            {/* Six rain pulses — one per fan-out path, all moving simultaneously */}
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <motion.path
                key={`rain-${i}`}
                d={`M 600 80 C 600 180, ${x} 170, ${x} 280`}
                fill="none"
                stroke="white"
                strokeWidth={hovered ? 3 : 2}
                strokeLinecap="round"
                strokeDasharray="18 240"
                animate={{ strokeDashoffset: [258, 0] }}
                transition={{
                  duration: hovered ? 0.6 : 1.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: hovered ? 0 : i * 0.08,
                }}
                opacity={hovered ? 1 : 0.5}
                style={{
                  filter: `drop-shadow(0 0 6px white) drop-shadow(0 0 14px ${ORANGE})`,
                }}
              />
            ))}

            {/* When hovered: extra second wave for denser shower */}
            {hovered &&
              [100, 300, 500, 700, 900, 1100].map((x, i) => (
                <motion.path
                  key={`rain-2-${i}`}
                  d={`M 600 80 C 600 180, ${x} 170, ${x} 280`}
                  fill="none"
                  stroke={ORANGE_SOFT}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="10 220"
                  animate={{ strokeDashoffset: [230, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.3,
                  }}
                  opacity={0.85}
                  style={{
                    filter: `drop-shadow(0 0 8px ${ORANGE}) drop-shadow(0 0 16px ${ORANGE})`,
                  }}
                />
              ))}
          </svg>

          {/* Node circles in a horizontal row */}
          <div className="relative grid grid-cols-6 gap-x-1" style={{ paddingTop: "clamp(100px, 11vw, 210px)", rowGap: "clamp(1.5rem, 2vw, 2.5rem)" }}>
            {nodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={3 + i * 0.12}
                className="flex flex-col items-center text-center"
              >
                {/* Orange ring — consistent brand color, pulses on shower-hover */}
                <motion.div
                  animate={
                    hovered
                      ? {
                          boxShadow: [
                            `0 0 22px ${ORANGE}66, inset 0 0 14px ${ORANGE}40`,
                            `0 0 44px ${ORANGE}ff, 0 0 80px ${ORANGE}aa, inset 0 0 22px ${ORANGE}88`,
                            `0 0 22px ${ORANGE}66, inset 0 0 14px ${ORANGE}40`,
                          ],
                          scale: [1, 1.08, 1],
                        }
                      : {
                          boxShadow: `0 0 22px ${ORANGE}66, inset 0 0 14px ${ORANGE}40`,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    repeat: hovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="relative rounded-full flex items-center justify-center"
                  style={{
                    width: "clamp(2.5rem, 5vw, 5rem)",
                    height: "clamp(2.5rem, 5vw, 5rem)",
                    background: "rgba(10, 10, 11, 0.9)",
                    border: `1.5px solid ${ORANGE}`,
                  }}
                >
                  {/* Small bright pinpoint where line meets the circle */}
                  <span
                    aria-hidden
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "white",
                      boxShadow: `0 0 4px 1px ${ORANGE}`,
                    }}
                  />
                  {/* Inner radial disc — subtle orange glow */}
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: "clamp(1.75rem, 3.5vw, 3.5rem)",
                      height: "clamp(1.75rem, 3.5vw, 3.5rem)",
                      background: `radial-gradient(circle at 50% 30%, ${ORANGE}35, ${ORANGE}08 60%, transparent 75%)`,
                    }}
                  >
                    {/* Icon stroked with per-node multi-color gradient */}
                    <node.icon
                      stroke={`url(#iconGrad${i})`}
                      strokeWidth={2}
                      style={{
                        width: "clamp(1rem, 2vw, 2rem)",
                        height: "clamp(1rem, 2vw, 2rem)",
                        filter: `drop-shadow(0 0 6px ${node.gradient[1]}cc) drop-shadow(0 0 12px ${node.gradient[2]}88)`,
                      }}
                    />
                  </div>
                </motion.div>
                <p className="font-semibold text-white leading-tight" style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.875rem)", marginTop: "clamp(0.5rem, 0.8vw, 1rem)", padding: "0 2px" }}>
                  {node.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INFO BOX */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          custom={5}
          className="relative max-w-2xl mx-auto rounded-2xl flex items-center"
          style={{
            marginTop: "clamp(2rem, 3vw, 4rem)",
            padding: "clamp(1rem, 1.5vw, 1.5rem) clamp(1.25rem, 2vw, 1.75rem)",
            gap: "clamp(0.75rem, 1vw, 1rem)",
            background: "rgba(10, 10, 11, 0.85)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid ${ORANGE}`,
            boxShadow: `0 0 24px ${ORANGE}55, inset 0 0 16px ${ORANGE}20`,
          }}
        >
          <div
            className="flex-shrink-0 rounded-xl flex items-center justify-center"
            style={{
              width: "clamp(2.5rem, 3.5vw, 3.5rem)",
              height: "clamp(2.5rem, 3.5vw, 3.5rem)",
              background: `${ORANGE}20`,
              boxShadow: `0 0 16px ${ORANGE}80, inset 0 0 8px ${ORANGE}30`,
            }}
          >
            <TrendingUp
              style={{
                width: "clamp(1.25rem, 1.8vw, 1.75rem)",
                height: "clamp(1.25rem, 1.8vw, 1.75rem)",
                color: ORANGE_SOFT,
                filter: `drop-shadow(0 0 4px ${ORANGE})`,
              }}
              strokeWidth={2}
            />
          </div>
          <p className="flex-1 font-sans font-black uppercase tracking-tight text-white leading-[1.05]" style={{ fontSize: "clamp(0.75rem, 1.2vw, 1.25rem)" }}>
            RETURN LIVE MARKET VALUATIONS <span style={{ color: ORANGE_SOFT }}>IN SECONDS.</span>
          </p>
        </motion.div>

      </div>
    </>
  );
}
