"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { WaferDefectClassKPI } from "@/types/wafer";
import { useWaferNavigation } from "@/components/wafer/WaferNavigationContext";

export function DefectClassKPIGrid({ data }: { data: WaferDefectClassKPI[] }) {
  const navigate = useWaferNavigation();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {data.map((item, i) => (
        <motion.button
          key={item.id}
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          onClick={() => navigate(item.id)}
          className="glass-card gradient-border hover-lift group w-full p-4 text-left"
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}66` }}
            />
            <ArrowRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-[#7C3AED]" />
          </div>
          <p className="text-sm font-semibold text-white">{item.label}</p>
          <p className="mt-1 text-xs text-slate-400">{item.waferCount} wafers</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-slate-500">Avg Yield</p>
              <p className="font-semibold text-emerald-400">{item.avgYield}%</p>
            </div>
            <div>
              <p className="text-slate-500">Confidence</p>
              <p className="font-semibold text-[#A78BFA]">{item.avgConfidence}%</p>
            </div>
          </div>
          <div className="mt-3 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={item.sparkline.map((v, idx) => ({ idx, v }))}>
                <Line type="monotone" dataKey="v" stroke={item.color} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
            <TrendingUp className="h-3 w-3" />
            Click to open tab
          </div>
        </motion.button>
      ))}
    </div>
  );
}
