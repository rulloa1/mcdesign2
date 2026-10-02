import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Michael Chandler | MC Design Build" },
      {
        name: "description",
        content:
          "Professional experience, education, and skills of Michael Chandler — strategic construction executive with 37+ years and $500M+ delivered across 12 US states and 4 countries.",
      },
      {
        property: "og:title",
        content: "Resume — Michael Chandler | MC Design Build",
      },
      {
        property: "og:description",
        content:
          "Professional experience, education, and skills of Michael Chandler — strategic construction executive with 37+ years and $500M+ delivered across 12 US states and 4 countries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResumePage,
});

import { competencies, experience, earlierCareer, impact, certifications, type Role } from "@/data/resume";

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-brass">
        {children}
      </h2>
      <div className="h-px w-full bg-bone/10" />
    </div>
  );
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <article className="border-l border-bone/10 pl-6 md:pl-8">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-serif text-xl text-bone md:text-2xl">{role.company}</h3>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">
          {role.period}
        </span>
      </div>
      <p className="mb-1 text-sm text-brass/90">
        {role.title}
        {role.location ? <span className="text-bone/40"> · {role.location}</span> : null}
      </p>
      {role.note ? (
        <p className="mb-3 font-serif text-sm italic text-bone/50">{role.note}</p>
      ) : null}
      {role.bullets.length > 0 && (
        <ul className="mt-3 space-y-3">
          {role.bullets.map((b) => (
            <li key={b.label ?? b.text} className="text-sm leading-relaxed text-bone/70">
              {b.label ? <span className="text-bone/90">{b.label}: </span> : null}
              {b.text}
            </li>
          ))}
        </ul>
      )}
      {role.bullets.length === 0 && (
        <p className="mt-2 text-sm italic text-bone/40">Details available upon request.</p>
      )}
    </article>
  );
}

function ResumePage() {
  return (
    <div className="relative z-10 min-h-[100dvh] bg-carbon text-bone">
      <div className="print:hidden">
        <Nav />
      </div>
      <main className="px-6 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <header className="mb-16">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-brass">
                MC Design Build
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="print:hidden cursor-pointer inline-flex items-center gap-2 border border-bone/20 px-4 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/70 transition-colors hover:border-brass hover:text-brass"
              >
                Print / Save PDF
              </button>
            </div>
            <h1 className="font-serif text-4xl leading-tight md:text-5xl">Michael Chandler</h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-bone/50">
              Design & Construction Executive · Hospitality & Resort Projects · Owner's
              Representative
            </p>
            <p className="mt-2 text-sm text-bone/60">
              Spring, TX · mike.rcccon@yahoo.com · (435) 237-7373 ·{" "}
              <a
                href="https://www.linkedin.com/in/michael-chandler-3858a63a"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-brass/50 underline-offset-4 transition-colors hover:text-brass"
              >
                linkedin.com/in/michael-chandler-3858a63a
              </a>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/70">
              Design and construction executive with 37+ years of experience delivering luxury
              hospitality, resort, and ultra-high-end residential projects. Managed more than $500M
              in construction value, with individual project budgets from $500K to $125M across 12
              states and 4 countries. Procore Certified, with native-level Spanish and a track
              record of bridging architectural design, P&L stewardship, and field execution for
              owners, developers, and private clubs.
            </p>
          </header>

          <section className="mb-16">
            <SectionHeading>Core Competencies</SectionHeading>
            <dl className="grid gap-4 sm:grid-cols-2">
              {competencies.map((c) => (
                <div
                  key={c.label}
                  className="border border-bone/10 p-5"
                  style={{ background: "rgb(201 169 97 / 0.03)" }}
                >
                  <dt className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass">
                    {c.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-bone/70">{c.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-16">
            <SectionHeading>Professional Experience</SectionHeading>
            <div className="space-y-12">
              {experience.map((role) => (
                <RoleBlock key={`${role.company}-${role.period}`} role={role} />
              ))}
            </div>
          </section>

          <section className="mb-16">
            <SectionHeading>Earlier Career</SectionHeading>
            <div className="space-y-6">
              {earlierCareer.map((e) => (
                <article key={`${e.org}-${e.period}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-base text-bone/90">
                      {e.role} · <span className="text-brass/90">{e.org}</span>
                    </h3>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-bone/60">{e.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <SectionHeading>Career Impact</SectionHeading>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {impact.map((m) => (
                <div
                  key={m.label}
                  className="border border-bone/10 p-5 text-center"
                  style={{ background: "rgb(201 169 97 / 0.03)" }}
                >
                  <p className="font-serif text-xl text-brass md:text-2xl">{m.value}</p>
                  <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone/50">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <SectionHeading>Education</SectionHeading>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6">
              <h3 className="font-serif text-lg text-bone">
                Architecture Studies — University of Texas
              </h3>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">
                1985
              </span>
            </div>
          </section>

          <section>
            <SectionHeading>Certifications & Distinctions</SectionHeading>
            <ul className="space-y-4">
              {certifications.map((c) => (
                <li key={c.label} className="text-sm leading-relaxed text-bone/70">
                  <span className="text-bone/90">{c.label}</span> — {c.text}
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-bone/10 pt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/40">
              Professional references and detailed project portfolio available upon request.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
