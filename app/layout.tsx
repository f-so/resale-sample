import "./globals.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "resale-paco",
  description: "せどり必須ツール",
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#fdfbef] flex flex-col font-sans">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
