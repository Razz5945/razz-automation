# Razz Automation

A first working client operations workspace for paperwork and application assistance, branding, and other service jobs. No dependency installation required.

## Run

Install Node.js 20 or later, then run:

```sh
npm run dev
```

Open http://localhost:3000. Check with `npm test` and `npm run check`.

## Included

- Client directory with editing and contact search.
- Applications/jobs with status, missing documents, next action, deadline, service fee and total received.
- Dashboard with active jobs, overdue dates, and unpaid balances. Completed/cancelled jobs leave the active list; unpaid completed jobs still count toward balances.
- Employment confirmation and conditional offer drafts with escaped user content, editable Word-compatible HTML `.doc` downloads, and browser print/save PDF.
- Validated JSON backup export and restore. Import replaces existing data only after confirmation.
- Responsive layout and labelled forms.

## Storage and limitations

Records stay in localStorage in the browser at the current origin. There is **no authentication, cloud database, encryption layer, team access, attachment upload, WhatsApp connection or background automation** in this version. Run on a trusted device. Export backups regularly, keep backups private, and do not treat browser storage as the final system for sensitive permit documents. Moving to another port, browser or domain uses a different workspace until a backup is imported. Use the raw-data export if an invalid saved record prevents loading.

No real client data, credentials or document scans are included. Document drafts require verified facts and employer authorisation/signature. Status changes do not submit applications to an external authority. Service balances are not an accounting ledger; this version stores a total received, not dated payment transactions. Word output is editable HTML in `.doc`, not native DOCX. PDF output uses the browser print dialog.

## Next phase

Add authenticated cloud storage with per-user access controls, document uploads, native DOCX/PDF templates, payment transactions and audit history, followed by WhatsApp Business API and approved reminder workflows. Confirm the actual database schema before connecting any existing Supabase project.
