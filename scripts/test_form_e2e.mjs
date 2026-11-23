import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLeadForm() {
  console.log('=== LAUNCHING PUPPETEER FOR CONTROLLED TEST SUBMISSION ===');
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
  console.log('\n--- Testing Form Validation (Submitting empty form) ---');
  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();
  await new Promise(r => setTimeout(r, 600));

  const validationErrors = await page.$$eval('[role="alert"], [aria-invalid="true"]', els => els.map(e => e.innerText || e.getAttribute('name')));
  console.log('Validation errors caught on empty submission:', validationErrors.length > 0 ? 'PASS (Fields flagged)' : 'FAIL');

  // 3. Fill in controlled test lead data
  console.log('\n--- Filling Controlled Test Lead Data ---');
  await page.type('input[name="fullName"]', '[TEST-LEAD] QA Verification');
  await page.type('input[name="businessName"]', '[TEST-DO-NOT-PROCESS] QA Enterprise Test');
  await page.type('input[name="whatsappNumber"]', '919999999999');
  await page.type('input[name="email"]', 'qa-audit-test@prajyotinfotech.in');
  await page.type('textarea[name="currentChallenge"]', '[AUTOMATED TEST VERIFICATION] Testing lead qualification form workflow, duplicate protection, and thank-you redirect.');

  // 4. Submit form
  console.log('Submitting controlled test lead...');
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
  console.log('WhatsApp link URL preview:', waLink.slice(0, 110) + '...');

  // 6. Verify Analytics Conversion Event
  console.log('\n--- Analytics Verification ---');
  const leadEvent = analyticsEvents.find(e => e.eventName === 'generate_lead');
  console.log('Analytics generate_lead event fired:', leadEvent ? 'PASS' : 'FAIL');
  if (leadEvent) {
    console.log('Event details:', JSON.stringify(leadEvent, null, 2));
  }

  // 7. Verify Local Storage & Session Storage Backups
  const storageData = await page.evaluate(() => {
    return {
      sessionSubmission: window.sessionStorage.getItem('latest_lead_submission'),
      localLeadsBackup: window.localStorage.getItem('local_leads_backup'),
      submitCount: window.localStorage.getItem('lead_submit_count'),
      lastSubmit: window.localStorage.getItem('last_lead_submit')
    };
  });
  console.log('\n--- Lead Storage & Backup Verification ---');
  console.log('SessionStorage submission captured:', Boolean(storageData.sessionSubmission) ? 'PASS' : 'FAIL');
  console.log('LocalStorage zero-loss backup captured:', Boolean(storageData.localLeadsBackup) ? 'PASS' : 'FAIL');
  console.log('Rate limiter submit count recorded:', storageData.submitCount);

  // 8. Test Duplicate / Rapid-fire submission protection
  console.log('\n--- Duplicate Submission Protection Verification ---');
  await page.goto('https://www.prajyotinfotech.in/free-business-tech-audit', { waitUntil: 'networkidle2' });
  // Manually simulate rate limit boundary (5 submissions)
  await page.evaluate(() => {
    window.localStorage.setItem('lead_submit_count', '5');
    window.localStorage.setItem('last_lead_submit', Date.now().toString());
  });

  // Attempt submission again
  await page.type('input[name="fullName"]', '[TEST-LEAD] Rapid Fire Test');
  await page.type('input[name="businessName"]', '[TEST-DO-NOT-PROCESS] Rapid Fire');
  await page.type('input[name="whatsappNumber"]', '919999999999');
  await page.type('input[name="email"]', 'rapid-test@prajyotinfotech.in');
  await page.type('textarea[name="currentChallenge"]', 'Testing duplicate rapid-fire submission prevention.');
  const submitBtn2 = await page.$('button[type="submit"]');
  await submitBtn2.click();
  await new Promise(r => setTimeout(r, 1200));

  const duplicateBlocked = await page.evaluate(() => {
    const alerts = [...document.querySelectorAll('div, [role="alert"]')];
    const match = alerts.find(el => el.innerText && el.innerText.includes('submitted several requests'));
    return match ? match.innerText : '';
  });
  console.log('Duplicate rate-limit protection active:', duplicateBlocked.includes('submitted several requests') ? 'PASS' : 'FAIL');
  console.log('Warning message shown to user:', duplicateBlocked);

  await browser.close();
  console.log('\n=== ALL LEAD GENERATION WORKFLOW TESTS COMPLETED ===');
}

testLeadForm().catch(err => {
  console.error('Puppeteer test error:', err);
  process.exit(1);
});
