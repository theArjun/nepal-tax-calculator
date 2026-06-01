import type { FormState, Lang } from "./types";

export const DEFAULT_FORM: FormState = {
  fy: "2083-84",
  salary: "",
  period: "monthly",
  status: "individual",
  ssf: false,
  basicSalary: "",
  basicPeriod: "monthly",
  cit: false,
  citAmount: "",
  lifePremium: "",
  healthPremium: "",
  medicalExpenses: "",
};

/** Serialize form + language to a query string (defaults omitted), matching the original syncUrl. */
export function buildQuery(form: FormState, lang: Lang): string {
  const p = new URLSearchParams();
  if (form.fy === "2082-83") p.set("fy", "2082-83"); // 2083-84 is the default
  if (form.salary) p.set("salary", form.salary);
  if (form.period === "yearly") p.set("period", "y"); // monthly is the default
  if (form.status === "couple") p.set("status", "c"); // individual is the default
  if (form.ssf) p.set("ssf", "1");
  if (form.basicSalary) p.set("basic", form.basicSalary);
  if (form.basicPeriod === "yearly") p.set("basicP", "y"); // monthly is the default
  if (form.cit) {
    p.set("cit", "1");
    if (form.citAmount) p.set("citAmt", form.citAmount);
  }
  if (form.lifePremium) p.set("life", form.lifePremium);
  if (form.healthPremium) p.set("health", form.healthPremium);
  if (form.medicalExpenses) p.set("medical", form.medicalExpenses);
  if (lang === "ne") p.set("lang", "ne"); // English is the default
  return p.toString();
}

/** Parse a query string into a form + language (mirrors restoreFromUrl). Returns null if empty. */
export function parseQuery(
  search: string,
): { form: FormState; lang: Lang | null; hadParams: boolean } {
  const p = new URLSearchParams(search);
  const hadParams = [...p.keys()].length > 0;
  const form: FormState = {
    ...DEFAULT_FORM,
    fy: p.get("fy") === "2082-83" ? "2082-83" : "2083-84",
    salary: p.get("salary") ?? "",
    period: p.get("period") === "y" ? "yearly" : "monthly",
    status: p.get("status") === "c" ? "couple" : "individual",
    ssf: p.get("ssf") === "1",
    basicSalary: p.get("basic") ?? "",
    basicPeriod: p.get("basicP") === "y" ? "yearly" : "monthly",
    cit: p.get("cit") === "1",
    citAmount: p.get("citAmt") ?? "",
    lifePremium: p.get("life") ?? "",
    healthPremium: p.get("health") ?? "",
    medicalExpenses: p.get("medical") ?? "",
  };
  const lang: Lang | null = p.get("lang") === "ne" ? "ne" : p.has("lang") ? "en" : null;
  return { form, lang, hadParams };
}
