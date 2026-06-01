import { fmtNpr } from "./format";
import type {
  Bracket,
  CalcResult,
  ComparisonResult,
  ComputeResult,
  FormState,
  FY,
  Lang,
  OptResult,
  RecoItem,
  Status,
  TaxAfterResult,
  SsfContribution,
} from "./types";

// Tax slabs by fiscal year. Each bracket is { upTo (cumulative ceiling), rate% }.
// The first bracket (rate 0) is the tax-free band that still carries the 1% social
// security tax (waived for SSF participants).
export const RATES: Record<FY, { individual: Bracket[]; couple: Bracket[] }> = {
  "2082-83": {
    individual: [
      { upTo: 500000, rate: 0 },
      { upTo: 700000, rate: 10 },
      { upTo: 1000000, rate: 20 },
      { upTo: 2000000, rate: 30 },
      { upTo: 4000000, rate: 36 },
      { upTo: Infinity, rate: 39 },
    ],
    couple: [
      { upTo: 600000, rate: 0 },
      { upTo: 800000, rate: 10 },
      { upTo: 1100000, rate: 20 },
      { upTo: 2000000, rate: 30 },
      { upTo: 4000000, rate: 36 },
      { upTo: Infinity, rate: 39 },
    ],
  },
  "2083-84": {
    // Budget 2083/84: five brackets; couple structure = individual.
    individual: [
      { upTo: 1000000, rate: 0 },
      { upTo: 1500000, rate: 10 },
      { upTo: 2500000, rate: 20 },
      { upTo: 4000000, rate: 27 },
      { upTo: Infinity, rate: 29 },
    ],
    couple: [
      { upTo: 1000000, rate: 0 },
      { upTo: 1500000, rate: 10 },
      { upTo: 2500000, rate: 20 },
      { upTo: 4000000, rate: 27 },
      { upTo: Infinity, rate: 29 },
    ],
  },
};

export function bracketsFor(year: FY, status: Status): Bracket[] {
  const y = RATES[year] || RATES["2083-84"];
  return status === "couple" ? y.couple : y.individual;
}

// Compute income tax (and 1% social security tax) on a given taxable income for a
// bracket set. `brackets` is an ordered list of { upTo, rate } (last upTo = Infinity).
export function computeTax(
  income: number,
  brackets: Bracket[],
  ssfEnabled: boolean,
): ComputeResult {
  const base = brackets[0].upTo;
  const ssfTax = ssfEnabled ? 0 : Math.min(base, income) * 0.01;
  let prev = 0;
  let tax = 0;
  const taxBySlabs = brackets.map((b, i) => {
    const amount = Math.max(0, Math.min(income, b.upTo) - prev);
    const t = amount * (b.rate / 100);
    tax += t;
    prev = b.upTo;
    return { name: `slab.${i}`, i, rate: b.rate, amount, tax: t };
  });
  return { tax, ssfTax, totalTax: tax + ssfTax, taxBySlabs };
}

// Tax after deductions (reduce taxable income) and the medical tax credit
// (applied against income tax: lowest of NPR 1,500, 15% of medical expenses, or tax).
export function taxAfter(
  income: number,
  deductions: number,
  brackets: Bracket[],
  ssfEnabled: boolean,
  medicalExpenses: number,
): TaxAfterResult {
  const taxable = Math.max(0, income - Math.max(0, deductions));
  const r = computeTax(taxable, brackets, ssfEnabled);
  const credit = Math.max(0, Math.min(1500, 0.15 * (medicalExpenses || 0), r.tax));
  return {
    tax: r.tax,
    ssfTax: r.ssfTax,
    credit,
    taxBySlabs: r.taxBySlabs,
    totalTax: r.tax - credit + r.ssfTax,
    taxable,
  };
}

// Maximum deductible retirement-fund contribution: lowest of 1/3 of assessable
// income, the actual contribution, or the annual ceiling. The ceiling is shared
// across approved funds (CIT, SSF, provident/gratuity) — NPR 500,000 for SSF
// participants, otherwise NPR 300,000. The two ceilings cannot be stacked.
export function citCapFor(income: number, ssfEnabled: boolean): number {
  const ceiling = ssfEnabled ? 500000 : 300000;
  return Math.max(0, Math.min(income / 3, ceiling));
}

