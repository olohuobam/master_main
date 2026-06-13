"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import CountUp from "react-countup"
import TopEarnersCarousel from "./top-earners-carousel"
import {
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Check,
  Copy,
  Share2,
  MousePointerClick,
  Users,
  DollarSign,
  ScanLine,
  Target,
  Radio,
  ChevronLeft,
  ChevronRight,
  Package,
  ShoppingBag,
  BarChart3,
  Award,
  FileSpreadsheet,
  Trophy,
  Rocket,
  Flame,
  Star,
  Zap,
  Gift,
  Crown,
  BadgeCheck,
} from "lucide-react"

// Animation constants
const TRANSITION = { duration: 0.25, ease: [0.16, 1, 0.3, 1] }

// Mock data
const STATS_EVENTS = [
  { icon: Trophy, iconColor: "amber", user: "@WaxPackWilly", action: "reached", highlight: "Elite tier", highlightColor: "purple" },
  { icon: DollarSign, iconColor: "emerald", user: "@VintageVault", action: "just earned", highlight: "$61.20", highlightColor: "emerald" },
  { icon: Rocket, iconColor: "purple", user: "@CardKingYT", action: "hit", highlight: "$1,000 this month", highlightColor: "emerald" },
  { icon: Flame, iconColor: "red", user: "@GradedGems", action: "just earned", highlight: "$31.50", highlightColor: "emerald" },
  { icon: Star, iconColor: "amber", user: "@SlabPodcast", action: "crossed", highlight: "200 referrals", highlightColor: "purple" },
  { icon: TrendingUp, iconColor: "emerald", user: "@HitProbability", action: "earned", highlight: "$127.40 today", highlightColor: "emerald" },
  { icon: Award, iconColor: "amber", user: "@PSA10Hunter", action: "unlocked", highlight: "Tier 3 reward", highlightColor: "purple" },
  { icon: Zap, iconColor: "amber", user: "@CardTalkDaily", action: "had", highlight: "47 clicks today", highlightColor: "amber" },
  { icon: Gift, iconColor: "pink", user: "@RookieRoyalty", action: "claimed", highlight: "$500 bonus", highlightColor: "emerald" },
  { icon: Crown, iconColor: "amber", user: "@GemMintOnly", action: "reached", highlight: "Top 10 leaderboard", highlightColor: "amber" },
  { icon: Sparkles, iconColor: "purple", user: "@VaultPulls", action: "earned", highlight: "$892 this week", highlightColor: "emerald" },
  { icon: BadgeCheck, iconColor: "emerald", user: "@PricingPro", action: "just signed up", highlight: "5 new referrals", highlightColor: "amber" },
  { icon: Trophy, iconColor: "amber", user: "@SlabKingdom", action: "reached", highlight: "Diamond tier", highlightColor: "purple" },
  { icon: DollarSign, iconColor: "emerald", user: "@CardFlipPro", action: "just earned", highlight: "$89.00", highlightColor: "emerald" },
  { icon: Rocket, iconColor: "purple", user: "@BoxBreakLive", action: "hit", highlight: "$2,500 lifetime", highlightColor: "emerald" },
  { icon: Star, iconColor: "amber", user: "@GradingGuru", action: "crossed", highlight: "100 signups", highlightColor: "purple" },
  { icon: Zap, iconColor: "amber", user: "@HobbyHunter", action: "had", highlight: "92 clicks today", highlightColor: "amber" },
  { icon: Gift, iconColor: "pink", user: "@WaxRipper", action: "claimed", highlight: "$250 bonus", highlightColor: "emerald" },
  { icon: Crown, iconColor: "amber", user: "@ToppsKing", action: "reached", highlight: "Top 5 leaderboard", highlightColor: "amber" },
  { icon: BadgeCheck, iconColor: "emerald", user: "@PullMaster", action: "just signed up", highlight: "8 new referrals", highlightColor: "amber" },
]

