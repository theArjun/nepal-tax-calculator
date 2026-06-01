"use client";

import { useI18n } from "@/i18n/provider";
import type { I18nKey } from "@/i18n/en";
import type { RecommendationKey } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHead } from "@/components/molecules/section-head";
import { Tip } from "@/components/molecules/tip";
import { BulbIcon, CheckIcon } from "@/components/atoms/icons";

const COL1 = [1, 2, 3, 4, 5];
const COL2 = [6, 7, 8, 9];

export function TaxInsights({
  recoKey,
  recoVars,
}: {
  recoKey: RecommendationKey | null;
  recoVars?: Record<string, string>;
}) {
  const { t } = useI18n();

  return (
    <>
      <SectionHead icon={<BulbIcon />} title={t("ins.title")} meta={t("ins.meta")} />
      <Card>
        <div className="insight-callout">
          <div className="c-head">
            <CheckIcon />
            <span>{t("ins.reco")}</span>
          </div>
          <p>{recoKey ? t(recoKey, recoVars) : t("ins.recoDefault")}</p>
        </div>

        <div className="tips-cols">
          <div className="tips-col">
            <h3>{t("ins.col1")}</h3>
            {COL1.map((n) => (
              <Tip
                key={n}
                num={n}
                title={t(`tip.${n}t` as I18nKey)}
                body={t(`tip.${n}b` as I18nKey)}
              />
            ))}
          </div>
          <div className="tips-col">
            <h3>{t("ins.col2")}</h3>
            {COL2.map((n) => (
              <Tip
                key={n}
                num={n}
                title={t(`tip.${n}t` as I18nKey)}
                body={t(`tip.${n}b` as I18nKey)}
              />
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
