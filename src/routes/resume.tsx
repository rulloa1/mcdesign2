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

const competencies: { label: string; items: string }[] = [
  {
    label: "Design & Construction Leadership",
    items: "Renovation & New-Build Delivery, Design Management, Constructability Review, Owner Representation",
  },
  {
    label: "Capital Planning & Budgeting",
    items: "Multi-Year CapEx Planning, Construction Budgeting & Cost Control, Value Engineering, P&L Management",
  },
  {
    label: "Portfolio & Team Leadership",
    items: "Multi-Site Oversight, Mentoring PMs & Superintendents, Executive & Ownership Reporting",
  },
  {
    label: "Procurement & Logistics",
    items: "Global Procurement, Supply Chain Resilience, Remote-Site Logistics; Procore (Certified), BIM Workflows",
  },
  {
    label: "Hospitality Expertise",
    items: "Luxury Hotels & Resorts, Private Clubs, Spa and Food & Beverage Facilities, Ultra-High-End Residential",
  },
];

type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  note?: string;
  bullets: { label?: string; text: string }[];
};

const experience: Role[] = [
  {
    company: "The Mangrove Group (Private Consulting)",
    title: "CEO & Head of Operations (Contract)",
    location: "San Antonio, FL",
    period: "May 2026 – Aug 2026",
    bullets: [
      {
        label: "Executive Leadership",
        text: "Led company operations on a contract basis, reporting directly to ownership and setting priorities across the active construction portfolio.",
      },
      {
        label: "Portfolio Oversight",
        text: "Held project teams accountable for budget, schedule, and quality through consistent cost reporting and executive-level project reviews.",
      },
      {
        label: "Process Improvement",
        text: "Standardized procurement, scheduling, and project reporting workflows to give ownership clearer cost visibility and faster decisions.",
      },
      {
        label: "Team Development",
        text: "Led and mentored project managers, superintendents, and field staff, tightening accountability between office and field.",
      },
    ],
  },
  {
    company: "NewQuest Properties",
    title: "Sr. Project Manager / Owner's Representative",
    location: "Houston, TX",
    period: "2022 – 2025",
    note: "The Clubs at Houston Oaks & The Links at Houston Oaks",
    bullets: [
      {
        label: "Renovation & New Build",
        text: "Oversaw design and construction of club renovations and new facilities, applying architectural expertise to protect design intent, finish quality, and member experience.",
      },
      {
        label: "Capital Stewardship",
        text: "Directed construction phases of a $67MM private club portfolio, holding to multi-year budget and schedule requirements through value engineering and proactive risk mitigation.",
      },
      {
        label: "Ownership Liaison",
        text: "Served as primary executive liaison between the design team, the field, high-net-worth developers, and institutional stakeholders.",
      },
      {
        label: "Procurement Strategy",
        text: "Built localized procurement frameworks that cut material lead times by 15% during post-pandemic supply chain disruption.",
      },
    ],
  },
  {
    company: "The Mangrove Group",
    title: "Project Manager / Owner's Representative",
    location: "International / Remote",
    period: "2020 – 2022",
    bullets: [
      {
        label: "Portfolio Management",
        text: "Directed a $75M pipeline of five large private residential estates in the U.S. and abroad (Bahamas, Mexico), delivering every project within ±2% of budget.",
      },
      {
        label: "Regulatory Navigation",
        text: "Standardized permitting and entitlement workflows across international jurisdictions, pulling project starts forward by an average of 4 weeks.",
      },
      {
        label: "Full-Cycle Oversight",
        text: "Managed every phase from permitting to final inspection, holding a consistent quality standard across geographically dispersed sites.",
      },
      {
        label: "Team Leadership",
        text: "Aligned multilingual, culturally diverse project teams around shared schedules and quality expectations.",
      },
    ],
  },
  {
    company: "Yellowstone Club",
    title: "Project Manager",
    location: "Big Sky, MT",
    period: "2018 – 2020",
    bullets: [
      {
        label: "Resort Development",
        text: "Led construction oversight for multimillion-dollar luxury condominium towers, spa facilities, and restaurants in North America's premier private ski and golf community.",
      },
      {
        label: "Owner Representation",
        text: "Managed stakeholder communication to align project goals with the exacting expectations of an ultra-exclusive membership.",
      },
      {
        label: "Compliance & Entitlements",
        text: "Ran permit and entitlement processes under complex mountain-resort and environmental regulations.",
      },
    ],
  },
  {
    company: "Discovery Land Company / Starfish Company",
    title: "Project Manager — Bakers Bay Resort",
    location: "Great Guana Cay, Abaco Islands, Bahamas",
    period: "2015 – 2018",
    bullets: [
      {
        label: "Resort Portfolio",
        text: "Directed construction of Owner, Resort, and Private products, including the Beach Club Restaurant, Beach Club Spa, Market by the Pier, and multiple ultra-luxury single-family residences.",
      },
      {
        label: "Island Logistics",
        text: "Ran procurement and logistics for remote-island construction with limited local infrastructure, keeping materials and crews moving on schedule.",
      },
      {
        label: "Cross-Cultural Leadership",
        text: "Used native-level Spanish to lead and communicate with an international workforce.",
      },
    ],
  },
  {
    company: "Private Owner / Developer — Private Island Estate",
    title: "Owner's Representative / Project Manager",
    location: "Abaco Islands, Bahamas",
    period: "2015 – 2018",
    bullets: [
      {
        label: "Executive Representation",
        text: "Represented the owner on a $125M+ estate development, managing design, development consulting, and land development, with project budgets from $500K to $125M.",
      },
      {
        label: "Workforce Development",
        text: "Worked with government officials to secure skilled labor from multiple regions and launched training programs that built construction skills and lasting jobs for local Bahamians.",
      },
    ],
  },
  {
    company: "Architectural Design & Construction Consultant",
    title: "Private Owners / Developers",
    location: "Great Guana Cay & Great Abaco Island, Bahamas",
    period: "2013 – 2018",
    bullets: [
      {
        label: "Design & Constructability",
        text: "Provided architectural and constructability consulting so design intent translated cleanly to field execution.",
      },
      {
        label: "Logistics & Compliance",
        text: "Developed logistics strategies for remote-island sites and managed local permitting, codes, and environmental requirements.",
      },
    ],
  },
  {
    company: "Big D Construction — Signature Homes & Hospitality Division",
    title: "Construction Consultant / Sr. Project Manager",
    location: "Multi-State (concurrent engagement)",
    period: "2014 – 2016",
    bullets: [
      {
        label: "Luxury Portfolio",
        text: "Directed luxury home projects across multiple U.S. states with budgets of $12.5MM–$25MM, plus a $74MM private resort project.",
      },
      {
        label: "Process Optimization",
        text: "Reduced costs through strategic logistics and procurement management while holding luxury-market standards.",
      },
    ],
  },
  {
    company: "RCC Construction",
    title: "Sr. Designer / Owner / Construction Licensee",
    location: "Del Monte Forest, CA",
    period: "2004 – 2013",
    bullets: [
      {
        label: "Design-Build Leadership",
        text: "Directed construction management and partial design for two private resorts valued at $76MM.",
      },
      {
        label: "Signature Project",
        text: "Designed and built a large Texas equestrian ranch on a $24MM budget, with full architectural and construction oversight.",
      },
      {
        label: "Client Representation",
        text: "Served as owner's representative and trusted advisor to high-net-worth clients on private estates valued at $7.5MM–$28MM.",
      },
    ],
  },
];

