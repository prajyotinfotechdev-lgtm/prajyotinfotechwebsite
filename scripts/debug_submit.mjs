import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function debugSubmit() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', m => console.log('BROWSER LOG:', m.type(), m.text()));
  page.on('pageerror', e => console.error('BROWSER PAGE ERROR:', e.message));

  await page.goto('https://www.prajyotinfotech.in/free-business-tech-audit', { waitUntil: 'networkidle2' });

  await page.type('input[name="fullName"]', '[TEST-LEAD] Debug Test');
  await page.type('input[name="businessName"]', '[TEST] Debug Corp');
  const uniquePhone = '91' + Math.floor(1000000000 + Math.random() * 9000000000);
  const uniqueEmail = 'qa-debug-' + Date.now() + '@prajyotinfotech.in';
  await page.type('input[name="whatsappNumber"]', uniquePhone);
  await page.type('input[name="email"]', uniqueEmail);
  await page.type('textarea[name="currentChallenge"]', 'Testing frontend form submission and logging console errors.');

  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();
  await new Promise(r => setTimeout(r, 4000));

  const currentUrl = page.url();
  console.log('Current URL after submit:', currentUrl);
  const alerts = await page.$$eval('[role="alert"], .bg-rose-50', els => els.map(e => e.innerText));
  console.log('Any alerts on page:', alerts);

  await browser.close();
}
debugSubmit();

