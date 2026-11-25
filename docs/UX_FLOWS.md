# UX Flows
# 09 / UX_FLOWS.md

## Flow 1: Client Landing & Hero Inspection
1. User navigates to `https://shivamwebdesigns.devs.li/`.
2. Page loads instantly (< 1.8s) displaying the obsidian studio aesthetic, brand monogram `S/WD`, and Hero value proposition.
3. User moves cursor or touches screen: hero badge and interactive spatial elements respond with subtle perspective tilt.
4. User clicks "Initiate Project Brief" or scrolls down to explore selected works.

## Flow 2: 3D Scroll Stack Exploration
1. User scrolls to Section 02 (`#stack` — The 3D Stack).
2. Stack visualization displays layered architecture: Layer 01 (Creative Direction), Layer 02 (3D Spatial Canvas), Layer 03 (Frontend Engineering), Layer 04 (Performance Hardening).
3. User taps stack layers to inspect engineering details and architectural rationale.

## Flow 3: Interactive 3D Business Card Orbit & Flipping
1. User arrives at `/businesscard` or scrolls to Section 08 (`#contact`).
2. Card renders in 3D perspective with realistic paper core thickness, dynamic specular foil sheen, and micro-grain paper texture.
3. User drags with mouse or finger: card orbits in 360° with momentum and physics inertia.
4. User clicks "Front" button: card smoothly rotates to $0^\circ$.
5. User clicks "Back" button: card smoothly rotates to $180^\circ$.
6. User clicks "Flip" button or taps card face: card flips $180^\circ$ to reveal interactive hotspots.
7. User taps links on back face (Website, LinkedIn, GitHub, Instagram, QR code) to open official channels.

## Flow 4: Mobile Portrait / Landscape Orientation Switching
1. User opens `/businesscard` on a smartphone held vertically.
2. User clicks "Portrait" button in the controls dock.
3. Card stage transitions to vertical dimensions (`340px` $	imes$ `595px`), rotating the card $90^\circ$ into an upright portrait format.
4. All text, logos, QR code, and hotspot links rotate seamlessly for full-screen readability.
5. User taps "Landscape" to switch back anytime.

## Flow 5: vCard Contact Saving
1. User clicks "Add to Contacts" button (`#btn-contact`).
2. Client-side JavaScript synthesizes standard vCard 3.0 string for Shivam Purohit.
3. Browser downloads `Shivam_WebDesigns.vcf`.
4. iOS / Android / macOS prompts user to "Add to Contacts", instantly importing the founder's email, phone, website, and social links.

## Flow 6: Case Study Deep-Dive Dialog
1. User clicks "Inspect Architecture & Metrics" on any selected work item in Section 01 (`#works`).
2. Native `<dialog>` modal opens smoothly with backdrop blur.
3. Case study visual, challenge, engineering solution, stack pills, and verified deliverables are presented.
4. User clicks "Start Similar Project" to open pre-filled project brief modal, or presses Escape / close icon to dismiss.

## Flow 7: Project Brief Formulation & Dispatch
1. User opens `/start-project` from a project CTA.
2. User enters contact details, service, estimated budget in INR, timeline, and project description.
3. On submission, the server validates the brief and sends it through Resend to `shivamwebdesigns23@gmail.com`.
4. The page confirms delivery only after Resend accepts the email; if delivery is unavailable, it displays an error and a direct email link.

## Flow 8: Contact Form Without Public Direct Details
1. User opens `/contact`; personal email and phone/WhatsApp links are not displayed on this page, including its shared navigation and footer.
2. User submits their name, reply email, and message through the contact form.
3. The contact form displays the delivery status.
