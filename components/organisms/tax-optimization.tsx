"use client";

import { useI18n } from "@/i18n/provider";
import { fmtNpr, fmtNum } from "@/lib/format";
import type { I18nKey } from "@/i18n/en";
import type { OptResult } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/atoms/animated-number";

export function TaxOptimization({
  opt,
  trigger,
}: {
  opt: OptResult;
  trigger: number;
}) {
  const { t, lang } = useI18n();
  const npr = (n: number) => fmtNpr(n, lang);

  return (
    <Card className="opt-card" style={{ marginBottom: "1.5rem" }}>
      <div className="subhead">
        <h3>{t("opt.title")}</h3>
        <span className="meta">{t(`opt.${opt.statusKey}` as I18nKey)}</span>
      </div>

      <div className="opt-grid">
        <div>
          <div className="k-label">{t(`opt.${opt.savingLabelKey}` as I18nKey)}</div>
          <div className="opt-saving tnum">
            <span className="npr-mark">{t("cur")}</span>
            <AnimatedNumber value={opt.saving} trigger={trigger} format={fmtNum} />
          </div>
          <p className="opt-text">{t(`opt.${opt.textKey}` as I18nKey, opt.textVars)}</p>
        </div>

        <div className="opt-stats">
          <table className="opt-table">
            <thead>
              <tr>
                <th>{t("opt.item")}</th>
                <th>{t("opt.perYear")}</th>
                <th>{t("opt.perMonth")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="highlight">
                <td>{t("opt.recContrib")}</td>
                <td className="num">{npr(opt.citCap)}</td>
                <td className="num">{npr(opt.citCap / 12)}</td>
              </tr>
            </tbody>
            {opt.ssfActive ? (
              <tbody>
                <tr>
                  <td>{t("opt.ssfYouPay")}</td>
                  <td className="num">{npr(opt.ssfEmployee)}</td>
                  <td className="num">{npr(opt.ssfEmployee / 12)}</td>
                </tr>
                <tr>
                  <td>{t("opt.ssfCompanyPays")}</td>
                  <td className="num">{npr(opt.ssfEmployer)}</td>
                  <td className="num">{npr(opt.ssfEmployer / 12)}</td>
                </tr>
              </tbody>
            ) : null}
            <tbody>
              <tr>
                <td>{t(opt.ssfActive ? "opt.citTopup" : "opt.deposit")}</td>
                <td className="num">{npr(opt.deposit)}</td>
                <td className="num">{npr(opt.deposit / 12)}</td>
              </tr>
              <tr>
                <td>{t("opt.taxable")}</td>
                <td className="num">{npr(opt.taxable)}</td>
                <td className="num">{npr(opt.taxable / 12)}</td>
              </tr>
              <tr>
                <td>{t("opt.without")}</td>
                <td className="num">{npr(opt.baselineTax)}</td>
                <td className="num">{npr(opt.baselineTax / 12)}</td>
              </tr>
              <tr>
                <td>{t("opt.with")}</td>
                <td className="num">{npr(opt.taxWith)}</td>
                <td className="num">{npr(opt.taxWith / 12)}</td>
              </tr>
              <tr className="highlight">
                <td>{t("opt.take")}</td>
                <td className="num">{npr(opt.cashYear)}</td>
                <td className="num">{npr(opt.cashYear / 12)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p
        className="opt-note"
        dangerouslySetInnerHTML={{ __html: t("opt.note") }}
      />
    </Card>
  );
}
