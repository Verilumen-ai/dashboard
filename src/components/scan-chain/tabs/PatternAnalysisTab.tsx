"use client";

import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable, PriorityBadge, StatusBadge } from "@/components/scan-chain/DataTable";
import { KPIGrid } from "@/components/scan-chain/KPICard";
import {
  patternCostTrend,
  patternCoverageTrend,
  patternDensityData,
  patternExecutionTrend,
  patternKPIs,
  patternRecommendations,
  patternSummaryData,
} from "@/lib/scanChainData";

export function PatternAnalysisTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={patternKPIs} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Pattern Execution Trend"
          subtitle="Executed vs. scheduled patterns"
        >
          <TrendLineChart
            data={patternExecutionTrend}
            lines={[
              { key: "value", color: "#7C3AED", name: "Executed" },
              { key: "value2", color: "#06B6D4", name: "Scheduled" },
            ]}
          />
        </ChartCard>

        <ChartCard title="Pattern Cost" subtitle="Weekly test cost trend">
          <TrendLineChart
            data={patternCostTrend}
            lines={[{ key: "value", color: "#F97316", name: "Cost ($)" }]}
          />
        </ChartCard>

        <ChartCard title="Pattern Coverage" subtitle="Coverage percentage over time">
          <TrendLineChart
            data={patternCoverageTrend}
            lines={[{ key: "value", color: "#22C55E", name: "Coverage %" }]}
          />
        </ChartCard>

        <ChartCard title="Pattern Density" subtitle="Pattern density by segment">
          <VerticalBarChart data={patternDensityData} color="#7C3AED" />
        </ChartCard>
      </div>

      <DataTable
        title="Pattern Summary"
        subtitle="Active scan test patterns and performance metrics"
        data={patternSummaryData}
        rowKey="patternId"
        searchKeys={["patternId", "status"]}
        searchPlaceholder="Search patterns..."
        columns={[
          {
            key: "patternId",
            label: "Pattern ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">
                {row.patternId}
              </span>
            ),
          },
          { key: "chainCount", label: "Chain Count" },
          {
            key: "coverage",
            label: "Coverage",
            render: (row) => `${row.coverage}%`,
          },
          {
            key: "runtime",
            label: "Runtime",
            render: (row) => `${row.runtime}s`,
          },
          {
            key: "efficiency",
            label: "Efficiency",
            render: (row) => `${row.efficiency}%`,
          },
          {
            key: "status",
            label: "Status",
            render: (row) => {
              const variant =
                row.status === "Active"
                  ? "success"
                  : row.status === "Deprecated"
                    ? "danger"
                    : "neutral";
              return <StatusBadge status={row.status} variant={variant} />;
            },
          },
        ]}
      />

      <DataTable
        title="Pattern Recommendations"
        subtitle="AI-generated optimization suggestions"
        data={patternRecommendations}
        rowKey="patternId"
        searchKeys={["patternId", "issue", "recommendation"]}
        searchPlaceholder="Search recommendations..."
        columns={[
          {
            key: "patternId",
            label: "Pattern ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">
                {row.patternId}
              </span>
            ),
          },
          { key: "issue", label: "Issue" },
          { key: "recommendation", label: "Recommendation" },
          {
            key: "priority",
            label: "Priority",
            render: (row) => <PriorityBadge priority={row.priority} />,
          },
        ]}
      />
    </div>
  );
}
