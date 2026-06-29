import { generateGridHeatmap } from "@/lib/heatmapUtils";
import type {
  AIExecutiveSummary,
  BottomAISummary,
  HealthSegment,
  LbistRecRow,
  MbistRecRow,
  RecKPI,
  ScanChainRecRow,
  TrendPoint,
  UnifiedRecommendationRow,
  WaferRecRow,
} from "@/types/recommendation";

export const overviewKPIs: RecKPI[] = [
  { id: "total", title: "Total Recommendations", value: "186", change: 12.4, trend: "up", sparkline: [142, 152, 158, 165, 172, 180, 186], icon: "sparkles", positiveIsGood: true },
  { id: "critical", title: "Critical Recommendations", value: "24", change: -8.2, trend: "down", sparkline: [32, 30, 28, 27, 26, 25, 24], icon: "alert-octagon", positiveIsGood: false },
  { id: "high", title: "High Priority", value: "48", change: 4.8, trend: "up", sparkline: [38, 40, 42, 44, 45, 47, 48], icon: "alert-triangle", positiveIsGood: true },
  { id: "medium", title: "Medium Priority", value: "72", change: 6.2, trend: "up", sparkline: [58, 60, 62, 65, 68, 70, 72], icon: "minus-circle", positiveIsGood: true },
  { id: "yield", title: "Estimated Yield Improvement", value: "+5.8%", change: 1.4, trend: "up", sparkline: [3.2, 3.8, 4.2, 4.8, 5.2, 5.5, 5.8], icon: "trending-up", positiveIsGood: true },
  { id: "cost", title: "Estimated Cost Savings", value: "$428K", change: 8.6, trend: "up", sparkline: [320, 340, 360, 380, 400, 415, 428], icon: "dollar", positiveIsGood: true },
];

export const scanChainKPIs: RecKPI[] = [
  { id: "total", title: "Total Scan Recommendations", value: "52", change: 8.4, trend: "up", sparkline: [38, 42, 44, 46, 48, 50, 52], icon: "link", positiveIsGood: true },
  { id: "critical", title: "Critical Scan Chains", value: "12", change: -10.2, trend: "down", sparkline: [18, 16, 15, 14, 13, 12, 12], icon: "alert-octagon", positiveIsGood: false },
  { id: "compression", title: "Compression Optimization", value: "18", change: 14.2, trend: "up", sparkline: [10, 12, 13, 14, 15, 17, 18], icon: "minimize-2", positiveIsGood: true },
  { id: "diagnosis", title: "Diagnosis Accuracy", value: "92.4%", change: 2.1, trend: "up", sparkline: [88, 89, 90, 91, 91.5, 92, 92.4], icon: "crosshair", positiveIsGood: true },
  { id: "coverage", title: "Coverage Improvement", value: "+2.8%", change: 2.8, trend: "up", sparkline: [0.8, 1.2, 1.6, 2, 2.2, 2.5, 2.8], icon: "target", positiveIsGood: true },
  { id: "yield", title: "Expected Yield Gain", value: "+1.6%", change: 0.8, trend: "up", sparkline: [0.6, 0.8, 1, 1.2, 1.3, 1.5, 1.6], icon: "trending-up", positiveIsGood: true },
];

export const mbistKPIs: RecKPI[] = [
  { id: "total", title: "Memory Recommendations", value: "44", change: 6.8, trend: "up", sparkline: [32, 34, 36, 38, 40, 42, 44], icon: "memory", positiveIsGood: true },
  { id: "repair", title: "Repair Candidates", value: "18", change: -4.2, trend: "down", sparkline: [24, 22, 21, 20, 19, 18, 18], icon: "wrench", positiveIsGood: false },
  { id: "health", title: "Memory Health", value: "94.2%", change: 1.2, trend: "up", sparkline: [91, 92, 92.5, 93, 93.5, 94, 94.2], icon: "heart", positiveIsGood: true },
  { id: "repair-success", title: "Repair Success", value: "82.6%", change: 4.1, trend: "up", sparkline: [74, 76, 78, 79, 80, 81.5, 82.6], icon: "check-circle", positiveIsGood: true },
  { id: "coverage", title: "Coverage", value: "97.4%", change: 0.9, trend: "up", sparkline: [95, 95.5, 96, 96.5, 97, 97.2, 97.4], icon: "shield", positiveIsGood: true },
  { id: "runtime", title: "Runtime Improvement", value: "-6.2s", change: -6.2, trend: "down", sparkline: [-2, -3, -3.5, -4.5, -5, -5.8, -6.2], icon: "timer", positiveIsGood: false },
];

