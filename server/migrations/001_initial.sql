CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) BETWEEN 2 AND 200),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{3,80}$'),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','suspended')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  password_hash text NOT NULL,
  verified_at timestamptz,
  disabled_at timestamptz,
  failed_attempts integer NOT NULL DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email)
);
CREATE TABLE IF NOT EXISTS memberships (
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner','admin','mentor','beneficiary','viewer')),
  active boolean NOT NULL DEFAULT true,
  PRIMARY KEY (organisation_id,user_id)
);
CREATE INDEX IF NOT EXISTS memberships_user_idx ON memberships(user_id);
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id,expires_at);
CREATE TABLE IF NOT EXISTS auth_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose text NOT NULL CHECK (purpose IN ('verify','reset')),
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin','mentor','beneficiary','viewer')),
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  invited_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  name text NOT NULL CHECK(length(trim(name)) BETWEEN 2 AND 200),
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  budget_cents bigint NOT NULL DEFAULT 0 CHECK(budget_cents >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id,organisation_id)
);
CREATE INDEX IF NOT EXISTS programmes_tenant_idx ON programmes(organisation_id,status);
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL,
  programme_id uuid NOT NULL,
  applicant_id uuid NOT NULL REFERENCES users(id),
  business_name text NOT NULL,
  status text NOT NULL DEFAULT 'submitted' CHECK(status IN ('submitted','review','approved','rejected','enrolled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (programme_id,organisation_id) REFERENCES programmes(id,organisation_id) ON DELETE CASCADE,
  UNIQUE (organisation_id,programme_id,applicant_id)
);
CREATE INDEX IF NOT EXISTS applications_tenant_idx ON applications(organisation_id,status,created_at DESC);
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  assignee_id uuid NOT NULL REFERENCES users(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'assigned' CHECK(status IN ('assigned','submitted','returned','completed')),
  due_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(id,organisation_id)
);
CREATE INDEX IF NOT EXISTS tasks_tenant_idx ON tasks(organisation_id,assignee_id);
CREATE TABLE IF NOT EXISTS mentor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  mentor_id uuid NOT NULL REFERENCES users(id),
  beneficiary_id uuid NOT NULL REFERENCES users(id),
  starts_at timestamptz NOT NULL,
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'planned' CHECK(status IN ('planned','completed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS monthly_returns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id),
  period date NOT NULL,
  revenue_cents bigint NOT NULL CHECK(revenue_cents >= 0),
  expenses_cents bigint NOT NULL CHECK(expenses_cents >= 0),
  jobs integer NOT NULL DEFAULT 0 CHECK(jobs >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organisation_id,user_id,period)
);
CREATE TABLE IF NOT EXISTS milestone_signoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL,
  programme_id uuid NOT NULL,
  amount_cents bigint NOT NULL CHECK(amount_cents >= 0),
  status text NOT NULL DEFAULT 'requested' CHECK(status IN ('requested','approved','rejected')),
  decided_by uuid REFERENCES users(id),
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (programme_id,organisation_id) REFERENCES programmes(id,organisation_id)
);
CREATE TABLE IF NOT EXISTS ledger_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  signoff_id uuid NOT NULL UNIQUE REFERENCES milestone_signoffs(id),
  amount_cents bigint NOT NULL CHECK(amount_cents >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS audit_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organisation_id uuid REFERENCES organisations(id),
  actor_id uuid REFERENCES users(id),
  action text NOT NULL,
  entity text,
  entity_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_tenant_idx ON audit_events(organisation_id,created_at DESC);