const earlierCareer: { role: string; org: string; period: string; text: string }[] = [
  {
    role: "Co-Founder / COO",
    org: "St. Pauline Primate Trust & Preserve",
    period: "1999 – 2012",
    text: "Founded and directed a primate rescue organization, oversaw the rescue of 53 primates, and developed specialized behavioral rehabilitation programs.",
  },
  {
    role: "Founder / CEO",
    org: "At Your Service / Coachman Ltd Corp.",
    period: "1996 – 2004",
    text: "Launched an exclusive transportation concierge service and secured contracts with Pebble Beach Resorts and top national agencies.",
  },
  {
    role: "Designer / Construction Consultant",
    org: "The Pebble Beach Company",
    period: "1993 – 1996",
    text: "Consulted on design, remodel, and construction for one of America's most iconic resort properties.",
  },
  {
    role: "Construction & Operations Consultant",
    org: "Inn of the Anasazi",
    period: "1991 – 1993",
    text: "Recruited by the cofounder to establish operations for a new boutique hotel in Santa Fe, NM.",
  },
  {
    role: "Architectural Design Assistant",
    org: "Robert Young and Associates",
    period: "1987 – 1989",
    text: "Design support for retail, commercial, and hospitality venues in Dallas, TX.",
  },
  {
    role: "Design / Remodel Team Member",
    org: "Rosewood Hotel Group",
    period: "1986 – 1987",
    text: "Collaborated on innovative design solutions for luxury hotel remodel projects in Dallas, TX.",
  },
];

const impact: { value: string; label: string }[] = [
  { value: "$500M+", label: "Total Construction Value Managed" },
  { value: "$500K – $125M", label: "Project Portfolio Range" },
  { value: "12 States · 4 Countries", label: "Geographic Reach" },
  { value: "37+ Years", label: "Industry Experience" },
];

const certifications = [
  {
    label: "Procore Certified",
    text: "Construction Management Software Platform (Financial Management & Core Tools)",
  },
  {
    label: "Fluent Spanish",
    text: "Native-level proficiency for international project communication",
  },
  {
    label: "Geographic Expertise",
    text: "Completed projects across 12 US states, Mexico, Bahamas, and Costa Rica",
  },
];

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
              VP of Operations · Construction Executive
            </p>
            <p className="mt-2 text-sm text-bone/60">
              Spring, TX · mike.rcccon@yahoo.com · (435) 237-7373
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/70">
              Strategic construction leader with 37+ years of experience steering
              multimillion-dollar developments from conception to handover. Expert in navigating the
              "triple threat" of modern construction: labor shortages, technological integration
              (Procore Certified), and complex international logistics. Proven track record as an
              Owner's Representative, managing portfolios exceeding $500M across 12 US states and 4
              countries. Native-level fluency in Spanish with a unique ability to bridge high-level
              architectural design with rigorous P&L stewardship and field execution.
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
