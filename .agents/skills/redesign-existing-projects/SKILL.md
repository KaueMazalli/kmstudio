---
name: redesign-existing-projects
description: Audit and improve an existing website's visual quality without breaking its functionality, framework, content, or established brand. Use for targeted redesigns, visual polish, and removing generic AI-generated patterns.
---

# Redesign Existing Projects

Improve the current implementation in place. Do not start over unless the user explicitly requests a rebuild or the current architecture blocks the goal.

## Workflow
1. **Inventory:** inspect the page, relevant components, styles, assets, routing, responsive breakpoints, and interactive behavior.
2. **Diagnose:** identify the few highest-impact design weaknesses before editing.
3. **Prioritize:** fix hierarchy and layout first, then typography and imagery, then surfaces, motion, and micro-details.
4. **Implement:** reuse the project's stack and patterns; keep the diff focused.
5. **Verify:** test available checks and inspect the rendered page at mobile and desktop widths when possible.

## Audit checklist

### Typography
- Give headings clear scale, weight, line-height, and tracking.
- Keep body copy readable and line lengths controlled.
- Use font pairing intentionally; do not choose a new font only because it is trendy.
- Prevent orphaned words and awkward wraps where practical.

### Color and surfaces
- Use one coherent color system based on the brand.
- Avoid default black, random accents, and generic AI gradients when they do not fit the brief.
- Keep shadows, borders, surface tones, and lighting consistent.
- Do not add texture or gradients just to make a page look more elaborate.

### Layout
- Break repetitive grids when content supports a better composition.
- Avoid forcing equal card heights or uniform spacing where it harms hierarchy.
- Use a consistent container width and responsive spacing.
- Preserve visual rhythm across sections; ensure mobile layouts do not feel like compressed desktop pages.

### Interaction and accessibility
- Give links and buttons clear hover, active, and keyboard-focus states.
- Use real destinations; do not leave dead links or placeholder actions.
- Provide clear loading, empty, and error states where relevant.
- Use semantic HTML, usable tap targets, sufficient contrast, and reduced-motion support.
- Animate `transform` and `opacity` where suitable instead of layout-triggering properties.

### Content and integrity
- Remove generic filler, repeated claims, fake metrics, invented testimonials, and placeholder company details.
- Preserve true client information and existing working functionality.
- Do not use imagery that implies it is authentic client work when it is not.

## Guardrails
- Do not replace the framework, add dependencies, or refactor unrelated areas without a reason.
- Do not apply every checklist item mechanically; use only what fits the brief.
- State what you actually checked. If browser validation was unavailable, say so.

## Upstream
Adapted from the redesign guidance in https://github.com/Leonxlnx/taste-skill. The upstream repository has the full original skill and license.
