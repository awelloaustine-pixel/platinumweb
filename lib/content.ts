// All site copy lives here. Edit text without touching components.
// Copy marked "TODO: confirm" was written as a placeholder because it could not be
// pulled from the live site (accordion bodies weren't in the fetched HTML).

export const BOOKING_URL = "https://cal.com/platinummarketingagency/15min";
export const CASE_STUDY_URL = "https://bristol-spark-electrical.vercel.app/";

export const site = {
  name: "Platinum Marketing Agency",
  shortName: "Platinum",
  tagline: "We Build. You Work.",
  url: "https://platinummarketingagency.co.uk",
  description:
    "Premium websites and lead automation for UK trades businesses. Bristol-based. Live in 5 days, running 24/7 from day one.",
  keywords: [
    "websites for trades Bristol",
    "lead automation for tradespeople UK",
    "electrician website Bristol",
    "plumber website",
    "roofer website",
    "missed call text back",
    "Google reviews automation",
  ],
  phone: "07594 217753",
  phoneHref: "tel:07594217753",
  email: "helloplatinummarketing@gmail.com",
  location: "Bristol, UK",
  logo: "/platinum-logo.png", // full logo (white background) for OG / JSON-LD
  emblem: "/platinum-star.png", // transparent star cut from the logo, for dark UI
};

export const seo = {
  title: "Websites & Lead Automation for Trades in Bristol | Platinum Marketing Agency",
  description:
    "Premium websites and lead automation for UK trades — electricians, plumbers, roofers and builders. Live in 5 days, missed calls texted back in 30 seconds. Bristol-based. Book a free demo.",
  ogTitle: "We Build. You Work.",
  ogSubtitle: "Websites & lead automation for UK trades. Live in 5 days.",
  /** Bump when page content changes meaningfully (used in sitemap.xml) */
  lastUpdated: "2026-10-27",
};

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Book Free Demo", href: BOOKING_URL },
};

export const hero = {
  eyebrow: "Platinum Marketing Agency / Bristol",
  headline: ["We Build.", "You Work."],
  // Word(s) highlighted in gold
  accentWord: "Work.",
  subtext:
    "Premium websites and automation for UK trades businesses — live in 5 days, running 24/7 from day one.",
  primaryCta: { label: "See Our Work →", href: "#work" },
  secondaryCta: { label: "Book Free Demo →", href: BOOKING_URL },
  scrollCue: "Scroll",
};

export const stats = [
  { value: 91, prefix: "", suffix: "%", label: "Customers search online first" },
  { value: 5, prefix: "", suffix: " Days", label: "Average site delivery" },
  { value: 24, prefix: "", suffix: "/7", label: "Automation uptime" },
  { value: 0, prefix: "£", suffix: "", label: "Cost to book a demo" },
  { value: 30, prefix: "", suffix: " Days", label: "Notice to cancel" },
];

export const problem = {
  eyebrow: "The Problem",
  heading: "Most Trades Businesses Are Invisible Online.",
  accentWord: "Invisible",
  body: "While you're on the tools, your customers are searching Google and calling whoever shows up first. That business is getting the job. You're missing work you never knew existed.",
  points: [
    { value: "3–5", label: "missed calls every day on the tools" },
    { value: "78%", label: "of jobs go to whoever responds first" },
    { value: "£2,400", label: "lost monthly from missed leads" },
  ],
  missedCalls: [
    { name: "Unknown caller", time: "08:42" },
    { name: "07700 900412", time: "10:15" },
    { name: "Unknown caller", time: "12:03" },
    { name: "07700 900877", time: "14:31" },
  ],
};

export const solution = {
  eyebrow: "The Solution",
  heading: "One System. Every Lead Captured.",
  accentWord: "Every",
  phases: [
    {
      key: "build",
      label: "Build",
      when: "Days 1–5",
      title: "Built to Convert",
      body: "A premium animated website that looks better than any competitor in your area. Local SEO built in. Live in 5 working days.",
    },
    {
      key: "automate",
      label: "Automate",
      when: "Day 5 onwards",
      title: "Runs While You Work",
      body: "Missed calls texted back in 30 seconds. Leads followed up in 60 seconds. Reviews collected after every job. All automatic.",
    },
    {
      key: "compound",
      label: "Compound",
      when: "Month 1 onwards",
      title: "Compounds Over Time",
      body: "More reviews means higher Google ranking. Higher ranking means more calls. More calls means more jobs. All growing in the background.",
    },
  ],
  notifications: [
    { title: "Lead Captured", body: "Bristol electrician replied in 47 seconds" },
    { title: "Site Live", body: "Bristol Spark deployed in 4 days" },
    { title: "Job Won", body: "Roofer booked 3 new jobs this week" },
  ],
};

export const caseStudy = {
  eyebrow: "Built By Platinum",
  heading: "See It Working.",
  client: "Bristol Spark Electrical",
  subtitle: "NICEIC Approved Electrician",
  meta: "Trade: Electrician · Bristol, UK",
  built: "Built in 4 days",
  tags: ["Website", "Automation", "Local SEO"],
  body: "A fast, premium site for a NICEIC-approved Bristol electrician — with missed-call text-back, instant lead response and local SEO wired in from day one.", // TODO: confirm
  cta: { label: "View Live Site", href: CASE_STUDY_URL },
  outro: "Your business could be next.",
};

