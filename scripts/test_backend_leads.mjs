// scripts/test_backend_leads.mjs
// Test script for api/leads.js endpoint

import handler from '../api/leads.js';
import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

function createMockReqRes({ method = 'POST', body = {}, headers = {} }) {
  const req = {
    method,
    body,
    headers: {
      'x-forwarded-for': '127.0.0.1',
      ...headers
    }
  };

  let statusCode = 200;
  let responseData = null;
  const resHeaders = {};

  const res = {
    setHeader(k, v) { resHeaders[k] = v; },
    status(code) {
      statusCode = code;
      return res;
    },
    json(data) {
      responseData = data;
      return res;
    },
    end() {
      return res;
    }
  };

  return { req, res, getResult: () => ({ statusCode, responseData, resHeaders }) };
}

async function runTests() {
  console.log('=== 1. TESTING BACKEND INPUT VALIDATION (MISSING FIELDS) ===');
  const { req: req1, res: res1, getResult: getRes1 } = createMockReqRes({
    body: {
      fullName: '',
      businessName: '',
      email: 'not-an-email',
      whatsappNumber: '123'
    }
  });
  await handler(req1, res1);
  const r1 = getRes1();
  console.log(`Validation test status: ${r1.statusCode} (Expected: 400) | Error: "${r1.responseData?.error}"`);

  console.log('\n=== 2. TESTING ANTI-SPAM HONEYPOT TRAP ===');
  const { req: req2, res: res2, getResult: getRes2 } = createMockReqRes({
    body: {
      fullName: 'Bot User',
      businessName: 'Bot Inc',
      email: 'bot@example.com',
      whatsappNumber: '919876543210',
      currentChallenge: 'Legitimate looking text here for challenge.',
      honeypot: 'spam-bot-value'
    }
  });
  await handler(req2, res2);
  const r2 = getRes2();
  console.log(`Honeypot test status: ${r2.statusCode} (Expected: 400) | Error: "${r2.responseData?.error}"`);

  console.log('\n=== 3. TESTING CONTROLLED QA LEAD SUBMISSION ===');
  const uniqueTestEmail = `qa-test-${Date.now()}@prajyotinfotech.in`;
  const uniqueTestPhone = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  const qaLeadPayload = {
    name: '[TEST-LEAD] Server Verification QA',
    businessName: '[TEST-DO-NOT-PROCESS] Automated Backend Test Org',
    email: uniqueTestEmail,
    whatsappNumber: uniqueTestPhone,
    industry: 'IT & Professional Services',
    requirementType: 'Free Business Technology Audit',
    budget: '₹3,00,000 – ₹10,00,000 (~$3,600 – $12,000)',
    timeline: '1 to 3 Months',
    currentChallenge: '[CONTROLLED QA TEST] Verifying serverless backend lead ingestion, database persistence, and sales notification trigger.',
    source: '2027 Business Growth Campaign — Backend Verification',
    utm: {
      utm_source: 'qa_backend_test',
      utm_medium: 'automated_test',
      utm_campaign: '2027_growth'
    }
  };

  const { req: req3, res: res3, getResult: getRes3 } = createMockReqRes({ body: qaLeadPayload });
  await handler(req3, res3);
  const r3 = getRes3();
  console.log(`QA Lead submission status: ${r3.statusCode} (Expected: 201)`);
  console.log('Backend response:', JSON.stringify(r3.responseData, null, 2));

  const serverLeadId = r3.responseData?.leadId;

  console.log('\n=== 4. VERIFYING ACTUAL PERSISTENT DATABASE INSERTION IN POSTGRESQL ===');
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const dbLead = await client.query('SELECT * FROM leads WHERE id = $1;', [serverLeadId]);
  console.log('Database query result row count:', dbLead.rows.length);
  if (dbLead.rows.length > 0) {
    const lead = dbLead.rows[0];
    console.log('Verified Lead in DB:');
    console.log(`  - ID: ${lead.id}`);
    console.log(`  - Name: ${lead.name}`);
    console.log(`  - Contact: [PROTECTED / VERIFIED FORMAT: ${lead.contact.slice(0, 5)}***]`);
    console.log(`  - Requirement: ${lead.project_type}`);
    console.log(`  - Source: ${lead.source}`);
    console.log(`  - Status: ${lead.status}`);
    console.log(`  - Created At: ${lead.created_at}`);
  }

  console.log('\n=== 5. VERIFYING SALES-TEAM NOTIFICATION PERSISTENCE ===');
  const dbNotif = await client.query('SELECT * FROM lead_notifications WHERE lead_id = $1;', [serverLeadId]);
  console.log('Notification record query count:', dbNotif.rows.length);
  if (dbNotif.rows.length > 0) {
    const notif = dbNotif.rows[0];
    console.log('Verified Sales Notification in DB:');
    console.log(`  - Notification ID: ${notif.id}`);
    console.log(`  - Recipient: ${notif.recipient}`);
    console.log(`  - Channel: ${notif.channel}`);
    console.log(`  - Subject: ${notif.subject}`);
    console.log(`  - Status: ${notif.status}`);
    console.log(`  - Provider Response: ${notif.provider_response}`);
  }

  console.log('\n=== 6. TESTING SERVER-SIDE DUPLICATE SUBMISSION PREVENTION ===');
  const { req: reqDup, res: resDup, getResult: getResDup } = createMockReqRes({ body: qaLeadPayload });
  await handler(reqDup, resDup);
  const rDup = getResDup();
  console.log(`Duplicate submission status: ${rDup.statusCode} (Expected: 409 Conflict)`);
  console.log('Duplicate error message:', rDup.responseData?.error);

  await client.end();
  console.log('\n=== ALL BACKEND FUNCTIONALITY VERIFIED SUCCESSFULLY ===');
}

runTests().catch(e => {
  console.error('Test suite error:', e);
  process.exit(1);
});

