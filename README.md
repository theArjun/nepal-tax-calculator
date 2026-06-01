# Nepal Tax Calculator FY 2081-82

An interactive web-based tax calculator for calculating income tax in Nepal for the fiscal year 2081-82.

## Features

- Calculate income tax based on the latest tax slabs for FY 2081-82
- Support for both individual and couple (joint) filing
- Option to include Social Security Fund (SSF) contribution
- Detailed tax breakdown by slabs
- Visual representation of tax distribution
- Personalized tax-saving recommendations
- Mobile-responsive design

## How to Use

1. Enter your salary amount
2. Select whether it's monthly or yearly income
3. Choose your filing status (individual or couple)
4. Indicate if you're participating in the Social Security Fund
5. Click "Calculate Your Tax" to see your detailed tax breakdown

## Tax Slabs for FY 2081-82

### For Individuals
- First NPR 500,000: 1% (Social Security Tax only)
- Next NPR 200,000: 10%
- Next NPR 300,000: 20%
- Next NPR 1,000,000: 30%
- Next NPR 3,000,000: 36%
- Remaining amount: 39%

### For Couples (Joint Filing)
- First NPR 600,000: 1% (Social Security Tax only)
- Next NPR 200,000: 10%
- Next NPR 300,000: 20%
- Next NPR 900,000: 30%
- Next NPR 3,000,000: 36%
- Remaining amount: 39%

## Technical Details

The app is built with **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui**, organised
with atomic design, and deployed as a **static export** (`output: 'export'`) to GitHub Pages — so it
still runs entirely in the browser with no backend.

### Project structure

```
app/            Next.js layout (SEO metadata + JSON-LD), page, global styles
components/
  ui/           shadcn primitives (Button, Card, Badge)
  atoms/        AnimatedNumber, RateChip, icons
  molecules/    AmountInput, SegmentedControl, SwitchField, Field, Gauge, Tip, FaqItem, …
  organisms/    AppBar, Hero, IncomeForm, TaxSummary, BudgetComparison, TaxOptimization,
                SlabLedger, StrataChart, TaxInsights, Faq, Footer
lib/            Pure tax math (tax.ts), formatting, URL state, types
i18n/           Typed EN/नेपाली dictionaries + useI18n provider
hooks/          useTaxCalculator (form state, URL sync, calculation)
legacy/         The original single-file build, kept for reference
```

### Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

The original zero-build single-file version is preserved at `legacy/index.html`.

## License

This project is open-source under the MIT License.

---

Developed by [Arjun Adhikari](https://github.com/thearjun)

*Disclaimer: This calculator is for informational purposes only. Always consult with a tax professional for official tax calculations.* 