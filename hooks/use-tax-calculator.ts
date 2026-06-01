"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { calculate, citRoomFor, annualIncome } from "@/lib/tax";
import type { CalcResult, FormState } from "@/lib/types";
import { DEFAULT_FORM, buildQuery, parseQuery } from "@/lib/url-state";

export function useTaxCalculator() {
  const { lang, setLang } = useI18n();
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showError, setShowError] = useState(false);
  const [calcTrigger, setCalcTrigger] = useState(0);
  const hasCalculated = useRef(false);
  const ready = useRef(false);
  const suppressScroll = useRef(false);
  const errorTimer = useRef<ReturnType<typeof setTimeout>>();

  // The CIT top-up room drives the "Use max" hint and default amount.
  const citRoom = citRoomFor(
    annualIncome(form.salary, form.period === "monthly"),
    form.ssf,
    form.basicSalary,
    form.basicPeriod === "monthly",
  );

  const runCalculate = useCallback(
    (f: FormState, l: typeof lang, suppress: boolean) => {
      const r = calculate(f, l);
      if (!r) {
        setShowError(true);
        clearTimeout(errorTimer.current);
        errorTimer.current = setTimeout(() => setShowError(false), 1400);
        return;
      }
      hasCalculated.current = true;
      suppressScroll.current = suppress;
      setResult(r);
      setCalcTrigger((n) => n + 1);
    },
    [],
  );

  // Restore from URL on mount; auto-calculate if a salary is present.
  useEffect(() => {
    const { form: restored, lang: urlLang, hadParams } = parseQuery(
      window.location.search,
    );
    let storedLang: string | null = null;
    try {
      storedLang = localStorage.getItem("lang");
    } catch {
      /* ignore */
    }
    const initialLang =
      urlLang ?? (storedLang === "ne" || storedLang === "en" ? storedLang : null);
    if (initialLang) setLang(initialLang);

    if (hadParams) {
      setForm(restored);
      if ((parseFloat(restored.salary) || 0) > 0) {
        runCalculate(restored, initialLang ?? lang, true);
      }
    }
    ready.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL in sync as the form or language changes.
  useEffect(() => {
    if (!ready.current) return;
    const qs = buildQuery(form, lang);
    try {
      window.history.replaceState(
        null,
        "",
        qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
      );
    } catch {
      /* history API may be unavailable — ignore */
    }
  }, [form, lang]);

  // Re-localise the results when the language changes (matches the original re-click).
  useEffect(() => {
    if (!ready.current || !hasCalculated.current) return;
    runCalculate(form, lang, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const setField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        // Selecting FY 2083-84 collapses the couple concept to individual.
        if (key === "fy" && value === "2083-84") next.status = "individual";
        return next;
      });
    },
    [],
  );

  const calculateNow = useCallback(() => {
    runCalculate(form, lang, false);
  }, [form, lang, runCalculate]);

  // Changing FY re-calculates immediately whenever a salary is present (original behaviour).
  const setFy = useCallback(
    (fy: FormState["fy"]) => {
      const next: FormState = { ...form, fy };
      if (fy === "2083-84") next.status = "individual";
      setForm(next);
      if ((parseFloat(form.salary) || 0) > 0) {
        runCalculate(next, lang, true);
      }
    },
    [form, lang, runCalculate],
  );

  const useMaxCit = useCallback(() => {
    setForm((prev) => ({ ...prev, citAmount: String(Math.round(citRoom)) }));
  }, [citRoom]);

  // Enabling CIT prefills the top-up room when the amount is empty (original behaviour).
  const setCit = useCallback(
    (checked: boolean) => {
      setForm((prev) => {
        const next = { ...prev, cit: checked };
        if (checked && !(parseFloat(prev.citAmount) || 0)) {
          next.citAmount = String(Math.round(citRoom));
        }
        return next;
      });
    },
    [citRoom],
  );

  return {
    form,
    result,
    showError,
    citRoom,
    calcTrigger,
    suppressScroll,
    lang,
    setField,
    setFy,
    setCit,
    useMaxCit,
    calculateNow,
  };
}
