"use client";

import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { DistributionPie } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable, StatusBadge } from "@/components/scan-chain/DataTable";
import { PatternKPIGrid } from "@/components/scan-chain/pattern/PatternKPIGrid";
import { PatternScatterChart } from "@/components/scan-chain/pattern/PatternScatterChart";
import {
  patternAnalysisCoverageTrend,
  patternAnalysisKPIs,
  patternAnalysisRows,
  patternClusterDistribution,
  patternImportTrend,
  patternScatterData,
} from "@/lib/scanChainData";

export function PatternAnalysisTab() {
  return (
    <div className="dashboard-content">
      <PatternKPIGrid data={patternAnalysisKPIs} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Pattern Import Trend" subtitle="Weekly imported vs. validated files">
          <TrendLineChart
            data={patternImportTrend}
            lines={[
              { key: "value", color: "#7C3AED", name: "Imported" },
              { key: "value2", color: "#06B6D4", name: "Validated" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Pattern Coverage Trend" subtitle="ATPG fault coverage over time">
          <TrendLineChart
            data={patternAnalysisCoverageTrend}
            lines={[{ key: "value", color: "#22C55E", name: "Coverage %" }]}
          />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Pattern Cluster Distribution" subtitle="AI cluster classification">
          <DistributionPie data={patternClusterDistribution} />
        </ChartCard>
        <ChartCard title="Pattern Similarity" subtitle="Coverage vs. similarity score by cluster">
          <PatternScatterChart data={patternScatterData} />
        </ChartCard>
      </div>

      <DataTable
        title="Pattern Analysis Table"
        subtitle="Imported patterns with coverage, clustering, and AI quality scores"
        data={patternAnalysisRows}
        rowKey="patternId"
        pageSize={6}
        searchKeys={["patternId", "patternName", "fileType", "cluster", "status", "recommendation"]}
        searchPlaceholder="Search patterns..."
        columns={[
          {
            key: "patternId",
            label: "Pattern ID",
            render: (row) => (
              <span className="font-mono text-xs font-medium text-white">{row.patternId}</span>
            ),
          },
          { key: "patternName", label: "Pattern Name" },
          { key: "fileType", label: "File Type" },
          { key: "coverage", label: "Coverage", render: (row) => `${row.coverage}%` },
          { key: "compressionRatio", label: "Compression", render: (row) => row.compressionRatio.toFixed(2) },
          { key: "vectors", label: "Vectors", render: (row) => row.vectors.toLocaleString() },
          { key: "cluster", label: "Cluster" },
          { key: "similarityScore", label: "Similarity", render: (row) => row.similarityScore.toFixed(2) },
          { key: "redundancy", label: "Redundancy" },
          { key: "qualityScore", label: "Quality", render: (row) => `${row.qualityScore}%` },
          {
            key: "status",
            label: "Status",
            render: (row) => {
              const variant =
                row.status === "Active"
                  ? "success"
                  : row.status === "Review"
                    ? "warning"
                    : row.status === "Redundant"
                      ? "danger"
                      : "neutral";
              return <StatusBadge status={row.status} variant={variant} />;
            },
          },
          { key: "recommendation", label: "Recommendation" },
        ]}
      />
    </div>
  );
}
