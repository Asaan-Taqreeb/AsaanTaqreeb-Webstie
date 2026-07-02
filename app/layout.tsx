import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

const customFont = localFont({
  src: "../public/fonts/awesome.regular.otf",
  variable: "--font-custom",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asaantaqreeb.com"),
  title: {
    default: "Asaan Taqreeb",
    template: "%s | Asaan Taqreeb",
  },
  description:
    "Asaan Taqreeb connects couples and families with banquets, catering, salons, and photographers across Pakistan without broker fees.",
  keywords: [
    "Asaan Taqreeb",
    "wedding planning Pakistan",
    "banquets",
    "catering",
    "salon booking",
    "photographers",
    "event planning",
  ],
  authors: [{ name: "Asaan Taqreeb" }],
  creator: "Asaan Taqreeb",
  publisher: "Asaan Taqreeb",
  openGraph: {
    title: "Asaan Taqreeb",
    description:
      "Plan events directly with trusted venues and vendors across Pakistan.",
    url: "https://asaantaqreeb.com",
    siteName: "Asaan Taqreeb",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asaan Taqreeb",
    description:
      "Plan events directly with trusted venues and vendors across Pakistan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${customFont.variable} h-full antialiased`}
    >
      <body className="w-full min-h-full flex flex-col bg-waterloo text-colonial overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

