# Payment Collection & Billing Process

This document outlines the standard operating procedure (SOP) for invoicing, milestone tracking, payment reconciliation, and dispute prevention at **ShivamWebDesigns (SWD)**.

---

## 1. Milestone Billing Structure

To guarantee cashflow security and project momentum, SWD enforces a strict milestone-based payment schedule:

```
[Project Kickoff]  ──> 50% Upfront Deposit (Mandatory before design starts)
        │
[Interactive Staging] ──> 25% Interim Milestone (Design & code approved on staging)
        │
[Launch / Handover]   ──> 25% Final Balance (Paid before DNS cutover & git transfer)
```

For smaller single-page or rapid projects (under ₹30,000 / $500), a **50% Deposit / 50% Handover** two-tier structure is utilized.

---

## 2. Invoicing Workflow

### Step 1: Pre-Kickoff Invoicing
1. Finalize and countersign the **Project Proposal** or **Service Agreement**.
2. Generate an invoice using `INVOICE-TEMPLATE.md` with:
   - Format: `INV-[YEAR]-[SEQUENCE]` (e.g. `INV-2026-0001`).
   - Line Item: "50% Project Inception & Engineering Deposit".
   - Payment Window: Net 7 days.
3. Transmit the PDF invoice to the client's billing email with a clear subject:  
   `Invoice INV-2026-XXXX: ShivamWebDesigns — [Project Name] Kickoff Deposit`.
4. Log the invoice in `PAYMENT-TRACKER.csv`.

### Step 2: Milestone Verification & Interim Invoicing
1. Once Milestone 1 is completed and previewed via private staging URL (`client.devs.li` or staging deployment), notify the client.
2. Obtain written sign-off on design prototypes.
3. Issue the second milestone invoice (25%).
4. Continue production engineering once payment is confirmed.

### Step 3: Final Settlement & Handover
1. Complete all QA checklist items (Google Lighthouse score, mobile responsiveness, forms).
2. Issue the final 25% balance invoice.
3. **STRICT GOLDEN RULE:** Do not cut over production DNS or transfer the production GitHub repository / zip file until the final balance has cleared.
4. Issue `PAYMENT-RECEIPT.md` upon clearance.

---

## 3. Retainer & Ongoing Maintenance Billing
- Billed on the **1st of each calendar month** in advance.
- Due date: 5th of each month.
- Services covered: Content updates, quarterly performance audits, dependency security patches, and priority WhatsApp/email technical support.

---

## 4. Late Payment Protocol

If an invoice is not settled by the due date:

| Timeline | Action | Tone | Channel |
| :--- | :--- | :--- | :--- |
| **Due Date + 2 Days** | Gentle automated/email reminder | Courteous, helpful | Email |
| **Due Date + 5 Days** | Formal follow-up with WhatsApp ping | Direct, professional | Email + WhatsApp |
| **Due Date + 7 Days** | Project development pause notice | Firm, formal | Email + Phone call |
| **Due Date + 14 Days** | Contract dormancy & reactivation fee notice | Strict legal notification | Official Registered Letter / Email |

### Template: 5-Day Friendly Payment Reminder
> **Subject:** Gentle Reminder: Invoice INV-XXXX for [Project Name]  
> 
> Hi [Client Name],  
> 
> Hope you're having a productive week.  
> 
> Just a quick follow-up regarding invoice `INV-XXXX` for `[Amount]`, which was due on `[Due Date]`.  
> 
> If you have already processed this payment, please reply with the transaction reference/UTR so I can update our records and issue your receipt. If you need bank details resent, please let me know.  
> 
> Best regards,  
> Shivam Purohit  
> ShivamWebDesigns | https://shivamwebdesigns.devs.li  

---

## 5. Security & Banking Credentials Policy
- **Zero Plaintext Credentials:** Never send banking passwords, OTPs, or API secret keys over unencrypted chats.
- Only share recipient account numbers and IFSC/SWIFT codes via formal, signed PDF invoices or encrypted channels.
