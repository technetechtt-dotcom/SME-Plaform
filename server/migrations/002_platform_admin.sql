CREATE TABLE IF NOT EXISTS platform_admins (
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 granted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS organisations_status_idx ON organisations(status,created_at DESC);