export const pricing = {
  eyebrow: "Investment",
  heading: "Simple Pricing. No Surprises.",
  popular: "Lead Machine",
  cta: "Get Started →",
  footnote:
    "Not sure which package? Book a free 15-minute call and we'll tell you exactly what your business needs.",
  packages: [
    {
      name: "Visibility Package",
      badge: "Entry Point",
      setup: "£750",
      monthly: "£79",
      features: [
        "Premium animated website",
        "Local SEO setup",
        "Google Business Profile optimised",
        "Contact form + instant notifications",
        "Hosting and maintenance",
        "Live in 5 working days",
      ],
    },
    {
      name: "Lead Machine",
      badge: "Best For Leads",
      setup: "£1,200",
      monthly: "£247",
      features: [
        "Everything in Visibility",
        "AI chatbot on website",
        "Missed call text-back (30 seconds)",
        "Instant lead response (60 seconds)",
        "Review collection automation",
        "Lead tracking dashboard",
      ],
    },
    {
      name: "Reputation Builder",
      badge: "Quick Win",
      setup: "£400",
      monthly: "£79",
      features: [
        "Automated review requests after every job",
        "Direct Google review link",
        "5-day follow-up reminder",
        "Review tracking dashboard",
        "Monthly report",
      ],
    },
    {
      name: "Full System",
      badge: "Most Complete",
      setup: "£2,000",
      monthly: "£497",
      features: [
        "Everything in Lead Machine",
        "Appointment reminders (48hr + 2hr)",
        "No-show recovery",
        "Quote follow-up (Day 3, 7, 14)",
        "Invoice chase sequence",
        "Repeat business follow-up",
        "AI voice caller for quotes",
        "Monthly performance report",
        "Direct WhatsApp access to Platinum",
      ],
    },
  ],
};

export const process = {
  eyebrow: "The Process",
  heading: "From First Call to First Client — 5 Days.",
  steps: [
    {
      title: "Book a Free Demo",
      body: "15 minutes. We look at your online presence and tell you exactly what's costing you jobs.",
    },
    {
      title: "We Build It",
      body: "Your website and automation built, tested, and live in 5 working days.",
    },
    {
      title: "You Grow",
      body: "Leads captured automatically while you focus on the work.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why Us",
  heading: "Built Different.",
  items: [
    {
      word: "Local",
      label: "Bristol Based",
      body: "We're local. We understand your market, your competition, and your customers.",
    },
    {
      word: "Automation",
      label: "AI Powered",
      body: "We use the latest AI tools to build faster and smarter than any agency.",
    },
    {
      word: "Speed",
      label: "Live in 5 Days",
      body: "Not weeks. Not months. 5 working days from brief to live website.",
    },
    {
      word: "Freedom",
      label: "No Contracts",
      body: "Month to month. If we're not delivering results, you walk away. Simple.",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  heading: "Common Questions.",
  items: [
    {
      q: "How quickly will my website be live?",
      a: "Most websites are live within 5 working days of receiving your content and approval.",
    },
    {
      q: "Do I need to sign a long-term contract?",
      // TODO: confirm
      a: "No. Everything is month to month with 30 days' notice to cancel. If we're not delivering results, you walk away.",
    },
    {
      q: "What do I need to provide?",
      // TODO: confirm
      a: "Your logo (if you have one), a few photos of your work, the services and areas you cover, and 15 minutes for a kick-off call. We handle the writing, design and setup.",
    },
    {
      q: "Will my website show up on Google?",
      // TODO: confirm
      a: "Yes. Every site includes local SEO setup and Google Business Profile optimisation so you appear when people nearby search for your trade. Rankings build over time as reviews come in.",
    },
    {
      q: "What happens if something breaks?",
      // TODO: confirm
      a: "Hosting and maintenance are included. If anything goes wrong, message us and we'll fix it — usually the same day.",
    },
    {
      q: "Can I see examples of your work?",
      // TODO: confirm
      a: "Yes — take a look at Bristol Spark Electrical above, built in 4 days. We're happy to walk you through more on your free demo call.",
    },
    {
      q: "How does the automation actually work?",
      // TODO: confirm
      a: "When you miss a call, the customer gets a text back within 30 seconds. New enquiries get an instant reply within 60 seconds, and after each job a review request goes out automatically. It all runs in the background while you work.",
    },
    {
      q: "Do you work outside Bristol?",
      // TODO: confirm
      a: "Yes. We're based in Bristol but work with trades businesses right across the UK. Everything can be done remotely.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Get Started",
  heading: "Ready to Stop Losing Jobs Online?",
  accentWord: "Jobs",
  body: "Book a free 15-minute demo. No obligation. No hard sell. Just straight advice on what your business is missing and how to fix it.",
  cta: { label: "Book Free Demo Today", href: BOOKING_URL },
};

export const footer = {
  tagline: "We Build, You Work.",
  services: {
    title: "Services",
    links: [
      { label: "Visibility Package", href: "#pricing" },
      { label: "Lead Machine", href: "#pricing" },
      { label: "Reputation Builder", href: "#pricing" },
      { label: "Full System", href: "#pricing" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Our Work", href: "#work" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
