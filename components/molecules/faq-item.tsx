interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

// Native <details>/<summary> so the original `.faq` CSS (the +/− marker) applies verbatim.
export function FaqItem({ question, children }: FaqItemProps) {
  return (
    <details>
      <summary>{question}</summary>
      <div className="faq-body">{children}</div>
    </details>
  );
}
