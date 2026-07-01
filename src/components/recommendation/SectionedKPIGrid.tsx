"use client";

import { motion } from "framer-motion";
import type { KPISection } from "@/types/recommendation";
import { CenterKPIGrid } from "./CenterKPIGrid";

export function SectionedKPIGrid({
  sections,
  gridClassName = "ai-rec-kpi-grid",
}: {
  sections: KPISection[];
  gridClassName?: string;
}) {
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
          <CenterKPIGrid data={section.kpis} gridClassName={gridClassName} />
        </motion.div>
      ))}
    </div>
  );
}
