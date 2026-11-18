ALTER TABLE milestone_signoffs ADD COLUMN IF NOT EXISTS requested_by uuid REFERENCES users(id);
CREATE INDEX IF NOT EXISTS milestone_signoffs_tenant_status_idx
  ON milestone_signoffs(organisation_id,status,created_at DESC);
