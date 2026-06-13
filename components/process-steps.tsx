"use client"

import { motion, useAnimationFrame } from "framer-motion"
import { useRef, useState, useMemo } from "react"

const READ_CYCLE = ["RAW", "PSA 8", "PSA 9", "PSA 10", "READ"]

// Total loop length in ms
const CYCLE = 5200

// Normalized phase windows (0..1 of CYCLE)
// Middle (read) section is intentionally longer so it can cycle through all grades
const T = {
  scanStart: 0.03,
  scanEnd: 0.18,
  readStart: 0.22,
  readEnd: 0.74,
  doneStart: 0.78,
  doneEnd: 0.96,
}

type Phase = "idle" | "scan" | "read" | "done"

export function ProcessSteps() {
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)

  useAnimationFrame((t) => {
    if (startRef.current === null) startRef.current = t
    const elapsed = (t - startRef.current) % CYCLE
    setProgress(elapsed / CYCLE)
  })

  const phase: Phase = useMemo(() => {
    if (progress >= T.scanStart && progress < T.scanEnd) return "scan"
    if (progress >= T.readStart && progress < T.readEnd) return "read"
    if (progress >= T.doneStart && progress < T.doneEnd) return "done"
    return "idle"
  }, [progress])

  // Playhead travels left-to-right, pausing on each word
  const playhead = useMemo(() => {
    const stops = [
      { at: 0, x: 0 },
      { at: T.scanStart, x: 1 / 6 - 0.02 },
      { at: T.scanEnd, x: 1 / 6 + 0.04 },
      { at: T.readStart, x: 3 / 6 - 0.06 },
      { at: T.readEnd, x: 3 / 6 + 0.06 },
      { at: T.doneStart, x: 5 / 6 - 0.04 },
      { at: T.doneEnd, x: 5 / 6 + 0.02 },
      { at: 1, x: 1 },
    ]
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i]
      const b = stops[i + 1]
      if (progress >= a.at && progress <= b.at) {
        const k = (progress - a.at) / (b.at - a.at)
        const eased = k * k * (3 - 2 * k)
        return a.x + (b.x - a.x) * eased
      }
    }
    return 1
  }, [progress])

  const scanLocal = useMemo(() => {
    if (progress < T.scanStart) return 0
    if (progress >= T.scanEnd) return 1
    return (progress - T.scanStart) / (T.scanEnd - T.scanStart)
  }, [progress])

  const readIndex = useMemo(() => {
    if (phase !== "read") return READ_CYCLE.length - 1
    const local = (progress - T.readStart) / (T.readEnd - T.readStart)
    return Math.min(READ_CYCLE.length - 1, Math.floor(local * READ_CYCLE.length))
  }, [phase, progress])

  const scanDone = progress > T.scanEnd
  const readDone = progress > T.readEnd
  const doneActive = phase === "done"

  return (
    <div className="relative w-full select-none">
      {/* Eyebrow row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-8">
        <Eyebrow num="01" label="Capture" active={phase === "scan"} done={scanDone} align="center" />
        <Eyebrow num="02" label="Analyze" active={phase === "read"} done={readDone} align="center" />
        <Eyebrow num="03" label="Result" active={doneActive} done={progress > T.doneEnd} align="center" />
      </div>

      {/* The single hairline with traveling playhead */}
      <div className="relative mt-5 h-px w-full">
        <div className="absolute inset-0 bg-neutral-200" />
        <motion.div
          className="absolute inset-y-0 left-0 bg-neutral-900"
          style={{ width: `${playhead * 100}%` }}
        />
        {/* tick marks at each step */}
        <Tick at={1 / 6} done={scanDone} active={phase === "scan"} />
        <Tick at={3 / 6} done={readDone} active={phase === "read"} />
        <Tick at={5 / 6} done={progress > T.doneEnd} active={doneActive} />

        {/* playhead */}
        <motion.div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${playhead * 100}%` }}
        >
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 -m-2 rounded-full bg-emerald-500/20 blur-[3px]" />
            <div className="absolute inset-0 -m-4 rounded-full bg-emerald-500/10 blur-md" />
          </div>
        </motion.div>
      </div>

      {/* Word row */}
      <div className="mt-6 grid grid-cols-3 items-center gap-2 sm:mt-10 sm:gap-8">
        <div className="flex justify-center">
          <ScanWord progress={scanLocal} active={phase === "scan"} completed={scanDone} />
        </div>
        <div className="flex justify-center">
          <ReadWord
            label={READ_CYCLE[readIndex]}
            active={phase === "read"}
            completed={readDone}
          />
        </div>
        <div className="flex justify-center">
          <DoneWord active={doneActive} settled={progress > T.doneEnd} />
        </div>
      </div>
    </div>
  )
}

function Tick({ at, done, active }: { at: number; done: boolean; active: boolean }) {
  return (
    <div
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${at * 100}%` }}
    >
      <motion.div
        animate={{
          backgroundColor: done
            ? "rgb(23 23 23)"
            : active
              ? "rgb(16 185 129)"
              : "rgb(212 212 212)",
          scale: active ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="h-1.5 w-1.5 rounded-full"
      />
    </div>
  )
}

