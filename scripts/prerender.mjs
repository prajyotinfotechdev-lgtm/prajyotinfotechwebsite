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
    title: "Client Reviews & Success Stories — 4.9/5 Rated | Prajyot Infotech",
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
  {
    path: "tools/gst-invoice-generator",
    title: "Free GST Invoice Generator Online (India) — 100% Free PDF Maker | Prajyot Infotech",
    description: "Create, download, and print 100% GST-compliant invoices online for free. Automatic CGST, SGST, IGST calculations, HSN codes, instant PDF download & WhatsApp sharing.",
    keywords: "free GST invoice generator online, GST bill maker India, create GST invoice PDF free, GST calculator India, online billing generator for SMB, Prajyot Infotech billing tools",
    canonical: "https://www.prajyotinfotech.in/tools/gst-invoice-generator",
    h1: "Free GST Invoice Generator Online India",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Create, download, and print official Indian GST invoices in seconds. Includes automatic intra-state (CGST+SGST) vs inter-state (IGST) tax calculation, HSN codes, and instant WhatsApp dispatch.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Key Features</h2>
        <ul style="line-height:1.8;color:#475569;font-size:15px;">
          <li><strong>100% GST Compliant:</strong> Formatted in accordance with Rule 46 of CGST Rules, 2017.</li>
          <li><strong>Auto Tax Calculation:</strong> Automatically determines CGST + SGST vs IGST based on supplier and buyer state codes.</li>
          <li><strong>One-Click PDF & Print:</strong> Generates crisp A4 printable tax invoices with zero watermarks.</li>
          <li><strong>WhatsApp Dispatch:</strong> Share professional billing summaries directly to client WhatsApp chats.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "tools/app-cost-calculator",
    title: "Mobile App Development Cost Calculator India 2026 — Instant Scope & Pricing | Prajyot Infotech",
    description: "Calculate accurate mobile app development costs in India for iOS & Android. Configure Flutter, React Native, GPS tracking, Razorpay, and admin portals with instant WhatsApp scope export.",
    keywords: "mobile app development cost in India, cost to build an app Pune, app development price calculator 2026, Flutter app cost India, React Native development cost",
    canonical: "https://www.prajyotinfotech.in/tools/app-cost-calculator",
    h1: "Mobile App Development Cost Calculator India 2026",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Configure your target platform (Flutter, React Native, iOS, Android), user authentication, live feature modules, and admin portal to calculate an instant, transparent development budget in INR.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">2026 Mobile App Rate Index in India</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          Cross-platform Flutter and React Native business apps typically range from ₹2,00,000 to ₹5,50,000 with 100% full source code ownership on Day 1 and 60 days of bug warranty.
        </p>
      </section>
    `,
  },
  {
    path: "compare/tally-vs-custom-erp",
    title: "Tally vs Custom ERP Software (2026 Comparison) — When to Upgrade | Prajyot Infotech",
    description: "Detailed technical & commercial comparison between Tally and Custom ERP software for Indian manufacturers and distributors. Compare multi-branch inventory, mobile access, production BOM, and TCO.",
    keywords: "Tally vs custom ERP, replace Tally with custom software, manufacturing ERP Pune, Tally limitations inventory, custom ERP vs Tally Prime 2026",
    canonical: "https://www.prajyotinfotech.in/compare/tally-vs-custom-erp",
    h1: "Tally vs Custom ERP Software — The 2026 Architectural Guide",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Tally is unmatched for chartered accountants and GST tax filing, but when your factory or distribution business scales past 20 employees, single-user bottlenecks and lack of real-time mobile tracking create expensive operational friction.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">The Modern Hybrid Architecture</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          Run daily inventory, barcode dispatch, and shop-floor work orders on Prajyot Infotech's Custom ERP, and automatically sync ledger journals into Tally for CA compliance.
        </p>
      </section>
    `,
  },
  {
    path: "compare/wordpress-vs-custom-software",
    title: "WordPress vs Custom Web Application (2026 Architectural Guide) | Prajyot Infotech",
    description: "Comprehensive comparison between WordPress/WooCommerce and custom React/Next.js software. Analyze Core Web Vitals speed, security vulnerabilities, plugin fragility, and 3-year TCO.",
    keywords: "WordPress vs custom software, migrate WordPress to React, why custom software is better than WordPress, WordPress speed vs custom code, custom web application Pune",
    canonical: "https://www.prajyotinfotech.in/compare/wordpress-vs-custom-software",
    h1: "WordPress vs Custom Web Applications — Speed, Security & TCO",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        If your website drives core revenue, relying on 35 third-party PHP plugins is an existential liability. Custom React/Next.js architectures deliver sub-second LCP (<0.8s) and zero plugin security exploits.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Core Web Vitals & Conversion Impact</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          Sub-second load times cut Google Ads bounce rates by 40% and dramatically increase mobile conversion rates across Maharashtra and India.
        </p>
      </section>
    `,
  },
  {
    path: "resources/software-rfp-template",
    title: "Software RFP Template & Scope of Work (SOW) Kit 2026 | Prajyot Infotech",
    description: "Free downloadable and interactive Software RFP & Scope of Work template for Indian businesses. Learn how to scope web apps, mobile apps, and ERPs with fixed pricing and 100% IP transfer.",
    keywords: "software RFP template India, scope of work template web app, ERP requirements document template, how to write software RFP, software tender template Pune",
    canonical: "https://www.prajyotinfotech.in/resources/software-rfp-template",
    h1: "Enterprise Software Request for Proposal (RFP) & SOW Kit 2026",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Eliminate scope creep and open-ended hourly billing. Use our 6-part procurement framework to specify performance SLAs, 100% source code ownership, and 60-day bug warranties.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Interactive SOW Generator</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          Customize your requirements, generate a formal RFP document, and submit it for a guaranteed 24-hour fixed-price engineering proposal.
        </p>
      </section>
    `,
  },
  {
    path: "software-company-in-chakan-bhosari",
    title: "Industrial ERP & Custom Software Company in Chakan & Bhosari MIDC | Prajyot Infotech",
    description: "Prajyot Infotech provides plant ERPs, barcode inventory tracking, machine downtime logging, and GST e-invoicing for auto-ancillary and manufacturing units in Chakan & Bhosari MIDC.",
    keywords: "ERP software company Chakan MIDC, manufacturing software Bhosari, industrial software company PCMC, auto ancillary ERP Pune, factory inventory barcode scanning",
    canonical: "https://www.prajyotinfotech.in/software-company-in-chakan-bhosari",
    h1: "Industrial ERP & Custom Software Engineering in Chakan & Bhosari MIDC",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Headquartered in Pune with rapid on-site plant visits across Bhosari and Chakan MIDC. We build rugged, touch-optimized shop-floor ERPs, barcode scanners, and automated GST billing systems.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Tailored for Heavy Manufacturing & Auto-Ancillary</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          Automate multi-stage Bill of Materials (BOM), scrap tracking, machine downtime, and WhatsApp dispatch alerts with 100% source code ownership.
        </p>
      </section>
    `,
  },
  {
    path: "software-company-in-hinjewadi",
    title: "Startup MVP & Enterprise Software Engineering in Hinjewadi, Pune | Prajyot Infotech",
    description: "Partnering with tech startups, scale-ups, and consulting firms in Hinjewadi IT Park Phase 1-3 to build high-concurrency React/Next.js web apps, mobile apps, and cloud microservices.",
    keywords: "software company Hinjewadi, startup MVP development Pune, React Next.js developers Hinjewadi, mobile app developers Rajiv Gandhi Infotech Park, dedicated engineering pods Pune",
    canonical: "https://www.prajyotinfotech.in/software-company-in-hinjewadi",
    h1: "Startup MVP & Enterprise Software Engineering in Hinjewadi, Pune",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Senior full-stack engineering pods in Pune. We build venture-ready React/Node/PostgreSQL MVPs in 4 to 6 weeks with sub-second performance SLAs and 100% source code ownership on Day 1.
      </p>
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:16px;">Agile Sprints for Funded Startups</h2>
        <p style="font-size:15px;color:#475569;line-height:1.8;">
          Clean microservices, Prisma/Drizzle ORMs, WebSocket real-time feeds, and automated CI/CD pipelines ready for investor due diligence.
        </p>
      </section>
    `,
  },
  {
    path: "tools/quotation-generator",
    title: "Free Quotation & Proforma Estimate Maker Online India | Prajyot Infotech",
    description: "Create branded business quotations, estimates, and proforma invoices in seconds. Supports GST exclusive/inclusive/non-GST quotes, A4 PDF export, and WhatsApp sharing.",
    keywords: "free quotation generator online India, proforma invoice maker free, business estimate maker PDF, quotation format India",
    canonical: "https://www.prajyotinfotech.in/tools/quotation-generator",
    h1: "Free Business Quotation & Proforma Estimate Maker",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Create clean, professional business quotations and proforma estimates online for free. Includes payment milestone templates, optional GST breakdowns, A4 PDF print, and 1-click WhatsApp dispatch.
      </p>
    `,
  },
  {
    path: "tools/whatsapp-link-generator",
    title: "Free WhatsApp Link & QR Code Generator (wa.me Maker) | Prajyot Infotech",
    description: "Generate direct WhatsApp chat links with custom greeting messages, high-res SVG/PNG QR codes, printable shop counter standees, and website button HTML snippets free.",
    keywords: "whatsapp link generator, create whatsapp link with message, whatsapp qr code generator free, wa.me link generator India",
    canonical: "https://www.prajyotinfotech.in/tools/whatsapp-link-generator",
    h1: "Free WhatsApp Direct Chat Link & QR Code Generator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Build instant wa.me chat links with pre-filled messages, generate crisp scannable QR codes in SVG or PNG format, and print counter standees for your business for free.
      </p>
    `,
  },
  {
    path: "tools",
    title: "Free Online Business Tools India — GST Invoice, Quotation, UPI QR & Calculators | Prajyot Infotech",
    description: "Directory of free online Indian business tools: GST Invoice Generator, Quotation Maker, UPI QR Standee, HSN Finder, Legal Policy Maker, Salary Slip, PO & App Calculators.",
    keywords: "free business tools india, online gst invoice generator, free quotation maker, upi qr standee generator, salary slip generator",
    canonical: "https://www.prajyotinfotech.in/tools",
    h1: "Free Online Business Utilities & Calculators India",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:24px;">
        Zero-login, zero-watermark business utilities built for Indian enterprises, merchants, contractors, and founders.
      </p>
      <ul style="line-height:1.8;color:#334155;font-size:15px;">
        <li><a href="/tools/gst-invoice-generator">Free GST Tax Invoice Generator (A4 PDF & WhatsApp)</a></li>
        <li><a href="/tools/quotation-generator">Free Business Quotation & Proforma Estimate Maker</a></li>
        <li><a href="/tools/upi-qr-generator">Free Dynamic UPI QR Code & Shop Standee Maker</a></li>
        <li><a href="/tools/whatsapp-link-generator">Free WhatsApp Direct Link (wa.me) & QR Generator</a></li>
        <li><a href="/tools/hsn-sac-finder">HSN & SAC Code with Indian GST Slab Lookup</a></li>
        <li><a href="/tools/gst-profit-calculator">India GST & Net Profit Margin Calculator</a></li>
        <li><a href="/tools/legal-policy-generator">Razorpay & Play Store Legal Policy Generator</a></li>
        <li><a href="/tools/salary-slip-generator">Free Employee Salary Slip (Payslip) PDF Maker</a></li>
        <li><a href="/tools/purchase-order-generator">Free Purchase Order & Delivery Challan Generator</a></li>
        <li><a href="/tools/website-tech-checker">Free Website Speed & Core Web Vitals Inspector</a></li>
        <li><a href="/tools/app-cost-calculator">Mobile App Development Cost Calculator (India 2026)</a></li>
      </ul>
    `,
  },
  {
    path: "tools/upi-qr-generator",
    title: "Free UPI QR Code Generator with Amount (GPay / PhonePe Standee) | Prajyot Infotech",
    description: "Create NPCI standard UPI QR codes with locked rupee amounts for GPay, PhonePe, Paytm & BHIM. Download PNG/SVG or print shop counter standees free.",
    keywords: "upi qr code generator, upi qr generator with amount, phonepe gpay qr standee maker india",
    canonical: "https://www.prajyotinfotech.in/tools/upi-qr-generator",
    h1: "Free UPI Payment QR & Shop Standee Generator",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Create scannable GPay, PhonePe, Paytm, and BHIM payment QR standees with optional locked ₹ amounts. Zero fees, runs locally.</p>`,
  },
  {
    path: "tools/hsn-sac-finder",
    title: "HSN Code & SAC Code List with GST Rates India 2026 | Free Lookup | Prajyot Infotech",
    description: "Search Indian HSN and SAC codes with official GST slabs (3%, 5%, 12%, 18%, 28%) and load directly into our free GST Invoice Maker.",
    keywords: "hsn code list with gst rate india, sac code 998314 software services, hsn sac finder tool",
    canonical: "https://www.prajyotinfotech.in/tools/hsn-sac-finder",
    h1: "HSN & SAC Code GST Rate Finder India",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Search HSN goods and SAC service codes (like SAC 998314 for software engineering) and send any item straight to our <a href="/tools/gst-invoice-generator">Free GST Invoice Generator</a>.</p>`,
  },
  {
    path: "tools/legal-policy-generator",
    title: "Free Privacy Policy, Terms & Refund Generator (Razorpay KYC Ready India) | Prajyot Infotech",
    description: "Generate ready-to-publish Privacy Policy, Terms & Conditions, Refund Policy & Shipping pages compliant for Razorpay KYC and Google Play Store.",
    keywords: "privacy policy generator razorpay india, refund policy maker ecommerce, play store privacy policy generator free",
    canonical: "https://www.prajyotinfotech.in/tools/legal-policy-generator",
    h1: "Free Website & App Legal Policy Generator (India)",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Generate Privacy Policy, Terms of Service, Refund/Cancellation, and Shipping policies formatted for Indian DPDPA, Razorpay KYC, and Google Play Store.</p>`,
  },
  {
    path: "tools/salary-slip-generator",
    title: "Free Salary Slip Generator India (Payslip PDF Maker) | Prajyot Infotech",
    description: "Create & print official Indian employee salary slips online free. Auto calculates Gross Pay, PF, Professional Tax, TDS & Net Salary in words.",
    keywords: "free salary slip generator india, employee payslip pdf maker, online payslip format india",
    canonical: "https://www.prajyotinfotech.in/tools/salary-slip-generator",
    h1: "Free Employee Salary Slip (Payslip) Generator PDF",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Generate A4 printable Indian monthly salary slips with Basic, HRA, PF, PT, TDS deductions and Net Pay in Rupees words.</p>`,
  },
  {
    path: "tools/purchase-order-generator",
    title: "Free Purchase Order (PO) & Delivery Challan Generator PDF India | Prajyot Infotech",
    description: "Create A4 Purchase Orders and Rule-55 Delivery Challans online free. Ideal for Indian manufacturers, traders, and contractors with HSN tracking.",
    keywords: "free purchase order generator india, delivery challan pdf maker, manufacturing po maker free",
    canonical: "https://www.prajyotinfotech.in/tools/purchase-order-generator",
    h1: "Free Purchase Order & Delivery Challan Generator",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Generate A4 Purchase Orders and Delivery Challans for factories, suppliers, and site warehouses with HSN and GST breakdowns.</p>`,
  },
  {
    path: "compare/zoho-vs-custom-software",
    title: "Zoho / SaaS Per-Seat Subscriptions vs Custom ERP Cost Calculator 2026 | Prajyot Infotech",
    description: "Calculate your 5-year Zoho CRM / SaaS per-user subscription spend vs owning bespoke custom business software with ₹0/seat licensing.",
    keywords: "zoho vs custom software india, saas vs custom erp calculator, zoho alternative zero seat fee",
    canonical: "https://www.prajyotinfotech.in/compare/zoho-vs-custom-software",
    h1: "SaaS Per-Seat Subscriptions vs Custom Owned Software",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Compare recurring 5-year per-user SaaS subscription costs against building once and owning 100% source code on Day 1.</p>`,
  },
  {
    path: "compare/shopify-vs-custom-ecommerce",
    title: "Shopify vs Custom E-Commerce Storefront India (2026 Guide) | Prajyot Infotech",
    description: "Compare Shopify monthly app stacks and transaction fees vs ultra-fast custom React storefronts with direct Razorpay UPI and WhatsApp commerce.",
    keywords: "shopify vs custom ecommerce india, d2c storefront development pune, custom ecommerce vs shopify",
    canonical: "https://www.prajyotinfotech.in/compare/shopify-vs-custom-ecommerce",
    h1: "Shopify vs Custom D2C E-Commerce Storefront",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Why scaling luxury and D2C Indian brands outgrow heavy Shopify plugin stacks for custom sub-second storefronts.</p>`,
  },
  {
    path: "solutions/mobile-shop-pos-software",
    title: "Mobile Shop POS, Serialized IMEI Tracking & GST Billing Software | Prajyot Infotech",
    description: "Retail POS and 15-digit IMEI barcode tracking software for mobile and electronics stores in India. Repair job cards, GST thermal print & WhatsApp receipts.",
    keywords: "mobile shop billing software imei, electronics store pos india, repair job card software",
    canonical: "https://www.prajyotinfotech.in/solutions/mobile-shop-pos-software",
    h1: "Mobile Shop POS & Serialized IMEI Billing System",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Eliminate handwritten IMEI ledgers with barcode checkout, automated GST thermal receipts, and repair job card tracking.</p>`,
  },
  {
    path: "solutions/restaurant-qr-kds-software",
    title: "Restaurant QR Table Ordering & Live Kitchen Display System (KDS) | Prajyot Infotech",
    description: "Boost table turnover by 35% with zero-commission table QR menus synced live to chef Kitchen Display Tablets (KDS) and automated WhatsApp bills.",
    keywords: "restaurant qr ordering system india, kitchen display system kds software, restaurant pos pune",
    canonical: "https://www.prajyotinfotech.in/solutions/restaurant-qr-kds-software",
    h1: "Restaurant QR Table Menus & Live Kitchen Display (KDS)",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Scan-and-order table QR progressive web menus synced live to Kitchen Display Systems with split GST billing.</p>`,
  },
  {
    path: "solutions/manufacturing-bom-erp",
    title: "Manufacturing Plant ERP, BOM, Barcode Inventory & Tally Sync | Prajyot Infotech",
    description: "Bespoke factory ERP engineered for Indian MIDC manufacturers: multi-stage BOM, raw material GRN, barcode tracking & automated Tally Prime XML sync.",
    keywords: "manufacturing erp software india, bill of materials software pune, chakan midc factory erp",
    canonical: "https://www.prajyotinfotech.in/solutions/manufacturing-bom-erp",
    h1: "Custom Manufacturing Plant ERP & Shop-Floor BOM",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Unify Purchase Orders, Gate GRN, multi-level BOM, scrap tracking, and automated Tally voucher syncing.</p>`,
  },
  {
    path: "articles/website-development-cost-pune-india",
    title: "Website Development Cost in Pune & India (2026–2027 Breakdown) — Prajyot Infotech",
    description: "Transparent cost guide for corporate websites, Razorpay stores, and custom SaaS portals in Pune and India.",
    keywords: "website development cost pune india, website price india 2026",
    canonical: "https://www.prajyotinfotech.in/articles/website-development-cost-pune-india",
    h1: "Website Development Cost in Pune & India (2026–2027 Guide)",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Explore transparent website budgets or run our <a href="/estimate">Interactive Cost Estimator</a>.</p>`,
  },
  {
    path: "articles/razorpay-meta-whatsapp-kyc-checklist",
    title: "Razorpay & Meta WhatsApp Cloud API KYC Checklist for Indian Startups — Prajyot Infotech",
    description: "Pass payment gateway and Meta WhatsApp verification fast with required Privacy, Terms, Refund, and GST compliance pages.",
    keywords: "razorpay kyc checklist india, meta whatsapp business api verification india",
    canonical: "https://www.prajyotinfotech.in/articles/razorpay-meta-whatsapp-kyc-checklist",
    h1: "Razorpay & Meta WhatsApp Cloud API KYC Checklist",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Generate all 4 mandatory gateway KYC policy pages instantly with our <a href="/tools/legal-policy-generator">Legal Policy Generator</a>.</p>`,
  },
  {
    path: "articles/barcode-imei-inventory-retail-guide",
    title: "Barcode & Serialized IMEI Inventory Software Guide for Mobile Stores — Prajyot Infotech",
    description: "How mobile and electronics stores slash billing queues from 10 minutes to 45 seconds using IMEI scanning and automated WhatsApp GST invoices.",
    keywords: "imei barcode inventory software guide, mobile shop billing software india",
    canonical: "https://www.prajyotinfotech.in/articles/barcode-imei-inventory-retail-guide",
    h1: "Barcode & Serialized IMEI Inventory Guide for Electronics Retail",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Explore serialized POS features or create GST invoices with our <a href="/tools/gst-invoice-generator">Free GST Invoice Maker</a>.</p>`,
  },
  {
    path: "articles/restaurant-qr-ordering-kds-roi",
    title: "Restaurant QR Table Menus & Kitchen Display Systems: Eliminate Lost KOTs — Prajyot Infotech",
    description: "Increase table turnaround speed by 35% using scan-to-order QR menus connected to Kitchen Display Tablets.",
    keywords: "restaurant qr ordering roi, kitchen display system kds india",
    canonical: "https://www.prajyotinfotech.in/articles/restaurant-qr-ordering-kds-roi",
    h1: "Restaurant QR Table Menus & Kitchen Display Systems ROI",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Create table payment QRs fast with our <a href="/tools/upi-qr-generator">UPI QR Generator</a>.</p>`,
  },
  {
    path: "articles/chakan-midc-manufacturing-erp-guide",
    title: "How MIDC Manufacturing Units Eliminate Margin Leakage with Shop-Floor BOM ERP — Prajyot Infotech",
    description: "Unify Purchase Orders, GRN, BOM, and Tally Prime sync for Chakan & Bhosari MIDC automotive and fabrication units.",
    keywords: "chakan midc manufacturing erp, plant bom erp software india",
    canonical: "https://www.prajyotinfotech.in/articles/chakan-midc-manufacturing-erp-guide",
    h1: "How MIDC Factories Eliminate Margin Leakage with Shop-Floor BOM ERP",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Generate factory orders using our <a href="/tools/purchase-order-generator">Purchase Order & Delivery Challan Maker</a>.</p>`,
  },
  {
    path: "articles/react-nextjs-vs-wordpress-speed-india",
    title: "React vs WordPress Speed Benchmark on Indian 4G Mobile Networks — Prajyot Infotech",
    description: "Real Core Web Vitals speed comparison between heavy Elementor WordPress builds and custom sub-second React apps over Indian 4G.",
    keywords: "react vs wordpress speed test india, core web vitals 4g benchmark",
    canonical: "https://www.prajyotinfotech.in/articles/react-nextjs-vs-wordpress-speed-india",
    h1: "React vs WordPress Speed Benchmark on Indian 4G Mobile Networks",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Benchmark your live domain right now with our <a href="/tools/website-tech-checker">Free Speed & Tech Stack Inspector</a>.</p>`,
  },
  {
    path: "tools/gst-profit-calculator",
    title: "India GST & Profit Margin Calculator Online (Add / Remove GST) | Prajyot Infotech",
    description: "Instant Indian GST calculator for all tax slabs (3%, 5%, 12%, 18%, 28%). Calculate CGST, SGST, IGST split plus net profit margin and markup percentages.",
    keywords: "gst calculator india, reverse gst calculator online, profit margin calculator india, cgst sgst igst calculator",
    canonical: "https://www.prajyotinfotech.in/tools/gst-profit-calculator",
    h1: "India GST & Profit Margin Calculator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Add or remove GST across 0%, 3%, 5%, 12%, 18%, and 28% Indian tax slabs, split CGST + SGST vs IGST automatically, and check exact product profit margins.
      </p>
    `,
  },
  {
    path: "tools/business-emi-calculator",
    title: "MSME Business Loan EMI Calculator & Prepayment Planner India | Prajyot Infotech",
    description: "Calculate exact monthly EMI, reducing-balance interest, and prepayment savings for MSME loans, factory machinery finance, and working capital credit.",
    keywords: "business loan emi calculator india, msme loan emi prepayment calculator, machinery loan emi calculator, mudra loan emi marathi",
    canonical: "https://www.prajyotinfotech.in/tools/business-emi-calculator",
    h1: "MSME Business Loan & Prepayment EMI Calculator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Plan MSME, Mudra, or machinery finance EMIs, inspect year-by-year principal and interest amortization, and simulate prepayment savings in ₹.
      </p>
    `,
  },
  {
    path: "tools/break-even-calculator",
    title: "Break-Even Point & D2C Unit Economics Calculator India | Prajyot Infotech",
    description: "Find exact monthly sales needed to break even after Indian GST, Razorpay 2% gateway charges, shipping, and Meta Ad CAC. Built for Indian D2C brands & retail startups.",
    keywords: "break even calculator india, d2c unit economics calculator, roas profit calculator india, ecommerce margin calculator inr",
    canonical: "https://www.prajyotinfotech.in/tools/break-even-calculator",
    h1: "Break-Even & Indian D2C Unit Economics Calculator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Calculate monthly break-even order volume, contribution margin per unit, safe Meta Ad CAC, and net profit forecasts after Indian GST and payment gateway fees.
      </p>
    `,
  },
  {
    path: "tools/nda-agreement-generator",
    title: "Free Mutual NDA & Software IP Ownership Generator India | Prajyot Infotech",
    description: "Draft clean Indian Mutual Non-Disclosure Agreements (NDA) and 100% Source Code IP Assignment clauses ready for founders, freelancers & software agencies.",
    keywords: "mutual nda format india, software ip ownership agreement generator, startup nda template india, developer source code agreement",
    canonical: "https://www.prajyotinfotech.in/tools/nda-agreement-generator",
    h1: "Mutual NDA & Software IP Ownership Generator",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Create clean printable Mutual Non-Disclosure Agreements and source code IP assignment terms under Indian jurisdiction without signup.
      </p>
    `,
  },
  {
    path: "demo/restaurant-qr-kds",
    title: "Restaurant QR Ordering & Kitchen Display (KDS) Live Interactive Demo | Prajyot Infotech",
    description: "Test-drive our live restaurant QR table ordering simulator connected directly to a real-time Kitchen Display Screen (KDS) and WhatsApp bill dispatch.",
    keywords: "restaurant qr ordering demo, kitchen display system kds demo, cafe pos live demo india, restaurant billing software pune",
    canonical: "https://www.prajyotinfotech.in/demo/restaurant-qr-kds",
    h1: "Interactive Restaurant QR Menu & Kitchen Display (KDS) Live Demo",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Add dishes on the customer table QR view and watch instant KOT tickets arrive on the live Kitchen Display Screen terminal in real time.
      </p>
    `,
  },
  {
    path: "demo/mobile-shop-imei-pos",
    title: "Mobile Shop IMEI Barcode POS & GST Billing Live Interactive Demo | Prajyot Infotech",
    description: "Try our live retail IMEI barcode billing simulator built for smartphone stores and multi-brand electronics counters in India. Generate instant GST tax invoices.",
    keywords: "mobile shop billing software demo, imei serial number pos demo india, electronics retail gst software pune",
    canonical: "https://www.prajyotinfotech.in/demo/mobile-shop-imei-pos",
    h1: "Mobile Shop Serialized IMEI POS & GST Billing Live Demo",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Select serialized IMEI handsets, assign customer billing details, and simulate 45-second GST invoicing with WhatsApp PDF receipt delivery.
      </p>
    `,
  },
  {
    path: "demo/boutique-ecommerce",
    title: "Custom Boutique E-Commerce & Bridal Configurator Live Demo (SAGYA Case Study) | Prajyot Infotech",
    description: "Interact with our luxury apparel e-commerce storefront simulator featuring custom tailoring flows, high-speed catalog browsing, and instant WhatsApp stylist routing.",
    keywords: "custom boutique ecommerce demo, bridal clothing store software india, luxury apparel website demo, shopify alternative india demo",
    canonical: "https://www.prajyotinfotech.in/demo/boutique-ecommerce",
    h1: "Luxury Ethnic Couture & Bespoke E-Commerce Live Demo",
    content: `
      <p style="font-size:18px;line-height:1.6;color:#334155;max-width:850px;margin-bottom:32px;">
        Browse interactive luxury collections, manage wishlists, and test bespoke boutique WhatsApp stylist consultations powered by custom React architecture.
      </p>
    `,
  },
  {
    path: "software-company-in-nashik",
    title: "Smart Web Development & Factory ERP Solutions in Nashik — Prajyot Infotech",
    description: "Custom web portals, winery booking software, agro-export traceability, and Ambad/Satpur MIDC factory ERPs built by Prajyot Infotech for Nashik enterprises.",
    keywords: "software company nashik, web development nashik, ambad satpur midc erp nashik, factory software nashik",
    canonical: "https://www.prajyotinfotech.in/software-company-in-nashik",
    h1: "Smart Web Development & Factory ERP Solutions in Nashik",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Custom quality &amp; production ERPs for Ambad and Satpur MIDC plants plus hospitality booking systems in Nashik.</p>`,
  },
  {
    path: "software-company-in-nagpur",
    title: "Logistics Software, E-Commerce & Web Development in Nagpur — Prajyot Infotech",
    description: "3PL fleet dispatch, warehouse barcode inventory, hospital portals, and wholesale B2B web software built for Nagpur, MIHAN & Butibori enterprises.",
    keywords: "software company nagpur, logistics software nagpur mihan, warehouse erp butibori nagpur",
    canonical: "https://www.prajyotinfotech.in/software-company-in-nagpur",
    h1: "Logistics Software, Warehouse ERP & Web Development in Nagpur",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Engineering cloud logistics bilty portals, Hingna/Butibori warehouse inventory systems, and multi-branch ERPs in Nagpur.</p>`,
  },
  {
    path: "software-company-in-aurangabad",
    title: "Industrial Software, ERP & Web Platforms in Aurangabad (Chhatrapati Sambhajinagar) — Prajyot Infotech",
    description: "Industrial ERP, pharma batch tracking, and Waluj/AURIC MIDC digital maintenance systems engineered for Chhatrapati Sambhajinagar businesses.",
    keywords: "software company aurangabad, chhatrapati sambhajinagar software company, waluj midc erp, auric software",
    canonical: "https://www.prajyotinfotech.in/software-company-in-aurangabad",
    h1: "Industrial Software, ERP & Web Platforms in Chhatrapati Sambhajinagar",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Shop-floor OEE dashboards, maintenance QR portals, and Tally-synced billing for Waluj, Chikalthana &amp; Shendra MIDC.</p>`,
  },
  {
    path: "software-company-in-thane",
    title: "Modern Web Applications & Real Estate CRMs in Thane — Prajyot Infotech",
    description: "Real estate lead routing CRMs, clinic booking portals, and corporate web applications for Wagle Estate and Ghodbunder businesses in Thane.",
    keywords: "software company thane, web development wagle estate thane, real estate crm thane",
    canonical: "https://www.prajyotinfotech.in/software-company-in-thane",
    h1: "Modern Web Applications & Real Estate Portals in Thane",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Conversion-engineered websites, clinic portals, and automated WhatsApp lead CRMs serving Thane and Wagle Estate.</p>`,
  },
  {
    path: "articles/msme-gst-billing-quotation-guide-marathi-hindi",
    title: "GST Bill, Quotation & UPI QR Guide for Maharashtra SMBs (English + मराठी + हिंदी) — Prajyot Infotech",
    description: "Free multilingual guide to GST invoices, quotation PDF formats, and fixed-amount UPI QR standees for shopkeepers and factories across Pune, Nashik & Maharashtra.",
    keywords: "marathi gst bill format, marathi quotation format pdf, hindi gst invoice guide, maharashtra smb billing guide",
    canonical: "https://www.prajyotinfotech.in/articles/msme-gst-billing-quotation-guide-marathi-hindi",
    h1: "GST Bill, Quotation & UPI QR Guide for Maharashtra SMBs (Marathi & Hindi)",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Practical billing &amp; UPI workflow guide in English, Marathi, and Hindi linked directly to our free zero-login A4 PDF tools.</p>`,
  },
  {
    path: "articles/india-d2c-break-even-razorpay-fees-shopify-vs-custom",
    title: "Indian D2C Break-Even Math: Payment Fees, GST, RTO & Platform Costs — Prajyot Infotech",
    description: "Calculate true contribution margin per order after GST extraction, 2% payment gateway cuts, shipping, and Ad CAC for Indian D2C brands.",
    keywords: "india d2c break even guide, razorpay fees margin math, shopify vs custom store margin",
    canonical: "https://www.prajyotinfotech.in/articles/india-d2c-break-even-razorpay-fees-shopify-vs-custom",
    h1: "Indian D2C Break-Even Math: Payment Fees, GST & ROAS Economics",
    content: `<p style="font-size:18px;line-height:1.6;color:#334155;">Run live INR contribution margin scenarios using our free Break-Even Calculator.</p>`,
  },

];

