import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type ScanChainTab =
  | "overview"
  | "pattern-analysis"
  | "failure-analysis"
  | "scan-diagnosis";

export interface ScanKPI {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  sparkline: number[];
  icon: string;
  positiveIsGood?: boolean;
}

export interface HealthSegment {
  name: string;
  value: number;
  color: string;
}

export interface ChipFailData {
  chip: string;
  failCount: number;
}

export interface FailingChainRow {
  chainId: string;
  patternId: string;
  chip: string;
  failCycle: number;
  failType: string;
  rootCause: string;
  diagnosisStatus: "Pending" | "In Progress" | "Complete" | "Escalated";
}

export interface FailureDistribution {
  name: string;
  value: number;
  color: string;
}

export interface AIDiagnosisSummary {
  detectedRootCause: string;
  criticalChains: number;
  recommendedDebugArea: string;
  estimatedRepairSuccess: number;
  confidenceScore: number;
}

export interface TrendPoint {
  label: string;
  value: number;
  value2?: number;
}

export interface PatternSummaryRow {
  patternId: string;
  chainCount: number;
  coverage: number;
  runtime: number;
  efficiency: number;
  status: "Active" | "Inactive" | "Deprecated";
}

export interface PatternRecommendationRow {
  patternId: string;
  issue: string;
  recommendation: string;
  priority: "High" | "Medium" | "Low";
}

export interface FailureRecordRow {
  failureId: string;
  chainId: string;
  chip: string;
  failType: string;
  severity: "Critical" | "Warning" | "Recovered";
  timestamp: string;
}

export interface RootCauseRow {
  cause: string;
  count: number;
  percentage: number;
  trend: number;
}

export interface AIRecommendationRow {
  id: string;
  chainId: string;
  recommendation: string;
  confidence: number;
  impact: "High" | "Medium" | "Low";
}

export interface DiagnosisReportRow {
  chainId: string;
  status: "Diagnosed" | "Unknown" | "Partial";
  rootCause: string;
  confidence: number;
  repairSuggestion: string;
}

export interface SuspectedCellRow {
  cellId: string;
  chainId: string;
  cellType: string;
  failProbability: number;
  location: string;
}

export interface DebugPointRow {
  pointId: string;
  chainId: string;
  region: string;
  priority: number;
  description: string;
}

export interface RepairPriorityRow {
  chainId: string;
  priority: number;
  failType: string;
  estimatedFixTime: string;
  successRate: number;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
}

export interface KPIIconMap {
  [key: string]: LucideIcon;
}
