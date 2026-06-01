export type FY = "2082-83" | "2083-84";
export type Status = "individual" | "couple";
export type Period = "monthly" | "yearly";
export type Lang = "en" | "ne";

/** A single tax bracket: cumulative ceiling + marginal rate (%). Last upTo = Infinity. */
export interface Bracket {
  upTo: number;
  rate: number;
}

/** The raw form inputs the user controls. */
export interface FormState {
  fy: FY;
  salary: string;
  period: Period;
  status: Status;
  ssf: boolean;
  basicSalary: string;
  basicPeriod: Period;
  cit: boolean;
  citAmount: string;
  lifePremium: string;
  healthPremium: string;
  medicalExpenses: string;
}

export interface SlabTax {
  name: string; // slab key index resolved at render
  i: number;
  rate: number;
  amount: number;
  tax: number;
}

export interface ComputeResult {
  tax: number;
  ssfTax: number;
  totalTax: number;
  taxBySlabs: SlabTax[];
}

export interface TaxAfterResult {
  tax: number;
  ssfTax: number;
  credit: number;
  taxBySlabs: SlabTax[];
  totalTax: number;
  taxable: number;
}

export interface SsfContribution {
  basicAnnual: number;
  employee: number;
  employer: number;
  total: number;
}

/** Everything the results UI needs, computed from a FormState snapshot. */
export interface CalcResult {
  income: number;
  fy: FY;
  status: Status;
  ssf: boolean;
  brackets: Bracket[];
  tax: number;
  ssfTax: number;
  medicalCredit: number;
  totalTax: number;
  taxBySlabs: SlabTax[];
  taxableIncome: number;
  netIncome: number;
  monthlyNetIncome: number;
  effectiveTaxRate: number;
  optimization: OptResult;
  comparison: ComparisonResult;
  cashInHand: CashFlow;
  recommendations: RecoItem[];
}

/** The take-home waterfall: gross → minus each deduction → cash in hand (annual figures). */
export interface CashFlow {
  gross: number;
  ssf: number; // full SSF contribution (employee 11% + employer 20% = 31% of basic)
  citContribution: number; // CIT you set aside
  tax: number; // total tax (income tax − credit + SST)
  cashInHand: number;
}

export type RecoKey =
  | "prec.noTax"
  | "prec.ssf"
  | "prec.ssfBasic"
  | "prec.citStart"
  | "prec.citRoom"
  | "prec.life"
  | "prec.health"
  | "prec.medical"
  | "prec.couple"
  | "prec.pro"
  | "prec.allGood";

/** A single personalized recommendation: a message key + its interpolation vars. */
export interface RecoItem {
  key: RecoKey;
  vars?: Record<string, string>;
}

export interface OptResult {
  citEnabled: boolean;
  applied: boolean;
  ssfActive: boolean;
  citCap: number;
  citRoom: number;
  ssfEmployee: number;
  ssfEmployer: number;
  ssfDeductible: number;
  deposit: number; // CIT deposit shown (applied actual or recommended top-up)
  taxable: number;
  baselineTax: number;
  taxWith: number;
  cashYear: number;
  saving: number;
  maxSaving: number;
  currentSaving: number;
  citDeduction: number;
  /** Which status/message to show + interpolation vars. */
  statusKey: "recommended" | "noBenefit" | "applied" | "dash";
  savingLabelKey: "potential" | "yourSaving";
  textKey:
    | "enterSalary"
    | "lowBenefit"
    | "recoText"
    | "appliedRoom"
    | "appliedMax";
  textVars: Record<string, string>;
}

export interface ComparisonResult {
  tax82: number;
  tax83: number;
  net82: number;
  net83: number;
  rate82: number;
  rate83: number;
  active82: boolean;
  active83: boolean;
  bannerKey: "same" | "less" | "more";
  bannerVars: Record<string, string>;
}
