import pkg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL in .env");
  process.exit(1);
}

async function setupLeadsTable() {
  console.log("Connecting to Supabase PostgreSQL database...");
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected successfully!");

    console.log("Creating 'leads' table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        project_type TEXT,
        budget TEXT,
        message TEXT,
        source TEXT DEFAULT 'Website',
        status TEXT DEFAULT 'New',
        created_at TEXT
      );
    `);

    console.log("'leads' table created successfully!");
  } catch (err) {
    console.error("Error setting up leads table:", err);
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
}

setupLeadsTable();