function Eyebrow({
  num,
  label,
  active,
  done,
  align,
}: {
  num: string
  label: string
  active: boolean
  done: boolean
  align: "left" | "center" | "right"
}) {
  const justify =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center"
  return (
    <div className={`flex flex-wrap items-center gap-1 sm:gap-3 ${justify}`}>
      <motion.span
        animate={{
          color: active || done ? "rgb(16 185 129)" : "rgb(163 163 163)",
        }}
        transition={{ duration: 0.4 }}
        className="font-mono text-[10px] tracking-[0.18em] sm:text-base sm:tracking-[0.22em] md:text-lg"
      >
        {num}
      </motion.span>
      <motion.span
        animate={{
          backgroundColor: active || done ? "rgb(16 185 129)" : "rgb(212 212 212)",
        }}
        transition={{ duration: 0.4 }}
        className="hidden h-px w-8 sm:inline-block"
      />
      <motion.span
        animate={{
          color: active || done ? "rgb(16 185 129)" : "rgb(115 115 115)",
        }}
        transition={{ duration: 0.4 }}
        className="text-[10px] font-medium uppercase tracking-[0.18em] sm:text-base sm:tracking-[0.22em] md:text-lg"
      >
        {label}
      </motion.span>
    </div>
  )
}

function ScanWord({
  progress,
  active,
  completed,
}: {
  progress: number
  active: boolean
  completed: boolean
}) {
  const reveal = completed ? 1 : Math.max(0, Math.min(1, progress))
  return (
    <div className="relative inline-block">
      {/* Faint ghost */}
      <h2 className="text-lg font-semibold tracking-tight text-neutral-200 sm:text-2xl md:text-3xl">
        SCAN
      </h2>
      {/* Revealed dark text */}
      <h2
        aria-hidden
        className="absolute inset-0 text-lg font-semibold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl"
        style={{ clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)` }}
      >
        SCAN
      </h2>
      {/* Vertical scan beam */}
      {active && (
        <div
          className="absolute -inset-y-3"
          style={{ left: `${reveal * 100}%`, width: 1 }}
        >
          <div className="absolute inset-y-0 left-0 w-px bg-emerald-500" />
          <div className="absolute inset-y-0 -left-8 w-16 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur-md" />
        </div>
      )}
      {/* Underline that draws in with the scan */}
      <div
        className="absolute -bottom-1 left-0 h-[2px] bg-emerald-500"
        style={{ width: `${reveal * 100}%` }}
      />
    </div>
  )
}

function ReadWord({
  label,
  active,
  completed,
}: {
  label: string
  active: boolean
  completed: boolean
}) {
  const display = completed ? "READ" : label
  return (
    <div className="relative inline-flex items-baseline gap-3">
      <div className="relative">
        <motion.h2
          key={display}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`text-lg font-semibold tracking-tight sm:text-2xl md:text-3xl ${
            active || completed ? "text-neutral-900" : "text-neutral-300"
          }`}
        >
          {display}
        </motion.h2>
        {/* Flashing underline that redraws per chip */}
        {(active || completed) && (
          <motion.div
            key={`u-${display}`}
            className="absolute -bottom-1 left-0 h-[2px] bg-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        )}
      </div>
      {active && (
        <motion.span
          className="inline-block h-2 w-2 translate-y-[-0.2em] rounded-full bg-emerald-500"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  )
}

function DoneWord({ active, settled }: { active: boolean; settled: boolean }) {
  return (
    <div className="relative inline-block">
      <motion.h2
        animate={{
          color: active || settled ? "rgb(16 185 129)" : "rgb(212 212 212)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-sm font-semibold tracking-tight sm:text-xl md:text-3xl"
      >
        <motion.span
          animate={{ letterSpacing: active ? "0em" : "0.04em" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          INSTANTLY
        </motion.span>
      </motion.h2>
      {/* Underline sweep */}
      <motion.div
        className="absolute -bottom-1 left-0 h-[2px] bg-emerald-500"
        initial={false}
        animate={{ width: active || settled ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
