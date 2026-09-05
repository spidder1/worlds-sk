# Production runbook

Everything an operator has to do outside the codebase. Read this before merging
the production-hardening branch.

---

## 1. Rotate the leaked database password — do this first

The production Neon connection string was committed to a **public** GitHub
repository and is in the git history of `main`:

```
apps/storefront/src/lib/neon-client.ts
packages/importer/src/import-neon.ts
scripts/init-neon-db.js
scripts/recategorize-all.ts
scripts/recategorize-products.ts
```

The fallbacks are removed from the working tree, but removing a secret from HEAD
does not un-publish it. Anyone who cloned the repository has full read/write
access to the catalogue until the password changes.

1. Neon console → project `worlds` (Vercel-managed org) → Roles → `neondb_owner`
   → **Reset password**.
2. Copy the new connection string.
3. Vercel → project `worlds-sk-storefront` → Settings → Environment Variables →
   set `DATABASE_URL` for Production, Preview and Development.
4. GitHub → repository → Settings → Secrets and variables → Actions →
   set the `DATABASE_URL` secret (the catalogue sync workflow needs it).
5. Redeploy.

Consider making the repository private as well — the git history still contains
the old string, and `old/` contains a copy of the previous Magento import stack.

---

## 2. Required environment variables

`.env.example` is the reference. The two that block deployment:

| Variable | Where | Why |
| :--- | :--- | :--- |
| `DATABASE_URL` | Vercel (all environments), GitHub Actions secret | The storefront no longer falls back to a hardcoded database. **A build without it now fails.** That is deliberate: the previous behaviour was to publish an empty catalogue and log a warning. |
| `NEXT_PUBLIC_SITE_URL` | Vercel Production only | Set to `https://worlds.sk` once the domain is attached. Any other value (including the default `*.vercel.app`) serves `noindex` and disallows all crawling, so preview deployments cannot be indexed under worlds.sk canonicals. |

Import-only variables (GitHub Actions secrets): `ED_LOGIN`, `ED_PASSWORD`.
Optional repository variable: `ED_BRAND_SCOPE` (defaults to `ASUS,Lenovo`).

---

## 3. Database migrations

Schema lives in `db/neon/migrations/`, applied in filename order:

```bash
DATABASE_URL='postgresql://...' node scripts/migrate-neon.mjs
```

Every migration is idempotent, so re-running is safe. `0002_ed_sync_pipeline.sql`
has already been applied to the production database.

To test a schema change without touching production, create a Neon branch, point
`DATABASE_URL` at it, migrate there, then delete the branch.

---

## 4. Catalogue synchronisation

`.github/workflows/ed-catalog-sync.yml` writes **directly into Neon**. Before
this change it wrote into the retired Supabase project, so nothing it imported
reached the live site.

| Job | Schedule | eD method |
| :--- | :--- | :--- |
| `stock-price` | hourly | `getProductCatalogueStockDownloadXML` |
| `full-catalog` | 06:30 and 20:30 UTC | `getProductCatalogueFullDownloadZIPv1` |

Behaviour worth knowing before the first live run:

- **Unchanged products cost nothing.** Content, price and inventory hashes are
  compared; only genuinely changed rows are rewritten.
- **Product URLs are stable.** A re-import never overwrites the `slug` of an
  existing product, so a supplier retitling an item cannot break its indexed URL.
- **Only a full run retires products.** Items absent from a full catalogue run
  are set to `DISCONTINUED`, and only within `ED_BRAND_SCOPE`. A stock feed never
  retires anything. Widening `ED_BRAND_SCOPE` widens the shop; narrowing it does
  **not** retire the brands you removed.
- **A full run that parses zero products aborts** rather than marking the whole
  catalogue missing.

Run it by hand first: Actions → *eD catalog synchronization* → Run workflow →
`stock-price`, and check the row in `sync_batches` afterwards:

```sql
SELECT mode, status, total_read, created_count, changed_count, missing_count, metrics
  FROM sync_batches ORDER BY started_at DESC LIMIT 5;
```

---

## 5. Before the domain switch

- Attach `worlds.sk` to the Vercel project and set `NEXT_PUBLIC_SITE_URL`.
  Until then the site is intentionally invisible to search engines.
- Build and load the 301 map from the exported legacy worlds.sk URLs to the new
  routes before the DNS switch. The current Wayback reconciliation produced and
  loaded 747 active candidates into Neon; regenerate the CSV with
  `node scripts/build-legacy-redirect-candidates.mjs` when a newer legacy URL
  export is available, then load it with `node scripts/import-legacy-redirects.mjs`.
- If Comgate is enabled, configure `COMGATE_MERCHANT`, `COMGATE_SECRET` and
  `COMGATE_TEST` in Vercel. Register
  `https://worlds.sk/api/payments/comgate/notify` as the Comgate status URL;
  the webhook is accepted only after the transaction is verified against the
  Comgate status API.
- If Gemini intent extraction is desired, configure `GEMINI_API_KEY` and
  optionally `GEMINI_MODEL` (the assistant keeps its deterministic fallback
  when the key is absent or the provider is unavailable).
- Verify `/kosik`, Stripe/Comgate payment webhooks and the eD supplier-order worker in a
  production-like environment before switching DNS.
