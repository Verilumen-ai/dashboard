"use client";

import { motion } from "framer-motion";
import { BarChart3, LayoutDashboard, TrendingUp } from "lucide-react";
import type { ThemeConfig } from "@/types/theme";
import { accentMap } from "@/contexts/ThemeContext";

interface ThemePreviewProps {
  theme: ThemeConfig;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const accent = accentMap[theme.primaryColor];
  const radius =
    theme.borderRadius === "small"
      ? "8px"
      : theme.borderRadius === "large"
        ? "16px"
        : "12px";

  const cardBg =
    theme.cardStyle === "glass"
      ? "rgba(17,24,39,0.75)"
      : theme.cardStyle === "solid"
        ? "#111827"
        : "transparent";

  const cardBorder =
    theme.cardStyle === "minimal" ? "1px dashed #2D3748" : "1px solid #2D3748";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2D3748] bg-[#0A1020]/60 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Live Preview
      </p>

      <motion.div
        key={`${theme.primaryColor}-${theme.cardStyle}-${theme.fontSize}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-[#2D3748]/50 bg-[#090B12] p-3"
      >
        {/* Mini navbar */}
        <div
          className="mb-3 flex items-center justify-between rounded-lg px-3 py-2"
          style={{ background: "rgba(17,24,39,0.8)", borderRadius: radius }}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-md"
              style={{ backgroundColor: accent }}
            />
            <span className="text-[10px] font-medium text-white">Executive</span>
          </div>
          <div className="h-4 w-16 rounded-full bg-[#1e293b]" />
        </div>

        {/* Mini KPI row */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { icon: TrendingUp, val: "94.2%", label: "Yield" },
            { icon: BarChart3, val: "$2.4M", label: "Cost" },
            { icon: LayoutDashboard, val: "42.6s", label: "Time" },
          ].map(({ icon: Icon, val, label }) => (
            <div
              key={label}
              className="p-2 backdrop-blur-sm"
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: radius,
              }}
            >
              <Icon className="mb-1 h-3 w-3" style={{ color: accent }} />
              <p className="text-[10px] font-bold text-white">{val}</p>
              <p className="text-[8px] text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Mini chart bar */}
        <div
          className="flex h-10 items-end gap-1 p-2"
          style={{
            background: cardBg,
            border: cardBorder,
            borderRadius: radius,
          }}
        >
          {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex-1 rounded-sm opacity-80"
              style={{ backgroundColor: accent }}
            />
          ))}
        </div>

        {/* Sidebar style indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className="h-8 w-2 rounded-full"
            style={{ backgroundColor: accent, opacity: 0.6 }}
          />
          <span className="text-[9px] capitalize text-slate-500">
            {theme.sidebarStyle} · {theme.density} · {theme.fontSize}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
