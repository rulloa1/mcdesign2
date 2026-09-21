import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { SITE_ORIGIN } from "@/lib/seo";
import profile from "@/assets/mike-profile.webp";

const TITLE = "Contact Michael Chandler — McDesign";
const DESCRIPTION = "Start a conversation about a construction project, owner's representation engagement, or senior construction role.";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/contact` },
      { property: "og:image", content: `${SITE_ORIGIN}${profile}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_ORIGIN}${profile}` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <div className="min-h-dvh bg-mylar text-ink"><Nav /><header className="sheet-grid border-b border-rule-on-dark bg-cyanotype pt-16 text-chalk"><div className="page-grid items-center py-20 md:py-28"><div className="col-span-12 lg:col-span-8"><p className="label text-blueline-on-dark">G-008 · Contact</p><h1 className="display h1-size mt-6">Start a conversation.</h1><p className="mt-6 text-chalk-muted">For projects, owner's representation, and executive roles. Every message is read and answered personally.</p></div><div className="col-span-12 mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0"><img src={profile} alt="Michael Chandler" width="800" height="1000" loading="lazy" decoding="async" className="aspect-[4/5] w-full border border-blueline-on-dark object-cover" /></div></div></header><main id="main" className="page-grid py-20 md:py-28"><aside className="col-span-12 mb-14 lg:col-span-4 lg:mb-0"><p className="text-graphite">For projects, owner's representation, and executive roles. Every message is read and answered personally.</p><a className="draw-link mt-8 block w-fit max-w-full break-all text-blueline" href="mailto:mike.rcccon@yahoo.com">mike.rcccon@yahoo.com</a><p className="mt-3 text-graphite">Spring, Texas · projects worldwide</p></aside><section className="col-span-12 lg:col-span-7 lg:col-start-6" aria-label="Contact form"><BookingForm tone="mylar" /></section></main><Footer /></div>;
}