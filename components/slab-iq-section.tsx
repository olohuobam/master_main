"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Target,
  DollarSign,
  Percent,
  Layers,
  Award,
  Check,
  AlertTriangle,
  X,
  ArrowRight,
  ListOrdered,
  Crown,
} from "lucide-react";
import Image from "next/image";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Sub-section 1: Hero + Cinematic Banner ───────────────────────────────────
function HeroBanner() {
  return (
    <div className="relative w-full pt-24 md:pt-32">
      {/* Giant ghost watermark behind hero text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 md:top-20 flex justify-center select-none overflow-hidden"
      >
        <span
          className="whitespace-nowrap text-[#0A0A0B]/[0.035]"
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontSize: "clamp(3rem, 13vw, 26rem)",
            lineHeight: 0.8,
            letterSpacing: "-0.03em",
          }}
        >
          GRADE SMARTER
        </span>
      </div>

      {/* Hero text — full bleed, centered */}
      <div className="relative w-full text-center mb-10 px-4">
        <motion.h1
          {...fadeUp(0)}
          className="font-bold text-[#0A0A0B]"
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            fontSize: "clamp(3.5rem, 14vw, 11rem)",
          }}
        >
          SLAB IQ
        </motion.h1>

        <motion.h2
          {...fadeUp(0.08)}
          className="text-[#0A0A0B] mt-6"
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            fontSize: "clamp(3.4rem, 11vw, 6.5rem)",
          }}
        >
          Your collection is{" "}
          <span className="text-amber-600">hiding money.</span>{" "}
          <span className="text-[#0A0A0B]">This will find it.</span>
        </motion.h2>
      </div>

      {/* 6 Metric tiles above the images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-8 mb-10"
      >
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative group flex flex-col items-center text-center p-2.5 md:p-5 rounded-xl md:rounded-2xl bg-white border-2 border-[#E8EAF0] hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-sm"
            >
              <div className={`absolute top-0 left-3 right-3 md:left-4 md:right-4 h-[3px] rounded-full ${m.accentBar} opacity-70 group-hover:opacity-100 transition-opacity duration-200`} />
              <div className={`w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 ${m.tileBg}`}>
                <m.icon className={`w-4 h-4 md:w-5 md:h-5 ${m.tileColor}`} />
              </div>
              <p className={`font-mono font-bold text-sm md:text-2xl leading-none ${m.tileColor}`}>
                {m.number}
              </p>
              <p className="text-[8px] md:text-[10px] uppercase tracking-wider font-semibold text-[#71717A] mt-1.5 md:mt-2 leading-tight">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image + Comparison side by side */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full px-4 md:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full">

          {/* LEFT — Hero image */}
          <div className="relative flex flex-col">
            <div className="absolute -top-8 -left-8 w-56 h-56 bg-amber-500 opacity-[0.12] blur-3xl rounded-full pointer-events-none" />
            <div className="relative rounded-3xl bg-[#0A0A0B] p-3 shadow-2xl shadow-black/30">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GRADING%20SLAB%20IQ%20-%20MOBILE%20copy%20%281%29-19H2ZoXST5vdDMvX607Ydl4JLBNFSo.jpg"
                  alt="Grading Slab IQ — Your Collection Is Hiding Money. This App Will Find It."
                  width={700}
                  height={700}
                  className="w-full h-auto object-contain"
                  priority
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/90 text-white text-xs font-semibold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered
                </div>
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Monitoring 24/7
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Comparison image */}
          <div className="relative flex flex-col">
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-emerald-500 opacity-[0.10] blur-3xl rounded-full pointer-events-none" />
            <div className="relative rounded-3xl bg-[#0A0A0B] p-3 shadow-2xl shadow-black/30">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0346.JPG-N7VBFYkEwp6n7OkwcykdauxHNKAYjT.jpeg"
                  alt="Same cards. Totally different results. Without Slab IQ vs With Slab IQ comparison showing $18,040 extra profit."
                  width={1000}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// ─── Sub-section 2: Portfolio Analysis ─────────────────────────────���─────────
