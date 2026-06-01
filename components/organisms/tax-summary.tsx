"use client";

import { useI18n } from "@/i18n/provider";
import { fmtNpr, fmtNum } from "@/lib/format";
import type { CalcResult } from "@/lib/types";
import { AnimatedNumber } from "@/components/atoms/animated-number";
import { SectionHead } from "@/components/molecules/section-head";
import { ChartIcon } from "@/components/atoms/icons";

const rowStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between" };

export function TaxSummary({
  result,
  trigger,
}: {
  result: CalcResult;
  trigger: number;
}) {
  const { t, lang } = useI18n();

  return (
    <>
      <SectionHead icon={<ChartIcon />} title={t("r.title")} meta={t("r.meta")} />

      <div className="kpi-grid">
        <div className="kpi">
          <div className="k-label">{t("r.totalTax")}</div>
          <div className="k-value tnum">
            <span className="npr-mark">{t("cur")}</span>
            <AnimatedNumber value={result.totalTax} trigger={trigger} format={fmtNum} />
          </div>
          <div className="k-sub">
            <span>{result.effectiveTaxRate.toFixed(2)}%</span> {t("r.effective")} ·{" "}
            <span>{t("r.onIncome", { amt: fmtNpr(result.income, lang) })}</span>
          </div>
        </div>

        <div className="kpi">
          <div className="k-label">{t("r.netAnnual")}</div>
          <div className="k-value tnum">
            <span className="npr-mark">{t("cur")}</span>
            <AnimatedNumber value={result.netIncome} trigger={trigger} format={fmtNum} />
          </div>
          <div className="k-sub">{t("r.afterTax")}</div>
        </div>

        <div className="kpi">
          <div className="k-label">{t("r.netMonthly")}</div>
          <div className="k-value tnum">{fmtNpr(result.monthlyNetIncome, lang)}</div>
          <div className="k-sub">{t("r.perMonth")}</div>
        </div>

        <div className="kpi">
          <div className="k-label">{t("r.breakdown")}</div>
          <div className="k-sub" style={{ marginTop: "0.55rem", ...rowStyle }}>
            <span>{t("r.incomeTax")}</span>
            <strong className="tnum" style={{ color: "var(--ink)" }}>
              {fmtNpr(result.tax, lang)}
            </strong>
          </div>
          <div className="k-sub" style={rowStyle}>
            <span>{t("r.ssfTax")}</span>
            <strong className="tnum" style={{ color: "var(--ink)" }}>
              {fmtNpr(result.ssfTax, lang)}
            </strong>
          </div>
          {result.medicalCredit > 0 ? (
            <div className="k-sub" style={rowStyle}>
              <span>{t("r.medCredit")}</span>
              <strong className="tnum" style={{ color: "var(--ink)" }}>
                {`−${fmtNpr(result.medicalCredit, lang)}`}
              </strong>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
