"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import type { SidebarFilters } from "@/types/dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  hideQuickFilters?: boolean;
  searchPlaceholder?: string;
  primaryActionLabel?: string;
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  hideQuickFilters,
  searchPlaceholder,
  primaryActionLabel,
}: DashboardLayoutProps) {
  const [filters, setFilters] = useState<SidebarFilters>({
    dateRange: "7d",
    fab: "fab-12",
    tester: "ate-01",
    product: "chip-x7",
  });

  return (
    <div className="dashboard-shell">
      <Sidebar
        filters={filters}
        onFiltersChange={setFilters}
        hideQuickFilters={hideQuickFilters}
      />
      <TopNavbar
        title={title}
        subtitle={subtitle}
        searchPlaceholder={searchPlaceholder}
        primaryActionLabel={primaryActionLabel}
      />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
