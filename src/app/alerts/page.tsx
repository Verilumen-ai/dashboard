"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertTabs } from "@/components/alerts/AlertTabs";
import { AIRecommendationAlertsTab } from "@/components/alerts/tabs/AIRecommendationAlertsTab";
import { CostAlertsTab } from "@/components/alerts/tabs/CostAlertsTab";
import { LbistAlertsTab } from "@/components/alerts/tabs/LbistAlertsTab";
import { MbistAlertsTab } from "@/components/alerts/tabs/MbistAlertsTab";
import { OverviewTab } from "@/components/alerts/tabs/OverviewTab";
import { ScanChainAlertsTab } from "@/components/alerts/tabs/ScanChainAlertsTab";
import { WaferAlertsTab } from "@/components/alerts/tabs/WaferAlertsTab";
import type { AlertTab } from "@/types/alerts";

const tabContent: Record<AlertTab, React.ComponentType> = {
  overview: OverviewTab,
  "scan-chain": ScanChainAlertsTab,
  mbist: MbistAlertsTab,
  lbist: LbistAlertsTab,
  wafer: WaferAlertsTab,
  cost: CostAlertsTab,
  "ai-recommendation": AIRecommendationAlertsTab,
};

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<AlertTab>("overview");
  const ActiveContent = tabContent[activeTab];

  return (
    <DashboardLayout
      title="Alerts"
      subtitle="Monitor and manage real-time alerts across Scan Chain, MBIST, LBIST, Wafer Analysis, Cost Intelligence, and AI Recommendations"
      searchPlaceholder="Search alerts, lots, wafers, products, testers..."
      primaryActionLabel="Mark All as Read"
    >
      <AlertTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
