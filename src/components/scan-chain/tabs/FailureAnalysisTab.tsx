"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { DistributionPie } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable, StatusBadge } from "@/components/scan-chain/DataTable";
import { FailureByLotChart } from "@/components/scan-chain/failure/FailureByLotChart";
import { FailureKPIGrid } from "@/components/scan-chain/failure/FailureKPIGrid";
import {
  failureAnalysisDistribution,
  failureAnalysisKPIs,
  failureAnalysisRows,
  failureByLotData,
  failureRateTrend,
  overallFailureTrend,
} from "@/lib/scanChainData";
import { useUploadStore } from "@/stores/uploadStore";

export function FailureAnalysisTab() {
  const showToast = useUploadStore((s) => s.showToast);

  const handleExport = () => showToast("Failure analysis report export started", "success");

  return (
    <div className="dashboard-content">
      <FailureKPIGrid data={failureAnalysisKPIs} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Overall Failure Trend" subtitle="Total failures vs. resolved">
          <TrendLineChart
            data={overallFailureTrend}
            lines={[
              { key: "value", color: "#EF4444", name: "Total Failures" },
              { key: "value2", color: "#22C55E", name: "Resolved" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Failure Rate Trend" subtitle="Aggregate failure rate over time">
          <TrendLineChart
            data={failureRateTrend}
            lines={[{ key: "value", color: "#F97316", name: "Failure Rate %" }]}
          />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Failure Distribution" subtitle="Fault category breakdown">
          <DistributionPie data={failureAnalysisDistribution} />
        </ChartCard>
        <ChartCard title="Failure by Lot" subtitle="Top lots by failure count">
          <FailureByLotChart data={failureByLotData} />
        </ChartCard>
      </div>

      <DataTable
        title="Failure Analysis Table"
        subtitle="Cross-lot failure records with AI root cause and recommendations"
        data={failureAnalysisRows}
        rowKey="failureId"
        pageSize={6}
        searchKeys={[
          "failureId",
          "patternId",
          "lotId",
          "waferId",
          "dieId",
          "faultCategory",
          "rootCause",
          "status",
          "recommendation",
        ]}
        searchPlaceholder="Search failures..."
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            className="h-9 rounded-xl border-[#2D3748] text-xs hover:border-[#7C3AED]"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export
          </Button>
        }
        columns={[
          {
            key: "failureId",
            label: "Failure ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">{row.failureId}</span>
            ),
          },
          { key: "patternId", label: "Pattern ID" },
          { key: "lotId", label: "Lot ID" },
          { key: "waferId", label: "Wafer ID" },
          { key: "dieId", label: "Die ID" },
          { key: "faultCategory", label: "Fault Category" },
          { key: "rootCause", label: "Root Cause" },
          {
            key: "confidence",
            label: "Confidence",
            render: (row) => `${row.confidence}%`,
          },
          {
            key: "severity",
            label: "Severity",
            render: (row) => {
              const variant =
                row.severity === "Critical"
                  ? "danger"
                  : row.severity === "High"
                    ? "warning"
                    : row.severity === "Medium"
                      ? "info"
                      : "success";
              return <StatusBadge status={row.severity} variant={variant} />;
            },
          },
          {
            key: "status",
            label: "Status",
            render: (row) => {
              const variant =
                row.status === "Escalated"
                  ? "danger"
                  : row.status === "Investigating"
                    ? "warning"
                    : row.status === "Resolved"
                      ? "success"
                      : "neutral";
              return <StatusBadge status={row.status} variant={variant} />;
            },
          },
          { key: "recommendation", label: "Recommendation" },
          { key: "timestamp", label: "Timestamp" },
        ]}
      />
    </div>
  );
}
