// scripts/prerender.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, "../dist");

if (!fs.existsSync(DIST_DIR)) {
  console.error("Error: dist directory does not exist. Run vite build first.");
  process.exit(1);
}

const templatePath = path.join(DIST_DIR, "index.html");
const baseTemplate = fs.readFileSync(templatePath, "utf-8");

const ROUTES = [
  {
    path: "about",
    title: "About Prajyot Infotech — Leadership, Engineering Craft & Vision",
    description: "Learn about Prajyot Infotech, founded by Prajyot Kankal and co-founded by Sanket Kshirsagar. High-performance software engineering, enterprise web & mobile architectures.",
    keywords: "about Prajyot Infotech, Prajyot Kankal Founder, Sanket Kshirsagar Co-Founder, Sneha Kalekar, software engineering company Pune, IT leadership Pune India",
    canonical: "https://www.prajyotinfotech.in/about",
    h1: "About Prajyot Infotech — Engineering Scalable Software",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Prajyot Infotech is an engineering-first software development agency headquartered in Pune, Maharashtra. We design and build enterprise web applications, mobile platforms, and automated business systems with zero vendor lock-in and 100% intellectual property transfer.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Meet Our Leadership Team</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Prajyot Kankal:</strong> Founder — Guiding technology vision, system architecture, and client engineering strategy.</li>
          <li><strong>Sanket Kshirsagar:</strong> Co-Founder — Leading technical execution, cloud infrastructure, and product scalability.</li>
          <li><strong>Sneha Kalekar:</strong> Head of Marketing & Operations — Directing business partnerships, client operations, and campaign growth.</li>
        </ul>
      </section>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Our Core Engineering Principles</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          We build with modern frameworks (React 19, Node.js, Python, PostgreSQL), test rigorously across real devices, and deliver complete Git repositories with verified documentation.
        </p>
      </section>
    `,
  },
  {
    path: "services",
    title: "Software & Web Development Services | Custom Web, Mobile & ERP Solutions — Prajyot Infotech",
    description: "Prajyot Infotech provides enterprise web development, mobile apps & custom ERP/CRM. Get a free business technology audit and discover how to get 2027-ready.",
    keywords: "custom software development, enterprise web development, mobile app engineering, ERP CRM solutions, business automation Pune, web development services India",
    canonical: "https://www.prajyotinfotech.in/services",
    h1: "Software & Web Development Services — Prajyot Infotech",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        High-performance custom software solutions tailored to your operational workflows. From high-throughput web applications to automated ERP/CRM suites and cross-platform mobile apps.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Our Core Solutions</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Custom Software Development:</strong> Scalable web platforms, microservices, and dedicated software architectures.</li>
          <li><strong>OIBUZ Construction HRMS:</strong> Flagship field attendance, GPS geofencing, and site expense tracking for contractors.</li>
          <li><strong>Business Process Automation:</strong> Eliminate spreadsheet bottlenecks and connect WhatsApp APIs directly to your databases.</li>
          <li><strong>Cross-Platform Mobile Apps:</strong> Native-grade iOS and Android applications with offline-first synchronisation.</li>
        </ul>
      </section>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px;border-radius:12px;">
        <h3 style="font-size:18px;font-weight:800;color:#0f172a;margin:0 0 8px 0;">2027 Business Growth Campaign</h3>
        <p style="font-size:14px;color:#475569;margin:0;">
          Request a complimentary technical audit for your business at <a href="/free-business-tech-audit" style="color:#2563eb;font-weight:bold;">prajyotinfotech.in/free-business-tech-audit</a>.
        </p>
      </div>
    `,
  },
  {
    path: "work",
    title: "Portfolio & Client Engineering Case Studies — Prajyot Infotech",
    description: "Explore proven software engineering case studies, enterprise web platforms, and mobile apps built by Prajyot Infotech with 100% IP code ownership.",
    keywords: "software portfolio, web development case studies, OIBUZ demo, client projects Pune, mobile app portfolio India",
    canonical: "https://www.prajyotinfotech.in/work",
    h1: "Client Engineering Portfolio & Verified Case Studies",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Review real-world digital platforms, SaaS products, and enterprise automation systems delivered by Prajyot Infotech with defined milestone delivery and 100% IP transfer.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Featured Client Systems</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>OIBUZ Construction HRMS:</strong> Multi-site attendance and GPS tracking software utilized across commercial building projects.</li>
          <li><strong>Retail POS & IMEI Inventory Engine:</strong> High-speed barcode scanning, billing, and GST compliance software.</li>
          <li><strong>Healthcare Clinic & OPD Booking:</strong> Patient token systems and automated digital prescription distribution.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "pricing",
    title: "Software & Web Development Pricing — Transparent Cost Packages | Prajyot Infotech",
    description: "Transparent software and website development pricing. Starter web from ₹25,499. Custom software, mobile apps, ERP/CRM and automation. Get a free business audit.",
    keywords: "website development pricing India, custom software development cost, mobile app pricing, ERP CRM cost, software pricing Pune",
    canonical: "https://www.prajyotinfotech.in/pricing",
    h1: "Transparent Software & Website Development Pricing",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Fixed-bid milestone pricing with zero hidden fees. You get 100% code ownership, 60-day post-launch bug warranty, and direct senior engineering collaboration.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Package Tiers Overview</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Starter Web Presence:</strong> From ₹25,499 — High-speed responsive business website with domain, hosting setup, and SEO basics.</li>
          <li><strong>Custom Business Web App:</strong> Modular architecture, customer portals, database integration, and payment gateways.</li>
          <li><strong>Enterprise ERP & SaaS:</strong> Multi-tenant architecture, automated workflows, and complex business logic.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "estimate",
    title: "Project Cost Estimator — Instant Accurate Quote | Prajyot Infotech",
    description: "Instant project cost estimator for website, mobile app & software development. Plan your technology budget with transparent fixed-scope estimates.",
    keywords: "website cost calculator, project cost estimator India, software development cost calculator, mobile app development cost",
    canonical: "https://www.prajyotinfotech.in/estimate",
    h1: "Interactive Project Cost Estimator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Calculate an instant estimate for your website, mobile application, or custom software project. Transparent pricing, defined delivery timelines, and full IP ownership.
      </p>
    `,
  },
  {
    path: "contact",
    title: "Contact Prajyot Infotech — Get Your Free Tech Consultation",
    description: "Connect with Prajyot Infotech for custom web development, mobile apps, CRM, ERP & automation. Request your free 2027 business technology audit today.",
    keywords: "contact Prajyot Infotech, hire software developers India, custom software quote, website development contact Pune, software consultation",
    canonical: "https://www.prajyotinfotech.in/contact",
    h1: "Contact Prajyot Infotech — Let's Build Something Exceptional",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Connect with our principal engineering team for architectural advice, project scoping, or a complimentary 2027 business tech audit.
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:24px;border-radius:12px;margin-bottom:32px;">
        <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin:0 0 12px 0;">Direct Communication Channels</h2>
        <p style="margin:0 0 8px 0;font-size:15px;color:#334155;"><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/917020708747" style="color:#059669;font-weight:bold;">+91 70207 08747</a></p>
        <p style="margin:0 0 8px 0;font-size:15px;color:#334155;"><strong>Email:</strong> <a href="mailto:hr@prajyotinfotech.in" style="color:#2563eb;font-weight:bold;">hr@prajyotinfotech.in</a></p>
        <p style="margin:0;font-size:15px;color:#334155;"><strong>Engineering Base:</strong> Pune, Maharashtra, India — 411001</p>
      </div>
    `,
  },
  {
    path: "free-business-tech-audit",
    title: "Free Business Technology Audit — Get Your Business 2027-Ready | Prajyot Infotech",
    description: "Build smarter. Automate better. Grow faster. Apply for a complimentary 2027 Business Technology Audit with Prajyot Infotech. Zero cost, no obligation.",
    keywords: "free business technology audit, 2027 business growth, custom software consultation, process automation audit, construction hrms demo Pune",
    canonical: "https://www.prajyotinfotech.in/free-business-tech-audit",
    h1: "Get Your Business 2027-Ready — Free Technology Audit",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Build smarter. Automate better. Grow faster. Discover how digital technology and intelligent business systems can help your business operate more efficiently.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">What the Business Technology Audit Covers</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Architecture & Tech Stack Review:</strong> Identify bottlenecks and outdated infrastructure.</li>
          <li><strong>Process & Workflow Automation:</strong> Eliminate spreadsheet chaos and manual paperwork.</li>
          <li><strong>Scalability & Performance Analysis:</strong> Prepare systems for 3x–5x business growth into 2027.</li>
          <li><strong>Data Sovereignty & IP Ownership:</strong> Ensure 100% control over your proprietary data.</li>
          <li><strong>Custom 2027 Execution Blueprint:</strong> Concrete roadmap with fixed milestone deliveries.</li>
        </ul>
      </section>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Three Strategic Growth Paths</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          1. <strong>Custom Software Development</strong> (Discuss Your Project)<br/>
          2. <strong>OIBUZ Construction Management Software</strong> (Book a Live Demo)<br/>
          3. <strong>Business Process Automation</strong> (Explore Automation Opportunities)
        </p>
      </section>
    `,
  },
  {
    path: "software-company-in-pune",
    title: "Bespoke Web & Enterprise Software Engineering in Pune — Prajyot Infotech",
    description: "Looking for the best software and website development company in Pune? Prajyot Infotech builds high-converting websites, mobile apps, ERPs, and automated billing systems. Get a free quote.",
    keywords: "software company in Pune, website development Pune, mobile app development Pune, custom software development Pune, software company Hinjewadi Kharadi",
    canonical: "https://www.prajyotinfotech.in/software-company-in-pune",
    h1: "Bespoke Web & Enterprise Software Engineering in Pune",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Empowering Pune's manufacturing enterprises, automotive suppliers, IT startups, and educational institutions with high-availability web platforms, custom ERPs, and mobile applications.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Tailored Engineering for Pune Industries</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Industrial & Manufacturing ERPs:</strong> Automated bill of materials (BOM), supplier purchase orders, and GST e-invoicing for Bhosari and Chakan units.</li>
          <li><strong>High-Traffic EdTech & Institute Portals:</strong> Custom admission funnels, automated fee receipts, and WhatsApp student alerts for Pune coaching institutes.</li>
          <li><strong>Startup MVPs & SaaS Platforms:</strong> Rapid delivery using React, Node.js, and cloud microservices for Hinjewadi & Kharadi innovators.</li>
        </ul>
      </section>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Pune Frequently Asked Questions</h2>
        <p style="font-size:15px;color:#334155;line-height:1.8;">
          <strong>Do you offer in-person consultations in Pune?</strong><br/>
          Yes, our registered engineering base is in Pune, Maharashtra. We coordinate milestone sessions and project scoping across Pune and PCMC.
        </p>
      </section>
    `,
  },
  {
    path: "software-company-in-latur",
    title: "Custom Business Software, Billing & Web Portals in Latur — Prajyot Infotech",
    description: "Looking for the best software and website development company in Latur? Prajyot Infotech builds high-converting websites, mobile apps, ERPs, and automated billing systems. Get a free quote.",
    keywords: "software company in Latur, website development Latur, billing software Latur, coaching class software Latur, APMC software Latur Marathwada",
    canonical: "https://www.prajyotinfotech.in/software-company-in-latur",
    h1: "Custom Business Software, Billing & Web Portals in Latur",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Transforming Latur's agricultural trading firms, competitive coaching institutes, clinics, and local retail merchants with user-friendly billing systems, student management portals, and mobile apps.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Specialized Solutions for Latur & Marathwada</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Agro-Trading & APMC Mandi Billing:</strong> Custom sauda bookkeeping, farmer ledger tracking, and automated mandi cess invoices.</li>
          <li><strong>Coaching Class Management Portals:</strong> Student test engines, attendance muster, and WhatsApp fee reminders tailored for Latur's education hubs.</li>
          <li><strong>Bilingual Marathi / English Software:</strong> Easy-to-use software interfaces built for staff and operators in Marathwada.</li>
        </ul>
      </section>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Latur Frequently Asked Questions</h2>
        <p style="font-size:15px;color:#334155;line-height:1.8;">
          <strong>Can the software interface be operated in Marathi?</strong><br/>
          Yes. We build bilingual interfaces where buttons, labels, and customer WhatsApp receipts are fully readable and printable in Marathi.
        </p>
      </section>
    `,
  },
  {
    path: "products/hrms",
    title: "OIBUZ — Construction HRMS & Field Workforce Management Software | Prajyot Infotech",
    description: "OIBUZ is the premier construction HRMS software for tracking site labor attendance with GPS geofencing, muster roll automation, and material requisitions.",
    keywords: "OIBUZ, construction HRMS, construction site attendance software, labor management software India, contractor muster roll app",
    canonical: "https://www.prajyotinfotech.in/products/hrms",
    h1: "OIBUZ — Construction HRMS & Field Workforce Management Software",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Stop ghost labor and site cash leakages. OIBUZ empowers real estate builders, infrastructure contractors, and EPC firms with geofenced mobile attendance, subcontractor billing, and real-time site muster rolls.
      </p>
    `,
  },
  {
    path: "articles",
    title: "Engineering Articles & Tech Insights — Prajyot Infotech",
    description: "Technical guides, architecture deep dives, and business software insights from Prajyot Infotech engineers.",
    keywords: "software engineering articles, web development guides, ERP architecture, technology insights India",
    canonical: "https://www.prajyotinfotech.in/articles",
    h1: "Software Engineering Articles & Architecture Insights",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Practical architectural guides, performance optimization benchmarks, and technology case studies written by the Prajyot Infotech engineering team.
      </p>
    `,
  },
  {
    path: "careers",
    title: "Careers at Prajyot Infotech — Join Our Engineering Team",
    description: "Explore software engineering and full-stack development career opportunities at Prajyot Infotech in Pune, India.",
    keywords: "careers Prajyot Infotech, software developer jobs Pune, React developer jobs India, Node.js jobs Pune",
    canonical: "https://www.prajyotinfotech.in/careers",
    h1: "Careers at Prajyot Infotech — Build High-Impact Systems",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        We are always seeking passionate full-stack software engineers, React developers, and system architects who care about code quality, performance, and craftsmanship.
      </p>
    `,
  },
  {
    path: "glossary",
    title: "Tech Glossary for Business Leaders & Founders — Prajyot Infotech",
    description: "Plain-English explanations of critical software, web architecture, and cloud terminology for founders and business decision makers.",
    keywords: "tech glossary, software terms explained, ERP definition, SaaS architecture glossary, business tech dictionary",
    canonical: "https://www.prajyotinfotech.in/glossary",
    h1: "Technology Glossary for Business Decision Makers",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Clear, actionable explanations of software engineering concepts, database terms, and cloud infrastructure without confusing jargon.
      </p>
    `,
  },
];

console.log(`Starting static HTML prerendering for ${ROUTES.length} routes...`);

let count = 0;
for (const route of ROUTES) {
  let html = baseTemplate;

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // 2. Replace Meta Description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // 3. Replace Meta Keywords
  html = html.replace(
    /<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="keywords" content="${route.keywords}" />`
  );

  // 4. Replace Canonical URL
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // 5. Replace Open Graph
  html = html.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // 6. Replace Twitter Card
  html = html.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // 7. Inject Unique Semantic Snapshot inside #root
  const semanticBlockRegex = /<main style="padding:48px 0;">[\s\S]*?<\/main>/i;
  const newSemanticMain = `
    <main style="padding:48px 0;">
      <h1 style="font-size:38px;font-weight:900;line-height:1.2;color:#0f172a;margin:0 0 16px 0;">
        ${route.h1}
      </h1>
      ${route.content}
    </main>
  `;

  if (semanticBlockRegex.test(html)) {
    html = html.replace(semanticBlockRegex, newSemanticMain);
  }

  // 8. Write to dist/<route>/index.html and dist/<route>.html
  const targetDir = path.join(DIST_DIR, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, "index.html");
  fs.writeFileSync(targetFile, html, "utf-8");

  // Also write clean URL fallback <route>.html if not nested
  if (!route.path.includes("/")) {
    const cleanUrlFile = path.join(DIST_DIR, `${route.path}.html`);
    fs.writeFileSync(cleanUrlFile, html, "utf-8");
  }

  count++;
  console.log(`  ✓ Prerendered: /${route.path} -> dist/${route.path}/index.html & dist/${route.path}.html`);
}

console.log(`Successfully prerendered ${count} static HTML route pages with custom SEO tags & content!`);
