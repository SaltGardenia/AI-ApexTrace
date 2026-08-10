"use client";

import * as React from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "theme";

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const stored = document.documentElement.classList.contains("dark") ? "dark" : "light";
  return stored;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") setThemeState(stored);
  }, []);

  const applyTheme = React.useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    root.style.colorScheme = t;
    localStorage.setItem(STORAGE_KEY, t);
    setThemeState(t);
  }, []);

  const setTheme = React.useCallback((t: Theme) => applyTheme(t), [applyTheme]);

  const toggleTheme = React.useCallback(
    () => applyTheme(document.documentElement.classList.contains("dark") ? "light" : "dark"),
    [applyTheme],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
