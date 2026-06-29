"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable } from "@/components/scan-chain/DataTable";
import { PriorityBadge } from "@/components/recommendation/Badges";
import { KPIGrid } from "@/components/recommendation/KPICard";
import { CoverageHeatmapMini } from "@/components/recommendation/WaferRecHeatmap";
import { coverageTrendLbist, lbistKPIs, lbistRecommendations } from "@/lib/recommendationData";

export function LbistTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={lbistKPIs} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Coverage Trend" subtitle="LBIST coverage over time">
          <TrendLineChart data={coverageTrendLbist} lines={[{ key: "value", color: "#7C3AED", name: "Coverage %" }]} />
        </ChartCard>
        <ChartCard title="Logic Failure" subtitle="Failures by logic block">
          <VerticalBarChart data={[{ label: "LB-GPU", value: 18 }, { label: "LB-NOC", value: 12 }, { label: "LB-CPU", value: 14 }, { label: "LB-DSP", value: 8 }]} color="#EF4444" />
        </ChartCard>
        <ChartCard title="Coverage Heatmap" subtitle="Logic block coverage grid">
          <CoverageHeatmapMini />
        </ChartCard>
        <ChartCard title="Signature Analysis" subtitle="MISR signature match rate">
          <VerticalBarChart data={[{ label: "GPU", value: 92 }, { label: "NOC", value: 88 }, { label: "CPU", value: 96 }, { label: "DSP", value: 90 }]} color="#F97316" />
        </ChartCard>
      </div>
      <DataTable
        title="LBIST Recommendations"
        subtitle="Logic optimization, coverage enhancement, and signature analysis"
        data={lbistRecommendations}
        rowKey="id"
        searchKeys={["id", "logicBlock", "recommendation"]}
        searchPlaceholder="Search LBIST recommendations..."
        columns={[
          { key: "id", label: "Recommendation ID", render: (row) => <span className="font-mono text-xs text-white">{row.id}</span> },
          { key: "logicBlock", label: "Logic Block" },
          { key: "recommendation", label: "Recommendation" },
          { key: "priority", label: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
          { key: "confidence", label: "Confidence", render: (row) => `${row.confidence}%` },
          { key: "coverageGain", label: "Coverage Gain" },
          { key: "action", label: "Action", sortable: false, render: () => <Button variant="ghost" size="sm" className="h-7 text-xs text-[#7C3AED]">Apply<ArrowUpRight className="ml-1 h-3 w-3" /></Button> },
        ]}
      />
    </div>
  );
}
