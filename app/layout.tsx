import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const champ = localFont({
  variable: "--font-champ",
  display: "swap",
  src: [
    {
      path: "./fonts/Champ-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/Champ-ExtraBold.woff2",
      weight: "800",
    },
  ],
});

export const metadata: Metadata = {
  title: "Apron Pete Naish",
  description: "Pete Naish Take Home for Apron",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${champ.variable}`}>{children}</body>
    </html>
  );
}
