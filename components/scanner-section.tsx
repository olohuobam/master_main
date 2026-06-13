"use client"

import { motion } from "framer-motion"
import {
  Zap,
  Database,
  Award,
} from "lucide-react"
import { ProcessSteps } from "@/components/process-steps"

const CARDS = [
  {
    name: "PARALLELS",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PARALLELS%201-Cxjw2YgXEpwGbDngiujz3JkH8kuRPt.png",
  },
  {
    name: "AUTOGRAPHS",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AUTOGRAPHS%201-y3f5xEqR3Pr7WEqyMeo0ovDqsvzowP.png",
  },
  {
    name: "SERIAL-NUMBERED",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SERIAL%20NUMBERED1-8HNAAsypd1hNTCVx5ygsCdhbfRX4Nj.png",
  },
  {
    name: "GRADED SLABS",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GRADED%20SLABS%201-dUbYxRzTbxxMA8kVveJeP0iA6shv7O.png",
  },
  {
    name: "LIMITED SETS",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIMITED%20SETS%201-KDL3If1KRegFEeeC8cXjkvf2YYet4r.png",
  },
]

export default function ScannerSection() {
  return (
    <>
      <section
        id="scanner"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          background: "#FAFAFA",
          position: "relative",
          overflow: "hidden",
          paddingTop: "clamp(48px, 6vw, 88px)",
          paddingBottom: "clamp(48px, 6vw, 88px)",
        }}
      >
        <div
          className="ss-container"
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
            padding: "0 clamp(20px, 3.5vw, 56px)",
            containerType: "inline-size",
            containerName: "scanner",
          }}
        >
          {/* HEADLINE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <h2
              className="ss-headline whitespace-nowrap"
              style={{
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                fontSize: "clamp(2rem, 5.4vw, 8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                margin: 0,
                color: "#0A0A0B",
                textAlign: "center",
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                paddingLeft: "clamp(12px, 1.5vw, 24px)",
                paddingRight: "clamp(12px, 1.5vw, 24px)",
              }}
            >
              <span>BULK </span>
              <span
                style={{
                  color: "#10B981",
                  WebkitTextStroke: "1.8px #0A0A0B",
                  paintOrder: "stroke fill",
                }}
              >
                VALUE SCANNER
              </span>
              <br className="ss-mobile-break" />
              <span> WITH </span>
              <span style={{ position: "relative", display: "inline" }}>
                <span
                  style={{
                    color: "#10B981",
                    WebkitTextStroke: "1.8px #0A0A0B",
                    paintOrder: "stroke fill",
                  }}
                >
                  4-AI VISION
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "0.12em",
                    left: 0,
                    right: 0,
                    height: "0.05em",
                    background: "#10B981",
                    borderRadius: "2px",
                  }}
                />
              </span>
              <span> TECHNOLOGY</span>
            </h2>
          </motion.div>

          {/* SCAN → READ → INSTANTLY animated process steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="ss-process-wrap"
            style={{
              margin: "2.2em auto 2.6em",
              width: "100%",
              maxWidth: "min(820px, 100%)",
              padding: "0 0.5em",
            }}
          >
            <ProcessSteps />
          </motion.div>

          {/* TWO-COLUMN ROW */}
          <div
            className="ss-row"
            style={{
              display: "grid",
              gridTemplateColumns: "0.95fr 1.85fr",
              gap: "2.2em",
              alignItems: "start",
              marginTop: "3em",
            }}
          >
            {/* LEFT COLUMN - Cards */}
            <div>
              <h3
                className="whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                  fontSize: "clamp(1.8rem, 5.2vw, 3.8rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.01em",
                  color: "#0A0A0B",
                  margin: "0.6em 0 0.25em",
                  fontWeight: 400,
                }}
              >
                WE READ{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    textDecorationThickness: "0.06em",
                    textUnderlineOffset: "0.08em",
                  }}
                >
                  EVERY
                </span>{" "}
                <span style={{ color: "#10B981" }}>CARD TYPE.</span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                  fontSize: "1.1em",
                  lineHeight: 1.5,
                  color: "#374151",
                  margin: "0 0 1em",
                  maxWidth: "26em",
                  fontWeight: 500,
                }}
              >
                Generic AI guesses. Our 4-AI identifies every variant across these five categories —{" "}
                <span style={{ color: "#10B981", fontWeight: 700 }}>instantly</span>.
              </p>

              {/* CARDS GRID — row 1: 2 tiles, row 2: 3 tiles, both centered */}
              <div
                className="ss-cards"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6em",
                  marginTop: "0.5em",
                  alignItems: "center",
                }}
              >
                {/* Row 1 — PARALLELS, AUTOGRAPHS */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6em", width: "100%" }}>
                  {CARDS.slice(0, 2).map((card, i) => (
                    <motion.div
                      key={card.name}
                      custom={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: (idx: number) => ({
                          opacity: 1,
                          y: 0,
                          transition: { delay: idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        }),
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      style={{ aspectRatio: "1 / 1", flex: "0 0 calc(33.333% - 0.4em)", maxWidth: "calc(33.333% - 0.4em)" }}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Row 2 — SERIAL-NUMBERED, GRADED SLABS, LIMITED SETS */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6em", width: "100%" }}>
                  {CARDS.slice(2).map((card, i) => (
                    <motion.div
                      key={card.name}
                      custom={i + 2}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: (idx: number) => ({
                          opacity: 1,
                          y: 0,
                          transition: { delay: idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        }),
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      style={{ aspectRatio: "1 / 1", flex: "0 0 calc(33.333% - 0.4em)", maxWidth: "calc(33.333% - 0.4em)" }}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Video + Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: "1em" }}
            >
              {/* Video container */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: "#0A0A0B",
                  borderRadius: "1.2em",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "1.2em",
                    left: "1.2em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5em",
                    padding: "0.45em 0.9em",
                    background: "#3B82F6",
                    color: "white",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.75em",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    borderRadius: "100em",
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      width: "0.4em",
                      height: "0.4em",
                      borderRadius: "50%",
                      background: "white",
                      animation: "ss-pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  LIVE SCANNING
                </span>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "radial-gradient(circle at 30% 40%, rgba(16,185,129,0.25), transparent 55%), radial-gradient(circle at 70% 60%, rgba(59,130,246,0.22), transparent 55%), linear-gradient(135deg, #0A0A0B 0%, #1F2937 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                    letterSpacing: "0.18em",
                    fontSize: "1.1em",
                  }}
                >
                  SCANNER DEMO
                </div>
              </div>

              {/* Stats row under video */}
              <div
                className="ss-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  background: "white",
                  border: "0.5px solid rgba(0,0,0,0.08)",
                  borderRadius: "0.8em",
                  padding: "1em 0",
                }}
              >
                {[
                  { Icon: Zap, color: "#F59E0B", text: "Sub-3-second ID" },
                  { Icon: Database, color: "#3B82F6", text: "16M+ database" },
                  { Icon: Award, color: "#10B981", text: "By collectors, for collectors" },
                ].map(({ Icon, color, text }, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6em",
                      padding: "0 1.1em",
                      borderRight: i < 2 ? "0.5px solid rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    <Icon size={16} color={color} strokeWidth={2.2} />
                    <span
                      style={{
                        fontFamily: "var(--font-geist-sans), Inter, sans-serif",
                        fontSize: "0.95em",
                        fontWeight: 600,
                        color: "#0A0A0B",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .ss-container {
          --ss-base: clamp(0.85rem, 1.2cqi + 0.3rem, 1.46rem);
          font-size: var(--ss-base);
        }

        /* Mobile line break hidden on desktop */
        .ss-mobile-break {
          display: none;
        }

        @keyframes ss-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        /* Cards become 2 columns on very narrow */
        @container scanner (max-width: 480px) {
          .ss-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ss-stats {
        @container scanner (max-width: 760px) {
          .ss-headline {
            white-space: normal !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .ss-mobile-break {
            display: block;
          }
          .ss-row {
            grid-template-columns: 1fr !important;
            gap: 1.8em !important;
          }
          .ss-row > div:first-child {
            order: 2 !important;
            text-align: center !important;
          }
          .ss-row > div:nth-child(2) {
            order: 1 !important;
          }
          .ss-row > div:first-child > h3,
          .ss-row > div:first-child > p {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .ss-row > div:first-child > p {
            max-width: 32em !important;
            font-size: 1.15em !important;
          }
          .ss-row > div:first-child > h3 {
            font-size: 2.6em !important;
            margin-bottom: 0.35em !important;
          }
          .ss-container {
            --ss-base: clamp(0.85rem, 2.5cqi, 1rem);
          }
          .ss-prop-badge {
            font-size: 1.25em !important;
            padding: 0.65em 1.3em !important;
            letter-spacing: 0.1em !important;
          }
          .ss-process-wrap {
            margin: 1.4em auto 1.8em !important;
            padding: 0 0.25em !important;
          }
        }

        /* Cards become 2 columns on very narrow */
        @container scanner (max-width: 480px) {
          .ss-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ss-stats {
            grid-template-columns: 1fr !important;
          }
          .ss-stats > div {
            border-right: none !important;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
            padding: 0.5em 1em !important;
            justify-content: center !important;
          }
          .ss-stats > div:last-child {
            border-bottom: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ss-flip-inner {
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
