import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const minutesArg = Number.parseInt(process.env.CLASSIFICATION_REPORT_MINUTES || '60', 10);
const minutes = Number.isFinite(minutesArg) && minutesArg > 0 ? minutesArg : 60;
const { Client } = pg;
const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

await client.connect();
try {
  const summary = await client.query(
    `SELECT category_source, COUNT(*)::int AS count,
            ROUND(AVG(category_confidence)::numeric, 4) AS avg_confidence
       FROM products
      WHERE updated_at > now() - make_interval(mins => $1)
      GROUP BY category_source
      ORDER BY category_source`,
    [minutes],
  );
  const products = await client.query(
    `SELECT sku, title, category_slug, category_hierarchy,
            category_source, category_confidence, category_reasoning,
            final_price, jsonb_array_length(COALESCE(images, '[]'::jsonb)) AS image_count
       FROM products
      WHERE updated_at > now() - make_interval(mins => $1)
      ORDER BY category_confidence NULLS FIRST, sku`,
    [minutes],
  );

  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), minutes, summary: summary.rows, products: products.rows }, null, 2));
} finally {
  await client.end();
}
