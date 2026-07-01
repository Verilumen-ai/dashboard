"use client";

import { Check, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecommendationStore } from "@/stores/recommendationStore";
import { useUploadStore } from "@/stores/uploadStore";
import type { RecommendationActionStatus } from "@/types/platform";
import { cn } from "@/lib/utils";

const statusStyles: Record<RecommendationActionStatus, string> = {
  pending: "bg-slate-500/20 text-slate-300",
  approved: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
  applied: "bg-[#7C3AED]/20 text-[#A78BFA]",
};

export function RecommendationActionButtons({ id }: { id: string }) {
  const status = useRecommendationStore((s) => s.getStatus(id));
  const setStatus = useRecommendationStore((s) => s.setStatus);
  const undoStatus = useRecommendationStore((s) => s.undoStatus);
  const showToast = useUploadStore((s) => s.showToast);

  const act = (next: RecommendationActionStatus, message: string) => {
    setStatus(id, next);
    showToast(message, next === "rejected" ? "info" : "success");
  };

  if (status === "applied") {
    return (
      <div className="flex items-center gap-2">
        <Badge className={cn("text-[10px]", statusStyles.applied)}>Applied</Badge>
        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => { undoStatus(id); showToast("Recommendation undone", "info"); }}>
          <RotateCcw className="mr-1 h-3 w-3" /> Undo
        </Button>
      </div>
    );
  }

  if (status === "approved" || status === "rejected") {
    return (
      <div className="flex items-center gap-2">
        <Badge className={cn("text-[10px]", statusStyles[status])}>{status === "approved" ? "Approved" : "Rejected"}</Badge>
        {status === "approved" && (
          <Button variant="ghost" size="sm" className="h-7 text-xs text-[#7C3AED]" onClick={() => act("applied", `Recommendation ${id} applied`)}>
            <Check className="mr-1 h-3 w-3" /> Apply
          </Button>
        )}
        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => undoStatus(id)}>
          Undo
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" className="h-7 text-xs text-emerald-400" onClick={() => act("approved", `Recommendation ${id} approved`)}>
        <ThumbsUp className="mr-1 h-3 w-3" /> Approve
      </Button>
      <Button variant="ghost" size="sm" className="h-7 text-xs text-red-400" onClick={() => act("rejected", `Recommendation ${id} rejected`)}>
        <ThumbsDown className="mr-1 h-3 w-3" /> Reject
      </Button>
    </div>
  );
}
