-- ─────────────────────────────────────────────────────────────────────────────
-- Run this ONCE in your Supabase project:
-- Dashboard → SQL Editor → New query → paste → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- Portfolio items
-- src is TEXT (unlimited) so it can hold base64-encoded images
CREATE TABLE IF NOT EXISTS portfolio_items (
  id          TEXT PRIMARY KEY,
  title       TEXT        NOT NULL,
  category    TEXT        NOT NULL,
  type        TEXT        NOT NULL DEFAULT 'image',
  src         TEXT        NOT NULL,   -- base64 data URL or external URL
  tags        JSONB                   DEFAULT '[]',
  sort_order  INTEGER                 DEFAULT 0,
  created_at  TIMESTAMPTZ             DEFAULT NOW()
);

-- Profile / about data
CREATE TABLE IF NOT EXISTS site_profile (
  key         TEXT PRIMARY KEY,
  value       JSONB       NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security — allow full public access
-- (the admin password in your app is what protects writes)
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_profile    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public all portfolio" ON portfolio_items;
DROP POLICY IF EXISTS "public all profile"   ON site_profile;

CREATE POLICY "public all portfolio" ON portfolio_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all profile"   ON site_profile    FOR ALL USING (true) WITH CHECK (true);
