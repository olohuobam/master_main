"use client";

import { useEffect } from "react";

export default function PremiumPageWrapper({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    // ── Custom cursor ──────────────────────────────────────────────────
    const cursor = document.createElement("div");
    cursor.id = "cv-cursor";
    const dot = document.createElement("div");
    dot.id = "cv-cursor-dot";
    const ring = document.createElement("div");
    ring.id = "cv-cursor-ring";
    cursor.appendChild(dot);
    cursor.appendChild(ring);
    document.body.appendChild(cursor);

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      cursor.style.transform = `translate(${mx}px,${my}px)`;
      ring.style.transform = `translate(${rx - mx}px,${ry - my}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Cursor grow on interactive elements
    const interactiveSelector = "a, button, [role='button'], [data-magnetic], .cv-card-hover";
    const onEnter = () => { ring.style.width = "56px"; ring.style.height = "56px"; ring.style.top = "-28px"; ring.style.left = "-28px"; };
    const onLeave = () => { ring.style.width = "40px"; ring.style.height = "40px"; ring.style.top = "-20px"; ring.style.left = "-20px"; };
    document.querySelectorAll<HTMLElement>(interactiveSelector).forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // ── Intersection observer for scroll reveal ───────────────────────
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "-40px 0px" });

    document.querySelectorAll("[data-reveal], .cv-stagger, .cv-section-line").forEach(el => observer.observe(el));

    // ── Smooth scroll ─────────────────────────────────────────────────
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onAnchorClick);

    // ── Magnetic hover ────────────────────────────────────────────────
    const magneticEls = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const magCleanups: (() => void)[] = [];
    magneticEls.forEach(el => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        el.style.transform = `translate(${(e.clientX - cx) * 0.3}px,${(e.clientY - cy) * 0.3}px)`;
      };
      const leave = () => { el.style.transform = "translate(0,0)"; };
      el.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magCleanups.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onAnchorClick);
      observer.disconnect();
      magCleanups.forEach(fn => fn());
      cursor.remove();
    };
  }, []);

  return <>{children}</>;
}
