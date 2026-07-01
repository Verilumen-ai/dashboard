"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Crosshair,
  Disc,
  FileText,
  GitBranch,
  Layers,
  Repeat,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { FailureAnalysisKPI, FailureKPIFocus, PatternStatusVariant } from "@/types/scanChain";

const iconMap: Record<string, LucideIcon> = {
  "file-stack": FileText,
  activity: Activity,
  sparkles: Sparkles,
  "alert-triangle": AlertTriangle,
  cpu: Cpu,
  disc: Disc,
  layers: Layers,
  "git-branch": GitBranch,
  target: Target,
  repeat: Repeat,
  crosshair: Crosshair,
  "file-text": FileText,
};

const statusStyles: Record<PatternStatusVariant, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/10 text-red-400 border-red-500/30",
  neutral: "bg-slate-500/10 text-slate-300 border-slate-500/30",
  info: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
};

function FailureKPICard({
  kpi,
  index,
  onFocus,
}: {
  kpi: FailureAnalysisKPI;
  index: number;
  onFocus?: (target: FailureKPIFocus) => void;
}) {
  const Icon = iconMap[kpi.icon] ?? Activity;
  const positiveIsGood = kpi.positiveIsGood ?? true;
  const trendPositive = positiveIsGood ? kpi.change > 0 : kpi.change < 0;
  const chartData = kpi.sparkline.map((v, i) => ({ i, v }));
  const variant = kpi.statusVariant ?? "neutral";
  const clickable = Boolean(kpi.focusTarget && onFocus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className={cn("hover-lift", clickable && "cursor-pointer")}
      title={kpi.description}
      onClick={() => kpi.focusTarget && onFocus?.(kpi.focusTarget)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ") && kpi.focusTarget) {
          e.preventDefault();
          onFocus?.(kpi.focusTarget);
        }
      }}
    >
      <div
        className={cn(
          "glass-card gradient-border flex h-full flex-col p-4 sm:p-5",
          clickable && "hover:border-[#7C3AED]/50"
        )}
      >
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
        <p className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">{kpi.value}</p>
        {kpi.subtitle && <p className="mt-0.5 text-[11px] text-slate-500">{kpi.subtitle}</p>}

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
                <linearGradient id={`fail-spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#7C3AED"
                strokeWidth={1.5}
                fill={`url(#fail-spark-${kpi.id})`}
                dot={false}
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

interface FailureKPIGridProps {
  data: FailureAnalysisKPI[];
  onFocus?: (target: FailureKPIFocus) => void;
}

export function FailureKPIGrid({ data, onFocus }: FailureKPIGridProps) {
  return (
    <div className="pattern-kpi-grid">
      {data.map((kpi, i) => (
        <FailureKPICard key={kpi.id} kpi={kpi} index={i} onFocus={onFocus} />
      ))}
    </div>
  );
}
