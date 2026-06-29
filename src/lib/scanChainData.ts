import type {
  AIDiagnosisSummary,
  AIRecommendationRow,
  ChipFailData,
  DebugPointRow,
  DiagnosisReportRow,
  FailureDistribution,
  FailureRecordRow,
  FailingChainRow,
  HealthSegment,
  PatternRecommendationRow,
  PatternSummaryRow,
  RepairPriorityRow,
  RootCauseRow,
  ScanKPI,
  SuspectedCellRow,
  TrendPoint,
} from "@/types/scanChain";

export const overviewKPIs: ScanKPI[] = [
  {
    id: "total-chains",
    title: "Total Scan Chains",
    value: "2,847",
    change: 2.4,
    trend: "up",
    sparkline: [2650, 2680, 2720, 2750, 2780, 2810, 2847],
    icon: "link",
    positiveIsGood: true,
  },
  {
    id: "failing-chains",
    title: "Failing Scan Chains",
    value: "142",
    change: -8.3,
    trend: "down",
    sparkline: [186, 178, 172, 165, 158, 148, 142],
    icon: "alert-triangle",
    positiveIsGood: false,
  },
  {
    id: "failing-flops",
    title: "Failing Flops",
    value: "3,284",
    change: -5.6,
    trend: "down",
    sparkline: [3800, 3650, 3520, 3450, 3380, 3320, 3284],
    icon: "cpu",
    positiveIsGood: false,
  },
  {
    id: "scan-coverage",
    title: "Scan Coverage",
    value: "96.8%",
    change: 1.2,
    trend: "up",
    sparkline: [94.2, 94.8, 95.2, 95.6, 96.0, 96.4, 96.8],
    icon: "shield-check",
    positiveIsGood: true,
  },
  {
    id: "avg-test-time",
    title: "Average Test Time",
    value: "18.4s",
    change: -3.1,
    trend: "down",
    sparkline: [21, 20.5, 20, 19.5, 19, 18.8, 18.4],
    icon: "timer",
    positiveIsGood: false,
  },
  {
    id: "pattern-count",
    title: "Pattern Count",
    value: "486",
    change: 4.8,
    trend: "up",
    sparkline: [420, 435, 448, 458, 468, 478, 486],
    icon: "layers",
    positiveIsGood: true,
  },
];

export const patternKPIs: ScanKPI[] = [
  {
    id: "total-patterns",
    title: "Total Patterns",
    value: "486",
    change: 4.8,
    trend: "up",
    sparkline: [420, 435, 448, 458, 468, 478, 486],
    icon: "layers",
    positiveIsGood: true,
  },
  {
    id: "active-patterns",
    title: "Active Patterns",
    value: "412",
    change: 2.1,
    trend: "up",
    sparkline: [380, 388, 395, 400, 405, 408, 412],
    icon: "play",
    positiveIsGood: true,
  },
  {
    id: "pattern-coverage",
    title: "Pattern Coverage",
    value: "94.2%",
    change: 1.5,
    trend: "up",
    sparkline: [90, 91, 92, 92.5, 93, 93.8, 94.2],
    icon: "target",
    positiveIsGood: true,
  },
  {
    id: "pattern-efficiency",
    title: "Pattern Efficiency",
    value: "87.6%",
    change: 3.2,
    trend: "up",
    sparkline: [80, 82, 83, 84.5, 85.5, 86.8, 87.6],
    icon: "zap",
    positiveIsGood: true,
  },
  {
    id: "pattern-runtime",
    title: "Pattern Runtime",
    value: "42.6s",
    change: -4.2,
    trend: "down",
    sparkline: [48, 47, 46, 45, 44, 43, 42.6],
    icon: "clock",
    positiveIsGood: false,
  },
  {
    id: "compressed-patterns",
    title: "Compressed Patterns",
    value: "128",
    change: 12.4,
    trend: "up",
    sparkline: [90, 98, 105, 112, 118, 124, 128],
    icon: "minimize-2",
    positiveIsGood: true,
  },
];

