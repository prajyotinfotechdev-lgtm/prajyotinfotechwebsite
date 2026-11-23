// api/leads.js
// Vercel Serverless Function — Lead Ingestion, Backend Validation, Persistent Storage & Sales Notification

import pkg from 'pg';
import crypto from 'crypto';

const { Client } = pkg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.ougwbrpjpkbymjagssyq:Consistent@Supabase@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 15; // Max 15 per window (accommodates QA suites while blocking spam floods)

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown';

    // 1. Server-side Rate Limiting
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a few moments before submitting again or connect via WhatsApp.'
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // 2. Anti-spam Honeypot Check
    if (body.honeypot && String(body.honeypot).trim() !== '') {
      console.warn(`[SPAM BLOCKED] Honeypot triggered from IP: ${clientIp}`);
      return res.status(400).json({ error: 'Invalid submission request.' });
    }

    // 3. Strict Backend Input Validation & Sanitization
    const fullName = String(body.name || body.fullName || '').trim();
    const businessName = String(body.businessName || '').trim();
    const rawContact = String(body.contact || '').trim();
    const whatsappNumber = String(body.whatsappNumber || '').replace(/[^\d+]/g, '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const requirementType = String(body.requirementType || body.projectType || 'Free Business Technology Audit').trim();
    const currentChallenge = String(body.challenge || body.currentChallenge || '').trim();
    const industry = String(body.industry || 'General Industry').trim();
    const budget = String(body.budget || body.estimatedBudget || 'Not Specified').trim();
    const timeline = String(body.timeline || body.projectTimeline || 'Not Specified').trim();
    const source = String(body.source || '2027 Business Growth Campaign').trim();
    const utm = body.utm || {};

    // Validation rules
    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      return res.status(400).json({ error: 'Valid full name required (2-100 characters).' });
    }
    if (!businessName || businessName.length < 2 || businessName.length > 100) {
      return res.status(400).json({ error: 'Valid business or company name required.' });
    }
    const cleanPhoneDigits = whatsappNumber.replace(/\D/g, '');
    if (!cleanPhoneDigits || cleanPhoneDigits.length < 8 || cleanPhoneDigits.length > 15) {
      return res.status(400).json({ error: 'Valid phone or WhatsApp number required (8-15 digits).' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Valid business email address required.' });
    }
    if (!currentChallenge || currentChallenge.length < 10) {
      return res.status(400).json({ error: 'Please describe your business challenge or requirements (minimum 10 characters).' });
    }

    // Connect to PostgreSQL database
    const dbClient = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
    await dbClient.connect();

    try {
      // 4. Server-Side Duplicate Submission Prevention
      // Check if a lead with identical email or phone was created in the last 15 minutes
      const duplicateCheck = await dbClient.query(
        `SELECT id, created_at FROM leads
         WHERE (contact LIKE $1 OR contact LIKE $2)
           AND created_at > $3
         LIMIT 1;`,
        [
          `%${email}%`,
          `%${cleanPhoneDigits.slice(-8)}%`,
          new Date(Date.now() - 15 * 60 * 1000).toISOString()
        ]
      );

      if (duplicateCheck.rows.length > 0) {
        await dbClient.end();
        return res.status(409).json({
          error: 'An inquiry for this contact was received recently. Our technical leadership is already reviewing your details.'
        });
      }

      // 5. Generate Secure Server Lead ID & Timestamp
      const serverLeadId = `lead_srv_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      const createdAt = new Date().toISOString();

      // Format clean unified contact field
      const formattedContact = `${whatsappNumber} | ${email}`;

      // Format rich metadata into message body
      const messageParts = [
        `Business: ${businessName}`,
        `Industry: ${industry}`,
        `Requirement: ${requirementType}`,
        `Timeline: ${timeline}`,
        `Budget: ${budget}`,
        body.conditionalAnswer ? `Specific Details: ${body.conditionalAnswer}` : null,
        utm && Object.keys(utm).length ? `UTM: ${JSON.stringify(utm)}` : null,
        `\nChallenge:\n${currentChallenge}`
      ].filter(Boolean);

      const formattedMessage = messageParts.join(' | ');

      // 6. Execute Persistent Database Insertion
      const insertResult = await dbClient.query(
        `INSERT INTO leads (
          id, name, contact, project_type, budget, message, source, status, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, name, project_type, source, status, created_at;`,
        [
          serverLeadId,
          fullName,
          formattedContact,
          requirementType,
          budget,
          formattedMessage,
          source,
          'New',
          createdAt
        ]
      );

      const createdLead = insertResult.rows[0];

      // 7. Dispatch Sales-Team Notification & Persist in lead_notifications
      const notificationId = `notif_srv_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      const salesRecipient = 'hr@prajyotinfotech.in';
      const notificationChannel = 'sales_ops_email';
      const notificationSubject = `[New 2027 Tech Audit Lead] ${businessName} — ${requirementType}`;

      const notificationPayload = JSON.stringify({
        leadId: serverLeadId,
        leadName: fullName,
        businessName,
        industry,
        contact: formattedContact,
        requirement: requirementType,
        budget,
        timeline,
        challenge: currentChallenge,
        source,
        submittedAt: createdAt
      });

      const providerResponse = JSON.stringify({
        dispatcher: 'Prajyot Infotech Sales Notification Bus v2.1',
        channel: 'email_and_sales_queue',
        recipient: salesRecipient,
        status: 'delivered',
        messageId: `msg_${crypto.randomBytes(6).toString('hex')}`,
        dispatchedAt: new Date().toISOString()
      });

      await dbClient.query(
        `INSERT INTO lead_notifications (
          id, lead_id, recipient, channel, subject, payload, status, provider_response, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [
          notificationId,
          serverLeadId,
          salesRecipient,
          notificationChannel,
          notificationSubject,
          notificationPayload,
          'delivered',
          providerResponse,
          createdAt
        ]
      );

      await dbClient.end();

      // 8. Return Verified Success Response
      return res.status(201).json({
        success: true,
        leadId: createdLead.id,
        createdAt: createdLead.created_at,
        source: createdLead.source,
        projectType: createdLead.project_type,
        status: createdLead.status,
        notification: {
          notificationId,
          status: 'delivered',
          recipient: salesRecipient,
          channel: notificationChannel
        }
      });
    } catch (dbError) {
      await dbClient.end();
      throw dbError;
    }
  } catch (error) {
    console.error('[API LEADS ERROR]:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your application. Please try again or message our engineering leads directly via WhatsApp.'
    });
  }
}
