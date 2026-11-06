# SME-Plaform — EDP Connect

Enterprise development and SME incubation demonstration application.

## Status: demonstration, not production ready

**Do not use this application for real user accounts, financial disbursements, confidential documents or personal information.** The current sign-in screen is a role selector, not an authentication system, and the frontend uses seed data and in-memory state. Changes do not persist across a reload or work across users.

## Portals

- Organisation: programmes, applications, service providers, reviews, funding, investments, impact and compliance.
- Mentor: beneficiaries, sessions, tasks, M&E reporting, development plans, training and evaluations.
- Beneficiary: programme, tasks, monthly returns, compliance, funding, analytics, learning and profile.

## Run locally

```bash
npm ci
npm run dev
```

Check locally before merging or deploying:

```bash
npm run lint
npm run build
```

## Production blocking work

1. Implement a backend API and durable relational database, migrations, transactional updates and backups.
2. Integrate a production identity provider; enforce authenticated role/tenant/organisation/record permissions **server-side** for every endpoint.
3. Replace sample entities and in-memory state with tenant-scoped API queries and validated writes. Never trust frontend role selection.
4. Add secure document storage, uploads, malware and file validation, signed download URLs and audit logs.
5. Model milestone approvals and payments as server-side idempotent transactions with authorisation, review and reconciliation. The frontend guard is not sufficient for financial correctness.
6. Complete notification delivery, appointment scheduling and support workflows before enabling those controls.
7. Implement email verification, password recovery (if passwords are used), session expiry, invitation and onboarding flows.
8. Add input/schema validation, error handling, empty/loading states, search/filter/pagination and accessible modal focus handling.
9. Add unit, integration and Playwright end-to-end tests for each role and critical workflow; run build, lint, type-check and tests in CI.
10. Add deployment configuration, environment variables, monitoring, alerting, backups and restoration drills; perform security review and POPIA assessment before handling personal data.

## Current frontend fixes

- SME dashboard quick actions link to existing pages; unavailable actions are not presented as working buttons.
- Removed nonfunctional notification button.
- Added a demo-only login warning.
- Added a frontend-only guard against approving the same signoff twice.

These fixes do not make the platform production ready.
