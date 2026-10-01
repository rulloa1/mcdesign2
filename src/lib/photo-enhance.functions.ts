import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PROMPTS = {
  enhance:
    "Retouch this real architectural / interior photograph to a premium luxury-magazine look. Keep the exact same scene, composition, framing, objects, materials and layout — do not add, remove or invent anything. Improve only: balanced natural light, lifted shadows, controlled highlights, true-to-life colors with refined warm tones, clean white balance, crisp detail, reduced noise. Elegant and realistic, never artificial or over-saturated.",
  straighten:
    "Correct the perspective of this real architectural photograph like a professional architectural photographer: make vertical lines truly vertical and the horizon level, removing tilt and keystone distortion. Keep the exact same scene, objects and materials — do not add, remove or invent anything. Lightly crop edges as needed so there are no empty areas, and apply a subtle elegant polish to light and color.",
} as const;

export const enhancePhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ url: z.string().url(), mode: z.enum(["enhance", "straighten"]) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: role } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) throw new Error("Only the site admin can enhance photos.");

    const target = new URL(data.url);
    const allowed = [new URL(getRequest().url).host, new URL(process.env["SUPABASE_URL"]!).host];
    if (!allowed.includes(target.host)) throw new Error("That photo can't be edited here.");

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    const src = await fetch(target);
    if (!src.ok) throw new Error("Could not load the photo.");
    const blob = await src.blob();

    const form = new FormData();
    form.set("model", "openai/gpt-image-2.5-sunburst");
    form.set("prompt", PROMPTS[data.mode]);
    form.set("image", new File([blob], "photo.png", { type: blob.type || "image/png" }));

    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    if (!res.ok) {
      const text = await res.text();
      if (res.status === 402) throw new Error("Out of AI credits. Add credits in Settings → Plans & credits.");
      if (res.status === 429) throw new Error("Too many requests right now. Try again in a minute.");
      throw new Error(`Enhancement failed (${res.status}). ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as { data?: { b64_json?: string }[] };
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) throw new Error("The AI didn't return an image.");
    return { b64 };
  });
