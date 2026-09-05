CREATE TABLE IF NOT EXISTS store_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  min_cost numeric(12,2) NOT NULL DEFAULT 0,
  max_cost numeric(12,2),
  margin_percent numeric(7,3) NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pricing_rules_range_check CHECK (max_cost IS NULL OR max_cost > min_cost),
  CONSTRAINT pricing_rules_margin_check CHECK (margin_percent >= -100 AND margin_percent <= 1000)
);
CREATE INDEX IF NOT EXISTS pricing_rules_order_idx ON pricing_rules (active, display_order, min_cost);

CREATE TABLE IF NOT EXISTS content_pages (
  slug text PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  seo_title text,
  seo_description text,
  published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO store_settings (key, value) VALUES
  ('pricing.vat_rate', '{"value":20}'::jsonb),
  ('feed.minimum_cost_eur', '{"value":0}'::jsonb),
  ('checkout.allow_private_purchase', '{"value":true}'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO pricing_rules (min_cost, max_cost, margin_percent, display_order)
SELECT * FROM (VALUES
  (0::numeric, 100::numeric, 3::numeric, 1),
  (100::numeric, 300::numeric, 8::numeric, 2),
  (300::numeric, 1000::numeric, 12::numeric, 3),
  (1000::numeric, NULL::numeric, 10::numeric, 4)
) AS defaults(min_cost, max_cost, margin_percent, display_order)
WHERE NOT EXISTS (SELECT 1 FROM pricing_rules);

INSERT INTO content_pages (slug, title, body) VALUES
  ('o-nas', 'O nás', ''),
  ('kontakt', 'Kontakt', ''),
  ('doprava-a-platba', 'Doprava a platba', ''),
  ('obchodne-podmienky', 'Obchodné podmienky', ''),
  ('reklamacny-poriadok', 'Reklamačný poriadok', ''),
  ('ochrana-osobnych-udajov', 'Ochrana osobných údajov', '')
ON CONFLICT (slug) DO NOTHING;
