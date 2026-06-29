"use client";

import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { UploadProgressState } from "@/types/upload";

export function UploadProgressPanel({
  progress,
  uploading,
}: {
  progress: UploadProgressState;
  uploading: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#2D3748]/60 bg-[#0A1020]/40 p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-white">Upload Progress</span>
        <span className="text-[#7C3AED]">{progress.percent}%</span>
      </div>
      <Progress value={progress.percent} />
      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
        <span>Speed: {progress.speed}</span>
        <span>Elapsed: {progress.elapsed}</span>
        <span>Remaining: {progress.remaining}</span>
        <span>Size: {progress.fileSize}</span>
      </div>
      {uploading && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#7C3AED]" />
          Uploading...
        </div>
      )}
    </div>
  );
}

export async function simulateUpload(
  onProgress: (percent: number, elapsedSec: number) => void
): Promise<void> {
  const steps = 20;
  for (let i = 1; i <= steps; i++) {
    await new Promise((r) => setTimeout(r, 120));
    onProgress(Math.round((i / steps) * 100), (i * 120) / 1000);
  }
}

export function buildProgressState(percent: number, fileSize: string, elapsedSec: number): UploadProgressState {
  const remainingSec = percent > 0 ? Math.max(0, Math.round((elapsedSec / percent) * (100 - percent))) : 0;
  return {
    percent,
    speed: `${(percent * 2.4).toFixed(1)} MB/s`,
    elapsed: `${elapsedSec.toFixed(0)}s`,
    remaining: percent >= 100 ? "0s" : `${remainingSec}s`,
    fileSize,
  };
}
