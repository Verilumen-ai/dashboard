"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Binary,
  Cpu,
  DollarSign,
  LayoutDashboard,
  Microscope,
  RotateCcw,
  ScanLine,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SidebarFilters } from "@/types/dashboard";

const navItems = [
  {
    id: "dashboard",
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "scan-chain",
    href: "/scan-chain",
    label: "Scan Chain Analysis",
    icon: ScanLine,
  },
  {
    id: "mbist",
    href: "/mbist",
    label: "MBIST Analysis",
    icon: Cpu,
  },
  {
    id: "lbist",
    href: "/lbist",
    label: "LBIST Analysis",
    icon: Binary,
  },
  {
    id: "wafer",
    href: "/dashboard#wafer",
    label: "Wafer Analysis",
    icon: Microscope,
  },
  {
    id: "cost",
    href: "/cost-intelligence",
    label: "Cost Intelligence",
    icon: DollarSign,
  },
  {
    id: "recommendation-analysis",
    href: "/recommendation-analysis",
    label: "Recommendation Analysis",
    icon: Sparkles,
  },
  {
    id: "alerts",
    href: "/alerts",
    label: "Alerts",
    icon: AlertTriangle,
  },
];

const defaultFilters: SidebarFilters = {
  dateRange: "7d",
  fab: "fab-12",
  tester: "ate-01",
  product: "chip-x7",
};

interface SidebarProps {
  filters?: SidebarFilters;
  onFiltersChange?: (filters: SidebarFilters) => void;
  hideQuickFilters?: boolean;
}

export function Sidebar({
  filters = defaultFilters,
  onFiltersChange,
  hideQuickFilters = false,
}: SidebarProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash.replace("#", ""));
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const updateFilter = (key: keyof SidebarFilters, value: string) => {
    onFiltersChange?.({ ...filters, [key]: value });
  };

  const resetFilters = () => onFiltersChange?.(defaultFilters);

  const isNavActive = (item: typeof navItems[number]) => {
    if (item.id === "scan-chain") return pathname === "/scan-chain";
    if (item.id === "mbist") return pathname === "/mbist";
    if (item.id === "lbist") return pathname === "/lbist";
    if (item.id === "recommendation-analysis") {
      return pathname === "/recommendation-analysis";
    }
    if (item.id === "cost") {
      return pathname === "/cost-intelligence";
    }
    if (item.id === "alerts") {
      return pathname === "/alerts";
    }
    if (item.id === "dashboard") return pathname === "/dashboard" && hash === "";
    if (pathname !== "/dashboard") return false;
    const itemHash = item.href.includes("#") ? item.href.split("#")[1] : "";
    return hash === itemHash;
  };

  return (
    <aside className="dashboard-sidebar flex h-full w-[280px] flex-col border-r border-[#1e293b] bg-[#0A1020]">
      <div className="flex items-center gap-3 border-b border-[#1e293b] px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] shadow-lg shadow-purple-500/20">
          <Cpu className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">ATE Intelligence</p>
          <p className="text-xs text-slate-400">Enterprise Platform</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(item);
          const isRecommendation = item.id === "recommendation-analysis";

          const linkClassName = cn(
            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1020]",
            isRecommendation ? "text-base" : "text-sm",
            active
              ? cn(
                  "bg-gradient-to-r text-white shadow-md shadow-purple-500/30 ring-1 ring-[#7C3AED]/40",
                  isRecommendation
                    ? "from-[#7C3AED] to-[#8B5CF6]"
                    : "from-[#7C3AED] to-[#5B21B6]"
                )
              : cn(
                  "text-slate-400",
                  isRecommendation
                    ? "hover:scale-[1.02] hover:bg-[#7C3AED]/10 hover:text-white hover:shadow-md hover:shadow-purple-500/20 duration-[250ms]"
                    : "hover:bg-white/5 hover:text-white"
                )
          );

          const link = (
            <Link
              href={item.href}
              className={linkClassName}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              title={item.label}
            >
              <Icon
                className={cn(
                  "shrink-0",
                  isRecommendation ? "h-5 w-5" : "h-4 w-4",
                  active ? "text-white" : "text-slate-400 group-hover:text-white"
                )}
                aria-hidden="true"
              />
              <span className="flex-1">{item.label}</span>
            </Link>
          );

          if (isRecommendation) {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {link}
              </motion.div>
            );
          }

          return <div key={item.id}>{link}</div>;
        })}

        <div className="my-3 border-t border-[#1e293b]" />

        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            pathname === "/settings"
              ? "bg-[#7C3AED] text-white shadow-md shadow-purple-500/25"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>

      {!hideQuickFilters && (
        <div className="border-t border-[#1e293b] p-3">
          <div className="glass-card rounded-lg p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Quick Filters
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-0.5 block text-[10px] text-slate-500">Date Range</label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(v) => updateFilter("dateRange", v ?? filters.dateRange)}
                >
                  <SelectTrigger className="h-7 w-full border-[#2D3748] bg-[#0A1020] px-2 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-0.5 block text-[10px] text-slate-500">Fab</label>
                <Select
                  value={filters.fab}
                  onValueChange={(v) => updateFilter("fab", v ?? filters.fab)}
                >
                  <SelectTrigger className="h-7 w-full border-[#2D3748] bg-[#0A1020] px-2 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fab-12">Fab-12</SelectItem>
                    <SelectItem value="fab-18">Fab-18</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-0.5 block text-[10px] text-slate-500">Tester</label>
                <Select
                  value={filters.tester}
                  onValueChange={(v) => updateFilter("tester", v ?? filters.tester)}
                >
                  <SelectTrigger className="h-7 w-full border-[#2D3748] bg-[#0A1020] px-2 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ate-01">ATE-01</SelectItem>
                    <SelectItem value="ate-02">ATE-02</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-0.5 block text-[10px] text-slate-500">Product</label>
                <Select
                  value={filters.product}
                  onValueChange={(v) => updateFilter("product", v ?? filters.product)}
                >
                  <SelectTrigger className="h-7 w-full border-[#2D3748] bg-[#0A1020] px-2 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chip-x7">Chip-X7</SelectItem>
                    <SelectItem value="chip-a3">Chip-A3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="col-span-2 h-7 w-full border-[#2D3748] text-[11px] hover:border-[#7C3AED]"
                onClick={resetFilters}
              >
                <RotateCcw className="mr-1 h-3 w-3" />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
