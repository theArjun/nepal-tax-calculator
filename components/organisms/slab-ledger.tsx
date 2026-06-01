"use client";

import { useI18n } from "@/i18n/provider";
import { fmtNpr } from "@/lib/format";
import type { I18nKey } from "@/i18n/en";
import type { CalcResult } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RateChip } from "@/components/atoms/rate-chip";
import { PrintIcon } from "@/components/atoms/icons";

export function SlabLedger({ result }: { result: CalcResult }) {
  const { t, lang } = useI18n();
  const npr = (n: number) => fmtNpr(n, lang);
  const firstSlab = result.brackets[0].upTo;

  return (
    <Card style={{ marginBottom: "1.5rem" }}>
      <div className="subhead">
        <h3>{t("led.title")}</h3>
        <Button
          variant="ghost"
          id="printBtn"
          onClick={() => window.print()}
        >
          <PrintIcon />
          <span>{t("led.print")}</span>
        </Button>
      </div>
      <div className="table-wrap">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>{t("led.rate")}</th>
              <th>{t("led.slab")}</th>
              <th className="num">{t("led.amount")}</th>
              <th className="num">{t("led.tax")}</th>
            </tr>
          </thead>
          <tbody>
            {result.taxBySlabs
              .filter((slab) => !(slab.amount === 0 && slab.rate !== 0))
              .map((slab) => (
                <tr key={slab.i}>
                  <td>
                    <RateChip rate={slab.rate}>{slab.rate}%</RateChip>
                  </td>
                  <td>{t(`slab.${slab.i}` as I18nKey)}</td>
                  <td className="num">{npr(slab.amount)}</td>
                  <td className="num">{npr(slab.tax)}</td>
                </tr>
              ))}
            {result.ssfTax > 0 ? (
              <tr>
                <td>
                  <RateChip rate="ssf">1%</RateChip>
                </td>
                <td>{t("r.ssfTax")}</td>
                <td className="num">{npr(Math.min(firstSlab, result.taxableIncome))}</td>
                <td className="num">{npr(result.ssfTax)}</td>
              </tr>
            ) : null}
            {result.medicalCredit > 0 ? (
              <tr>
                <td>
                  <RateChip rate="credit">{t("led.credit")}</RateChip>
                </td>
                <td>{t("r.medCredit")}</td>
                <td className="num">—</td>
                <td className="num">−{npr(result.medicalCredit)}</td>
              </tr>
            ) : null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>{t("led.total")}</td>
              <td className="num">{npr(result.totalTax)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
