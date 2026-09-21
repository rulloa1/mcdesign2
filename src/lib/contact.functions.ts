import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

export const contactInquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be under 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().max(40, "Phone number must be under 40 characters."),
  projectType: z.enum([
    "owners-representation",
    "residential-construction",
    "design-build",
    "hospitality",
    "civil-development",
    "estate-management",
    "executive-role",
    "other",
  ]),
  projectStage: z.enum(["", "planning", "design", "bidding", "under-construction", "closeout"]),
  location: z.string().trim().max(120, "Location must be under 120 characters."),
  budget: z.enum(["", "under-1m", "1m-5m", "5m-15m", "15m-plus", "not-sure"]),
  timeline: z.enum(["", "immediately", "3-6-months", "6-12-months", "12-months-plus", "exploring"]),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more about your project.")
    .max(2000, "Project details must be under 2,000 characters."),
  // Honeypot: hidden from people, often auto-filled by spam bots.
  website: z.string().max(200),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export const submitContactInquiry = createServerFn({ method: "POST" })
  .validator((input: ContactInquiryInput) => contactInquirySchema.parse(input))
  .handler(async ({ data }) => {
    // Report success to bots that filled the honeypot, but store nothing.
    if (data.website) return { ok: true };

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
    if (!url || !key) throw new Error("Inquiry service is temporarily unavailable.");

    const { createClient } = await import("@supabase/supabase-js");
    const supabasePublic = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabasePublic.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      project_type: data.projectType,
      project_stage: data.projectStage || null,
      location: data.location || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      message: data.message,
    });

    if (error) {
      console.error("Unable to save contact inquiry", { code: error.code });
      throw new Error("Your inquiry could not be sent. Please try again.");
    }

    return { ok: true };
  });