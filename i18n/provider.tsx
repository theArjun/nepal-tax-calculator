"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Lang } from "@/lib/types";
import { en, type I18nKey } from "./en";
import { ne } from "./ne";

const DICTS: Record<Lang, Record<I18nKey, string>> = { en, ne };

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey, vars?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(s: string, vars?: Record<string, string>): string {
  if (!vars) return s;
  let out = s;
  for (const k of Object.keys(vars)) {
    out = out.split(`{${k}}`).join(vars[k]);
  }
  return out;
}

export function I18nProvider({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Lang restoration (URL ?lang > localStorage > 'en') is centralised in the calculator
  // hook so the URL can win; here we just keep <html lang> in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    const next: Lang = l === "ne" ? "ne" : "en";
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: I18nKey, vars?: Record<string, string>) =>
      interpolate(DICTS[lang][key] ?? en[key] ?? key, vars),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
