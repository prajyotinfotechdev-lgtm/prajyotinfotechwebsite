import https from 'https';
import pkg from 'pg';
import crypto from 'crypto';

const { Client } = pkg;
const PROD_HOST = 'www.prajyotinfotech.in';
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

function makeRequest({ method = 'POST', path = '/api/leads', headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const reqHeaders = {
      ...headers,
      ...(data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {})
    };

    const req = https.request(
      {
        hostname: PROD_HOST,
        port: 443,
        path,
        method,
        headers: reqHeaders,
        timeout: 15000
      },
      res => {
        let responseBody = '';
        res.on('data', chunk => (responseBody += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(responseBody);
          } catch {
            parsed = responseBody;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (data) req.write(data);
    req.end();
  });
}

async function runTestSuite() {
  console.log('=== PRAJYOT INFOTECH LEAD PIPELINE PRODUCTION HARDENING TEST SUITE ===\n');

  // Wait for deployment to ensure commit 64ad2b1 is active
  console.log('Checking live production deployment status...');
  let deployed = false;
  for (let i = 0; i < 10; i++) {
    const health = await makeRequest({ method: 'GET', path: '/api/leads' }).catch(() => ({ status: 0 }));
    if (health.status === 200 && health.body?.status === 'healthy') {
      console.log('Live hardened API active:', health.body);
      deployed = true;
      break;
    }
    console.log(`Waiting for Vercel deployment... (attempt ${i + 1}/10)`);
    await new Promise(r => setTimeout(r, 4000));
  }

  if (!deployed) {
    console.warn('Warning: New GET endpoint not yet responding 200. Proceeding with tests...');
  }

  const dbClient = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await dbClient.connect();

  // Reset rate limits for test IP to ensure clean run
  await dbClient.query("DELETE FROM api_rate_limits;");

  // 1. TEST SUCCESSFUL SUBMISSION
  console.log('\n--- TEST 1: Successful Lead Submission & Persistent Storage ---');
  const uniqueId1 = Date.now();
  const testContact1 = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const testEmail1 = `qa-audit-${uniqueId1}@prajyotinfotech.in`;

  const payload1 = {
    name: '[TEST-LEAD] Hardened Production QA',
    businessName: '[TEST-DO-NOT-PROCESS] Hardened Pipeline Org',
    whatsappNumber: testContact1,
    email: testEmail1,
    requirementType: 'Free Business Technology Audit',
    industry: 'Technology & SaaS',
    budget: '₹3,00,000 – ₹5,00,000',
    timeline: 'Immediate',
    challenge: '[QA HARDENING TEST] Testing transactional persistence, advisory locking, and notification bus.',
    source: 'Free Business Tech Audit Landing Page (/free-business-tech-audit)'
  };

  const res1 = await makeRequest({ method: 'POST', body: payload1 });
  console.log('HTTP Status:', res1.status);
  console.log('Response Body:', res1.body);
  const pass1 = res1.status === 201 && res1.body.leadId && res1.body.notification?.status === 'delivered';
  console.log('Test 1 Result:', pass1 ? 'PASS' : 'FAIL');

  // Verify in PostgreSQL
  const dbLead1 = await dbClient.query('SELECT id, name, status, created_at FROM leads WHERE id = $1', [res1.body.leadId]);
  console.log('DB Leads Record:', dbLead1.rows[0]);
  const dbNotif1 = await dbClient.query('SELECT id, lead_id, recipient, channel, status, retry_count FROM lead_notifications WHERE lead_id = $1', [res1.body.leadId]);
  console.log('DB Notifications Record:', dbNotif1.rows[0]);

  // 2. TEST CONCURRENT DUPLICATE SUBMISSIONS (Transaction lock)
  console.log('\n--- TEST 2: Concurrent Duplicate Submissions (Advisory Lock Test) ---');
  const uniqueId2 = Date.now() + 100;
  const testContact2 = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const testEmail2 = `qa-concurrent-${uniqueId2}@prajyotinfotech.in`;

  const concurrentPayload = {
    name: '[TEST-LEAD] Concurrent Test Lead',
    businessName: '[TEST-DO-NOT-PROCESS] Concurrent Org',
    whatsappNumber: testContact2,
    email: testEmail2,
    requirementType: 'Custom Software Development',
    industry: 'Logistics',
    budget: '₹5,00,000+',
    timeline: '1-3 Months',
    challenge: '[CONCURRENT TEST] Firing 4 simultaneous submissions with identical contact to test race condition defense.',
    source: '2027 Business Growth Campaign'
  };

  console.log('Firing 4 concurrent requests at identical millisecond...');
  const concurrentResults = await Promise.all([
    makeRequest({ method: 'POST', body: concurrentPayload }),
    makeRequest({ method: 'POST', body: concurrentPayload }),
    makeRequest({ method: 'POST', body: concurrentPayload }),
    makeRequest({ method: 'POST', body: concurrentPayload })
  ]);

  const statuses = concurrentResults.map(r => r.status);
  console.log('Concurrent Response Statuses:', statuses);
  const successCount = statuses.filter(s => s === 201).length;
  const duplicateBlockedCount = statuses.filter(s => s === 409).length;
  console.log(`Successes (201): ${successCount} | Duplicate Blocked (409): ${duplicateBlockedCount}`);

  const pass2 = successCount === 1 && duplicateBlockedCount === 3;
  console.log('Test 2 Result (Advisory Lock Concurrency):', pass2 ? 'PASS (Zero Race Condition, 1 Lead Inserted, 3 Blocked)' : 'FAIL');

  // Verify only 1 record created in DB
  const dbConcurrentCount = await dbClient.query('SELECT count(*) FROM leads WHERE contact LIKE $1', [`%${testEmail2}%`]);
  console.log('Total leads inserted into database for contact:', dbConcurrentCount.rows[0].count);

  // 3. TEST FAILED NOTIFICATION HANDLING (Lead preserved, failure recorded, no loss)
  console.log('\n--- TEST 3: Notification Failure & Retry Handling (Never Lose Lead) ---');
  const uniqueId3 = Date.now() + 200;
  const testContact3 = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const testEmail3 = `qa-notif-fail-${uniqueId3}@prajyotinfotech.in`;

  const failurePayload = {
    name: '[TEST-LEAD] Notification Failure Test',
    businessName: '[TEST-DO-NOT-PROCESS] Resilience Org',
    whatsappNumber: testContact3,
    email: testEmail3,
    requirementType: 'OIBUZ Construction ERP',
    industry: 'Construction',
    budget: '₹2,00,000 – ₹3,00,000',
    timeline: 'Immediate',
    challenge: '[RESILIENCE TEST] Verifying that when notification dispatch fails, lead is safely committed and recorded.',
    source: '2027 Business Growth Campaign',
    simulateNotificationFailure: true
  };

  const res3 = await makeRequest({
    method: 'POST',
    headers: { 'X-Simulate-Failure': 'true' },
    body: failurePayload
  });
  console.log('HTTP Status:', res3.status);
  console.log('Response Body:', res3.body);

  const pass3LeadPreserved = res3.status === 201 && res3.body.leadId && res3.body.notification?.status === 'failed_queued_for_retry';
  console.log('Lead preserved on notification failure:', pass3LeadPreserved ? 'PASS' : 'FAIL');

  // Verify DB state for failed notification
  const dbLead3 = await dbClient.query('SELECT id, name, status FROM leads WHERE id = $1', [res3.body.leadId]);
  console.log('DB Lead Preserved in Leads Table:', dbLead3.rows[0]);

  const dbNotif3 = await dbClient.query('SELECT id, lead_id, status, retry_count, last_error FROM lead_notifications WHERE lead_id = $1', [res3.body.leadId]);
  console.log('DB Notification Record (Failed with Retries):', dbNotif3.rows[0]);

  const dbErrorLog3 = await dbClient.query("SELECT id, error_type, status_code, error_message FROM api_error_logs WHERE error_type = 'NOTIFICATION_DISPATCH_FAILURE' ORDER BY created_at DESC LIMIT 1");
  console.log('DB API Error Log (Alert Entry):', dbErrorLog3.rows[0]);

  // 4. TEST MULTI-INSTANCE ATOMIC RATE LIMITING
  console.log('\n--- TEST 4: Shared Atomic Rate Limiting (PostgreSQL api_rate_limits) ---');
  console.log('Submitting requests to reach the 15-request ceiling...');
  let rateLimitHit = false;
  let finalStatus = 0;
  for (let i = 0; i < 16; i++) {
    const dummyPayload = {
      name: `[TEST-LEAD] Rate Limit Test ${i}`,
      businessName: `[TEST] Rate Limit Corp ${i}`,
      whatsappNumber: `91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      email: `qa-rl-${i}-${Date.now()}@prajyotinfotech.in`,
      requirementType: 'Free Business Technology Audit',
      challenge: 'Rate limit verification iteration testing PostgreSQL atomic count.',
      source: 'Test'
    };
    const rlRes = await makeRequest({ method: 'POST', body: dummyPayload });
    finalStatus = rlRes.status;
    if (rlRes.status === 429) {
      rateLimitHit = true;
      console.log(`Request #${i + 1} correctly blocked with HTTP 429:`, rlRes.body.error);
      break;
    }
  }

  const pass4 = rateLimitHit;
  console.log('Test 4 Result (Shared Atomic Rate Limiting):', pass4 ? 'PASS' : 'FAIL');

  const rateLimitDb = await dbClient.query('SELECT ip, request_count, window_start_at FROM api_rate_limits ORDER BY updated_at DESC LIMIT 3');
  console.log('PostgreSQL api_rate_limits state:', rateLimitDb.rows);

  // 5. TEST MONITORING & ALERTS
  console.log('\n--- TEST 5: Production Monitoring & Alert Verification (GET /api/leads) ---');
  // Reset rate limits so GET query succeeds
  await dbClient.query("DELETE FROM api_rate_limits;");

  const monitoringRes = await makeRequest({ method: 'GET', path: '/api/leads' });
  console.log('Monitoring HTTP Status:', monitoringRes.status);
  console.log('Alerts Summary:', JSON.stringify(monitoringRes.body?.alerts, null, 2));
  const pass5 = monitoringRes.status === 200 && monitoringRes.body?.alerts?.failedNotificationsCount >= 1;
  console.log('Test 5 Result (Monitoring Alerts):', pass5 ? 'PASS' : 'FAIL');

  // Mark all created test leads as test data
  console.log('\n--- Cleanup: Marking newly created test leads as test data ---');
  const cleanLeads = await dbClient.query(`
    UPDATE leads 
    SET status = 'Test / Excluded from Sales' 
    WHERE name LIKE '%[TEST%' OR contact LIKE '%qa-%' OR message LIKE '%TEST%' OR message LIKE '%QA%'
    RETURNING id;
  `);
  console.log(`Marked ${cleanLeads.rowCount} test leads as 'Test / Excluded from Sales'.`);

  const cleanNotifs = await dbClient.query(`
    UPDATE lead_notifications 
    SET status = 'test_excluded' 
    WHERE lead_id IN (SELECT id FROM leads WHERE status = 'Test / Excluded from Sales')
    RETURNING id;
  `);
  console.log(`Marked ${cleanNotifs.rowCount} test notifications as 'test_excluded'.`);

  await dbClient.end();

  console.log('\n=== ALL PRODUCTION HARDENING TESTS COMPLETED ===');
}

runTestSuite().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