const metrics = [
  { icon: TrendingUp, bg: "bg-emerald-950", color: "text-emerald-400", tileBg: "bg-emerald-100", tileColor: "text-emerald-700", accentBar: "bg-emerald-500", number: "$278,000", label: "Grading Upside" },
  { icon: Target,     bg: "bg-amber-950",   color: "text-amber-400",   tileBg: "bg-amber-100",   tileColor: "text-amber-700",   accentBar: "bg-amber-500",   number: "147",      label: "Worth Grading" },
  { icon: DollarSign, bg: "bg-blue-950",    color: "text-blue-400",    tileBg: "bg-blue-100",    tileColor: "text-blue-700",    accentBar: "bg-blue-500",    number: "$3,674",   label: "Total Grading Cost" },
  { icon: Percent,    bg: "bg-violet-950",  color: "text-violet-400",  tileBg: "bg-violet-100",  tileColor: "text-violet-700",  accentBar: "bg-violet-500",  number: "6,060%",   label: "Avg ROI" },
  { icon: Layers,     bg: "bg-rose-950",    color: "text-rose-400",    tileBg: "bg-rose-100",    tileColor: "text-rose-700",    accentBar: "bg-rose-500",    number: "$42,180",  label: "Collection Value" },
  { icon: Award,      bg: "bg-emerald-950", color: "text-emerald-400", tileBg: "bg-emerald-100", tileColor: "text-emerald-700", accentBar: "bg-emerald-500", number: "$282K",    label: "PSA 10 Potential" },
];

function PortfolioAnalysis() {
  return null;
}

