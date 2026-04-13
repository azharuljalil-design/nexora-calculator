import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo";
import { SiteLayout } from "@/components/layout/SiteLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification Meta Tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-9104351858655079"
        />
      </head>
      <body className={inter.className}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
