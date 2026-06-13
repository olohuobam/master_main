"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  TrendingUp,
  Zap,
  Download,
  Check,
  X,
  XCircle,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Database,
  Mail,
  Image,
  Cloud,
  Clock,
  ArrowRight,
  FileJson,
} from "lucide-react";
import { UploadScanContent } from "@/components/upload-scan";

const ORANGE = "#F2622E";

const easing = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing, delay: i * 0.08 },
  }),
};

/**
 * Animated aurora-style background for the dark hero section:
 * three large soft orange/red radial orbs that slowly drift + scale,
 * plus a faint static grid for depth.
 */
function AuroraBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Faint static grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff22 1px, transparent 1px), linear-gradient(to bottom, #ffffff22 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orb 1 — top-left orange (reduced intensity, smaller, pushed further off-canvas) */}
      <motion.div
        className="absolute top-[-25%] left-[-20%] w-[40vw] h-[40vw] rounded-full"
        style={{
          background: `radial-gradient(circle, ${ORANGE}26 0%, ${ORANGE}10 45%, transparent 75%)`,
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 40, -10, 0],
          y: [0, 30, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — bottom-right warm red/orange */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: `radial-gradient(circle, #EF444455 0%, ${ORANGE}33 40%, transparent 70%)`,
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, -60, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Orb 3 — center amber accent */}
      <motion.div
        className="absolute top-[40%] left-[35%] w-[40vw] h-[40vw] rounded-full"
        style={{
          background: `radial-gradient(circle, #FBBF2433 0%, ${ORANGE}22 50%, transparent 75%)`,
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Top edge glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${ORANGE}88 50%, transparent 100%)`,
        }}
      />
      {/* Bottom edge glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${ORANGE}88 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}

export default function BulkCSV() {
  return (
    <section className="relative overflow-hidden bg-[--cv-bg]" id="bulk-csv">

      {/* ─── UNIFIED FULL-WIDTH BLACK HERO: headline + scan graphic + video all together ─── */}
      <div className="relative w-full overflow-hidden" style={{ background: "#0A0A0B" }}>
        {/* Animated aurora background */}
        <AuroraBackground />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-20 md:pb-28">
          {/* HEADLINE */}
          <div className="text-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={1}
              className="flex items-center justify-center gap-5 md:gap-7"
            >
              <span
                aria-hidden
                className="h-px w-16 md:w-28 lg:w-40"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ORANGE})`,
                }}
              />
              <p
                className="font-sans text-xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-[0.35em] md:tracking-[0.45em] whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.95)" }}
              >
                Bulk Import
                <span className="mx-3 md:mx-5" style={{ color: ORANGE }}>
                  ·
                </span>
                Value
                <span className="mx-3 md:mx-5" style={{ color: ORANGE }}>
                  ·
                </span>
                Export
              </p>
              <span
                aria-hidden
                className="h-px w-16 md:w-28 lg:w-40"
                style={{
                  background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
                }}
              />
            </motion.div>

            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={2}
              className="whitespace-nowrap text-white mt-8 mx-auto"
              style={{
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                fontSize: "clamp(2rem, 6.8vw, 6rem)",
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                paddingLeft: "clamp(12px, 1.5vw, 24px)",
                paddingRight: "clamp(12px, 1.5vw, 24px)",
              }}
            >
              <span className="block">Stop valuing cards one at a time.</span>
              <span className="block" style={{ color: ORANGE }}>
                Move your whole collection in 60 seconds.
              </span>
            </motion.h2>
          </div>

          {/* Full-width supporting paragraph */}
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={3}
            className="font-sans text-xl md:text-2xl lg:text-[1.75rem] text-white/90 leading-[1.55] mt-10 md:mt-12 w-full text-pretty text-center font-normal"
          >
            Drop your file. We map every column, value every row, and hand you live{" "}
            <span className="font-semibold" style={{ color: ORANGE }}>
              raw + graded comps
            </span>{" "}
            for the entire collection in under a minute. Then{" "}
            <span className="font-semibold text-white">export anywhere</span>.
          </motion.p>

          {/* 50/50 SPLIT: Upload-Scan content (left) + Video (right) — all inside the same black hero */}
          {/* Full width layout with both sections centered */}
          <div className="mt-16 md:mt-20 w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 items-center">

              {/* LEFT — Upload & Scan content (full width, larger sizes) */}
              <div className="relative flex flex-col justify-center">
                <UploadScanContent />
              </div>

              {/* RIGHT — Video (proper aspect ratio, centered) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: easing, delay: 0.2 }}
                className="relative flex items-center justify-center w-full"
              >
                <div className="absolute -top-10 -left-10 w-[400px] h-[300px] bg-purple-500 opacity-[0.12] blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-[400px] h-[300px] bg-emerald-500 opacity-[0.08] blur-3xl rounded-full pointer-events-none" />

                {/* Video frame — proper 16:9 aspect ratio */}
                <div className="relative w-full xl:rounded-3xl bg-[#0A0A0B] p-0 xl:p-3 shadow-2xl shadow-black/30">
                  <div className="relative w-full xl:rounded-2xl overflow-hidden aspect-video bg-black">
                    <video autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover">
                      <source src="/videos/card-app-v3-csv-upload.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ─── REDESIGNED TILES INSIDE BLACK HERO ─── */}
          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                num: "01",
                title: "Bulk Import",
                desc:
                  "Drop your existing collection from anywhere. We map every column to live market data automatically.",
                icon: Upload,
                accent: "#A78BFA",
                accentSoft: "#C4B5FD",
                bullets: [
                  "Up to 5,000 rows per upload",
                  "Any column format — AI matches your data",
                  "JPG, CSV, TSV, XLS — any file type",
                ],
                footer: (
                  <div className="flex flex-col gap-1.5">
                    {[
                      ["Player_Name", "Card Name"],
                      ["Card_Year", "Year"],
                      ["Card_Condition", "Grade"],
                    ].map(([src, dst]) => (
                      <div key={src} className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="text-white/40">{src}</span>
                        <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: "#A78BFA" }} />
                        <span className="text-white font-semibold">{dst}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                num: "02",
                title: "Instant Bulk Valuation",
                desc:
                  "Every imported row gets live market values. Raw, PSA 9, PSA 10, BGS, SGC — all of it, across the entire collection at once.",
                icon: TrendingUp,
                accent: "#34D399",
                accentSoft: "#6EE7B7",
                bullets: [
                  "Sub-60s valuation for 1,000+ cards",
                  "Raw + every graded tier",
                  "30-day trend on every card",
                ],
                footer: (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/50">247 cards valued</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-mono font-bold text-base" style={{ color: "#6EE7B7" }}>
                        $8,420.00
                      </span>
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                        style={{ background: "#34D39922", color: "#6EE7B7" }}
                      >
                        +12% this month
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                num: "03",
                title: "Bulk Export",
                desc:
                  "Export the whole collection with all market data attached — back to your spreadsheet, CRM, accountant, or insurance provider.",
                icon: Download,
                accent: "#22D3EE",
                accentSoft: "#67E8F9",
                bullets: [
                  "CSV, XLS, JSON, PDF — any format",
                  "Filter by grade, sport, value range",
                  "Insurance-ready statements",
                ],
                footer: (
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { icon: FileText, label: "collection.csv" },
                      { icon: FileSpreadsheet, label: "insurance.xlsx" },
                      { icon: FileJson, label: "data.json" },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-semibold"
                        style={{ background: "#22D3EE1A", color: "#67E8F9" }}
                      >
                        <Icon className="w-2.5 h-2.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                ),
              },
            ].map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <motion.div
                  key={tile.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: easing }}
                  whileHover={{ y: -6 }}
                  className={`group/tile relative overflow-hidden rounded-2xl p-4 md:p-8 flex flex-col gap-4 md:gap-5 transition-all duration-300 ${
                    idx === 2 ? "col-span-2 md:col-span-1" : ""
                  }`}
                  style={{
                    background: "rgba(20, 20, 22, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Animated colored side bar */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 group-hover/tile:w-2"
                    style={{
                      background: `linear-gradient(180deg, ${tile.accent}, ${tile.accentSoft})`,
                      boxShadow: `0 0 24px ${tile.accent}cc, 0 0 48px ${tile.accent}66`,
                    }}
                  />

                  {/* Hover glow */}
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${tile.accent}22 0%, transparent 60%)`,
                    }}
                  />

                  {/* Header */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover/tile:scale-110 group-hover/tile:rotate-3"
                      style={{
                        background: `linear-gradient(135deg, ${tile.accent}26, ${tile.accent}0A)`,
                        border: `1px solid ${tile.accent}55`,
                        boxShadow: `0 0 20px ${tile.accent}44, inset 0 0 12px ${tile.accent}22`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{
                          color: tile.accentSoft,
                          filter: `drop-shadow(0 0 6px ${tile.accent})`,
                        }}
                        strokeWidth={2}
                      />
                    </div>
                    <span
                      className="font-mono font-bold text-2xl tracking-tight"
                      style={{ color: `${tile.accent}66` }}
                    >
                      {tile.num}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="relative">
                    <h4 className="font-sans font-bold text-2xl md:text-[1.6rem] text-white leading-tight tracking-tight">
                      {tile.title}
                    </h4>
                    <p className="font-sans text-sm md:text-[15px] text-white/65 leading-relaxed mt-3">
                      {tile.desc}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="relative flex flex-col gap-2.5">
                    {tile.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            background: tile.accent,
                            boxShadow: `0 0 8px ${tile.accent}`,
                          }}
                        />
                        <span className="text-sm text-white/75">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Divider + footer */}
                  <div
                    className="relative pt-5 mt-auto"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {tile.footer}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
