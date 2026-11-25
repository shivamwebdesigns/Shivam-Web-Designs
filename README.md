# Shivam Web Designs

ShivamWebDesigns is a Next.js website for the studio's services, founder profile, inquiry forms, and interactive 3D business card.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Studio overview and services |
| `/about` | Studio background and approach |
| `/services` | Design and development services |
| `/projects` | Portfolio notice: projects are updating soon |
| `/projects/[slug]` | Previous case-study URLs permanently redirect to `/projects` |
| `/founder` | Founder profile |
| `/contact` | Contact form and studio details |
| `/start-project` | Project inquiry form |
| `/businesscard` | Interactive 3D business card |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Stack

- Next.js 15 App Router, React 19, and TypeScript
- Tailwind CSS
- Vercel deployment; route rewrites are configured in `next.config.ts`
- Contact and inquiry handlers at `/api/contact` and `/api/inquiry`

## Local Development

Requirements: Node.js 18.18 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To verify types and a production build:

```bash
npx tsc --noEmit
npm run build
```

## Project Documents

- [Privacy policy](https://shivamwebdesigns.devs.li/privacy) and [terms of service](https://shivamwebdesigns.devs.li/terms)
- [Security guidance](docs/SECURITY.md)
- [Contributing guide](CONTRIBUTING.md)
- [MIT license](LICENSE) and [asset rights](ASSET_RIGHTS.md)
- Product and technical references are in [`docs/`](docs/)

## Contact

- Website: <https://shivamwebdesigns.devs.li>
- Email: <shivam@shivamwebdesigns.com>
- LinkedIn: <https://www.linkedin.com/company/shivamwebdesigns/>
- GitHub: <https://github.com/shivamwebdesigns/Shivam-Web-Designs>
- Instagram: <https://www.instagram.com/shivamwebdesigns/>