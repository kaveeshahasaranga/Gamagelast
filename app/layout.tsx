import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientHydrationSuppressor from "@/components/ClientHydrationSuppressor";

import { Providers } from "@/components/Providers";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamage Watch | Premium Timepieces",
  description: "Discover our exclusive collection of luxury watches at Gamage Watch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} antialiased bg-primary text-text-light`}
      >
        <Providers>
          <ClientHydrationSuppressor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
