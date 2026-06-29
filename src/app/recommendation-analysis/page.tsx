"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RecommendationTabs } from "@/components/recommendation/RecommendationTabs";
import { LbistTab } from "@/components/recommendation/tabs/LbistTab";
import { MbistTab } from "@/components/recommendation/tabs/MbistTab";
import { OverviewTab } from "@/components/recommendation/tabs/OverviewTab";
import { ScanChainTab } from "@/components/recommendation/tabs/ScanChainTab";
import { WaferTab } from "@/components/recommendation/tabs/WaferTab";
import type { RecommendationTab } from "@/types/recommendation";

const tabContent: Record<RecommendationTab, React.ComponentType> = {
  overview: OverviewTab,
  "scan-chain": ScanChainTab,
  mbist: MbistTab,
  lbist: LbistTab,
  wafer: WaferTab,
};

export default function RecommendationAnalysisPage() {
  const [activeTab, setActiveTab] = useState<RecommendationTab>("overview");
  const ActiveContent = tabContent[activeTab];

  return (
    <DashboardLayout
      title="Recommendation Analysis"
      subtitle="AI-powered unified recommendations across Scan Chain, MBIST, LBIST and Wafer Analysis"
      searchPlaceholder="Search recommendations, lots, wafers, chips, scan chains..."
      primaryActionLabel="Generate AI Recommendations"
    >
      <RecommendationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          <ActiveContent />
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
