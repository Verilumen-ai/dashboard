"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultThemeConfig, type ThemeConfig } from "@/types/theme";

const STORAGE_KEY = "ate-theme-config";

interface ThemeContextValue {
  theme: ThemeConfig;
  updateTheme: (partial: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  accentHex: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const accentMap = {
  purple: "#7C3AED",
  blue: "#2563EB",
  emerald: "#059669",
  orange: "#EA580C",
  red: "#DC2626",
} as const;

const fontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
} as const;

const radiusMap = {
  small: "12px",
  medium: "20px",
  large: "24px",
} as const;

const sidebarWidthMap = {
  compact: "240px",
  standard: "280px",
  expanded: "320px",
} as const;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultThemeConfig);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTheme({ ...defaultThemeConfig, ...JSON.parse(stored) });
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));

    const accent = accentMap[theme.primaryColor];
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--primary", accent);
    root.style.setProperty("--ring", accent);
    root.style.setProperty("--font-size-base", fontSizeMap[theme.fontSize]);
    root.style.setProperty("--card-radius", radiusMap[theme.borderRadius]);
    root.style.setProperty("--sidebar-width", sidebarWidthMap[theme.sidebarWidth]);
    root.dataset.cardStyle = theme.cardStyle;
    root.dataset.compact = String(theme.compactMode || theme.density === "compact");
    root.dataset.animations = String(theme.animations);
    root.dataset.sidebarStyle = theme.sidebarStyle;
    root.dataset.density = theme.density;

    if (theme.appearance === "light") {
      root.classList.remove("dark");
    } else if (theme.appearance === "dark") {
      root.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  }, [theme, mounted]);

  const updateTheme = useCallback((partial: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(defaultThemeConfig);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const accentHex = accentMap[theme.primaryColor];

  const value = useMemo(
    () => ({ theme, updateTheme, resetTheme, accentHex }),
    [theme, updateTheme, resetTheme, accentHex]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
