import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your deployment environment.");
}
const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Read the entire source listing before moving anything, so pagination cannot skip files.
async function collect(prefix) {
  const paths = [];
  for (let offset = 0; ; offset += 100) {
    const { data, error } = await supabase.storage.from("site-media").list(prefix, {
      limit: 100,
      offset,
      sortBy: { column: "name", order: "asc" },
    });
    if (error) throw error;
    for (const item of data) {
      const path = `${prefix}/${item.name}`;
      if (item.id) paths.push(path);
      else paths.push(...(await collect(path)));
    }
    if (data.length < 100) return paths;
  }
}

const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
if (bucketError) throw bucketError;
const destination = buckets.find((bucket) => bucket.id === "private-gallery");
if (!destination || destination.public) {
  throw new Error(
    "Apply 0008_private_gallery.sql first; the private-gallery bucket must exist and be private.",
  );
}
const paths = await collect("private-gallery");
for (const path of paths) {
  const { error } = await supabase.storage.from("site-media").move(path, path, {
    destinationBucket: "private-gallery",
  });
  if (error) throw new Error(`Could not move ${path}: ${error.message}`);
}
console.log(
  `Moved ${paths.length} gallery file(s) into private storage. Source paths were removed.`,
);
