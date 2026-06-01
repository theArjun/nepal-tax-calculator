import type { Lang } from "./types";

const nf = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Indian-grouped integer (e.g. 1,30,044) — matches the original fmtNum. */
export function fmtNum(n: number): string {
  return nf.format(Math.round(n));
}

/** Currency-prefixed amount: "NPR 1,30,044" / "रु 1,30,044". */
export function fmtNpr(n: number, lang: Lang): string {
  return `${lang === "ne" ? "रु" : "NPR"} ${fmtNum(n)}`;
}
