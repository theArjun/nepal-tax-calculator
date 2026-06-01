"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { fmtNum } from "@/lib/format";
import type { CalcResult } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Gauge } from "@/components/molecules/gauge";

export function StrataChart({
  result,
  trigger,
}: {
  result: CalcResult;
  trigger: number;
}) {
  const { t } = useI18n();
  const maxAmount = Math.max(...result.taxBySlabs.map((s) => s.amount), 1);

  // Bars grow from 0 to their target height on each calculation (CSS handles the easing).
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    setGrown(false);
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, [trigger]);

  return (
    <Card>
      <div className="subhead">
        <h3>{t("str.title")}</h3>
        <span className="meta">{t("str.meta")}</span>
      </div>
      <p className="strata-note">{t("str.note")}</p>
      <div className="strata-grid">
        {result.taxBySlabs.map((slab) => {
          const heightPct =
            slab.amount > 0 ? Math.max(2, (slab.amount / maxAmount) * 100) : 2;
          return (
            <div
              key={slab.i}
              className={`stratum${slab.amount === 0 ? " is-empty" : ""}`}
              data-rate={slab.rate}
            >
              <div className="stratum-rate">{slab.rate}%</div>
              <div
                className="stratum-bar"
                style={{ height: grown ? `${heightPct}%` : "0%" }}
              />
              <div className="stratum-amount">
                {slab.amount > 0 ? fmtNum(slab.amount) : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <Gauge label={t("str.gauge")} value={result.effectiveTaxRate} trigger={trigger} />
    </Card>
  );
}
