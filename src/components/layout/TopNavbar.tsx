"use client";

import { useState } from "react";
import { Loader2, Menu, MoreHorizontal, Sparkles, UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadDataModal } from "@/components/upload/UploadDataModal";
import { UploadLogFileModal } from "@/components/upload/UploadLogFileModal";
import { GlobalSearch } from "@/components/platform/GlobalSearch";
import { DateRangePicker } from "@/components/platform/DateRangePicker";
import { NotificationCenter } from "@/components/platform/NotificationCenter";
import { ExportMenu } from "@/components/platform/ExportMenu";
import { ProfileMenu, ProfileBadgeMobile } from "@/components/platform/ProfileMenu";
import { usePrimaryAction } from "@/hooks/usePrimaryAction";
import { useUIStore } from "@/stores/uiStore";

interface TopNavbarProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  primaryActionLabel?: string;
  pageId?: string;
  contentRef?: React.RefObject<HTMLElement | null>;
}

export function TopNavbar({
  title = "Executive Dashboard",
  subtitle,
  searchPlaceholder,
  primaryActionLabel = "AI Optimize",
  pageId = "dashboard",
  contentRef,
}: TopNavbarProps) {
  const [dataOpen, setDataOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar);
  const { run, isRunning } = usePrimaryAction(pageId);

  return (
    <>
      <header className="dashboard-navbar sticky top-0 z-30 flex h-[72px] items-center gap-2 border-b border-[#2D3748]/60 bg-[#090B12]/80 px-3 backdrop-blur-xl sm:gap-3 sm:px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          onClick={toggleMobileSidebar}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0 shrink-0 lg:min-w-[180px]">
          <h1 className="truncate text-base font-semibold text-white sm:text-lg">{title}</h1>
          {subtitle && (
            <p className="hidden truncate text-[11px] text-slate-400 sm:block">{subtitle}</p>
          )}
        </div>

        <div className="relative mx-auto hidden min-w-0 flex-1 md:block">
          <GlobalSearch placeholder={searchPlaceholder} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
          <div className="md:hidden">
            <GlobalSearch placeholder={searchPlaceholder} compact className="w-[120px] sm:w-[160px]" />
          </div>

          <DateRangePicker />
          <NotificationCenter />

          <Button
            size="sm"
            onClick={() => setDataOpen(true)}
            className="btn-glow hidden rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-[11px] hover:from-[#6D28D9] hover:to-[#5B21B6] md:flex"
          >
            <UploadCloud className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden lg:inline">Upload Data</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLogOpen(true)}
            className="hidden rounded-xl border-[#7C3AED]/40 bg-[#111827]/50 text-[11px] text-white backdrop-blur-sm hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 xl:flex"
          >
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            Upload Log File
          </Button>

          <ProfileMenu />
          <ProfileBadgeMobile />

          {contentRef && <ExportMenu pageTitle={title} contentRef={contentRef} />}

          <Button
            size="sm"
            onClick={run}
            disabled={isRunning}
            className="btn-glow hidden rounded-xl bg-[#7C3AED] text-[11px] hover:bg-[#6D28D9] sm:flex"
            aria-busy={isRunning}
          >
            {isRunning ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            )}
            <span className="hidden md:inline">{primaryActionLabel}</span>
          </Button>

          <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#2D3748] text-slate-400 hover:bg-white/5 hover:text-white sm:hidden"
        aria-label="More actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-[#2D3748] bg-[#111827]">
              <DropdownMenuItem onClick={() => setDataOpen(true)}>Upload Data</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogOpen(true)}>Upload Log File</DropdownMenuItem>
              <DropdownMenuItem onClick={run} disabled={isRunning}>{primaryActionLabel}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setDataOpen(true)}
            className="h-9 w-9 rounded-xl border-[#7C3AED]/40 md:hidden"
            aria-label="Upload Data"
          >
            <UploadCloud className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <UploadDataModal open={dataOpen} onOpenChange={setDataOpen} />
      <UploadLogFileModal open={logOpen} onOpenChange={setLogOpen} />
    </>
  );
}
