"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Crown, Medal, TrendingUp, ChevronLeft, ChevronRight, ArrowRight, Users, DollarSign, UserPlus, Gift, Star } from "lucide-react"

const LEADERBOARD = [
  { 
    rank: 1, name: "Marcus Chen", 
    monthlyEarnings: 1847, weekly: 285, referrals: 385, joinDate: "Mar 2024",
    avatar: "https://i.pravatar.cc/200?img=12",
    totalEarned: 18470, currentTier: "Gold", nextTier: "Platinum", referralsToNext: 65, progressPercent: 70,
    borderColor1: "#FFD700", borderColor2: "#F59E0B", ringColor: "#FFD700", glowColor: "rgba(255,215,0,0.5)", tierBadge: "gold"
  },
  { 
    rank: 2, name: "Sarah Williams", 
    monthlyEarnings: 1420, weekly: 220, referrals: 296, joinDate: "Jan 2024",
    avatar: "https://i.pravatar.cc/200?img=47",
    totalEarned: 14200, currentTier: "Gold", nextTier: "Platinum", referralsToNext: 154, progressPercent: 45,
    borderColor1: "#C0C0C0", borderColor2: "#E5E7EB", ringColor: "#C0C0C0", glowColor: "rgba(192,192,192,0.4)", tierBadge: "silver"
  },
  { 
    rank: 3, name: "David Rodriguez", 
    monthlyEarnings: 985, weekly: 165, referrals: 205, joinDate: "Apr 2024",
    avatar: "https://i.pravatar.cc/200?img=33",
    totalEarned: 9850, currentTier: "Silver", nextTier: "Gold", referralsToNext: 45, progressPercent: 82,
    borderColor1: "#CD7F32", borderColor2: "#D97706", ringColor: "#CD7F32", glowColor: "rgba(205,127,50,0.4)", tierBadge: "bronze"
  },
  { 
    rank: 4, name: "Emma Thompson", 
    monthlyEarnings: 742, weekly: 110, referrals: 155, joinDate: "Jun 2024",
    avatar: "https://i.pravatar.cc/200?img=44",
    totalEarned: 7420, currentTier: "Silver", nextTier: "Gold", referralsToNext: 95, progressPercent: 52,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "silver"
  },
  { 
    rank: 5, name: "Jake Martinez", 
    monthlyEarnings: 518, weekly: 75, referrals: 108, joinDate: "Aug 2024",
    avatar: "https://i.pravatar.cc/200?img=60",
    totalEarned: 5180, currentTier: "Bronze", nextTier: "Silver", referralsToNext: 42, progressPercent: 65,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "bronze"
  },
  { 
    rank: 6, name: "Ashley Park", 
    monthlyEarnings: 325, weekly: 45, referrals: 68, joinDate: "Oct 2024",
    avatar: "https://i.pravatar.cc/200?img=24",
    totalEarned: 3250, currentTier: "Bronze", nextTier: "Silver", referralsToNext: 82, progressPercent: 35,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "bronze"
  },
  { 
    rank: 7, name: "Tyler Brooks", 
    monthlyEarnings: 275, weekly: 38, referrals: 52, joinDate: "Nov 2024",
    avatar: "https://i.pravatar.cc/200?img=53",
    totalEarned: 2750, currentTier: "Bronze", nextTier: "Silver", referralsToNext: 98, progressPercent: 28,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "bronze"
  },
  { 
    rank: 8, name: "Maya Patel", 
    monthlyEarnings: 210, weekly: 30, referrals: 41, joinDate: "Dec 2024",
    avatar: "https://i.pravatar.cc/200?img=32",
    totalEarned: 2100, currentTier: "Bronze", nextTier: "Silver", referralsToNext: 109, progressPercent: 22,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "bronze"
  },
  { 
    rank: 9, name: "Chris Nguyen", 
    monthlyEarnings: 165, weekly: 22, referrals: 33, joinDate: "Jan 2025",
    avatar: "https://i.pravatar.cc/200?img=11",
    totalEarned: 1650, currentTier: "Bronze", nextTier: "Silver", referralsToNext: 117, progressPercent: 18,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "bronze"
  },
  { 
    rank: 10, name: "Jordan Lee", 
    monthlyEarnings: 125, weekly: 18, referrals: 25, joinDate: "Feb 2025",
    avatar: "https://i.pravatar.cc/200?img=68",
    totalEarned: 1250, currentTier: "Bronze", nextTier: "Silver", referralsToNext: 125, progressPercent: 12,
    borderColor1: "#F59E0B", borderColor2: "#3B82F6", ringColor: "#F59E0B", glowColor: "rgba(245,158,11,0.25)", tierBadge: "bronze"
  },
]

