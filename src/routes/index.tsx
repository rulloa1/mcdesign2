import { useEffect, type CSSProperties, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { projectSlotKey } from "@/data/media-slots";
import { useReveal } from "@/hooks/use-reveal";
import { useSiteMedia } from "@/lib/site-media";
import { absoluteImage, LINKEDIN_URL, SITE_ORIGIN } from "@/lib/seo";
import profile from "@/assets/mike-profile.webp";
import heroImage from "@/assets/southcoast-cover.webp";
import houstonOaks from "@/assets/houston-oaks-cover.webp";
import poolDetail from "@/assets/hospitality-pool-1.webp";
import poolFinished from "@/assets/pool-design-36.webp";
import alpineCover from "@/assets/alpine-ranch-cover.webp";
import alpine3 from "@/assets/alpine-ranch-3.webp";
import alpine7 from "@/assets/alpine-ranch-7.webp";
import miamiCover from "@/assets/miami-beach-cover-enhanced.webp";
import miami10 from "@/assets/miami-beach-10.webp";
import miami27 from "@/assets/miami-beach-27.webp";

const TITLE = "Michael Chandler — Construction Executive & Owner's Representative | McDesign";
const DESCRIPTION =
  "Portfolio of Michael Chandler: $500M+ of ultra-luxury residential, resort, and civil work across six regions, as builder, project manager, and owner's representative.";
const HOME_URL = `${SITE_ORIGIN}/`;
const SHARE_IMAGE = absoluteImage(heroImage);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: HOME_URL },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Michael Chandler",
          jobTitle: "Construction Executive and Owner's Representative",
          worksFor: { "@type": "Organization", name: "McDesign" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Spring",
            addressRegion: "TX",
            addressCountry: "US",
          },
          sameAs: [LINKEDIN_URL],
          email: "mailto:mike.rcccon@yahoo.com",
          knowsAbout: [
            "Owner's representation",
            "Ultra-luxury residential construction",
            "Design-build",
            "Civil development",
            "Hospitality construction",
          ],
        }),
      },
    ],
  }),
  staticData: { sitemap: true },
  component: Index,
});

const selectedIds = [
  "bakers-bay",
  "yellowstone-club",
  "hospitality-pool",
  "miami-beach",
  "alpine-ranch",
  "southcoast",
  "syracuse",
  "development-civil",
  "laguna-grande",
];
const selected = selectedIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

const notes = [
  [
    "Before construction",
    [
      "Design oversight: architect and interior designer held to your budget.",
      "Contractor procurement, with bids leveled line by line.",
      "Contract negotiation before you sign.",
      "Permit procurement.",
    ],
  ],
  [
    "During construction",
    [
      "Daily project management on site.",
      "Pay applications checked against work in place.",
      "Change orders priced and negotiated.",
      "Schedule held to the contract dates.",
    ],
  ],
  ["After turnover", ["Punch list closed out.", "Property management once you move in."]],
] as const;

const cloudPath = ({
  x,
  y,
  w,
  h,
  n,
  m,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  n: number;
  m: number;
}) => {
  const dx = w / n;
  const dy = h / m;
  const horizontalRadius = dx / 2;
  const verticalRadius = dy / 2;
  return [
    `M${x} ${y}`,
    ...Array.from({ length: n }, () => `a${horizontalRadius} ${horizontalRadius} 0 0 1 ${dx} 0`),
    ...Array.from({ length: m }, () => `a${verticalRadius} ${verticalRadius} 0 0 1 0 ${dy}`),
    ...Array.from({ length: n }, () => `a${horizontalRadius} ${horizontalRadius} 0 0 1 ${-dx} 0`),
    ...Array.from({ length: m }, () => `a${verticalRadius} ${verticalRadius} 0 0 1 0 ${-dy}`),
    "z",
  ].join(" ");
};

const revisionCloudPath = cloudPath({ x: 8, y: 8, w: 384, h: 64, n: 28, m: 4 });

