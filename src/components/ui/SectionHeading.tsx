type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-col gap-1 sm:mb-6">
      <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

