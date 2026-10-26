import { pricing, seo, site } from "@/lib/content";

// LocalBusiness structured data for Google (rendered in the static HTML).
const toInternational = (ukPhone: string) => `+44${ukPhone.replace(/\s/g, "").replace(/^0/, "")}`;
const toNumber = (gbp: string) => gbp.replace(/[£,]/g, "");

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    slogan: site.tagline,
    description: seo.description,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}/opengraph-image`,
    telephone: toInternational(site.phone),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bristol",
      addressRegion: "England",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "Bristol" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    priceRange: "£400–£2,000",
    knowsAbout: ["Websites for tradespeople", "Lead automation", "Local SEO", "Google Business Profile", "Review automation"],
    makesOffer: pricing.packages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.features.join(", "),
      priceCurrency: "GBP",
      price: toNumber(p.setup),
      priceSpecification: [
        { "@type": "PriceSpecification", name: "Setup", price: toNumber(p.setup), priceCurrency: "GBP" },
        {
          "@type": "UnitPriceSpecification",
          name: "Monthly",
          price: toNumber(p.monthly),
          priceCurrency: "GBP",
          unitCode: "MON",
        },
      ],
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