export const failureKPIs: ScanKPI[] = [
  {
    id: "total-failures",
    title: "Total Failures",
    value: "1,284",
    change: -6.8,
    trend: "down",
    sparkline: [1480, 1420, 1380, 1340, 1310, 1290, 1284],
    icon: "x-circle",
    positiveIsGood: false,
  },
  {
    id: "critical-failures",
    title: "Critical Failures",
    value: "86",
    change: -12.4,
    trend: "down",
    sparkline: [120, 110, 105, 98, 94, 88, 86],
    icon: "alert-octagon",
    positiveIsGood: false,
  },
  {
    id: "warning-failures",
    title: "Warning Failures",
    value: "342",
    change: -4.2,
    trend: "down",
    sparkline: [380, 370, 365, 358, 352, 346, 342],
    icon: "alert-circle",
    positiveIsGood: false,
  },
  {
    id: "recovered-failures",
    title: "Recovered Failures",
    value: "856",
    change: 8.6,
    trend: "up",
    sparkline: [720, 750, 780, 800, 820, 840, 856],
    icon: "check-circle",
    positiveIsGood: true,
  },
  {
    id: "root-causes",
    title: "Root Causes",
    value: "24",
    change: -8.0,
    trend: "down",
    sparkline: [32, 30, 28, 27, 26, 25, 24],
    icon: "git-branch",
    positiveIsGood: false,
  },
  {
    id: "repair-rate",
    title: "Repair Rate",
    value: "78.4%",
    change: 5.2,
    trend: "up",
    sparkline: [68, 70, 72, 74, 75.5, 77, 78.4],
    icon: "wrench",
    positiveIsGood: true,
  },
];

export const diagnosisKPIs: ScanKPI[] = [
  {
    id: "diagnosed-chains",
    title: "Diagnosed Chains",
    value: "2,148",
    change: 6.4,
    trend: "up",
    sparkline: [1900, 1950, 2000, 2040, 2080, 2120, 2148],
    icon: "search-check",
    positiveIsGood: true,
  },
  {
    id: "unknown-chains",
    title: "Unknown Chains",
    value: "124",
    change: -14.2,
    trend: "down",
    sparkline: [168, 158, 148, 142, 136, 128, 124],
    icon: "help-circle",
    positiveIsGood: false,
  },
  {
    id: "repair-suggestions",
    title: "Repair Suggestions",
    value: "342",
    change: 18.6,
    trend: "up",
    sparkline: [240, 260, 280, 300, 315, 330, 342],
    icon: "lightbulb",
    positiveIsGood: true,
  },
  {
    id: "diagnosis-accuracy",
    title: "Diagnosis Accuracy",
    value: "92.6%",
    change: 2.8,
    trend: "up",
    sparkline: [86, 88, 89, 90, 91, 92, 92.6],
    icon: "crosshair",
    positiveIsGood: true,
  },
  {
    id: "coverage",
    title: "Coverage",
    value: "89.4%",
    change: 3.1,
    trend: "up",
    sparkline: [82, 84, 85.5, 86.8, 87.5, 88.5, 89.4],
    icon: "scan",
    positiveIsGood: true,
  },
  {
    id: "confidence",
    title: "Confidence",
    value: "88.2%",
    change: 4.0,
    trend: "up",
    sparkline: [80, 82, 84, 85, 86.5, 87.5, 88.2],
    icon: "gauge",
    positiveIsGood: true,
  },
];

export const chainHealthData: HealthSegment[] = [
  { name: "Healthy", value: 2284, color: "#22C55E" },
  { name: "Warning", value: 421, color: "#EAB308" },
  { name: "Failing", value: 142, color: "#EF4444" },
  { name: "Unknown", value: 86, color: "#64748B" },
];

export const topFailingChips: ChipFailData[] = [
  { chip: "Core-CPU-0", failCount: 48 },
  { chip: "Core-CPU-1", failCount: 42 },
  { chip: "GPU-Cluster-A", failCount: 38 },
  { chip: "Memory-CTRL-2", failCount: 34 },
  { chip: "IO-Hub-North", failCount: 28 },
  { chip: "PCIe-Gen5-0", failCount: 24 },
  { chip: "NOC-Router-3", failCount: 22 },
  { chip: "Cache-L3-Bank4", failCount: 18 },
  { chip: "DSP-Accel-1", failCount: 16 },
  { chip: "Security-Enclave", failCount: 12 },
];

