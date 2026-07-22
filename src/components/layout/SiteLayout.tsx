import { Header } from "./Header";
import { Footer } from "./Footer";
import { SiteErrorBoundary } from "./SiteErrorBoundary";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <SiteErrorBoundary>{children}</SiteErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  );
}

