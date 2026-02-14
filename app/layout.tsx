import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ContentWrapper from "./components/ContentWrapper";
import SessionProvid from "./components/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Knowledge Manager",
  description:"Organize, store, and retrieve your personal knowledge base efficiently."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <SessionProvid>
            {children}
            </SessionProvid>
      </body>
    </html>
  );
}
