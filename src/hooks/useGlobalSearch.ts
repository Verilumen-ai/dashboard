"use client";

import { useMemo } from "react";
import { searchPlatform } from "@/lib/searchIndex";
import { useFilterStore } from "@/stores/filterStore";

export function useGlobalSearch() {
  const query = useFilterStore((s) => s.searchQuery);
  const results = useMemo(() => searchPlatform(query), [query]);
  return { query, results };
}