// Custom SVG Icons for premium look
const CustomIcons = {
  Scanner: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Stream: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M8 8a6 6 0 0 1 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 5a10 10 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 16a6 6 0 0 1-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 19a10 10 0 0 1-14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Inventory: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 9h16" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 9v11" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="12" width="6" height="3" rx="0.5" fill="currentColor" opacity="0.3"/>
      <rect x="11" y="16" width="4" height="2" rx="0.5" fill="currentColor" opacity="0.2"/>
    </svg>
  ),
  Market: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path d="M3 9l9-6 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 9v11h16V9" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="13" width="8" height="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 13v7" stroke="currentColor" strokeWidth="1"/>
      <circle cx="12" cy="11" r="1" fill="currentColor"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 17V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 17V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 13l4-3 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="9" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M8 14l-2 7 6-3 6 3-2-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 6v6" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <path d="M9 9h6" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  Bulk: () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 6h8M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 6h3M2 10h3M2 14h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <circle cx="16" cy="18" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
}

// Feature data with themed colors and 2-line titles
const FEATURES = [
  {
    IconComponent: CustomIcons.Scanner,
    label: "AI VISION SCANNER",
    titleLine1: "AI Vision",
    titleLine2: "Value Scanner",
    accentWord: "Value",
    accentLine: 2,
    description: "Instant card identification + real-time pricing from any photo.",
    colors: { 
      primary: "#F59E0B", 
      light: "#FCD34D", 
      dark: "#92400E", 
      glow: "rgba(245,158,11,0.4)",
      gradient: "from-amber-300 to-amber-500",
    },
    illustrationType: "scanner",
  },
  {
    IconComponent: CustomIcons.Target,
    label: "DEAL FINDER",
    titleLine1: "Deal",
    titleLine2: "Finder",
    accentWord: "Deal",
    accentLine: 1,
    description: "AI-powered deal detection across every major marketplace.",
    colors: { 
      primary: "#8B5CF6", 
      light: "#A78BFA", 
      dark: "#5B21B6", 
      glow: "rgba(139,92,246,0.4)",
      gradient: "from-purple-300 to-purple-500",
    },
    illustrationType: "radar",
  },
  {
    IconComponent: CustomIcons.Stream,
    label: "STREAM SNIPER",
    titleLine1: "Stream Value",
    titleLine2: "Sniper",
    accentWord: "Sniper",
    accentLine: 2,
    description: "Identify graded cards in Whatnot livestreams in under 5 seconds.",
    colors: { 
      primary: "#EF4444", 
      light: "#F87171", 
      dark: "#B91C1C", 
      glow: "rgba(239,68,68,0.4)",
      gradient: "from-red-300 to-red-500",
    },
    illustrationType: "stream",
  },
  {
    IconComponent: CustomIcons.Inventory,
    label: "INVENTORY",
    titleLine1: "Inventory",
    titleLine2: "Management",
    accentWord: "Inventory",
    accentLine: 1,
    description: "Track your entire collection with automated pricing updates.",
    colors: { 
      primary: "#10B981", 
      light: "#34D399", 
      dark: "#047857", 
      glow: "rgba(16,185,129,0.4)",
      gradient: "from-emerald-300 to-emerald-500",
    },
    illustrationType: "boxes",
  },
  {
    IconComponent: CustomIcons.Market,
    label: "MARKETPLACE",
    titleLine1: "Selling",
    titleLine2: "Marketplace",
    accentWord: "Marketplace",
    accentLine: 2,
    description: "List and sell cards with built-in buyer network.",
    colors: { 
      primary: "#EC4899", 
      light: "#F472B6", 
      dark: "#BE185D", 
      glow: "rgba(236,72,153,0.4)",
      gradient: "from-pink-300 to-pink-500",
    },
    illustrationType: "shop",
  },
  {
    IconComponent: CustomIcons.Chart,
    label: "PORTFOLIO",
    titleLine1: "Portfolio",
    titleLine2: "Dashboard",
    accentWord: "Portfolio",
    accentLine: 1,
    description: "Complete analytics on your collection performance.",
    colors: { 
      primary: "#3B82F6", 
      light: "#60A5FA", 
      dark: "#1D4ED8", 
      glow: "rgba(59,130,246,0.4)",
      gradient: "from-blue-300 to-blue-500",
    },
    illustrationType: "chart",
  },
  {
    IconComponent: CustomIcons.Award,
    label: "GRADING DISCOUNTS",
    titleLine1: "Grading",
    titleLine2: "Discounts",
    accentWord: "Grading",
    accentLine: 1,
    description: "Exclusive pricing on PSA, BGS, and SGC submissions.",
    colors: { 
      primary: "#D4AF37", 
      light: "#F4D03F", 
      dark: "#8B7500", 
      glow: "rgba(212,175,55,0.5)",
      gradient: "from-yellow-300 to-amber-500",
    },
    illustrationType: "slabs",
  },
  {
    IconComponent: CustomIcons.Bulk,
    label: "BULK SCANNER",
    titleLine1: "Bulk CSV",
    titleLine2: "Scanner",
    accentWord: "Bulk",
    accentLine: 1,
    description: "Scan thousands of cards at once with CSV upload.",
    colors: { 
      primary: "#14B8A6", 
      light: "#2DD4BF", 
      dark: "#0F766E", 
      glow: "rgba(20,184,166,0.4)",
      gradient: "from-teal-300 to-teal-500",
    },
    illustrationType: "spreadsheet",
  },
]

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Earnings", href: "#earnings" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Assets", href: "#assets" },
  { label: "FAQ", href: "#faq" },
]

