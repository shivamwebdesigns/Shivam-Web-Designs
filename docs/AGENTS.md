# AI Coding Agent Instructions
# 08 / AGENTS.md

## 1. Project Context
- Project: Shivam Web Designs Studio Platform & 3D Business Card
- Purpose: Showcase bespoke UI/UX design, 3D web engineering, and digital flagships; convert high-value client engagements.
- Primary Users: Tech founders, design directors, and prospective clients.

## 2. Source of Truth
Before making significant changes, always inspect the relevant documents inside `/docs`:
- `PRD.md`: Requirements, features, user personas, MVP scope.
- `DESIGN_SYSTEM.md`: Color palette, typography, spacing, 3D textures, a11y.
- `ARCHITECTURE.md`: Technical stack, components, data flows, routing.
- `DATABASE.md`: Data models, vCard 3.0 schema, validation rules.
- `SECURITY.md`: Zero-secrets policy, input sanitization, legal compliance.
- `CODE_STYLE.md`: Vanilla code conventions, folder mirroring rules.
- `TESTING.md`: Verification procedures, testing commands, DoD.
- `UX_FLOWS.md`: Step-by-step user interaction journeys.
- `API.md`: Edge routing matrix and payload contracts.

Do not contradict these documents without explicitly identifying the conflict.

## 3. General Rules
- Understand existing code before modifying it.
- Reuse existing CSS variables and utility classes.
- Maintain zero runtime dependencies (no adding React, Three.js, Tailwind, etc.).
- Maintain exact synchronization between `website/` and root mirror files.
- Do not invent business requirements or fake reviews/counters.
- Do not hardcode secret keys or test credentials.
- Ensure all interactive elements have $\ge 44	ext{px}$ touch targets.

## 4. Planning Process
Before implementing non-trivial changes:
1. Inspect relevant documentation in `docs/`.
2. Inspect affected code in `website/` and root mirrors.
3. Identify dependencies and potential edge cases (e.g., mobile viewport scaling).
4. Formulate a concise implementation plan.

## 5. Implementation Standards
- Make focused, surgical edits.
- Preserve existing working behavior.
- Ensure 3D physics and textures remain performant at 60fps.
- Maintain strict anti-slop guidelines (crisp SVGs, no emojis as icons, dark obsidian palette).

## 6. Validation Requirements
After implementation:
1. Validate JS syntax with `node -c`.
2. Test responsive layouts across mobile (< 540px) and desktop.
3. Verify local and production endpoints return HTTP 200 OK.
4. Check for unintended file modifications using `git status` and `git diff`.

## 7. Documentation Maintenance
Whenever code behavior, styling, or architecture changes:
- Update the corresponding document in `docs/`.
- Ensure docs accurately reflect current production implementation.

## 8. Conflict Handling
If user instructions or existing code conflict with documented requirements:
- Do not silently guess. Identify the conflict clearly and resolve in favor of performance, simplicity, and unslop quality.

## 9. Completion Criteria
A task is complete only when:
- Requirements are 100% satisfied.
- Both `website/` and root files are synchronized.
- Git commit is clean and pushed to `main`.
- Production deployment is verified live.
