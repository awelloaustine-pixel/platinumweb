// Privacy policy and terms copy.
// TODO: confirm — these are sensible starting drafts written for a UK sole trader /
// small agency, NOT legal advice. Have them reviewed (and fill in the bracketed
// details) before the site goes live.

export type LegalSection = { heading: string; body: string[]; list?: string[] };
export type LegalDoc = { title: string; description: string; updated: string; intro: string; sections: LegalSection[] };

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  description: "How Platinum Marketing Agency collects, uses and protects your personal data.",
  updated: "27 October 2026",
  intro:
    "This policy explains what personal data Platinum Marketing Agency (“we”, “us”) collects when you use this website or work with us, why we collect it, and the rights you have under UK data protection law (the UK GDPR and the Data Protection Act 2018).",
  sections: [
    {
      heading: "Who we are",
      body: [
        "Platinum Marketing Agency is based in Bristol, UK, and is the data controller for the personal data described in this policy. You can contact us about anything in this policy at helloplatinummarketing@gmail.com or on 07594 217753.",
      ],
    },
    {
      heading: "What we collect",
      body: ["We only collect what we need to talk to you and deliver our services:"],
      list: [
        "Details you give us when you book a demo, email or call us: your name, business name, email address, phone number and anything you choose to tell us about your business.",
        "Information needed to build and run your website and automations, such as your logo, photos, service areas and business contact details.",
        "Basic technical data our hosting provider records automatically when you visit this site (for example IP address, browser type and pages requested), used for security and to keep the site running.",
      ],
    },
    {
      heading: "How we use it",
      body: ["We use your personal data to:"],
      list: [
        "respond to your enquiry and run your free demo call (legitimate interests / steps before entering a contract);",
        "provide, host and support the services you sign up for (performance of a contract);",
        "send invoices and keep business records (legal obligation);",
        "keep this website secure and working (legitimate interests).",
      ],
    },
    {
      heading: "Your customers’ data",
      body: [
        "When our automations handle enquiries, missed calls or review requests for your business, we process your customers’ details on your behalf and only on your instructions. In that case you are the data controller and we act as your data processor. We will put a written data processing agreement in place with every client.",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "We never sell your data. We share it only with trusted providers that help us run our business, under contracts that protect it:",
      ],
      list: [
        "Cal.com, which handles demo bookings;",
        "Vercel, which hosts this website;",
        "Google (email and Google Business Profile services);",
        "the messaging, AI and automation tools used to deliver your services [TODO: list providers].",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "This website does not use advertising or analytics cookies. If you open our booking page, Cal.com may set its own cookies, as described in its privacy policy.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "We keep enquiry details for up to 12 months if you don’t become a client. For clients, we keep records for as long as we work together and then for up to 6 years, as required for tax and accounting purposes.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You have the right to access the personal data we hold about you, to have it corrected or deleted, to restrict or object to how we use it, and to data portability. To use any of these rights, email us; we’ll respond within one month.",
        "If you’re unhappy with how we’ve handled your data, you can complain to the Information Commissioner’s Office (ico.org.uk, 0303 123 1113). We’d appreciate the chance to put things right first.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: ["We may update this policy from time to time. The latest version will always be on this page."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Service",
  description: "The terms that apply when you use this website or buy services from Platinum Marketing Agency.",
  updated: "27 October 2026",
  intro:
    "These terms apply to your use of this website and to the services Platinum Marketing Agency (“we”, “us”) provides. Your proposal or order confirmation sets out the specific package, prices and scope agreed with you; if it conflicts with these terms, the proposal takes priority.",
  sections: [
    {
      heading: "Our services",
      body: [
        "We design, build and host websites and set up lead-capture, review and follow-up automations for trades businesses. The exact features depend on the package you choose, as described on our pricing page and in your proposal.",
      ],
    },
    {
      heading: "Timescales",
      body: [
        "We aim to launch websites within 5 working days of receiving all the content and approvals we need from you. Delays in providing content or feedback will move the launch date.",
      ],
    },
    {
      heading: "Fees and payment",
      body: [
        "Each package has a one-off setup fee and a monthly fee. The setup fee is due before work begins [TODO: confirm]. Monthly fees are billed in advance and cover hosting, maintenance, support and the automations included in your package. Prices are shown in pounds sterling [TODO: confirm VAT position].",
      ],
    },
    {
      heading: "No long-term contract",
      body: [
        "Monthly services run on a rolling basis. Either of us can cancel by giving 30 days’ written notice (email is fine). Setup fees are non-refundable once work has started.",
      ],
    },
    {
      heading: "Your responsibilities",
      body: ["You agree to:"],
      list: [
        "provide accurate business information, content and approvals promptly;",
        "make sure you have the rights to any logos, photos and text you give us;",
        "use the automations lawfully, including any consent needed to message your customers.",
      ],
    },
    {
      heading: "Ownership",
      body: [
        "You own your business content (logo, photos, text and customer data). Once your setup fee is paid, [TODO: confirm — e.g. you own the website design and content; our underlying code, templates and automation workflows remain ours and are licensed to you while you’re a client].",
      ],
    },
    {
      heading: "Results",
      body: [
        "We work hard to get you more enquiries and better visibility, but search rankings, lead volumes and job wins depend on factors outside our control, so we can’t guarantee specific results.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "Nothing in these terms limits liability that can’t legally be limited, such as for death or personal injury caused by negligence, or fraud. Otherwise, our total liability to you is limited to the fees you paid us in the 12 months before the claim, and we aren’t liable for indirect losses such as lost profits or lost business.",
      ],
    },
    {
      heading: "Governing law",
      body: ["These terms are governed by the laws of England and Wales, and the courts of England and Wales have jurisdiction."],
    },
    {
      heading: "Contact",
      body: ["Questions about these terms? Email helloplatinummarketing@gmail.com or call 07594 217753."],
    },
  ],
};