const SITE_URL = "https://www.prajyotinfotech.in";
const OG_IMAGE_MAP = {
  "tools": "/og/og-tools.jpg",
  "tools/gst-invoice-generator": "/og/og-gst-invoice.jpg",
  "tools/quotation-generator": "/og/og-quotation.jpg",
  "tools/upi-qr-generator": "/og/og-upi-qr.jpg",
  "tools/hsn-sac-finder": "/og/og-hsn-finder.jpg",
  "tools/whatsapp-link-generator": "/og/og-whatsapp-qr.jpg",
  "tools/gst-profit-calculator": "/og/og-gst-profit.jpg",
  "tools/business-emi-calculator": "/og/og-business-emi.jpg",
  "tools/break-even-calculator": "/og/og-break-even.jpg",
  "tools/nda-agreement-generator": "/og/og-nda-agreement.jpg",
  "tools/website-tech-checker": "/og/og-tech-checker.jpg",
  "tools/app-cost-calculator": "/og/og-app-cost.jpg",
  "tools/salary-slip-generator": "/og/og-salary-slip.jpg",
  "tools/purchase-order-generator": "/og/og-purchase-order.jpg",
  "tools/legal-policy-generator": "/og/og-legal-policy.jpg",
  "tools/construction-leakage-calculator": "/og/og-construction-calc.jpg",
  "resources/software-rfp-template": "/og/og-tools.jpg",
  "free-business-tech-audit": "/og/og-audit.jpg",
};

