"use client";

import { useI18n } from "@/i18n/provider";
import { LogoIcon } from "@/components/atoms/icons";
import { LangToggle } from "@/components/molecules/lang-toggle";
import type { FY } from "@/lib/types";

export function AppBar({ fy }: { fy: FY }) {
  const { t } = useI18n();
  return (
    <header className="appbar">
      <div className="appbar-inner">
        <div className="brand">
          <span className="logo" aria-hidden="true">
            <LogoIcon />
          </span>
          <div>
            <div className="name">{t("app.name")}</div>
            <div className="sub">{t("app.sub")}</div>
          </div>
        </div>
        <div className="appbar-right">
          <LangToggle />
          <span className="fy-pill">FY {fy.replace("-", "–")}</span>
        </div>
      </div>
    </header>
  );
}
