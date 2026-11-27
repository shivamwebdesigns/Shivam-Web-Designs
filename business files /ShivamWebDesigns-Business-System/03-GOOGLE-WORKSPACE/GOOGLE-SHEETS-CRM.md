# ShivamWebDesigns — Google Sheets CRM Blueprint

This document specifies the architecture, column headers, automated formulas, and data hygiene rules for the **ShivamWebDesigns Master CRM Sheet**.

---

## 1. Sheet Structure (Tabs)

1. **`Leads & Outreach`**: Cold prospects, outreach tracking, follow-up cadences.
2. **`Active Pipeline`**: Qualified opportunities, discovery meetings, proposals, negotiations.
3. **`Active Projects`**: Signed contracts, milestone progress, deliverables, staging links.
4. **`Completed & Retainers`**: Finished client flagships, maintenance retainers, testimonial tracking.

---

## 2. Tab 1: `Leads & Outreach` Columns

| Col | Header | Format / Validation | Description |
| :- | :--- | :--- | :--- |
| **A** | `Lead_ID` | Text (`SWD-L-101`) | Unique lead identifier |
| **B** | `Date_Added` | Date (`YYYY-MM-DD`) | Date identified |
| **C** | `Business_Name` | Text | Company or brand name |
| **D** | `Contact_Person`| Text | Decision-maker name |
| **E** | `Title` | Text | Founder, CEO, CMO, Director |
| **F** | `Channel` | Dropdown (`LinkedIn`, `Instagram`, `Email`, `Referral`) | Outreach medium |
| **G** | `Profile_URL` | Hyperlink | LinkedIn / IG URL |
| **H** | `Website_URL` | Hyperlink | Current company website |
| **I** | `Tier` | Dropdown (`Tier A`, `Tier B`, `Tier C`) | Opportunity rating |
| **J** | `Core_Problem` | Text | Specific friction point observed |
| **K** | `Status` | Dropdown (`Researched`, `Contacted`, `Follow-up 1`, `Follow-up 2`, `Replied - Interested`, `Closed - Not Interested`, `Unresponsive`) | Pipeline stage |
| **L** | `Last_Touch` | Date (`YYYY-MM-DD`) | Date of most recent message |
| **M** | `Next_Action` | Date (`YYYY-MM-DD`) | Date for follow-up |
| **N** | `Notes` | Text | Freeform context |

---

## 3. Tab 2: `Active Pipeline` Columns

| Col | Header | Format / Validation |
| :- | :--- | :--- |
| **A** | `Deal_ID` | Text (`SWD-D-01`) |
| **B** | `Client_Name` | Text |
| **C** | `Project_Title` | Text |
| **D** | `Estimated_Value` | Currency (USD / INR) |
| **E** | `Stage` | Dropdown (`Discovery Call Booked`, `Discovery Complete`, `Proposal Sent`, `Negotiating`, `Won - Deposit Invoiced`, `Lost`) |
| **F** | `Proposal_Date` | Date |
| **G** | `Target_Close` | Date |
| **H** | `Probability_%` | Percentage (`25%`, `50%`, `80%`, `100%`) |
| **I** | `Weighted_Value`| Formula: `=D2 * H2` |

---

## 4. Conditional Formatting Rules
- Status `Replied - Interested` &rarr; Background: Soft Emerald (`#d1fae5`), Text: `#065f46`.
- Status `Follow-up Required` (where `Next_Action <= TODAY()`) &rarr; Background: Soft Amber (`#fef3c7`), Text: `#92400e`.
- Status `Closed - Not Interested` &rarr; Background: Soft Gray (`#f4f4f5`), Text: `#71717a`.
