"use client";

import { useI18n } from "@/i18n/provider";
import { SectionHead } from "@/components/molecules/section-head";
import { FaqItem } from "@/components/molecules/faq-item";
import { QuestionIcon } from "@/components/atoms/icons";

export function Faq() {
  const { t } = useI18n();

  return (
    <section className="faq">
      <SectionHead icon={<QuestionIcon />} title={t("faq.title")} />

      <FaqItem question={t("faq.q1")}>
        <p>{t("faq.a1")}</p>
        <table>
          <thead>
            <tr>
              <th>{t("faq.thIncome")}</th>
              <th>{t("faq.thRate")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Up to 10,00,000</td>
              <td>1%</td>
            </tr>
            <tr>
              <td>10,00,001 – 15,00,000</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>15,00,001 – 25,00,000</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>25,00,001 – 40,00,000</td>
              <td>27%</td>
            </tr>
            <tr>
              <td>Above 40,00,000</td>
              <td>29%</td>
            </tr>
          </tbody>
        </table>
      </FaqItem>

      <FaqItem question={t("faq.q2")}>
        <p>{t("faq.a2")}</p>
      </FaqItem>
      <FaqItem question={t("faq.q3")}>
        <p>{t("faq.a3")}</p>
      </FaqItem>
      <FaqItem question={t("faq.q4")}>
        <p>{t("faq.a4")}</p>
      </FaqItem>
      <FaqItem question={t("faq.q5")}>
        <p>{t("faq.a5")}</p>
      </FaqItem>
    </section>
  );
}
