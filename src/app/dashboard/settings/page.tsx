"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountPresetsPanel } from "@/components/settings/AccountPresetsPanel";
import { SettingsToast } from "@/components/settings/SettingsToast";
import { ThemeSettingsPanel } from "@/components/settings/ThemeSettingsPanel";
import { useUserStore } from "@/stores/userStore";
import { defaultAccountPreset, type AccountPreset } from "@/types/theme";

export default function SettingsPage() {
  const storedProfile = useUserStore((s) => s.profile);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const [account, setAccount] = useState<AccountPreset>(storedProfile);
  const [savedAccount, setSavedAccount] = useState<AccountPreset>(storedProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setAccount(storedProfile);
    setSavedAccount(storedProfile);
  }, [storedProfile]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise((r) => setTimeout(r, 1200));
    updateProfile(account);
    setSavedAccount(account);
    setIsSaving(false);
    setSaveSuccess(true);
    setToastVisible(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setToastVisible(false);
    }, 3000);
  }, [account, updateProfile]);

  const handleCancel = () => setAccount(savedAccount);

  return (
    <DashboardLayout title="Settings" hideQuickFilters pageId="settings">
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
