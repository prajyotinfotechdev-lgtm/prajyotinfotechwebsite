// api/cron/retry-lead-notifications.js
// Dedicated Vercel Cron Endpoint — Automated Notification Retry & Maintenance Worker
// Authenticates strictly via CRON_SECRET, implements atomic job claiming via FOR UPDATE SKIP LOCKED,
// prevents duplicate dispatch, handles dead letters, and cleans up expired rate limits.

import pkg from 'pg';
import crypto from 'crypto';
import { executeNotificationRetryWorker } from '../../src/lib/retryWorker.js';

const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

export { executeNotificationRetryWorker };

export default async function handler(req, res) {
  // Enforce GET or POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET,POST');
    return res.status(405).json({ error: 'Method Not Allowed. Use GET or POST.' });
  }

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // 1. Secret Management & Authentication Check
  const cronSecret = process.env.CRON_SECRET;
  const adminApiKey = process.env.ADMIN_API_KEY;

  const authHeader = req.headers['authorization'] || '';
  let providedSecret = '';
  if (authHeader.startsWith('Bearer ')) {
    providedSecret = authHeader.slice(7).trim();
  } else if (req.headers['x-cron-secret']) {
    providedSecret = String(req.headers['x-cron-secret']).trim();
  }

  // Reject missing authentication
  if (!providedSecret) {
    return res.status(401).json({
      error: 'Unauthorized: Authentication required. Provide CRON_SECRET via Bearer token.'
    });
  }

  // Fail closed if CRON_SECRET is not configured in environment
  if (!cronSecret) {
    console.error('[CRITICAL CONFIG] CRON_SECRET is not configured in environment. Failing closed.');
    return res.status(503).json({
      error: 'Service Unavailable: Cron authentication secret is not configured in production environment.'
    });
  }

  // Reject reuse of ADMIN_API_KEY for cron operations
  if (adminApiKey && providedSecret === adminApiKey) {
    console.warn('[SECURITY] Attempt to use ADMIN_API_KEY for cron endpoint was rejected.');
    return res.status(403).json({
      error: 'Forbidden: ADMIN_API_KEY cannot be reused for cron operations.'
    });
  }

  // Timing-safe comparison of CRON_SECRET
  const expectedBuf = Buffer.from(cronSecret);
  const providedBuf = Buffer.from(providedSecret);
  const isMatch =
    expectedBuf.length === providedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, providedBuf);

  if (!isMatch) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid CRON_SECRET.'
    });
  }

  const workerId = `worker_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  const dbClient = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    await dbClient.connect();
    const results = await executeNotificationRetryWorker(dbClient, workerId);
    await dbClient.end();

    return res.status(200).json({
      status: 'success',
      timestamp: new Date().toISOString(),
      ...results
    });

  } catch (error) {
    if (dbClient) {
      try { await dbClient.query('ROLLBACK'); } catch (_) {}
      await dbClient.end().catch(() => {});
    }
    console.error('[CRON WORKER ERROR]:', error.message);
    return res.status(500).json({
      error: 'Cron worker execution encountered an internal error. Jobs remain recoverable.'
    });
  }
}
