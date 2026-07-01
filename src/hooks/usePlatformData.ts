"use client";

import { useMemo } from "react";
import {
  adjustHeatmapValues,
  adjustKPIValue,
  adjustSparkline,
  adjustTrendPoints,
  filterRowsByGlobal,
} from "@/lib/filterEngine";
import { executiveKPIs, patternAnalysisData, costTrendData } from "@/lib/dummyData";
import { useFilterStore } from "@/stores/filterStore";
import type { ExecutiveKPI, PatternRow, CostTrendPoint } from "@/types/dashboard";

function buildExecutiveData(filters: ReturnType<typeof useFilterStore.getState>["filters"]) {
  const kpis: ExecutiveKPI[] = executiveKPIs.map((kpi, i) => ({
    ...kpi,
    value: adjustKPIValue(kpi.value, filters, i),
    sparkline: adjustSparkline(kpi.sparkline, filters),
  }));
  const patterns = filterRowsByGlobal(patternAnalysisData, filters);
  const costTrend: CostTrendPoint[] = costTrendData.map((point) => {
    const adjusted = adjustTrendPoints(
      [{ label: point.day, value: point.totalCost, value2: point.costPerWafer }],
      filters
    )[0]!;
    return {
      day: point.day,
      totalCost: adjusted.value,
      costPerWafer: adjusted.value2 ?? point.costPerWafer,
    };
  });
  return { kpis, patterns, costTrend };
}

export function useFilteredExecutiveData() {
  const filters = useFilterStore((s) => s.filters);

  const data = useMemo(() => buildExecutiveData(filters), [filters]);

  return {
    data,
    isLoading: false,
    isPending: false,
    invalidate: () => {},
  };
}

export function useFilteredModuleData<T extends object>(
  key: string,
  kpis: {
    id: string;
    title: string;
    value: string;
    change: number;
    trend: "up" | "down";
    sparkline: number[];
    icon: string;
    positiveIsGood?: boolean;
  }[],
  tableRows: T[]
) {
  const filters = useFilterStore((s) => s.filters);

  const data = useMemo(
    () => ({
      kpis: kpis.map((kpi, i) => ({
        ...kpi,
        value: adjustKPIValue(kpi.value, filters, i),
        sparkline: adjustSparkline(kpi.sparkline, filters),
      })),
      rows: filterRowsByGlobal(tableRows, filters),
    }),
    [filters, kpis, tableRows]
  );

  return {
    data,
    isLoading: false,
    isPending: false,
  };
}

export function useFilteredHeatmap(key: string, grid: number[][]) {
  const filters = useFilterStore((s) => s.filters);
  return useMemo(() => adjustHeatmapValues(grid, filters), [key, grid, filters]);
}
