export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-12 gold-rule" />
      <span className="label-mono text-gold">{children}</span>
    </div>
  );
}