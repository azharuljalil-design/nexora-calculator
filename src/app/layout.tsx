import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/seo";
import { SiteLayout } from "@/components/layout/SiteLayout";

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
        {/* AdSense Verification */}
        <meta
          name="google-adsense-account"
          content="ca-pub-8506364468159741"
        />
      </head>

      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2GN9YYLQJE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2GN9YYLQJE');
          `}
        </Script>

        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
