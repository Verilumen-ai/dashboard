"use client";

import { motion } from "framer-motion";
import {
  CircleDollarSign,
  Coins,
  DollarSign,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import type { ExecutiveKPI } from "@/types/dashboard";

const iconMap = {
  "total-test-cost": DollarSign,
  "cost-per-wafer": CircleDollarSign,
  "cost-per-die": Coins,
  "test-time": Timer,
  yield: TrendingUp,
  "roi-improvement": Sparkles,
} as const;

interface ExecutiveCardProps {
  kpi: ExecutiveKPI;
  index?: number;
}

export function ExecutiveCard({ kpi, index = 0 }: ExecutiveCardProps) {
  const Icon = iconMap[kpi.id as keyof typeof iconMap] ?? DollarSign;
  const isPositive =
    kpi.id === "yield" || kpi.id === "roi-improvement"
      ? kpi.change > 0
      : kpi.change < 0;

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
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              isPositive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            )}
          >
            {kpi.change > 0 ? "+" : ""}
            {kpi.change}%
          </span>
        </div>

        <p className="text-xs font-medium text-slate-400">{kpi.title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {kpi.value}
        </p>

        <div className="mt-auto h-12 pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#7C3AED"
                strokeWidth={1.5}
                fill={`url(#spark-${kpi.id})`}
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

interface ExecutiveKPIGridProps {
  data: ExecutiveKPI[];
}

export function ExecutiveKPIGrid({ data }: ExecutiveKPIGridProps) {
  return (
    <div className="kpi-grid">
      {data.map((kpi, i) => (
        <ExecutiveCard key={kpi.id} kpi={kpi} index={i} />
      ))}
    </div>
  );
}
