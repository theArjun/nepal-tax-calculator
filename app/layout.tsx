import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "Calculate your Nepal income tax for FY 2082-83 with this interactive tax calculator. Supports monthly or yearly salary input, tax slab breakdown, and tax-saving tips.";
const OG_DESCRIPTION =
  "Calculate your Nepal income tax for fiscal year 2082-83 with this interactive calculator. Get instant tax breakdown, saving tips, and personalized recommendations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tax.adhikariarjun.com.np"),
  title: "Nepal Tax Calculator FY 2082-83 & 2083-84",
  description: DESCRIPTION,
  keywords: [
    "Nepal tax calculator",
    "FY 2082-83",
    "income tax Nepal",
    "tax slabs",
    "tax saving tips",
    "social security fund",
  ],
  authors: [{ name: "Arjun Adhikari", url: "https://github.com/thearjun" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    title: "Nepal Tax Calculator FY 2082-83",
    description: OG_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepal Tax Calculator FY 2082-83",
    description: OG_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
};

const webAppLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Nepal Tax Calculator",
  description: OG_DESCRIPTION,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "NPR" },
  author: { "@type": "Person", name: "Arjun Adhikari", url: "https://github.com/thearjun" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the income tax slabs in Nepal for FY 2083-84?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For FY 2083-84 (budget unveiled May 2026), the first NPR 1,000,000 is taxed at 1% (for Social Security Tax only), the next NPR 500,000 (1,000,001–1,500,000) at 10%, the next NPR 1,000,000 (1,500,001–2,500,000) at 20%, the next NPR 1,500,000 (2,500,001–4,000,000) at 27%, and any amount above NPR 4,000,000 at 29%. The income tax exemption ceiling was raised to NPR 1,000,000 and the top rate lowered to 29%.",
      },
    },
    {
      "@type": "Question",
      name: "What are the income tax slabs in Nepal for FY 2082-83?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For individuals, the first NPR 500,000 is taxed at 1% (for Social Security Tax only). The next NPR 200,000 is taxed at 10%, the next NPR 300,000 at 20%, the next NPR 1,000,000 at 30%, the next NPR 2,000,000 at 36%, and any amount above that at 39%. For couples filing jointly, the first slab extends to NPR 600,000.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce my tax liability in Nepal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reduce your tax liability by: 1) Contributing to the Social Security Fund (SSF) to waive the 1% Social Security Tax, 2) Deducting life insurance premiums (up to NPR 40,000), 3) Deducting health insurance premiums (up to NPR 20,000), 4) Claiming the medical tax credit (lowest of NPR 1,500, 15% of medical expenses, or your tax liability), 5) Contributing to the Citizen Investment Trust or other approved retirement funds, 6) Filing taxes jointly as a couple if married, and 7) Claiming remote work allowance if applicable.",
      },
    },
    {
      "@type": "Question",
      name: "What is Social Security Fund (SSF) in Nepal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Social Security Fund (SSF) is a government-run social security scheme in Nepal. By contributing to SSF, employees can waive the 1% Social Security Tax on their income. Employees contribute 11% of their basic salary to SSF, while employers contribute 20%. The fund provides various social security benefits including medical, accident, disability, and retirement benefits.",
      },
    },
    {
      "@type": "Question",
      name: "How is the tax calculated differently for individuals versus couples in Nepal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For individuals, the first tax-free slab is NPR 500,000, while for couples filing jointly, it extends to NPR 600,000. This means couples can save tax on an additional NPR 100,000 of income. The subsequent tax slabs are also slightly different, with couples having NPR 900,000 in the 30% bracket compared to NPR 1,000,000 for individuals. The 36% tax bracket has been reduced from NPR 3,000,000 to NPR 2,000,000 for FY 2082-83.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </body>
    </html>
  );
}
