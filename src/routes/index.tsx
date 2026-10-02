import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { StoryStage } from "@/components/site/StoryStage";
import { projects } from "@/data/projects";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";
import { competencies, experience, earlierCareer, impact, certifications } from "@/data/resume";
import profileAsset from "@/assets/mike-headshot.jpg.asset.json";

const TITLE = "Michael Chandler — Design & Construction Executive";
const DESCRIPTION =
  "Michael Chandler — design and construction executive with 37+ years delivering luxury hospitality, resort, and ultra-high-end residential projects.";

const EMAIL = "mike.rcccon@yahoo.com";
const PHONE = "(435) 237-7373";
const LINKEDIN = "https://www.linkedin.com/in/michael-chandler-3858a63a";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Michael Chandler",
          jobTitle: "Design & Construction Executive",
          email: EMAIL,
          url: "https://mcdesign.bio",
          sameAs: [LINKEDIN],
          address: { "@type": "PostalAddress", addressLocality: "Spring", addressRegion: "TX" },
        }),
      },
    ],
  }),
  component: Index,
});

const featured = ["miami-beach", "alpine-ranch", "southcoast", "hospitality-pool", "carmel-knolls", "syracuse"];

const approach = [
  { title: "Planning", body: "Define scope, budget, and schedule before work begins, so every decision has a reference point." },
  { title: "Coordination", body: "Keep design teams, trades, and ownership working from the same information." },
  { title: "Ownership", body: "Take responsibility for outcomes — budget, schedule, quality, and safety." },
  { title: "Communication", body: "Report plainly to owners and stakeholders, early and often." },
  { title: "Operational review", body: "Review progress against plan, surface obstacles, and resolve them before they grow." },
];

function Eyebrow({ children }: { children: string }) {
  return <p className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-brass">{children}</p>;
}

