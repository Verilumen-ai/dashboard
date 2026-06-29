"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountPresetsPanel } from "@/components/settings/AccountPresetsPanel";
import { SettingsToast } from "@/components/settings/SettingsToast";
import { ThemeSettingsPanel } from "@/components/settings/ThemeSettingsPanel";
import { defaultAccountPreset, type AccountPreset } from "@/types/theme";

const ACCOUNT_STORAGE_KEY = "ate-account-preset";

export default function SettingsPage() {
  const [account, setAccount] = useState<AccountPreset>(defaultAccountPreset);
  const [savedAccount, setSavedAccount] = useState<AccountPreset>(defaultAccountPreset);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (stored) {
        const parsed = { ...defaultAccountPreset, ...JSON.parse(stored) };
        setAccount(parsed);
        setSavedAccount(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
    setSavedAccount(account);
    setIsSaving(false);
    setSaveSuccess(true);
    setToastVisible(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setToastVisible(false);
    }, 3000);
  }, [account]);

  const handleCancel = () => setAccount(savedAccount);

  return (
    <DashboardLayout title="Settings" hideQuickFilters>
      <div className="settings-page mx-auto max-w-[1600px]">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-[#2D3748]/60 pb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="mt-2 text-base text-slate-400">
            Manage workspace appearance and account preferences.
          </p>
        </motion.header>

        {/* 60 / 40 Split */}
        <div className="settings-split">
          <ThemeSettingsPanel />
          <AccountPresetsPanel
            account={account}
            onChange={setAccount}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
            saveSuccess={saveSuccess}
          />
        </div>
      </div>

      <SettingsToast
        message="Settings updated successfully"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </DashboardLayout>
  );
}
