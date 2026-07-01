"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowUpDown,
  ClipboardClock,
  Crosshair,
  FileText,
  GitMerge,
  Link2Off,
  MapPinned,
  Network,
  ShieldCheck,
  TrendingDown,
  Unplug,
  type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { ScanDiagnosisKPISection, PatternStatusVariant } from "@/types/scanChain";

const iconMap: Record<string, LucideIcon> = {
  unplug: Unplug,
  crosshair: Crosshair,
  link2off: Link2Off,
  "arrow-left-right": ArrowLeftRight,
  network: Network,
  "arrow-up-down": ArrowUpDown,
  "git-merge": GitMerge,
  "trending-down": TrendingDown,
  "file-text": FileText,
  "map-pinned": MapPinned,
  "shield-check": ShieldCheck,
  "clipboard-clock": ClipboardClock,
};

const statusStyles: Record<PatternStatusVariant, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/10 text-red-400 border-red-500/30",
  neutral: "bg-slate-500/10 text-slate-300 border-slate-500/30",
  info: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
};

export function ScanDiagnosisSectionedGrid({ sections }: { sections: ScanDiagnosisKPISection[] }) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.05 }}
        >
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">
            {section.title}
          </h3>
          <div className="pattern-kpi-grid">
            {section.kpis.map((kpi, i) => {
              const Icon = iconMap[kpi.icon] ?? Unplug;
              const positiveIsGood = kpi.positiveIsGood ?? true;
              const trendPositive = positiveIsGood ? kpi.change > 0 : kpi.change < 0;
              const chartData = kpi.sparkline.map((v, idx) => ({ idx, v }));
              const variant = kpi.statusVariant ?? "neutral";

              return (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.05 + i * 0.04, duration: 0.35 }}
                  className="hover-lift"
                  title={kpi.description}
                >
                  <div className="glass-card gradient-border flex h-full flex-col p-4 sm:p-5">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#7C3AED]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[10px] font-medium leading-tight",
                          statusStyles[variant]
                        )}
                      >
                        {kpi.status}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-400">{kpi.title}</p>
                    <p className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {kpi.value}
                    </p>
                    {kpi.subtitle && (
                      <p className="mt-0.5 text-[11px] text-slate-500">{kpi.subtitle}</p>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={cn(
                          "text-[11px] font-medium",
                          trendPositive ? "text-emerald-400" : "text-red-400"
                        )}
                      >
                        {kpi.change > 0 ? "+" : ""}
                        {kpi.change}% trend
                      </span>
                    </div>

                    <div className="mt-auto h-10 pt-3 sm:h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id={`sd-spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="v"
                            stroke="#7C3AED"
                            strokeWidth={1.5}
                            fill={`url(#sd-spark-${kpi.id})`}
                            dot={false}
                            isAnimationActive
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
