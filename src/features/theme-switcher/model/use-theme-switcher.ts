"use client";

import { useTheme } from 'next-themes';

export function useThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    isDark,
    toggleTheme,
  };
}