// ─── Sub-section 3: Comparison + $17,610 Punchline ───────────────────────────
function Comparison() {
  return (
    <div className="bg-[#F8F9FA] border-y border-[#E4E4E7] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Section heading */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4">
            Side-by-Side Comparison
          </p>
          <h3 className="font-serif font-normal text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[#0A0A0B] text-balance">
            Same cards.{" "}
            <span className="italic text-amber-600">Totally different results.</span>
          </h3>
          <p className="text-lg text-[#52525B] mt-5 max-w-xl mx-auto">
            Two collectors. Same collection size. One guesses. One uses Slab IQ.
          </p>
        </motion.div>

        {/* 50/50 combined layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT — Grading Candidates */}
          <motion.div {...fadeUp(0.06)} className="flex flex-col rounded-3xl bg-white border-2 border-amber-200 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-50 to-emerald-50 px-7 py-6 border-b-2 border-amber-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0">
                    <ListOrdered className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Grading Candidates</p>
                    <p className="font-mono font-bold text-5xl text-[#0A0A0B] leading-none mt-1">147</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Analysis
                </span>
              </div>
              <p className="text-sm text-[#52525B] mt-3">
                cards in this example collection ranked by ROI
              </p>
            </div>

            {/* Card list */}
            <div className="p-7 flex flex-col gap-4 flex-1">
              <p className="text-sm text-[#52525B] leading-relaxed">
                Every candidate sorted by net profit potential — with raw value, PSA 10 value, total cost, and ROI math on every row.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { rank: "1", name: "Mike Trout 2011 Topps Update RC", roi: "1,117%", color: "bg-amber-500" },
                  { rank: "2", name: "Sidney Crosby 2005 Young Guns RC", roi: "1,071%", color: "bg-amber-400" },
                  { rank: "3", name: "Charizard 1999 Base Set Holo", roi: "1,070%", color: "bg-amber-300" },
                ].map((row) => (
                  <div key={row.rank} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-[#E4E4E7] hover:border-amber-300 hover:shadow-sm transition-all duration-200">
                    <div className={`w-8 h-8 rounded-lg ${row.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
                      {row.rank}
                    </div>
                    <p className="text-sm text-[#0A0A0B] font-medium flex-1 truncate">{row.name}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-semibold flex-shrink-0">
                      <TrendingUp className="w-3 h-3" />
                      {row.roi}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-dashed border-[#D4D4D8]">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold flex-shrink-0">+144</div>
                  <p className="text-sm text-[#71717A] italic flex-1">...141 more candidates</p>
                  <ArrowRight className="w-4 h-4 text-[#71717A] flex-shrink-0" />
                </div>
              </div>

              {/* The Difference punchline */}
              <div className="mt-2 rounded-2xl bg-[#0A0A0B] p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">The Difference</p>
                <p className="font-mono font-bold text-5xl text-emerald-400 leading-none">+$17,610</p>
                <p className="text-sm text-[#94A3B8] mt-2">extra profit in just 10 submissions</p>
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-semibold px-6 py-3.5 rounded-xl text-base hover:bg-amber-400 hover:shadow-[0_10px_28px_-10px_rgba(245,158,11,0.6)] transition-all duration-200">
                See the full Slab IQ dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-[#71717A] text-center -mt-1">Included with all Pro and Pro+ subscriptions</p>
            </div>
          </motion.div>

          {/* RIGHT — Without vs With comparison */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5">

            {/* Without Slab IQ */}
            <div className="rounded-2xl bg-white border-[3px] border-red-300 overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b-2 border-red-100 bg-red-50/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-red-500">Without Slab IQ</p>
                </div>
                <h4 className="text-3xl md:text-4xl font-bold text-[#0A0A0B]">Guessing</h4>
              </div>
              <div className="px-6 py-5 flex flex-col gap-2.5">
                {[
                  "Guess which cards might be worth grading",
                  "Pay $24.99 per card hoping for a PSA 10",
                  "Receive grades you didn't expect — or want",
                  "Sell at a loss or sit on dead inventory",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <p className="text-sm text-[#3F3F46]">{text}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-5 pt-1 border-t border-red-100 bg-red-50/30 text-center">
                <p className="font-mono font-bold text-4xl text-red-500">$430</p>
                <p className="text-[10px] uppercase tracking-widest text-[#71717A] mt-1">avg. profit / 10 submissions</p>
              </div>
            </div>

            {/* With Slab IQ */}
            <div className="rounded-2xl bg-white border-[3px] border-emerald-400 overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b-2 border-emerald-100 bg-emerald-50/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">With Slab IQ</p>
                </div>
                <h4 className="text-3xl md:text-4xl font-bold text-[#0A0A0B]">AI-Powered Intelligence</h4>
              </div>
              <div className="px-6 py-5 flex flex-col gap-2.5">
                {[
                  "Know exactly which cards pencil out before you submit",
                  "Only pay for cards with a confirmed 4x+ ROI floor",
                  "Predict likely grade range based on comparable data",
                  "Submit with confidence, sell at the top of market",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-sm text-[#3F3F46]">{text}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-5 pt-1 border-t border-emerald-100 bg-emerald-50/30 text-center">
                <p className="font-mono font-bold text-4xl text-emerald-600">$18,470</p>
                <p className="text-[10px] uppercase tracking-widest text-[#71717A] mt-1">avg. profit / 10 submissions</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-section 4: Social Proof Marquee + Tease CTA ─────────────────────────
type Tier = "GOLD" | "ELITE" | null;
interface EarnerCard {
  persona: string;
  city: string;
  amount: string;
  tier: Tier;
  card: string;
  image: string;
}

const row1: EarnerCard[] = [
  { persona: "Vintage Collector", city: "New York", amount: "$5,340", tier: "GOLD", card: "2022-23 Panini Select Blue #79 · AGS 9.5", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225513-dG0Wjq3HoxQ77TSS3u2nmvZIbxxTb1.png" },
  { persona: "Set Builder", city: "Ohio", amount: "$2,100", tier: "GOLD", card: "2025 Topps #204 Rookie · GMA 9", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225833-NH1G32H6AxWQi8rqCHuj60eT6tEDwI.png" },
  { persona: "Grader Pro", city: "Georgia", amount: "$7,200", tier: "ELITE", card: "1992-93 Upper Deck #1B Trade · Beckett Auto", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225242-EQz8RNjDQgqBWFWbMaHP5iC2ZjBQF8.png" },
  { persona: "Card Flipper", city: "Arizona", amount: "$980", tier: null, card: "2024 Prospect Edition #143 · PSA 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20224024-E3MiBBB0JZkskEUNLw6JArOadNGT51.png" },
  { persona: "Power Seller", city: "Florida", amount: "$4,820", tier: "ELITE", card: "2024 Topps Heritage #479 · CGC 9", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223847-JgSg77jFa2mwx7KkugXkePeJvWsRxe.png" },
  { persona: "Rookie Hunter", city: "Texas", amount: "$3,210", tier: "GOLD", card: "1990 Score #285 · PSA 9", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223727-usD8tYTSLNg8H7tQE8ndUEG8Hn9OkG.png" },
  { persona: "Hobby Shop Owner", city: "Illinois", amount: "$6,540", tier: "ELITE", card: "One Piece 2024 ST03-013 · CGC 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223814-fXm98stCTwdvl4ZvWj5tEL7rmHjc2m.png" },
  { persona: "Pokemon Master", city: "California", amount: "$8,120", tier: "ELITE", card: "2025 Pokemon JTG #187 · PSA 9", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223752-o6Ygtm4vAzUtk6vKsC4Sby4vCsdAVH.png" },
  { persona: "Baseball Scout", city: "Missouri", amount: "$2,890", tier: "GOLD", card: "2024 Bowman #BD22 Rookie · GMA 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225846-ALib2TxuysPR5xfVpNxnd96Tg3Hn7N.png" },
  { persona: "NBA Investor", city: "Indiana", amount: "$12,450", tier: "ELITE", card: "2023-24 Prizm Black Gold #136 · AGS 9.5", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225528-JKw0chOhxKnk6nff5FEOELjP94pQru.png" },
];
const row2: EarnerCard[] = [
  { persona: "Hockey Fan", city: "Colorado", amount: "$3,760", tier: "GOLD", card: "2018 O-Pee-Chee Platinum #165 · TAG 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223949-rdXkA4baMjikLvVpINwPqoFsOQtDBt.png" },
  { persona: "Prospect Hunter", city: "Tennessee", amount: "$1,450", tier: "ELITE", card: "2024 Topps Heritage Chrome #267 · CGC 8.5", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223904-0ArhOhpESNrDmBuvMYHrTEpxJ3g2Gm.png" },
  { persona: "College Hoops", city: "Minnesota", amount: "$5,900", tier: "GOLD", card: "2024 Bowman's Best #21 Red · TAG 8", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20224109-9qMzGBcFH0zNcFrLmd5UPd8ykWxclM.png" },
  { persona: "Auto Collector", city: "Washington", amount: "$1,220", tier: null, card: "1993 Classic Four Sport #285 · Beckett Auto", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225326-8RZzZzajfCjER4mhrqYTaIs3beMdSE.png" },
  { persona: "NFL Rookie Hunter", city: "Nevada", amount: "$4,100", tier: "GOLD", card: "2024 Zenith #109 Rookie · GMA 8", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225923-Jf5cXn16CZ1Oqq9SEcQ2RccuHnDOwA.png" },
  { persona: "Pokemon Legend", city: "Oregon", amount: "$285,000", tier: "ELITE", card: "1999 Base Set 1st Ed Charizard · CGC 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225000-9nTRcVg1mie1BYiqB8ycLHZyIBE7CK.png" },
  { persona: "Prizm Pro", city: "Pennsylvania", amount: "$1,980", tier: "GOLD", card: "2024 Prizm #378 Lazer · PSA 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223741-foT4cEKRc9iFonRdLEo62flvy3W8br.png" },
  { persona: "Select Specialist", city: "Georgia", amount: "$7,650", tier: "ELITE", card: "2021 Select #254 Gold Disco · PSA 10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20223655-9Caf4wiNQrAzntrxQhXYgO8nv3w483.png" },
  { persona: "Vintage Legend", city: "Texas", amount: "$4,320", tier: "GOLD", card: "1974 Topps #20 Nolan Ryan · GMA 6", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-03%20225905-j2Y1OXkrSkgoWxm5V4EIRjbSTLbfz8.png" },
];

function EarnerCardItem({ e }: { e: EarnerCard }) {
  return (
    <div className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 pr-4 md:pr-5 rounded-xl md:rounded-2xl bg-white border border-[#E4E4E7] shadow-sm min-w-[248px] md:min-w-[340px] flex-shrink-0">
      {/* Card image */}
      <div className="w-12 h-16 md:w-20 md:h-28 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden relative">
        <Image
          src={e.image}
          alt={e.card}
          width={80}
          height={112}
          className="w-full h-full object-cover"
        />
        {e.tier && (
          <span
            className={`absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
              e.tier === "GOLD" ? "bg-amber-500 text-white" : "bg-purple-500 text-white"
            }`}
          >
            {e.tier === "GOLD" ? <Crown className="w-2 h-2" /> : <Sparkles className="w-2 h-2" />}
            {e.tier}
          </span>
        )}
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] md:text-xs font-semibold text-[#0A0A0B] truncate">
          {e.persona} <span className="font-normal text-[#52525B]">· {e.city}</span>
        </p>
        <p className="font-mono font-semibold text-base md:text-2xl text-emerald-600 mt-0.5">
          {e.amount} <span className="font-sans font-normal text-[10px] md:text-xs text-[#52525B]">this month</span>
        </p>
        <p className="text-[10px] md:text-xs text-[#52525B] truncate mt-0.5">{e.card}</p>
      </div>
    </div>
  );
}

function SocialProof() {
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <div
      className="relative overflow-hidden py-12 md:py-32 my-8"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 0%, #122a23 0%, #0c1a16 38%, #0a0f0d 70%, #070908 100%)",
      }}
    >
      {/* Top + bottom edge fade for seamless blend */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAFAFA] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAFAFA] to-transparent"
      />

      {/* Fine grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      {/* Color glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 w-[32rem] h-[32rem] -translate-x-1/2 rounded-full bg-emerald-500/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[32rem] h-[32rem] translate-x-1/2 rounded-full bg-amber-500/20 blur-[120px]"
      />

      {/* Heading with glowing background echo */}
      <motion.div {...fadeUp(0)} className="relative w-full px-6 md:px-8 text-center mb-8 md:mb-12">
        <div className="relative inline-block">
          {/* Blurred glow echo behind the title */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center md:whitespace-nowrap text-emerald-400/40 blur-2xl select-none"
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              fontSize: "clamp(3rem, 10vw, 7rem)",
            }}
          >
            Top earners are using Slab IQ.
          </span>
          <h3
            className="relative text-white md:whitespace-nowrap"
            style={{
              fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              fontSize: "clamp(3rem, 10vw, 7rem)",
              textShadow:
                "0 1px 0 rgba(255,255,255,0.12), 0 8px 30px rgba(0,0,0,0.55), 0 2px 14px rgba(16,185,129,0.35)",
            }}
          >
            Top earners are using{" "}
            <span className="text-amber-400">Slab IQ.</span>
          </h3>
        </div>
        <p
          className="text-emerald-400 mt-4"
          style={{
            fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            fontSize: "clamp(1.5rem, 5.6vw, 3.5rem)",
            textShadow: "0 2px 20px rgba(16,185,129,0.45)",
          }}
        >
          Stop guessing which cards to grade. Start printing money.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <div className="relative z-10 overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0f0d] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0f0d] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — right to left */}
        <div className="flex gap-4 animate-marquee-right mb-4">
          {doubled1.map((e, i) => (
            <EarnerCardItem key={`r1-${i}`} e={e} />
          ))}
        </div>

        {/* Row 2 — left to right */}
        <div className="flex gap-4 animate-marquee-left">
          {doubled2.map((e, i) => (
            <EarnerCardItem key={`r2-${i}`} e={e} />
          ))}
        </div>
      </div>

      {/* Trust line */}
      <p className="relative z-10 text-xs text-white/50 italic text-center mt-8 max-w-3xl mx-auto px-6">
        Earnings are anonymized and verified through our platform. Names, locations, and card
        details shown are representative samples. Active Slab IQ subscribers average 4-12x return
        on grading fees.
      </p>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

function StepsBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-3 md:px-8 pt-2 md:pt-10 pb-16 md:pb-20"
    >
      {/* Desktop banner — hidden on mobile */}
      <div className="hidden lg:block w-4/5 mx-auto">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20STEPS%20-%20DESKTOP%20%283%29-U9oZ0dk4Rq5Kqpw6s7lp4hrUilvSs7.png"
          alt="You don't have to do anything - Easy as 1, 2, 3. Step 1: Scan and Collect. Step 2: We Monitor 24/7. Step 3: Get Your Grading List."
          width={1920}
          height={400}
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>
      {/* Mobile banner — hidden on desktop */}
      <div className="block lg:hidden w-full mx-auto">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20STEPS%20MOBILE%20WEB%20%283%29-YqFwGmE9ZRU3Be0iqPIMXckbaKGAmq.png"
          alt="You don't have to do anything - We watch your cards for you! Easy as 1, 2, 3. Step 1: Scan and Collect. Step 2: We Monitor 24/7. Step 3: Get Your Grades."
          width={1000}
          height={1200}
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>
    </motion.div>
  );
}

export default function SlabIQSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA]" id="slab-iq">
      <HeroBanner />
      <SocialProof />
      <StepsBanner />
    </section>
  );
}