const TIER_COLORS: Record<string, string> = {
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
}

const NEXT_REWARDS: Record<string, string> = {
  Platinum: "$1,500 Cash Bonus",
  Gold: "Trip to The National",
  Silver: "$500 Cash Bonus",
}

export function TopEarnersCarousel() {
  const [centerIndex, setCenterIndex] = useState(0)
  const [morphStates, setMorphStates] = useState<Record<number, "A" | "B">>({})
  const [isPaused, setIsPaused] = useState(false)
  const [countdown, setCountdown] = useState({ days: 7, hours: 4, mins: 22, secs: 30 })
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, mins, secs } = prev
        secs--
        if (secs < 0) { secs = 59; mins-- }
        if (mins < 0) { mins = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        if (days < 0) { days = 0; hours = 0; mins = 0; secs = 0 }
        return { days, hours, mins, secs }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCenterIndex(prev => (prev + 1) % LEADERBOARD.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Toggle morph state for every 3rd card when it reaches center
  useEffect(() => {
    const morphIndices = [2, 5, 8] // Every 3rd card (indices 2, 5, 8)
    if (morphIndices.includes(centerIndex)) {
      setMorphStates(prev => ({
        ...prev,
        [centerIndex]: prev[centerIndex] === "B" ? "A" : "B"
      }))
    }
  }, [centerIndex])

  const goTo = useCallback((index: number) => {
    setCenterIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }, [])

  const prev = () => goTo((centerIndex - 1 + LEADERBOARD.length) % LEADERBOARD.length)
  const next = () => goTo((centerIndex + 1) % LEADERBOARD.length)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [centerIndex])

  const pad = (n: number) => n.toString().padStart(2, "0")

  // Calculate card transforms based on distance from center
  const getCardStyle = (index: number) => {
    const total = LEADERBOARD.length
    let diff = index - centerIndex
    // Handle wrapping
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (isMobile) {
      // Mobile: flat layout with proper z-index hierarchy
      const absDiff = Math.abs(diff)
      let mobileZIndex: number
      if (absDiff === 0) mobileZIndex = 100
      else if (absDiff === 1) mobileZIndex = 50
      else mobileZIndex = 10

      return {
        rotateY: 0,
        scale: diff === 0 ? 1.05 : 0.92,
        zIndex: mobileZIndex,
        opacity: diff === 0 ? 1 : Math.abs(diff) <= 1 ? 0.9 : 0.5,
        x: diff * 290,
      }
    }

    // Desktop: flat layout with scale hierarchy (no 3D rotateY to break z-index)
    const isCenter = diff === 0
    const absDiff = Math.abs(diff)
    
    // Scale: center largest, decreasing with distance
    const scale = isCenter ? 1.15 : absDiff === 1 ? 0.95 : absDiff === 2 ? 0.85 : 0.75
    
    // Z-index hierarchy: center card HIGHEST, decreasing with distance
    let zIndex: number
    if (absDiff === 0) zIndex = 100     // CENTER — highest
    else if (absDiff === 1) zIndex = 50 // Adjacent cards
    else if (absDiff === 2) zIndex = 30 // Second from center
    else if (absDiff === 3) zIndex = 20 // Third from center
    else zIndex = 10                     // Edge cards

    // Opacity: center 1.0, adjacent 0.85, far edges fade out
    const opacity = isCenter ? 1 : absDiff === 1 ? 0.9 : absDiff === 2 ? 0.75 : 0.5

    return {
      scale,
      zIndex,
      opacity,
      x: diff * 200, // Spread cards further apart
    }
  }

  const isMorphCard = (index: number) => [2, 5, 8].includes(index)
  const getContentState = (index: number): "A" | "B" => morphStates[index] || "A"

  return (
    <section className="pt-8 pb-20 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Affiliate Leaderboard</h2>
              <p className="text-sm text-white/60">Top earners this month</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Featured Countdown Banner - Compact */}
            <div className="relative">
              <div className="relative bg-gradient-to-r from-amber-900/40 via-amber-800/30 to-amber-900/40 border border-amber-500/30 rounded-xl px-4 py-2.5">
                <div className="text-[10px] sm:text-xs font-medium text-amber-300/90 mb-1.5 text-center tracking-wide">
                  Monthly Bonus Rewards Ends In
                </div>
                {/* Countdown numbers */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {/* Days */}
                  <div className="flex flex-col items-center">
                    <div className="bg-black/60 border border-amber-500/40 rounded-lg px-2 py-1 min-w-[36px]">
                      <span className="text-lg sm:text-xl font-bold text-amber-400 tabular-nums tracking-tight">
                        {pad(countdown.days)}
                      </span>
                    </div>
                    <span className="text-[8px] text-amber-400/60 mt-0.5 uppercase tracking-wider">Days</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-amber-400/60 -mt-3">:</span>
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="bg-black/60 border border-amber-500/40 rounded-lg px-2 py-1 min-w-[36px]">
                      <span className="text-lg sm:text-xl font-bold text-amber-400 tabular-nums tracking-tight">
                        {pad(countdown.hours)}
                      </span>
                    </div>
                    <span className="text-[8px] text-amber-400/60 mt-0.5 uppercase tracking-wider">Hrs</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-amber-400/60 -mt-3">:</span>
                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="bg-black/60 border border-amber-500/40 rounded-lg px-2 py-1 min-w-[36px]">
                      <span className="text-lg sm:text-xl font-bold text-amber-400 tabular-nums tracking-tight">
                        {pad(countdown.mins)}
                      </span>
                    </div>
                    <span className="text-[8px] text-amber-400/60 mt-0.5 uppercase tracking-wider">Mins</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-amber-400/60 -mt-3">:</span>
                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="bg-black/60 border border-amber-500/40 rounded-lg px-2 py-1 min-w-[36px]"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-lg sm:text-xl font-bold text-amber-400 tabular-nums tracking-tight">
                        {pad(countdown.secs)}
                      </span>
                    </motion.div>
                    <span className="text-[8px] text-amber-400/60 mt-0.5 uppercase tracking-wider">Secs</span>
                  </div>
                </div>
              </div>
            </div>
            {/* LIVE Badge - Bigger */}
            <div className="px-4 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm sm:text-base font-bold text-emerald-400 tracking-wide">LIVE</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
              <Users className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">2,847</div>
              <div className="text-sm text-white/60">Active Affiliates</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">$127,450</div>
              <div className="text-sm text-white/60">Total Payout This Month</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <UserPlus className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">8,392</div>
              <div className="text-sm text-white/60">Total Referrals</div>
            </div>
          </div>
        </div>

        {/* Arc Carousel */}
        <div
          className="relative h-[560px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-[200] w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center hover:bg-amber-500/30 transition-colors"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 text-amber-400" />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-[200] w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center hover:bg-amber-500/30 transition-colors"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 text-amber-400" />
          </button>

          {/* Cards container - render cards sorted by distance from center (farthest first, center last = on top) */}
          <div className="relative w-full h-full flex items-center justify-center">
            {[...LEADERBOARD]
              .map((person, index) => ({ person, index, style: getCardStyle(index) }))
              .sort((a, b) => a.style.zIndex - b.style.zIndex) // Lower z-index renders first (behind), center (highest) renders last (on top)
              .map(({ person, index, style }) => {
              const contentState = getContentState(index)
              const showMorphContent = isMorphCard(index) && contentState === "B"
              const isCenter = index === centerIndex

              return (
                <motion.div
                  key={person.rank}
                  className="absolute flex-shrink-0"
                  style={{
                    width: 280,
                    transformOrigin: "center center",
                  }}
                  animate={{
                    scale: style.scale,
                    opacity: style.opacity,
                    x: style.x,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Crown for #1 */}
                  {person.rank === 1 && (
                    <motion.div
                      className="absolute -top-10 left-1/2 -translate-x-1/2 z-10"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Crown className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_16px_rgba(255,215,0,0.7)]" />
                    </motion.div>
                  )}

                  {/* Medal for #2 and #3 */}
                  {(person.rank === 2 || person.rank === 3) && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                      <Medal className={`w-8 h-8 ${person.rank === 2 ? "text-gray-300 drop-shadow-[0_0_8px_rgba(192,192,192,0.5)]" : "text-amber-600 drop-shadow-[0_0_8px_rgba(205,127,50,0.5)]"}`} />
                    </div>
                  )}

                  {/* Card border wrapper */}
                  <div
                    className="relative p-[2px] rounded-3xl"
                    style={{
                      background: showMorphContent
                        ? `linear-gradient(135deg, ${person.borderColor1}, #8B5CF6, ${person.borderColor2})`
                        : `linear-gradient(135deg, ${person.borderColor1}, ${person.borderColor2}, ${person.borderColor1})`,
                      boxShadow: isCenter ? `0 0 80px rgba(245,158,11,0.5), 0 0 120px ${person.glowColor}` : undefined,
                    }}
                  >
                    {/* Card inner */}
                    <div
                      className="relative bg-[#0F0F14]/95 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center"
                      style={{ minHeight: 460 }}
                    >
                      {/* Rank number */}
                      <div
                        className="absolute top-4 left-4 text-3xl font-serif tracking-tight"
                        style={{
                          WebkitTextStroke: `1.5px ${person.borderColor1}`,
                          color: "transparent",
                        }}
                      >
                        #{person.rank}
                      </div>

                      <AnimatePresence mode="wait">
                        {!showMorphContent ? (
                          /* State A: Standard affiliate info */
                          <motion.div
                            key="state-a"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-3 w-full mt-4"
                          >
                            {/* Avatar */}
                            <div className="mt-2">
                              <img
                                src={person.avatar}
                                alt={person.name}
                                className="w-24 h-24 rounded-full object-cover"
                                style={{
                                  border: `3px solid ${person.ringColor}`,
                                  boxShadow: `0 0 24px ${person.glowColor}`,
                                }}
                              />
                            </div>

                            {/* Name */}
                            <h3 className="text-lg font-semibold text-white text-center">{person.name}</h3>

                            {/* Join date */}
                            <p className="text-xs text-gray-500">Affiliate since {person.joinDate}</p>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/10 my-1" />

                            {/* Monthly earnings */}
                            <div className="text-center w-full">
                              <div className="text-xs uppercase tracking-wider text-amber-400/80 mb-1">Monthly Earnings</div>
                              <div className="text-3xl font-bold text-amber-400 tabular-nums">
                                ${person.monthlyEarnings.toLocaleString()}
                              </div>
                              <div className="text-xs text-emerald-400 mt-1 flex items-center justify-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                +${person.weekly} this week
                              </div>
                            </div>

                            {/* Referrals */}
                            <div className="text-center w-full mt-auto pt-4">
                              <div className="text-xs uppercase tracking-wider text-emerald-400/80 mb-1">Referrals</div>
                              <div className="text-xl font-semibold text-emerald-400 tabular-nums">{person.referrals}</div>
                            </div>
                          </motion.div>
                        ) : (
                          /* State B: Progress/bonus info */
                          <motion.div
                            key="state-b"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-3 w-full mt-4"
                          >
                            {/* Avatar */}
                            <div className="mt-2">
                              <img
                                src={person.avatar}
                                alt={person.name}
                                className="w-24 h-24 rounded-full object-cover"
                                style={{
                                  border: `3px solid ${person.ringColor}`,
                                  boxShadow: `0 0 24px ${person.glowColor}`,
                                }}
                              />
                            </div>

                            {/* Name */}
                            <h3 className="text-lg font-semibold text-white text-center">{person.name}</h3>

                            {/* Tier badge */}
                            <div
                              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                              style={{
                                background: `linear-gradient(135deg, ${TIER_COLORS[person.tierBadge]}, ${TIER_COLORS[person.tierBadge]}80)`,
                                color: person.tierBadge === "gold" ? "#1a1a1a" : "#fff",
                              }}
                            >
                              <Trophy className="w-3 h-3" />
                              {person.currentTier} Tier
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/10 my-1" />

                            {/* Total earned */}
                            <div className="text-center w-full">
                              <div className="text-xs uppercase tracking-wider text-purple-400/80 mb-1">Total Earned</div>
                              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent tabular-nums">
                                ${person.totalEarned.toLocaleString()}
                              </div>
                            </div>

                            {/* Progress to next tier */}
                            <div className="w-full mt-2">
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="text-gray-400">Progress to {person.nextTier}</span>
                                <span className="text-amber-400 font-semibold">{person.progressPercent}%</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{
                                    background: "linear-gradient(90deg, #F59E0B, #8B5CF6)",
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${person.progressPercent}%` }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1.5 text-center">
                                {person.referralsToNext} more referrals to unlock
                              </p>
                            </div>

                            {/* Next reward */}
                            <div className="w-full mt-auto pt-3 flex items-center justify-center gap-2 text-sm">
                              {person.nextTier === "Platinum" ? (
                                <Star className="w-4 h-4 text-amber-400" />
                              ) : (
                                <Gift className="w-4 h-4 text-purple-400" />
                              )}
                              <span className="text-gray-300">{NEXT_REWARDS[person.nextTier]}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {LEADERBOARD.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === centerIndex
                  ? "bg-amber-400 w-6 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA - Removed */}
      </div>
    </section>
  )
}

export default TopEarnersCarousel