export const lbistKPIs: RecKPI[] = [
  { id: "total", title: "Logic Recommendations", value: "38", change: 9.2, trend: "up", sparkline: [28, 30, 32, 33, 35, 36, 38], icon: "binary", positiveIsGood: true },
  { id: "coverage", title: "Coverage Improvement", value: "+3.2%", change: 3.2, trend: "up", sparkline: [1, 1.5, 2, 2.4, 2.8, 3, 3.2], icon: "target", positiveIsGood: true },
  { id: "repair", title: "Logic Repair", value: "14", change: 5.4, trend: "up", sparkline: [10, 11, 11.5, 12, 13, 13.5, 14], icon: "wrench", positiveIsGood: true },
  { id: "signature", title: "Signature Accuracy", value: "94.8%", change: 2.1, trend: "up", sparkline: [90, 91, 92, 93, 94, 94.5, 94.8], icon: "fingerprint", positiveIsGood: true },
  { id: "health", title: "Logic Health", value: "93.6%", change: 1.8, trend: "up", sparkline: [89, 90, 91, 92, 92.5, 93, 93.6], icon: "activity", positiveIsGood: true },
  { id: "runtime", title: "Runtime Reduction", value: "-4.8s", change: -4.8, trend: "down", sparkline: [-1.5, -2, -2.8, -3.2, -4, -4.5, -4.8], icon: "timer", positiveIsGood: false },
];

export const waferKPIs: RecKPI[] = [
  { id: "total", title: "Wafer Recommendations", value: "52", change: 7.4, trend: "up", sparkline: [38, 42, 44, 46, 48, 50, 52], icon: "microscope", positiveIsGood: true },
  { id: "critical", title: "Critical Wafers", value: "8", change: -12.5, trend: "down", sparkline: [14, 12, 11, 10, 9, 8, 8], icon: "alert-octagon", positiveIsGood: false },
  { id: "yield", title: "Yield Improvement", value: "+2.4%", change: 1.2, trend: "up", sparkline: [0.8, 1, 1.2, 1.6, 1.8, 2.1, 2.4], icon: "trending-up", positiveIsGood: true },
  { id: "defect", title: "Defect Density", value: "-18%", change: -18, trend: "down", sparkline: [-8, -10, -12, -14, -15, -16, -18], icon: "scan", positiveIsGood: false },
  { id: "hotspot", title: "Hotspot Detection", value: "16", change: 4.2, trend: "up", sparkline: [10, 11, 12, 13, 14, 15, 16], icon: "flame", positiveIsGood: true },
  { id: "confidence", title: "AI Confidence", value: "91.2%", change: 2.4, trend: "up", sparkline: [86, 87.5, 88.5, 89.5, 90, 90.8, 91.2], icon: "brain", positiveIsGood: true },
];

export const sourceDistribution: HealthSegment[] = [
  { name: "Scan Chain", value: 52, color: "#7C3AED" },
  { name: "MBIST", value: 44, color: "#06B6D4" },
  { name: "LBIST", value: 38, color: "#F97316" },
  { name: "Wafer", value: 52, color: "#22C55E" },
];

export const priorityDistribution: TrendPoint[] = [
  { label: "Critical", value: 24 },
  { label: "High", value: 48 },
  { label: "Medium", value: 72 },
  { label: "Low", value: 42 },
];

export const recommendationTrend: TrendPoint[] = [
  { label: "Day 1", value: 142 }, { label: "Day 5", value: 148 }, { label: "Day 10", value: 155 },
  { label: "Day 15", value: 162 }, { label: "Day 20", value: 172 }, { label: "Day 25", value: 178 }, { label: "Day 30", value: 186 },
];

