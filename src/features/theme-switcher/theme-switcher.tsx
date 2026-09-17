"use client";

import {
  MoonIcon,
  SunIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Переключить тему"
      title="Переключить тему"
      onClick={() => {
        const isDark =
          document.documentElement.classList.contains("dark");

        setTheme(isDark ? "light" : "dark");
      }}
      className="
        fixed right-4 bottom-4 z-50
        flex size-12 items-center justify-center
        rounded-full border border-border
        bg-background text-foreground
        shadow-md transition-colors duration-300
        hover:bg-muted
      "
    >
      <SunIcon
        size={20}
        className="hidden dark:block"
      />

      <MoonIcon
        size={20}
        className="block dark:hidden"
      />
    </button>
  );
}