import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import {
  contactInquirySchema,
  submitContactInquiry,
  type ContactInquiryInput,
} from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Michael Chandler — MC Design Build" },
      {
        name: "description",
        content:
          "Discuss an ultra-luxury residential, hospitality, civil, or owner's representation project with Michael Chandler.",
      },
      { property: "og:title", content: "Contact Michael Chandler — MC Design Build" },
      {
        property: "og:description",
        content:
          "Start a conversation about your next luxury construction, development, or owner's representation project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const emptyForm: ContactInquiryInput = {
  name: "",
  email: "",
  phone: "",
  projectType: "owners-representation",
  location: "",
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

type FormErrors = Partial<Record<keyof ContactInquiryInput, string>>;

const inputClass =
  "w-full border-0 border-b border-carbon/20 bg-transparent px-0 py-3 text-sm text-carbon outline-none transition-colors placeholder:text-carbon/30 focus:border-brass";

function ContactPage() {
  const submitInquiry = useServerFn(submitContactInquiry);
  const [form, setForm] = useState<ContactInquiryInput>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = <K extends keyof ContactInquiryInput>(key: K, value: ContactInquiryInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactInquirySchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof ContactInquiryInput] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    try {
      await submitInquiry({ data: parsed.data });
      setForm(emptyForm);
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative z-10 min-h-screen bg-bone text-carbon">
      <Nav />
      <header className="bg-carbon px-6 pb-20 pt-40 text-bone md:px-20 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-brass">
            Begin a conversation
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
            Bring the right leadership to your next project.
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-bone/65 md:text-lg">
            Share the essentials below. Every inquiry is reviewed personally and treated with
            discretion.
          </p>
        </div>
      </header>

      <main className="px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <aside>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-brass-dark">
              Project inquiries
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-snug md:text-4xl">
              A focused first conversation.
            </h2>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-carbon/60">
              Owner's representation, residential construction, hospitality, civil development,
              estate management, and select advisory engagements.
            </p>
            <dl className="mt-12 space-y-8 border-t border-carbon/10 pt-8">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/40">
                  Based in
                </dt>
                <dd className="mt-2 text-sm">Spring, Texas · Projects worldwide</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/40">
                  Direct email
                </dt>
                <dd className="mt-2">
                  <a
                    className="text-sm underline decoration-brass/50 underline-offset-4"
                    href="mailto:mike.rcccon@yahoo.com"
                  >
                    mike.rcccon@yahoo.com
                  </a>
                </dd>
              </div>
            </dl>
          </aside>

          <section aria-labelledby="inquiry-heading">
            <h2 id="inquiry-heading" className="sr-only">
              Project inquiry form
            </h2>
            {status === "sent" ? (
              <div className="border-y border-brass/30 py-16" role="status">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-brass-dark">
                  Inquiry received
                </p>
                <h2 className="mt-5 font-serif text-4xl">Thank you for reaching out.</h2>
                <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-carbon/60">
                  Your project details have been received. I will review them personally and
                  follow up directly.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="mt-9 rounded-none border-carbon/25 bg-transparent px-7 py-5 text-xs uppercase tracking-[0.18em] shadow-none hover:bg-carbon hover:text-bone"
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-9 md:grid-cols-2">
                <Field label="Name" htmlFor="name" error={errors.name} required>
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </Field>
                <Field label="Email" htmlFor="email" error={errors.email} required>
                  <input
                    id="email"
                    required
                    type="email"
                    autoComplete="email"
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                    placeholder="Optional"
                  />
                </Field>
                <Field label="Project location" htmlFor="location" error={errors.location}>
                  <input
                    id="location"
                    autoComplete="address-level2"
                    maxLength={120}
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className={inputClass}
                    placeholder="City, state or country"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? "location-error" : undefined}
                  />
                </Field>
                <Field
                  label="Project type"
                  htmlFor="projectType"
                  error={errors.projectType}
                  required
                >
                  <select
                    id="projectType"
                    value={form.projectType}
                    onChange={(e) =>
                      update("projectType", e.target.value as ContactInquiryInput["projectType"])
                    }
                    className={inputClass}
                  >
                    <option value="owners-representation">Owner's Representation</option>
                    <option value="residential-construction">Residential Construction</option>
                    <option value="design-build">Design-Build</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="civil-development">Civil / Development</option>
                    <option value="estate-management">Estate Management</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Anticipated budget" htmlFor="budget">
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) =>
                      update("budget", e.target.value as ContactInquiryInput["budget"])
                    }
                    className={inputClass}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="under-1m">Under $1M</option>
                    <option value="1m-5m">$1M–$5M</option>
                    <option value="5m-15m">$5M–$15M</option>
                    <option value="15m-plus">$15M+</option>
                    <option value="not-sure">Not yet determined</option>
                  </select>
                </Field>
                <Field label="Anticipated start" htmlFor="timeline">
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) =>
                      update("timeline", e.target.value as ContactInquiryInput["timeline"])
                    }
                    className={inputClass}
                  >
                    <option value="">Select a timeframe</option>
                    <option value="immediately">Immediately</option>
                    <option value="3-6-months">3–6 months</option>
                    <option value="6-12-months">6–12 months</option>
                    <option value="12-months-plus">12+ months</option>
                    <option value="exploring">Exploring options</option>
                  </select>
                </Field>
                <div className="hidden md:block" />
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>
                <Field
                  label="Tell us about the project"
                  htmlFor="message"
                  error={errors.message}
                  required
                  full
                >
                  <textarea
                    id="message"
                    required
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={6}
                    minLength={10}
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${inputClass} resize-y leading-relaxed`}
                    placeholder="Project scope, goals, current stage, and where experienced leadership would be most valuable."
                    aria-invalid={Boolean(errors.message)}
                  />
                </Field>
                <div className="md:col-span-2 flex flex-col items-start gap-4 border-t border-carbon/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-relaxed text-carbon/45">
                    Your details are used only to respond to this inquiry.
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-auto rounded-none bg-carbon px-9 py-4 text-xs uppercase tracking-[0.2em] text-bone shadow-none hover:bg-brass hover:text-carbon"
                  >
                    {status === "sending" ? "Sending…" : "Submit inquiry"}
                  </Button>
                </div>
                {status === "error" ? (
                  <p role="alert" className="md:col-span-2 text-sm text-destructive">
                    Your inquiry could not be sent. Please try again or email us directly.
                  </p>
                ) : null}
              </form>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-carbon/10 px-6 py-10 md:px-20">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 text-xs text-carbon/45">
          <p className="font-mono uppercase tracking-[0.18em]">
            MC Design Build — Michael Chandler
          </p>
          <Link
            to="/"
            className="uppercase tracking-[0.18em] transition-colors hover:text-brass-dark"
          >
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  full,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/50"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-brass-dark">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
