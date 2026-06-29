"use client";

import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { DistributionPie } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable } from "@/components/scan-chain/DataTable";
import { KPIGrid } from "@/components/cost-intelligence/KPICard";
import { WaferCostHeatmap } from "@/components/cost-intelligence/WaferCostHeatmap";
import { waferCostRows, waferCostTrend, waferKPIs } from "@/lib/costIntelligenceData";

export function WaferCostTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={waferKPIs} />
      <WaferCostHeatmap />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Yield Cost" subtitle="Yield loss cost trend ($K)">
          <TrendLineChart data={waferCostTrend} lines={[{ key: "value", color: "#22C55E", name: "Wafer Cost" }]} />
        </ChartCard>
        <ChartCard title="Defect Density Cost" subtitle="Cost by defect zone ($K)">
          <VerticalBarChart data={[{ label: "Zone A", value: 12.4 }, { label: "Zone B", value: 18.6 }, { label: "Zone C", value: 14.2 }, { label: "Zone D", value: 22.8 }]} color="#EF4444" />
        </ChartCard>
        <ChartCard title="Wafer Trend" subtitle="Weekly wafer test cost ($K)">
          <TrendLineChart data={waferCostTrend} lines={[{ key: "value", color: "#7C3AED", name: "Cost" }]} />
        </ChartCard>
        <ChartCard title="Yield Distribution" subtitle="Bin cost distribution">
          <DistributionPie data={[{ name: "Bin 1", value: 62, color: "#22C55E" }, { name: "Bin 2", value: 24, color: "#EAB308" }, { name: "Bin 3", value: 14, color: "#EF4444" }]} />
        </ChartCard>
      </div>
      <DataTable
        title="Wafer Cost Table"
        subtitle="Lot and wafer-level costs with recommendations"
        data={waferCostRows}
        rowKey="lot"
        searchKeys={["lot", "wafer", "recommendation"]}
        searchPlaceholder="Search lots, wafers..."
        columns={[
          { key: "lot", label: "Lot" },
          { key: "wafer", label: "Wafer" },
          { key: "yield", label: "Yield" },
          { key: "cost", label: "Cost" },
          { key: "recommendation", label: "Recommendation" },
        ]}
      />
    </div>
  );
}
