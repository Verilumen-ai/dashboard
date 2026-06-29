"use client";

import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable } from "@/components/scan-chain/DataTable";
import { KPIGrid } from "@/components/cost-intelligence/KPICard";
import { patternCostTrend, scanChainCostRows, scanChainKPIs } from "@/lib/costIntelligenceData";

export function ScanChainCostTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={scanChainKPIs} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Pattern Cost Trend" subtitle="Weekly pattern execution cost ($K)">
          <TrendLineChart data={patternCostTrend} lines={[{ key: "value", color: "#7C3AED", name: "Pattern Cost" }]} />
        </ChartCard>
        <ChartCard title="Cost Per Pattern" subtitle="Top pattern costs ($K)">
          <VerticalBarChart data={[{ label: "PAT-042", value: 12.4 }, { label: "PAT-118", value: 10.8 }, { label: "PAT-007", value: 9.6 }, { label: "PAT-056", value: 7.2 }]} color="#7C3AED" />
        </ChartCard>
        <ChartCard title="Top Expensive Scan Chains" subtitle="Cost by scan chain ($K)">
          <VerticalBarChart data={[{ label: "SC-4821", value: 18.2 }, { label: "SC-3156", value: 14.6 }, { label: "SC-7892", value: 12.8 }, { label: "SC-2441", value: 9.4 }]} color="#F97316" />
        </ChartCard>
        <ChartCard title="Pattern Runtime" subtitle="Execution time cost impact (min)">
          <VerticalBarChart data={[{ label: "PAT-042", value: 42 }, { label: "PAT-118", value: 38 }, { label: "PAT-007", value: 35 }, { label: "PAT-056", value: 28 }]} color="#06B6D4" />
        </ChartCard>
      </div>
      <DataTable
        title="Scan Chain Cost Table"
        subtitle="Pattern execution costs and optimization recommendations"
        data={scanChainCostRows}
        rowKey="patternId"
        searchKeys={["patternId", "scanChain", "recommendation"]}
        searchPlaceholder="Search patterns, scan chains..."
        columns={[
          { key: "patternId", label: "Pattern ID", render: (row) => <span className="font-mono text-xs text-white">{row.patternId}</span> },
          { key: "scanChain", label: "Scan Chain" },
          { key: "executionTime", label: "Execution Time" },
          { key: "cost", label: "Cost" },
          { key: "recommendation", label: "Recommendation" },
          { key: "expectedSavings", label: "Expected Savings", render: (row) => <span className="text-emerald-400">{row.expectedSavings}</span> },
        ]}
      />
    </div>
  );
}
