import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TrustBar } from "@/components/layout/TrustBar";
import { siteName, siteUrl } from "@/lib/seo/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DocuGen - Free privacy-first document generators",
    template: `%s | ${siteName}`
  },
  description:
    "Fill, preview, and download clean PDFs instantly. No signup, no watermark, and browser-only document generation.",
  applicationName: siteName,
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#185FA5"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <TrustBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