// Annual SSF contributions from basic salary: employee 11% + employer 20% (= 31% total).
// Returns zeroes unless SSF is on and a basic salary is provided.
export function ssfContribFor(
  ssfEnabled: boolean,
  basicSalary: string,
  basicMonthly: boolean,
): SsfContribution {
  const raw = parseFloat(basicSalary) || 0;
  const basicAnnual = basicMonthly ? raw * 12 : raw;
  if (!ssfEnabled || basicAnnual <= 0)
    return { basicAnnual: 0, employee: 0, employer: 0, total: 0 };
  return {
    basicAnnual,
    employee: basicAnnual * 0.11,
    employer: basicAnnual * 0.2,
    total: basicAnnual * 0.31,
  };
}

// CIT top-up room: the shared retirement ceiling minus what SSF contributions already fill.
export function citRoomFor(
  income: number,
  ssfEnabled: boolean,
  basicSalary: string,
  basicMonthly: boolean,
): number {
  const ceiling = citCapFor(income, ssfEnabled);
  const ssfDeductible = Math.min(
    ssfContribFor(ssfEnabled, basicSalary, basicMonthly).total,
    ceiling,
  );
  return Math.max(0, ceiling - ssfDeductible);
}

export function annualIncome(salary: string, monthly: boolean): number {
  const s = parseFloat(salary) || 0;
  return monthly ? s * 12 : s;
}

// Personalized recommendations built from the actual result. Only proposes actions that would
// genuinely help this user — and proposes nothing tax-related when there is no tax to save.
function buildRecommendations(
  ctx: {
    form: FormState;
    income: number;
    status: Status;
    ssf: boolean;
    fy: FY;
    firstSlab: number;
    incomeTax: number; // gross income tax (before SST/credit)
    ssfTax: number; // 1% social security tax currently applied (0 when enrolled)
    totalTax: number;
    lifeDeduction: number;
    healthDeduction: number;
    opt: OptResult;
  },
  lang: Lang,
): RecoItem[] {
  const r: RecoItem[] = [];
  const npr = (n: number) => fmtNpr(n, lang);

  // No tax due at all → nothing to optimize, just reassure.
  if (ctx.totalTax <= 0) {
    return [{ key: "prec.noTax", vars: { first: npr(ctx.firstSlab) } }];
  }

  // SSF waives the 1% social security tax (independent of income tax).
  if (!ctx.ssf && ctx.ssfTax > 0) {
    r.push({ key: "prec.ssf", vars: { amt: npr(ctx.ssfTax) } });
  } else if (ctx.ssf && !(parseFloat(ctx.form.basicSalary) || 0)) {
    r.push({ key: "prec.ssfBasic" });
  }

  // Income-tax reducers — only meaningful when income tax actually remains.
  if (ctx.incomeTax > 0) {
    const opt = ctx.opt;
    if (opt.maxSaving >= 1) {
      if (opt.citDeduction <= 0) {
        r.push({
          key: "prec.citStart",
          vars: { amt: npr(opt.deposit), save: npr(opt.maxSaving) },
        });
      } else if (opt.maxSaving - opt.currentSaving >= 1) {
        r.push({
          key: "prec.citRoom",
          vars: {
            amt: npr(Math.max(0, opt.citRoom - opt.citDeduction)),
            save: npr(opt.maxSaving - opt.currentSaving),
          },
        });
      }
    }
    const lifeRoom = 40000 - ctx.lifeDeduction;
    if (lifeRoom > 0) r.push({ key: "prec.life", vars: { amt: npr(lifeRoom) } });
    const healthRoom = 20000 - ctx.healthDeduction;
    if (healthRoom > 0) r.push({ key: "prec.health", vars: { amt: npr(healthRoom) } });
    if ((parseFloat(ctx.form.medicalExpenses) || 0) <= 0) r.push({ key: "prec.medical" });
    if (ctx.fy === "2082-83" && ctx.status === "individual" && ctx.income > ctx.firstSlab) {
      r.push({ key: "prec.couple" });
    }
    if (ctx.income >= 2500000) r.push({ key: "prec.pro" });
  }

  if (r.length === 0) r.push({ key: "prec.allGood" });
  return r;
}

