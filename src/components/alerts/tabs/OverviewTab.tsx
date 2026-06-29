"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerticalBarChart } from "@/components/scan-chain/charts/BarCharts";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { DonutChart } from "@/components/scan-chain/charts/PieCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { DataTable } from "@/components/scan-chain/DataTable";
import { AlertStatusBadge, ModuleBadge, SeverityBadge } from "@/components/alerts/Badges";
import { AlertWorkflowPanel, CriticalAlertSummaryCard, ExecutiveAlertSummaryPanel } from "@/components/alerts/AlertPanels";
import { KPIGrid } from "@/components/alerts/KPICard";
import {
  alertDistribution,
  alertTrend,
  criticalAlertSummary,
  executiveAlertSummary,
  overviewKPIs,
  recentAlerts,
  severityDistribution,
} from "@/lib/alertsData";

export function OverviewTab() {
  return (
    <div className="dashboard-content">
      <KPIGrid data={overviewKPIs} />
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Alert Distribution" subtitle="By source module" className="lg:col-span-1">
          <DonutChart data={alertDistribution} centerLabel="Total" centerValue="248" />
          <div className="mt-4 flex flex-wrap gap-3">
            {alertDistribution.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name}: {s.value}%
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Alert Severity" subtitle="By severity level" className="lg:col-span-1">
          <VerticalBarChart data={severityDistribution} color="#EF4444" />
        </ChartCard>
        <ChartCard title="Alert Trend" subtitle="Last 30 days" className="lg:col-span-1">
          <TrendLineChart data={alertTrend} lines={[{ key: "value", color: "#7C3AED", name: "Alerts" }]} />
        </ChartCard>
      </div>
      <DataTable
        title="Recent Alerts"
        subtitle="Real-time alerts consolidated from all analysis modules"
        data={recentAlerts}
        rowKey="id"
        searchKeys={["id", "sourceModule", "lotId", "waferId", "description", "assignedEngineer"]}
        searchPlaceholder="Search alerts, lots, wafers..."
        pageSize={5}
        columns={[
          { key: "id", label: "Alert ID", render: (row) => <span className="font-mono text-xs text-white">{row.id}</span> },
          { key: "sourceModule", label: "Source Module", render: (row) => <ModuleBadge module={row.sourceModule} /> },
          { key: "lotId", label: "Lot ID" },
          { key: "waferId", label: "Wafer ID" },
          { key: "severity", label: "Severity", render: (row) => <SeverityBadge severity={row.severity} /> },
          { key: "description", label: "Description" },
          { key: "status", label: "Status", render: (row) => <AlertStatusBadge status={row.status} /> },
          { key: "assignedEngineer", label: "Assigned Engineer" },
          { key: "createdTime", label: "Created Time" },
          { key: "action", label: "Action", sortable: false, render: () => <Button variant="ghost" size="sm" className="h-7 text-xs text-[#7C3AED]">View<ArrowUpRight className="ml-1 h-3 w-3" /></Button> },
        ]}
      />
      <CriticalAlertSummaryCard data={criticalAlertSummary} />
      <AlertWorkflowPanel />
      <ExecutiveAlertSummaryPanel data={executiveAlertSummary} />
    </div>
  );
}
