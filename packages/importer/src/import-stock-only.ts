process.env.ED_STOCK_ONLY = 'true';

const { importAsusLenovoToNeon } = await import('./import-neon.js');
await importAsusLenovoToNeon();