// Optimization figures (mirrors the original renderOptimization mapping).
function buildOptimization(
  o: {
    citEnabled: boolean;
    income: number;
    citCap: number;
    citDeduction: number;
    citRoom: number;
    taxableIncome: number;
    otherDeductions: number;
    ssfEmployee: number;
    ssfEmployer: number;
    ssfDeductible: number;
    baselineTax: number;
    currentTax: number;
    withMaxCit: number;
    maxSaving: number;
    currentSaving: number;
  },
  lang: Lang,
): OptResult {
  const applied = o.citEnabled && o.citDeduction > 0;
  const ssfActive = o.ssfDeductible > 0;
  const citRoom = o.citRoom;
  const maxDeposit = Math.min(
    citRoom,
    Math.max(0, o.income - o.otherDeductions - o.ssfDeductible),
  );
  const deposit = applied ? o.citDeduction : maxDeposit;
  const taxWith = applied ? o.currentTax : o.withMaxCit;
  const taxable = applied
    ? o.taxableIncome
    : Math.max(0, o.income - o.otherDeductions - o.citCap);
  // Take-home subtracts the full SSF contribution (employee 11% + employer 20%) plus the CIT deposit.
  const cashYear = o.income - taxWith - deposit - (o.ssfEmployee + o.ssfEmployer);
  const saving = applied ? o.currentSaving : o.maxSaving;

  let statusKey: OptResult["statusKey"];
  let savingLabelKey: OptResult["savingLabelKey"];
  let textKey: OptResult["textKey"];
  let textVars: Record<string, string> = {};

  if (!applied) {
    savingLabelKey = "potential";
    if (o.citCap <= 0) {
      statusKey = "dash";
      textKey = "enterSalary";
    } else if (o.maxSaving < 1) {
      statusKey = "noBenefit";
      textKey = "lowBenefit";
    } else {
      statusKey = "recommended";
      textKey = "recoText";
      textVars = {
        amt: fmtNpr(deposit, lang),
        amtm: fmtNpr(deposit / 12, lang),
        taxable: fmtNpr(taxable, lang),
        save: fmtNpr(o.maxSaving, lang),
      };
    }
  } else {
    statusKey = "applied";
    savingLabelKey = "yourSaving";
    const room = o.citCap - o.citDeduction;
    if (room > 1) {
      textKey = "appliedRoom";
      textVars = {
        dep: fmtNpr(o.citDeduction, lang),
        depm: fmtNpr(o.citDeduction / 12, lang),
        save: fmtNpr(o.currentSaving, lang),
        max: fmtNpr(o.citCap, lang),
        maxsave: fmtNpr(o.maxSaving, lang),
        extra: fmtNpr(o.maxSaving - o.currentSaving, lang),
      };
    } else {
      textKey = "appliedMax";
      textVars = {
        dep: fmtNpr(o.citDeduction, lang),
        depm: fmtNpr(o.citDeduction / 12, lang),
        save: fmtNpr(o.currentSaving, lang),
      };
    }
  }

  return {
    citEnabled: o.citEnabled,
    applied,
    ssfActive,
    citCap: o.citCap,
    citRoom,
    ssfEmployee: o.ssfEmployee,
    ssfEmployer: o.ssfEmployer,
    ssfDeductible: o.ssfDeductible,
    deposit,
    taxable,
    baselineTax: o.baselineTax,
    taxWith,
    cashYear,
    saving,
    maxSaving: o.maxSaving,
    currentSaving: o.currentSaving,
    citDeduction: o.citDeduction,
    statusKey,
    savingLabelKey,
    textKey,
    textVars,
  };
}

function buildComparison(
  income: number,
  a: TaxAfterResult,
  b: TaxAfterResult,
  fy: FY,
  lang: Lang,
): ComparisonResult {
  const d = a.totalTax - b.totalTax; // > 0 ⇒ cheaper under 2083-84
  const pct = a.totalTax > 0 ? (Math.abs(d) / a.totalTax) * 100 : 0;
  let bannerKey: ComparisonResult["bannerKey"];
  let bannerVars: Record<string, string> = {};
  if (Math.abs(d) < 1) {
    bannerKey = "same";
  } else if (d > 0) {
    bannerKey = "less";
    bannerVars = { amt: fmtNpr(d, lang), pct: pct.toFixed(1) };
  } else {
    bannerKey = "more";
    bannerVars = { amt: fmtNpr(-d, lang), pct: pct.toFixed(1) };
  }
  return {
    tax82: a.totalTax,
    tax83: b.totalTax,
    net82: income - a.totalTax,
    net83: income - b.totalTax,
    rate82: income > 0 ? (a.totalTax / income) * 100 : 0,
    rate83: income > 0 ? (b.totalTax / income) * 100 : 0,
    active82: fy === "2082-83",
    active83: fy === "2083-84",
    bannerKey,
    bannerVars,
  };
}

