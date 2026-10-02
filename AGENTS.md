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

- Homepage scroll story is configured in src/data/story.ts (acts, clips, posters, STORY_SCROLL_VH) and rendered by StoryStage — why: one place to swap footage or change scroll length.
- Resume content lives in src/data/resume.ts and is shared by /resume and the homepage — why: one verified source, no drift.
