"use client";

import { TrendAreaChart, TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { AIDiagnosisCard } from "@/components/scan-chain/AIDiagnosisCard";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { ConnectivityGraph } from "@/components/scan-chain/ConnectivityGraph";
import { DataTable, StatusBadge } from "@/components/scan-chain/DataTable";
import { KPIGrid } from "@/components/scan-chain/KPICard";
import {
  aiConfidenceTrend,
  aiDiagnosisSummary,
  debugPoints,
  diagnosisKPIs,
  diagnosisReports,
  diagnosisTimeline,
  failurePropagationData,
  repairPriorityData,
  suspectedScanCells,
} from "@/lib/scanChainData";

export function ScanDiagnosisTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={diagnosisKPIs} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Diagnosis Timeline"
          subtitle="Diagnosed vs. unknown chains over time"
        >
          <TrendLineChart
            data={diagnosisTimeline}
            lines={[
              { key: "value", color: "#22C55E", name: "Diagnosed" },
              { key: "value2", color: "#64748B", name: "Unknown" },
            ]}
          />
        </ChartCard>

        <ConnectivityGraph />

        <ChartCard
          title="Failure Propagation"
          subtitle="Failure spread across connected chains"
        >
          <TrendAreaChart data={failurePropagationData} />
        </ChartCard>

        <ChartCard title="AI Confidence" subtitle="Model confidence trend">
          <TrendLineChart
            data={aiConfidenceTrend}
            lines={[{ key: "value", color: "#7C3AED", name: "Confidence %" }]}
          />
        </ChartCard>
      </div>

      <DataTable
        title="Diagnosis Report"
        subtitle="Comprehensive scan chain diagnosis results"
        data={diagnosisReports}
        rowKey="chainId"
        searchKeys={["chainId", "rootCause", "repairSuggestion"]}
        searchPlaceholder="Search reports..."
        columns={[
          {
            key: "chainId",
            label: "Chain ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">
                {row.chainId}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (row) => {
              const variant =
                row.status === "Diagnosed"
                  ? "success"
                  : row.status === "Partial"
                    ? "warning"
                    : "neutral";
              return <StatusBadge status={row.status} variant={variant} />;
            },
          },
          { key: "rootCause", label: "Root Cause" },
          {
            key: "confidence",
            label: "Confidence",
            render: (row) => `${row.confidence}%`,
          },
          { key: "repairSuggestion", label: "Repair Suggestion" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DataTable
          title="Suspected Scan Cells"
          subtitle="High-probability failing scan cells"
          data={suspectedScanCells}
          rowKey="cellId"
          searchKeys={["cellId", "chainId", "location"]}
          searchPlaceholder="Search cells..."
          pageSize={4}
          columns={[
            {
              key: "cellId",
              label: "Cell ID",
              render: (row) => (
                <span className="font-mono text-xs font-medium text-white">
                  {row.cellId}
                </span>
              ),
            },
            { key: "chainId", label: "Chain ID" },
            { key: "cellType", label: "Cell Type" },
            {
              key: "failProbability",
              label: "Fail Probability",
              render: (row) => `${(row.failProbability * 100).toFixed(0)}%`,
            },
            { key: "location", label: "Location" },
          ]}
        />

        <DataTable
          title="Recommended Debug Points"
          subtitle="Priority debug locations for investigation"
          data={debugPoints}
          rowKey="pointId"
          searchKeys={["pointId", "chainId", "region"]}
          searchPlaceholder="Search debug points..."
          pageSize={4}
          columns={[
            { key: "pointId", label: "Point ID" },
            { key: "chainId", label: "Chain ID" },
            { key: "region", label: "Region" },
            { key: "priority", label: "Priority" },
            { key: "description", label: "Description" },
          ]}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataTable
          title="Repair Priority"
          subtitle="Ranked repair actions by impact and success rate"
          data={repairPriorityData}
          rowKey="chainId"
          searchKeys={["chainId", "failType"]}
          searchPlaceholder="Search repairs..."
          pageSize={4}
          columns={[
            { key: "priority", label: "Priority" },
            { key: "chainId", label: "Chain ID" },
            { key: "failType", label: "Fail Type" },
            { key: "estimatedFixTime", label: "Est. Fix Time" },
            {
              key: "successRate",
              label: "Success Rate",
              render: (row) => `${row.successRate}%`,
            },
          ]}
        />

        <AIDiagnosisCard data={aiDiagnosisSummary} />
      </div>
    </div>
  );
}
