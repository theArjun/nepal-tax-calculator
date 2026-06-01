"use client";

import { useI18n } from "@/i18n/provider";
import { fmtNpr } from "@/lib/format";
import type { FormState, FY, Period, Status } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/molecules/field";
import { SegmentedControl } from "@/components/molecules/segmented-control";
import { AmountInput } from "@/components/molecules/amount-input";
import { SwitchField } from "@/components/molecules/switch-field";
import { SectionHead } from "@/components/molecules/section-head";
import { FormIcon, ArrowIcon } from "@/components/atoms/icons";

interface IncomeFormProps {
  form: FormState;
  showError: boolean;
  citRoom: number;
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  setFy: (fy: FY) => void;
  setCit: (checked: boolean) => void;
  useMaxCit: () => void;
  calculateNow: () => void;
}

export function IncomeForm({
  form,
  showError,
  citRoom,
  setField,
  setFy,
  setCit,
  useMaxCit,
  calculateNow,
}: IncomeFormProps) {
  const { t, lang } = useI18n();
  const showFiling = form.fy === "2082-83";

  return (
    <Card id="inputCard">
      <SectionHead icon={<FormIcon />} title={t("form.title")} meta={t("form.step")} />

      <div className="form-grid">
        <Field label={t("f.fy")} hint={t("f.fyHint")} col="col-12">
          <SegmentedControl<FY>
            name="fiscal-year"
            ariaLabel="Fiscal year"
            value={form.fy}
            onChange={setFy}
            options={[
              { value: "2083-84", label: "FY 2083-84" },
              { value: "2082-83", label: "FY 2082-83" },
            ]}
          />
        </Field>

        <Field
          label={t("f.salary")}
          hint={form.period === "yearly" ? t("f.salaryHintYearly") : t("f.salaryHintMonthly")}
          col="col-7"
        >
          <AmountInput
            id="salary"
            value={form.salary}
            onChange={(v) => setField("salary", v)}
            currencyLabel={t("cur")}
            ariaLabel="Salary amount in NPR"
            error={showError}
            onKeyDown={(e) => {
              if (e.key === "Enter") calculateNow();
            }}
          />
        </Field>

        <Field label={t("f.period")} hint={t("f.periodHint")} col="col-5">
          <SegmentedControl<Period>
            name="income-period"
            ariaLabel="Income period"
            value={form.period}
            onChange={(v) => setField("period", v)}
            options={[
              { value: "monthly", label: t("f.monthly") },
              { value: "yearly", label: t("f.yearly") },
            ]}
          />
        </Field>

        {showFiling ? (
          <Field label={t("f.filing")} hint={t("f.filingHint")} col="col-6">
            <SegmentedControl<Status>
              name="marital"
              ariaLabel="Filing status"
              value={form.status}
              onChange={(v) => setField("status", v)}
              options={[
                { value: "individual", label: t("f.individual") },
                { value: "couple", label: t("f.couple") },
              ]}
            />
          </Field>
        ) : null}

        <Field
          label={t("f.ssf")}
          hint={t("f.ssfHint")}
          col="col-6"
          style={showFiling ? undefined : { gridColumn: "1 / -1" }}
        >
          <div className="cit-panel">
            <SwitchField
              id="ssf"
              checked={form.ssf}
              onChange={(c) => setField("ssf", c)}
              labelText={t("f.ssfLabel")}
              stateText={form.ssf ? t("ssf.enrolled") : t("ssf.notEnrolled")}
            />
            {form.ssf ? (
              <div className="cit-controls stacked">
                <div className="basic-row">
                  <AmountInput
                    id="basicSalary"
                    value={form.basicSalary}
                    onChange={(v) => setField("basicSalary", v)}
                    currencyLabel={t("cur")}
                    ariaLabel="Basic salary"
                  />
                  <SegmentedControl<Period>
                    name="basic-period"
                    ariaLabel="Basic salary period"
                    className="basic-period"
                    value={form.basicPeriod}
                    onChange={(v) => setField("basicPeriod", v)}
                    options={[
                      { value: "monthly", label: t("f.monthly") },
                      { value: "yearly", label: t("f.yearly") },
                    ]}
                  />
                </div>
                <span className="hint">{t("f.basicHint")}</span>
              </div>
            ) : null}
          </div>
        </Field>

        <Field label={t("f.cit")} hint={t("f.citHint")} col="col-12">
          <div className="cit-panel">
            <SwitchField
              id="cit"
              checked={form.cit}
              onChange={setCit}
              labelText={t("f.citLabel")}
              stateText={form.cit ? t("cit.yes") : t("cit.no")}
            />
            {form.cit ? (
              <div className="cit-controls">
                <AmountInput
                  id="citAmount"
                  value={form.citAmount}
                  onChange={(v) => setField("citAmount", v)}
                  currencyLabel={t("cur")}
                  ariaLabel="Annual CIT contribution"
                />
                <Button variant="ghost" onClick={useMaxCit}>
                  {t("f.useMax")} (<strong>{fmtNpr(citRoom, lang)}</strong>)
                </Button>
              </div>
            ) : null}
          </div>
        </Field>

        <div className="form-subhead">
          <span className="title">{t("f.insMed")}</span>
          <span className="optional">{t("f.insMedHint")}</span>
        </div>

        <Field label={t("f.life")} hint={t("f.lifeHint")} col="col-4">
          <AmountInput
            id="lifePremium"
            value={form.lifePremium}
            onChange={(v) => setField("lifePremium", v)}
            currencyLabel={t("cur")}
            ariaLabel="Annual life insurance premium"
          />
        </Field>

        <Field label={t("f.health")} hint={t("f.healthHint")} col="col-4">
          <AmountInput
            id="healthPremium"
            value={form.healthPremium}
            onChange={(v) => setField("healthPremium", v)}
            currencyLabel={t("cur")}
            ariaLabel="Annual health insurance premium"
          />
        </Field>

        <Field label={t("f.medical")} hint={t("f.medicalHint")} col="col-4">
          <AmountInput
            id="medicalExpenses"
            value={form.medicalExpenses}
            onChange={(v) => setField("medicalExpenses", v)}
            currencyLabel={t("cur")}
            ariaLabel="Annual medical expenses"
          />
        </Field>
      </div>

      <div className="calc-row">
        <p className="calc-note">{t("f.calcNote")}</p>
        <Button onClick={calculateNow}>
          {t("f.calcBtn")}
          <ArrowIcon />
        </Button>
      </div>
    </Card>
  );
}
