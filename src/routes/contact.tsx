import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

const TITLE = "Contact Michael Chandler — McDesign";
const DESCRIPTION = "Start a conversation about a construction project, owner's representation engagement, or senior construction role.";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ContactPage,
});

function ContactPage() {
  return <div className="min-h-screen bg-mylar text-ink"><Nav /><header className="sheet-grid bg-cyanotype pt-16 text-chalk"><div className="page-grid py-20 md:py-28"><div className="col-span-12 lg:col-span-8"><p className="label text-blueline-on-dark">G-008 · Contact</p><h1 className="display mt-6 text-5xl md:text-7xl">Start a conversation.</h1><p className="mt-6 text-chalk-muted">For projects, owner's representation, and executive roles. Every message is read and answered personally.</p></div></div></header><main className="page-grid py-20 md:py-28"><aside className="col-span-12 mb-14 lg:col-span-4 lg:mb-0"><p className="text-graphite">For projects, owner's representation, and executive roles. Every message is read and answered personally.</p><a className="mt-8 block text-blueline underline underline-offset-4" href="mailto:mike.rcccon@yahoo.com">mike.rcccon@yahoo.com</a><p className="mt-3 text-graphite">Spring, Texas · projects worldwide</p></aside><section className="col-span-12 lg:col-span-7 lg:col-start-6" aria-label="Contact form"><BookingForm tone="mylar" /></section></main><Footer /></div>;
}