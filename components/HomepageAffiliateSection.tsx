"use client"

import AffiliateHeroSection, { ToolsSection } from "./affiliate-hero-section"

// ---------------------------------------------------------------------------
// HomepageAffiliateSection — main export
// Renders the full affiliate section for use inside the homepage.
// hideNav is passed to AffiliateHeroSection so its internal sticky nav
// and top banner are hidden (the homepage has its own global nav above).
// ---------------------------------------------------------------------------
export default function HomepageAffiliateSection() {
  return (
    <section id="affiliate" className="relative">
      <div className="relative bg-black">
        <AffiliateHeroSection hideNav hideToolsSection />
        <ToolsSection />
      </div>
    </section>
  )
}
