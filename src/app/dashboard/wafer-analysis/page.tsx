"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TabPanelHost } from "@/components/platform/TabPanelHost";
import { WaferNavigationProvider } from "@/components/wafer/WaferNavigationContext";
import { WaferTabs } from "@/components/wafer/WaferTabs";
import { DefectClassTab } from "@/components/wafer/tabs/DefectClassTab";
import { OverviewTab } from "@/components/wafer/tabs/OverviewTab";
import type { WaferTab } from "@/types/wafer";

function CentreTab() {
  return <DefectClassTab defectClass="centre" />;
}
function DonutTab() {
  return <DefectClassTab defectClass="donut" />;
}
function EdgeRingTab() {
  return <DefectClassTab defectClass="edge-ring" />;
}
function ScratchTab() {
  return <DefectClassTab defectClass="scratch" />;
}
function NearFullTab() {
  return <DefectClassTab defectClass="near-full" />;
}
function NormalTab() {
  return <DefectClassTab defectClass="normal" />;
}
function EdgeLocTab() {
  return <DefectClassTab defectClass="edge-loc" />;
}
function LocalTab() {
  return <DefectClassTab defectClass="local" />;
}
function RandomTab() {
  return <DefectClassTab defectClass="random" />;
}

const tabContent: Record<WaferTab, React.ComponentType> = {
  overview: OverviewTab,
  centre: CentreTab,
  donut: DonutTab,
  "edge-ring": EdgeRingTab,
  scratch: ScratchTab,
  "near-full": NearFullTab,
  normal: NormalTab,
  "edge-loc": EdgeLocTab,
  local: LocalTab,
  random: RandomTab,
};

export default function WaferAnalysisPage() {
  const [activeTab, setActiveTab] = useState<WaferTab>("overview");

  const handleNavigate = (tab: WaferTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DashboardLayout
      title="Wafer Analysis"
      subtitle="AI-powered wafer defect classification, yield analysis, hotspot detection and spatial intelligence."
      searchPlaceholder="Search lots, wafers, defects, zones..."
      primaryActionLabel="Generate Yield Analysis"
      pageId="wafer-analysis"
    >
      <WaferNavigationProvider onNavigate={handleNavigate}>
        <WaferTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <TabPanelHost activeTab={activeTab} tabs={tabContent} />
      </WaferNavigationProvider>
    </DashboardLayout>
  );
}
