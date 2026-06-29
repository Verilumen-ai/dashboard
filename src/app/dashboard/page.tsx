"use client";

import { useState } from "react";
import { ExecutiveKPIGrid } from "@/components/cards/ExecutiveCard";
import { CostTrendChart } from "@/components/charts/CostTrendChart";
import { WaferHeatmap } from "@/components/charts/WaferHeatmap";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OptimizationEngine } from "@/components/optimization/OptimizationEngine";
import { OptimizationResult } from "@/components/results/OptimizationResult";
import { PatternTable } from "@/components/tables/PatternTable";
import {
  costTrendData,
  defaultOptimizationResults,
  executiveKPIs,
  patternAnalysisData,
} from "@/lib/dummyData";
import type { OptimizationParams, OptimizationResults } from "@/types/dashboard";

export default function DashboardPage() {
  const [results, setResults] = useState<OptimizationResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunOptimization = async (_params: OptimizationParams) => {
    setIsRunning(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 1800));
    setResults(defaultOptimizationResults);
    setIsRunning(false);
  };

  return (
    <DashboardLayout title="Executive Dashboard">
      <div className="dashboard-content">
        <div id="scan-chain">
          <ExecutiveKPIGrid data={executiveKPIs} />
        </div>

        <WaferHeatmap />

        <div className="grid gap-6 lg:grid-cols-2">
          <CostTrendChart data={costTrendData} />
          <div id="mbist">
            <PatternTable data={patternAnalysisData} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div id="lbist">
            <OptimizationEngine onRun={handleRunOptimization} isRunning={isRunning} />
          </div>
          <div id="alerts">
            <OptimizationResult results={results} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