export const unifiedRecommendations: UnifiedRecommendationRow[] = [
  { id: "REC-001", sourceModule: "Scan Chain", category: "Pattern Optimization", priority: "Critical", confidence: 94, estimatedImpact: "+1.2% yield", status: "In Review", assignedEngineer: "Alex J." },
  { id: "REC-002", sourceModule: "MBIST", category: "Memory Repair", priority: "High", confidence: 91, estimatedImpact: "$42K savings", status: "Approved", assignedEngineer: "Sarah M." },
  { id: "REC-003", sourceModule: "LBIST", category: "Logic Optimization", priority: "High", confidence: 88, estimatedImpact: "+0.8% coverage", status: "Pending", assignedEngineer: "David K." },
  { id: "REC-004", sourceModule: "Wafer", category: "Yield Improvement", priority: "Critical", confidence: 92, estimatedImpact: "+2.1% yield", status: "In Review", assignedEngineer: "Alex J." },
  { id: "REC-005", sourceModule: "Scan Chain", category: "Scan Compression", priority: "Medium", confidence: 86, estimatedImpact: "-8.4s test time", status: "Implemented", assignedEngineer: "Priya R." },
  { id: "REC-006", sourceModule: "MBIST", category: "Memory Redundancy", priority: "Medium", confidence: 84, estimatedImpact: "+0.6% yield", status: "Pending", assignedEngineer: "Sarah M." },
  { id: "REC-007", sourceModule: "Wafer", category: "Wafer Retest", priority: "Low", confidence: 78, estimatedImpact: "+0.4% yield", status: "Approved", assignedEngineer: "David K." },
  { id: "REC-008", sourceModule: "LBIST", category: "Coverage Enhancement", priority: "High", confidence: 89, estimatedImpact: "+1.4% coverage", status: "In Review", assignedEngineer: "Priya R." },
];

export const aiExecutiveSummary: AIExecutiveSummary = {
  topProblems: [
    "Critical scan chain failures in Core-CPU-0 cluster",
    "Memory repair backlog in SRAM Bank-0",
    "LBIST coverage gap in GPU shader pipeline",
    "Wafer yield hotspot in Lot W-2847 edge dies",
  ],
  overallRiskScore: "6.4 / 10",
  expectedYieldGain: "+5.8%",
  expectedCostReduction: "$428K / month",
  expectedTestTimeReduction: "-18.6s / lot",
};

export const scanChainRecommendations: ScanChainRecRow[] = [
  { id: "SC-REC-001", scanChain: "SC-004821", pattern: "PAT-STUCK-042", recommendation: "Compress pattern segments 3-5", priority: "Critical", confidence: 94, expectedResult: "-6.2s runtime" },
  { id: "SC-REC-002", scanChain: "SC-003156", pattern: "PAT-TRANS-118", recommendation: "Add hold-time margin pattern", priority: "High", confidence: 88, expectedResult: "+1.2% yield" },
  { id: "SC-REC-003", scanChain: "SC-007892", pattern: "PAT-BRIDGE-007", recommendation: "Replace with PAT-STUCK-089", priority: "High", confidence: 91, expectedResult: "$18K savings" },
  { id: "SC-REC-004", scanChain: "SC-002441", pattern: "PAT-TIMING-056", recommendation: "Optimize scan ordering", priority: "Medium", confidence: 82, expectedResult: "-3.4s runtime" },
];

export const mbistRecommendations: MbistRecRow[] = [
  { id: "MB-REC-001", memory: "MEM-004821", bank: "Bank-0", recommendation: "Repair address decoder segment", priority: "Critical", confidence: 91, expectedYield: "+0.8%" },
  { id: "MB-REC-002", memory: "MEM-007892", bank: "Bank-1", recommendation: "FIB bit-line isolation", priority: "High", confidence: 88, expectedYield: "+0.6%" },
  { id: "MB-REC-003", memory: "MEM-003156", bank: "Bank-2", recommendation: "Allocate spare row redundancy", priority: "High", confidence: 86, expectedYield: "+0.5%" },
  { id: "MB-REC-004", memory: "MEM-002441", bank: "Bank-4", recommendation: "Adjust refresh timing", priority: "Medium", confidence: 79, expectedYield: "+0.3%" },
];

