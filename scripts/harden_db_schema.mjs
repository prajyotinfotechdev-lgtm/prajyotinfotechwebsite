import pkg from 'pg';
const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function migrate() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  console.log('--- 1. Creating api_rate_limits table for multi-instance atomic rate limiting ---');
  await client.query(`
    CREATE TABLE IF NOT EXISTS api_rate_limits (
      ip VARCHAR(64) PRIMARY KEY,
      request_count INT NOT NULL DEFAULT 1,
      window_start_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log('api_rate_limits table ready.');

  console.log('\n--- 2. Creating api_error_logs table for production error monitoring ---');
  await client.query(`
    CREATE TABLE IF NOT EXISTS api_error_logs (
      id VARCHAR(64) PRIMARY KEY,
      endpoint VARCHAR(128) NOT NULL,
      status_code INT NOT NULL,
      error_type VARCHAR(64) NOT NULL,
      error_message TEXT NOT NULL,
      masked_ip VARCHAR(64),
      masked_contact VARCHAR(128),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log('api_error_logs table ready.');

  console.log('\n--- 3. Updating lead_notifications columns for retry tracking ---');
  await client.query(`
    ALTER TABLE lead_notifications 
    ADD COLUMN IF NOT EXISTS retry_count INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_error TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TEXT;
  `);
  console.log('lead_notifications columns enhanced.');

  console.log('\n--- 4. Marking existing test QA leads as test data and excluding from sales follow-up ---');
  const updateLeads = await client.query(`
    UPDATE leads 
    SET status = 'Test / Excluded from Sales' 
    WHERE name LIKE '%[TEST%' OR contact LIKE '%qa-%' OR message LIKE '%TEST%' OR message LIKE '%QA Verification%'
    RETURNING id, name, status;
  `);
  console.log(`Updated ${updateLeads.rowCount} test leads to 'Test / Excluded from Sales'.`);

  const updateNotifs = await client.query(`
    UPDATE lead_notifications 
    SET status = 'test_excluded' 
    WHERE lead_id IN (SELECT id FROM leads WHERE status = 'Test / Excluded from Sales')
    RETURNING id, lead_id, status;
  `);
  console.log(`Updated ${updateNotifs.rowCount} test notifications to 'test_excluded'.`);

  await client.end();
  console.log('\n=== MIGRATION COMPLETED SUCCESSFULLY ===');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

