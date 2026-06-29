"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  defaultAILogSummary,
  formatNow,
  generateUploadId,
  initialDataUploadHistory,
  initialLogUploadHistory,
} from "@/lib/uploadData";
import type {
  AILogSummary,
  DataUploadRecord,
  LogUploadRecord,
  ToastType,
  UploadToastMessage,
} from "@/types/upload";

interface UploadContextValue {
  dataHistory: DataUploadRecord[];
  logHistory: LogUploadRecord[];
  toasts: UploadToastMessage[];
  addDataUpload: (record: Omit<DataUploadRecord, "id" | "uploadTime">) => string;
  addLogUpload: (record: Omit<LogUploadRecord, "id" | "uploadTime" | "processingTime">) => string;
  updateDataStatus: (id: string, status: DataUploadRecord["status"]) => void;
  updateLogStatus: (id: string, status: LogUploadRecord["status"], processingTime?: string) => void;
  removeDataUpload: (id: string) => void;
  removeLogUpload: (id: string) => void;
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
  lastAILogSummary: AILogSummary;
  setLastAILogSummary: (summary: AILogSummary) => void;
}

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [dataHistory, setDataHistory] = useState(initialDataUploadHistory);
  const [logHistory, setLogHistory] = useState(initialLogUploadHistory);
  const [toasts, setToasts] = useState<UploadToastMessage[]>([]);
  const [lastAILogSummary, setLastAILogSummary] = useState(defaultAILogSummary);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addDataUpload = useCallback((record: Omit<DataUploadRecord, "id" | "uploadTime">) => {
    const id = generateUploadId("D");
    setDataHistory((prev) => [{ ...record, id, uploadTime: formatNow() }, ...prev]);
    return id;
  }, []);

  const addLogUpload = useCallback((record: Omit<LogUploadRecord, "id" | "uploadTime" | "processingTime">) => {
    const id = generateUploadId("L");
    setLogHistory((prev) => [{ ...record, id, uploadTime: formatNow(), processingTime: "—" }, ...prev]);
    return id;
  }, []);

  const updateDataStatus = useCallback((id: string, status: DataUploadRecord["status"]) => {
    setDataHistory((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const updateLogStatus = useCallback((id: string, status: LogUploadRecord["status"], processingTime?: string) => {
    setLogHistory((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status, processingTime: processingTime ?? r.processingTime } : r
      )
    );
  }, []);

  const removeDataUpload = useCallback((id: string) => {
    setDataHistory((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const removeLogUpload = useCallback((id: string) => {
    setLogHistory((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      dataHistory,
      logHistory,
      toasts,
      addDataUpload,
      addLogUpload,
      updateDataStatus,
      updateLogStatus,
      removeDataUpload,
      removeLogUpload,
      showToast,
      dismissToast,
      lastAILogSummary,
      setLastAILogSummary,
    }),
    [
      dataHistory,
      logHistory,
      toasts,
      addDataUpload,
      addLogUpload,
      updateDataStatus,
      updateLogStatus,
      removeDataUpload,
      removeLogUpload,
      showToast,
      dismissToast,
      lastAILogSummary,
    ]
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export function useUpload() {
  const ctx = useContext(UploadContext);
  if (!ctx) throw new Error("useUpload must be used within UploadProvider");
  return ctx;
}
