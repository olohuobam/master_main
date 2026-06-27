import PremiumHero from "@/components/premium-hero";
import PremiumScanner from "@/components/premium-scanner";
import InstantSnipe from "@/components/instant-snipe";
import CsvUpload from "@/components/csv-upload";
import InventorySection from "@/components/inventory-section";
import SlabIQSection from "@/components/slab-iq-section";
import PortfolioAnalytics from "@/components/portfolio-analytics";
import HomepageAffiliateSection from "@/components/HomepageAffiliateSection";
import AllToolsSection from "@/components/all-tools-section";
import WhiteLabelSection from "@/components/white-label-section";
import PremiumCtaFooter from "@/components/premium-cta-footer";
import PremiumPageWrapper from "@/components/premium-page-wrapper";

export default function Page() {
  return (
    <PremiumPageWrapper>
      {/* 1. Hero — dark cinematic, GSAP entrance, floating sniper widget */}
      <PremiumHero />

      {/* 2. Scanner — 4AI Vision, bulk scanning */}
      <PremiumScanner />

      {/* 3. Sniper — live stream sniping tool */}
      <InstantSnipe />

      {/* 4. CSV Upload — bulk import, value, export */}
      <CsvUpload />

      {/* 5. Inventory — all-in-one management */}
      <InventorySection />

      {/* 6. All 13 Tools — dark grid, clickable detail modals */}
      <AllToolsSection />

      {/* 7. Slab IQ — grading intelligence */}
      <SlabIQSection />

      {/* 8. Portfolio Analytics */}
      <PortfolioAnalytics />

      {/* 9. Affiliate */}
      <HomepageAffiliateSection />

      {/* 10. White Label */}
      <WhiteLabelSection />

      {/* 11. CTA + Footer */}
      <PremiumCtaFooter />
    </PremiumPageWrapper>
  );
}