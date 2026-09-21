import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#work", label: "G-002 Work" },
  { href: "/#approach", label: "G-006 Approach" },
  { href: "/#record", label: "G-007 Record" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (overlay.current) overlay.current.inert = !open;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-rule-on-dark bg-cyanotype-deep">
        <nav className="page-grid h-full items-center" aria-label="Primary navigation">
          <Link to="/" className="col-span-8 flex min-w-0 items-center gap-4 lg:col-span-5">
            <span className="display text-xl text-chalk">McDesign</span><span className="label hidden text-chalk-muted min-[480px]:inline">Michael Chandler</span>
          </Link>
          <div className="col-span-7 hidden items-center justify-end gap-6 lg:flex">
            {links.map((link) => <a key={link.href} href={link.href} className="label text-chalk-muted hover:text-chalk">{link.label}</a>)}
            <Link to="/resume" className="label text-chalk-muted hover:text-chalk">Resume</Link>
            <a href="/#contact" className="label flex h-10 items-center bg-redline px-4 text-chalk hover:bg-redline-press">Contact</a>
          </div>
          <div className="col-span-4 flex justify-end lg:hidden">
            <Button type="button" variant="ghost" size="icon" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="h-11 w-11 rounded-none text-chalk hover:bg-transparent hover:text-blueline-on-dark">
              <span className="label text-lg">{open ? "×" : "☰"}</span>
            </Button>
          </div>
        </nav>
      </header>
      <div ref={overlay} aria-hidden={!open} className={`fixed inset-0 z-40 bg-cyanotype px-4 pb-8 pt-24 lg:hidden ${open ? "block" : "hidden"}`}>
        <nav className="flex h-full flex-col" aria-label="Mobile navigation">
          <div className="flex flex-col border-t border-rule-on-dark">
            {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="display border-b border-rule-on-dark py-5 text-4xl text-chalk">{link.label}</a>)}
            <Link to="/resume" onClick={() => setOpen(false)} className="display border-b border-rule-on-dark py-5 text-4xl text-chalk">Resume</Link>
          </div>
          <a href="/#contact" onClick={() => setOpen(false)} className="label mt-auto flex h-[52px] items-center justify-center bg-redline text-chalk hover:bg-redline-press">Contact</a>
        </nav>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-[calc(56px+env(safe-area-inset-bottom))] items-start justify-between border-t border-blueline-on-dark bg-cyanotype-deep px-4 pt-1.5 lg:hidden">
        <span className="label flex h-11 items-center text-chalk">G-001 · Cover</span><a href="/#contact" className="label flex h-11 items-center bg-redline px-4 text-chalk hover:bg-redline-press">Contact</a>
      </div>
    </>
  );
}