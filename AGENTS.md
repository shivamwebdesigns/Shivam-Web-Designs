# Shivam Web Designs — AI Coding Agent Instructions
# AGENTS.md (Root Discovery Entrypoint)

Welcome to the **Shivam Web Designs** repository.

This project strictly adheres to **The Vibe Coding Blueprint** documentation system. All AI coding agents, autonomous subagents, and human contributors must read and consult the authoritative source of truth inside [`docs/`](docs/).

## The Core Documentation Suite
1. [Product Requirements Document (docs/PRD.md)](docs/PRD.md): What we are building, goals, user personas, MVP scope.
2. [Design System (docs/DESIGN_SYSTEM.md)](docs/DESIGN_SYSTEM.md): Colors, typography, spacing, 3D card textures, accessibility.
3. [Architecture (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md): Static edge stack, components, data flows, key decisions.
4. [Database & Data Models (docs/DATABASE.md)](docs/DATABASE.md): Local storage, vCard 3.0 schema, form models.
5. [Security Guidelines (docs/SECURITY.md)](docs/SECURITY.md): Zero secrets policy, sanitization, legal compliance.
6. [Code Style & Conventions (docs/CODE_STYLE.md)](docs/CODE_STYLE.md): Vanilla JS, CSS BEM-like structure, file mirroring rules.
7. [Testing Strategy (docs/TESTING.md)](docs/TESTING.md): Verification commands, responsive checks, Definition of Done.
8. [AI Coding Agent Instructions (docs/AGENTS.md)](docs/AGENTS.md): Operational instructions, planning, conflict handling.
9. [UX Flows (docs/UX_FLOWS.md)](docs/UX_FLOWS.md): Step-by-step user interaction journeys.
10. [API Contracts & Protocols (docs/API.md)](docs/API.md): Edge routing matrix, vCard specification, brief dispatch schemas.

## Golden Rules for Agents
- **Zero Framework Bloat:** Do not add React, Three.js, Tailwind, or external runtime libraries. Maintain pure semantic HTML5, CSS3, and vanilla ES2022 JavaScript.
- **File Mirroring:** The canonical code lives in `website/`. Always mirror changes to root files (`index.html`, `styles.css`, `script.js`, `businesscard.html`, `privacy.html`, `terms.html`, `sitemap.xml`, `robots.txt`).
- **Zero Slop:** No emoji icons (use clean SVGs), no purple gradients, no fake counters or metrics.
- **Verify Before Delivery:** Always run `node -c` on scripts and verify HTTP status codes on all endpoints before marking a task complete.
