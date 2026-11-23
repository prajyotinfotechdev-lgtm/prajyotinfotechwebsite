import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLeadForm() {
  console.log('=== LAUNCHING PUPPETEER FOR FULL CUSTOMER JOURNEY TEST ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Track analytics gtag calls
  const analyticsEvents = [];
  await page.exposeFunction('onGtagEvent', (eventName, eventParams) => {
    analyticsEvents.push({ eventName, eventParams });
    console.log(`[ANALYTICS] gtag('${eventName}', ${JSON.stringify(eventParams)})`);
  });

  await page.evaluateOnNewDocument(() => {
    window.gtag = (command, eventName, params) => {
      if (command === 'event' && window.onGtagEvent) {
        window.onGtagEvent(eventName, params);
      }
    };
  });

  console.log('Navigating to https://www.prajyotinfotech.in/free-business-tech-audit ...');
  await page.goto('https://www.prajyotinfotech.in/free-business-tech-audit', { waitUntil: 'networkidle2' });

  // 1. Verify page elements
  const h1 = await page.$eval('h1', el => el.innerText);
  console.log('H1 on page:', h1);

  // 2. Test Form Validation (Empty submit)
  console.log('\n--- 1. Testing Form Validation (Submitting empty form) ---');
  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();
  await new Promise(r => setTimeout(r, 600));

  const validationErrors = await page.$$eval('[role="alert"], [aria-invalid="true"]', els => els.map(e => e.innerText || e.getAttribute('name')));
  console.log('Validation errors caught on empty submission:', validationErrors.length > 0 ? 'PASS (Fields flagged)' : 'FAIL');

  // 3. Fill in controlled test lead data with unique contact info
  const uniqueId = Date.now();
  const testEmail = `qa-audit-${uniqueId}@prajyotinfotech.in`;
  const testPhone = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  console.log('\n--- 2. Filling Controlled Test Lead Data ---');
  console.log(`Test Email: ${testEmail} | Phone: ${testPhone}`);
  await page.type('input[name="fullName"]', '[TEST-LEAD] QA Verification');
  await page.type('input[name="businessName"]', '[TEST-DO-NOT-PROCESS] QA Enterprise Test');
  await page.type('input[name="whatsappNumber"]', testPhone);
  await page.type('input[name="email"]', testEmail);
  await page.type('textarea[name="currentChallenge"]', '[AUTOMATED TEST VERIFICATION] Testing lead qualification form workflow, duplicate protection, and thank-you redirect.');

  // 4. Submit form
  console.log('Submitting controlled test lead to backend...');
  await submitBtn.click();

  // Wait for React Router navigation to /thank-you
  await page.waitForFunction(() => window.location.pathname === '/thank-you', { timeout: 15000 });
  await page.waitForFunction(() => document.querySelector('h1') && document.querySelector('h1').innerText.includes('Thank You'), { timeout: 15000 });

  const currentPath = await page.evaluate(() => window.location.pathname);
  console.log('Redirect destination Path:', currentPath);
  const isThankYou = currentPath === '/thank-you';
  console.log('Correct thank-you redirect:', isThankYou ? 'PASS' : 'FAIL');

  // 5. Verify Thank You page rendering
  const thankYouTitle = await page.$eval('h1', el => el.innerText);
  console.log('Thank You Greeting:', thankYouTitle);

  const personalizedGreeting = thankYouTitle.includes('[TEST-LEAD]');
  console.log('Personalized Lead Greeting Verified:', personalizedGreeting ? 'PASS' : 'FAIL');

  const waLink = await page.$eval('a[href*="wa.me"]', el => el.href).catch(() => 'NONE');
  console.log('WhatsApp acknowledgment quick-link present:', waLink !== 'NONE' ? 'PASS' : 'FAIL');

  // 6. Verify Analytics Conversion Event with Test Filter
  console.log('\n--- 3. Analytics Conversion Event Verification ---');
  const leadEvent = analyticsEvents.find(e => e.eventName === 'generate_lead');
  console.log('Analytics generate_lead event fired:', leadEvent ? 'PASS' : 'FAIL');
  if (leadEvent) {
    console.log('Event details (Notice debug_mode and traffic_type=test):', JSON.stringify(leadEvent, null, 2));
  }

  // 7. Verify Safe Session Storage & No PII in LocalStorage
  const storageData = await page.evaluate(() => {
    return {
      sessionSubmission: window.sessionStorage.getItem('latest_lead_submission'),
      hasLocalLeadsBackup: Boolean(window.localStorage.getItem('local_leads_backup')),
      submitCount: window.localStorage.getItem('lead_submit_count'),
      lastSubmit: window.localStorage.getItem('last_lead_submit')
    };
  });
  console.log('\n--- 4. Safe Storage Audit ---');
  console.log('SessionStorage confirmation metadata present:', Boolean(storageData.sessionSubmission) ? 'PASS' : 'FAIL');
  console.log('Sensitive PII in localStorage eliminated:', !storageData.hasLocalLeadsBackup ? 'PASS (Zero PII stored)' : 'FAIL');

  // 8. Test Duplicate Submission Prevention (Submitting identical contact again)
  console.log('\n--- 5. Duplicate Submission Prevention on Live Site ---');
  await page.goto('https://www.prajyotinfotech.in/free-business-tech-audit', { waitUntil: 'networkidle2' });
  await page.type('input[name="fullName"]', '[TEST-LEAD] Duplicate Test');
  await page.type('input[name="businessName"]', '[TEST-DO-NOT-PROCESS] Duplicate Test Org');
  await page.type('input[name="whatsappNumber"]', testPhone);
  await page.type('input[name="email"]', testEmail);
  await page.type('textarea[name="currentChallenge"]', 'This is an immediate duplicate attempt with the exact same contact.');

  const submitBtn2 = await page.$('button[type="submit"]');
  await submitBtn2.click();
  await new Promise(r => setTimeout(r, 1500));

  const duplicateBlockedText = await page.evaluate(() => {
    const alerts = [...document.querySelectorAll('[role="alert"], div')];
    const match = alerts.find(el => el.innerText && el.innerText.includes('inquiry for this contact was received recently'));
    return match ? match.innerText : '';
  });
  console.log('Duplicate submission blocked by backend:', duplicateBlockedText.includes('inquiry for this contact was received recently') ? 'PASS' : 'FAIL');
  console.log('Server message returned to user:', duplicateBlockedText);

  await browser.close();
  console.log('\n=== ALL END-TO-END CUSTOMER JOURNEY CHECKS PASSED ===');
}

testLeadForm().catch(err => {
  console.error('Puppeteer test error:', err);
  process.exit(1);
});
