import pkg from 'pg';
const { Client } = pkg;

const connectionString = "postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";

async function setupDatabase() {
  console.log("Connecting to Supabase PostgreSQL database...");
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected successfully!");

    // Create jobs table
    console.log("Creating 'jobs' table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        department TEXT,
        location TEXT,
        type TEXT,
        experience TEXT,
        salary TEXT,
        status TEXT DEFAULT 'Active',
        deadline TEXT,
        summary TEXT,
        responsibilities TEXT[],
        requirements TEXT[],
        benefits TEXT[],
        posted_date TEXT
      );
    `);
    
    // Create applications table
    console.log("Creating 'applications' table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        job_id TEXT,
        job_title TEXT,
        candidate_name TEXT NOT NULL,
        candidate_email TEXT NOT NULL,
        candidate_phone TEXT NOT NULL,
        experience TEXT,
        linkedin_url TEXT,
        portfolio_url TEXT,
        resume_name TEXT,
        cover_note TEXT,
        status TEXT DEFAULT 'New',
        submitted_at TEXT
      );
    `);

    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
}

setupDatabase();
