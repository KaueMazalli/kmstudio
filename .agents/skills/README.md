# KM Studio — Agent Skills

Skills installed in `.agents/skills/` for coding agents that support the Agent Skills format.

## UI and design
- **make-interfaces-feel-better** — refine responsive UI details: typography, surfaces, animation, icons, and performance.
- **superdesign** — design and iterate on frontend UI and visual assets using the Superdesign workflow. Requires the Superdesign CLI/authentication when its workflow is invoked.
- **better-icons** — discover and use icons from supported icon libraries. Follow its `SKILL.md`; its CLI/MCP features may require setup.

## Writing
- **anti-ai-slop-writing** — avoid formulaic AI writing patterns, with a reference list of words and phrases.
- **no-ai-slop** — edit or evaluate writing for clarity and naturalness while preserving intent; includes an evaluation checklist.
- **humanizer** — identify and remove AI-sounding prose patterns while retaining meaning and the writer's voice.

## Usage guidance
- For frontend work, read `.agents/skills/make-interfaces-feel-better/SKILL.md` first; consult its linked reference files as needed.
- Use `superdesign` only when the requested workflow and its CLI are available. Do not claim to have run its canvas or CLI if it was not actually run.
- Use one writing skill appropriate to the request; the writing skills overlap, so do not mechanically apply every rule at once.
- Skills are guidance, not permission to override the user's brief, project conventions, accessibility, security, or maintainability.

## Upstream sources
These files are sourced from their respective open-source projects. Check each upstream repository for current versions, full licensing terms, and updates before refreshing them.

- https://github.com/jakubkrehel/make-interfaces-feel-better
- https://github.com/better-auth/better-icons
- https://github.com/jalaalrd/anti-ai-slop-writing
- https://github.com/petergyang/no-ai-slop
- https://github.com/superdesigndev/superdesign-skill
- https://github.com/blader/humanizer
