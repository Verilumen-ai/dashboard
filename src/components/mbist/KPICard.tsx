"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Ban,
  CheckCircle,
  Clock,
  Crosshair,
  DollarSign,
  Gauge,
  GitBranch,
  HardDrive,
  HelpCircle,
  Lightbulb,
  MapPin,
  Replace,
  Scan,
  SearchCheck,
  ShieldCheck,
  Target,
  Timer,
  TrendingUp,
  Wrench,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { MbistKPI } from "@/types/mbist";

const iconMap: Record<string, LucideIcon> = {
  "memory-stick": HardDrive,
  "check-circle": CheckCircle,
  "x-circle": XCircle,
  "shield-check": ShieldCheck,
  timer: Timer,
  wrench: Wrench,
  "alert-circle": AlertCircle,
  "alert-octagon": AlertOctagon,
  gauge: Gauge,
  target: Target,
  "map-pin": MapPin,
  "git-branch": GitBranch,
  clock: Clock,
  ban: Ban,
  "search-check": SearchCheck,
  "help-circle": HelpCircle,
  lightbulb: Lightbulb,
  crosshair: Crosshair,
  scan: Scan,
  replace: Replace,
  "trending-up": TrendingUp,
  dollar: DollarSign,
  "alert-triangle": AlertTriangle,
};

export function KPICard({ kpi, index = 0 }: { kpi: MbistKPI; index?: number }) {
  const Icon = iconMap[kpi.icon] ?? HardDrive;
  const positiveIsGood = kpi.positiveIsGood ?? true;
  const isPositive = positiveIsGood ? kpi.change > 0 : kpi.change < 0;
  const chartData = kpi.sparkline.map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="hover-lift"
    >
      <div className="glass-card gradient-border flex h-full flex-col p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#7C3AED]">
            <Icon className="h-4 w-4" />
          </div>
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
            {kpi.change > 0 ? "+" : ""}{kpi.change}%
          </span>
        </div>
        <p className="text-xs font-medium text-slate-400">{kpi.title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">{kpi.value}</p>
        <div className="mt-auto h-12 pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`mbist-spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#7C3AED" strokeWidth={1.5} fill={`url(#mbist-spark-${kpi.id})`} dot={false} isAnimationActive />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export function KPIGrid({ data }: { data: MbistKPI[] }) {
  return (
    <div className="kpi-grid">
      {data.map((kpi, i) => (
        <KPICard key={kpi.id} kpi={kpi} index={i} />
      ))}
    </div>
  );
}
