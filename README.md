# Razz Automation

A client operations workspace with local mode and optional private cloud accounts for paperwork, application assistance, branding and other service jobs.

## Run

Install Node.js 20 or later, then run:

```sh
npm ci
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

Records stay in localStorage in the browser at the current origin. Local mode has no authentication. Version 0.2 adds private Supabase Auth accounts and cloud storage; team access, attachment uploads, WhatsApp connection and background automation are not included. Run on a trusted device. Export backups regularly, keep backups private, and do not treat browser storage as the final system for sensitive permit documents. Moving to another port, browser or domain uses a different workspace until a backup is imported. Use the raw-data export if an invalid saved record prevents loading.

No real client data, credentials or document scans are included. Document drafts require verified facts and employer authorisation/signature. Status changes do not submit applications to an external authority. Service balances are not an accounting ledger; this version stores a total received, not dated payment transactions. Word output is editable HTML in `.doc`, not native DOCX. PDF output uses the browser print dialog.

## Next phase

Add shared staff roles, document uploads, native DOCX/PDF templates, payment transactions and audit history, followed by WhatsApp Business API and approved reminder workflows.

## Version 0.2: cloud login and storage

Install dependencies once with `npm ci`, then run `npm run dev`. The predev step bundles the pinned Supabase SDK locally; no CDN scripts execute in the application. `npm test`, `npm run check`, and `npm run build` validate the update.

Cloud is configured for the existing Razz Automation Supabase project using only its **public publishable key**. No secret/service-role key is used. Click **Cloud account** for email/password sign-in, signup or password recovery. Confirmation and reset links must allow `http://localhost:3000/` in Supabase Auth URL Configuration while developing. Confirmed users have private workspaces, not shared staff access. End-to-end email delivery and a real user's login must be verified by the account owner.

After signing in, cloud records replace the displayed local records. Local records remain in browser storage. **Copy local records to cloud** in Backup & setup copies them only into an empty cloud workspace after confirmation. Browser-origin local records are not accessible from a different device: export/import JSON if necessary. Cloud reads and saves require internet; a failed save is reported and is not silently queued. Refresh cloud records to load changes made on another device. Revision checks reject stale saves rather than overwrite another device's work.

The `razz_workspaces` table is a small-business first-stage JSON workspace with one row per authenticated owner and a 5 MB record-size cap. It does not replace or alter the existing clients/applications tables. Row-level policies enforce `auth.uid() = owner_id` for reads/inserts/updates; anonymous access and deletion are not granted. Normalized multi-user records, file storage, audit trails and role-based sharing are still future work. Passwords are handled by Supabase Auth; browser sessions remain on the device until sign-out.

`cloud-schema.sql` is the reviewed schema reference and was applied to the existing hosted project through its migration API. Do not rerun it on that project. The signup trigger's public EXECUTE permission was revoked without changing its trigger behavior. `test/rls.sql` validates cross-account isolation with temporary fixtures inside a rolled-back transaction. Existing role helper functions and authentication security settings have separate advisor notices and need review before broader production use:
- https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable
- https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

### Updating an existing Windows copy

1. Export your local backup from Backup & setup.
2. Stop the server with Ctrl+C.
3. Download/extract the updated repository and open Command Prompt in its folder.
4. Run `npm ci`, then `npm run dev`.
5. Open the same `http://localhost:3000` browser origin. Local records should still appear.
6. Click Cloud account and sign in. Copy local records only when you are ready.