export const lbistRecommendations: LbistRecRow[] = [
  { id: "LB-REC-001", logicBlock: "LB-GPU-118", recommendation: "Add transition margin pattern", priority: "Critical", confidence: 91, coverageGain: "+1.8%" },
  { id: "LB-REC-002", logicBlock: "LB-NOC-007", recommendation: "Extend LBIST coverage for NOC cluster", priority: "High", confidence: 88, coverageGain: "+1.2%" },
  { id: "LB-REC-003", logicBlock: "LB-CPU-042", recommendation: "Optimize MISR compression sequence", priority: "Medium", confidence: 82, coverageGain: "+0.6%" },
  { id: "LB-REC-004", logicBlock: "LB-DSP-089", recommendation: "Apply delay fault screening", priority: "Medium", confidence: 76, coverageGain: "+0.4%" },
];

export const waferRecommendations: WaferRecRow[] = [
  { id: "WF-REC-001", lotId: "LOT-2847", waferId: "W-12", recommendation: "Retest edge die cluster", priority: "Critical", confidence: 92, expectedYield: "+2.1%" },
  { id: "WF-REC-002", lotId: "LOT-2847", waferId: "W-08", recommendation: "Bin optimization for zone 3", priority: "High", confidence: 86, expectedYield: "+1.4%" },
  { id: "WF-REC-003", lotId: "LOT-2912", waferId: "W-04", recommendation: "Defect hotspot isolation", priority: "High", confidence: 84, expectedYield: "+0.9%" },
  { id: "WF-REC-004", lotId: "LOT-2912", waferId: "W-16", recommendation: "Spatial yield recovery pattern", priority: "Medium", confidence: 78, expectedYield: "+0.5%" },
];

export const bottomAISummary: BottomAISummary = {
  estimatedSavings: "$428K / month",
  yieldImprovement: "+5.8%",
  testTimeReduction: "-18.6s / lot",
  memoryRepairSuccess: "82.6%",
  logicCoverageIncrease: "+3.2%",
  patternReduction: "14 patterns",
  waferYieldIncrease: "+2.4%",
  totalRoi: "+24.8%",
};

export const scanFailureTrend: TrendPoint[] = [
  { label: "Mon", value: 48, value2: 12 }, { label: "Tue", value: 44, value2: 11 },
  { label: "Wed", value: 42, value2: 10 }, { label: "Thu", value: 38, value2: 9 },
  { label: "Fri", value: 36, value2: 8 }, { label: "Sat", value: 34, value2: 8 }, { label: "Sun", value: 32, value2: 7 },
];

export const chainHealthTrend: TrendPoint[] = [
  { label: "Healthy", value: 82 }, { label: "Warning", value: 12 }, { label: "Failing", value: 6 },
];

export const memoryFailureTrend: TrendPoint[] = [
  { label: "Mon", value: 28 }, { label: "Tue", value: 26 }, { label: "Wed", value: 24 },
  { label: "Thu", value: 22 }, { label: "Fri", value: 20 }, { label: "Sat", value: 19 }, { label: "Sun", value: 18 },
];

export const coverageTrendLbist: TrendPoint[] = [
  { label: "Mon", value: 93 }, { label: "Tue", value: 93.8 }, { label: "Wed", value: 94.2 },
  { label: "Thu", value: 94.8 }, { label: "Fri", value: 95.2 }, { label: "Sat", value: 95.6 }, { label: "Sun", value: 96.2 },
];

export const waferYieldTrend: TrendPoint[] = [
  { label: "Mon", value: 91.2 }, { label: "Tue", value: 91.8 }, { label: "Wed", value: 92.4 },
  { label: "Thu", value: 93 }, { label: "Fri", value: 93.6 }, { label: "Sat", value: 94 }, { label: "Sun", value: 94.2 },
];

export function generateWaferRecHeatmap(rows = 12, cols = 16): { value: number; row: number; col: number }[] {
  return generateGridHeatmap(rows, cols, 0.5, 0.5);
}

export const workflowSteps = [
  "Detected Issue",
  "AI Root Cause Analysis",
  "Recommendation Generated",
  "Engineer Review",
  "Approved",
  "Implemented",
  "Result Validation",
];
