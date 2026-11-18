# SME-Plaform API — foundation (not production certified)

The authenticated frontend uses these endpoints for basic account, programme, application, task, session, monthly return, signoff, audit and administration workflows. The legacy dashboards still use demonstration state and are **not** production-integrated. This backend is a starting implementation requiring integration, deployment configuration, security reviews, and tests before real personal data can be processed.

## Local setup

Requires Node.js 22+, PostgreSQL 16+ and an SMTP provider.

1. Copy `.env.example` to `.env`. Configure DATABASE_URL, WEB_ORIGIN, PUBLIC_APP_URL and SMTP settings. Load environment variables with your preferred process supervisor (Node's `--env-file=.env` is supported).
2. `cd server && npm install`
3. `node --env-file=.env src/migrate.js`
4. `node --env-file=.env src/server.js`
5. `npm test`
6. Run the authenticated frontend using the root `.env.example` configuration. Frontend deployment must rewrite `/app/*` paths to `index.html` for deep links.

The SQL migration is designed for a **new** database; do not run against production without a backup and a reviewed change plan.

## Implemented foundation

- PostgreSQL tables, constraints, indexes and key relationships.
- Email-and-password authentication with Argon2id hashing, email verification, password reset, revocable opaque HTTP-only cookie sessions, account lockout, session rotation, data export summary and account-deletion request.
- Organisations, membership roles, invitation issuance, invited-user signup, and a role-protected organisation approval console. Organisation registrations are created pending review.
- Tenant-scoped programmes, applications, tasks, mentoring sessions, monthly returns and audit records.
- Transactional signoff decisions with row locking, budget guard and unique ledger linkage. This is an internal **ledger record**, not a bank payment.
- Basic validation, result pagination, strict CORS and origin checks, security headers and throttling.

## Important limitations

- Basic email verification, password reset, invited-user sign-up, and invitation creation UI exist, but live SMTP delivery and browser end-to-end tests are not verified.
- Organisation approval requires bootstrap of a verified platform administrator, followed by approval through the authenticated platform-admin page. Never auto-activate unknown tenants.
- No MFA, payment gateway, file upload storage, invoices, background workers, billing or subscription plans are implemented. The super-admin console currently covers organisation approval/suspension only.
- Many domains requested in the full backlog (learning, evaluations, detailed reporting, compliance, AI, analytics) do not yet have production API coverage.
- Basic maker-checker restrictions now reject self-approval. Still required: verified milestone evidence, multiple approval levels, anti-fraud controls, full accounting and bank reconciliation.
- Email delivery must be configured; registration can create a pending account even if mail delivery fails.
- Row-level tenancy is enforced by query filters here; add database-enforced RLS and security tests before production use.
- Establish retention/data subject workflows and legal review for POPIA, not only the current account disable and basic export endpoints.
- The registration route creates a pending organisation. Activate only after a trusted administrator verifies the organisation.

## API paths

All endpoints under `/api`. Login: `POST /auth/login`; current user: `GET /auth/me`; logout: `POST /auth/logout`; refresh: `POST /auth/refresh`; register: `POST /auth/register-organisation`; verification/reset: `POST /auth/consume-token`; reset request: `POST /auth/forgot-password`. Tenant resources begin with `/organisations/:orgId/`.

All browser state-changing requests require `Origin` matching `WEB_ORIGIN`. Browser requests must use `credentials: 'include'`. An API client without an Origin header cannot call writes by default.

## Deployment/security checklist

- Configure HTTPS termination, proxy trust and secure session cookies, least-privilege database credentials, independent database backups, secret rotation and SMTP credentials.
- CI includes PostgreSQL migration/startup checks and API integration scenarios. Still add concurrent approval tests, complete permission-matrix tests, rollback plans and an audited seed process.
- Configure alerting, request tracing, incident response, privacy policies and retention policies.
- Use managed migrations and security assessment before any customer deployment.

## Establish a platform administrator

There is intentionally **no public self-service super-admin registration**.

1. Configure PostgreSQL, SMTP and `PUBLIC_APP_URL`, then run all migrations.
2. Register a real account and verify its email. The first organisation may remain pending.
3. In an authorised server terminal, run `PLATFORM_ADMIN_EMAIL=admin@example.com node --env-file=.env src/bootstrap-admin.js` (replace the example with the verified account address).
4. Sign in through the authenticated frontend. Use **Platform administration** to review and activate pending organisations. The API checks the administrator table and logs status decisions.

Protect server terminal/database access: anyone able to run the bootstrap script with a writable database could grant platform-admin privileges.

## Remaining release blockers

The complete legacy dashboard suite is not API-backed; frontend TypeScript checks still fail on generated legacy pages; a production deployment with real email service, storage, multi-device responsiveness, network boundary checks, backups and security testing has not been validated. Do not process real payments or confidential customer data yet.
