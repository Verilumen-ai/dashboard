"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LBISTTabs } from "@/components/lbist/LBISTTabs";
import { AIRecommendationTab } from "@/components/lbist/tabs/AIRecommendationTab";
import { CoverageAnalysisTab } from "@/components/lbist/tabs/CoverageAnalysisTab";
import { DiagnosisTab } from "@/components/lbist/tabs/DiagnosisTab";
import { FailureAnalysisTab } from "@/components/lbist/tabs/FailureAnalysisTab";
import { OverviewTab } from "@/components/lbist/tabs/OverviewTab";
import type { LbistTab } from "@/types/lbist";

const tabContent: Record<LbistTab, React.ComponentType> = {
  overview: OverviewTab,
  "coverage-analysis": CoverageAnalysisTab,
  "failure-analysis": FailureAnalysisTab,
  diagnosis: DiagnosisTab,
  "ai-recommendation": AIRecommendationTab,
};

export default function LbistPage() {
  const [activeTab, setActiveTab] = useState<LbistTab>("overview");
  const ActiveContent = tabContent[activeTab];

  return (
    <DashboardLayout
      title="LBIST Analysis"
      subtitle="Logic Built-In Self-Test Analytics, Coverage and Diagnosis"
      searchPlaceholder="Search LBIST sessions, logic blocks, signatures, controllers..."
      primaryActionLabel="Run AI Diagnosis"
    >
      <LBISTTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
