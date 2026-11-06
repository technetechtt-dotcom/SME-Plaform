# SME-Plaform API — foundation (not production certified)

The frontend still uses demonstration state and is **not yet connected to these endpoints**. This backend is a starting implementation requiring integration, deployment configuration, security reviews, and tests before real personal data can be processed.

## Local setup

Requires Node.js 22+, PostgreSQL 16+ and an SMTP provider.

1. Copy `.env.example` to `.env`. Configure DATABASE_URL, WEB_ORIGIN, PUBLIC_APP_URL and SMTP settings. Load environment variables with your preferred process supervisor (Node's `--env-file=.env` is supported).
2. `cd server && npm install`
3. `node --env-file=.env src/migrate.js`
4. `node --env-file=.env src/server.js`
5. `npm test`

The SQL migration is designed for a **new** database; do not run against production without a backup and a reviewed change plan.

## Implemented foundation

- PostgreSQL tables, constraints, indexes and key relationships.
- Email-and-password authentication with Argon2id hashing, email verification, password reset, revocable opaque HTTP-only cookie sessions, account lockout, session rotation, data export summary and account-deletion request.
- Organisations, membership roles, invitation issuance and acceptance for **existing verified users**. Organisation registrations are created pending manual review.
- Tenant-scoped programmes, applications, tasks, mentoring sessions, monthly returns and audit records.
- Transactional signoff decisions with row locking, budget guard and unique ledger linkage. This is an internal **ledger record**, not a bank payment.
- Basic validation, result pagination, strict CORS and origin checks, security headers and throttling.

## Important limitations

- There is no working UI flow for verification/reset/invitation yet, and no signup workflow for invited new users.
- Organisation approval currently requires a reviewed, authenticated administrative process to be implemented. Never auto-activate unknown tenants.
- No MFA, payment gateway, file upload storage, invoices, background workers, billing, subscription plans, or super-admin console is implemented.
- Many domains requested in the full backlog (learning, evaluations, detailed reporting, compliance, AI, analytics) do not yet have production API coverage.
- Financial approval authorization must be extended with maker-checker separation, verified milestones, anti-fraud controls, full accounting and bank reconciliation.
- Email delivery must be configured; registration can create a pending account even if mail delivery fails.
- Row-level tenancy is enforced by query filters here; add database-enforced RLS and security tests before production use.
- Establish retention/data subject workflows and legal review for POPIA, not only the current account disable and basic export endpoints.
- The registration route creates a pending organisation. Activate only after a trusted administrator verifies the organisation.

## API paths

All endpoints under `/api`. Login: `POST /auth/login`; current user: `GET /auth/me`; logout: `POST /auth/logout`; refresh: `POST /auth/refresh`; register: `POST /auth/register-organisation`; verification/reset: `POST /auth/consume-token`; reset request: `POST /auth/forgot-password`. Tenant resources begin with `/organisations/:orgId/`.

All browser state-changing requests require `Origin` matching `WEB_ORIGIN`. Browser requests must use `credentials: 'include'`. An API client without an Origin header cannot call writes by default.

## Deployment/security checklist

- Configure HTTPS termination, proxy trust and secure session cookies, least-privilege database credentials, independent database backups, secret rotation and SMTP credentials.
- Add CI integration testing with a real PostgreSQL instance, concurrent approval tests, permission matrix tests, migrations, rollback plans and an audited seed process.
- Configure alerting, request tracing, incident response, privacy policies and retention policies.
- Use managed migrations and security assessment before any customer deployment.
