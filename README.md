# Vivid Backgrounds

https://mcdesignbackground.netlify.app/

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mcdesign2.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3daa6fa1-2672-4e2b-a550-e2d5f8a6253b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js 22.18+ and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Private gallery rollout

The personal gallery is visible to site admins only. Public portfolio albums and
site imagery continue to use the public `site-media` bucket.

For an existing deployment:

1. Pause gallery edits and apply the Drizzle migration `0008_private_gallery.sql`
   through the existing deployment migration process.
2. With `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` provided securely in the
   deployment environment, run `node scripts/migrate-private-gallery.mjs`.
   This moves every legacy `private-gallery/` object (including orphaned files)
   out of `site-media`, preserving its path. It stops on an error and can be rerun;
   successfully moved files are absent from the source listing on subsequent runs.
3. Deploy the frontend, confirm admins can load the gallery, and verify that old
   public object URLs no longer serve the files before allowing gallery edits.

The SQL migration alone does not move existing storage files. Previously cached
or downloaded copies cannot be recalled by this migration.