export const failingChainsData: FailingChainRow[] = [
  {
    chainId: "SC-004821",
    patternId: "PAT-STUCK-042",
    chip: "Core-CPU-0",
    failCycle: 1842,
    failType: "Stuck At",
    rootCause: "Clock gating defect",
    diagnosisStatus: "Complete",
  },
  {
    chainId: "SC-003156",
    patternId: "PAT-TRANS-118",
    chip: "GPU-Cluster-A",
    failCycle: 956,
    failType: "Transition",
    rootCause: "Hold time violation",
    diagnosisStatus: "In Progress",
  },
  {
    chainId: "SC-007892",
    patternId: "PAT-BRIDGE-007",
    chip: "Memory-CTRL-2",
    failCycle: 3210,
    failType: "Bridging",
    rootCause: "Metal short M4-M5",
    diagnosisStatus: "Escalated",
  },
  {
    chainId: "SC-002441",
    patternId: "PAT-TIMING-056",
    chip: "IO-Hub-North",
    failCycle: 742,
    failType: "Timing",
    rootCause: "Setup slack failure",
    diagnosisStatus: "Complete",
  },
  {
    chainId: "SC-009103",
    patternId: "PAT-STUCK-089",
    chip: "Core-CPU-1",
    failCycle: 2108,
    failType: "Stuck At",
    rootCause: "Scan cell defect",
    diagnosisStatus: "Pending",
  },
  {
    chainId: "SC-001778",
    patternId: "PAT-TRANS-203",
    chip: "PCIe-Gen5-0",
    failCycle: 428,
    failType: "Transition",
    rootCause: "Unknown",
    diagnosisStatus: "Pending",
  },
  {
    chainId: "SC-005632",
    patternId: "PAT-BRIDGE-014",
    chip: "NOC-Router-3",
    failCycle: 1564,
    failType: "Bridging",
    rootCause: "Via chain break",
    diagnosisStatus: "In Progress",
  },
  {
    chainId: "SC-008214",
    patternId: "PAT-TIMING-091",
    chip: "Cache-L3-Bank4",
    failCycle: 892,
    failType: "Timing",
    rootCause: "Clock skew",
    diagnosisStatus: "Complete",
  },
];

export const failureDistribution: FailureDistribution[] = [
  { name: "Stuck At", value: 42, color: "#7C3AED" },
  { name: "Transition", value: 28, color: "#06B6D4" },
  { name: "Bridging", value: 14, color: "#F97316" },
  { name: "Timing", value: 11, color: "#EAB308" },
  { name: "Unknown", value: 5, color: "#64748B" },
];

export const aiDiagnosisSummary: AIDiagnosisSummary = {
  detectedRootCause: "Clock domain crossing violation in Core-CPU-0 scan segment",
  criticalChains: 12,
  recommendedDebugArea: "Clock gating logic near SC-004821 segment boundary",
  estimatedRepairSuccess: 84,
  confidenceScore: 91,
};

export const patternExecutionTrend: TrendPoint[] = [
  { label: "Mon", value: 420, value2: 380 },
  { label: "Tue", value: 445, value2: 395 },
  { label: "Wed", value: 438, value2: 402 },
  { label: "Thu", value: 462, value2: 418 },
  { label: "Fri", value: 478, value2: 428 },
  { label: "Sat", value: 452, value2: 410 },
  { label: "Sun", value: 486, value2: 442 },
];

export const patternCostTrend: TrendPoint[] = [
  { label: "Mon", value: 1240 },
  { label: "Tue", value: 1180 },
  { label: "Wed", value: 1220 },
  { label: "Thu", value: 1160 },
  { label: "Fri", value: 1140 },
  { label: "Sat", value: 1100 },
  { label: "Sun", value: 1080 },
];

export const patternCoverageTrend: TrendPoint[] = [
  { label: "Mon", value: 90.2 },
  { label: "Tue", value: 91.0 },
  { label: "Wed", value: 91.8 },
  { label: "Thu", value: 92.4 },
  { label: "Fri", value: 93.2 },
  { label: "Sat", value: 93.8 },
  { label: "Sun", value: 94.2 },
];

export const patternDensityData: TrendPoint[] = [
  { label: "Segment A", value: 82 },
  { label: "Segment B", value: 68 },
  { label: "Segment C", value: 94 },
  { label: "Segment D", value: 76 },
  { label: "Segment E", value: 88 },
  { label: "Segment F", value: 72 },
];

export const patternSummaryData: PatternSummaryRow[] = [
  { patternId: "PAT-STUCK-042", chainCount: 48, coverage: 96.2, runtime: 8.4, efficiency: 92, status: "Active" },
  { patternId: "PAT-TRANS-118", chainCount: 36, coverage: 94.8, runtime: 12.6, efficiency: 88, status: "Active" },
  { patternId: "PAT-BRIDGE-007", chainCount: 24, coverage: 91.4, runtime: 18.2, efficiency: 76, status: "Active" },
  { patternId: "PAT-TIMING-056", chainCount: 42, coverage: 93.6, runtime: 14.8, efficiency: 84, status: "Active" },
  { patternId: "PAT-LEGACY-012", chainCount: 18, coverage: 78.2, runtime: 22.4, efficiency: 62, status: "Deprecated" },
  { patternId: "PAT-STUCK-089", chainCount: 32, coverage: 95.0, runtime: 9.2, efficiency: 90, status: "Active" },
];

