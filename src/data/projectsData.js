export const PROJECTS = [
  {
    id: "restaurant-management",
    tag: "Hospitality",
    tagColor: "from-orange-400 to-red-500",
    year: 2025,
    title: "Restaurant Management System",
    client: "Copper Chimney & Urban Spice",
    shortDesc: "Complete digital restaurant — QR table menus, live kitchen display screen (KDS), split billing, and automated WhatsApp receipts.",
    fullDesc: "A full-stack restaurant management platform that digitizes the entire dining experience. Guests scan a table QR code, browse high-res live menus, and place orders directly without waiting for waiters. Orders stream instantly to a chef KDS. Managers control item availability, real-time GST billing, and customer analytics from a central admin panel.",
    architecture: "Event-Driven WebSockets + PWA Client",
    problem: {
      title: "Wait Time Chaos & Lost Paper Tickets",
      description: "During weekend rush hours, waitstaff was overwhelmed, handwriting handwritten KOT slips that frequently got lost or delayed by 25+ minutes.",
      painQuote: "We were losing angry customers who waited 40 minutes just for drinks and starters."
    },
    solution: {
      title: "Realtime QR Table Ordering + Live Chef KDS",
      description: "Engineered zero-download PWA table ordering synchronized directly with kitchen display tablets via WebSockets and automated WhatsApp bill dispatch."
    },
    roi: {
      title: "35% Faster Turnover & 0% Lost Tickets",
      description: "Eliminated paper slips entirely, reduced waiter staffing overhead by 2 people per shift, and cut table turn time from 45 min down to 29 min."
    },
    results: ["Order errors reduced to 0%", "Table turnover improved 35%", "Staff reduced by 2 per shift", "WhatsApp order receipts automated"],
    features: ["QR code table menus", "Live kitchen display screen", "WhatsApp order confirmations", "Admin panel with item toggle", "GST billing & reports", "Multi-branch support"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp Cloud API", "Razorpay", "TailwindCSS"],
    metrics: { label: "Table Turnover Speed", value: "+35%", sub: "45 min down to 29 min" },
    gradient: "from-orange-500/20 via-red-400/10 to-transparent",
    accent: "#f97316",
    secondary: "#ef4444",
    mockupType: "Tablet",
    scale: "14 Branches • 1,500+ Daily Orders",
  },
  {
    id: "mobile-shop-management",
    tag: "Retail",
    tagColor: "from-blue-400 to-indigo-500",
    year: 2025,
    title: "Mobile Shop POS & IMEI Billing System",
    client: "Shree Samarth Mobiles & Retailers",
    shortDesc: "End-to-end POS for electronics retailers — barcode/IMEI tracking, repair tracking job cards, GST billing, and WhatsApp follow-ups.",
    fullDesc: "A complete business management suite for mobile phone and electronics retailers. Handles new phone sales with serialized IMEI tracking, repair job cards with status alerts, GST billing with instant PDF export, inventory alerts, and customer follow-up via WhatsApp.",
    architecture: "Micro-Service REST API + Thermal Print Engine",
    problem: {
      title: "Manual IMEI Logging & Inventory Leakage",
      description: "Handwriting 15-digit IMEI serial numbers on physical carbon-copy bills caused 10-minute queues and untracked inventory mismatch.",
      painQuote: "Customer checkout lines stretched out the door during festive seasons, causing lost sales."
    },
    solution: {
      title: "Instant Barcode/IMEI Scanner & Auto GST Generator",
      description: "Deployed high-speed USB barcode scanner integration with instant thermal/PDF GST invoicing and automated WhatsApp PDF receipt delivery."
    },
    roi: {
      title: "Billing Time Cut from 10m to 45s",
      description: "Achieved 100% zero inventory discrepancies across 50,000+ units tracked and improved repeat repair service rate by 22%."
    },
    results: ["Billing time cut from 10 min to 45 sec", "Zero inventory discrepancies", "Repair jobs tracked end-to-end", "Customer repeat rate improved 22%"],
    features: ["IMEI-based sales & stock tracking", "Repair job card management", "GST billing with PDF export", "Customer WhatsApp follow-ups", "Vendor & purchase management", "Dashboard with daily/monthly reports"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Cloudinary"],
    metrics: { label: "Billing Time Reduced", value: "90%", sub: "from 10 min to under 45s" },
    gradient: "from-blue-500/20 via-indigo-400/10 to-transparent",
    accent: "#6366f1",
    secondary: "#3b82f6",
    mockupType: "Phone",
    scale: "50,000+ IMEIs Tracked • High Volume POS",
  },
  {
    id: "jollybaba-ecommerce",
    tag: "E-Commerce",
    tagColor: "from-emerald-400 to-teal-500",
    year: 2024,
    title: "JollyBaba Mobiles — B2B & B2C Store",
    client: "JollyBaba Electronics Network",
    shortDesc: "Electronics e-commerce with dual dealer/retail pricing, fuzzy search, cart drawer, and WhatsApp order fallback.",
    fullDesc: "A high-performance e-commerce storefront for an electronics retailer. Supports dual pricing (retail vs. dealer wholesale) toggled seamlessly based on authenticated user tier, typo-tolerant search, animated slide-out cart, Razorpay gateway, and a 1-click WhatsApp order fallback for regional buyers.",
    architecture: "Edge Cached Serverless + Fuzzy Search Engine",
    problem: {
      title: "Wholesale Dealers Calling Manually for Stock",
      description: "Hundreds of regional dealers called phone lines daily just to ask for wholesale rates and stock availability.",
      painQuote: "We spent 5 hours every single day answering repetitive price questions on phone calls."
    },
    solution: {
      title: "Role-Authenticated Dynamic B2B/B2C Storefront",
      description: "Built tiered role pricing with MOQ enforcement, instant typo-tolerant instant search, and automated 1-click WhatsApp ordering fallback."
    },
    roi: {
      title: "28% Conversion Surge & 100% Automated Ordering",
      description: "Wholesale dealers now order bulk stock directly through their VIP portal 24/7 without needing phone assistance."
    },
    results: ["Search CTR up 28%", "Cart abandonment down 18%", "Dealer orders fully automated", "5,000+ SKUs searchable instantly"],
    features: ["Retail & dealer price toggle", "Fuzzy search with typo fix", "Animated cart with WhatsApp fallback", "Razorpay/UPI checkout", "Bulk CSV product import", "Cloudinary image hosting"],
    stack: ["React", "React Native", "Node.js", "MongoDB", "Razorpay", "TailwindCSS"],
    metrics: { label: "Search Conversion Rate", value: "+28%", sub: "instant typo-tolerant catalog" },
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    accent: "#10b981",
    secondary: "#14b8a6",
    mockupType: "Phone",
    scale: "12,000+ Active Users • 5,000+ Annual Orders",
  },
  {
    id: "clinic-management",
    tag: "Healthcare",
    tagColor: "from-rose-400 to-pink-500",
    year: 2024,
    title: "Lifeline Clinic & Doctor EHR SaaS",
    client: "Lifeline Multispeciality Clinics",
    shortDesc: "Electronic health records (EHR), token calendar booking, digital prescription generator, and automated WhatsApp appointment reminders.",
    fullDesc: "A HIPAA-compliant clinical management platform for outpatient clinics and medical practitioners. Manages patient registration, digital medical histories, appointment scheduling, digital prescription generation with PDF export, and automated WhatsApp appointment reminders.",
    architecture: "HIPAA-Aware PostgreSQL + Queue Worker",
    problem: {
      title: "30% Patient No-Shows & Paper Record Loss",
      description: "Patients regularly forgot routine follow-ups, and physical paper prescription files were constantly misplaced in physical cabinets.",
      painQuote: "Doctor time was wasted when booked slots went empty with zero advance notice."
    },
    solution: {
      title: "Automated WhatsApp Token Bus & Digital EHR",
      description: "Engineered automated 24-hour and 2-hour pre-appointment WhatsApp reminders with digital prescription PDF creation in under 60 seconds."
    },
    roi: {
      title: "40% Drop in Missed Appointments",
      description: "Eliminated clinic no-shows, transitioned to 100% paperless medical histories across 8 multispeciality branches."
    },
    results: ["No-show rate reduced 40%", "Prescription time cut to 90 sec", "Patient records instantly searchable", "WhatsApp reminders automated"],
    features: ["Patient profile & medical history", "Appointment booking calendar", "Prescription generator with PDF", "Automated WhatsApp reminders", "Consultation & medicine billing", "Doctor-wise reports"],
    stack: ["React", "Node.js", "PostgreSQL", "WhatsApp Cloud API", "Firebase Auth"],
    metrics: { label: "Patient No-Show Rate", value: "-40%", sub: "via automated WhatsApp queue" },
    gradient: "from-rose-500/20 via-pink-400/10 to-transparent",
    accent: "#f43f5e",
    secondary: "#ec4899",
    mockupType: "Tablet",
    scale: "8 Clinics • 28,000+ Consultations",
  },
  {
    id: "vyapaariyo-saas",
    tag: "SaaS",
    tagColor: "from-violet-400 to-purple-500",
    year: 2024,
    title: "Vyapaariyo — B2B Multi-Tenant SaaS",
    client: "Vyapaariyo Enterprise Cloud",
    shortDesc: "Multi-tenant B2B SaaS where wholesale sellers get their own branded catalog portal with custom subdomains, logo, and dealer pricing.",
    fullDesc: "A cloud platform where every registered merchant gets an isolated catalog website — complete with custom brand colors, product listings, wholesale pricing tiers, and custom subdomains. Merchants bulk-import products via CSV and manage lead enquiries.",
    architecture: "Multi-Tenant Isolated DB Schemas + S3",
    problem: {
      title: "High Development Costs for Small Wholesalers",
      description: "Wholesale suppliers could not afford ₹2L+ to build custom e-commerce portals, keeping them offline and invisible to regional buyers.",
      painQuote: "Suppliers wanted their own branded domain without having to manage servers or databases."
    },
    solution: {
      title: "Multi-Tenant Cloud Engine with Isolated DBs",
      description: "Built automated subdomain provisioning (`tenant.vyapaariyo.com`) with independent catalog isolation, bulk CSV upload, and automated lead capture."
    },
    roi: {
      title: "50+ Merchants Live in 30 Days",
      description: "Suppliers launch full custom catalog portals in under 3 minutes with zero cloud management overhead."
    },
    results: ["50+ merchants onboarded in month 1", "Merchant setup time under 3 min", "Zero hosting overhead per tenant", "Bulk CSV import with images"],
    features: ["Multi-tenant architecture", "Per-seller custom catalog site", "CSV bulk product import", "Cloudinary image hosting", "Role-based admin & seller access", "Subscription billing"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "TailwindCSS"],
    metrics: { label: "Tenant Onboarding Time", value: "< 3 min", sub: "from signup to live custom domain" },
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
    accent: "#8b5cf6",
    secondary: "#a855f7",
    mockupType: "Dashboard",
    scale: "60+ Merchant Portals • 180,000+ SKUs",
  },
  {
    id: "wholesale-order-management",
    tag: "Wholesale",
    tagColor: "from-amber-400 to-yellow-500",
    year: 2025,
    title: "Wholesale Distribution & Logistics ERP",
    client: "Maharashtra FMCG Distributors",
    shortDesc: "High-volume wholesale order tracking with multi-warehouse inventory, GST billing, party ledgers, and delivery vehicle dispatch.",
    fullDesc: "A robust order management system for FMCG and wholesale distributors handling 500+ orders per day. Tracks orders from placement to dispatch, manages multi-warehouse stock, generates GST-compliant e-way bills, maintains party-wise ledgers, and sends delivery updates via WhatsApp.",
    architecture: "High-Throughput Ledger Engine + Redis Queue",
    problem: {
      title: "Multi-Warehouse Stock Mismatch & Dispatch Delay",
      description: "Distributors with 12 warehouses suffered from phantom stockouts and manual calculation errors on party credit limits.",
      painQuote: "Drivers often reached retail shops only to discover the ordered items were out of stock at that warehouse."
    },
    solution: {
      title: "Centralized Real-Time ACID Ledger & Vehicle Dispatch",
      description: "Created live multi-location stock synchronization with automated e-way bill generation and driver route confirmation."
    },
    roi: {
      title: "500+ Daily Orders with 0% Calculation Error",
      description: "Cut invoice turnaround from 4 minutes to under 25 seconds and eliminated cross-warehouse inventory discrepancies."
    },
    results: ["500+ orders/day managed smoothly", "Invoice generation under 25 sec", "Zero ledger calculation discrepancies", "Delivery confirmation automated"],
    features: ["Party & vendor ledger management", "Multi-warehouse inventory", "GST invoice & e-way bill", "Delivery tracking & confirmation", "Daily sales & outstanding reports", "WhatsApp delivery alerts"],
    stack: ["React", "Node.js", "PostgreSQL", "WhatsApp API", "Redis", "Razorpay"],
    metrics: { label: "Daily Orders Handled", value: "500+", sub: "zero manual ledger errors" },
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    accent: "#f59e0b",
    secondary: "#eab308",
    mockupType: "Dashboard",
    scale: "Enterprise Wholesale Logistics • 12 Warehouses",
  },
  {
    id: "coaching-management",
    tag: "Education",
    tagColor: "from-sky-400 to-cyan-500",
    year: 2025,
    title: "EduPulse Coaching & Student LMS",
    client: "Pioneer Science & JEE Academies",
    shortDesc: "Student enrollment portal, digital RFID attendance, automated fee collection reminders, and WhatsApp parent communication.",
    fullDesc: "A complete management system for coaching centers and educational institutes. Handles student admissions, batch scheduling, digital attendance tracking, fee collection with automated UPI links, exam marks entry, and report card generation.",
    architecture: "Realtime Parent Notification Bus + Cloud Storage",
    problem: {
      title: "Uncollected Student Fees & Parent Anxiety",
      description: "Admin staff spent hundreds of hours manually calling parents for pending term fees, while attendance took 15 minutes of every lecture.",
      painQuote: "Unpaid dues accumulated simply because parents forgot quarterly installment due dates."
    },
    solution: {
      title: "Digital Attendance + 1-Click WhatsApp Fee Reminders",
      description: "Automated instant arrival notifications to parents and delivered 1-click UPI payment links on WhatsApp with auto-reconciled receipts."
    },
    roi: {
      title: "100% Timely Fee Collection & 0 Admin Delays",
      description: "Recovered 100% of pending fee dues on time and freed teachers to focus purely on academic instruction."
    },
    results: ["Fee collection automated 100%", "Attendance tracking real-time", "Parent communication automated", "Zero pending fee confusion"],
    features: ["Student enrollment & profiles", "Batch & faculty management", "Digital attendance system", "Fee collection with reminders", "Exam results & mark sheets", "WhatsApp parent updates"],
    stack: ["React", "Node.js", "MongoDB", "Firebase Auth", "WhatsApp API", "Cloudinary"],
    metrics: { label: "Fee Collection Efficiency", value: "100%", sub: "automated UPI WhatsApp alerts" },
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
    accent: "#0ea5e9",
    secondary: "#06b6d4",
    mockupType: "Phone",
    scale: "3,500+ Enrolled Students • 4 Campuses",
  },
  {
    id: "real-estate-crm",
    tag: "Real Estate",
    tagColor: "from-teal-400 to-green-500",
    year: 2024,
    title: "PrimeEstate CRM & Property Portal",
    client: "Apex Realty Developers",
    shortDesc: "Property showcase website, automated lead capture, follow-up CRM pipeline, and instant WhatsApp brochure dispatcher.",
    fullDesc: "A lead generation and deal pipeline platform for real estate developers and property consultants. The public-facing portal showcases residential & commercial properties with interactive floorplans and virtual tours. Inquiries feed directly into an automated CRM pipeline.",
    architecture: "Serverless Lead Ingestion + Webhook Triggers",
    problem: {
      title: "Cold Property Leads & Delayed Follow-Ups",
      description: "Online buyer inquiries sat in email inboxes for hours. By the time sales reps called back, the buyer had already contacted rival builders.",
      painQuote: "If you don't respond to a luxury property lead within 5 minutes, you've lost the buyer."
    },
    solution: {
      title: "90-Second WhatsApp Brochure Dispatch & Lead Scoring",
      description: "Built an automated webhook engine that dispatches floorplan PDF brochures to buyer WhatsApp immediately, alerting senior sales agents via push notifications."
    },
    roi: {
      title: "+25% Increase in Scheduled Site Visits",
      description: "Cut lead first-contact time from 4 hours down to under 90 seconds, dramatically improving buyer qualification and sales closure rates."
    },
    results: ["Lead response time under 90 sec", "Follow-up rate 100% automated", "Property listings SEO-optimized", "Conversion rate improved 25%"],
    features: ["Property listing website", "Lead capture & CRM", "WhatsApp follow-up automation", "Lead scoring & priority tags", "Site visit scheduling", "Agent performance dashboard"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp Cloud API", "Cloudinary", "TailwindCSS"],
    metrics: { label: "Lead Conversion Rate", value: "+25%", sub: "90-second instant follow-up loop" },
    gradient: "from-teal-500/20 via-green-400/10 to-transparent",
    accent: "#14b8a6",
    secondary: "#22c55e",
    mockupType: "Dashboard",
    scale: "450+ Luxury Units Sold • Premium Inventory",
  },
];

export const INDUSTRIES = ["All", "Hospitality", "Retail", "E-Commerce", "Healthcare", "SaaS", "Wholesale", "Education", "Real Estate"];
export const TECH_TAGS = ["All", "React", "Node.js", "MongoDB", "PostgreSQL", "WhatsApp API", "Razorpay", "Redis", "Cloudinary"];
