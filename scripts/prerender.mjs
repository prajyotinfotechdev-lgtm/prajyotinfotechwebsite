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
  {
    path: "software-company-in-mumbai",
    title: "High-Performance Web Platforms & FinTech Software in Mumbai — Prajyot Infotech",
    description: "Building mission-critical digital systems, high-converting D2C e-commerce portals, and enterprise-grade CRMs for businesses across Mumbai, BKC, Andheri, and Lower Parel.",
    keywords: "software company in Mumbai, web development company Mumbai, custom software Mumbai, app developers BKC Andheri, ecommerce website Mumbai",
    canonical: "https://www.prajyotinfotech.in/software-company-in-mumbai",
    h1: "High-Performance Web Platforms & FinTech Software in Mumbai",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        High-velocity software engineering for Mumbai's fast-moving enterprises, D2C brands, and financial services. Headquartered in Maharashtra with full source code ownership.
      </p>
    `,
  },
  {
    path: "services/custom-software-development",
    title: "Custom Software Development Company in Pune & India | Prajyot Infotech",
    description: "Prajyot Infotech engineers bespoke web applications, enterprise microservices, and distributed cloud systems with React 19, Node.js, and PostgreSQL. Full IP code ownership.",
    keywords: "custom software development company Pune, bespoke web development India, enterprise software engineering, hire software developers Pune",
    canonical: "https://www.prajyotinfotech.in/services/custom-software-development",
    h1: "Custom Software Engineering & Distributed Architecture",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Scalable, resilient web applications & cloud microservices with 100% intellectual property ownership and zero recurring user seat fees.
      </p>
    `,
  },
  {
    path: "services/enterprise-erp-crm",
    title: "Custom ERP & CRM Software Development in Pune | Prajyot Infotech",
    description: "Eliminate spreadsheet chaos. Prajyot Infotech develops custom enterprise ERP, CRM, and inventory management systems tailored to Indian SMBs and manufacturers with automated GST compliance.",
    keywords: "custom ERP development Pune, enterprise CRM software India, inventory management software Pune, GST billing software Maharashtra",
    canonical: "https://www.prajyotinfotech.in/services/enterprise-erp-crm",
    h1: "Enterprise ERP & Custom CRM Platforms",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Unify inventory, billing, sales pipelines, and multi-branch operations into one high-speed dashboard.
      </p>
    `,
  },
  {
    path: "services/mobile-app-development",
    title: "Mobile App Development Company in Pune | Android & iOS | Prajyot Infotech",
    description: "Prajyot Infotech builds high-performance cross-platform Android and iOS mobile applications. Native device access, offline caching, push notifications, and App Store publication.",
    keywords: "mobile app development company Pune, React Native app developers India, Android iOS app development, Flutter app Pune",
    canonical: "https://www.prajyotinfotech.in/services/mobile-app-development",
    h1: "Native & Cross-Platform Mobile Applications",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        High-performance React Native & Flutter applications with fluid animations and offline capabilities.
      </p>
    `,
  },
  {
    path: "services/whatsapp-automation",
    title: "WhatsApp Business API & Automation Services Pune | Prajyot Infotech",
    description: "Automate customer support, lead qualification, and order updates on WhatsApp. Prajyot Infotech builds 24/7 intelligent WhatsApp workflows connected directly to your CRM.",
    keywords: "WhatsApp Business API integration Pune, WhatsApp CRM automation India, WhatsApp chatbot development Maharashtra, WhatsApp lead bot",
    canonical: "https://www.prajyotinfotech.in/services/whatsapp-automation",
    h1: "WhatsApp Business API & Intelligent Workflow Automation",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Turn customer WhatsApp messages into qualified leads, automated orders, and instant CRM updates.
      </p>
    `,
  },
  {
    path: "articles/sub-second-page-speed",
    title: "Why Sub-Second Page Speed is Google's #1 Ranking Factor in 2026 — Prajyot Infotech",
    description: "Every 100ms delay in page load drops conversion by 7%. Discover how our engineering team builds sub-second web applications that outrank legacy competitors on Google.",
    keywords: "sub-second page speed, Google Core Web Vitals 2026, website speed optimization, React performance tuning",
    canonical: "https://www.prajyotinfotech.in/articles/sub-second-page-speed",
    h1: "Why Sub-Second Page Speed is Google's #1 Ranking Factor in 2026",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Discover how our engineering team builds sub-second web applications that outrank legacy WordPress and slow frameworks on Google search.
      </p>
    `,
  },
  {
    path: "articles/ai-whatsapp-automation",
    title: "Automating Business Operations with AI & WhatsApp: From Leads to Revenue in 12 Seconds — Prajyot Infotech",
    description: "90% of customers choose the business that responds first. Learn how connecting LLMs to WhatsApp and Supabase CRM turns cold visitors into paying clients automatically.",
    keywords: "AI WhatsApp automation, WhatsApp Cloud API guide, Supabase CRM automation, business process digitalization",
    canonical: "https://www.prajyotinfotech.in/articles/ai-whatsapp-automation",
    h1: "Automating Business Operations with AI & WhatsApp",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Learn how connecting LLMs to WhatsApp and Supabase CRM turns cold visitors into paying clients automatically in under 12 seconds.
      </p>
    `,
  },
  {
    path: "articles/what-is-an-api",
    title: "Understanding APIs: The Waiters of the Digital Economy — Prajyot Infotech",
    description: "From processing credit cards to syncing WhatsApp notifications, APIs power every modern software system. Plain-English guide for founders and leaders.",
    keywords: "what is an API plain English, REST API guide, API architecture explained, business software APIs",
    canonical: "https://www.prajyotinfotech.in/articles/what-is-an-api",
    h1: "Understanding APIs: The Waiters of the Digital Economy",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Plain-English explanation of how Application Programming Interfaces (APIs) power modern business and software interoperability.
      </p>
    `,
  },
  {
    path: "articles/responsive-design",
    title: "Why Responsive Design is Non-Negotiable: Mobile-First Architecture — Prajyot Infotech",
    description: "Over 78% of online purchases in India occur on smartphones. How fluid layouts and container queries turn casual phone browsers into loyal customers.",
    keywords: "mobile first responsive design, UI UX best practices, fluid container queries, ecommerce mobile conversion",
    canonical: "https://www.prajyotinfotech.in/articles/responsive-design",
    h1: "Why Responsive Design is Non-Negotiable: Mobile-First Architecture",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Why fluid mobile-first ergonomics directly drive checkout completion and rank on Google's mobile-first index.
      </p>
    `,
  },
  {
    path: "work/sagya-lehengas",
    title: "SAGYA Haute Couture — Luxury Bridal E-Commerce Case Study | Prajyot Infotech",
    description: "Omnichannel luxury fashion e-commerce — bespoke bridal lehengas, bridal stylist consultation booking, reel commerce, and WhatsApp VIP concierge. +42% consultation surge.",
    keywords: "luxury bridal ecommerce case study, fashion tech case study, Razorpay WhatsApp ecommerce, SAGYA Prajyot Infotech",
    canonical: "https://www.prajyotinfotech.in/work/sagya-lehengas",
    h1: "SAGYA — Luxury Bridal & Ethnic Haute Couture Case Study",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Omnichannel luxury fashion e-commerce with editorial collection lookbooks, bespoke blouse customizers, and 1-click WhatsApp VIP styling assistance.
      </p>
    `,
  },
  {
    path: "work/restaurant-management",
    title: "Restaurant Management & Live KDS System Case Study | Prajyot Infotech",
    description: "Full-stack restaurant management platform: QR code table menus, live kitchen display screen (KDS), split billing, and automated WhatsApp receipts. 0% order errors.",
    keywords: "restaurant management system case study, QR table menu software, kitchen display system KDS, restaurant software Pune",
    canonical: "https://www.prajyotinfotech.in/work/restaurant-management",
    h1: "Restaurant Management & Live Kitchen Display System (KDS)",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Event-driven WebSocket table ordering with chef kitchen display screens and automated GST billing. Table turnover improved 35%.
      </p>
    `,
  },
  {
    path: "work/mobile-shop-management",
    title: "Mobile Shop POS & IMEI Billing System Case Study | Prajyot Infotech",
    description: "Complete business management suite for mobile phone retailers: serialized IMEI tracking, repair job cards, GST billing, and WhatsApp updates. Billing time cut 90%.",
    keywords: "mobile shop POS software, IMEI tracking software India, electronics billing software, repair job card software",
    canonical: "https://www.prajyotinfotech.in/work/mobile-shop-management",
    h1: "Mobile Shop POS & IMEI Billing System Case Study",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Barcode and serialized IMEI inventory engine with thermal printer integration and automated WhatsApp PDF invoicing.
      </p>
    `,
  },
  {
    path: "tools/construction-leakage-calculator",
    title: "Construction Ghost-Labor & Site Leakage Calculator | OIBUZ HRMS",
    description: "Calculate how much money your construction projects lose each month to manual paper muster errors, buddy punching, and ghost labor. See your projected OIBUZ savings.",
    keywords: "construction ghost labor calculator, labor cost calculator India, construction muster app, OIBUZ HRMS savings",
    canonical: "https://www.prajyotinfotech.in/tools/construction-leakage-calculator",
    h1: "Construction Ghost-Labor & Site Cash Leakage Calculator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Interactive financial risk audit for real estate developers and infrastructure contractors to calculate paper muster cash leakage.
      </p>
    `,
  },
  {
    path: "testimonials",
    title: "Client Reviews & Success Stories — 4.9★ Rated | Prajyot Infotech",
    title: "Client Reviews & Success Stories — 4.9★ Rated | Prajyot Infotech",
    description: "Read verified reviews from 48+ happy clients. Prajyot Infotech is rated 4.9/5 for custom software, web development, mobile apps & ERP delivery in India.",
    keywords: "Prajyot Infotech reviews, client testimonials Pune, software development company reviews India, 4.9 star rated software company Maharashtra",
    canonical: "https://www.prajyotinfotech.in/testimonials",
    h1: "What Our Clients Say — Verified Success Stories",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Prajyot Infotech is rated 4.9 out of 5 stars across 48+ verified client projects. From fashion e-commerce to construction HRMS, our clients consistently report transformative business results delivered on-time and within scope.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Client Highlights</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Sagya Lehengas:</strong> 340% online sales increase. E-commerce platform with virtual try-on feature.</li>
          <li><strong>Kulkarni Family Restaurant:</strong> 45% faster table turnover. Cloud POS and kitchen display system.</li>
          <li><strong>Kamble Mobile Hub:</strong> 90% billing time reduction. IMEI tracking across 3 branches.</li>
          <li><strong>Patil Construction Works:</strong> ₹1.5 lakh/month ghost-labor losses eliminated with OIBUZ HRMS.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "tools/website-tech-checker",
    title: "Free Website Speed & Technology Stack Inspector | Prajyot Infotech",
    description: "Scan any business website URL to analyze technology stacks, Core Web Vitals (LCP, INP, CLS), TTFB speed, and discover actionable performance bottlenecks.",
    keywords: "website speed test, website tech stack checker, core web vitals scanner, website audit tool India, website performance checker",
    canonical: "https://www.prajyotinfotech.in/tools/website-tech-checker",
    h1: "Website Technology & Speed Performance Inspector",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Instant performance diagnostic tool for modern business websites. Analyze Core Web Vitals, server response times (TTFB), framework detection, and security posture in seconds.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Core Diagnostic Metrics</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Largest Contentful Paint (LCP):</strong> Measures perceived loading speed and hero asset efficiency. Target: &lt; 2.5s.</li>
          <li><strong>Interaction to Next Paint (INP):</strong> Assesses page responsiveness to taps, clicks, and key presses. Target: &lt; 200ms.</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> Quantifies visual stability and shifts during render. Target: &lt; 0.1.</li>
          <li><strong>Time to First Byte (TTFB):</strong> Measures server latency and edge caching efficiency. Target: &lt; 300ms.</li>
        </ul>
      </section>
    `,
  },

  {
    path: "faq",
    title: "Frequently Asked Questions | Prajyot Infotech — Software Development India",
    description: "All your questions about Prajyot Infotech answered: pricing, timelines, IP ownership, NDAs, payment terms, tech stack, and remote project delivery across India and globally.",
    keywords: "Prajyot Infotech FAQ, how much does custom software cost India, software company Pune FAQ, website development questions, ERP software cost India",
    canonical: "https://www.prajyotinfotech.in/faq",
    h1: "Frequently Asked Questions — Everything About Our Services",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Clear, honest answers to 20+ common questions about software development pricing, timelines, intellectual property ownership, NDAs, and how we work with clients across India and internationally.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Quick Answers</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Website cost:</strong> Starting ₹29,999. Custom ERP/CRM from ₹1.5 lakh. Mobile apps from ₹2.5 lakh.</li>
          <li><strong>Delivery:</strong> Websites in 10–14 days. Mobile apps in 6–12 weeks. ERPs in 4–8 weeks.</li>
          <li><strong>IP Ownership:</strong> 100% source code and commercial copyright transferred to client on project completion.</li>
          <li><strong>Post-launch:</strong> 60-day bug warranty included. Maintenance retainers available.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "privacy",
    title: "Privacy Policy | Prajyot Infotech — Your Data, Your Rights",
    description: "Prajyot Infotech Privacy Policy. How we collect, store, and protect your personal data in accordance with the Indian IT Act and global GDPR principles.",
    keywords: "Prajyot Infotech privacy policy, data protection India software company",
    canonical: "https://www.prajyotinfotech.in/privacy",
    h1: "Privacy Policy — Prajyot Infotech",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Prajyot Infotech is committed to protecting your personal data. We collect only the information necessary to respond to your inquiry and deliver your project. We never sell or rent your data. Full details below.
      </p>
    `,
  },
  {
    path: "terms",
    title: "Terms of Service | Prajyot Infotech — Transparent Engagement Terms",
    description: "Terms of Service for Prajyot Infotech software development engagements. Covers project contracts, 100% IP ownership, milestone payments, 60-day warranty, and confidentiality.",
    keywords: "Prajyot Infotech terms of service, software development contract India, IP ownership terms",
    canonical: "https://www.prajyotinfotech.in/terms",
    h1: "Terms of Service — Prajyot Infotech",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Our engagement terms are designed to protect you as a client. Fixed-price milestone contracts, 100% IP ownership transfer, 60-day post-launch bug warranty, and mutual NDA are standard on every Prajyot Infotech project.
      </p>
    `,
  },
  {
    path: "articles/erp-vs-spreadsheets",
    title: "ERP vs Spreadsheets: Why Indian SMBs Are Switching in 2026 | Prajyot Infotech",
    description: "Discover why spreadsheet-dependent businesses lose 35–60% operational efficiency. The real cost of manual processes vs a custom ERP system for Indian manufacturers and distributors.",
    keywords: "ERP vs spreadsheets India, custom ERP for Indian SMB, manufacturing ERP Pune, business management software India, replace Excel with ERP",
    canonical: "https://www.prajyotinfotech.in/articles/erp-vs-spreadsheets",
    h1: "ERP vs Spreadsheets: Why Indian SMBs Are Switching in 2026",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Running your manufacturing unit, wholesale distribution business, or multi-branch retail store on WhatsApp forwards and Excel sheets is not cost-saving — it is a systematic revenue leak. Here is the evidence-based case for switching to a custom ERP.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">The Real Cost of Manual Processes</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Transcription errors:</strong> Manual data entry has a 4% error rate, compounding across every transaction.</li>
          <li><strong>Reconciliation time:</strong> Finance teams spend 40+ hours monthly on branch report consolidation that ERPs handle in seconds.</li>
          <li><strong>Inventory shrinkage:</strong> Manual stock counts increase overstock and stockout rates by 23%.</li>
          <li><strong>ROI timeline:</strong> Custom ERPs delivered by Prajyot Infotech consistently achieve 35–60% operational cost reduction within 9 months.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "articles/cost-of-custom-software-india",
    title: "Custom Software Development Cost in India 2026 — Complete Price Guide | Prajyot Infotech",
    description: "Transparent breakdown of custom software development costs in India 2026: websites from ₹29,999, ERP/CRM ₹1.5–10 lakh, mobile apps from ₹2.5 lakh. No hidden fees, fixed-price contracts.",
    keywords: "custom software development cost India 2026, website development cost Pune, ERP software price India, mobile app development cost India, how much does software cost India",
    canonical: "https://www.prajyotinfotech.in/articles/cost-of-custom-software-india",
    h1: "How Much Does Custom Software Development Cost in India? (2026 Guide)",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Transparent, no-fluff pricing guide for custom software development in India in 2026. Website packages from ₹29,999. Mobile apps from ₹2.5 lakh. Custom ERP/CRM from ₹1.5 lakh to ₹10 lakh. Fixed-price milestone contracts only.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Pricing Reference Guide</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Business Websites:</strong> ₹29,999 – ₹1.5 lakh (responsive, SEO-optimised, WhatsApp integration).</li>
          <li><strong>E-Commerce Stores:</strong> ₹75,000 – ₹3.5 lakh (Razorpay, product catalog, order management).</li>
          <li><strong>Custom CRM / ERP:</strong> ₹1.5 lakh – ₹10 lakh (scope-dependent, full source code ownership).</li>
          <li><strong>Mobile Apps (React Native):</strong> ₹2.5 lakh – ₹8 lakh (iOS + Android, offline sync, push notifications).</li>
        </ul>
      </section>
    `,
  },
  {
    path: "articles/whatsapp-business-api-india",
    title: "WhatsApp Business API for Indian SMBs — Complete Implementation Guide 2026 | Prajyot Infotech",
    description: "How to implement WhatsApp Business Cloud API in India: automated order confirmations, invoice dispatch, AI lead qualification, and 24/7 customer support. 530M users, 98% open rate.",
    keywords: "WhatsApp Business API India, WhatsApp automation for business India, Meta Cloud API integration, WhatsApp chatbot India, WhatsApp for SMB India 2026",
    canonical: "https://www.prajyotinfotech.in/articles/whatsapp-business-api-india",
    h1: "WhatsApp Business API for Indian SMBs: Complete Implementation Guide 2026",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        India has 530 million active WhatsApp users and a 98% message open rate. This guide covers exactly how to implement the WhatsApp Business Cloud API to automate customer support, order confirmations, invoice dispatch, and lead qualification — 24/7.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Key Automation Capabilities</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>Order Confirmations:</strong> Automatic branded WhatsApp messages within 3 seconds of order placement.</li>
          <li><strong>Invoice Dispatch:</strong> PDF invoices sent automatically to customer WhatsApp on billing.</li>
          <li><strong>AI Lead Qualification:</strong> Chatbot qualifies budget, timeline, and service type instantly — routing to the right team member.</li>
          <li><strong>24/7 Support:</strong> 80% of repetitive support queries handled automatically, reducing staffing costs by 60–80%.</li>
        </ul>
      </section>
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
  const semanticBlockRegex = /<main[\s\S]*?<\/main>/i;
  const newSemanticMain = `
    <main style="flex: 1; max-width: 1200px; margin: 0 auto; width: 100%; padding: 40px 24px;">
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
