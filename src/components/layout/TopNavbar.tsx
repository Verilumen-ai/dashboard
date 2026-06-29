"use client";

import { Bell, Calendar, Download, Search, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  return (
    <header className="dashboard-navbar sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-[#2D3748]/60 bg-[#090B12]/80 px-6 backdrop-blur-xl">
      <div className="min-w-[180px] shrink-0">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
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

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-10 w-10 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white sm:flex"
        >
          <Calendar className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <div className="hidden items-center gap-2.5 rounded-xl border border-[#2D3748]/60 bg-[#111827]/50 px-3 py-1.5 sm:flex">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#7C3AED] text-xs text-white">
              AJ
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-white">Alex Johnson</p>
            <p className="text-[11px] text-slate-400">Admin</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="hidden rounded-xl border-[#2D3748] text-xs hover:border-[#7C3AED] lg:flex"
        >
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Export Report
        </Button>

        <Button
          size="sm"
          className="btn-glow rounded-xl bg-[#7C3AED] text-xs hover:bg-[#6D28D9]"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          <span className="hidden sm:inline">{primaryActionLabel}</span>
        </Button>
      </div>
    </header>
  );
}
