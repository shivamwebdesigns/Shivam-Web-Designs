# GitHub Organization & Repository Configuration Guide

This guide details recommended configurations for the **shivamwebdesigns** GitHub organization and its repositories.

---

## 1. Organization Profile Settings (`github.com/organizations/shivamwebdesigns/settings/profile`)

1. **Profile Picture:** Upload the clean monochromatic SWD mark vector (`01-BRAND-IDENTITY/LOGO/swd-logo.svg` or high-resolution PNG).
2. **Organization Display Name:** `ShivamWebDesigns`
3. **Public Email:** `shivamwebdesigns23@gmail.com`
4. **URL:** `https://shivamwebdesigns.devs.li`
5. **Location:** `Gujarat, India`
6. **Social Accounts:**
   - LinkedIn: `https://www.linkedin.com/company/shivamwebdesigns/`
   - Instagram: `https://www.instagram.com/shivamwebdesigns/`

---

## 2. Setting Up the Organization Profile README (`.github`)

GitHub displays a custom profile banner on your organization home page when a repository named `.github` exists:
1. Create a public repository under the organization: `shivamwebdesigns/.github`.
2. Inside that repository, create a file at: `profile/README.md`.
3. Copy the full markdown from `11-GITHUB-ORGANIZATION/ORGANIZATION-README-DRAFT.md`.
4. Commit to `main`. The organization home page (`github.com/shivamwebdesigns`) will immediately display your branded editorial profile!

---

## 3. Social Media Preview Card (Open Graph Image)

1. Open **Repository Settings** → **General** → **Social preview**.
2. Click **Upload an image**.
3. Select the clean, un-slopped card generated at:  
   `public/assets/github-social-preview.png` (Dimensions: 1280×640 px).
4. Verify preview renders crisp text and services bento grid without blurry scaling.

---

## 4. Branch Protection Rules (For Client & Core Repositories)

To prevent accidental regressions or broken deployments:
1. Navigate to **Repository Settings** → **Branches** → **Add rule**.
2. Branch name pattern: `main`.
3. Check:
   - **Require a pull request before merging.**
   - **Require status checks to pass before merging** (e.g. `node -c` syntax check).
   - **Do not allow force pushes.**
   - **Include administrators.**

---

## 5. Security & Privacy Safeguards
- **Repository Visibility:** Client projects should remain **Private** during active development.
- **Secrets Management:** Use GitHub Repository Secrets (`Settings` → `Secrets and variables` → `Actions`) for any deployment tokens or API keys. Never commit `.env` or credential files to source control.
