export default function SectionKicker({
  label,
  detail,
  centered = false,
}: {
  label: string;
  detail: string;
  centered?: boolean;
}) {
  return (
    <p className={`section-kicker${centered ? " section-kicker--centered" : ""}`}>
      <span>{label}</span>
      <i aria-hidden="true" />
      <span className="section-kicker__detail">{detail}</span>
    </p>
  );
}
