"use client";

import { useI18n } from "@/i18n/provider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <p>{t("footer.data")}</p>
      <p className="disclaimer">{t("footer.disclaimer")}</p>
      <p className="copy">
        © 2025 Nepal Tax Calculator · {t("footer.by")}{" "}
        <a
          href="https://github.com/thearjun?utm_source=nepal-tax-calculator&utm_medium=referral&utm_campaign=footer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arjun Adhikari
        </a>
      </p>
    </footer>
  );
}