export const patternRecommendations: PatternRecommendationRow[] = [
  { patternId: "PAT-BRIDGE-007", issue: "High runtime, low efficiency", recommendation: "Compress pattern segments 3-5", priority: "High" },
  { patternId: "PAT-LEGACY-012", issue: "Deprecated, low coverage", recommendation: "Replace with PAT-STUCK-089", priority: "High" },
  { patternId: "PAT-TRANS-118", issue: "Transition failures increasing", recommendation: "Add hold-time margin patterns", priority: "Medium" },
  { patternId: "PAT-TIMING-056", issue: "Moderate efficiency", recommendation: "Optimize scan ordering", priority: "Low" },
];

export const failureTrendData: TrendPoint[] = [
  { label: "Mon", value: 186, value2: 42 },
  { label: "Tue", value: 172, value2: 38 },
  { label: "Wed", value: 168, value2: 36 },
  { label: "Thu", value: 158, value2: 32 },
  { label: "Fri", value: 148, value2: 28 },
  { label: "Sat", value: 152, value2: 30 },
  { label: "Sun", value: 142, value2: 26 },
];

export const failingRegionsData: TrendPoint[] = [
  { label: "Core", value: 48 },
  { label: "GPU", value: 38 },
  { label: "Memory", value: 34 },
  { label: "IO", value: 28 },
  { label: "NOC", value: 22 },
  { label: "Security", value: 12 },
];

export const failureDensityData: TrendPoint[] = [
  { label: "Zone 1", value: 92 },
  { label: "Zone 2", value: 68 },
  { label: "Zone 3", value: 84 },
  { label: "Zone 4", value: 56 },
  { label: "Zone 5", value: 74 },
  { label: "Zone 6", value: 48 },
];

export const failureRecords: FailureRecordRow[] = [
  { failureId: "F-10284", chainId: "SC-004821", chip: "Core-CPU-0", failType: "Stuck At", severity: "Critical", timestamp: "2026-06-29 08:42" },
  { failureId: "F-10283", chainId: "SC-003156", chip: "GPU-Cluster-A", failType: "Transition", severity: "Critical", timestamp: "2026-06-29 08:38" },
  { failureId: "F-10282", chainId: "SC-007892", chip: "Memory-CTRL-2", failType: "Bridging", severity: "Warning", timestamp: "2026-06-29 08:22" },
  { failureId: "F-10281", chainId: "SC-002441", chip: "IO-Hub-North", failType: "Timing", severity: "Warning", timestamp: "2026-06-29 07:58" },
  { failureId: "F-10280", chainId: "SC-009103", chip: "Core-CPU-1", failType: "Stuck At", severity: "Recovered", timestamp: "2026-06-29 07:44" },
  { failureId: "F-10279", chainId: "SC-001778", chip: "PCIe-Gen5-0", failType: "Transition", severity: "Warning", timestamp: "2026-06-29 07:30" },
];

export const rootCauseAnalysis: RootCauseRow[] = [
  { cause: "Clock gating defect", count: 38, percentage: 26.8, trend: -4.2 },
  { cause: "Hold time violation", count: 32, percentage: 22.5, trend: 2.1 },
  { cause: "Metal short", count: 24, percentage: 16.9, trend: -1.8 },
  { cause: "Setup slack failure", count: 18, percentage: 12.7, trend: -0.6 },
  { cause: "Scan cell defect", count: 16, percentage: 11.3, trend: 1.4 },
  { cause: "Unknown", count: 14, percentage: 9.8, trend: -2.4 },
];

export const aiRecommendations: AIRecommendationRow[] = [
  { id: "AI-001", chainId: "SC-004821", recommendation: "Inspect clock gating near segment boundary", confidence: 91, impact: "High" },
  { id: "AI-002", chainId: "SC-003156", recommendation: "Add hold-time margin to transition path", confidence: 86, impact: "High" },
  { id: "AI-003", chainId: "SC-007892", recommendation: "Run bridging isolation pattern", confidence: 78, impact: "Medium" },
  { id: "AI-004", chainId: "SC-002441", recommendation: "Adjust clock skew compensation", confidence: 82, impact: "Medium" },
];

export const diagnosisTimeline: TrendPoint[] = [
  { label: "Week 1", value: 420, value2: 86 },
  { label: "Week 2", value: 480, value2: 72 },
  { label: "Week 3", value: 540, value2: 58 },
  { label: "Week 4", value: 620, value2: 42 },
  { label: "Week 5", value: 680, value2: 32 },
  { label: "Week 6", value: 740, value2: 24 },
];

