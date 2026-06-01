"use client";

import { useI18n } from "@/i18n/provider";
import { fmtNpr } from "@/lib/format";
import type { CashFlow } from "@/lib/types";
import { Card } from "@/components/ui/card";

// Take-home waterfall: gross → minus SSF → minus CIT → minus tax → cash in hand (monthly + yearly).
export function CashInHand({ cash }: { cash: CashFlow }) {
  const { t, lang } = useI18n();
  const npr = (n: number) => fmtNpr(n, lang);

  const row = (label: string, yearly: number, sign: "" | "−", highlight = false) => (
    <tr className={highlight ? "highlight" : undefined}>
      <td>{label}</td>
      <td className="num">
        {sign}
        {npr(yearly / 12)}
      </td>
      <td className="num">
        {sign}
        {npr(yearly)}
      </td>
    </tr>
  );

  return (
    <Card style={{ marginBottom: "1.5rem" }}>
      <div className="subhead">
        <h3>{t("cih.title")}</h3>
        <span className="meta">{t("cih.meta")}</span>
      </div>
      <div className="opt-stats">
        <table className="opt-table">
          <thead>
            <tr>
              <th>{t("opt.item")}</th>
              <th>{t("opt.perMonth")}</th>
              <th>{t("opt.perYear")}</th>
            </tr>
          </thead>
          <tbody>
            {row(t("cih.gross"), cash.gross, "")}
            {cash.ssf > 0 ? row(t("cih.ssf"), cash.ssf, "−") : null}
            {cash.citContribution > 0 ? row(t("cih.cit"), cash.citContribution, "−") : null}
            {row(t("cih.tax"), cash.tax, "−")}
            {row(t("cih.final"), cash.cashInHand, "", true)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
