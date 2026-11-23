// api/admin/lead-ops.js
// Vercel Serverless Function — Protected Operations & Monitoring Endpoint
// Requires Role-Based Administrator Authentication (Strictly from ADMIN_API_KEY environment variable),
// Fails Closed if absent, Emits Audit Logs, Protects Operational Diagnostics, and Delegates to Retry Worker

import pkg from 'pg';
import crypto from 'crypto';
import { executeNotificationRetryWorker } from '../../src/lib/retryWorker.js';

const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

// Strict Environment Variable Secret Management — Zero Hardcoded Fallbacks
function getAdminApiKey() {
  return process.env.ADMIN_API_KEY;
}

function getCronSecret() {
  return process.env.CRON_SECRET;
}

function getRateLimitHmacSecret() {
  return process.env.RATE_LIMIT_HMAC_SECRET;
}

/**
 * Keyed Pseudo-Anonymous Hash for IP Addresses
 *
 * Computes an HMAC-SHA256 digest of the client IP address using the dedicated
 * RATE_LIMIT_HMAC_SECRET environment variable, truncated to 32 hexadecimal characters (128 bits).
 *
 * Cryptographic rationale:
 * The 32-character hexadecimal identifier represents a 128-bit truncated HMAC output
 * (16 bytes = 128 bits = 32 hex chars). This provides strong collision resistance
 * (birthday bound of 2^64 requests), completely prevents rainbow-table and dictionary
 * inversion of client IP addresses, ensures zero storage of raw PII / IP data in the
 * database, and minimizes the index and storage footprint in audit logs.
 */
function hashIp(ip) {
  const secret = getRateLimitHmacSecret();
  if (!secret) {
    return 'unconfigured_hmac';
  }
  const cleanIp = String(ip || 'unknown').trim();
  return crypto.createHmac('sha256', secret).update(cleanIp).digest('hex').slice(0, 32);
}

