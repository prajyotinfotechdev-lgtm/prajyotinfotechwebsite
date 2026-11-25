// scripts/submit-indexnow.mjs
// Reads public/sitemap.xml and pings IndexNow (Bing, Yandex, Seznam, Naver) for fast crawl & ChatGPT search discovery.
// Usage after deploying to Vercel: node scripts/submit-indexnow.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.resolve(__dirname, "../public/sitemap.xml");
const HOST = "www.prajyotinfotech.in";
const KEY = "b9a4f8e1c3d24a7e910f6e2b4c5d8a1f";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
const urls = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1].trim());

console.log(`Submitting ${urls.length} URLs from sitemap.xml to IndexNow...`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});

console.log(`IndexNow status: ${res.status} ${res.statusText}`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
console.log("IndexNow batch accepted cleanly.");