/**
 * Full calculation pipeline — mirrors the original Calculate handler.
 * Returns null when salary is non-positive (caller shows the error state).
 */
export function calculate(form: FormState, lang: Lang): CalcResult | null {
  const salary = parseFloat(form.salary) || 0;
  if (salary <= 0) return null;

  const income = annualIncome(form.salary, form.period === "monthly");
  const status = form.status;
  const ssf = form.ssf;
  const fy = form.fy;
  const brackets = bracketsFor(fy, status);

  const lifePremium = parseFloat(form.lifePremium) || 0;
  const healthPremium = parseFloat(form.healthPremium) || 0;
  const medicalExpenses = parseFloat(form.medicalExpenses) || 0;
  const lifeDeduction = Math.min(lifePremium, 40000);
  const healthDeduction = Math.min(healthPremium, 20000);
  const otherDeductions = lifeDeduction + healthDeduction;

  // SSF fills the shared ceiling first; CIT tops up the remainder.
  const ssfC = ssfContribFor(ssf, form.basicSalary, form.basicPeriod === "monthly");
  const citCap = citCapFor(income, ssf);
  const ssfDeductible = Math.min(ssfC.total, citCap);
  const citRoom = Math.max(0, citCap - ssfDeductible);

  const citEnabled = form.cit;
  const citContribution = citEnabled ? parseFloat(form.citAmount) || 0 : 0;
  const citDeduction = Math.min(citContribution, citRoom);

  const totalDeductions = otherDeductions + ssfDeductible + citDeduction;
  const taxableIncome = Math.max(0, income - totalDeductions);

  const current = taxAfter(income, totalDeductions, brackets, ssf, medicalExpenses);
  const totalTax = current.totalTax;
  const netIncome = income - totalTax;
  const effectiveTaxRate = income > 0 ? (totalTax / income) * 100 : 0;

  const baseNoCit = taxAfter(income, otherDeductions, brackets, ssf, medicalExpenses).totalTax;
  const withMaxCit = taxAfter(income, otherDeductions + citCap, brackets, ssf, medicalExpenses).totalTax;
  const maxSaving = baseNoCit - withMaxCit;
  const currentSaving = baseNoCit - totalTax;

  const optimization = buildOptimization(
    {
      citEnabled,
      income,
      citCap,
      citDeduction,
      citRoom,
      taxableIncome,
      otherDeductions,
      ssfEmployee: ssfC.employee,
      ssfEmployer: ssfC.employer,
      ssfDeductible,
      baselineTax: baseNoCit,
      currentTax: totalTax,
      withMaxCit,
      maxSaving,
      currentSaving,
    },
    lang,
  );

  const cmp82 = taxAfter(income, totalDeductions, bracketsFor("2082-83", status), ssf, medicalExpenses);
  const cmp83 = taxAfter(income, totalDeductions, bracketsFor("2083-84", status), ssf, medicalExpenses);
  const comparison = buildComparison(income, cmp82, cmp83, fy, lang);

  // Take-home waterfall (annual): the full SSF contribution (11% you + 20% employer, both go to the
  // fund out of the CTC-inclusive gross) + the CIT you set aside + tax all leave your spendable cash.
  const cashInHand = {
    gross: income,
    ssf: ssfC.total,
    citContribution: citDeduction,
    tax: totalTax,
    cashInHand: income - ssfC.total - citDeduction - totalTax,
  };

  const firstSlab = bracketsFor(fy, "individual")[0].upTo;
  const recommendations = buildRecommendations(
    {
      form,
      income,
      status,
      ssf,
      fy,
      firstSlab,
      incomeTax: current.tax,
      ssfTax: current.ssfTax,
      totalTax,
      lifeDeduction,
      healthDeduction,
      opt: optimization,
    },
    lang,
  );

  return {
    income,
    fy,
    status,
    ssf,
    brackets,
    tax: current.tax,
    ssfTax: current.ssfTax,
    medicalCredit: current.credit,
    totalTax,
    taxBySlabs: current.taxBySlabs,
    taxableIncome,
    netIncome,
    monthlyNetIncome: netIncome / 12,
    effectiveTaxRate,
    optimization,
    comparison,
    cashInHand,
    recommendations,
  };
}
