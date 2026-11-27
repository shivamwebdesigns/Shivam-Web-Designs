# ShivamWebDesigns — Google Workspace & Google Forms Setup Guide

This guide explains how to set up, brand, and configure Google Forms and Google Drive for **ShivamWebDesigns**. 

> [!NOTE]
> This document provides blueprints and technical configurations. Google Forms must be created inside your Google account; they are not auto-published via GitHub.

---

## 1. Directory Structure in Google Drive

Create a dedicated folder in Google Drive named:
`ShivamWebDesigns-Operations/`
  ├── `01-Forms & Intake/` (Houses the Inquiry and Onboarding Forms)
  ├── `02-Client CRM/` (Houses the Master Google Sheet CRM)
  ├── `03-Client Files/` (Individual subfolders created per client project)
  └── `04-Proposals & Invoices/` (PDF copies of issued client documents)

---

## 2. Branding Guidelines for Google Forms

To ensure clients experience a professional, cohesive studio aesthetic:
- **Form Header Image:** Use a 1600x400 px banner cropped from [`01-BRAND-IDENTITY/BRAND-ASSETS/SWD-Banner-Wide-1920x640.png`](../01-BRAND-IDENTITY/BRAND-ASSETS/SWD-Banner-Wide-1920x640.png).
- **Theme Color:** Dark Charcoal / Black (`#121212` or closest dark grey in Google Forms).
- **Background Color:** Dark / Neutral.
- **Font Style:** Header: *Roboto / Sans-serif*, Body: *Roboto / Sans-serif*.
- **Confirmation Message:** 
  > *"Thank you for contacting ShivamWebDesigns. We have received your project details and will review them thoroughly. You will receive a personal response within 24 hours. Explore our studio work: https://shivamwebdesigns.devs.li"*

---

## 3. Connecting Google Forms to Google Sheets CRM

1. In Google Forms, navigate to the **Responses** tab.
2. Click the green **Link to Sheets** icon.
3. Select **"Create a new spreadsheet"** and name it `SWD - Client Inquiries (Responses)`.
4. Enable email notifications: Click the **Three Dots Menu** on the Responses tab &rarr; Check **"Get email notifications for new responses"**.
