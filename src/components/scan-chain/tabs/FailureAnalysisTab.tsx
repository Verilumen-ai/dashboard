"use client";

import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendAreaChart, TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { DistributionPie } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import {
  DataTable,
  PriorityBadge,
  StatusBadge,
} from "@/components/scan-chain/DataTable";
import { KPIGrid } from "@/components/scan-chain/KPICard";
import {
  aiRecommendations,
  failureDensityData,
  failureDistribution,
  failureKPIs,
  failureRecords,
  failureTrendData,
  failingRegionsData,
  rootCauseAnalysis,
} from "@/lib/scanChainData";

export function FailureAnalysisTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={failureKPIs} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Failure Trend" subtitle="Total vs. critical failures">
          <TrendLineChart
            data={failureTrendData}
            lines={[
              { key: "value", color: "#EF4444", name: "Total Failures" },
              { key: "value2", color: "#F97316", name: "Critical" },
            ]}
          />
        </ChartCard>

        <ChartCard title="Failure Type Distribution" subtitle="Breakdown by type">
          <DistributionPie data={failureDistribution} />
        </ChartCard>

        <ChartCard title="Failing Regions" subtitle="Failures by chip region">
          <VerticalBarChart data={failingRegionsData} color="#EF4444" />
        </ChartCard>

        <ChartCard title="Failure Density" subtitle="Spatial failure density zones">
          <VerticalBarChart data={failureDensityData} color="#F97316" />
        </ChartCard>
      </div>

      <DataTable
        title="Failure Records"
        subtitle="Detailed failure log with severity classification"
        data={failureRecords}
        rowKey="failureId"
        searchKeys={["failureId", "chainId", "chip", "failType"]}
        searchPlaceholder="Search failures..."
        columns={[
          {
            key: "failureId",
            label: "Failure ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">
                {row.failureId}
              </span>
            ),
          },
          { key: "chainId", label: "Chain ID" },
          { key: "chip", label: "Chip" },
          { key: "failType", label: "Fail Type" },
          {
            key: "severity",
            label: "Severity",
            render: (row) => {
              const variant =
                row.severity === "Critical"
                  ? "danger"
                  : row.severity === "Warning"
                    ? "warning"
                    : "success";
              return <StatusBadge status={row.severity} variant={variant} />;
            },
          },
          { key: "timestamp", label: "Timestamp" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DataTable
          title="Root Cause Analysis"
          subtitle="Identified root causes ranked by frequency"
          data={rootCauseAnalysis}
          rowKey="cause"
          searchKeys={["cause"]}
          searchPlaceholder="Search causes..."
          pageSize={6}
          columns={[
            { key: "cause", label: "Root Cause" },
            { key: "count", label: "Count" },
            {
              key: "percentage",
              label: "Percentage",
              render: (row) => `${row.percentage}%`,
            },
            {
              key: "trend",
              label: "Trend",
              render: (row) => (
                <span
                  className={
                    row.trend < 0 ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {row.trend > 0 ? "+" : ""}
                  {row.trend}%
                </span>
              ),
            },
          ]}
        />

        <DataTable
          title="AI Recommendation"
          subtitle="Machine learning repair suggestions"
          data={aiRecommendations}
          rowKey="id"
          searchKeys={["chainId", "recommendation"]}
          searchPlaceholder="Search recommendations..."
          pageSize={4}
          columns={[
            { key: "id", label: "ID" },
            { key: "chainId", label: "Chain ID" },
            { key: "recommendation", label: "Recommendation" },
            {
              key: "confidence",
              label: "Confidence",
              render: (row) => `${row.confidence}%`,
            },
            {
              key: "impact",
              label: "Impact",
              render: (row) => <PriorityBadge priority={row.impact} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
