import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#works", label: "Selected Works" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full px-6 pt-5 pointer-events-none">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-bone/10 px-6 py-3 backdrop-blur-xl pointer-events-auto ${
            scrolled ? "bg-carbon/92" : "bg-carbon/70"
          }`}
          style={{ transition: "background-color 0.7s cubic-bezier(0.32,0.72,0,1)" }}
        >
          <Link to="/" className="font-serif text-lg uppercase tracking-widest text-bone">
            MC
          </Link>

          <div className="hidden gap-7 text-[0.7rem] uppercase tracking-[0.22em] text-bone/70 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors duration-500 hover:text-brass">
                {l.label}
              </a>
            ))}
            <Link to="/design" className="transition-colors duration-500 hover:text-brass">
              Design
            </Link>
            <Link to="/portfolio" className="transition-colors duration-500 hover:text-brass">
              Portfolio
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-5 w-[30px] md:hidden"
          >
            <span
              className={`absolute left-0 h-px w-full bg-brass transition-all duration-400 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-brass transition-opacity duration-400 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-brass transition-all duration-400 ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-carbon transition-transform duration-700 md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
      >
        <div className="flex flex-col items-center gap-8 font-serif text-3xl uppercase tracking-widest text-bone">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-brass">
              {l.label}
            </a>
          ))}
          <Link to="/design" onClick={() => setOpen(false)} className="hover:text-brass">
            Design
          </Link>
          <Link to="/portfolio" onClick={() => setOpen(false)} className="hover:text-brass">
            Portfolio
          </Link>
        </div>
      </div>
    </>
  );
}