// Icon color mapping
const iconColorClasses: Record<string, { bg: string; text: string }> = {
  amber: { bg: "bg-amber-500/20", text: "text-amber-400" },
  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
  red: { bg: "bg-red-500/20", text: "text-red-400" },
  pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
}

const highlightColorClasses: Record<string, string> = {
  amber: "text-amber-400",
  emerald: "text-emerald-400",
  purple: "text-purple-400",
  gold: "text-yellow-400",
}

// Background Illustrations for each feature type - compact versions
const BackgroundIllustrations: Record<string, React.FC<{ color: string; isHovered: boolean }>> = {
  scanner: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <rect x="40" y="20" width="100" height="140" rx="8" />
        <path d="M30 15L30 35M30 15L50 15" />
        <path d="M150 15L150 35M150 15L130 15" />
        <path d="M30 165L30 145M30 165L50 165" />
        <path d="M150 165L150 145M150 165L130 165" />
        <motion.line
          x1="45" y1="60" x2="135" y2="60"
          strokeWidth="2"
          animate={{ y1: [60, 140, 60], y2: [60, 140, 60] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <rect x="100" y="130" width="35" height="18" rx="3" fill={color} fillOpacity="0.2" />
        <text x="108" y="143" fontSize="10" fill={color}>$127</text>
      </g>
    </motion.svg>
  ),
  radar: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="30" />
        <line x1="100" y1="30" x2="100" y2="170" strokeOpacity="0.3" />
        <line x1="30" y1="100" x2="170" y2="100" strokeOpacity="0.3" />
        <motion.line
          x1="100" y1="100" x2="100" y2="40"
          strokeWidth="2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        <rect x="120" y="70" width="20" height="28" rx="2" fill={color} fillOpacity="0.3" />
        <rect x="60" y="110" width="18" height="25" rx="2" strokeOpacity="0.5" />
        <circle cx="130" cy="84" r="8" strokeWidth="2" />
      </g>
    </motion.svg>
  ),
  stream: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <rect x="30" y="40" width="140" height="100" rx="6" />
        <rect x="30" y="140" width="140" height="15" rx="3" fill={color} fillOpacity="0.1" />
        <line x1="35" y1="55" x2="165" y2="55" strokeOpacity="0.2" />
        <line x1="35" y1="70" x2="165" y2="70" strokeOpacity="0.15" />
        <line x1="35" y1="85" x2="165" y2="85" strokeOpacity="0.1" />
        <rect x="70" y="65" width="60" height="50" rx="4" strokeWidth="2" />
        <path d="M65 60L65 70M65 60L75 60" strokeWidth="2" />
        <path d="M135 60L135 70M135 60L125 60" strokeWidth="2" />
        <path d="M65 120L65 110M65 120L75 120" strokeWidth="2" />
        <path d="M135 120L135 110M135 120L125 120" strokeWidth="2" />
        <rect x="140" y="45" width="25" height="12" rx="2" fill={color} fillOpacity="0.4" />
        <circle cx="147" cy="51" r="3" fill={color} />
      </g>
    </motion.svg>
  ),
  boxes: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <path d="M50 120L50 80L100 55L150 80L150 120L100 145L50 120Z" />
        <path d="M100 145L100 105" />
        <path d="M50 80L100 105L150 80" />
        <path d="M60 95L60 65L100 45L140 65L140 95" strokeOpacity="0.5" />
        <path d="M100 105L100 75" strokeOpacity="0.5" />
        <rect x="110" y="100" width="30" height="10" rx="2" fill={color} fillOpacity="0.2" />
        <text x="115" y="108" fontSize="7" fill={color}>RCs</text>
        <rect x="60" y="130" width="35" height="15" rx="2" fill={color} fillOpacity="0.15" />
        <text x="65" y="141" fontSize="8" fill={color}>2,847</text>
      </g>
    </motion.svg>
  ),
  shop: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <path d="M60 60L80 30L120 30L140 60" />
        <rect x="55" y="60" width="90" height="100" rx="4" />
        <path d="M55 75L145 75" />
        <rect x="70" y="90" width="25" height="35" rx="2" fill={color} fillOpacity="0.2" />
        <rect x="105" y="95" width="25" height="30" rx="2" fill={color} fillOpacity="0.15" />
        <circle cx="155" cy="50" r="15" />
        <text x="150" y="54" fontSize="10" fill={color}>$</text>
        <path d="M70 140L85 125L100 135L115 120" strokeWidth="2" />
      </g>
    </motion.svg>
  ),
  chart: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <rect x="40" y="40" width="120" height="110" rx="4" />
        <line x1="55" y1="55" x2="55" y2="135" strokeOpacity="0.3" />
        <line x1="55" y1="135" x2="145" y2="135" strokeOpacity="0.3" />
        <rect x="65" y="115" width="12" height="20" rx="1" fill={color} fillOpacity="0.3" />
        <rect x="85" y="100" width="12" height="35" rx="1" fill={color} fillOpacity="0.4" />
        <rect x="105" y="85" width="12" height="50" rx="1" fill={color} fillOpacity="0.5" />
        <rect x="125" y="65" width="12" height="70" rx="1" fill={color} fillOpacity="0.6" />
        <path d="M65 110L85 95L105 80L125 60" strokeWidth="2" />
        <circle cx="125" cy="60" r="4" fill={color} />
        <path d="M135 55L145 45L155 55" strokeWidth="2" fill="none" />
      </g>
    </motion.svg>
  ),
  slabs: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <rect x="45" y="35" width="50" height="80" rx="4" />
        <rect x="50" y="55" width="40" height="50" rx="2" fill={color} fillOpacity="0.15" />
        <rect x="55" y="40" width="30" height="12" rx="2" fill={color} fillOpacity="0.3" />
        <text x="62" y="49" fontSize="7" fill={color}>PSA</text>
        <rect x="75" y="30" width="50" height="80" rx="4" />
        <rect x="80" y="50" width="40" height="50" rx="2" fill={color} fillOpacity="0.2" />
        <rect x="85" y="35" width="30" height="12" rx="2" fill={color} fillOpacity="0.4" />
        <text x="95" y="44" fontSize="7" fill={color}>10</text>
        <rect x="105" y="25" width="50" height="80" rx="4" />
        <rect x="110" y="45" width="40" height="50" rx="2" fill={color} fillOpacity="0.25" />
        <polygon points="130,120 120,140 140,140" fill={color} fillOpacity="0.3" />
        <circle cx="130" cy="125" r="8" fill={color} fillOpacity="0.2" />
        <path d="M126 125L129 128L135 122" strokeWidth="2" />
      </g>
    </motion.svg>
  ),
  spreadsheet: ({ color, isHovered }) => (
    <motion.svg
      className="h-full w-full"
      viewBox="0 0 200 200"
      fill="none"
      animate={{ opacity: isHovered ? 0.25 : 0.12, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <g stroke={color} strokeWidth="1.5">
        <rect x="40" y="50" width="120" height="100" rx="4" />
        <line x1="40" y1="75" x2="160" y2="75" />
        <line x1="40" y1="100" x2="160" y2="100" />
        <line x1="40" y1="125" x2="160" y2="125" />
        <line x1="80" y1="50" x2="80" y2="150" />
        <line x1="120" y1="50" x2="120" y2="150" />
        <motion.path
          d="M50 87L58 95L70 80"
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 0.5, delay: 0, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.path
          d="M90 87L98 95L110 80"
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.3, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.path
          d="M130 87L138 95L150 80"
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatDelay: 2 }}
        />
        <text x="55" y="118" fontSize="9" fill={color}>247</text>
        <text x="95" y="118" fontSize="9" fill={color}>$89</text>
        <rect x="100" y="30" width="35" height="25" rx="3" fill={color} fillOpacity="0.2" />
        <path d="M110 35L125 35L125 50L110 50Z" fill={color} fillOpacity="0.3" />
      </g>
    </motion.svg>
  ),
}

