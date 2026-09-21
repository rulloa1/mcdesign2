import { createFileRoute } from "@tanstack/react-router";

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
  { label: "Strategic Leadership", items: "P&L Management, Multi-Year CapEx Planning, Owner Representation" },
  { label: "Operational Excellence", items: "Global Procurement, Supply Chain Resilience, Joint Venture (JV) Leadership" },
  { label: "Technical Integration", items: "Procore Analytics, BIM-Integrated Workflows, Risk Mitigation" },
  { label: "Sector Expertise", items: "Ultra-High-End Residential, Luxury Resorts & Hospitality" },
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
    company: "Dunrite Construction Group",
    title: "VP of Operations (Contract)",
    location: "San Antonio, FL",
    period: "May 2026 – August 2026",
    bullets: [],
  },
  {
    company: "NewQuest Properties",
    title: "Sr. Project Manager / Owner's Representative",
    location: "Houston, TX",
    period: "2022 – 2025",
    note: "The Clubs at Houston Oaks & The Links at Houston Oaks",
    bullets: [
      {
        label: "Capital Stewardship",
        text: "Orchestrated construction phases for a $67MM portfolio, ensuring 100% adherence to rigorous multi-year budget and timeline requirements through strategic value engineering and proactive risk mitigation.",
      },
      {
        label: "Stakeholder Synergy",
        text: "Served as the primary executive liaison, bridging the gap between architectural vision and field execution for high-net-worth developers and institutional stakeholders.",
      },
      {
        label: "Operational Strategy",
        text: "Implemented localized procurement frameworks that reduced material lead times by 15%, mitigating supply chain volatility during post-pandemic market disruptions.",
      },
      {
        label: "Design Leadership",
        text: "Oversaw design and construction phases for renovations and new facilities, leveraging architectural expertise to deliver high-quality developments.",
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
        text: "Directed a $75M construction pipeline encompassing five large private residential estates across 12 US states and international territories (Bahamas, Mexico), delivering all projects within ±2% of budget.",
      },
      {
        label: "Regulatory Navigation",
        text: "Standardized permitting and entitlement workflows across diverse international jurisdictions, accelerating project start dates by an average of 4 weeks and ensuring seamless compliance.",
      },
      {
        label: "Full-Cycle Oversight",
        text: "Managed all phases of construction from permitting to final inspections, maintaining rigorous quality standards across geographically dispersed operations.",
      },
      {
        label: "Team Leadership",
        text: "Cultivated collaborative team environments, promoting communication and project alignment across culturally diverse workforces.",
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
        label: "High-Stakes Development",
        text: "Led project management and construction oversight for multimillion-dollar mixed-use developments including luxury condo towers, spa facilities, and restaurants in North America's premier private ski and golf community.",
      },
      {
        label: "Stakeholder Management",
        text: "Managed owner representation and stakeholder communication to align project goals with exacting client expectations in an ultra-exclusive resort environment.",
      },
      {
        label: "Compliance & Entitlements",
        text: "Oversaw permit and entitlement processes, ensuring compliance with complex mountain resort regulations and environmental requirements.",
      },
      {
        label: "Team Development",
        text: "Developed and implemented team-building strategies to enhance collaboration and project efficiency across specialized construction disciplines.",
      },
    ],
  },
  {
    company: "Discovery Land Company / Starfish Company",
    title: "Project Manager",
    location: "Bakers Bay Resort, Abaco Islands, Bahamas",
    period: "2015 – 2018",
    bullets: [
      {
        label: "Resort Portfolio Leadership",
        text: "Directed project management and construction oversight for Bakers Bay Resort, encompassing Owner, Resort, and Private products including Beach Club Restaurant, Beach Club Spa Building, and Market by the Pier.",
      },
      {
        label: "Logistics Mastery",
        text: "Facilitated complex logistics and procurement processes for remote island construction, streamlining operations and enhancing efficiency despite challenging supply chain constraints and limited local infrastructure.",
      },
      {
        label: "Quality Assurance",
        text: "Oversaw multiple single-family residential projects, ensuring high-quality construction and client satisfaction in the ultra-luxury market segment.",
      },
      {
        label: "Cross-Cultural Leadership",
        text: "Implemented best practices in team building and architectural design, leveraging fluency in Spanish for effective communication with an international workforce.",
      },
    ],
  },
  {
    company: "Private Owner / Developer",
    title: "Owner's Rep / Project Manager",
    location: "Abaco Islands, Bahamas",
    period: "2015 – 2018",
    note: "Large Estate Development, Private Island",
    bullets: [
      {
        label: "Executive Representation",
        text: "Represented a private client as Owner's Rep on a $125M+ estate development, managing design, development consulting, and land development processes with focus on logistics for personnel and materials.",
      },
      {
        label: "Workforce Development",
        text: "Cultivated relationships with government officials to secure skilled workforce from multiple regions; implemented comprehensive training programs for local Bahamians to enhance construction skills and create sustainable employment.",
      },
      {
        label: "Budget & Operations Management",
        text: "Oversaw project budgets ranging from $500K to $125M, ensuring efficient operations, cost control, and value optimization throughout the development lifecycle.",
      },
      {
        label: "International Logistics",
        text: "Coordinated complex supply chain operations for remote island construction, establishing vendor relationships and transportation networks.",
      },
    ],
  },
  {
    company: "Architectural Design & Construction Consultant",
    title: "Private Owner / Developer",
    location: "Great Guana Cay and Great Abaco Island, Bahamas",
    period: "2013 – 2018",
    bullets: [
      {
        label: "Design & Constructability",
        text: "Delivered architectural and constructability consulting for private developers in the Abaco Islands, ensuring design intent translated effectively to field execution.",
      },
      {
        label: "Logistical Strategy",
        text: "Developed comprehensive logistical strategies to optimize project workflows and resource allocation in a challenging remote island environment.",
      },
      {
        label: "Regulatory Compliance",
        text: "Ensured compliance with local regulations for permits and entitlements, navigating international building codes and environmental requirements.",
      },
      {
        label: "Collaborative Leadership",
        text: "Collaborated with multidisciplinary teams to enhance project outcomes and maintain rigorous quality standards.",
      },
    ],
  },
  {
    company: "Big D Construction / Signature Homes & Hospitality Division",
    title: "Construction Consultant / Sr. Project Manager",
    location: "Multiple US States",
    period: "2014 – 2016",
    bullets: [
      {
        label: "Luxury Portfolio Leadership",
        text: "Directed multimillion-dollar luxury home projects across multiple US states, managing budgets ranging from $12.5MM to $25MM and a private resort project valued at $74MM.",
      },
      {
        label: "Process Optimization",
        text: "Enhanced project efficiency through strategic logistics and procurement management, reducing costs while maintaining luxury market standards.",
      },
      {
        label: "Team Excellence",
        text: "Cultivated collaborative team environments to maximize strengths and performance, developing leadership bench strength across geographically dispersed projects.",
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
        text: "Directed construction management and partial design for multimillion-dollar projects, including two private resorts valued at $76MM, demonstrating a unique ability to integrate design and construction disciplines.",
      },
      {
        label: "Signature Projects",
        text: "Designed and built a large Texas equestrian ranch, overseeing a $24MM budget with comprehensive architectural and construction oversight.",
      },
      {
        label: "Client Representation",
        text: "Acted as owner representative for private estate projects, managing values between $7.5MM and $28MM while serving as trusted advisor to high-net-worth clients.",
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
      <h2 className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-brass">{children}</h2>
      <div className="h-px w-full bg-bone/10" />
    </div>
  );
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <article className="border-l border-bone/10 pl-6 md:pl-8">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-serif text-xl text-bone md:text-2xl">{role.company}</h3>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">{role.period}</span>
      </div>
      <p className="mb-1 text-sm text-brass/90">
        {role.title}
        {role.location ? <span className="text-bone/40"> · {role.location}</span> : null}
      </p>
      {role.note ? <p className="mb-3 font-serif text-sm italic text-bone/50">{role.note}</p> : null}
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
    <main className="min-h-[100dvh] bg-carbon px-6 pb-24 pt-32 text-bone md:pt-40">
      <div className="mx-auto max-w-3xl">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-brass">MC Design Build</p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">Michael Chandler</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-bone/50">
            VP of Operations · Construction Executive
          </p>
          <p className="mt-2 text-sm text-bone/60">
            Spring, TX · mike.rcccon@yahoo.com · (435) 237-7373
          </p>
          <p className="mt-6 text-sm leading-relaxed text-bone/70">
            Strategic construction leader with 37+ years of experience steering multimillion-dollar developments
            from conception to handover. Expert in navigating the "triple threat" of modern construction: labor
            shortages, technological integration (Procore Certified), and complex international logistics. Proven
            track record as an Owner's Representative, managing portfolios exceeding $500M across 12 US states and
            4 countries. Native-level fluency in Spanish with a unique ability to bridge high-level architectural
            design with rigorous P&L stewardship and field execution.
          </p>
        </header>

        <section className="mb-16">
          <SectionHeading>Core Competencies</SectionHeading>
          <dl className="grid gap-4 sm:grid-cols-2">
            {competencies.map((c) => (
              <div key={c.label} className="border border-bone/10 p-5" style={{ background: "rgb(201 169 97 / 0.03)" }}>
                <dt className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass">{c.label}</dt>
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
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">{e.period}</span>
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
              <div key={m.label} className="border border-bone/10 p-5 text-center" style={{ background: "rgb(201 169 97 / 0.03)" }}>
                <p className="font-serif text-xl text-brass md:text-2xl">{m.value}</p>
                <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone/50">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6">
            <h3 className="font-serif text-lg text-bone">Architecture Studies — University of Texas</h3>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">1985</span>
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
  );
}
