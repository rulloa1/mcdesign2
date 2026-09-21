import { Link } from "@tanstack/react-router";

const sheets = [
  ["/#cover", "G-001 Cover"],
  ["/#work", "G-002 Work"],
  ["/#approach", "G-006 Approach"],
  ["/#record", "G-007 Record"],
  ["/#contact", "G-008 Contact"],
] as const;

export function Footer() {
  return (
    <footer className="bg-cyanotype-deep text-chalk">
      <div className="page-grid py-12 md:py-16">
        <div className="col-span-12 grid grid-cols-2 border-l border-t border-rule-on-dark lg:grid-cols-4">
          <Cell label="Practice">McDesign</Cell>
          <Cell label="Principal">Michael Chandler, owner's representative</Cell>
          <Cell label="Location">Spring, Texas</Cell>
          <Cell label="Contact">
            <a className="draw-link block w-fit max-w-full break-all hover:text-blueline-on-dark" href="mailto:mike.rcccon@yahoo.com">mike.rcccon@yahoo.com</a>
            <a className="draw-link mt-2 block w-fit hover:text-blueline-on-dark" href="https://www.linkedin.com/in/michael-chandler-mc-design-build" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </Cell>
          <div className="col-span-2 border-b border-r border-rule-on-dark p-4 lg:col-span-3">
            <p className="label text-blueline-on-dark">Sheets</p>
            <nav aria-label="Footer sheet index" className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
              {sheets.map(([href, label]) => <a key={href} href={href} className="draw-link label text-chalk-muted hover:text-chalk">{label}</a>)}
            </nav>
          </div>
          <div className="border-b border-r border-rule-on-dark p-4">
            <p className="label text-blueline-on-dark">Also</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <Link to="/portfolio" className="draw-link label text-chalk-muted hover:text-chalk">Portfolio</Link>
              <Link to="/resume" className="draw-link label text-chalk-muted hover:text-chalk">Resume</Link>
              <Link to="/design" className="draw-link label text-chalk-muted hover:text-chalk">Design</Link>
            </div>
          </div>
          <div className="col-span-2 border-b border-r border-rule-on-dark p-4 lg:col-span-4"><p className="label text-chalk-muted">© 2026 McDesign</p></div>
        </div>
      </div>
    </footer>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="border-b border-r border-rule-on-dark p-4"><p className="label text-blueline-on-dark">{label}</p><div className="mt-2 text-sm text-chalk">{children}</div></div>;
}