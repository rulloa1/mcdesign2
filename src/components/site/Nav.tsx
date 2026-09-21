import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useActiveSheet } from "@/hooks/use-active-sheet";

const links = [
  { href: "/#work", label: "G-002 Work" },
  { href: "/#approach", label: "G-006 Approach" },
  { href: "/#record", label: "G-007 Record" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const { active, coverGone, contactVisible } = useActiveSheet();
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (overlay.current) overlay.current.inert = !open;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={() => window.requestAnimationFrame(() => document.querySelector<HTMLElement>("main#main")?.focus())}
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-rule-on-dark bg-cyanotype-deep">
        <nav className="page-grid h-full items-center" aria-label="Primary navigation">
          <Link to="/" className="col-span-8 flex min-w-0 items-center gap-4 lg:col-span-5">
            <span className="display text-xl text-chalk">McDesign</span>
            <span className="label hidden text-chalk-muted min-[480px]:inline">
              Michael Chandler
            </span>
          </Link>
          <div className="col-span-7 hidden items-center justify-end gap-6 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="label text-chalk-muted hover:text-chalk"
              >
                {link.label}
              </a>
            ))}
            <Link to="/resume" className="label text-chalk-muted hover:text-chalk">
              Resume
            </Link>
            <a
              href="/#contact"
              className="label flex h-10 items-center bg-redline px-4 text-chalk hover:bg-redline-press"
            >
              Contact
            </a>
          </div>
          <div className="col-span-4 flex justify-end lg:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
              className="h-11 w-11 rounded-none text-chalk hover:bg-transparent hover:text-blueline-on-dark"
            >
              <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </Button>
          </div>
        </nav>
      </header>
      <div
        id="mobile-navigation"
        ref={overlay}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-cyanotype px-4 pb-8 pt-24 lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="flex h-full flex-col" aria-label="Mobile navigation">
          <div className="flex flex-col border-t border-rule-on-dark">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display border-b border-rule-on-dark py-5 text-4xl text-chalk"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/resume"
              onClick={() => setOpen(false)}
              className="display border-b border-rule-on-dark py-5 text-4xl text-chalk"
            >
              Resume
            </Link>
          </div>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="label mt-auto flex h-[52px] items-center justify-center bg-redline text-chalk hover:bg-redline-press"
          >
            Contact
          </a>
        </nav>
      </div>
      {coverGone && !contactVisible ? (
        <aside
          role="complementary"
          aria-label="Current sheet"
          className="sheet-dock fixed bottom-6 right-6 z-40 hidden w-[280px] border border-blueline-on-dark bg-cyanotype-deep text-chalk lg:block"
        >
          <div
            key={`${active.number}-${active.title}`}
            className="sheet-dock-values grid grid-cols-2 border-b border-rule-on-dark"
          >
            <DockCell label="Sheet">{active.number}</DockCell>
            <DockCell label="Title">{active.title}</DockCell>
          </div>
          <a
            href="/#contact"
            className="label m-3 flex h-10 items-center justify-center bg-redline px-4 text-paper-white hover:bg-redline-press"
          >
            Contact
          </a>
        </aside>
      ) : null}
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-[calc(56px+env(safe-area-inset-bottom))] items-start justify-between border-t border-blueline-on-dark bg-cyanotype-deep px-4 pt-1.5 lg:hidden">
        <span
          key={`${active.number}-${active.title}`}
          className="mobile-sheet-label label flex h-11 min-w-0 items-center truncate pr-3 text-chalk"
        >
          {active.number} · {active.title}
        </span>
        {!contactVisible ? (
          <a
            href="/#contact"
            className="label flex h-11 shrink-0 items-center bg-redline px-4 text-paper-white hover:bg-redline-press"
          >
            Contact
          </a>
        ) : null}
      </div>
    </>
  );
}

function DockCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-r border-rule-on-dark p-3 last:border-r-0">
      <p className="label text-blueline-on-dark">{label}</p>
      <p className="mt-1 text-sm text-chalk">{children}</p>
    </div>
  );
}
