"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIDiagnosisCard } from "@/components/scan-chain/AIDiagnosisCard";
import { HorizontalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { DonutChart, DistributionPie } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import {
  DataTable,
  StatusBadge,
} from "@/components/scan-chain/DataTable";
import { KPIGrid } from "@/components/scan-chain/KPICard";
import { ScanChainHeatmap } from "@/components/scan-chain/ScanChainHeatmap";
import {
  aiDiagnosisSummary,
  chainHealthData,
  failingChainsData,
  failureDistribution,
  overviewKPIs,
  topFailingChips,
} from "@/lib/scanChainData";

export function OverviewTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={overviewKPIs} />

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          title="Scan Chain Health Summary"
          subtitle="Distribution by health status"
          className="lg:col-span-1"
        >
          <DonutChart
            data={chainHealthData}
            centerLabel="Total Chains"
            centerValue="2,933"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            {chainHealthData.map((seg) => (
              <div key={seg.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                {seg.name}: {seg.value}
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Top Failing Chips"
          subtitle="Top 10 chips by fail count"
          className="lg:col-span-2"
        >
          <HorizontalBarChart data={topFailingChips} />
        </ChartCard>
      </div>

      <ScanChainHeatmap />

      <DataTable
        title="Recent Failing Scan Chains"
        subtitle="Latest scan chain failures requiring attention"
        data={failingChainsData}
        rowKey="chainId"
        searchKeys={["chainId", "patternId", "chip", "failType", "rootCause"]}
        searchPlaceholder="Search chains..."
        pageSize={5}
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
          { key: "patternId", label: "Pattern ID" },
          { key: "chip", label: "Chip" },
          { key: "failCycle", label: "Fail Cycle" },
          { key: "failType", label: "Fail Type" },
          { key: "rootCause", label: "Suspected Root Cause" },
          {
            key: "diagnosisStatus",
            label: "Diagnosis Status",
            render: (row) => {
              const variant =
                row.diagnosisStatus === "Complete"
                  ? "success"
                  : row.diagnosisStatus === "In Progress"
                    ? "info"
                    : row.diagnosisStatus === "Escalated"
                      ? "danger"
                      : "warning";
              return <StatusBadge status={row.diagnosisStatus} variant={variant} />;
            },
          },
          {
            key: "action",
            label: "Action",
            sortable: false,
            render: () => (
              <Button variant="ghost" size="sm" className="h-7 text-xs text-[#7C3AED]">
                <Eye className="mr-1 h-3 w-3" />
                View
              </Button>
            ),
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Failure Distribution" subtitle="Breakdown by failure type">
          <DistributionPie data={failureDistribution} />
        </ChartCard>

        <AIDiagnosisCard data={aiDiagnosisSummary} />
      </div>
    </div>
  );
}
