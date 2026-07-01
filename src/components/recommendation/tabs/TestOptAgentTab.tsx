"use client";

import { useMemo } from "react";
import { Gauge } from "lucide-react";
import { RecommendationActionButtons } from "@/components/platform/RecommendationActionButtons";
import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendAreaChart, TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { DonutChart } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable } from "@/components/scan-chain/DataTable";
import { AgentActionBar } from "@/components/recommendation/AgentActionBar";
import { AgentSummaryCard } from "@/components/recommendation/AgentSummaryCard";
import { AgentTabHeader } from "@/components/recommendation/AgentTabHeader";
import { AgentWorkflowDiagram } from "@/components/recommendation/AgentWorkflowDiagram";
import { PriorityBadge, StatusBadge } from "@/components/recommendation/Badges";
import { SectionedKPIGrid } from "@/components/recommendation/SectionedKPIGrid";
import { SiteUtilizationHeatmap } from "@/components/recommendation/SiteUtilizationHeatmap";
import {
  adaptiveTestingDistribution,
  costReductionTrend,
  generateSiteUtilizationHeatmap,
  optimizationPriorityData,
  testOptAgentSummary,
  testOptKPISections,
  testOptRecRows,
  testOptRecommendationTrend,
  testOptWorkflowSteps,
  yieldImprovementTrend,
} from "@/lib/recommendationData";

export function TestOptAgentTab() {
  const siteHeatData = useMemo(() => generateSiteUtilizationHeatmap(4, 4), []);

  return (
    <div className="dashboard-content">
      <AgentTabHeader
        icon={Gauge}
        title="Test Optimization Recommendation Agent"
        description="AI-powered adaptive testing, yield optimization, cost reduction, and production test strategy recommendations."
      />

      <SectionedKPIGrid sections={testOptKPISections} gridClassName="test-opt-kpi-grid" />

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Adaptive Testing Distribution" subtitle="By optimization category">
          <DonutChart
            data={adaptiveTestingDistribution}
            centerLabel="Total"
            centerValue={111}
          />
        </ChartCard>
        <ChartCard title="Optimization Priority" subtitle="By priority level">
          <VerticalBarChart data={optimizationPriorityData} color="#22C55E" />
        </ChartCard>
        <ChartCard title="Recommendation Trend" subtitle="Last 30 days">
          <TrendLineChart
            data={testOptRecommendationTrend}
            lines={[{ key: "value", color: "#7C3AED", name: "Recommendations" }]}
          />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Yield Improvement Trend" subtitle="Current vs. projected yield">
          <TrendLineChart
            data={yieldImprovementTrend}
            lines={[
              { key: "value", color: "#64748B", name: "Current" },
              { key: "value2", color: "#22C55E", name: "Projected" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Cost Reduction Trend" subtitle="Current vs. optimized cost">
          <TrendAreaChart data={costReductionTrend.map((d) => ({ label: d.label, value: d.value2 ?? d.value }))} />
        </ChartCard>
        <ChartCard title="Site Utilization" subtitle="Site 1–16 utilization heatmap">
          <SiteUtilizationHeatmap data={siteHeatData} rows={4} cols={4} />
        </ChartCard>
      </div>

      <DataTable
        title="Optimization Recommendation Table"
        subtitle="Adaptive test strategy and production optimization actions"
        data={testOptRecRows}
        rowKey="recommendationId"
        pageSize={6}
        searchKeys={["recommendationId", "optimizationType", "status", "assignedEngineer"]}
        searchPlaceholder="Search optimization recommendations..."
        columns={[
          {
            key: "recommendationId",
            label: "Recommendation ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">
                {row.recommendationId}
              </span>
            ),
          },
          { key: "optimizationType", label: "Optimization Type" },
          { key: "currentValue", label: "Current Value" },
          { key: "optimizedValue", label: "Optimized Value" },
          { key: "estimatedBenefit", label: "Estimated Benefit" },
          {
            key: "priority",
            label: "Priority",
            render: (row) => <PriorityBadge priority={row.priority} />,
          },
          {
            key: "confidence",
            label: "Confidence",
            render: (row) => `${row.confidence}%`,
          },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
          { key: "assignedEngineer", label: "Assigned Engineer" },
          {
            key: "action",
            label: "Action",
            sortable: false,
            render: (row) => <RecommendationActionButtons id={row.recommendationId} />,
          },
        ]}
      />

      <AgentSummaryCard data={testOptAgentSummary} />

      <AgentWorkflowDiagram
        steps={testOptWorkflowSteps}
        title="Optimization Workflow"
        subtitle="From production data through validated test flow"
      />

      <AgentActionBar variant="test-opt" />
    </div>
  );
}
