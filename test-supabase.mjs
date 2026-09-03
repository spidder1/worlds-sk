import pg from './packages/importer/node_modules/pg/lib/index.js';
const { Client } = pg;

async function findSupabasePooler() {
  const regions = [
    'eu-central-1',
    'eu-west-1',
    'eu-central-2',
    'eu-west-3',
    'us-east-1',
    'us-west-1'
  ];

  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('Missing required environment variable: DATABASE_URL');
    console.log(`Skúšam pooler v regióne ${region} (${host}:6543)...`);
    const client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 4000
    });

    try {
      await client.connect();
      console.log(`\n🎉 ÚSPECH! Supabase Pooler nájdený v regióne: ${region}`);
      const res = await client.query('SELECT current_database(), current_user, version();');
      console.log('Pripojená databáza:', res.rows[0]);
      
      const tablesRes = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
      `);
      console.log('Tabuľky v databáze:', tablesRes.rows.map(r => r.table_name));

      const countRes = await client.query('SELECT COUNT(*) as count FROM master_products;');
      console.log('Počet produktov v tabuľke master_products:', countRes.rows[0].count);

      await client.end();
      return region;
    } catch (err) {
      console.log(`   (Región ${region} neúspešný: ${err.message})`);
    }
  }
}

findSupabasePooler().catch(console.error);
