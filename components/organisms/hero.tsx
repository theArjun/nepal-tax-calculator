"use client";

import { useI18n } from "@/i18n/provider";
import type { FY } from "@/lib/types";

export function Hero({ fy }: { fy: FY }) {
  const { t } = useI18n();
  return (
    <section className="hero">
      <div className="eyebrow">
        {t("hero.fyPrefix")} {fy.replace("-", "–")}
      </div>
      <h1>{t("hero.h1")}</h1>
      <p>{t("hero.desc")}</p>
    </section>
  );
}
