import pkg from 'pg';
const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function cleanup() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const res1 = await client.query(
    "UPDATE leads SET status = 'Test / Excluded from Sales' WHERE name LIKE '%[TEST%' OR contact LIKE '%qa-%' OR message LIKE '%TEST%' OR message LIKE '%QA%'"
  );
  const res2 = await client.query(
    "UPDATE lead_notifications SET status = 'test_excluded' WHERE lead_id IN (SELECT id FROM leads WHERE status = 'Test / Excluded from Sales')"
  );

  console.log(`Updated ${res1.rowCount} leads to 'Test / Excluded from Sales'.`);
  console.log(`Updated ${res2.rowCount} notifications to 'test_excluded'.`);

  // Verify non-test leads are intact
  const activeLeads = await client.query(
    "SELECT id, name, status, created_at FROM leads WHERE status != 'Test / Excluded from Sales' ORDER BY created_at DESC LIMIT 5"
  );
  console.log('Active non-test production leads count:', activeLeads.rowCount);

  await client.end();
}

cleanup().catch(console.error);

