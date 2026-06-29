"use client";

import { useState } from "react";
import { Bell, Calendar, Download, FileText, Search, Sparkles, UploadCloud } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadDataModal } from "@/components/upload/UploadDataModal";
import { UploadLogFileModal } from "@/components/upload/UploadLogFileModal";

interface TopNavbarProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  primaryActionLabel?: string;
}

export function TopNavbar({
  title = "Executive Dashboard",
  subtitle,
  searchPlaceholder = "Search patterns, lots, wafers, equipment...",
  primaryActionLabel = "AI Optimize",
}: TopNavbarProps) {
  const [dataOpen, setDataOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  return (
    <>
      <header className="dashboard-navbar sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-[#2D3748]/60 bg-[#090B12]/80 px-4 backdrop-blur-xl sm:gap-4 sm:px-6">
        <div className="min-w-[140px] shrink-0 lg:min-w-[180px]">
          <h1 className="text-base font-semibold text-white sm:text-lg">{title}</h1>
          {subtitle && (
            <p className="hidden text-[11px] text-slate-400 sm:block">{subtitle}</p>
          )}
        </div>

        <div className="relative mx-auto hidden w-full max-w-xl md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder={searchPlaceholder}
            className="h-11 rounded-xl border-[#2D3748] bg-[#111827]/80 pl-11 text-sm backdrop-blur-sm focus-visible:border-[#7C3AED] focus-visible:ring-[#7C3AED]/30"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden h-9 w-9 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white sm:flex sm:h-10 sm:w-10">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white sm:h-10 sm:w-10">
            <Bell className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            onClick={() => setDataOpen(true)}
            className="btn-glow hidden rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-[11px] hover:from-[#6D28D9] hover:to-[#5B21B6] sm:flex"
          >
            <UploadCloud className="mr-1.5 h-3.5 w-3.5" />
            Upload Data
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLogOpen(true)}
            className="hidden rounded-xl border-[#7C3AED]/40 bg-[#111827]/50 text-[11px] text-white backdrop-blur-sm hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 sm:flex"
          >
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            Upload Log File
          </Button>

          <div className="hidden items-center gap-2 rounded-xl border border-[#2D3748]/60 bg-[#111827]/50 px-2 py-1.5 lg:flex lg:gap-2.5 lg:px-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#7C3AED] text-xs text-white">AJ</AvatarFallback>
            </Avatar>
            <div className="hidden xl:block">
              <p className="text-sm font-medium text-white">Alex Johnson</p>
              <p className="text-[11px] text-slate-400">Admin</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="hidden rounded-xl border-[#2D3748] text-[11px] hover:border-[#7C3AED] lg:flex">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Report
          </Button>

          <Button size="sm" className="btn-glow rounded-xl bg-[#7C3AED] text-[11px] hover:bg-[#6D28D9]">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden sm:inline">{primaryActionLabel}</span>
          </Button>

          <Button size="icon" variant="outline" onClick={() => setDataOpen(true)} className="h-9 w-9 rounded-xl border-[#7C3AED]/40 sm:hidden" aria-label="Upload Data">
            <UploadCloud className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <UploadDataModal open={dataOpen} onOpenChange={setDataOpen} />
      <UploadLogFileModal open={logOpen} onOpenChange={setLogOpen} />
    </>
  );
}
