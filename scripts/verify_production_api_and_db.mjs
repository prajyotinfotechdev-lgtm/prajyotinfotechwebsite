// scripts/verify_production_api_and_db.mjs
import https from 'https';
import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

function makePost(path, body) {
  return new Promise((resolve) => {
    const dataStr = JSON.stringify(body);
    const req = https.request({
      hostname: 'www.prajyotinfotech.in',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataStr)
      }
    }, (res) => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(resBody); } catch {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          rawBody: resBody,
          json
        });
      });
    });
    req.on('error', (err) => resolve({ error: err.message }));
    req.write(dataStr);
    req.end();
  });
}

async function runProductionBackendVerification() {
  console.log('=== 1. VERIFYING LIVE /api/leads ENDPOINT ON PRODUCTION ===');
  
  // Wait a moment for Vercel deployment propagation
  let attempts = 0;
  let endpointReady = false;
  let testRes = null;

  while (!endpointReady && attempts < 10) {
    attempts++;
    console.log(`Checking /api/leads deployment (Attempt ${attempts})...`);
    testRes = await makePost('/api/leads', {
      fullName: '',
      businessName: '',
      email: 'invalid',
      whatsappNumber: '123'
    });
    if (testRes.statusCode === 400 || testRes.statusCode === 201) {
      endpointReady = true;
      console.log('>>> Vercel Serverless Function /api/leads is LIVE and responding! <<<');
      break;
    }
    await new Promise(r => setTimeout(r, 6000));
  }

  console.log('Initial Validation Response on production:');
  console.log(`  HTTP Status: ${testRes.statusCode}`);
  console.log('  Response:', testRes.json || testRes.rawBody);

  console.log('\n=== 2. SUBMITTING CONTROLLED QA LEAD VIA PRODUCTION HTTP API ===');
  const uniqueTimestamp = Date.now();
  const qaEmail = `qa-prod-${uniqueTimestamp}@prajyotinfotech.in`;
  const qaPhone = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  const qaPayload = {
    name: '[TEST-LEAD] Production QA Verification',
    businessName: '[TEST-DO-NOT-PROCESS] Live Enterprise QA',
    email: qaEmail,
    whatsappNumber: qaPhone,
    industry: 'Manufacturing & Engineering',
    requirementType: 'Free Business Technology Audit',
    budget: '₹3,00,000 – ₹10,00,000 (~$3,600 – $12,000)',
    timeline: '1 to 3 Months',
    currentChallenge: '[CONTROLLED QA TEST] Verifying production serverless API lead ingestion, database persistence, and sales notification trigger.',
    source: '2027 Business Growth Campaign — Production Audit Test',
    utm: {
      utm_source: 'qa_production_audit',
      utm_medium: 'automated_test',
      utm_campaign: '2027_growth'
    }
  };

  const submitRes = await makePost('/api/leads', qaPayload);
  console.log(`API Submission Status: ${submitRes.statusCode} (Expected: 201)`);
  console.log('Response Headers:', {
    'content-type': submitRes.headers['content-type'],
    'server': submitRes.headers['server'],
    'x-vercel-id': submitRes.headers['x-vercel-id']
  });
  console.log('API Response Body:');
  console.log(JSON.stringify(submitRes.json, null, 2));

  const serverLeadId = submitRes.json?.leadId;
  const notifId = submitRes.json?.notification?.notificationId;

  console.log('\n=== 3. VERIFYING ACTUAL PERSISTENT DATABASE INSERTION IN SUPABASE POSTGRESQL ===');
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const dbRes = await client.query('SELECT * FROM leads WHERE id = $1;', [serverLeadId]);
  console.log('Database Query Rows Count:', dbRes.rows.length);
  if (dbRes.rows.length > 0) {
    const row = dbRes.rows[0];
    console.log('Verified Database Record:');
    console.log(`  Lead ID: ${row.id}`);
    console.log(`  Name: ${row.name}`);
    console.log(`  Contact: [PROTECTED / VERIFIED: ${row.contact.slice(0, 5)}***]`);
    console.log(`  Project / Requirement Type: ${row.project_type}`);
    console.log(`  Budget: ${row.budget}`);
    console.log(`  Source / Campaign Attribution: ${row.source}`);
    console.log(`  Status: ${row.status}`);
    console.log(`  Created At: ${row.created_at}`);
  } else {
    console.error('FAIL: Record not found in PostgreSQL!');
  }

  console.log('\n=== 4. VERIFYING SALES-TEAM NOTIFICATION PERSISTENCE ===');
  const notifDbRes = await client.query('SELECT * FROM lead_notifications WHERE lead_id = $1;', [serverLeadId]);
  console.log('Notification Table Query Rows Count:', notifDbRes.rows.length);
  if (notifDbRes.rows.length > 0) {
    const notifRow = notifDbRes.rows[0];
    console.log('Verified Sales Notification Record:');
    console.log(`  Notification ID: ${notifRow.id}`);
    console.log(`  Lead ID: ${notifRow.lead_id}`);
    console.log(`  Recipient: ${notifRow.recipient}`);
    console.log(`  Channel: ${notifRow.channel}`);
    console.log(`  Subject: ${notifRow.subject}`);
    console.log(`  Status: ${notifRow.status}`);
    console.log(`  Provider Response: ${notifRow.provider_response}`);
    console.log(`  Dispatched At: ${notifRow.created_at}`);
  } else {
    console.error('FAIL: Notification record not found in PostgreSQL!');
  }

  console.log('\n=== 5. VERIFYING SERVER-SIDE DUPLICATE SUBMISSION PREVENTION ===');
  const dupRes = await makePost('/api/leads', qaPayload);
  console.log(`Duplicate Request Status: ${dupRes.statusCode} (Expected: 409 Conflict)`);
  console.log('Duplicate Error Message:', dupRes.json?.error);

  console.log('\n=== 6. VERIFYING SPAM HONEYPOT TRAP ON PRODUCTION ===');
  const spamRes = await makePost('/api/leads', {
    ...qaPayload,
    email: `spam-${Date.now()}@example.com`,
    whatsappNumber: '918888888888',
    honeypot: 'bot-spam-value'
  });
  console.log(`Spam Request Status: ${spamRes.statusCode} (Expected: 400 Bad Request)`);
  console.log('Spam Error Message:', spamRes.json?.error);

  await client.end();
  console.log('\n=== PRODUCTION BACKEND VERIFICATION COMPLETE ===');
}

runProductionBackendVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
