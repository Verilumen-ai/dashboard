"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowUpCircle,
  ArrowUpDown,
  BarChart3,
  BarChart4,
  BatteryCharging,
  BrainCircuit,
  Bug,
  ChartLine,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Coins,
  Copy,
  Crosshair,
  DollarSign,
  GitBranch,
  GitMerge,
  ListChecks,
  LocateFixed,
  Microscope,
  Network,
  PiggyBank,
  PlusCircle,
  Repeat,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Square,
  Target,
  Timer,
  Trash2,
  TrendingDown,
  TrendingUp,
  Unplug,
  Wallet,
  Zap,
  ZapOff,
  type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { CenterKPI } from "@/types/recommendation";

const iconMap: Record<string, LucideIcon> = {
  copy: Copy,
  "trash-2": Trash2,
  "shield-check": ShieldCheck,
  "arrow-up-down": ArrowUpDown,
  "plus-circle": PlusCircle,
  target: Target,
  "zap-off": ZapOff,
  "battery-charging": BatteryCharging,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  sparkles: Sparkles,
  bug: Bug,
  "alert-octagon": AlertOctagon,
  "alert-triangle": AlertTriangle,
  timer: Timer,
  "clock-3": Clock3,
  activity: Activity,
  zap: Zap,
  microscope: Microscope,
  "shield-alert": ShieldAlert,
  crosshair: Crosshair,
  repeat: Repeat,
  "list-checks": ListChecks,
  "git-branch": GitBranch,
  dollar: DollarSign,
  "piggy-bank": PiggyBank,
  "chart-line": ChartLine,
  network: Network,
  unplug: Unplug,
  "clipboard-check": ClipboardCheck,
  "bar-chart-3": BarChart3,
  search: Search,
  "locate-fixed": LocateFixed,
  "brain-circuit": BrainCircuit,
  square: Square,
  "settings-2": Settings2,
  "clipboard-list": ClipboardList,
  "arrow-up-circle": ArrowUpCircle,
  wallet: Wallet,
  coins: Coins,
  "git-merge": GitMerge,
  "bar-chart-4": BarChart4,
};

const statusStyles = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/10 text-red-400 border-red-500/30",
  info: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  neutral: "bg-slate-500/10 text-slate-300 border-slate-500/30",
};

function CenterKPICard({ kpi, index }: { kpi: CenterKPI; index: number }) {
  const Icon = iconMap[kpi.icon] ?? Sparkles;
  const positiveIsGood = kpi.positiveIsGood ?? true;
  const trendPositive = positiveIsGood ? kpi.change > 0 : kpi.change < 0;
  const chartData = kpi.sparkline.map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="hover-lift"
      title={kpi.description}
    >
      <div className="glass-card gradient-border flex h-full flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#7C3AED]">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          {kpi.status && (
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-medium leading-tight",
                statusStyles[kpi.statusVariant ?? "neutral"]
              )}
            >
              {kpi.status}
            </span>
          )}
        </div>

        <p className="text-xs font-medium text-slate-400">{kpi.title}</p>
        <p className="mt-1 text-lg font-bold tracking-tight text-white sm:text-xl">{kpi.value}</p>
        {kpi.subtitle && <p className="mt-0.5 text-[11px] text-slate-500">{kpi.subtitle}</p>}

        <span
          className={cn(
            "mt-2 text-[11px] font-medium",
            trendPositive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {kpi.change > 0 ? "+" : ""}
          {kpi.change}% trend
        </span>

        <div className="mt-auto h-10 pt-3 sm:h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`center-spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#7C3AED"
                strokeWidth={1.5}
                fill={`url(#center-spark-${kpi.id})`}
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

export function CenterKPIGrid({
  data,
  gridClassName = "ai-rec-kpi-grid",
}: {
  data: CenterKPI[];
  gridClassName?: string;
}) {
  return (
    <div className={gridClassName}>
      {data.map((kpi, i) => (
        <CenterKPICard key={kpi.id} kpi={kpi} index={i} />
      ))}
    </div>
  );
}
