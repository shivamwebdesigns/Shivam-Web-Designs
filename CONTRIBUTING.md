# Contributing

## Setup

Use Node.js 18.18 or newer:

```bash
npm install
npm run dev
```

Before opening a change, run:

```bash
npx tsc --noEmit
npm run build
```

## Changes

- Keep changes focused and follow the existing Next.js, TypeScript, and Tailwind patterns.
- Update the relevant documentation in `docs/` when behavior or architecture changes.
- Do not commit credentials, private customer data, generated build output, or dependencies.
- Review [ASSET_RIGHTS.md](ASSET_RIGHTS.md) before adding or reusing media; the MIT license does not cover studio brand assets.
- Report security issues privately to <shivamwebdesigns23@gmail.com> rather than including exploit details in a public issue.