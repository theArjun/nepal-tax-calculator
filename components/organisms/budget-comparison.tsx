"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import type { I18nKey } from "@/i18n/en";
import { fmtNpr, fmtNum } from "@/lib/format";
import type { ComparisonResult } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BudgetComparison({ cmp }: { cmp: ComparisonResult }) {
  const { t, lang } = useI18n();

  const column = (
    yearLabel: string,
    active: boolean,
    tax: number,
    net: number,
    rate: number,
  ) => (
    <div className={cn("cmp-col", active && "is-active")}>
      <div className="cmp-year">
        {yearLabel}
        {active ? <span className="tag">{t("cmp.selected")}</span> : null}
      </div>
      <div className="cmp-tax tnum">
        <span className="npr-mark">{t("cur")}</span> <span>{fmtNum(tax)}</span>
      </div>
      <div className="cmp-row">
        <span>{t("cmp.net")}</span>
        <strong className="tnum">{fmtNpr(net, lang)}</strong>
      </div>
      <div className="cmp-row">
        <span>{t("cmp.rate")}</span>
        <strong>{rate.toFixed(2)}%</strong>
      </div>
    </div>
  );

  return (
    <Card className="cmp-card" style={{ marginBottom: "1.5rem" }}>
      <div className="subhead">
        <h3>{t("cmp.title")}</h3>
        <Badge variant="meta">FY 2082-83 vs 2083-84</Badge>
      </div>
      <div className="cmp-banner">
        {t(`cmp.${cmp.bannerKey}` as I18nKey, cmp.bannerVars)}
      </div>
      <div className="cmp-grid">
        {column("FY 2082-83", cmp.active82, cmp.tax82, cmp.net82, cmp.rate82)}
        {column("FY 2083-84", cmp.active83, cmp.tax83, cmp.net83, cmp.rate83)}
      </div>
    </Card>
  );
}
