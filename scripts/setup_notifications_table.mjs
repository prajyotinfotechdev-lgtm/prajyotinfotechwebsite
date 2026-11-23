import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function run() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS lead_notifications (
        id TEXT PRIMARY KEY,
        lead_id TEXT,
        recipient TEXT NOT NULL,
        channel TEXT NOT NULL,
        subject TEXT,
        payload TEXT,
        status TEXT NOT NULL,
        provider_response TEXT,
        created_at TEXT NOT NULL
      );
    `);
    console.log('lead_notifications table is ready!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
