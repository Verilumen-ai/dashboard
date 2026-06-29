"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MBISTTabs } from "@/components/mbist/MBISTTabs";
import { AIRecommendationTab } from "@/components/mbist/tabs/AIRecommendationTab";
import { DiagnosisTab } from "@/components/mbist/tabs/DiagnosisTab";
import { FailureAnalysisTab } from "@/components/mbist/tabs/FailureAnalysisTab";
import { MemoryHealthTab } from "@/components/mbist/tabs/MemoryHealthTab";
import { OverviewTab } from "@/components/mbist/tabs/OverviewTab";
import type { MbistTab } from "@/types/mbist";

const tabContent: Record<MbistTab, React.ComponentType> = {
  overview: OverviewTab,
  "memory-health": MemoryHealthTab,
  "failure-analysis": FailureAnalysisTab,
  diagnosis: DiagnosisTab,
  "ai-recommendation": AIRecommendationTab,
};

export default function MbistPage() {
  const [activeTab, setActiveTab] = useState<MbistTab>("overview");
  const ActiveContent = tabContent[activeTab];

  return (
    <DashboardLayout
      title="MBIST Analysis"
      subtitle="Memory Built-In Self-Test Analytics and Diagnosis"
      searchPlaceholder="Search memory instances, patterns, banks, controllers..."
      primaryActionLabel="Run AI Diagnosis"
    >
      <MBISTTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
