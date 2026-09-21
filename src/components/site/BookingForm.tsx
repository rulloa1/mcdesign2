import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { BOOKING_CALENDAR_URL } from "@/config/site";
import { contactInquirySchema, submitContactInquiry, type ContactInquiryInput } from "@/lib/contact.functions";
import { useReveal } from "@/hooks/use-reveal";

type Tone = "mylar" | "cyanotype";
type Errors = Partial<Record<keyof ContactInquiryInput, string>>;
const initial: ContactInquiryInput = { name: "", email: "", phone: "", projectType: "owners-representation", projectStage: "", location: "", budget: "", timeline: "", message: "", website: "" };

export function BookingForm({ tone }: { tone: Tone }) {
  useReveal();
  const send = useServerFn(submitContactInquiry);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dark = tone === "cyanotype";
  const role = form.projectType === "executive-role";
  const control = `min-h-11 w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none ${dark ? "border-rule-on-dark text-chalk focus:border-redline-on-dark" : "border-rule text-ink focus:border-redline"}`;
  const update = <K extends keyof ContactInquiryInput>(key: K, value: ContactInquiryInput[K]) => { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = role ? { ...form, location: "", projectStage: "", budget: "", timeline: "" } : form;
    const parsed = contactInquirySchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => { const field = issue.path[0]; if (typeof field === "string" && !next[field as keyof Errors]) next[field as keyof Errors] = issue.message; });
      setErrors(next); return;
    }
    setStatus("sending");
    try { await send({ data: parsed.data }); setForm(initial); setStatus("sent"); } catch { setStatus("error"); }
  };
  if (status === "sent") return <div role="status" className={dark ? "text-chalk" : "text-ink"}><span className={`label inline-block -rotate-2 border-2 px-3 py-2 ${dark ? "border-redline-on-dark text-redline-on-dark" : "border-redline text-redline"}`}>Received</span><p className="mt-6 text-lg">Thank you. I'll read this and reply to you directly.</p></div>;
  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-8 md:grid-cols-2">
      <Field tone={tone} index={0} label="Name" id="name" error={errors.name} required><input id="name" autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} className={control} aria-describedby={errors.name ? "name-error" : undefined} /></Field>
      <Field tone={tone} index={1} label="Email" id="email" error={errors.email} required><input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={control} aria-describedby={errors.email ? "email-error" : undefined} /></Field>
      <Field tone={tone} index={2} label="Phone" id="phone" error={errors.phone}><input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={control} /></Field>
      <Field tone={tone} index={3} label="Inquiry type" id="projectType" error={errors.projectType} required><select id="projectType" value={form.projectType} onChange={(e) => update("projectType", e.target.value as ContactInquiryInput["projectType"])} className={control}><option value="owners-representation">Owner's Representation</option><option value="executive-role">Executive role (hiring)</option><option value="residential-construction">Residential Construction</option><option value="design-build">Design-Build</option><option value="hospitality">Hospitality</option><option value="civil-development">Civil / Development</option><option value="estate-management">Estate Management</option><option value="other">Other</option></select></Field>
      {!role ? <><Field tone={tone} index={4} label="Project location" id="location" error={errors.location}><input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} className={control} /></Field><Field tone={tone} index={5} label="Project stage" id="projectStage" error={errors.projectStage}><select id="projectStage" value={form.projectStage} onChange={(e) => update("projectStage", e.target.value as ContactInquiryInput["projectStage"])} className={control}><option value="">Select a stage</option><option value="planning">Planning</option><option value="design">Design</option><option value="bidding">Bidding</option><option value="under-construction">Under construction</option><option value="closeout">Closeout</option></select></Field><Field tone={tone} index={5} label="Anticipated budget" id="budget" error={errors.budget}><select id="budget" value={form.budget} onChange={(e) => update("budget", e.target.value as ContactInquiryInput["budget"])} className={control}><option value="">Prefer not to say</option><option value="under-1m">Under $1M</option><option value="1m-5m">$1M–$5M</option><option value="5m-15m">$5M–$15M</option><option value="15m-plus">$15M+</option><option value="not-sure">Not yet determined</option></select></Field></> : null}
      <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} value={form.website} onChange={(e) => update("website", e.target.value)} /></div>
      <Field tone={tone} index={5} label={role ? "Tell me about the role" : "Tell me about the project"} id="message" error={errors.message} required full><textarea id="message" rows={6} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${control} resize-y`} aria-describedby={errors.message ? "message-error" : undefined} /></Field>
      <div className={`flex flex-col gap-4 border-t pt-6 md:col-span-2 sm:flex-row sm:items-center ${dark ? "border-rule-on-dark" : "border-rule"}`}><Button type="submit" disabled={status === "sending"} className="label h-[52px] w-full rounded-none bg-redline px-8 text-paper-white shadow-none hover:bg-redline-press sm:w-auto">{status === "sending" ? "Sending…" : "Send"}</Button>{BOOKING_CALENDAR_URL ? <a href={BOOKING_CALENDAR_URL} target="_blank" rel="noreferrer" className={`draw-link label ${dark ? "text-chalk" : "text-blueline"}`}>Or pick a time →</a> : null}</div>
      {status === "error" ? <p role="alert" className={`md:col-span-2 ${dark ? "text-redline-on-dark" : "text-redline"}`}>Your message could not be sent. Please try again.</p> : null}
    </form>
  );
}

function Field({ tone, index, label, id, error, required, full, children }: { tone: Tone; index: number; label: string; id: string; error?: string | undefined; required?: boolean; full?: boolean; children: ReactNode }) {
  return <div data-reveal="rise" style={{ "--i": index } as CSSProperties} className={full ? "md:col-span-2" : undefined}><label htmlFor={id} className={`label block ${tone === "cyanotype" ? "text-blueline-on-dark" : "text-blueline"}`}>{label}{required ? " *" : ""}</label>{children}{error ? <p id={`${id}-error`} className={`mt-2 text-sm ${tone === "cyanotype" ? "text-redline-on-dark" : "text-redline"}`}>{error}</p> : null}</div>;
}