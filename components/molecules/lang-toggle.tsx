"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

// EN / नेपाली switch in the app bar.
export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={cn(lang === "en" && "active")}
        aria-label="English"
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={cn(lang === "ne" && "active")}
        aria-label="Nepali"
        lang="ne"
        onClick={() => setLang("ne")}
      >
        नेपाली
      </button>
    </div>
  );
}
