// English dictionary — the canonical key set. ne.ts must mirror these keys.
// {placeholder} tokens are interpolated by t().
export const en = {
  "app.name": "Nepal Tax Calculator",
  "app.sub": "Income Tax · Inland Revenue Department",
  "hero.h1": "Calculate Your Income Tax",
  "hero.desc":
    "Estimate your Nepal income tax liability against the latest Inland Revenue Department slabs — with deductions, CIT optimization, and a year-on-year budget comparison.",
  "hero.fyPrefix": "Fiscal Year",

  "form.title": "Income Details",
  "form.step": "Step 1 of 2",
  "f.fy": "Fiscal Year",
  "f.fyHint": "Tax slabs differ by year",
  "f.salary": "Salary",
  "f.salaryHintMonthly": "Monthly gross, before deductions",
  "f.salaryHintYearly": "Yearly gross, before deductions",
  "f.period": "Income Period",
  "f.periodHint": "How this figure is reported",
  "f.monthly": "Monthly",
  "f.yearly": "Yearly",
  "f.filing": "Filing Status",
  "f.filingHint": "Couples get a higher first slab",
  "f.individual": "Individual",
  "f.couple": "Couple (Joint)",
  "f.ssf": "Social Security Fund",
  "f.ssfHint": "Waives the 1% social security tax",
  "f.ssfLabel": "SSF Participation",
  "f.basic": "Basic Salary",
  "f.basicHint": "SSF = 11% you + 20% company of this",
  "f.cit": "Citizen Investment Trust (CIT)",
  "f.citHint":
    "Deductible up to ⅓ of income, capped at NPR 300,000 (NPR 500,000 with SSF)",
  "f.citLabel": "Contribute to CIT for maximum tax benefit",
  "f.useMax": "Use max",
  "f.insMed": "Insurance & Medical",
  "f.insMedHint": "Optional · further reduces your tax",
  "f.life": "Life Insurance Premium",
  "f.lifeHint": "Annual premium — deductible up to NPR 40,000",
  "f.health": "Health Insurance Premium",
  "f.healthHint": "Annual premium — deductible up to NPR 20,000",
  "f.medical": "Medical Expenses",
  "f.medicalHint": "Medical tax credit — 15%, up to NPR 1,500",
  "f.calcNote":
    "Figures use the selected fiscal year's tax slabs. Fill in your details and calculate.",
  "f.calcBtn": "Calculate Tax",

  cur: "NPR",
  "ssf.enrolled": "Enrolled",
  "ssf.notEnrolled": "Not enrolled",
  "cit.yes": "Yes",
  "cit.no": "No",

  "r.title": "Tax Summary",
  "r.meta": "Annualised",
  "r.totalTax": "Total Tax Payable",
  "r.effective": "effective",
  "r.onIncome": "on income of {amt}",
  "r.netAnnual": "Net Annual Income",
  "r.afterTax": "After all taxes",
  "r.netMonthly": "Net Monthly Income",
  "r.perMonth": "Take-home per month",
  "r.breakdown": "Tax Breakdown",
  "r.incomeTax": "Income Tax",
  "r.ssfTax": "Social Security Tax",
  "r.medCredit": "Medical Tax Credit",

  "cmp.title": "Budget Comparison",
  "cmp.net": "Net annual income",
  "cmp.rate": "Effective tax rate",
  "cmp.selected": "Selected",
  "cmp.same": "Your tax is the same under both FY 2082-83 and FY 2083-84.",
  "cmp.less":
    "Under FY 2083-84 you pay {amt} less ({pct}% lower) than under FY 2082-83.",
  "cmp.more":
    "Under FY 2083-84 you pay {amt} more ({pct}% higher) than under FY 2082-83.",

  "opt.title": "Tax Optimization — Citizen Investment Trust",
  "opt.recommended": "Recommended",
  "opt.noBenefit": "No benefit",
  "opt.applied": "Applied",
  "opt.dash": "—",
  "opt.potential": "Potential Tax Saving",
  "opt.yourSaving": "Your Tax Saving",
  "opt.item": "Item",
  "opt.perYear": "Per year",
  "opt.perMonth": "Per month",
  "opt.recContrib": "Recommended contribution",
  "opt.ssfYouPay": "SSF · you pay (11%)",
  "opt.ssfCompanyPays": "SSF · company pays (20%)",
  "opt.deposit": "CIT deposit",
  "opt.citTopup": "CIT top-up",
  "opt.taxable": "Taxable income after CIT",
  "opt.without": "Tax without CIT",
  "opt.with": "Tax with CIT",
  "opt.take": "Take-home",
  "opt.enterSalary":
    "Enter your salary and calculate to see your CIT tax-saving opportunity.",
  "opt.lowBenefit":
    "At your current income there is little or no income tax to offset, so a CIT contribution offers minimal tax benefit right now.",
  "opt.recoText":
    "Deposit {amt} a year ({amtm} a month) to the Citizen Investment Trust (CIT) to lower your taxable income to {taxable} and save about {save} in tax. Turn on CIT above to apply it.",
  "opt.appliedRoom":
    "You're depositing {dep} a year ({depm} a month) and saving {save} in tax. Deposit the full {max} to save up to {maxsave} — an extra {extra}.",
  "opt.appliedMax":
    "You're depositing the maximum {dep} a year ({depm} a month) and saving {save} in tax. This deposit stays your money — it's invested in the fund for your future.",
  "opt.note":
    "<strong>How the deduction limit works:</strong> Deductions for approved retirement funds — CIT, SSF, and provident/gratuity funds — are combined. The deductible amount is the lowest of one-third of assessable income, your actual contribution, or <strong>NPR 300,000</strong> per year. Social Security Fund (SSF) participants get a higher ceiling of <strong>NPR 500,000</strong>. These two ceilings cannot be stacked.",

  "led.title": "Slab-by-Slab Breakdown",
  "led.print": "Print / Save PDF",
  "led.rate": "Rate",
  "led.slab": "Tax Slab",
  "led.amount": "Taxable Amount",
  "led.tax": "Tax",
  "led.total": "Total Tax Payable",
  "led.credit": "Credit",

  "slab.0": "First Slab",
  "slab.1": "Second Slab",
  "slab.2": "Third Slab",
  "slab.3": "Fourth Slab",
  "slab.4": "Fifth Slab",
  "slab.5": "Sixth Slab",

  "str.title": "Income by Tax Bracket",
  "str.meta": "By Marginal Rate",
  "str.note":
    "Each column shows the portion of your income that falls within that bracket. Taller columns represent a larger share of your earnings.",
  "str.gauge": "Effective Tax Rate",

  "ins.title": "Tax Insights",
  "ins.meta": "Read Before Filing",
  "ins.reco": "Personalized Recommendation",
  "ins.recoDefault":
    "Calculate your tax to see a recommendation tailored to your income bracket and circumstances.",
  "ins.col1": "Tax-Saving Opportunities",
  "ins.col2": "Planning Strategies",

  "tip.1t": "Social Security Fund",
  "tip.1b":
    "Enrolling in the SSF waives the 1% social security tax applied to the first slab of your income.",
  "tip.2t": "Life Insurance Premiums",
  "tip.2b":
    "Deduct your annual life insurance premium, up to NPR 40,000. Couples who are both employed may combine their premiums up to the limit. The policy must be from a resident Nepali insurer.",
  "tip.3t": "Health Insurance Premiums",
  "tip.3b":
    "Deduct your annual health insurance premium, up to NPR 20,000, for a policy from a resident Nepali insurer.",
  "tip.4t": "Medical Tax Credit",
  "tip.4b":
    "Resident individuals can claim a credit against tax of the lowest of NPR 1,500, 15% of actual medical expenses, or your tax liability.",
  "tip.5t": "Pension Income",
  "tip.5b":
    "An additional 25% deduction applies to the first slab for pension income.",
  "tip.6t": "Remote Work Allowance",
  "tip.6b":
    "Claim up to NPR 50,000 where employment is performed in designated remote areas.",
  "tip.7t": "File Jointly as a Couple",
  "tip.7b":
    "For FY 2082-83, couples get a 0% slab of NPR 600,000 — NPR 100,000 higher than the individual filer.",
  "tip.8t": "Approved Retirement Schemes",
  "tip.8b":
    "Contributions to recognized retirement funds (such as CIT) receive favorable tax treatment under the Act.",
  "tip.9t": "Income Splitting",
  "tip.9b":
    "Where lawful, distribute earnings across family members to lower the marginal rate borne by any one person.",

  "faq.title": "Frequently Asked Questions",
  "faq.q1": "What are the income tax slabs for FY 2083-84?",
  "faq.a1":
    "For FY 2083-84, the first NPR 10,00,000 is taxed at 1% (social security tax only), then 10%, 20%, 27%, and 29% on the highest band. The exemption ceiling was raised to NPR 10 lakh and the top rate cut to 29%.",
  "faq.q2": "What are the income tax slabs for FY 2082-83?",
  "faq.a2":
    "For individuals, the first NPR 5,00,000 is taxed at 1% (social security tax only), the next NPR 2,00,000 at 10%, the next NPR 3,00,000 at 20%, the next NPR 10,00,000 at 30%, the next NPR 20,00,000 at 36%, and anything above at 39%. Couples filing jointly get a first slab of NPR 6,00,000.",
  "faq.q3": "How can I reduce my tax liability in Nepal?",
  "faq.a3":
    "Enrol in the Social Security Fund to waive the 1% social security tax; deduct life insurance premiums (up to NPR 40,000) and health insurance premiums (up to NPR 20,000); claim the medical tax credit; contribute to the Citizen Investment Trust or other approved retirement funds; and, for FY 2082-83, file jointly as a couple where it helps.",
  "faq.q4": "What is the Social Security Fund (SSF)?",
  "faq.a4":
    "The SSF is a government-run social security scheme. Employees contribute 11% of basic salary and employers 20%. Participating waives the 1% social security tax on the first slab and provides medical, accident, disability, and retirement benefits.",
  "faq.q5": "Is the tax different for individuals and couples?",
  "faq.a5":
    "For FY 2082-83, couples filing jointly get a higher first slab (NPR 6,00,000 vs 5,00,000) and slightly different upper bands. For FY 2083-84, the published structure does not distinguish couples, so this calculator applies the same slabs to both.",
  "faq.thIncome": "Annual taxable income (NPR)",
  "faq.thRate": "Tax rate",

  "footer.data": "Data based on Nepal tax rates for FY 2082–83 and 2083–84.",
  "footer.disclaimer":
    "This calculator is for informational purposes only. Always consult a qualified tax professional before filing.",
  "footer.by": "Developed by",

  "cih.title": "Cash in Hand",
  "cih.meta": "Monthly & yearly",
  "cih.gross": "Gross salary",
  "cih.ssf": "SSF contribution (11% you + 20% company)",
  "cih.cit": "CIT contribution",
  "cih.tax": "Total tax",
  "cih.final": "Cash in hand",

  "prec.noTax":
    "Your income is within the tax-free first slab (up to {first}), so you owe no income tax. No tax-saving steps are needed — focus on growing your earnings.",
  "prec.ssf":
    "Enrol in the Social Security Fund (SSF) to waive the 1% social security tax — about {amt} a year.",
  "prec.ssfBasic":
    "Add your basic salary above so we can include your SSF contribution (11% you + 20% employer).",
  "prec.citStart":
    "Contribute up to {amt} a year to the Citizen Investment Trust (CIT) to save about {save} in tax.",
  "prec.citRoom":
    "Deposit {amt} more to the CIT to save about {save} more in tax.",
  "prec.life":
    "Claim up to {amt} more of life insurance premium to lower your taxable income.",
  "prec.health": "Claim up to {amt} more of health insurance premium.",
  "prec.medical":
    "Claim the medical tax credit — up to NPR 1,500 (15% of your medical expenses).",
  "prec.couple":
    "For FY 2082-83, filing jointly as a couple raises your tax-free slab to NPR 600,000.",
  "prec.pro":
    "At this income level, consider comprehensive planning with a tax professional.",
  "prec.allGood":
    "You've already applied the major deductions available — your tax looks well optimised.",
} as const;

export type I18nKey = keyof typeof en;
