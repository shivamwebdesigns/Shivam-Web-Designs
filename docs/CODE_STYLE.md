# Code Style & Conventions
# 06 / CODE_STYLE.md

## 1. General Principles
- Prefer clean, readable vanilla code over heavy framework abstractions.
- Keep functions small, focused, and single-purpose.
- Prefer consistency across the codebase over novel, untested syntax.
- Maintain zero runtime dependencies.
- Follow mobile-first and responsive design principles.

## 2. Naming Conventions
- HTML/CSS Classes: `kebab-case` with functional prefixes (e.g., `.ctl-btn`, `.card-orienter`, `.foil-sheen`).
- JavaScript Variables & Functions: `camelCase` (e.g., `toggleOrientation()`, `isPortrait`, `downloadVCard()`).
- JavaScript Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_ROTATION_DEG`, `DEFAULT_TIMEOUT`).
- File Names: `kebab-case` (e.g., `business-card-front.png`, `businesscard.html`).
- Documentation: `UPPER_SNAKE_CASE.md` inside `docs/`.

## 3. Folder Structure & Synchronization Rules
- Canonical Source: `website/` is the primary editing root for HTML, CSS, and JS files.
- Static Host Mirroring: Root files (`index.html`, `styles.css`, `script.js`, `businesscard.html`, `sitemap.xml`, `robots.txt`, `privacy.html`, `terms.html`) must be kept in 100% sync with `website/` to ensure zero routing discrepancies on any host.

## 4. HTML Guidelines
- Always use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<dialog>`, `<footer>`).
- Always specify `width` and `height` attributes on image elements to prevent Layout Shifts (CLS = 0).
- Provide descriptive `aria-label` or `alt` attributes on all interactive elements.

## 5. CSS Guidelines
- Organize styles logically:
  1. Root variables & design tokens (`:root`)
  2. Reset & base styles
  3. Layout & structural containers
  4. Components & 3D stages
  5. Responsive media queries (`@media (max-width: ...)`)
- Use CSS Custom Properties for all colors, radii, and spacing.
- Ensure all interactive touch targets measure at least `44px` in height.

## 6. JavaScript Guidelines
- Wrap scripts in modular closures or IIFEs to avoid polluting the global window scope.
- Use `requestAnimationFrame` for continuous physics or rotation animations; avoid `setInterval` for graphics.
- Cache DOM element references once at initialization.

## 7. Do's and Don'ts
### Do:
- Reuse existing CSS variables and button styles.
- Validate JavaScript syntax with `node -c` before committing.
- Test touch interactions on real mobile viewports.
- Keep the DOM lean and accessible.

### Don't:
- Don't install heavy npm libraries for tasks that native Web APIs already solve.
- Don't hardcode color hex codes directly in component rules.
- Don't use generic emojis as functional UI icons.
- Don't leave debug `console.log()` statements in production code.