function Index() {
  const media = useSiteMedia();
  const year = new Date().getFullYear();

  return (
    <div className="relative z-10 bg-carbon text-bone">
      <Nav />
      <main>
        <StoryStage />

        {/* 1. Executive Profile */}
        <section id="profile" className="bg-graphite px-6 py-28 md:px-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-14 md:flex-row md:items-center">
            <div className="md:w-2/5">
              <img
                src={media("about-portrait", profileAsset.url)}
                alt="Michael Chandler"
                loading="lazy"
                className="w-full border border-bone/10 object-cover"
                style={{ aspectRatio: "3 / 4" }}
              />
            </div>
            <div className="md:w-3/5">
              <Eyebrow>Executive Profile</Eyebrow>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">Michael Chandler</h2>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-bone/55">
                Design & Construction Executive · Hospitality & Resort Projects · Owner's Representative
              </p>
              <div className="mt-8 space-y-5 text-lg font-light leading-relaxed text-bone/70">
                <p>
                  Design and construction executive with 37+ years of experience delivering luxury
                  hospitality, resort, and ultra-high-end residential projects. Managed more than $500M
                  in construction value, with individual project budgets from $500K to $125M across 12
                  states and 4 countries. Procore Certified, with native-level Spanish and a track
                  record of bridging architectural design, P&L stewardship, and field execution for
                  owners, developers, and private clubs.
                </p>
                <p>
                  As Owner of MC Design, I bring a rare combination of architectural sensitivity
                  and rigorous project management to every engagement.
                </p>
              </div>
              <p className="mt-8 border-l-2 border-brass pl-4 text-sm text-bone/65">
                Open to executive operations leadership opportunities, including VP of Operations roles.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Professional Experience */}
        <section id="experience" className="bg-carbon px-6 py-28 md:px-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Professional Experience</Eyebrow>
            <h2 className="mb-16 font-serif text-4xl md:text-5xl">Where I've led.</h2>
            <div className="space-y-12">
              {experience.map((r) => (
                <article key={`${r.company}-${r.period}`} className="grid gap-4 border-t border-bone/10 pt-8 md:grid-cols-[1fr_2fr] md:gap-12">
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/45">{r.period}</p>
                    <h3 className="mt-2 font-serif text-2xl">{r.company}</h3>
                    <p className="mt-1 text-sm text-brass">{r.title}</p>
                    {r.location ? <p className="mt-1 text-sm text-bone/45">{r.location}</p> : null}
                    {r.note ? <p className="mt-2 font-serif text-sm italic text-bone/50">{r.note}</p> : null}
                  </div>
                  {r.bullets.length ? (
                    <ul className="space-y-3">
                      {r.bullets.map((b) => (
                        <li key={b.label ?? b.text} className="text-[0.95rem] leading-relaxed text-bone/65">
                          {b.label ? <span className="text-bone/90">{b.label}: </span> : null}
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-bone/45">Details available upon request.</p>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-16 border-t border-bone/10 pt-8">
              <h3 className="mb-6 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-bone/50">Earlier Career</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {earlierCareer.map((e) => (
                  <div key={e.org}>
                    <p className="text-bone/90">{e.role} · <span className="text-brass">{e.org}</span></p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/40">{e.period}</p>
                    <p className="mt-1 text-sm text-bone/60">{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Selected Projects */}
        <section id="projects" className="bg-slate px-6 py-28 md:px-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Selected Projects</Eyebrow>
            <h2 className="mb-16 font-serif text-4xl md:text-5xl">A legacy of scale.</h2>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {featured.map((id) => {
                const p = projects.find((x) => x.id === id);
                if (!p) return null;
                return (
                  <Link key={id} to="/projects/$projectId" params={{ projectId: id }} className="group block focus-visible:outline-2 focus-visible:outline-brass">
                    <div className="overflow-hidden bg-iron">
                      <img src={media(projectSlotKey(id), p.cover)} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl group-hover:text-brass">{p.title}</h3>
                    <p className="mt-1 text-sm text-bone/50">{p.location}</p>
                    <p className="mt-3 text-sm text-bone/70"><span className="text-bone/90">Role: </span>{p.role}</p>
                    {p.specs ? <p className="mt-1 text-sm text-bone/55">{p.specs}</p> : null}
                    <span className="mt-4 inline-block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass">View album →</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-16">
              <Link to="/portfolio" className="story-btn">View all {projects.length} projects</Link>
            </div>
          </div>
        </section>

        {/* 4. Leadership Approach */}
        <section id="approach" className="bg-carbon px-6 py-28 md:px-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Leadership Approach</Eyebrow>
            <h2 className="mb-14 font-serif text-4xl md:text-5xl">How I run the work.</h2>
            <div className="grid gap-10 md:grid-cols-5">
              {approach.map((a) => (
                <div key={a.title}>
                  <div className="mb-5 h-px w-10 bg-brass" />
                  <h3 className="mb-3 font-serif text-xl">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-bone/60">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Qualifications */}
        <section id="qualifications" className="bg-graphite px-6 py-28 md:px-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Qualifications</Eyebrow>
            <h2 className="mb-14 font-serif text-4xl md:text-5xl">Skills, education & certifications.</h2>
            <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {competencies.map((c) => (
                <div key={c.label} className="border border-bone/10 bg-slate p-6">
                  <dt className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass">{c.label}</dt>
                  <dd className="text-sm leading-relaxed text-bone/70">{c.items}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-bone/50">Education</h3>
                <p className="font-serif text-lg">Architecture Studies — University of Texas</p>
                <p className="text-sm text-bone/50">1985</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-bone/50">Certifications & Languages</h3>
                {certifications.map((c) => (
                  <p key={c.label} className="text-sm text-bone/70"><span className="text-bone/90">{c.label}: </span>{c.text}</p>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {impact.map((m) => (
                <div key={m.label} className="border border-bone/10 p-5">
                  <p className="font-serif text-xl text-brass md:text-2xl">{m.value}</p>
                  <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone/50">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Resume & Contact */}
        <section id="contact" className="bg-carbon px-6 py-28 text-center md:px-20">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Resume & Contact</Eyebrow>
            <h2 className="font-serif text-4xl md:text-6xl">Let’s discuss what’s next.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/resume" className="story-btn story-btn-primary">View Resume</Link>
              <a href={`mailto:${EMAIL}`} className="story-btn">Email Me</a>
              <Link to="/contact" className="story-btn">Contact Form</Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3 font-mono text-sm text-bone/60">
              <a href={`mailto:${EMAIL}`} className="hover:text-brass">{EMAIL}</a>
              <a href="tel:+14352377373" className="hover:text-brass">{PHONE}</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-brass">LinkedIn</a>
              <span>Spring, TX</span>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="border-t border-bone/10 bg-carbon px-6 py-10 md:px-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/45">
          <span>mcdesign.bio · © {year} Michael Chandler</span>
          <div className="flex gap-6">
            <Link to="/portfolio" className="hover:text-brass">Portfolio</Link>
            <Link to="/design" className="hover:text-brass">Design</Link>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }} className="hover:text-brass">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
