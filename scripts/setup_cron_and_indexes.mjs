import pkg from 'pg';
const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function setup() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  console.log('--- 1. Creating performance & lookup indexes ---');
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON api_rate_limits(window_start_at);
    CREATE INDEX IF NOT EXISTS idx_lead_notif_retry ON lead_notifications(status, next_retry_at) WHERE status = 'pending_retry';
    CREATE INDEX IF NOT EXISTS idx_leads_contact ON leads(contact);
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_api_error_logs_created_at ON api_error_logs(created_at);
    CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at);
  `);
  console.log('Indexes created successfully.');

  console.log('--- 2. Adding lock recovery columns to lead_notifications ---');
  await client.query(`
    ALTER TABLE lead_notifications 
    ADD COLUMN IF NOT EXISTS processing_lock_until TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS claimed_by VARCHAR(64);
  `);
  console.log('Lock recovery columns added.');

  await client.end();
  console.log('Setup completed.');
}

setup().catch(console.error);

