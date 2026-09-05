CREATE TABLE IF NOT EXISTS ai_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  model text NOT NULL,
  prompt_version text,
  schema_version text,
  input_hash text,
  status text NOT NULL DEFAULT 'COMPLETED'
    CHECK (status IN ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED')),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  token_count integer,
  cost numeric(19,8),
  error_message text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_ai_runs_status_time ON ai_runs (status, started_at DESC);

CREATE TABLE IF NOT EXISTS ai_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid REFERENCES ai_runs(id) ON DELETE SET NULL,
  product_id text REFERENCES products(id) ON DELETE CASCADE,
  suggestion_type text NOT NULL,
  target_id text,
  suggested_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence numeric(5,4),
  alternatives jsonb NOT NULL DEFAULT '[]'::jsonb,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_ai_suggestions_review
  ON ai_suggestions (status, suggestion_type, confidence DESC);
CREATE INDEX IF NOT EXISTS idx_ai_suggestions_product
  ON ai_suggestions (product_id, created_at DESC);

CREATE TABLE IF NOT EXISTS review_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text REFERENCES products(id) ON DELETE CASCADE,
  suggestion_id uuid REFERENCES ai_suggestions(id) ON DELETE SET NULL,
  task_type text NOT NULL,
  status text NOT NULL DEFAULT 'OPEN'
    CHECK (status IN ('OPEN', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'SNOOZED')),
  priority integer NOT NULL DEFAULT 50 CHECK (priority BETWEEN 0 AND 100),
  assigned_to text,
  decision jsonb NOT NULL DEFAULT '{}'::jsonb,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_review_tasks_queue
  ON review_tasks (status, priority DESC, created_at);

CREATE TABLE IF NOT EXISTS classification_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  taxonomy_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  method text NOT NULL CHECK (method IN ('RULE', 'AI_AUTO', 'AI_REVIEWED', 'HUMAN', 'IMPORT')),
  confidence numeric(5,4),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  decided_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_classification_decisions_product
  ON classification_decisions (product_id, decided_at DESC);

CREATE OR REPLACE FUNCTION worlds_record_classification_decision()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  node_id text;
  decision_method text;
BEGIN
  SELECT 'worlds:' || c.id INTO node_id
    FROM categories c WHERE c.slug = NEW.category_slug;
  IF node_id IS NULL THEN RETURN NEW; END IF;
  IF NOT EXISTS (SELECT 1 FROM taxonomy_nodes WHERE id = node_id AND taxonomy_code = 'WORLDS_CATALOG') THEN
    RETURN NEW;
  END IF;
  decision_method := CASE
    WHEN upper(COALESCE(NEW.category_source, '')) = 'ADMIN' THEN 'HUMAN'
    WHEN upper(COALESCE(NEW.category_source, '')) LIKE 'AI%' THEN 'AI_REVIEWED'
    WHEN upper(COALESCE(NEW.category_source, '')) = 'RULE' THEN 'RULE'
    ELSE 'IMPORT'
  END;
  INSERT INTO classification_decisions
    (product_id, taxonomy_code, taxonomy_node_id, method, confidence, evidence)
  VALUES (NEW.id, 'WORLDS_CATALOG', node_id, decision_method, NEW.category_confidence,
          jsonb_build_object('category_source', NEW.category_source, 'category_reasoning', NEW.category_reasoning));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_classification_decision ON products;
CREATE TRIGGER products_classification_decision
AFTER INSERT OR UPDATE OF category_slug, category_source, category_confidence, category_reasoning
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_record_classification_decision();

INSERT INTO classification_decisions
  (product_id, taxonomy_code, taxonomy_node_id, method, confidence, evidence)
SELECT p.id, 'WORLDS_CATALOG', 'worlds:' || c.id,
       CASE WHEN upper(COALESCE(p.category_source, '')) = 'ADMIN' THEN 'HUMAN'
            WHEN upper(COALESCE(p.category_source, '')) = 'RULE' THEN 'RULE'
            ELSE 'IMPORT' END,
       p.category_confidence,
       jsonb_build_object('category_source', p.category_source, 'category_reasoning', p.category_reasoning)
  FROM products p JOIN categories c ON c.slug = p.category_slug;