// Audit logger for administrator access
async function logAdminAccess(dbClient, { action, adminIdentifier, role, status, clientIp, details }) {
  try {
    const auditId = `aud_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    await dbClient.query(
      `INSERT INTO admin_audit_logs (
        id, action, admin_identifier, role, status, client_ip_hash, details, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());`,
      [auditId, action, adminIdentifier, role, status, hashIp(clientIp), details || null]
    );
  } catch (err) {
    console.error('[ADMIN AUDIT LOG ERROR]:', err.message);
  }
}

export default async function handler(req, res) {
  // 1. Mandatory No-Store Security Headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Allow preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Admin-Key');
    return res.status(200).end();
  }

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown';

  // 2. Authentication & Server-Side Role-Based Authorization (RBAC)
  const authHeader = req.headers['authorization'] || '';
  const xAdminKey = req.headers['x-admin-key'] || '';
  let providedToken = '';

  if (authHeader.startsWith('Bearer ')) {
    providedToken = authHeader.slice(7).trim();
  } else if (xAdminKey) {
    providedToken = String(xAdminKey).trim();
  }

  const dbClient = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  // Check 1: Missing Token -> HTTP 401 Unauthorized
  if (!providedToken) {
    try {
      await dbClient.connect();
      await logAdminAccess(dbClient, {
        action: 'VIEW_MONITORING',
        adminIdentifier: 'anonymous',
        role: 'unauthenticated',
        status: 'DENIED_MISSING_TOKEN',
        clientIp,
        details: 'Attempted access without credentials'
      });
      await dbClient.end();
    } catch (_) {}

    return res.status(401).json({
      error: 'Unauthorized: Administrator authentication required. Provide a valid Bearer token.'
    });
  }

  const adminApiKey = getAdminApiKey();
  const cronSecret = getCronSecret();

  // Check 2: Fail Closed if ADMIN_API_KEY is not configured in Vercel environment
  if (!adminApiKey) {
    try {
      await dbClient.connect();
      await logAdminAccess(dbClient, {
        action: 'VIEW_MONITORING',
        adminIdentifier: providedToken.slice(0, 8) + '***',
        role: 'unauthenticated',
        status: 'DENIED_NOT_CONFIGURED',
        clientIp,
        details: 'ADMIN_API_KEY is not configured in environment. Failing closed.'
      });
      await dbClient.end();
    } catch (_) {}

    return res.status(403).json({
      error: 'Forbidden: Administrator authentication is not configured in production environment. Access denied.'
    });
  }

  // Check 3: Reject reuse of CRON_SECRET for admin access
  if (cronSecret && providedToken === cronSecret) {
    return res.status(403).json({
      error: 'Forbidden: CRON_SECRET cannot be used for administrator operations.'
    });
  }

  // Check 4: Validate providedToken against ADMIN_API_KEY using constant-time comparison
  const expectedBuffer = Buffer.from(adminApiKey);
  const providedBuffer = Buffer.from(providedToken);
  const isMatch =
    expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer);

  if (!isMatch) {
    try {
      await dbClient.connect();
      await logAdminAccess(dbClient, {
        action: 'VIEW_MONITORING',
        adminIdentifier: providedToken.slice(0, 8) + '***',
        role: 'guest',
        status: 'DENIED_INVALID_TOKEN',
        clientIp,
        details: 'Invalid admin token provided'
      });
      await dbClient.end();
    } catch (_) {}

    return res.status(403).json({
      error: 'Forbidden: Invalid administrator credentials or insufficient privileges.'
    });
  }

  // 3. Authorized Administrator Execution (Role: admin)
  try {
    await dbClient.connect();

    // Log authorized access
    await logAdminAccess(dbClient, {
      action: req.query.action === 'process_retries' || req.method === 'POST' ? 'PROCESS_RETRIES' : 'VIEW_MONITORING',
      adminIdentifier: 'super_admin',
      role: 'admin',
      status: 'AUTHORIZED',
      clientIp
    });

    // Action: Trigger durable notification retry worker manually
    if (req.query.action === 'process_retries' || req.method === 'POST') {
      const retryWorkerId = `manual_admin_${Date.now()}`;
      const retryResults = await executeNotificationRetryWorker(dbClient, retryWorkerId);
      await dbClient.end();
      return res.status(200).json({
        status: 'success',
        timestamp: new Date().toISOString(),
        action: 'notification_retries_processed',
        results: retryResults
      });
    }

    // Action: Purge legacy rate limits during secret rotation
    if (req.query.action === 'purge_rate_limits') {
      const purgeResult = await dbClient.query('DELETE FROM api_rate_limits;');
      await dbClient.end();
      return res.status(200).json({
        status: 'success',
        timestamp: new Date().toISOString(),
        action: 'rate_limits_purged',
        purgedRows: purgeResult.rowCount || 0
      });
    }

    // Default Action: Minimum necessary operational diagnostics
    // 1. Aggregated notification counts
    const notifStats = await dbClient.query(`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'delivered') AS delivered_count,
        COUNT(*) FILTER (WHERE status = 'pending_retry') AS pending_retry_count,
        COUNT(*) FILTER (WHERE status = 'failed' OR dead_letter = TRUE) AS dead_letter_count
      FROM lead_notifications;
    `);

    // 1b. Stale-job monitoring: detect notifications that remain due but unprocessed (>15 min overdue)
    const staleJobs = await dbClient.query(`
      SELECT COUNT(*) AS stale_due_count
      FROM lead_notifications
      WHERE status = 'pending_retry'
        AND next_retry_at < (NOW() - INTERVAL '15 minutes');
    `);
    const staleDueCount = parseInt(staleJobs.rows[0]?.stale_due_count || '0', 10);

    // 2. Active leads count in last 24 hours (No customer details exposed)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const leadsStats = await dbClient.query(`
      SELECT COUNT(*) AS total_24h
      FROM leads 
      WHERE created_at > $1;
    `, [twentyFourHoursAgo]);

    // 3. Sanitized error summary (grouped by error_type, without stack traces or customer PII)
    const errorStats = await dbClient.query(`
      SELECT error_type, COUNT(*) AS count, MAX(created_at) AS last_seen
      FROM api_error_logs
      WHERE created_at > (NOW() - INTERVAL '24 hours')
      GROUP BY error_type
      ORDER BY count DESC
      LIMIT 10;
    `);

    // 4. Rate-limit active windows
    const rateLimitsCount = await dbClient.query(`
      SELECT COUNT(*) AS active_windows
      FROM api_rate_limits
      WHERE window_start_at > (NOW() - INTERVAL '10 minutes');
    `);

    await dbClient.end();

    const row = notifStats.rows[0] || {};
    return res.status(200).json({
      status: staleDueCount > 0 ? 'degraded' : 'healthy',
      role: 'admin',
      timestamp: new Date().toISOString(),
      operationalMetrics: {
        leadsReceivedLast24h: parseInt(leadsStats.rows[0]?.total_24h || '0', 10),
        notificationsDelivered: parseInt(row.delivered_count || '0', 10),
        notificationsPendingRetry: parseInt(row.pending_retry_count || '0', 10),
        notificationsDeadLetter: parseInt(row.dead_letter_count || '0', 10),
        staleDueNotifications: staleDueCount,
        activeRateLimitWindows: parseInt(rateLimitsCount.rows[0]?.active_windows || '0', 10)
      },
      alerts: staleDueCount > 0 ? [
        {
          severity: 'warning',
          code: 'STALE_UNPROCESSED_NOTIFICATIONS',
          message: `${staleDueCount} notification(s) have been due for more than 15 minutes without being processed by retry workers.`
        }
      ] : [],
      errorSummaryLast24h: errorStats.rows.map(r => ({
        errorType: r.error_type,
        occurrences: parseInt(r.count, 10),
        lastSeen: r.last_seen
      }))
    });

  } catch (error) {
    if (dbClient) await dbClient.end().catch(() => {});
    console.error('[ADMIN OPS ERROR]:', error.message);
    return res.status(500).json({
      error: 'An operational monitoring error occurred. Details recorded internally.'
    });
  }
}
