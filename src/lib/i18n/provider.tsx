"use client";

import * as React from "react";
import type { Lang } from "./types";
import { DEFAULT_LANG, LANG_STORAGE_KEY } from "./config";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = React.createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(DEFAULT_LANG);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (stored === "zh" || stored === "en") setLangState(stored);
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(LANG_STORAGE_KEY, l);
  }, []);

  const toggle = React.useCallback(
    () => setLang(lang === "zh" ? "en" : "zh"),
    [lang, setLang],
  );

  React.useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const value = React.useMemo<LangContextValue>(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLangContext() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLangContext must be used within LangProvider");
  return ctx;
}
