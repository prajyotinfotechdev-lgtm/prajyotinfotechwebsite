import pkg from 'pg';
const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function inspectDb() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  console.log('Tables:', tables.rows.map(r => r.table_name));

  const leadCols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'leads'");
  console.log('Leads columns:', leadCols.rows.map(r => `${r.column_name} (${r.data_type})`));

  const notifCols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'lead_notifications'");
  console.log('Notifications columns:', notifCols.rows.map(r => `${r.column_name} (${r.data_type})`));

  await client.end();
}

inspectDb().catch(console.error);

