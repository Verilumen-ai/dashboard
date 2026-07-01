"use client";

import { AgentWorkflowDiagram } from "@/components/recommendation/AgentWorkflowDiagram";
import { DonutChart } from "@/components/scan-chain/charts/PieCharts";
import { TrendLineChart } from "@/components/scan-chain/charts/LineCharts";
import { ChartCard } from "@/components/scan-chain/ChartCard";
import { ChainFailureRankingChart } from "@/components/scan-chain/diagnosis/ChainFailureRankingChart";
import { ScanDiagnosisActionBar } from "@/components/scan-chain/diagnosis/ScanDiagnosisActionBar";
import { ScanDiagnosisSectionedGrid } from "@/components/scan-chain/diagnosis/ScanDiagnosisSectionedGrid";
import {
  chainFailureRanking,
  diagnosisConfidenceTrend30Day,
  failureLocalizationDistribution,
  scanDiagnosisKPISections,
  scanDiagnosisWorkflowSteps,
} from "@/lib/scanChainData";

export function ScanDiagnosisTab() {
  return (
    <div className="dashboard-content">
      <ScanDiagnosisSectionedGrid sections={scanDiagnosisKPISections} />

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Failure Localization Distribution" subtitle="By fault category">
          <DonutChart
            data={failureLocalizationDistribution}
            centerLabel="Faults"
            centerValue={failureLocalizationDistribution.reduce((s, d) => s + d.value, 0)}
          />
        </ChartCard>
        <ChartCard title="Chain Failure Ranking" subtitle="Top 10 failing scan chains">
          <ChainFailureRankingChart data={chainFailureRanking} />
        </ChartCard>
        <ChartCard title="Diagnosis Confidence Trend" subtitle="Last 30 days">
          <TrendLineChart
            data={diagnosisConfidenceTrend30Day}
            lines={[{ key: "value", color: "#22C55E", name: "Confidence %" }]}
          />
        </ChartCard>
      </div>

      <AgentWorkflowDiagram
        steps={scanDiagnosisWorkflowSteps}
        title="Scan Diagnosis Workflow"
        subtitle="From failure logs through engineer validation"
      />

      <ScanDiagnosisActionBar />
    </div>
  );
}
