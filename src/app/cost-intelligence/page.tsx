"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CostTabs } from "@/components/cost-intelligence/CostTabs";
import { AICostOptimizationTab } from "@/components/cost-intelligence/tabs/AICostOptimizationTab";
import { LbistCostTab } from "@/components/cost-intelligence/tabs/LbistCostTab";
import { MbistCostTab } from "@/components/cost-intelligence/tabs/MbistCostTab";
import { OverviewTab } from "@/components/cost-intelligence/tabs/OverviewTab";
import { ScanChainCostTab } from "@/components/cost-intelligence/tabs/ScanChainCostTab";
import { WaferCostTab } from "@/components/cost-intelligence/tabs/WaferCostTab";
import type { CostTab } from "@/types/costIntelligence";

const tabContent: Record<CostTab, React.ComponentType> = {
  overview: OverviewTab,
  "scan-chain": ScanChainCostTab,
  mbist: MbistCostTab,
  lbist: LbistCostTab,
  wafer: WaferCostTab,
  "ai-optimization": AICostOptimizationTab,
};

export default function CostIntelligencePage() {
  const [activeTab, setActiveTab] = useState<CostTab>("overview");
  const ActiveContent = tabContent[activeTab];

  return (
    <DashboardLayout
      title="Cost Intelligence"
      subtitle="Analyze and optimize semiconductor test costs across Scan Chain, MBIST, LBIST, and Wafer Analysis"
      searchPlaceholder="Search lots, wafers, products, testers..."
      primaryActionLabel="Generate Cost Optimization"
    >
      <CostTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
