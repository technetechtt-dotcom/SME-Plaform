# SME-Plaform — Enterprise Development SaaS

**Status: active development, NOT production-ready.**

The repository contains:
- An authenticated API portal (default frontend mode) that talks to a new PostgreSQL/Fastify API foundation.
- A legacy rich, seeded frontend demo, available only by setting `VITE_DEMO_MODE=true`. It must not be used for real accounts, payments or personal information.
- Initial relational data model, authentication, tenant-scoped APIs, audit records, tests and CI.
- Many remaining gaps documented below and in [server/README.md](server/README.md).

## Run the frontend

```bash
cp .env.example .env
npm ci
npm run dev
```

By default, the secure account portal requires a running API configured through `VITE_API_BASE_URL`. To inspect the **non-production** example dashboards, set `VITE_DEMO_MODE=true` locally.

## Start the API

See [server/README.md](server/README.md) for PostgreSQL, SMTP and migration setup. **Do not deploy** with default sample credentials or without HTTPS and tenant security testing.

## Implemented in this development pass

- Argon2id-backed credential verification, email verification/reset flows, revocable sessions and account lockout foundation.
- Organisation registration (pending review), invitations and invited account signup.
- Basic authenticated organisation selector and frontend record views.
- SQL tables and tenant-filtered endpoints for programmes, applications, tasks, mentor sessions and monthly returns.
- Transactional milestone approvals with unique ledger record and budget limit.
- Initial API input validation, rate-limiting, security headers, audit records, automated backend checks and CI.

## Outstanding before commercial launch

- Full migration of the rich organisation, mentor and SME dashboards to persistent APIs.
- MFA, production super-admin, organisation approval workflow and full tenant-level database isolation testing.
- Complete documents, learning, evaluations, government, investments, subscriptions, payments, notifications, messaging, AI and analytics functionality.
- Finalise data protection, POPIA policies, financial governance and user-data export/erasure workflows.
- Full automated tests, penetration testing, infrastructure, backups, CI build/TypeScript remediation and deployment.

**Important:** The repository includes hundreds of historical TypeScript issues from the legacy demo screens. CI currently reports these failures. They must be fixed rather than waived before launch.

No feature should be described as production-ready solely because an API endpoint or screen exists.