function RevisionCloud({
  children,
  marker = false,
  reveal = false,
}: {
  children: ReactNode;
  marker?: boolean;
  reveal?: boolean;
}) {
  return (
    <span
      className={`revision-cloud relative inline-block px-[.17em] py-[.06em] ${reveal ? "scroll-cloud" : ""}`}
      data-reveal={reveal ? "cloud" : undefined}
    >
      <span className="revision-text-mask inline-block overflow-hidden align-bottom">
        <span className="revision-text block">{children}</span>
      </span>
      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 400 80"
        className="pointer-events-none absolute -inset-x-[.17em] -inset-y-[.06em] h-[calc(100%+.12em)] w-[calc(100%+.34em)] overflow-visible fill-none stroke-redline-on-dark [stroke-width:1.5] [vector-effect:non-scaling-stroke]"
      >
        <path className="revision-cloud-path" pathLength="1" d={revisionCloudPath} />
      </svg>
      {marker ? (
        <span className="revision-marker label absolute -right-2 -top-4 text-redline-on-dark">
          △1
        </span>
      ) : null}
    </span>
  );
}

type SheetProps = {
  id: string;
  number: string;
  title: string;
  tone?: "mylar" | "cyanotype";
  next?: string;
  className?: string;
  children: ReactNode;
};

function MatchLine({ next, dark = false }: { next: string; dark?: boolean }) {
  return (
    <div
      data-reveal="plot-x"
      className={`match-line col-span-12 border-t border-dashed pt-3 ${dark ? "border-rule-on-dark text-blueline-on-dark" : "border-rule text-blueline"}`}
    >
      <p className="label">Match line — see {next}</p>
    </div>
  );
}

function Sheet({ id, number, title, tone = "mylar", next, className = "", children }: SheetProps) {
  const dark = tone === "cyanotype";
  return (
    <section
      id={id}
      data-sheet-number={number}
      data-sheet-title={title}
      className={`${dark ? "bg-cyanotype text-chalk" : "bg-mylar text-ink"} ${className}`}
    >
      <div className="page-grid sheet-content">
        <header
          className={`col-span-12 mb-14 border-t pt-3 ${dark ? "border-rule-on-dark text-blueline-on-dark" : "border-rule text-blueline"}`}
        >
          <p className="label">
            {number} · {title}
          </p>
        </header>
        {children}
        {next ? <MatchLine next={next} dark={dark} /> : null}
      </div>
    </section>
  );
}

function Cover() {
  const media = useSiteMedia();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("mc-intro", "1");
      } catch {
        /* Storage can be unavailable. */
      }
      document.documentElement.classList.add("intro-done");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="cover"
      data-sheet-number="G-001"
      data-sheet-title="Cover"
      className="sheet-grid bg-cyanotype px-2 py-2 text-chalk md:px-6 md:py-6"
    >
      <div className="cover-sheet relative mx-auto flex min-h-[calc(100svh-80px)] max-w-[1440px] flex-col px-5 py-5 md:min-h-[calc(100svh-112px)] lg:min-h-[calc(100svh-112px)] lg:justify-center lg:px-10 lg:py-10">
        <span aria-hidden="true" className="cover-edge cover-edge-top" />
        <span aria-hidden="true" className="cover-edge cover-edge-right" />
        <span aria-hidden="true" className="cover-edge cover-edge-bottom" />
        <span aria-hidden="true" className="cover-edge cover-edge-left" />
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">
          <div className="col-span-12 self-center lg:col-span-7 lg:pr-4">
            <p className="label text-blueline-on-dark">Michael Chandler · Portfolio</p>
            <h1 className="cover-title display mt-5 text-chalk">
              <span className="cover-line-mask block">
                <span className="cover-line block">Built.</span>
              </span>
              <span className="cover-line-mask block">
                <span className="cover-line block">Managed.</span>
              </span>
              <span className="cover-line-mask cover-line-cloud mt-[.08em] block overflow-visible">
                <span className="cover-line block overflow-visible">
                  <RevisionCloud marker>Represented.</RevisionCloud>
                </span>
              </span>
            </h1>
            <p className="cover-subhead mt-6 text-lg text-chalk-muted lg:text-xl">
              $500M+ of ultra-luxury residential, resort, and civil work across six regions, from
              the California coast to the Bahamas, as the builder, the project manager, and the
              owner's representative.
            </p>
            <div className="cover-cta mt-6 flex flex-wrap items-center gap-6">
              <a
                href="#work"
                className="label group flex h-[52px] items-center bg-redline px-6 text-paper-white hover:bg-redline-press"
              >
                See the work{" "}
                <span className="button-arrow ml-2" aria-hidden="true">
                  →
                </span>
              </a>
              <Link to="/resume" className="draw-link text-chalk">
                Resume
              </Link>
            </div>
          </div>
          <div className="col-span-12 mt-7 lg:col-span-5 lg:mt-0">
            <figure>
              <div className="aspect-[3/2] overflow-hidden border border-blueline-on-dark lg:aspect-[10/11]">
                <img
                  src={media("hero", heroImage)}
                  alt="Featured project"
                  width="1200"
                  height="1320"
                  loading="eager"
                  fetchPriority="high"
                  className="cover-photo h-full w-full object-cover"
                />
              </div>
              <figcaption className="label mt-3 text-blueline-on-dark">
                Sheet G-001 · Cover photograph
              </figcaption>
            </figure>
            <div className="cover-title-block mt-5 hidden grid-cols-3 border-l border-t border-rule-on-dark text-xs lg:grid">
              <Cell label="Sheet" dark index={0}>
                G-001
              </Cell>
              <Cell label="Projects" dark index={1}>
                {projects.length}
              </Cell>
              <Cell label="Delivered" dark index={2}>
                $500M+
              </Cell>
              <div
                className="cover-cell col-span-3 border-b border-r border-rule-on-dark p-3"
                style={{ "--i": 3 } as CSSProperties}
              >
                <p className="label text-blueline-on-dark">Rev △1</p>
                <p className="mt-2 text-chalk">
                  Also on the owner's side of the table: design oversight, contracts, pay
                  applications, closeout.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-8">
          <MatchLine next="G-002" dark />
        </div>
      </div>
    </section>
  );
}

