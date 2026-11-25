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
| `/contact` | Contact form; direct personal email and phone are not shown |
| `/start-project` | Quotation brief with custom service options and INR budget tiers from ₹500 to ₹5,000 |
| `/businesscard` | Interactive 3D business card |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Stack

- Next.js 15 App Router, React 19, and TypeScript
- Tailwind CSS
- Vercel deployment; route rewrites are configured in `next.config.ts`
- Contact and inquiry handlers at `/api/contact` and `/api/inquiry`

## Branding

The site logo appears in the shared header and footer only. The homepage hero uses text and calls to action without a separate logo image. Both shared placements crop the official `public/assets/logo.png` to remove excess surrounding space.

Other brand artwork printed into the interactive business card remains part of that card experience. See [asset rights](ASSET_RIGHTS.md) for reuse terms.

The founder profile uses the upscaled portrait at `public/assets/founder-hd.jpg`; the original image remains at `public/assets/founder.jpg`.

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

Project quotation emails are sent through Resend. Configure `RESEND_API_KEY` and a Resend-verified `CONTACT_FROM_EMAIL` in `.env.local` for local development and in the deployment environment for production. The form confirms delivery only after Resend accepts the message.

## Admin Dashboard Setup

The private inquiry dashboard is available at `/admin`. It requires Google sign-in and an admin password of at least 12 characters. Configure these server-only variables in `.env.local` for local development and in the Vercel project settings for production:

- `ADMIN_PASSWORD`: the admin password (12–128 characters).
- `ADMIN_PASSWORD_SESSION_SECRET`: a randomly generated secret of at least 32 bytes. Generate one locally with `openssl rand -base64 32`.

The dashboard also requires the Firebase client and Admin configuration, an authorized `FIREBASE_ADMIN_EMAIL`, and Google sign-in enabled in Firebase Authentication. Remove the obsolete `ADMIN_PIN` and `ADMIN_PIN_SESSION_SECRET` variables; they are no longer used. Never commit environment files or share secret values. In Vercel, scope the new variables to Production and redeploy after changing them; environment variable changes do not update deployments that are already running.

## Project Documents

- [Privacy policy](https://shivamwebdesigns.devs.li/privacy) and [terms of service](https://shivamwebdesigns.devs.li/terms)
- [Security guidance](docs/SECURITY.md)
- [Contributing guide](CONTRIBUTING.md)
- [MIT license](LICENSE) and [asset rights](ASSET_RIGHTS.md)
- Product and technical references are in [`docs/`](docs/)

## Contact

- Website: <https://shivamwebdesigns.devs.li>
- Contact form: <https://shivamwebdesigns.devs.li/contact>
- LinkedIn: <https://www.linkedin.com/company/shivamwebdesigns/>
- GitHub: <https://github.com/shivamwebdesigns/Shivam-Web-Designs>
- Instagram: <https://www.instagram.com/shivamwebdesigns/>