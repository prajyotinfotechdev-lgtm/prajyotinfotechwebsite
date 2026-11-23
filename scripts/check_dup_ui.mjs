import puppeteer from 'puppeteer-core';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testDup() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', m => console.log('BROWSER:', m.type(), m.text()));
  await page.goto('https://www.prajyotinfotech.in/free-business-tech-audit', { waitUntil: 'networkidle2' });

  await page.type('input[name="fullName"]', '[TEST-LEAD] Duplicate Test');
  await page.type('input[name="businessName"]', '[TEST] Duplicate Corp');
  await page.type('input[name="whatsappNumber"]', '918055555555');
  await page.type('input[name="email"]', 'qa-prod-1795416140000@prajyotinfotech.in');
  await page.type('textarea[name="currentChallenge"]', 'Immediate duplicate attempt with existing email in database.');

  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();
  await new Promise(r => setTimeout(r, 4000));

  const text = await page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.innerText : 'NO ALERT FOUND';
  });
  console.log('ALERT FOUND ON PAGE:', text);
  await browser.close();
}
testDup();

