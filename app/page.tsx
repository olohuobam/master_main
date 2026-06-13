import PremiumHero from "@/components/premium-hero";
import PremiumScanner from "@/components/premium-scanner";
import InstantSnipe from "@/components/instant-snipe";
import CsvUpload from "@/components/csv-upload";
import InventorySection from "@/components/inventory-section";
import SlabIQSection from "@/components/slab-iq-section";
import PortfolioAnalytics from "@/components/portfolio-analytics";
//import HomepageAffiliateSection from "@/components/HomepageAffiliateSection";
import PremiumCtaFooter from "@/components/premium-cta-footer";
import PremiumPageWrapper from "@/components/premium-page-wrapper";

export default function Page() {
  return (
    <PremiumPageWrapper>
      {/* 1. Hero — Maze-style collage entrance + 3D turntable */}
      <PremiumHero />

      {/* 2. Scanner — local icons, animated scanner ring */}
      <PremiumScanner />

      {/* 3. Sniper — platforms feed, crosshair, sniped result */}
      <InstantSnipe />

      {/* 4. CSV Upload — aurora BG, upload flow animation */}
      <CsvUpload />

      {/* 5. Inventory — flip cards, feature pillars */}
      <InventorySection />

      {/* 6. Slab IQ — graded card intelligence */}
      <SlabIQSection />

      {/* 7. Portfolio Analytics — GSAP chips, infinite chart gallery */}
      <PortfolioAnalytics />

      {/* 8. Affiliate — leaderboard, earnings carousel */}
      {/* <HomepageAffiliateSection /> */}

      {/* 9. CTA + Footer */}
      <PremiumCtaFooter />
    </PremiumPageWrapper>
  );
}
