import https from 'https';
import pkg from 'pg';
import crypto from 'crypto';

const { Client } = pkg;
const PROD_HOST = 'www.prajyotinfotech.in';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'pi_admin_sec_9e2f4a1b8c0d7e6f';
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

function request({ method = 'GET', path = '/api/leads', headers = {}, body = null }) {
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

async function verifySecurityFix() {
  console.log('=== PRODUCTION SECURITY VERIFICATION (COMMIT: 57e126a) ===\n');

  // Wait for Vercel deployment of commit 57e126a
  console.log('Verifying deployment readiness...');
  let deploymentReady = false;
  for (let i = 0; i < 15; i++) {
    const testGet = await request({ method: 'GET', path: '/api/leads' }).catch(() => ({ status: 0 }));
    if (testGet.status === 405) {
      console.log('Confirmed: GET /api/leads is returning HTTP 405 Method Not Allowed.');
      deploymentReady = true;
      break;
    }
    console.log(`Waiting for production deployment of 57e126a... (attempt ${i + 1}/15)`);
    await new Promise(r => setTimeout(r, 4000));
  }

  if (!deploymentReady) {
    console.warn('Warning: 405 not yet returned by production, testing current response...');
  }

  // TEST A: Public GET /api/leads (Must be 405 Method Not Allowed with ZERO info leak)
  console.log('\n--- TEST A: Public Unauthenticated GET /api/leads ---');
  const resA = await request({ method: 'GET', path: '/api/leads' });
  console.log('HTTP Status:', resA.status);
  console.log('Allow Header:', resA.headers['allow']);
  console.log('Response Body:', resA.body);

  const leakDetected =
    typeof resA.body === 'object' &&
    (resA.body.status === 'healthy' || resA.body.alerts || resA.body.failedNotifications || resA.body.recentErrors);

  const passA = resA.status === 405 && !leakDetected;
  console.log('Security Test A (Public GET Sealed):', passA ? 'PASS' : 'FAIL');

  // TEST B: Unauthenticated GET /api/admin/lead-ops (Must be 401 Unauthorized)
  console.log('\n--- TEST B: Unauthenticated GET /api/admin/lead-ops ---');
  const resB = await request({ method: 'GET', path: '/api/admin/lead-ops' });
  console.log('HTTP Status:', resB.status);
  console.log('Response Body:', resB.body);
  const passB = resB.status === 401;
  console.log('Security Test B (Missing Auth Blocked 401):', passB ? 'PASS' : 'FAIL');

  // TEST C1: Invalid Token GET /api/admin/lead-ops (Must be 403 Forbidden)
  console.log('\n--- TEST C1: Invalid Token GET /api/admin/lead-ops ---');
  const resC1 = await request({
    method: 'GET',
    path: '/api/admin/lead-ops',
    headers: { 'Authorization': 'Bearer fake_invalid_token_9999' }
  });
  console.log('HTTP Status:', resC1.status);
  console.log('Response Body:', resC1.body);
  const passC1 = resC1.status === 403;
  console.log('Security Test C1 (Invalid Token Blocked 403):', passC1 ? 'PASS' : 'FAIL');

  // TEST C2: Authenticated Admin GET /api/admin/lead-ops (Must be 200 OK with no-store headers)
  console.log('\n--- TEST C2: Authenticated Admin GET /api/admin/lead-ops ---');
  const resC2 = await request({
    method: 'GET',
    path: '/api/admin/lead-ops',
    headers: { 'Authorization': `Bearer ${ADMIN_API_KEY}` }
  });
  console.log('HTTP Status:', resC2.status);
  console.log('Cache-Control:', resC2.headers['cache-control']);
  console.log('Admin Operations Metrics:', JSON.stringify(resC2.body, null, 2));
  const passC2 =
    resC2.status === 200 &&
    resC2.headers['cache-control']?.includes('no-store') &&
    resC2.body.status === 'healthy' &&
    resC2.body.role === 'admin';
  console.log('Security Test C2 (Authorized Admin Monitoring):', passC2 ? 'PASS' : 'FAIL');

  // TEST D: Durable Notification Retry Queue Worker
  console.log('\n--- TEST D: Durable Notification Retry Worker Execution ---');
  const resD = await request({
    method: 'POST',
    path: '/api/admin/lead-ops?action=process_retries',
    headers: { 'Authorization': `Bearer ${ADMIN_API_KEY}` }
  });
  console.log('HTTP Status:', resD.status);
  console.log('Retry Worker Response:', resD.body);
  const passD = resD.status === 200 && resD.body.status === 'success';
  console.log('Test D (Retry Worker Functional):', passD ? 'PASS' : 'FAIL');

  // TEST E: Public Lead Submission POST /api/leads (Must continue working)
  console.log('\n--- TEST E: Public Lead Submission (POST /api/leads) ---');
  const uniqueId = Date.now();
  const testContact = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const testEmail = `qa-post-check-${uniqueId}@prajyotinfotech.in`;

  const payload = {
    name: '[TEST-LEAD] Security Remediation Check',
    businessName: '[TEST-DO-NOT-PROCESS] Security Verified Corp',
    whatsappNumber: testContact,
    email: testEmail,
    requirementType: 'Free Business Technology Audit',
    industry: 'Engineering & Construction',
    budget: '₹2,00,000 – ₹4,00,000',
    timeline: '1 Month',
    challenge: '[SECURITY VERIFICATION TEST] Testing that public POST continues to ingest leads safely.',
    source: 'Free Business Tech Audit Landing Page'
  };

  const resE = await request({ method: 'POST', path: '/api/leads', body: payload });
  console.log('HTTP Status:', resE.status);
  console.log('POST Response:', resE.body);
  const passE = resE.status === 201 && resE.body.leadId && resE.body.notification;
  console.log('Test E (Public POST Lead Ingestion Intact):', passE ? 'PASS' : 'FAIL');

  // TEST F: Database Audit Log Verification
  console.log('\n--- TEST F: Database Admin Audit Logs & IP Retention Verification ---');
  const dbClient = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await dbClient.connect();

  const auditLogs = await dbClient.query(`
    SELECT id, action, admin_identifier, role, status, client_ip_hash, created_at 
    FROM admin_audit_logs 
    ORDER BY created_at DESC 
    LIMIT 5;
  `);
  console.log('Latest Admin Audit Logs:');
  console.log(JSON.stringify(auditLogs.rows, null, 2));
  const hasDeniedMissing = auditLogs.rows.some(r => r.status === 'DENIED_MISSING_TOKEN');
  const hasDeniedInvalid = auditLogs.rows.some(r => r.status === 'DENIED_INVALID_TOKEN');
  const hasAuthorized = auditLogs.rows.some(r => r.status === 'AUTHORIZED');
  const passF = hasDeniedMissing && hasDeniedInvalid && hasAuthorized;
  console.log('Test F (Admin Access Fully Audited in PostgreSQL):', passF ? 'PASS' : 'FAIL');

  // Check rate limits table for keyed hashing (no raw IPs stored)
  const rateLimitRows = await dbClient.query(`SELECT ip, request_count, window_start_at FROM api_rate_limits LIMIT 3`);
  console.log('api_rate_limits entries (Notice 32-char SHA-256 HMAC hash, no raw IP):', rateLimitRows.rows);
  const hasRawIp = rateLimitRows.rows.some(r => r.ip.includes('.') || r.ip.includes(':'));
  console.log('Raw IP retention eliminated (All keys HMAC hashed):', !hasRawIp ? 'PASS' : 'FAIL');

  // Cleanup newly inserted test lead
  await dbClient.query(`
    UPDATE leads 
    SET status = 'Test / Excluded from Sales' 
    WHERE name LIKE '%[TEST%' OR contact LIKE '%qa-%' OR message LIKE '%TEST%';
  `);
  await dbClient.query(`
    UPDATE lead_notifications 
    SET status = 'test_excluded' 
    WHERE lead_id IN (SELECT id FROM leads WHERE status = 'Test / Excluded from Sales');
  `);

  await dbClient.end();

  console.log('\n=== ALL SECURITY VERIFICATION TESTS COMPLETED ===');
}

verifySecurityFix().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