function WorkSheet() {
  const media = useSiteMedia();
  return (
    <Sheet id="work" number="G-002" title="Work" next="G-003">
      <h2 className="display col-span-12 h2-size">Selected work.</h2>
      <div className="col-span-12 mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {selected.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            image={media(projectSlotKey(project.id), project.cover)}
            detail={`${index + 1} / G-002`}
            revealIndex={index % 3}
          />
        ))}
      </div>
      <Link
        to="/portfolio"
        className="label group col-span-12 mt-14 flex h-[52px] w-fit items-center border border-blueline px-6 text-ink hover:text-blueline"
      >
        <span className="draw-link">
          All {projects.length} projects <span className="button-arrow inline-block" aria-hidden="true">→</span>
        </span>
      </Link>
    </Sheet>
  );
}

type SignatureProps = {
  id: string;
  number: string;
  projectId: string;
  location: string;
  title: string;
  images: [string, string, string];
  alts: [string, string, string];
  vision: string;
  execution: string;
  stats: [string, string][];
  next: string;
};

function DetailFigure({
  image,
  alt,
  detail,
  index,
  large = false,
}: {
  image: string;
  alt: string;
  detail: string;
  index: number;
  large?: boolean;
}) {
  return (
    <figure className={`flex min-h-0 flex-col ${large ? "signature-large" : ""}`}>
      <div
        className={`min-h-0 overflow-hidden border border-blueline ${large ? "signature-large-frame" : "signature-small-frame"}`}
      >
        <img
          data-reveal="develop"
          style={{ "--i": index } as CSSProperties}
          src={image}
          alt={alt}
          width={large ? 1200 : 900}
          height={large ? 900 : 600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption
        data-reveal="rise"
        style={{ "--i": index } as CSSProperties}
        className="label mt-3 text-blueline"
      >
        {detail}
      </figcaption>
    </figure>
  );
}

function SignatureSheet(props: SignatureProps) {
  return (
    <Sheet id={props.id} number={props.number} title="Signature project" next={props.next}>
      <div className="col-span-12">
        <h2 className="display h2-size">{props.title}</h2>
        <p className="label mt-4 text-blueline">{props.location}</p>
      </div>
      <div className="signature-media col-span-12 mt-12">
        <DetailFigure
          image={props.images[0]}
          alt={props.alts[0]}
          detail="Detail 1 · Vision"
          index={0}
          large
        />
        <div className="signature-side">
          <DetailFigure
            image={props.images[1]}
            alt={props.alts[1]}
            detail="Detail 2 · Execution"
            index={1}
          />
          <DetailFigure
            image={props.images[2]}
            alt={props.alts[2]}
            detail="Detail 3 · Result"
            index={2}
          />
        </div>
      </div>
      <div className="col-span-12 mt-12 grid gap-8 border-t border-rule pt-8 lg:grid-cols-2">
        <p data-reveal="rise" className="text-graphite">
          {props.vision}
        </p>
        <p data-reveal="rise" style={{ "--i": 1 } as CSSProperties} className="text-graphite">
          {props.execution}
        </p>
      </div>
      <div className="col-span-12 mt-10 flex flex-wrap gap-8 border-y border-rule py-7">
        {props.stats.map(([value, label], index) => (
          <div key={label}>
            <span className="highlight-stat display relative inline-block px-1 text-5xl text-ink">
              <span
                data-reveal="plot-x"
                style={{ "--i": index } as CSSProperties}
                aria-hidden="true"
                className="highlight-wipe absolute inset-0 -z-0 bg-highlighter"
              />
              <span className="relative z-10">{value}</span>
            </span>
            <p className="label mt-3 text-graphite">{label}</p>
          </div>
        ))}
      </div>
      <Link
        to="/projects/$projectId"
        params={{ projectId: props.projectId }}
        className="draw-link label col-span-12 mt-8 w-fit text-blueline"
      >
        View the album →
      </Link>
    </Sheet>
  );
}

function ContactStrip() {
  return (
    <section id="contact-strip" className="bg-cyanotype py-14 text-chalk">
      <div className="page-grid items-center">
        <p className="col-span-12 text-[22px] lg:col-span-8">
          Have a project to run or a role to fill? Start a conversation.
        </p>
        <div className="col-span-12 mt-8 px-3 lg:col-span-4 lg:mt-0">
          <RevisionCloud reveal>
            <a
              href="#contact"
              className="label relative z-10 flex h-[52px] items-center justify-center bg-redline px-6 text-paper-white hover:bg-redline-press"
            >
              Start a conversation
            </a>
          </RevisionCloud>
        </div>
      </div>
    </section>
  );
}

function ApproachSheet() {
  return (
    <Sheet id="approach" number="G-006" title="Approach" next="G-007">
      <h2 className="display col-span-12 h2-size">How I run a project.</h2>
      <div className="col-span-12 mt-14 grid gap-12 lg:grid-cols-3">
        {notes.map(([heading, items], column) => (
          <div key={heading}>
            <div data-reveal="plot-x" className="border-t border-blueline pt-3">
              <h3 className="label text-blueline">{heading}</h3>
            </div>
            <ol className="mt-5">
              {items.map((item, index) => (
                <li
                  key={item}
                  data-reveal="rise"
                  style={{ "--i": index } as CSSProperties}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule py-4"
                >
                  <span className="font-mono text-sm text-blueline">
                    {String(column * 4 + index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

function RecordSheet() {
  const media = useSiteMedia();
  return (
    <Sheet id="record" number="G-007" title="Record" next="G-008">
      <h2 className="display col-span-12 h2-size">Michael Chandler</h2>
      <div className="col-span-12 mt-14 lg:col-span-4">
        <div className="aspect-[4/5] overflow-hidden border border-blueline">
          <img
            data-reveal="develop"
            src={media("about-portrait", profile)}
            alt="Michael Chandler"
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="col-span-12 mt-10 lg:col-span-7 lg:col-start-6 lg:mt-14">
        <p data-reveal="rise" className="text-graphite">
          Michael Chandler has spent more than 20 years running ultra-luxury residential, resort,
          and civil projects, with over $500 million delivered across six regions, from the
          California coast to the Bahamas. He has been the builder, the designer, the project
          manager, and the owner's representative, so he knows a project from every side of the
          table: where a budget leaks, what a schedule leaves out, and how to protect the design
          through turnover. He works through McDesign, based in Spring, Texas.
        </p>
        <div className="mt-10 grid grid-cols-2 border-l border-t border-rule lg:grid-cols-4">
          <Cell label="Projects" index={0}>
            {projects.length}
          </Cell>
          <Cell label="Delivered" index={1}>
            $500M+
          </Cell>
          <Cell label="Regions" index={2}>
            6
          </Cell>
          <Cell label="Years" index={3}>
            20+
          </Cell>
        </div>
        <div className="mt-8 flex gap-8">
          <Link to="/resume" className="draw-link label text-blueline">
            Resume →
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="draw-link label text-blueline"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </Sheet>
  );
}

function ContactSheet() {
  return (
    <Sheet id="contact" number="G-008" title="Contact" tone="cyanotype" className="sheet-grid">
      <h2 className="display col-span-12 h2-size text-chalk">Start a conversation.</h2>
      <aside className="col-span-12 mt-12 lg:col-span-4">
        <p className="text-chalk-muted">
          For projects, owner's representation, and executive roles. Every message is read and
          answered personally.
        </p>
        <a
          href="mailto:mike.rcccon@yahoo.com"
          className="draw-link mt-8 block w-fit break-all text-chalk"
        >
          mike.rcccon@yahoo.com
        </a>
        <p className="mt-3 text-chalk-muted">Spring, Texas · projects worldwide</p>
      </aside>
      <div className="col-span-12 mt-12 lg:col-span-7 lg:col-start-6">
        <BookingForm tone="cyanotype" />
      </div>
    </Sheet>
  );
}

function Index() {
  const media = useSiteMedia();
  useReveal();
  return (
    <div className="bg-mylar">
      <Nav />
      <main id="main" className="pt-16">
        <Cover />
        <WorkSheet />
        <SignatureSheet
          id="case-pool"
          number="G-003"
          next="G-004"
          projectId="hospitality-pool"
          location="SE Texas"
          title="Private club resort pool"
          images={[
            media("case-pool-1", houstonOaks),
            media("case-pool-2", poolDetail),
            media("case-pool-3", poolFinished),
          ]}
          alts={[
            "Private club resort pool overview",
            "Private club resort pool construction detail",
            "Completed private club resort pool",
          ]}
          vision="A resort-scale pool for one of Texas's most exclusive private clubs."
          execution="18 months coordinating specialty aquatic, structural, and landscape contractors across a working club site."
          stats={[
            ["189,000", "gallons"],
            ["$8M", "budget"],
            ["18", "months"],
          ]}
        />
        <SignatureSheet
          id="case-alpine"
          number="G-004"
          next="G-005"
          projectId="alpine-ranch"
          location="Montana"
          title="High alpine ranch retreat"
          images={[
            media("case-alpine-1", alpineCover),
            media("case-alpine-2", alpine3),
            media("case-alpine-3", alpine7),
          ]}
          alts={[
            "High alpine ranch exterior",
            "High alpine ranch craftsmanship detail",
            "Completed high alpine ranch retreat",
          ]}
          vision="A remote Montana ranch, with custom bronze windows from Italy framing the range."
          execution="24 months of exposed timber, custom stone masonry, and radiant heating in one of the state's most remote settings."
          stats={[
            ["2,300", "sq ft"],
            ["24", "months"],
          ]}
        />
        <SignatureSheet
          id="case-miami"
          number="G-005"
          next="G-006"
          projectId="miami-beach"
          location="South Florida"
          title="High-rise beachfront residence"
          images={[
            media("case-miami-1", miamiCover),
            media("case-miami-2", miami10),
            media("case-miami-3", miami27),
          ]}
          alts={[
            "South Florida beachfront residence",
            "Beachfront residence interior execution",
            "Completed beachfront residence millwork",
          ]}
          vision="4,200 sq ft of raw South Florida high-rise turned into a finished beachfront residence during the pandemic."
          execution="Italian marble, hotel-grade millwork, and integrated smart-home systems."
          stats={[
            ["4,200", "sq ft"],
            ["4", "bed · 4 bath"],
          ]}
        />
        <ContactStrip />
        <ApproachSheet />
        <RecordSheet />
        <ContactSheet />
      </main>
      <Footer />
    </div>
  );
}

function Cell({
  label,
  children,
  dark = false,
  index = 0,
}: {
  label: string;
  children: ReactNode;
  dark?: boolean;
  index?: number;
}) {
  return (
    <div
      data-reveal={dark ? undefined : "rise"}
      style={{ "--i": index } as CSSProperties}
      className={`cover-cell border-b border-r p-3 ${dark ? "border-rule-on-dark" : "border-rule"}`}
    >
      <p className={`label ${dark ? "text-blueline-on-dark" : "text-blueline"}`}>{label}</p>
      <p className={`mt-2 ${dark ? "text-chalk" : "text-ink"}`}>{children}</p>
    </div>
  );
}