function resolveOgImage(routePath) {
  if (OG_IMAGE_MAP[routePath]) return `${SITE_URL}${OG_IMAGE_MAP[routePath]}`;
  if (routePath.startsWith("demo/")) return `${SITE_URL}/og/og-demos.jpg`;
  if (routePath.startsWith("compare/")) return `${SITE_URL}/og/og-compare.jpg`;
  if (routePath.startsWith("solutions/")) return `${SITE_URL}/og/og-solutions.jpg`;
  return `${SITE_URL}/og/og-default.jpg`;
}

function buildRouteJsonLd(route) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: route.h1, item: route.canonical },
    ],
  };

  if (route.path.startsWith("tools/") || route.path.startsWith("demo/")) {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: route.h1,
        url: route.canonical,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        description: route.description,
      },
    ];
  }

  if (route.path.startsWith("articles/")) {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: route.h1,
        url: route.canonical,
        description: route.description,
        publisher: { "@type": "Organization", name: "Prajyot Infotech", url: SITE_URL },
      },
    ];
  }

  if (route.path.startsWith("solutions/")) {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: route.h1,
        url: route.canonical,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description: route.description,
      },
    ];
  }

  if (route.path.startsWith("software-company-in-") || route.path.startsWith("services/")) {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: route.h1,
        url: route.canonical,
        description: route.description,
        provider: { "@type": "Organization", name: "Prajyot Infotech", "@id": `${SITE_URL}/#organization` },
      },
    ];
  }

  return [breadcrumb];
}

console.log(`Starting static HTML prerendering for ${ROUTES.length} routes...`);

let count = 0;
for (const route of ROUTES) {
  let html = baseTemplate;
  const ogImg = resolveOgImage(route.path);

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

  // 5. Replace Open Graph & custom OG image
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
  html = html.replace(
    /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:image" content="${ogImg}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:image:secure_url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${ogImg}" />`
  );

  // 6. Replace Twitter Card & image
  html = html.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:image" content="${ogImg}" />`
  );

  // 6b. Inject route-specific static JSON-LD schemas for zero-JS crawlers
  const routeSchemas = buildRouteJsonLd(route);
  const schemaTags = routeSchemas
    .map((s) => `<script type="application/ld+json" data-prerender-ld="true">${JSON.stringify(s)}</script>`)
    .join("\n    ");
  html = html.replace(/<\/head>/i, `    ${schemaTags}\n  </head>`);

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
