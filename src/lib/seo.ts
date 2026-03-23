import type { Metadata } from "next";

export const siteConfig = {
  name: "NexoraCalculator",
  description:
    "NexoraCalculator is a modern, SEO-friendly hub for financial, health, math, date, conversion, and daily life calculators.",
  url: "https://www.nexoracalculator.com",
  keywords: [
    "online calculators",
    "financial calculators",
    "health calculators",
    "math calculators",
    "date calculators",
    "conversion calculators",
    "daily life calculators",
    "NexoraCalculator"
  ]
};

type CreatePageMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
};

export function createPageMetadata(
  args: CreatePageMetadataArgs = {}
): Metadata {
  const { title, description, path } = args;

  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;

  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title: fullTitle,
    description: description ?? siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description: description ?? siteConfig.description,
      url,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? siteConfig.description
    }
  };
}

