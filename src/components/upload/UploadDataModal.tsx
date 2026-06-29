"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpload } from "@/contexts/UploadContext";
import { DataUploadHistoryTable } from "@/components/upload/UploadHistoryTable";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { buildProgressState, simulateUpload, UploadProgressPanel } from "@/components/upload/UploadProgressPanel";
import { formatFileSize, formatNow, getFileExtension } from "@/lib/uploadData";
import { DATA_FILE_EXTENSIONS, DATA_MAX_SIZE_GB, type DataModule, type UploadProgressState } from "@/types/upload";

const acceptMap = {
  "application/octet-stream": DATA_FILE_EXTENSIONS,
  "text/csv": [".csv"],
  "application/json": [".json"],
  "application/zip": [".zip"],
  "application/xml": [".xml", ".stdf", ".stil", ".wgl"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
};

interface UploadDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDataModal({ open, onOpenChange }: UploadDataModalProps) {
  const { addDataUpload, updateDataStatus, showToast } = useUpload();
  const [files, setFiles] = useState<File[]>([]);
  const [module, setModule] = useState<DataModule>("Auto Detect");
  const [fab, setFab] = useState("Fab-12");
  const [tester, setTester] = useState("ATE-01");
  const [product, setProduct] = useState("Chip-X7");
  const [lotId, setLotId] = useState("");
  const [waferId, setWaferId] = useState("");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgressState | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string; time: string } | null>(null);

  const reset = () => {
    setFiles([]);
    setProgress(null);
    setFileInfo(null);
    setUploading(false);
  };

  const handleFiles = (selected: File[]) => {
    setFiles(selected);
    if (selected[0]) {
      setFileInfo({ name: selected[0].name, size: formatFileSize(selected[0].size), time: formatNow() });
    }
  };

  const handleUpload = async () => {
    if (!files.length) return;
    const file = files[0];
    const ext = getFileExtension(file.name).replace(".", "").toUpperCase() || "FILE";
    setUploading(true);
    showToast("Upload started", "info");
    const id = addDataUpload({
      fileName: file.name,
      module: module === "Auto Detect" ? "Scan Chain Analysis" : module,
      fileType: ext,
      size: formatFileSize(file.size),
      uploadedBy: "Alex Johnson",
      status: "Uploading",
    });
    updateDataStatus(id, "Uploading");
    await simulateUpload((percent, elapsed) => {
      setProgress(buildProgressState(percent, formatFileSize(file.size), elapsed));
    });
    updateDataStatus(id, "Processing");
    await new Promise((r) => setTimeout(r, 800));
    updateDataStatus(id, "Completed");
    setUploading(false);
    showToast("File uploaded successfully. Dashboards will refresh with new data.", "success");
    showToast("AI analysis ready for imported dataset.", "info");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!uploading) { if (!v) reset(); onOpenChange(v); } }}>
      <DialogContent className="max-w-3xl" onClose={() => !uploading && onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Upload Test Data</DialogTitle>
          <DialogDescription>
            Import ATE files for Scan Chain, MBIST, LBIST, Wafer Analysis, and Cost Intelligence. Frontend UI only — no backend processing.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="max-h-[70vh] space-y-5">
          <UploadDropzone
            accept={acceptMap}
            maxSizeBytes={DATA_MAX_SIZE_GB * 1024 ** 3}
            multiple
            onFilesSelected={handleFiles}
            label="Drag & Drop files here"
            hint="Click to Browse"
          />
          <div className="rounded-xl border border-[#2D3748]/60 bg-[#0A1020]/40 p-4">
            <p className="mb-2 text-xs font-medium text-slate-400">Supported formats</p>
            <p className="text-xs text-slate-500">STDF (.stdf) · STIL (.stil) · WGL (.wgl) · CSV · Excel (.xlsx) · JSON · ZIP · XML — Max {DATA_MAX_SIZE_GB} GB</p>
          </div>
          {fileInfo && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 rounded-xl border border-[#2D3748]/60 bg-[#0A1020]/40 p-4 sm:grid-cols-3">
              <InfoItem label="File Name" value={fileInfo.name} />
              <InfoItem label="File Size" value={fileInfo.size} />
              <InfoItem label="Upload Time" value={fileInfo.time} />
            </motion.div>
          )}
          {progress && <UploadProgressPanel progress={progress} uploading={uploading} />}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Dataset Category">
              <Select value={module} onValueChange={(v) => setModule((v ?? "Auto Detect") as DataModule)}>
                <SelectTrigger className="border-[#2D3748] bg-[#0A1020]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Auto Detect", "Scan Chain Analysis", "MBIST Analysis", "LBIST Analysis", "Wafer Analysis", "Cost Intelligence", "Recommendation Analysis"].map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Fab"><Input value={fab} onChange={(e) => setFab(e.target.value)} className="border-[#2D3748] bg-[#0A1020]" /></Field>
            <Field label="Tester"><Input value={tester} onChange={(e) => setTester(e.target.value)} className="border-[#2D3748] bg-[#0A1020]" /></Field>
            <Field label="Product"><Input value={product} onChange={(e) => setProduct(e.target.value)} className="border-[#2D3748] bg-[#0A1020]" /></Field>
            <Field label="Lot ID"><Input value={lotId} onChange={(e) => setLotId(e.target.value)} placeholder="LOT-4821" className="border-[#2D3748] bg-[#0A1020]" /></Field>
            <Field label="Wafer ID"><Input value={waferId} onChange={(e) => setWaferId(e.target.value)} placeholder="W-12" className="border-[#2D3748] bg-[#0A1020]" /></Field>
          </div>
          <Field label="Optional Notes">
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional context..." className="border-[#2D3748] bg-[#0A1020]" />
          </Field>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Extension validated · Checksum verified · Role: Admin (UI simulation)
          </div>
          <DataUploadHistoryTable />
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" className="rounded-xl border-[#2D3748]" onClick={() => onOpenChange(false)} disabled={uploading}>Cancel</Button>
          <Button className="btn-glow rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]" onClick={handleUpload} disabled={!files.length || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 text-xs text-slate-400">{label}</Label>
      {children}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <FileIcon className="mt-0.5 h-4 w-4 text-[#7C3AED]" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

export function UploadSuccessBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-emerald-400">
      <CheckCircle2 className="h-4 w-4" />
      File uploaded successfully.
    </div>
  );
}
