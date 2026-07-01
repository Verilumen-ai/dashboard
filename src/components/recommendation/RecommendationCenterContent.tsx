"use client";

import { AgentTabs } from "@/components/recommendation/AgentTabs";
import { TabPanelHost } from "@/components/platform/TabPanelHost";
import { PatternAgentTab } from "@/components/recommendation/tabs/PatternAgentTab";
import { ScanDebugAgentTab } from "@/components/recommendation/tabs/ScanDebugAgentTab";
import { TestOptAgentTab } from "@/components/recommendation/tabs/TestOptAgentTab";
import { useUIStore } from "@/stores/uiStore";
import type { RecommendationAgentTab } from "@/types/recommendation";

const tabContent: Record<RecommendationAgentTab, React.ComponentType> = {
  "pattern-agent": PatternAgentTab,
  "scan-debug-agent": ScanDebugAgentTab,
  "test-optimization-agent": TestOptAgentTab,
};

export function RecommendationCenterContent() {
  const activeTab = useUIStore((s) => s.recommendationAgentTab);
  const setActiveTab = useUIStore((s) => s.setRecommendationAgentTab);

  return (
    <>
      <AgentTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TabPanelHost activeTab={activeTab} tabs={tabContent} />
    </>
  );
}
