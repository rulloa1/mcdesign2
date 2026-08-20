const links = [
  { label: "About", href: "#about" },
  { label: "Selected Works", href: "#works" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-background/60 px-6 py-3 backdrop-blur-md">
        <a href="#top" className="font-display text-lg tracking-[0.2em] text-foreground">
          MC
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="label-mono text-muted-foreground transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="label-mono text-gold md:hidden">
          Contact
        </a>
      </nav>
    </header>
  );
}