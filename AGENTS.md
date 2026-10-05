<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- MCP endpoint requires OAuth sign-in (Lovable Cloud auth as issuer); consent page lives at /.lovable/oauth/consent — why: assistant tools must never be callable anonymously.
- Site-wide 3D blueprint backdrop is one persistent R3F scene mounted in __root (BlueprintJourney); tune it via src/lib/journey-config.ts, and theme it via the html.journey CSS class so Simple View can restore the original look — why: one scene/loop, no per-page duplicates.
- Phones (coarse pointer or <900px wide) get the flat BlueprintOverlay instead of the live 3D scene — why: the WebGL scene blanked the page on Android.
- Homepage video is desktop-only and deferred until idle; phones use responsive WebP artwork — why: first paint must not wait on video or oversized covers.