// Feature Card for carousel - premium with large titles and illustrations
function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const Illustration = BackgroundIllustrations[feature.illustrationType]

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-[260px] flex-shrink-0"
    >
      {/* Border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${feature.colors.light}40, ${feature.colors.primary}20, transparent 70%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Container */}
      <motion.div
        className="relative flex h-[170px] flex-col overflow-hidden rounded-xl border border-white/[0.08] p-4"
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* LAYER 1: Dark base */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#111115] to-[#0A0A0C]" />

        {/* LAYER 2: Color accent */}
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full"
          style={{
            background: `radial-gradient(circle, ${feature.colors.glow} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{ opacity: isHovered ? 0.6 : 0.35 }}
        />

        {/* LAYER 3: Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* LAYER 4: Background Illustration - moved up */}
        <div className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-32">
          {Illustration && <Illustration color={feature.colors.light} isHovered={isHovered} />}
        </div>

        {/* Content Layer */}
        <div className="relative z-30 flex h-full flex-col">
          {/* Top Row: Icon + Title */}
          <div className="mb-2 flex items-center gap-3">
            {/* Compact Icon */}
            <div className="relative h-10 w-10 flex-shrink-0">
              <div
                className="absolute inset-0 rounded-lg opacity-40"
                style={{
                  background: `radial-gradient(circle, ${feature.colors.glow} 0%, transparent 70%)`,
                  filter: "blur(8px)",
                  transform: "scale(1.3)",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${feature.colors.primary}30 0%, ${feature.colors.dark}50 100%)`,
                  border: `1px solid ${feature.colors.light}20`,
                }}
              >
                <div className="h-5 w-5" style={{ color: feature.colors.light }}>
                  <feature.IconComponent />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 
              className={`text-base font-bold bg-gradient-to-r ${feature.colors.gradient} bg-clip-text text-transparent`}
            >
              {feature.titleLine1} {feature.titleLine2}
            </h3>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Feature Carousel Component
function FeatureCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !containerRef.current) return

    const interval = setInterval(() => {
      if (containerRef.current) {
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
        const newPosition = scrollPosition + 1
        
        if (newPosition >= maxScroll) {
          setScrollPosition(0)
          containerRef.current.scrollTo({ left: 0, behavior: "auto" })
        } else {
          setScrollPosition(newPosition)
          containerRef.current.scrollTo({ left: newPosition, behavior: "auto" })
        }
      }
    }, 30)

    return () => clearInterval(interval)
  }, [scrollPosition, isAutoScrolling])

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return
    setIsAutoScrolling(false)
    
    const scrollAmount = 280
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount
    
    containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
    setScrollPosition(newPosition)
    
    // Resume auto-scroll after 5 seconds
    setTimeout(() => setIsAutoScrolling(true), 5000)
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0C]/90 text-gray-400 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-[#111] hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0C]/90 text-gray-400 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-[#111] hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent" />

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden px-2 py-4"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {[...FEATURES, ...FEATURES].map((feature, index) => (
          <FeatureCard key={`${feature.title}-${index}`} feature={feature} />
        ))}
      </div>
    </div>
  )
}

export default function AffiliateHeroSection({ hideNav = false, hideToolsSection = false }: { hideNav?: boolean; hideToolsSection?: boolean } = {}) {
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [timeFilter, setTimeFilter] = useState<"month" | "all">("month")
  const [statsHovered, setStatsHovered] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

  const username = "yourname"

  // Stats based on time filter
  const stats = {
    month: { clicks: 247, signups: 18, earned: 127.4 },
    all: { clicks: 1847, signups: 142, earned: 2847.6 },
  }

  const currentStats = timeFilter === "month" ? stats.month : stats.all

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`cardvalues.app/ref/${username}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "CardValues Affiliate Link",
        text: "Join CardValues using my referral link!",
        url: `https://cardvalues.app/ref/${username}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Banner - Blue Gradient */}
      {!hideNav && <div
        className="relative w-full overflow-hidden py-3 text-center"
        style={{
          background: "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #1E40AF 100%)",
        }}
      >
        {/* Shimmer effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            animation: "shimmer 3s infinite linear",
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        <div className="relative flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-white/80" />
          <span className="text-sm font-bold tracking-wide text-white">
            EARN 30% RECURRING COMMISSION — FREE TO JOIN
          </span>
          <Sparkles className="h-4 w-4 text-white/80" />
        </div>
      </div>}

      {/* Navigation */}
      {!hideNav && <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0B]/95 shadow-lg shadow-black/20"
            : "bg-[#0A0A0B]/85"
        } border-b border-amber-500/10 backdrop-blur-2xl`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-center px-4 md:px-8">
          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-amber-400 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-amber-500/10 bg-[#0A0A0B]/95 px-4 py-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>}

      {/* Top Headline - Full Width */}
      <div className="relative w-full overflow-hidden bg-black py-10 md:py-14">
        {/* Background word shadow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-tighter text-white/[0.035] md:text-[16vw]"
        >
          Affiliate
        </span>
        <h1 className="relative text-center text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          The Collectors{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
            Top Affiliate Program
          </span>
        </h1>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden px-4 pb-0 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...TRANSITION, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold tracking-wide text-amber-400">
                  AFFILIATE PROGRAM — NOW LIVE
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                <span className="text-white">Earn Up To 30%</span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Recurring
                </span>
                <br />
                <span className="text-white">Commission</span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-lg text-lg leading-relaxed text-white/70">
                Share your unique referral link with your community. Every
                subscription they purchase earns you 30% commission, forever.
                Real-time tracking. Instant payouts.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                  <span className="text-2xl font-bold text-amber-400">30%</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Commission
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                  <span className="text-2xl font-bold text-white">$0</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Setup Fee
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                  <span className="text-xl font-bold text-amber-400">Real-Time</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Tracking
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Referral Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...TRANSITION, delay: 0.2 }}
            >
              <div className="relative">
                {/* ============ SUBTLE GLOW LAYERS ============ */}
                
                {/* Glow Layer 1: Soft ambient pulse */}
                <motion.div
                  className="absolute -inset-3 rounded-[40px]"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.12) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Glow Layer 2: Very subtle edge glow */}
                <motion.div
                  className="absolute -inset-[2px] rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08), transparent 60%)",
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: [0.2, 0.35, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[#0F0F14]/95 backdrop-blur-xl">
                  {/* Gold Banner Header */}
                  <div
                    className="relative overflow-hidden px-6 py-5 text-center"
                    style={{
                      background: "linear-gradient(135deg, #92400E 0%, #B45309 25%, #D97706 50%, #B45309 75%, #92400E 100%)",
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                      }}
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {/* Gold sparkle overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FCD34D'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    <h2 
                      className="relative text-lg font-black uppercase tracking-wide md:text-2xl"
                      style={{
                        color: "#FEF3C7",
                        textShadow: "0 2px 8px rgba(0,0,0,0.4), 0 0 30px rgba(251,191,36,0.5)",
                      }}
                    >
                      Your Referral Link
                    </h2>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8">

                  {/* Join Text */}
                  <p className="mb-3 text-center text-sm font-medium text-white/60">
                    Join 500+ creators already earning
                  </p>

                  {/* Limited Spots Badge */}
                  <div className="mb-5 flex justify-center">
                    <motion.div 
                      className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(245,158,11,0.3)",
                          "0 0 25px rgba(245,158,11,0.5)",
                          "0 0 10px rgba(245,158,11,0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                      </span>
                      <span 
                        className="text-sm font-bold uppercase tracking-wide"
                        style={{ color: "#FCD34D" }}
                      >
                        Limited Spots Available
                      </span>
                    </motion.div>
                  </div>

                  {/* Referral Link Section */}
                  <div className="mb-6 space-y-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                      Your Referral Link
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-white/5 p-3">
                      <div className="flex-1 font-mono text-sm text-white/80">
                        cardvalues.app/ref/{username}
                      </div>
                      <button
                        onClick={handleCopy}
                        className="rounded-lg bg-white/10 p-2 text-white/60 transition-all hover:bg-white/20 hover:text-white"
                        aria-label="Copy link"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-black transition-all hover:bg-amber-400"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-medium text-white transition-all hover:bg-white/10"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Time Filter */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => setTimeFilter("month")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        timeFilter === "month"
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      This Month
                    </button>
                    <button
                      onClick={() => setTimeFilter("all")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        timeFilter === "all"
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      All Time
                    </button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <div className="mb-1 text-2xl font-bold tabular-nums text-white">
                        <CountUp
                          end={currentStats.clicks}
                          duration={1}
                          preserveValue
                        />
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-white/60">
                        <MousePointerClick className="h-3 w-3 text-blue-400" />
                        Clicks
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <div className="mb-1 text-2xl font-bold tabular-nums text-white">
                        <CountUp
                          end={currentStats.signups}
                          duration={1}
                          preserveValue
                        />
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-white/60">
                        <Users className="h-3 w-3 text-amber-400" />
                        Signups
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <div className="mb-1 text-2xl font-bold tabular-nums text-emerald-400">
                        $
                        <CountUp
                          end={currentStats.earned}
                          duration={1}
                          decimals={2}
                          preserveValue
                        />
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-white/60">
                        <DollarSign className="h-3 w-3 text-emerald-400" />
                        Earned
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacer to separate from hero section above */}
      <div className="h-20 md:h-28" />

      {/* Live Affiliates Banner - Full Width */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 border-y border-emerald-500/30 py-12 md:py-16">
        {/* Background word shadow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[24vw] font-black uppercase leading-none tracking-tighter text-emerald-400/[0.06] md:text-[18vw]"
        >
          Payouts
        </span>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-base font-semibold text-emerald-400 uppercase tracking-wider">
              Live · 2,847 active affiliates earning right now
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white tracking-tight whitespace-nowrap">
            Real affiliates. Real payouts.{" "}
            <span className="italic text-amber-400">Real recurring revenue.</span>
          </h2>
        </div>
      </div>

      {/* 4 Line Breaks */}
      <div className="h-16" />
      <div className="h-16" />
      <div className="h-16" />
      <div className="h-16" />

      {/* Affiliate Leaderboard - Full Width */}
      <div className="w-full">
        <TopEarnersCarousel />
      </div>

      {/* Feature Showcase Section */}
      {!hideToolsSection && <section className="relative py-8 md:py-10 bg-black">
        <div className="relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={TRANSITION}
            className="mb-6 text-center px-4 md:px-8"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                What You Are Promoting
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              The Tools Your Audience Needs
            </h2>
          </motion.div>

          {/* Feature Carousel - Full Width */}
          <div className="mb-4 w-full">
            <FeatureCarousel />
          </div>

          {/* Stats/Achievements Marquee - Orange Ribbon Full Width */}
          <div
            className="relative h-14 overflow-hidden bg-amber-500 w-full"
            onMouseEnter={() => setStatsHovered(true)}
            onMouseLeave={() => setStatsHovered(false)}
          >
            <motion.div
              className="flex h-full items-center gap-8"
              animate={{ x: statsHovered ? 0 : [0, -2400] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                },
              }}
            >
              {[...STATS_EVENTS, ...STATS_EVENTS, ...STATS_EVENTS].map((event, index) => {
                const IconComponent = event.icon

                return (
                  <div
                    key={`${event.user}-${index}`}
                    className="flex items-center gap-3 whitespace-nowrap text-sm"
                  >
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20"
                    >
                      <IconComponent className="h-4 w-4 text-black" />
                    </div>
                    <span className="font-semibold text-black">{event.user}</span>
                    <span className="text-black/70">{event.action}</span>
                    <span className="font-bold text-black">{event.highlight}</span>
                    <span className="mx-4 text-black/30">|</span>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>}
    </div>
  )
}

// Exported ToolsSection for use in wrapper component
export function ToolsSection() {
  const [statsHovered, setStatsHovered] = useState(false)

  return (
    <section className="relative py-8 md:py-10 bg-black">
      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION}
          className="mb-6 text-center px-4 md:px-8"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              What You Are Promoting
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            The Tools Your Audience Needs
          </h2>
        </motion.div>

        {/* Feature Carousel - Full Width */}
        <div className="mb-4 w-full">
          <FeatureCarousel />
        </div>

        {/* Stats/Achievements Marquee - Orange Ribbon Full Width */}
        <div
          className="relative h-14 overflow-hidden bg-amber-500 w-full"
          onMouseEnter={() => setStatsHovered(true)}
          onMouseLeave={() => setStatsHovered(false)}
        >
          <motion.div
            className="flex h-full items-center gap-8"
            animate={{ x: statsHovered ? 0 : [0, -2400] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
          >
            {[...STATS_EVENTS, ...STATS_EVENTS, ...STATS_EVENTS].map((event, index) => {
              const IconComponent = event.icon

              return (
                <div
                  key={`${event.user}-${index}`}
                  className="flex items-center gap-3 whitespace-nowrap text-sm"
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20"
                  >
                    <IconComponent className="h-4 w-4 text-black" />
                  </div>
                  <span className="font-semibold text-black">{event.user}</span>
                  <span className="text-black/70">{event.action}</span>
                  <span className="font-bold text-black">{event.highlight}</span>
                  <span className="mx-4 text-black/30">|</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
