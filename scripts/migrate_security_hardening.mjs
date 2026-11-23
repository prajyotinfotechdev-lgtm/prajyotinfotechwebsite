import pkg from 'pg';
const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function migrate() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  console.log('--- 1. Creating admin_audit_logs table ---');
  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_audit_logs (
      id VARCHAR(64) PRIMARY KEY,
      action VARCHAR(64) NOT NULL,
      admin_identifier VARCHAR(128) NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'admin',
      status VARCHAR(32) NOT NULL,
      client_ip_hash VARCHAR(64),
      details TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log('admin_audit_logs ready.');

  console.log('--- 2. Updating lead_notifications table with next_retry_at and dead_letter support ---');
  await client.query(`
    ALTER TABLE lead_notifications 
    ADD COLUMN IF NOT EXISTS next_retry_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS dead_letter BOOLEAN DEFAULT FALSE;
  `);
  console.log('lead_notifications columns updated.');

  console.log('--- 3. Clean up any raw IPs in api_rate_limits table ---');
  await client.query(`DELETE FROM api_rate_limits;`);
  console.log('api_rate_limits cleared for keyed hash storage.');

  await client.end();
  console.log('Migration completed successfully.');
}

migrate().catch(console.error);