export const aiConfidenceTrend: TrendPoint[] = [
  { label: "Mon", value: 84 },
  { label: "Tue", value: 85.5 },
  { label: "Wed", value: 86.8 },
  { label: "Thu", value: 87.4 },
  { label: "Fri", value: 88.2 },
  { label: "Sat", value: 88.0 },
  { label: "Sun", value: 88.2 },
];

export const diagnosisReports: DiagnosisReportRow[] = [
  { chainId: "SC-004821", status: "Diagnosed", rootCause: "Clock gating defect", confidence: 91, repairSuggestion: "Replace scan cell SC-004821-142" },
  { chainId: "SC-003156", status: "Partial", rootCause: "Hold time violation", confidence: 78, repairSuggestion: "Adjust hold margin +12ps" },
  { chainId: "SC-007892", status: "Diagnosed", rootCause: "Metal short M4-M5", confidence: 94, repairSuggestion: "FIB repair at coordinate (1248, 892)" },
  { chainId: "SC-001778", status: "Unknown", rootCause: "Pending analysis", confidence: 42, repairSuggestion: "Run extended diagnosis pattern" },
];

export const suspectedScanCells: SuspectedCellRow[] = [
  { cellId: "SC-004821-142", chainId: "SC-004821", cellType: "SDFF", failProbability: 0.92, location: "Core-CPU-0 / Seg-4" },
  { cellId: "SC-003156-089", chainId: "SC-003156", cellType: "SDFF", failProbability: 0.86, location: "GPU-Cluster-A / Seg-2" },
  { cellId: "SC-007892-034", chainId: "SC-007892", cellType: "SDFF", failProbability: 0.94, location: "Memory-CTRL-2 / Seg-1" },
  { cellId: "SC-002441-201", chainId: "SC-002441", cellType: "SDFF", failProbability: 0.78, location: "IO-Hub-North / Seg-3" },
];

export const debugPoints: DebugPointRow[] = [
  { pointId: "DP-001", chainId: "SC-004821", region: "Clock Gating", priority: 1, description: "Primary suspect near CDC boundary" },
  { pointId: "DP-002", chainId: "SC-003156", region: "Transition Path", priority: 2, description: "Hold margin insufficient at flop 089" },
  { pointId: "DP-003", chainId: "SC-007892", region: "Metal Layer M4", priority: 1, description: "Bridging between adjacent routes" },
  { pointId: "DP-004", chainId: "SC-002441", region: "Clock Tree", priority: 3, description: "Skew compensation needed" },
];

export const repairPriorityData: RepairPriorityRow[] = [
  { chainId: "SC-004821", priority: 1, failType: "Stuck At", estimatedFixTime: "2.4h", successRate: 84 },
  { chainId: "SC-007892", priority: 2, failType: "Bridging", estimatedFixTime: "4.8h", successRate: 72 },
  { chainId: "SC-003156", priority: 3, failType: "Transition", estimatedFixTime: "3.2h", successRate: 78 },
  { chainId: "SC-002441", priority: 4, failType: "Timing", estimatedFixTime: "1.8h", successRate: 88 },
];

export function generateScanChainHeatmap(
  rows = 16,
  cols = 24
): { value: number; row: number; col: number }[] {
  const data: { value: number; row: number; col: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const centerDist = Math.sqrt(
        (row - rows / 2) ** 2 + (col - cols / 2) ** 2
      );
      const edgeFactor = centerDist / (rows / 2);
      const value = Math.min(
        1,
        Math.max(0, edgeFactor * 0.4 + Math.random() * 0.6)
      );
      data.push({ value, row, col });
    }
  }
  return data;
}

export const connectivityGraphData = {
  nodes: [
    { id: "SC-004821", label: "SC-004821", status: "failing" },
    { id: "SC-003156", label: "SC-003156", status: "warning" },
    { id: "SC-007892", label: "SC-007892", status: "failing" },
    { id: "SC-002441", label: "SC-002441", status: "healthy" },
    { id: "SC-009103", label: "SC-009103", status: "warning" },
    { id: "SC-001778", label: "SC-001778", status: "unknown" },
  ],
  edges: [
    { from: "SC-004821", to: "SC-003156" },
    { from: "SC-003156", to: "SC-007892" },
    { from: "SC-007892", to: "SC-002441" },
    { from: "SC-002441", to: "SC-009103" },
    { from: "SC-009103", to: "SC-001778" },
  ],
};

export const failurePropagationData: TrendPoint[] = [
  { label: "T+0", value: 12 },
  { label: "T+1", value: 28 },
  { label: "T+2", value: 48 },
  { label: "T+3", value: 62 },
  { label: "T+4", value: 58 },
  { label: "T+5", value: 42 },
  { label: "T+6", value: 24 },
];
