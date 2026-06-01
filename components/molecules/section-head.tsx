interface SectionHeadProps {
  icon: React.ReactNode;
  title: string;
  meta?: string;
}

// Icon chip + heading + optional uppercase meta (the `.section-head` row).
export function SectionHead({ icon, title, meta }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="icon" aria-hidden="true">
        {icon}
      </span>
      <h2>{title}</h2>
      {meta ? <span className="meta">{meta}</span> : null}
    </div>
  );
}
