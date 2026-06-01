"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { I18nProvider } from "@/i18n/provider";
import { useTaxCalculator } from "@/hooks/use-tax-calculator";
import { AppBar } from "@/components/organisms/app-bar";
import { Hero } from "@/components/organisms/hero";
import { IncomeForm } from "@/components/organisms/income-form";
import { TaxSummary } from "@/components/organisms/tax-summary";
import { BudgetComparison } from "@/components/organisms/budget-comparison";
import { TaxOptimization } from "@/components/organisms/tax-optimization";
import { SlabLedger } from "@/components/organisms/slab-ledger";
import { StrataChart } from "@/components/organisms/strata-chart";
import { TaxInsights } from "@/components/organisms/tax-insights";
import { Faq } from "@/components/organisms/faq";
import { Footer } from "@/components/organisms/footer";

function CalculatorInner() {
  const c = useTaxCalculator();
  const { form, result, calcTrigger, suppressScroll } = c;

  // Scroll to the results after a calculation, unless suppressed (URL restore / lang switch).
  useEffect(() => {
    if (!result) return;
    if (suppressScroll.current) {
      suppressScroll.current = false;
      return;
    }
    const id = setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcTrigger]);

  return (
    <>
      <AppBar fy={form.fy} />
      <main className="page">
        <Hero fy={form.fy} />

        <IncomeForm
          form={form}
          showError={c.showError}
          citRoom={c.citRoom}
          setField={c.setField}
          setFy={c.setFy}
          setCit={c.setCit}
          useMaxCit={c.useMaxCit}
          calculateNow={c.calculateNow}
        />

        <section
          className={cn("section results", result && "is-visible")}
          id="results"
          aria-live="polite"
        >
          {result ? (
            <>
              <TaxSummary result={result} trigger={calcTrigger} />
              <BudgetComparison cmp={result.comparison} />
              <TaxOptimization opt={result.optimization} trigger={calcTrigger} />
              <SlabLedger result={result} />
              <StrataChart result={result} trigger={calcTrigger} />
            </>
          ) : null}
        </section>

        <section className={cn("section insights", result && "is-visible")} id="insights">
          <TaxInsights
            recoKey={result?.recommendationKey ?? null}
            recoVars={result?.recommendationVars}
          />
        </section>

        <Faq />
        <Footer />
      </main>
    </>
  );
}

export function CalculatorApp() {
  // Register the service worker (PWA / offline). No-op during SSR; works on https.
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      });
    }
  }, []);

  return (
    <I18nProvider>
      <CalculatorInner />
    </I18nProvider>
  );
}
