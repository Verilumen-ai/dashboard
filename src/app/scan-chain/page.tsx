"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ScanChainTabs } from "@/components/scan-chain/ScanChainTabs";
import { FailureAnalysisTab } from "@/components/scan-chain/tabs/FailureAnalysisTab";
import { OverviewTab } from "@/components/scan-chain/tabs/OverviewTab";
import { PatternAnalysisTab } from "@/components/scan-chain/tabs/PatternAnalysisTab";
import { ScanDiagnosisTab } from "@/components/scan-chain/tabs/ScanDiagnosisTab";
import type { ScanChainTab } from "@/types/scanChain";

const tabContent: Record<ScanChainTab, React.ComponentType> = {
  overview: OverviewTab,
  "pattern-analysis": PatternAnalysisTab,
  "failure-analysis": FailureAnalysisTab,
  "scan-diagnosis": ScanDiagnosisTab,
};

export default function ScanChainPage() {
  const [activeTab, setActiveTab] = useState<ScanChainTab>("overview");
  const ActiveContent = tabContent[activeTab];

  return (
    <DashboardLayout
      title="Scan Chain Analysis"
      searchPlaceholder="Search scan chains, patterns, chips, flops..."
      primaryActionLabel="AI Diagnose"
    >
      <ScanChainTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
